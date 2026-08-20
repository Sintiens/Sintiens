import { useState, useEffect, useMemo, memo } from "react";
import { 
  Plus, 
  Minus, 
  Droplet, 
  Trees, 
  Flame, 
  Calculator,
  ArrowRight,
  Users,
  X,
  Target,
  Sparkles,
  BookOpen,
  Heart,
  Calendar,
  Layers,
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FOOD_IMPACTS, 
  FOOD_LABELS, 
  DIET_PROFILES, 
  PROFILE_LABELS, 
  TIME_HORIZONS,
  FoodCategory, 
  DietProfile
} from "../data/foodImpactData";

const POPULATION_STEPS = [
  { value: 1, label: "Tú solo" },
  { value: 4, label: "Hogar (4)" },
  { value: 10, label: "Amigos (10)" },
  { value: 1000, label: "Pueblo (1.000)" },
  { value: 100000, label: "Ciudad (100k)" },
  { value: 48000000, label: "España (48M)" },
  { value: 8000000000, label: "Mundo (8.000M)" }
];

const formatNumber = (num: number) => {
  if (num >= 1e12) return (num / 1e12).toFixed(1) + " Billones";
  if (num >= 1e9) return (num / 1e9).toFixed(1) + " Mil Millones";
  if (num >= 1e6) return (num / 1e6).toFixed(1) + " Millones";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + " mil";
  return num.toLocaleString(undefined, { maximumFractionDigits: 1 });
};

export default memo(function ImpactCalculator() {
  const [calcMode, setCalcMode] = useState<"explore" | "challenge">("explore");
  const [profile, setProfile] = useState<DietProfile>("omnivore");
  const [customMeals, setCustomMeals] = useState<Record<FoodCategory, number>>(DIET_PROFILES.omnivore);
  const [scaleIndex, setScaleIndex] = useState(0);
  const [horizonId, setHorizonId] = useState<string>("1year");
  const [showInfo, setShowInfo] = useState(false);
  const [challengeTarget, setChallengeTarget] = useState<number>(50); // 50% reduction target

  const populationScale = POPULATION_STEPS[scaleIndex]!.value;
  const currentHorizon = TIME_HORIZONS.find((h) => h.id === horizonId) || TIME_HORIZONS[1]!;

  // Close info modal with Escape
  useEffect(() => {
    if (!showInfo) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowInfo(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showInfo]);

  // Sync profile to custom meals when profile changes
  useEffect(() => {
    if (profile !== "custom") {
      setCustomMeals(DIET_PROFILES[profile]);
    }
  }, [profile]);

  const handleCustomMealChange = (cat: FoodCategory, delta: number) => {
    setProfile("custom");
    setCustomMeals((prev) => ({
      ...prev,
      [cat]: Math.max(0, prev[cat] + delta)
    }));
  };

  // Challenge Mode Logic: Replace high-impact items with plant-based
  const challengeResult = useMemo(() => {
    if (calcMode !== "challenge") return null;

    let currentMeals = { ...customMeals };
    const originalCo2 = Object.entries(customMeals).reduce(
      (sum, [k, v]) => sum + FOOD_IMPACTS[k as FoodCategory].co2 * v,
      0
    );
    const targetCo2 = originalCo2 * (1 - challengeTarget / 100);
    let runningCo2 = originalCo2;

    const changes: { from: FoodCategory; to: FoodCategory; count: number }[] = [];
    const reductionPriority: FoodCategory[] = ["beef", "pork", "poultry", "fish"];
    const substitute: FoodCategory = "plantBased";

    for (const cat of reductionPriority) {
      while (currentMeals[cat] > 0 && runningCo2 > targetCo2) {
        runningCo2 -= FOOD_IMPACTS[cat].co2;
        runningCo2 += FOOD_IMPACTS[substitute].co2;
        currentMeals[cat]--;
        currentMeals[substitute]++;

        const existing = changes.find((c) => c.from === cat);
        if (existing) {
          existing.count++;
        } else {
          changes.push({ from: cat, to: substitute, count: 1 });
        }
      }
    }

    const achievedReduction = originalCo2 > 0 ? ((originalCo2 - runningCo2) / originalCo2) * 100 : 0;

    return {
      suggestedMeals: currentMeals,
      changes,
      achievedReduction,
      targetReached: runningCo2 <= targetCo2
    };
  }, [customMeals, challengeTarget, calcMode]);

  const activeMeals = calcMode === "challenge" && challengeResult ? challengeResult.suggestedMeals : customMeals;

  // Compute Total Multiplied Impacts
  const impacts = useMemo(() => {
    let weeklyWater = 0;
    let weeklyCo2 = 0;
    let weeklyLand = 0;
    let weeklyGrain = 0;
    let weeklyAnimals = 0;
    let weeklyPoultry = 0;
    let weeklyPork = 0;
    let weeklyBeef = 0;
    let weeklyFish = 0;

    Object.entries(activeMeals).forEach(([key, meals]) => {
      const cat = key as FoodCategory;
      const count = Number(meals);
      weeklyWater += FOOD_IMPACTS[cat].water * count;
      weeklyCo2 += FOOD_IMPACTS[cat].co2 * count;
      weeklyLand += FOOD_IMPACTS[cat].land * count;
      weeklyGrain += FOOD_IMPACTS[cat].grain * count;
      weeklyAnimals += FOOD_IMPACTS[cat].animals * count;

      if (cat === "poultry") weeklyPoultry += FOOD_IMPACTS[cat].animals * count;
      if (cat === "pork") weeklyPork += FOOD_IMPACTS[cat].animals * count;
      if (cat === "beef") weeklyBeef += FOOD_IMPACTS[cat].animals * count;
      if (cat === "fish") weeklyFish += FOOD_IMPACTS[cat].animals * count;
    });

    const multiplier = currentHorizon.multiplierWeeks * populationScale;

    return {
      water: weeklyWater * multiplier,
      co2: weeklyCo2 * multiplier,
      land: weeklyLand * multiplier,
      grain: weeklyGrain * multiplier,
      animals: Math.round(weeklyAnimals * multiplier * 10) / 10,
      breakdown: {
        poultry: Math.round(weeklyPoultry * multiplier * 10) / 10,
        pork: Math.round(weeklyPork * multiplier * 10) / 10,
        beef: Math.round(weeklyBeef * multiplier * 100) / 100,
        fish: Math.round(weeklyFish * multiplier * 10) / 10,
      }
    };
  }, [activeMeals, currentHorizon, populationScale]);

  // Baseline standard comparison (Omnivore benchmark)
  const baselineImpacts = useMemo(() => {
    let weeklyWater = 0;
    let weeklyCo2 = 0;
    let weeklyLand = 0;
    let weeklyGrain = 0;
    let weeklyAnimals = 0;

    Object.entries(DIET_PROFILES.omnivore).forEach(([key, meals]) => {
      const cat = key as FoodCategory;
      const count = Number(meals);
      weeklyWater += FOOD_IMPACTS[cat].water * count;
      weeklyCo2 += FOOD_IMPACTS[cat].co2 * count;
      weeklyLand += FOOD_IMPACTS[cat].land * count;
      weeklyGrain += FOOD_IMPACTS[cat].grain * count;
      weeklyAnimals += FOOD_IMPACTS[cat].animals * count;
    });

    const multiplier = currentHorizon.multiplierWeeks * populationScale;
    return {
      water: weeklyWater * multiplier,
      co2: weeklyCo2 * multiplier,
      land: weeklyLand * multiplier,
      grain: weeklyGrain * multiplier,
      animals: Math.round(weeklyAnimals * multiplier * 10) / 10,
    };
  }, [currentHorizon, populationScale]);

  // Savings against baseline
  const savings = {
    water: Math.max(0, baselineImpacts.water - impacts.water),
    co2: Math.max(0, baselineImpacts.co2 - impacts.co2),
    land: Math.max(0, baselineImpacts.land - impacts.land),
    animals: Math.max(0, Math.round((baselineImpacts.animals - impacts.animals) * 10) / 10),
  };

  const olympicPools = impacts.water / 2500000;
  const carKm = impacts.co2 / 0.12;
  const soccerFields = impacts.land / 7140;
  const peopleFedMonth = impacts.grain / 15; // 15 kg grain per person/month

  return (
    <div id="impact-calculator-view" className="space-y-16 w-full relative text-left">
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
        <div className="w-full flex flex-col lg:justify-center items-center text-center relative h-[550px] min-h-[550px] lg:h-[600px] lg:min-h-[600px] pt-16 lg:pt-28 pb-20 lg:pb-24 px-6 lg:px-16 border-b border-outline-variant/20">
          <motion.div  className="absolute inset-0 pointer-events-none select-none z-0">
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
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
            <Calculator
              className="text-zinc-900 dark:text-zinc-100 blur"
              style={{
                width: "clamp(144px, 45vw, 540px)",
                height: "clamp(144px, 45vw, 540px)",
                opacity: 0.08,
                strokeWidth: 1.2,
              }}
            />
          </div>

          <div className="flex-1 lg:flex-none flex flex-col justify-center items-center w-full">
            <div className="space-y-2 lg:space-y-4 max-w-3xl w-full text-center relative z-10 mt-12 lg:mt-20">
              <h1 className="text-[clamp(36px,7vw,68px)] font-bold tracking-tight font-heading leading-[1.08] text-on-background select-none">
                Calculadora de Impacto
              </h1>
              <p className="max-w-2xl mx-auto pt-1 font-serif italic font-light text-on-surface-variant/70 leading-relaxed text-[14px] sm:text-[16px] md:text-[18px] text-center tracking-normal select-none">
                Calcula la huella acumulada de recursos naturales y vidas de animales sintientes según las decisiones dietéticas en el tiempo.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5 text-primary" />
                  VIDAS DE ANIMALES
                </span>
                <span className="w-px h-4 bg-outline-variant/50 hidden sm:inline" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                  <Droplet className="w-3.5 h-3.5 text-primary" />
                  AGUA VIRTUAL
                </span>
                <span className="w-px h-4 bg-outline-variant/50 hidden sm:inline" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                  <Flame className="w-3.5 h-3.5 text-primary" />
                  CO₂ & METANO
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* MODE SELECTOR & RIGOR LINK */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-outline-variant/20 pb-4">
          <div className="flex gap-2">
            <button
              onClick={() => setCalcMode("explore")}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer border flex items-center gap-2 ${
                calcMode === "explore"
                  ? "bg-primary text-on-primary font-bold border-primary shadow-sm"
                  : "bg-surface-dim/40 border-outline-variant/30 text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <Calculator className="w-3.5 h-3.5" /> Explorador de Huella
            </button>
            <button
              onClick={() => setCalcMode("challenge")}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer border flex items-center gap-2 ${
                calcMode === "challenge"
                  ? "bg-primary text-on-primary font-bold border-primary shadow-sm"
                  : "bg-surface-dim/40 border-outline-variant/30 text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <Target className="w-3.5 h-3.5" /> Simulador de Reducción
            </button>
          </div>

          <button
            onClick={() => setShowInfo(true)}
            className="flex items-center gap-1.5 text-xs font-mono text-primary hover:underline cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" /> Metodología Científica (Science 2018)
          </button>
        </div>

        {/* CONTROLS CARD */}
        <div className="bg-surface/80 dark:bg-surface-dim/60 border border-outline-variant/30 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          
          {/* Top Parameters: Time Horizon & Population */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-outline-variant/20 pb-6">
            
            {/* Horizon Selector */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-on-surface-variant/70 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                <Calendar className="w-3.5 h-3.5 text-primary" /> 1. Horizonte Temporal de Análisis:
              </span>
              <div className="flex flex-wrap gap-2">
                {TIME_HORIZONS.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => setHorizonId(h.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
                      horizonId === h.id
                        ? "bg-primary text-on-primary font-bold border-primary shadow-sm"
                        : "bg-surface-dim/40 border-outline-variant/30 text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    {h.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Population Scale Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-on-surface-variant/70 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                  <Users className="w-3.5 h-3.5 text-primary" /> 2. Escala de Población:
                </span>
                <span className="text-primary font-bold">
                  {POPULATION_STEPS[scaleIndex]!.label}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max={POPULATION_STEPS.length - 1}
                value={scaleIndex}
                onChange={(e) => setScaleIndex(Number(e.target.value))}
                className="w-full accent-primary h-2 bg-surface-dim rounded-full appearance-none cursor-pointer border border-outline-variant/20"
              />
              <div className="flex justify-between text-[9px] font-mono text-on-surface-variant/50 pt-0.5">
                <span>1 persona</span>
                <span>España</span>
                <span>8.000M (Planeta)</span>
              </div>
            </div>

          </div>

          {/* Diet Settings / Challenge Setter */}
          {calcMode === "explore" ? (
            <div className="space-y-5">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-on-surface-variant/70 uppercase tracking-widest font-bold block">
                  3. Perfil Dietético Base:
                </span>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(PROFILE_LABELS) as DietProfile[]).filter((k) => k !== "custom").map((k) => (
                    <button
                      key={k}
                      onClick={() => setProfile(k)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer border ${
                        profile === k
                          ? "bg-primary text-on-primary font-bold border-primary shadow-sm"
                          : "bg-surface-dim/40 border-outline-variant/30 text-on-surface-variant hover:text-on-surface"
                      }`}
                    >
                      {PROFILE_LABELS[k]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Fine-Tuning Meals Grid */}
              <div className="space-y-2 pt-2">
                <span className="text-[10px] font-mono text-on-surface-variant/50 uppercase tracking-widest block">
                  Ajuste fino semanal (14 comidas principales a la semana):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {(Object.keys(FOOD_LABELS) as FoodCategory[]).map((cat) => (
                    <div
                      key={cat}
                      className="flex items-center justify-between p-3 bg-surface-dim/40 rounded-xl border border-outline-variant/20 text-xs font-mono"
                    >
                      <span className="text-on-surface font-sans text-xs">{FOOD_LABELS[cat]}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCustomMealChange(cat, -1)}
                          className="w-6 h-6 rounded-md bg-surface-dim hover:bg-primary/20 text-on-surface-variant hover:text-primary flex items-center justify-center cursor-pointer transition-all"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-4 text-center font-bold text-on-surface">
                          {customMeals[cat]}
                        </span>
                        <button
                          onClick={() => handleCustomMealChange(cat, 1)}
                          className="w-6 h-6 rounded-md bg-surface-dim hover:bg-primary/20 text-on-surface-variant hover:text-primary flex items-center justify-center cursor-pointer transition-all"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Challenge Mode Controls */
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-on-surface-variant font-bold">
                    Objetivo de Reducción de Huella:
                  </span>
                  <span className="text-primary font-bold text-sm">-{challengeTarget}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="10"
                  value={challengeTarget}
                  onChange={(e) => setChallengeTarget(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-surface-dim rounded-full appearance-none cursor-pointer border border-outline-variant/20"
                />
              </div>

              {challengeResult && challengeResult.changes.length > 0 && (
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl space-y-2 text-xs font-mono">
                  <span className="text-primary font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Plan Óptimo de Sustitución Semanal:
                  </span>
                  <ul className="space-y-1 text-on-surface-variant font-sans">
                    {challengeResult.changes.map((c, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <ArrowRight className="w-3 h-3 text-primary shrink-0" />
                        Sustituir <strong>{c.count} comidas</strong> de {FOOD_LABELS[c.from]} por {FOOD_LABELS[c.to]}.
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

        </div>

        {/* 5 MAIN IMPACT METRICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* Card 1: Animal Lives */}
          <div className="p-5 rounded-2xl bg-surface/90 dark:bg-surface-dim/70 border border-red-500/30 space-y-3 shadow-sm flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase tracking-widest text-red-700 dark:text-red-400 font-bold">
                  SINTIENCIA
                </span>
                <Heart className="w-4 h-4 text-red-500" />
              </div>
              <div className="text-2xl font-heading font-bold text-on-surface">
                {formatNumber(impacts.animals)}
              </div>
              <span className="text-xs font-mono text-on-surface-variant block">
                Vidas de Animales
              </span>
            </div>
            <div className="text-[10px] font-sans text-on-surface-variant/80 border-t border-outline-variant/15 pt-2">
              {impacts.breakdown.poultry > 0 && <div>• {formatNumber(impacts.breakdown.poultry)} pollos</div>}
              {impacts.breakdown.fish > 0 && <div>• {formatNumber(impacts.breakdown.fish)} peces</div>}
              {impacts.breakdown.pork > 0 && <div>• {formatNumber(impacts.breakdown.pork)} cerdos</div>}
              {impacts.breakdown.beef > 0 && <div>• {formatNumber(impacts.breakdown.beef)} vacas</div>}
            </div>
          </div>

          {/* Card 2: Water */}
          <div className="p-5 rounded-2xl bg-surface/90 dark:bg-surface-dim/70 border border-blue-500/30 space-y-3 shadow-sm flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase tracking-widest text-blue-700 dark:text-blue-400 font-bold">
                  AGUA DULCE
                </span>
                <Droplet className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl font-heading font-bold text-on-surface">
                {formatNumber(impacts.water)}
              </div>
              <span className="text-xs font-mono text-on-surface-variant block">
                Litros de Agua
              </span>
            </div>
            <div className="text-[10px] font-sans text-on-surface-variant/80 border-t border-outline-variant/15 pt-2">
              Equivale a <strong className="text-on-surface font-mono">{formatNumber(olympicPools)}</strong> piscinas olímpicas.
            </div>
          </div>

          {/* Card 3: GHG Emissions */}
          <div className="p-5 rounded-2xl bg-surface/90 dark:bg-surface-dim/70 border border-amber-500/30 space-y-3 shadow-sm flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold">
                  EMISIONES
                </span>
                <Flame className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-heading font-bold text-on-surface">
                {formatNumber(impacts.co2)}
              </div>
              <span className="text-xs font-mono text-on-surface-variant block">
                kg CO₂ eq.
              </span>
            </div>
            <div className="text-[10px] font-sans text-on-surface-variant/80 border-t border-outline-variant/15 pt-2">
              Equivale a <strong className="text-on-surface font-mono">{formatNumber(carKm)}</strong> km conducidos en coche.
            </div>
          </div>

          {/* Card 4: Land Use */}
          <div className="p-5 rounded-2xl bg-surface/90 dark:bg-surface-dim/70 border border-emerald-500/30 space-y-3 shadow-sm flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-bold">
                  TERRITORIO
                </span>
                <Trees className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-heading font-bold text-on-surface">
                {formatNumber(impacts.land)}
              </div>
              <span className="text-xs font-mono text-on-surface-variant block">
                m² de Tierra
              </span>
            </div>
            <div className="text-[10px] font-sans text-on-surface-variant/80 border-t border-outline-variant/15 pt-2">
              Equivale a <strong className="text-on-surface font-mono">{formatNumber(soccerFields)}</strong> campos de fútbol.
            </div>
          </div>

          {/* Card 5: Feed Grain Dissipation */}
          <div className="p-5 rounded-2xl bg-surface/90 dark:bg-surface-dim/70 border border-purple-500/30 space-y-3 shadow-sm flex flex-col justify-between">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono uppercase tracking-widest text-purple-700 dark:text-purple-400 font-bold">
                  FORRAJE
                </span>
                <Layers className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-2xl font-heading font-bold text-on-surface">
                {formatNumber(impacts.grain)}
              </div>
              <span className="text-xs font-mono text-on-surface-variant block">
                kg Cereal / Pienso
              </span>
            </div>
            <div className="text-[10px] font-sans text-on-surface-variant/80 border-t border-outline-variant/15 pt-2">
              Alimentaría a <strong className="text-on-surface font-mono">{formatNumber(peopleFedMonth)}</strong> personas un mes.
            </div>
          </div>

        </div>

        {/* SAVINGS COMPARED TO OMNIVORE BANNER */}
        {profile === "vegan" || (calcMode === "challenge" && challengeResult && challengeResult.achievedReduction > 0) ? (
          <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Ahorro Planetario y Ético Acumulado Frente a la Dieta Estándar:
            </span>
            <p className="text-xs sm:text-sm font-sans text-on-surface leading-relaxed">
              En este periodo ({currentHorizon.label.toLowerCase()}), se salvan <strong className="text-emerald-700 dark:text-emerald-400 font-mono">{formatNumber(savings.animals)} vidas animales</strong>, se evitan <strong className="text-emerald-700 dark:text-emerald-400 font-mono">{formatNumber(savings.co2)} kg de CO₂</strong> y se liberan <strong className="text-emerald-700 dark:text-emerald-400 font-mono">{formatNumber(savings.land)} m²</strong> de suelo para la regeneración de ecosistemas.
            </p>
          </div>
        ) : null}

        {/* METHODOLOGY MODAL */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
              onClick={() => setShowInfo(false)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 10 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-surface border border-outline-variant/30 rounded-2xl p-6 sm:p-8 max-w-2xl w-full space-y-4 shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                  <h4 className="text-lg font-heading font-bold text-on-surface">
                    Metodología de Cálculo y Fuentes
                  </h4>
                  <button
                    onClick={() => setShowInfo(false)}
                    className="p-1 rounded-lg hover:bg-surface-dim text-on-surface-variant cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3 text-xs font-sans text-on-surface-variant leading-relaxed">
                  <p>
                    <strong>1. Emisiones, Agua y Suelo:</strong> Los coeficientes por ración se derivan del metaanálisis global de <em>Poore & Nemecek (Science, 2018)</em> que analizó 38.700 granjas en 119 países, combinado con los datos de huella hídrica de <em>Mekonnen & Hoekstra (2012)</em> de la Universidad de Twente.
                  </p>
                  <p>
                    <strong>2. Vidas de Animales:</strong> Calculadas a partir de los rendimientos de peso en canal promedio reportados por la FAO y la organización <em>Fishcount</em> (para peces de piscifactoría y capturas con descartes).
                  </p>
                  <p>
                    <strong>3. Porciones Estándar:</strong> Cada comida principal equivale a 150 gramos de producto proteico de plato principal (ej. pechuga de pollo, filete de lomo, ración de lentejas cocidas o tofu).
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
});
