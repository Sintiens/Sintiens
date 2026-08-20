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
import { PAGE_SUB, PAGE_CAT } from "./styles/motionTokens";

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

import AppErrorBoundary from "./components/AppErrorBoundary";

function LazyTabWrapper({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <AppErrorBoundary>
      <Suspense
        fallback={
          fallback || (
            <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-12 space-y-4" aria-label="Cargando sección" role="status">
              <div className="h-8 w-48 rounded-full bg-surface-dim/40 animate-pulse" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
                {[0,1,2].map((i) => (
                  <div key={i} className="glass-enhance rounded-2xl p-6 space-y-3 border border-outline-variant/15 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none relative animate-pulse">
                    <div className="h-4 w-24 rounded-full bg-surface-dim/60" />
                    <div className="h-6 w-full rounded-lg bg-surface-dim/40" />
                    <div className="h-20 w-full rounded-xl bg-surface-dim/30" />
                  </div>
                ))}
              </div>
            </div>
          )
        }
      >
        {children}
      </Suspense>
    </AppErrorBoundary>
  );
}

// Mapeo bidireccional entre IDs de pestaña y paths de URL.
// Se usa la History API del navegador para que los botones atrás/adelante
// naveguen entre pestañas y las URLs sean compartibles.
const TAB_PATHS: Record<TabType, string> = {
  historia_narrativa: "/",
  grafo: "/glosario",
  cronologia: "/argumento/cronologia",
  dialectica: "/argumento/critica",
  calculadora: "/laboratorio/impacto",
  validador: "/laboratorio/descomponer",
  datos: "/argumento/cifras",
  noticias: "/noticias",
  laboratorio_hub: "/laboratorio",
};

const EXTRA_PATH_MAP: Record<string, TabType> = {
  "/grafo": "grafo",
  "/cronologia": "cronologia",
  "/dialectica": "dialectica",
  "/calculadora": "calculadora",
  "/validador": "validador",
  "/datos": "datos",
  "/argumento": "historia_narrativa",
  "/argumento/relato": "historia_narrativa",
};

const PATH_TO_TAB: Record<string, TabType> = {
  ...Object.fromEntries(
    Object.entries(TAB_PATHS).map(([k, v]) => [v, k as TabType])
  ),
  ...EXTRA_PATH_MAP,
};
const DEFAULT_TAB: TabType = "historia_narrativa";

function getTabFromPath(pathname: string): TabType {
  const cleanPath = pathname.replace(/\/+$/, "") || "/";
  return PATH_TO_TAB[cleanPath] ?? DEFAULT_TAB;
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
  // Cálculo sincrónico — evita 1 frame de clasificación errónea
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
    // Guardar filtros de noticias al salir para restaurarlos al volver
    if (activeTab === "noticias") {
      try {
        const qsHash = window.location.search + window.location.hash;
        if (qsHash) sessionStorage.setItem("sintiens_noticias_qs", qsHash);
        else sessionStorage.removeItem("sintiens_noticias_qs");
      } catch {}
    }
    let targetUrl = TAB_PATHS[tab];
    if (tab === "noticias") {
      try {
        const saved = sessionStorage.getItem("sintiens_noticias_qs");
        if (saved) targetUrl += saved;
      } catch {}
    }
    window.history.pushState({ tab }, "", targetUrl);
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
    const qs = window.location.search;
    const hash = window.location.hash;
    const base = TAB_PATHS[activeTab];
    // Preservar query/hash solo para noticias (deep linking con ?id= o filtros)
    const url = activeTab === "noticias" && (qs || hash) ? `${base}${qs}${hash}` : base;
    window.history.replaceState(
      { tab: activeTab },
      "",
      url
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
    // Sub-tabs: sin scroll brusco (conserva posición), cambio de categoría: smooth top
    if (isSubTabNav) return;
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [activeTab, isSubTabNav]);

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

  const handleNavigate = useCallback((tab: TabType) => {
    navigateToTab(tab);
  }, [activeTab]);

  const handleToggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

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
      
      {/* Global Tab Navigation — centrado con mismo sistema que main (1280 max-w) */}
      <div className="absolute top-[480px] lg:top-[530px] left-0 w-full z-[200] flex justify-center pointer-events-none">
        <div className="w-full max-w-[1280px] px-4 md:px-8 lg:px-8 pointer-events-auto flex justify-center">
          <MiniTabNav activeTab={activeTab} onNavigate={handleNavigate} theme={theme} onToggleTheme={handleToggleTheme} />
        </div>
      </div>

      {/* Main Content — noticias: ultra-densidad, gutters mínimos */}
      <main className={`flex-1 w-full mx-auto py-12 lg:py-20 relative z-[1] ${activeTab === "noticias" ? "max-w-[1480px] px-2 sm:px-2 md:px-3 lg:px-3" : "max-w-[1280px] px-4 md:px-6 lg:px-8"}`}>

        <div className="min-h-[600px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeTab}
              initial={isSubTabNav ? PAGE_SUB.initial : PAGE_CAT.initial}
              animate={isSubTabNav ? PAGE_SUB.animate : PAGE_CAT.animate}
              exit={isSubTabNav ? PAGE_SUB.exit : PAGE_CAT.exit}
              transition={isSubTabNav ? PAGE_SUB.transition : PAGE_CAT.transition}
              className="w-full will-change-transform"
            >
              {activeTab === "historia_narrativa" && (
                <LazyTabWrapper>
                  <StoryMode />
                </LazyTabWrapper>
              )}
              {activeTab === "grafo" && glossaryData && (
                <LazyTabWrapper>
                  <GlossaryExplorer
                    initialEntryId={redirectEntryId}
                    onClearInitialEntryId={handleClearRedirectEntryId}
                    onNavigate={handleNavigate}
                  />
                </LazyTabWrapper>
              )}
              {activeTab === "cronologia" && coreNodes && (
                <LazyTabWrapper>
                  <TimelineExplorer onRedirectToConcept={handleRedirectToConcept} />
                </LazyTabWrapper>
              )}
              {activeTab === "dialectica" && (
                <LazyTabWrapper>
                  <ExcusesDilemmas onAnalyzeTrigger={handleDeconstructTrigger} />
                </LazyTabWrapper>
              )}
              {activeTab === "calculadora" && (
                <LazyTabWrapper>
                  <ImpactCalculator />
                </LazyTabWrapper>
              )}
              {activeTab === "datos" && (
                <LazyTabWrapper>
                  <DataSection />
                </LazyTabWrapper>
              )}
              {activeTab === "validador" && (
                <LazyTabWrapper>
                  <AiValidator
                    argumentToAnalyze={passedArgument}
                    clearArgument={handleClearTrigger}
                  />
                </LazyTabWrapper>
              )}
              {activeTab === "noticias" && (
                <LazyTabWrapper>
                  <NewsExplorer />
                </LazyTabWrapper>
              )}
              {activeTab === "laboratorio_hub" && (
                <LazyTabWrapper>
                  <LaboratorioHub onNavigate={handleNavigate} />
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
      <footer className="border-t border-outline-variant/20 py-16 bg-surface-dim/20 mt-32">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-on-surface-variant">
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
