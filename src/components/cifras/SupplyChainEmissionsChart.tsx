import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { BookOpen, Ship, Truck, Globe2, Calculator } from "lucide-react";
import {
  SUPPLY_CHAIN_EMISSIONS_DATA,
  type SupplyChainEmissionsItem
} from "../../data/cifras/ecologicalData";
import ScientificEvidenceModal from "./ScientificEvidenceModal";
import ChartLegend from "./ChartLegend";
import { CHART_AXIS, CHART_GRID, CHART_NEUTRAL_DARK, CHART_NEUTRAL_LIGHT, CHART_SERIES, CHART_TOOLTIP_STYLE } from "./chartPalette";
import { formatEs } from "../../utils/format";

type StageKey =
  | "landUseChange"
  | "farmEmissions"
  | "animalFeed"
  | "processing"
  | "transport"
  | "packaging"
  | "retail"
  | "losses";

interface StageMeta {
  key: StageKey;
  label: string;
  short: string;
  color: string;
}

const STAGE_META: StageMeta[] = [
  { key: "landUseChange", label: "Cambio de Uso del Suelo", short: "Uso de Suelo", color: CHART_SERIES.ch6 },
  { key: "farmEmissions", label: "Emisiones en Granja (Metano entérico/estiércol)", short: "Granja (Metano/Estiércol)", color: CHART_SERIES.ch1 },
  { key: "animalFeed", label: "Alimentación del Ganado (Pienso)", short: "Pienso Animal", color: CHART_SERIES.ch3 },
  { key: "processing", label: "Procesamiento Industrial", short: "Procesamiento", color: CHART_SERIES.ch2 },
  { key: "transport", label: "Transporte (Barco/Camión/Tren)", short: "Transporte", color: CHART_SERIES.ch4 },
  { key: "packaging", label: "Envasado y Empaque", short: "Envasado", color: CHART_SERIES.ch5 },
  { key: "retail", label: "Venta Minorista y Refrigeración", short: "Venta Minorista", color: CHART_NEUTRAL_LIGHT },
  { key: "losses", label: "Pérdidas de Alimento (granja→minorista)", short: "Pérdidas", color: CHART_NEUTRAL_DARK }
];

export default function SupplyChainEmissionsChart() {
  const [metricMode, setMetricMode] = useState<"per_kg" | "per_100g_protein">("per_kg");
  const [activeTab, setActiveTab] = useState<"chart" | "food_miles_calculator">("chart");
  const [selectedPlantFood, setSelectedPlantFood] = useState<string>("tofu");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Alimentos vegetales para la calculadora (totales por kg, OWID/Poore & Nemecek 2018).
  const plantOptions = [
    { id: "tofu", name: "Tofu", baseGhg: 3.16, icon: "🧊" },
    { id: "legumes", name: "Legumbres (Lentejas/Garbanzos)", baseGhg: 1.79, icon: "🫘" },
    { id: "peas", name: "Guisantes", baseGhg: 0.98, icon: "🟢" },
    { id: "oat_milk", name: "Bebida de Avena", baseGhg: 0.9, icon: "🥛" },
    { id: "wheat", name: "Trigo / Pan integral", baseGhg: 1.57, icon: "🌾" }
  ];

  const selectedPlant = plantOptions.find((p) => p.id === selectedPlantFood) || plantOptions[0]!;
  const beefRow = useMemo(
    () => SUPPLY_CHAIN_EMISSIONS_DATA.find((row) => row.food.toLowerCase().includes("vacuno") && row.category === "ruminant"),
    []
  );
  const localBeefGhg = beefRow?.totalKgCO2eq ?? 99.48;
  const ghgDifference = localBeefGhg - selectedPlant.baseGhg;

  // Cargo ship emission factor: approx 0.015 kg CO2 per tonne-km = 0.000015 kg CO2 per kg-km
  // Diesel truck emission factor: approx 0.15 kg CO2 per tonne-km = 0.00015 kg CO2 per kg-km
  const shipKmEquivalent = Math.round(ghgDifference / 0.000015);
  const truckKmEquivalent = Math.round(ghgDifference / 0.00015);
  const earthEquatorKm = 40075;
  const earthCircumnavigationsShip = formatEs(shipKmEquivalent / earthEquatorKm, 1);
  const earthCircumnavigationsTruck = formatEs(truckKmEquivalent / earthEquatorKm, 1);

  // Recalcula las etapas por 100 g de proteína escalando cada etapa por el factor
  // co2Per100gProtein / total (la columna ya está verificada fila a fila).
  const chartData = useMemo<SupplyChainEmissionsItem[]>(() => {
    if (metricMode === "per_kg") return SUPPLY_CHAIN_EMISSIONS_DATA;
    return SUPPLY_CHAIN_EMISSIONS_DATA.map((row) => {
      const factor = row.totalKgCO2eq !== 0 ? row.co2Per100gProtein / row.totalKgCO2eq : 0;
      const scaled = (value: number) => Math.round(value * factor * 1000) / 1000;
      return {
        ...row,
        landUseChange: scaled(row.landUseChange),
        farmEmissions: scaled(row.farmEmissions),
        animalFeed: scaled(row.animalFeed),
        processing: scaled(row.processing),
        transport: scaled(row.transport),
        packaging: scaled(row.packaging),
        retail: scaled(row.retail),
        losses: scaled(row.losses)
      };
    });
  }, [metricMode]);

  const unitLabel = metricMode === "per_kg" ? "kg CO₂eq / kg de alimento" : "kg CO₂eq / 100 g de proteína";

  return (
    <div className="w-full bg-surface dark:bg-zinc-900/60 rounded-2xl border border-outline-variant/30 dark:border-zinc-800 p-4 sm:p-5 lg:p-6 space-y-4 sm:space-y-5 text-left relative overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-outline-variant/20 dark:border-zinc-800 pb-3.5 sm:pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-primary dark:text-emerald-400 uppercase bg-primary/10 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-primary/20">
              CICLO DE VIDA & CADENA DE SUMINISTRO · EXHIBIT VI
            </span>
            <span className="text-xs font-mono text-on-surface-variant/60">
              Science (Poore & Nemecek 2018)
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-on-surface">
            Emisiones de Gases de Efecto Invernadero por Etapa de Producción
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl">
            Desglose desde el cambio de uso del suelo y la granja hasta el transporte, las pérdidas y la venta minorista. El transporte representa típicamente menos del 5% del impacto total.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="self-start md:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-outline-variant/30 dark:border-zinc-700 bg-surface-dim/50 hover:bg-surface-dim text-xs font-mono font-bold text-on-surface transition-all cursor-pointer shadow-sm shrink-0"
        >
          <BookOpen className="w-3.5 h-3.5 text-primary" /> Respaldo Científico
        </button>
      </div>

      {/* Sub Tabs: Chart vs Food Miles Calculator */}
      <div className="flex flex-wrap items-center gap-2 border-b border-outline-variant/20 dark:border-zinc-800 pb-2">
        <button
          onClick={() => setActiveTab("chart")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "chart"
              ? "bg-primary text-on-primary shadow-sm"
              : "text-on-surface-variant hover:text-on-surface bg-surface-dim/30"
          }`}
        >
          <Globe2 className="w-3.5 h-3.5" /> Gráfico por Etapa del Ciclo de Vida
        </button>
        <button
          onClick={() => setActiveTab("food_miles_calculator")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === "food_miles_calculator"
              ? "bg-primary text-on-primary shadow-sm"
              : "text-on-surface-variant hover:text-on-surface bg-surface-dim/30"
          }`}
        >
          <Calculator className="w-3.5 h-3.5" /> Calculadora: El Mito del 'Transporte Local'
        </button>
      </div>

      {/* TAB 1: Chart view */}
      {activeTab === "chart" && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-dim/30 dark:bg-zinc-800/30 p-3.5 rounded-xl border border-outline-variant/20 dark:border-zinc-800">
            <div className="space-y-0.5">
              <span className="text-xs font-mono uppercase tracking-wider text-on-surface-variant font-bold block">
                Base de Normalización:
              </span>
              <span className="text-[11px] font-mono text-on-surface-variant/70">{unitLabel}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setMetricMode("per_kg")}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  metricMode === "per_kg"
                    ? "bg-on-surface text-surface dark:bg-white dark:text-zinc-950 shadow-xs"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Por Kilogramo de Alimento
              </button>
              <button
                onClick={() => setMetricMode("per_100g_protein")}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  metricMode === "per_100g_protein"
                    ? "bg-on-surface text-surface dark:bg-white dark:text-zinc-950 shadow-xs"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Por 100 g de Proteína
              </button>
            </div>
          </div>

          {/* Chart */}
          <div className="overflow-x-auto">
            <div
              className="w-full min-w-[560px] h-[400px] sm:min-w-0 sm:h-[480px]"
              role="img"
              aria-label="Gráfico de barras apiladas: emisiones de gases de efecto invernadero por alimento, desglosadas por etapa del ciclo de vida (uso del suelo, granja, pienso, procesamiento, transporte, envasado, venta minorista y pérdidas)."
            >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                stackOffset="sign"
                accessibilityLayer
                margin={{ top: 10, right: 30, left: 8, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} opacity={0.9} />
                <XAxis
                  type="number"
                  stroke={CHART_AXIS}
                  fontSize={11}
                  tickFormatter={(val: number) =>
                    metricMode === "per_kg" ? `${formatEs(val)}` : `${formatEs(val, 1)}`
                  }
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="food"
                  stroke={CHART_AXIS}
                  fontSize={11}
                  tickLine={false}
                  width={150}
                  tickFormatter={(value: string) => {
                    const shortNames: Record<string, string> = {
                      "Carne de Vacuno (Ganado de Carne)": "Vacuno (carne)",
                      "Carne de Vacuno (Cabaña Lechera)": "Vacuno (lechera)",
                      "Leche de Avena (estimación)": "Avena (est.)",
                      "Piscifactoría (Pescado de Granja)": "Piscifactoría"
                    };
                    return shortNames[value] ?? value.replace(/\s*\(.*\)$/, "");
                  }}
                />
                <Tooltip
                  wrapperStyle={{ maxWidth: "min(320px, 80vw)" }}
                  contentStyle={{ ...CHART_TOOLTIP_STYLE, whiteSpace: "normal" }}
                  formatter={(value, name) => {
                    const meta = STAGE_META.find((m) => m.key === String(name));
                    const num = typeof value === "number" ? value : Number(value);
                    return [`${formatEs(num, 2)} ${unitLabel}`, meta?.label ?? String(name)];
                  }}
                />
                {STAGE_META.map((stage) => (
                  <Bar key={stage.key} dataKey={stage.key} stackId="a" fill={stage.color} />
                ))}
              </BarChart>
            </ResponsiveContainer>
            </div>
          </div>

          <ChartLegend
            items={STAGE_META.map((stage) => ({ label: stage.short, color: stage.color }))}
          />

          <div className="p-4 bg-primary/5 dark:bg-emerald-500/5 rounded-xl border border-primary/20 dark:border-emerald-500/20 text-xs font-mono text-on-surface leading-relaxed">
            <span className="font-bold text-primary dark:text-emerald-400">💡 Conclusión de Science (2018):</span> Lo que comemos importa más que de dónde proviene. La carne de vacuno de rebaño de carne genera ≈99,5 kg CO₂eq/kg, mientras que las legumbres o el tofu generan 1-3 kg CO₂eq/kg, incluso importados.
          </div>
        </div>
      )}

      {/* TAB 2: The Food Miles Debunker Calculator */}
      {activeTab === "food_miles_calculator" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-sm font-heading font-bold text-on-surface">
              ¿Cuánto tendría que viajar un alimento vegetal para igualar a la carne?
            </h4>
            <p className="text-xs text-on-surface-variant">
              Compara la huella de 1 kg de carne de vacuno (grupo «beef herd», {formatEs(localBeefGhg, 1)} kg CO₂eq) frente a alternativas vegetales transportadas a gran distancia.
            </p>
          </div>

          {/* Selector */}
          <div className="flex flex-wrap gap-2">
            {plantOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedPlantFood(opt.id)}
                className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  selectedPlantFood === opt.id
                    ? "bg-primary text-on-primary shadow-sm"
                    : "bg-surface-dim/40 dark:bg-zinc-800/40 text-on-surface-variant hover:text-on-surface border border-outline-variant/20"
                }`}
              >
                <span aria-hidden="true">{opt.icon}</span> {opt.name} ({formatEs(opt.baseGhg, 2)} kg CO₂)
              </button>
            ))}
          </div>

          {/* Result Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cargo ship */}
            <div className="p-6 bg-blue-500/10 dark:bg-blue-500/5 border border-blue-500/30 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-mono font-bold text-xs uppercase">
                <Ship className="w-4 h-4" aria-hidden="true" /> Transporte Marítimo en Barco de Carga
              </div>
              <div className="text-3xl sm:text-4xl font-mono font-black text-on-surface">
                {formatEs(shipKmEquivalent)} km
              </div>
              <div className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                ≈ {earthCircumnavigationsShip} vueltas completas a la Tierra por el ecuador
              </div>
              <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                Tendrías que enviar 1 kg de {selectedPlant.name.toLowerCase()} en barco de carga dando {earthCircumnavigationsShip} vueltas completas al planeta para que sus emisiones igualasen a las de solo 1 kg de carne de ternera.
              </p>
            </div>

            {/* Diesel truck */}
            <div className="p-6 bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/30 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-mono font-bold text-xs uppercase">
                <Truck className="w-4 h-4" aria-hidden="true" /> Transporte Terrestre en Camión Diésel
              </div>
              <div className="text-3xl sm:text-4xl font-mono font-black text-on-surface">
                {formatEs(truckKmEquivalent)} km
              </div>
              <div className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                ≈ {earthCircumnavigationsTruck} vueltas a la Tierra en carretera
              </div>
              <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                Incluso en camión diésel (uno de los transportes terrestres más intensivos en emisiones), 1 kg de {selectedPlant.name.toLowerCase()} debería recorrer más de {formatEs(truckKmEquivalent)} km por carretera para alcanzar la huella de 1 kg de ternera.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Scientific Modal */}
      <ScientificEvidenceModal
        sourceId="poore-nemecek-2018"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rawDataset={{
          supplyChainEmissions: SUPPLY_CHAIN_EMISSIONS_DATA,
          metricMode
        }}
        datasetName="supply_chain_lca_emissions"
      />
    </div>
  );
}
