import { useState } from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { BookOpen, BarChart3, Globe2, TrendingUp } from "lucide-react";
import {
  HISTORICAL_SLAUGHTER_SERIES,
  COUNTRY_MEAT_CONSUMPTION_DATA
} from "../../data/cifras/slaughterData";
import ScientificEvidenceModal from "./ScientificEvidenceModal";

export default function SlaughterTimeSeriesChart() {
  const [chartType, setChartType] = useState<"stacked_area" | "lines">("stacked_area");
  const [showAquaculture, setShowAquaculture] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState<"global_series" | "per_capita" | "country_comparison">("global_series");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Transform country data for time series chart
  const countryComparisonTimeSeries = [
    { year: "1961", usa: 89.2, spain: 21.8, china: 3.8, brazil: 29.4, germany: 64.0, world: 23.1, india: 3.7 },
    { year: "1970", usa: 104.5, spain: 38.4, china: 8.5, brazil: 34.1, germany: 78.5, world: 28.4, india: 3.9 },
    { year: "1980", usa: 108.0, spain: 67.2, china: 13.8, brazil: 41.2, germany: 92.1, world: 30.1, india: 4.1 },
    { year: "1990", usa: 112.4, spain: 95.6, china: 25.1, brazil: 55.8, germany: 88.4, world: 33.6, india: 4.4 },
    { year: "2000", usa: 120.1, spain: 118.4, china: 45.2, brazil: 74.3, germany: 86.2, world: 38.2, india: 4.6 },
    { year: "2010", usa: 117.8, spain: 98.2, china: 56.4, brazil: 91.5, germany: 87.0, world: 41.8, india: 4.5 },
    { year: "2020", usa: 124.1, spain: 100.2, china: 63.8, brazil: 99.8, germany: 82.5, world: 42.6, india: 4.2 },
    { year: "2024", usa: 126.8, spain: 98.7, china: 68.5, brazil: 102.4, germany: 79.3, world: 43.8, india: 4.5 }
  ];

  return (
    <div className="w-full bg-surface dark:bg-zinc-900/60 rounded-2xl border border-outline-variant/30 dark:border-zinc-800 p-6 sm:p-8 space-y-6 text-left relative overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/20 dark:border-zinc-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-primary dark:text-emerald-400 uppercase bg-primary/10 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-primary/20">
              SERIES TEMPORALES (1961—2024) · EXHIBIT II
            </span>
            <span className="text-xs font-mono text-on-surface-variant/60">
              FAOSTAT Database
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-on-surface">
            Explosión Histórica del Sacrificio y Consumo Global
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl">
            Evolución cuantitativa de las últimas seis décadas: la avicultura industrial se ha multiplicado por más de 11x (+1.048%), convirtiéndose en el mayor volumen de sacrificio terrestre.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="self-start md:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-outline-variant/30 dark:border-zinc-700 bg-surface-dim/50 hover:bg-surface-dim text-xs font-mono font-bold text-on-surface transition-all cursor-pointer shadow-sm shrink-0"
        >
          <BookOpen className="w-3.5 h-3.5 text-primary" /> Respaldo Científico
        </button>
      </div>

      {/* Navigation Subtabs */}
      <div className="flex items-center gap-2 border-b border-outline-variant/20 dark:border-zinc-800 pb-2">
        <button
          onClick={() => setActiveSubTab("global_series")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === "global_series"
              ? "bg-primary text-on-primary shadow-sm"
              : "text-on-surface-variant hover:text-on-surface bg-surface-dim/30"
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" /> Series Globales de Sacrificio
        </button>
        <button
          onClick={() => setActiveSubTab("country_comparison")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === "country_comparison"
              ? "bg-primary text-on-primary shadow-sm"
              : "text-on-surface-variant hover:text-on-surface bg-surface-dim/30"
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" /> Gráfico Comparativo por Países
        </button>
        <button
          onClick={() => setActiveSubTab("per_capita")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === "per_capita"
              ? "bg-primary text-on-primary shadow-sm"
              : "text-on-surface-variant hover:text-on-surface bg-surface-dim/30"
          }`}
        >
          <Globe2 className="w-3.5 h-3.5" /> Tabla de Consumo per Cápita
        </button>
      </div>

      {/* TAB 1: Global Series Chart */}
      {activeSubTab === "global_series" && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-surface-dim/30 dark:bg-zinc-800/30 p-3.5 rounded-xl border border-outline-variant/20 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-on-surface-variant font-bold">
                Tipo de Gráfica:
              </span>
              <button
                onClick={() => setChartType("stacked_area")}
                className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                  chartType === "stacked_area"
                    ? "bg-on-surface text-surface dark:bg-white dark:text-zinc-950 shadow-xs"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Áreas Apiladas
              </button>
              <button
                onClick={() => setChartType("lines")}
                className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                  chartType === "lines"
                    ? "bg-on-surface text-surface dark:bg-white dark:text-zinc-950 shadow-xs"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                Líneas
              </button>
            </div>

            <label className="flex items-center gap-2 text-xs font-mono font-bold text-on-surface cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showAquaculture}
                onChange={(e) => setShowAquaculture(e.target.checked)}
                className="rounded text-primary focus:ring-primary"
              />
              Incluir Peces de Acuicultura
            </label>
          </div>

          {/* Recharts Canvas */}
          <div className="w-full h-[400px] sm:h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "stacked_area" ? (
                <AreaChart
                  data={HISTORICAL_SLAUGHTER_SERIES}
                  margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis
                    dataKey="year"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickFormatter={(val) => `${(val / 1000).toFixed(0)}k M`}
                    tickLine={false}
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
                        chickensMillions: "Pollos",
                        pigsMillions: "Cerdos",
                        cattleMillions: "Vacuno",
                        sheepGoatsMillions: "Ovejas/Cabras",
                        turkeysDucksMillions: "Pavos y Patos",
                        aquacultureFishMillions: "Piscicultura"
                      };
                      return [`${Number(value).toLocaleString("es-ES")} Millones`, labels[name] || name];
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    formatter={(val) => {
                      const map: Record<string, string> = {
                        chickensMillions: "Pollos de engorde",
                        pigsMillions: "Cerdos",
                        cattleMillions: "Vacuno",
                        sheepGoatsMillions: "Ovejas y Cabras",
                        turkeysDucksMillions: "Pavos y Patos",
                        aquacultureFishMillions: "Peces de Piscifactoría"
                      };
                      return map[val] || val;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="chickensMillions"
                    stackId="1"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.7}
                  />
                  <Area
                    type="monotone"
                    dataKey="turkeysDucksMillions"
                    stackId="1"
                    stroke="#f97316"
                    fill="#f97316"
                    fillOpacity={0.7}
                  />
                  <Area
                    type="monotone"
                    dataKey="pigsMillions"
                    stackId="1"
                    stroke="#ec4899"
                    fill="#ec4899"
                    fillOpacity={0.7}
                  />
                  <Area
                    type="monotone"
                    dataKey="sheepGoatsMillions"
                    stackId="1"
                    stroke="#84cc16"
                    fill="#84cc16"
                    fillOpacity={0.7}
                  />
                  <Area
                    type="monotone"
                    dataKey="cattleMillions"
                    stackId="1"
                    stroke="#64748b"
                    fill="#64748b"
                    fillOpacity={0.7}
                  />
                  {showAquaculture && (
                    <Area
                      type="monotone"
                      dataKey="aquacultureFishMillions"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.7}
                    />
                  )}
                </AreaChart>
              ) : (
                <LineChart
                  data={HISTORICAL_SLAUGHTER_SERIES}
                  margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="year" stroke="#888888" fontSize={12} tickLine={false} />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickFormatter={(val) => `${(val / 1000).toFixed(0)}k M`}
                    tickLine={false}
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
                        chickensMillions: "Pollos",
                        pigsMillions: "Cerdos",
                        cattleMillions: "Vacuno",
                        sheepGoatsMillions: "Ovejas/Cabras",
                        turkeysDucksMillions: "Pavos y Patos",
                        aquacultureFishMillions: "Piscicultura"
                      };
                      return [`${Number(value).toLocaleString("es-ES")} Millones`, labels[name] || name];
                    }}
                  />
                  <Legend
                    verticalAlign="top"
                    height={36}
                    formatter={(val) => {
                      const map: Record<string, string> = {
                        chickensMillions: "Pollos de engorde",
                        pigsMillions: "Cerdos",
                        cattleMillions: "Vacuno",
                        sheepGoatsMillions: "Ovejas y Cabras",
                        turkeysDucksMillions: "Pavos y Patos",
                        aquacultureFishMillions: "Peces de Piscifactoría"
                      };
                      return map[val] || val;
                    }}
                  />
                  <Line type="monotone" dataKey="chickensMillions" stroke="#ef4444" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="turkeysDucksMillions" stroke="#f97316" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="pigsMillions" stroke="#ec4899" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="sheepGoatsMillions" stroke="#84cc16" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="cattleMillions" stroke="#64748b" strokeWidth={2} dot={false} />
                  {showAquaculture && (
                    <Line type="monotone" dataKey="aquacultureFishMillions" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  )}
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* Key Insights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-surface-dim/40 dark:bg-zinc-800/40 rounded-xl border border-outline-variant/20 dark:border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-red-600 dark:text-red-400 font-bold block">
                🍗 Aves de Corral
              </span>
              <span className="text-xl font-mono font-bold text-on-surface">
                +1.048%
              </span>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                De 6.600 millones en 1961 a más de 74.000 millones en 2024 debido a la intensificación de naves industriales.
              </p>
            </div>

            <div className="p-4 bg-surface-dim/40 dark:bg-zinc-800/40 rounded-xl border border-outline-variant/20 dark:border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-pink-600 dark:text-pink-400 font-bold block">
                🐖 Porcino
              </span>
              <span className="text-xl font-mono font-bold text-on-surface">
                +305%
              </span>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                De 376 millones a 1.520 millones anuales, impulsado por el rápido incremento del consumo per cápita en Asia y la UE.
              </p>
            </div>

            <div className="p-4 bg-surface-dim/40 dark:bg-zinc-800/40 rounded-xl border border-outline-variant/20 dark:border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold block">
                🐟 Acuicultura Marina
              </span>
              <span className="text-xl font-mono font-bold text-on-surface">
                +4.200%
              </span>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                La piscicultura intensiva ha crecido más rápido que cualquier otro sector ganadero desde los años 1980.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Interactive Country Comparison */}
      {activeSubTab === "country_comparison" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-primary dark:text-emerald-400 font-bold">
              Consumo Cárnico Histórico (kg por persona / año) de 1961 a 2024
            </span>
            <p className="text-xs text-on-surface-variant">
              Compara cómo ha evolucionado el consumo per cápita en los principales países productores y consumidores.
            </p>
          </div>

          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={countryComparisonTimeSeries}
                margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="year" stroke="#888888" fontSize={12} tickLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickFormatter={(val) => `${val} kg`}
                  tickLine={false}
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
                    const map: Record<string, string> = {
                      usa: "🇺🇸 Estados Unidos",
                      spain: "🇪🇸 España",
                      china: "🇨🇳 China",
                      brazil: "🇧🇷 Brasil",
                      germany: "🇩🇪 Alemania",
                      world: "🌐 Media Mundial",
                      india: "🇮🇳 India"
                    };
                    return [`${value} kg / persona / año`, map[name] || name];
                  }}
                />
                <Legend
                  verticalAlign="top"
                  height={36}
                  formatter={(val) => {
                    const map: Record<string, string> = {
                      usa: "EE.UU. (126.8 kg)",
                      spain: "España (98.7 kg)",
                      china: "China (68.5 kg)",
                      brazil: "Brasil (102.4 kg)",
                      germany: "Alemania (79.3 kg)",
                      world: "Media Mundial (43.8 kg)",
                      india: "India (4.5 kg)"
                    };
                    return map[val] || val;
                  }}
                />
                <Line type="monotone" dataKey="usa" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="spain" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="brazil" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="china" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="germany" stroke="#06b6d4" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="world" stroke="#ffffff" strokeWidth={2} strokeDasharray="5 5" dot={{ r: 2 }} />
                <Line type="monotone" dataKey="india" stroke="#64748b" strokeWidth={1.5} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 bg-surface-dim/40 dark:bg-zinc-800/40 rounded-xl border border-outline-variant/20 dark:border-zinc-800 text-xs font-mono text-on-surface-variant leading-relaxed">
            <span className="font-bold text-on-surface">💡 Conclusión zootécnica:</span> España pasó de 21,8 kg/persona en 1961 a casi 100 kg/persona en la actualidad, situándose entre los países con mayor consumo de carne per cápita del mundo junto a EE.UU. y Brasil.
          </div>
        </div>
      )}

      {/* TAB 3: Per Capita Table */}
      {activeSubTab === "per_capita" && (
        <div className="space-y-4 overflow-x-auto">
          <table className="w-full text-left text-xs font-sans border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 dark:border-zinc-800 text-[11px] font-mono uppercase tracking-wider text-on-surface-variant">
                <th className="py-3 px-4">País / Región</th>
                <th className="py-3 px-4 text-right">Consumo 1961</th>
                <th className="py-3 px-4 text-right">Consumo 2021</th>
                <th className="py-3 px-4 text-right">Variación %</th>
                <th className="py-3 px-4 text-right">Carne Dominante</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 dark:divide-zinc-800/60 font-mono">
              {COUNTRY_MEAT_CONSUMPTION_DATA.map((row, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-surface-dim/40 dark:hover:bg-zinc-800/40 transition-colors"
                >
                  <td className="py-3 px-4 font-bold text-on-surface">
                    {row.country}
                  </td>
                  <td className="py-3 px-4 text-right text-on-surface-variant">
                    {row.kgPerCapita1961} kg
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-red-600 dark:text-red-400">
                    {row.kgPerCapita2021} kg
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-on-surface">
                    {row.growthPercent > 0 ? `+${row.growthPercent}%` : `${row.growthPercent}%`}
                  </td>
                  <td className="py-3 px-4 text-right text-on-surface-variant font-sans">
                    {row.primaryMeat}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Scientific Modal */}
      <ScientificEvidenceModal
        sourceId="faostat-slaughter-2024"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rawDataset={{
          historicalSlaughterSeries: HISTORICAL_SLAUGHTER_SERIES,
          countryMeatConsumption: COUNTRY_MEAT_CONSUMPTION_DATA,
          countryComparisonTimeSeries
        }}
        datasetName="faostat_historical_series"
      />
    </div>
  );
}
