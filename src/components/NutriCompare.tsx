import { useState, useMemo } from "react";
import { motion } from "motion/react";
import {
  Salad,
  Dna,
  ShieldAlert,
  CheckCircle2,
  ExternalLink,
  BookOpen,
  Scale,
  Award,
  Zap,
  Microscope,
  Leaf
} from "lucide-react";
import {
  NUTRIENT_PROFILES,
  OFFICIAL_HEALTH_CONSENSUS,
  NUTRITION_REFERENCES,
  NutrientProfile
} from "../data/nutritionData";

interface NutriCompareProps {
  onNavigateToTab?: (tab: string) => void;
}

export default function NutriCompare({ onNavigateToTab: _onNavigateToTab }: NutriCompareProps) {
  const [selectedNutrientId, setSelectedNutrientId] = useState<NutrientProfile["id"]>("protein");
  const [activeSubTab, setActiveSubTab] = useState<"dossier" | "b12_cycle" | "consensus">("dossier");

  const currentNutrient = useMemo(() => {
    return NUTRIENT_PROFILES.find((n) => n.id === selectedNutrientId) || NUTRIENT_PROFILES[0]!;
  }, [selectedNutrientId]);

  return (
    <div id="nutricompare-view" className="space-y-16 w-full relative text-left">
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
            <Salad
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
                Nutrición Clínica
              </h1>
              <p className="max-w-2xl mx-auto pt-1 font-serif italic font-light text-on-surface-variant/70 leading-relaxed text-[14px] sm:text-[16px] md:text-[18px] text-center tracking-normal select-none">
                Desmitificación molecular de los 5 nutrientes críticos y consensos oficiales de la Academia de Nutrición y Dietética y Harvard.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                  <Dna className="w-3.5 h-3.5 text-primary" />
                  BIODISPONIBILIDAD MOLECULAR
                </span>
                <span className="w-px h-4 bg-outline-variant/50 hidden sm:inline" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-primary" />
                  ACADEMY OF NUTRITION & DIETETICS
                </span>
                <span className="w-px h-4 bg-outline-variant/50 hidden sm:inline" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                  <Microscope className="w-3.5 h-3.5 text-primary" />
                  CERO MITOS
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-\[1280px\] mx-auto px-4 md:px-6 lg:px-8 space-y-12">
        
        {/* TOP SUB-NAVIGATION */}
        <div className="flex items-center justify-between border-b border-outline-variant/20 pb-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveSubTab("dossier")}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
                activeSubTab === "dossier"
                  ? "bg-primary text-on-primary font-bold border-primary shadow-sm"
                  : "bg-surface-dim/40 border-outline-variant/30 text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Dossier de Nutrientes Críticos
            </button>
            <button
              onClick={() => setActiveSubTab("b12_cycle")}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
                activeSubTab === "b12_cycle"
                  ? "bg-primary text-on-primary font-bold border-primary shadow-sm"
                  : "bg-surface-dim/40 border-outline-variant/30 text-on-surface-variant hover:text-on-surface"
              }`}
            >
              El Ciclo de la Vitamina B12
            </button>
            <button
              onClick={() => setActiveSubTab("consensus")}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
                activeSubTab === "consensus"
                  ? "bg-primary text-on-primary font-bold border-primary shadow-sm"
                  : "bg-surface-dim/40 border-outline-variant/30 text-on-surface-variant hover:text-on-surface"
              }`}
            >
              Consensos Médicos Oficiales
            </button>
          </div>
        </div>

        {/* ── TAB 1: DOSSIER DE NUTRIENTES CRÍTICOS ── */}
        {activeSubTab === "dossier" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Nutrient Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {NUTRIENT_PROFILES.map((nutr) => {
                const isSelected = nutr.id === selectedNutrientId;

                return (
                  <button
                    key={nutr.id}
                    onClick={() => setSelectedNutrientId(nutr.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "bg-surface-dim/90 dark:bg-surface-dim border-primary ring-2 ring-primary/20 shadow-md"
                        : "bg-surface/50 dark:bg-surface-dim/20 border-outline-variant/30 hover:border-outline hover:bg-surface-dim/40"
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-primary" />}
                      </div>
                      <div className="font-heading font-bold text-sm sm:text-base text-on-surface pt-1 leading-tight">
                        {nutr.name}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Myth vs Biochemical Reality Box */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Popular Myth vs Molecular Evidence */}
              <div className="lg:col-span-7 space-y-6">
                {/* Myth Card (Red alert style) */}
                <div className="p-5 bg-red-500/10 border border-red-500/25 rounded-2xl space-y-2 text-red-950 dark:text-red-200">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-red-700 dark:text-red-400 font-bold flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" /> Mito Popular Habitual:
                  </span>
                  <div className="font-serif italic text-sm sm:text-base font-semibold leading-relaxed">
                    {currentNutrient.popularMyth}
                  </div>
                </div>

                {/* Biochemical Reality Card */}
                <div className="bg-surface/90 dark:bg-surface-dim/60 border border-outline-variant/30 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
                  <div className="space-y-1 border-b border-outline-variant/20 pb-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
                      Evidencia Bioquímica y Cinética
                    </span>
                    <h3 className="text-xl sm:text-2xl font-heading font-bold text-on-surface">
                      {currentNutrient.name}
                    </h3>
                    <span className="text-xs font-mono text-on-surface-variant/70 italic block">
                      {currentNutrient.chemicalName}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-sans text-on-surface-variant leading-relaxed">
                    {currentNutrient.biochemicalReality}
                  </p>

                  {/* Absorption Mechanics */}
                  <div className="p-4 bg-surface-dim/60 rounded-xl border border-outline-variant/20 space-y-1.5 text-xs font-mono">
                    <span className="text-primary font-bold flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" /> Mecanismo Fisiológico de Absorción:
                    </span>
                    <p className="text-on-surface-variant/90 font-sans text-[11px] leading-relaxed">
                      {currentNutrient.absorptionMechanics}
                    </p>
                  </div>

                  {/* Recommended Daily Intake */}
                  <div className="flex items-center justify-between p-3.5 bg-primary/10 rounded-xl border border-primary/20 text-xs font-mono">
                    <span className="text-on-surface font-bold">Ingesta Diaria Recomendada (CDR):</span>
                    <span className="text-primary font-bold">{currentNutrient.recommendedDailyIntake}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Optimal Plant Sources & Health Risk Contrast */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Sources Card */}
                <div className="bg-surface/80 dark:bg-surface-dim/50 border border-outline-variant/30 rounded-2xl p-6 space-y-4 shadow-sm">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-primary font-bold flex items-center gap-1.5 border-b border-outline-variant/20 pb-3">
                    <Leaf className="w-4 h-4" /> Fuentes Vegetales Óptimas:
                  </h4>

                  <div className="space-y-3">
                    {currentNutrient.optimalPlantSources.map((src, idx) => (
                      <div key={idx} className="p-3.5 bg-surface-dim/50 rounded-xl border border-outline-variant/20 space-y-1 text-xs font-mono">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-on-surface">{src.name}</span>
                          <span className="text-primary font-bold">{src.nutrientAmount}</span>
                        </div>
                        <span className="text-[10px] text-on-surface-variant/60 block">Ración: {src.portion}</span>
                        <p className="text-[11px] text-on-surface-variant/80 font-sans pt-0.5">
                          {src.absorptionNote}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Health Risk Contrast Card */}
                <div className="bg-surface-dim/40 border border-outline-variant/30 rounded-2xl p-6 space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-on-surface font-bold flex items-center gap-1.5 border-b border-outline-variant/20 pb-3">
                    <Scale className="w-4 h-4 text-primary" /> Matriz de Riesgo / Beneficio:
                  </h4>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl space-y-1">
                      <span className="text-[10px] font-mono uppercase font-bold text-red-700 dark:text-red-400 block">
                        Riesgo de la Fuente Animal:
                      </span>
                      <p className="text-on-surface-variant font-sans text-[11px]">
                        {currentNutrient.healthRiskContrast.animalSourceRisk}
                      </p>
                    </div>

                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-1">
                      <span className="text-[10px] font-mono uppercase font-bold text-emerald-700 dark:text-emerald-400 block">
                        Beneficio de la Matriz Vegetal:
                      </span>
                      <p className="text-on-surface-variant font-sans text-[11px]">
                        {currentNutrient.healthRiskContrast.plantSourceBenefit}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── TAB 2: EL CICLO DE LA VITAMINA B12 ── */}
        {activeSubTab === "b12_cycle" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-surface/90 dark:bg-surface-dim/60 border border-outline-variant/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="space-y-1 border-b border-outline-variant/20 pb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-bold">
                  Infografía Interactiva de Bioquímica
                </span>
                <h3 className="text-2xl font-heading font-bold text-on-surface">
                  ¿De Dónde Procede Realmente la Vitamina B12?
                </h3>
                <p className="text-xs sm:text-sm font-sans text-on-surface-variant">
                  Rastreo del origen primario de la cobalamina y la suplementación oculta de la industria cárnica.
                </p>
              </div>

              {/* 4-Step Cycle Flow */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                
                {/* Step 1 */}
                <div className="bg-surface-dim/60 border border-outline-variant/30 rounded-2xl p-5 space-y-3 relative shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-mono font-bold text-xs">
                    1
                  </div>
                  <h4 className="font-heading font-bold text-sm text-on-surface">
                    Bacterias del Suelo
                  </h4>
                  <p className="text-xs font-sans text-on-surface-variant leading-relaxed">
                    Microorganismos anaerobios (*Pseudomonas*, *Propionibacterium*) presentes en tierra virgen y aguas no tratadas sintetizan la cobalamina. Ni plantas ni animales tienen genes para crearla.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="bg-surface-dim/60 border border-outline-variant/30 rounded-2xl p-5 space-y-3 relative shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-mono font-bold text-xs">
                    2
                  </div>
                  <h4 className="font-heading font-bold text-sm text-on-surface">
                    Pienso Suplementado
                  </h4>
                  <p className="text-xs font-sans text-on-surface-variant leading-relaxed">
                    El ganado industrial vive sobre hormigón y come forrajes lavados. La industria administra suplementos sintéticos de cobalto y B12 en el pienso de vacas, cerdos y aves para que no enfermen.
                  </p>
                </div>

                {/* Step 3 (Indirect Meat Consumption) */}
                <div className="bg-red-500/10 border border-red-500/25 rounded-2xl p-5 space-y-3 relative shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-700 dark:text-red-300 flex items-center justify-center font-mono font-bold text-xs">
                    3A
                  </div>
                  <h4 className="font-heading font-bold text-sm text-red-950 dark:text-red-200">
                    Vía Indirecta (Carne)
                  </h4>
                  <p className="text-xs font-sans text-on-surface-variant leading-relaxed">
                    El consumidor omnívoro ingiere la B12 que fue administrada al animal, acompañada de grasas saturadas, colesterol, residuos de antibióticos y el coste del sacrificio.
                  </p>
                </div>

                {/* Step 4 (Direct Vegan Supplement) */}
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 space-y-3 relative shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-mono font-bold text-xs">
                    3B
                  </div>
                  <h4 className="font-heading font-bold text-sm text-emerald-950 dark:text-emerald-200">
                    Vía Directa (Suplemento)
                  </h4>
                  <p className="text-xs font-sans text-on-surface-variant leading-relaxed">
                    El vegano toma directamente la B12 pura obtenida por fermentación bacteriana en laboratorio. Más limpia, más económica (~5€/año), sin intermediarios ni sufrimiento.
                  </p>
                </div>

              </div>

              {/* Protocol Prescription Box */}
              <div className="bg-primary/10 border border-primary/25 rounded-2xl p-6 space-y-3 text-xs font-mono">
                <span className="text-primary font-bold uppercase tracking-wider block">
                  Protocolo Clínico Seguro y Avalado:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-on-surface-variant">
                  <div className="p-3 bg-surface-dim/60 rounded-xl border border-outline-variant/20">
                    <span className="font-bold text-on-surface block mb-1">Opción A (Semanal - Más cómoda):</span>
                    1 comprimido masticable de 2.000 µg de Cianocobalamina una vez por semana.
                  </div>
                  <div className="p-3 bg-surface-dim/60 rounded-xl border border-outline-variant/20">
                    <span className="font-bold text-on-surface block mb-1">Opción B (Diaria):</span>
                    1 dosis de 50 a 100 µg al día (o alimentos fortificados 2-3 veces al día).
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── TAB 3: CONSENSOS MÉDICOS OFICIALES ── */}
        {activeSubTab === "consensus" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="space-y-6">
              {OFFICIAL_HEALTH_CONSENSUS.map((cons, idx) => (
                <div
                  key={idx}
                  className="bg-surface/80 dark:bg-surface-dim/80 border border-outline-variant/30 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-outline-variant/20 pb-3">
                    <div>
                      <h4 className="text-lg font-heading font-bold text-on-surface">
                        {cons.institution}
                      </h4>
                      <span className="text-xs font-mono text-on-surface-variant/70">
                        {cons.country} · {cons.year}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm font-serif italic text-on-surface-variant/90 leading-relaxed border-l-2 border-primary/50 pl-4">
                    {cons.verbatimQuote}
                  </p>

                  <div className="pt-2 flex justify-end">
                    <a
                      href={cons.doiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-primary hover:underline font-mono text-xs font-bold"
                    >
                      Ver documento oficial <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* SCIENTIFIC CITATIONS */}
        <div className="bg-surface-dim/30 border border-outline-variant/20 rounded-2xl p-6 space-y-4">
          <div className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/70 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" /> Referencias en Nutrición Clínica y Epidemiología
          </div>
          <div className="space-y-2 text-[11px] font-mono text-on-surface-variant">
            {NUTRITION_REFERENCES.map((ref) => (
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
