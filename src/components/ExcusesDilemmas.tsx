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

interface ExcusesDilemmasProps {
  onAnalyzeTrigger: (excuseText: string) => void;
}

export default function ExcusesDilemmas({ onAnalyzeTrigger }: ExcusesDilemmasProps) {
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

  const getConsensusColor = (consensus: ConsensusType) => {
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
  };

  const getCategoryIconByString = (cat: string) => {
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
  };

  const filteredDilemmas = DILEMMAS_DATA.filter((dilemma) => {
    const matchesSearch =
      dilemma.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dilemma.popularStatement.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || dilemma.category === selectedCategory;
    const matchesConsensus = selectedConsensus === "all" || dilemma.consensus === selectedConsensus;
    return matchesSearch && matchesCategory && matchesConsensus;
  });

  return (
    <div id="excuses-dialectic-view" className="space-y-12 w-full">

      {/* Search and Filters Layout */}
      <div className="flex flex-col gap-8 border-b border-outline-variant/20 pb-10">
        <div className="space-y-2">
           <h3 className="text-technical-sm text-primary font-bold uppercase tracking-widest">Dialéctica Socrática</h3>
           <p className="text-body-md text-on-surface-variant max-w-2xl">
             Análisis crítico de las justificaciones antropocéntricas a través del tamiz de la evidencia científica y la consistencia ética.
           </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-end justify-between">
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar justificación popular..."
              className="w-full bg-surface-dim/20 border-b border-outline-variant/50 focus:border-primary px-12 py-3 text-body-md outline-none transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex bg-surface-dim/40 p-1 rounded-md border border-outline-variant/20">
              {["all", "sintiencia", "ecologia", "etica"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-sm text-[9px] font-mono uppercase tracking-widest transition-all ${
                    selectedCategory === cat ? "bg-primary text-on-primary" : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex bg-surface-dim/40 p-1 rounded-md border border-outline-variant/20">
               {["all", "CONSENSO", "FALACIA"].map((con) => (
                <button
                  key={con}
                  onClick={() => setSelectedConsensus(con)}
                  className={`px-4 py-2 rounded-sm text-[9px] font-mono uppercase tracking-widest transition-all ${
                    selectedConsensus === con ? "bg-secondary text-on-secondary" : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {con}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Main list */}
        <div className="lg:col-span-7 space-y-6">
          {filteredDilemmas.length === 0 ? (
            <div className="py-20 text-center space-y-4 border border-dashed border-outline-variant/40 rounded-md">
              <HelpCircle className="w-10 h-10 text-on-surface-variant/20 mx-auto" />
              <p className="text-technical-xs uppercase tracking-widest text-on-surface-variant/40">Sin correspondencias dialécticas</p>
            </div>
          ) : (
            filteredDilemmas.map((dilemma) => (
              <Card
                key={dilemma.id}
                variant={expandedId === dilemma.id ? "solid" : "outline"}
                onClick={() => setExpandedId(expandedId === dilemma.id ? null : dilemma.id)}
                className={`group cursor-pointer border-l-4 transition-all duration-500 hover:border-primary ${
                  expandedId === dilemma.id ? "border-primary bg-primary/5" : "border-l-transparent"
                }`}
              >
                <CardContent className="p-8 space-y-5">
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-surface-dim rounded-sm">
                          {getCategoryIconByString(dilemma.category)}
                        </div>
                        <span className="text-[10px] font-mono tracking-widest uppercase text-on-surface-variant">
                          {dilemma.category}
                        </span>
                     </div>
                     <span className={`text-[9px] font-mono font-bold tracking-widest px-2 py-0.5 border rounded-sm ${getConsensusColor(dilemma.consensus)}`}>
                        {dilemma.consensus}
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
                         {/* Mobile Details */}
                         <div className="lg:hidden space-y-8 pt-10 mt-6 border-t border-outline-variant/20">
                            {/* Same content as side panel */}
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
            ))
          )}
        </div>

        {/* Desktop Side Panel */}
        <div className="hidden lg:block lg:col-span-5 relative">
          <div className="sticky top-32 bg-surface-dim/10 border border-outline-variant/20 rounded-md p-10 h-fit max-h-[80vh] overflow-y-auto custom-scrollbar">
            <AnimatePresence mode="wait">
              {expandedId ? (
                <motion.div
                  key={expandedId}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <DeconstructionDetail 
                    dilemma={DILEMMAS_DATA.find(d => d.id === expandedId)!} 
                    onAnalyze={onAnalyzeTrigger} 
                    isBibliographyOpen={isBibliographyOpen} 
                    setIsBibliographyOpen={setIsBibliographyOpen}
                  />
                </motion.div>
              ) : (
                <div className="h-[400px] flex flex-col items-center justify-center text-center text-on-surface-variant/40 space-y-6">
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
    </div>
  );
}

function DeconstructionDetail({ dilemma, onAnalyze, isBibliographyOpen, setIsBibliographyOpen }: { dilemma: any, onAnalyze: any, isBibliographyOpen: boolean, setIsBibliographyOpen: any }) {
  return (
    <div className="space-y-10">
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
