import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, Moon, Sun } from "lucide-react";
import { CATEGORIES, getCategoryForTab, getPathForTab, getSubSectionsForTab } from "../data/sections";
import type { TabType } from "../types";
import { lockScroll, unlockScroll } from "../utils/scrollLock";
import CompactIndexContent from "./CompactIndexContent";

const PRELOAD_MAP: Record<string, () => Promise<unknown>> = {
  historia_narrativa: () => import("./StoryMode"),
  grafo: () => import("./GlossaryExplorer"),
  cronologia: () => import("./TimelineExplorer"),
  dialectica: () => import("./ExcusesDilemmas"),
  datos: () => import("./DataSection"),
  noticias: () => import("./NewsExplorer"),
  calculadora: () => import("./ImpactCalculator"),
  validador: () => import("./AiValidator"),
  laboratorio_hub: () => import("./LaboratorioHub"),
  velo_rawls: () => import("./RawlsianMachine"),
  termodinamica: () => import("./ThermodynamicMatrix"),
  neurobiologia: () => import("./NeurobiologyViewer"),
  nutricion: () => import("./NutriCompare"),
  welfarewashing: () => import("./WelfarewashingScanner"),
};
const preloadedTabs = new Set<string>();
function preloadTab(tab: string) {
  if (preloadedTabs.has(tab)) return;
  preloadedTabs.add(tab);
  void PRELOAD_MAP[tab]?.();
}

interface CompactIndexNavProps {
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
  theme: "dark" | "light";
  onToggleTheme: (rect?: DOMRect) => void;
}

export default function CompactIndexNav({ activeTab, onNavigate, theme, onToggleTheme }: CompactIndexNavProps) {
  const activeCategory = getCategoryForTab(activeTab);
  const activeCategoryData = CATEGORIES.find((category) => category.id === activeCategory) ?? CATEGORIES[0]!;
  const activeSubs = getSubSectionsForTab(activeTab);
  const activeSub = activeSubs.find((sub) => sub.tabId === activeTab);
  const [mode, setMode] = useState<"apart" | "top" | "off">("apart");
  const [showDocked, setShowDocked] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const dockedButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastIntentAt = useRef(0);


  const themeToggle = (
    <button
      type="button"
      onClick={(event) => onToggleTheme(event.currentTarget.getBoundingClientRect())}
      className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-on-surface-variant transition-colors hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
    </button>
  );

  // El contenedor HeroFixedNav expone su estado (apart/top/off).
  // La barra fina se decide por dirección de scroll, no por la altura del wrapper,
  // para que no parpadee cuando cambia de altura.
  useEffect(() => {
    let lastY = window.scrollY;
    let touchY = 0;
    const readMode = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      lastY = y;
      const wrapper = navRef.current?.closest("[data-nav-mode]");
      const next = wrapper?.getAttribute("data-nav-mode");
      const nextMode = next === "top" ? "top" : next === "off" ? "off" : "apart";
      setMode(nextMode);
      if (nextMode === "apart") {
        setShowDocked(false);
      } else if (Date.now() - lastIntentAt.current > 180) {
        if (delta < -6) setShowDocked(true);
        else if (delta > 6) setShowDocked(false);
      }
    };
    const markIntent = (up: boolean) => {
      lastIntentAt.current = Date.now();
      setShowDocked(up);
    };
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < 2) return;
      markIntent(event.deltaY < 0);
    };
    const onTouchStart = (event: TouchEvent) => {
      touchY = event.touches[0]?.clientY ?? 0;
    };
    const onTouchMove = (event: TouchEvent) => {
      const y = event.touches[0]?.clientY ?? touchY;
      const delta = y - touchY;
      if (Math.abs(delta) < 8) return;
      // El dedo baja => el contenido sube (scroll hacia arriba).
      markIntent(delta > 0);
      touchY = y;
    };
    readMode();
    const id = requestAnimationFrame(readMode);
    const wrapper = navRef.current?.closest("[data-nav-mode]");
    const observer = wrapper ? new MutationObserver(readMode) : null;
    observer?.observe(wrapper!, { attributes: true, attributeFilter: ["data-nav-mode"] });
    window.addEventListener("scroll", readMode, { passive: true });
    window.addEventListener("resize", readMode, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      observer?.disconnect();
      window.removeEventListener("scroll", readMode);
      window.removeEventListener("resize", readMode);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  useEffect(() => {
    setOverlayOpen(false);
  }, [activeTab]);

  const closeOverlay = () => {
    setOverlayOpen(false);
    requestAnimationFrame(() => dockedButtonRef.current?.focus());
  };

  useEffect(() => {
    if (!overlayOpen) return;
    lockScroll();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeOverlay();
    };
    document.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => {
      const dialog = document.querySelector<HTMLElement>("[data-compact-overlay]");
      dialog?.focus();
    }, 80);
    return () => {
      unlockScroll();
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [overlayOpen]);

  const handleNavigate = (tab: TabType) => {
    setOverlayOpen(false);
    onNavigate(tab);
  };

  const dockedBar = (
    <div className="flex min-h-[50px] w-full max-w-full items-center gap-1 rounded-full border border-outline-variant/25 bg-surface/95 px-1.5 py-0.5 shadow-sm backdrop-blur-xl dark:bg-surface-container/90">
      <button
        ref={dockedButtonRef}
        type="button"
        onClick={() => setOverlayOpen(true)}
        aria-expanded={overlayOpen}
        aria-controls="compact-nav-overlay"
        className="flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-full px-2.5 font-mono text-[9px] uppercase tracking-[0.12em] text-on-surface transition-colors hover:bg-surface-dim/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <Menu className="h-4 w-4" aria-hidden />
        Índice
      </button>

      <span className="hidden h-4 w-px shrink-0 bg-outline-variant/30 sm:block" aria-hidden />

      <div className="hidden min-w-0 flex-1 items-center gap-0.5 sm:flex">
        {CATEGORIES.map((category, index) => {
          const isActive = category.id === activeCategory;
          return (
            <a
              key={category.id}
              href={getPathForTab(category.defaultTabId)}
              onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
                event.preventDefault();
                preloadTab(category.defaultTabId);
                handleNavigate(category.defaultTabId);
              }}
              onPointerDown={() => preloadTab(category.defaultTabId)}
              aria-current={isActive ? "page" : undefined}
              className={`flex min-h-[44px] min-w-0 items-center gap-1 rounded-full px-1.5 font-mono text-[9px] uppercase tracking-[0.08em] transition-colors lg:px-2.5 ${
                isActive ? "bg-primary/10 text-primary" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span className="hidden text-[8px] opacity-55 lg:inline">{String(index + 1).padStart(2, "0")}</span>
              <span className="truncate">{category.label}</span>
            </a>
          );
        })}
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-end gap-1.5 sm:hidden">
        <span className="truncate font-mono text-[9px] uppercase tracking-[0.06em] text-primary">
          {activeCategoryData.label}
        </span>
        {activeSub && activeSub.label !== activeCategoryData.label && (
          <span className="max-w-[90px] truncate font-mono text-[8px] uppercase tracking-[0.04em] text-on-surface-variant">
            · {activeSub.label}
          </span>
        )}
      </div>

      <div className="hidden items-center gap-0.5 lg:flex">
        {activeSubs.length > 1 &&
          activeSubs.map((sub) => {
            const isActive = sub.tabId === activeTab;
            return (
              <a
                key={sub.tabId}
                href={sub.path}
                onClick={(event) => {
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
                  event.preventDefault();
                  preloadTab(sub.tabId);
                  handleNavigate(sub.tabId);
                }}
                onPointerDown={() => preloadTab(sub.tabId)}
                aria-current={isActive ? "page" : undefined}
                className={`flex min-h-[44px] items-center rounded-full px-2 font-mono text-[8px] uppercase tracking-[0.04em] transition-colors xl:text-[9px] ${
                  isActive ? "bg-primary/10 font-bold text-primary" : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {sub.label}
              </a>
            );
          })}
      </div>

      <span className="h-4 w-px shrink-0 bg-outline-variant/30" aria-hidden />
      {themeToggle}
    </div>
  );

  const overlay =
    overlayOpen && typeof document !== "undefined"
      ? createPortal(
          <div
            className="fixed inset-0 z-[200] flex items-start justify-center bg-black/55 p-2 backdrop-blur-sm sm:items-center sm:p-6"
            onPointerDown={closeOverlay}
          >
            <div
              data-compact-overlay
              id="compact-nav-overlay"
              role="dialog"
              aria-modal="true"
              aria-label="Índice de navegación"
              tabIndex={-1}
              style={{ outline: "none" }}
              className="mt-[max(0.5rem,env(safe-area-inset-top))] max-h-[calc(100dvh-1rem)] w-full max-w-3xl overflow-y-auto rounded-2xl border border-outline-variant/25 bg-surface/95 p-3 shadow-2xl backdrop-blur-xl sm:mt-0 sm:max-h-[calc(100dvh-3rem)] sm:p-4"
              onPointerDown={(event) => event.stopPropagation()}
            >
              <CompactIndexContent
                activeTab={activeTab}
                onNavigate={handleNavigate}
                themeToggle={themeToggle}
                onClose={closeOverlay}
              />
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div ref={navRef} className="relative w-full max-w-full min-w-0">
      {mode === "apart" ? (
        <CompactIndexContent
          activeTab={activeTab}
          onNavigate={handleNavigate}
          themeToggle={themeToggle}
        />
      ) : (
        <div className="h-0" aria-hidden />
      )}

      {showDocked &&
        typeof document !== "undefined" &&
        createPortal(
          <div data-docked-bar className="pointer-events-none fixed inset-x-0 top-4 z-[95] flex justify-center px-2 sm:px-4 md:px-8">
            <div className="pointer-events-auto w-full max-w-[1280px]">{dockedBar}</div>
          </div>,
          document.body,
        )}

      {overlay}
    </div>
  );
}
