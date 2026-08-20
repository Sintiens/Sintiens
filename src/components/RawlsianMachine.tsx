import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Scale,
  Sparkles,
  RotateCcw,
  ShieldAlert,
  FileText,
  Activity,
  Maximize2,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Skull,
  Clock,
  Compass,
  ExternalLink,
  BookOpen,
  Dna
} from "lucide-react";
import {
  CONSTITUTIONAL_DILEMMAS,
  SPECIMEN_PROFILES,
  drawFromVeil,
  type SpecimenProfile
} from "../data/rawlsData";

interface RawlsianMachineProps {
  onNavigateToTab?: (tab: string) => void;
}

type Phase = "constitution" | "veil_rolling" | "specimen" | "audit";

export default function RawlsianMachine({ onNavigateToTab: _onNavigateToTab }: RawlsianMachineProps) {
  // Phase management
  const [phase, setPhase] = useState<Phase>("constitution");

  // User's constitutional choices: lawId -> 'industrial' | 'welfare' | 'rights'
  const [userChoices, setUserChoices] = useState<Record<string, "industrial" | "welfare" | "rights">>({
    confinement: "industrial",
    genetics: "industrial",
    mutilations: "industrial",
    separation: "industrial",
    slaughter: "industrial",
  });

  // Current active dilemma in Phase 1
  const [activeDilemmaIndex, setActiveDilemmaIndex] = useState(0);

  // Rolled specimen result
  const [assignedSpecimen, setAssignedSpecimen] = useState<SpecimenProfile | null>(null);

  // Lifetime history of rolls
  const [rollHistory, setRollHistory] = useState<SpecimenProfile[]>([]);
  const [rollIndex, setRollIndex] = useState<number>(0);

  // Animation states for rolling phase
  const [rollingCandidate, setRollingCandidate] = useState<SpecimenProfile>(SPECIMEN_PROFILES[0]!);

  const currentDilemma = CONSTITUTIONAL_DILEMMAS[activeDilemmaIndex] || CONSTITUTIONAL_DILEMMAS[0]!;

  // Handle law selection
  const handleSelectOption = (dilemmaId: string, optionId: "industrial" | "welfare" | "rights") => {
    setUserChoices((prev) => ({
      ...prev,
      [dilemmaId]: optionId,
    }));
  };

  // Launch the Veil of Ignorance Roll
  const triggerVeilRoll = () => {
    setPhase("veil_rolling");

    const winner = drawFromVeil();
    let counter = 0;
    const totalFlips = 28;
    const intervalMs = 70;

    const interval = setInterval(() => {
      counter++;
      const randomCandidate = SPECIMEN_PROFILES[Math.floor(Math.random() * SPECIMEN_PROFILES.length)]!;
      setRollingCandidate(randomCandidate);

      if (counter >= totalFlips) {
        clearInterval(interval);
        setRollingCandidate(winner);
        setAssignedSpecimen(winner);
        setRollHistory((prev) => [winner, ...prev]);
        setRollIndex((prev) => prev + 1);
        setTimeout(() => {
          setPhase("specimen");
        }, 1100);
      }
    }, intervalMs);
  };

  // Re-roll without changing constitution
  const handleReRoll = () => {
    triggerVeilRoll();
  };

  // Calculate stats
  const stats = useMemo(() => {
    const total = rollHistory.length;
    if (total === 0) return { fish: 0, birds: 0, mammals: 0, humans: 0, humanCount: 0 };
    const fish = rollHistory.filter((s) => s.category === "pez").length;
    const birds = rollHistory.filter((s) => s.category === "ave").length;
    const mammals = rollHistory.filter((s) => s.category === "mamifero").length;
    const humans = rollHistory.filter((s) => s.category === "humano").length;
    return {
      fish,
      birds,
      mammals,
      humans,
      humanCount: humans,
      fishPct: Math.round((fish / total) * 100),
      birdsPct: Math.round((birds / total) * 100),
      mammalsPct: Math.round((mammals / total) * 100),
      humansPct: Math.round((humans / total) * 100),
    };
  }, [rollHistory]);

  // Compute moral coherence score
  const coherenceAnalysis = useMemo(() => {
    if (!assignedSpecimen) return null;

    let sufferingCount = 0;
    let protectedCount = 0;

    CONSTITUTIONAL_DILEMMAS.forEach((dil) => {
      const choice = userChoices[dil.id];
      if (assignedSpecimen.category !== "humano") {
        if (choice === "industrial") sufferingCount++;
        else if (choice === "rights") protectedCount++;
      } else {
        // If human, they enjoy full rights in almost all frameworks
        protectedCount++;
      }
    });

    const isHuman = assignedSpecimen.category === "humano";

    return {
      sufferingCount,
      protectedCount,
      isHuman,
      title: isHuman
        ? "El Privilegio de la Excepción Antropocéntrica"
        : sufferingCount >= 3
        ? "Contradicción Rawlsiana Severa"
        : protectedCount >= 3
        ? "Consistencia de Cuidado Interespecífico"
        : "Vulnerabilidad Intermedia",
      verdictText: isHuman
        ? "Has nacido en el 0.3% más privilegiado de la biomasa sintiente. Como ser humano, gozas de inmunidad jurídica ante el sacrificio y la mutilación, pero el 99.7% restante de los seres nacidos en tu planeta pagan el precio de ese sistema."
        : sufferingCount >= 3
        ? `Tus propias leyes han dictaminado tu sufrimiento. Votaste por la eficiencia económica y el confinamiento intensivo creyendo que eras el consumidor; ahora tu cuerpo experimenta las consecuencias biológicas de la constitución que redactaste.`
        : protectedCount >= 3
        ? `Bajo la constitución que diseñaste, este individuo gozaría de protección fundamental. Has demostrado que legislar bajo el Velo de Rawls exige extender el círculo moral más allá de la propia especie.`
        : `Tus leyes ofrecen ciertas atenuaciones bienestaristas, pero la privación de libertad y el fin forzado de vida permanecen inalterados para tu espécimen.`,
    };
  }, [assignedSpecimen, userChoices]);

  return (
    <div id="rawls-machine-view" className="space-y-16 w-full relative text-left">
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
            <Scale
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
              <h1 className="text-[clamp(38px,7.5vw,72px)] font-bold tracking-tight font-heading leading-[1.08] text-on-background select-none">
                El Velo de la Ignorancia
              </h1>
              <p className="max-w-2xl mx-auto pt-1 font-serif italic font-light text-on-surface-variant/70 leading-relaxed text-[14px] sm:text-[16px] md:text-[18px] text-center tracking-normal select-none">
                ¿Qué leyes de convivencia diseñarías para un planeta si no supieras en qué cuerpo, especie o condición te tocará nacer?
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                  <Scale className="w-3.5 h-3.5 text-primary" />
                  JUSTICIA RAWLSIANA
                </span>
                <span className="w-px h-4 bg-outline-variant/50 hidden sm:inline" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-primary" />
                  DEMOGRAFÍA REAL (FAO 2024)
                </span>
                <span className="w-px h-4 bg-outline-variant/50 hidden sm:inline" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                  <Dna className="w-3.5 h-3.5 text-primary" />
                  SINTIENCIA UNIVERSAL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-\[1280px\] mx-auto px-4 md:px-6 lg:px-8 space-y-12">
        {/* PROGRESS STEPPER */}
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4 font-mono text-[11px] uppercase tracking-wider text-on-surface-variant/60">
          <div className="flex items-center gap-2">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                phase === "constitution"
                  ? "bg-primary text-on-primary"
                  : "bg-primary/20 text-primary"
              }`}
            >
              1
            </span>
            <span className={phase === "constitution" ? "text-on-surface font-semibold" : ""}>
              Constitución Planetaria
            </span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-outline-variant" />
          <div className="flex items-center gap-2">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                phase === "veil_rolling"
                  ? "bg-primary text-on-primary animate-pulse"
                  : assignedSpecimen
                  ? "bg-primary/20 text-primary"
                  : "bg-surface-dim text-on-surface-variant/40"
              }`}
            >
              2
            </span>
            <span className={phase === "veil_rolling" ? "text-on-surface font-semibold" : ""}>
              La Ruleta de la Biosfera
            </span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-outline-variant" />
          <div className="flex items-center gap-2">
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                phase === "specimen" || phase === "audit"
                  ? "bg-primary text-on-primary"
                  : "bg-surface-dim text-on-surface-variant/40"
              }`}
            >
              3
            </span>
            <span className={phase === "specimen" || phase === "audit" ? "text-on-surface font-semibold" : ""}>
              Ficha de Espécimen & Veredicto
            </span>
          </div>
        </div>

        {/* ── PHASE 1: CONSTITUCIÓN PLANETARIA ── */}
        {phase === "constitution" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            {/* Introductory Card */}
            <div className="bg-surface-dim/40 border border-outline-variant/30 rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-heading font-semibold text-on-surface">
                    Paso 1: Redacta la Legislación del Mundo
                  </h2>
                  <p className="text-xs font-mono text-on-surface-variant/60">
                    Define los 5 artículos de la carta magna. Recuerda: todavía no sabes qué especie te tocará ser.
                  </p>
                </div>
              </div>
            </div>

            {/* Dilemma Selector Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-outline-variant/20 pb-3">
              {CONSTITUTIONAL_DILEMMAS.map((dilemma, idx) => {
                const choice = userChoices[dilemma.id];
                const isSelected = idx === activeDilemmaIndex;
                return (
                  <button
                    key={dilemma.id}
                    onClick={() => setActiveDilemmaIndex(idx)}
                    className={`px-3 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 cursor-pointer border ${
                      isSelected
                        ? "bg-primary text-on-primary border-primary shadow-sm"
                        : "bg-surface-dim/50 border-outline-variant/30 text-on-surface-variant hover:border-outline hover:text-on-surface"
                    }`}
                  >
                    <span>{idx + 1}. {dilemma.category}</span>
                    {choice && (
                      <span className={`w-2 h-2 rounded-full ${
                        choice === "rights" ? "bg-emerald-400" : choice === "welfare" ? "bg-amber-400" : "bg-red-400"
                      }`} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Dilemma Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDilemma.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-surface/80 dark:bg-surface-dim/50 border border-outline-variant/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-bold">
                      Artículo {activeDilemmaIndex + 1} / {CONSTITUTIONAL_DILEMMAS.length} · {currentDilemma.category}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-heading font-semibold text-on-surface">
                    {currentDilemma.title}
                  </h3>
                  <p className="text-body-md text-on-surface-variant font-sans leading-relaxed">
                    {currentDilemma.question}
                  </p>
                  <div className="bg-surface-dim/60 border-l-2 border-primary/50 p-3 rounded-r-lg text-xs font-mono text-on-surface-variant/80">
                    <span className="font-bold text-on-surface">Contexto biológico:</span> {currentDilemma.context}
                  </div>
                </div>

                {/* Options */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {currentDilemma.options.map((opt) => {
                    const isChosen = userChoices[currentDilemma.id] === opt.id;
                    const badgeColor =
                      opt.id === "rights"
                        ? "text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/30"
                        : opt.id === "welfare"
                        ? "text-amber-700 dark:text-amber-400 bg-amber-500/10 border-amber-500/30"
                        : "text-red-700 dark:text-red-400 bg-red-500/10 border-red-500/30";

                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption(currentDilemma.id, opt.id)}
                        className={`p-5 rounded-xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
                          isChosen
                            ? "bg-surface-dim/80 dark:bg-surface-dim border-primary ring-2 ring-primary/20 shadow-md"
                            : "bg-surface/50 dark:bg-surface-dim/20 border-outline-variant/30 hover:border-outline-variant/80 hover:bg-surface-dim/40"
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${badgeColor}`}>
                              {opt.id === "industrial" ? "Económica / Productiva" : opt.id === "welfare" ? "Bienestarista Moderada" : "Protección Integral"}
                            </span>
                            {isChosen && <CheckCircle2 className="w-4 h-4 text-primary" />}
                          </div>
                          <div className="font-heading font-medium text-sm sm:text-base text-on-surface">
                            {opt.label}
                          </div>
                          <p className="text-xs text-on-surface-variant font-sans leading-relaxed">
                            {opt.description}
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-outline-variant/20 text-[11px] font-mono text-on-surface-variant/70">
                          <span className="font-semibold text-on-surface block mb-1">Impacto Real:</span>
                          {opt.impactSummary}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation inside Dilemma */}
                <div className="flex items-center justify-between pt-4 border-t border-outline-variant/20">
                  <button
                    disabled={activeDilemmaIndex === 0}
                    onClick={() => setActiveDilemmaIndex((prev) => Math.max(0, prev - 1))}
                    className="px-4 py-2 text-xs font-mono uppercase text-on-surface-variant hover:text-on-surface disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Anterior
                  </button>

                  <div className="text-xs font-mono text-on-surface-variant/60">
                    {Object.keys(userChoices).length} / 5 leyes configuradas
                  </div>

                  {activeDilemmaIndex < CONSTITUTIONAL_DILEMMAS.length - 1 ? (
                    <button
                      onClick={() => setActiveDilemmaIndex((prev) => prev + 1)}
                      className="px-4 py-2 bg-primary text-on-primary rounded-xl text-xs font-mono uppercase font-bold flex items-center gap-1.5 hover:bg-primary/90 transition-colors cursor-pointer"
                    >
                      Siguiente <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={triggerVeilRoll}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-mono uppercase font-bold tracking-wider flex items-center gap-2 shadow-lg hover:shadow-emerald-600/20 transition-all cursor-pointer animate-pulse"
                    >
                      <Sparkles className="w-4 h-4" /> Atravesar el Velo de Rawls
                    </button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom summary and launch banner */}
            <div className="bg-gradient-to-r from-primary/10 via-surface-dim/40 to-primary/10 border border-primary/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="text-sm font-heading font-semibold text-on-surface flex items-center gap-2 justify-center sm:justify-start">
                  <Scale className="w-4 h-4 text-primary" />
                  ¿Listo para comprobar la justicia de tu mundo?
                </div>
                <p className="text-xs font-mono text-on-surface-variant/80">
                  Al pulsar el botón, serás encarnado al azar en uno de los seres sintientes que nacen hoy en la Tierra.
                </p>
              </div>
              <button
                onClick={triggerVeilRoll}
                className="w-full sm:w-auto px-6 py-3.5 bg-primary text-on-primary font-mono text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-primary/90 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4" />
                Nacer en este Planeta
              </button>
            </div>
          </motion.div>
        )}

        {/* ── PHASE 2: VELO ROLLING ANIMATION ── */}
        {phase === "veil_rolling" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="py-16 flex flex-col items-center justify-center text-center space-y-8"
          >
            <div className="relative w-36 h-36 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
              <div className="absolute inset-2 rounded-full border-2 border-outline-variant/30 border-b-primary/60 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
              <Scale className="w-12 h-12 text-primary animate-pulse" />
            </div>

            <div className="space-y-3 max-w-md">
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-primary font-bold block animate-pulse">
                [ SORTEO DEMOGRÁFICO CUÁNTICO ]
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-on-surface">
                Cruzando el Velo de Rawls...
              </h2>
              <p className="text-xs font-mono text-on-surface-variant/70">
                Calculando posición existencial entre los billones de seres vivos nacidos este año...
              </p>
            </div>

            {/* Rolling specimen preview card */}
            <div className="bg-surface-dim/60 border border-outline-variant/40 rounded-2xl p-6 w-full max-w-md shadow-xl backdrop-blur-md">
              <span className="text-[10px] font-mono uppercase text-on-surface-variant/60 tracking-wider block mb-1">
                Espécimen en escaneo:
              </span>
              <div className="text-lg font-heading font-semibold text-primary truncate">
                {rollingCandidate.commonName}
              </div>
              <div className="text-xs font-mono italic text-on-surface-variant/60">
                {rollingCandidate.scientificName}
              </div>
              <div className="mt-3 text-[11px] font-mono text-on-surface-variant">
                Probabilidad demográfica real: <span className="font-bold text-on-surface">{rollingCandidate.demographicWeight}%</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── PHASE 3 & 4: SPECIMEN CARD & AUDIT ── */}
        {(phase === "specimen" || phase === "audit") && assignedSpecimen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {/* Top banner: Roll Result Summary */}
            <div className={`border rounded-2xl p-6 sm:p-8 relative overflow-hidden ${
              assignedSpecimen.category === "humano"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-100"
                : "bg-surface-dim/40 border-outline-variant/30"
            }`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-md bg-primary text-on-primary font-bold tracking-wider">
                      Vida Nº {rollIndex} asignada
                    </span>
                    <span className="text-[10px] font-mono uppercase text-on-surface-variant/70 tracking-wider">
                      Probabilidad: {assignedSpecimen.demographicWeight}%
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-heading font-bold text-on-surface">
                    Has nacido como: <span className="text-primary">{assignedSpecimen.commonName}</span>
                  </h2>
                  <p className="text-xs sm:text-sm font-mono italic text-on-surface-variant/80">
                    {assignedSpecimen.scientificName} · {assignedSpecimen.annualCountDescription}
                  </p>
                </div>

                {/* Re-roll quick actions */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleReRoll}
                    className="px-4 py-2.5 bg-primary text-on-primary rounded-xl text-xs font-mono uppercase font-bold tracking-wider hover:bg-primary/90 transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <RotateCcw className="w-4 h-4" /> Volver a nacer
                  </button>
                  <button
                    onClick={() => setPhase("constitution")}
                    className="px-4 py-2.5 bg-surface-dim border border-outline-variant/30 text-on-surface rounded-xl text-xs font-mono uppercase font-bold tracking-wider hover:border-outline transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Scale className="w-4 h-4" /> Modificar leyes
                  </button>
                </div>
              </div>
            </div>

            {/* Specimen Technical Dossier */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Biological Specimen Data */}
              <div className="lg:col-span-7 space-y-6">
                <div className="bg-surface/80 dark:bg-surface-dim/40 border border-outline-variant/30 rounded-2xl p-6 sm:p-8 space-y-6">
                  <h3 className="text-base font-mono uppercase tracking-widest text-primary font-bold flex items-center gap-2 border-b border-outline-variant/20 pb-3">
                    <Dna className="w-4 h-4" />
                    Ficha Biológica de la Existencia
                  </h3>

                  {/* Lifespan Metric */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-on-surface-variant flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-primary" /> Esperanza de Vida Real vs Natural:
                      </span>
                      <span className="font-bold text-red-600 dark:text-red-400">
                        -{assignedSpecimen.lifespanLossPercentage}% de vida cercenada
                      </span>
                    </div>

                    <div className="w-full h-3 bg-surface-dim rounded-full overflow-hidden flex">
                      <div
                        className="bg-primary h-full transition-all duration-1000"
                        style={{ width: `${Math.max(3, 100 - assignedSpecimen.lifespanLossPercentage)}%` }}
                        title="Vida real vivida"
                      />
                      <div
                        className="bg-red-500/30 h-full transition-all duration-1000"
                        style={{ width: `${assignedSpecimen.lifespanLossPercentage}%` }}
                        title="Vida perdida por sacrificio"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-1">
                      <div className="bg-surface-dim/60 p-3 rounded-xl border border-outline-variant/20">
                        <span className="text-[10px] text-on-surface-variant/60 uppercase block">Vida en libertad:</span>
                        <span className="font-bold text-on-surface text-sm">{assignedSpecimen.naturalLifespan}</span>
                      </div>
                      <div className="bg-surface-dim/60 p-3 rounded-xl border border-outline-variant/20">
                        <span className="text-[10px] text-on-surface-variant/60 uppercase block">Vida en explotación:</span>
                        <span className="font-bold text-red-600 dark:text-red-400 text-sm">{assignedSpecimen.actualLifespan}</span>
                      </div>
                    </div>
                  </div>

                  {/* Assigned Physical Space */}
                  <div className="space-y-2 border-t border-outline-variant/20 pt-4">
                    <div className="text-xs font-mono text-on-surface-variant flex items-center gap-1.5">
                      <Maximize2 className="w-4 h-4 text-primary" /> Espacio Físico Asignado:
                    </div>
                    <div className="p-3 bg-surface-dim/60 rounded-xl border border-outline-variant/20 text-xs font-mono text-on-surface">
                      <span className="font-bold block mb-1">{assignedSpecimen.spaceAssigned}</span>
                      <span className="text-on-surface-variant/80">{assignedSpecimen.spaceAssignedMetric}</span>
                    </div>
                  </div>

                  {/* Sensory & Behavioral Environment */}
                  <div className="space-y-2 border-t border-outline-variant/20 pt-4">
                    <div className="text-xs font-mono text-on-surface-variant flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-primary" /> Entorno Sensorial y Psicológico:
                    </div>
                    <p className="text-xs font-sans text-on-surface-variant leading-relaxed bg-surface-dim/30 p-3 rounded-xl">
                      {assignedSpecimen.sensoryEnvironment}
                    </p>
                  </div>

                  {/* Interventions suffered */}
                  <div className="space-y-2 border-t border-outline-variant/20 pt-4">
                    <div className="text-xs font-mono text-on-surface-variant flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-primary" /> Intervenciones y Procedimientos Rutinarios:
                    </div>
                    <ul className="space-y-1.5 text-xs font-mono text-on-surface-variant/90">
                      {assignedSpecimen.standardInterventions.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary font-bold">›</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* End of Life */}
                  <div className="space-y-2 border-t border-outline-variant/20 pt-4">
                    <div className="text-xs font-mono text-on-surface-variant flex items-center gap-1.5">
                      <Skull className="w-4 h-4 text-red-500" /> Método de Sacrificio y Fin de Vida:
                    </div>
                    <p className="text-xs font-mono text-on-surface bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                      {assignedSpecimen.endOfLife}
                    </p>
                  </div>
                </div>

                {/* References Box */}
                {assignedSpecimen.references && assignedSpecimen.references.length > 0 && (
                  <div className="bg-surface-dim/30 border border-outline-variant/20 rounded-2xl p-5 space-y-3">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/70 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" /> Evidencia Científica y Fuentes
                    </div>
                    <div className="space-y-2 text-[11px] font-mono text-on-surface-variant">
                      {assignedSpecimen.references.map((ref) => (
                        <div key={ref.id} className="flex items-start justify-between gap-3">
                          <span>{ref.citation}</span>
                          {ref.url && (
                            <a
                              href={ref.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline flex items-center gap-1 shrink-0"
                            >
                              DOI <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: The Legal Mirror (Constitutional Feedback) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Moral Coherence Box */}
                {coherenceAnalysis && (
                  <div className="bg-surface/80 dark:bg-surface-dim/60 border border-outline-variant/30 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Scale className="w-5 h-5 text-primary" />
                      <h4 className="text-sm font-mono uppercase tracking-widest font-bold text-on-surface">
                        Auditoría Rawlsiana
                      </h4>
                    </div>

                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl space-y-2">
                      <div className="text-base font-heading font-semibold text-on-surface">
                        {coherenceAnalysis.title}
                      </div>
                      <p className="text-xs font-sans text-on-surface-variant leading-relaxed">
                        {coherenceAnalysis.verdictText}
                      </p>
                    </div>

                    {/* How each user law affects this specimen */}
                    <div className="space-y-3 pt-2">
                      <span className="text-[11px] font-mono uppercase text-on-surface-variant/70 tracking-wider block">
                        Tus leyes aplicadas a tu cuerpo:
                      </span>

                      {CONSTITUTIONAL_DILEMMAS.map((dilemma) => {
                        const userChoice = userChoices[dilemma.id];
                        const isProtected = userChoice === "rights";
                        const isWelfare = userChoice === "welfare";

                        let badgeColor = "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
                        let statusLabel = "Sufrimiento permitido";

                        if (assignedSpecimen.category === "humano") {
                          badgeColor = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
                          statusLabel = "Inviolable";
                        } else if (isProtected) {
                          badgeColor = "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
                          statusLabel = "Protegido";
                        } else if (isWelfare) {
                          badgeColor = "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
                          statusLabel = "Regulado";
                        }

                        return (
                          <div
                            key={dilemma.id}
                            className="p-3.5 bg-surface-dim/40 rounded-xl border border-outline-variant/20 space-y-1.5 text-xs font-mono"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-on-surface">{dilemma.title}</span>
                              <span className={`px-2 py-0.5 rounded text-[9px] uppercase border ${badgeColor}`}>
                                {statusLabel}
                              </span>
                            </div>
                            <p className="text-[11px] text-on-surface-variant/80 font-sans">
                              {userChoice === "industrial"
                                ? "Votaste opción industrial: se permite la subordinación total de tu bienestar."
                                : userChoice === "welfare"
                                ? "Votaste bienestarismo: mitigación parcial de daños con confinamiento mantenido."
                                : "Votaste protección de derechos: tu individuo habría gozado de inmunidad."}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Session Demographic Statistics */}
                <div className="bg-surface-dim/30 border border-outline-variant/20 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="uppercase text-on-surface-variant font-bold flex items-center gap-2">
                      <Compass className="w-4 h-4 text-primary" /> Estadísticas de tu Sesión
                    </span>
                    <span className="text-on-surface-variant/60">{rollHistory.length} vidas experimentadas</span>
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between items-center text-on-surface-variant">
                      <span>Peces de piscifactoría / mar:</span>
                      <span className="font-bold text-on-surface">{stats.fish} ({stats.fishPct}%)</span>
                    </div>
                    <div className="flex justify-between items-center text-on-surface-variant">
                      <span>Aves (Broílers / Ponedoras):</span>
                      <span className="font-bold text-on-surface">{stats.birds} ({stats.birdsPct}%)</span>
                    </div>
                    <div className="flex justify-between items-center text-on-surface-variant">
                      <span>Mamíferos (Cerdos / Vacas):</span>
                      <span className="font-bold text-on-surface">{stats.mammals} ({stats.mammalsPct}%)</span>
                    </div>
                    <div className="flex justify-between items-center text-primary font-bold border-t border-outline-variant/20 pt-2">
                      <span>Ser Humano (0.3% teórico):</span>
                      <span>{stats.humans} ({stats.humansPct}%)</span>
                    </div>
                  </div>

                  {stats.humanCount === 0 && (
                    <div className="p-3 bg-primary/10 rounded-xl border border-primary/20 text-[11px] font-mono text-on-surface-variant">
                      💡 Estadísticamente, necesitas nacer aproximadamente <span className="font-bold text-primary">330 veces</span> antes de tener la probabilidad de encarnar a un ser humano.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
