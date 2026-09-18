import { useState } from "react";
import { motion } from "motion/react";
import { BookOpen, Check, X, ShieldAlert } from "lucide-react";
import {
  MULTI_SPECIES_CONFINEMENT_DATA,
  type SpeciesConfinementProfile,
  type ConfinementSystem
} from "../../data/cifras/confinementData";
import ScientificEvidenceModal from "./ScientificEvidenceModal";

type SpeciesTab = "hen" | "broiler_barn" | "sow" | "calf" | "salmon";

export default function MultiSpeciesConfinementVisualizer() {
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesTab>("hen");
  const [selectedSystemIndex, setSelectedSystemIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentProfile: SpeciesConfinementProfile = MULTI_SPECIES_CONFINEMENT_DATA[selectedSpecies];
  const currentSystem: ConfinementSystem = currentProfile.systems[selectedSystemIndex] || currentProfile.systems[0]!;

  const handleSpeciesChange = (sp: SpeciesTab) => {
    setSelectedSpecies(sp);
    setSelectedSystemIndex(0);
  };

  return (
    <div className="w-full bg-surface dark:bg-zinc-900/60 rounded-2xl border border-outline-variant/30 dark:border-zinc-800 p-6 sm:p-8 space-y-8 text-left relative overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/20 dark:border-zinc-800 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold tracking-widest text-primary dark:text-emerald-400 uppercase bg-primary/10 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-primary/20">
              ARQUITECTURA DEL CONFINAMIENTO · EXHIBIT IV
            </span>
            <span className="text-xs font-mono text-on-surface-variant/60">
              Estándares de la EFSA y Directivas UE
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-on-surface">
            Simulador Espacial Multiespecie y Privación Etológica
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl">
            Compara el espacio físico legal asignado a cada individuo en los sistemas intensivos frente a la superficie requerida para ejecutar sus conductas instintivas elementales.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="self-start md:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-outline-variant/30 dark:border-zinc-700 bg-surface-dim/50 hover:bg-surface-dim text-xs font-mono font-bold text-on-surface transition-all cursor-pointer shadow-sm shrink-0"
        >
          <BookOpen className="w-3.5 h-3.5 text-primary" /> Respaldo Científico
        </button>
      </div>

      {/* Species Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-outline-variant/20 dark:border-zinc-800">
        {[
          { id: "hen", label: "Gallina Ponedora", icon: "🐔" },
          { id: "broiler_barn", label: "Pollo de Engorde en Nave", icon: "🍗" },
          { id: "sow", label: "Cerda Reproductora", icon: "🐖" },
          { id: "calf", label: "Ternero Lechero", icon: "🐄" },
          { id: "salmon", label: "Salmón en Jaula Marina", icon: "🐟" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleSpeciesChange(tab.id as SpeciesTab)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
              selectedSpecies === tab.id
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-dim/40 dark:bg-zinc-800/40 text-on-surface-variant hover:text-on-surface border border-outline-variant/20"
            }`}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* Main Blueprint & Profile Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: System Blueprint Canvas (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-on-surface-variant font-bold">
              Plano Técnico a Escala: {currentSystem.name}
            </span>
            <div className="flex items-center gap-1.5">
              {currentProfile.systems.map((sys, idx) => (
                <button
                  key={sys.id}
                  onClick={() => setSelectedSystemIndex(idx)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedSystemIndex === idx
                      ? "bg-on-surface text-surface dark:bg-white dark:text-zinc-950 shadow-xs"
                      : "bg-surface-dim dark:bg-zinc-800 text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  Sistema {idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Blueprint Display */}
          <div className="bg-zinc-950 rounded-2xl border border-zinc-800 p-6 flex flex-col items-center justify-center min-h-[340px] relative overflow-hidden text-center shadow-inner">
            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: "linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)",
                backgroundSize: "20px 20px"
              }}
            />

            {/* Simulated Boundary Box */}
            <motion.div
              key={currentSystem.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative border-2 border-dashed border-red-500/80 bg-red-500/10 rounded-xl p-6 flex flex-col items-center justify-center space-y-3 z-10 max-w-[280px] w-full"
            >
              <div className="p-2 rounded-full bg-red-500/20 text-red-400">
                <ShieldAlert className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-white uppercase block">
                  {currentSystem.name}
                </span>
                <span className="text-xs font-mono text-red-400 font-bold block">
                  {currentSystem.areaCm2OrM2}
                </span>
                <span className="text-[10px] font-mono text-zinc-400 block">
                  {currentSystem.densityNote}
                </span>
              </div>
            </motion.div>

            <div className="mt-4 text-[10px] font-mono text-zinc-400 z-10">
              Estatus legal: <span className="text-zinc-300 font-bold">{currentSystem.legalStatus}</span>
            </div>
          </div>

          <div className="p-4 bg-surface-dim/40 dark:bg-zinc-800/40 rounded-xl border border-outline-variant/20 dark:border-zinc-800 text-xs text-on-surface-variant font-sans leading-relaxed">
            <span className="font-bold font-mono text-on-surface">Descripción zootécnica:</span> {currentSystem.description}
          </div>
        </div>

        {/* Right: Behavioral Checklist & Deprivations (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-on-surface-variant font-bold">
              Semáforo Etológico de Conductas
            </span>
            <span
              className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                currentSystem.welfareRating === "critical"
                  ? "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30"
                  : currentSystem.welfareRating === "poor"
                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30"
                  : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30"
              }`}
            >
              Bienestar: {currentSystem.welfareRating} ({currentSystem.welfareScore}/10)
            </span>
          </div>

          {/* Checklist */}
          <div className="space-y-2">
            {currentSystem.freedoms.map((f, idx) => (
              <div
                key={idx}
                className="p-3 bg-surface dark:bg-zinc-800/30 rounded-xl border border-outline-variant/20 dark:border-zinc-800 flex items-start gap-3"
              >
                <div
                  className={`p-1 rounded-md shrink-0 mt-0.5 ${
                    f.allowedInSystem
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-red-500/10 text-red-600 dark:text-red-400"
                  }`}
                >
                  {f.allowedInSystem ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-on-surface">
                      {f.name}
                    </span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant font-sans">
                    {f.description}
                  </p>
                  <span className="text-[10px] font-mono text-primary dark:text-emerald-400 block pt-0.5">
                    Impacto: {f.scientificImpact}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Natural Needs Box */}
          <div className="p-4 bg-primary/5 dark:bg-emerald-500/5 rounded-xl border border-primary/20 dark:border-emerald-500/20 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary dark:text-emerald-400 font-bold block">
              🌿 Necesidad Biológica Natural ({currentProfile.speciesName})
            </span>
            <div className="space-y-2 text-xs font-sans text-on-surface-variant">
              {currentProfile.naturalBehaviors.map((b, idx) => (
                <div key={idx} className="border-b border-primary/10 last:border-0 pb-1.5 last:pb-0">
                  <div className="flex justify-between font-mono font-bold text-on-surface text-[11px]">
                    <span>{b.name}</span>
                    <span className="text-primary dark:text-emerald-400">{b.spaceRequiredCm2OrM2}</span>
                  </div>
                  <p className="text-[10px] text-on-surface-variant/80 font-sans">{b.deprivationConsequence}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scientific Evidence Modal */}
      <ScientificEvidenceModal
        sourceId={currentProfile.scientificCitationId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rawDataset={{
          selectedSpecies,
          currentProfile,
          multiSpeciesData: MULTI_SPECIES_CONFINEMENT_DATA
        }}
        datasetName="confinement_space_data"
      />
    </div>
  );
}
