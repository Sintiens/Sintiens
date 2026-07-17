import { motion } from "motion/react";
import { Database, Info, Compass, HelpCircle, Eye, ChevronDown, LineChart } from "lucide-react";
import AnimalsSlaughteredChart from "./charts/AnimalsSlaughteredChart";
import MeatConsumptionChart from "./charts/MeatConsumptionChart";
import DeforestationChart from "./charts/DeforestationChart";
import ChickenGrowthVisualizer from "./charts/ChickenGrowthVisualizer";
import CageSpaceVisualizer from "./charts/CageSpaceVisualizer";
import { TabType } from "./TabNav";
interface DataSectionProps {
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export default function DataSection({ activeTab, onNavigate, theme, onToggleTheme }: DataSectionProps) {
  return (
    <div id="data-section-view" className="space-y-16 w-full relative text-left">

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
            <LineChart
              className="text-zinc-900 dark:text-zinc-100 blur"
              style={{
                width: "clamp(144px, 45vw, 540px)",
                height: "clamp(144px, 45vw, 540px)",
                opacity: 0.12,
                strokeWidth: 1.5,
              }}
            />
          </div>

          <div className="flex-1 lg:flex-none flex flex-col justify-center items-center w-full">
            {/* Title and Subtitle Section */}
            <div className="space-y-2 lg:space-y-4 max-w-3xl w-full text-center relative z-10 mt-12 lg:mt-20">
              <span className="text-[10px] font-mono font-bold text-primary select-none tracking-[0.25em] uppercase block opacity-60">
                [ CIFRAS ]
              </span>
              <h1 className="text-[clamp(42px,8.5vw,80px)] font-bold tracking-tight font-heading leading-[1.05] text-on-background select-none">
                Cifras
              </h1>
              <p className="max-w-2xl mx-auto pt-1 font-serif italic font-light text-on-surface-variant/70 leading-relaxed text-[14px] sm:text-[16px] md:text-[18px] lg:text-[19px] text-center tracking-normal select-none">
                Cifras y gráficos de nuestra relación con los animales. Lo que el relato cuenta, aquí se ve.
              </p>
              <div className="flex items-center justify-center gap-6 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                  <LineChart className="w-3.5 h-3.5" />
                  5 GRÁFICOS
                </span>
                <span className="w-px h-4 bg-outline-variant/50" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                  <Database className="w-3.5 h-3.5" />
                  1957—2021
                </span>
                <span className="w-px h-4 bg-outline-variant/50" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5" />
                  4 ÁMBITOS
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Source Card */}
      <div className="glass-enhance border border-outline-variant/30 rounded-2xl p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none">
        <div className="md:col-span-8 space-y-4">
          <h4 className="text-technical-sm text-primary flex items-center gap-2 font-mono">
            <Database className="w-4 h-4" />
            DATOS CIENTÍFICOS Y METADATOS
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
            className="text-link hover:text-link/80 font-medium text-sm transition-colors font-mono"
          >
            Our World in Data (Universidad de Oxford)
          </a>
          <p className="text-xs text-on-surface-variant/60 mt-2 font-light leading-relaxed">
            Gráficos basados en informes globales sobre bienestar animal, agricultura y emisiones de gases de efecto invernadero.
          </p>
        </div>
      </div>

      {/* Exhibit Gallery - Staggered & Asymmetric Museum Layout */}
      <div className="space-y-24 relative z-10 px-3 md:px-0">

        {/* EXHIBIT I: Chicken Growth */}
        <section id="exhibit-chicken-growth" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start border-t border-outline-variant/20 pt-12">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono bg-primary/10 text-primary px-2.5 py-1 rounded-md font-bold">EXHIBIT I</span>
              <span className="text-[10px] font-mono text-on-surface-variant/60 uppercase tracking-widest">Biología evolutiva</span>
            </div>
            <h4 className="text-3xl font-heading font-bold text-on-surface">Domesticación Extrema e Ingeniería Genética</h4>
            <p className="text-[14.5px] leading-relaxed text-on-surface-variant font-light">
              La selección genética del pollo de engorde es el ejemplo más gráfico de cómo se moldea la biología animal. Al priorizar el crecimiento muscular por encima de la salud circulatoria y ósea, el mercado ha creado seres cuyos cuerpos colapsan bajo su propio peso.
            </p>
          </div>
          <div className="lg:col-span-5 lg:pt-6">
            <div className="p-4 rounded-xl bg-surface-dim/30 border border-outline-variant/15 flex gap-3 items-start">
              <Compass className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold text-on-surface uppercase block">Análisis Científico</span>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Investigaciones de la Universidad de Saskatchewan demuestran que, si no fueran sacrificados a los 40 días, la tasa de mortalidad por fallo cardíaco congénito (ascitis) en pollos modernos superaría el 80% antes de llegar a la madurez.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-12 mt-2">
            <ChickenGrowthVisualizer />
          </div>
        </section>

        {/* EXHIBIT II: Cage Confinement */}
        <section id="exhibit-cage-space" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-outline-variant/20 pt-12">
          <div className="lg:col-span-4 lg:order-last space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono bg-primary/10 text-primary px-2.5 py-1 rounded-md font-bold">EXHIBIT II</span>
              <span className="text-[10px] font-mono text-on-surface-variant/60 uppercase tracking-widest">Sistemas de confinamiento</span>
            </div>
            <h4 className="text-2xl font-heading font-bold text-on-surface">El Espacio Vital y el Hacinamiento Industrial</h4>
            <p className="text-[13.5px] leading-relaxed text-on-surface-variant font-light">
              Las gallinas ponedoras criadas en baterías pasan su vida en jaulas de alambre. Al no poder realizar comportamientos esenciales como abrir las alas o darse baños de polvo, sufren atrofia muscular severa y osteoporosis crónica por falta de movimiento.
            </p>
          </div>
          <div className="lg:col-span-8">
            <CageSpaceVisualizer />
          </div>
        </section>

        {/* EXHIBIT III: Animals Slaughtered */}
        <section id="exhibit-slaughtered" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-outline-variant/20 pt-12">
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono bg-primary/10 text-primary px-2.5 py-1 rounded-md font-bold">EXHIBIT III</span>
              <span className="text-[10px] font-mono text-on-surface-variant/60 uppercase tracking-widest">Escala global</span>
            </div>
            <h4 className="text-2xl font-heading font-bold text-on-surface">La Escala del Sacrificio</h4>
            <p className="text-[13.5px] leading-relaxed text-on-surface-variant font-light">
              Más de 74.000 millones de animales terrestres son sacrificados cada año para el consumo humano. La inmensa mayoría de este volumen está representado por aves domésticas, criadas en sistemas hiperconcentrados que optimizan la velocidad de procesado por encima del sufrimiento individual.
            </p>
            <div className="p-4 rounded-xl bg-surface-dim/30 border border-outline-variant/15 flex gap-3 items-start">
              <Eye className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold text-on-surface uppercase block">Perspectiva numérica</span>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Si representáramos cada animal terrestre sacrificado en un año como un segundo de tiempo, tardaríamos más de <strong>2.300 años</strong> de reproducción ininterrumpida en contarlos todos.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <AnimalsSlaughteredChart />
          </div>
        </section>

        {/* EXHIBIT IV: Meat Consumption & Thermodynamics */}
        <section id="exhibit-consumption" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-outline-variant/20 pt-12">
          <div className="lg:col-span-4 lg:order-last space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono bg-primary/10 text-primary px-2.5 py-1 rounded-md font-bold">EXHIBIT IV</span>
              <span className="text-[10px] font-mono text-on-surface-variant/60 uppercase tracking-widest">Termodinámica alimentaria</span>
            </div>
            <h4 className="text-2xl font-heading font-bold text-on-surface">Crecimiento del Consumo e Ineficiencia Energética</h4>
            <p className="text-[13.5px] leading-relaxed text-on-surface-variant font-light">
              El consumo per cápita se ha multiplicado exponencialmente, sobre todo en economías de rápido crecimiento. Nutrirnos a través de animales es energéticamente ineficiente: la mayor parte del pienso que consume el ganado se disipa en su propio metabolismo básico en lugar de transformarse en masa muscular.
            </p>
            <div className="p-4 rounded-xl bg-surface-dim/30 border border-outline-variant/15 flex gap-3 items-start">
              <Compass className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold text-on-surface uppercase block">Pérdida trófica</span>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Por cada 100 kcal de soja cultivada para el ganado bovino, solo se recuperan 2-3 kcal. El 97% restante se disipa termodinámicamente. Esto nos obliga a deforestar y cultivar vastas áreas de tierra solo para alimentar intermediarios.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8">
            <MeatConsumptionChart />
          </div>
        </section>

        {/* EXHIBIT V: Deforestation */}
        <section id="exhibit-deforestation" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-outline-variant/20 pt-12 pb-12">
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono bg-primary/10 text-primary px-2.5 py-1 rounded-md font-bold">EXHIBIT V</span>
              <span className="text-[10px] font-mono text-on-surface-variant/60 uppercase tracking-widest">Externalidades ecológicas</span>
            </div>
            <h4 className="text-2xl font-heading font-bold text-on-surface">Motores de la Deforestación y Pérdida de Biodiversidad</h4>
            <p className="text-[13.5px] leading-relaxed text-on-surface-variant font-light">
              La ganadería vacuna extensiva y los monocultivos de soja (destinados a piensos) son los principales responsables de la tala y quema de bosques tropicales. La destrucción de la selva amazónica no responde a la alimentación humana directa, sino a sostener una cabaña ganadera global insostenible.
            </p>
          </div>
          <div className="lg:col-span-8">
            <DeforestationChart />
          </div>
        </section>

      </div>

      {/* Espaciador final para scroll */}
      <div className="h-32" />
    </div>
  );
}
