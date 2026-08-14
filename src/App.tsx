import { useState, useEffect, useRef, Suspense, lazy, useCallback } from "react";
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import SintiensLogo from "./components/SintiensLogo";
import type { TabType } from "./types";
import MiniTabNav from "./components/MiniTabNav";
import { isSameCategory } from "./data/sections";
import type { NodeDetail } from "./types";
import type { GlossaryEntry } from "./data/glossaryUnified";
import { GlobalGlows } from "./components/ui/AmbientGlow";

const StoryMode = lazy(() => import("./components/StoryMode"));
const GlossaryExplorer = lazy(() => import("./components/GlossaryExplorer"));
const TimelineExplorer = lazy(() => import("./components/TimelineExplorer"));
const ExcusesDilemmas = lazy(() => import("./components/ExcusesDilemmas"));
const ImpactCalculator = lazy(() => import("./components/ImpactCalculator"));
const AiValidator = lazy(() => import("./components/AiValidator"));
const DataSection = lazy(() => import("./components/DataSection"));
const NewsExplorer = lazy(() => import("./components/NewsExplorer"));
const LaboratorioHub = lazy(() => import("./components/LaboratorioHub"));
const DevModeOverlay = lazy(() => import("./components/DevModeOverlay"));
const DevErrorBoundary = lazy(() => import("./components/DevErrorBoundary"));

function LazyTabWrapper({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        fallback || (
          <div className="w-full flex items-center justify-center py-32">
            <div className="w-8 h-8 rounded-full border-2 border-outline-variant border-t-primary animate-spin" role="status" aria-label="Cargando sección" />
          </div>
        )
      }
    >
      {children}
    </Suspense>
  );
}

// Mapeo bidireccional entre IDs de pestaña y paths de URL.
// Se usa la History API del navegador para que los botones atrás/adelante
// naveguen entre pestañas y las URLs sean compartibles.
const TAB_PATHS: Record<TabType, string> = {
  historia_narrativa: "/",
  grafo: "/grafo",
  cronologia: "/cronologia",
  dialectica: "/dialectica",
  calculadora: "/calculadora",
  validador: "/validador",
  datos: "/datos",
  noticias: "/noticias",
  laboratorio_hub: "/laboratorio",
};
const PATH_TO_TAB: Record<string, TabType> = Object.fromEntries(
  Object.entries(TAB_PATHS).map(([k, v]) => [v, k as TabType])
);
const DEFAULT_TAB: TabType = "historia_narrativa";

function getTabFromPath(pathname: string): TabType {
  return PATH_TO_TAB[pathname] ?? DEFAULT_TAB;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>(() =>
    getTabFromPath(window.location.pathname)
  );
  const [passedArgument, setPassedArgument] = useState<string | null>(null);
  const [redirectEntryId, setRedirectEntryId] = useState<string | null>(null);
  const [theme, setTheme] = useState<"dark" | "light">(
    () => {
      try {
        const saved = localStorage.getItem("theme");
        if (saved === "light" || saved === "dark") return saved;
      } catch {
        /* almacenamiento no disponible: silencioso */
      }
      return "dark";
    }
  );

  const prevTabRef = useRef<TabType>(activeTab);
  const isSubTabNav = isSameCategory(prevTabRef.current, activeTab);

  useEffect(() => {
    prevTabRef.current = activeTab;
  }, [activeTab]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* almacenamiento no disponible: silencioso */
    }
  }, [theme]);

  const navigateToTab = (tab: TabType) => {
    if (tab === activeTab) return;
    window.history.pushState({ tab }, "", TAB_PATHS[tab]);
    setActiveTab(tab);
  };

  const navFnRef = useRef(navigateToTab);
  navFnRef.current = navigateToTab;

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
    window.history.replaceState(
      { tab: activeTab },
      "",
      TAB_PATHS[activeTab]
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onPopState = (e: PopStateEvent) => {
      const tab =
        (e.state?.tab as TabType | undefined) ??
        getTabFromPath(window.location.pathname);
      setActiveTab(tab);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const loader = document.querySelector(".instant-loader-container");
    if (loader) loader.remove();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        const tag = target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable) {
          return;
        }
      }
      if (e.altKey && e.key === "ArrowLeft") {
        e.preventDefault();
        window.history.back();
      } else if (e.altKey && e.key === "ArrowRight") {
        e.preventDefault();
        window.history.forward();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [activeTab]);

  const [coreNodes, setCoreNodes] = useState<NodeDetail[] | null>(null);
  const [glossaryData, setGlossaryData] = useState<{ GLOSSARY_BY_ID: Record<string, GlossaryEntry>; GLOSSARY_UNIFIED: GlossaryEntry[] } | null>(null);

  useEffect(() => {
    import("./data/CORE_NODES")
      .then(m => setCoreNodes(m.CORE_NODES))
      .catch(err => console.error("Failed to load CORE_NODES:", err));
    import("./data/glossaryUnified")
      .then(m => setGlossaryData({ GLOSSARY_BY_ID: m.GLOSSARY_BY_ID, GLOSSARY_UNIFIED: m.GLOSSARY_UNIFIED }))
      .catch(err => console.error("Failed to load glossary data:", err));
  }, []);

  const dilemmaExpandTimerRef = useRef<number | null>(null);
  useEffect(() => {
    if (!coreNodes || !glossaryData) return;
    
    const handleNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const targetId = customEvent.detail;
      if (!targetId) return;

      const isNode = coreNodes.some((n) => n.id === targetId);
      if (isNode) {
        const relatedGlossaryEntry = glossaryData.GLOSSARY_UNIFIED.find((entry: any) =>
          (entry.relatedNodes || []).includes(targetId)
        );
        if (relatedGlossaryEntry) {
          setRedirectEntryId(relatedGlossaryEntry.id);
        }
        navFnRef.current("grafo");
      } else {
        navFnRef.current("dialectica");
        if (dilemmaExpandTimerRef.current !== null) {
          window.clearTimeout(dilemmaExpandTimerRef.current);
        }
        dilemmaExpandTimerRef.current = window.setTimeout(() => {
          window.dispatchEvent(new CustomEvent("expand-dilemma", { detail: targetId }));
        }, 80);
      }
    };

    window.addEventListener("navigate-to-item", handleNavigate);
    return () => {
      window.removeEventListener("navigate-to-item", handleNavigate);
      if (dilemmaExpandTimerRef.current !== null) {
        window.clearTimeout(dilemmaExpandTimerRef.current);
      }
    };
  }, [coreNodes, glossaryData]);

  useEffect(() => {
    if (!glossaryData) return;
    
    const handleNavigateGlossary = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const targetId = customEvent.detail;
      if (!targetId) return;
      if (glossaryData.GLOSSARY_BY_ID[targetId]) {
        setRedirectEntryId(targetId);
        navFnRef.current("grafo");
      }
    };

    window.addEventListener("navigate-to-glossary", handleNavigateGlossary);
    return () => window.removeEventListener("navigate-to-glossary", handleNavigateGlossary);
  }, [glossaryData]);

  const handleDeconstructTrigger = (excuse: string) => {
    setPassedArgument(excuse);
    navigateToTab("validador");
  };

  const handleClearTrigger = () => {
    setPassedArgument(null);
  };

  const handleRedirectToConcept = (nodeId: string) => {
    const node = coreNodes?.find((n) => n.id === nodeId);
    const relatedGlossaryEntry = node && glossaryData?.GLOSSARY_UNIFIED.find((entry) =>
      (entry.relatedNodes || []).includes(nodeId)
    );
    const fallbackEntry = node && glossaryData?.GLOSSARY_UNIFIED.find((entry) =>
      entry.term.toLowerCase() === node.title.toLowerCase()
    );
    const entry = relatedGlossaryEntry ?? fallbackEntry;
    if (entry) {
      setRedirectEntryId(entry.id);
    }
    navigateToTab("grafo");
  };

  const handleClearRedirectEntryId = useCallback(() => {
    setRedirectEntryId(null);
  }, []);

  const handleNavigate = (tab: TabType) => {
    navigateToTab(tab);
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
      className="min-h-screen bg-background text-on-background font-sans selection:bg-primary selection:text-on-primary flex flex-col pb-0 transition-colors duration-500 relative"
    >
      {/* Global ambient glows: absolute at top of page, scroll away naturally */}
      <GlobalGlows />
      
      {/* Global Tab Navigation - Absolute positioned below the title (hero section) for continuous transitions */}
      <div className="absolute top-[480px] lg:top-[530px] left-0 w-full z-[200] flex justify-center pointer-events-none">
        <div className="w-full max-w-[1440px] px-3 md:px-8 lg:px-16 pointer-events-auto flex justify-center">
          <MiniTabNav activeTab={activeTab} onNavigate={handleNavigate} theme={theme} onToggleTheme={handleToggleTheme} />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-3 md:px-8 lg:px-16 py-12 lg:py-20 relative z-[1]">

        <div className="min-h-[600px]">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={activeTab}
              initial={isSubTabNav ? { opacity: 0, y: 6 } : { opacity: 0, y: 12, scale: 0.98 }}
              animate={isSubTabNav ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, scale: 1 }}
              exit={isSubTabNav ? { opacity: 0, y: -4 } : { opacity: 0, y: -8, scale: 0.99 }}
              transition={
                isSubTabNav
                  ? { duration: 0.18, ease: "easeOut" }
                  : { duration: 0.26, ease: [0.25, 1, 0.5, 1] as const }
              }
              className="w-full"
            >
              {activeTab === "historia_narrativa" && (
                <LazyTabWrapper>
                  <StoryMode {...sharedProps} />
                </LazyTabWrapper>
              )}
              {activeTab === "grafo" && glossaryData && (
                <LazyTabWrapper>
                  <GlossaryExplorer
                    initialEntryId={redirectEntryId}
                    onClearInitialEntryId={handleClearRedirectEntryId}
                    {...sharedProps}
                  />
                </LazyTabWrapper>
              )}
              {activeTab === "cronologia" && coreNodes && (
                <LazyTabWrapper>
                  <TimelineExplorer
                    onRedirectToConcept={handleRedirectToConcept}
                    {...sharedProps}
                  />
                </LazyTabWrapper>
              )}
              {activeTab === "dialectica" && (
                <LazyTabWrapper>
                  <ExcusesDilemmas
                    onAnalyzeTrigger={handleDeconstructTrigger}
                    {...sharedProps}
                  />
                </LazyTabWrapper>
              )}
              {activeTab === "calculadora" && (
                <LazyTabWrapper>
                  <ImpactCalculator {...sharedProps} />
                </LazyTabWrapper>
              )}
              {activeTab === "datos" && (
                <LazyTabWrapper>
                  <DataSection {...sharedProps} />
                </LazyTabWrapper>
              )}
              {activeTab === "validador" && (
                <LazyTabWrapper>
                  <AiValidator
                    argumentToAnalyze={passedArgument}
                    clearArgument={handleClearTrigger}
                    {...sharedProps}
                  />
                </LazyTabWrapper>
              )}
              {activeTab === "noticias" && (
                <LazyTabWrapper>
                  <NewsExplorer {...sharedProps} />
                </LazyTabWrapper>
              )}
              {activeTab === "laboratorio_hub" && (
                <LazyTabWrapper>
                  <LaboratorioHub {...sharedProps} />
                </LazyTabWrapper>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {import.meta.env.DEV && coreNodes && glossaryData && (
          <LazyTabWrapper>
            <DevErrorBoundary>
              <DevModeOverlay activeTab={activeTab} setActiveTab={navigateToTab} />
            </DevErrorBoundary>
          </LazyTabWrapper>
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
