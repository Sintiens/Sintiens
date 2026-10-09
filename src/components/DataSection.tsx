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
    <div className="space-y-6 sm:space-y-7 w-full pt-0 pb-6 text-left">
      {/* SECTION 0: Academic Hero & Meta Stats Banner */}
      <HeroShell id="hero" pad="narrow" border="20" cue compact watermark={{ icon: Database, size: "clamp(120px, 30vw, 300px)" }}>
        <h1 className="text-[clamp(32px,5.4vw,60px)] font-bold tracking-tight font-heading leading-[1.06] text-on-background select-text">
          Cifras
          <span className="italic font-light text-secondary font-serif block mt-1 text-[clamp(19px,3.2vw,32px)]">
            Anatomía Cuantitativa
          </span>
        </h1>

        <p className="max-w-2xl mx-auto pt-1 sm:pt-2 font-serif italic font-light text-on-surface-variant/75 leading-relaxed text-[13px] sm:text-[15px] lg:text-[16px] text-center tracking-normal select-text">
          Base de datos interactiva respaldada por más de 38.700 granjas comerciales y metaanálisis en <span className="text-on-surface font-semibold">Science</span>, <span className="text-on-surface font-semibold">Nature</span>, <span className="text-on-surface font-semibold">PNAS</span>, la <span className="text-on-surface font-semibold">FAO</span> y la <span className="text-on-surface font-semibold">EFSA</span>.
        </p>

        <div className="flex items-center justify-center gap-3 sm:gap-5 pt-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-primary" />
            REPOSITORIO BIOFÍSICO · ACCESO ABIERTO
          </span>
        </div>
      </HeroShell>

      {/* Global Key Figures Bar — expansión a ancho completo */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 w-full text-left">
        <div className="p-3.5 sm:p-4 glass-enhance rounded-xl border border-outline-variant/15 space-y-1 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none relative">
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

        <div className="p-3.5 sm:p-4 glass-enhance rounded-xl border border-outline-variant/15 space-y-1 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none relative">
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

        <div className="p-3.5 sm:p-4 glass-enhance rounded-xl border border-outline-variant/15 space-y-1 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none relative">
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

        <div className="p-3.5 sm:p-4 glass-enhance rounded-xl border border-outline-variant/15 space-y-1 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none relative">
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
        className="sticky top-[var(--hero-nav-active-top,0px)] z-20 py-2 glass-enhance border-y border-outline-variant/15 -mx-3 sm:-mx-5 md:-mx-6 lg:-mx-8 xl:-mx-10 px-3 sm:px-5 md:px-6 lg:px-8 xl:px-10 transition-[top] duration-200 ease-out before:content-[''] before:absolute before:inset-0 before:bg-surface-dim/30 dark:before:bg-surface-dim/15 before:backdrop-blur-md before:z-[-1] before:pointer-events-none relative shadow-xs"
      >
        <div className="w-full">
          {/* Menú adaptativo: tira horizontal scrolleable fluida en móvil (<640px), grid 3 en tablet y 6 en desktop */}
          <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-6 items-center gap-1.5 sm:gap-2 w-full overflow-x-auto sm:overflow-visible no-scrollbar py-0.5 sm:py-0">
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
                  className={`shrink-0 sm:shrink min-w-[145px] sm:min-w-0 w-auto sm:w-full px-2.5 sm:px-2 lg:px-2.5 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center truncate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                    isActive
                      ? "bg-primary text-on-primary shadow-sm ring-1 ring-primary/20 font-extrabold"
                      : "glass-enhance border border-outline-variant/20 text-on-surface-variant hover:text-on-surface hover:border-outline-variant/40 bg-surface/50 dark:bg-zinc-800/40"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{mod.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* MODULE I: ESCALA Y SACRIFICIO EN VIVO */}
      {/* ========================================================================= */}
      <section className="space-y-3.5 sm:space-y-4 scroll-mt-16 sm:scroll-mt-[calc(var(--hero-nav-h,104px)+72px)]" id="slaughter_scale">
        <div className="space-y-2 border-l-2 border-red-500/60 pl-3.5 sm:pl-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono uppercase tracking-widest text-red-600 dark:text-red-400 font-bold bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
              Módulo I · Dinámica Cuantitativa de Sacrificio
            </span>
            <span className="text-[11px] font-mono text-on-surface-variant/70">
              FAOSTAT 2024 & Fishcount
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-on-surface">
            La Magnitud Temporal del Matadero
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-3xl leading-relaxed">
            Flujo cuantitativo de más de 80.000 millones de animales terrestres y billones de peces sacrificados cada año a escala global.
          </p>
          <div className="p-2.5 sm:p-3 rounded-xl bg-red-500/5 dark:bg-red-500/10 border border-red-500/20 text-xs text-on-surface-variant flex items-start gap-2.5">
            <span className="text-sm shrink-0">💡</span>
            <p className="leading-relaxed">
              <strong className="text-on-surface font-semibold">Idea clave:</strong> Cada segundo mueren más de 2.500 animales terrestres en mataderos comerciales (el 92% pollos). Si incluimos la pesca industrial y piscicultura, la cifra supera las 54.000 vidas sintientes por segundo.
            </p>
          </div>
        </div>

        <LiveSlaughterTicker />
        <SlaughterTimeSeriesChart />
      </section>

      {/* ========================================================================= */}
      {/* MODULE II: BIOLOGÍA Y CONFINAMIENTO EXTREMO */}
      {/* ========================================================================= */}
      <section className="space-y-3.5 sm:space-y-4 scroll-mt-16 sm:scroll-mt-[calc(var(--hero-nav-h,104px)+72px)]" id="anatomy_confinement">
        <div className="space-y-2 border-l-2 border-amber-500/60 pl-3.5 sm:pl-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 dark:text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Módulo II · Zootecnia y Arquitectura del Confinamiento
            </span>
            <span className="text-[11px] font-mono text-on-surface-variant/70">
              Zuidhof et al. 2014 & EFSA 2023
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-on-surface">
            Cuerpos Manipulados y Espacios Reducidos
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-3xl leading-relaxed">
            Metamorfosis artificial por selección zootécnica (1957—2025) y análisis bioespacial de privación de conductas instintivas en granjas intensivas.
          </p>
          <div className="p-2.5 sm:p-3 rounded-xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 text-xs text-on-surface-variant flex items-start gap-2.5">
            <span className="text-sm shrink-0">💡</span>
            <p className="leading-relaxed">
              <strong className="text-on-surface font-semibold">Idea clave:</strong> La selección artificial ha multiplicado por 4 el peso del pollo de engorde en solo 56 días, desplazando su centro de gravedad y colapsando su soporte locomotor, mientras que las normativas de confinamiento asignan a cada individuo un espacio inferior a un folio A4.
            </p>
          </div>
        </div>

        <BroilerAnatomyVisualizer />
        <MultiSpeciesConfinementVisualizer />
      </section>

      {/* ========================================================================= */}
      {/* MODULE III: CLIMA, SUELO Y BIODIVERSIDAD */}
      {/* ========================================================================= */}
      <section className="space-y-3.5 sm:space-y-4 scroll-mt-16 sm:scroll-mt-[calc(var(--hero-nav-h,104px)+72px)]" id="climate_ecology">
        <div className="space-y-2 border-l-2 border-emerald-500/60 pl-3.5 sm:pl-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Módulo III · Huella Ecológica y Extinción de Biomasa
            </span>
            <span className="text-[11px] font-mono text-on-surface-variant/70">
              Bar-On et al. (PNAS) & IPCC 2023
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-on-surface">
            Colapso de Ecosistemas y Ciclo de Vida
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-3xl leading-relaxed">
            Apropiación de la biosfera: el ganado representa el 60% de la biomasa de mamíferos terrestres, impulsa la deforestación y concentra gases de efecto invernadero.
          </p>
          <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 text-xs text-on-surface-variant flex items-start gap-2.5">
            <span className="text-sm shrink-0">💡</span>
            <p className="leading-relaxed">
              <strong className="text-on-surface font-semibold">Idea clave:</strong> El 60% de toda la biomasa de mamíferos terrestres del planeta es ganado criado para consumo, frente a un exiguo 4% de fauna silvestre. La ganadería explica más del 78% de la deforestación neta en la Amazonía y el Chaco.
            </p>
          </div>
        </div>

        <MammalBiomassVisualizer />
        <SupplyChainEmissionsChart />
        <DeforestationDriversVisualizer />
      </section>

      {/* ========================================================================= */}
      {/* MODULE IV: TERMODINÁMICA Y PÉRDIDA TRÓFICA */}
      {/* ========================================================================= */}
      <section className="space-y-3.5 sm:space-y-4 scroll-mt-16 sm:scroll-mt-[calc(var(--hero-nav-h,104px)+72px)]" id="trophic_thermodynamics">
        <div className="space-y-2 border-l-2 border-primary/60 pl-3.5 sm:pl-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary dark:text-emerald-400 font-bold bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
              Módulo IV · Balance Termodinámico y Suelo
            </span>
            <span className="text-[11px] font-mono text-on-surface-variant/70">
              Poore & Nemecek (Science 2018)
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-on-surface">
            La Ineficiencia Metabólica de la Pirámide Trófica
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-3xl leading-relaxed">
            La ganadería ocupa el 83% de las tierras agrarias mundiales pero suministra únicamente el 18% de las calorías y el 37% de las proteínas humanas consumidas.
          </p>
          <div className="p-2.5 sm:p-3 rounded-xl bg-primary/5 dark:bg-emerald-500/10 border border-primary/20 text-xs text-on-surface-variant flex items-start gap-2.5">
            <span className="text-sm shrink-0">💡</span>
            <p className="leading-relaxed">
              <strong className="text-on-surface font-semibold">Idea clave:</strong> La termodinámica impone una pérdida de disipación de entre el 85% y el 97% al transformar calorías vegetales en carne o leche. Si la humanidad adoptara dietas basadas en plantas, la superficie agraria global se reduciría en un 75% (el equivalente a EE. UU., China, la UE y Australia combinados).
            </p>
          </div>
        </div>

        <LandAndTrophicFlowVisualizer />
      </section>

      {/* ========================================================================= */}
      {/* MODULE V: SALUD PÚBLICA Y PANDEMIAS */}
      {/* ========================================================================= */}
      <section className="space-y-3.5 sm:space-y-4 scroll-mt-16 sm:scroll-mt-[calc(var(--hero-nav-h,104px)+72px)]" id="public_health">
        <div className="space-y-2 border-l-2 border-blue-500/60 pl-3.5 sm:pl-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-600 dark:text-blue-400 font-bold bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
              Módulo V · Bioseguridad y Resistencia Antimicrobiana
            </span>
            <span className="text-[11px] font-mono text-on-surface-variant/70">
              Van Boeckel et al. & OMS 2023
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-on-surface">
            El Coste Oculto para la Salud Humana
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-3xl leading-relaxed">
            Uso profiláctico masivo del 73% de los antibióticos mundiales en animales sanos, acelerando la selección de superbacterias resistentes y el riesgo zoonótico.
          </p>
          <div className="p-2.5 sm:p-3 rounded-xl bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 text-xs text-on-surface-variant flex items-start gap-2.5">
            <span className="text-sm shrink-0">💡</span>
            <p className="leading-relaxed">
              <strong className="text-on-surface font-semibold">Idea clave:</strong> Casi tres cuartas partes de los antibióticos producidos en el planeta se consumen en granjas intensivas como promotores de engorde y metafilaxis masiva en pienso y agua, agotando los fármacos de último recurso humano frente a infecciones intratables.
            </p>
          </div>
        </div>

        <AntibioticsPublicHealthVisualizer />
      </section>

      {/* ========================================================================= */}
      {/* MODULE VI: MATRIZ AMBIENTAL DE ALIMENTOS */}
      {/* ========================================================================= */}
      <section className="space-y-3.5 sm:space-y-4 scroll-mt-16 sm:scroll-mt-[calc(var(--hero-nav-h,104px)+72px)]" id="food_matrix">
        <div className="space-y-2 border-l-2 border-purple-500/60 pl-3.5 sm:pl-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono uppercase tracking-widest text-purple-600 dark:text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
              Módulo VI · Matriz Comparativa y Simulador Dietético
            </span>
            <span className="text-[11px] font-mono text-on-surface-variant/70">
              Science Meta-Analysis (Poore & Nemecek)
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-on-surface">
            Evaluación Multidimensional de Alimentos
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-3xl leading-relaxed">
            Metanálisis de Poore & Nemecek (Science 2018) estandarizado por 100 g de proteína: emisiones de GEI, uso de suelo, acidificación y eutrofización.
          </p>
          <div className="p-2.5 sm:p-3 rounded-xl bg-purple-500/5 dark:bg-purple-500/10 border border-purple-500/20 text-xs text-on-surface-variant flex items-start gap-2.5">
            <span className="text-sm shrink-0">💡</span>
            <p className="leading-relaxed">
              <strong className="text-on-surface font-semibold">Idea clave:</strong> Las diferencias de impacto biofísico entre alimentos de origen animal y vegetal son de órdenes de magnitud: producir 100 g de proteína vacuna genera hasta 50 veces más emisiones de GEI y requiere hasta 35 veces más tierra que producir 100 g de proteína a partir de legumbres o tofu.
            </p>
          </div>
        </div>

        <FoodEnvironmentalMatrix />
      </section>
    </div>
  );
});
