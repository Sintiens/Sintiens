import { motion } from "motion/react";
import { Database, Info } from "lucide-react";
import AnimalsSlaughteredChart from "./charts/AnimalsSlaughteredChart";
import MeatConsumptionChart from "./charts/MeatConsumptionChart";
import DeforestationChart from "./charts/DeforestationChart";

export default function DataSection() {
  return (
    <div id="data-section-view" className="space-y-12 w-full max-w-6xl mx-auto py-8">
      
      {/* Introduction Header */}
      <div className="bg-white dark:bg-zinc-950/40 p-8 border border-zinc-200 dark:border-zinc-800/80 rounded-3xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center transition-all duration-300">
        <div className="md:col-span-8 space-y-4">
          <h3 className="text-sm font-semibold tracking-wider font-mono text-zinc-800 dark:text-zinc-300 uppercase flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            Evidencia Empírica y Datos Globales
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm font-light leading-relaxed max-w-2xl">
            La magnitud del impacto del modelo de consumo actual requiere una perspectiva cuantitativa. 
            Esta sección visualiza datos crudos en tiempo real procedentes de bases de datos públicas para entender 
            la escala del sacrificio animal, el crecimiento insostenible del consumo y la destrucción ecológica asociada.
          </p>
        </div>
        <div className="md:col-span-4 flex flex-col justify-center bg-zinc-100/70 dark:bg-zinc-900/60 p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800/80">
          <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest block mb-2 flex items-center gap-1.5">
            <Info className="w-3 h-3" /> Fuente de Datos
          </span>
          <a 
            href="https://ourworldindata.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
          >
            Our World in Data (Universidad de Oxford)
          </a>
          <p className="text-xs text-zinc-500 mt-2 font-light leading-relaxed">
            Gráficos basados en los informes globales sobre bienestar animal, agricultura y emisiones de gases de efecto invernadero.
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="col-span-1 lg:col-span-2"
        >
          <AnimalsSlaughteredChart />
        </motion.div>

        {/* Chart 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <MeatConsumptionChart />
        </motion.div>

        {/* Chart 3 */}
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
