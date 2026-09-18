import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface MilestoneData {
  year: string;
  title: string;
  jurisdiction: string;
  statusChange: string;
  legalText: string;
  implication: string;
}

const MILESTONES: MilestoneData[] = [
  {
    year: "S. II a.C. - S. XX",
    title: "El Paradigma de la Cosa (Res)",
    jurisdiction: "Derecho Romano & Códigos Civiles Napoleónicos",
    statusChange: "Animal = Bien Mueble / Propiedad",
    legalText: "«Los animales son cosas muebles semovientes susceptibles de apropiación, gravamen o destrucción según la libre voluntad de su propietario.»",
    implication: "El maltrato o muerte de un animal se juzgaba exclusivamente como un daño patrimonial contra la propiedad de su amo, no contra la víctima.",
  },
  {
    year: "2009",
    title: "Tratado de Lisboa (Art. 13 TFUE)",
    jurisdiction: "Unión Europea",
    statusChange: "Reconocimiento Constitucional de Sintiencia",
    legalText: "«Al formular y aplicar las políticas de la Unión, la Unión y los Estados miembros tendrán plenamente en cuenta las exigencias en materia de bienestar de los animales como seres sintientes...»",
    implication: "Por primera vez en un tratado internacional vinculante, se supera formalmente la categoría jurídica de objeto inanimado.",
  },
  {
    year: "2016",
    title: "Habeas Corpus de la Chimpancé Cecilia",
    jurisdiction: "Tercer Juzgado de Garantías de Mendoza (Argentina)",
    statusChange: "Sujeto de Derecho No Humano",
    legalText: "«Los animales son sujetos de derechos no humanos, titulares de prerrogativas básicas como la vida, la libertad y el no padecimiento de sufrimientos innecesarios.»",
    implication: "La jueza María Alejandra Mauricio ordenó la liberación inmediata de Cecilia de su jaula de cemento en el zoológico y su traslado a un santuario.",
  },
  {
    year: "2022",
    title: "Ley 17/2021 del Código Civil Español",
    jurisdiction: "España",
    statusChange: "Seres Vivos Dotados de Sensibilidad",
    legalText: "«Los animales son seres vivos dotados de sensibilidad. El régimen jurídico de los bienes y las cosas sólo les será aplicable en la medida en que sea compatible con su naturaleza.»",
    implication: "Prohibición de embargar animales por deudas, regulación de su custodia en divorcios y deber de auxilio en accidentes.",
  },
];

export default function LegalStatusVisualizer() {
  const [selectedIdx, setSelectedIdx] = useState<number>(3);

  const active = MILESTONES[selectedIdx] || MILESTONES[0]!;

  return (
    <div className="w-full bg-surface/90 dark:bg-surface-dim/80 border border-outline-variant/30 rounded-2xl p-5 sm:p-7 space-y-6 shadow-sm">
      <div className="space-y-1 border-b border-outline-variant/20 pb-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
            JURISPRUDENCIA COMPARADA
          </span>
          <span className="text-[10px] font-mono text-on-surface-variant/60">
            Evolución Doctrinal
          </span>
        </div>
        <h4 className="text-lg sm:text-xl font-heading font-bold text-on-surface">
          De «Cosas» a «Seres Sintientes»: La Descosificación Legal
        </h4>
        <p className="text-xs font-sans text-on-surface-variant leading-relaxed">
          La historia jurídica de los animales no humanos refleja una transición paulatina desde el estatus de mercancía patrimonial hacia el reconocimiento de personalidad jurídica.
        </p>
      </div>

      {/* Timeline Steps */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {MILESTONES.map((m, idx) => {
          const isSelected = idx === selectedIdx;

          return (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-primary/10 border-primary ring-2 ring-primary/20 shadow-sm"
                  : "bg-surface-dim/40 border-outline-variant/20 hover:bg-surface-dim/70 text-on-surface-variant"
              }`}
            >
              <span className="text-[10px] font-mono font-bold text-primary">
                {m.year}
              </span>
              <div className="font-heading font-bold text-xs sm:text-sm text-on-surface pt-1 leading-tight">
                {m.title.split("(")[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Milestone Box */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedIdx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="p-5 rounded-2xl bg-surface-dim/60 border border-outline-variant/20 space-y-4 text-xs font-sans"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/20 pb-3">
            <div>
              <h5 className="font-heading font-bold text-base text-on-surface">
                {active.title}
              </h5>
              <span className="text-[10px] font-mono text-on-surface-variant/60">
                {active.jurisdiction}
              </span>
            </div>
            <span className="px-2.5 py-1 rounded bg-primary/10 border border-primary/20 text-primary font-mono text-[11px] font-bold self-start sm:self-auto">
              {active.statusChange}
            </span>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-[10px] text-on-surface font-bold uppercase block">
              Texto Doctrinal / Sentencia:
            </span>
            <blockquote className="p-3 bg-surface/90 dark:bg-surface-dim rounded-xl border border-outline-variant/20 font-serif italic text-on-surface-variant leading-relaxed text-[11px]">
              {active.legalText}
            </blockquote>
          </div>

          <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 space-y-1">
            <span className="font-mono text-[10px] text-primary font-bold uppercase block">
              Trascendencia Práctica:
            </span>
            <p className="text-on-surface-variant text-[11px] leading-relaxed">
              {active.implication}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
