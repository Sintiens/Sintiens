import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, EyeOff, ShieldCheck, MessageSquare, Split } from "lucide-react";

interface MechanismData {
  id: string;
  title: string;
  subtitle: string;
  icon: typeof Brain;
  psychologicalStudy: string;
  howItWorks: string;
  everydayExample: string;
  deconstruction: string;
}

const MECHANISMS: MechanismData[] = [
  {
    id: "mind_denial",
    title: "1. Des-atribución de Mente",
    subtitle: "«No sufren como nosotros»",
    icon: EyeOff,
    psychologicalStudy: "Bastian et al. (2012) · Journal of Experimental Social Psychology",
    howItWorks: "Cuando a las personas se les informa de que van a comer carne de un animal en breve, evalúan inconscientemente su capacidad moral y cognitiva mucho más baja que si solo lo observan en una foto.",
    everydayExample: "Creer que las vacas o los peces no se dan cuenta de su cautiverio o que su sufrimiento no es 'auténtico'.",
    deconstruction: "Negar la mente del animal reduce la culpa moral del consumidor sin obligarle a cambiar su conducta alimentaria.",
  },
  {
    id: "four_ns",
    title: "2. Las 4 'N' de la Justificación",
    subtitle: "Natural, Necesario, Normal y Agradable (Nice)",
    icon: ShieldCheck,
    psychologicalStudy: "Piazza et al. (2015) · Appetite",
    howItWorks: "El 91% de los argumentos espontáneos para comer carne se agrupan en cuatro axiomas de conveniencia que el cerebro utiliza como escudo automático.",
    everydayExample: "«Los leones comen carne (Natural)», «Necesitamos proteína animal (Necesario)», «Toda la sociedad lo hace (Normal)», «Está demasiado rico (Nice)».",
    deconstruction: "Ninguno de los cuatro axiomas resiste el análisis lógico: la naturaleza no dicta la ética, la proteína vegetal es completa y la tradición no justifica el daño.",
  },
  {
    id: "linguistic_dissociation",
    title: "3. Disociación Lingüística",
    subtitle: "Ocultar al individuo detrás del plato",
    icon: MessageSquare,
    psychologicalStudy: "Kunst & Hohle (2016) · Appetite",
    howItWorks: "El lenguaje culinario sustituye sistemáticamente las partes del cuerpo y el nombre del animal por conceptos gastronómicos asépticos.",
    everydayExample: "Decimos 'lomo, beicon, salchicha, filete o jamón' en lugar de 'músculo dorsal de cerdo mutilado' o 'cadáver de vaca descuartizado'.",
    deconstruction: "Estudios demuestran que mostrar la cabeza del animal o llamar al plato por su nombre real reduce drásticamente la disposición a consumirlo.",
  },
  {
    id: "diffusion_responsibility",
    title: "4. Difusión de Responsabilidad",
    subtitle: "«Yo solo compro lo que hay en el supermercado»",
    icon: Split,
    psychologicalStudy: "Bandura (1999) · Moral Disengagement in the Perpetration of Inhumanities",
    howItWorks: "La cadena industrial divide la acción en eslabones aislados (granjero $\to$ transportista $\to$ matarife $\to$ supermercado $\to$ consumidor), de modo que nadie se siente el causante directo de la muerte.",
    everydayExample: "«Si yo dejo de comer carne no cambiará nada; el animal ya estaba muerto en la bandeja de plástico».",
    deconstruction: "La demanda económica individual agregada determina exactamente el número de nacimientos e inseminaciones programadas en la siguiente tanda de cría.",
  },
];

export default function MeatParadoxVisualizer() {
  const [activeId, setActiveId] = useState<string>("mind_denial");

  const current = MECHANISMS.find((m) => m.id === activeId) || MECHANISMS[0]!;
  const CurrentIcon = current.icon;

  return (
    <div className="w-full bg-surface/90 dark:bg-surface-dim/80 border border-outline-variant/30 rounded-2xl p-5 sm:p-7 space-y-6 shadow-sm">
      <div className="space-y-1 border-b border-outline-variant/20 pb-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
            PSICOLOGÍA SOCIAL & COGNICIÓN
          </span>
          <span className="text-[10px] font-mono text-on-surface-variant/60">
            La Paradoja de la Carne
          </span>
        </div>
        <h4 className="text-lg sm:text-xl font-heading font-bold text-on-surface">
          Los 4 Mecanismos del Autoengaño Mental
        </h4>
        <p className="text-xs font-sans text-on-surface-variant leading-relaxed">
          La mayoría de las personas se oponen al maltrato animal, pero financian su explotación diaria. La mente recurre a sesgos protectores para evitar el conflicto moral.
        </p>
      </div>

      {/* Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {MECHANISMS.map((m) => {
          const isSelected = m.id === activeId;
          const BtnIcon = m.icon;

          return (
            <button
              key={m.id}
              onClick={() => setActiveId(m.id)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-primary/10 border-primary ring-2 ring-primary/20 shadow-sm"
                  : "bg-surface-dim/40 border-outline-variant/20 hover:bg-surface-dim/70 text-on-surface-variant"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <BtnIcon className={`w-4 h-4 ${isSelected ? "text-primary" : "text-on-surface-variant/60"}`} />
              </div>
              <div className="font-heading font-bold text-xs text-on-surface leading-tight">
                {m.title.split(". ")[1]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Mechanism Detailed Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="p-5 sm:p-6 rounded-2xl bg-surface-dim/60 border border-outline-variant/20 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary/10 text-primary">
                <CurrentIcon className="w-5 h-5" />
              </div>
              <div>
                <h5 className="font-heading font-bold text-base text-on-surface">
                  {current.title}
                </h5>
                <span className="text-[10px] font-mono text-on-surface-variant/60">
                  {current.subtitle}
                </span>
              </div>
            </div>
            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-surface-dim text-on-surface-variant font-bold">
              Evidencia Experimental
            </span>
          </div>

          <div className="space-y-2 text-xs font-sans">
            <div>
              <span className="font-mono text-[10px] text-primary font-bold uppercase block">
                Mecanismo Psicológico:
              </span>
              <p className="text-on-surface-variant text-[11px] leading-relaxed pt-0.5">
                {current.howItWorks}
              </p>
            </div>

            <div className="p-3 bg-surface/90 dark:bg-surface-dim rounded-xl border border-outline-variant/20 space-y-1">
              <span className="font-mono text-[10px] text-on-surface font-bold uppercase block">
                Manifestación Cotidiana:
              </span>
              <p className="text-on-surface-variant text-[11px] italic">
                {current.everydayExample}
              </p>
            </div>

            <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 space-y-1">
              <span className="font-mono text-[10px] text-primary font-bold uppercase block">
                Deconstrucción Racional:
              </span>
              <p className="text-on-surface-variant text-[11px] leading-relaxed">
                {current.deconstruction}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
