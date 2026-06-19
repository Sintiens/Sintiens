import { motion } from "motion/react";
import { Database, Info } from "lucide-react";
import AnimalsSlaughteredChart from "./charts/AnimalsSlaughteredChart";
import MeatConsumptionChart from "./charts/MeatConsumptionChart";
import DeforestationChart from "./charts/DeforestationChart";
import { PageGlows } from "./ui/AmbientGlow";
import TabNav, { TabType } from "./TabNav";

interface DataSectionProps {
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export default function DataSection({ activeTab, onNavigate, theme, onToggleTheme }: DataSectionProps) {
  return (
    <div id="data-section-view" className="space-y-10 w-full relative">

      {/* Background glows */}
      <PageGlows />

      {/* Header */}
      <div className="relative z-10 space-y-3 border-b border-outline-variant/20 pb-8">
        <span className="text-[10px] font-mono font-bold text-primary select-none tracking-[0.25em] uppercase block opacity-60">
          [ EVIDENCIA ]
        </span>
        <h3 className="text-display-md text-on-surface">
          Evidencia Empírica<span className="text-secondary/60 font-light"> · Datos Globales</span>
        </h3>
        <p className="text-body-md text-on-surface-variant max-w-2xl">
          La magnitud del impacto del modelo de consumo actual requiere una perspectiva cuantitativa.
          Datos procedentes de bases públicas para entender la escala del sacrificio animal, el crecimiento del consumo y la destrucción ecológica.
        </p>
      </div>

      {/* Source Card */}
      <div className="glass-enhance border border-outline-variant/30 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none">
        <div className="md:col-span-8 space-y-4">
          <h4 className="text-technical-sm text-primary flex items-center gap-2">
            <Database className="w-4 h-4" />
            EV. EMPÍRICA Y DATOS GLOBALES
          </h4>
          <p className="text-body-md text-on-surface-variant leading-relaxed">
            Esta sección visualiza datos crudos procedentes de bases de datos públicas para entender 
            la escala del sacrificio animal, el crecimiento insostenible del consumo y la destrucción ecológica asociada.
          </p>
        </div>
        <div className="md:col-span-4 flex flex-col justify-center bg-surface-dim/40 p-5 rounded-xl border border-outline-variant/20">
          <span className="text-[10px] font-mono text-on-surface-variant/60 uppercase tracking-widest block mb-2 flex items-center gap-1.5">
            <Info className="w-3 h-3" /> Fuente de Datos
          </span>
          <a
            href="https://ourworldindata.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link hover:text-link/80 font-medium text-sm transition-colors"
          >
            Our World in Data (Universidad de Oxford)
          </a>
          <p className="text-xs text-on-surface-variant/60 mt-2 font-light leading-relaxed">
            Gráficos basados en informes globales sobre bienestar animal, agricultura y emisiones de gases de efecto invernadero.
          </p>
        </div>
      </div>

      <div className="w-full py-4">
        <TabNav activeTab={activeTab} onNavigate={onNavigate} theme={theme} onToggleTheme={onToggleTheme} />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="col-span-1 lg:col-span-2"
        >
          <AnimalsSlaughteredChart />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <MeatConsumptionChart />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <DeforestationChart />
        </motion.div>
      </div>
    </div>
  );
}
