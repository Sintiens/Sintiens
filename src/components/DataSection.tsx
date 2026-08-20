import { memo, useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Database,
  Eye,
  Flame,
  Globe2,
  Pill,
  Table,
  Zap
} from "lucide-react";
import LiveSlaughterTicker from "./cifras/LiveSlaughterTicker";
import SlaughterTimeSeriesChart from "./cifras/SlaughterTimeSeriesChart";
import BroilerAnatomyVisualizer from "./cifras/BroilerAnatomyVisualizer";
import MultiSpeciesConfinementVisualizer from "./cifras/MultiSpeciesConfinementVisualizer";
import MammalBiomassVisualizer from "./cifras/MammalBiomassVisualizer";
import SupplyChainEmissionsChart from "./cifras/SupplyChainEmissionsChart";
import DeforestationDriversVisualizer from "./cifras/DeforestationDriversVisualizer";
import LandAndTrophicFlowVisualizer from "./cifras/LandAndTrophicFlowVisualizer";
import AntibioticsPublicHealthVisualizer from "./cifras/AntibioticsPublicHealthVisualizer";
import FoodEnvironmentalMatrix from "./cifras/FoodEnvironmentalMatrix";

interface ModuleNav {
  id: string;
  label: string;
  icon: any;
  exhibits: string;
}

const MODULE_NAVS: ModuleNav[] = [
  { id: "slaughter_scale", label: "I. Sacrificio & Escala", icon: Flame, exhibits: "Exhibits I & II" },
  { id: "anatomy_confinement", label: "II. Biología & Confinamiento", icon: Eye, exhibits: "Exhibits III & IV" },
  { id: "climate_ecology", label: "III. Clima & Biodiversidad", icon: Globe2, exhibits: "Exhibits V & VI" },
  { id: "trophic_thermodynamics", label: "IV. Termodinámica & Suelo", icon: Zap, exhibits: "Exhibit VII" },
  { id: "public_health", label: "V. Antibióticos & Pandemias", icon: Pill, exhibits: "Exhibit VIII" },
  { id: "food_matrix", label: "VI. Matriz Ambiental", icon: Table, exhibits: "Exhibit IX" }
];

export default memo(function DataSection() {
  const [activeNav, setActiveNav] = useState<string>("slaughter_scale");

  // ScrollSpy with IntersectionObserver
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          setActiveNav(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: [0.3]
    });

    MODULE_NAVS.forEach((mod) => {
      const el = document.getElementById(mod.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToModule = (id: string) => {
    setActiveNav(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -132;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <motion.div
      key="cifras_view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
      className="space-y-16 w-full max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 py-8 text-left"
    >
      {/* SECTION 0: Academic Hero & Meta Stats Banner */}
      <div className="text-center space-y-6 pt-4 pb-8 border-b border-outline-variant/20 dark:border-zinc-800 relative">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 dark:bg-emerald-500/10 border border-primary/20 dark:border-emerald-500/20 rounded-full text-xs font-mono font-bold text-primary dark:text-emerald-400">
          <Database className="w-3.5 h-3.5" />
          <span>REPOSITORIO DE EVIDENCIA EMPÍRICA Y BIOFÍSICA · ACCESO ABIERTO</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight text-on-surface">
          La Anatomía Cuantitativa de la Explotación Animal
        </h1>

        <p className="text-sm sm:text-base md:text-lg font-sans text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
          Base de datos interactiva respaldada por más de 50.000 explotaciones comerciales y metaanálisis en <span className="text-on-surface font-semibold">Science</span>, <span className="text-on-surface font-semibold">Nature</span>, <span className="text-on-surface font-semibold">PNAS</span>, la <span className="text-on-surface font-semibold">FAO</span> y la <span className="text-on-surface font-semibold">EFSA</span>.
        </p>

        {/* Global Key Figures Bar — glass sutil */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-4 text-left">
          <div className="p-4 glass-enhance rounded-xl border border-outline-variant/15 space-y-1 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none relative">
            <span className="text-[10px] font-mono uppercase tracking-widest text-red-600 dark:text-red-400 font-semibold block">
              Sacrificio Anual
            </span>
            <span className="text-2xl font-mono font-bold text-on-surface">
              &gt;80.000 M
            </span>
            <span className="text-[10px] font-mono text-on-surface-variant/60 block">
              Animales terrestres / año
            </span>
          </div>

          <div className="p-4 glass-enhance rounded-xl border border-outline-variant/15 space-y-1 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none relative">
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-semibold block">
              Biomasa Mamífera
            </span>
            <span className="text-2xl font-mono font-bold text-on-surface">
              62% Ganado
            </span>
            <span className="text-[10px] font-mono text-on-surface-variant/60 block">
              Vs 4% mamíferos silvestres
            </span>
          </div>

          <div className="p-4 glass-enhance rounded-xl border border-outline-variant/15 space-y-1 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none relative">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold block">
              Uso de Tierra
            </span>
            <span className="text-2xl font-mono font-bold text-on-surface">
              77% Suelo
            </span>
            <span className="text-[10px] font-mono text-on-surface-variant/60 block">
              Para 18% de calorías
            </span>
          </div>

          <div className="p-4 glass-enhance rounded-xl border border-outline-variant/15 space-y-1 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none relative">
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-semibold block">
              Antibióticos
            </span>
            <span className="text-2xl font-mono font-bold text-on-surface">
              73% Global
            </span>
            <span className="text-[10px] font-mono text-on-surface-variant/60 block">
              Administrado a granjas
            </span>
          </div>
        </div>
      </div>

      {/* STICKY FLOATING NAVIGATION — glass unificada, offset para MiniTabNav */}
      <div className="sticky top-[88px] z-20 py-3 glass-enhance border-y border-outline-variant/15 -mx-4 md:-mx-6 lg:-mx-8 px-4 md:px-6 lg:px-8 before:content-[''] before:absolute before:inset-0 before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-[1280px] mx-auto">
          {MODULE_NAVS.map((mod) => {
            const Icon = mod.icon;
            const isActive = activeNav === mod.id;
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => scrollToModule(mod.id)}
                className={`px-3.5 py-2 rounded-full text-xs font-mono font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                  isActive
                    ? "bg-primary text-on-primary shadow-sm ring-1 ring-primary/20"
                    : "glass-enhance border border-outline-variant/20 text-on-surface-variant hover:text-on-surface hover:border-outline-variant/40 before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none relative"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{mod.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODULE I: ESCALA Y SACRIFICIO EN VIVO */}
      {/* ========================================================================= */}
      <section id="slaughter_scale" className="space-y-8 scroll-mt-[132px]">
        <div className="space-y-1 border-l-2 border-red-500/60 pl-4">
          <span className="text-xs font-mono uppercase tracking-widest text-red-600 dark:text-red-400 font-bold">
            Módulo I · Dinámica Cuantitativa de Sacrificio
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-on-surface">
            La Magnitud Temporal del Matadero
          </h2>
        </div>

        <LiveSlaughterTicker />
        <SlaughterTimeSeriesChart />
      </section>

      {/* ========================================================================= */}
      {/* MODULE II: BIOLOGÍA Y CONFINAMIENTO EXTREMO */}
      {/* ========================================================================= */}
      <section id="anatomy_confinement" className="space-y-8 scroll-mt-[132px]">
        <div className="space-y-1 border-l-2 border-amber-500/60 pl-4">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">
            Módulo II · Zootecnia y Arquitectura del Confinamiento
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-on-surface">
            Cuerpos Manipulados y Espacios Reducidos
          </h2>
        </div>

        <BroilerAnatomyVisualizer />
        <MultiSpeciesConfinementVisualizer />
      </section>

      {/* ========================================================================= */}
      {/* MODULE III: CLIMA, SUELO Y BIODIVERSIDAD */}
      {/* ========================================================================= */}
      <section id="climate_ecology" className="space-y-8 scroll-mt-[132px]">
        <div className="space-y-1 border-l-2 border-emerald-500/60 pl-4">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
            Módulo III · Huella Ecológica y Extinción de Biomasa
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-on-surface">
            Colapso de Ecosistemas y Ciclo de Vida
          </h2>
        </div>

        <MammalBiomassVisualizer />
        <SupplyChainEmissionsChart />
        <DeforestationDriversVisualizer />
      </section>

      {/* ========================================================================= */}
      {/* MODULE IV: TERMODINÁMICA Y PÉRDIDA TRÓFICA */}
      {/* ========================================================================= */}
      <section id="trophic_thermodynamics" className="space-y-8 scroll-mt-[132px]">
        <div className="space-y-1 border-l-2 border-primary/60 pl-4">
          <span className="text-xs font-mono uppercase tracking-widest text-primary dark:text-emerald-400 font-bold">
            Módulo IV · Balance Termodinámico y Suelo
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-on-surface">
            La Ineficiencia Metabólica de la Pirámide Trófica
          </h2>
        </div>

        <LandAndTrophicFlowVisualizer />
      </section>

      {/* ========================================================================= */}
      {/* MODULE V: SALUD PÚBLICA Y PANDEMIAS */}
      {/* ========================================================================= */}
      <section id="public_health" className="space-y-8 scroll-mt-[132px]">
        <div className="space-y-1 border-l-2 border-blue-500/60 pl-4">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold">
            Módulo V · Bioseguridad y Resistencia Antimicrobiana
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-on-surface">
            El Coste Oculto para la Salud Humana
          </h2>
        </div>

        <AntibioticsPublicHealthVisualizer />
      </section>

      {/* ========================================================================= */}
      {/* MODULE VI: MATRIZ AMBIENTAL DE ALIMENTOS */}
      {/* ========================================================================= */}
      <section id="food_matrix" className="space-y-8 scroll-mt-[132px]">
        <div className="space-y-1 border-l-2 border-purple-500/60 pl-4">
          <span className="text-xs font-mono uppercase tracking-widest text-purple-600 dark:text-purple-400 font-bold">
            Módulo VI · Matriz Comparativa y Simulador Dietético
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-on-surface">
            Evaluación Multidimensional de Alimentos
          </h2>
        </div>

        <FoodEnvironmentalMatrix />
      </section>
    </motion.div>
  );
});
