import { useEffect, useRef, useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  CATEGORIES,
  getCategoryForTab,
  getPathForTab,
  getSubSectionsForTab,
  hasSubNav,
} from "../data/sections";
import type { TabType } from "../types";
import { SPRING_NAV, DUR, EASE_SUBTLE } from "../styles/motionTokens";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { lockScroll, unlockScroll } from "../utils/scrollLock";
import MobileNavPrototype from "./MobileNavPrototype";
import NavConceptPrototype from "./NavConceptPrototype";

const PRELOAD_MAP: Record<string, () => Promise<any>> = {
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
let preloadedTabs = new Set<string>();
function preloadTab(tab: string) {
  if (preloadedTabs.has(tab)) return;
  preloadedTabs.add(tab);
  PRELOAD_MAP[tab]?.();
}

/** Prototipos de navegación: ?nav=A|B|INDEX|MAP|COMPASS (se recuerda en la sesión). */
type PrototypeVariant = "A" | "B" | "INDEX" | "MAP" | "COMPASS";

function getPrototypeVariant(): PrototypeVariant | null {
  const variants: PrototypeVariant[] = ["A", "B", "INDEX", "MAP", "COMPASS"];
  try {
    const fromQuery = new URLSearchParams(window.location.search).get("nav")?.toUpperCase();
    if (fromQuery && variants.includes(fromQuery as PrototypeVariant)) {
      sessionStorage.setItem("sintiens_nav_proto", fromQuery);
      return fromQuery as PrototypeVariant;
    }
    const fromSession = sessionStorage.getItem("sintiens_nav_proto");
    return fromSession && variants.includes(fromSession as PrototypeVariant)
      ? (fromSession as PrototypeVariant)
      : null;
  } catch {
    return null;
  }
}

interface MiniTabNavProps {
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
  theme: "dark" | "light";
  onToggleTheme: (rect?: DOMRect) => void;
}

export default function MiniTabNav({ activeTab, onNavigate, theme, onToggleTheme }: MiniTabNavProps) {
  const activeCategory = getCategoryForTab(activeTab);
  const activeCategoryLabel = CATEGORIES.find((cat) => cat.id === activeCategory)?.label ?? "Menú";
  const showSubNav = hasSubNav(activeTab);
  const subSections = getSubSectionsForTab(activeTab);
  const shouldReduce = useReducedMotion();
  const mainDockRef = useRef<HTMLDivElement | null>(null);
  const subDockRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuPanelRef = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [prototypeVariant] = useState<PrototypeVariant | null>(getPrototypeVariant);

  // Cerrar el menú móvil al cambiar de sección.
  useEffect(() => {
    setMenuOpen(false);
  }, [activeTab]);

  // Cerrar con Escape o al tocar fuera; bloquear el scroll de fondo.
  useEffect(() => {
    if (!menuOpen) return;
    lockScroll();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (menuPanelRef.current?.contains(target) || menuButtonRef.current?.contains(target)) return;
      setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      unlockScroll();
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  // Si se agranda la ventana, el menú móvil deja de tener sentido.
  useEffect(() => {
    const query = window.matchMedia("(min-width: 640px)");
    const onChange = () => {
      if (query.matches) setMenuOpen(false);
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // Auto-scroll the active tab into view on mobile / narrow viewports
  useEffect(() => {
    if (!subDockRef.current) return;
    const activeEl = subDockRef.current.querySelector('[aria-current="page"]') as HTMLElement | null;
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: shouldReduce ? "auto" : "smooth", inline: "center", block: "nearest" });
    }
  }, [activeTab, shouldReduce]);

  // Main Menu — glass consistente con sub, blur-md único (no 2xl)
  const dockContainer = "flex items-center gap-1 p-1 rounded-full bg-surface/80 dark:bg-surface-container/70 backdrop-blur-md border border-outline-variant/25 shadow-sm overflow-x-auto no-scrollbar max-w-full min-w-0 scroll-px-3";
  const dockItemBase = "relative shrink-0 whitespace-nowrap px-2.5 sm:px-4 py-2 sm:py-2.5 min-h-[38px] sm:min-h-0 flex items-center justify-center rounded-full text-[11px] sm:text-xs uppercase font-mono tracking-wider sm:tracking-widest transition-colors duration-300 select-none cursor-pointer z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";

  // Submenu — más sutil, mismo sistema físico que main
  const subDockContainer = "flex items-center gap-0.5 p-1 rounded-full bg-surface-dim/45 dark:bg-surface-container/45 backdrop-blur-md border border-outline-variant/15 overflow-x-auto no-scrollbar max-w-full min-w-0 shadow-sm scroll-px-3";
  const subDockItemBase = "relative shrink-0 whitespace-nowrap px-2.5 sm:px-3.5 py-1.5 sm:py-2 min-h-[36px] sm:min-h-0 flex items-center justify-center rounded-full text-[11px] uppercase font-mono tracking-wider sm:tracking-widest transition-colors duration-300 select-none cursor-pointer z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";

  const goToTab = (tab: TabType) => {
    setMenuOpen(false);
    onNavigate(tab);
  };

  const themeToggle = (
    <motion.button
      type="button"
      onClick={(e) => onToggleTheme(e.currentTarget.getBoundingClientRect())}
      className="relative p-2 rounded-full text-on-surface-variant hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      whileHover={shouldReduce ? undefined : { scale: 1.06 }}
      whileTap={shouldReduce ? undefined : { scale: 0.94 }}
      transition={{ duration: DUR.fast, ease: EASE_SUBTLE }}
    >
      <span className="relative flex items-center justify-center w-4 h-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.82, rotate: -22 }}
            animate={shouldReduce ? { opacity: 1 } : { opacity: 1, scale: 1, rotate: 0 }}
            exit={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.82, rotate: 22 }}
            transition={shouldReduce ? { duration: 0.12 } : { duration: 0.30, ease: EASE_SUBTLE }}
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.span>
        </AnimatePresence>
      </span>
    </motion.button>
  );

  return (
    <div className="relative flex flex-col items-center gap-1.5 sm:gap-2 px-1 py-0.5 w-full max-w-full min-w-0" data-minitabnav="true">
      {prototypeVariant === "B" && (
        <MobileNavPrototype
          variant="B"
          activeTab={activeTab}
          onNavigate={onNavigate}
          themeToggle={themeToggle}
        />
      )}
      {prototypeVariant === "A" && (
        <MobileNavPrototype
          variant="A"
          activeTab={activeTab}
          onNavigate={onNavigate}
          themeToggle={themeToggle}
        />
      )}
      {(prototypeVariant === "INDEX" || prototypeVariant === "MAP" || prototypeVariant === "COMPASS") && (
        <NavConceptPrototype
          variant={prototypeVariant}
          activeTab={activeTab}
          onNavigate={onNavigate}
          themeToggle={themeToggle}
        />
      )}
      {!prototypeVariant && (
      <>
      {/* Móvil: un botón de menú claro en lugar de una píldora que se corta */}
      <div className="flex sm:hidden items-center gap-2 w-full max-w-full min-w-0">
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-panel"
          aria-label={menuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
          className="flex flex-1 min-w-0 min-h-[44px] items-center justify-between gap-3 rounded-full border border-outline-variant/25 bg-surface/85 dark:bg-surface-container/70 backdrop-blur-md px-4 py-2 text-on-surface shadow-sm transition-colors hover:border-primary/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <span className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider">
            {menuOpen ? <X className="w-4 h-4" aria-hidden /> : <Menu className="w-4 h-4" aria-hidden />}
            {menuOpen ? "Cerrar" : "Menú"}
          </span>
          <span className="truncate text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">
            {activeCategoryLabel}
          </span>
        </button>
        <div className={`${dockContainer} shrink-0 px-2`}>{themeToggle}</div>
      </div>

      {/* Panel móvil: todos los apartados y subapartados, sin scroll horizontal oculto */}
      {menuOpen && (
        <div
          ref={menuPanelRef}
          id="mobile-nav-panel"
          className="sm:hidden absolute inset-x-0 top-full z-[120] mt-2 max-h-[70svh] overflow-y-auto rounded-2xl border border-outline-variant/25 bg-surface/95 p-3 shadow-2xl backdrop-blur-xl"
        >
          {CATEGORIES.map((category) => {
            const isCategoryActive = activeCategory === category.id;
            return (
              <div key={category.id} className="border-b border-outline-variant/15 py-2 last:border-b-0">
                <a
                  href={getPathForTab(category.defaultTabId)}
                  onClick={(event) => {
                    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
                    event.preventDefault();
                    goToTab(category.defaultTabId);
                  }}
                  onPointerDown={() => preloadTab(category.defaultTabId)}
                  aria-current={activeTab === category.defaultTabId ? "page" : undefined}
                  className={`flex min-h-[44px] items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                    isCategoryActive ? "bg-primary/10 text-primary" : "text-on-surface hover:bg-surface-dim/60"
                  }`}
                >
                  {category.label}
                  <span aria-hidden="true" className="text-primary">→</span>
                </a>
                {category.subSections.length > 1 && (
                  <div className="mt-1 grid grid-cols-2 gap-1">
                    {category.subSections.map((sub) => {
                      const isActive = activeTab === sub.tabId;
                      return (
                        <a
                          key={sub.tabId}
                          href={sub.path}
                          onClick={(event) => {
                            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
                            event.preventDefault();
                            goToTab(sub.tabId);
                          }}
                          onPointerDown={() => preloadTab(sub.tabId)}
                          aria-current={isActive ? "page" : undefined}
                          className={`flex min-h-[44px] items-center rounded-xl px-3 py-2 text-[11px] uppercase font-mono tracking-wide transition-colors ${
                            isActive
                              ? "bg-primary/15 text-primary font-bold"
                              : "text-on-surface-variant hover:bg-surface-dim/60 hover:text-on-surface"
                          }`}
                        >
                          {sub.label}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      </>
      )}

      {/* Escritorio: píldora principal + tema, sin cambios de comportamiento */}
      <div
        className="hidden sm:flex flex-nowrap items-center justify-start sm:justify-center gap-1.5 sm:gap-2.5 w-full max-w-full min-w-0 px-1 sm:px-0"
        style={{ display: prototypeVariant !== null && prototypeVariant !== "A" ? "none" : undefined }}
      >
        <div ref={mainDockRef} className={dockContainer}>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <a
                key={cat.id}
                href={getPathForTab(cat.defaultTabId)}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                  e.preventDefault();
                  onNavigate(cat.defaultTabId);
                }}
                onMouseEnter={() => preloadTab(cat.defaultTabId)}
                onPointerDown={() => preloadTab(cat.defaultTabId)}
                aria-current={isActive ? "page" : undefined}
                className={`${dockItemBase} block ${
                  isActive ? "text-on-surface font-bold" : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="minitabnav-main"
                    className="absolute inset-0 bg-on-surface/10 dark:bg-on-surface/15 rounded-full -z-10"
                    transition={SPRING_NAV}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </a>
            );
          })}
        </div>

        <div className={`${dockContainer} px-2 shrink-0`}>{themeToggle}</div>
      </div>

      {/* Subcategorías — solo escritorio; en móvil viven dentro del menú */}
      <AnimatePresence mode="wait">
        {showSubNav && (
          <motion.div
            key={`sub-${activeCategory}`}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: DUR.fast, ease: EASE_SUBTLE }}
            className="hidden sm:flex items-center justify-start sm:justify-center w-full max-w-full min-w-0 px-1 sm:px-0"
            style={{ display: prototypeVariant !== null && prototypeVariant !== "A" ? "none" : undefined }}
          >
            <div ref={subDockRef} className={subDockContainer}>
              {subSections.map((sub) => {
                const isActive = activeTab === sub.tabId;
                return (
                  <a
                    key={sub.tabId}
                    href={sub.path}
                    onClick={(e) => {
                      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                      e.preventDefault();
                      onNavigate(sub.tabId);
                    }}
                    onMouseEnter={() => preloadTab(sub.tabId)}
                    onPointerDown={() => preloadTab(sub.tabId)}
                    aria-current={isActive ? "page" : undefined}
                    className={`${subDockItemBase} block ${
                      isActive ? "text-primary font-semibold" : "text-on-surface-variant/70 hover:text-on-surface"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="minitabnav-sub"
                        className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full -z-10"
                        transition={SPRING_NAV}
                      />
                    )}
                    <span className="relative z-10">{sub.label}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
