import React, { useState, useEffect, useRef } from "react";
import {
  Brain,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Undo2,
  ShieldAlert,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  HelpCircle,
  Scale,
  Activity,
  Globe,
  Layers,
  ChevronRight,
  Quote
} from "lucide-react";
import { motion } from "motion/react";
import {
  SOCRATIC_DIALOGUES,
  DialogueNode,
  DialogueOption
} from "../data/socraticDialoguesData";

interface SocraticTrainerProps {
  initialDialogueId?: string;
  onOpenDilemmaCatalog?: (dilemmaId?: string) => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  sintiencia: <Activity className="w-3.5 h-3.5 text-red-500" />,
  etica: <Scale className="w-3.5 h-3.5 text-blue-500" />,
  sistemas_uso: <Layers className="w-3.5 h-3.5 text-amber-500" />,
  ecologia: <Globe className="w-3.5 h-3.5 text-emerald-500" />,
};

export default function SocraticTrainer({
  initialDialogueId,
  onOpenDilemmaCatalog
}: SocraticTrainerProps) {
  const [selectedTreeId, setSelectedTreeId] = useState<string>(
    initialDialogueId || SOCRATIC_DIALOGUES[0]!.id
  );
  const [history, setHistory] = useState<string[]>([]);
  const scrollEndRef = useRef<HTMLDivElement>(null);

  // Get active tree
  const activeTree =
    SOCRATIC_DIALOGUES.find((d) => d.id === selectedTreeId) || SOCRATIC_DIALOGUES[0]!;

  // Initialize or reset when tree changes
  useEffect(() => {
    setHistory([activeTree.initialNodeId]);
  }, [selectedTreeId, activeTree.initialNodeId]);

  // Sync if initialDialogueId prop changes
  useEffect(() => {
    if (initialDialogueId && initialDialogueId !== selectedTreeId) {
      setSelectedTreeId(initialDialogueId);
    }
  }, [initialDialogueId]);

  // Scroll to bottom when history updates
  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const currentNodeId = history[history.length - 1];
  const currentNode: DialogueNode | undefined = currentNodeId
    ? activeTree.nodes[currentNodeId]
    : undefined;

  const handleSelectOption = (option: DialogueOption) => {
    if (activeTree.nodes[option.nextNodeId]) {
      setHistory((prev) => [...prev, option.nextNodeId]);
    }
  };

  const handleUndo = () => {
    if (history.length > 1) {
      setHistory((prev) => prev.slice(0, -1));
    }
  };

  const handleReset = () => {
    setHistory([activeTree.initialNodeId]);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 text-left">
      {/* HEADER & SELECTOR */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary block font-bold opacity-70">
              [ MAYÉUTICA & FILOSOFÍA APLICADA ]
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-on-surface">
              Entrenador de Diálogo Socrático
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              disabled={history.length <= 1}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-outline-variant/30 text-xs font-mono text-on-surface-variant hover:text-primary hover:border-primary/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer bg-surface/80"
              title="Reiniciar diálogo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar</span>
            </button>
            <button
              onClick={handleUndo}
              disabled={history.length <= 1}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-outline-variant/30 text-xs font-mono text-on-surface-variant hover:text-primary hover:border-primary/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer bg-surface/80"
              title="Paso anterior"
            >
              <Undo2 className="w-3.5 h-3.5" />
              <span>Atrás</span>
            </button>
          </div>
        </div>

        {/* DIALOGUE ROUTE PILLS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2">
          {SOCRATIC_DIALOGUES.map((d) => {
            const isSelected = d.id === selectedTreeId;
            return (
              <button
                key={d.id}
                onClick={() => setSelectedTreeId(d.id)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-2.5 ${
                  isSelected
                    ? "bg-primary/10 border-primary shadow-sm"
                    : "bg-surface/60 border-outline-variant/25 hover:border-outline-variant/60 hover:bg-surface-dim/40"
                }`}
              >
                <div className="p-1.5 rounded-lg bg-surface border border-outline-variant/20 shrink-0 mt-0.5">
                  {CATEGORY_ICONS[d.category] || <HelpCircle className="w-3.5 h-3.5 text-primary" />}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-on-surface truncate">
                    {d.title}
                  </div>
                  <div className="text-[10px] font-sans text-on-surface-variant/70 line-clamp-1">
                    {d.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* CONVERSATION STAGE */}
      <div className="bg-surface/80 dark:bg-surface-dim/50 border border-outline-variant/20 rounded-2xl p-4 sm:p-8 shadow-sm space-y-6">
        
        {/* TOP CONTEXT BAR */}
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
          <div className="space-y-0.5">
            <span className="text-[9px] font-mono uppercase tracking-widest text-primary font-bold">
              Ruta Activa · {activeTree.title}
            </span>
            <p className="text-xs italic font-serif text-on-surface-variant">
              {activeTree.subtitle}
            </p>
          </div>

          <div className="text-[10px] font-mono text-on-surface-variant/60 bg-surface-dim px-2.5 py-1 rounded-full border border-outline-variant/20 shrink-0">
            Paso {history.length}
          </div>
        </div>

        {/* DIALOGUE THREAD */}
        <div className="space-y-6">
          {history.map((nodeId, idx) => {
            const node = activeTree.nodes[nodeId];
            if (!node) return null;
            const isSocrates = node.speaker === "socrates";

            return (
              <motion.div
                key={`${nodeId}-${idx}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex gap-3 sm:gap-4 ${
                  isSocrates ? "items-start" : "items-start"
                }`}
              >
                {/* Speaker Avatar */}
                <div
                  className={`w-8 h-8 rounded-2xl flex items-center justify-center shrink-0 border ${
                    isSocrates
                      ? "bg-primary text-on-primary border-primary shadow-sm"
                      : "bg-surface-dim text-on-surface-variant border-outline-variant/40"
                  }`}
                >
                  {isSocrates ? (
                    <Brain className="w-4 h-4" />
                  ) : (
                    <Quote className="w-3.5 h-3.5" />
                  )}
                </div>

                {/* Message Content Bubble */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-on-surface">
                      {isSocrates ? "Sócrates (Mayéutica)" : "Tesis / Objeción Inicial"}
                    </span>
                  </div>

                  <div
                    className={`p-4 sm:p-5 rounded-2xl border text-xs sm:text-sm font-sans leading-relaxed ${
                      isSocrates
                        ? "bg-surface border-outline-variant/30 text-on-surface shadow-xs"
                        : "bg-surface-dim/70 border-outline-variant/30 text-on-surface-variant italic"
                    }`}
                  >
                    {node.text}
                  </div>

                  {/* Fallacy Alert Badge if present */}
                  {node.fallacyDetected && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-3.5 rounded-2xl bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/30 space-y-1 text-xs"
                    >
                      <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-mono font-bold text-[11px] uppercase tracking-wider">
                        <ShieldAlert className="w-4 h-4 shrink-0" />
                        <span>Sesgo / Falacia Detectada: {node.fallacyDetected.name}</span>
                      </div>
                      <p className="text-on-surface font-sans text-xs pl-6">
                        {node.fallacyDetected.description}
                      </p>
                      <div className="text-[10px] font-mono text-on-surface-variant/70 pl-6 pt-0.5">
                        Término analítico: <em>{node.fallacyDetected.academicTerm}</em>
                      </div>
                    </motion.div>
                  )}

                  {/* Citation Box if present */}
                  {node.citation && (
                    <div className="p-3.5 rounded-2xl bg-blue-500/10 dark:bg-blue-500/5 border border-blue-500/25 space-y-1 text-xs">
                      <div className="flex items-center justify-between text-blue-700 dark:text-blue-400 font-mono font-bold text-[10px] uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" /> Evidencia Científica: {node.citation.author} ({node.citation.year})
                        </span>
                        {node.citation.url && (
                          <a
                            href={node.citation.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-link hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <p className="text-on-surface font-serif italic text-xs pl-5 leading-relaxed">
                        «{node.citation.text}»
                      </p>
                    </div>
                  )}

                  {/* Conclusion Summary Screen if terminal node */}
                  {node.isConclusion && node.conclusionSummary && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-5 sm:p-6 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/30 space-y-3"
                    >
                      <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-mono font-bold text-xs uppercase tracking-wider">
                        <CheckCircle2 className="w-4 h-4" /> Síntesis y Principio Ético Alcanzado
                      </div>
                      <p className="text-on-surface font-sans text-xs sm:text-sm leading-relaxed">
                        {node.conclusionSummary.keyTakeaway}
                      </p>
                      <div className="p-3 bg-surface rounded-xl border border-emerald-500/20 text-xs font-mono text-emerald-800 dark:text-emerald-300">
                        ⚖️ <strong>Principio:</strong> {node.conclusionSummary.ethicalPrinciple}
                      </div>

                      {activeTree.dilemmaId && (
                        <div className="pt-2">
                          <button
                            onClick={() => onOpenDilemmaCatalog?.(activeTree.dilemmaId)}
                            className="text-xs font-mono text-primary hover:underline flex items-center gap-1.5 cursor-pointer"
                          >
                            Ver análisis deconstructivo completo en el Catálogo de Tesis <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* INTERACTIVE OPTIONS BOX */}
        {currentNode && !currentNode.isConclusion && currentNode.options && currentNode.options.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-6 border-t border-outline-variant/20 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" /> Elige el siguiente paso o réplica:
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentNode.options.map((opt, optIdx) => (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(opt)}
                  className="p-4 rounded-2xl border border-outline-variant/30 bg-surface hover:border-primary hover:bg-primary/5 transition-all text-left group cursor-pointer space-y-1.5 shadow-2xs flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-primary font-bold px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20">
                      {opt.intention}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-on-surface-variant/40 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <p className="text-xs sm:text-sm font-sans text-on-surface leading-snug">
                    {opt.text}
                  </p>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <div ref={scrollEndRef} />
      </div>
    </div>
  );
}
