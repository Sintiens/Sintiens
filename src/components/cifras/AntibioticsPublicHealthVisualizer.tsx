import { useMemo, useState } from "react";
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
import { BookOpen, Pill, Skull, AlertTriangle, Globe2 } from "lucide-react";
import {
  AMR_PROJECTION_DATA,
  ANTIBIOTIC_SECTORS_DATA,
  COUNTRY_ANTIBIOTIC_INTENSITY_DATA,
  ZOONOTIC_TIMELINE_DATA,
  type ZoonoticRiskEvent
} from "../../data/cifras/publicHealthData";
import ScientificEvidenceModal from "./ScientificEvidenceModal";
import { formatEs } from "../../utils/format";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { CHART_AXIS, CHART_GRID, CHART_SERIES, CHART_TOOLTIP_STYLE } from "./chartPalette";

export default function AntibioticsPublicHealthVisualizer() {
  const [activeSubTab, setActiveSubTab] = useState<"sectors" | "country_ranking" | "zoonoses">("sectors");
  const [selectedZoonosisIndex, setSelectedZoonosisIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const selectedZoonosis: ZoonoticRiskEvent = ZOONOTIC_TIMELINE_DATA[selectedZoonosisIndex] || ZOONOTIC_TIMELINE_DATA[0]!;

  const amrByYear = useMemo(() => {
    const years = [...new Set(AMR_PROJECTION_DATA.map((d) => d.year))].sort((a, b) => a - b);
    return years.map((year) => ({
      year,
      points: AMR_PROJECTION_DATA.filter((d) => d.year === year),
      projection: AMR_PROJECTION_DATA.some((d) => d.year === year && d.projection)
    }));
  }, []);

  return (
    <div className="w-full bg-surface dark:bg-zinc-900/60 rounded-2xl border border-outline-variant/30 dark:border-zinc-800 p-6 sm:p-8 space-y-8 text-left relative overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/20 dark:border-zinc-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-primary dark:text-emerald-400 uppercase bg-primary/10 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-primary/20">
              SALUD PÚBLICA Y BIOSEGURIDAD GLOBAL · EXHIBIT IX
            </span>
            <span className="text-xs font-mono text-on-surface-variant/60">
              Science (2017) & EMA ESVAC (2022)
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-on-surface">
            Uso Masivo de Antibióticos, Resistencia Antimicrobiana y Riesgo Pandémico
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl">
            Casi tres cuartas partes de todos los antibióticos producidos en el planeta se destinan a animales de granja, convirtiendo las instalaciones intensivas en el mayor caldo de cultivo de superbacterias multirresistentes.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="self-start md:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-outline-variant/30 dark:border-zinc-700 bg-surface-dim/50 hover:bg-surface-dim text-xs font-mono font-bold text-on-surface transition-all cursor-pointer shadow-sm shrink-0"
        >
          <BookOpen className="w-3.5 h-3.5 text-primary" /> Respaldo Científico
        </button>
      </div>

      {/* Sub Navigation */}
      <div role="tablist" aria-label="Vistas de salud pública" className="flex flex-wrap items-center gap-2 border-b border-outline-variant/20 dark:border-zinc-800 pb-2">
        <button
          role="tab"
          aria-selected={activeSubTab === "sectors"}
          onClick={() => setActiveSubTab("sectors")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === "sectors"
              ? "bg-primary text-on-primary shadow-sm"
              : "text-on-surface-variant hover:text-on-surface bg-surface-dim/30"
          }`}
        >
          <Pill className="w-3.5 h-3.5" /> Reparto Global (73% vs 27%)
        </button>
        <button
          role="tab"
          aria-selected={activeSubTab === "country_ranking"}
          onClick={() => setActiveSubTab("country_ranking")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === "country_ranking"
              ? "bg-primary text-on-primary shadow-sm"
              : "text-on-surface-variant hover:text-on-surface bg-surface-dim/30"
          }`}
        >
          <Globe2 className="w-3.5 h-3.5" /> Ranking por Países (mg/PCU)
        </button>
        <button
          role="tab"
          aria-selected={activeSubTab === "zoonoses"}
          onClick={() => setActiveSubTab("zoonoses")}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeSubTab === "zoonoses"
              ? "bg-primary text-on-primary shadow-sm"
              : "text-on-surface-variant hover:text-on-surface bg-surface-dim/30"
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" /> Cronología de Riesgo Zoonótico
        </button>
      </div>

      {/* TAB 1: Global Sector Distribution */}
      {activeSubTab === "sectors" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ANTIBIOTIC_SECTORS_DATA.map((sec, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border space-y-3 ${
                  idx === 0
                    ? "bg-red-500/10 dark:bg-red-500/5 border-red-500/30"
                    : "bg-blue-500/10 dark:bg-blue-500/5 border-blue-500/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase font-bold text-on-surface">
                    {sec.sector}
                  </span>
                  <span
                    className={`text-3xl font-mono font-bold ${
                      idx === 0 ? "text-red-600 dark:text-red-400" : "text-blue-600 dark:text-blue-400"
                    }`}
                  >
                    {sec.percentage}%
                  </span>
                </div>

                <div className="text-xs font-mono text-on-surface-variant">
                  Consumo estimado: <span className="font-bold text-on-surface">{sec.tonnesPerYear.toLocaleString("es-ES")} toneladas métricas/año</span>
                </div>

                <p className="text-xs sm:text-sm text-on-surface-variant font-sans leading-relaxed pt-1">
                  {sec.description}
                </p>
              </div>
            ))}
          </div>

          {/* AMR Mortality Projections Strip */}
          <div className="p-6 bg-surface-dim/40 dark:bg-zinc-800/40 rounded-2xl border border-outline-variant/20 dark:border-zinc-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-primary dark:text-emerald-400 font-bold">
              <Skull className="w-4 h-4 text-red-500" /> Mortalidad Humana por Resistencia Antimicrobiana (GRAM / Lancet)
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {amrByYear.map((entry) => {
                const attributable = entry.points.find((p) => p.metric === "attributable");
                const associated = entry.points.find((p) => p.metric === "associated");
                const isProjection = entry.projection;
                return (
                  <div
                    key={entry.year}
                    className={`p-4 bg-surface dark:bg-zinc-900 rounded-xl border space-y-2 ${
                      isProjection ? "border-red-500/30 bg-red-500/5" : "border-outline-variant/20"
                    }`}
                  >
                    <span className={`text-[10px] font-mono uppercase block ${
                      isProjection ? "text-red-600 dark:text-red-400 font-bold" : "text-on-surface-variant"
                    }`}>
                      Año {entry.year}{isProjection ? " (proyección)" : ""}
                    </span>
                    <div className="space-y-1">
                      <span className={`text-xl font-mono font-bold block ${
                        isProjection ? "text-red-600 dark:text-red-400" : "text-on-surface"
                      }`}>
                        {formatEs(attributable?.deathsMillions ?? 0, 2)} M{" "}
                        <span className="text-[11px] font-normal">atribuibles</span>
                      </span>
                      <span className="text-xl font-mono font-bold text-on-surface block">
                        {formatEs(associated?.deathsMillions ?? 0, 2)} M{" "}
                        <span className="text-[11px] font-normal">asociadas</span>
                      </span>
                    </div>
                    <p className="text-[10px] text-on-surface-variant/80 font-sans">
                      {attributable?.sourceLabel}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-on-surface-variant/80 font-sans">
              Atribuibles = causadas directamente por infecciones resistentes; asociadas = aquellas en las que la resistencia contribuyó. La proyección clásica de O'Neill (10 M en 2050, muertes totales) es un escenario distinto y contestado; GRAM 2024 proyecta 1,91 M atribuibles y 8,22 M asociadas en 2050.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: Country Intensity Ranking */}
      {activeSubTab === "country_ranking" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-sm font-heading font-bold text-on-surface">
              Ventas de Antibióticos Veterinarios por Unidad de Biomasa Ganadera (mg/PCU)
            </h4>
            <p className="text-xs text-on-surface-variant">
              Datos de la EMA/ESVAC para países europeos (2021-2022). EE.UU. se incluye como referencia FDA con una unidad no estrictamente comparable. Muestra la intensidad farmacológica utilizada para sostener sistemas intensivos.
            </p>
          </div>

          <div className="overflow-x-auto">
            <div
              className="w-full min-w-[520px] h-[420px] sm:min-w-0 sm:h-[450px]"
              role="img"
              aria-label="Gráfico de barras: ventas de antibióticos veterinarios por unidad de biomasa ganadera (mg/PCU) en países europeos, agrupadas por categoría de intensidad."
            >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={COUNTRY_ANTIBIOTIC_INTENSITY_DATA}
                layout="vertical"
                accessibilityLayer
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} opacity={0.9} />
                <XAxis
                  type="number"
                  stroke={CHART_AXIS}
                  fontSize={12}
                  tickFormatter={(val: number) => formatEs(val)}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="country"
                  stroke={CHART_AXIS}
                  fontSize={11}
                  tickLine={false}
                  width={100}
                />
                <Tooltip
                  wrapperStyle={{ maxWidth: "min(320px, 80vw)" }}
                  contentStyle={{ ...CHART_TOOLTIP_STYLE, whiteSpace: "normal" }}
                  formatter={(value, _name, entry) => [
                    `${formatEs(Number(value), 1)} mg/PCU — ${entry.payload.note}`,
                    `${entry.payload.flag} ${entry.payload.country}`
                  ]}
                />
                <Bar dataKey="mgPerPcu" radius={[0, 4, 4, 0]} isAnimationActive={!shouldReduceMotion}>
                  {COUNTRY_ANTIBIOTIC_INTENSITY_DATA.map((entry, index) => {
                    const color =
                      entry.category === "extreme"
                        ? "#991b1b"
                        : entry.category === "high"
                        ? CHART_SERIES.ch1
                        : entry.category === "moderate"
                        ? CHART_SERIES.ch2
                        : entry.category === "low"
                        ? CHART_SERIES.ch4
                        : CHART_SERIES.ch6;
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-on-surface-variant">
            {[
              { label: "Extremo (≥200)", color: "#991b1b" },
              { label: "Alto (100-199)", color: CHART_SERIES.ch1 },
              { label: "Moderado (50-99)", color: CHART_SERIES.ch2 },
              { label: "Bajo (25-49)", color: CHART_SERIES.ch4 },
              { label: "Mínimo (<25)", color: CHART_SERIES.ch6 }
            ].map((c) => (
              <span key={c.label} className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" aria-hidden="true" style={{ backgroundColor: c.color }} />
                {c.label} mg/PCU
              </span>
            ))}
          </div>

          <div className="p-4 bg-primary/5 dark:bg-emerald-500/5 rounded-xl border border-primary/20 dark:border-emerald-500/20 text-xs font-mono text-on-surface leading-relaxed">
            <span className="font-bold text-primary dark:text-emerald-400">💡 Lección de los Países Nórdicos:</span> Suecia (10,6 mg/PCU) y Noruega (2,1 mg/PCU) demuestran que es posible garantizar la sanidad animal reduciendo el uso de fármacos en más de un 90% si se elimina el hacinamiento y se implementan estrictas medidas de bienestar animal.
          </div>
        </div>
      )}

      {/* TAB 3: Zoonotic Timeline */}
      {activeSubTab === "zoonoses" && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-sm font-heading font-bold text-on-surface">
              Línea Temporal de Amenazas Zoonóticas Emergentes
            </h4>
            <p className="text-xs text-on-surface-variant">
              En torno al 60% de las enfermedades infecciosas emergentes tiene origen zoonótico (hasta el 75% de los patógenos emergentes, Taylor et al. 2001). Las naves industriales actúan como aceleradores de recombinación viral.
            </p>
          </div>

          {/* Timeline Pills */}
          <div className="flex flex-wrap gap-2">
            {ZOONOTIC_TIMELINE_DATA.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedZoonosisIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  selectedZoonosisIndex === idx
                    ? "bg-ch1 text-ch1-on shadow-xs"
                    : "bg-surface-dim/40 dark:bg-zinc-800/40 text-on-surface-variant hover:text-on-surface border border-outline-variant/20"
                }`}
              >
                {item.year} · {item.shortLabel}
              </button>
            ))}
          </div>

          {/* Active Zoonosis Card */}
          <div className="p-6 bg-surface-dim/30 dark:bg-zinc-800/30 rounded-2xl border border-outline-variant/20 dark:border-zinc-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/10 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-red-600 dark:text-red-400 font-bold block">
                  {selectedZoonosis.year} · Patógeno: {selectedZoonosis.pathogen}
                </span>
                <h4 className="text-lg font-heading font-bold text-on-surface">
                  {selectedZoonosis.name}
                </h4>
              </div>
              <span className="self-start sm:self-auto px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30">
                Severidad: {({ critical: "crítica", high: "alta", moderate: "moderada" } as Record<string, string>)[selectedZoonosis.severity] ?? selectedZoonosis.severity}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <div className="space-y-1">
                <span className="font-mono font-bold text-on-surface uppercase text-[11px] block">
                  Reservorio y Transmisión:
                </span>
                <p className="text-on-surface-variant leading-relaxed">
                  {selectedZoonosis.animalReservoir}
                </p>
              </div>

              <div className="space-y-1">
                <span className="font-mono font-bold text-on-surface uppercase text-[11px] block">
                  Impacto en Población Humana:
                </span>
                <p className="text-on-surface-variant leading-relaxed">
                  {selectedZoonosis.humanImpact}
                </p>
              </div>
            </div>

            <div className="p-4 bg-red-500/10 dark:bg-red-500/5 rounded-xl border border-red-500/20 text-xs font-mono space-y-1">
              <span className="font-bold text-red-600 dark:text-red-400 uppercase text-[10px] block">
                🔬 Vínculo Causal con la Ganadería Intensiva:
              </span>
              <p className="text-on-surface-variant font-sans">
                {selectedZoonosis.intensiveFarmingLink}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Scientific Evidence Modal */}
      <ScientificEvidenceModal
        sourceId={activeSubTab === "country_ranking" ? "ema-esvac-antibiotics-2023" : "van-boeckel-antibiotics-2017"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rawDataset={{
          antibioticSectors: ANTIBIOTIC_SECTORS_DATA,
          countryRanking: COUNTRY_ANTIBIOTIC_INTENSITY_DATA,
          zoonoticEvents: ZOONOTIC_TIMELINE_DATA
        }}
        datasetName="antibiotics_public_health_data"
      />
    </div>
  );
}
