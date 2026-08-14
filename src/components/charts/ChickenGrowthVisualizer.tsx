import { useState } from "react";
import { motion } from "motion/react";
import { Activity, Bone, Link, Dna } from "lucide-react";
import { chickenPaths1957, chickenPaths1978, chickenPaths2005 } from "../../data/chickenAnatomyPaths";

interface SystemEvolution {
  title: string;
  description: string;
  badge?: string;
  badgeColor?: string;
}

interface ChickenYearData {
  year: number;
  weight: string;
  growthRate: string;
  daysToMarket: number;
  scale: number;
  heightCm: number;
  lengthCm: number;
  colorClass: string;
  textColor: string;
  bgHighlight: string;
  systems: {
    breast: SystemEvolution;
    joints: SystemEvolution;
    cardio: SystemEvolution;
  };
}

const YEARS = [1957, 1978, 2005] as const;
type YearType = typeof YEARS[number];

const dataByYear: Record<YearType, ChickenYearData> = {
  1957: {
    year: 1957,
    weight: "905 g",
    growthRate: "Base natural",
    daysToMarket: 84,
    scale: 0.60,
    heightCm: 25.2,
    lengthCm: 22.8,
    colorClass: "var(--ch2)",
    textColor: "text-amber-600 dark:text-amber-400",
    bgHighlight: "bg-amber-500/10 border-amber-500/20",
    systems: {
      breast: {
        title: "Proporción Natural",
        description: "Masa muscular magra equilibrada y funcional (aprox. 11% del peso total). El centro de gravedad está elevado y balanceado, permitiendo el vuelo corto y comportamiento natural.",
        badge: "Fisiología Estable",
        badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      },
      joints: {
        title: "Calcificación Completa",
        description: "Esqueleto robusto calcificado al ritmo de madurez biológica normal. Articulaciones y huesos del tarso sanos y esbeltos. Plena movilidad sin dolor ni deformidad.",
        badge: "Estructura Sana",
        badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      },
      cardio: {
        title: "Homeostasis Cardíaca",
        description: "Corazón y pulmones con tamaño y capacidad óptimos respecto al peso corporal. Presión arterial estable y flujo circulatorio sin anomalías congénitas.",
        badge: "Función Normal",
        badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
      }
    }
  },
  1978: {
    year: 1978,
    weight: "1.808 g",
    growthRate: "+100% de aumento",
    daysToMarket: 56,
    scale: 0.76,
    heightCm: 31.9,
    lengthCm: 28.9,
    colorClass: "var(--ch6)",
    textColor: "text-emerald-700 dark:text-emerald-400",
    bgHighlight: "bg-emerald-500/10 border-emerald-500/20",
    systems: {
      breast: {
        title: "Hipertrofia Moderada",
        description: "Inicio de la selección genética enfocada en el rendimiento cárnico. El músculo pectoral se duplica, comenzando a deponer el centro de gravedad del ave hacia el pecho.",
        badge: "Músculo Aumentado",
        badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400"
      },
      joints: {
        title: "Tensión Ósea Elevada",
        description: "Los huesos soportan el doble de masa en menos tiempo de desarrollo. Comienza a observarse fatiga mecánica en articulaciones y un ligero arqueamiento de las extremidades.",
        badge: "Tensión Mecánica",
        badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400"
      },
      cardio: {
        title: "Sobrecarga Compensada",
        description: "El corazón debe latir con mayor frecuencia y fuerza para oxigenar una masa muscular que se ha duplicado. Capacidad pulmonar al límite fisiológico superior.",
        badge: "Esfuerzo Elevado",
        badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400"
      }
    }
  },
  2005: {
    year: 2005,
    weight: "4.202 g",
    growthRate: "+364% de aumento",
    daysToMarket: 40,
    scale: 1.00,
    heightCm: 42.0,
    lengthCm: 38.0,
    colorClass: "var(--ch1)",
    textColor: "text-red-500 dark:text-red-400",
    bgHighlight: "bg-red-500/10 border-red-500/20",
    systems: {
      breast: {
        title: "Hipertrofia Extrema (+400%)",
        description: "Masa pectoral desmedida que impide al ave erguirse de forma natural. Las fibras musculares crecen tan rápido que carecen de riego capilar, necrosándose (pechuga de madera).",
        badge: "Miopatía Crónica",
        badgeColor: "bg-red-500/10 text-red-500"
      },
      joints: {
        title: "Colapso Mecánico Óseo",
        description: "Los huesos blandos y mal calcificados (debido a la rapidez del engorde) colapsan. Frecuente discondroplasia tibial y desviación varus/valgus (patas torcidas con dolor severo).",
        badge: "COLAPSO BIOLÓGICO",
        badgeColor: "bg-red-500/10 text-red-500 font-bold"
      },
      cardio: {
        title: "Fallo Cardíaco Congénito",
        description: "El ventrículo derecho se hipertrofia masivamente buscando irrigar el enorme pecho. La insuficiencia empuja suero fuera de los vasos al abdomen, causando ascitis (asfixia por ahogo interno).",
        badge: "Síndrome de Ascitis",
        badgeColor: "bg-red-500/10 text-red-500 font-bold"
      }
    }
  }
};

const anatomyPathsData = {
  1957: chickenPaths1957,
  1978: chickenPaths1978,
  2005: chickenPaths2005
};

export default function ChickenGrowthVisualizer() {
  const [activeSystem, setActiveSystem] = useState<"breast" | "joints" | "cardio">("joints");

  const systemsMeta = {
    breast: {
      label: "Masa Pectoral",
      icon: Dna,
      color: "var(--ch1)",
      textClass: "text-red-500"
    },
    joints: {
      label: "Esqueleto y Patas",
      icon: Bone,
      color: "#ef4444",
      textClass: "text-amber-500"
    },
    cardio: {
      label: "Aparato Circulatorio",
      icon: Activity,
      color: "#ef4444",
      textClass: "text-red-600"
    }
  };

  const ActiveIcon = systemsMeta[activeSystem].icon;

  const gridlineY = {
    "40cm": 17.8,
    "30cm": 57.1,
    "20cm": 96.4,
    "10cm": 135.7,
    "0cm": 175.0
  };

  return (
    <div className="w-full bg-zinc-50 dark:bg-zinc-900/40 p-5 md:p-6 rounded-xl border border-outline-variant/30 flex flex-col gap-6 relative overflow-hidden text-left animate-fade-in">
      <div className="border-b border-outline-variant/20 pb-4">
        <span className="text-[10px] font-mono tracking-widest text-primary/60 uppercase block mb-1">
          [ EVIDENCIA CIENTÍFICA · EXHIBIT I ]
        </span>
        <h4 className="text-xl font-heading font-bold text-on-surface">
          Comparación Anatómica y de Crecimiento del Pollo de Engorde
        </h4>
        <p className="text-xs text-on-surface-variant/70 mt-1 leading-relaxed">
          Haz clic en las pestañas o en las partes anatómicas de las ilustraciones para analizar la selección artificial. La escala de los bocetos está calculada mediante la <strong>raíz cúbica de sus pesos</strong> para representar con precisión el volumen tridimensional real del ave.
        </p>
      </div>

      <div 
        className="flex flex-wrap gap-1.5 p-1 bg-surface-dim/40 rounded-lg border border-outline-variant/15 w-fit"
        role="tablist"
        aria-label="Sistemas anatómicos"
      >
        {(Object.keys(systemsMeta) as Array<keyof typeof systemsMeta>).map((key) => {
          const sys = systemsMeta[key];
          const Icon = sys.icon;
          const isSelected = activeSystem === key;

          return (
            <button
              key={key}
              role="tab"
              aria-selected={isSelected}
              aria-controls={`panel-${key}`}
              id={`tab-${key}`}
              onClick={() => setActiveSystem(key)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                isSelected
                  ? "bg-primary text-on-primary shadow-sm"
                  : "hover:bg-surface-container/60 text-on-surface-variant"
              }`}
            >
              <Icon className="w-3.5 h-3.5" aria-hidden="true" />
              {sys.label}
            </button>
          );
        })}
      </div>

      {/* Responsive layout: flex-col on mobile, grid-cols-3 on md and up */}
      <div className="flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-4 items-stretch bg-zinc-200/20 dark:bg-zinc-950/40 rounded-xl p-4 md:p-6 border border-outline-variant/10 relative overflow-hidden">
        {YEARS.map((year) => {
          const chicken = dataByYear[year];
          const S = chicken.scale;
          const paths = anatomyPathsData[year];

          let hTopY = 175 - 165 * S;
          let wLeftX = 100 - (100 - 34) * S;
          let wRightX = 100 + ((year === 2005 ? 132 : year === 1978 ? 122 : 120) - 100) * S;

          return (
            <div key={year} className="flex flex-col items-center justify-between h-full relative group">
              <div className="text-center z-10 select-none mb-2">
                <span className="text-[10px] font-mono text-on-surface-variant/50 uppercase block font-bold">Año {year}</span>
                <span className={`text-sm font-mono font-bold tracking-tight block ${chicken.textColor}`}>
                  {chicken.weight}
                </span>
                <span className="text-[9px] font-mono text-on-surface-variant/60 block">
                  {chicken.growthRate}
                </span>
              </div>

              <div className="w-full aspect-square max-h-[220px] md:max-h-[260px] relative flex items-center justify-center overflow-visible">
                <svg 
                  viewBox="0 0 200 200" 
                  className="w-full h-full overflow-visible"
                  role="img"
                  aria-label={`Esquema anatómico del pollo en ${year}`}
                >
                  <defs>
                    <marker id="arrow-start" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="4" markerHeight="4" orient="auto">
                      <path d="M 10 0 L 0 5 L 10 10 Z" fill="var(--outline)" />
                    </marker>
                    <marker id="arrow-end" viewBox="0 0 10 10" refX="0" refY="5" markerWidth="4" markerHeight="4" orient="auto">
                      <path d="M 0 0 L 10 5 L 0 10 Z" fill="var(--outline)" />
                    </marker>
                  </defs>

                  <line x1="0" y1="175" x2="200" y2="175" stroke="var(--outline-variant)" strokeWidth="0.75" strokeDasharray="3 3" opacity={0.4} />
                  <line x1="0" y1={gridlineY["10cm"]} x2="200" y2={gridlineY["10cm"]} stroke="var(--outline-variant)" strokeWidth="0.5" strokeDasharray="3 3" opacity={0.2} />
                  <line x1="0" y1={gridlineY["20cm"]} x2="200" y2={gridlineY["20cm"]} stroke="var(--outline-variant)" strokeWidth="0.5" strokeDasharray="3 3" opacity={0.2} />
                  <line x1="0" y1={gridlineY["30cm"]} x2="200" y2={gridlineY["30cm"]} stroke="var(--outline-variant)" strokeWidth="0.5" strokeDasharray="3 3" opacity={0.2} />
                  <line x1="0" y1={gridlineY["40cm"]} x2="200" y2={gridlineY["40cm"]} stroke="var(--outline-variant)" strokeWidth="0.5" strokeDasharray="3 3" opacity={0.2} />

                  {year === 1957 && (
                    <g fontSize="8" fontFamily="monospace" className="fill-on-surface-variant/70 select-none hidden md:block" dominantBaseline="middle">
                      <text x="-10" y={gridlineY["40cm"]}>40cm</text>
                      <text x="-10" y={gridlineY["30cm"]}>30cm</text>
                      <text x="-10" y={gridlineY["20cm"]}>20cm</text>
                      <text x="-10" y={gridlineY["10cm"]}>10cm</text>
                      <text x="-10" y={gridlineY["0cm"]} className="fill-on-surface-variant/90 font-bold">0</text>
                    </g>
                  )}

                  <g transform={`translate(100, 175) scale(${S}) translate(-100, -175)`}>
                    
                    {/* Body Outline */}
                    <path
                      d={paths.body}
                      fill={year === 2005 ? "var(--ch1)" : year === 1978 ? "var(--ch6)" : "var(--ch2)"}
                      fillOpacity={activeSystem ? 0.05 : 0.1}
                      stroke={year === 2005 ? "var(--ch1)" : year === 1978 ? "var(--ch6)" : "var(--ch2)"}
                      strokeWidth="1.5"
                      className="transition-all duration-300"
                      opacity={activeSystem ? 0.4 : 0.9}
                    />

                    {/* Head Details */}
                    <path d={paths.head.comb} fill="#ef4444" stroke="#dc2626" strokeWidth="0.8" />
                    <path d={paths.head.wattle} fill="#ef4444" stroke="#dc2626" strokeWidth="0.8" />
                    <path d={paths.head.beak} fill="#f59e0b" stroke="#d97706" strokeWidth="0.8" />
                    <circle cx={paths.head.eye.cx} cy={paths.head.eye.cy} r={paths.head.eye.r} fill="var(--on-surface)" />
                    <path d={paths.wing} fill="none" stroke="var(--outline)" strokeWidth="0.8" opacity="0.6" />

                    {/* A. Breast Muscle (Realistic colors) */}
                    <motion.path
                      d={paths.breast}
                      fill={activeSystem === "breast" ? "#b91c1c" : "#fca5a5"} // Deep red vs light pink
                      fillOpacity={activeSystem === "breast" ? 0.7 : 0.15}
                      stroke="#7f1d1d"
                      strokeWidth={activeSystem === "breast" ? 1.5 : 0.5}
                      className="transition-all duration-300 cursor-pointer"
                      onClick={() => setActiveSystem("breast")}
                      animate={
                        activeSystem === "breast" && year === 2005
                          ? { fillOpacity: [0.6, 0.8, 0.6] }
                          : {}
                      }
                      transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* B. Skeleton (Realistic colors) */}
                    <g 
                      opacity={activeSystem === "joints" ? 1 : 0.25} 
                      className="transition-all duration-300 cursor-pointer"
                      onClick={() => setActiveSystem("joints")}
                    >
                      <motion.path
                        d={paths.skeleton.spine}
                        fill="none"
                        stroke={activeSystem === "joints" && year === 2005 ? "#dc2626" : "#d1d5db"} // Bone color or red if collapsing
                        strokeWidth={activeSystem === "joints" ? 2.5 : 1}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <motion.path
                        d={`${paths.skeleton.femur} ${paths.skeleton.tibia} ${paths.skeleton.metatarsus} ${paths.skeleton.digits}`}
                        fill="none"
                        stroke={activeSystem === "joints" && year === 2005 ? "#dc2626" : "#e5e7eb"} // Bone color or red
                        strokeWidth={activeSystem === "joints" ? 2.5 : 1}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeDasharray={activeSystem === "joints" && year === 2005 ? "4 2" : "none"} // Represents fracture/stress
                      />
                    </g>

                    {/* C. Circulatory / Heart (Realistic colors) */}
                    <g
                      className="transition-all duration-300 cursor-pointer"
                      onClick={() => setActiveSystem("cardio")}
                    >
                      <motion.path
                        d={paths.heart.main}
                        fill={activeSystem === "cardio" ? "#dc2626" : "#f87171"}
                        fillOpacity={activeSystem === "cardio" ? 0.9 : 0.3}
                        stroke="#991b1b"
                        strokeWidth={activeSystem === "cardio" ? 1.5 : 0.5}
                        animate={
                          activeSystem === "cardio"
                            ? { scale: year === 2005 ? [1, 1.15, 1] : year === 1978 ? [1, 1.08, 1] : [1, 1.04, 1] }
                            : {}
                        }
                        style={{ originX: paths.heart.main.split(" ")[1] + "px", originY: paths.heart.main.split(" ")[2] + "px" }}
                        transition={{ duration: year === 2005 ? 0.7 : year === 1978 ? 1.0 : 1.5, repeat: Infinity }}
                      />
                      {paths.heart.rv && (
                        <motion.path
                          d={paths.heart.rv}
                          fill="#991b1b"
                          fillOpacity={activeSystem === "cardio" ? 0.9 : 0.3}
                        />
                      )}
                      {paths.heart.ascites && activeSystem === "cardio" && (
                        <motion.path
                          d={paths.heart.ascites}
                          fill="#3b82f6"
                          fillOpacity={0.5}
                          stroke="#2563eb"
                          strokeWidth={1}
                          strokeDasharray="2 2"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                        />
                      )}
                    </g>
                  </g>

                  {/* Dimension Cotas */}
                  <g opacity="0.55" className="hidden md:block">
                    <line x1={185} y1={hTopY} x2={185} y2={175} stroke="var(--outline)" strokeWidth="0.75" markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)" />
                    <line x1={181} y1={hTopY} x2={189} y2={hTopY} stroke="var(--outline)" strokeWidth="0.75" />
                    <line x1={181} y1={175} x2={189} y2={175} stroke="var(--outline)" strokeWidth="0.75" />
                    <text x={191} y={hTopY + (175 - hTopY)/2 + 3} fontSize="9" className="font-mono font-bold fill-on-surface-variant/80 select-none">
                      {chicken.heightCm.toFixed(1)}cm
                    </text>
                  </g>

                  <g opacity="0.55" className="hidden md:block">
                    <line x1={wLeftX} y1={188} x2={wRightX} y2={188} stroke="var(--outline)" strokeWidth="0.75" markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)" />
                    <line x1={wLeftX} y1={184} x2={wLeftX} y2={192} stroke="var(--outline)" strokeWidth="0.75" />
                    <line x1={wRightX} y1={184} x2={wRightX} y2={192} stroke="var(--outline)" strokeWidth="0.75" />
                    <text x={wLeftX + (wRightX - wLeftX)/2} y={199} textAnchor="middle" fontSize="9" className="font-mono font-bold fill-on-surface-variant/80 select-none">
                      {chicken.lengthCm.toFixed(1)}cm
                    </text>
                  </g>
                </svg>
              </div>

              <div className="text-[10px] font-mono text-on-surface-variant/70 border-t border-outline-variant/10 pt-1.5 w-full text-center mt-2 z-10 select-none">
                Faenado: <strong className="text-on-surface">{chicken.daysToMarket} días</strong>
              </div>
            </div>
          );
        })}
      </div>

      <div 
        id={`panel-${activeSystem}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeSystem}`}
        className="flex flex-col md:grid md:grid-cols-3 gap-4"
      >
        {YEARS.map((year) => {
          const ch = dataByYear[year];
          const systemInfo = ch.systems[activeSystem];

          return (
            <div
              key={year}
              className={`p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between gap-3 ${
                year === 2005
                  ? "bg-red-500/[0.03] border-red-500/20"
                  : year === 1978
                  ? "bg-emerald-500/[0.03] border-emerald-500/20"
                  : "bg-amber-500/[0.03] border-amber-500/20"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-outline-variant/10 pb-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-on-surface-variant/60">
                    Año {year}
                  </span>
                  {systemInfo.badge && (
                    <span className={`text-[8.5px] font-mono px-2 py-0.5 rounded-full uppercase font-bold ${systemInfo.badgeColor}`}>
                      {systemInfo.badge}
                    </span>
                  )}
                </div>
                <h5 className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                  <ActiveIcon className={`w-3.5 h-3.5 ${ch.textColor}`} />
                  {systemInfo.title}
                </h5>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {systemInfo.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="space-y-1.5 pt-3 border-t border-outline-variant/15">
        <span className="text-[10px] font-mono uppercase tracking-wider text-on-surface-variant/70 block">
          Metodología, Escala y Fuentes
        </span>
        <div className="bg-surface-container/60 p-4 rounded-lg border border-outline-variant/15 flex flex-col gap-3">
          <p className="text-[10.5px] text-on-surface-variant leading-normal">
            <strong>Criterio Científico de Escala Volumétrica:</strong> Para representar visualmente a las aves sin distorsiones planas, la escala lineal de los bocetos se calcula en base a la <strong>raíz cúbica de la proporción de sus pesos corporales</strong> [S = S_base * ³√(Peso / Peso_base)], donde el año 2005 (peso de 4,202g) se toma como la escala máxima de referencia (1.00 de tamaño real, equivalente a una altura física de 42.0 cm).
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-outline-variant/10 pt-3">
            <p className="text-[10.5px] text-on-surface-variant leading-normal italic max-w-2xl text-left">
              Zuidhof, M. J. et al. (2014). Growth, efficiency, and yield of commercial broilers from 1957, 1978, and 2005. Poultry Science, 93(12), 2970-2982.
            </p>
            <a
              href="https://doi.org/10.3382/ps.2014-04291"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-mono text-link hover:underline flex items-center gap-1 shrink-0 font-bold"
            >
              <Link className="w-3 h-3" /> Poultry Science Journal
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
