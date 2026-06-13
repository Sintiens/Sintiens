import { useState, useEffect } from "react";
import { 
  Sun,
  Moon,
} from "lucide-react";
import ConceptExplorer from "./components/ConceptExplorer";
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
import { Button } from "./components/ui/Button";

type TabType = "historia_narrativa" | "grafo" | "cronologia" | "dialectica" | "calculadora" | "validador" | "datos";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("historia_narrativa");
  const [passedArgument, setPassedArgument] = useState<string | null>(null);
  const [redirectNodeId, setRedirectNodeId] = useState<string | null>(null);
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
    const handleNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const targetId = customEvent.detail;
      if (!targetId) return;

      const isNode = CORE_NODES.some((n) => n.id === targetId);
      if (isNode) {
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

  return (
    <div 
      style={{ 
        width: "calc(100% - var(--dev-sidebar-width, 0px))", 
        transition: "var(--dev-sidebar-transition, width 0.3s cubic-bezier(0.25, 1, 0.5, 1))" 
      }} 
      className="min-h-screen bg-background text-on-background font-sans selection:bg-primary selection:text-on-primary flex flex-col transition-colors duration-500 pb-0"
    >
      
      {/* Sticky Header — only on deep-dive tabs */}
      {activeTab !== "historia_narrativa" && (
        <header className="bg-background/80 backdrop-blur-xl sticky top-0 z-50 border-b border-outline-variant/20 py-3">
          <div className="max-w-[1440px] mx-auto px-3 md:px-8 lg:px-16 flex items-center justify-between gap-6">
            
            {/* Logo (minimal) */}
            <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => setActiveTab("historia_narrativa")}>
              <SintiensLogo className="w-7 h-10 shrink-0" animated />
              <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase">Sintiens</span>
            </div>

            {/* Nav links — same style as homepage panel */}
            <nav className="flex items-center gap-1">
                {([
                  { id: "historia_narrativa", label: "El Relato" },
                  { id: "grafo", label: "Ontología" },
                  { id: "cronologia", label: "Historia" },
                  { id: "dialectica", label: "Tesis" },
                  { id: "calculadora", label: "Impacto" },
                  { id: "datos", label: "Evidencia" },
                  { id: "validador", label: "IA" },
                ] as { id: TabType; label: string }[]).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-md text-[11px] uppercase font-mono tracking-widest transition-all duration-300 ${
                      activeTab === tab.id
                        ? "text-primary font-bold"
                        : "text-on-surface-variant hover:text-primary"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-9 h-9 p-0 rounded-full hover:bg-surface-dim shrink-0"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>

          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-3 md:px-8 lg:px-16 py-12 lg:py-20 relative">
        
        {/* Intro Section - Removed from individual tabs, now handled by StoryMode or minimal headers */}
        
        {/* Back to Story Button for deep dives */}
        <AnimatePresence>
          {activeTab !== "historia_narrativa" && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <Button 
                onClick={() => setActiveTab("historia_narrativa")}
                variant="ghost" 
                className="text-on-surface-variant hover:text-on-surface pl-0 gap-2"
              >
                ← Volver al Relato
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

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
                <StoryMode onNavigate={(tab) => setActiveTab(tab)} />
              )}
              {activeTab === "grafo" && (
                <ConceptExplorer 
                  initialNodeId={redirectNodeId} 
                  onClearInitialNodeId={() => setRedirectNodeId(null)} 
                />
              )}
              {activeTab === "cronologia" && (
                <TimelineExplorer onRedirectToConcept={handleRedirectToConcept} />
              )}
              {activeTab === "dialectica" && (
                <ExcusesDilemmas onAnalyzeTrigger={handleDeconstructTrigger} />
              )}
              {activeTab === "calculadora" && (
                <ImpactCalculator />
              )}
              {activeTab === "datos" && (
                <DataSection />
              )}
              {activeTab === "validador" && (
                <AiValidator argumentToAnalyze={passedArgument} clearArgument={handleClearTrigger} />
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
