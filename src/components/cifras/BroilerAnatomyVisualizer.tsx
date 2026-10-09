import { useState, useEffect } from "react";
import {
  Dna,
  Bone,
  Activity,
  Footprints,
  Eye,
  BookOpen,
  Play,
  Pause,
  Columns,
  Crosshair,
  Layers,
  Info
} from "lucide-react";
import {
  BROILER_EVOLUTION_DATA,
  BROILER_YEARS,
  type BroilerYearType
} from "../../data/cifras/broilerEvolutionData";
import {
  chickenPaths1957,
  chickenPaths1978,
  chickenPaths2005,
  chickenPaths2025,
  type AnatomicalPaths
} from "../../data/chickenAnatomyPaths";
import ScientificEvidenceModal from "./ScientificEvidenceModal";

type PathologyLayer = "all" | "breast" | "skeleton" | "cardio" | "pododermatitis" | "cog";

export default function BroilerAnatomyVisualizer() {
  const [selectedYear, setSelectedYear] = useState<BroilerYearType>(2025);
  const [activePathology, setActivePathology] = useState<PathologyLayer>("all");
  const [isXrayMode, setIsXrayMode] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDualComparison, setIsDualComparison] = useState(false);
  const [showGhost1957, setShowGhost1957] = useState(false);
  const [showCogVector, setShowCogVector] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auto-play cycling through years
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setSelectedYear((prev) => {
        const idx = BROILER_YEARS.indexOf(prev);
        const nextIdx = (idx + 1) % BROILER_YEARS.length;
        return BROILER_YEARS[nextIdx]!;
      });
    }, 2400);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentData = BROILER_EVOLUTION_DATA[selectedYear];

  const getPaths = (yr: BroilerYearType): AnatomicalPaths => {
    switch (yr) {
      case 1957:
        return chickenPaths1957;
      case 1978:
        return chickenPaths1978;
      case 2005:
        return chickenPaths2005;
      case 2025:
      default:
        return chickenPaths2025;
    }
  };

  const renderSingleChickenSvg = (
    year: BroilerYearType,
    opts?: {
      isCompact?: boolean;
      customLabel?: string;
    }
  ) => {
    const data = BROILER_EVOLUTION_DATA[year];
    const paths = getPaths(year);
    const ghostPaths = chickenPaths1957;
    const is1957 = year === 1957;
    const cog = paths.centerOfGravity;

    const isBreastHighlighted = isXrayMode ? (activePathology === "all" || activePathology === "breast") : activePathology === "breast";
    const isSkeletonHighlighted = isXrayMode || activePathology === "skeleton";
    const isCardioHighlighted = isXrayMode || activePathology === "cardio";
    const isPodoHighlighted = activePathology === "all" || activePathology === "pododermatitis";
    const isCogHighlighted = showCogVector || activePathology === "cog";

    return (
      <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[400px] flex items-center justify-center select-none overflow-hidden">
        {/* Floating Spec Badge — positioned top-right so bird's head and beak are completely unobstructed */}
        <div className="absolute top-3 right-3 z-10 px-3 py-2 bg-surface/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-xl border border-outline-variant/30 text-right space-y-0.5 shadow-sm pointer-events-none">
          <div className="flex items-center justify-end gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-primary dark:text-emerald-400 font-bold">
              {opts?.customLabel || `Cepa ${year} · ${data.strainName.split("(")[0]}`}
            </span>
          </div>
          <div className="text-base sm:text-lg font-mono font-bold text-on-surface">
            {data.weightAt56DaysG.toLocaleString("es-ES")} g
            <span className="text-[11px] font-sans font-normal text-on-surface-variant ml-1.5">
              a 56 días
            </span>
          </div>
          <div className="text-[10px] font-mono text-on-surface-variant flex items-center justify-end gap-2">
            <span>Pechuga: <strong className="text-on-surface">{data.breastYieldPercent}%</strong></span>
            <span>·</span>
            <span>FCR: <strong className="text-on-surface">{data.feedConversionRatio} kg/kg</strong></span>
            <span>·</span>
            <span>Luz: <strong className={paths.groundClearanceMm <= 10 ? "text-red-500 font-bold" : "text-on-surface"}>{paths.groundClearanceMm} mm</strong></span>
          </div>
        </div>

        {/* The SVG Canvas (ViewBox unified: 0 0 320 230, Ground at y = 210) */}
        <svg
          viewBox="0 0 320 230"
          className="w-full h-full max-h-[400px] select-none text-on-surface"
          aria-label={`Ilustración anatómica y biomecánica del pollo de engorde en el año ${year}`}
        >
          <defs>
            {/* Blueprint Grid Pattern */}
            <pattern id={`bio-grid-${year}`} width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M 16 0 L 0 0 0 16" fill="none" stroke="currentColor" strokeWidth="0.3" strokeOpacity="0.07" />
            </pattern>

            {/* Realistic plumage gradient for natural optical mode */}
            <linearGradient id={`plumage-grad-${year}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.99" />
              <stop offset="50%" stopColor="#f8fafc" stopOpacity="0.96" />
              <stop offset="85%" stopColor="#f1f5f9" stopOpacity="0.94" />
              <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.90" />
            </linearGradient>

            {/* Wing plumage gradient */}
            <linearGradient id={`wing-grad-${year}`} x1="0%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
              <stop offset="70%" stopColor="#f8fafc" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.92" />
            </linearGradient>

            {/* Natural juvenile comb & wattle gradients (fleshy soft rose/coral, realistic avian tone) */}
            <linearGradient id={`comb-grad-${year}`} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="100%" stopColor="#fda4af" />
            </linearGradient>
            <linearGradient id={`wattle-grad-${year}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fda4af" />
              <stop offset="100%" stopColor="#f87171" />
            </linearGradient>

            {/* Floor contact shadow gradient */}
            <radialGradient id={`floor-shadow-${year}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0f172a" stopOpacity="0.35" />
              <stop offset="60%" stopColor="#0f172a" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
            </radialGradient>

            <linearGradient id={`breast-muscle-${year}`} x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={activePathology === "breast" ? 0.9 : 0.7} />
              <stop offset="100%" stopColor="#b91c1c" stopOpacity={activePathology === "breast" ? 0.98 : 0.85} />
            </linearGradient>

            {/* Marker for plumb line */}
            <marker id="cog-arrow" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="5" markerHeight="5" orient="auto">
              <polygon points="0,0 8,4 0,8 2,4" fill="#ef4444" />
            </marker>
          </defs>

          {/* Grid Background in X-Ray / Biomechanical Mode */}
          {isXrayMode && (
            <rect x="0" y="0" width="320" height="230" fill={`url(#bio-grid-${year})`} />
          )}

          {/* ============================================================== */}
          {/* BASELINE GROUND / LITTER LINE (Common to all birds at y = 210) */}
          {/* ============================================================== */}
          <g className="select-none pointer-events-none">
            {/* Ground Line */}
            <line
              x1="20"
              y1="210"
              x2="300"
              y2="210"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeOpacity="0.35"
              strokeDasharray="4 3"
            />
            {/* Floor hatch marks */}
            {[40, 80, 120, 160, 200, 240, 280].map((x) => (
              <line
                key={x}
                x1={x}
                y1="210"
                x2={x - 6}
                y2="216"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeOpacity="0.25"
              />
            ))}
            <text
              x="295"
              y="206"
              textAnchor="end"
              className="text-[8px] font-mono fill-on-surface-variant/60 uppercase tracking-wider"
            >
              Línea de Suelo / Yacija (y = 0 cm)
            </text>
          </g>

          {/* Ground Clearance Dimension Bracket (Positioned clear of breast at x=26) */}
          <g className="select-none pointer-events-none">
            <line
              x1="26"
              y1={210 - paths.groundClearanceMm}
              x2="26"
              y2="210"
              stroke={paths.groundClearanceMm <= 10 ? "#ef4444" : paths.groundClearanceMm <= 25 ? "#f59e0b" : "#10b981"}
              strokeWidth="1.2"
              strokeDasharray="2 2"
            />
            <line x1="22" y1={210 - paths.groundClearanceMm} x2="30" y2={210 - paths.groundClearanceMm} stroke={paths.groundClearanceMm <= 10 ? "#ef4444" : paths.groundClearanceMm <= 25 ? "#f59e0b" : "#10b981"} strokeWidth="1" />
            <line x1="22" y1={210} x2="30" y2={210} stroke={paths.groundClearanceMm <= 10 ? "#ef4444" : paths.groundClearanceMm <= 25 ? "#f59e0b" : "#10b981"} strokeWidth="1" />
            <text
              x="33"
              y={paths.groundClearanceMm <= 15 ? 210 - paths.groundClearanceMm - 5 : Math.min(204, Math.max(120, 210 - paths.groundClearanceMm / 2 + 3))}
              className={`text-[7.5px] font-mono font-bold ${
                paths.groundClearanceMm <= 10 ? "fill-red-500" : paths.groundClearanceMm <= 25 ? "fill-amber-500" : "fill-emerald-500"
              }`}
            >
              Luz: {paths.groundClearanceMm} mm {paths.groundClearanceMm <= 10 ? "(Colapso)" : ""}
            </text>
          </g>

          {/* ============================================================== */}
          {/* GHOST OVERLAY (1957 silhouette overlay to show expansion) */}
          {/* ============================================================== */}
          {!is1957 && showGhost1957 && (
            <g className="transition-opacity duration-300 pointer-events-none opacity-45">
              <path
                d={ghostPaths.body}
                fill="none"
                stroke="#10b981"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
              <path
                d={ghostPaths.breast}
                fill="rgba(16, 185, 129, 0.12)"
                stroke="#10b981"
                strokeWidth="0.8"
                strokeDasharray="2 2"
              />
              <text x="110" y="50" className="text-[7.5px] font-mono fill-emerald-600 dark:fill-emerald-400 font-bold">
                Silueta 1957 (Base Histórica 905 g)
              </text>
            </g>
          )}

          {/* Background far leg (Pata trasera en perspectiva) */}
          {paths.plumageLeg && !isXrayMode ? (
            <g className="select-none pointer-events-none opacity-80" fill="none" strokeLinecap="round">
              <path d={paths.plumageLeg.drumstickFar} fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.0" />
              <path d={paths.plumageLeg.metatarsusFar} stroke="#d97706" strokeWidth={year >= 2005 ? "3.2" : "2.6"} />
              <path d={paths.plumageLeg.digitsFar} stroke="#d97706" strokeWidth="2.2" />
            </g>
          ) : paths.skeleton.farLeg ? (
            <g
              stroke={isXrayMode ? "#475569" : "#d97706"}
              strokeOpacity={isXrayMode ? "0.4" : "0.85"}
              strokeWidth="2.4"
              strokeLinecap="round"
              fill="none"
            >
              {isXrayMode && <path d={paths.skeleton.farLeg.femur} />}
              <path d={paths.skeleton.farLeg.tibia} />
              <path d={paths.skeleton.farLeg.metatarsus} />
              <path d={paths.skeleton.farLeg.digits} />
            </g>
          ) : null}

          {/* Ground contact shadow in natural plumage mode */}
          {!isXrayMode && (
            <ellipse
              cx={year >= 2005 ? 136 : 152}
              cy="210"
              rx={year >= 2005 ? 68 : 52}
              ry="4.5"
              fill={`url(#floor-shadow-${year})`}
              className="pointer-events-none"
            />
          )}

          {/* ============================================================== */}
          {/* 1. BODY PLUMAGE / SILHOUETTE */}
          {/* ============================================================== */}
          <path
            d={paths.body}
            fill={
              isXrayMode
                ? "rgba(16, 185, 129, 0.08)"
                : `url(#plumage-grad-${year})`
            }
            stroke={isXrayMode ? "#10b981" : "#94a3b8"}
            strokeWidth={isXrayMode ? "1.2" : "1.5"}
            strokeLinejoin="round"
            className="transition-all duration-500"
          />

          {/* Tail Feathers */}
          {paths.tailFeathers && paths.tailFeathers.map((t, idx) => (
            <path
              key={idx}
              d={t}
              fill="none"
              stroke={isXrayMode ? "rgba(16, 185, 129, 0.3)" : "#94a3b8"}
              strokeWidth="1.1"
            />
          ))}

          {/* Wing Feathers / Coverts */}
          <path
            d={paths.wing}
            fill={isXrayMode ? "rgba(16, 185, 129, 0.05)" : `url(#wing-grad-${year})`}
            stroke={isXrayMode ? "rgba(16, 185, 129, 0.45)" : "#94a3b8"}
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          {paths.wingCoverts && paths.wingCoverts.map((c, idx) => (
            <path
              key={idx}
              d={c}
              fill="none"
              stroke={isXrayMode ? "rgba(16, 185, 129, 0.25)" : "#94a3b8"}
              strokeWidth="0.8"
            />
          ))}

          {/* ============================================================== */}
          {/* 2. HEAD DETAILS: Comb, Wattles, Beak, Eye */}
          {/* ============================================================== */}
          {/* Comb (Cresta juvenil suave) */}
          <path
            d={paths.head.comb}
            fill={`url(#comb-grad-${year})`}
            stroke="#f43f5e"
            strokeWidth="0.6"
            className="drop-shadow-xs"
          />
          {/* Wattle (Barbilla juvenil) */}
          <path
            d={paths.head.wattle}
            fill={`url(#wattle-grad-${year})`}
            stroke="#fb7185"
            strokeWidth="0.5"
          />
          {/* Realistic Avian Beak */}
          {paths.head.beakUpper ? (
            <>
              <path
                d={paths.head.beakUpper}
                fill="#f59e0b"
                stroke="#d97706"
                strokeWidth="0.8"
              />
              <path
                d={paths.head.beakLower}
                fill="#d97706"
                stroke="#b45309"
                strokeWidth="0.7"
              />
              {paths.head.nares && (
                <line
                  x1={paths.head.nares.x1}
                  y1={paths.head.nares.y1}
                  x2={paths.head.nares.x2}
                  y2={paths.head.nares.y2}
                  stroke="#78350f"
                  strokeWidth="0.8"
                />
              )}
            </>
          ) : (
            <path
              d={paths.head.beak}
              fill="#f59e0b"
              stroke="#d97706"
              strokeWidth="0.8"
            />
          )}
          {/* Realistic Avian Eye with Amber Iris, Pupil & Corneal Reflection */}
          <g className="select-none pointer-events-none">
            {/* Eye rim / lid */}
            <circle
              cx={paths.head.eye.cx}
              cy={paths.head.eye.cy}
              r={paths.head.eye.r + 0.6}
              fill="#e2e8f0"
              stroke="#94a3b8"
              strokeWidth="0.4"
            />
            {/* Warm Amber Iris */}
            <circle
              cx={paths.head.eye.cx}
              cy={paths.head.eye.cy}
              r={paths.head.eye.r}
              fill="#d97706"
            />
            {/* Deep Pupil */}
            <circle
              cx={paths.head.eye.cx}
              cy={paths.head.eye.cy}
              r={paths.head.eye.r * 0.58}
              fill="#0f172a"
            />
            {/* Corneal Highlight */}
            <circle
              cx={paths.head.eye.cx - paths.head.eye.r * 0.28}
              cy={paths.head.eye.cy - paths.head.eye.r * 0.28}
              r={paths.head.eye.r * 0.26}
              fill="#ffffff"
            />
          </g>

          {/* Near leg exterior in Plumage Mode (Yellow scaly shank & toes, drumstick hock) */}
          {!isXrayMode && activePathology !== "skeleton" && (
            <g strokeLinecap="round" fill="none" className="select-none">
              {paths.plumageLeg ? (
                <>
                  {/* Flank Covert & Feathered Drumstick */}
                  <path
                    d={paths.plumageLeg.drumstickNear}
                    fill={`url(#plumage-grad-${year})`}
                    stroke="#94a3b8"
                    strokeWidth="1.1"
                  />
                  {/* Scaly shank (metatarsus) in rich golden amber */}
                  <path
                    d={paths.plumageLeg.metatarsusNear}
                    stroke="#f59e0b"
                    strokeWidth={year >= 2005 ? "3.8" : "3.0"}
                  />
                  {/* Scaly toes (digits) firmly on litter */}
                  <path
                    d={paths.plumageLeg.digitsNear}
                    stroke="#f59e0b"
                    strokeWidth="2.6"
                  />
                  {/* Pathological lesions in plumage mode for modern strains */}
                  {(year === 2005 || year === 2025) && (
                    <>
                      {/* Hock burn lesion */}
                      <circle
                        cx={paths.pododermatitis?.hock?.cx ?? (year === 2025 ? 142 : 146)}
                        cy={paths.pododermatitis?.hock?.cy ?? (year === 2025 ? 194 : 186)}
                        r={year === 2025 ? 3.6 : 2.4}
                        fill="#991b1b"
                        stroke="#f87171"
                        strokeWidth="1.0"
                      />
                      {/* Plantar necrotic ulcer */}
                      <circle
                        cx={paths.pododermatitis?.footpad?.cx ?? (year === 2025 ? 140 : 144)}
                        cy={paths.pododermatitis?.footpad?.cy ?? 209}
                        r={year === 2025 ? 4.2 : 3.0}
                        fill="#7f1d1d"
                        stroke="#ef4444"
                        strokeWidth="1.2"
                      />
                      <circle
                        cx={paths.pododermatitis?.footpad?.cx ?? (year === 2025 ? 140 : 144)}
                        cy={paths.pododermatitis?.footpad?.cy ?? 209}
                        r={year === 2025 ? 1.8 : 1.2}
                        fill="#000000"
                      />
                    </>
                  )}
                </>
              ) : (
                <>
                  {/* Exposed drumstick feather cuff / lower tibia if bird is tall (1957/1978) */}
                  {paths.groundClearanceMm > 25 && (
                    <path
                      d={paths.skeleton.tibia}
                      stroke="#e2e8f0"
                      strokeWidth="3.6"
                      strokeLinecap="round"
                    />
                  )}
                  {/* Scaly shank (metatarsus) in rich golden amber */}
                  <path
                    d={paths.skeleton.metatarsus}
                    stroke="#f59e0b"
                    strokeWidth="2.8"
                  />
                  {/* Scaly toes (digits) firmly on litter */}
                  <path
                    d={paths.skeleton.digits}
                    stroke="#f59e0b"
                    strokeWidth="2.4"
                  />
                </>
              )}
            </g>
          )}

          {/* ============================================================== */}
          {/* 3. SKELETAL SYSTEM (Spine, Keel, Pelvis, Femur, Tibia, Tarsus) */}
          {/* ============================================================== */}
          {isSkeletonHighlighted && (
            <g
              role="button"
              tabIndex={0}
              aria-label="Enfocar sistema esquelético y deformidades óseas"
              onClick={() => setActivePathology("skeleton")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActivePathology("skeleton");
                }
              }}
              className="cursor-pointer group focus-visible:outline-none"
            >
              {/* Spine (Columna vertebral) */}
              <path
                d={paths.skeleton.spine}
                fill="none"
                stroke={activePathology === "skeleton" ? "#ef4444" : isXrayMode ? "#34d399" : "#4b5563"}
                strokeWidth={activePathology === "skeleton" ? "2.2" : "1.6"}
                strokeLinecap="round"
                className="transition-colors duration-300 group-hover:stroke-red-400"
              />

              {/* Thoracic Ribs (Costillas torácicas articuladas) */}
              {paths.skeleton.ribs && paths.skeleton.ribs.map((rib, idx) => (
                <path
                  key={idx}
                  d={rib}
                  fill="none"
                  stroke={activePathology === "skeleton" ? "#ef4444" : isXrayMode ? "#6ee7b7" : "#4b5563"}
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  className="transition-colors duration-300"
                />
              ))}

              {/* Coracoid Strut (Hueso coracoides hacia el esternón) */}
              {paths.skeleton.coracoid && (
                <path
                  d={paths.skeleton.coracoid}
                  fill="none"
                  stroke={activePathology === "skeleton" ? "#ef4444" : isXrayMode ? "#34d399" : "#4b5563"}
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  className="transition-colors duration-300"
                />
              )}

              {/* Pelvis / Synsacrum shield */}
              {paths.skeleton.pelvis && (
                <path
                  d={paths.skeleton.pelvis}
                  fill="none"
                  stroke={activePathology === "skeleton" ? "#ef4444" : isXrayMode ? "#34d399" : "#4b5563"}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  className="transition-colors duration-300"
                />
              )}

              {/* Keel Bone (Quilla esternal) — marcador central de tensión */}
              {paths.skeleton.keel && (
                <path
                  d={paths.skeleton.keel}
                  fill="none"
                  stroke={activePathology === "skeleton" ? "#ef4444" : year >= 2005 ? "#f59e0b" : "#10b981"}
                  strokeWidth={activePathology === "skeleton" ? "2.8" : "2.2"}
                  strokeLinecap="round"
                  className="transition-colors duration-300"
                />
              )}

              {/* Fore leg: Femur */}
              <path
                d={paths.skeleton.femur}
                fill="none"
                stroke={activePathology === "skeleton" ? "#ef4444" : "#38bdf8"}
                strokeWidth={activePathology === "skeleton" ? "2.6" : "2.2"}
                strokeLinecap="round"
                className="transition-colors duration-300"
              />

              {/* Fore leg: Tibia (highlighting angular deviation/varus in 2005/2025) */}
              <path
                d={paths.skeleton.tibia}
                fill="none"
                stroke={activePathology === "skeleton" ? "#ef4444" : year >= 2005 ? "#dc2626" : "#38bdf8"}
                strokeWidth={activePathology === "skeleton" ? "2.8" : year >= 2005 ? "2.4" : "2.2"}
                strokeLinecap="round"
                className="transition-colors duration-300"
              />

              {/* Shank (Tarso / metatarsus) */}
              <path
                d={paths.skeleton.metatarsus}
                fill="none"
                stroke={activePathology === "skeleton" ? "#ef4444" : "#38bdf8"}
                strokeWidth={activePathology === "skeleton" ? "2.4" : "2.0"}
                strokeLinecap="round"
                className="transition-colors duration-300"
              />

              {/* Digits / Toes firmly on the ground */}
              <path
                d={paths.skeleton.digits}
                fill="none"
                stroke={activePathology === "skeleton" ? "#ef4444" : "#38bdf8"}
                strokeWidth={activePathology === "skeleton" ? "2.2" : "1.8"}
                strokeLinecap="round"
                className="transition-colors duration-300"
              />

              {/* Keel bone label callout in skeleton view */}
              {activePathology === "skeleton" && paths.skeleton.keel && (
                <g className="pointer-events-none">
                  <circle cx="85" cy="140" r="3" fill="#ef4444" />
                  <text x="75" y="132" textAnchor="end" className="text-[7.5px] font-mono fill-red-500 font-bold">
                    Quilla Esternal {year >= 2005 ? "(Deformada por compresión)" : "(Recta y funcional)"}
                  </text>
                </g>
              )}
            </g>
          )}

          {/* ============================================================== */}
          {/* 4. BREAST MUSCULATURE & PATHOLOGICAL STRIPING */}
          {/* ============================================================== */}
          {isBreastHighlighted && (
            <g
              role="button"
              tabIndex={0}
              aria-label="Enfocar musculatura pectoral e hipertrofia"
              onClick={() => setActivePathology("breast")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActivePathology("breast");
                }
              }}
              className="cursor-pointer group focus-visible:outline-none"
            >
              {/* Muscle Bulk Path */}
              <path
                d={paths.breast}
                fill={`url(#breast-muscle-${year})`}
                stroke="#b91c1c"
                strokeWidth={activePathology === "breast" ? "1.6" : "1.0"}
                strokeLinejoin="round"
                className="transition-all duration-300 group-hover:brightness-110"
              />

              {/* Pathological White Striping (Estriado Blanco & Pechuga de Madera) */}
              {paths.myopathyStripes && paths.myopathyStripes.map((stripe, idx) => (
                <path
                  key={idx}
                  d={stripe}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  strokeOpacity={activePathology === "breast" ? 0.9 : 0.6}
                  strokeDasharray="2 1.5"
                  className="pointer-events-none"
                />
              ))}

              {/* Annotation badge when active */}
              {activePathology === "breast" && (
                <g className="pointer-events-none">
                  <text
                    x={year >= 2005 ? "50" : "90"}
                    y={year >= 2005 ? "170" : "135"}
                    textAnchor="middle"
                    className="text-[8px] font-mono font-bold fill-white drop-shadow-md"
                  >
                    {year >= 2005 ? "Miopatías / Estriado Blanco" : "Masa Magra Equilibrada"}
                  </text>
                </g>
              )}
            </g>
          )}

          {/* ============================================================== */}
          {/* 5. CARDIOPULMONARY & ASCITES SAC */}
          {/* ============================================================== */}
          {isCardioHighlighted && (
            <g
              role="button"
              tabIndex={0}
              aria-label="Enfocar sistema cardiopulmonar y ascitis"
              onClick={() => setActivePathology("cardio")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActivePathology("cardio");
                }
              }}
              className="cursor-pointer group focus-visible:outline-none"
            >
              {/* Lungs (Pulmones dorsales) */}
              {paths.heart.lungs && (
                <path
                  d={paths.heart.lungs}
                  fill="rgba(244, 63, 94, 0.35)"
                  stroke="#f43f5e"
                  strokeWidth="0.8"
                  className="transition-colors duration-300"
                />
              )}

              {/* Heart Main */}
              <path
                d={paths.heart.main}
                fill="#dc2626"
                stroke="#991b1b"
                strokeWidth={activePathology === "cardio" ? "1.4" : "0.8"}
                className="transition-transform duration-300 group-hover:scale-105"
              />

              {/* Right Ventricle Hypertrophy (RV Dilatation) */}
              {paths.heart.rv && (
                <path
                  d={paths.heart.rv}
                  fill="#b91c1c"
                  stroke="#ef4444"
                  strokeWidth="1.0"
                />
              )}

              {/* Ascites Fluid Sac (Acumulación de líquido abdominal por fallo cardíaco) */}
              {paths.heart.ascites && (
                <path
                  d={paths.heart.ascites}
                  fill="rgba(59, 130, 246, 0.45)"
                  stroke="#2563eb"
                  strokeWidth="1.0"
                  strokeDasharray="2 1.5"
                />
              )}

              {/* Ascites Callout when highlighted */}
              {activePathology === "cardio" && paths.heart.ascites && (
                <g className="pointer-events-none">
                  <text x="140" y="194" textAnchor="middle" className="text-[7.5px] font-mono fill-blue-600 dark:fill-blue-400 font-bold">
                    Acumulación Ascítica (Fallo Cardíaco)
                  </text>
                </g>
              )}
            </g>
          )}

          {/* ============================================================== */}
          {/* 6. PODODERMATITIS & HOCK BURNS (Ulceraciones de contacto) */}
          {/* ============================================================== */}
          {isPodoHighlighted && paths.pododermatitis && (
            <g
              role="button"
              tabIndex={0}
              aria-label="Enfocar dermatitis de almohadillas plantares y tarsos"
              onClick={() => setActivePathology("pododermatitis")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActivePathology("pododermatitis");
                }
              }}
              className="cursor-pointer group focus-visible:outline-none"
            >
              {/* Footpad lesion on floor */}
              {paths.pododermatitis.footpad.r > 0 && (
                <g>
                  <circle
                    cx={paths.pododermatitis.footpad.cx}
                    cy={paths.pododermatitis.footpad.cy}
                    r={paths.pododermatitis.footpad.r}
                    fill="#b91c1c"
                    stroke="#ef4444"
                    strokeWidth="1.2"
                    className="animate-pulse"
                  />
                  {activePathology === "pododermatitis" && (
                    <text
                      x={paths.pododermatitis.footpad.cx - 8}
                      y="204"
                      textAnchor="end"
                      className="text-[7.5px] font-mono fill-red-600 dark:fill-red-400 font-bold"
                    >
                      Úlcera Plantar (Grado {year === 2025 ? "3" : "2"})
                    </text>
                  )}
                </g>
              )}

              {/* Hock burn on tarsus */}
              {paths.pododermatitis.hock && paths.pododermatitis.hock.r > 0 && (
                <g>
                  <circle
                    cx={paths.pododermatitis.hock.cx}
                    cy={paths.pododermatitis.hock.cy}
                    r={paths.pododermatitis.hock.r}
                    fill="#991b1b"
                    stroke="#f87171"
                    strokeWidth="1.0"
                  />
                  {activePathology === "pododermatitis" && (
                    <text
                      x={paths.pododermatitis.hock.cx + 8}
                      y={paths.pododermatitis.hock.cy + 3}
                      textAnchor="start"
                      className="text-[7.5px] font-mono fill-red-600 dark:fill-red-400 font-bold"
                    >
                      Quemadura de Tarso
                    </text>
                  )}
                </g>
              )}
            </g>
          )}

          {/* ============================================================== */}
          {/* 7. BIOMECHANICAL CENTER OF GRAVITY VECTOR (CoG & Plumb Line) */}
          {/* ============================================================== */}
          {isCogHighlighted && cog && (
            <g
              role="button"
              tabIndex={0}
              aria-label="Enfocar vector del centro de gravedad y equilibrio"
              onClick={() => setActivePathology("cog")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActivePathology("cog");
                }
              }}
              className="cursor-pointer group focus-visible:outline-none"
            >
              {/* Plumb Line down to the floor */}
              <line
                x1={cog.cx}
                y1={cog.cy}
                x2={cog.cx}
                y2={cog.plumbLineY}
                stroke={cog.torqueOffsetPx > 20 ? "#ef4444" : cog.torqueOffsetPx > 0 ? "#f59e0b" : "#10b981"}
                strokeWidth="1.4"
                strokeDasharray="3 2"
                markerEnd="url(#cog-arrow)"
              />

              {/* Ground Impact Point */}
              <circle
                cx={cog.cx}
                cy={cog.plumbLineY}
                r="3"
                fill={cog.torqueOffsetPx > 20 ? "#ef4444" : cog.torqueOffsetPx > 0 ? "#f59e0b" : "#10b981"}
              />

              {/* CoG Target Marker */}
              <circle
                cx={cog.cx}
                cy={cog.cy}
                r="6"
                fill="none"
                stroke={cog.torqueOffsetPx > 20 ? "#ef4444" : cog.torqueOffsetPx > 0 ? "#f59e0b" : "#10b981"}
                strokeWidth="1.6"
              />
              <circle
                cx={cog.cx}
                cy={cog.cy}
                r="2"
                fill={cog.torqueOffsetPx > 20 ? "#ef4444" : cog.torqueOffsetPx > 0 ? "#f59e0b" : "#10b981"}
              />

              {/* Offset Torque Distance Dimension Line */}
              {cog.torqueOffsetPx > 0 && (
                <g className="pointer-events-none">
                  {/* Foot reference line */}
                  <line
                    x1="150"
                    y1="210"
                    x2="150"
                    y2="218"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    strokeOpacity="0.4"
                  />
                  {/* Torque horizontal arrow */}
                  <line
                    x1={cog.cx}
                    y1="218"
                    x2="150"
                    y2="218"
                    stroke="#ef4444"
                    strokeWidth="1.2"
                  />
                  <text
                    x={(cog.cx + 150) / 2}
                    y="226"
                    textAnchor="middle"
                    className="text-[7.5px] font-mono fill-red-600 dark:fill-red-400 font-bold"
                  >
                    Δ Torque: +{cog.torqueOffsetPx}px anterior
                  </text>
                </g>
              )}

              {/* CoG Label */}
              <text
                x={cog.cx + 8}
                y={cog.cy - 4}
                className="text-[8px] font-mono font-bold fill-on-surface"
              >
                G ({cog.stabilityStatus === "balanced" ? "Equilibrado" : cog.stabilityStatus === "stressed" ? "Desplazado" : "Colapsado"})
              </text>
            </g>
          )}
        </svg>

        {/* Hotspots Quick Guide Overlay */}
        {!opts?.isCompact && (
          <div className="absolute bottom-2.5 right-3 text-[10px] font-mono text-on-surface-variant bg-surface/90 dark:bg-zinc-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-outline-variant/30 pointer-events-none shadow-xs">
            💡 Toca en el dibujo (pechuga, quilla, corazón o patas) para enfocar patologías
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full bg-surface dark:bg-zinc-900/60 rounded-2xl border border-outline-variant/30 dark:border-zinc-800 p-4 sm:p-5 lg:p-6 space-y-4 sm:space-y-5 text-left relative overflow-hidden shadow-sm">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-outline-variant/20 dark:border-zinc-800 pb-3.5 sm:pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono font-bold tracking-widest text-primary dark:text-emerald-400 uppercase bg-primary/10 dark:bg-emerald-500/10 px-2 py-0.5 rounded border border-primary/20">
              SELECCIÓN ZOOTÉCNICA Y ALOMETRÍA · EXHIBIT III
            </span>
            <span className="text-xs font-mono text-on-surface-variant/70">
              Zuidhof et al. 2014 & EFSA 2023
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-heading font-bold text-on-surface">
            Metamorfosis Biomecánica del Pollo de Engorde (1957—2025)
          </h3>
          <p className="text-xs sm:text-sm text-on-surface-variant max-w-3xl leading-relaxed">
            La cría intensiva ha multiplicado por más de 4 el peso del pollo a los 56 días (de 905 g a más de 4.200 g). Este hiperdesarrollo muscular concentra una masa extrema en la pechuga y desplaza el centro de gravedad, provocando el colapso del sistema esquelético y cardiopulmonar.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="self-start md:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-outline-variant/30 dark:border-zinc-700 bg-surface-dim/50 hover:bg-surface-dim text-xs font-mono font-bold text-on-surface transition-all cursor-pointer shadow-sm shrink-0"
        >
          <BookOpen className="w-3.5 h-3.5 text-primary" /> Respaldo Científico
        </button>
      </div>

      {/* Main Interactive Controls Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5 bg-surface-dim/40 dark:bg-zinc-800/40 p-2.5 sm:p-3 rounded-xl border border-outline-variant/20 dark:border-zinc-800">
        {/* Timeline Year Selectors + Playback */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-mono uppercase tracking-wider text-on-surface-variant font-bold mr-1">
            Cepa Genética:
          </span>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              isPlaying
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-primary text-on-primary shadow-sm"
            }`}
            title={isPlaying ? "Pausar evolución animada" : "Reproducir evolución temporal automática"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? "Pausa" : "Evolución"}</span>
          </button>

          <div className="flex items-center gap-1">
            {BROILER_YEARS.map((yr) => (
              <button
                key={yr}
                onClick={() => {
                  setSelectedYear(yr);
                  setIsPlaying(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  selectedYear === yr && !isDualComparison
                    ? "bg-on-surface text-surface dark:bg-white dark:text-zinc-950 shadow-sm"
                    : "bg-surface dark:bg-zinc-800 text-on-surface-variant hover:text-on-surface border border-outline-variant/20"
                }`}
              >
                {yr}
              </button>
            ))}
          </div>
        </div>

        {/* View toggles: Comparative, X-ray, Ghost Overlay, CoG */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setIsDualComparison(!isDualComparison)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              isDualComparison
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface dark:bg-zinc-800 text-on-surface-variant hover:text-on-surface border border-outline-variant/20"
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>{isDualComparison ? "Vista Individual" : "Comparar 1957 vs 2025"}</span>
          </button>

          <button
            onClick={() => setIsXrayMode(!isXrayMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              isXrayMode
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-surface dark:bg-zinc-800 text-on-surface-variant hover:text-on-surface border border-outline-variant/20"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{isXrayMode ? "Modo Rayos X" : "Modo Plumaje"}</span>
          </button>

          {!isDualComparison && selectedYear !== 1957 && (
            <button
              onClick={() => setShowGhost1957(!showGhost1957)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                showGhost1957
                  ? "bg-teal-600 text-white shadow-sm"
                  : "bg-surface dark:bg-zinc-800 text-on-surface-variant hover:text-on-surface border border-outline-variant/20"
              }`}
              title="Superponer silueta original de 1957 sobre el ave actual"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{showGhost1957 ? "Fantasma 1957 ON" : "Overlay 1957"}</span>
            </button>
          )}

          <button
            onClick={() => setShowCogVector(!showCogVector)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              showCogVector
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-surface dark:bg-zinc-800 text-on-surface-variant hover:text-on-surface border border-outline-variant/20"
            }`}
            title="Activar/desactivar vector del centro de gravedad y plomada al suelo"
          >
            <Crosshair className="w-3.5 h-3.5" />
            <span>Centro Gravedad</span>
          </button>
        </div>
      </div>

      {/* Pathology Layer Filter Tabs */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[10px] font-mono uppercase tracking-wider text-on-surface-variant font-bold mr-1">
          Capas de Análisis:
        </span>
        {[
          { id: "all", label: "Todas las Capas", icon: <Layers className="w-3 h-3" /> },
          { id: "breast", label: "Pechuga & Miopatías", icon: <Dna className="w-3 h-3" /> },
          { id: "skeleton", label: "Esqueleto, Quilla & Marcha", icon: <Bone className="w-3 h-3" /> },
          { id: "cardio", label: "Cardiopulmonar & Ascitis", icon: <Activity className="w-3 h-3" /> },
          { id: "pododermatitis", label: "Almohadillas & Llagas", icon: <Footprints className="w-3 h-3" /> },
          { id: "cog", label: "Física: Centro de Gravedad", icon: <Crosshair className="w-3 h-3" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActivePathology(tab.id as PathologyLayer)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activePathology === tab.id
                ? "bg-primary text-on-primary shadow-xs"
                : "bg-surface-dim/50 text-on-surface-variant hover:text-on-surface border border-outline-variant/20"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Main Anatomical Display Canvas */}
      <div className="bg-surface-dim/70 dark:bg-zinc-950/70 rounded-2xl border border-outline-variant/40 dark:border-zinc-800 p-2 sm:p-4 overflow-hidden relative shadow-inner">
        {isDualComparison ? (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-2 text-xs font-mono text-on-surface-variant">
              <span>Comparativa a Escala Real (Línea de Suelo Común): 1957 vs 2025</span>
              <span className="text-primary font-bold">+397% Aumento de Masa Corporal</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="border border-outline-variant/30 rounded-xl bg-surface/60 dark:bg-zinc-900/60 p-1">
                {renderSingleChickenSvg(1957, { isCompact: true, customLabel: "1957 · Cepa Tradicional (905 g)" })}
              </div>
              <div className="border border-outline-variant/30 rounded-xl bg-surface/60 dark:bg-zinc-900/60 p-1">
                {renderSingleChickenSvg(2025, { isCompact: true, customLabel: "2025 · Cepa Hiper-Seleccionada (4.500 g)" })}
              </div>
            </div>
          </div>
        ) : (
          renderSingleChickenSvg(selectedYear)
        )}
      </div>

      {/* Biometric Key Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        <div className="p-3 sm:p-4 bg-surface-dim/40 dark:bg-zinc-800/40 rounded-xl border border-outline-variant/20 dark:border-zinc-800 space-y-0.5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant font-bold block">
            Peso a 56 Días
          </span>
          <div className="text-xl sm:text-2xl font-mono font-bold text-on-surface">
            {currentData.weightAt56DaysG.toLocaleString("es-ES")} g
          </div>
          <span className="text-[10px] font-mono text-primary dark:text-emerald-400 block font-bold">
            {selectedYear === 1957 ? "Base de referencia" : `+${Math.round(((currentData.weightAt56DaysG - 905) / 905) * 100)}% vs 1957`}
          </span>
        </div>

        <div className="p-3 sm:p-4 bg-surface-dim/40 dark:bg-zinc-800/40 rounded-xl border border-outline-variant/20 dark:border-zinc-800 space-y-0.5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant font-bold block">
            Rendimiento de Pechuga
          </span>
          <div className="text-xl sm:text-2xl font-mono font-bold text-on-surface">
            {currentData.breastYieldPercent}%
          </div>
          <span className="text-[10px] font-mono text-primary dark:text-emerald-400 block font-bold">
            {selectedYear === 1957 ? "Proporción natural" : `+${Math.round(((currentData.breastYieldPercent - 11.6) / 11.6) * 100)}% masa relativa`}
          </span>
        </div>

        <div className="p-3 sm:p-4 bg-surface-dim/40 dark:bg-zinc-800/40 rounded-xl border border-outline-variant/20 dark:border-zinc-800 space-y-0.5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant font-bold block">
            Ganancia Diaria
          </span>
          <div className="text-xl sm:text-2xl font-mono font-bold text-on-surface">
            {currentData.dailyGrowthRateGrams} g/día
          </div>
          <span className="text-[10px] font-mono text-primary dark:text-emerald-400 block font-bold">
            {selectedYear === 1957 ? "Ritmo fisiológico" : `x${(currentData.dailyGrowthRateGrams / 15.4).toFixed(1)} velocidad de engorde`}
          </span>
        </div>

        <div className="p-3 sm:p-4 bg-surface-dim/40 dark:bg-zinc-800/40 rounded-xl border border-outline-variant/20 dark:border-zinc-800 space-y-0.5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant font-bold block">
            Conversión de Pienso (FCR)
          </span>
          <div className="text-xl sm:text-2xl font-mono font-bold text-on-surface">
            {currentData.feedConversionRatio} kg/kg
          </div>
          <span className="text-[10px] font-mono text-on-surface-variant block">
            Pienso por kilo de carne viva
          </span>
        </div>
      </div>

      {/* Comprehensive Pathology Diagnostics (Intuitive, Clean & Scientifically Grounded) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono uppercase tracking-widest text-on-surface-variant font-bold flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-primary" />
            Ficha Clínica y Patológica de la Cepa {selectedYear}
          </h4>
          <span className="text-[10px] font-mono text-on-surface-variant/70">
            Haz clic en cualquier tarjeta para resaltar el órgano en el dibujo
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {/* 1. Breast Muscle / Myopathy Card */}
          <div
            onClick={() => setActivePathology("breast")}
            className={`p-4 rounded-xl border transition-all cursor-pointer text-left space-y-2 ${
              activePathology === "breast"
                ? "bg-red-500/10 border-red-500/50 shadow-xs"
                : "bg-surface-dim/30 dark:bg-zinc-800/30 border-outline-variant/20 hover:border-outline-variant/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Dna className="w-4 h-4 text-red-500" />
                <h5 className="text-xs font-mono font-bold text-on-surface uppercase">
                  {currentData.systems.breast.title}
                </h5>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                currentData.systems.breast.severityLevel === "normal"
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                  : currentData.systems.breast.severityLevel === "mild"
                  ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                  : "bg-red-500/15 text-red-600 dark:text-red-400"
              }`}>
                {currentData.systems.breast.badge}
              </span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {currentData.systems.breast.description}
            </p>
            <div className="pt-1 border-t border-outline-variant/15 text-[10px] font-mono text-on-surface-variant/75 flex items-center justify-between">
              <span>Diagnóstico: <strong className="text-on-surface">{currentData.systems.breast.clinicalDiagnosis}</strong></span>
              <span className="text-red-500 font-bold">{currentData.systems.breast.severityPercent}% severidad</span>
            </div>
          </div>

          {/* 2. Skeleton / Keel / Locomotion Card */}
          <div
            onClick={() => setActivePathology("skeleton")}
            className={`p-4 rounded-xl border transition-all cursor-pointer text-left space-y-2 ${
              activePathology === "skeleton"
                ? "bg-amber-500/10 border-amber-500/50 shadow-xs"
                : "bg-surface-dim/30 dark:bg-zinc-800/30 border-outline-variant/20 hover:border-outline-variant/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bone className="w-4 h-4 text-amber-500" />
                <h5 className="text-xs font-mono font-bold text-on-surface uppercase">
                  {currentData.systems.skeleton.title}
                </h5>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                currentData.systems.skeleton.severityLevel === "normal"
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                  : currentData.systems.skeleton.severityLevel === "mild"
                  ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                  : "bg-red-500/15 text-red-600 dark:text-red-400"
              }`}>
                {currentData.systems.skeleton.badge}
              </span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {currentData.systems.skeleton.description}
            </p>
            <div className="pt-1 border-t border-outline-variant/15 text-[10px] font-mono text-on-surface-variant/75 flex items-center justify-between">
              <span>Diagnóstico: <strong className="text-on-surface">{currentData.systems.skeleton.clinicalDiagnosis}</strong></span>
              <span className="text-amber-500 font-bold">{currentData.systems.skeleton.severityPercent}% tensión ósea</span>
            </div>
          </div>

          {/* 3. Cardiopulmonary / Ascites Card */}
          <div
            onClick={() => setActivePathology("cardio")}
            className={`p-4 rounded-xl border transition-all cursor-pointer text-left space-y-2 ${
              activePathology === "cardio"
                ? "bg-blue-500/10 border-blue-500/50 shadow-xs"
                : "bg-surface-dim/30 dark:bg-zinc-800/30 border-outline-variant/20 hover:border-outline-variant/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-500" />
                <h5 className="text-xs font-mono font-bold text-on-surface uppercase">
                  {currentData.systems.cardio.title}
                </h5>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                currentData.systems.cardio.severityLevel === "normal"
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                  : currentData.systems.cardio.severityLevel === "mild"
                  ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                  : "bg-red-500/15 text-red-600 dark:text-red-400"
              }`}>
                {currentData.systems.cardio.badge}
              </span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {currentData.systems.cardio.description}
            </p>
            <div className="pt-1 border-t border-outline-variant/15 text-[10px] font-mono text-on-surface-variant/75 flex items-center justify-between">
              <span>Diagnóstico: <strong className="text-on-surface">{currentData.systems.cardio.clinicalDiagnosis}</strong></span>
              <span className="text-blue-500 font-bold">Mortalidad metabólica: {currentData.metabolicMortalityRate}%</span>
            </div>
          </div>

          {/* 4. Pododermatitis & Hock Burns Card */}
          <div
            onClick={() => setActivePathology("pododermatitis")}
            className={`p-4 rounded-xl border transition-all cursor-pointer text-left space-y-2 ${
              activePathology === "pododermatitis"
                ? "bg-rose-500/10 border-rose-500/50 shadow-xs"
                : "bg-surface-dim/30 dark:bg-zinc-800/30 border-outline-variant/20 hover:border-outline-variant/50"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Footprints className="w-4 h-4 text-rose-500" />
                <h5 className="text-xs font-mono font-bold text-on-surface uppercase">
                  {currentData.systems.pododermatitis.title}
                </h5>
              </div>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                currentData.systems.pododermatitis.severityLevel === "normal"
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                  : currentData.systems.pododermatitis.severityLevel === "mild"
                  ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                  : "bg-rose-500/15 text-rose-600 dark:text-rose-400"
              }`}>
                {currentData.systems.pododermatitis.badge}
              </span>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              {currentData.systems.pododermatitis.description}
            </p>
            <div className="pt-1 border-t border-outline-variant/15 text-[10px] font-mono text-on-surface-variant/75 flex items-center justify-between">
              <span>Diagnóstico: <strong className="text-on-surface">{currentData.systems.pododermatitis.clinicalDiagnosis}</strong></span>
              <span className="text-rose-500 font-bold">Quemaduras químicas: {currentData.systems.pododermatitis.severityPercent}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scientific Modal */}
      <ScientificEvidenceModal
        sourceId="zuidhof-broiler-2014"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rawDataset={{
          selectedYear,
          data: currentData,
          evolutionSeries: BROILER_EVOLUTION_DATA
        }}
        datasetName="broiler_evolution_data"
      />
    </div>
  );
}
