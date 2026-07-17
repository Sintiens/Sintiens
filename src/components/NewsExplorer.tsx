import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Newspaper, 
  Scale, 
  Search, 
  Calendar, 
  ExternalLink, 
  Globe, 
  Landmark, 
  TrendingUp, 
  FileText, 
  TrendingDown, 
  Eye, 
  CheckCircle, 
  AlertTriangle,
  MapPin
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from "recharts";
import TabNav, { TabType } from "./TabNav";
import { PageGlows } from "./ui/AmbientGlow";
import { NEWS_DATA, NewsItem } from "../data/newsData";

interface NewsExplorerProps {
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

const CATEGORIES = [
  { id: "all", label: "Todas las Temáticas" },
  { id: "ley", label: "Nueva Ley", desc: "Cambios regulatorios y legislativos" },
  { id: "consumo", label: "Tendencias de Consumo", desc: "Mercado y alimentación alternativa" },
  { id: "ciencia", label: "Ciencia y Sintiencia", desc: "Evidencia neurocientífica y cognitiva" },
  { id: "social", label: "Activismo y Conciencia", desc: "Acción ciudadana y debates morales" },
  { id: "industria", label: "Industria y Producción", desc: "Ganadería intensiva y explotación" },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isPositive = data.impact === "positivo";
    const isNegative = data.impact === "negativo";
    const impactText = isPositive ? "+5" : isNegative ? "-5" : "";
    const impactBadgeClass = isPositive
      ? "bg-green-500/10 text-green-600 dark:bg-green-400/10 dark:text-green-400 border border-green-500/20"
      : isNegative
        ? "bg-red-500/10 text-red-500 dark:bg-red-400/10 dark:text-red-400 border border-red-500/20"
        : "bg-surface-dim text-on-surface-variant/70 border border-outline-variant/30";

    const titleSnippet = data.title && data.id !== "baseline"
      ? data.title
      : "Línea de Base Moral";

    return (
      <div className="border border-outline-variant/40 rounded-xl p-2.5 shadow-xl text-left pointer-events-none w-44 bg-surface/95 dark:bg-surface-dim/95 backdrop-blur-md relative z-50 text-[10px] font-mono select-none outline-none focus:outline-none flex flex-col gap-1.5 border-none">
        {/* Title (spans full width at the top) */}
        <div className="text-[10px] font-sans font-medium text-on-surface leading-tight break-words pr-1 line-clamp-2">
          {titleSnippet}
        </div>

        {/* Footer: Date, Points, and Impact Pill consolidated in one row */}
        <div className="flex items-center justify-between text-[9px] border-t border-outline-variant/15 pt-1.5 mt-0.5 text-on-surface-variant/60 font-mono">
          <span>{data.id === "baseline" ? "Inicio" : data.date}</span>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-primary">{data["Progreso Moral"]} pts</span>
            {impactText && (
              <span className={`px-1 py-0.25 rounded-[3px] text-[7.5px] font-bold tracking-tighter ${impactBadgeClass}`}>
                {impactText}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function NewsExplorer({ activeTab, onNavigate, theme, onToggleTheme }: NewsExplorerProps) {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        const rect = navRef.current.getBoundingClientRect();
        // If the top of the nav container hits the top of the viewport
        window.dispatchEvent(new CustomEvent('toggle-min-nav', { detail: rect.top <= 0 }));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Call once on mount
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.dispatchEvent(new CustomEvent('toggle-min-nav', { detail: false }));
    };
  }, []);

  // State for filters
  const [selectedRegion, setSelectedRegion] = useState<"todos" | "españa" | "mundo">("todos");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedImpact, setSelectedImpact] = useState<"todos" | "positivo" | "negativo">("todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [highlightedCardId, setHighlightedCardId] = useState<string | null>(null);

  const handlePointClickDirect = (clickedData: any) => {
    if (clickedData && clickedData.id && clickedData.id !== "baseline") {
      const item = NEWS_DATA.find((n) => n.id === clickedData.id);
      if (item) {
        let filtersChanged = false;
        if (selectedRegion !== "todos" && selectedRegion !== item.region) {
          setSelectedRegion("todos");
          filtersChanged = true;
        }
        if (selectedCategory !== "all" && selectedCategory !== item.category) {
          setSelectedCategory("all");
          filtersChanged = true;
        }
        if (selectedImpact !== "todos" && selectedImpact !== item.impact) {
          setSelectedImpact("todos");
          filtersChanged = true;
        }
        if (searchQuery !== "") {
          const query = searchQuery.toLowerCase().trim();
          const matchesSearch = item.title.toLowerCase().includes(query) || 
            item.summary.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query);
          if (!matchesSearch) {
            setSearchQuery("");
            filtersChanged = true;
          }
        }

        const scrollToTarget = () => {
          const element = document.getElementById(item.id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            setHighlightedCardId(item.id);
            setTimeout(() => {
              setHighlightedCardId(null);
            }, 3000);
          }
        };

        if (filtersChanged) {
          setTimeout(scrollToTarget, 150);
        } else {
          scrollToTarget();
        }
      }
    }
  };



  // Filtered news
  const filteredNews = useMemo(() => {
    return NEWS_DATA.filter((item) => {
      const matchesRegion = selectedRegion === "todos" || item.region === selectedRegion;
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesImpact = selectedImpact === "todos" || item.impact === selectedImpact;
      
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = query === "" || 
        item.title.toLowerCase().includes(query) || 
        item.summary.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      return matchesRegion && matchesCategory && matchesImpact && matchesSearch;
    });
  }, [selectedRegion, selectedCategory, selectedImpact, searchQuery]);

  // Sort the filtered news descending for the grid display (newest first)
  const sortedNewsForGrid = useMemo(() => {
    return [...filteredNews].sort((a, b) => b.date.localeCompare(a.date));
  }, [filteredNews]);

  // Dynamic calculations for Balanza de Impacto
  const { positiveCount, negativeCount, totalCount, balancePercent, balanceScore } = useMemo(() => {
    const pos = filteredNews.filter(n => n.impact === "positivo").length;
    const neg = filteredNews.filter(n => n.impact === "negativo").length;
    const tot = filteredNews.length;
    
    // Balance percentage from 0 (all negative) to 100 (all positive), 50 is neutral
    const percent = tot > 0 ? Math.round((pos / tot) * 100) : 50;
    // Score between -100% and +100%
    const score = pos - neg;
    
    return {
      positiveCount: pos,
      negativeCount: neg,
      totalCount: tot,
      balancePercent: percent,
      balanceScore: score
    };
  }, [filteredNews]);

  // Physical SVG balance tilt angle based on the ratio of positive vs negative news
  // More positive news tilts the balance to the right (positive angle), more negative to the left (negative angle)
  const balanceTiltAngle = useMemo(() => {
    if (totalCount === 0) return 0;
    const ratio = (positiveCount - negativeCount) / totalCount; // Range -1 to +1
    return ratio * 15; // Max 15 degrees tilt
  }, [positiveCount, negativeCount, totalCount]);

  // Dynamic calculations for the Progress Index Timeline Chart
  const timelineData = useMemo(() => {
    // We sort the *filtered* news chronologically
    const sorted = [...filteredNews].sort((a, b) => a.date.localeCompare(b.date));
    
    let currentScore = 50; // Starting baseline
    const points = sorted.map((item) => {
      currentScore += item.impact === "positivo" ? 5 : -5;
      return {
        id: item.id,
        date: item.date,
        formattedDate: new Date(item.date).toLocaleDateString("es-ES", {
          month: "short",
          year: "2-digit",
        }),
        "Progreso Moral": currentScore,
        title: item.title,
        impact: item.impact,
      };
    });

    if (points.length === 0) {
      return [{ date: "Línea de base", formattedDate: "Inicio", "Progreso Moral": 50, id: "baseline" }];
    }

    // Prepend a starting baseline point one month prior to the first news item
    const firstDate = new Date(sorted[0].date);
    firstDate.setMonth(firstDate.getMonth() - 1);
    const baselineDateStr = firstDate.toISOString().split("T")[0];
    const formattedBaseline = firstDate.toLocaleDateString("es-ES", {
      month: "short",
      year: "2-digit",
    });

    return [
      {
        id: "baseline",
        date: baselineDateStr,
        formattedDate: formattedBaseline,
        "Progreso Moral": 50,
        title: "Línea de Base Moral",
        impact: "neutral",
      },
      ...points,
    ];
  }, [filteredNews]);

  // Category translations for tags
  const getCategoryLabel = (cat: string) => {
    const found = CATEGORIES.find(c => c.id === cat);
    return found ? found.label : cat;
  };

  // Split columns for desktop (3 columns) to preserve horizontal chronological ordering (left-to-right)
  const colDesktop1 = useMemo(() => sortedNewsForGrid.filter((_, idx) => idx % 3 === 0), [sortedNewsForGrid]);
  const colDesktop2 = useMemo(() => sortedNewsForGrid.filter((_, idx) => idx % 3 === 1), [sortedNewsForGrid]);
  const colDesktop3 = useMemo(() => sortedNewsForGrid.filter((_, idx) => idx % 3 === 2), [sortedNewsForGrid]);

  // Split columns for tablet (2 columns)
  const colTablet1 = useMemo(() => sortedNewsForGrid.filter((_, idx) => idx % 2 === 0), [sortedNewsForGrid]);
  const colTablet2 = useMemo(() => sortedNewsForGrid.filter((_, idx) => idx % 2 === 1), [sortedNewsForGrid]);

  // Helper function to render a news card
  const renderCard = (item: NewsItem) => {
    const isHighlighted = highlightedCardId === item.id;
    const glowBgClass = item.impact === "positivo"
      ? "bg-green-500/25 dark:bg-green-400/20"
      : "bg-red-500/25 dark:bg-red-400/20";
    const highlightedBorderClass = isHighlighted
      ? (item.impact === "positivo"
          ? "border-green-500 dark:border-green-400 ring-2 ring-green-500/30 scale-[1.02] z-20 shadow-[0_0_30px_rgba(34,197,94,0.15)]"
          : "border-red-500 dark:border-red-400 ring-2 ring-red-500/30 scale-[1.02] z-20 shadow-[0_0_30px_rgba(239,68,68,0.15)]")
      : "border-outline-variant/30";

    return (
      <motion.div
        id={item.id}
        key={item.id}
        layout
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="block w-full scroll-mt-24 relative"
      >
        {/* Ambient Glow behind the card */}
        {isHighlighted && (
          <div className={`absolute -inset-2 rounded-2xl blur-xl opacity-60 z-0 animate-pulse pointer-events-none transition-all duration-700 ${glowBgClass}`} />
        )}
        <div className={`glass-enhance border rounded-xl p-6 flex flex-col justify-between relative hover:border-primary/45 transition-all duration-300 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none group z-10 ${highlightedBorderClass}`}>
          <div className="space-y-4">
            {/* Tags and Date */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-technical-xs text-on-surface-variant/60">
              {/* Region and category tags */}
              <div className="flex gap-2 items-center">
                <span className="flex items-center gap-1 bg-surface-dim/60 dark:bg-surface-container/60 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase border border-outline-variant/20">
                  {item.region === "españa" ? <MapPin className="w-2.5 h-2.5 text-primary" /> : <Globe className="w-2.5 h-2.5 text-secondary" />}
                  {item.region}
                </span>
                <span className="bg-surface-dim/60 dark:bg-surface-container/60 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase border border-outline-variant/20">
                  {getCategoryLabel(item.category)}
                </span>
              </div>
              {/* Date */}
              <span className="flex items-center gap-1 font-mono">
                <Calendar className="w-3 h-3" />
                {item.date}
              </span>
            </div>

            {/* Title */}
            <h4 className="text-xl font-heading font-semibold text-on-surface group-hover:text-primary transition-colors leading-tight">
              {item.title}
            </h4>

            {/* Summary / Critique */}
            <p className="text-body-md text-on-surface-variant leading-relaxed font-light opacity-90">
              {item.summary}
            </p>
          </div>

          {/* Footer containing Moral Rating and Link */}
          <div className="mt-6 pt-4 border-t border-outline-variant/20 flex items-center justify-between">
            {/* Moral Impact Indicator */}
            <div className="flex items-center gap-1.5">
              {item.impact === "positivo" ? (
                <span className="flex items-center gap-1 text-[10px] font-mono text-green-600 dark:text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                  <CheckCircle className="w-3 h-3" />
                  FAVORECE
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-mono text-red-500 dark:text-red-400 font-bold bg-red-500/10 px-2 py-0.5 rounded border border-red-500/20">
                  <AlertTriangle className="w-3 h-3" />
                  PERJUDICA
                </span>
              )}
            </div>

            {/* Citation Link (Visual Media Badge) */}
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 h-8 rounded-full bg-surface-dim dark:bg-surface-container border border-outline-variant/30 hover:border-link/50 hover:bg-link/5 hover:text-link text-on-surface-variant/80 transition-all duration-300 group shadow-[0_1px_2px_rgba(0,0,0,0.02)] pl-0 pr-3"
            >
              <span className="-ml-px w-8 h-8 rounded-full bg-white dark:bg-zinc-800 border border-outline-variant/30 flex items-center justify-center shrink-0 shadow-sm overflow-hidden z-10">
                <img 
                  src={`https://www.google.com/s2/favicons?sz=64&domain=${new URL(item.url).hostname}`} 
                  alt={item.source}
                  className="w-4.5 h-4.5 object-contain transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2'/%3E%3Cpath d='M18 14h-8'/%3E%3Cpath d='M15 18h-5'/%3E%3Cpath d='M10 6h8v4h-8V6Z'/%3E%3C/svg%3E";
                  }}
                />
              </span>
              <span className="tracking-wider uppercase text-[10px] font-mono font-bold text-on-surface-variant/90 group-hover:text-link transition-colors duration-300">
                {item.source}
              </span>
              <ExternalLink className="w-2.5 h-2.5 text-on-surface-variant/50 group-hover:text-link group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300 shrink-0 ml-0.5" />
            </a>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div id="news-section-view" className="-mt-12 lg:-mt-20 space-y-10 w-full relative">
      <PageGlows />

      {/* Header */}
      <div className="w-full flex flex-col lg:justify-center items-center text-center relative h-[550px] min-h-[550px] lg:h-[600px] lg:min-h-[600px] pt-16 lg:pt-28 pb-20 lg:pb-24 px-6 lg:px-16 border-b border-outline-variant/20">
        <div className="absolute top-[25px] left-[20px] w-6 h-6 pointer-events-none select-none flex items-center justify-center">
          <div className="absolute w-4 h-[2px] bg-primary/30" /><div className="absolute w-[2px] h-4 bg-primary/30" />
        </div>
        <div className="absolute top-[25px] right-[20px] w-6 h-6 pointer-events-none select-none flex items-center justify-center">
          <div className="absolute w-4 h-[2px] bg-primary/30" /><div className="absolute w-[2px] h-4 bg-primary/30" />
        </div>

        <span className="text-[10px] font-mono font-bold text-primary select-none tracking-[0.25em] uppercase block opacity-60 mb-4">
          [ DEBATE Y ACTUALIDAD ]
        </span>
        <h3 className="text-[clamp(42px,8.5vw,80px)] font-bold tracking-tight font-heading leading-[1.05] text-on-background select-none mb-4">
          Recopilatorio de Noticias<span className="text-secondary/60 font-light block mt-2 text-[clamp(24px,4vw,40px)]">España y el Mundo</span>
        </h3>
        <p className="max-w-2xl mx-auto pt-1 font-serif italic font-light text-on-surface-variant/70 leading-relaxed text-[14px] sm:text-[16px] md:text-[18px] lg:text-[19px] text-center tracking-normal select-none">
          Análisis del estado moral y legal de nuestra relación con los animales. Monitoreo continuo de avances legislativos, tendencias de consumo, hitos científicos e industriales.
        </p>
      </div>

      {/* Tabs navigation panel */}
      <div ref={navRef} className="w-full relative z-[100] px-6 lg:px-16 max-w-7xl mx-auto pb-8">
        <div className="flex justify-center">
          <div className="pointer-events-auto">
            {/* TabNav is now global in App.tsx */}
          </div>
        </div>
      </div>

      {/* Interactive Controls & Filters */}
      <div className="glass-enhance border border-outline-variant/30 rounded-2xl p-6 relative z-10 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none space-y-6">
        
        {/* Search and Region (First Row) */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search box */}
          <div className="relative w-full md:max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant/50">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Buscar por palabra clave, ley, país..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-dim/50 border border-outline-variant/40 rounded-lg pl-10 pr-4 py-2.5 text-sm font-sans focus:outline-none focus:border-primary transition-all text-on-surface placeholder-on-surface-variant/40"
            />
          </div>

          {/* Region Switcher */}
          <div className="flex border border-outline-variant/30 rounded-lg overflow-hidden bg-surface-dim/30 p-1 shrink-0 w-full md:w-auto">
            {(["todos", "españa", "mundo"] as const).map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`flex-1 md:flex-none px-4 py-1.5 rounded-md text-[10px] font-mono tracking-wider uppercase transition-all cursor-pointer ${
                  selectedRegion === region
                    ? "bg-primary text-on-primary font-bold shadow-sm"
                    : "text-on-surface-variant/80 hover:text-primary hover:bg-surface-dim/50"
                }`}
              >
                {region === "todos" ? "Ambas Regiones" : region}
              </button>
            ))}
          </div>
        </div>

        {/* Category filters (Second Row) */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono text-on-surface-variant/60 uppercase tracking-widest block">
            FILTRAR POR TEMÁTICA
          </span>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                title={cat.desc}
                className={`px-3.5 py-2 rounded-md text-technical-xs transition-all border cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-primary text-on-primary border-transparent font-semibold"
                    : "bg-surface-dim/30 border-outline-variant/30 text-on-surface-variant hover:text-primary hover:border-outline"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Moral Impact filter & reset button (Third Row) */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-2 border-t border-outline-variant/20">
          
          {/* Moral Impact */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-[10px] font-mono text-on-surface-variant/60 uppercase tracking-widest shrink-0">
              IMPACTO MORAL:
            </span>
            <div className="flex gap-2">
              {(["todos", "positivo", "negativo"] as const).map((impact) => (
                <button
                  key={impact}
                  onClick={() => setSelectedImpact(impact)}
                  className={`px-3 py-1 rounded-md text-[10px] font-mono tracking-wider uppercase border transition-all cursor-pointer ${
                    selectedImpact === impact
                      ? "bg-primary text-on-primary border-transparent font-bold"
                      : "bg-surface-dim/20 border-outline-variant/20 text-on-surface-variant hover:text-primary"
                  }`}
                >
                  {impact === "todos" ? "Todos" : impact === "positivo" ? "Pro-Derechos" : "Perjudicial"}
                </button>
              ))}
            </div>
          </div>

          {/* Reset button */}
          {(selectedRegion !== "todos" || selectedCategory !== "all" || selectedImpact !== "todos" || searchQuery !== "") && (
            <button
              onClick={() => {
                setSelectedRegion("todos");
                setSelectedCategory("all");
                setSelectedImpact("todos");
                setSearchQuery("");
              }}
              className="text-[10px] font-mono text-link hover:text-link/85 cursor-pointer underline underline-offset-4"
            >
              Restablecer todos los filtros
            </button>
          )}
        </div>

      </div>

      {/* Widgets: Balanza de Impacto & Línea de Tiempo de Progreso */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Balanza de Impacto (Col 5) */}
        <div className="lg:col-span-5 glass-enhance border border-outline-variant/30 rounded-2xl p-6 flex flex-col justify-between relative z-10 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none">
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-on-surface-variant/60 uppercase tracking-widest block">
              BALANZA MORAL DE RELACIÓN
            </span>
            <h4 className="text-technical-sm text-primary font-bold flex items-center gap-2">
              <Scale className="w-4 h-4" />
              Equilibrio Ético Actual
            </h4>
            <p className="text-xs text-on-surface-variant/80 font-light">
              Mide la proporción de noticias registradas que avanzan en derechos frente a aquellas que vulneran o explotan la sintiencia.
            </p>
          </div>

          {/* SVG Balance Scale Visual */}
          <div className="flex flex-col items-center justify-center my-6 py-2">
            <svg width="220" height="130" viewBox="0 0 220 130" className="overflow-visible">
              {/* Stand/Base */}
              <path d="M110 30 L110 115" stroke="var(--outline)" strokeWidth="4" strokeLinecap="round" />
              <path d="M80 115 L140 115" stroke="var(--outline)" strokeWidth="6" strokeLinecap="round" />
              <path d="M90 121 L130 121" stroke="var(--outline-variant)" strokeWidth="3" strokeLinecap="round" />
              
              {/* Fulcrum Point */}
              <circle cx="110" cy="30" r="6" fill="var(--primary)" />

              {/* Rotatable Beam (Tilts based on balanceTiltAngle) */}
              <g style={{ 
                transform: `rotate(${balanceTiltAngle}deg)`, 
                transformOrigin: '110px 30px', 
                transition: 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)' 
              }}>
                {/* Main Beam */}
                <line x1="30" y1="30" x2="190" y2="30" stroke="var(--primary)" strokeWidth="4" strokeLinecap="round" />
                <circle cx="30" cy="30" r="3" fill="var(--outline)" />
                <circle cx="190" cy="30" r="3" fill="var(--outline)" />

                {/* Left Pan (Negative / Exploitation Side) */}
                <g style={{ 
                  transform: `rotate(${-balanceTiltAngle}deg)`, 
                  transformOrigin: '30px 30px',
                  transition: 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)'
                }}>
                  <line x1="30" y1="30" x2="15" y2="70" stroke="var(--outline)" strokeWidth="1.5" />
                  <line x1="30" y1="30" x2="45" y2="70" stroke="var(--outline)" strokeWidth="1.5" />
                  <path d="M10 70 L50 70 C50 82, 10 82, 10 70 Z" fill="var(--surface-dim)" stroke="var(--outline)" strokeWidth="1.5" />
                  {/* Visual weight indicator inside left pan */}
                  {negativeCount > 0 && (
                    <circle cx="30" cy="65" r={Math.min(5 + negativeCount * 1.2, 16)} fill="oklch(60% 0.15 25)" className="opacity-80" />
                  )}
                </g>

                {/* Right Pan (Positive / Rights Side) */}
                <g style={{ 
                  transform: `rotate(${-balanceTiltAngle}deg)`, 
                  transformOrigin: '190px 30px',
                  transition: 'transform 0.7s cubic-bezier(0.25, 1, 0.5, 1)'
                }}>
                  <line x1="190" y1="30" x2="175" y2="70" stroke="var(--outline)" strokeWidth="1.5" />
                  <line x1="190" y1="30" x2="205" y2="70" stroke="var(--outline)" strokeWidth="1.5" />
                  <path d="M170 70 L210 70 C210 82, 170 82, 170 70 Z" fill="var(--surface-dim)" stroke="var(--outline)" strokeWidth="1.5" />
                  {/* Visual weight indicator inside right pan */}
                  {positiveCount > 0 && (
                    <circle cx="190" cy="65" r={Math.min(5 + positiveCount * 1.2, 16)} fill="oklch(75% 0.12 145)" className="opacity-80" />
                  )}
                </g>
              </g>
            </svg>

            {/* Labels and balance status text */}
            <div className="w-full flex justify-between px-6 text-[10px] font-mono tracking-wider mt-2">
              <span className="text-red-500/80 dark:text-red-400/85">PERJUDICIAL ({negativeCount})</span>
              <span className="text-primary font-bold">
                {balanceScore > 0 ? `+${balanceScore}` : balanceScore}
              </span>
              <span className="text-green-600/85 dark:text-green-400/90">FAVORABLE ({positiveCount})</span>
            </div>
          </div>

          {/* Balance percent meter bar */}
          <div className="space-y-2 mt-2">
            <div className="w-full h-2.5 bg-surface-dim dark:bg-surface-container rounded-full overflow-hidden flex border border-outline-variant/30">
              <div 
                style={{ width: `${100 - balancePercent}%`, transition: 'width 0.6s ease' }} 
                className="bg-red-500/30 dark:bg-red-400/30 border-r border-outline-variant/20 h-full"
              />
              <div 
                style={{ width: `${balancePercent}%`, transition: 'width 0.6s ease' }} 
                className="bg-green-600/30 dark:bg-green-400/30 h-full"
              />
            </div>
            <div className="flex justify-between items-center text-technical-xs text-on-surface-variant/70">
              <span>Balanza Moral: {totalCount === 0 ? "Neutral" : (balancePercent > 50 ? "Tendencia Positiva" : balancePercent < 50 ? "Tendencia Negativa" : "Equilibrio")}</span>
              <span className="font-mono font-bold text-primary">{balancePercent}% Pro-Derechos</span>
            </div>
          </div>
        </div>

        {/* Línea de Tiempo de Progreso (Col 7) */}
        <div className="lg:col-span-7 glass-enhance border border-outline-variant/30 rounded-2xl p-6 flex flex-col justify-between relative z-10 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none">
          <div className="space-y-2 mb-4">
            <span className="text-[10px] font-mono text-on-surface-variant/60 uppercase tracking-widest block">
              EVOLUCIÓN CRONOLÓGICA
            </span>
            <h4 className="text-technical-sm text-primary font-bold flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Índice de Progreso Sintiens (IPS)
            </h4>
            <p className="text-xs text-on-surface-variant/80 font-light">
              Mapea acumulativamente el progreso de bienestar moral. Sube $+5$ con cada ley o hábito favorable y baja $-5$ con retrocesos o industrialización.
              <span className="block mt-1 text-[10px] text-primary/70 font-mono flex items-center gap-1.5 select-none animate-pulse">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
                Haz clic en un punto para desplazarte al evento.
              </span>
            </p>
          </div>

          {/* Recharts Progress Index Timeline */}
          <div className="w-full h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart 
                data={timelineData} 
                margin={{ top: 10, right: 20, left: -25, bottom: 0 }}
                className="focus:outline-none select-none [&_*]:focus:outline-none [&_*]:outline-none outline-none"
              >
                <defs>
                  <linearGradient id="colorMoral" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--outline)" opacity={0.12} />
                <XAxis 
                  dataKey="id" 
                  tickFormatter={(id) => {
                    const point = timelineData.find(p => p.id === id);
                    return point ? point.formattedDate : "";
                  }}
                  stroke="var(--on-surface-variant)" 
                  opacity={0.6}
                  fontSize={10} 
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="var(--on-surface-variant)" 
                  opacity={0.6}
                  fontSize={10} 
                  domain={['dataMin - 5', 'dataMax + 5']}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip 
                  content={<CustomTooltip />}
                  wrapperStyle={{ pointerEvents: 'none' }}
                />
                {/* Horizontal reference line representing baseline (50) */}
                <ReferenceLine 
                  y={50} 
                  stroke="var(--outline)" 
                  strokeDasharray="4 4" 
                  opacity={0.4}
                  label={{ value: 'Línea Base', fill: 'var(--on-surface-variant)', fontSize: 9, position: 'insideBottomRight', opacity: 0.5 }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="Progreso Moral" 
                  name="Índice IPS"
                  stroke="var(--primary)" 
                  strokeWidth={2.5}
                  fill="url(#colorMoral)"
                  dot={(props: any) => {
                    const { cx, cy, payload } = props;
                    if (!payload || payload.id === "baseline") return null;
                    return (
                      <circle
                        key={`dot-${payload.id}`}
                        cx={cx}
                        cy={cy}
                        r={2.5}
                        stroke="var(--primary)"
                        strokeWidth={1.5}
                        fill="var(--surface)"
                        style={{ cursor: "pointer", outline: "none" }}
                        className="focus:outline-none select-none outline-none"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePointClickDirect(payload);
                        }}
                      />
                    );
                  }}
                  activeDot={(props: any) => {
                    const { cx, cy, payload } = props;
                    if (!payload || payload.id === "baseline") return null;
                    return (
                      <circle
                        key={`active-dot-${payload.id}`}
                        cx={cx}
                        cy={cy}
                        r={5}
                        stroke="var(--primary)"
                        strokeWidth={2}
                        fill="var(--primary)"
                        style={{ cursor: "pointer", outline: "none" }}
                        className="focus:outline-none select-none outline-none"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePointClickDirect(payload);
                        }}
                      />
                    );
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* News Grid (Asymmetric Specimen Grid) */}
      <div className="relative z-10">
        <AnimatePresence mode="popLayout">
          {sortedNewsForGrid.length > 0 ? (
            <>
              {/* Desktop Layout (3 Columns, flows left-to-right chronologically) */}
              <div className="hidden lg:grid lg:grid-cols-3 gap-6 items-start">
                <div className="flex flex-col gap-6">
                  {colDesktop1.map(item => renderCard(item))}
                </div>
                <div className="flex flex-col gap-6">
                  {colDesktop2.map(item => renderCard(item))}
                </div>
                <div className="flex flex-col gap-6">
                  {colDesktop3.map(item => renderCard(item))}
                </div>
              </div>

              {/* Tablet Layout (2 Columns) */}
              <div className="hidden md:grid lg:hidden grid-cols-2 gap-6 items-start">
                <div className="flex flex-col gap-6">
                  {colTablet1.map(item => renderCard(item))}
                </div>
                <div className="flex flex-col gap-6">
                  {colTablet2.map(item => renderCard(item))}
                </div>
              </div>

              {/* Mobile Layout (1 Column) */}
              <div className="flex flex-col gap-6 md:hidden">
                {sortedNewsForGrid.map(item => renderCard(item))}
              </div>
            </>
          ) : (
            <div className="w-full text-center py-20 glass-enhance border border-outline-variant/30 rounded-2xl bg-surface-dim/10 flex flex-col items-center justify-center space-y-4">
              <Newspaper className="w-12 h-12 text-on-surface-variant/40 stroke-[1.5]" />
              <div className="space-y-1 max-w-sm">
                <h4 className="text-technical-sm text-primary font-bold">Sin resultados coincidentes</h4>
                <p className="text-xs text-on-surface-variant/60">
                  Prueba a ajustar los criterios de filtrado o la palabra clave de búsqueda para encontrar registros.
                </p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
