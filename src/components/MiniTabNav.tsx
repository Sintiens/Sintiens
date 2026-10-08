import { useEffect, useRef } from "react";
import { Sun, Moon } from "lucide-react";
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

interface MiniTabNavProps {
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
  theme: "dark" | "light";
  onToggleTheme: (rect?: DOMRect) => void;
}

export default function MiniTabNav({ activeTab, onNavigate, theme, onToggleTheme }: MiniTabNavProps) {
  const activeCategory = getCategoryForTab(activeTab);
  const showSubNav = hasSubNav(activeTab);
  const subSections = getSubSectionsForTab(activeTab);
  const shouldReduce = useReducedMotion();
  const mainDockRef = useRef<HTMLDivElement | null>(null);
  const subDockRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll the active tab into view on mobile / narrow viewports
  useEffect(() => {
    if (!subDockRef.current) return;
    const activeEl = subDockRef.current.querySelector('[aria-current="page"]') as HTMLElement | null;
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: shouldReduce ? "auto" : "smooth", inline: "center", block: "nearest" });
    }
  }, [activeTab, shouldReduce]);

  useEffect(() => {
    if (!mainDockRef.current) return;
    const activeEl = mainDockRef.current.querySelector('[aria-current="page"]') as HTMLElement | null;
    if (activeEl) {
      activeEl.scrollIntoView({ behavior: shouldReduce ? "auto" : "smooth", inline: "center", block: "nearest" });
    }
  }, [activeCategory, shouldReduce]);

  // Main Menu — glass consistente con sub, blur-md único (no 2xl)
  const dockContainer = "flex items-center gap-1 p-1 rounded-full bg-surface/80 dark:bg-surface-container/70 backdrop-blur-md border border-outline-variant/25 shadow-sm overflow-x-auto no-scrollbar max-w-full min-w-0 scroll-px-3";
  const dockItemBase = "relative shrink-0 whitespace-nowrap px-2.5 sm:px-4 py-2 sm:py-2.5 min-h-[38px] sm:min-h-0 flex items-center justify-center rounded-full text-[11px] sm:text-xs uppercase font-mono tracking-wider sm:tracking-widest transition-colors duration-300 select-none cursor-pointer z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";

  // Submenu — más sutil, mismo sistema físico que main
  const subDockContainer = "flex items-center gap-0.5 p-1 rounded-full bg-surface-dim/45 dark:bg-surface-container/45 backdrop-blur-md border border-outline-variant/15 overflow-x-auto no-scrollbar max-w-full min-w-0 shadow-sm scroll-px-3";
  const subDockItemBase = "relative shrink-0 whitespace-nowrap px-2.5 sm:px-3.5 py-1.5 sm:py-2 min-h-[36px] sm:min-h-0 flex items-center justify-center rounded-full text-[11px] uppercase font-mono tracking-wider sm:tracking-widest transition-colors duration-300 select-none cursor-pointer z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";


  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2 px-1 py-0.5 w-full max-w-full min-w-0" data-minitabnav="true">
      {/* Top Row: Main Categories & Theme Toggle (single horizontal flow, never orphaned) */}
      <div className="flex flex-nowrap items-center justify-start sm:justify-center gap-1.5 sm:gap-2.5 w-full max-w-full min-w-0 px-1 sm:px-0">
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

        {/* Theme Toggle Dock — animación minimalista y sobria + reveal */}
        <div className={`${dockContainer} px-2 shrink-0`}>
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
                  initial={
                    shouldReduce
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.82, rotate: -22 }
                  }
                  animate={
                    shouldReduce
                      ? { opacity: 1 }
                      : { opacity: 1, scale: 1, rotate: 0 }
                  }
                  exit={
                    shouldReduce
                      ? { opacity: 0 }
                      : { opacity: 0, scale: 0.82, rotate: 22 }
                  }
                  transition={
                    shouldReduce
                      ? { duration: 0.12 }
                      : { duration: 0.30, ease: EASE_SUBTLE }
                  }
                  className="absolute inset-0 flex items-center justify-center"
                  aria-hidden
                >
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.button>
        </div>
      </div>

      {/* Bottom Row: Subcategories — solo si la categoría tiene subsecciones */}
      <AnimatePresence mode="wait">
        {showSubNav && (
          <motion.div
            key={`sub-${activeCategory}`}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: DUR.fast, ease: EASE_SUBTLE }}
            className="flex items-center justify-start sm:justify-center w-full max-w-full min-w-0 px-1 sm:px-0"
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
