import { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  Flame,
  Globe,
  Trees,
  Layers,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  TrendingDown,
  Utensils,
  LandPlot,
  Sun
} from "lucide-react";
import {
  PROTEIN_VECTORS,
  REWILDING_METRICS,
  THERMODYNAMICS_REFERENCES,
  ProteinVector
} from "../data/thermodynamicsData";

interface ThermodynamicMatrixProps {
  onNavigateToTab?: (tab: string) => void;
}

type ScaleMode = "daily" | "macro";

export default function ThermodynamicMatrix({ onNavigateToTab: _onNavigateToTab }: ThermodynamicMatrixProps) {
  const [scaleMode, setScaleMode] = useState<ScaleMode>("daily");
  const [dailyGramsProtein, setDailyGramsProtein] = useState<number>(100);
  const [macroHectares, setMacroHectares] = useState<number>(100);
  const [selectedVectorId, setSelectedVectorId] = useState<ProteinVector["id"]>("beef");
  const [activeMetricTab, setActiveMetricTab] = useState<"efficiency" | "land" | "ghg" | "water">("efficiency");

  const selectedVector = useMemo(() => {
    return PROTEIN_VECTORS.find((v) => v.id === selectedVectorId) || PROTEIN_VECTORS[0]!;
  }, [selectedVectorId]);

  // Derived calculations for Daily Mode
  const dailyCalculations = useMemo(() => {
    const p = dailyGramsProtein; // e.g. 100g protein
    const v = selectedVector;

    // Crop protein input needed: for 100% efficient it's 100g, for 3.8% beef it's 100 / 0.038 = 2631g
    const plantProteinRequiredGrams = Math.round(p / (v.proteinEfficiency / 100));
    const plantProteinWastedGrams = plantProteinRequiredGrams - p;
    const landUsedM2 = Number(((p / 100) * v.landUsePer100gProteinM2).toFixed(1));
    const ghgKgCO2 = Number(((p / 100) * v.ghgPer100gProteinKgCO2).toFixed(1));
    // Water approx (assuming 100g protein is ~0.4kg meat for beef/poultry or ~0.3kg legumes)
    const kgEquivalent = v.category === "animal" ? (p / 220) : (p / 250);
    const waterLiters = Math.round(kgEquivalent * v.waterLitersPerKg);

    return {
      plantProteinRequiredGrams,
      plantProteinWastedGrams,
      landUsedM2,
      ghgKgCO2,
      waterLiters,
    };
  }, [dailyGramsProtein, selectedVector]);

  // Derived calculations for Macro Mode
  const macroCalculations = useMemo(() => {
    const ha = macroHectares; // e.g. 100 ha
    const v = selectedVector;

    // 1 ha of high-yield arable land produces approx ~3.5 million kcal of direct food (cereals/soy)
    const baseAgriculturalKcalMillions = ha * 3.5;
    const edibleKcalMillions = Number((baseAgriculturalKcalMillions * (v.caloricEfficiency / 100)).toFixed(2));
    const lostKcalMillions = Number((baseAgriculturalKcalMillions - edibleKcalMillions).toFixed(2));

    // People fed per year (assuming 2500 kcal/day = ~0.9125 million kcal/person/year)
    const peopleFedPerYear = Math.round((edibleKcalMillions / 0.9125));
    const peopleFedIfDirectPlant = Math.round((baseAgriculturalKcalMillions / 0.9125));

    return {
      baseAgriculturalKcalMillions,
      edibleKcalMillions,
      lostKcalMillions,
      peopleFedPerYear,
      peopleFedIfDirectPlant,
    };
  }, [macroHectares, selectedVector]);

  return (
    <div id="thermodynamics-matrix-view" className="space-y-16 w-full relative text-left">
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
        <div className="w-full flex flex-col lg:justify-center items-center text-center relative h-[550px] min-h-[550px] lg:h-[600px] lg:min-h-[600px] pt-16 lg:pt-28 pb-20 lg:pb-24 px-4 md:px-6 lg:px-8 border-b border-outline-variant/15">
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
            <Flame
              className="text-zinc-900 dark:text-zinc-100 blur"
              style={{
                width: "clamp(144px, 45vw, 540px)",
                height: "clamp(144px, 45vw, 540px)",
                opacity: 0.1,
                strokeWidth: 1.2,
              }}
            />
          </div>

          <div className="flex-1 lg:flex-none flex flex-col justify-center items-center w-full">
            <div className="space-y-2 lg:space-y-4 max-w-3xl w-full text-center relative z-10 mt-12 lg:mt-20">
              <h1 className="text-[clamp(38px,7.5vw,72px)] font-bold tracking-tight font-heading leading-[1.08] text-on-background select-none">
                Termodinámica Trófica
              </h1>
              <p className="max-w-2xl mx-auto pt-1 font-serif italic font-light text-on-surface-variant/70 leading-relaxed text-[14px] sm:text-[16px] md:text-[18px] text-center tracking-normal select-none">
                Los animales no producen energía: son transformadores disipativos que pierden hasta el 98% de las calorías de cultivo en calor y mantenimiento biológico.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                  <Flame className="w-3.5 h-3.5 text-primary" />
                  REGLA DEL 10% DE LINDEMAN
                </span>
                <span className="w-px h-4 bg-outline-variant/50 hidden sm:inline" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-primary" />
                  SCIENCE (POORE & NEMECEK)
                </span>
                <span className="w-px h-4 bg-outline-variant/50 hidden sm:inline" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                  <Trees className="w-3.5 h-3.5 text-primary" />
                  RESTITUCIÓN PLANETARIA
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT WRAPPER — alineado a App max-w 1280 */}
      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 space-y-12">
        {/* SCALE MODE SWITCHER & INPUT CONTROLS */}
        <div className="bg-surface/80 dark:bg-surface-dim/50 border border-outline-variant/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-outline-variant/20 pb-5">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold block mb-1">
                Paso 1: Selecciona la Escala de Análisis
              </span>
              <h2 className="text-xl font-heading font-semibold text-on-surface">
                Parámetros de Entrada Agrícola
              </h2>
            </div>

            {/* Switch buttons */}
            <div className="flex items-center gap-1 p-1 bg-surface-dim rounded-xl border border-outline-variant/30 text-xs font-mono">
              <button
                onClick={() => setScaleMode("daily")}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  scaleMode === "daily"
                    ? "bg-primary text-on-primary font-bold shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <Utensils className="w-3.5 h-3.5" /> Ración Cotidiana
              </button>
              <button
                onClick={() => setScaleMode("macro")}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  scaleMode === "macro"
                    ? "bg-primary text-on-primary font-bold shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                <LandPlot className="w-3.5 h-3.5" /> Escala Macro / Hectáreas
              </button>
            </div>
          </div>

          {/* Interactive Sliders */}
          {scaleMode === "daily" ? (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-xs font-mono text-on-surface-variant flex items-center gap-1.5">
                  <Utensils className="w-4 h-4 text-primary" /> Proteína requerida en la dieta diaria:
                </label>
                <span className="text-sm font-mono font-bold text-primary">
                  {dailyGramsProtein} gramos de proteína
                </span>
              </div>
              <input
                type="range"
                min="25"
                max="250"
                step="25"
                value={dailyGramsProtein}
                onChange={(e) => setDailyGramsProtein(Number(e.target.value))}
                className="w-full h-2 bg-surface-dim rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] font-mono text-on-surface-variant/60">
                <span>25g (Mínimo individual)</span>
                <span>100g (Dieta estándar alta)</span>
                <span>250g (Consumo familiar / atleta)</span>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-xs font-mono text-on-surface-variant flex items-center gap-1.5">
                  <LandPlot className="w-4 h-4 text-primary" /> Superficie de cultivo de cereal/soja analizada:
                </label>
                <span className="text-sm font-mono font-bold text-primary">
                  {macroHectares} hectáreas agrícolas
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="1000"
                step="10"
                value={macroHectares}
                onChange={(e) => setMacroHectares(Number(e.target.value))}
                className="w-full h-2 bg-surface-dim rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] font-mono text-on-surface-variant/60">
                <span>10 ha (Finca pequeña)</span>
                <span>100 ha (Explotación media)</span>
                <span>1.000 ha (Latifundio agroindustrial)</span>
              </div>
            </div>
          )}
        </div>

        {/* VECTOR SELECTOR BUTTONS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold flex items-center gap-2">
              <Layers className="w-4 h-4" /> Elige el Vector de Conversión Trófica:
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {PROTEIN_VECTORS.map((v) => {
              const isSelected = v.id === selectedVectorId;
              const isPlant = v.category === "vegetal";

              return (
                <button
                  key={v.id}
                  onClick={() => setSelectedVectorId(v.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? "bg-surface-dim/90 dark:bg-surface-dim border-primary ring-2 ring-primary/30 shadow-md"
                      : "bg-surface/50 dark:bg-surface-dim/20 border-outline-variant/30 hover:border-outline hover:bg-surface-dim/40"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          isPlant ? "bg-emerald-500" : "bg-red-500"
                        }`}
                      />
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-primary" />}
                    </div>
                    <div className="font-heading font-semibold text-xs sm:text-sm text-on-surface pt-1 leading-tight">
                      {v.name}
                    </div>
                  </div>
                  <div className="mt-2 text-[10px] font-mono text-on-surface-variant/70">
                    Eficiencia: <span className="font-bold text-on-surface">{v.proteinEfficiency}%</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* DYNAMIC SANKEY & THERMODYNAMIC FLOW DIAGRAM */}
        <div className="bg-surface/90 dark:bg-surface-dim/60 border border-outline-variant/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-outline-variant/20 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold block mb-1">
                Diagrama de Flujo Energético
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-on-surface">
                {selectedVector.name}: Fuga Metabólica
              </h3>
            </div>
            <div className="text-xs font-mono text-on-surface-variant/80 bg-surface-dim px-3 py-1.5 rounded-xl border border-outline-variant/20">
              {selectedVector.keyFact}
            </div>
          </div>

          {/* Sankey Visualizer */}
          <div className="w-full bg-surface-dim/40 border border-outline-variant/20 rounded-2xl p-6 relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Node 1: Input (Photosynthesis & Crops) */}
              <div className="md:col-span-3 bg-surface/80 dark:bg-surface-dim/80 border border-outline-variant/30 rounded-xl p-4 text-center space-y-2 relative shadow-sm">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center">
                  <Sun className="w-4 h-4" />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-on-surface-variant/70">
                  Input Agrícola Inicial
                </div>
                <div className="text-lg font-heading font-bold text-on-surface">
                  100% Cereal / Soja
                </div>
                <div className="text-[11px] font-mono text-on-surface-variant">
                  {scaleMode === "daily"
                    ? `${dailyCalculations.plantProteinRequiredGrams}g proteína cosechada`
                    : `${macroCalculations.baseAgriculturalKcalMillions}M kcal cosechadas`}
                </div>
              </div>

              {/* Center Connectors & Breakdown */}
              <div className="md:col-span-6 flex flex-col space-y-4">
                {/* Dissipation Branch (Red/Orange) */}
                {selectedVector.category === "animal" ? (
                  <motion.div
                    key={`dissipation-${selectedVector.id}`}
                    initial={{ opacity: 0, scaleY: 0.9 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl space-y-2 text-red-950 dark:text-red-200"
                  >
                    <div className="flex items-center justify-between text-xs font-mono font-bold">
                      <span className="flex items-center gap-1.5">
                        <TrendingDown className="w-4 h-4 text-red-500" />
                        Disipación Metabólica Animal ({selectedVector.proteinLoss}%)
                      </span>
                      <span>
                        {scaleMode === "daily"
                          ? `-${dailyCalculations.plantProteinWastedGrams}g perdidos`
                          : `-${macroCalculations.lostKcalMillions}M kcal perdidas`}
                      </span>
                    </div>

                    {/* Breakdown bars */}
                    <div className="grid grid-cols-3 gap-2 text-[9px] font-mono pt-1 text-on-surface-variant">
                      <div className="bg-surface-dim/80 p-1.5 rounded border border-outline-variant/10 text-center">
                        <span className="block font-bold">{selectedVector.metabolicDissipationBreakdown.basalMetabolismAndHeatPct}%</span>
                        Calor corporal
                      </div>
                      <div className="bg-surface-dim/80 p-1.5 rounded border border-outline-variant/10 text-center">
                        <span className="block font-bold">{selectedVector.metabolicDissipationBreakdown.inedibleTissuesPct}%</span>
                        Huesos / plumas
                      </div>
                      <div className="bg-surface-dim/80 p-1.5 rounded border border-outline-variant/10 text-center">
                        <span className="block font-bold">{selectedVector.metabolicDissipationBreakdown.excretionsAndMethanePct}%</span>
                        Heces y gases
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center text-xs font-mono text-emerald-800 dark:text-emerald-300">
                    ✨ Cero eslabón trófico animal intermediario: 0% de pérdida por respiración animal.
                  </div>
                )}
              </div>

              {/* Node 2: Output (Final Human Food) */}
              <div className={`md:col-span-3 border rounded-xl p-4 text-center space-y-2 relative shadow-sm ${
                selectedVector.category === "vegetal"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-100"
                  : "bg-surface/80 dark:bg-surface-dim/80 border-outline-variant/30"
              }`}>
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center">
                  <Utensils className="w-4 h-4" />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-on-surface-variant/70">
                  Alimento Final Obtenido
                </div>
                <div className="text-lg font-heading font-bold text-on-surface">
                  {selectedVector.proteinEfficiency}% Útil
                </div>
                <div className="text-[11px] font-mono text-on-surface-variant">
                  {scaleMode === "daily"
                    ? `${dailyGramsProtein}g proteína ingerida`
                    : `${macroCalculations.edibleKcalMillions}M kcal útiles`}
                </div>
              </div>

            </div>
          </div>

          {/* Quick Metrics Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-surface-dim/60 p-4 rounded-xl border border-outline-variant/20 space-y-1">
              <span className="text-[10px] font-mono uppercase text-on-surface-variant/60 block">
                Tierra Requerida:
              </span>
              <div className="text-lg sm:text-xl font-mono font-bold text-on-surface">
                {scaleMode === "daily" ? `${dailyCalculations.landUsedM2} m²` : `${macroHectares} ha`}
              </div>
              <span className="text-[10px] font-mono text-on-surface-variant/70">
                {selectedVector.landUsePer100gProteinM2} m² por 100g prot
              </span>
            </div>

            <div className="bg-surface-dim/60 p-4 rounded-xl border border-outline-variant/20 space-y-1">
              <span className="text-[10px] font-mono uppercase text-on-surface-variant/60 block">
                Emisiones de GEI:
              </span>
              <div className="text-lg sm:text-xl font-mono font-bold text-on-surface">
                {scaleMode === "daily" ? `${dailyCalculations.ghgKgCO2} kg CO2` : `${(macroCalculations.baseAgriculturalKcalMillions * selectedVector.ghgPer100gProteinKgCO2 * 0.001).toFixed(1)} t CO2`}
              </div>
              <span className="text-[10px] font-mono text-on-surface-variant/70">
                {selectedVector.ghgPer100gProteinKgCO2} kg CO2eq / 100g prot
              </span>
            </div>

            <div className="bg-surface-dim/60 p-4 rounded-xl border border-outline-variant/20 space-y-1">
              <span className="text-[10px] font-mono uppercase text-on-surface-variant/60 block">
                Gasto de Agua Dulce:
              </span>
              <div className="text-lg sm:text-xl font-mono font-bold text-on-surface">
                {dailyCalculations.waterLiters.toLocaleString()} L
              </div>
              <span className="text-[10px] font-mono text-on-surface-variant/70">
                {selectedVector.waterLitersPerKg.toLocaleString()} L / kg
              </span>
            </div>

            <div className="bg-surface-dim/60 p-4 rounded-xl border border-outline-variant/20 space-y-1">
              <span className="text-[10px] font-mono uppercase text-on-surface-variant/60 block">
                Personas Alimentables:
              </span>
              <div className="text-lg sm:text-xl font-mono font-bold text-primary">
                {macroCalculations.peopleFedPerYear} personas / año
              </div>
              <span className="text-[10px] font-mono text-on-surface-variant/70">
                vs {macroCalculations.peopleFedIfDirectPlant} con legumbres
              </span>
            </div>
          </div>
        </div>

        {/* COMPARATIVE MATRIX OF ALL 6 VECTORS */}
        <div className="bg-surface/80 dark:bg-surface-dim/50 border border-outline-variant/30 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/20 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold block mb-1">
                Comparativa Multidimensional
              </span>
              <h3 className="text-xl font-heading font-bold text-on-surface">
                Matriz de Eficiencia entre Alimentos (Science 2018)
              </h3>
            </div>

            {/* Metric selector tabs */}
            <div className="flex flex-wrap gap-1 text-xs font-mono bg-surface-dim p-1 rounded-xl border border-outline-variant/20">
              <button
                onClick={() => setActiveMetricTab("efficiency")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeMetricTab === "efficiency" ? "bg-primary text-on-primary font-bold" : "text-on-surface-variant"
                }`}
              >
                Eficiencia %
              </button>
              <button
                onClick={() => setActiveMetricTab("land")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeMetricTab === "land" ? "bg-primary text-on-primary font-bold" : "text-on-surface-variant"
                }`}
              >
                Uso de Tierra
              </button>
              <button
                onClick={() => setActiveMetricTab("ghg")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeMetricTab === "ghg" ? "bg-primary text-on-primary font-bold" : "text-on-surface-variant"
                }`}
              >
                Emisiones CO2
              </button>
              <button
                onClick={() => setActiveMetricTab("water")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeMetricTab === "water" ? "bg-primary text-on-primary font-bold" : "text-on-surface-variant"
                }`}
              >
                Agua Dulce
              </button>
            </div>
          </div>

          {/* Bar comparison */}
          <div className="space-y-4 pt-2">
            {PROTEIN_VECTORS.map((vec) => {
              let value = 0;
              let maxValue = 100;
              let displayStr = "";

              if (activeMetricTab === "efficiency") {
                value = vec.proteinEfficiency;
                maxValue = 100;
                displayStr = `${value}% aprovechamiento`;
              } else if (activeMetricTab === "land") {
                value = vec.landUsePer100gProteinM2;
                maxValue = 164;
                displayStr = `${value} m² / 100g proteína`;
              } else if (activeMetricTab === "ghg") {
                value = vec.ghgPer100gProteinKgCO2;
                maxValue = 49.9;
                displayStr = `${value} kg CO2eq / 100g proteína`;
              } else {
                value = vec.waterLitersPerKg;
                maxValue = 15415;
                displayStr = `${value.toLocaleString()} L / kg`;
              }

              const percentageBar = Math.max(2, (value / maxValue) * 100);
              const isSelected = vec.id === selectedVectorId;

              return (
                <div
                  key={vec.id}
                  onClick={() => setSelectedVectorId(vec.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? "bg-surface-dim border-primary/60 shadow-sm"
                      : "bg-surface-dim/30 border-outline-variant/20 hover:border-outline-variant/60"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-semibold text-on-surface flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: vec.color }}
                      />
                      {vec.name}
                    </span>
                    <span className="text-on-surface font-bold">{displayStr}</span>
                  </div>

                  <div className="w-full h-2.5 bg-surface-dim rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentageBar}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: vec.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* REWILDING & PLANETARY RESTORATION SECTION */}
        <div className="bg-gradient-to-r from-emerald-500/10 via-surface-dim/40 to-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 rounded-xl">
              <Trees className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-bold block">
                CIENCIA DE LA RESTAURACIÓN ECOLÓGICA
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-on-surface">
                El Dividendo del Rewilding: 3.100 Millones de Hectáreas
              </h3>
            </div>
          </div>

          <p className="text-xs sm:text-sm font-sans text-on-surface-variant leading-relaxed">
            Según el estudio publicado en <span className="font-bold text-on-surface">Science</span> por Poore & Nemecek (2018), la ganadería ocupa el <span className="font-bold text-on-surface">83% de la tierra agrícola mundial</span> pero solo aporta el <span className="font-bold text-on-surface">18% de las calorías globales</span>. Una transición hacia una alimentación vegetal liberaría el <span className="font-bold text-primary">75% del suelo cultivado del planeta</span>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="bg-surface-dim/60 p-4 rounded-xl border border-outline-variant/20 space-y-1.5">
              <span className="text-[10px] text-on-surface-variant/60 uppercase block">Superficie Liberable:</span>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                3.100 M hectáreas
              </div>
              <p className="text-[11px] text-on-surface-variant/80 font-sans">
                {REWILDING_METRICS.freedLandEquivalentRegions}.
              </p>
            </div>

            <div className="bg-surface-dim/60 p-4 rounded-xl border border-outline-variant/20 space-y-1.5">
              <span className="text-[10px] text-on-surface-variant/60 uppercase block">Secuestro de Carbono:</span>
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                8.1 Gt CO2 / año
              </div>
              <p className="text-[11px] text-on-surface-variant/80 font-sans">
                Los bosques restaurados neutralizarían décadas de emisiones antropogénicas.
              </p>
            </div>

            <div className="bg-surface-dim/60 p-4 rounded-xl border border-outline-variant/20 space-y-1.5">
              <span className="text-[10px] text-on-surface-variant/60 uppercase block">Capacidad de Alimentación:</span>
              <div className="text-xl font-bold text-primary">
                +4.000 M personas
              </div>
              <p className="text-[11px] text-on-surface-variant/80 font-sans">
                Población adicional alimentable si no se disipara el grano en animales.
              </p>
            </div>
          </div>
        </div>

        {/* SCIENTIFIC CITATIONS FOOTER */}
        <div className="bg-surface-dim/30 border border-outline-variant/20 rounded-2xl p-6 space-y-4">
          <div className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/70 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" /> Referencias Científicas y Modelos Termodinámicos
          </div>
          <div className="space-y-2 text-[11px] font-mono text-on-surface-variant">
            {THERMODYNAMICS_REFERENCES.map((ref) => (
              <div key={ref.id} className="flex items-start justify-between gap-3 border-b border-outline-variant/10 pb-2 last:border-0 last:pb-0">
                <span>{ref.citation}</span>
                {ref.url && (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1 shrink-0 font-bold"
                  >
                    DOI <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
