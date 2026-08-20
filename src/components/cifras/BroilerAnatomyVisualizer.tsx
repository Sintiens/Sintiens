import { useState, useEffect } from "react";
import {
  Dna,
  Bone,
  Activity,
  Footprints,
  Eye,
  BookOpen,
  Play,
  Pause,
  Columns
} from "lucide-react";
import {
  BROILER_EVOLUTION_DATA,
  BROILER_YEARS,
  type BroilerYearType
} from "../../data/cifras/broilerEvolutionData";
import {
  chickenPaths1957,
  chickenPaths1978,
  chickenPaths2005,
  chickenPaths2025,
  type AnatomicalPaths
} from "../../data/chickenAnatomyPaths";
import ScientificEvidenceModal from "./ScientificEvidenceModal";

type PathologyLayer = "all" | "breast" | "skeleton" | "cardio" | "pododermatitis";

export default function BroilerAnatomyVisualizer() {
  const [selectedYear, setSelectedYear] = useState<BroilerYearType>(2025);
  const [activePathology, setActivePathology] = useState<PathologyLayer>("all");
  const [isXrayMode, setIsXrayMode] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDualComparison, setIsDualComparison] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Playback timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setSelectedYear((prev) => {
        const idx = BROILER_YEARS.indexOf(prev);
        const nextIdx = (idx + 1) % BROILER_YEARS.length;
        return BROILER_YEARS[nextIdx]!;
      });
    }, 2200);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentData = BROILER_EVOLUTION_DATA[selectedYear];

  // Helper to get vector paths by year
  const getPaths = (yr: BroilerYearType): AnatomicalPaths => {
    switch (yr) {
      case 1957:
        return chickenPaths1957;
      case 1978:
        return chickenPaths1978;
      case 2005:
        return chickenPaths2005;
      case 2025:
      default:
        return chickenPaths2025;
    }
  };

  const renderChickenSvg = (year: BroilerYearType, isSmall = false) => {
    const data = BROILER_EVOLUTION_DATA[year];
    const paths = getPaths(year);
    const scaleFactor = Math.cbrt(data.weightAt56DaysG / 905); // Isometric volumetric scaling

    return (
      <div className="relative w-full h-[320px] sm:h-[380px] flex items-center justify-center overflow-hidden">
        {/* Metric Badge Overlay */}
        <div className="absolute top-3 left-3 z-10 p-2.5 bg-zinc-950/80 backdrop-blur-md rounded-xl border border-zinc-800 text-left space-y-0.5 pointer-events-none">
          <span className="text-[10px] font-mono uppercase tracking-widest text-primary dark:text-emerald-400 font-bold block">
            Cepa {year} · {data.strainName}
          </span>
          <span className="text-sm font-mono font-bold text-white">
            {data.weightAt56DaysG.toLocaleString("es-ES")} gramos
          </span>
          <span className="text-[10px] font-mono text-zinc-400 block">
            Pechuga: {data.breastYieldPercent}% peso vivo
          </span>
        </div>

        {/* SVG Drawing */}
        <svg
          viewBox="0 0 150 150"
          className="w-full h-full max-h-[360px] select-none transition-transform duration-500"
          style={{
            transform: `scale(${scaleFactor * 0.95})`
          }}
        >
          {/* Grid background in X-ray */}
          {isXrayMode && (
            <defs>
              <pattern id={`xray-grid-${year}`} width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(16, 185, 129, 0.08)" strokeWidth="0.5" />
              </pattern>
            </defs>
          )}

          {isXrayMode && (
            <rect width="150" height="150" fill={`url(#xray-grid-${year})`} />
          )}

          {/* 1. Body Silhouette */}
          <path
            d={paths.body}
            fill={isXrayMode ? "rgba(16, 185, 129, 0.08)" : "#d1d5db"}
            stroke={isXrayMode ? "#10b981" : "#9ca3af"}
            strokeWidth={isXrayMode ? "0.8" : "1.2"}
            className="transition-all duration-500"
          />

          {/* 2. Head, Comb, Wattle, Beak, Eye */}
          <path
            d={paths.head.comb}
            fill="#ef4444"
            stroke="#b91c1c"
            strokeWidth="0.5"
          />
          <path
            d={paths.head.wattle}
            fill="#ef4444"
            stroke="#b91c1c"
            strokeWidth="0.5"
          />
          <path
            d={paths.head.beak}
            fill="#f59e0b"
            stroke="#d97706"
            strokeWidth="0.5"
          />
          <circle
            cx={paths.head.eye.cx}
            cy={paths.head.eye.cy}
            r={paths.head.eye.r}
            fill="#111827"
          />

          {/* 3. Skeleton / Bones Layer (Interactive Hotspot: Skeleton) */}
          {(activePathology === "all" || activePathology === "skeleton") && (
            <g
              onClick={() => setActivePathology("skeleton")}
              className="cursor-pointer group"
            >
              <path
                d={paths.skeleton.spine}
                fill="none"
                stroke={activePathology === "skeleton" ? "#ef4444" : isXrayMode ? "#ffffff" : "#4b5563"}
                strokeWidth={activePathology === "skeleton" ? "1.8" : "1.2"}
                strokeLinecap="round"
                className="transition-all duration-300 group-hover:stroke-red-400"
              />
              <path
                d={paths.skeleton.femur}
                fill="none"
                stroke={activePathology === "skeleton" ? "#ef4444" : isXrayMode ? "#ffffff" : "#4b5563"}
                strokeWidth={activePathology === "skeleton" ? "2.0" : "1.4"}
                strokeLinecap="round"
                className="transition-all duration-300 group-hover:stroke-red-400"
              />
              <path
                d={paths.skeleton.tibia}
                fill="none"
                stroke={activePathology === "skeleton" ? "#ef4444" : isXrayMode ? "#ffffff" : "#4b5563"}
                strokeWidth={activePathology === "skeleton" ? "2.0" : "1.4"}
                strokeLinecap="round"
                className="transition-all duration-300 group-hover:stroke-red-400"
              />
              <path
                d={paths.skeleton.metatarsus}
                fill="none"
                stroke={activePathology === "skeleton" ? "#ef4444" : isXrayMode ? "#ffffff" : "#4b5563"}
                strokeWidth={activePathology === "skeleton" ? "1.6" : "1.2"}
                strokeLinecap="round"
                className="transition-all duration-300 group-hover:stroke-red-400"
              />
              <path
                d={paths.skeleton.digits}
                fill="none"
                stroke={activePathology === "skeleton" ? "#ef4444" : isXrayMode ? "#ffffff" : "#4b5563"}
                strokeWidth={activePathology === "skeleton" ? "1.4" : "1.0"}
                strokeLinecap="round"
                className="transition-all duration-300 group-hover:stroke-red-400"
              />
            </g>
          )}

          {/* 4. Breast Muscle Layer (Interactive Hotspot: Breast) */}
          {(activePathology === "all" || activePathology === "breast") && (
            <g
              onClick={() => setActivePathology("breast")}
              className="cursor-pointer group"
            >
              <path
                d={paths.breast}
                fill={
                  activePathology === "breast"
                    ? "rgba(239, 68, 68, 0.45)"
                    : isXrayMode
                    ? "rgba(239, 68, 68, 0.25)"
                    : "#f87171"
                }
                stroke="#ef4444"
                strokeWidth={activePathology === "breast" ? "1.2" : "0.8"}
                className="transition-all duration-300 group-hover:fill-red-500/50"
              />
            </g>
          )}

          {/* 5. Heart / Cardio Layer (Interactive Hotspot: Cardio) */}
          {(activePathology === "all" || activePathology === "cardio") && (
            <g
              onClick={() => setActivePathology("cardio")}
              className="cursor-pointer group"
            >
              <path
                d={paths.heart.main}
                fill="#dc2626"
                stroke="#991b1b"
                strokeWidth="0.6"
                className="transition-all duration-300 animate-pulse group-hover:scale-110"
              />
              {paths.heart.rv && (
                <path
                  d={paths.heart.rv}
                  fill="rgba(220, 38, 38, 0.6)"
                  stroke="#ef4444"
                  strokeWidth="0.6"
                />
              )}
              {paths.heart.ascites && (
                <path
                  d={paths.heart.ascites}
                  fill="rgba(59, 130, 246, 0.35)"
                  stroke="#3b82f6"
                  strokeWidth="0.6"
                />
              )}
            </g>
          )}

          {/* 6. Wing */}
          <path
            d={paths.wing}
            fill="none"
            stroke={isXrayMode ? "rgba(16, 185, 129, 0.4)" : "#9ca3af"}
            strokeWidth="0.8"
          />

          {/* 7. Pododermatitis Hotspot on Footpad */}
          {(activePathology === "all" || activePathology === "pododermatitis") && year === 2025 && (
            <g
              onClick={() => setActivePathology("pododermatitis")}
              className="cursor-pointer group"
            >
              <circle cx="62" cy="132" r="3" fill="#b91c1c" stroke="#ef4444" strokeWidth="0.8" className="animate-ping" />
              <circle cx="62" cy="132" r="3" fill="#b91c1c" stroke="#ef4444" strokeWidth="0.8" />
            </g>
          )}
        </svg>

        {/* Hotspots Quick Guide Overlay */}
        {!isSmall && (
          <div className="absolute bottom-3 right-3 text-[10px] font-mono text-zinc-400 bg-zinc-950/80 px-2 py-1 rounded-lg border border-zinc-800 pointer-events-none">
            💡 Haz clic sobre el dibujo (pechuga, huesos, corazón o patas) para enfocar patologías
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full bg-surface dark:bg-zinc-900/60 rounded-2xl border border-outline-variant/30 dark:border-zinc-800 p-6 sm:p-8 space-y-8 text-left relative overflow-hidden shadow-sm">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/20 dark:border-zinc-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-primary dark:text-emerald-400 uppercase bg-primary/10 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-primary/20">
              SELECCIÓN GENÉTICA Y ALOMETRÍA · EXHIBIT III
            </span>
            <span className="text-xs font-mono text-on-surface-variant/60">
              Zuidhof et al. 2014 & EFSA 2023
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-on-surface">
            Metamorfosis Biomecánica del Pollo de Engorde (1957—2025)
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl">
            La selección zootécnica extrema ha aumentado la masa pectoral en más de un 400% a los 56 días de vida, provocando un colapso alométrico entre el crecimiento muscular y los órganos vitales.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="self-start md:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-outline-variant/30 dark:border-zinc-700 bg-surface-dim/50 hover:bg-surface-dim text-xs font-mono font-bold text-on-surface transition-all cursor-pointer shadow-sm shrink-0"
        >
          <BookOpen className="w-3.5 h-3.5 text-primary" /> Respaldo Científico
        </button>
      </div>

      {/* Main Interactive Controls Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-surface-dim/40 dark:bg-zinc-800/40 p-4 rounded-xl border border-outline-variant/20 dark:border-zinc-800">
        {/* Timeline Year Selectors + Playback */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-mono uppercase tracking-wider text-on-surface-variant font-bold block mr-1">
            Año Genético:
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-2 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1 ${
                isPlaying
                  ? "bg-amber-600 text-white shadow-sm"
                  : "bg-primary text-on-primary shadow-sm"
              }`}
              title={isPlaying ? "Pausar evolución animada" : "Reproducir evolución automática"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isPlaying ? "Pausa" : "Play"}
            </button>
          </div>

          <div className="flex items-center gap-1">
            {BROILER_YEARS.map((yr) => (
              <button
                key={yr}
                onClick={() => {
                  setSelectedYear(yr);
                  setIsPlaying(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  selectedYear === yr && !isDualComparison
                    ? "bg-on-surface text-surface dark:bg-white dark:text-zinc-950 shadow-sm"
                    : "bg-surface dark:bg-zinc-800 text-on-surface-variant hover:text-on-surface border border-outline-variant/20"
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>

        {/* View toggles: X-ray and Dual View */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsDualComparison(!isDualComparison)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              isDualComparison
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface dark:bg-zinc-800 text-on-surface-variant hover:text-on-surface border border-outline-variant/20"
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            {isDualComparison ? "Vista Individual" : "Comparar 1957 vs 2025"}
          </button>

          <button
            onClick={() => setIsXrayMode(!isXrayMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              isXrayMode
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-surface dark:bg-zinc-800 text-on-surface-variant hover:text-on-surface border border-outline-variant/20"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            {isXrayMode ? "Modo Rayos X (Activo)" : "Modo Óptico"}
          </button>
        </div>
      </div>

      {/* Pathology Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10px] font-mono uppercase tracking-wider text-on-surface-variant font-bold mr-1">
          Capas Patológicas:
        </span>
        {[
          { id: "all", label: "Todas las Capas", icon: <Activity className="w-3 h-3" /> },
          { id: "breast", label: "Pechuga / Miopatías", icon: <Dna className="w-3 h-3" /> },
          { id: "skeleton", label: "Esqueleto / Locomoción", icon: <Bone className="w-3 h-3" /> },
          { id: "cardio", label: "Cardiopulmonar / Ascitis", icon: <Activity className="w-3 h-3" /> },
          { id: "pododermatitis", label: "Almohadillas / Llagas", icon: <Footprints className="w-3 h-3" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActivePathology(tab.id as PathologyLayer)}
            className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activePathology === tab.id
                ? "bg-red-600 text-white shadow-xs"
                : "bg-surface-dim/50 text-on-surface-variant hover:text-on-surface border border-outline-variant/20"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Anatomical Display Canvas */}
      <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-4 sm:p-6 overflow-hidden relative shadow-inner">
        {isDualComparison ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-zinc-800 rounded-xl p-2 bg-zinc-900/40">
              {renderChickenSvg(1957, true)}
            </div>
            <div className="border border-zinc-800 rounded-xl p-2 bg-zinc-900/40">
              {renderChickenSvg(2025, true)}
            </div>
          </div>
        ) : (
          renderChickenSvg(selectedYear)
        )}
      </div>

      {/* Biometric Stats Card Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-surface-dim/40 dark:bg-zinc-800/40 rounded-xl border border-outline-variant/20 dark:border-zinc-800 space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant font-bold block">
            Peso Vivo a 56 Días
          </span>
          <span className="text-xl font-mono font-bold text-on-surface">
            {currentData.weightAt56DaysG.toLocaleString("es-ES")} g
          </span>
          <span className="text-[10px] font-mono text-primary dark:text-emerald-400 block">
            +{Math.round(((currentData.weightAt56DaysG - 905) / 905) * 100)}% vs 1957
          </span>
        </div>

        <div className="p-4 bg-surface-dim/40 dark:bg-zinc-800/40 rounded-xl border border-outline-variant/20 dark:border-zinc-800 space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant font-bold block">
            Rendimiento de Pechuga
          </span>
          <span className="text-xl font-mono font-bold text-on-surface">
            {currentData.breastYieldPercent}%
          </span>
          <span className="text-[10px] font-mono text-primary dark:text-emerald-400 block">
            +{Math.round(((currentData.breastYieldPercent - 11.6) / 11.6) * 100)}% de masa muscular
          </span>
        </div>

        <div className="p-4 bg-surface-dim/40 dark:bg-zinc-800/40 rounded-xl border border-outline-variant/20 dark:border-zinc-800 space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant font-bold block">
            Ganancia Diaria
          </span>
          <span className="text-xl font-mono font-bold text-on-surface">
            {currentData.dailyGrowthRateGrams} g/día
          </span>
          <span className="text-[10px] font-mono text-primary dark:text-emerald-400 block">
            +{Math.round(((currentData.dailyGrowthRateGrams - 11.2) / 11.2) * 100)}% velocidad
          </span>
        </div>

        <div className="p-4 bg-surface-dim/40 dark:bg-zinc-800/40 rounded-xl border border-outline-variant/20 dark:border-zinc-800 space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant font-bold block">
            Índice de Conversión (FCR)
          </span>
          <span className="text-xl font-mono font-bold text-on-surface">
            {currentData.feedConversionRatio} kg/kg
          </span>
          <span className="text-[10px] font-mono text-primary dark:text-emerald-400 block">
            Pienso requerido
          </span>
        </div>
      </div>

      {/* Pathologies Diagnostic Panel */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-mono uppercase tracking-widest text-on-surface-variant font-bold">
          Ficha Diagnóstica e Histológica de la Cepa {selectedYear}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-surface-dim/30 dark:bg-zinc-800/30 rounded-xl border border-outline-variant/20 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2">
              <Dna className="w-4 h-4 text-red-500" />
              <h5 className="text-xs font-mono font-bold text-on-surface uppercase">
                {currentData.systems.breast.title}
              </h5>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {currentData.systems.breast.description}
            </p>
            <p className="text-[10px] font-mono text-zinc-400">
              Histología: {currentData.systems.breast.histologicalNote}
            </p>
          </div>

          <div className="p-4 bg-surface-dim/30 dark:bg-zinc-800/30 rounded-xl border border-outline-variant/20 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2">
              <Bone className="w-4 h-4 text-amber-500" />
              <h5 className="text-xs font-mono font-bold text-on-surface uppercase">
                {currentData.systems.skeleton.title}
              </h5>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {currentData.systems.skeleton.description}
            </p>
            <p className="text-[10px] font-mono text-zinc-400">
              Histología: {currentData.systems.skeleton.histologicalNote}
            </p>
          </div>

          <div className="p-4 bg-surface-dim/30 dark:bg-zinc-800/30 rounded-xl border border-outline-variant/20 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-500" />
              <h5 className="text-xs font-mono font-bold text-on-surface uppercase">
                {currentData.systems.cardio.title}
              </h5>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {currentData.systems.cardio.description}
            </p>
            <p className="text-[10px] font-mono text-zinc-400">
              Histología: {currentData.systems.cardio.histologicalNote}
            </p>
          </div>

          <div className="p-4 bg-surface-dim/30 dark:bg-zinc-800/30 rounded-xl border border-outline-variant/20 dark:border-zinc-800 space-y-2">
            <div className="flex items-center gap-2">
              <Footprints className="w-4 h-4 text-rose-500" />
              <h5 className="text-xs font-mono font-bold text-on-surface uppercase">
                {currentData.systems.pododermatitis.title}
              </h5>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {currentData.systems.pododermatitis.description}
            </p>
            <p className="text-[10px] font-mono text-zinc-400">
              Histología: {currentData.systems.pododermatitis.histologicalNote}
            </p>
          </div>
        </div>
      </div>

      {/* Scientific Modal */}
      <ScientificEvidenceModal
        sourceId="zuidhof-broiler-2014"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rawDataset={{
          selectedYear,
          data: currentData,
          evolutionSeries: BROILER_EVOLUTION_DATA
        }}
        datasetName="broiler_evolution_data"
      />
    </div>
  );
}
