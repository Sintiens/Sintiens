import { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  Brain,
  Activity,
  Heart,
  ExternalLink,
  BookOpen,
  Scale,
  Microscope,
  Dna,
  Zap,
  CheckCircle2,
  Award
} from "lucide-react";
import {
  SPECIES_BRAIN_PROFILES,
  DECLARATIONS_DATA,
  NEUROBIOLOGY_REFERENCES,
  SpeciesBrainProfile,
  FunctionalLayerId
} from "../data/neurobiologyData";

interface NeurobiologyViewerProps {
  onNavigateToTab?: (tab: string) => void;
}

export default function NeurobiologyViewer({ onNavigateToTab: _onNavigateToTab }: NeurobiologyViewerProps) {
  const [selectedSpeciesId, setSelectedSpeciesId] = useState<SpeciesBrainProfile["id"]>("mammal");
  const [activeLayer, setActiveLayer] = useState<FunctionalLayerId | "all">("all");
  const [selectedStructureId, setSelectedStructureId] = useState<string | null>(null);
  const [activeExperimentIndex, setActiveExperimentIndex] = useState<number>(0);

  const selectedSpecies = useMemo(() => {
    return SPECIES_BRAIN_PROFILES.find((s) => s.id === selectedSpeciesId) || SPECIES_BRAIN_PROFILES[0]!;
  }, [selectedSpeciesId]);

  const activeStructure = useMemo(() => {
    if (!selectedStructureId) return selectedSpecies.structures[0]!;
    return selectedSpecies.structures.find((s) => s.id === selectedStructureId) || selectedSpecies.structures[0]!;
  }, [selectedStructureId, selectedSpecies]);

  return (
    <div id="neurobiology-viewer-view" className="space-y-16 w-full relative text-left">
      {/* SECTION 0: Hero & Hook */}
      <div
        id="hero"
        className="-mt-12 lg:-mt-20 flex flex-col items-center relative bg-transparent w-full"
        style={{
          width: "calc(100vw - var(--scrollbar-width, 0px))",
          marginLeft: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
          marginRight: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
        }}
      >
        <div className="w-full flex flex-col lg:justify-center items-center text-center relative h-[550px] min-h-[550px] lg:h-[600px] lg:min-h-[600px] pt-16 lg:pt-28 pb-20 lg:pb-24 px-4 md:px-6 lg:px-8 border-b border-outline-variant/15">
          <div className="absolute inset-0 pointer-events-none select-none z-0">
            <div className="absolute top-[25px] left-[20px] w-6 h-6 flex items-center justify-center">
              <div className="absolute w-4 h-[2px] bg-primary/30" /><div className="absolute w-[2px] h-4 bg-primary/30" />
            </div>
            <div className="absolute top-[25px] right-[20px] w-6 h-6 flex items-center justify-center">
              <div className="absolute w-4 h-[2px] bg-primary/30" /><div className="absolute w-[2px] h-4 bg-primary/30" />
            </div>
            <div className="absolute bottom-[25px] left-[20px] w-6 h-6 flex items-center justify-center">
              <div className="absolute w-4 h-[2px] bg-primary/30" /><div className="absolute w-[2px] h-4 bg-primary/30" />
            </div>
            <div className="absolute bottom-[25px] right-[20px] w-6 h-6 flex items-center justify-center">
              <div className="absolute w-4 h-[2px] bg-primary/30" /><div className="absolute w-[2px] h-4 bg-primary/30" />
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
            <Brain
              className="text-zinc-900 dark:text-zinc-100 blur"
              style={{
                width: "clamp(144px, 45vw, 540px)",
                height: "clamp(144px, 45vw, 540px)",
                opacity: 0.1,
                strokeWidth: 1.2,
              }}
            />
          </div>

          <div className="flex-1 lg:flex-none flex flex-col justify-center items-center w-full">
            <div className="space-y-2 lg:space-y-4 max-w-3xl w-full text-center relative z-10 mt-12 lg:mt-20">
              <h1 className="text-[clamp(36px,7vw,68px)] font-bold tracking-tight font-heading leading-[1.08] text-on-background select-none">
                Bases de la Consciencia
              </h1>
              <p className="max-w-2xl mx-auto pt-1 font-serif italic font-light text-on-surface-variant/70 leading-relaxed text-[14px] sm:text-[16px] md:text-[18px] text-center tracking-normal select-none">
                Correlatos anatómicos, neuroquímica y evidencia empírica de la sintiencia animal a través de distintos linajes evolutivos.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                  <Brain className="w-3.5 h-3.5 text-primary" />
                  HOMOLOGÍA NEURAL
                </span>
                <span className="w-px h-4 bg-outline-variant/50 hidden sm:inline" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-primary" />
                  CAMBRIDGE 2012 · NY 2024
                </span>
                <span className="w-px h-4 bg-outline-variant/50 hidden sm:inline" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-primary" />
                  NOCICEPCIÓN DEMOSTRADA
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-\[1280px\] mx-auto px-4 md:px-6 lg:px-8 space-y-12">
        
        {/* SPECIES TABS */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-widest text-primary font-bold flex items-center gap-2">
            <Microscope className="w-4 h-4" /> 1. Selecciona el Organismo a Examinar:
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SPECIES_BRAIN_PROFILES.map((spec) => {
              const isSelected = spec.id === selectedSpeciesId;

              return (
                <button
                  key={spec.id}
                  onClick={() => {
                    setSelectedSpeciesId(spec.id);
                    setSelectedStructureId(null);
                    setActiveExperimentIndex(0);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-surface-dim/90 dark:bg-surface-dim border-primary ring-2 ring-primary/20 shadow-md"
                      : "bg-surface/50 dark:bg-surface-dim/20 border-outline-variant/30 hover:border-outline hover:bg-surface-dim/40"
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-primary font-bold">
                        {spec.evolutionaryLineage.split(" ")[0]}
                      </span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-primary" />}
                    </div>
                    <div className="font-heading font-bold text-sm sm:text-base text-on-surface">
                      {spec.commonName}
                    </div>
                    <div className="text-[10px] font-mono italic text-on-surface-variant/70">
                      {spec.scientificName}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* FUNCTIONAL LAYER CONTROLLER */}
        <div className="bg-surface/80 dark:bg-surface-dim/50 border border-outline-variant/30 rounded-2xl p-5 sm:p-6 space-y-4 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-outline-variant/20 pb-3">
            <div className="text-xs font-mono uppercase tracking-wider text-on-surface font-bold flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              2. Capa Neurofuncional Iluminada:
            </div>
            <div className="text-[11px] font-mono text-on-surface-variant/70">
              {selectedSpecies.forebrainStructureName}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs font-mono">
            <button
              onClick={() => setActiveLayer("all")}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                activeLayer === "all"
                  ? "bg-primary text-on-primary font-bold border-primary shadow-sm"
                  : "bg-surface-dim/40 border-outline-variant/30 text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Todas las Capas
            </button>
            <button
              onClick={() => setActiveLayer("nociception")}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeLayer === "nociception"
                  ? "bg-red-600 text-white font-bold border-red-600 shadow-sm"
                  : "bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300 hover:bg-red-500/20"
              }`}
            >
              <Activity className="w-3.5 h-3.5" /> Nocicepción & Dolor
            </button>
            <button
              onClick={() => setActiveLayer("limbic")}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeLayer === "limbic"
                  ? "bg-purple-600 text-white font-bold border-purple-600 shadow-sm"
                  : "bg-purple-500/10 border-purple-500/30 text-purple-700 dark:text-purple-300 hover:bg-purple-500/20"
              }`}
            >
              <Heart className="w-3.5 h-3.5" /> Emoción & Afecto
            </button>
            <button
              onClick={() => setActiveLayer("cognition")}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeLayer === "cognition"
                  ? "bg-blue-600 text-white font-bold border-blue-600 shadow-sm"
                  : "bg-blue-500/10 border-blue-500/30 text-blue-700 dark:text-blue-300 hover:bg-blue-500/20"
              }`}
            >
              <Brain className="w-3.5 h-3.5" /> Cognición & Pallium
            </button>
          </div>
        </div>

        {/* INTERACTIVE ANATOMICAL BRAIN DIAGRAM & REGION DOSSIER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Vector SVG Brain Model */}
          <div className="lg:col-span-6 bg-surface/90 dark:bg-surface-dim/60 border border-outline-variant/30 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
                Esquema Anatómico Vectorial
              </span>
              <span className="text-xs font-mono text-on-surface-variant/70">
                {selectedSpecies.totalNeuronsApprox}
              </span>
            </div>

            {/* SVG Canvas */}
            <div className="relative w-full aspect-square max-w-[360px] mx-auto flex items-center justify-center py-4">
              <svg viewBox="0 0 400 320" className="w-full h-full select-none">
                {/* Brain Outline Contour Base */}
                <path
                  d="M 80,160 C 90,80 300,70 330,130 C 350,170 340,240 300,260 C 260,280 200,270 170,250 C 130,240 70,220 80,160 Z"
                  fill="currentColor"
                  className="text-surface-dim/80 dark:text-surface-dim/40 stroke-outline-variant/30"
                  strokeWidth="1.5"
                />

                {/* Render Structures */}
                {selectedSpecies.structures.map((struct) => {
                  const isLayerActive = activeLayer === "all" || activeLayer === struct.category;
                  const isSelected = activeStructure.id === struct.id;

                  let fillColor = "rgba(100, 116, 139, 0.2)";
                  let strokeColor = "rgba(100, 116, 139, 0.4)";

                  if (isLayerActive) {
                    if (struct.category === "nociception") {
                      fillColor = isSelected ? "rgba(239, 68, 68, 0.7)" : "rgba(239, 68, 68, 0.4)";
                      strokeColor = "#ef4444";
                    } else if (struct.category === "limbic") {
                      fillColor = isSelected ? "rgba(168, 85, 247, 0.7)" : "rgba(168, 85, 247, 0.4)";
                      strokeColor = "#a855f7";
                    } else {
                      fillColor = isSelected ? "rgba(59, 130, 246, 0.7)" : "rgba(59, 130, 246, 0.4)";
                      strokeColor = "#3b82f6";
                    }
                  }

                  return (
                    <g key={struct.id} className="cursor-pointer" onClick={() => setSelectedStructureId(struct.id)}>
                      <motion.path
                        d={struct.svgPath}
                        fill={fillColor}
                        stroke={strokeColor}
                        strokeWidth={isSelected ? 2.5 : 1.5}
                        initial={false}
                        animate={{ fill: fillColor, stroke: strokeColor }}
                        transition={{ duration: 0.3 }}
                        className="hover:opacity-90 transition-opacity"
                      />
                      {/* Structure Label Pin */}
                      <circle
                        cx={struct.centerCoord.x}
                        cy={struct.centerCoord.y}
                        r={isSelected ? 5 : 3.5}
                        fill={strokeColor}
                        className="animate-pulse"
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Brain Selector Interactive Pills */}
            <div className="space-y-2 pt-2 border-t border-outline-variant/20">
              <span className="text-[10px] font-mono uppercase text-on-surface-variant/60 tracking-wider block">
                Haz clic en una región para analizarla:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedSpecies.structures.map((s) => {
                  const isSelected = activeStructure.id === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedStructureId(s.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
                        isSelected
                          ? "bg-primary text-on-primary border-primary font-bold shadow-sm"
                          : "bg-surface-dim/60 border-outline-variant/30 text-on-surface-variant hover:border-outline hover:text-on-surface"
                      }`}
                    >
                      {s.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Structure Technical Dossier */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-surface/80 dark:bg-surface-dim/60 border border-outline-variant/30 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
              <div className="space-y-1 border-b border-outline-variant/20 pb-4">
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded border font-bold ${
                    activeStructure.category === "nociception"
                      ? "text-red-700 dark:text-red-300 bg-red-500/10 border-red-500/30"
                      : activeStructure.category === "limbic"
                      ? "text-purple-700 dark:text-purple-300 bg-purple-500/10 border-purple-500/30"
                      : "text-blue-700 dark:text-blue-300 bg-blue-500/10 border-blue-500/30"
                  }`}>
                    {activeStructure.category === "nociception" ? "Vía del Dolor / Nocicepción" : activeStructure.category === "limbic" ? "Emoción & Vínculo Afectivo" : "Integración Consciente"}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-on-surface">
                  {activeStructure.name}
                </h3>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-on-surface-variant font-bold block">
                  Función Biológica:
                </span>
                <p className="text-xs sm:text-sm font-sans text-on-surface-variant leading-relaxed">
                  {activeStructure.description}
                </p>
              </div>

              {/* Neurochemical Basis */}
              <div className="p-3.5 bg-surface-dim/60 rounded-xl border border-outline-variant/20 space-y-1 text-xs font-mono">
                <span className="text-primary font-bold flex items-center gap-1.5">
                  <Dna className="w-3.5 h-3.5" /> Base Neuroquímica y Receptores:
                </span>
                <p className="text-on-surface-variant/90 font-sans text-[11px]">
                  {activeStructure.neurochemicalBasis}
                </p>
              </div>

              {/* Cross-Species Homology */}
              <div className="p-3.5 bg-surface-dim/60 rounded-xl border border-outline-variant/20 space-y-1 text-xs font-mono">
                <span className="text-primary font-bold flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5" /> Homología Evolutiva:
                </span>
                <p className="text-on-surface-variant/90 font-sans text-[11px]">
                  {activeStructure.homologyNote}
                </p>
              </div>
            </div>

            {/* Key Empirical Experiments Card */}
            {selectedSpecies.keyExperiments.length > 0 && (
              <div className="bg-surface-dim/40 border border-outline-variant/30 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold flex items-center gap-1.5">
                    <Microscope className="w-3.5 h-3.5" /> Experimento Empírico Demostrado
                  </span>
                  {selectedSpecies.keyExperiments.length > 1 && (
                    <div className="flex gap-1">
                      {selectedSpecies.keyExperiments.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveExperimentIndex(idx)}
                          className={`w-5 h-5 rounded-full text-[10px] font-mono font-bold transition-all cursor-pointer ${
                            activeExperimentIndex === idx
                              ? "bg-primary text-on-primary"
                              : "bg-surface-dim text-on-surface-variant/60 hover:text-on-surface"
                          }`}
                        >
                          {idx + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {(() => {
                  const exp = selectedSpecies.keyExperiments[activeExperimentIndex];
                  if (!exp) return null;
                  return (
                    <div className="space-y-3 text-xs">
                      <div>
                        <h4 className="font-heading font-bold text-sm text-on-surface">
                          {exp.title}
                        </h4>
                        <span className="font-mono text-[10px] text-on-surface-variant/60 block">
                          {exp.leadResearcherAndYear}
                        </span>
                      </div>

                      <div className="space-y-1.5 font-sans text-on-surface-variant text-[11px] leading-relaxed">
                        <p><span className="font-bold text-on-surface">Metodología:</span> {exp.methodology}</p>
                        <p><span className="font-bold text-on-surface">Hallazgo:</span> {exp.finding}</p>
                        <p><span className="font-bold text-primary">Implicación:</span> {exp.implication}</p>
                      </div>

                      {exp.doiUrl && (
                        <a
                          href={exp.doiUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:underline font-mono text-[10px] font-bold pt-1"
                        >
                          Leer estudio original <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>

        {/* INTERNATIONAL CONSENSUS DECLARATIONS */}
        <div className="bg-gradient-to-r from-primary/10 via-surface-dim/40 to-primary/10 border border-primary/20 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/20 text-primary rounded-xl">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold block">
                TRATADOS NEUROCIENTÍFICOS GLOBALES
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-on-surface">
                Consenso Académico Internacional sobre la Consciencia
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DECLARATIONS_DATA.map((decl) => (
              <div
                key={decl.id}
                className="bg-surface/80 dark:bg-surface-dim/80 border border-outline-variant/30 rounded-xl p-5 space-y-3 shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase font-bold text-primary">
                      {decl.institution}
                    </span>
                    <span className="text-[10px] font-mono text-on-surface-variant/60">
                      {decl.year}
                    </span>
                  </div>
                  <h4 className="font-heading font-bold text-base text-on-surface">
                    {decl.title}
                  </h4>
                  <p className="text-xs font-serif italic text-on-surface-variant/90 leading-relaxed border-l-2 border-primary/40 pl-3">
                    {decl.verbatimQuote}
                  </p>
                </div>

                <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between text-[10px] font-mono text-on-surface-variant/70">
                  <span className="truncate max-w-[240px]">Firmado por neurocientíficos líderes</span>
                  {decl.doiUrl && (
                    <a
                      href={decl.doiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-bold flex items-center gap-1 shrink-0"
                    >
                      Documento <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SCIENTIFIC REFERENCES */}
        <div className="bg-surface-dim/30 border border-outline-variant/20 rounded-2xl p-6 space-y-4">
          <div className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/70 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" /> Referencias Bibliográficas en Neurociencia y Etología
          </div>
          <div className="space-y-2 text-[11px] font-mono text-on-surface-variant">
            {NEUROBIOLOGY_REFERENCES.map((ref) => (
              <div key={ref.id} className="flex items-start justify-between gap-3 border-b border-outline-variant/10 pb-2 last:border-0 last:pb-0">
                <span>{ref.citation}</span>
                {ref.url && (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1 shrink-0 font-bold"
                  >
                    DOI <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
