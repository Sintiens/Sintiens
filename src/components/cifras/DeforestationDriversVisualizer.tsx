import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";
import { BookOpen } from "lucide-react";
import {
  DEFORESTATION_DRIVERS_DATA
} from "../../data/cifras/ecologicalData";
import ScientificEvidenceModal from "./ScientificEvidenceModal";
import { CHART_AXIS, CHART_GRID, CHART_SERIES, CHART_TOOLTIP_STYLE } from "./chartPalette";
import { formatEs } from "../../utils/format";

export default function DeforestationDriversVisualizer() {
  const [selectedDriverIndex, setSelectedDriverIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedDriver = DEFORESTATION_DRIVERS_DATA[selectedDriverIndex] || DEFORESTATION_DRIVERS_DATA[0]!;

  // Paleta semántica única (índice = orden de drivers en los datos).
  const DRIVER_COLORS = [
    CHART_SERIES.ch1,
    CHART_SERIES.ch2,
    CHART_SERIES.ch6,
    CHART_SERIES.ch4,
    CHART_SERIES.ch5,
    CHART_AXIS
  ];

  return (
    <div className="w-full bg-surface dark:bg-zinc-900/60 rounded-2xl border border-outline-variant/30 dark:border-zinc-800 p-4 sm:p-5 lg:p-6 space-y-4 sm:space-y-5 text-left relative overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-outline-variant/20 dark:border-zinc-800 pb-3.5 sm:pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-primary dark:text-emerald-400 uppercase bg-primary/10 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-primary/20">
              DESTRUCCIÓN DE ECOSISTEMAS · EXHIBIT VII
            </span>
            <span className="text-xs font-mono text-on-surface-variant/50 hidden sm:inline">
              [ PENDRILL ET AL. / SCIENCE 2022 ]
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-on-surface">
            Motores de la Deforestación Tropical y Pérdida de Hábitat
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant/80 max-w-2xl font-light">
            La ganadería vacuna y el cultivo de piensos representan casi el 60% de toda la pérdida neta de bosque tropical y sabanas vírgenes del planeta.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="self-start md:self-auto flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono bg-surface-dim/50 dark:bg-zinc-800 hover:bg-surface-dim text-on-surface border border-outline-variant/30 dark:border-zinc-700 rounded-xl transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5 text-primary dark:text-emerald-400" />
          Respaldo Científico
        </button>
      </div>

      {/* Main Grid: Bar Chart (Left) + Detailed Driver Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Horizontal Bar Chart */}
        <div className="order-2 lg:order-1 lg:col-span-7 bg-surface-dim/20 dark:bg-zinc-950/40 p-4 rounded-xl border border-outline-variant/20 dark:border-zinc-800 flex flex-col justify-between">
          <span className="text-xs font-mono font-bold text-on-surface-variant/70 mb-2 block">
            Porcentaje de Deforestación Tropical Atribuible (%):
          </span>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {DEFORESTATION_DRIVERS_DATA.map((driver, index) => (
              <button
                key={driver.name}
                type="button"
                onClick={() => setSelectedDriverIndex(index)}
                aria-pressed={selectedDriverIndex === index}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition-all cursor-pointer ${
                  selectedDriverIndex === index
                    ? "bg-on-surface text-surface dark:bg-white dark:text-zinc-950 shadow-xs"
                    : "bg-surface-dim/40 dark:bg-zinc-800/40 text-on-surface-variant hover:text-on-surface border border-outline-variant/20"
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: DRIVER_COLORS[index] }} aria-hidden="true" />
                {driver.name.split(" (")[0]}
              </button>
            ))}
          </div>
          <div className="overflow-x-auto">
            <div
              className="w-full min-w-[500px] h-[280px] sm:min-w-0 sm:h-80"
              role="img"
              aria-label="Gráfico de barras horizontal: porcentaje de deforestación tropical atribuible a cada driver (pastoreo, oleaginosas, silvicultura, cultivos, otros). Usa los botones superiores para seleccionar un driver."
            >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={DEFORESTATION_DRIVERS_DATA}
                layout="vertical"
                accessibilityLayer
                margin={{ top: 10, right: 30, left: 8, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} opacity={0.9} horizontal={true} vertical={false} />
                <XAxis type="number" stroke={CHART_AXIS} fontSize={12} unit="%" fontFamily="JetBrains Mono, monospace" />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke={CHART_AXIS}
                  fontSize={11}
                  fontFamily="JetBrains Mono, monospace"
                  width={150}
                  tickLine={false}
                  tickFormatter={(value: string) => {
                    const short: Record<string, string> = {
                      "Pastoreo de Ganado Vacuno": "Pastoreo vacuno",
                      "Semillas Oleaginosas (Soja para Pienso y Palma)": "Oleaginosas (soja/palma)",
                      "Silvicultura y Explotación Maderera": "Silvicultura/madera",
                      "Cultivos Directos para Consumo Humano": "Cultivos (humano)",
                      "Cultivos Comerciales (Café, Cacao, Caucho)": "Cultivos comerciales",
                      "Otros Usos, Minería e Incendios Inducidos": "Otros usos/minería"
                    };
                    return short[value] ?? value;
                  }}
                />
                <Tooltip
                  contentStyle={CHART_TOOLTIP_STYLE}
                  formatter={(value) => [`${formatEs(Number(value), 1)}% de la deforestación`, "Impacto"]}
                />
                <Bar
                  dataKey="sharePercent"
                  radius={[0, 6, 6, 0]}
                  onClick={(_, index) => setSelectedDriverIndex(index)}
                  className="cursor-pointer"
                >
                  {DEFORESTATION_DRIVERS_DATA.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={DRIVER_COLORS[index]}
                      opacity={selectedDriverIndex === index ? 1 : 0.65}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            </div>
          </div>
          <span className="text-[11px] font-mono text-on-surface-variant/60 text-right mt-2 block">
            Haz clic en una barra o usa los botones para ver detalles
          </span>
        </div>

        {/* Right Column: Active Driver Card */}
        <div aria-live="polite" className="order-1 lg:order-2 lg:col-span-5 flex flex-col justify-between space-y-4 p-5 rounded-2xl bg-surface-dim/40 dark:bg-zinc-950/60 border border-outline-variant/20 dark:border-zinc-800">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-outline-variant/15 pb-2">
              <h4 className="text-base sm:text-lg font-heading font-bold text-on-surface dark:text-zinc-100 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: DRIVER_COLORS[selectedDriverIndex] }} />
                {selectedDriver.name}
              </h4>
              <span className="text-xl font-mono font-bold" style={{ color: DRIVER_COLORS[selectedDriverIndex] }}>
                {selectedDriver.sharePercent}%
              </span>
            </div>

            <div className="space-y-1 text-xs font-mono">
              <span className="text-on-surface-variant/60 block text-[10px] uppercase">Pérdida Anual Estimada:</span>
              <span className="text-on-surface font-bold text-sm dark:text-zinc-200">{selectedDriver.annualHectaresLoss}</span>
            </div>

            <div className="space-y-1 text-xs font-mono">
              <span className="text-on-surface-variant/60 block text-[10px] uppercase">Biomas Más Afectados:</span>
              <span className="text-on-surface font-medium dark:text-zinc-300">{selectedDriver.primaryRegions}</span>
            </div>

            <p className="text-xs sm:text-sm text-on-surface-variant/90 leading-relaxed font-light pt-2">
              {selectedDriver.driverDetail}
            </p>
          </div>

          {/* Soy for Feed vs Human Callout */}
          <div className="p-3.5 rounded-xl bg-surface-dim/30 dark:bg-zinc-900/60 border border-outline-variant/15 space-y-1 text-xs font-mono">
            <span className="text-[10px] text-amber-600 dark:text-amber-400 uppercase font-bold block">
              Destino Global de la Soja Cultivada:
            </span>
            <p className="text-[11px] text-on-surface-variant/80 font-sans">
              El <strong>77% de toda la soja</strong> mundial se procesa directamente en harina y tortas proteicas para alimentar ganado intensivo. Solo el <strong>7%</strong> se destina a consumo humano directo (tofu, leche de soja, edamame).
            </p>
          </div>
        </div>
      </div>

      {/* Scientific Evidence Modal */}
      <ScientificEvidenceModal
        sourceId="pendrill-deforestation-2022"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rawDataset={DEFORESTATION_DRIVERS_DATA}
        datasetName="Motores de Deforestación (Pendrill et al. 2022)"
      />
    </div>
  );
}
