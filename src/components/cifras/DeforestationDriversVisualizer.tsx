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

export default function DeforestationDriversVisualizer() {
  const [selectedDriverIndex, setSelectedDriverIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedDriver = DEFORESTATION_DRIVERS_DATA[selectedDriverIndex] || DEFORESTATION_DRIVERS_DATA[0]!;

  return (
    <div className="w-full bg-surface dark:bg-zinc-900/60 rounded-2xl border border-outline-variant/30 dark:border-zinc-800 p-6 sm:p-8 space-y-6 text-left relative overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/20 dark:border-zinc-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-primary dark:text-emerald-400 uppercase bg-primary/10 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-primary/20">
              DESTRUCCIÓN DE ECOSISTEMAS · EXHIBIT V
            </span>
            <span className="text-xs font-mono text-on-surface-variant/50 hidden sm:inline">
              [ PENDRILL ET AL. / SCIENCE 2022 ]
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-on-surface dark:text-zinc-100">
            Motores de la Deforestación Tropical y Pérdida de Hábitat
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant/80 max-w-2xl font-light">
            La ganadería vacuna y el cultivo de piensos representan casi el 60% de toda la pérdida neta de bosque tropical y sabanas vírgenes del planeta.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="self-start md:self-auto flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono bg-surface-dim/50 dark:bg-zinc-800 hover:bg-surface-dim text-on-surface border border-outline-variant/30 dark:border-zinc-700 rounded-lg transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5 text-primary dark:text-emerald-400" />
          Respaldo Científico
        </button>
      </div>

      {/* Main Grid: Bar Chart (Left) + Detailed Driver Card (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Horizontal Bar Chart */}
        <div className="lg:col-span-7 bg-surface-dim/20 dark:bg-zinc-950/40 p-4 rounded-xl border border-outline-variant/20 dark:border-zinc-800 flex flex-col justify-between">
          <span className="text-xs font-mono font-bold text-on-surface-variant/70 mb-2 block">
            Porcentaje de Deforestación Tropical Atribuible (%):
          </span>
          <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={DEFORESTATION_DRIVERS_DATA}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 120, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#525252" opacity={0.15} horizontal={true} vertical={false} />
                <XAxis type="number" stroke="#888" fontSize={12} unit="%" fontFamily="JetBrains Mono, monospace" />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#888"
                  fontSize={11}
                  fontFamily="JetBrains Mono, monospace"
                  width={130}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#18181b",
                    borderColor: "#3f3f46",
                    borderRadius: "10px",
                    color: "#f4f4f5",
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "12px"
                  }}
                  formatter={(value: any) => [`${value}% de la deforestación`, "Impacto"]}
                />
                <Bar
                  dataKey="sharePercent"
                  radius={[0, 6, 6, 0]}
                  onClick={(_, index) => setSelectedDriverIndex(index)}
                  className="cursor-pointer"
                >
                  {DEFORESTATION_DRIVERS_DATA.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      opacity={selectedDriverIndex === index ? 1 : 0.65}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <span className="text-[11px] font-mono text-on-surface-variant/60 text-right mt-2 block">
            Haz clic en una barra para ver detalles
          </span>
        </div>

        {/* Right Column: Active Driver Card */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4 p-5 rounded-2xl bg-surface-dim/40 dark:bg-zinc-950/60 border border-outline-variant/20 dark:border-zinc-800">
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-outline-variant/15 pb-2">
              <h4 className="text-base sm:text-lg font-heading font-bold text-on-surface dark:text-zinc-100 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedDriver.color }} />
                {selectedDriver.name}
              </h4>
              <span className="text-xl font-mono font-bold" style={{ color: selectedDriver.color }}>
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
