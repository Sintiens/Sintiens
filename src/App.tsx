import { useState, useEffect } from "react";
import GlossaryExplorer from "./components/GlossaryExplorer";
import TimelineExplorer from "./components/TimelineExplorer";
import ExcusesDilemmas from "./components/ExcusesDilemmas";
import ImpactCalculator from "./components/ImpactCalculator";
import AiValidator from "./components/AiValidator";
import SintiensLogo from "./components/SintiensLogo";
import StoryMode from "./components/StoryMode";
import DevModeOverlay from "./components/DevModeOverlay";
import DevErrorBoundary from "./components/DevErrorBoundary";
import DataSection from "./components/DataSection";
import { motion, AnimatePresence } from "motion/react";
import { CORE_NODES } from "./types";
import { GLOSSARY_BY_ID, GLOSSARY_UNIFIED } from "./data/glossaryUnified";
import type { TabType } from "./components/TabNav";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("historia_narrativa");
  const [passedArgument, setPassedArgument] = useState<string | null>(null);
  const [redirectNodeId, setRedirectNodeId] = useState<string | null>(null);
  const [redirectEntryId, setRedirectEntryId] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return "dark";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const updateScrollbarWidth = () => {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    };
    updateScrollbarWidth();
    window.addEventListener("resize", updateScrollbarWidth);
    return () => window.removeEventListener("resize", updateScrollbarWidth);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const targetId = customEvent.detail;
      if (!targetId) return;

      const isNode = CORE_NODES.some((n) => n.id === targetId);
      if (isNode) {
        const relatedGlossaryEntry = GLOSSARY_UNIFIED.find((entry) =>
          (entry.relatedNodes || []).includes(targetId)
        );
        if (relatedGlossaryEntry) {
          setRedirectEntryId(relatedGlossaryEntry.id);
        }
        setRedirectNodeId(targetId);
        setActiveTab("grafo");
      } else {
        setActiveTab("dialectica");
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("expand-dilemma", { detail: targetId }));
        }, 80);
      }
    };

    window.addEventListener("navigate-to-item", handleNavigate);
    return () => window.removeEventListener("navigate-to-item", handleNavigate);
  }, []);

  useEffect(() => {
    const handleNavigateGlossary = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const targetId = customEvent.detail;
      if (!targetId) return;
      if (GLOSSARY_BY_ID[targetId]) {
        setRedirectEntryId(targetId);
        setActiveTab("grafo");
      }
    };

    window.addEventListener("navigate-to-glossary", handleNavigateGlossary);
    return () => window.removeEventListener("navigate-to-glossary", handleNavigateGlossary);
  }, []);

  const handleDeconstructTrigger = (excuse: string) => {
    setPassedArgument(excuse);
    setActiveTab("validador");
  };

  const handleClearTrigger = () => {
    setPassedArgument(null);
  };

  const handleRedirectToConcept = (nodeId: string) => {
    setRedirectNodeId(nodeId);
    setActiveTab("grafo");
  };

  const handleNavigate = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const sharedProps = {
    activeTab,
    onNavigate: handleNavigate,
    theme,
    onToggleTheme: handleToggleTheme,
  };

  return (
    <div 
      style={{ 
        width: "calc(100% - var(--dev-sidebar-width, 0px))", 
        transition: "var(--dev-sidebar-transition, width 0.3s cubic-bezier(0.25, 1, 0.5, 1))" 
      }} 
      className="min-h-screen bg-background text-on-background font-sans selection:bg-primary selection:text-on-primary flex flex-col transition-colors duration-500 pb-0"
    >
      
      {/* Main Content — navigation is handled inside each tab via TabNav */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-3 md:px-8 lg:px-16 py-12 lg:py-20 relative">

        <div className="min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              {activeTab === "historia_narrativa" && (
                <StoryMode {...sharedProps} />
              )}
              {activeTab === "grafo" && (
                <GlossaryExplorer
                  initialEntryId={redirectEntryId}
                  onClearInitialEntryId={() => setRedirectEntryId(null)}
                  {...sharedProps}
                />
              )}
              {activeTab === "cronologia" && (
                <TimelineExplorer
                  onRedirectToConcept={handleRedirectToConcept}
                  {...sharedProps}
                />
              )}
              {activeTab === "dialectica" && (
                <ExcusesDilemmas
                  onAnalyzeTrigger={handleDeconstructTrigger}
                  {...sharedProps}
                />
              )}
              {activeTab === "calculadora" && (
                <ImpactCalculator {...sharedProps} />
              )}
              {activeTab === "datos" && (
                <DataSection {...sharedProps} />
              )}
              {activeTab === "validador" && (
                <AiValidator
                  argumentToAnalyze={passedArgument}
                  clearArgument={handleClearTrigger}
                  {...sharedProps}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {import.meta.env.DEV && (
          <DevErrorBoundary>
            <DevModeOverlay activeTab={activeTab} setActiveTab={setActiveTab} />
          </DevErrorBoundary>
        )}
      </main>

      {/* Modern Academic Footer */}
      <footer className="border-t border-outline-variant/30 py-16 bg-surface-dim/20 mt-32">
        <div className="max-w-[1440px] mx-auto px-3 md:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6 text-on-surface-variant">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <SintiensLogo className="w-5 h-7 shrink-0" />
                <span className="text-technical-sm font-bold tracking-[0.2em]">Sintiens</span>
             </div>
             <p className="text-body-md opacity-70 max-w-xl">
               Un proyecto educativo dedicado a la deconstrucción moral y el análisis científico de la sintiencia.
             </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
