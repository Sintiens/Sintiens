import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Info, ShieldAlert, Users, Layers, Activity, ChevronRight, Beaker } from "lucide-react";

interface AreaItem {
  id: string;
  name: string;
  areaCm2: number;
  widthCm: number;
  heightCm: number;
  widthPx: number; // 1 cm = 6 px
  heightPx: number; 
  color: string;
  highlightColor: string;
  textColor: string;
  description: string;
  multiplier: string;
}

const areaData: AreaItem[] = [
  {
    id: "battery",
    name: "Jaula de Batería (Espacio por Ley)",
    areaCm2: 450,
    widthCm: 20.0,
    heightCm: 22.5,
    widthPx: 120,
    heightPx: 135,
    color: "stroke-red-500 fill-red-500/5 dark:fill-red-500/15",
    highlightColor: "stroke-red-500 fill-red-500/15 dark:fill-red-500/25",
    textColor: "text-red-500 dark:text-red-400",
    description: "Espacio vital asignado por ley a cada gallina en jaulas convencionales. Al ser menor que el propio cuerpo del animal, le impide estirarse sin rozar los alambres metálicos.",
    multiplier: "Base de Confinamiento"
  },
  {
    id: "stand",
    name: "Espacio Mínimo para Pararse",
    areaCm2: 475,
    widthCm: 21.2,
    heightCm: 22.4,
    widthPx: 127,
    heightPx: 134,
    color: "stroke-orange-500/50 fill-orange-500/[0.02]",
    highlightColor: "stroke-orange-500 fill-orange-500/10",
    textColor: "text-orange-500 dark:text-orange-400",
    description: "El espacio mínimo estricto que ocupa el cuerpo del ave de pie en postura estática. Apenas cubre su propia silueta física.",
    multiplier: "1.05x Jaula"
  },
  {
    id: "a4",
    name: "Hoja de Papel A4 (Referencia)",
    areaCm2: 620,
    widthCm: 21.0,
    heightCm: 29.7,
    widthPx: 126,
    heightPx: 178,
    color: "stroke-zinc-400 dark:stroke-zinc-600 fill-zinc-400/[0.02] dark:fill-zinc-600/[0.02]",
    highlightColor: "stroke-zinc-400 dark:stroke-zinc-500 fill-zinc-400/10",
    textColor: "text-zinc-500 dark:text-zinc-400",
    description: "El tamaño estándar de un folio A4. Sirve como comparación física para visualizar el espacio que tiene el animal.",
    multiplier: "1.38x Jaula"
  },
  {
    id: "feathers",
    name: "Espacio para Acicalarse las Plumas",
    areaCm2: 1150,
    widthCm: 34.0,
    heightCm: 34.0,
    widthPx: 204,
    heightPx: 204,
    color: "stroke-amber-500/50 fill-amber-500/[0.02]",
    highlightColor: "stroke-amber-500 fill-amber-500/10",
    textColor: "text-amber-600 dark:text-amber-400",
    description: "El área necesaria para realizar el estiramiento y limpieza del plumaje. Indispensable para evitar infecciones y heridas.",
    multiplier: "2.55x Jaula"
  },
  {
    id: "turn",
    name: "Espacio para Darse la Vuelta",
    areaCm2: 1271,
    widthCm: 35.6,
    heightCm: 35.6,
    widthPx: 214,
    heightPx: 214,
    color: "stroke-blue-500/50 fill-blue-500/[0.02]",
    highlightColor: "stroke-blue-500 fill-blue-500/10",
    textColor: "text-blue-500 dark:text-blue-400",
    description: "Espacio que requiere el ave para girar 180° sobre su eje. En la jaula de batería, el giro causa colisiones continuas.",
    multiplier: "2.82x Jaula"
  },
  {
    id: "wings",
    name: "Espacio para Extender las Alas",
    areaCm2: 1876,
    widthCm: 43.3,
    heightCm: 43.3,
    widthPx: 260,
    heightPx: 260,
    color: "stroke-emerald-500/50 fill-emerald-500/[0.02]",
    highlightColor: "stroke-emerald-500 fill-emerald-500/10",
    textColor: "text-emerald-500 dark:text-emerald-400",
    description: "Envergadura alar completa. Aletear es crucial para mantener la densidad ósea y evitar la atrofia muscular crónica.",
    multiplier: "4.17x Jaula"
  }
];

interface LawPreset {
  id: string;
  name: string;
  areaCm2: number;
  highlightId: string;
  region: string;
  status: string;
  badge: string;
  scoreText: string;
  scoreColor: string;
  details: string;
}

const lawPresets: LawPreset[] = [
  {
    id: "global",
    name: "Estándar Convencional",
    areaCm2: 450,
    highlightId: "battery",
    region: "Asia, América Latina e Internacional",
    status: "Jaula de Batería Común",
    badge: "Crítico (1/10)",
    scoreText: "text-red-500 bg-red-500/10 border-red-500/20",
    scoreColor: "bg-red-500",
    details: "Estándar comercial en la mayoría del planeta. Obliga a las aves a estar apretadas permanentemente sin espacio para caminar."
  },
  {
    id: "ue",
    name: "Unión Europea",
    areaCm2: 750,
    highlightId: "a4",
    region: "UE (Directiva 1999/74/CE)",
    status: "Jaula Enriquecida Obligatoria",
    badge: "Insuficiente (3/10)",
    scoreText: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    scoreColor: "bg-amber-500",
    details: "Prohibió la jaula convencional en 2012. Exige perchas, nido y yacija. Ofrece un espacio similar a un folio A4 por ave, impidiendo aún el aleteo."
  },
  {
    id: "california",
    name: "California (Prop 12)",
    areaCm2: 1000,
    highlightId: "feathers",
    region: "Estados de EE.UU. en Suelo",
    status: "Libre de Jaulas (Cage-Free)",
    badge: "Aceptable (6/10)",
    scoreText: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    scoreColor: "bg-emerald-500",
    details: "Prohíbe el encierro en jaula. Las gallinas viven sueltas en suelo con libertad de caminar y aletear, aunque en galpones de alta densidad."
  }
];

const clinicalData = {
  osteoporosis: {
    title: "Osteoporosis Severa",
    desc: "Al no poder aletear ni ejercitar sus músculos (requiere 1876 cm²), los huesos pierden densidad drásticamente. Hasta el 30% de las gallinas en baterías sufren fracturas óseas antes de ir al matadero."
  },
  feathers: {
    title: "Abrasión y Pérdida de Plumaje",
    desc: "El roce constante contra los alambres metálicos de la jaula (22.5 cm) arranca las plumas del cuello y la cola, exponiendo la piel desnuda a heridas e infecciones."
  },
  crowding: {
    title: "Mutilación Sistémica (Debeaking)",
    desc: "La imposibilidad de escapar del estrés colectivo desata histeria y canibalismo. Para evitar que las aves se maten a picotazos, la industria les amputa el tercio frontal del pico sin anestesia a los pocos días de nacer."
  }
};

function Hen({ extended, heatMap, className }: { extended: boolean; heatMap?: "full" | "comb" | "tail" | "wings"; className?: string }) {
  const strokeColor = "currentColor";
  const strokeWidth = 1.5;

  return (
    <g className={className}>
      {/* Heatmap Glows */}
      {heatMap && (
        <g opacity="0.6">
          {(heatMap === "full" || heatMap === "comb") && <circle cx="0" cy="-60" r="24" fill="url(#redGlow)" />}
          {(heatMap === "full" || heatMap === "tail") && <circle cx="0" cy="95" r="30" fill="url(#redGlow)" />}
          {(heatMap === "full" || heatMap === "wings") && !extended && (
            <>
              <ellipse cx="-40" cy="20" rx="20" ry="40" fill="url(#redGlow)" />
              <ellipse cx="40" cy="20" rx="20" ry="40" fill="url(#redGlow)" />
            </>
          )}
        </g>
      )}

      {extended ? (
        <g>
          <path 
            d="M -30 -35 
               C -80 -45, -150 -35, -210 -25 C -190 -5, -130 15, -50 5
               C -45 25, -35 60, -25 80
               L -15 100 L 0 105 L 15 100 L 25 80
               C 35 60, 45 25, 50 5
               C 130 15, 190 -5, 210 -25 C 150 -35, 80 -45, 30 -35
               C 20 -45, 10 -50, 0 -50 C -10 -50, -20 -45, -30 -35 Z" 
            fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round"
          />
          <path d="M -30 -25 L -100 -10 M -35 -15 L -120 0 M -40 -5 L -90 10" stroke={strokeColor} strokeWidth={0.8} opacity={0.5} strokeDasharray="2 2" />
          <path d="M 30 -25 L 100 -10 M 35 -15 L 120 0 M 40 -5 L 90 10" stroke={strokeColor} strokeWidth={0.8} opacity={0.5} strokeDasharray="2 2" />
          
          <circle cx="0" cy="-60" r="14" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d="M -6 -72 L 0 -85 L 6 -72 Z" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <path d="M -3 -50 C -6 -60, 6 -60, 3 -50" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
        </g>
      ) : (
        <g>
          <path 
            d="M -20 -45 
               C -45 -25, -54 -10, -54 15
               C -54 40, -40 65, -25 80
               L -15 100 L 0 105 L 15 100 L 25 80
               C 40 65, 54 40, 54 15
               C 54 -10, 45 -25, 20 -45
               C 10 -52, -10 -52, -20 -45 Z" 
            fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round"
          />
          <path d="M -25 -20 C -45 5, -40 40, -25 60" fill="none" stroke={strokeColor} strokeWidth={1} opacity={0.6} strokeDasharray="3 3" />
          <path d="M 25 -20 C 45 5, 40 40, 25 60" fill="none" stroke={strokeColor} strokeWidth={1} opacity={0.6} strokeDasharray="3 3" />
          
          <circle cx="0" cy="-60" r="14" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
          <path d="M -6 -72 L 0 -85 L 6 -72 Z" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" />
          <path d="M -3 -50 C -6 -60, 6 -60, 3 -50" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
        </g>
      )}
    </g>
  );
}

export default function CageSpaceVisualizer() {
  const [narrativeStep, setNarrativeStep] = useState<0 | 1 | 2>(0);
  const [activeView, setActiveView] = useState<"individual" | "crowding">("individual");
  const [selectedId, setSelectedId] = useState<string>("battery");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeLawId, setActiveLawId] = useState<string>("global");
  const [henCount, setHenCount] = useState<number>(6); 

  const activeId = hoveredId || selectedId;
  const foundItem = areaData.find((d) => d.id === activeId);
  const activeItem: AreaItem = foundItem ?? areaData[0]!;
  const foundLaw = lawPresets.find((l) => l.id === activeLawId);
  const currentLaw: LawPreset = foundLaw ?? lawPresets[0]!;

  const activeW = activeItem.widthPx;
  const activeH = activeItem.heightPx;
  const viewBox = "0 0 500 500";

  const totalCommercialArea = 3600; // 60x60 cm
  const cagePx = 360; 
  const individualAreaCommercial = Math.round(totalCommercialArea / henCount);

  const handleLawSelect = (lawId: string, highlightId: string) => {
    setActiveLawId(lawId);
    setSelectedId(highlightId);
  };

  const getHenPositions = (count: number) => {
    const offsets = [
      { dx: 250, dy: 250, scale: 0.9 },
      { dx: 180, dy: 180, scale: 0.9 },
      { dx: 320, dy: 320, scale: 0.9 },
      { dx: 180, dy: 320, scale: 0.9 },
      { dx: 320, dy: 180, scale: 0.9 },
      { dx: 250, dy: 170, scale: 0.9 },
      { dx: 250, dy: 330, scale: 0.9 },
      { dx: 160, dy: 250, scale: 0.9 },
      { dx: 340, dy: 250, scale: 0.9 }
    ];
    return offsets.slice(0, count);
  };

  const nextStep = () => {
    if (narrativeStep === 0) {
      setNarrativeStep(1);
      setActiveView("crowding");
    } else if (narrativeStep === 1) {
      setNarrativeStep(2);
      setActiveView("individual");
    }
  };

  let currentHeatMap: "full" | "comb" | "tail" | "wings" | undefined = undefined;
  if (activeView === "individual" && activeItem.areaCm2 < 1876) currentHeatMap = "wings";
  if (activeView === "individual" && activeItem.id === "battery") currentHeatMap = "full";
  if (activeView === "crowding" && henCount >= 6) currentHeatMap = "full";

  return (
    <div className="w-full bg-zinc-50 dark:bg-zinc-900/40 p-6 rounded-xl border border-outline-variant/30 flex flex-col gap-6 relative overflow-hidden text-left">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/20 pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-primary/60 uppercase block mb-1">
            [ EVIDENCIA CIENTÍFICA · EXHIBIT II ]
          </span>
          <h4 className="text-lg font-heading font-bold text-on-surface">
            Simulador Espacial de Confinamiento
          </h4>
        </div>

        {/* View Mode Tabs (Only unlocked in Step 2) */}
        {narrativeStep === 2 && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="flex bg-surface-dim p-1 rounded-lg border border-outline-variant/30 text-xs font-mono"
          >
            <button
              onClick={() => setActiveView("individual")}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                activeView === "individual" ? "bg-primary text-on-primary font-bold" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <Layers className="w-3.5 h-3.5 inline mr-1" /> Área Individual
            </button>
            <button
              onClick={() => setActiveView("crowding")}
              className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                activeView === "crowding" ? "bg-primary text-on-primary font-bold" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <Users className="w-3.5 h-3.5 inline mr-1" /> Hacinamiento Comercial
            </button>
          </motion.div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Interactive SVG Diagram */}
        <div className="lg:col-span-7 bg-zinc-200/20 dark:bg-zinc-950/40 rounded-xl p-4 flex flex-col items-center justify-center min-h-[420px] relative border border-outline-variant/10 overflow-hidden">
          
          <div className="absolute top-3 left-3 text-[10px] font-mono text-on-surface-variant/60 uppercase select-none flex items-center gap-1.5 z-10 bg-surface/50 backdrop-blur-sm px-2 py-1 rounded">
            {narrativeStep < 2 ? (
              <span className="flex items-center gap-1.5 text-primary"><Activity className="w-3.5 h-3.5" /> Secuencia Narrativa</span>
            ) : (
              <span className="flex items-center gap-1.5"><Info className="w-3.5 h-3.5" /> Explorador Interactivo</span>
            )}
          </div>

          <div className="w-full max-w-[480px] aspect-square relative flex items-center justify-center mt-4">
            
            <svg viewBox={viewBox} className="w-full h-full transition-all duration-300">
              <defs>
                <radialGradient id="redGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                </radialGradient>
                <pattern id="physicalGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-zinc-400/20 dark:text-zinc-600/20" />
                </pattern>
              </defs>

              <rect width="100%" height="100%" fill="url(#physicalGrid)" />

              {activeView === "individual" ? (
                <g>
                  <g className="pointer-events-none opacity-90 dark:opacity-95 text-zinc-800 dark:text-zinc-300">
                    <g transform="translate(250, 250)">
                      <Hen extended={activeItem.id === "wings"} heatMap={currentHeatMap} />
                    </g>
                    {activeItem.id === "battery" && (
                      <g>
                        <circle cx="250" cy="158" r="7" fill="none" stroke="#ef4444" strokeWidth="1.5" className="animate-pulse" />
                        <circle cx="250" cy="352" r="7" fill="none" stroke="#ef4444" strokeWidth="1.5" className="animate-pulse" />
                        <path d="M 250 158 L 250 182.5 M 250 352 L 250 317.5" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 2" />
                      </g>
                    )}
                  </g>

                  {[...areaData].reverse().map((item) => {
                    const isSelected = selectedId === item.id;
                    const isHovered = hoveredId === item.id;
                    const isActive = isSelected || isHovered;

                    const opacityClass = narrativeStep === 0 && item.id !== "battery" ? "opacity-20" : "opacity-100";

                    const borderClass = isActive 
                      ? "stroke-primary stroke-[2.5]" 
                      : "stroke-zinc-300 dark:stroke-zinc-800 hover:stroke-zinc-500 dark:hover:stroke-zinc-700";

                    const bgFill = isSelected || isHovered ? item.highlightColor : item.color;

                    return (
                      <rect
                        key={item.id}
                        x={250 - item.widthPx / 2}
                        y={250 - item.heightPx / 2}
                        width={item.widthPx}
                        height={item.heightPx}
                        rx={item.id === "a4" ? "0" : "4"}
                        className={`cursor-pointer transition-all duration-200 ${bgFill} ${borderClass} ${opacityClass}`}
                        style={{
                          strokeDasharray: item.id === "a4" ? "4 4" : "0",
                          pointerEvents: narrativeStep < 2 ? 'none' : 'auto'
                        }}
                        onMouseEnter={() => setHoveredId(item.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onClick={() => {
                          if (narrativeStep === 2) setSelectedId(item.id);
                        }}
                      />
                    );
                  })}

                  <g className="pointer-events-none">
                    <line x1={250 - activeW / 2} y1={250 - activeH / 2 - 12} x2={250 + activeW / 2} y2={250 - activeH / 2 - 12} stroke="var(--primary)" strokeWidth="1" opacity={0.7} />
                    <line x1={250 - activeW / 2} y1={250 - activeH / 2 - 16} x2={250 - activeW / 2} y2={250 - activeH / 2 - 8} stroke="var(--primary)" strokeWidth="1" opacity={0.7} />
                    <line x1={250 + activeW / 2} y1={250 - activeH / 2 - 16} x2={250 + activeW / 2} y2={250 - activeH / 2 - 8} stroke="var(--primary)" strokeWidth="1" opacity={0.7} />
                    <text x="250" y={250 - activeH / 2 - 18} textAnchor="middle" className="text-[9.5px] font-mono font-bold fill-primary">
                      {activeItem.widthCm.toFixed(1)} cm
                    </text>

                    <line x1={250 - activeW / 2 - 12} y1={250 - activeH / 2} x2={250 - activeW / 2 - 12} y2={250 + activeH / 2} stroke="var(--primary)" strokeWidth="1" opacity={0.7} />
                    <line x1={250 - activeW / 2 - 16} y1={250 - activeH / 2} x2={250 - activeW / 2 - 8} y2={250 - activeH / 2} stroke="var(--primary)" strokeWidth="1" opacity={0.7} />
                    <line x1={250 - activeW / 2 - 16} y1={250 + activeH / 2} x2={250 - activeW / 2 - 8} y2={250 + activeH / 2} stroke="var(--primary)" strokeWidth="1" opacity={0.7} />
                    
                    <g transform={`translate(${250 - activeW / 2 - 18}, 250) rotate(-90)`}>
                      <text x="0" y="4" textAnchor="middle" className="text-[9.5px] font-mono font-bold fill-primary">
                        {activeItem.heightCm.toFixed(1)} cm
                      </text>
                    </g>
                  </g>
                </g>
              ) : (
                <g>
                  <rect
                    x={250 - cagePx / 2}
                    y={250 - cagePx / 2}
                    width={cagePx}
                    height={cagePx}
                    rx="6"
                    className="fill-red-500/[0.02] stroke-red-500 stroke-[2] shadow-inner"
                  />

                  {getHenPositions(henCount).map((pos, idx) => (
                    <motion.g
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 0.6, scale: pos.scale }}
                      transition={{ delay: idx * 0.05 }}
                      transform={`translate(${pos.dx}, ${pos.dy})`}
                      className="text-red-700 dark:text-red-400"
                    >
                      <Hen extended={false} heatMap={currentHeatMap} />
                    </motion.g>
                  ))}

                  <g className="pointer-events-none text-red-500/50">
                    <line x1={250 - cagePx / 2} y1={250 - cagePx / 2 - 10} x2={250 + cagePx / 2} y2={250 - cagePx / 2 - 10} stroke="currentColor" strokeWidth="1" />
                    <line x1={250 - cagePx / 2} y1={250 - cagePx / 2 - 14} x2={250 - cagePx / 2} y2={250 - cagePx / 2 - 6} stroke="currentColor" strokeWidth="1" />
                    <line x1={250 + cagePx / 2} y1={250 - cagePx / 2 - 14} x2={250 + cagePx / 2} y2={250 - cagePx / 2 - 6} stroke="currentColor" strokeWidth="1" />
                    <text x="250" y={250 - cagePx / 2 - 16} textAnchor="middle" className="text-[9px] font-mono font-bold fill-red-500">60.0 cm</text>
                    
                    <g transform={`translate(${250 - cagePx / 2 - 16}, 250) rotate(-90)`}>
                      <text x="0" y="4" textAnchor="middle" className="text-[9px] font-mono font-bold fill-red-500">60.0 cm</text>
                    </g>
                  </g>
                </g>
              )}
            </svg>

            {activeView === "individual" && activeItem.id === "battery" && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-3 left-3 right-3 bg-red-500/90 text-white text-[9px] font-mono font-bold px-2 py-1.5 rounded shadow flex items-center justify-center gap-1.5 z-30 text-center"
              >
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>EL CUERPO DEL AVE (32 cm) EXCEDE EL LARGO DE LA JAULA (22.5 cm)</span>
              </motion.div>
            )}
          </div>

          <div className="w-full flex justify-between mt-4 pt-4 border-t border-outline-variant/10 text-[9.5px] font-mono text-on-surface-variant/80">
            <div>Anatomía Gallina: <span className="text-on-surface font-bold">32 x 18 cm</span></div>
            <div>Cuadrícula física: <span className="text-on-surface font-bold">5 cm</span></div>
            <div>Escala: <span className="text-primary font-bold">1 cm = 6 px</span></div>
          </div>
        </div>

        {/* Ficha Científica / Interactive Explorer Column */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6 bg-surface-dim/40 p-5 rounded-xl border border-outline-variant/20 relative">
          
          {/* NARRATIVE STEP OVERLAYS */}
          {narrativeStep < 2 && (
            <div className="absolute inset-0 bg-surface-dim/95 backdrop-blur-md rounded-xl z-20 p-6 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {narrativeStep === 0 && (
                  <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-500 text-xs font-mono font-bold rounded-full border border-red-500/20">
                      <span>Paso 1 de 2</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-on-surface mb-3">La Paradoja Física</h3>
                      <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                        La ley global establece un espacio de <strong>450 cm²</strong> por gallina ponedora (Jaula de batería).
                      </p>
                      <div className="bg-red-500/[0.05] border border-red-500/20 p-4 rounded-lg space-y-2">
                        <p className="text-[13px] text-on-surface font-medium leading-relaxed">
                          Físicamente, el largo de una gallina promedio es de 32 cm, pero la profundidad de su área asignada es de solo 22.5 cm. 
                        </p>
                        <p className="text-[13px] text-on-surface-variant italic font-light">
                          Mira el diagrama a la izquierda. La gallina tiene que vivir de por vida con el cuello torcido y la cola aplastada contra los barrotes.
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={nextStep}
                      className="w-full py-3 bg-primary text-on-primary font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors cursor-pointer"
                    >
                      Continuar <ChevronRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

                {narrativeStep === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-xs font-mono font-bold rounded-full border border-primary/20">
                      <span>Paso 2 de 2</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-on-surface mb-3">El Hacinamiento Real</h3>
                      <p className="text-sm text-on-surface-variant leading-relaxed mb-4">
                        La industria no utiliza jaulas individuales para ahorrar costes de infraestructura.
                      </p>
                      <div className="bg-surface border border-outline-variant/30 p-4 rounded-lg space-y-2">
                        <p className="text-[13px] text-on-surface font-medium leading-relaxed">
                          Encierran entre 6 y 9 gallinas juntas en una jaula de 60x60 cm. 
                        </p>
                        <p className="text-[13px] text-on-surface-variant italic font-light">
                          Esto significa que el espacio individual teórico ni siquiera está vacío. Las aves se pisan unas a otras, no pueden girar, y el estrés desata canibalismo forzando la mutilación de sus picos.
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={nextStep}
                      className="w-full py-3 bg-primary text-on-primary font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors cursor-pointer"
                    >
                      Abrir Explorador Interactivo <Beaker className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* EXPLORER CONTENT */}
          <div className={`space-y-4 transition-opacity duration-500 ${narrativeStep < 2 ? 'opacity-10 blur-sm pointer-events-none' : 'opacity-100'}`}>
            
            {activeView === "individual" ? (
              <div className="space-y-4">
                <h5 className="text-[11px] font-mono uppercase tracking-wider text-primary font-bold flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  Área Individual y Anatomía
                </h5>

                <div className="space-y-1.5">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-on-surface-variant/70 block">
                    Comportamientos y Áreas (Dawkins & Hardie 1989)
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {areaData.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSelectedId(item.id)}
                        className={`px-2 py-1 rounded text-[9.5px] font-mono transition-all cursor-pointer ${
                          activeId === item.id
                            ? "bg-primary text-on-primary font-bold"
                            : "bg-surface hover:bg-surface-dim border border-outline-variant/20 text-on-surface-variant"
                        }`}
                      >
                        {item.areaCm2} cm²
                      </button>
                    ))}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="bg-surface-container/30 border border-outline-variant/15 p-3 rounded-lg space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <h6 className="text-xs font-bold text-on-surface font-sans">{activeItem.name}</h6>
                      <span className="text-[10px] font-mono text-primary font-bold">{activeItem.multiplier}</span>
                    </div>
                    <div className="text-lg font-mono font-bold text-on-surface">{activeItem.areaCm2} cm²</div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {activeItem.description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  {activeItem.areaCm2 < 1876 && (
                    <motion.div 
                      key={`clinical-${activeItem.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-red-500/[0.03] border border-red-500/15 p-3 rounded-lg flex gap-2 items-start overflow-hidden"
                    >
                      <Activity className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <span className="text-[9px] font-mono uppercase tracking-wider text-red-500 font-bold">
                          {activeItem.id === "battery" || activeItem.id === "stand" 
                            ? clinicalData.feathers.title 
                            : clinicalData.osteoporosis.title}
                        </span>
                        <p className="text-[11px] leading-relaxed text-on-surface-variant font-sans">
                          {activeItem.id === "battery" || activeItem.id === "stand" 
                            ? clinicalData.feathers.desc 
                            : clinicalData.osteoporosis.desc}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="space-y-4">
                <h5 className="text-[11px] font-mono uppercase tracking-wider text-primary font-bold flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  Hacinamiento Comercial
                </h5>

                <div className="space-y-2">
                  <h6 className="text-xs font-bold text-on-surface font-sans">
                    Espacio Compartido en Grupo
                  </h6>
                  <p className="text-[11.5px] text-on-surface-variant leading-relaxed">
                    Las leyes definen un espacio individual mínimo de 450 cm². Sin embargo, en las granjas intensivas, se agrupan de <strong>6 a 9 aves</strong> dentro de una única jaula colectiva (60x60 cm).
                  </p>
                </div>

                <div className="bg-surface-dim p-3 rounded-lg border border-outline-variant/25 space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-on-surface-variant">Gallinas en la jaula:</span>
                    <span className="font-bold text-primary">{henCount} aves</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="9"
                    value={henCount}
                    onChange={(e) => setHenCount(parseInt(e.target.value))}
                    className="w-full accent-primary h-1 bg-zinc-300 dark:bg-zinc-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] font-mono text-on-surface-variant/50">
                    <span>1</span>
                    <span>5</span>
                    <span>9 (Extremo)</span>
                  </div>
                </div>

                <div className="bg-red-500/[0.03] border border-red-500/15 p-3 rounded-lg space-y-2">
                  <div className="flex items-center gap-1.5">
                    <Activity className="w-4 h-4 text-red-500 shrink-0" />
                    <span className="text-[9px] font-mono uppercase tracking-wider text-red-500 font-bold">
                      Datos Clínicos del Hacinamiento
                    </span>
                  </div>
                  <div className="text-[11px] leading-relaxed text-on-surface-variant space-y-2 font-sans">
                    <p>
                      <strong>Espacio útil individual:</strong> {individualAreaCommercial} cm². Las aves se pisan mutuamente y no pueden girar.
                    </p>
                    {henCount >= 6 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-2 border-t border-red-500/10">
                        <strong className="text-red-500/90">{clinicalData.crowding.title}:</strong> {clinicalData.crowding.desc}
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2 border-t border-outline-variant/15 pt-3 mt-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-on-surface-variant/75 block">
                Explorador de Leyes e Industrias
              </span>
              
              <div className="grid grid-cols-3 gap-1.5">
                {lawPresets.map((law) => (
                  <button
                    key={law.id}
                    onClick={() => {
                      handleLawSelect(law.id, law.highlightId);
                      setActiveView("individual"); 
                    }}
                    className={`px-2 py-2 rounded text-[10px] font-mono transition-all cursor-pointer text-center leading-tight flex flex-col justify-center items-center gap-1 border ${
                      activeLawId === law.id && activeView === "individual"
                        ? "bg-primary border-primary text-on-primary font-bold shadow-sm"
                        : "bg-surface hover:bg-surface-dim border-outline-variant/35 text-on-surface-variant"
                    }`}
                  >
                    <span>{law.id === 'global' ? 'Global' : law.id === 'ue' ? 'U. Europea' : 'California'}</span>
                    <span className="text-[9px] font-light opacity-85">{law.areaCm2} cm²</span>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLawId}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="bg-surface-container/50 border border-outline-variant/30 rounded-lg p-3.5 space-y-2 relative overflow-hidden mt-2"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 flex">
                    <div className={`${currentLaw.scoreColor} h-full`} style={{ width: activeLawId === 'global' ? '10%' : activeLawId === 'ue' ? '30%' : '60%' }} />
                    <div className="bg-zinc-300 dark:bg-zinc-700 h-full flex-1" />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
                      {currentLaw.name}
                    </span>
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded-md border font-bold uppercase ${currentLaw.scoreText}`}>
                      {currentLaw.badge}
                    </span>
                  </div>
                  <div className="text-[11px] font-sans text-on-surface-variant leading-relaxed">
                    <span className="text-on-surface font-semibold block text-[10px] font-mono uppercase tracking-wider opacity-75">Regulación</span>
                    {currentLaw.region} - {currentLaw.status}
                  </div>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed bg-black/[0.02] dark:bg-white/[0.02] p-2 rounded italic font-sans">
                    {currentLaw.details}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-outline-variant/15">
              <span className="text-[9px] font-mono uppercase tracking-wider text-on-surface-variant/70 block">
                Metodología y Bibliografía
              </span>
              <div className="bg-surface-container/40 p-2.5 rounded border border-outline-variant/15 flex justify-between items-center text-[10px] text-on-surface-variant">
                <span className="italic">Dawkins & Hardie (1989). British Poultry Science.</span>
                <a 
                  href="https://ourworldindata.org/animal-welfare" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[9px] font-mono text-link hover:underline shrink-0 flex items-center gap-1"
                >
                  OWID Link
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
