import { memo } from "react";
import { motion } from "motion/react";
import { FlaskConical, Calculator, BrainCircuit, Activity, Layers, Scale, Flame, Brain, Salad, ShieldAlert } from "lucide-react";
import type { TabType } from "../types";

interface LaboratorioHubProps {
  onNavigate: (tab: TabType) => void;
}

export default memo(function LaboratorioHub({ onNavigate }: LaboratorioHubProps) {
  return (
    <motion.div
      key="laboratorio_hub"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="col-start-1 row-start-1 w-full h-full flex flex-col"
    >
      <div id="laboratorio-hub-view" className="space-y-16 w-full relative text-left">
        {/* SECTION 0: Hero & Hook */}
        <div 
          id="hero"
          className="-mt-12 lg:-mt-20 flex flex-col items-center relative bg-transparent w-full"
          style={{
            width: "calc(100vw - var(--scrollbar-width, 0px))",
            marginLeft: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
            marginRight: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
          }}
        >
          <div className="w-full flex flex-col lg:justify-center items-center text-center relative h-[550px] min-h-[550px] lg:h-[600px] lg:min-h-[600px] pt-16 lg:pt-28 pb-20 lg:pb-24 px-6 lg:px-16 border-b border-outline-variant/15">
            <div className="absolute inset-0 pointer-events-none select-none z-0">
              <div className="absolute top-[25px] left-[20px] w-6 h-6 flex items-center justify-center">
                <div className="absolute w-4 h-[2px] bg-primary/30" /><div className="absolute w-[2px] h-4 bg-primary/30" />
              </div>
              <div className="absolute top-[25px] right-[20px] w-6 h-6 flex items-center justify-center">
                <div className="absolute w-4 h-[2px] bg-primary/30" /><div className="absolute w-[2px] h-4 bg-primary/30" />
              </div>
              <div className="absolute bottom-[25px] left-[20px] w-6 h-6 flex items-center justify-center">
                <div className="absolute w-4 h-[2px] bg-primary/30" /><div className="absolute w-[2px] h-4 bg-primary/30" />
              </div>
              <div className="absolute bottom-[25px] right-[20px] w-6 h-6 flex items-center justify-center">
                <div className="absolute w-4 h-[2px] bg-primary/30" /><div className="absolute w-[2px] h-4 bg-primary/30" />
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
              <FlaskConical
                className="text-zinc-900 dark:text-zinc-100 blur"
                style={{
                  width: "clamp(144px, 45vw, 540px)",
                  height: "clamp(144px, 45vw, 540px)",
                  opacity: 0.10,
                  strokeWidth: 1.2,
                }}
              />
            </div>

            <div className="flex-1 lg:flex-none flex flex-col justify-center items-center w-full">
              {/* Title and Subtitle Section */}
              <div className="space-y-2 lg:space-y-4 max-w-3xl w-full text-center relative z-10 mt-12 lg:mt-20">
                <h1 className="text-[clamp(42px,8.5vw,80px)] font-bold tracking-tight font-heading leading-[1.05] text-on-background select-none">
                  Laboratorio
                </h1>
                <p className="max-w-2xl mx-auto pt-1 font-serif italic font-light text-on-surface-variant/70 leading-relaxed text-[14px] sm:text-[16px] md:text-[18px] lg:text-[19px] text-center tracking-normal select-none">
                  Centro interactivo de experimentación bioética, física trófica, neurociencia, bioquímica clínica, auditoría legal y dialéctica analítica.
                </p>
                <div className="flex items-center justify-center gap-6 pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5" />
                    INTERACTIVO
                  </span>
                  <span className="w-px h-4 bg-outline-variant/50" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5" />
                    7 HERRAMIENTAS
                  </span>
                </div>
              </div>
            </div>

          </div>
          
          <div className="w-full relative z-[100] px-6 lg:px-16 max-w-7xl mx-auto -mt-16 lg:-mt-24 mb-16">
            <div className="flex justify-center">
              <div className="pointer-events-auto">
                {/* TabNav is now global in App.tsx */}
              </div>
            </div>
          </div>
        </div>

        {/* CARDS SECTION */}
        <div className="w-full max-w-5xl mx-auto px-6 lg:px-8 mt-12 space-y-6">
          
          {/* Row 1: 3 Scientific & Philosophical Simulators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20">
            {/* Tool 1: El Velo de la Ignorancia */}
            <button
              type="button"
              onClick={() => onNavigate("velo_rawls")}
              className="group relative flex flex-col items-start justify-start p-7 md:p-8 rounded-2xl glass-enhance border border-outline-variant/20 text-left transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 cursor-pointer overflow-hidden before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:scale-105 group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
                <Scale className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-primary/10 text-primary font-semibold inline-block">
                  EXPERIMENTO ÉTICO
                </span>
                <h3 className="text-xl font-bold font-heading text-on-surface">
                  El Velo de la Ignorancia
                </h3>
                <p className="text-on-surface-variant/75 font-serif leading-relaxed text-xs sm:text-sm">
                  Diseña las leyes del planeta y atraviesa el Velo de Rawls para nacer al azar en la biosfera.
                </p>
              </div>
            </button>

            {/* Tool 2: Termodinámica Trófica */}
            <button
              type="button"
              onClick={() => onNavigate("termodinamica")}
              className="group relative flex flex-col items-start justify-start p-7 md:p-8 rounded-2xl glass-enhance border border-outline-variant/20 text-left transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 cursor-pointer overflow-hidden before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none"
            >
              <div className="w-11 h-11 rounded-xl bg-amber-500/10 flex items-center justify-center mb-4 text-amber-600 dark:text-amber-400 group-hover:scale-105 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                <Flame className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 font-semibold inline-block">
                  FÍSICA & ECOLOGÍA
                </span>
                <h3 className="text-xl font-bold font-heading text-on-surface">
                  Termodinámica Trófica
                </h3>
                <p className="text-on-surface-variant/75 font-serif leading-relaxed text-xs sm:text-sm">
                  Diagrama de Sankey: visualiza el 90-98% de calorías y cereal que se disipan en animales.
                </p>
              </div>
            </button>

            {/* Tool 3: Neurobiología y Consciencia */}
            <button
              type="button"
              onClick={() => onNavigate("neurobiologia")}
              className="group relative flex flex-col items-start justify-start p-7 md:p-8 rounded-2xl glass-enhance border border-outline-variant/20 text-left transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 cursor-pointer overflow-hidden before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none"
            >
              <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <Brain className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-blue-500/10 text-blue-700 dark:text-blue-400 font-semibold inline-block">
                  NEUROCIENCIA
                </span>
                <h3 className="text-xl font-bold font-heading text-on-surface">
                  Bases de la Consciencia
                </h3>
                <p className="text-on-surface-variant/75 font-serif leading-relaxed text-xs sm:text-sm">
                  Visor anatómico interactivo: vías del dolor, sistema límbico y tratados de Cambridge y Nueva York.
                </p>
              </div>
            </button>
          </div>

          {/* Row 2: 2 Applied Biological & Legal Scanners */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
            {/* Tool 4: Nutrición Basada en Evidencia */}
            <button
              type="button"
              onClick={() => onNavigate("nutricion")}
              className="group relative flex flex-col items-start justify-start p-7 md:p-8 rounded-2xl glass-enhance border border-outline-variant/20 text-left transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 cursor-pointer overflow-hidden before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                <Salad className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-semibold inline-block">
                  BIOQUÍMICA CLÍNICA
                </span>
                <h3 className="text-xl font-bold font-heading text-on-surface">
                  Nutrición Clínica & Evidencia
                </h3>
                <p className="text-on-surface-variant/75 font-serif leading-relaxed text-xs sm:text-sm">
                  Desmitificador molecular: B12, hierro hemo vs no hemo, proteínas DIAAS y consensos AND/Harvard.
                </p>
              </div>
            </button>

            {/* Tool 5: Escáner de Welfarewashing */}
            <button
              type="button"
              onClick={() => onNavigate("welfarewashing")}
              className="group relative flex flex-col items-start justify-start p-7 md:p-8 rounded-2xl glass-enhance border border-outline-variant/20 text-left transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 cursor-pointer overflow-hidden before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none"
            >
              <div className="w-11 h-11 rounded-xl bg-red-500/10 flex items-center justify-center mb-4 text-red-600 dark:text-red-400 group-hover:scale-105 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-red-500/10 text-red-700 dark:text-red-400 font-semibold inline-block">
                  DERECHO & ETOLOGÍA
                </span>
                <h3 className="text-xl font-bold font-heading text-on-surface">
                  Escáner de Welfarewashing
                </h3>
                <p className="text-on-surface-variant/75 font-serif leading-relaxed text-xs sm:text-sm">
                  Pantalla dividida: el marketing y la ley frente a las cláusulas de excepción y dictámenes de la EFSA.
                </p>
              </div>
            </button>
          </div>

          {/* Row 3: 2 Calculator & AI Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
            {/* Tool 6: Calculadora de Impacto */}
            <button 
              type="button"
              onClick={() => onNavigate("calculadora")}
              className="group relative flex flex-col items-start justify-start p-7 md:p-8 rounded-2xl glass-enhance border border-outline-variant/20 text-left transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 cursor-pointer overflow-hidden before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:scale-105 transition-transform duration-300">
                <Calculator className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-surface-dim text-on-surface-variant/60 font-semibold inline-block">
                  HUELLA ECOLÓGICA
                </span>
                <h3 className="text-xl font-bold font-heading text-on-surface">Calculadora de Impacto</h3>
                <p className="text-on-surface-variant/75 font-serif leading-relaxed text-xs sm:text-sm">
                  Calcula tu huella exacta en agua, CO2, suelo deforestado y vidas de animales salvadas.
                </p>
              </div>
            </button>

            {/* Tool 7: Validador AI */}
            <button 
              type="button"
              onClick={() => onNavigate("validador")}
              className="group relative flex flex-col items-start justify-start p-7 md:p-8 rounded-2xl glass-enhance border border-outline-variant/20 text-left transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 cursor-pointer overflow-hidden before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:scale-105 transition-transform duration-300">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-surface-dim text-on-surface-variant/60 font-semibold inline-block">
                  ANÁLISIS SOCRÁTICO
                </span>
                <h3 className="text-xl font-bold font-heading text-on-surface">Validador con IA</h3>
                <p className="text-on-surface-variant/75 font-serif leading-relaxed text-xs sm:text-sm">
                  Deconstrucción socrática de argumentos y extracción de axiomas implícitos con Gemini.
                </p>
              </div>
            </button>

          </div>
        </div>

        {/* Espaciador final para scroll */}
        <div className="h-32" />
      </div>
    </motion.div>
  );
});

