import { useState, useEffect, useMemo } from "react";
import { 
  Plus, 
  Minus, 
  Droplet, 
  Grid, 
  Trees, 
  Flame, 
  ChevronDown,
  Calculator,
  ArrowRight,
  TrendingDown,
  LineChart,
  Users,
  Settings2,
  Info,
  X,
  Target,
  Sparkles,
  BookOpen
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FOOD_IMPACTS, 
  FOOD_LABELS, 
  DIET_PROFILES, 
  PROFILE_LABELS, 
  FoodCategory, 
  DietProfile 
} from "../data/foodImpactData";
import { TabType } from "./TabNav";

interface ImpactCalculatorProps {
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

const POPULATION_STEPS = [
  { value: 1, label: "Tú" },
  { value: 10, label: "Familia/Amigos (10)" },
  { value: 1000, label: "Pueblo (1k)" },
  { value: 100000, label: "Ciudad (100k)" },
  { value: 47000000, label: "País (España)" },
  { value: 8000000000, label: "Mundo (8B)" }
];

const formatNumber = (num: number) => {
  if (num >= 1e12) return (num / 1e12).toFixed(1) + " Billones";
  if (num >= 1e9) return (num / 1e9).toFixed(1) + " Mil Millones";
  if (num >= 1e6) return (num / 1e6).toFixed(1) + " Millones";
  return num.toLocaleString();
};

const calculateCo2 = (meals: Record<FoodCategory, number>) => {
  return Object.entries(meals).reduce((sum, [key, count]) => sum + FOOD_IMPACTS[key as FoodCategory].co2 * count, 0);
};

export default function ImpactCalculator({ activeTab, onNavigate, theme, onToggleTheme }: ImpactCalculatorProps) {
  const [calcMode, setCalcMode] = useState<"explore" | "challenge">("explore");
  const [profile, setProfile] = useState<DietProfile>("omnivore");
  const [customMeals, setCustomMeals] = useState<Record<FoodCategory, number>>(DIET_PROFILES.omnivore);
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [scaleIndex, setScaleIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [challengeTarget, setChallengeTarget] = useState<number>(30); // % reduction target

  const populationScale = POPULATION_STEPS[scaleIndex]!.value;

  // Sync profile to custom meals when profile changes (if not custom)
  useEffect(() => {
    if (profile !== "custom") {
      setCustomMeals(DIET_PROFILES[profile]);
    }
  }, [profile]);

  const handleCustomMealChange = (cat: FoodCategory, delta: number) => {
    setProfile("custom");
    setCustomMeals(prev => ({
      ...prev,
      [cat]: Math.max(0, prev[cat] + delta)
    }));
  };

  // Algorithm for Challenge Mode
  const challengeResult = useMemo(() => {
    if (calcMode !== "challenge") return null;

    let currentMeals = { ...customMeals };
    let originalCo2 = calculateCo2(customMeals);
    let targetCo2 = originalCo2 * (1 - challengeTarget / 100);
    
    let changes: { from: FoodCategory, to: FoodCategory, count: number }[] = [];
    
    // Priority: Replace highest impact first with plantBased
    const reductionPriority: FoodCategory[] = ["beef", "pork", "poultry", "fish"];
    const substitute: FoodCategory = "plantBased";

    for (let cat of reductionPriority) {
      while (currentMeals[cat] > 0 && calculateCo2(currentMeals) > targetCo2) {
        currentMeals[cat]--;
        currentMeals[substitute]++;
        
        let existingChange = changes.find(c => c.from === cat);
        if (existingChange) {
          existingChange.count++;
        } else {
          changes.push({ from: cat, to: substitute, count: 1 });
        }
      }
    }

    const achievedCo2 = calculateCo2(currentMeals);
    const achievedReduction = originalCo2 > 0 ? ((originalCo2 - achievedCo2) / originalCo2) * 100 : 0;

    return {
      suggestedMeals: currentMeals,
      changes,
      achievedReduction,
      targetReached: achievedCo2 <= targetCo2
    };
  }, [customMeals, challengeTarget, calcMode]);

  // Use the suggested meals for impact calculation if in challenge mode
  const activeMeals = calcMode === "challenge" && challengeResult ? challengeResult.suggestedMeals : customMeals;

  // Calculate Impacts
  const impacts = useMemo(() => {
    let weeklyWater = 0;
    let weeklyCo2 = 0;
    let weeklyLand = 0;
    let weeklyGrain = 0;

    Object.entries(activeMeals).forEach(([key, meals]) => {
      const cat = key as FoodCategory;
      const amount = Number(meals);
      weeklyWater += FOOD_IMPACTS[cat].water * amount;
      weeklyCo2 += FOOD_IMPACTS[cat].co2 * amount;
      weeklyLand += FOOD_IMPACTS[cat].land * amount;
      weeklyGrain += FOOD_IMPACTS[cat].grain * amount;
    });

    const yearlyWater = Math.round(weeklyWater * 52 * populationScale);
    const yearlyCo2 = Math.round(weeklyCo2 * 52 * populationScale * 10) / 10;
    const yearlyLand = Math.round(weeklyLand * 52 * populationScale);
    const yearlyGrain = Math.round(weeklyGrain * 52 * populationScale * 10) / 10;

    return { yearlyWater, yearlyCo2, yearlyLand, yearlyGrain };
  }, [activeMeals, populationScale]);

  const olympicPools = impacts.yearlyWater / 2500000;
  const carKm = impacts.yearlyCo2 / 0.12;
  const soccerFields = impacts.yearlyLand / 7140;
  const peopleFed = impacts.yearlyGrain / 150;

  return (
    <div id="impact-calculator-view" className="space-y-10 w-full relative">
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
          <motion.div layoutId="global-crosshairs" className="absolute inset-0 pointer-events-none select-none z-0">
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
            <span className="font-serif font-bold leading-none text-zinc-900 dark:text-zinc-100 blur" style={{ fontSize: "clamp(160px, 50vw, 600px)", opacity: 0.08, transform: "translateY(0%)" }}>%</span>
          </div>

          <div className="flex-1 lg:flex-none flex flex-col justify-center items-center w-full">
            <div className="space-y-2 lg:space-y-4 max-w-3xl w-full text-center relative z-10 mt-12 lg:mt-20">
              <span className="text-[10px] font-mono font-bold text-primary select-none tracking-[0.25em] uppercase block opacity-60">
                [ EN CIFRAS ]
              </span>
              <h1 className="text-[clamp(42px,8.5vw,80px)] font-bold tracking-tight font-heading leading-[1.05] text-on-background select-none">
                Impacto
              </h1>
              <p className="max-w-2xl mx-auto pt-1 font-serif italic font-light text-on-surface-variant/70 leading-relaxed text-[14px] sm:text-[16px] md:text-[18px] lg:text-[19px] text-center tracking-normal select-none">
                Las decisiones dietéticas individuales se agregan mecánicamente en la demanda industrial. Ajusta el cuantificador para visualizar el impacto.
              </p>
              <div className="flex items-center justify-center gap-6 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                  <Droplet className="w-3.5 h-3.5" />
                  AGUA
                </span>
                <span className="w-px h-4 bg-outline-variant/50" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                  <Flame className="w-3.5 h-3.5" />
                  CO₂
                </span>
                <span className="w-px h-4 bg-outline-variant/50" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                  <Trees className="w-3.5 h-3.5" />
                  DEFORESTACIÓN
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Controls Card */}
      <div className="glass-enhance border border-outline-variant/30 rounded-2xl p-6 lg:p-8 relative z-10 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none flex flex-col gap-8">
        
        {/* Mode Toggle */}
        <div className="flex justify-center -mt-10">
          <div className="bg-surface border border-outline-variant/40 rounded-full p-1 flex gap-1 shadow-sm">
            <button 
              onClick={() => setCalcMode("explore")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${calcMode === "explore" ? 'bg-primary text-on-primary shadow-md' : 'text-on-surface-variant hover:bg-surface-dim'}`}
            >
              <Calculator className="w-4 h-4" />
              Explorar
            </button>
            <button 
              onClick={() => setCalcMode("challenge")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${calcMode === "challenge" ? 'bg-ch4 text-on-primary shadow-md' : 'text-on-surface-variant hover:bg-surface-dim'}`}
            >
              <Target className="w-4 h-4" />
              Modo Reto
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-3 max-w-xl">
            <h4 className="text-technical-sm text-primary flex items-center gap-1.5">
              {calcMode === "explore" ? <Calculator className="w-4 h-4" /> : <Target className="w-4 h-4 text-ch4" />}
              {calcMode === "explore" ? "CUANTIFICADOR PLANETARIO" : "ALGORITMO DE REDUCCIÓN"}
            </h4>
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              {calcMode === "explore" 
                ? "Selecciona un perfil o configura tus comidas semanales al detalle. Los datos se calculan para una porción media de 150g."
                : "Partiendo de tu dieta actual, selecciona tu objetivo de reducción. El algoritmo calculará los cambios mínimos necesarios para lograrlo."}
            </p>
          </div>
          <button onClick={() => setShowInfo(true)} className="flex items-center gap-2 text-xs font-mono text-on-surface-variant/60 hover:text-primary transition-colors border border-outline-variant/30 px-3 py-1.5 rounded-full bg-surface">
            <BookOpen className="w-3.5 h-3.5" />
            Rigor Científico
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Diet Selector OR Challenge Setter */}
          {calcMode === "explore" ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-on-surface-variant/60 uppercase tracking-widest block">Perfil Base</span>
                <button 
                  onClick={() => setIsAdvanced(!isAdvanced)}
                  className={`text-[10px] font-mono flex items-center gap-1.5 px-2 py-1 rounded transition-colors ${isAdvanced ? 'bg-primary/10 text-primary' : 'text-on-surface-variant/60 hover:bg-surface-dim'}`}
                >
                  <Settings2 className="w-3 h-3" />
                  AFINAR PERFIL
                </button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {(Object.keys(PROFILE_LABELS) as DietProfile[]).map(key => (
                  <button
                    key={key}
                    onClick={() => {
                      setProfile(key);
                      setIsAdvanced(key === "custom" || isAdvanced);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-all border ${profile === key ? 'bg-primary text-on-primary border-primary font-medium' : 'bg-surface border-outline-variant/30 text-on-surface-variant hover:border-outline-variant/60'}`}
                  >
                    {PROFILE_LABELS[key]}
                  </button>
                ))}
              </div>

              <AnimatePresence>
                {isAdvanced && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(Object.keys(FOOD_LABELS) as FoodCategory[]).map(cat => (
                        <div key={cat} className="flex justify-between items-center bg-surface-dim/40 p-2 rounded-xl border border-outline-variant/20">
                          <span className="text-xs text-on-surface font-medium pl-2">{FOOD_LABELS[cat]}</span>
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleCustomMealChange(cat, -1)} className="p-1 hover:bg-surface rounded text-on-surface-variant hover:text-on-surface transition-all">
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-sm font-mono w-4 text-center">{customMeals[cat]}</span>
                            <button onClick={() => handleCustomMealChange(cat, 1)} className="p-1 hover:bg-surface rounded text-on-surface-variant hover:text-on-surface transition-all">
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="pt-3 text-[10px] font-mono text-on-surface-variant/40 text-right">
                      Total: {Object.values(customMeals).reduce((a,b)=>Number(a)+Number(b),0)} comidas/sem
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2">
                <span className="text-[10px] font-mono text-on-surface-variant/60 uppercase tracking-widest block">Objetivo de Reducción (CO₂)</span>
                <span className="text-sm font-bold text-ch4">-{challengeTarget}%</span>
              </div>
              
              <input 
                type="range" 
                min="5" 
                max="100" 
                step="5"
                value={challengeTarget}
                onChange={(e) => setChallengeTarget(Number(e.target.value))}
                className="w-full accent-ch4 h-1.5 bg-outline-variant/30 rounded-full appearance-none cursor-pointer"
              />

              {challengeResult && challengeResult.achievedReduction === 0 ? (
                <div className="mt-4 p-4 rounded-xl bg-surface border border-outline-variant/30 text-sm text-on-surface-variant text-center">
                  Tu dieta base ya es de muy bajo impacto. ¡Excelente trabajo!
                </div>
              ) : challengeResult && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-5 rounded-xl bg-ch4/5 border border-ch4/30 space-y-3"
                >
                  <h5 className="text-sm font-bold text-ch4 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Receta para el Cambio
                  </h5>
                  <ul className="space-y-2">
                    {challengeResult.changes.length > 0 ? challengeResult.changes.map((change, idx) => (
                      <li key={idx} className="text-sm text-on-surface flex items-center gap-2">
                        <ArrowRight className="w-3.5 h-3.5 text-ch4" />
                        Sustituye <strong className="font-mono">{change.count} comidas</strong> de {FOOD_LABELS[change.from]} por {FOOD_LABELS[change.to]}.
                      </li>
                    )) : (
                      <li className="text-sm text-on-surface">No se requieren cambios.</li>
                    )}
                  </ul>
                  <div className="pt-3 mt-3 border-t border-ch4/20 flex justify-between items-center">
                    <span className="text-xs text-on-surface-variant">Reducción lograda:</span>
                    <span className="font-mono font-bold text-ch4">-{Math.round(challengeResult.achievedReduction)}%</span>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* Right Column: Scale Multiplier */}
          <div className="space-y-4 bg-surface-dim/20 p-5 rounded-2xl border border-outline-variant/20 flex flex-col justify-center">
            <span className="text-[10px] font-mono text-on-surface-variant/60 uppercase tracking-widest flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" /> Escala Poblacional
            </span>
            <div className="pt-2 pb-6 relative">
              <input 
                type="range" 
                min="0" 
                max={POPULATION_STEPS.length - 1} 
                value={scaleIndex}
                onChange={(e) => setScaleIndex(Number(e.target.value))}
                className="w-full accent-primary h-1.5 bg-outline-variant/30 rounded-full appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[9px] font-mono text-on-surface-variant/50 mt-3 px-1 absolute w-full left-0">
                {POPULATION_STEPS.map((step, idx) => (
                  <span key={idx} className={idx === scaleIndex ? "text-primary font-bold" : ""}>
                    {step.label.split(" ")[0]}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-center pt-2">
              <span className="text-xl font-bold tracking-tight text-on-surface">
                {POPULATION_STEPS[scaleIndex]!.value.toLocaleString()} personas
              </span>
              <p className="text-[11px] text-on-surface-variant/60 mt-1">
                adoptando esta dieta durante <strong className="text-on-surface font-semibold">1 año</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        <MetricCard 
          icon={<Droplet className="w-5 h-5 text-ch1" />}
          colorClass="ch1"
          title="Agua Consumida"
          value={formatNumber(impacts.yearlyWater)}
          unit="L"
          delay={0.1}
          equivalence={`${formatNumber(olympicPools)} piscinas olímpicas`}
        />
        <MetricCard 
          icon={<Flame className="w-5 h-5 text-ch2" />}
          colorClass="ch2"
          title="Emisiones CO₂ eq."
          value={formatNumber(impacts.yearlyCo2)}
          unit="kg"
          delay={0.15}
          equivalence={`${formatNumber(carKm)} km en coche`}
        />
        <MetricCard 
          icon={<Trees className="w-5 h-5 text-ch4" />}
          colorClass="ch4"
          title="Uso de Tierra"
          value={formatNumber(impacts.yearlyLand)}
          unit="m²"
          delay={0.2}
          equivalence={`${formatNumber(soccerFields)} campos de fútbol`}
        />
        <MetricCard 
          icon={<Grid className="w-5 h-5 text-ch6" />}
          colorClass="ch6"
          title="Cereal / Piensos"
          value={formatNumber(impacts.yearlyGrain)}
          unit="kg"
          delay={0.25}
          equivalence={`Alimentaría a ${formatNumber(peopleFed)} pers./mes`}
        />
      </div>

      {/* Info Modal / Overlay (Rigor Científico) */}
      <AnimatePresence>
        {showInfo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto"
            onClick={() => setShowInfo(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface border border-outline-variant/40 rounded-2xl p-6 lg:p-8 max-w-3xl w-full shadow-2xl relative my-8"
            >
              <button 
                onClick={() => setShowInfo(false)}
                className="absolute top-4 right-4 p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-dim rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-2xl font-bold font-heading mb-6 flex items-center gap-2 border-b border-outline-variant/20 pb-4">
                <BookOpen className="w-6 h-6 text-primary" />
                Rigor Científico y Metodología
              </h3>
              
              <div className="space-y-6 text-sm text-on-surface-variant leading-relaxed">
                <p>
                  Esta calculadora no utiliza estimaciones arbitrarias. Todos los multiplicadores subyacentes provienen de la literatura científica revisada por pares, estandarizados para una ración neta de <strong>150 gramos</strong> por comida.
                </p>

                <div className="space-y-4">
                  <div className="bg-surface-dim/30 p-4 rounded-xl border border-outline-variant/20">
                    <h4 className="font-bold text-on-surface flex items-center gap-2 mb-2">
                      <Trees className="w-4 h-4 text-ch4" /> 
                      Impacto General (CO₂, Tierra y Eutrofización)
                    </h4>
                    <p className="mb-2">El cálculo base de emisiones de gases de efecto invernadero (CO₂ eq.) y uso de tierra (incluyendo pastos y tierras de cultivo para piensos) proviene del meta-análisis más exhaustivo hasta la fecha, que analizó ~38,700 granjas en 119 países:</p>
                    <blockquote className="border-l-2 border-ch4/50 pl-3 py-1 font-serif italic text-on-surface text-xs">
                      Poore, J., & Nemecek, T. (2018). "Reducing food's environmental impacts through producers and consumers". Science, 360(6392), 987-992.
                    </blockquote>
                  </div>

                  <div className="bg-surface-dim/30 p-4 rounded-xl border border-outline-variant/20">
                    <h4 className="font-bold text-on-surface flex items-center gap-2 mb-2">
                      <Droplet className="w-4 h-4 text-ch1" /> 
                      Huella Hídrica (Agua Consumida)
                    </h4>
                    <p className="mb-2">Los datos de litros de agua dulce requeridos por kilo de alimento, englobando la huella verde, azul y gris (agua consumida y contaminada durante el ciclo de vida), se basan en los estudios de la Water Footprint Network:</p>
                    <blockquote className="border-l-2 border-ch1/50 pl-3 py-1 font-serif italic text-on-surface text-xs">
                      Mekonnen, M. M., & Hoekstra, A. Y. (2011). "The green, blue and grey water footprint of farm animals and animal products". Hydrology and Earth System Sciences.
                    </blockquote>
                  </div>

                  <div className="bg-surface-dim/30 p-4 rounded-xl border border-outline-variant/20">
                    <h4 className="font-bold text-on-surface flex items-center gap-2 mb-2">
                      <TrendingDown className="w-4 h-4 text-ch2" /> 
                      La Urgencia de la Transición
                    </h4>
                    <p className="mb-2">La lógica del "Modo Reto" y la necesidad de escalar la reducción poblacional se alinea con las advertencias climáticas recientes, que concluyen que las metas del Acuerdo de París son inalcanzables sin un cambio dietético global:</p>
                    <blockquote className="border-l-2 border-ch2/50 pl-3 py-1 font-serif italic text-on-surface text-xs">
                      Clark, M. A., et al. (2020). "Global food system emissions could preclude achieving the 1.5° and 2°C climate change targets". Science, 370(6517), 705-708.
                    </blockquote>
                  </div>
                </div>

                <div className="text-xs opacity-70 pt-2 text-center border-t border-outline-variant/10">
                  Nota: Las cifras exactas pueden variar según el método de producción y la región. Los valores aquí presentados representan promedios globales ponderados.
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MetricCard({ icon, colorClass, title, value, unit, delay, equivalence }: any) {
  const bgClasses = {
    "ch1": "bg-ch1/10 border-ch1/20",
    "ch2": "bg-ch2/10 border-ch2/20",
    "ch4": "bg-ch4/10 border-ch4/20",
    "ch6": "bg-ch6/10 border-ch6/20",
  };
  const textClasses = {
    "ch1": "text-ch1",
    "ch2": "text-ch2",
    "ch4": "text-ch4",
    "ch6": "text-ch6",
  };
  
  const bgC = bgClasses[colorClass as keyof typeof bgClasses] || "bg-outline-variant/10 border-outline-variant/20";
  const textC = textClasses[colorClass as keyof typeof textClasses] || "text-on-surface";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className={`glass-enhance border border-outline-variant/25 rounded-2xl p-6 flex flex-col justify-between hover:border-outline-variant/60 transition-all before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/10 dark:before:bg-surface-dim/10 before:backdrop-blur-sm before:z-[-1] before:pointer-events-none relative`}
    >
      <div className="space-y-4">
        <div className={`w-10 h-10 rounded-2xl ${bgC} flex items-center justify-center`}>
          {icon}
        </div>
        <div>
          <span className="text-[10px] font-mono text-on-surface-variant/60 tracking-wider uppercase block">{title}</span>
          <span className={`text-3xl font-extrabold ${textC} tracking-tight block`}>
            {value} <span className="text-xs text-on-surface-variant/50 font-normal">{unit}</span>
          </span>
        </div>
      </div>
      <p className="text-[11px] text-on-surface-variant/70 leading-relaxed font-light mt-4 pt-4 border-t border-outline-variant/15">
        Equivale a <strong className="text-on-surface font-semibold">{equivalence}</strong>.
      </p>
    </motion.div>
  );
}
