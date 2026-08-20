import { useState } from "react";
import { motion } from "motion/react";
import { BookOpen, Feather } from "lucide-react";
import {
  MAMMAL_BIOMASS_GROUPS
} from "../../data/cifras/ecologicalData";
import ScientificEvidenceModal from "./ScientificEvidenceModal";

export default function MammalBiomassVisualizer() {
  const [selectedGroupId, setSelectedGroupId] = useState<string>("livestock");
  const [eraView, setEraView] = useState<"modern" | "prehistoric">("modern");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeGroup = MAMMAL_BIOMASS_GROUPS.find((g) => g.id === selectedGroupId) || MAMMAL_BIOMASS_GROUPS[0]!;

  // 100-cell waffle grid representation
  const modernCells = Array.from({ length: 100 }, (_, idx) => {
    if (idx < 62) return { type: "livestock", color: "#ef4444", label: "Ganado" };
    if (idx < 96) return { type: "humans", color: "#3b82f6", label: "Humanos" };
    return { type: "wild_mammals", color: "#10b981", label: "Mamíferos Silvestres" };
  });

  const prehistoricCells = Array.from({ length: 100 }, (_, idx) => {
    if (idx < 99) return { type: "wild_mammals", color: "#10b981", label: "Mamíferos Silvestres" };
    return { type: "humans", color: "#3b82f6", label: "Humanos / Homínidos" };
  });

  const currentCells = eraView === "modern" ? modernCells : prehistoricCells;

  return (
    <div className="w-full bg-surface dark:bg-zinc-900/60 rounded-2xl border border-outline-variant/30 dark:border-zinc-800 p-6 sm:p-8 space-y-8 text-left relative overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/20 dark:border-zinc-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-primary dark:text-emerald-400 uppercase bg-primary/10 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-primary/20">
              ECOLOGÍA GLOBAL · EXHIBIT III
            </span>
            <span className="text-xs font-mono text-on-surface-variant/50 hidden sm:inline">
              [ BAR-ON ET AL. / PNAS 2018 ]
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-on-surface dark:text-zinc-100">
            Distribución de la Biomasa de Mamíferos en la Tierra
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant/80 max-w-2xl font-light">
            El censo biométrico global revela la colonización casi total de la biosfera: el ganado y los humanos acaparan el 96% del peso de todos los mamíferos del planeta.
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

      {/* Controls & Era Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1 p-1 bg-surface-dim/40 dark:bg-zinc-950/60 rounded-xl border border-outline-variant/20 dark:border-zinc-800 text-xs font-mono">
          <button
            onClick={() => setEraView("modern")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              eraView === "modern"
                ? "bg-primary text-white dark:bg-emerald-600 font-bold shadow-sm"
                : "text-on-surface-variant/70 hover:text-on-surface"
            }`}
          >
            Actualidad (Antropoceno)
          </button>
          <button
            onClick={() => setEraView("prehistoric")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              eraView === "prehistoric"
                ? "bg-primary text-white dark:bg-emerald-600 font-bold shadow-sm"
                : "text-on-surface-variant/70 hover:text-on-surface"
            }`}
          >
            Hace 100.000 años (Pre-Civilización)
          </button>
        </div>

        {/* Group Selector Cards */}
        <div className="flex flex-wrap items-center gap-2">
          {MAMMAL_BIOMASS_GROUPS.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedGroupId(g.id)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-2 transition-all ${
                selectedGroupId === g.id
                  ? "bg-surface dark:bg-zinc-800 text-on-surface font-bold border-outline-variant/50 shadow-sm"
                  : "bg-surface-dim/30 dark:bg-zinc-950/40 text-on-surface-variant border-outline-variant/15 hover:bg-surface-dim"
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: g.color }} />
              {g.label} ({g.percent}%)
            </button>
          ))}
        </div>
      </div>

      {/* Main Visual Dual Stage: 100-cell Waffle Grid (Left) + Detail & Avian Comparison (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: 100-Cell Waffle Grid */}
        <div className="lg:col-span-6 rounded-2xl bg-surface-dim/20 dark:bg-zinc-950/40 border border-outline-variant/20 dark:border-zinc-800 p-6 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-between text-xs font-mono border-b border-outline-variant/15 pb-3">
            <span className="font-bold text-on-surface dark:text-zinc-200">
              {eraView === "modern" ? "Matriz de Biomasa Planetaria (1 celda = 1%)" : "Matriz Pre-Antropoceno (1 celda = 1%)"}
            </span>
            <span className="text-on-surface-variant/60">Total: 100 Celdas</span>
          </div>

          {/* 10x10 Waffle Grid */}
          <div className="w-full max-w-sm mx-auto grid grid-cols-10 gap-1.5 p-3 rounded-2xl bg-surface dark:bg-zinc-900 border border-outline-variant/20 dark:border-zinc-800 shadow-inner">
            {currentCells.map((cell, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: idx * 0.003, duration: 0.2 }}
                className="aspect-square rounded-sm transition-transform hover:scale-125 cursor-pointer"
                style={{ backgroundColor: cell.color }}
                title={`${idx + 1}%: ${cell.label}`}
              />
            ))}
          </div>

          {/* Grid Legend Bar */}
          <div className="grid grid-cols-3 gap-2 text-[11px] font-mono border-t border-outline-variant/15 pt-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-red-500 shrink-0" />
              <span>Ganado: {eraView === "modern" ? "62%" : "0%"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 shrink-0" />
              <span>Humanos: {eraView === "modern" ? "34%" : "<1%"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 shrink-0" />
              <span>Salvajes: {eraView === "modern" ? "4%" : ">99%"}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Selected Group Breakdown & Avian Parallel */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          {/* Active Group Details */}
          <div className="p-5 rounded-2xl bg-surface-dim/40 dark:bg-zinc-950/60 border border-outline-variant/20 dark:border-zinc-800 space-y-3">
            <div className="flex items-center justify-between border-b border-outline-variant/15 pb-2">
              <h4 className="text-base sm:text-lg font-heading font-bold text-on-surface dark:text-zinc-100 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: activeGroup.color }} />
                {activeGroup.label}
              </h4>
              <span className="text-xl font-mono font-bold" style={{ color: activeGroup.color }}>
                {activeGroup.percent}% del Total
              </span>
            </div>

            <p className="text-xs sm:text-sm text-on-surface-variant/80 font-light leading-relaxed">
              {activeGroup.description}
            </p>

            {activeGroup.subGroups && (
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono text-on-surface-variant/60 uppercase tracking-wider block font-bold">
                  Desglose por grupos de especies:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeGroup.subGroups.map((sub, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-surface-dim/30 dark:bg-zinc-900/60 border border-outline-variant/10 text-xs font-mono"
                    >
                      <div className="flex justify-between font-bold text-on-surface dark:text-zinc-200">
                        <span>{sub.name}</span>
                        <span>{sub.percent}%</span>
                      </div>
                      <p className="text-[10px] text-on-surface-variant/60 font-sans mt-0.5">{sub.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Avian Parallel Card (70% poultry vs 30% wild) */}
          <div className="p-4 rounded-2xl bg-surface-dim/30 dark:bg-zinc-950/40 border border-outline-variant/20 dark:border-zinc-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-on-surface dark:text-zinc-200 flex items-center gap-1.5">
                <Feather className="w-4 h-4 text-amber-500" />
                La Misma Pauta en las Aves del Mundo:
              </span>
              <span className="text-[10px] font-mono text-on-surface-variant/60">Biomasa Aviar</span>
            </div>

            {/* Two-part bar */}
            <div className="w-full h-3 rounded-full overflow-hidden flex">
              <div className="h-full bg-amber-500" style={{ width: "70%" }} title="Aves de corral: 70%" />
              <div className="h-full bg-emerald-500" style={{ width: "30%" }} title="Aves silvestres: 30%" />
            </div>

            <div className="flex justify-between text-[11px] font-mono">
              <span className="text-amber-600 dark:text-amber-400 font-bold">70% Aves de Granja (Pollos/Pavos)</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">30% Todas las Aves Salvajes</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scientific Evidence Modal */}
      <ScientificEvidenceModal
        sourceId="bar-on-biomass-2018"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rawDataset={MAMMAL_BIOMASS_GROUPS}
        datasetName="Censo Global de Biomasa (Bar-On et al., PNAS)"
      />
    </div>
  );
}
