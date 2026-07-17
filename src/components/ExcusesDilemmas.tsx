import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Compass,
  Search,
  Activity,
  Globe,
  BookOpen,
  Scale,
  HelpCircle,
  Terminal,
  ShieldAlert,
  Brain,
  Sparkles,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Heart,
  Check,
  ArrowLeft,
  ArrowRight,
  Network,
  Quote,
  Layers,
  X,
  BarChart3,
  LayoutGrid,
  List as ListIcon,
  Trophy,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DILEMMAS_DATA, ConsensusType, CORE_NODES } from "../types";
import type { DilemmaDetail as DilemmaDetailType } from "../types";
import { GLOSSARY_UNIFIED, GLOSSARY_CATEGORIES } from "../data/glossaryUnified";
import TextRenderer from "./TextRenderer";
import { Button } from "./ui/Button";
import { PageGlows } from "./ui/AmbientGlow";
import TabNav, { TabType } from "./TabNav";

/* ──────────────────────────────────────────────────────────────────────────
 *  Dialéctica · Socrática — rediseño completo
 *  Lista de tesis + panel lateral fijo (desktop) / hoja modal (móvil).
 *  Favoritos y progreso persistentes, enlaces cruzados, dashboard de visión
 *  general y resaltado de búsqueda.
 * ────────────────────────────────────────────────────────────────────────── */

interface ExcusesDilemmasProps {
  onAnalyzeTrigger: (excuseText: string) => void;
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

/* ── Persistencia: mismas claves kebab-case y patrón lazy + writer de la base ── */
const FAVORITES_KEY = "sintiens-dilemma-favoritos";
const VISITED_KEY = "sintiens-dilemma-visitados";

function loadStored<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T) : fallback;
  } catch {
    return fallback;
  }
}

/* ── Animación ── */
const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const headerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

/* ── Catálogos de filtros (mantienen etiquetas existentes) ── */
const CATEGORY_OPTIONS: { id: string; label: string; icon: React.ReactNode; color: string }[] = [
  { id: "all", label: "Todas", icon: null, color: "var(--on-surface-variant)" },
  { id: "sintiencia", label: "Sintiencia", icon: <Activity className="w-3.5 h-3.5" />, color: "var(--ch1)" },
  { id: "etica", label: "Ética", icon: <Scale className="w-3.5 h-3.5" />, color: "var(--ch4)" },
  { id: "sistemas_uso", label: "Sistemas de Uso", icon: <Layers className="w-3.5 h-3.5" />, color: "var(--ch2)" },
  { id: "ecologia", label: "Ecología", icon: <Globe className="w-3.5 h-3.5" />, color: "var(--ch5)" },
];

const CONSENSUS_OPTIONS: { id: string; label: string; type: ConsensusType | "all" }[] = [
  { id: "all", label: "Todas", type: "all" },
  { id: "CONSENSO", label: "Consenso", type: "CONSENSO" },
  { id: "DILEMA", label: "Dilema", type: "DILEMA" },
  { id: "ESCENARIO_GRIS", label: "Área Gris", type: "ESCENARIO_GRIS" },
  { id: "FALACIA", label: "Falacia", type: "FALACIA" },
];

const CATEGORY_COLOR_VAR: Record<string, string> = {
  sintiencia: "var(--ch1)",
  etica: "var(--ch4)",
  psicologia: "var(--ch3)",
  sistemas_uso: "var(--ch2)",
  ecologia: "var(--ch5)",
  legal: "var(--ch6)",
};

function getCategoryLabel(id: string): string {
  return CATEGORY_OPTIONS.find((o) => o.id === id)?.label ?? id;
}

function getCategoryColor(cat: string): string {
  return CATEGORY_COLOR_VAR[cat] || "var(--on-surface-variant)";
}

function getConsensusLabel(id: string): string {
  return CONSENSUS_OPTIONS.find((o) => o.id === id)?.label ?? id;
}

function getConsensusColor(consensus: ConsensusType) {
  switch (consensus) {
    case "CONSENSO":
      return "text-link bg-link/5 border-link/20";
    case "DILEMA":
      return "text-amber-600 dark:text-amber-400 bg-amber-500/5 border-amber-500/20";
    case "ESCENARIO_GRIS":
      return "text-purple-600 dark:text-purple-400 bg-purple-500/5 border-purple-500/20";
    case "FALACIA":
      return "text-red-600 dark:text-red-400 bg-red-500/5 border-red-500/20";
    default:
      return "text-on-surface-variant bg-surface-dim border-outline-variant/30";
  }
}

function getConsensusIcon(consensus: ConsensusType) {
  switch (consensus) {
    case "CONSENSO":
      return "◈";
    case "DILEMA":
      return "◇";
    case "ESCENARIO_GRIS":
      return "○";
    case "FALACIA":
      return "△";
    default:
      return "·";
  }
}

function getConsensusSolidColor(consensus: ConsensusType): string {
  switch (consensus) {
    case "CONSENSO":
      return "var(--link)";
    case "DILEMA":
      return "oklch(70% 0.16 75)"; // amber
    case "ESCENARIO_GRIS":
      return "oklch(65% 0.15 300)"; // purple
    case "FALACIA":
      return "oklch(62% 0.18 25)"; // red
    default:
      return "var(--outline)";
  }
}

function getCategoryIconByString(cat: string) {
  switch (cat) {
    case "sintiencia":
      return <Activity className="w-3.5 h-3.5" />;
    case "ecologia":
      return <Globe className="w-3.5 h-3.5" />;
    case "sistemas_uso":
      return <Layers className="w-3.5 h-3.5" />;
    case "etica":
      return <Scale className="w-3.5 h-3.5" />;
    default:
      return <HelpCircle className="w-3.5 h-3.5" />;
  }
}

/* ── Resaltado de búsqueda (réplica del patrón del Glosario) ── */
function highlight(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const safe = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${safe})`, "gi"));
  return parts.map((p, i) =>
    p.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-primary/20 text-on-surface rounded px-0.5">{p}</mark>
    ) : (
      <React.Fragment key={i}>{p}</React.Fragment>
    )
  );
}

/* ── Normaliza citas para detectar referencias compartidas entre tesis ── */
function normalizeCitation(c: string): string {
  return c
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[.,;:()"']/g, "")
    .trim()
    .slice(0, 60);
}

/* ──────────────────────────────────────────────────────────────────────────
 *  Utilidades de enlaces cruzados (memoizadas a nivel módulo por id)
 * ────────────────────────────────────────────────────────────────────────── */

const RELATED_GLOSSARY_CACHE = new Map<string, typeof GLOSSARY_UNIFIED>();

function getRelatedGlossary(dilemmaId: string) {
  const cached = RELATED_GLOSSARY_CACHE.get(dilemmaId);
  if (cached) return cached;
  const result = GLOSSARY_UNIFIED.filter((e) => (e.relatedDilemmas || []).includes(dilemmaId));
  RELATED_GLOSSARY_CACHE.set(dilemmaId, result);
  return result;
}

function getRelatedDilemmas(dilemma: DilemmaDetailType): DilemmaDetailType[] {
  const sharedRefs = new Set((dilemma.references || []).map((r) => normalizeCitation(r.citation)));
  return DILEMMAS_DATA.filter((d) => d.id !== dilemma.id)
    .map((d) => {
      let score = 0;
      if (d.category === dilemma.category) score += 2;
      if (d.consensus === dilemma.consensus) score += 1;
      const overlap = (d.references || []).filter((r) => sharedRefs.has(normalizeCitation(r.citation))).length;
      if (overlap > 0) score += overlap;
      return { d, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((x) => x.d);
}

function getRelatedNodes(dilemmaId: string): string[] {
  const seen = new Set<string>();
  getRelatedGlossary(dilemmaId).forEach((g) => {
    (g.relatedNodes || []).forEach((n) => seen.add(n));
  });
  return Array.from(seen).slice(0, 6);
}

/* ──────────────────────────────────────────────────────────────────────────
 *  Componente principal
 * ────────────────────────────────────────────────────────────────────────── */
export default function ExcusesDilemmas({ onAnalyzeTrigger, activeTab, onNavigate, theme, onToggleTheme }: ExcusesDilemmasProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedConsensus, setSelectedConsensus] = useState<string>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"general" | "lista">("general");
  const [isBibliographyOpen, setIsBibliographyOpen] = useState(false);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => loadStored<string[]>(FAVORITES_KEY, []));
  const [visited, setVisited] = useState<string[]>(() => loadStored<string[]>(VISITED_KEY, []));

  // Historial interno de navegación entre tesis (back/forward)
  const [history, setHistory] = useState<string[]>([]);
  const [forwardStack, setForwardStack] = useState<string[]>([]);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const detailScrollRef = useRef<HTMLDivElement>(null);
  const prevSelectedIdRef = useRef<string | null>(null);

  /* ── Persistencia ── */
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);
  useEffect(() => {
    localStorage.setItem(VISITED_KEY, JSON.stringify(visited));
  }, [visited]);

  /* ── Reset bibliografía al cambiar de tesis ── */
  useEffect(() => {
    setIsBibliographyOpen(false);
  }, [selectedId]);

  /* ── Scroll al inicio del panel de detalle al cambiar de tesis ── */
  useEffect(() => {
    if (selectedId && prevSelectedIdRef.current !== selectedId) {
      detailScrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      prevSelectedIdRef.current = selectedId;
    }
  }, [selectedId]);

  /* ── Atajos de teclado: `/` foco búsqueda, `Esc` cierra modal móvil ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        setViewMode("lista");
        setTimeout(() => searchInputRef.current?.focus(), 60);
      } else if (e.key === "Escape") {
        if (document.activeElement === searchInputRef.current) {
          searchInputRef.current?.blur();
        } else if (isMobileDetailOpen) {
          setIsMobileDetailOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isMobileDetailOpen]);

  /* ── Bloquear scroll del body cuando el modal móvil está abierto ── */
  useEffect(() => {
    if (isMobileDetailOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isMobileDetailOpen]);

  /* ── Listener inter-pestana: abrir una tesis desde fuera ── */
  useEffect(() => {
    const handleExpand = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (!id) return;
      if (DILEMMAS_DATA.some((d) => d.id === id)) {
        selectDilemma(id);
        setViewMode("lista");
        setSearchQuery("");
        setSelectedCategory("all");
        setSelectedConsensus("all");
        setTimeout(() => {
          document.getElementById("excuses-dialectic-view")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    };
    window.addEventListener("expand-dilemma", handleExpand);
    return () => window.removeEventListener("expand-dilemma", handleExpand);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Selección de tesis (gestiona historial y marca visitado) ── */
  const selectDilemma = (id: string) => {
    setSelectedId((prev) => {
      if (prev && prev !== id) setHistory((h) => [prev, ...h].slice(0, 50));
      return id;
    });
    setForwardStack([]);
    setVisited((v) => (v.includes(id) ? v : [...v, id]));
    if (window.innerWidth < 1024) setIsMobileDetailOpen(true);
  };

  const goBack = () => {
    if (history.length === 0) return;
    setSelectedId((prev) => {
      if (prev) setForwardStack((f) => [prev, ...f].slice(0, 50));
      const prevId = history[0];
      setHistory((h) => h.slice(1));
      return prevId;
    });
  };
  const goForward = () => {
    if (forwardStack.length === 0) return;
    setSelectedId((prev) => {
      if (prev) setHistory((h) => [prev, ...h].slice(0, 50));
      const nextId = forwardStack[0];
      setForwardStack((f) => f.slice(1));
      return nextId;
    });
  };

  const toggleFavorite = (id: string) => {
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  };

  /* ── Filtrado ── */
  const filteredDilemmas = useMemo(() => {
    return DILEMMAS_DATA.filter((d) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        d.title.toLowerCase().includes(q) ||
        d.popularStatement.toLowerCase().includes(q);
      const matchesCategory = selectedCategory === "all" || d.category === selectedCategory;
      const matchesConsensus = selectedConsensus === "all" || d.consensus === selectedConsensus;
      return matchesSearch && matchesCategory && matchesConsensus;
    });
  }, [searchQuery, selectedCategory, selectedConsensus]);

  /* ── Estadísticas para el dashboard ── */
  const stats = useMemo(() => {
    const consensusCounts: Record<string, number> = { CONSENSO: 0, DILEMA: 0, ESCENARIO_GRIS: 0, FALACIA: 0 };
    const categoryCounts: Record<string, number> = {};
    DILEMMAS_DATA.forEach((d) => {
      consensusCounts[d.consensus] = (consensusCounts[d.consensus] || 0) + 1;
      categoryCounts[d.category] = (categoryCounts[d.category] || 0) + 1;
    });
    return { consensusCounts, categoryCounts, total: DILEMMAS_DATA.length };
  }, []);

  const selectedDilemma = selectedId ? DILEMMAS_DATA.find((d) => d.id === selectedId) || null : null;

  return (
    <motion.section
      id="excuses-dialectic-view"
      initial="hidden"
      animate="visible"
      className="-mt-12 lg:-mt-20 space-y-10 w-full relative"
    >
      <PageGlows />

      {/* ───────────── HERO ───────────── */}
      <div className="w-full flex flex-col lg:justify-center items-center text-center relative h-[550px] min-h-[550px] lg:h-[600px] lg:min-h-[600px] pt-16 lg:pt-28 pb-20 lg:pb-24 px-6 lg:px-16 border-b border-outline-variant/20">
        {/* Esquinas tipo crosshair (técnico) */}
        {[
          "top-6 left-6",
          "top-6 right-6",
          "bottom-6 left-6",
          "bottom-6 right-6",
        ].map((pos) => (
          <div key={pos} className={`absolute ${pos} w-6 h-6 pointer-events-none select-none flex items-center justify-center`}>
            <div className="absolute w-4 h-[2px] bg-primary/30" />
            <div className="absolute w-[2px] h-4 bg-primary/30" />
          </div>
        ))}

        {/* Icono de fondo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
          <Compass
            className="text-zinc-900 dark:text-zinc-100 blur"
            style={{
              width: "clamp(144px, 45vw, 540px)",
              height: "clamp(144px, 45vw, 540px)",
              opacity: 0.08,
              strokeWidth: 1.5,
            }}
          />
        </div>

        <motion.div variants={headerVariants} className="relative z-10 space-y-6 max-w-3xl">
          <motion.span variants={childVariants} className="text-[10px] font-mono font-bold text-primary select-none tracking-[0.25em] uppercase block opacity-60">
            [ TESIS ]
          </motion.span>
          <motion.h1 variants={childVariants} className="text-[clamp(42px,8.5vw,80px)] font-bold tracking-tight font-heading leading-[1.05] text-on-background select-none">
            Crítica<span className="text-secondary/60 font-light block mt-2 text-[clamp(24px,4vw,40px)]">Dialéctica Socrática</span>
          </motion.h1>
          <motion.p variants={childVariants} className="max-w-2xl mx-auto pt-1 font-serif italic font-light text-on-surface-variant/70 leading-relaxed text-[14px] sm:text-[16px] md:text-[18px] lg:text-[19px] text-center tracking-normal select-none">
            Análisis crítico de las justificaciones antropocéntricas a través del tamiz de la evidencia científica y la consistencia ética.
          </motion.p>
          <motion.div variants={childVariants} className="flex items-center justify-center gap-6 pt-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
              <Quote className="w-3.5 h-3.5" />
              {stats.total} TESIS
            </span>
            <span className="w-px h-4 bg-outline-variant/50" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
              <Heart className="w-3.5 h-3.5" />
              {favorites.length} FAVORITAS
            </span>
            <span className="w-px h-4 bg-outline-variant/50" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
              <Check className="w-3.5 h-3.5" />
              {visited.length}/{stats.total} EXPLORADAS
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* ───────────── NAVEGACIÓN DE PESTAÑAS ───────────── */}
      <div className="w-full py-4 relative z-10">
        
      </div>

      {/* ───────────── TOGGLE DE VISTAS ───────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto relative z-10">
        {([
          { id: "general", label: "Visión General", description: "Distribución de consenso, categorías y progreso.", icon: <LayoutGrid className="w-4 h-4" /> },
          { id: "lista", label: "Explorar Tesis", description: "Filtra y deconstruye cada justificación popular.", icon: <ListIcon className="w-4 h-4" /> },
        ] as { id: typeof viewMode; label: string; description: string; icon: React.ReactNode }[]).map((v) => (
          <button
            key={v.id}
            onClick={() => setViewMode(v.id)}
            aria-pressed={viewMode === v.id}
            className={`glass-enhance border rounded-xl p-4 text-left relative z-10 transition-all cursor-pointer
              before:content-[''] before:absolute before:inset-0 before:rounded-[inherit]
              before:bg-surface-dim/20 dark:before:bg-surface-dim/10
              before:backdrop-blur-md before:z-[-1] before:pointer-events-none
              ${viewMode === v.id ? "border-primary/60 bg-primary/5" : "border-outline-variant/30 hover:border-outline-variant/60"}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={viewMode === v.id ? "text-primary" : "text-on-surface-variant"}>{v.icon}</span>
              <span className={`text-[10px] font-mono uppercase tracking-widest font-bold ${viewMode === v.id ? "text-primary" : "text-on-surface"}`}>
                {v.label}
              </span>
            </div>
            <p className="text-[11px] leading-snug text-on-surface-variant/80">{v.description}</p>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {viewMode === "general" ? (
          /* ════════════════════════════════════════════════════════════════
           *  VISTA GENERAL (dashboard)
           * ════════════════════════════════════════════════════════════════ */
          <motion.div
            key="general-view"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10"
          >
            {/* Distribución de consenso */}
            <div className="glass-enhance border border-outline-variant/30 rounded-2xl p-6 space-y-5 relative z-10 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none">
              <div className="flex items-center justify-between">
                <h3 className="text-technical-sm text-primary font-bold flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Distribución de Consenso
                </h3>
                <span className="text-[10px] font-mono text-on-surface-variant/40">{stats.total} TESIS</span>
              </div>
              <div className="space-y-4">
                {(["FALACIA", "DILEMA", "ESCENARIO_GRIS", "CONSENSO"] as ConsensusType[]).map((type) => {
                  const count = stats.consensusCounts[type] || 0;
                  const pct = stats.total > 0 ? (count / stats.total) * 100 : 0;
                  const color = getConsensusSolidColor(type);
                  return (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedConsensus(type);
                        setSelectedCategory("all");
                        setViewMode("lista");
                      }}
                      className="block w-full text-left group"
                    >
                      <div className="flex items-center justify-between mb-1.5 group-hover:translate-x-0.5 transition-transform">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant group-hover:text-on-surface flex items-center gap-1.5">
                          <span className="opacity-60">{getConsensusIcon(type)}</span>
                          {getConsensusLabel(type)}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-on-surface">{count}</span>
                      </div>
                      <div className="h-2 rounded-full bg-surface-dim/60 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                          className="h-full rounded-full group-hover:brightness-110 transition-all"
                          style={{ backgroundColor: color }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Categorías */}
            <div className="glass-enhance border border-outline-variant/30 rounded-2xl p-6 space-y-5 relative z-10 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none">
              <h3 className="text-technical-sm text-primary font-bold flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Por Categoría
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {CATEGORY_OPTIONS.filter((c) => c.id !== "all").map((cat) => {
                  const count = stats.categoryCounts[cat.id] || 0;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setSelectedConsensus("all");
                        setViewMode("lista");
                      }}
                      className="flex items-center justify-between p-3 rounded-lg border border-outline-variant/20 hover:border-primary/40 hover:bg-surface-dim/30 transition-all text-left group"
                    >
                      <span className="flex items-center gap-2 min-w-0">
                        <span style={{ color: cat.color }}>{cat.icon}</span>
                        <span className="text-[11px] font-medium text-on-surface truncate">{cat.label}</span>
                      </span>
                      <span className="text-[10px] font-mono font-bold text-on-surface-variant group-hover:text-primary shrink-0">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Progreso de exploración */}
            <div className="glass-enhance border border-outline-variant/30 rounded-2xl p-6 space-y-5 relative z-10 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none">
              <div className="flex items-center justify-between">
                <h3 className="text-technical-sm text-primary font-bold flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Progreso de Exploración
                </h3>
                <span className="text-[10px] font-mono text-on-surface-variant/40">
                  {visited.length}/{stats.total}
                </span>
              </div>
              <div>
                <div className="h-3 rounded-full bg-surface-dim/60 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stats.total > 0 ? (visited.length / stats.total) * 100 : 0}%` }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
                <p className="text-[11px] text-on-surface-variant/70 mt-3 leading-relaxed">
                  {visited.length === stats.total
                    ? "Has deconstruido todas las tesis del catálogo dialéctico."
                    : `Te faltan ${stats.total - visited.length} tesis por analizar críticamente.`}
                </p>
              </div>
            </div>

            {/* Favoritos */}
            <div className="glass-enhance border border-outline-variant/30 rounded-2xl p-6 space-y-5 relative z-10 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none">
              <h3 className="text-technical-sm text-primary font-bold flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Tesis Favoritas
              </h3>
              {favorites.length === 0 ? (
                <p className="text-[11px] text-on-surface-variant/60 leading-relaxed py-4">
                  Aún no has marcado ninguna tesis como favorita. Pulsa el corazón en cualquier análisis para guardarla aquí.
                </p>
              ) : (
                <div className="space-y-2">
                  {favorites.slice(0, 5).map((id) => {
                    const d = DILEMMAS_DATA.find((x) => x.id === id);
                    if (!d) return null;
                    return (
                      <button
                        key={id}
                        onClick={() => {
                          selectDilemma(id);
                          setViewMode("lista");
                        }}
                        className="w-full flex items-center gap-3 p-2.5 rounded-lg border border-outline-variant/20 hover:border-primary/40 hover:bg-surface-dim/30 transition-all text-left group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: getCategoryColor(d.category) }} />
                        <span className="text-[12px] text-on-surface group-hover:text-primary truncate flex-1">{d.title}</span>
                        <span className={`text-[9px] font-mono uppercase tracking-widest shrink-0 px-1.5 py-0.5 rounded-sm border ${getConsensusColor(d.consensus)}`}>
                          {getConsensusLabel(d.consensus)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          /* ════════════════════════════════════════════════════════════════
           *  VISTA LISTA (búsqueda + filtros + detalle)
           * ════════════════════════════════════════════════════════════════ */
          <motion.div
            key="list-view"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 relative z-10"
          >
            {/* ── Barra de búsqueda + filtros (pegajosa) ── */}
            <div className="glass-enhance border border-outline-variant/30 rounded-2xl p-3 lg:p-4 space-y-3 sticky top-3 z-30 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/40 dark:before:bg-surface-dim/20 before:backdrop-blur-md before:z-[-1] before:pointer-events-none">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar justificación popular..."
                  aria-label="Buscar justificaciones populares"
                  className="w-full bg-surface-dim/30 border border-outline-variant/30 focus:border-primary/60 focus:ring-2 focus:ring-primary/20 rounded-lg px-11 py-2.5 text-sm outline-none transition-all placeholder:text-on-surface-variant/40"
                />
                {!searchQuery && (
                  <kbd className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none px-1.5 py-0.5 rounded border border-outline-variant/30 bg-surface-dim/40 text-[10px] font-mono text-on-surface-variant/60 select-none">
                    /
                  </kbd>
                )}
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    aria-label="Limpiar búsqueda"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-surface-dim text-on-surface-variant hover:text-on-surface transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {/* Categorías */}
                <div className="flex gap-1 flex-wrap items-center">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-on-surface-variant/30 mr-1 select-none">Ámbito</span>
                  {CATEGORY_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedCategory(opt.id)}
                      aria-pressed={selectedCategory === opt.id}
                      className={`text-[10px] font-mono uppercase tracking-tighter px-2.5 py-1 rounded-md border transition-all flex items-center gap-1.5 ${
                        selectedCategory === opt.id
                          ? "border-primary/60 text-on-surface"
                          : "border-outline-variant/30 text-on-surface-variant hover:border-outline-variant"
                      }`}
                      style={selectedCategory === opt.id && opt.id !== "all" ? { backgroundColor: `color-mix(in oklch, ${opt.color} 12%, transparent)` } : undefined}
                    >
                      {opt.icon}
                      {opt.label}
                    </button>
                  ))}
                </div>

                <span className="w-px h-4 bg-outline-variant/40" aria-hidden="true" />

                {/* Consenso */}
                <div className="flex gap-1 flex-wrap items-center">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-on-surface-variant/30 mr-1 select-none">Consenso</span>
                  {CONSENSUS_OPTIONS.map((opt) => {
                    const isActive = selectedConsensus === opt.id;
                    const dotColor = opt.type !== "all" ? getConsensusSolidColor(opt.type) : "var(--on-surface-variant)";
                    return (
                      <button
                        key={opt.id}
                        onClick={() => setSelectedConsensus(opt.id)}
                        aria-pressed={isActive}
                        className={`text-[10px] font-mono uppercase tracking-tighter px-2.5 py-1 rounded-md border transition-all flex items-center gap-1.5 ${
                          isActive
                            ? "border-primary/60 text-on-surface"
                            : "border-outline-variant/30 text-on-surface-variant hover:border-outline-variant"
                        }`}
                        style={isActive && opt.type !== "all" ? { backgroundColor: `color-mix(in oklch, ${dotColor} 12%, transparent)` } : undefined}
                      >
                        {opt.type !== "all" && (
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: dotColor }} aria-hidden="true" />
                        )}
                        {opt.label}
                      </button>
                    );
                  })}
                </div>

                <span className="ml-auto text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/40">
                  {filteredDilemmas.length} {filteredDilemmas.length === 1 ? "resultado" : "resultados"}
                </span>
              </div>
            </div>

            {/* ── Layout principal: lista + panel lateral (bug original arreglado) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-8">
              {/* LISTA */}
              <div className="space-y-3">
                {filteredDilemmas.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-20 text-center space-y-4 border border-dashed border-outline-variant/30 rounded-xl bg-surface-dim/10"
                  >
                    <HelpCircle className="w-10 h-10 text-on-surface-variant/20 mx-auto" />
                    <p className="text-technical-xs uppercase tracking-widest text-on-surface-variant/40">Sin correspondencias dialécticas</p>
                    <p className="text-xs text-on-surface-variant/30 max-w-xs mx-auto leading-relaxed">
                      Intenta ajustar los filtros o modifica tu búsqueda.
                    </p>
                  </motion.div>
                ) : (
                  <AnimatePresence mode="popLayout">
                    {filteredDilemmas.map((dilemma, index) => {
                      const isSelected = selectedId === dilemma.id;
                      const isFav = favorites.includes(dilemma.id);
                      const isVisited = visited.includes(dilemma.id);
                      const catColor = getCategoryColor(dilemma.category);
                      return (
                        <motion.div
                          key={dilemma.id}
                          layout
                          variants={cardVariants}
                          initial="hidden"
                          animate="visible"
                          custom={index}
                        >
                          <div
                            role="button"
                            tabIndex={0}
                            aria-pressed={isSelected}
                            onClick={() => selectDilemma(dilemma.id)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                selectDilemma(dilemma.id);
                              }
                            }}
                            className={`group w-full text-left p-5 rounded-xl border transition-all duration-300 relative overflow-hidden cursor-pointer ${
                              isSelected
                                ? "border-primary bg-primary/[0.04]"
                                : "border-outline-variant/25 hover:border-primary/40 hover:bg-surface-dim/20"
                            }`}
                            style={isSelected ? { borderLeftColor: catColor, borderLeftWidth: "3px" } : undefined}
                          >
                            <div className="flex items-center justify-between gap-3 mb-3">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="p-1.5 rounded-sm shrink-0" style={{ color: catColor, backgroundColor: `color-mix(in oklch, ${catColor} 10%, transparent)` }}>
                                  {getCategoryIconByString(dilemma.category)}
                                </span>
                                <span className="text-[10px] font-mono tracking-widest uppercase text-on-surface-variant truncate">
                                  {getCategoryLabel(dilemma.category)}
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 shrink-0">
                                {isVisited && (
                                  <span className="text-on-surface-variant/40" title="Ya explorada" aria-hidden="true">
                                    <Check className="w-3.5 h-3.5" />
                                  </span>
                                )}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleFavorite(dilemma.id);
                                  }}
                                  aria-pressed={isFav}
                                  aria-label={isFav ? `Quitar "${dilemma.title}" de favoritos` : `Añadir "${dilemma.title}" a favoritos`}
                                  className={`p-1 rounded-full transition-all cursor-pointer ${isFav ? "text-red-500" : "text-on-surface-variant/30 hover:text-on-surface-variant"}`}
                                >
                                  <Heart className={`w-3.5 h-3.5 ${isFav ? "fill-current" : ""}`} />
                                </button>
                                <span className={`text-[9px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-sm border ${getConsensusColor(dilemma.consensus)}`}>
                                  <span className="mr-1 opacity-60" aria-hidden="true">{getConsensusIcon(dilemma.consensus)}</span>
                                  {getConsensusLabel(dilemma.consensus)}
                                </span>
                              </div>
                            </div>

                            <h3 className="text-base sm:text-lg font-heading font-semibold leading-tight text-on-surface group-hover:text-primary transition-colors mb-2">
                              {highlight(dilemma.title, searchQuery)}
                            </h3>

                            <blockquote className="text-[14px] text-on-surface-variant/70 italic border-l-2 border-outline-variant/30 pl-4 leading-relaxed py-1">
                              "{highlight(dilemma.popularStatement, searchQuery)}"
                            </blockquote>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                )}
              </div>

              {/* PANEL LATERAL (desktop) */}
              <div className="hidden lg:block relative">
                <div className="sticky top-24 max-h-[calc(100vh-12rem)] glass-enhance border border-outline-variant/25 rounded-xl relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-0 before:pointer-events-none">
                  <div
                    ref={detailScrollRef}
                    className="relative z-10 max-h-[calc(100vh-12rem)] overflow-y-auto custom-scrollbar"
                  >
                  <AnimatePresence mode="wait">
                    {selectedDilemma ? (
                      <motion.div
                        key={selectedDilemma.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
                        exit={{ opacity: 0, y: -8 }}
                      >
                        <DilemmaDetail
                          dilemma={selectedDilemma}
                          onAnalyze={onAnalyzeTrigger}
                          isBibliographyOpen={isBibliographyOpen}
                          setIsBibliographyOpen={setIsBibliographyOpen}
                          isFavorite={favorites.includes(selectedDilemma.id)}
                          onToggleFavorite={() => toggleFavorite(selectedDilemma.id)}
                          onSelectDilemma={selectDilemma}
                          onNavigateGlossary={(id) => window.dispatchEvent(new CustomEvent("navigate-to-glossary", { detail: id }))}
                          onNavigateNode={(id) => window.dispatchEvent(new CustomEvent("navigate-to-item", { detail: id }))}
                          history={history}
                          forwardStack={forwardStack}
                          onGoBack={goBack}
                          onGoForward={goForward}
                        />
                      </motion.div>
                    ) : (
                      <div className="p-10 h-[440px] flex flex-col items-center justify-center text-center text-on-surface-variant/40 space-y-6">
                        <Compass className="w-12 h-12 stroke-[0.5px] animate-rotate-slow" />
                        <div className="space-y-2">
                          <p className="text-technical-xs uppercase tracking-[0.2em]">Selecciona una tesis</p>
                          <p className="text-xs max-w-[220px] mx-auto leading-relaxed">
                            Haz clic en una tarjeta para desplegar el análisis dialéctico y científico.
                          </p>
                        </div>
                      </div>
                    )}
                  </AnimatePresence>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───────────── HOJA MODAL (móvil) ───────────── */}
      <AnimatePresence>
        {isMobileDetailOpen && selectedDilemma && (
          <div className="lg:hidden fixed inset-0 z-[100] flex items-end justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileDetailOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-h-[92vh] flex flex-col bg-background border-t border-outline-variant/30 rounded-t-xl z-10 custom-scrollbar shadow-2xl"
            >
              {/* Handle de arrastre + cierre */}
              <div className="sticky top-0 z-30 flex items-center justify-center pt-3 pb-2 bg-background/95 backdrop-blur-md border-b border-outline-variant/15 rounded-t-xl">
                <span className="absolute top-1.5 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-outline-variant/60" />
                <button
                  onClick={() => setIsMobileDetailOpen(false)}
                  className="ml-auto mr-4 mt-1 p-1.5 rounded-full hover:bg-surface-dim transition-colors"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="overflow-y-auto custom-scrollbar">
              <DilemmaDetail
                dilemma={selectedDilemma}
                onAnalyze={onAnalyzeTrigger}
                isBibliographyOpen={isBibliographyOpen}
                setIsBibliographyOpen={setIsBibliographyOpen}
                isFavorite={favorites.includes(selectedDilemma.id)}
                onToggleFavorite={() => toggleFavorite(selectedDilemma.id)}
                onSelectDilemma={selectDilemma}
                onNavigateGlossary={(id) => window.dispatchEvent(new CustomEvent("navigate-to-glossary", { detail: id }))}
                onNavigateNode={(id) => window.dispatchEvent(new CustomEvent("navigate-to-item", { detail: id }))}
                history={history}
                forwardStack={forwardStack}
                onGoBack={goBack}
                onGoForward={goForward}
              />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
 *  Panel de detalle de una tesis
 * ────────────────────────────────────────────────────────────────────────── */
interface DilemmaDetailProps {
  dilemma: DilemmaDetailType;
  onAnalyze: (excuse: string) => void;
  isBibliographyOpen: boolean;
  setIsBibliographyOpen: (v: boolean) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onSelectDilemma: (id: string) => void;
  onNavigateGlossary: (id: string) => void;
  onNavigateNode: (id: string) => void;
  history: string[];
  forwardStack: string[];
  onGoBack: () => void;
  onGoForward: () => void;
}

function DilemmaDetail({
  dilemma,
  onAnalyze,
  isBibliographyOpen,
  setIsBibliographyOpen,
  isFavorite,
  onToggleFavorite,
  onSelectDilemma,
  onNavigateGlossary,
  onNavigateNode,
  history,
  forwardStack,
  onGoBack,
  onGoForward,
}: DilemmaDetailProps) {
  const catColor = getCategoryColor(dilemma.category);
  const sectionTitleClass = "text-technical-xs text-primary flex items-center gap-2 font-bold";

  const relatedGlossary = useMemo(() => getRelatedGlossary(dilemma.id), [dilemma.id]);
  const relatedDilemmas = useMemo(() => getRelatedDilemmas(dilemma), [dilemma]);
  const relatedNodeIds = useMemo(() => getRelatedNodes(dilemma.id), [dilemma.id]);

  return (
    <div className="flex flex-col gap-6 p-6 lg:p-7">
      {/* ── Cabecera pegajosa ── */}
      <div className="sticky top-0 z-20 -mx-6 lg:-mx-7 px-6 lg:px-7 py-4 bg-background/85 backdrop-blur-md border-b border-outline-variant/15">
        {/* Navegación back/forward */}
        <div className="flex items-center gap-1 mb-3 -ml-1">
          <button
            onClick={onGoBack}
            disabled={history.length === 0}
            aria-label="Tesis anterior"
            className="p-1.5 rounded-md text-on-surface-variant/60 hover:text-primary hover:bg-surface-dim/50 disabled:opacity-25 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onGoForward}
            disabled={forwardStack.length === 0}
            aria-label="Tesis siguiente"
            className="p-1.5 rounded-md text-on-surface-variant/60 hover:text-primary hover:bg-surface-dim/50 disabled:opacity-25 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <span className="ml-2 text-[9px] font-mono uppercase tracking-widest text-on-surface-variant/30 select-none">
            {history.length > 0 || forwardStack.length > 0 ? `${history.length} · ${forwardStack.length}` : "inicio"}
          </span>
          <button
            onClick={onToggleFavorite}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
            className={`ml-auto p-1.5 rounded-md transition-all ${isFavorite ? "text-red-500" : "text-on-surface-variant/50 hover:text-on-surface-variant"}`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span
            className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm border text-[10px] font-mono uppercase tracking-[0.2em]"
            style={{ backgroundColor: `color-mix(in oklch, ${catColor} 12%, transparent)`, color: catColor, borderColor: `color-mix(in oklch, ${catColor} 35%, transparent)` }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: catColor }} />
            {getCategoryLabel(dilemma.category)}
          </span>
          <span className={`text-[9px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-sm border ${getConsensusColor(dilemma.consensus)}`}>
            <span className="mr-1 opacity-60">{getConsensusIcon(dilemma.consensus)}</span>
            {getConsensusLabel(dilemma.consensus)}
          </span>
        </div>
        <h2 className="text-on-surface border-l-4 pl-4 py-1 leading-tight" style={{ borderColor: catColor, fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "clamp(22px, 2.6vw, 30px)", letterSpacing: "-0.015em" }}>
          {dilemma.title}
        </h2>
      </div>

      {/* ── Enunciado popular ── */}
      <blockquote className="text-body-md text-on-surface-variant/70 italic border-l-2 border-outline-variant/30 pl-5 leading-relaxed">
        "{dilemma.popularStatement}"
      </blockquote>

      {/* ── Análisis científico ── */}
      <div className="space-y-3">
        <h4 className={sectionTitleClass} style={{ color: "var(--link)" }}>
          <Terminal className="w-4 h-4" />
          Análisis Científico
        </h4>
        <div className="text-body-md text-on-surface-variant leading-relaxed">
          <TextRenderer text={dilemma.scientificDeconstruction} references={dilemma.references} />
        </div>
      </div>

      {/* ── Deconstrucción lógica ── */}
      <div className="space-y-3">
        <h4 className={sectionTitleClass}>
          <Brain className="w-4 h-4" />
          Deconstrucción Lógica
        </h4>
        <div className="text-body-md text-on-surface-variant leading-relaxed">
          <TextRenderer text={dilemma.philosophicalDeconstruction} references={dilemma.references} />
        </div>
      </div>

      {/* ── Impacto sistémico ── */}
      <div className="bg-surface-dim/30 p-5 rounded-lg border border-outline-variant/15 space-y-3">
        <h4 className="text-technical-xs text-on-surface uppercase tracking-widest flex items-center gap-2">
          <ShieldAlert className="w-3.5 h-3.5 text-primary" />
          Impacto Sistémico
        </h4>
        <p className="text-[15px] text-on-surface-variant/85 leading-relaxed">
          <TextRenderer text={dilemma.coexistenceImpact} references={dilemma.references} />
        </p>
      </div>

      {/* ── Pregunta abierta ── */}
      {dilemma.openQuestion && (
        <div className="p-4 border-l-2 border-primary bg-primary/5 rounded-r-lg">
          <p className="text-[15px] text-on-surface-variant italic leading-relaxed">{dilemma.openQuestion}</p>
        </div>
      )}

      {/* ═══════ ENLACES CRUZADOS ═══════ */}
      {(relatedGlossary.length > 0 || relatedDilemmas.length > 0 || relatedNodeIds.length > 0) && (
        <div className="space-y-4 pt-2 border-t border-outline-variant/15">
          <h4 className={sectionTitleClass}>
            <Network className="w-4 h-4" />
            Conexiones
          </h4>

          {/* Conceptos del glosario relacionados */}
          {relatedGlossary.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-1.5">
                <BookOpen className="w-3 h-3" />
                Conceptos del glosario
              </span>
              <div className="flex flex-wrap gap-2">
                {relatedGlossary.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => onNavigateGlossary(g.id)}
                    aria-label={`Ir al glosario: ${g.term}`}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-dim/25 border border-outline-variant/25 hover:border-primary/50 hover:bg-surface-dim/45 transition-all text-[11px] group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `var(--${GLOSSARY_CATEGORIES.find((c) => c.id === g.category)?.color || "ch1"})` }} />
                    <span className="text-on-surface group-hover:text-primary transition-colors">{g.term}</span>
                    <ExternalLink className="w-3 h-3 text-primary/40 group-hover:text-primary transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tesis vinculadas */}
          {relatedDilemmas.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-1.5">
                <Quote className="w-3 h-3" />
                Tesis vinculadas
              </span>
              <div className="flex flex-wrap gap-2">
                {relatedDilemmas.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => onSelectDilemma(d.id)}
                    aria-label={`Abrir tesis vinculada: ${d.title}`}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-dim/25 border border-outline-variant/25 hover:border-primary/50 hover:bg-surface-dim/45 transition-all text-[11px] group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getCategoryColor(d.category) }} />
                    <span className="text-on-surface group-hover:text-primary transition-colors">{d.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Nodos del sistema */}
          {relatedNodeIds.length > 0 && (
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-1.5">
                <Layers className="w-3 h-3" />
                Nodos del sistema
              </span>
              <div className="flex flex-wrap gap-2">
                {relatedNodeIds.map((id) => {
                  const node = CORE_NODES.find((n) => n.id === id);
                  if (!node) return null;
                  return (
                    <button
                      key={id}
                      onClick={() => onNavigateNode(id)}
                      aria-label={`Ir al nodo del sistema: ${node.title}`}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-dim/25 border border-outline-variant/25 hover:border-primary/50 hover:bg-surface-dim/45 transition-all text-[11px] group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getCategoryColor(node.category) }} />
                      <span className="text-on-surface group-hover:text-primary transition-colors">{node.title}</span>
                      <ExternalLink className="w-3 h-3 text-primary/40 group-hover:text-primary transition-all" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Fuentes ── */}
      {dilemma.references && dilemma.references.length > 0 && (
        <div className="pt-2">
          <button
            onClick={() => setIsBibliographyOpen(!isBibliographyOpen)}
            aria-expanded={isBibliographyOpen}
            className="flex items-center justify-between w-full py-3 border-t border-outline-variant/30 text-technical-xs text-on-surface-variant hover:text-primary transition-all group"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 opacity-50 group-hover:opacity-100" />
              FUENTES ({dilemma.references.length})
            </span>
            {isBibliographyOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          <AnimatePresence>
            {isBibliographyOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <ul className="pb-4 space-y-3">
                  {dilemma.references.map((ref) => (
                    <li key={ref.id} className="text-[11px] leading-relaxed text-on-surface-variant/70 font-sans pl-4 border-l border-outline-variant/50">
                      <span className="font-bold text-primary mr-2">[{ref.id}]</span>
                      {ref.citation}
                      {ref.url && (
                        <a href={ref.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-link hover:underline ml-2 align-middle">
                          enlace <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ── CTA Analizar con IA ── */}
      <Button variant="primary" className="w-full gap-2 shadow-lg" onClick={() => onAnalyze(dilemma.popularStatement)}>
        <Sparkles className="w-4 h-4" />
        Analizar con IA de Sintiens
      </Button>
    </div>
  );
}
