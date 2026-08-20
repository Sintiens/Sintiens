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
import { BookOpen, Pill, Skull, AlertTriangle, Globe2 } from "lucide-react";
import {
  ANTIBIOTIC_SECTORS_DATA,
  COUNTRY_ANTIBIOTIC_INTENSITY_DATA,
  ZOONOTIC_TIMELINE_DATA,
  type ZoonoticRiskEvent
} from "../../data/cifras/publicHealthData";
import ScientificEvidenceModal from "./ScientificEvidenceModal";

export default function AntibioticsPublicHealthVisualizer() {
  const [activeSubTab, setActiveSubTab] = useState<"sectors" | "country_ranking" | "zoonoses">("sectors");
  const [selectedZoonosisIndex, setSelectedZoonosisIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedZoonosis: ZoonoticRiskEvent = ZOONOTIC_TIMELINE_DATA[selectedZoonosisIndex] || ZOONOTIC_TIMELINE_DATA[0]!;

  return (
    <div className="w-full bg-surface dark:bg-zinc-900/60 rounded-2xl border border-outline-variant/30 dark:border-zinc-800 p-6 sm:p-8 space-y-8 text-left relative overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/20 dark:border-zinc-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-primary dark:text-emerald-400 uppercase bg-primary/10 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-primary/20">
              SALUD PÚBLICA Y BIOSEGURIDAD GLOBAL · EXHIBIT VI
            </span>
            <span className="text-xs font-mono text-on-surface-variant/60">
              Science (2017) & EMA ESVAC (2023)
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
      <div className="flex items-center gap-2 border-b border-outline-variant/20 dark:border-zinc-800 pb-2">
        <button
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
              <Skull className="w-4 h-4 text-red-500" /> Proyecciones de Mortalidad Humana por Superbacterias (Informe O'Neill)
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-surface dark:bg-zinc-900 rounded-xl border border-outline-variant/20 space-y-1">
                <span className="text-[10px] font-mono uppercase text-on-surface-variant block">
                  Año 2019 (Actual)
                </span>
                <span className="text-2xl font-mono font-bold text-on-surface">
                  1,27 Millones
                </span>
                <p className="text-[10px] text-on-surface-variant/80 font-sans">
                  Muertes directas por infecciones resistentes (The Lancet 2022)
                </p>
              </div>

              <div className="p-4 bg-surface dark:bg-zinc-900 rounded-xl border border-outline-variant/20 space-y-1">
                <span className="text-[10px] font-mono uppercase text-on-surface-variant block">
                  Año 2030 (Escenario Inercial)
                </span>
                <span className="text-2xl font-mono font-bold text-amber-600 dark:text-amber-400">
                  3,50 Millones
                </span>
                <p className="text-[10px] text-on-surface-variant/80 font-sans">
                  Pérdida paulatina de eficacia en cirugías y quimioterapia
                </p>
              </div>

              <div className="p-4 bg-surface dark:bg-zinc-900 rounded-xl border border-red-500/30 bg-red-500/5 space-y-1">
                <span className="text-[10px] font-mono uppercase text-red-600 dark:text-red-400 font-bold block">
                  Año 2050 (Era Post-Antibiótica)
                </span>
                <span className="text-2xl font-mono font-bold text-red-600 dark:text-red-400">
                  10,00 Millones
                </span>
                <p className="text-[10px] text-on-surface-variant/80 font-sans">
                  Superando a todas las muertes por cáncer combinadas
                </p>
              </div>
            </div>
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
              Datos oficiales de la Agencia Europea de Medicamentos (EMA / ESVAC). Muestra la intensidad farmacológica utilizada para sostener sistemas intensivos.
            </p>
          </div>

          <div className="w-full h-[450px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={COUNTRY_ANTIBIOTIC_INTENSITY_DATA}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 100, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis
                  type="number"
                  stroke="#888888"
                  fontSize={12}
                  tickFormatter={(val) => `${val} mg`}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="country"
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
                  formatter={(value: any, _: any, entry: any) => [
                    `${value} mg/PCU (${entry.payload.note})`,
                    `${entry.payload.flag} ${entry.payload.country}`
                  ]}
                />
                <Bar dataKey="mgPerPcu" radius={[0, 4, 4, 0]}>
                  {COUNTRY_ANTIBIOTIC_INTENSITY_DATA.map((entry, index) => {
                    const color =
                      entry.category === "extreme"
                        ? "#991b1b"
                        : entry.category === "high"
                        ? "#ef4444"
                        : entry.category === "moderate"
                        ? "#f59e0b"
                        : entry.category === "low"
                        ? "#3b82f6"
                        : "#10b981";
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 bg-primary/5 dark:bg-emerald-500/5 rounded-xl border border-primary/20 dark:border-emerald-500/20 text-xs font-mono text-on-surface leading-relaxed">
            <span className="font-bold text-primary dark:text-emerald-400">💡 Lección de los Países Nórdicos:</span> Suecia (11,2 mg/PCU) y Noruega (3,1 mg/PCU) demuestran que es posible garantizar la sanidad animal reduciendo el uso de fármacos en más de un 90% si se elimina el hacinamiento y se implementan estrictas medidas de bienestar animal.
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
              El 75% de las nuevas enfermedades infecciosas humanas provienen de animales. Las naves industriales actúan como aceleradores de recombinación viral.
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
                    ? "bg-red-600 text-white shadow-xs"
                    : "bg-surface-dim/40 dark:bg-zinc-800/40 text-on-surface-variant hover:text-on-surface border border-outline-variant/20"
                }`}
              >
                {item.year}: {item.name.split(" ")[0]}
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
                Severidad: {selectedZoonosis.severity}
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
        sourceId="van-boeckel-antibiotics-2017"
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
