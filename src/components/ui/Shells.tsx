/**
 * Shells — envoltorios unificados para heroes, charts y modales.
 * Migración progresiva: los 14 heroes duplicados y los 22 visualizadores
 * (cifras/* + charts/*) deben converger a estos componentes.
 */
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { HERO_FULL_BLEED, HERO_ICON_STYLE } from "../../styles/glass";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { lockScroll, unlockScroll } from "../../utils/scrollLock";

/* ------------------------------------------------------------------ */
/* HeroCorners — las 4 cruces decorativas de las esquinas del hero     */
/* ------------------------------------------------------------------ */
export function HeroCorners() {
  const corner = "absolute w-6 h-6 pointer-events-none select-none flex items-center justify-center";
  const h = "absolute w-4 h-[2px] bg-primary/30";
  const v = "absolute w-[2px] h-4 bg-primary/30";
  return (
    <>
      <div className={`${corner} top-[25px] left-[20px]`}><div className={h} /><div className={v} /></div>
      <div className={`${corner} top-[25px] right-[20px]`}><div className={h} /><div className={v} /></div>
      <div className={`${corner} bottom-[20px] left-[20px]`}><div className={h} /><div className={v} /></div>
      <div className={`${corner} bottom-[20px] right-[20px]`}><div className={h} /><div className={v} /></div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* HeroNav — el menú vive en "su apartado" (posición permanente, una   */
/*  sola vez montado). Al subir reaparece arriba del todo; al llegar   */
/*  a la portada se asienta en su apartado; al bajar se aparta.        */
/*  El hero reserva el hueco con HeroNavSlot (altura --hero-nav-h).    */
/* ------------------------------------------------------------------ */
export function HeroNavSlot() {
  return <div data-nav-slot className="w-full mt-7 sm:mt-10 lg:mt-12 shrink-0" style={{ height: "var(--hero-nav-h, 104px)" }} aria-hidden />;
}

type HeroNavMode = "apart" | "top" | "off";

/** Separación superior del menú en modo flotante. */
const NAV_TOP_Y = 16;

const getStandardApartY = () => {
  if (typeof window === "undefined") return 368;
  const w = window.innerWidth;
  if (w >= 1024) return 368;
  if (w >= 640) return 324;
  return 279;
};

interface HeroFixedNavProps {
  children: React.ReactNode;
  activeTab?: string;
}

export function HeroFixedNav({ children, activeTab }: HeroFixedNavProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<HeroNavMode>(() => {
    if (typeof window === "undefined") return "apart";
    return window.scrollY > 400 ? "off" : "apart";
  });
  const [apartY, setApartY] = useState<number>(() => {
    if (typeof document === "undefined") return 323;
    const slot = document.querySelector("[data-nav-slot]") as HTMLElement | null;
    if (slot) {
      const slotRect = slot.getBoundingClientRect();
      const scrollY = typeof window !== "undefined" ? window.scrollY : 0;
      const rootEl = slot.closest("main")?.parentElement;
      const rootTop = rootEl ? Math.round(rootEl.getBoundingClientRect().top + scrollY) : 0;
      return Math.round(slotRect.top + scrollY - rootTop);
    }
    return getStandardApartY();
  });
  const apartYRef = useRef<number>(apartY);
  const heroBottomRef = useRef<number | null>(null);
  const modeRef = useRef(mode);
  const reduced = useReducedMotion();

  const syncApart = useCallback(() => {
    const slot = document.querySelector("[data-nav-slot]") as HTMLElement | null;
    if (!slot) return;
    const slotRect = slot.getBoundingClientRect();
    const scrollY = window.scrollY;
    const rootEl = ref.current?.parentElement;
    const rootTop = rootEl ? Math.round(rootEl.getBoundingClientRect().top + scrollY) : 0;
    const y = Math.round(slotRect.top + scrollY - rootTop);
    const hero = slot.closest("section");
    const hBottom = hero ? Math.round(hero.getBoundingClientRect().bottom + scrollY) : y + 120;

    heroBottomRef.current = hBottom;
    if (Math.abs(apartYRef.current - y) > 1) {
      apartYRef.current = y;
      setApartY(y);
    }

    const dockThreshold = Math.max(0, y - NAV_TOP_Y);
    if (scrollY <= dockThreshold && modeRef.current !== "apart") {
      modeRef.current = "apart";
      setMode("apart");
    }
  }, []);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const root = document.documentElement;
    const apply = () => root.style.setProperty("--hero-nav-h", `${el.offsetHeight}px`);
    apply();
    syncApart();

    const ro = new ResizeObserver(() => {
      apply();
      syncApart();
    });
    ro.observe(el);

    // MutationObserver: cuando React monta un nuevo Hero o Lazy tab, detectar slot al instante
    const mo = new MutationObserver(() => {
      syncApart();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      ro.disconnect();
      mo.disconnect();
      root.style.removeProperty("--hero-nav-h");
    };
  }, [syncApart]);

  // Re-sincronizar de inmediato y tras transiciones de pestaña
  useEffect(() => {
    if (window.scrollY <= (apartYRef.current - NAV_TOP_Y)) {
      if (modeRef.current !== "apart") {
        modeRef.current = "apart";
        setMode("apart");
      }
    }
    syncApart();
    const id = requestAnimationFrame(syncApart);
    return () => cancelAnimationFrame(id);
  }, [activeTab, syncApart]);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;

      const slot = document.querySelector("[data-nav-slot]") as HTMLElement | null;
      const hero = slot?.closest("section") as HTMLElement | null;
      const rootEl = ref.current?.parentElement;
      const rootTop = rootEl ? Math.round(rootEl.getBoundingClientRect().top + y) : 0;
      const slotY = slot ? Math.round(slot.getBoundingClientRect().top + y - rootTop) : apartYRef.current;
      const heroBottom = hero ? Math.round(hero.getBoundingClientRect().bottom + y) : slotY + 120;

      if (Math.abs(apartYRef.current - slotY) > 1) {
        apartYRef.current = slotY;
        setApartY(slotY);
      }
      heroBottomRef.current = heroBottom;

      const dockThreshold = Math.max(0, slotY - NAV_TOP_Y);
      let next: HeroNavMode;

      if (y <= dockThreshold) {
        // En la zona superior de la cabecera: siempre acoplado en el hero
        next = "apart";
      } else if (delta <= 0) {
        // --- SCROLLING UP (por debajo de la cabecera) ---
        if (delta < -6) {
          // Subiendo con intención: mostrar barra flotante arriba
          next = "top";
        } else {
          next = modeRef.current;
        }
      } else {
        // --- SCROLLING DOWN (por debajo de la cabecera) ---
        if (modeRef.current === "apart") {
          // Si venía acompañando al hero, sigue acompañándolo hasta que el hero salga por arriba
          next = y < heroBottom ? "apart" : "off";
        } else if (delta > 6) {
          // Si la barra flotante estaba arriba y baja, se oculta suavemente
          next = "off";
        } else {
          next = modeRef.current;
        }
      }

      if (next !== modeRef.current) {
        modeRef.current = next;
        setMode(next);
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", syncApart, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", syncApart);
    };
  }, [syncApart]);

  const isApart = mode === "apart";
  const isTop = mode === "top";
  const isOff = mode === "off";

  const targetY = isApart ? apartY : isTop ? NAV_TOP_Y : -120;

  const transition = reduced
    ? "none"
    : isApart
      ? "none"
      : "transform 320ms cubic-bezier(0.16, 1, 0.3, 1), opacity 240ms ease-out";

  return (
    <div
      ref={ref}
      inert={isOff || undefined}
      aria-hidden={isOff || undefined}
      className={`${
        isApart ? "absolute" : "fixed"
      } inset-x-0 top-0 z-[90] flex justify-center pointer-events-none`}
      style={{
        width: isApart ? "100%" : "calc(100% - var(--dev-sidebar-width, 0px))",
        transform: `translate3d(0, ${targetY}px, 0)`,
        transition,
      }}
    >
      <div
        className={`w-full max-w-[1280px] px-4 md:px-8 flex justify-center transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none ${
          isOff ? "-translate-y-4 opacity-0 pointer-events-none" : "translate-y-0 opacity-100 pointer-events-auto"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* HeroShell — hero full-bleed estándar (sustituye los 14 héroes copia) */
/*                                                                     */
/*  <HeroShell id="hero" watermark={{ icon: Flame }} cue={false}>       */
/*    <h1>…</h1><p>…</p>                                               */
/*  </HeroShell>                                                        */
/* ------------------------------------------------------------------ */
export type HeroWatermark =
  | string
  | { icon: LucideIcon; size?: string; opacity?: number; strokeWidth?: number };

interface HeroShellProps {
  id?: string;
  /** Glifo ("¿") o icono Lucide gigante de fondo. Null = sin watermark. */
  watermark?: HeroWatermark | null;
  sideLeft?: React.ReactNode;
  sideRight?: React.ReactNode;
  /** Muestra la flecha de scroll (solo StoryMode). Default false. */
  cue?: boolean;
  /** Tono del borde inferior. Default "15". */
  border?: "15" | "20" | "none";
  /** Padding horizontal: narrow = px-4 md:px-6 lg:px-8. Default narrow. */
  pad?: "narrow" | "wide";
  /** Hero compacto sin altura fija (DataSection). Default false. */
  compact?: boolean;
  className?: string;
  children: React.ReactNode;
}

const HERO_TALL = "min-h-[calc(100dvh-4.5rem)] lg:min-h-[calc(100dvh-5rem)] max-h-[920px] pt-14 pb-6 sm:pt-16 sm:pb-8 lg:pt-20 lg:pb-10";
const HERO_COMPACT = "pt-4 pb-8";

export function HeroShell({
  id = "hero",
  watermark,
  sideLeft,
  sideRight,
  cue = true,
  border = "15",
  pad = "narrow",
  compact = false,
  className = "",
  children,
}: HeroShellProps) {
  const WmIcon = typeof watermark === "object" && watermark !== null ? watermark.icon : null;
  const borderCls =
    border === "none" ? "" : border === "20" ? "border-b border-outline-variant/20" : "border-b border-outline-variant/15";
  const padCls = pad === "wide" ? "px-6 lg:px-16" : "px-4 md:px-6 lg:px-8";
  return (
      <section id={id} className={`${compact ? "" : "-mt-12 lg:-mt-20"} flex flex-col items-center relative overflow-visible`} style={{ ...HERO_FULL_BLEED }}>
        <div className={`w-full flex flex-col items-center text-center relative ${compact ? HERO_COMPACT : HERO_TALL} ${padCls} ${borderCls} ${className}`}>
          <HeroCorners />

          {sideLeft && (
            <div className="absolute top-8 left-8 text-left select-none hidden xl:block max-w-[280px]">
              {sideLeft}
            </div>
          )}
          {sideRight && (
            <div className="absolute top-8 right-8 text-right select-none hidden xl:block max-w-[280px]">
              {sideRight}
            </div>
          )}

          {watermark && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" style={{ zIndex: 0, maskImage: "linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 16%, black 84%, transparent 100%)" }} aria-hidden>
              {typeof watermark === "string" ? (
                <span className="font-serif font-bold leading-none text-zinc-900 dark:text-zinc-100 blur" style={{ fontSize: "clamp(160px, 50vw, 600px)", opacity: 0.08, transform: "translateY(-20%)" }}>
                  {watermark}
                </span>
              ) : WmIcon ? (
                <WmIcon
                  className="text-zinc-900 dark:text-zinc-100 blur"
                  style={{
                    width: watermark.size ?? HERO_ICON_STYLE.width,
                    height: watermark.size ?? HERO_ICON_STYLE.height,
                    opacity: watermark.opacity ?? HERO_ICON_STYLE.opacity,
                  }}
                  strokeWidth={watermark.strokeWidth ?? HERO_ICON_STYLE.strokeWidth}
                />
              ) : null}
            </div>
          )}

          <div className={`w-full flex flex-col justify-center items-center ${compact ? "min-h-[140px]" : "min-h-[195px] sm:min-h-[220px] lg:min-h-[240px] shrink-0"}`}>
            <div className="space-y-2 sm:space-y-2.5 max-w-3xl w-full text-center relative z-10 flex flex-col items-center justify-center">
              {children}
            </div>
          </div>
          <HeroNavSlot />
          {cue && (
            <div className="w-full flex-1 min-h-[48px] flex flex-col items-center justify-center">
              <button
                type="button"
                onClick={() => {
                  const heroEl = document.getElementById(id);
                  if (heroEl) {
                    const nextY = heroEl.offsetTop + heroEl.offsetHeight - 48;
                    window.scrollTo({ top: nextY, behavior: "smooth" });
                  } else {
                    window.scrollTo({ top: window.innerHeight * 0.85, behavior: "smooth" });
                  }
                }}
                aria-label="Desplazarse al contenido"
                className="group flex flex-col items-center select-none relative z-10 p-2 text-primary/50 hover:text-primary transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-full"
              >
                <div className="animate-bounce">
                  <svg className="w-5 h-5 transition-transform group-hover:translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </button>
            </div>
          )}
        </div>
      </section>
  );
}

/** Bloque lateral de metadatos del hero (SINTIENS LAB / ESTADO, etc.). */
export function HeroSideMeta({ title, lines, align = "left" }: { title: string; lines: string[]; align?: "left" | "right" }) {
  const right = align === "right";
  return (
    <div className="relative pt-0 space-y-4">
      <span className={`text-[10px] font-mono font-bold text-primary uppercase tracking-widest block leading-none ${right ? "pr-6" : "pl-6"}`}>{title}</span>
      <div className={`relative ${right ? "pr-6 border-r-2" : "pl-6 border-l-2"} text-[11px] text-on-surface-variant font-light space-y-1.5 leading-relaxed border-primary/30`}>
        {lines.map((l) => (
          <p key={l}>{l}</p>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ChartShell — scaffold común de cifras/* y charts/*                   */
/* ------------------------------------------------------------------ */
interface ChartShellProps {
  title: string;
  subtitle?: string;
  /** Fuente trazable (ej. "Poore & Nemecek 2018"). */
  source?: string;
  className?: string;
  children: React.ReactNode;
}

export function ChartShell({ title, subtitle, source, className = "", children }: ChartShellProps) {
  return (
    <figure className={`bg-surface dark:bg-zinc-900/60 rounded-2xl border border-outline-variant/15 p-6 sm:p-8 overflow-hidden ${className}`}>
      <figcaption>
        <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{title}</h4>
        {subtitle && <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{subtitle}</p>}
      </figcaption>
      <div className="mt-4">{children}</div>
      {source && (
        <figcaption className="mt-4 text-[11px] font-mono text-zinc-500 dark:text-zinc-500">
          Fuente: {source}
        </figcaption>
      )}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* ModalShell — dialog accesible: trap + Escape + restaura foco        */
/*  El padre lo monta condicionalmente ({open && <ModalShell …/>}).    */
/* ------------------------------------------------------------------ */
interface ModalShellProps {
  onClose: () => void;
  labelledBy: string;
  describedBy?: string;
  className?: string;
  children: React.ReactNode;
}

export function ModalShell({ onClose, labelledBy, describedBy, className = "", children }: ModalShellProps) {
  const containerRef = useFocusTrap(true);

  useEffect(() => {
    lockScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        className={`relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-surface text-on-surface rounded-2xl border border-outline-variant/20 shadow-2xl ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* PageSkeleton — esqueleto armónico que preserva HeroShell y slot    */
/*  del menú, evitando cualquier salto visual o pérdida de anclaje.   */
/* ------------------------------------------------------------------ */
export function PageSkeleton({ label = "Cargando sección" }: { label?: string }) {
  return (
    <div className="w-full" aria-label={label} role="status">
      <HeroShell id="hero-skeleton" cue={true} watermark={null}>
        <div className="space-y-3 w-full flex flex-col items-center justify-center">
          <div className="h-9 sm:h-11 w-48 sm:w-64 rounded-full bg-surface-dim/40 animate-pulse" />
          <div className="h-4 sm:h-5 w-72 sm:w-96 rounded-full bg-surface-dim/25 animate-pulse mt-2" />
        </div>
      </HeroShell>
    </div>
  );
}
