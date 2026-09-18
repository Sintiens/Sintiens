import { useState } from "react";
import { BookOpen, Zap, Trees, PieChart } from "lucide-react";
import {
  GLOBAL_LAND_ALLOCATION,
  GLOBAL_HARVEST_FLOW_DATA,
  REWILDING_SCENARIOS,
  TROPHIC_EFFICIENCY_DATA,
  type TrophicEfficiencyItem
} from "../../data/cifras/trophicData";
import ScientificEvidenceModal from "./ScientificEvidenceModal";

export default function LandAndTrophicFlowVisualizer() {
  const [selectedProductIndex, setSelectedProductIndex] = useState<number>(0);
  const [activeSubTab, setActiveSubTab] = useState<"trophic_loss" | "harvest_flow" | "rewilding">("trophic_loss");
  const [rewildingPercent, setRewildingPercent] = useState<number>(50);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const inputCalories = 100;
  const currentProduct: TrophicEfficiencyItem = TROPHIC_EFFICIENCY_DATA[selectedProductIndex] || TROPHIC_EFFICIENCY_DATA[0]!;
  const retainedCalories = ((inputCalories * currentProduct.caloricEfficiencyPercent) / 100).toFixed(1);
  const lostCalories = (inputCalories - Number(retainedCalories)).toFixed(1);

  // Rewilding continuous calculations
  // Max at 100% shift: 3100 million ha, 547 Gt CO2 (Hayek et al. 2021 / Poore & Nemecek 2018)
  const calcLandFreedMha = Math.round((rewildingPercent / 100) * 3100);
  const calcCo2CapturedGt = Math.round((rewildingPercent / 100) * 547);
  const calcFossilYearsOffset = ((calcCo2CapturedGt / 37.0)).toFixed(1); // 37 Gt CO2 annual global emissions

  return (
    <div className="w-full bg-surface dark:bg-zinc-900/60 rounded-2xl border border-outline-variant/30 dark:border-zinc-800 p-6 sm:p-8 space-y-8 text-left relative overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/20 dark:border-zinc-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-primary dark:text-emerald-400 uppercase bg-primary/10 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-primary/20">
              TERMODINÁMICA Y EFICIENCIA TRÓFICA · EXHIBIT VII
            </span>
            <span className="text-xs font-mono text-on-surface-variant/60">
              Science (2018) & Nature Sustainability (2021)
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-on-surface">
            La Paradoja del Suelo Agrícola y la Disipación Calórica
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl">
            La segunda ley de la termodinámica aplicada a la alimentación: interponer animales como convertidores de biomasa disipa entre el 76% y el 97,5% de las calorías cultivadas en calor y heces.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="self-start md:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-outline-variant/30 dark:border-zinc-700 bg-surface-dim/50 hover:bg-surface-dim text-xs font-mono font-bold text-on-surface transition-all cursor-pointer shadow-sm shrink-0"
        >
          <BookOpen className="w-3.5 h-3.5 text-primary" /> Respaldo Científico
        </button>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-outline-variant/20 dark:border-zinc-800 pb-2">
        <button
          onClick={() => setActiveSubTab("trophic_loss")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === "trophic_loss"
              ? "bg-primary text-on-primary shadow-sm"
              : "text-on-surface-variant hover:text-on-surface bg-surface-dim/30"
          }`}
        >
          <Zap className="w-3.5 h-3.5" /> Disipación Calórica por Especie
        </button>
        <button
          onClick={() => setActiveSubTab("harvest_flow")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === "harvest_flow"
              ? "bg-primary text-on-primary shadow-sm"
              : "text-on-surface-variant hover:text-on-surface bg-surface-dim/30"
          }`}
        >
          <PieChart className="w-3.5 h-3.5" /> Destino de la Cosecha Mundial
        </button>
        <button
          onClick={() => setActiveSubTab("rewilding")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === "rewilding"
              ? "bg-primary text-on-primary shadow-sm"
              : "text-on-surface-variant hover:text-on-surface bg-surface-dim/30"
          }`}
        >
          <Trees className="w-3.5 h-3.5" /> Calculadora de Reforestación (Rewilding)
        </button>
      </div>

      {/* TAB 1: Trophic Loss & Land Paradox */}
      {activeSubTab === "trophic_loss" && (
        <div className="space-y-8">
          {/* Top: The Global Land Paradox Split Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {GLOBAL_LAND_ALLOCATION.map((item, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border space-y-3 ${
                  idx === 0
                    ? "bg-red-500/10 dark:bg-red-500/5 border-red-500/30"
                    : "bg-emerald-500/10 dark:bg-emerald-500/5 border-emerald-500/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-widest font-bold text-on-surface">
                    {item.category}
                  </span>
                  <span
                    className={`text-2xl font-mono font-bold ${
                      idx === 0 ? "text-red-600 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"
                    }`}
                  >
                    {item.percentage}% del suelo
                  </span>
                </div>

                <div className="text-xs font-mono text-on-surface-variant">
                  Superficie ocupada: <span className="font-bold text-on-surface">{item.millionKm2} millones de km²</span>
                </div>

                <p className="text-xs sm:text-sm text-on-surface-variant font-sans leading-relaxed pt-1">
                  {item.outputDescription}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom: Interactive Trophic Energy Loss Simulator */}
          <div className="space-y-4 bg-surface-dim/30 dark:bg-zinc-800/30 p-6 rounded-2xl border border-outline-variant/20 dark:border-zinc-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-primary dark:text-emerald-400 font-bold">
                Simulador de Pérdida de Energía en la Conversión: 100 kcal de Pienso Vegetal
              </span>
            </div>

            {/* Product Switcher */}
            <div className="flex flex-wrap gap-2">
              {TROPHIC_EFFICIENCY_DATA.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedProductIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedProductIndex === idx
                      ? "bg-on-surface text-surface dark:bg-white dark:text-zinc-950 shadow-xs"
                      : "bg-surface dark:bg-zinc-800 text-on-surface-variant hover:text-on-surface border border-outline-variant/20"
                  }`}
                >
                  {item.product}
                </button>
              ))}
            </div>

            {/* Visual Loss Bar */}
            <div className="space-y-2 pt-2">
              <div className="h-8 w-full rounded-xl overflow-hidden flex shadow-inner bg-zinc-950 p-1 border border-zinc-800">
                <div
                  style={{ width: `${retainedCalories}%` }}
                  className="bg-emerald-500 rounded-l-lg transition-all duration-500 flex items-center justify-center text-[10px] font-mono font-bold text-white overflow-hidden"
                >
                  {Number(retainedCalories) > 5 ? `${retainedCalories} kcal útiles` : ""}
                </div>
                <div
                  style={{ width: `${lostCalories}%` }}
                  className="bg-red-600/80 rounded-r-lg transition-all duration-500 flex items-center justify-center text-[10px] font-mono font-bold text-white overflow-hidden"
                >
                  {lostCalories} kcal disipadas en calor y heces ({currentProduct.energyLossPercent}%)
                </div>
              </div>

              <div className="flex justify-between text-[11px] font-mono">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                  🟢 Energía comestible final: {retainedCalories} kcal ({currentProduct.caloricEfficiencyPercent}% eficiencia)
                </span>
                <span className="text-red-600 dark:text-red-400 font-bold">
                  🔴 Pérdida metabólica irrecuperable: {lostCalories} kcal ({currentProduct.energyLossPercent}% disipado)
                </span>
              </div>
            </div>

            {/* Metabolic explanation */}
            <div className="p-4 bg-surface dark:bg-zinc-800/60 rounded-xl border border-outline-variant/20 dark:border-zinc-800 text-xs font-mono text-on-surface-variant leading-relaxed">
              <span className="font-bold text-on-surface">Explicación biofísica:</span> {currentProduct.metabolicNote}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Global Crop Harvest Flow */}
      {activeSubTab === "harvest_flow" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-sm font-heading font-bold text-on-surface">
              ¿A dónde van los alimentos que cultiva la humanidad?
            </h4>
            <p className="text-xs text-on-surface-variant">
              De los 10.000 billones de kilocalorías cosechadas anualmente en tierras agrícolas del planeta, más de la mitad nunca alimentan a humanos directamente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {GLOBAL_HARVEST_FLOW_DATA.map((flow, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-outline-variant/20 dark:border-zinc-800 bg-surface-dim/30 dark:bg-zinc-800/30 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase font-bold text-on-surface">
                    {flow.stage}
                  </span>
                  <span className="text-2xl font-mono font-bold" style={{ color: flow.color }}>
                    {flow.percentage}%
                  </span>
                </div>
                <div className="text-xs font-mono text-on-surface-variant">
                  ≈ {flow.caloriesTrillionsKcal.toLocaleString()} billones de kcal/año
                </div>
                <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                  {flow.description}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-primary/5 dark:bg-emerald-500/5 rounded-xl border border-primary/20 dark:border-emerald-500/20 text-xs font-mono text-on-surface leading-relaxed">
            <span className="font-bold text-primary dark:text-emerald-400">💡 Clave de Seguridad Alimentaria:</span> Si las cosechas destinadas a engordar ganado se utilizaran para consumo humano directo, se podrían alimentar a 4.000 millones de personas adicionales sin talar un solo árbol más.
          </div>
        </div>
      )}

      {/* TAB 3: Rewilding Calculator */}
      {activeSubTab === "rewilding" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-sm font-heading font-bold text-on-surface">
              Calculadora de Reforestación y Secuestro Biológico de Carbono
            </h4>
            <p className="text-xs text-on-surface-variant">
              Modelo basado en Hayek et al. (*Nature Sustainability*, 2021): cuantifica la superficie liberada y el CO₂ absorbido si la humanidad reduce el consumo pecuario.
            </p>
          </div>

          {/* Slider */}
          <div className="p-6 bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/30 rounded-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-bold">
                Reducción Global del Consumo Ganadero:
              </span>
              <span className="text-2xl font-mono font-black text-emerald-600 dark:text-emerald-400">
                {rewildingPercent}%
              </span>
            </div>

            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={rewildingPercent}
              onChange={(e) => setRewildingPercent(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-2 bg-surface-dim rounded-lg"
            />

            {/* Calculated Impact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-emerald-500/20">
              <div className="p-4 bg-surface dark:bg-zinc-900 rounded-xl border border-emerald-500/20 space-y-1">
                <span className="text-[10px] font-mono uppercase text-on-surface-variant block">
                  🌲 Suelo Agrícola Liberado
                </span>
                <span className="text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {calcLandFreedMha.toLocaleString("es-ES")} Mha
                </span>
                <span className="text-[10px] font-mono text-on-surface-variant/80 block">
                  ({(calcLandFreedMha / 100).toFixed(1)} millones de km²)
                </span>
              </div>

              <div className="p-4 bg-surface dark:bg-zinc-900 rounded-xl border border-emerald-500/20 space-y-1">
                <span className="text-[10px] font-mono uppercase text-on-surface-variant block">
                  💨 Secuestro de Carbono
                </span>
                <span className="text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {calcCo2CapturedGt} Gt CO₂
                </span>
                <span className="text-[10px] font-mono text-on-surface-variant/80 block">
                  Absorbido en biomasa forestal nativa
                </span>
              </div>

              <div className="p-4 bg-surface dark:bg-zinc-900 rounded-xl border border-emerald-500/20 space-y-1">
                <span className="text-[10px] font-mono uppercase text-on-surface-variant block">
                  ⏳ Equivalencia de Emisiones
                </span>
                <span className="text-2xl font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {calcFossilYearsOffset} Años
                </span>
                <span className="text-[10px] font-mono text-on-surface-variant/80 block">
                  De todas las emisiones fósiles mundiales
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scientific Evidence Modal */}
      <ScientificEvidenceModal
        sourceId="hayek-rewilding-2021"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rawDataset={{
          globalLandAllocation: GLOBAL_LAND_ALLOCATION,
          globalHarvestFlow: GLOBAL_HARVEST_FLOW_DATA,
          trophicEfficiency: TROPHIC_EFFICIENCY_DATA,
          rewildingScenarios: REWILDING_SCENARIOS
        }}
        datasetName="trophic_rewilding_data"
      />
    </div>
  );
}
