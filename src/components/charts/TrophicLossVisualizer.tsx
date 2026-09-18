import { useState } from "react";

interface TrophicLossItem {
  id: string;
  name: string;
  category: "Carne Vacuna" | "Carne Porcina" | "Carne de Pollo" | "Alimento Vegetal Directo";
  feedKgNeeded: number; // kg of grain/soy to produce 1 kg edible meat
  energyLostPct: number; // % energy lost as body heat/manure
  proteinEfficiencyPct: number;
  landM2PerKg: number;
  explanation: string;
}

const CONVERSIONS: TrophicLossItem[] = [
  {
    id: "beef",
    name: "Vacuno (Ternera/Vaca)",
    category: "Carne Vacuna",
    feedKgNeeded: 25.0,
    energyLostPct: 98.1,
    proteinEfficiencyPct: 1.9,
    landM2PerKg: 326.2,
    explanation: "Por cada 100 calorías de maíz, soja y pasto que ingiere una vaca, solo 1.9 calorías llegan al plato humano en forma de carne. El 98.1% restante se disipa en mantener la temperatura corporal a 38.5°C, respirar, masticar y producir estiércol.",
  },
  {
    id: "pork",
    name: "Porcino (Cerdo)",
    category: "Carne Porcina",
    feedKgNeeded: 6.4,
    energyLostPct: 91.4,
    proteinEfficiencyPct: 8.6,
    landM2PerKg: 17.3,
    explanation: "El cerdo consume 6.4 kg de pienso compuesto (trigo, cebada, torta de soja) para producir 1 kg de carne. Se pierde más del 91% de la energía biológica original de los cultivos.",
  },
  {
    id: "poultry",
    name: "Avícola (Pollo Broíler)",
    category: "Carne de Pollo",
    feedKgNeeded: 3.3,
    energyLostPct: 88.8,
    proteinEfficiencyPct: 11.2,
    landM2PerKg: 12.2,
    explanation: "Aunque es el animal terrestre más 'eficiente' por selección genética extrema, sigue perdiendo casi el 89% de las proteínas vegetales forrajeras que consume.",
  },
  {
    id: "direct_soy",
    name: "Legumbres / Soja Directa",
    category: "Alimento Vegetal Directo",
    feedKgNeeded: 1.0,
    energyLostPct: 0.0,
    proteinEfficiencyPct: 100.0,
    landM2PerKg: 2.2,
    explanation: "Consumir las legumbres y cereales directamente sin pasarlas a través del organismo de un animal entrega el 100% de los nutrientes cosechados, necesitando un 95% menos de tierra agrícola.",
  },
];

export default function TrophicLossVisualizer() {
  const [selectedId, setSelectedId] = useState<string>("beef");

  const active = CONVERSIONS.find((c) => c.id === selectedId) || CONVERSIONS[0]!;

  return (
    <div className="w-full bg-surface/90 dark:bg-surface-dim/80 border border-outline-variant/30 rounded-2xl p-5 sm:p-7 space-y-6 shadow-sm">
      <div className="space-y-1 border-b border-outline-variant/20 pb-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
            FÍSICA TRÓFICA · REGLA DEL 10%
          </span>
          <span className="text-[10px] font-mono text-on-surface-variant/60">
            Disipación de Energía
          </span>
        </div>
        <h4 className="text-lg sm:text-xl font-heading font-bold text-on-surface">
          El Desperdicio Termodinámico de la Carne
        </h4>
        <p className="text-xs font-sans text-on-surface-variant leading-relaxed">
          Cada escalón trófico destruye entre el 88% y el 98% de la energía disponible en forma de calor metabólico irrecuperable.
        </p>
      </div>

      {/* Vector Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {CONVERSIONS.map((item) => {
          const isSelected = item.id === selectedId;

          return (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-primary/10 border-primary ring-2 ring-primary/20 shadow-sm"
                  : "bg-surface-dim/40 border-outline-variant/20 hover:bg-surface-dim/70 text-on-surface-variant"
              }`}
            >
              <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded font-bold inline-block ${
                item.energyLostPct === 0
                  ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                  : "bg-amber-500/15 text-amber-700 dark:text-amber-400"
              }`}>
                {item.energyLostPct === 0 ? "Sin pérdida" : `-${item.energyLostPct}% pérdida`}
              </span>
              <div className="font-heading font-bold text-xs sm:text-sm text-on-surface pt-1 leading-tight">
                {item.name.split(" ")[0]}
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Visual Loss Diagram */}
      <div className="p-5 rounded-2xl bg-surface-dim/60 border border-outline-variant/20 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          <div className="p-3 bg-surface/90 dark:bg-surface-dim rounded-xl border border-outline-variant/20">
            <span className="text-[10px] font-mono text-on-surface-variant/60 uppercase block">
              Pienso Necesario por 1 kg
            </span>
            <span className="text-xl font-heading font-bold text-on-surface">
              {active.feedKgNeeded} kg
            </span>
          </div>

          <div className="p-3 bg-surface/90 dark:bg-surface-dim rounded-xl border border-outline-variant/20">
            <span className="text-[10px] font-mono text-on-surface-variant/60 uppercase block">
              Pérdida en Calor & Heces
            </span>
            <span className={`text-xl font-heading font-bold ${active.energyLostPct === 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
              {active.energyLostPct}%
            </span>
          </div>

          <div className="p-3 bg-surface/90 dark:bg-surface-dim rounded-xl border border-outline-variant/20">
            <span className="text-[10px] font-mono text-on-surface-variant/60 uppercase block">
              Suelo Necesario por 100g Prot.
            </span>
            <span className="text-xl font-heading font-bold text-primary">
              {active.landM2PerKg} m²
            </span>
          </div>
        </div>

        {/* Visual Energy Split Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[10px] font-mono">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              Nutrientes aprovechados: {active.proteinEfficiencyPct}%
            </span>
            <span className="text-red-600 dark:text-red-400 font-bold">
              Disipado en metabolismo: {active.energyLostPct}%
            </span>
          </div>
          <div className="w-full h-4 bg-surface-dim rounded-full overflow-hidden flex border border-outline-variant/30">
            <div
              style={{ width: `${active.proteinEfficiencyPct}%` }}
              className="h-full bg-emerald-500 transition-all duration-500"
            />
            <div
              style={{ width: `${active.energyLostPct}%` }}
              className="h-full bg-red-500/80 transition-all duration-500"
            />
          </div>
        </div>

        {/* Detailed Explanation */}
        <p className="text-xs font-sans text-on-surface-variant leading-relaxed p-3.5 bg-surface/90 dark:bg-surface-dim rounded-xl border border-outline-variant/20">
          {active.explanation}
        </p>
      </div>
    </div>
  );
}
