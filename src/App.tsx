// Sintiens — ¿Qué vidas importan? — Premium Ethical & Bioethical Portal
import { useState, useEffect } from "react";
import { 
  Compass, 
  Layers, 
  Activity, 
  HelpCircle, 
  Scale, 
  Leaf, 
  Flame, 
  Network, 
  Sparkles, 

  ChevronRight,
  TrendingDown,
  Info,
  Sun,
  Moon,
  Clock,
  History,
  Check,
  X
} from "lucide-react";
import ConceptExplorer from "./components/ConceptExplorer";
import TimelineExplorer from "./components/TimelineExplorer";
import ExcusesDilemmas from "./components/ExcusesDilemmas";
import ImpactCalculator from "./components/ImpactCalculator";
import AiValidator from "./components/AiValidator";
import SocraticReflection from "./components/SocraticReflection";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { CORE_NODES } from "./types";
import DevModeOverlay from "./components/DevModeOverlay";
import DevErrorBoundary from "./components/DevErrorBoundary";
import SintiensLogo from "./components/SintiensLogo";


type TabType = "grafo" | "cronologia" | "dialectica" | "calculadora" | "validador";

const NAV_TABS: { id: TabType; label: string }[] = [
  { id: "grafo", label: "Conceptos" },
  { id: "cronologia", label: "Cronología" },
  { id: "dialectica", label: "Tesis & Dilemas" },
  { id: "calculadora", label: "El Cuantificador" },
  { id: "validador", label: "Sintiens IA" }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("grafo");
  const [passedArgument, setPassedArgument] = useState<string | null>(null);
  const [redirectNodeId, setRedirectNodeId] = useState<string | null>(null);
  
  // Hero Header State
  const { scrollY } = useScroll();
  const [showStickyNav, setShowStickyNav] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const threshold = typeof window !== "undefined" ? window.innerHeight * 0.6 : 500;
    setShowStickyNav(latest > threshold);
  });
  
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    // Default to dark for premium bioethical vibe
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
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-800 dark:text-zinc-200 selection:bg-zinc-200 dark:selection:bg-zinc-800 selection:text-zinc-900 dark:selection:text-white flex flex-col justify-between transition-colors duration-300 pb-24 md:pb-0 dev-sidebar-resizer">


      {/* Dynamic Upper Ambient Border Glow */}
      <div className="absolute top-0 left-0 right-0 h-[450px] bg-radial from-emerald-900/5 dark:from-emerald-950/15 via-transparent to-transparent pointer-events-none z-0" />

      {/* Hero Section (Portada) */}
      <section className="relative min-h-[95vh] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-between z-10">
        
        {/* Top Bar (Logo + Sintiens) */}
        <div className="flex justify-between items-start w-full">
          <SintiensLogo className="w-20 h-28 md:w-32 md:h-44 shrink-0" animated />
          <div className="flex flex-col items-end gap-6 pt-2">
            <h1 className="text-xl md:text-2xl font-black text-zinc-900 dark:text-white tracking-[0.4em] font-mono uppercase">
              Sintiens
            </h1>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm text-zinc-600 dark:text-zinc-300 hover:bg-white dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white border border-zinc-200/50 dark:border-zinc-800/50 transition-all cursor-pointer flex items-center justify-center"
              title={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-violet-600" />
              )}
            </button>
          </div>
        </div>

        {/* Center Content (Title + Abstract) */}
        <div className="flex flex-col items-center justify-center flex-grow py-12 md:py-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight mb-6 font-sans"
          >
            ¿Qué vidas importan?
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-2xl text-zinc-600 dark:text-zinc-400 font-medium max-w-3xl mb-16 leading-relaxed"
          >
            Un análisis crítico sobre nuestra relación con los animales, el impacto ambiental y los axiomas morales que la definen.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200/60 dark:border-zinc-800/60 p-6 md:p-10 rounded-2xl max-w-4xl text-left shadow-2xl shadow-zinc-200/20 dark:shadow-black/30"
          >
            <p className="text-sm md:text-base lg:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed font-serif text-justify">
              <span className="font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest text-xs md:text-sm block mb-3">Abstract</span>
              Este proyecto explora la intersección entre la neurobiología evolutiva y la ética contemporánea, deconstruyendo los sesgos antropocéntricos para ofrecer un marco de empatía fundamentado en la evidencia científica. A través del análisis dialéctico y herramientas interactivas, invitamos a una reflexión profunda sobre nuestra responsabilidad moral hacia el resto de los seres sintientes.
            </p>
          </motion.div>
        </div>

        {/* Bottom Navigation */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full flex flex-col items-center gap-8 pb-8"
        >
          <nav className="flex flex-wrap justify-center gap-3 md:gap-4">
            {NAV_TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  // Auto-scroll slightly past the hero
                  window.scrollTo({ top: window.innerHeight * 0.75, behavior: "smooth" });
                }}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold tracking-tight transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-lg scale-105"
                    : "bg-white/60 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 hover:bg-white dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-sm shadow-sm"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          
          <div className="animate-bounce text-zinc-400 dark:text-zinc-600 mt-4">
            <ChevronRight className="w-6 h-6 rotate-90" />
          </div>
        </motion.div>
      </section>

      {/* Sticky Navigation (Appears on scroll) */}
      <AnimatePresence>
        {showStickyNav && (
          <motion.header 
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-900 shadow-sm"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
              
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                <SintiensLogo className="w-8 h-11" animated />
                <span className="text-sm font-black text-zinc-900 dark:text-white tracking-widest font-mono uppercase hidden sm:block">
                  Sintiens
                </span>
              </div>

              <div className="flex items-center gap-3">
                <nav className="hidden md:flex space-x-1 bg-zinc-100 dark:bg-zinc-900/60 p-1 rounded-xl border border-zinc-200 dark:border-zinc-900">
                  {NAV_TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium tracking-tight transition-all duration-200 cursor-pointer ${
                        activeTab === tab.id
                          ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm border border-zinc-200/50 dark:border-transparent"
                          : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200/50 dark:hover:bg-zinc-900/50"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>

                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white border border-zinc-200 dark:border-zinc-800 transition-all cursor-pointer flex items-center justify-center"
                  title={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
                >
                  {theme === "dark" ? (
                    <motion.div initial={{ rotate: -30 }} animate={{ rotate: 0 }} transition={{ duration: 0.25 }}>
                      <Sun className="w-4 h-4 text-amber-400" />
                    </motion.div>
                  ) : (
                    <motion.div initial={{ rotate: 30 }} animate={{ rotate: 0 }} transition={{ duration: 0.25 }}>
                      <Moon className="w-4 h-4 text-violet-600" />
                    </motion.div>
                  )}
                </button>
              </div>

            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Main core layout wrapper */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative z-10 space-y-12">
        <AnimatePresence mode="wait">
          {activeTab === "grafo" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6 max-w-4xl w-full"
              key="welcome-grafo"
            >
              <SocraticReflection />
            </motion.div>
          )}

          {activeTab === "cronologia" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4 max-w-4xl"
              key="welcome-cronologia"
            >
              <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight">
                La Brecha del Progreso
              </h2>
              <p className="text-zinc-650 dark:text-zinc-400 text-sm md:text-base font-light leading-relaxed max-w-3xl">
                Explora la evolución de la instrumentalización animal y el retraso histórico de la moral humana
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selected View Space */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            {activeTab === "grafo" && (
              <motion.div
                key="grafo"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="w-full"
              >
                <ConceptExplorer 
                  initialNodeId={redirectNodeId} 
                  onClearInitialNodeId={() => setRedirectNodeId(null)} 
                />
              </motion.div>
            )}

            {activeTab === "cronologia" && (
              <motion.div
                key="cronologia"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="w-full"
              >
                <TimelineExplorer onRedirectToConcept={handleRedirectToConcept} />
              </motion.div>
            )}

            {activeTab === "dialectica" && (
              <motion.div
                key="dialectica"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="w-full"
              >
                <ExcusesDilemmas onAnalyzeTrigger={handleDeconstructTrigger} />
              </motion.div>
            )}

            {activeTab === "calculadora" && (
              <motion.div
                key="calculadora"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="w-full"
              >
                <ImpactCalculator />
              </motion.div>
            )}

            {activeTab === "validador" && (
              <motion.div
                key="validador"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="w-full"
              >
                <AiValidator argumentToAnalyze={passedArgument} clearArgument={handleClearTrigger} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic Static Information Segment */}
        {activeTab === "grafo" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="bg-white dark:bg-zinc-950 p-6 border border-zinc-200 dark:border-zinc-900 rounded-2xl space-y-2 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1 px-2 rounded bg-red-500/10 border border-red-500/20 text-[10px] font-mono text-red-500 dark:text-red-400 font-bold">1</span>
                <span className="font-bold text-zinc-900 dark:text-white text-xs">Mapeo Sintiente</span>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs font-light leading-relaxed">
                Investiga la neurobiología del dolor físico consciente, la Declaración de Cambridge sobre la Conciencia y la deconstrucción de la frontera vegetal.
              </p>
            </div>
            <div className="bg-white dark:bg-zinc-950 p-6 border border-zinc-200 dark:border-zinc-900 rounded-2xl space-y-2 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1 px-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono text-emerald-500 dark:text-emerald-400 font-bold">2</span>
                <span className="font-bold text-zinc-900 dark:text-white text-xs">Desgaste Biosférico</span>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs font-light leading-relaxed">
                Analiza la ineficiencia termodinámica del filtrado calórico a través del ganado, el forzamiento del metano y la deforestación de hábitats silvestres colaterales.
              </p>
            </div>
            <div className="bg-white dark:bg-zinc-950 p-6 border border-zinc-200 dark:border-zinc-900 rounded-2xl space-y-2 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <span className="p-1 px-2 rounded bg-purple-500/10 border border-purple-500/20 text-[10px] font-mono text-purple-600 dark:text-purple-400 font-bold">3</span>
                <span className="font-bold text-zinc-900 dark:text-white text-xs">Justicia y Deconstrucción</span>
              </div>
              <p className="text-zinc-500 dark:text-zinc-400 text-xs font-light leading-relaxed">
                Explora el especismo, los derechos de los animales y el veganismo como imperativos de consistencia ética frente a excusas culturales tradicionales.
              </p>
            </div>
          </div>
        )}

        {import.meta.env.DEV && (
          <DevErrorBoundary>
            <DevModeOverlay activeTab={activeTab} setActiveTab={setActiveTab} />
          </DevErrorBoundary>
        )}
      </main>

      {/* Simple, descriptive minimal footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-900/60 py-6 mt-16 bg-white dark:bg-zinc-950 transition-colors">
        <div id="footer-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-mono text-zinc-500 dark:text-zinc-600">
          <div className="flex items-center gap-2">
            <SintiensLogo className="w-4 h-4 opacity-60" />
            <span>Sintiens es un proyecto educativo de libre deconstrucción moral.</span>
          </div>
          <div>
            <span>Nutrido socráticamente con neurobiología y física de ecosistemas.</span>
          </div>
        </div>
      </footer>

      {/* Floating Sticky Bottom Mobile Navigation Bar */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-[400px] bg-white/80 dark:bg-zinc-950/85 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-900/80 p-2 rounded-2xl flex items-center justify-around shadow-2xl transition-all duration-300">
        {(
          [
            { id: "grafo", label: "Conceptos", icon: Network },
            { id: "cronologia", label: "Historia", icon: Clock },
            { id: "dialectica", label: "Tesis", icon: Scale },
            { id: "calculadora", label: "Impacto", icon: Activity },
            { id: "validador", label: "Sintiens IA", icon: Sparkles }
          ] as { id: TabType; label: string; icon: any }[]
        ).map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 py-1.5 px-3 rounded-xl transition-all duration-200 relative cursor-pointer ${
                isActive
                  ? "text-zinc-950 dark:text-white"
                  : "text-zinc-400 dark:text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeBottomTabGlow"
                  className="absolute inset-0 bg-zinc-100 dark:bg-zinc-900 rounded-xl -z-10 border border-zinc-200/30 dark:border-zinc-850"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon className={`w-4 h-4 transition-transform duration-200 ${isActive ? "scale-110" : ""}`} />
              <span className="text-[9px] font-mono tracking-tight font-bold">{tab.label}</span>
            </button>
          );
        })}
      </div>


    </div>
  );
}


