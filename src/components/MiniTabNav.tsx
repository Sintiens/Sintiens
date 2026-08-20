import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  CATEGORIES,
  getCategoryForTab,
  getSubSectionsForTab,
  hasSubNav,
} from "../data/sections";
import type { TabType } from "../types";
import { SPRING_NAV, DUR, EASE_SUBTLE } from "../styles/motionTokens";

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
  onToggleTheme: () => void;
}

export default function MiniTabNav({ activeTab, onNavigate, theme, onToggleTheme }: MiniTabNavProps) {
  const activeCategory = getCategoryForTab(activeTab);
  const showSubNav = hasSubNav(activeTab);
  const subSections = getSubSectionsForTab(activeTab);

  // Main Menu — glass consistente con sub, blur-md único (no 2xl)
  const dockContainer = "flex items-center gap-1 p-1 rounded-full bg-surface/80 dark:bg-surface-container/70 backdrop-blur-md border border-outline-variant/25 shadow-sm overflow-x-auto no-scrollbar max-w-full";
  const dockItemBase = "relative shrink-0 whitespace-nowrap px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-[11px] uppercase font-mono tracking-widest transition-colors duration-300 select-none cursor-pointer z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";

  // Submenu — más sutil, mismo sistema físico que main
  const subDockContainer = "flex items-center gap-0.5 p-1 rounded-full bg-surface-dim/45 dark:bg-surface-container/45 backdrop-blur-md border border-outline-variant/15 overflow-x-auto no-scrollbar max-w-full shadow-sm";
  const subDockItemBase = "relative shrink-0 whitespace-nowrap px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[9.5px] sm:text-[10px] uppercase font-mono tracking-widest transition-colors duration-300 select-none cursor-pointer z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";


  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3 px-1 py-1" data-minitabnav="true">
      {/* Top Row: Main Categories & Theme Toggle */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full">
        <div className={dockContainer}>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onNavigate(cat.defaultTabId)}
                onMouseEnter={() => preloadTab(cat.defaultTabId)}
                aria-current={isActive ? "page" : undefined}
                className={`${dockItemBase} ${
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
              </button>
            );
          })}
        </div>

        {/* Theme Toggle Dock */}
        <div className={`${dockContainer} px-2`}>
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-1.5 rounded-full text-on-surface-variant hover:text-on-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Bottom Row: Subcategories — altura colapsa si no hay subnav, sin hueco */}
      <AnimatePresence mode="wait">
        {showSubNav ? (
          <motion.div
            key={`sub-${activeCategory}`}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: DUR.fast, ease: EASE_SUBTLE }}
            className="flex items-center justify-center w-full"
          >
            <div className={subDockContainer}>
              {subSections.map((sub) => {
                const isActive = activeTab === sub.tabId;
                return (
                  <button
                    key={sub.tabId}
                    type="button"
                    onClick={() => onNavigate(sub.tabId)}
                    onMouseEnter={() => preloadTab(sub.tabId)}
                    aria-current={isActive ? "page" : undefined}
                    className={`${subDockItemBase} ${
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
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div key="sub-empty" initial={{ opacity: 0 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }} className="h-0" />
        )}
      </AnimatePresence>
    </div>
  );
}
