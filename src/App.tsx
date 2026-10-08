import { useState, useEffect, useRef, Suspense, lazy, useCallback } from "react";
import React from "react";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import SintiensLogo from "./components/SintiensLogo";
import type { TabType } from "./types";
import MiniTabNav from "./components/MiniTabNav";
import { isSameCategory } from "./data/sections";
import type { NodeDetail } from "./types";
import type { GlossaryEntry } from "./data/glossaryUnified";
import { GlobalGlows } from "./components/ui/AmbientGlow";
import { PAGE_SUB, PAGE_CAT } from "./styles/motionTokens";
import { useReducedMotion } from "./hooks/useReducedMotion";
import ThemeReveal from "./components/ThemeReveal";

const storyPromise = import("./components/StoryMode");
const glossaryPromise = import("./components/GlossaryExplorer");
const timelinePromise = import("./components/TimelineExplorer");
const excusesPromise = import("./components/ExcusesDilemmas");
const dataPromise = import("./components/DataSection");
const newsPromise = import("./components/NewsExplorer");
const labHubPromise = import("./components/LaboratorioHub");
const rawlsPromise = import("./components/RawlsianMachine");
const thermoPromise = import("./components/ThermodynamicMatrix");
const neuroPromise = import("./components/NeurobiologyViewer");
const nutriPromise = import("./components/NutriCompare");
const welfarePromise = import("./components/WelfarewashingScanner");
const aiValidatorPromise = import("./components/AiValidator");
const impactCalcPromise = import("./components/ImpactCalculator");

const StoryMode = lazy(() => storyPromise);
const GlossaryExplorer = lazy(() => glossaryPromise);
const TimelineExplorer = lazy(() => timelinePromise);
const ExcusesDilemmas = lazy(() => excusesPromise);
const ImpactCalculator = lazy(() => impactCalcPromise);
const AiValidator = lazy(() => aiValidatorPromise);
const DataSection = lazy(() => dataPromise);
const NewsExplorer = lazy(() => newsPromise);
const LaboratorioHub = lazy(() => labHubPromise);
const RawlsianMachine = lazy(() => rawlsPromise);
const ThermodynamicMatrix = lazy(() => thermoPromise);
const NeurobiologyViewer = lazy(() => neuroPromise);
const NutriCompare = lazy(() => nutriPromise);
const WelfarewashingScanner = lazy(() => welfarePromise);
const DevModeOverlay = lazy(() => import("./components/DevModeOverlay"));
const DevErrorBoundary = lazy(() => import("./components/DevErrorBoundary"));

import AppErrorBoundary from "./components/AppErrorBoundary";
import { PageSkeleton, HeroFixedNav } from "./components/ui/Shells";
import TabSeo from "./components/TabSeo";

function LazyTabWrapper({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <AppErrorBoundary>
      <Suspense fallback={fallback || <PageSkeleton />}>
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
  velo_rawls: "/laboratorio/velo-rawls",
  termodinamica: "/laboratorio/termodinamica",
  neurobiologia: "/laboratorio/neurobiologia",
  nutricion: "/laboratorio/nutricion",
  welfarewashing: "/laboratorio/welfarewashing",
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
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
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
    // Preservar query/hash: deep links de noticias (?id=) y de glosario (#glosario-<id>)
    const url = qs || hash ? `${base}${qs}${hash}` : base;
    window.history.replaceState(
      { tab: activeTab },
      "",
      url
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const isValidTab = (value: unknown): value is TabType =>
      typeof value === "string" && (Object.values(TAB_PATHS) as string[]).includes(value);
    const onPopState = (e: PopStateEvent) => {
      const fromState = e.state?.tab as unknown;
      const tab = isValidTab(fromState)
        ? fromState
        : getTabFromPath(window.location.pathname);
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

  const handleExitComplete = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const [coreNodes, setCoreNodes] = useState<NodeDetail[] | null>(null);
  const [glossaryData, setGlossaryData] = useState<{ GLOSSARY_BY_ID: Record<string, GlossaryEntry>; GLOSSARY_UNIFIED: GlossaryEntry[] } | null>(null);

  useEffect(() => {
    import("./data/CORE_NODES")
      .then(m => setCoreNodes(m.CORE_NODES))
      .catch(err => console.error("Failed to load CORE_NODES:", err));
    import("./data/glossaryUnified")
      .then(m => setGlossaryData({ GLOSSARY_BY_ID: m.GLOSSARY_BY_ID, GLOSSARY_UNIFIED: m.GLOSSARY_UNIFIED }))
      .catch(err => console.error("Failed to load glossary data:", err));

    // Precargar componentes principales en tiempo ocioso para navegación instantánea
    const prefetchTabs = () => {
      import("./components/StoryMode");
      import("./components/GlossaryExplorer");
      import("./components/TimelineExplorer");
      import("./components/ExcusesDilemmas");
      import("./components/NewsExplorer");
      import("./components/LaboratorioHub");
    };
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      (window as any).requestIdleCallback(prefetchTabs, { timeout: 1500 });
    } else {
      setTimeout(prefetchTabs, 400);
    }
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
    navFnRef.current(tab);
  }, []);

  const reduceMotion = useReducedMotion();
  const [reveal, setReveal] = useState<{ rect: DOMRect; nextTheme: "dark" | "light" } | null>(null);

  const handleToggleTheme = useCallback((rect?: DOMRect) => {
    const next = theme === "dark" ? "light" : "dark";

    // Respeta accesibilidad
    if (reduceMotion) {
      setTheme(next);
      return;
    }

    // Intento con View Transitions API (Chrome/Edge) — onda expansiva nativa, coste nulo
    const hasVT = typeof document !== "undefined" && "startViewTransition" in document;
    if (hasVT && rect) {
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      const maxR = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );
      document.documentElement.style.setProperty("--reveal-x", `${x}px`);
      document.documentElement.style.setProperty("--reveal-y", `${y}px`);
      document.documentElement.style.setProperty("--reveal-r", `${maxR}px`);
      const vt = document.startViewTransition(() => {
        setTheme(next);
      });
      // Limpieza por si el usuario cambia tamaño rápido
      vt?.finished?.finally(() => {
        // se deja --reveal-* para la próxima, no molesta
      });
      return;
    }

    // Fallback manual para Safari/Firefox — overlay con clip-path (1 div, GPU, 0.55s)
    if (rect) {
      setReveal({ rect, nextTheme: next });
      return;
    }

    setTheme(next);
  }, [theme, reduceMotion]);

  const handleRevealDone = useCallback(() => {
    if (!reveal) return;
    setTheme(reveal.nextTheme);
    setReveal(null);
  }, [reveal]);

  return (
    <MotionConfig reducedMotion="user">
    <div 
      style={{ 
        width: "calc(100% - var(--dev-sidebar-width, 0px))", 
        transition: "var(--dev-sidebar-transition, width 0.3s cubic-bezier(0.25, 1, 0.5, 1))" 
      }} 
      className="min-h-screen bg-background text-on-background font-sans selection:bg-primary selection:text-on-primary flex flex-col pb-0 transition-colors duration-500 relative"
    >
      {/* Skip-link accesible */}
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[500] focus:px-4 focus:py-2 focus:rounded-full focus:bg-primary focus:text-on-primary focus:text-sm"
      >
        Saltar al contenido
      </a>
      {/* SEO por tab: title/description/canonical/OG dinámicos */}
      <TabSeo tab={activeTab} />
      {/* Reveal fallback (Safari/Firefox) — se monta solo durante la animación */}
      {reveal && (
        <ThemeReveal rect={reveal.rect} nextTheme={reveal.nextTheme} onDone={handleRevealDone} />
      )}
      {/* Global ambient glows: absolute at top of page, scroll away naturally */}
      <GlobalGlows />

      {/* Menú persistente: vive en su apartado del hero y reaparece al subir */}
      <HeroFixedNav activeTab={activeTab}>
        <nav className="w-full max-w-full min-w-0" aria-label="Navegación principal">
          <MiniTabNav activeTab={activeTab} onNavigate={handleNavigate} theme={theme} onToggleTheme={handleToggleTheme} />
        </nav>
      </HeroFixedNav>

      {/* Main Content — noticias y datos: densidad visual optimizada, gutters limpios */}
      <main
        id="contenido"
        className={`flex-1 w-full mx-auto relative z-[1] ${
          activeTab === "noticias"
            ? "max-w-[1480px] px-2 sm:px-2 md:px-3 lg:px-3 py-12 lg:py-20"
            : activeTab === "datos"
            ? "max-w-[1520px] px-3 sm:px-5 md:px-7 lg:px-8 py-4 sm:py-6 lg:py-7"
            : "max-w-[1280px] px-4 md:px-6 lg:px-8 py-12 lg:py-20"
        }`}
      >

        <div className="min-h-[600px]">
          <AnimatePresence mode="wait" initial={false} onExitComplete={handleExitComplete}>
            <motion.div
              key={activeTab}
              initial={isSubTabNav ? PAGE_SUB.initial : PAGE_CAT.initial}
              animate={isSubTabNav ? PAGE_SUB.animate : PAGE_CAT.animate}
              exit={isSubTabNav ? PAGE_SUB.exit : PAGE_CAT.exit}
              className="w-full"
            >
              {activeTab === "historia_narrativa" && (
                <LazyTabWrapper>
                  <StoryMode />
                </LazyTabWrapper>
              )}
              {activeTab === "grafo" && (
                <LazyTabWrapper>
                  <GlossaryExplorer
                    initialEntryId={redirectEntryId}
                    onClearInitialEntryId={handleClearRedirectEntryId}
                    onNavigate={handleNavigate}
                  />
                </LazyTabWrapper>
              )}
              {activeTab === "cronologia" && (
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
                  <NewsExplorer onNavigate={handleNavigate} />
                </LazyTabWrapper>
              )}
              {activeTab === "laboratorio_hub" && (
                <LazyTabWrapper>
                  <LaboratorioHub onNavigate={handleNavigate} />
                </LazyTabWrapper>
              )}
              {activeTab === "velo_rawls" && (
                <LazyTabWrapper>
                  <RawlsianMachine onNavigateToTab={(tab: string) => handleNavigate(tab as TabType)} />
                </LazyTabWrapper>
              )}
              {activeTab === "termodinamica" && (
                <LazyTabWrapper>
                  <ThermodynamicMatrix onNavigateToTab={(tab: string) => handleNavigate(tab as TabType)} />
                </LazyTabWrapper>
              )}
              {activeTab === "neurobiologia" && (
                <LazyTabWrapper>
                  <NeurobiologyViewer onNavigateToTab={(tab: string) => handleNavigate(tab as TabType)} />
                </LazyTabWrapper>
              )}
              {activeTab === "nutricion" && (
                <LazyTabWrapper>
                  <NutriCompare onNavigateToTab={(tab: string) => handleNavigate(tab as TabType)} />
                </LazyTabWrapper>
              )}
              {activeTab === "welfarewashing" && (
                <LazyTabWrapper>
                  <WelfarewashingScanner onNavigateToTab={(tab: string) => handleNavigate(tab as TabType)} />
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
    </MotionConfig>
  );
}
