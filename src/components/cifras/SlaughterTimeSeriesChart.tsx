import { useEffect, useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { BookOpen, BarChart3, Globe2, TrendingUp } from "lucide-react";
import {
  HISTORICAL_SLAUGHTER_SERIES,
  COUNTRY_MEAT_CONSUMPTION_DATA,
  COUNTRY_MEAT_CONSUMPTION_TIMESERIES
} from "../../data/cifras/slaughterData";
import ScientificEvidenceModal from "./ScientificEvidenceModal";
import ChartLegend from "./ChartLegend";
import { CHART_AXIS, CHART_GRID, CHART_SERIES, CHART_TOOLTIP_STYLE } from "./chartPalette";
import { formatEs } from "../../utils/format";

const GLOBAL_YEARS = [1961, 1970, 1980, 1990, 2000, 2010, 2015, 2020, 2022, 2024];
const GLOBAL_YEARS_MOBILE = [1961, 1980, 2000, 2024];
const COUNTRY_YEARS = COUNTRY_MEAT_CONSUMPTION_TIMESERIES.map((d) => d.year);
const COUNTRY_YEARS_MOBILE = [1961, 1980, 2000, 2021];

export default function SlaughterTimeSeriesChart() {
  const [chartType, setChartType] = useState<"stacked_area" | "lines">("stacked_area");
  const [showAquaculture, setShowAquaculture] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState<"global_series" | "per_capita" | "country_comparison">("global_series");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // La serie fuente está en miles de millones (10⁹); se normaliza a millones para la UI.
  const globalSeries = useMemo(
    () =>
      HISTORICAL_SLAUGHTER_SERIES.map((d) => ({
        year: d.year,
        chickensMillions: d.chickens * 1000,
        turkeysDucksMillions: d.ducksAndTurkeys * 1000,
        pigsMillions: d.pigs * 1000,
        sheepGoatsMillions: d.sheepAndGoats * 1000,
        cattleMillions: d.cattle * 1000,
        aquacultureFishMillions: d.farmedFishEstimated * 1000
      })),
    []
  );

  const speciesTooltipLabels: Record<string, string> = {
    chickensMillions: "Pollos",
    pigsMillions: "Cerdos",
    cattleMillions: "Vacuno",
    sheepGoatsMillions: "Ovejas/Cabras",
    turkeysDucksMillions: "Pavos y Patos",
    aquacultureFishMillions: "Piscicultura"
  };

  const countryTooltipLabels: Record<string, string> = {
    usa: "🇺🇸 Estados Unidos",
    spain: "🇪🇸 España",
    china: "🇨🇳 China",
    brazil: "🇧🇷 Brasil",
    germany: "🇩🇪 Alemania",
    world: "🌐 Media Mundial",
    india: "🇮🇳 India"
  };

  const renderSpeciesTooltip = (value: unknown, name: unknown) => {
    const num = typeof value === "number" ? value : Number(value);
    return [`${formatEs(num)} millones`, speciesTooltipLabels[String(name)] || String(name)];
  };

  const renderCountryTooltip = (value: unknown, name: unknown) => {
    const num = typeof value === "number" ? value : Number(value);
    return [`${formatEs(num, 1)} kg / persona / año`, countryTooltipLabels[String(name)] || String(name)];
  };

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
      <div className="flex flex-wrap items-center gap-2 border-b border-outline-variant/20 dark:border-zinc-800 pb-2">
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
          <div
            className="w-full h-[320px] sm:h-[450px]"
            role="img"
            aria-label="Gráfico interactivo: animales sacrificados anualmente en el mundo (1961-2024) por especie (pollos, cerdos, vacuno, ovejas y cabras, pavos y patos, y opcionalmente peces de acuicultura). Alterna entre área apilada y líneas."
          >
            <ResponsiveContainer width="100%" height="100%">
              {chartType === "stacked_area" ? (
                <AreaChart
                  data={globalSeries}
                  accessibilityLayer
                  margin={isMobile ? { top: 10, right: 10, left: 2, bottom: 0 } : { top: 10, right: 30, left: 20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} opacity={0.9} />
                  <XAxis
                    dataKey="year"
                    type="number"
                    domain={[1961, 2024]}
                    ticks={isMobile ? GLOBAL_YEARS_MOBILE : GLOBAL_YEARS}
                    stroke={CHART_AXIS}
                    fontSize={isMobile ? 10 : 12}
                    tickLine={false}
                  />
                  <YAxis
                    stroke={CHART_AXIS}
                    fontSize={isMobile ? 10 : 12}
                    tickFormatter={(val: number) => isMobile ? `${formatEs(val / 1000, 0)} mM` : `${formatEs(val / 1000, val < 10000 ? 1 : 0)} mil M`}
                    tickLine={false}
                    width={isMobile ? 52 : 78}
                  />
                  <Tooltip contentStyle={CHART_TOOLTIP_STYLE} formatter={renderSpeciesTooltip} />
                  <Area
                    type="linear"
                    dataKey="chickensMillions"
                    stackId="1"
                    stroke={CHART_SERIES.ch1}
                    fill={CHART_SERIES.ch1}
                    fillOpacity={0.7}
                  />
                  <Area
                    type="linear"
                    dataKey="turkeysDucksMillions"
                    stackId="1"
                    stroke={CHART_SERIES.ch3}
                    fill={CHART_SERIES.ch3}
                    fillOpacity={0.7}
                  />
                  <Area
                    type="linear"
                    dataKey="pigsMillions"
                    stackId="1"
                    stroke={CHART_SERIES.ch5}
                    fill={CHART_SERIES.ch5}
                    fillOpacity={0.7}
                  />
                  <Area
                    type="linear"
                    dataKey="sheepGoatsMillions"
                    stackId="1"
                    stroke={CHART_SERIES.ch6}
                    fill={CHART_SERIES.ch6}
                    fillOpacity={0.7}
                  />
                  <Area
                    type="linear"
                    dataKey="cattleMillions"
                    stackId="1"
                    stroke={CHART_AXIS}
                    fill={CHART_AXIS}
                    fillOpacity={0.7}
                  />
                  {showAquaculture && (
                    <Area
                      type="linear"
                      dataKey="aquacultureFishMillions"
                      stackId="1"
                      stroke={CHART_SERIES.ch4}
                      fill={CHART_SERIES.ch4}
                      fillOpacity={0.7}
                    />
                  )}
                </AreaChart>
              ) : (
                <LineChart
                  data={globalSeries}
                  accessibilityLayer
                  margin={isMobile ? { top: 10, right: 10, left: 2, bottom: 0 } : { top: 10, right: 30, left: 20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} opacity={0.9} />
                  <XAxis
                    dataKey="year"
                    type="number"
                    domain={[1961, 2024]}
                    ticks={isMobile ? GLOBAL_YEARS_MOBILE : GLOBAL_YEARS}
                    stroke={CHART_AXIS}
                    fontSize={isMobile ? 10 : 12}
                    tickLine={false}
                  />
                  <YAxis
                    stroke={CHART_AXIS}
                    fontSize={isMobile ? 10 : 12}
                    tickFormatter={(val: number) => isMobile ? `${formatEs(val / 1000, 0)} mM` : `${formatEs(val / 1000, val < 10000 ? 1 : 0)} mil M`}
                    tickLine={false}
                    width={isMobile ? 52 : 78}
                  />
                  <Tooltip contentStyle={CHART_TOOLTIP_STYLE} formatter={renderSpeciesTooltip} />
                  <Line type="linear" dataKey="chickensMillions" stroke={CHART_SERIES.ch1} strokeWidth={3} dot={false} />
                  <Line type="linear" dataKey="turkeysDucksMillions" stroke={CHART_SERIES.ch3} strokeWidth={2} dot={false} />
                  <Line type="linear" dataKey="pigsMillions" stroke={CHART_SERIES.ch5} strokeWidth={2} dot={false} />
                  <Line type="linear" dataKey="sheepGoatsMillions" stroke={CHART_SERIES.ch6} strokeWidth={2} dot={false} />
                  <Line type="linear" dataKey="cattleMillions" stroke={CHART_AXIS} strokeWidth={2} dot={false} />
                  {showAquaculture && (
                    <Line type="linear" dataKey="aquacultureFishMillions" stroke={CHART_SERIES.ch4} strokeWidth={2} dot={false} />
                  )}
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>

          <ChartLegend
            items={[
              { label: "Pollos de engorde", color: CHART_SERIES.ch1 },
              { label: "Pavos y Patos", color: CHART_SERIES.ch3 },
              { label: "Cerdos", color: CHART_SERIES.ch5 },
              { label: "Ovejas y Cabras", color: CHART_SERIES.ch6 },
              { label: "Vacuno", color: CHART_AXIS },
              ...(showAquaculture ? [{ label: "Peces de Piscifactoría", color: CHART_SERIES.ch4 }] : [])
            ]}
          />

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
                De 6.600 millones en 1961 a más de 75.000 millones en 2024 debido a la intensificación de naves industriales.
              </p>
            </div>

            <div className="p-4 bg-surface-dim/40 dark:bg-zinc-800/40 rounded-xl border border-outline-variant/20 dark:border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-pink-600 dark:text-pink-400 font-bold block">
                🐖 Porcino
              </span>
              <span className="text-xl font-mono font-bold text-on-surface">
                +300%
              </span>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                De 380 millones a 1.520 millones anuales, impulsado por el rápido incremento del consumo per cápita en Asia y la UE.
              </p>
            </div>

            <div className="p-4 bg-surface-dim/40 dark:bg-zinc-800/40 rounded-xl border border-outline-variant/20 dark:border-zinc-800 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold block">
                🐟 Acuicultura Marina
              </span>
              <span className="text-xl font-mono font-bold text-on-surface">
                +3.931%
              </span>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                La piscicultura pasó de 3.200 millones de peces en 1961 a 129.000 millones en 2024, el sector ganadero de mayor crecimiento.
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
              Consumo Cárnico Histórico (kg por persona / año) de 1961 a 2021
            </span>
            <p className="text-xs text-on-surface-variant">
              Compara cómo ha evolucionado el consumo per cápita en los principales países productores y consumidores.
            </p>
          </div>

          <div
            className="w-full h-[340px] sm:h-[400px]"
            role="img"
            aria-label="Gráfico de líneas: consumo cárnico per cápita (kg por persona y año) de 1961 a 2021 en países seleccionados."
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={COUNTRY_MEAT_CONSUMPTION_TIMESERIES}
                accessibilityLayer
                margin={isMobile ? { top: 10, right: 10, left: 2, bottom: 0 } : { top: 10, right: 30, left: 20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} opacity={0.9} />
                <XAxis
                  dataKey="year"
                  type="number"
                  domain={[1961, 2021]}
                  ticks={isMobile ? COUNTRY_YEARS_MOBILE : COUNTRY_YEARS}
                  stroke={CHART_AXIS}
                  fontSize={isMobile ? 10 : 12}
                  tickLine={false}
                />
                <YAxis
                  stroke={CHART_AXIS}
                  fontSize={isMobile ? 10 : 12}
                  tickFormatter={(val: number) => `${formatEs(val)} kg`}
                  tickLine={false}
                  width={isMobile ? 48 : 60}
                />
                <Tooltip contentStyle={CHART_TOOLTIP_STYLE} formatter={renderCountryTooltip} />
                <Line type="linear" dataKey="usa" stroke={CHART_SERIES.ch1} strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="linear" dataKey="spain" stroke={CHART_SERIES.ch3} strokeWidth={3} dot={{ r: 4 }} />
                <Line type="linear" dataKey="brazil" stroke={CHART_SERIES.ch6} strokeWidth={2} dot={{ r: 3 }} />
                <Line type="linear" dataKey="china" stroke={CHART_SERIES.ch5} strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="linear" dataKey="germany" stroke={CHART_SERIES.ch4} strokeWidth={2} dot={{ r: 3 }} />
                <Line type="linear" dataKey="world" stroke={CHART_AXIS} strokeWidth={2} strokeDasharray="5 5" dot={{ r: 2 }} />
                <Line type="linear" dataKey="india" stroke={CHART_AXIS} strokeWidth={1.5} dot={{ r: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <ChartLegend
            items={[
              { label: "EE.UU. (126,8 kg)", color: CHART_SERIES.ch1 },
              { label: "España (100,3 kg)", color: CHART_SERIES.ch3 },
              { label: "Brasil (98,7 kg)", color: CHART_SERIES.ch6 },
              { label: "China (63,6 kg)", color: CHART_SERIES.ch5 },
              { label: "Alemania (79,2 kg)", color: CHART_SERIES.ch4 },
              { label: "Media Mundial (42,8 kg)", color: CHART_AXIS, dashed: true },
              { label: "India (4,5 kg)", color: CHART_AXIS }
            ]}
          />

          <div className="p-4 bg-surface-dim/40 dark:bg-zinc-800/40 rounded-xl border border-outline-variant/20 dark:border-zinc-800 text-xs font-mono text-on-surface-variant leading-relaxed">
            <span className="font-bold text-on-surface">💡 Conclusión zootécnica:</span> España pasó de 21,8 kg/persona en 1961 a 100,3 kg/persona en 2021, situándose entre los países con mayor consumo de carne per cápita del mundo junto a EE.UU. y Brasil.
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
              {COUNTRY_MEAT_CONSUMPTION_DATA.map((row) => (
                <tr
                  key={row.code}
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
          countryComparisonTimeSeries: COUNTRY_MEAT_CONSUMPTION_TIMESERIES
        }}
        datasetName="faostat_historical_series"
      />
    </div>
  );
}
