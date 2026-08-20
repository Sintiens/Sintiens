import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { BookOpen, Truck, Globe2, Calculator } from "lucide-react";
import {
  SUPPLY_CHAIN_EMISSIONS_DATA
} from "../../data/cifras/ecologicalData";
import ScientificEvidenceModal from "./ScientificEvidenceModal";

export default function SupplyChainEmissionsChart() {
  const [metricMode, setMetricMode] = useState<"per_kg" | "per_100g_protein">("per_kg");
  const [activeTab, setActiveTab] = useState<"chart" | "food_miles_calculator">("chart");
  const [selectedPlantFood, setSelectedPlantFood] = useState<string>("tofu");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Plant foods for Food Miles Debunker Calculator
  const plantOptions = [
    { id: "tofu", name: "Tofu", baseGhg: 3.2, icon: "🧊" },
    { id: "legumes", name: "Legumbres (Lentejas/Garbanzos)", baseGhg: 0.9, icon: "🫘" },
    { id: "peas", name: "Guisantes", baseGhg: 0.98, icon: "🟢" },
    { id: "oat_milk", name: "Bebida de Avena", baseGhg: 0.9, icon: "🥛" },
    { id: "wheat", name: "Trigo / Pan integral", baseGhg: 1.4, icon: "🌾" }
  ];

  const selectedPlant = plantOptions.find((p) => p.id === selectedPlantFood) || plantOptions[0]!;
  const localBeefGhg = 99.48; // kg CO2eq / kg beef (Poore & Nemecek 2018)
  const ghgDifference = localBeefGhg - selectedPlant.baseGhg;

  // Cargo ship emission factor: approx 0.015 kg CO2 per tonne-km = 0.000015 kg CO2 per kg-km
  // Diesel truck emission factor: approx 0.15 kg CO2 per tonne-km = 0.00015 kg CO2 per kg-km
  const shipKmEquivalent = Math.round(ghgDifference / 0.000015);
  const truckKmEquivalent = Math.round(ghgDifference / 0.00015);
  const earthEquatorKm = 40075;
  const earthCircumnavigationsShip = (shipKmEquivalent / earthEquatorKm).toFixed(1);
  const earthCircumnavigationsTruck = (truckKmEquivalent / earthEquatorKm).toFixed(1);

  return (
    <div className="w-full bg-surface dark:bg-zinc-900/60 rounded-2xl border border-outline-variant/30 dark:border-zinc-800 p-6 sm:p-8 space-y-6 text-left relative overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/20 dark:border-zinc-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-primary dark:text-emerald-400 uppercase bg-primary/10 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-primary/20">
              CICLO DE VIDA & CADENA DE SUMINISTRO · EXHIBIT V
            </span>
            <span className="text-xs font-mono text-on-surface-variant/60">
              Science (Poore & Nemecek 2018)
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-on-surface">
            Emisiones de Gases de Efecto Invernadero por Etapa de Producción
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl">
            Desglose de emisiones desde el cambio de uso del suelo y la granja hasta el transporte y la venta minorista. El transporte representa típicamente menos del 5% del impacto total.
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
      <div className="flex items-center gap-2 border-b border-outline-variant/20 dark:border-zinc-800 pb-2">
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
          <div className="flex items-center justify-between gap-3 bg-surface-dim/30 dark:bg-zinc-800/30 p-3.5 rounded-xl border border-outline-variant/20 dark:border-zinc-800">
            <span className="text-xs font-mono uppercase tracking-wider text-on-surface-variant font-bold">
              Base de Normalización:
            </span>
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
          <div className="w-full h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={SUPPLY_CHAIN_EMISSIONS_DATA}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 100, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis
                  type="number"
                  stroke="#888888"
                  fontSize={12}
                  tickFormatter={(val) => `${val} kg`}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="food"
                  stroke="#888888"
                  fontSize={11}
                  tickLine={false}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(24, 24, 27, 0.95)",
                    borderColor: "rgba(63, 63, 70, 0.5)",
                    borderRadius: "0.75rem",
                    fontSize: "12px",
                    color: "#fff",
                    fontFamily: "monospace"
                  }}
                  formatter={(value: any, name: any) => {
                    const labels: Record<string, string> = {
                      landUseChangeGhg: "Cambio de Uso del Suelo",
                      farmGhg: "Emisiones en Granja (Metano entérico/estiércol)",
                      animalFeedGhg: "Alimentación del Ganado (Pienso)",
                      processingGhg: "Procesamiento Industrial",
                      transportGhg: "Transporte (Barco/Camión/Tren)",
                      packgingGhg: "Envasado y Empaque",
                      retailGhg: "Venta Minorista y Refrigeración"
                    };
                    return [`${Number(value).toFixed(2)} kg CO₂eq`, labels[name] || name];
                  }}
                />
                <Legend
                  verticalAlign="top"
                  height={40}
                  formatter={(val) => {
                    const map: Record<string, string> = {
                      landUseChangeGhg: "Uso de Suelo",
                      farmGhg: "Granja (Metano/Estiércol)",
                      animalFeedGhg: "Pienso Animal",
                      processingGhg: "Procesamiento",
                      transportGhg: "Transporte",
                      packgingGhg: "Envasado",
                      retailGhg: "Venta Minorista"
                    };
                    return map[val] || val;
                  }}
                />
                <Bar dataKey="landUseChangeGhg" stackId="a" fill="#15803d" />
                <Bar dataKey="farmGhg" stackId="a" fill="#b91c1c" />
                <Bar dataKey="animalFeedGhg" stackId="a" fill="#ea580c" />
                <Bar dataKey="processingGhg" stackId="a" fill="#f59e0b" />
                <Bar dataKey="transportGhg" stackId="a" fill="#3b82f6" />
                <Bar dataKey="packgingGhg" stackId="a" fill="#8b5cf6" />
                <Bar dataKey="retailGhg" stackId="a" fill="#64748b" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 bg-primary/5 dark:bg-emerald-500/5 rounded-xl border border-primary/20 dark:border-emerald-500/20 text-xs font-mono text-on-surface leading-relaxed">
            <span className="font-bold text-primary dark:text-emerald-400">💡 Conclusión de Science (2018):</span> Lo que comemos importa infinitamente más que de dónde proviene. La carne de vacuno local genera casi 100 kg CO₂eq/kg, mientras que las legumbres o el tofu importados desde el otro lado del planeta generan apenas 1-3 kg CO₂eq/kg.
          </div>
        </div>
      )}

      {/* TAB 2: The Food Miles Debunker Calculator */}
      {activeTab === "food_miles_calculator" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-sm font-heading font-bold text-on-surface">
              ¿Cuánto tendría que viajar un alimento vegetal para igualar a la carne local?
            </h4>
            <p className="text-xs text-on-surface-variant">
              Compara la huella de 1 kg de carne de vacuno criada localmente (99,5 kg CO₂eq) frente a alternativas vegetales transportadas a gran distancia.
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
                <span>{opt.icon}</span> {opt.name} ({opt.baseGhg} kg CO₂)
              </button>
            ))}
          </div>

          {/* Result Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Cargo ship */}
            <div className="p-6 bg-blue-500/10 dark:bg-blue-500/5 border border-blue-500/30 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-mono font-bold text-xs uppercase">
                <Truck className="w-4 h-4" /> Transporte Marítimo en Barco de Carga
              </div>
              <div className="text-3xl sm:text-4xl font-mono font-black text-on-surface">
                {shipKmEquivalent.toLocaleString("es-ES")} km
              </div>
              <div className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                ≈ {earthCircumnavigationsShip} vueltas completas a la Tierra por el ecuador
              </div>
              <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                Tendrías que enviar 1 kg de {selectedPlant.name.toLowerCase()} en barco de carga dando {earthCircumnavigationsShip} vueltas completas al planeta para que sus emisiones igualasen a las de solo 1 kg de carne de ternera local.
              </p>
            </div>

            {/* Diesel truck */}
            <div className="p-6 bg-amber-500/10 dark:bg-amber-500/5 border border-amber-500/30 rounded-2xl space-y-3">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-mono font-bold text-xs uppercase">
                <Truck className="w-4 h-4" /> Transporte Terrestre en Camión Diésel
              </div>
              <div className="text-3xl sm:text-4xl font-mono font-black text-on-surface">
                {truckKmEquivalent.toLocaleString("es-ES")} km
              </div>
              <div className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                ≈ {earthCircumnavigationsTruck} vueltas a la Tierra en carretera
              </div>
              <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                Incluso en camión de carretera (el medio de transporte de mercancías más contaminante), 1 kg de {selectedPlant.name.toLowerCase()} debería recorrer más de {truckKmEquivalent.toLocaleString("es-ES")} km por carretera para alcanzar la huella de 1 kg de ternera local.
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
