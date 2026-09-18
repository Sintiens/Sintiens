/**
 * Shells — envoltorios unificados para heroes, charts y modales.
 * Migración progresiva: los 14 heroes duplicados y los 22 visualizadores
 * (cifras/* + charts/*) deben converger a estos componentes.
 */
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import { HERO_FULL_BLEED, HERO_ICON_STYLE } from "../../styles/glass";
import { useFocusTrap } from "../../hooks/useFocusTrap";
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
/* HeroNav — el nav nace en el hero y se pega al scrollear (P1-1b)     */
/*  App provee el nodo via HeroNavProvider; cada HeroShell renderiza   */
/*  <HeroNavSlot/> como hermano sticky tras el <section>. Mientras     */
/*  queden heroes sin migrar, App muestra el fallback absoluto.        */
/* ------------------------------------------------------------------ */
interface HeroNavCtxValue {
  nav: React.ReactNode;
  claimed: boolean;
  setClaimed: (v: boolean) => void;
}

const HeroNavContext = createContext<HeroNavCtxValue>({
  nav: null,
  claimed: false,
  setClaimed: () => {},
});

export function HeroNavProvider({ nav, children }: { nav: React.ReactNode; children: React.ReactNode }) {
  const [claimed, setClaimed] = useState(false);
  const value = useMemo(() => ({ nav, claimed, setClaimed }), [nav, claimed]);
  return <HeroNavContext.Provider value={value}>{children}</HeroNavContext.Provider>;
}

/** True cuando la tab activa ya aporta su nav desde su hero. */
export function useHeroNavClaimed() {
  return useContext(HeroNavContext).claimed;
}

/** Slot sticky solapado al borde inferior del hero (sustituye top-[480px]).
 *  Auto-hide: se repliega al bajar y reaparece al subir, para no ocupar
 *  espacio permanente durante la lectura. */
export function HeroNavSlot() {
  const { nav, setClaimed } = useContext(HeroNavContext);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    setClaimed(true);
    return () => setClaimed(false);
  }, [setClaimed]);
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const delta = y - lastY;
      if (y < 96) {
        setHidden(false);
      } else if (delta > 6) {
        setHidden(true);
      } else if (delta < -6) {
        setHidden(false);
      }
      lastY = y;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!nav) return null;
  return (
    <div
      inert={hidden || undefined}
      aria-hidden={hidden || undefined}
      className={`sticky top-3 z-[90] -mt-14 lg:-mt-20 flex justify-center pointer-events-none transition-[transform,opacity] duration-300 ease-out ${
        hidden ? "-translate-y-[160%] opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className={`w-full max-w-[1280px] px-4 md:px-8 flex justify-center ${hidden ? "pointer-events-none" : "pointer-events-auto"}`}>
        {nav}
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

const HERO_TALL = "h-[min(550px,calc(100dvh-240px))] min-h-[min(550px,calc(100dvh-240px))] lg:h-[min(600px,calc(100dvh-260px))] lg:min-h-[min(600px,calc(100dvh-260px))] pt-16 pb-16 lg:pt-28 lg:pb-24";
const HERO_COMPACT = "pt-4 pb-8";

export function HeroShell({
  id = "hero",
  watermark,
  sideLeft,
  sideRight,
  cue = false,
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
    <>
      <section id={id} className="-mt-12 lg:-mt-20 flex flex-col items-center relative overflow-visible" style={{ ...HERO_FULL_BLEED }}>
        <div className={`w-full flex flex-col justify-center items-center text-center relative ${compact ? HERO_COMPACT : HERO_TALL} ${padCls} ${borderCls} ${className}`}>
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

          <div className="flex-1 lg:flex-none flex flex-col justify-center items-center w-full">
            <div className={`space-y-2 lg:space-y-4 max-w-3xl w-full text-center relative z-10${compact ? " mt-12 lg:mt-20" : ""}`}>
              {children}
            </div>
          </div>

          {cue && (
            <div className="w-full flex justify-center pt-10 lg:pt-16 select-none relative z-10" aria-hidden>
              <div className="text-primary/50 animate-bounce">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          )}
        </div>
      </section>
      <HeroNavSlot />
    </>
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
/* PageSkeleton — mismo esqueleto que el fallback de LazyTabWrapper.   */
/*  Úsalo cuando la tab espera datos (grafo/cronologia sin CORE_NODES). */
/* ------------------------------------------------------------------ */
export function PageSkeleton({ label = "Cargando sección" }: { label?: string }) {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-12 space-y-4" aria-label={label} role="status">
      <div className="h-8 w-48 rounded-full bg-surface-dim/40 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
        {[0, 1, 2].map((i) => (
          <div key={i} className="glass-enhance rounded-2xl p-6 space-y-3 border border-outline-variant/15 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none relative animate-pulse">
            <div className="h-4 w-24 rounded-full bg-surface-dim/60" />
            <div className="h-6 w-full rounded-lg bg-surface-dim/40" />
            <div className="h-20 w-full rounded-xl bg-surface-dim/30" />
          </div>
        ))}
      </div>
    </div>
  );
}
