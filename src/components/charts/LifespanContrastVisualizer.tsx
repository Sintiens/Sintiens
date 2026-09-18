import { useState } from "react";
import { motion } from "motion/react";

interface LifespanData {
  id: string;
  species: string;
  category: string;
  naturalLifespan: string;
  naturalMonths: number;
  slaughterAge: string;
  slaughterMonths: number;
  percentageLived: number;
  slaughterCause: string;
}

const LIFESPANS: LifespanData[] = [
  {
    id: "broiler",
    species: "Pollo Broíler (Carne)",
    category: "Aves",
    naturalLifespan: "8 - 10 años (96 a 120 meses)",
    naturalMonths: 108,
    slaughterAge: "42 días (1.4 meses)",
    slaughterMonths: 1.4,
    percentageLived: 1.3,
    slaughterCause: "Alcanza los 2.5 kg de peso comercial por hipertrofia muscular; sus patas y corazón colapsarían si viviera más semanas.",
  },
  {
    id: "pig",
    species: "Cerdo de Cebo",
    category: "Porcino",
    naturalLifespan: "15 - 20 años (180 a 240 meses)",
    naturalMonths: 210,
    slaughterAge: "6 meses",
    slaughterMonths: 6,
    percentageLived: 2.8,
    slaughterCause: "Alcanza los 110-120 kg de peso óptimo de canal; a partir de este punto la conversión pienso/kilo se vuelve menos rentable.",
  },
  {
    id: "veal",
    species: "Ternero de Carne",
    category: "Vacuno",
    naturalLifespan: "20 - 25 años (240 a 300 meses)",
    naturalMonths: 270,
    slaughterAge: "8 - 12 meses",
    slaughterMonths: 10,
    percentageLived: 3.7,
    slaughterCause: "Engorde intensivo con pienso concentrado tras la separación materna temprana.",
  },
  {
    id: "dairy_cow",
    species: "Vaca Lechera Comercial",
    category: "Vacuno",
    naturalLifespan: "20 - 25 años (240 a 300 meses)",
    naturalMonths: 270,
    slaughterAge: "4 - 5 años (54 meses)",
    slaughterMonths: 54,
    percentageLived: 20.0,
    slaughterCause: "Mamitis recurrente, cojeras e infertilidad por sobreexplotación lechera (descrita como 'vaca de desvieje').",
  },
  {
    id: "layer_hen",
    species: "Gallina Ponedora",
    category: "Aves",
    naturalLifespan: "8 - 10 años (96 a 120 meses)",
    naturalMonths: 108,
    slaughterAge: "18 meses",
    slaughterMonths: 18,
    percentageLived: 16.6,
    slaughterCause: "La tasa de puesta desciende tras producir ~300 huevos/año; osteoporosis severa por descalcificación de la cáscara.",
  },
];

export default function LifespanContrastVisualizer() {
  const [selectedId, setSelectedId] = useState<string>("broiler");

  const current = LIFESPANS.find((l) => l.id === selectedId) || LIFESPANS[0]!;

  return (
    <div className="w-full bg-surface/90 dark:bg-surface-dim/80 border border-outline-variant/30 rounded-2xl p-5 sm:p-7 space-y-6 shadow-sm">
      <div className="space-y-1 border-b border-outline-variant/20 pb-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
            ZOOTECNIA & CICLO DE VIDA
          </span>
          <span className="text-[10px] font-mono text-on-surface-variant/60">
            Cronometría de la Industria
          </span>
        </div>
        <h4 className="text-lg sm:text-xl font-heading font-bold text-on-surface">
          Esperanza de Vida Natural vs. Edad de Sacrificio
        </h4>
        <p className="text-xs font-sans text-on-surface-variant leading-relaxed">
          En la ganadería intensiva, ningún animal muere por vejez ni alcanza la madurez biológica: se sacrifican cuando aún son biológicamente crías o adolescentes.
        </p>
      </div>

      {/* Species Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {LIFESPANS.map((item) => {
          const isSelected = item.id === selectedId;

          return (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-primary/10 border-primary ring-2 ring-primary/20 shadow-sm"
                  : "bg-surface-dim/40 border-outline-variant/20 hover:bg-surface-dim/70 text-on-surface-variant"
              }`}
            >
              <span className="text-[9px] font-mono uppercase text-primary font-bold">
                {item.category}
              </span>
              <div className="font-heading font-bold text-xs text-on-surface leading-tight pt-1">
                {item.species.split(" ")[0]} {item.species.split(" ")[1] || ""}
              </div>
            </button>
          );
        })}
      </div>

      {/* Visual Timeline Comparison Bar */}
      <div className="p-5 rounded-2xl bg-surface-dim/60 border border-outline-variant/20 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/20 pb-3">
          <div>
            <h5 className="font-heading font-bold text-base text-on-surface">
              {current.species}
            </h5>
            <span className="text-xs font-mono text-on-surface-variant/70">
              Vida natural: {current.naturalLifespan}
            </span>
          </div>
          <div className="px-3 py-1 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 dark:text-red-400 font-mono text-xs font-bold shrink-0">
            Solo vive el {current.percentageLived}% de su vida
          </div>
        </div>

        {/* Dual Progress Bar */}
        <div className="space-y-3">
          {/* Natural Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono text-on-surface-variant">
              <span>Esperanza de vida natural completa:</span>
              <span className="font-bold">{current.naturalLifespan} (100%)</span>
            </div>
            <div className="w-full h-3.5 bg-surface-dim rounded-full overflow-hidden border border-outline-variant/30">
              <div className="w-full h-full bg-emerald-500/70" />
            </div>
          </div>

          {/* Slaughtered Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] font-mono text-red-700 dark:text-red-400">
              <span className="font-bold">Momento del sacrificio en granja:</span>
              <span className="font-bold">{current.slaughterAge} ({current.percentageLived}%)</span>
            </div>
            <div className="w-full h-3.5 bg-surface-dim rounded-full overflow-hidden border border-outline-variant/30 relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(current.percentageLived, 2)}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full bg-red-500"
              />
            </div>
          </div>
        </div>

        {/* Reason for Slaughter */}
        <div className="p-3 bg-surface/90 dark:bg-surface-dim rounded-xl border border-outline-variant/20 space-y-1 text-xs">
          <span className="font-mono text-[10px] text-primary font-bold uppercase block">
            Criterio Económico del Sacrificio Prematuro:
          </span>
          <p className="font-sans text-on-surface-variant text-[11px] leading-relaxed">
            {current.slaughterCause}
          </p>
        </div>
      </div>
    </div>
  );
}
