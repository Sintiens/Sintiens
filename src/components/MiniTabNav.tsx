import React, { useState, useEffect } from "react";
import { Sun, Moon, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  CATEGORIES,
  getCategoryForTab,
  getSubSectionsForTab,
  hasSubNav,
} from "../data/sections";
import type { TabType } from "./TabNav";

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

  const categoryLabel = CATEGORIES.find((cat) => cat.id === activeCategory)?.label || "";

  // Main Menu Aesthetic
  const dockContainer = "flex items-center gap-1 p-1 rounded-full bg-background/40 dark:bg-background/20 backdrop-blur-2xl border border-outline-variant/30 shadow-sm";
  const dockItemBase = "relative px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-[11px] uppercase font-mono tracking-widest transition-colors duration-300 select-none cursor-pointer z-10";

  // Submenu Aesthetic (more compact, subtle, distinct active state)
  const subDockContainer = "flex items-center gap-0.5 p-1 rounded-full bg-surface-dim/40 dark:bg-surface-container/40 backdrop-blur-md border border-outline-variant/15";
  const subDockItemBase = "relative px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[9.5px] sm:text-[10px] uppercase font-sans tracking-wide transition-colors duration-300 select-none cursor-pointer z-10";


  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3 px-1 py-1" data-minitabnav="true">
      {/* Top Row: Main Categories & Theme Toggle */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 w-full">
        <div className={dockContainer}>
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onNavigate(cat.defaultTabId)}
                className={`${dockItemBase} ${
                  isActive ? "text-on-surface font-bold" : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="minitabnav-main"
                    className="absolute inset-0 bg-on-surface/10 dark:bg-on-surface/15 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
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
            onClick={onToggleTheme}
            className="p-1.5 rounded-full text-on-surface-variant hover:text-on-surface transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Bottom Row: Subcategories (Only if active category has subcategories) */}
      <div className="h-[36px] sm:h-[40px] flex items-center justify-center w-full">
        <AnimatePresence mode="wait">
          {showSubNav && (
            <motion.div
              key={`sub-${activeCategory}`}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className={subDockContainer}
            >
              {subSections.map((sub) => {
                const isActive = activeTab === sub.tabId;
                return (
                  <button
                    key={sub.tabId}
                    onClick={() => onNavigate(sub.tabId)}
                    className={`${subDockItemBase} ${
                      isActive ? "text-primary font-medium" : "text-on-surface-variant/70 hover:text-on-surface"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="minitabnav-sub"
                        className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 480, damping: 34 }}
                      />
                    )}
                    <span className="relative z-10">{sub.label}</span>
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
