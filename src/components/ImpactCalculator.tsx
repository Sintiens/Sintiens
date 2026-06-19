import { useState } from "react";
import { 
  Plus, 
  Minus, 
  Droplet, 
  Grid, 
  Trees, 
  Flame, 
  ChevronRight, 
  Share2, 
  Info, 
  LineChart, 
  TrendingDown, 
  Calculator,
  ArrowRight
} from "lucide-react";
import { motion } from "motion/react";
import { PageGlows } from "./ui/AmbientGlow";
import TabNav, { TabType } from "./TabNav";

interface ImpactCalculatorProps {
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export default function ImpactCalculator({ activeTab, onNavigate, theme, onToggleTheme }: ImpactCalculatorProps) {
  const [weeklyMeals, setWeeklyMeals] = useState(7);

  const WATER_PER_MEAL = 900;
  const CO2_PER_MEAL = 4.2;
  const FOREST_PER_MEAL = 3.5;
  const GRAIN_PER_MEAL = 1.2;

  const yearlyWater = Math.round(weeklyMeals * WATER_PER_MEAL * 52);
  const yearlyCo2 = Math.round(weeklyMeals * CO2_PER_MEAL * 52 * 10) / 10;
  const yearlyForest = Math.round(weeklyMeals * FOREST_PER_MEAL * 52);
  const yearlyGrain = Math.round(weeklyMeals * GRAIN_PER_MEAL * 52 * 10) / 10;

  const olympicPools = Math.round((yearlyWater / 2500000) * 100) / 100;
  const carKm = Math.round(yearlyCo2 / 0.12);
  const soccerFields = Math.round((yearlyForest / 7140) * 100) / 100;

  return (
    <div id="impact-calculator-view" className="space-y-10 w-full relative">

      <PageGlows />

      {/* Header */}
      <div className="relative z-10 space-y-3 border-b border-outline-variant/20 pb-8">
        <span className="text-[10px] font-mono font-bold text-primary select-none tracking-[0.25em] uppercase block opacity-60">
          [ IMPACTO ]
        </span>
        <h3 className="text-display-md text-on-surface">
          Cuantificador<span className="text-secondary/60 font-light"> · Demanda Planetaria</span>
        </h3>
        <p className="text-body-md text-on-surface-variant max-w-2xl">
          Las decisiones dietéticas individuales se agregan mecánicamente en la demanda industrial. Ajusta el cuantificador para visualizar el impacto.
        </p>
      </div>

      <div className="w-full py-4">
        <TabNav activeTab={activeTab} onNavigate={onNavigate} theme={theme} onToggleTheme={onToggleTheme} />
      </div>

      {/* Controls Card */}
      <div className="glass-enhance border border-outline-variant/30 rounded-2xl p-6 lg:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none">
        <div className="md:col-span-8 space-y-3">
          <h4 className="text-technical-sm text-primary flex items-center gap-1.5">
            <Calculator className="w-4 h-4" />
            CUANTIFICADOR PLANETARIO
          </h4>
          <p className="text-body-md text-on-surface-variant leading-relaxed">
            Ajusta tu consumo semanal para ver los m³ de agua, kg de CO₂, superficie forestal y cereal desperdiciado asociados a tus hábitos.
          </p>
        </div>
        <div className="md:col-span-4 flex flex-col justify-center items-center md:items-end bg-surface-dim/40 p-4 rounded-xl border border-outline-variant/20">
          <span className="text-[10px] font-mono text-on-surface-variant/60 uppercase tracking-widest block mb-1">Tu Hábito Semanal</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setWeeklyMeals((v) => Math.max(0, v - 1))}
              className="p-2 bg-surface border border-outline-variant/40 hover:bg-surface-dim rounded-xl rounded-l-full text-on-surface-variant hover:text-on-surface transition-all cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-2xl font-black text-on-surface px-2 tracking-tight">
              {weeklyMeals} <span className="text-xs text-on-surface-variant/60 font-normal">comidas</span>
            </span>
            <button
              onClick={() => setWeeklyMeals((v) => Math.min(21, v + 1))}
              className="p-2 bg-surface border border-outline-variant/40 hover:bg-surface-dim rounded-xl rounded-r-full text-on-surface-variant hover:text-on-surface transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="text-[9px] font-mono text-on-surface-variant/40 mt-1 uppercase">{Math.round(weeklyMeals / 3 * 10) / 10} días completos</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass-enhance border border-outline-variant/25 rounded-2xl p-6 flex flex-col justify-between hover:border-outline-variant/60 transition-all before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/10 dark:before:bg-surface-dim/10 before:backdrop-blur-sm before:z-[-1] before:pointer-events-none relative"
        >
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-ch1/10 border border-ch1/20 flex items-center justify-center">
              <Droplet className="w-5 h-5 text-ch1" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-on-surface-variant/60 tracking-wider uppercase block">Gasto de Agua Anual</span>
              <span className="text-3xl font-extrabold text-ch1 tracking-tight block">
                {yearlyWater.toLocaleString()} <span className="text-sm text-on-surface-variant/50 font-normal">L</span>
              </span>
            </div>
          </div>
          <p className="text-[11px] text-on-surface-variant/70 leading-relaxed font-light mt-4 pt-4 border-t border-outline-variant/15">
            Equivale a <strong className="text-on-surface font-semibold">{olympicPools} piscinas olímpicas</strong> de agua potable.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="glass-enhance border border-outline-variant/25 rounded-2xl p-6 flex flex-col justify-between hover:border-outline-variant/60 transition-all before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/10 dark:before:bg-surface-dim/10 before:backdrop-blur-sm before:z-[-1] before:pointer-events-none relative"
        >
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-ch2/10 border border-ch2/20 flex items-center justify-center">
              <Flame className="w-5 h-5 text-ch2" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-on-surface-variant/60 tracking-wider uppercase block">Emisiones CO₂ Eq.</span>
              <span className="text-3xl font-extrabold text-ch2 tracking-tight block">
                {yearlyCo2.toLocaleString()} <span className="text-xs text-on-surface-variant/50 font-normal">kg</span>
              </span>
            </div>
          </div>
          <p className="text-[11px] text-on-surface-variant/70 leading-relaxed font-light mt-4 pt-4 border-t border-outline-variant/15">
            Equivale a conducir <strong className="text-on-surface font-semibold">{carKm.toLocaleString()} km</strong> en coche estándar.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass-enhance border border-outline-variant/25 rounded-2xl p-6 flex flex-col justify-between hover:border-outline-variant/60 transition-all before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/10 dark:before:bg-surface-dim/10 before:backdrop-blur-sm before:z-[-1] before:pointer-events-none relative"
        >
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-ch4/10 border border-ch4/20 flex items-center justify-center">
              <Trees className="w-5 h-5 text-ch4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-on-surface-variant/60 tracking-wider uppercase block">Deforestación</span>
              <span className="text-3xl font-extrabold text-ch4 tracking-tight block">
                {yearlyForest.toLocaleString()} <span className="text-xs text-on-surface-variant/50 font-normal">m²</span>
              </span>
            </div>
          </div>
          <p className="text-[11px] text-on-surface-variant/70 leading-relaxed font-light mt-4 pt-4 border-t border-outline-variant/15">
            <strong className="text-on-surface font-semibold">{soccerFields} campos de fútbol</strong> de selva deforestada.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="glass-enhance border border-outline-variant/25 rounded-2xl p-6 flex flex-col justify-between hover:border-outline-variant/60 transition-all before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/10 dark:before:bg-surface-dim/10 before:backdrop-blur-sm before:z-[-1] before:pointer-events-none relative"
        >
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-ch6/10 border border-ch6/20 flex items-center justify-center">
              <Grid className="w-5 h-5 text-ch6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-on-surface-variant/60 tracking-wider uppercase block">Cereal Piensos</span>
              <span className="text-3xl font-extrabold text-ch6 tracking-tight block">
                {yearlyGrain.toLocaleString()} <span className="text-xs text-on-surface-variant/50 font-normal">kg</span>
              </span>
            </div>
          </div>
          <p className="text-[11px] text-on-surface-variant/70 leading-relaxed font-light mt-4 pt-4 border-t border-outline-variant/15">
            Kilos de cereal perdidos, suficientes para <strong className="text-on-surface font-semibold">{Math.round(yearlyGrain / 150)} personas</strong> / mes.
          </p>
        </motion.div>
      </div>

      {/* Projections */}
      <div className="glass-enhance border border-outline-variant/25 rounded-2xl p-6 lg:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center relative z-10 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none">
        <div className="space-y-4">
          <h4 className="text-technical-sm text-primary flex items-center gap-1.5">
            <TrendingDown className="w-4 h-4" />
            LA ESCALA GLOBAL DEL PEQUEÑO CAMBIO
          </h4>
          <p className="text-body-md text-on-surface-variant leading-relaxed">
            Si la mitad de los habitantes de un país mediano redujeran su ingesta en 3 comidas semanales, se ahorrarían billones de m³ de agua y se recuperarían millones de hectáreas de selva.
          </p>
          <div className="flex gap-4 pt-2">
            <div className="space-y-0.5 bg-surface-dim/40 border border-outline-variant/20 px-4 py-3 rounded-xl">
              <span className="text-[10px] font-mono text-on-surface-variant/50 block uppercase">Eficiencia Nutricional</span>
              <span className="text-sm font-bold text-ch4">Hasta x10 Eficiente</span>
            </div>
            <div className="space-y-0.5 bg-surface-dim/40 border border-outline-variant/20 px-4 py-3 rounded-xl">
              <span className="text-[10px] font-mono text-on-surface-variant/50 block uppercase">Liberación Tierras</span>
              <span className="text-sm font-bold text-on-surface">75% Reducción</span>
            </div>
          </div>
        </div>
        <div className="bg-surface-dim/30 p-5 rounded-xl border border-outline-variant/20 space-y-4 text-xs font-light">
          <h5 className="font-mono text-technical-xs text-on-surface-variant/60 uppercase tracking-widest flex items-center gap-1.5 pb-2 border-b border-outline-variant/15">
            <LineChart className="w-3.5 h-3.5" />
            Simulador de Transición Dietética
          </h5>
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-surface-dim/30 px-3 py-2 rounded-xl border border-outline-variant/15">
              <span className="text-on-surface-variant/70 text-[11px]">Dieta Estándar Actual</span>
              <span className="text-ch1 font-bold font-mono">100% Gasto</span>
            </div>
            <div className="flex items-center justify-center py-0.5">
              <ArrowRight className="w-4 h-4 text-on-surface-variant/30 animate-pulse rotate-90 md:rotate-0" />
            </div>
            <div className="flex justify-between items-center bg-ch4/5 px-3 py-2.5 rounded-xl border border-ch4/20">
              <div className="space-y-0.5">
                <span className="text-on-surface text-[11px] font-semibold block">Transición Vegana (0 comidas)</span>
                <span className="text-[10px] text-on-surface-variant/50">Cero consumo ganadero</span>
              </div>
              <span className="text-ch4 font-bold font-mono text-xs bg-ch4/10 border border-ch4/20 px-2 py-0.5 rounded">
                -92% Huella
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
