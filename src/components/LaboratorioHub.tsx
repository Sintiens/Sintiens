import { memo } from "react";
import { motion } from "motion/react";
import { FlaskConical, Calculator, BrainCircuit, Activity, Layers } from "lucide-react";
import type { TabType } from "../types";

interface LaboratorioHubProps {
  onNavigate: (tab: TabType) => void;
}

export default memo(function LaboratorioHub({ onNavigate }: LaboratorioHubProps) {
  return (
    <motion.div
      key="laboratorio_hub"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
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
          <div className="w-full flex flex-col lg:justify-center items-center text-center relative h-[550px] min-h-[550px] lg:h-[600px] lg:min-h-[600px] pt-16 lg:pt-28 pb-20 lg:pb-24 px-6 lg:px-16">
            <motion.div layoutId="global-crosshairs" className="absolute inset-0 pointer-events-none select-none z-0">
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
            </motion.div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
              <FlaskConical
                className="text-zinc-900 dark:text-zinc-100 blur"
                style={{
                  width: "clamp(144px, 45vw, 540px)",
                  height: "clamp(144px, 45vw, 540px)",
                  opacity: 0.12,
                  strokeWidth: 1.5,
                }}
              />
            </div>

            <div className="flex-1 lg:flex-none flex flex-col justify-center items-center w-full">
              {/* Title and Subtitle Section */}
              <div className="space-y-2 lg:space-y-4 max-w-3xl w-full text-center relative z-10 mt-12 lg:mt-20">
                <span className="text-[10px] font-mono font-bold text-primary select-none tracking-[0.25em] uppercase block opacity-60">
                  [ LABORATORIO ]
                </span>
                <h1 className="text-[clamp(42px,8.5vw,80px)] font-bold tracking-tight font-heading leading-[1.05] text-on-background select-none">
                  Laboratorio
                </h1>
                <p className="max-w-2xl mx-auto pt-1 font-serif italic font-light text-on-surface-variant/70 leading-relaxed text-[14px] sm:text-[16px] md:text-[18px] lg:text-[19px] text-center tracking-normal select-none">
                  Herramientas interactivas para calcular el impacto, descomponer el discurso y someter los argumentos al rigor analítico.
                </p>
                <div className="flex items-center justify-center gap-6 pt-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5" />
                    INTERACTIVO
                  </span>
                  <span className="w-px h-4 bg-outline-variant/50" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5" />
                    2 HERRAMIENTAS
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
        <div className="w-full max-w-5xl mx-auto px-6 lg:px-8 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-20">
            
            {/* Card 1: Calculadora de Impacto */}
            <button 
              onClick={() => onNavigate("calculadora")}
              className="group relative flex flex-col items-start justify-start p-8 md:p-10 rounded-3xl bg-surface dark:bg-surface-dim border border-outline-variant/30 text-left transition-all hover:scale-[1.02] hover:shadow-lg focus:outline-none cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <Calculator className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-on-surface mb-3">Calculadora de Impacto</h3>
              <p className="text-on-surface-variant/80 font-serif leading-relaxed">
                Introduce tus datos de consumo y descubre tu huella exacta: recursos naturales, vidas de animales y emisiones a lo largo de un año y una vida.
              </p>
            </button>

            {/* Card 2: Validador AI */}
            <button 
              onClick={() => onNavigate("validador")}
              className="group relative flex flex-col items-start justify-start p-8 md:p-10 rounded-3xl bg-surface dark:bg-surface-dim border border-outline-variant/30 text-left transition-all hover:scale-[1.02] hover:shadow-lg focus:outline-none cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                <BrainCircuit className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold font-heading text-on-surface mb-3">Validador con IA</h3>
              <p className="text-on-surface-variant/80 font-serif leading-relaxed">
                Escribe cualquier argumento que justifique el consumo animal. Sintiens deconstruirá su validez lógica mediante modos de razonamiento avanzado.
              </p>
            </button>

          </div>
        </div>
        
        {/* Espaciador final para scroll */}
        <div className="h-32" />
      </div>
    </motion.div>
  );
});
