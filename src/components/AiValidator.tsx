import { useState, useEffect } from "react";
import { 
  Send, 
  HelpCircle, 
  AlertCircle, 
  PlusCircle, 
  Loader2, 
  Compass, 
  Brain, 
  FileText, 
  ShieldAlert, 
  Workflow, 
  Activity, 
  CheckCircle2, 
  Flame, 
  Sparkles 
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PageGlows } from "./ui/AmbientGlow";
import TabNav, { TabType } from "./TabNav";

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

interface AiValidatorProps {
  argumentToAnalyze: string | null;
  clearArgument: () => void;
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

const PRESET_EXCUSAS = [
  "Los seres humanos somos omnívoros por evolución fáctica.",
  "La ganadería extensiva respeta el bienestar animal y no daña nada.",
  "Comer carne estimula la economía, da empleo y mantiene tradiciones místicas.",
  "Si dejamos de comer animales, se reproducirían sin control y extinguirían los pastos."
];

export default function AiValidator({ argumentToAnalyze, clearArgument, activeTab, onNavigate, theme, onToggleTheme }: AiValidatorProps) {
  const [userInput, setUserInput] = useState("");
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (argumentToAnalyze) {
      setUserInput(argumentToAnalyze);
      handleOnSubmit(argumentToAnalyze);
      clearArgument(); // reset trigger on parent
    }
  }, [argumentToAnalyze]);

  const handleOnSubmit = async (textToSend: string) => {
    const finalVal = textToSend || userInput;
    if (!finalVal.trim()) return;

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const response = await fetch("/api/analyze-argument", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ argument: finalVal, context: "sintiens AI Validator" })
      });

      if (!response.ok) {
        throw new Error("El servidor no pudo procesar la solicitud de análisis. Comprueba la API key o reinténtalo.");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setAnalysis(data);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Algo salió mal procesando el análisis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="ai-validator-view" className="space-y-10 w-full relative">

      <PageGlows />

      {/* Header */}
      <div className="relative z-10 space-y-3 border-b border-outline-variant/20 pb-8">
        <span className="text-[10px] font-mono font-bold text-primary select-none tracking-[0.25em] uppercase block opacity-60">
          [ IA ]
        </span>
        <h3 className="text-display-md text-on-surface">
          Descompresor<span className="text-secondary/60 font-light"> · Axiomas No Examinados</span>
        </h3>
        <p className="text-body-md text-on-surface-variant max-w-2xl">
          Escribe cualquier argumento o excusa que utilices para justificar el consumo animal. La IA de Sintiens deconstruirá su validez lógica y expondrá sus sesgos.
        </p>
      </div>

      <div className="w-full py-4">
        <TabNav activeTab={activeTab} onNavigate={onNavigate} theme={theme} onToggleTheme={onToggleTheme} />
      </div>

      {/* Input Form */}
      <div className="glass-enhance border border-outline-variant/25 rounded-2xl p-5 lg:p-6 space-y-4 relative z-10 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleOnSubmit(""); }}
            placeholder="Introduce una excusa: ej. 'Los leones consumen carne y es natural que hagamos lo mismo'..."
            className="flex-1 bg-surface-dim/30 border border-outline-variant/30 focus:border-primary rounded-xl px-5 py-4 text-body-sm text-on-surface outline-none transition-all placeholder:text-on-surface-variant/40 w-full"
            disabled={loading}
          />
          <button
            onClick={() => handleOnSubmit("")}
            disabled={loading || !userInput.trim()}
            className="px-6 py-4 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-semibold text-[11px] font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer w-full sm:w-auto shrink-0"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {loading ? "Analizando" : "Someter"}
          </button>
        </div>

        <div className="space-y-1.5">
          <span className="text-[10px] font-mono text-on-surface-variant/60 uppercase tracking-widest block">
            Ejemplos clásicos para testear:
          </span>
          <div className="flex flex-wrap gap-2 w-full">
            {PRESET_EXCUSAS.map((preset, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setUserInput(preset);
                  handleOnSubmit(preset);
                }}
                disabled={loading}
                className="text-xs px-3.5 py-2.5 rounded-xl bg-surface-dim/30 hover:bg-surface-dim/50 text-on-surface-variant border border-outline-variant/20 hover:border-outline-variant/60 transition-all flex items-start gap-2 text-left cursor-pointer w-full sm:w-auto whitespace-normal break-words"
              >
                <PlusCircle className="w-3.5 h-3.5 text-on-surface-variant/50 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{preset}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading && (
        <div className="glass-enhance border border-outline-variant/25 rounded-2xl p-12 flex flex-col items-center justify-center text-center space-y-4 relative z-10 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <h4 className="text-body-md text-on-surface">Diseccionando premisas lógicas...</h4>
          <p className="text-body-sm text-on-surface-variant max-w-sm">Evaluando nocicepción, termodinámica y buscando sesgos con la IA de Sintiens.</p>
        </div>
      )}

      {error && (
        <div className="bg-ch1/10 border border-ch1/20 rounded-xl p-4 flex gap-3 text-body-sm text-ch1 relative z-10">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <div className="space-y-1">
            <span className="font-semibold block">Error de deconstrucción</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Analysis Results */}
      <AnimatePresence>
        {analysis && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35 }}
            className="space-y-6 w-full relative z-10"
          >
            <div className="glass-enhance border border-outline-variant/25 rounded-2xl overflow-hidden before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none relative">

              <div className="bg-surface-dim/20 border-b border-outline-variant/20 p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-on-surface-variant/70 uppercase flex items-center gap-1">
                    <Workflow className="w-3.5 h-3.5" /> DIAGNÓSTICO DIALÉCTICO
                  </span>
                  <h3 className="text-lg font-bold text-on-surface leading-normal font-heading">
                    &ldquo;{analysis.argumentSummary}&rdquo;
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                  Sintaxis: Deconstruida
                </span>
              </div>

              <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs font-light">
                <div className="lg:col-span-5 space-y-4">
                  <div className="space-y-2 bg-surface-dim/20 p-4 rounded-xl border border-outline-variant/15">
                    <h4 className="text-technical-xs text-on-surface flex items-center gap-1.5 border-b border-outline-variant/15 pb-1.5 mb-2">
                      <ShieldAlert className="w-3.5 h-3.5 text-ch2" />
                      Axiomas Implícitos
                    </h4>
                    <p className="text-[11px] text-on-surface-variant/70 leading-relaxed mb-3">
                      Verdades que tu mente da por válidas automáticamente para sostener tu justificación:
                    </p>
                    <ul className="space-y-1.5">
                      {analysis.axioms.map((ax, i) => (
                        <li key={i} className="flex items-center gap-2 text-on-surface-variant bg-surface-dim/30 px-3 py-1.5 rounded-lg border border-outline-variant/10">
                          <CheckCircle2 className="w-3.5 h-3.5 text-on-surface-variant/50 shrink-0" />
                          <span>{ax}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2 bg-surface-dim/20 p-4 rounded-xl border border-outline-variant/15">
                    <h4 className="text-technical-xs text-on-surface flex items-center gap-1.5 border-b border-outline-variant/15 pb-1.5 mb-2">
                      <FileText className="w-3.5 h-3.5 text-ch4" />
                      Precisión Científica
                    </h4>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded uppercase bg-surface-dim/40 border border-outline-variant/20 text-on-surface-variant">
                        {analysis.scientificAccuracy.rating}
                      </span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant/70 leading-relaxed">
                      {analysis.scientificAccuracy.analysis}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
                  <div className="space-y-2 bg-surface-dim/20 p-4 rounded-xl border border-outline-variant/15">
                    <h4 className="text-technical-xs text-on-surface flex items-center gap-1.5 border-b border-outline-variant/15 pb-1.5 mb-2">
                      <Compass className="w-3.5 h-3.5 text-ch5" />
                      Deconstrucción y Sesgos
                    </h4>
                    <div className="space-y-3 text-on-surface-variant/80">
                      {analysis.logicalFailures.map((fail, i) => (
                        <p key={i} className="leading-relaxed text-xs">{fail}</p>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-surface-dim/20 p-4 rounded-xl border border-outline-variant/15 space-y-2">
                      <div className="flex items-center gap-1.5 text-ch1 font-semibold font-mono text-[10px] tracking-wider uppercase">
                        <Activity className="w-3.5 h-3.5" />
                        Sintiencia Aludida
                      </div>
                      <p className="text-[10.5px] text-on-surface-variant/70 leading-relaxed">
                        {analysis.impactAnalysis.sintiente}
                      </p>
                    </div>
                    <div className="bg-surface-dim/20 p-4 rounded-xl border border-outline-variant/15 space-y-2">
                      <div className="flex items-center gap-1.5 text-ch6 font-semibold font-mono text-[10px] tracking-wider uppercase">
                        <Flame className="w-3.5 h-3.5" />
                        Desgaste Térmico
                      </div>
                      <p className="text-[10.5px] text-on-surface-variant/70 leading-relaxed">
                        {analysis.impactAnalysis.ecosistemic}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-surface-dim/20 p-6 border-t border-outline-variant/15 text-center space-y-3 relative overflow-hidden">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 opacity-[0.02] text-on-surface pointer-events-none">
                  <Brain className="w-24 h-24" />
                </div>
                <div className="flex items-center justify-center gap-1.5 text-on-surface-variant/60 text-[10px] font-mono tracking-widest uppercase">
                  <Sparkles className="w-3 h-3" />
                  PREGUNTA SOCRÁTICA FINAL
                </div>
                <p className="text-body-md font-heading italic text-on-surface max-w-2xl mx-auto leading-relaxed">
                  &ldquo;{analysis.alternativeReflection}&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


