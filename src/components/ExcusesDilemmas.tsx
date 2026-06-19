import React, { useState, useEffect } from "react";
import { DILEMMAS_DATA, ConsensusType } from "../types";
import { 
  Compass, 
  Search, 
  Activity, 
  Globe, 
  BookOpen, 
  Scale, 
  HelpCircle, 
  ChevronRight, 
  Terminal, 
  ShieldAlert, 
  Brain,
  Sparkles,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Info
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import TextRenderer from "./TextRenderer";
import { Button } from "./ui/Button";
import { Card, CardContent } from "./ui/Card";
import { PageGlows } from "./ui/AmbientGlow";
import TabNav, { TabType } from "./TabNav";

interface ExcusesDilemmasProps {
  onAnalyzeTrigger: (excuseText: string) => void;
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

const chapterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] } 
  })
};

const CATEGORY_OPTIONS: { id: string; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "Todas", icon: null },
  { id: "sintiencia", label: "Sintiencia", icon: <Activity className="w-3.5 h-3.5" /> },
  { id: "etica", label: "Ética", icon: <Scale className="w-3.5 h-3.5" /> },
  { id: "sistemas_uso", label: "Sistemas de Uso", icon: <Info className="w-3.5 h-3.5" /> },
  { id: "ecologia", label: "Ecología", icon: <Globe className="w-3.5 h-3.5" /> }
];

const CONSENSUS_OPTIONS: { id: string; label: string }[] = [
  { id: "all", label: "Todas" },
  { id: "CONSENSO", label: "Consenso" },
  { id: "DILEMA", label: "Dilema" },
  { id: "ESCENARIO_GRIS", label: "Área Gris" },
  { id: "FALACIA", label: "Falacia" }
];

function getCategoryLabel(id: string): string {
  return CATEGORY_OPTIONS.find(o => o.id === id)?.label ?? id;
}

function getConsensusLabel(id: string): string {
  return CONSENSUS_OPTIONS.find(o => o.id === id)?.label ?? id;
}

function getConsensusColor(consensus: ConsensusType) {
  switch (consensus) {
    case "CONSENSO":
      return "text-link bg-link/5 border-link/20";
    case "DILEMA":
      return "text-amber-600 bg-amber-500/5 border-amber-500/20";
    case "ESCENARIO_GRIS":
      return "text-purple-600 bg-purple-500/5 border-purple-500/20";
    case "FALACIA":
      return "text-red-600 bg-red-500/5 border-red-500/20";
    default:
      return "text-on-surface-variant bg-surface-dim border-outline-variant/30";
  }
}

function getConsensusIcon(consensus: ConsensusType) {
  switch (consensus) {
    case "CONSENSO":
      return "◈";
    case "DILEMA":
      return "◇";
    case "ESCENARIO_GRIS":
      return "○";
    case "FALACIA":
      return "△";
    default:
      return "·";
  }
}

function getCategoryIconByString(cat: string) {
  switch (cat) {
    case "sintiencia":
      return <Activity className="w-3.5 h-3.5" />;
    case "ecologia":
      return <Globe className="w-3.5 h-3.5" />;
    case "sistemas_uso":
       return <Info className="w-3.5 h-3.5" />;
    case "etica":
      return <Scale className="w-3.5 h-3.5" />;
    default:
      return <HelpCircle className="w-3.5 h-3.5" />;
  }
}

export default function ExcusesDilemmas({ onAnalyzeTrigger, activeTab, onNavigate, theme, onToggleTheme }: ExcusesDilemmasProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedConsensus, setSelectedConsensus] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isBibliographyOpen, setIsBibliographyOpen] = useState(false);

  useEffect(() => {
    setIsBibliographyOpen(false);
  }, [expandedId]);

  useEffect(() => {
    const handleExpand = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const dilemmaId = customEvent.detail;
      if (!dilemmaId) return;

      const exists = DILEMMAS_DATA.some(d => d.id === dilemmaId);
      if (exists) {
        setExpandedId(dilemmaId);
        setSearchQuery("");
        setSelectedCategory("all");
        setSelectedConsensus("all");
        
        setTimeout(() => {
          const el = document.getElementById("excuses-dialectic-view");
          if (el) {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    };
    window.addEventListener("expand-dilemma", handleExpand);
    return () => window.removeEventListener("expand-dilemma", handleExpand);
  }, []);

  const filteredDilemmas = DILEMMAS_DATA.filter((dilemma) => {
    const matchesSearch =
      dilemma.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dilemma.popularStatement.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || dilemma.category === selectedCategory;
    const matchesConsensus = selectedConsensus === "all" || dilemma.consensus === selectedConsensus;
    return matchesSearch && matchesCategory && matchesConsensus;
  });

  return (
    <motion.section
      id="excuses-dialectic-view"
      variants={chapterVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="space-y-10 w-full relative"
    >
      <PageGlows />

      <div className="relative z-10 space-y-3 border-b border-outline-variant/20 pb-8">
        <span className="text-[10px] font-mono font-bold text-primary select-none tracking-[0.25em] uppercase block opacity-60">
          [ TESIS ]
        </span>
        <h3 className="text-display-md text-on-surface">
          Dialéctica<span className="text-secondary/60 font-light"> · Socrática</span>
        </h3>
        <p className="text-body-md text-on-surface-variant max-w-2xl">
          Análisis crítico de las justificaciones antropocéntricas a través del tamiz de la evidencia científica y la consistencia ética.
        </p>
      </div>

      <div className="glass-enhance border border-outline-variant/30 rounded-2xl p-6 space-y-6 relative z-10 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar justificación popular..."
            className="w-full bg-surface-dim/30 border border-outline-variant/30 focus:border-primary rounded-lg px-12 py-3 text-body-md outline-none transition-all"
          />
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex bg-surface-dim/40 p-1 rounded-lg border border-outline-variant/20 flex-wrap">
            {CATEGORY_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedCategory(opt.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md text-[9px] font-mono uppercase tracking-widest transition-all duration-300 ${
                  selectedCategory === opt.id
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
          <div className="flex bg-surface-dim/40 p-1 rounded-lg border border-outline-variant/20 flex-wrap">
            {CONSENSUS_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedConsensus(opt.id)}
                className={`px-3.5 py-2 rounded-md text-[9px] font-mono uppercase tracking-widest transition-all duration-300 ${
                  selectedConsensus === opt.id
                    ? "bg-secondary text-on-secondary shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full py-4">
        <TabNav activeTab={activeTab} onNavigate={onNavigate} theme={theme} onToggleTheme={onToggleTheme} />
      </div>

      <div className="glass-enhance border border-outline-variant/30 rounded-2xl p-6 space-y-6 relative z-10 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none">
        
        <div className="lg:col-span-7 space-y-6">
          {filteredDilemmas.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center space-y-4 border border-dashed border-outline-variant/30 rounded-xl bg-surface-dim/10"
            >
              <HelpCircle className="w-10 h-10 text-on-surface-variant/20 mx-auto" />
              <p className="text-technical-xs uppercase tracking-widest text-on-surface-variant/40">Sin correspondencias dialécticas</p>
              <p className="text-xs text-on-surface-variant/30 max-w-xs mx-auto leading-relaxed">
                Intenta ajustar los filtros o modifica tu búsqueda.
              </p>
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredDilemmas.map((dilemma, index) => (
                <motion.div
                  key={dilemma.id}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={index}
                >
                  <Card
                    variant={expandedId === dilemma.id ? "solid" : "outline"}
                    onClick={() => setExpandedId(expandedId === dilemma.id ? null : dilemma.id)}
                    className={`group cursor-pointer transition-all duration-500 hover:border-primary ${
                      expandedId === dilemma.id
                        ? "border-primary bg-primary/[0.03]"
                        : "hover:bg-surface-dim/10"
                    }`}
                  >
                    <CardContent className="p-8 space-y-5">
                       <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                           <div className="p-1.5 bg-surface-dim rounded-sm">
                             {getCategoryIconByString(dilemma.category)}
                           </div>
                           <span className="text-[10px] font-mono tracking-widest uppercase text-on-surface-variant">
                             {getCategoryLabel(dilemma.category)}
                           </span>
                         </div>
                         <span className={`text-[9px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-sm ${getConsensusColor(dilemma.consensus)}`}>
                           <span className="mr-1 opacity-60">{getConsensusIcon(dilemma.consensus)}</span>
                           {getConsensusLabel(dilemma.consensus)}
                         </span>
                       </div>

                       <h3 className="text-display-md !text-xl leading-tight group-hover:text-primary transition-colors">
                          {dilemma.title}
                       </h3>

                       <blockquote className="text-body-md text-on-surface-variant/60 italic border-l-2 border-outline-variant/30 pl-6 leading-relaxed py-1">
                          "{dilemma.popularStatement}"
                       </blockquote>

                       <AnimatePresence>
                         {expandedId === dilemma.id && (
                           <motion.div
                             initial={{ height: 0, opacity: 0 }}
                             animate={{ height: "auto", opacity: 1 }}
                             exit={{ height: 0, opacity: 0 }}
                             className="overflow-hidden"
                             onClick={(e) => e.stopPropagation()}
                           >
                             <div className="lg:hidden space-y-8 pt-10 mt-6 border-t border-outline-variant/20">
                               <DeconstructionDetail dilemma={dilemma} onAnalyze={onAnalyzeTrigger} isBibliographyOpen={isBibliographyOpen} setIsBibliographyOpen={setIsBibliographyOpen} />
                             </div>
                             <div className="hidden lg:flex pt-6 mt-6 border-t border-outline-variant/20 justify-end">
                               <span className="text-[10px] font-mono text-primary uppercase tracking-widest flex items-center gap-2">
                                 Ver análisis detallado en panel lateral <ChevronRight className="w-3 h-3" />
                               </span>
                             </div>
                           </motion.div>
                         )}
                       </AnimatePresence>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        <div className="hidden lg:block lg:col-span-5 relative">
          <div className="sticky top-32 glass-enhance border border-outline-variant/25 rounded-xl h-fit max-h-[80vh] overflow-y-auto custom-scrollbar before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none">
            <AnimatePresence mode="wait">
              {expandedId ? (
                <motion.div
                  key={expandedId}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
                  exit={{ opacity: 0, y: -8 }}
                >
                  <DeconstructionDetail 
                    dilemma={DILEMMAS_DATA.find(d => d.id === expandedId)!} 
                    onAnalyze={onAnalyzeTrigger} 
                    isBibliographyOpen={isBibliographyOpen} 
                    setIsBibliographyOpen={setIsBibliographyOpen}
                  />
                </motion.div>
              ) : (
                <div className="p-10 h-[400px] flex flex-col items-center justify-center text-center text-on-surface-variant/40 space-y-6">
                   <Compass className="w-12 h-12 stroke-[0.5px] animate-spin-slow" />
                   <div className="space-y-2">
                    <p className="text-technical-xs uppercase tracking-[0.2em]">Selecciona una tesis</p>
                    <p className="text-xs max-w-[200px] mx-auto leading-relaxed">Haz clic en una tarjeta para desplegar el análisis dialéctico y científico.</p>
                   </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function DeconstructionDetail({ dilemma, onAnalyze, isBibliographyOpen, setIsBibliographyOpen }: { dilemma: any, onAnalyze: any, isBibliographyOpen: boolean, setIsBibliographyOpen: any }) {
  return (
    <div className="p-8 space-y-10">
      <div className="space-y-3 border-b border-outline-variant/20 pb-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-widest uppercase text-on-surface-variant">
            {getCategoryLabel(dilemma.category)}
          </span>
          <span className={`text-[9px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-sm ${getConsensusColor(dilemma.consensus)}`}>
            {getConsensusLabel(dilemma.consensus)}
          </span>
        </div>
        <h4 className="text-display-md !text-base leading-snug text-on-surface">
          {dilemma.title}
        </h4>
      </div>

      <div className="space-y-4">
        <h4 className="text-technical-sm text-link flex items-center gap-2">
          <Terminal className="w-4 h-4" />
          Análisis Científico
        </h4>
        <div className="text-body-md text-on-surface-variant leading-relaxed">
          <TextRenderer text={dilemma.scientificDeconstruction} references={dilemma.references} />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-technical-sm text-primary flex items-center gap-2">
          <Brain className="w-4 h-4" />
          Deconstrucción Lógica
        </h4>
        <div className="text-body-md text-on-surface-variant leading-relaxed">
          <TextRenderer text={dilemma.philosophicalDeconstruction} references={dilemma.references} />
        </div>
      </div>

      <div className="bg-surface-dim/30 p-6 rounded-md border border-outline-variant/10 space-y-4">
        <h4 className="text-technical-xs text-on-surface uppercase tracking-widest flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-primary" />
          Impacto Sistémico
        </h4>
        <p className="text-body-md !text-sm text-on-surface-variant/80 leading-relaxed">
          <TextRenderer text={dilemma.coexistenceImpact} references={dilemma.references} />
        </p>
      </div>

      {dilemma.openQuestion && (
        <div className="pt-4">
          <div className="p-5 border-l-2 border-primary bg-primary/5 rounded-r-md">
            <p className="text-body-md text-on-surface-variant italic">
              {dilemma.openQuestion}
            </p>
          </div>
        </div>
      )}

      {dilemma.references && dilemma.references.length > 0 && (
        <div className="pt-4">
          <button
            onClick={() => setIsBibliographyOpen(!isBibliographyOpen)}
            className="flex items-center justify-between w-full py-4 border-t border-outline-variant/30 text-technical-xs text-on-surface-variant hover:text-primary transition-all group"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 opacity-50 group-hover:opacity-100" />
              FUENTES ({dilemma.references.length})
            </span>
            {isBibliographyOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <AnimatePresence>
            {isBibliographyOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <ul className="pb-6 space-y-4">
                  {dilemma.references.map((ref: any) => (
                    <li key={ref.id} className="text-[11px] leading-relaxed text-on-surface-variant/70 font-sans pl-4 border-l border-outline-variant/50">
                      <span className="font-bold text-primary mr-2">[{ref.id}]</span>
                      {ref.citation}
                      {ref.url && (
                        <a href={ref.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-link hover:underline ml-2">
                          DOI <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <Button
        variant="primary"
        className="w-full gap-2 shadow-lg"
        onClick={() => onAnalyze(dilemma.popularStatement)}
      >
        <Sparkles className="w-4 h-4" />
        Analizar con IA de Sintiens
      </Button>
    </div>
  );
}
