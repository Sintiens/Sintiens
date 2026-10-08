import { memo, useState, useEffect } from "react";
import {
  Database,
  Eye,
  Flame,
  Globe2,
  Pill,
  Table,
  Zap
} from "lucide-react";
import { HeroShell } from "./ui/Shells";
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
  { id: "slaughter_scale", label: "I · Sacrificios", icon: Flame, exhibits: "Módulo I: Dinámica Temporal de Sacrificio (Exhibits I & II)" },
  { id: "anatomy_confinement", label: "II · Biología", icon: Eye, exhibits: "Módulo II: Zootecnia y Confinamiento (Exhibits III & IV)" },
  { id: "climate_ecology", label: "III · Ecosistemas", icon: Globe2, exhibits: "Módulo III: Clima, Suelo y Biodiversidad (Exhibits V, VI & VII)" },
  { id: "trophic_thermodynamics", label: "IV · Termodinámica", icon: Zap, exhibits: "Módulo IV: Balance Trófico y Suelo (Exhibit VIII)" },
  { id: "public_health", label: "V · Salud Pública", icon: Pill, exhibits: "Módulo V: Bioseguridad y Resistencia Antimicrobiana (Exhibit IX)" },
  { id: "food_matrix", label: "VI · Matriz Global", icon: Table, exhibits: "Módulo VI: Matriz Comparativa de Alimentos (Exhibit X)" }
];

export default memo(function DataSection() {
  const [activeNav, setActiveNav] = useState<string>("slaughter_scale");

  /** Offset de anclaje común: altura real del nav flotante activo + altura del nav de módulos. */
  const getSectionOffset = () => {
    if (typeof window === "undefined") return 120;
    const isMobile = window.innerWidth < 640;
    if (isMobile) return 56;
    const navH = Number.parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hero-nav-active-top")
    );
    return (Number.isFinite(navH) && navH > 0 ? navH : 0) + 64;
  };

  // ScrollSpy: banda superior bajo la nav sticky; activo = primer módulo visible en orden de documento.
  useEffect(() => {
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
          else visible.delete(entry.target.id);
        });
        const firstVisible = MODULE_NAVS.find((mod) => visible.has(mod.id));
        if (firstVisible) setActiveNav(firstVisible.id);
      },
      { root: null, rootMargin: "-96px 0px -55% 0px", threshold: 0 }
    );

    MODULE_NAVS.forEach((mod) => {
      const el = document.getElementById(mod.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Deep-links directos: /argumento/cifras#slaughter_scale, #climate_ecology, etc.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!MODULE_NAVS.some((mod) => mod.id === hash)) return;
    const el = document.getElementById(hash);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - getSectionOffset();
    window.scrollTo({ top: y, behavior: "auto" });
  }, []);

  const scrollToModule = (id: string) => {
    setActiveNav(id);
    window.history.replaceState(null, "", `#${id}`);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -getSectionOffset();
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
    }
  };

  return (
    <div className="space-y-8 sm:space-y-10 w-full pt-0 pb-8 text-left">
      {/* SECTION 0: Academic Hero & Meta Stats Banner */}
      <HeroShell id="hero" pad="wide" border="20" cue compact watermark={{ icon: Database, size: "clamp(140px, 35vw, 360px)" }}>
        <h1 className="text-[clamp(34px,5.8vw,64px)] font-bold tracking-tight font-heading leading-[1.06] text-on-background select-text">
          Cifras
          <span className="italic font-light text-secondary font-serif block mt-1.5 text-[clamp(20px,3.4vw,34px)]">
            Anatomía Cuantitativa
          </span>
        </h1>

        <p className="max-w-2xl mx-auto pt-1.5 sm:pt-2.5 font-serif italic font-light text-on-surface-variant/75 leading-relaxed text-[14px] sm:text-[16px] lg:text-[17px] text-center tracking-normal select-text">
          Base de datos interactiva respaldada por más de 38.700 granjas comerciales y metaanálisis en <span className="text-on-surface font-semibold">Science</span>, <span className="text-on-surface font-semibold">Nature</span>, <span className="text-on-surface font-semibold">PNAS</span>, la <span className="text-on-surface font-semibold">FAO</span> y la <span className="text-on-surface font-semibold">EFSA</span>.
        </p>

        <div className="flex items-center justify-center gap-3 sm:gap-5 pt-1.5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-primary" />
            REPOSITORIO BIOFÍSICO · ACCESO ABIERTO
          </span>
        </div>
      </HeroShell>

      {/* Global Key Figures Bar — expansión a ancho completo */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full text-left">
        <div className="p-4 glass-enhance rounded-xl border border-outline-variant/15 space-y-1 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none relative">
          <span className="text-[10px] font-mono uppercase tracking-widest text-red-600 dark:text-red-400 font-semibold block">
            Sacrificio Anual
          </span>
          <span className="text-xl sm:text-2xl font-mono font-bold text-on-surface tabular-nums">
            &gt;80.000 M
          </span>
          <span className="text-[10px] font-mono text-on-surface-variant/60 block">
            Animales terrestres / año (FAOSTAT 2024)
          </span>
        </div>

        <div className="p-4 glass-enhance rounded-xl border border-outline-variant/15 space-y-1 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none relative">
          <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-semibold block">
            Biomasa Mamífera
          </span>
          <span className="text-xl sm:text-2xl font-mono font-bold text-on-surface tabular-nums">
            60% Ganado
          </span>
          <span className="text-[10px] font-mono text-on-surface-variant/60 block">
            Vs 36% humanos y 4% silvestres
          </span>
        </div>

        <div className="p-4 glass-enhance rounded-xl border border-outline-variant/15 space-y-1 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none relative">
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-semibold block">
            Uso de Tierra
          </span>
          <span className="text-xl sm:text-2xl font-mono font-bold text-on-surface tabular-nums">
            83% Suelo
          </span>
          <span className="text-[10px] font-mono text-on-surface-variant/60 block">
            Para el 18% de las calorías
          </span>
        </div>

        <div className="p-4 glass-enhance rounded-xl border border-outline-variant/15 space-y-1 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none relative">
          <span className="text-[10px] font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-semibold block">
            Antibióticos
          </span>
          <span className="text-xl sm:text-2xl font-mono font-bold text-on-surface tabular-nums">
            73% Global
          </span>
          <span className="text-[10px] font-mono text-on-surface-variant/60 block">
            Administrados a animales de granja
          </span>
        </div>
      </div>

      {/* STICKY FLOATING NAVIGATION — distribución adaptativa en ancho completo */}
      <nav
        data-nav-avoid="true"
        aria-label="Módulos de la sección Cifras"
        className="sticky top-[var(--hero-nav-active-top,0px)] z-20 py-2 sm:py-2.5 glass-enhance border-y border-outline-variant/15 -mx-3 sm:-mx-5 md:-mx-7 lg:-mx-8 px-3 sm:px-5 md:px-7 lg:px-8 transition-[top] duration-200 ease-out before:content-[''] before:absolute before:inset-0 before:bg-surface-dim/30 dark:before:bg-surface-dim/15 before:backdrop-blur-md before:z-[-1] before:pointer-events-none relative shadow-xs"
      >
        <div className="w-full">
          {/* Menú responsivo: tira horizontal ultra-compacta en móvil y grid de 6 columnas de ancho completo en desktop */}
          <div className="flex lg:grid lg:grid-cols-6 items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar w-full scroll-px-3">
            {MODULE_NAVS.map((mod) => {
              const Icon = mod.icon;
              const isActive = activeNav === mod.id;
              return (
                <button
                  key={mod.id}
                  type="button"
                  title={mod.exhibits}
                  aria-current={isActive ? "true" : undefined}
                  onClick={() => scrollToModule(mod.id)}
                  className={`shrink-0 lg:w-full px-3 lg:px-2.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                    isActive
                      ? "bg-primary text-on-primary shadow-sm ring-1 ring-primary/20 font-extrabold"
                      : "glass-enhance border border-outline-variant/20 text-on-surface-variant hover:text-on-surface hover:border-outline-variant/40 bg-surface/50 dark:bg-zinc-800/40"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{mod.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* MODULE I: ESCALA Y SACRIFICIO EN VIVO */}
      {/* ========================================================================= */}
      <section className="space-y-5 sm:space-y-6 scroll-mt-16 sm:scroll-mt-[calc(var(--hero-nav-h,104px)+72px)]" id="slaughter_scale">
        <div className="space-y-1 border-l-2 border-red-500/60 pl-4">
          <span className="text-xs font-mono uppercase tracking-widest text-red-600 dark:text-red-400 font-bold">
            Módulo I · Dinámica Cuantitativa de Sacrificio
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-on-surface">
            La Magnitud Temporal del Matadero
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-3xl leading-relaxed">
            Flujo cuantitativo de más de 80.000 millones de animales terrestres y billones de peces sacrificados cada año a escala global (FAOSTAT 2024 & Fishcount).
          </p>
        </div>

        <LiveSlaughterTicker />
        <SlaughterTimeSeriesChart />
      </section>

      {/* ========================================================================= */}
      {/* MODULE II: BIOLOGÍA Y CONFINAMIENTO EXTREMO */}
      {/* ========================================================================= */}
      <section className="space-y-5 sm:space-y-6 scroll-mt-16 sm:scroll-mt-[calc(var(--hero-nav-h,104px)+72px)]" id="anatomy_confinement">
        <div className="space-y-1 border-l-2 border-amber-500/60 pl-4">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold">
            Módulo II · Zootecnia y Arquitectura del Confinamiento
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-on-surface">
            Cuerpos Manipulados y Espacios Reducidos
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-3xl leading-relaxed">
            Metamorfosis artificial por selección zootécnica (1957—2025) y análisis bioespacial de privación de conductas instintivas en granjas intensivas (EFSA).
          </p>
        </div>

        <BroilerAnatomyVisualizer />
        <MultiSpeciesConfinementVisualizer />
      </section>

      {/* ========================================================================= */}
      {/* MODULE III: CLIMA, SUELO Y BIODIVERSIDAD */}
      {/* ========================================================================= */}
      <section className="space-y-5 sm:space-y-6 scroll-mt-16 sm:scroll-mt-[calc(var(--hero-nav-h,104px)+72px)]" id="climate_ecology">
        <div className="space-y-1 border-l-2 border-emerald-500/60 pl-4">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
            Módulo III · Huella Ecológica y Extinción de Biomasa
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-on-surface">
            Colapso de Ecosistemas y Ciclo de Vida
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-3xl leading-relaxed">
            Apropiación de la biosfera: el ganado representa el 60% de la biomasa de mamíferos terrestres, impulsa la deforestación y concentra gases de efecto invernadero.
          </p>
        </div>

        <MammalBiomassVisualizer />
        <SupplyChainEmissionsChart />
        <DeforestationDriversVisualizer />
      </section>

      {/* ========================================================================= */}
      {/* MODULE IV: TERMODINÁMICA Y PÉRDIDA TRÓFICA */}
      {/* ========================================================================= */}
      <section className="space-y-5 sm:space-y-6 scroll-mt-16 sm:scroll-mt-[calc(var(--hero-nav-h,104px)+72px)]" id="trophic_thermodynamics">
        <div className="space-y-1 border-l-2 border-primary/60 pl-4">
          <span className="text-xs font-mono uppercase tracking-widest text-primary dark:text-emerald-400 font-bold">
            Módulo IV · Balance Termodinámico y Suelo
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-on-surface">
            La Ineficiencia Metabólica de la Pirámide Trófica
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-3xl leading-relaxed">
            La ganadería ocupa el 83% de las tierras agrarias mundiales pero suministra únicamente el 18% de las calorías y el 37% de las proteínas humanas consumidas.
          </p>
        </div>

        <LandAndTrophicFlowVisualizer />
      </section>

      {/* ========================================================================= */}
      {/* MODULE V: SALUD PÚBLICA Y PANDEMIAS */}
      {/* ========================================================================= */}
      <section className="space-y-5 sm:space-y-6 scroll-mt-16 sm:scroll-mt-[calc(var(--hero-nav-h,104px)+72px)]" id="public_health">
        <div className="space-y-1 border-l-2 border-blue-500/60 pl-4">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold">
            Módulo V · Bioseguridad y Resistencia Antimicrobiana
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-on-surface">
            El Coste Oculto para la Salud Humana
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-3xl leading-relaxed">
            Uso profiláctico masivo del 73% de los antibióticos mundiales en animales sanos, acelerando la selección de superbacterias resistentes y el riesgo zoonótico.
          </p>
        </div>

        <AntibioticsPublicHealthVisualizer />
      </section>

      {/* ========================================================================= */}
      {/* MODULE VI: MATRIZ AMBIENTAL DE ALIMENTOS */}
      {/* ========================================================================= */}
      <section className="space-y-5 sm:space-y-6 scroll-mt-16 sm:scroll-mt-[calc(var(--hero-nav-h,104px)+72px)]" id="food_matrix">
        <div className="space-y-1 border-l-2 border-purple-500/60 pl-4">
          <span className="text-xs font-mono uppercase tracking-widest text-purple-600 dark:text-purple-400 font-bold">
            Módulo VI · Matriz Comparativa y Simulador Dietético
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-on-surface">
            Evaluación Multidimensional de Alimentos
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-3xl leading-relaxed">
            Metanálisis de Poore & Nemecek (Science 2018) estandarizado por 100 g de proteína: emisiones de GEI, uso de suelo, acidificación y eutrofización.
          </p>
        </div>

        <FoodEnvironmentalMatrix />
      </section>
    </div>
  );
});
