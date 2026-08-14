import { useState, useEffect, useRef, useCallback, memo } from "react";
import type { ReactNode } from "react";
import {
  Send,
  AlertCircle,
  Loader2,
  Compass,
  Brain,
  FileText,
  ShieldAlert,
  Activity,
  Flame,
  Sparkles,
  BrainCircuit,
  Heart,
  Microscope,
  Atom,
  ScrollText,
  History,
  Trash2,
  RotateCcw,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
  Quote,
  Gauge,
  X,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AIAnalysisResult {
  argumentSummary: string;
  axioms: string[];
  scientificAccuracy: {
    rating: string;
    analysis: string;
  };
  logicalFailures: string[];
  impactAnalysis: {
    sintiente: string;
    ecosistemic: string;
  };
  alternativeReflection: string;
}

type AnalysisMode = "clinical" | "socratic" | "empathic" | "thermodynamic";

interface HistoryEntry {
  id: string;
  argument: string;
  mode: AnalysisMode;
  result: AIAnalysisResult;
  timestamp: number;
}

interface AiValidatorProps {
  argumentToAnalyze: string | null;
  clearArgument: () => void;
}

/* ── Catálogo de modos de análisis (la API ya los soporta, estaban dormidos) ── */
const ANALYSIS_MODES: {
  id: AnalysisMode;
  label: string;
  description: string;
  icon: typeof Brain;
  accent: string;
}[] = [
  {
    id: "clinical",
    label: "Dialéctica Clínica",
    description: "Rigor académico, neurobiología y ética laica formal.",
    icon: Brain,
    accent: "var(--on-surface-variant)",
  },
  {
    id: "socratic",
    label: "Socrático Puro",
    description: "Ironía dialéctica e incisiva. Preguntas que incomodan.",
    icon: ScrollText,
    accent: "var(--ch4)",
  },
  {
    id: "empathic",
    label: "Divulgación Empática",
    description: "Cálido y pedagógico. Analogías cotidianas, sin jerga.",
    icon: Heart,
    accent: "var(--ch1)",
  },
  {
    id: "thermodynamic",
    label: "Termodinámica Radical",
    description: "Física pura: entropía, paso trófico, límites biosféricos.",
    icon: Atom,
    accent: "var(--ch2)",
  },
];

/* ── Biblioteca de excusas categorizada (antes era una lista plana) ── */
const EXCUSE_LIBRARY: { category: string; label: string; excuses: string[] }[] = [
  {
    category: "naturalismo",
    label: "Naturalismo",
    excuses: [
      "Los leones consumen carne y es natural que hagamos lo mismo.",
      "Los seres humanos somos omnívoros por evolución fáctica.",
      "Siempre hemos comido carne, es nuestra tradición y our cultura.",
    ],
  },
  {
    category: "etica",
    label: "Ética & Bienestar",
    excuses: [
      "La ganadería extensiva respeta el bienestar animal y no daña nada.",
      "Si los animales estuvieran sufriendo, la industria lo prohibiría.",
    ],
  },
  {
    category: "pragmatismo",
    label: "Pragmatismo",
    excuses: [
      "Comer carne estimula la economía, da empleo y mantiene tradiciones místicas.",
      "Una sola persona no cambiando su dieta no hace ninguna diferencia.",
    ],
  },
  {
    category: "escenarios",
    label: "Escenarios Extremos",
    excuses: [
      "Si dejamos de comer animales, se reproducirían sin control y extinguirían los pastos.",
      "En una isla desierta o situación de supervivencia tendrías que cazar.",
    ],
  },
];

/* ── Frases rotativas para el estado de carga (toque humano) ── */
const LOADING_PHRASES = [
  "Diseccionando premisas lógicas...",
  "Midiendo nocicepción y respuesta al dolor...",
  "Calculando pérdida trófica y entropía calórica...",
  "Cruzando referencias bioéticas...",
  "Exponiendo disonancia cognitiva...",
];

/* ── Persistencia del historial ── */
const HISTORY_KEY = "sintiens-descompresor-historial";

function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/* ── Inferencia del nivel de severidad a partir del rating retornado ── */
function inferSeverity(rating: string): { level: "critico" | "moderado" | "matizado"; label: string; color: string } {
  const r = rating.toLowerCase();
  if (/(falac|inexact|fals|mentir|incorrect|inv[áa]lid|absurd)/.test(r)) {
    return { level: "critico", label: "Veredicto Crítico", color: "var(--ch1)" };
  }
  if (/(disonan|incomple|parcial|sesgo|simplif|reducc)/.test(r)) {
    return { level: "moderado", label: "Diagnóstico Mixto", color: "var(--ch3)" };
  }
  return { level: "matizado", label: "Premisa Matizada", color: "var(--link)" };
}

export default memo(function AiValidator({
  argumentToAnalyze,
  clearArgument,
}: AiValidatorProps) {
  const [userInput, setUserInput] = useState("");
  const [mode, setMode] = useState<AnalysisMode>("clinical");
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingPhraseIndex, setLoadingPhraseIndex] = useState(0);
  const [history, setHistory] = useState<HistoryEntry[]>(() => loadHistory());
  const [showHistory, setShowHistory] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);
  const [lastAnalyzedText, setLastAnalyzedText] = useState("");
  const [lastAnalyzedMode, setLastAnalyzedMode] = useState<AnalysisMode | null>(null);
  const [copied, setCopied] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      abortControllerRef.current?.abort();
    };
  }, []);

  /* ── Persistir historial ── */
  useEffect(() => {
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch {
      /* almacenamiento lleno o no disponible: silencioso */
    }
  }, [history]);

  /* ── Rotación de frases durante el análisis ── */
  useEffect(() => {
    if (!loading) return;
    setLoadingPhraseIndex(0);
    const interval = setInterval(() => {
      setLoadingPhraseIndex((i) => (i + 1) % LOADING_PHRASES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [loading]);

  /* ── Auto-resize del textarea ── */
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 280)}px`;
  }, [userInput]);

  /* ── Disparo desde otras pestañas (argumento pasado por props) ── */
  useEffect(() => {
    if (argumentToAnalyze && !loading) {
      setUserInput(argumentToAnalyze);
      void handleSubmit(argumentToAnalyze, mode);
      clearArgument();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [argumentToAnalyze, loading]);

  /* ── Atajo de teclado: Cmd/Ctrl+Enter para someter ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && !loading) {
        e.preventDefault();
        void handleSubmit("", mode);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, userInput, mode]);

  const handleSubmit = useCallback(
    async (textToSend: string, selectedMode: AnalysisMode) => {
      const finalVal = (textToSend || userInput).trim();
      if (!finalVal) return;

      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;
      const timeoutId = window.setTimeout(() => controller.abort(), 60_000);

      setLoading(true);
      setError(null);
      setAnalysis(null);
      setLastAnalyzedText(finalVal);
      setLastAnalyzedMode(selectedMode);

      try {
        const response = await fetch("/api/analyze-argument", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            argument: finalVal,
            mode: selectedMode,
            context: "sintiens AI Validator",
          }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            "El servidor no pudo procesar la solicitud de análisis. Comprueba la API key o reinténtalo."
          );
        }

        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }

        if (!isMountedRef.current) return;

        setAnalysis(data);

        /* Guardar en historial (máx. 12 entradas, sin duplicados recientes) */
        setHistory((prev) => {
          const entry: HistoryEntry = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            argument: finalVal,
            mode: selectedMode,
            result: data,
            timestamp: Date.now(),
          };
          const deduped = prev.filter(
            (h) => !(h.argument === finalVal && h.mode === selectedMode)
          );
          return [entry, ...deduped].slice(0, 12);
        });
      } catch (err: any) {
        if (err?.name === "AbortError") {
          if (isMountedRef.current) {
            setError("El análisis se canceló o tardó demasiado. Inténtalo de nuevo.");
          }
        } else {
          console.error(err);
          if (isMountedRef.current) {
            setError(err?.message || "Algo salió mal procesando el análisis.");
          }
        }
      } finally {
        window.clearTimeout(timeoutId);
        if (abortControllerRef.current === controller) {
          abortControllerRef.current = null;
        }
        if (isMountedRef.current) {
          setLoading(false);
        }
      }
    },
    [userInput]
  );

  const handleCopy = useCallback(() => {
    if (!analysis) return;
    const text = [
      `VEREDICTO: ${analysis.argumentSummary}`,
      ``,
      `AXIOMAS IMPLÍCITOS:`,
      ...analysis.axioms.map((a, i) => `  ${i + 1}. ${a}`),
      ``,
      `PRECISIÓN CIENTÍFICA [${analysis.scientificAccuracy.rating}]:`,
      `  ${analysis.scientificAccuracy.analysis}`,
      ``,
      `DECONSTRUCCIÓN Y SESGOS:`,
      ...analysis.logicalFailures.map((f) => `  • ${f}`),
      ``,
      `IMPACTO SINTIENTE: ${analysis.impactAnalysis.sintiente}`,
      `IMPACTO ECOSISTÉMICO: ${analysis.impactAnalysis.ecosistemic}`,
      ``,
      `PREGUNTA SOCRÁTICA: "${analysis.alternativeReflection}"`,
      ``,
      `— Analizado con el Descompresor de Sintiens (modo ${lastAnalyzedMode})`,
    ].join("\n");
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      /* portapapeles no disponible: silencioso */
    });
  }, [analysis, lastAnalyzedMode]);

  const clearHistory = () => setHistory([]);

  const activeMode = ANALYSIS_MODES.find((m) => m.id === mode)!;
  const severity = analysis ? inferSeverity(analysis.scientificAccuracy.rating) : null;

  return (
    <motion.section
      id="ai-validator-view"
      className="-mt-12 lg:-mt-20 space-y-10 w-full relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >

      {/* ═════════════════════════ HERO ═════════════════════════ */}
      <div className="w-full flex flex-col lg:justify-center items-center text-center relative h-[550px] min-h-[550px] lg:h-[600px] lg:min-h-[600px] pt-16 lg:pt-28 pb-20 lg:pb-24 px-6 lg:px-16 border-b border-outline-variant/20">
        {/* Esquinas crosshair */}
        {["top-6 left-6", "top-6 right-6", "bottom-6 left-6", "bottom-6 right-6"].map((pos) => (
          <div
            key={pos}
            className={`absolute ${pos} w-6 h-6 pointer-events-none select-none flex items-center justify-center`}
          >
            <div className="absolute w-4 h-[2px] bg-primary/30" />
            <div className="absolute w-[2px] h-4 bg-primary/30" />
          </div>
        ))}

        {/* Icono de fondo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
          <BrainCircuit
            className="text-zinc-900 dark:text-zinc-100 blur"
            style={{
              width: "clamp(144px, 45vw, 540px)",
              height: "clamp(144px, 45vw, 540px)",
              opacity: 0.08,
              strokeWidth: 1.5,
            }}
          />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="relative z-10 space-y-6 max-w-3xl"
        >
          <motion.span
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-[10px] font-mono font-bold text-primary select-none tracking-[0.25em] uppercase block opacity-60"
          >
            [ IA ]
          </motion.span>
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-[clamp(42px,8.5vw,80px)] font-bold tracking-tight font-heading leading-[1.05] text-on-background select-none"
          >
            Descomponer<span className="text-secondary/60 font-light block mt-2 text-[clamp(24px,4vw,40px)]">Axiomas No Examinados</span>
          </motion.h1>
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="max-w-2xl mx-auto pt-1 font-serif italic font-light text-on-surface-variant/70 leading-relaxed text-[14px] sm:text-[16px] md:text-[18px] lg:text-[19px] text-center tracking-normal select-none"
          >
            Escribe cualquier argumento o excusa que utilices para justificar el consumo animal. La IA de Sintiens
            deconstruirá su validez lógica y expondrá sus sesgos.
          </motion.p>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="flex items-center justify-center gap-6 pt-2"
          >
            <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
              <BrainCircuit className="w-3.5 h-3.5" />
              4 MODOS
            </span>
            <span className="w-px h-4 bg-outline-variant/50" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
              <History className="w-3.5 h-3.5" />
              {history.length} ANÁLISIS
            </span>
            <span className="w-px h-4 bg-outline-variant/50" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
              <Microscope className="w-3.5 h-3.5" />
              GEMINI 2.5
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* ───────────── NAVEGACIÓN DE PESTAÑAS ───────────── */}
      <div className="w-full py-4 relative z-10">
        
      </div>

      {/* ═════════════════════════ SELECTOR DE MODO ═════════════════════════ */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-technical-xs uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
            <Gauge className="w-3.5 h-3.5" />
            Modo de Análisis
          </span>
          {history.length > 0 && (
            <button
              onClick={() => setShowHistory((v) => !v)}
              className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/60 hover:text-primary transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <History className="w-3.5 h-3.5" />
              Historial ({history.length})
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {ANALYSIS_MODES.map((m) => {
            const Icon = m.icon;
            const isActive = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                aria-pressed={isActive}
                disabled={loading}
                className={`glass-enhance border rounded-xl p-4 text-left relative transition-all cursor-pointer disabled:cursor-not-allowed
                  before:content-[''] before:absolute before:inset-0 before:rounded-[inherit]
                  before:bg-surface-dim/20 dark:before:bg-surface-dim/10
                  before:backdrop-blur-md before:z-[-1] before:pointer-events-none
                  ${
                    isActive
                      ? "border-primary/60"
                      : "border-outline-variant/30 hover:border-outline-variant/60 opacity-75 hover:opacity-100"
                  }`}
                style={isActive ? { boxShadow: `inset 3px 0 0 0 ${m.accent}` } : undefined}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span style={{ color: isActive ? m.accent : "var(--on-surface-variant)" }}>
                    <Icon className="w-4 h-4" />
                  </span>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-widest font-bold ${
                      isActive ? "text-on-surface" : "text-on-surface-variant"
                    }`}
                  >
                    {m.label}
                  </span>
                </div>
                <p className="text-[10.5px] leading-snug text-on-surface-variant/70">{m.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ═════════════════════════ FORMULARIO DE ENTRADA ═════════════════════════ */}
      <div
        className="glass-enhance border border-outline-variant/25 rounded-2xl p-5 lg:p-6 space-y-4 relative z-10
        before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20
        dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none"
      >
        <div className="flex flex-col gap-3">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Introduce una excusa: ej. 'Los leones consumen carne y es natural que hagamos lo mismo'..."
              className="w-full bg-surface-dim/30 border border-outline-variant/30 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 rounded-xl px-5 py-4 text-body-md text-on-surface outline-none transition-all placeholder:text-on-surface-variant/40 resize-none custom-scrollbar min-h-[110px]"
              disabled={loading}
              rows={2}
            />
            <span className="absolute bottom-3 right-4 text-[9px] font-mono text-on-surface-variant/30 select-none pointer-events-none">
              {userInput.length} car.
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between">
            <span className="text-[9px] font-mono uppercase tracking-widest text-on-surface-variant/40 hidden sm:flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded border border-outline-variant/30 bg-surface-dim/40">Ctrl</kbd>
              <span>+</span>
              <kbd className="px-1.5 py-0.5 rounded border border-outline-variant/30 bg-surface-dim/40">Enter</kbd>
              <span className="ml-1">para someter</span>
            </span>
            <button
              onClick={() => void handleSubmit("", mode)}
              disabled={loading || !userInput.trim()}
              className="px-6 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-semibold text-[11px] font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer w-full sm:w-auto shrink-0"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              {loading ? "Analizando" : `Someter · ${activeMode.label}`}
            </button>
          </div>
        </div>

        {/* ── Biblioteca de excusas colapsable ── */}
        <div className="border-t border-outline-variant/15 pt-4">
          <button
            onClick={() => setShowLibrary((v) => !v)}
            className="flex items-center justify-between w-full text-[10px] font-mono text-on-surface-variant/60 uppercase tracking-widest hover:text-on-surface transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Lightbulb className="w-3.5 h-3.5" />
              Biblioteca de excusas para testear
            </span>
            {showLibrary ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          <AnimatePresence>
            {showLibrary && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {EXCUSE_LIBRARY.map((group) => (
                    <div key={group.category} className="space-y-2">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-primary/70 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-primary/50" />
                        {group.label}
                      </span>
                      <div className="space-y-1.5">
                        {group.excuses.map((excuse, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setUserInput(excuse);
                              void handleSubmit(excuse, mode);
                            }}
                            disabled={loading}
                            className="w-full text-left text-xs px-3 py-2.5 rounded-lg bg-surface-dim/30 hover:bg-surface-dim/50 text-on-surface-variant border border-outline-variant/20 hover:border-outline-variant/60 transition-all flex items-start gap-2 cursor-pointer disabled:opacity-40"
                          >
                            <ArrowRight className="w-3 h-3 text-on-surface-variant/40 shrink-0 mt-0.5" />
                            <span className="leading-relaxed italic">"{excuse}"</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ═════════════════════════ PANEL DE HISTORIAL ═════════════════════════ */}
      <AnimatePresence>
        {showHistory && history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 overflow-hidden"
          >
            <div className="glass-enhance border border-outline-variant/25 rounded-2xl p-5 relative before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-technical-sm text-primary font-bold flex items-center gap-2">
                  <History className="w-4 h-4" />
                  Análisis Recientes
                </h4>
                <button
                  onClick={clearHistory}
                  className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 hover:text-ch1 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Limpiar
                </button>
              </div>
              <div className="space-y-2 max-h-[320px] overflow-y-auto custom-scrollbar pr-1">
                {history.map((entry) => {
                  // Entradas legacy o malformadas: se omiten en vez de romper el render
                  const m = ANALYSIS_MODES.find((x) => x.id === entry.mode);
                  if (!m || !entry.result || !entry.result.scientificAccuracy) return null;
                  const Icon = m.icon;
                  return (
                    <div
                      key={entry.id}
                      className="group flex items-center gap-3 p-3 rounded-lg border border-outline-variant/20 hover:border-primary/40 hover:bg-surface-dim/30 transition-all"
                    >
                      <span style={{ color: m.accent }} className="shrink-0">
                        <Icon className="w-4 h-4" />
                      </span>
                      <button
                        onClick={() => {
                          setAnalysis(entry.result);
                          setMode(entry.mode);
                          setLastAnalyzedText(entry.argument);
                          setLastAnalyzedMode(entry.mode);
                          setUserInput(entry.argument);
                          setShowHistory(false);
                          document
                            .getElementById("ai-validator-view")
                            ?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                        className="flex-1 min-w-0 text-left cursor-pointer"
                      >
                        <span className="block text-[12px] text-on-surface truncate group-hover:text-primary transition-colors">
                          "{entry.argument}"
                        </span>
                        <span className="block text-[9px] font-mono uppercase tracking-widest text-on-surface-variant/40 mt-0.5">
                          {m.label} · {new Date(entry.timestamp).toLocaleDateString("es-ES", { day: "numeric", month: "short" })}
                        </span>
                      </button>
                      <button
                        onClick={() => setHistory((prev) => prev.filter((h) => h.id !== entry.id))}
                        aria-label="Eliminar del historial"
                        className="p-1.5 rounded-md text-on-surface-variant/30 hover:text-ch1 hover:bg-surface-dim/50 opacity-0 group-hover:opacity-100 transition-all cursor-pointer shrink-0"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═════════════════════════ ESTADO DE CARGA ═════════════════════════ */}
      {loading && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="glass-enhance border border-outline-variant/25 rounded-2xl p-10 lg:p-14 flex flex-col items-center justify-center text-center space-y-5 relative z-10 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none"
        >
          <div className="relative">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <Compass className="w-5 h-5 text-primary/40 absolute inset-0 m-auto animate-rotate-slow" />
          </div>
          <AnimatePresence mode="wait">
            <motion.h4
              key={loadingPhraseIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="text-body-md text-on-surface font-heading italic"
            >
              {LOADING_PHRASES[loadingPhraseIndex]}
            </motion.h4>
          </AnimatePresence>
          <p className="text-body-sm text-on-surface-variant/70 max-w-sm">
            Modo <span className="text-primary font-mono">{activeMode.label}</span> · evaluando la premisa con la IA de
            Sintiens.
          </p>
        </motion.div>
      )}

      {/* ═════════════════════════ ESTADO DE ERROR ═════════════════════════ */}
      {error && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-ch1/10 border border-ch1/20 rounded-xl p-4 flex gap-3 text-body-sm text-ch1 relative z-10"
        >
          <AlertCircle className="w-5 h-5 shrink-0" />
          <div className="space-y-1">
            <span className="font-semibold block">Error de deconstrucción</span>
            <span>{error}</span>
          </div>
        </motion.div>
      )}

      {/* ═════════════════════════ RESULTADOS DEL ANÁLISIS ═════════════════════════ */}
      <AnimatePresence mode="wait">
        {analysis && !loading && severity && (
          <motion.div
            key={lastAnalyzedText + (lastAnalyzedMode ?? "")}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4 w-full relative z-10"
          >
            <div className="glass-enhance border border-outline-variant/25 rounded-2xl overflow-hidden before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none relative">
              {/* ── Veredicto (cabecera con severidad derivada) ── */}
              <div
                className="border-b border-outline-variant/20 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                style={{
                  background: `linear-gradient(135deg, color-mix(in oklch, ${severity.color} 8%, transparent), transparent 60%)`,
                }}
              >
                <div className="space-y-2 min-w-0">
                  <span className="text-[10px] font-mono tracking-widest text-on-surface-variant/70 uppercase flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    DIAGNÓSTICO DIALÉCTICO
                  </span>
                  <h3 className="text-lg font-bold text-on-surface leading-normal font-heading">
                    “{analysis.argumentSummary}”
                  </h3>
                  <p className="text-[11px] text-on-surface-variant/50 italic truncate">
                    Sobre: “{lastAnalyzedText}”
                  </p>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
                  <span
                    className="text-[10px] font-mono font-bold px-2.5 py-1 rounded uppercase border flex items-center gap-1.5"
                    style={{
                      color: severity.color,
                      borderColor: `color-mix(in oklch, ${severity.color} 35%, transparent)`,
                      backgroundColor: `color-mix(in oklch, ${severity.color} 10%, transparent)`,
                    }}
                  >
                    <Gauge className="w-3 h-3" />
                    {severity.label}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-on-surface-variant/40">
                    {ANALYSIS_MODES.find((m) => m.id === lastAnalyzedMode)?.label}
                  </span>
                </div>
              </div>

              {/* ── Cuerpo: grid de 12 columnas ── */}
              <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Columna izquierda */}
                <div className="lg:col-span-5 space-y-4">
                  <ResultSection
                    icon={<ShieldAlert className="w-3.5 h-3.5" />}
                    title="Axiomas Implícitos"
                    accent="var(--ch2)"
                    intro="Verdades que tu mente da por válidas automáticamente para sostener tu justificación:"
                  >
                    <ul className="space-y-1.5">
                      {analysis.axioms.map((ax, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-on-surface-variant bg-surface-dim/30 px-3 py-2 rounded-lg border border-outline-variant/10"
                        >
                          <span className="text-on-surface-variant/40 font-mono text-[10px] mt-0.5 shrink-0">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="text-[11.5px] leading-relaxed">{ax}</span>
                        </li>
                      ))}
                    </ul>
                  </ResultSection>

                  <ResultSection
                    icon={<FileText className="w-3.5 h-3.5" />}
                    title="Precisión Científica"
                    accent="var(--ch4)"
                  >
                    <span className="inline-block text-[10px] font-mono px-2.5 py-0.5 rounded uppercase bg-surface-dim/40 border border-outline-variant/20 text-on-surface-variant mb-2">
                      {analysis.scientificAccuracy.rating}
                    </span>
                    <p className="text-[11.5px] text-on-surface-variant/80 leading-relaxed">
                      {analysis.scientificAccuracy.analysis}
                    </p>
                  </ResultSection>
                </div>

                {/* Columna derecha */}
                <div className="lg:col-span-7 space-y-4">
                  <ResultSection
                    icon={<Compass className="w-3.5 h-3.5" />}
                    title="Deconstrucción y Sesgos"
                    accent="var(--ch5)"
                  >
                    <div className="space-y-2.5">
                      {analysis.logicalFailures.map((fail, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 text-on-surface-variant/85 bg-surface-dim/20 px-3 py-2 rounded-lg border-l-2"
                          style={{ borderColor: "var(--ch5)" }}
                        >
                          <AlertCircle className="w-3.5 h-3.5 text-ch5/70 shrink-0 mt-0.5" />
                          <p className="leading-relaxed text-[11.5px]">{fail}</p>
                        </div>
                      ))}
                    </div>
                  </ResultSection>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ResultSection
                      icon={<Activity className="w-3.5 h-3.5" />}
                      title="Sintiencia Aludida"
                      accent="var(--ch1)"
                      compact
                    >
                      <p className="text-[11px] text-on-surface-variant/80 leading-relaxed">
                        {analysis.impactAnalysis.sintiente}
                      </p>
                    </ResultSection>
                    <ResultSection
                      icon={<Flame className="w-3.5 h-3.5" />}
                      title="Desgaste Térmico"
                      accent="var(--ch6)"
                      compact
                    >
                      <p className="text-[11px] text-on-surface-variant/80 leading-relaxed">
                        {analysis.impactAnalysis.ecosistemic}
                      </p>
                    </ResultSection>
                  </div>
                </div>
              </div>

              {/* ── Pregunta socrática final ── */}
              <div className="bg-surface-dim/20 p-6 border-t border-outline-variant/15 text-center space-y-3 relative overflow-hidden">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-[0.02] text-on-surface pointer-events-none">
                  <Brain className="w-24 h-24" />
                </div>
                <div className="flex items-center justify-center gap-1.5 text-on-surface-variant/60 text-[10px] font-mono tracking-widest uppercase">
                  <Sparkles className="w-3 h-3" />
                  PREGUNTA SOCRÁTICA FINAL
                </div>
                <p className="text-body-md font-heading italic text-on-surface max-w-2xl mx-auto leading-relaxed">
                  “{analysis.alternativeReflection}”
                </p>
              </div>

              {/* ── Acciones post-análisis ── */}
              <div className="bg-surface-dim/10 px-6 py-4 border-t border-outline-variant/15 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={handleCopy}
                  className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-ch6" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copiado" : "Copiar análisis"}
                </button>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-on-surface-variant/40">
                    Re-analizar en otro modo:
                  </span>
                  {ANALYSIS_MODES.filter((m) => m.id !== lastAnalyzedMode).map((m) => {
                    const Icon = m.icon;
                    return (
                      <button
                        key={m.id}
                        onClick={() => void handleSubmit(lastAnalyzedText, m.id)}
                        disabled={loading}
                        className="text-[9px] font-mono uppercase tracking-widest px-2 py-1 rounded-md border border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:border-primary/40 transition-all flex items-center gap-1 cursor-pointer disabled:opacity-40"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <Icon className="w-3 h-3" />
                        {m.label.split(" ")[0]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═════════════════════════ ESTADO VACÍO (sin análisis y sin carga) ═════════════════════════ */}
      {!analysis && !loading && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative z-10 py-10 text-center space-y-4"
        >
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-2xl bg-surface-dim/40 border border-outline-variant/20 flex items-center justify-center">
              <Quote className="w-7 h-7 text-on-surface-variant/30" />
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-technical-xs uppercase tracking-[0.2em] text-on-surface-variant/40">
              A la espera de premisa
            </p>
            <p className="text-xs text-on-surface-variant/40 max-w-sm mx-auto leading-relaxed">
              Escribe una justificación arriba o elige un ejemplo de la biblioteca para que la IA lo deconstruya.
            </p>
          </div>
        </motion.div>
      )}
    </motion.section>
  );
});

/* ──────────────────────────────────────────────────────────────────────────
 *  Subcomponente: sección de resultado reutilizable
 * ────────────────────────────────────────────────────────────────────────── */
function ResultSection({
  icon,
  title,
  accent,
  intro,
  compact,
  children,
}: {
  icon: ReactNode;
  title: string;
  accent: string;
  intro?: string;
  compact?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`bg-surface-dim/20 ${compact ? "p-3.5" : "p-4"} rounded-xl border border-outline-variant/15 space-y-2`}>
      <h4 className="text-technical-xs flex items-center gap-1.5 border-b border-outline-variant/15 pb-1.5 mb-2" style={{ color: accent }}>
        {icon}
        {title}
      </h4>
      {intro && <p className="text-[11px] text-on-surface-variant/60 leading-relaxed mb-2">{intro}</p>}
      {children}
    </div>
  );
}
