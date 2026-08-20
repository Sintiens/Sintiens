import { useState, useMemo, useEffect, useRef, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useFocusTrap } from "../hooks/useFocusTrap";
import {
  Newspaper,
  Search, 
  Calendar, 
  ExternalLink, 
  Globe, 
  CheckCircle, 
  AlertTriangle,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Link2,
  Check,
  Building2,
  FlaskConical,
  BookOpen,
  Scale,
  Sparkles,
  X,
  ArrowUp,
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  ScrollText,
  Brain,
  Factory,
  TrendingUp,
  Megaphone,
  Landmark,
  ShieldCheck,
  Compass,
  Plus,
  Minus
} from "lucide-react";
import { NEWS_DATA, NewsItem, SourceType } from "../data/newsData";
import { GLOSSARY_UNIFIED, GLOSSARY_BY_ID } from "../data/glossaryUnified";
import { buildGlossaryRegex } from "../utils/glossaryPatterns";
import GlossaryLink from "./GlossaryLink";

// Safe hostname extraction for favicon URLs
const getDomain = (url: string): string => {
  try {
    return new URL(url).hostname;
  } catch {
    return "";
  }
};

const CATEGORIES = [
  { id: "all", label: "Todas las Temáticas" },
  { id: "ley", label: "Nueva Ley", desc: "Cambios regulatorios y legislativos" },
  { id: "consumo", label: "Tendencias de Consumo", desc: "Mercado y alimentación alternativa" },
  { id: "ciencia", label: "Ciencia y Sintiencia", desc: "Evidencia neurocientífica y cognitiva" },
  { id: "social", label: "Activismo y Conciencia", desc: "Acción ciudadana y debates morales" },
  { id: "industria", label: "Industria y Producción", desc: "Ganadería intensiva y explotación" },
];

const getCategoryLabel = (cat: string): string => {
  const found = CATEGORIES.find((c) => c.id === cat);
  return found ? found.label : cat;
};

const REGIONS = [
  { id: "todos", label: "Todas las Regiones" },
  { id: "españa", label: "España" },
  { id: "europa", label: "Europa" },
  { id: "global", label: "Global" },
] as const;

// Años derivados dinámicamente del dataset para no quedar obsoletos
const YEARS = ["todos", ...Array.from(new Set(NEWS_DATA.map((n) => n.date.slice(0, 4)))).sort((a, b) => b.localeCompare(a))] as const;

// Formateo localizado de fechas (p.ej. "13 oct 2025") + detección de novedad (<30 días)
const DATE_FORMATTER = new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "short", year: "numeric" });
const formatDate = (iso: string): string => {
  try {
    const d = new Date(iso + "T12:00:00");
    const s = DATE_FORMATTER.format(d);
    return s.charAt(0).toUpperCase() + s.slice(1);
  } catch {
    return iso;
  }
};
const isRecent = (iso: string): boolean => {
  try {
    const t = new Date(iso + "T12:00:00").getTime();
    const diff = Date.now() - t;
    return diff >= 0 && diff < 30 * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
};

const highlightMatch = (text: string, query: string) => {
  const q = query.trim();
  if (!q) return text;
  // Escapar regex
  const esc = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${esc})`, "gi"));
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    part.toLowerCase() === q.toLowerCase() ? (
      <mark key={i} className="bg-amber-200/60 dark:bg-amber-400/30 text-inherit px-0.5 rounded-sm">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

// Cache de regex por item id para no reconstruir 150 veces
const glossaryRegexCache = new Map<string, { regex: RegExp; map: Map<string, typeof GLOSSARY_UNIFIED[number]> }>();
const getGlossaryDataForItem = (item: NewsItem) => {
  if (!item.relatedGlossaryIds || item.relatedGlossaryIds.length === 0) return null;
  const cacheKey = item.id;
  const cached = glossaryRegexCache.get(cacheKey);
  if (cached) return cached;
  const entries = item.relatedGlossaryIds.map((id) => (GLOSSARY_BY_ID as any)[id]).filter(Boolean) as typeof GLOSSARY_UNIFIED;
  if (entries.length === 0) return null;
  const patterns = entries.flatMap((e) => e.patterns);
  if (patterns.length === 0) return null;
  const regex = buildGlossaryRegex(patterns, "¿?");
  const map = new Map<string, typeof GLOSSARY_UNIFIED[number]>();
  for (const e of entries) {
    for (const p of e.patterns) {
      const k = p.toLowerCase();
      if (!map.has(k)) map.set(k, e);
    }
  }
  const val = { regex, map };
  glossaryRegexCache.set(cacheKey, val);
  return val;
};

const renderWithGlossary = (text: string, item: NewsItem, query: string) => {
  const data = getGlossaryDataForItem(item);
  if (!data) return highlightMatch(text, query) as any;
  const { regex, map } = data;
  // split por glosario (captura incluye término)
  const parts = text.split(regex);
  if (parts.length === 1) return highlightMatch(text, query) as any;
  const q = query.trim();
  const escQ = q ? q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") : null;
  const qRe = escQ ? new RegExp(`(${escQ})`, "gi") : null;
  const highlightInside = (segment: string, baseKey: string | number) => {
    if (!qRe) return segment;
    const sub = segment.split(qRe);
    if (sub.length === 1) return segment;
    return sub.map((s, j) =>
      s.toLowerCase() === q.toLowerCase() ? (
        <mark key={`${baseKey}-m-${j}`} className="bg-amber-200/60 dark:bg-amber-400/30 text-inherit px-0.5 rounded-sm">
          {s}
        </mark>
      ) : (
        s
      )
    );
  };
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      const entry = map.get(part.toLowerCase()) || map.get(part.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""));
      if (entry) {
        return (
          <GlossaryLink key={`g-${i}`} entry={entry}>
            {highlightInside(part, `g-${i}`) as any}
          </GlossaryLink>
        );
      }
      return highlightInside(part, i) as any;
    }
    // texto normal: aplicar highlight de búsqueda
    const h = highlightInside(part, i);
    // highlightInside puede devolver string o array; para React devolver tal cual
    return Array.isArray(h) ? <span key={`t-${i}`}>{h as any}</span> : <span key={`t-${i}`}>{h as any}</span>;
  });
};
const POPULAR_TOPICS = [
  "Pulpos",
  "Lobo ibérico",
  "Carne cultivada",
  "Macrogranjas",
  "Circos",
  "Gripe aviar",
  "Transporte marítimo",
  "Grandes simios",
];

const SOURCE_TYPE_CONFIG: Record<SourceType, { label: string; icon: typeof Building2; color: string }> = {
  oficial: {
    label: "Oficial / Legal",
    icon: Scale,
    color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  cientifica: {
    label: "Científica",
    icon: FlaskConical,
    color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },
  prensa: {
    label: "Prensa",
    icon: BookOpen,
    color: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
  },
  informe: {
    label: "Informe Técnico",
    icon: Building2,
    color: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
  },
};

type SortOrder = "recientes" | "antiguas";
type ViewMode = "grid" | "list" | "timeline";

const headerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const childVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

// Shared animation language for the search control bar: smooth, no bounce.
const BAR_SPRING = { type: "spring", stiffness: 260, damping: 34 } as const;
const BAR_EASE = [0.16, 1, 0.3, 1] as const;

export default memo(function NewsExplorer() {
  // State for filters & controls
  const [selectedRegion, setSelectedRegion] = useState<"todos" | "españa" | "europa" | "global">("todos");
  const [selectedYear, setSelectedYear] = useState<string>("todos");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedImpact, setSelectedImpact] = useState<"todos" | "positivo" | "negativo">("todos");
  const [selectedSourceType, setSelectedSourceType] = useState<"todos" | SourceType>("todos");
  const [sortOrder, setSortOrder] = useState<SortOrder>("recientes");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    try {
      const saved = localStorage.getItem("sintiens_news_viewMode");
      if (saved === "grid" || saved === "list" || saved === "timeline") return saved as ViewMode;
    } catch {
      /* storage no disponible */
    }
    return "grid";
  });
  const [activeTaxonomyDrawer, setActiveTaxonomyDrawer] = useState<"fuentes" | "categorias" | "regiones" | null>(null);
  const [highlightedCardId, setHighlightedCardId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isStuck, setIsStuck] = useState<boolean>(false);
  const [isMainFilterOpen, setIsMainFilterOpen] = useState<boolean>(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState<boolean>(true);
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const INITIAL_VISIBLE = 12;
  const LOAD_MORE_STEP = 12;
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());
  const controlBarRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const newsTitleRef = useRef<HTMLDivElement | null>(null);
  const filterTrapRef = useFocusTrap(isMainFilterOpen);

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const isExpanded = (id: string) => expandedIds.has(id);

  // Helper to scroll smoothly to the top of the news section
  const scrollToNewsTop = () => {
    if (sentinelRef.current) {
      const yOffset = -60;
      const y = sentinelRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Debounce búsqueda (evita filtrar + scroll en cada tecla)
  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedQuery(searchQuery), 220);
    return () => window.clearTimeout(t);
  }, [searchQuery]);

  // Persistir preferencia de vista
  useEffect(() => {
    try {
      localStorage.setItem("sintiens_news_viewMode", viewMode);
    } catch {
      /* storage no disponible */
    }
  }, [viewMode]);

  // ── URL sync: lectura inicial + escritura + popstate (Fase 2, muy cuidadoso) ──
  const isSyncingFromUrlRef = useRef(false);
  const hasInitUrlRef = useRef(false);

  // Lectura inicial desde ?q=&region=&category=&impact=&source=&year=&sort=
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q");
      const region = params.get("region");
      const category = params.get("category");
      const impact = params.get("impact");
      const source = params.get("source");
      const year = params.get("year");
      const sort = params.get("sort");
      let didSet = false;
      isSyncingFromUrlRef.current = true;
      if (q !== null) {
        setSearchQuery(q);
        setDebouncedQuery(q);
        didSet = true;
      }
      if (region === "españa" || region === "europa" || region === "global") {
        setSelectedRegion(region);
        didSet = true;
      }
      if (category === "ley" || category === "ciencia" || category === "industria" || category === "consumo" || category === "social") {
        setSelectedCategory(category);
        didSet = true;
      }
      if (impact === "positivo" || impact === "negativo") {
        setSelectedImpact(impact);
        didSet = true;
      }
      if (source === "oficial" || source === "cientifica" || source === "prensa" || source === "informe") {
        setSelectedSourceType(source as SourceType);
        didSet = true;
      }
      if (year && /^\d{4}$/.test(year)) {
        setSelectedYear(year);
        didSet = true;
      }
      if (sort === "recientes" || sort === "antiguas") {
        setSortOrder(sort);
        didSet = true;
      }
      // marcar inicializado para permitir escritura posterior
      setTimeout(() => {
        isSyncingFromUrlRef.current = false;
        hasInitUrlRef.current = true;
        if (didSet) scrollToNewsTop();
      }, 50);
      if (!didSet) {
        hasInitUrlRef.current = true;
        isSyncingFromUrlRef.current = false;
      }
    } catch {
      hasInitUrlRef.current = true;
      isSyncingFromUrlRef.current = false;
    }
  }, []);

  // Escritura a URL (replaceState, sin recargar, preservando hash)
  useEffect(() => {
    if (!hasInitUrlRef.current || isSyncingFromUrlRef.current) return;
    try {
      const params = new URLSearchParams();
      if (selectedRegion !== "todos") params.set("region", selectedRegion);
      if (selectedCategory !== "all") params.set("category", selectedCategory);
      if (selectedImpact !== "todos") params.set("impact", selectedImpact);
      if (selectedSourceType !== "todos") params.set("source", selectedSourceType);
      if (selectedYear !== "todos") params.set("year", selectedYear);
      if (sortOrder !== "recientes") params.set("sort", sortOrder);
      const qTrim = debouncedQuery.trim();
      if (qTrim) params.set("q", qTrim);
      const qs = params.toString();
      const hash = window.location.hash || "";
      const newUrl = `${window.location.pathname}${qs ? `?${qs}` : ""}${hash}`;
      const current = `${window.location.pathname}${window.location.search}${hash}`;
      if (newUrl !== current) {
        window.history.replaceState({ ...window.history.state }, "", newUrl);
      }
    } catch {
      /* URL sync no disponible */
    }
  }, [selectedRegion, selectedCategory, selectedImpact, selectedSourceType, selectedYear, sortOrder, debouncedQuery]);

  // Back/forward del navegador
  useEffect(() => {
    const onPopState = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        isSyncingFromUrlRef.current = true;
        const q = params.get("q") || "";
        setSearchQuery(q);
        setDebouncedQuery(q);
        const r = params.get("region");
        setSelectedRegion(r === "españa" || r === "europa" || r === "global" ? r : "todos");
        const c = params.get("category");
        setSelectedCategory(c === "ley" || c === "ciencia" || c === "industria" || c === "consumo" || c === "social" ? c : "all");
        const imp = params.get("impact");
        setSelectedImpact(imp === "positivo" || imp === "negativo" ? imp : "todos");
        const s = params.get("source");
        setSelectedSourceType(s === "oficial" || s === "cientifica" || s === "prensa" || s === "informe" ? (s as SourceType) : "todos");
        const y = params.get("year");
        setSelectedYear(y && /^\d{4}$/.test(y) ? y : "todos");
        const so = params.get("sort");
        setSortOrder(so === "antiguas" ? "antiguas" : "recientes");
        setTimeout(() => (isSyncingFromUrlRef.current = false), 80);
      } catch {
        isSyncingFromUrlRef.current = false;
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Monitor scroll to detect when the single unified spotlight bar becomes sticky at top-4.
  // Uses hysteresis (dead-band) + rAF throttling to avoid flicker at the threshold.
  useEffect(() => {
    const STICK_ACTIVATE = 18;
    const STICK_DEACTIVATE = 40;
    let ticking = false;
    let stuckState = false;

    const evaluate = () => {
      ticking = false;
      if (!sentinelRef.current) return;
      const rect = sentinelRef.current.getBoundingClientRect();
      const shouldStick = stuckState
        ? rect.top > STICK_DEACTIVATE
          ? false
          : true
        : rect.top <= STICK_ACTIVATE;
      if (shouldStick !== stuckState) {
        stuckState = shouldStick;
        setIsStuck(shouldStick);
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(evaluate);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    evaluate();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ESC key listener to close filter popover or taxonomy drawers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isMainFilterOpen) setIsMainFilterOpen(false);
        if (activeTaxonomyDrawer) setActiveTaxonomyDrawer(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMainFilterOpen, activeTaxonomyDrawer]);

  // Deep linking: Auto-scroll on initial load if URL contains hash or ?id=
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idFromQuery = params.get("id");
    const hash = window.location.hash.replace("#", "");
    const targetId = idFromQuery || hash;
    if (targetId) {
      const item = NEWS_DATA.find((n) => n.id === targetId);
      if (item) {
        // Si el item está fuera de paginación inicial, expandir
        const idx = NEWS_DATA.findIndex((n) => n.id === targetId);
        if (idx !== -1) {
          // Asegurar que visibleCount incluye el índice (aprox, considerando orden recientes por defecto)
          const sorted = [...NEWS_DATA].sort((a,b)=> b.date.localeCompare(a.date));
          const sortedIdx = sorted.findIndex((n)=> n.id === targetId);
          if (sortedIdx >= 12) {
            setVisibleCount(Math.min(sorted.length, Math.ceil((sortedIdx+1)/12)*12));
          }
        }
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            setHighlightedCardId(targetId);
            setTimeout(() => setHighlightedCardId(null), 3500);
          } else {
            // Fallback: si aún no renderizado por paginación, reintentar
            setTimeout(() => {
              const el2 = document.getElementById(targetId);
              if (el2) {
                el2.scrollIntoView({ behavior: "smooth", block: "center" });
                setHighlightedCardId(targetId);
                setTimeout(() => setHighlightedCardId(null), 3500);
              }
            }, 600);
          }
        }, 600);
      }
    }
  }, []);

  const handleCopyLink = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("id", id);
      // Mantener hash por compatibilidad pero priorizar ?id=
      url.hash = id;
      const shareUrl = url.toString();
      const item = NEWS_DATA.find((n) => n.id === id);
      // Web Share API en móvil — más nativo y sin permiso de portapapeles
      if (navigator.share && item && /Mobi|Android/i.test(navigator.userAgent)) {
        try {
          await navigator.share({ title: item.title, text: item.summary.slice(0, 120), url: shareUrl });
          setCopiedId(id);
          setTimeout(() => setCopiedId((curr) => (curr === id ? null : curr)), 2200);
          return;
        } catch {
          // usuario canceló o no disponible, fallback a clipboard
        }
      }
      await navigator.clipboard.writeText(shareUrl);
      setCopiedId(id);
      setTimeout(() => {
        setCopiedId((curr) => (curr === id ? null : curr));
      }, 2200);
      // analítica sutil: contar copias (localStorage)
      try {
        const k = "sintiens_news_share_count";
        const c = parseInt(localStorage.getItem(k) || "0", 10) + 1;
        localStorage.setItem(k, String(c));
      } catch {}
    } catch {
      // Fallback silencioso
    }
  };

  // Filtered news (usa debouncedQuery para evitar filtrar en cada tecla)
  const filteredNews = useMemo(() => {
    return NEWS_DATA.filter((item) => {
      const matchesRegion = selectedRegion === "todos" || item.region === selectedRegion;
      const matchesYear = selectedYear === "todos" || item.date.startsWith(selectedYear);
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesImpact = selectedImpact === "todos" || item.impact === selectedImpact;
      const matchesSourceType = selectedSourceType === "todos" || item.sourceType === selectedSourceType;
      
      const query = debouncedQuery.toLowerCase().trim();
      const tagsText = (item.tags || []).join(" ").toLowerCase();
      const speciesText = (item.species || []).join(" ").toLowerCase();
      const detailsText = (item.details || "").toLowerCase();
      const takeawaysText = (item.takeaways || []).join(" ").toLowerCase();
      const matchesSearch = query === "" || 
        item.title.toLowerCase().includes(query) || 
        item.summary.toLowerCase().includes(query) ||
        detailsText.includes(query) ||
        takeawaysText.includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.source.toLowerCase().includes(query) ||
        tagsText.includes(query) ||
        speciesText.includes(query);

      return matchesRegion && matchesYear && matchesCategory && matchesImpact && matchesSourceType && matchesSearch;
    });
  }, [selectedRegion, selectedYear, selectedCategory, selectedImpact, selectedSourceType, debouncedQuery]);

  // Sorted news
  const sortedNews = useMemo(() => {
    const news = [...filteredNews];
    if (sortOrder === "recientes") {
      return news.sort((a, b) => b.date.localeCompare(a.date));
    }
    return news.sort((a, b) => a.date.localeCompare(b.date));
  }, [filteredNews, sortOrder]);

  // Paginación — evita renderizar 50 cards con motion layout en móviles
  const paginatedNews = useMemo(() => sortedNews.slice(0, visibleCount), [sortedNews, visibleCount]);
  const hasMore = visibleCount < sortedNews.length;
  const remaining = sortedNews.length - visibleCount;

  // Reset paginación al cambiar cualquier filtro/búsqueda/orden
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [selectedRegion, selectedYear, selectedCategory, selectedImpact, selectedSourceType, debouncedQuery, sortOrder]);

  // SEO: JSON-LD CollectionPage + NewsArticle para cada noticia visible (muy cuidadoso)
  const structuredData = useMemo(() => {
    const baseUrl = "https://sintiens.onrender.com/noticias";
    return {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Noticias — Sintiens",
      description: "Selección, síntesis y seguimiento de los eventos más determinantes para los animales, ordenados por metodología de impacto y con acceso a sus fuentes originales.",
      url: baseUrl,
      mainEntity: paginatedNews.slice(0, 12).map((item) => ({
        "@type": "NewsArticle",
        headline: item.title,
        description: item.summary,
        datePublished: item.date,
        dateModified: (item as any).verifiedAt || item.date,
        articleSection: getCategoryLabel(item.category),
        keywords: (item.tags || []).join(", "),
        about: (item.species || []).join(", "),
        isAccessibleForFree: true,
        url: `${baseUrl}?id=${item.id}`,
        author: { "@type": "Organization", name: item.source },
        publisher: { "@type": "Organization", name: "Sintiens", url: "https://sintiens.onrender.com" },
      })),
    };
  }, [paginatedNews]);

  // Real-time counts for taxonomy items (single-pass, O(n))
  const taxonomyCounts = useMemo(() => {
    const counts = {
      sourceType: { oficial: 0, cientifica: 0, informe: 0, prensa: 0 } as Record<SourceType, number>,
      category: { ley: 0, ciencia: 0, industria: 0, consumo: 0, social: 0 } as Record<NewsItem["category"], number>,
      region: { españa: 0, europa: 0, global: 0 } as Record<NewsItem["region"], number>,
      impact: { positivo: 0, negativo: 0 } as Record<NewsItem["impact"], number>,
    };
    for (const n of NEWS_DATA) {
      counts.sourceType[n.sourceType]++;
      counts.category[n.category]++;
      counts.region[n.region]++;
      counts.impact[n.impact]++;
    }
    return counts;
  }, []);

  // Toggle impact filter (Avances vs Vulneraciones)
  const handleToggleImpactFilter = (impact: "positivo" | "negativo") => {
    setSelectedImpact((prev) => (prev === impact ? "todos" : impact));
    scrollToNewsTop();
  };

  // Helpers for taxonomy interactions
  const handleApplyTaxonomyFilter = (
    filterType: "sourceType" | "category" | "region",
    filterValue: string,
    e?: React.MouseEvent
  ) => {
    if (e) e.stopPropagation();
    if (filterType === "sourceType") {
      setSelectedSourceType((prev) => (prev === filterValue ? "todos" : (filterValue as SourceType)));
    } else if (filterType === "category") {
      setSelectedCategory((prev) => (prev === filterValue ? "all" : filterValue));
    } else if (filterType === "region") {
      setSelectedRegion((prev) => (prev === filterValue ? "todos" : (filterValue as "españa" | "europa" | "global")));
    }
    scrollToNewsTop();
  };

  const isTaxonomyItemActive = (filterType: "sourceType" | "category" | "region", filterValue: string) => {
    if (filterType === "sourceType") return selectedSourceType === filterValue;
    if (filterType === "category") return selectedCategory === filterValue;
    if (filterType === "region") return selectedRegion === filterValue;
    return false;
  };

  const getTaxonomyItemCount = (filterType: "sourceType" | "category" | "region", filterValue: string) => {
    if (filterType === "sourceType") return taxonomyCounts.sourceType[filterValue as SourceType] || 0;
    if (filterType === "category") return taxonomyCounts.category[filterValue as keyof typeof taxonomyCounts.category] || 0;
    if (filterType === "region") return taxonomyCounts.region[filterValue as keyof typeof taxonomyCounts.region] || 0;
    return 0;
  };

  // Count active advanced filters
  const activeAdvancedFiltersCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== "all") count++;
    if (selectedSourceType !== "todos") count++;
    if (selectedImpact !== "todos") count++;
    if (selectedYear !== "todos") count++;
    if (sortOrder !== "recientes") count++;
    return count;
  }, [selectedCategory, selectedSourceType, selectedImpact, selectedYear, sortOrder]);

  const totalActiveFiltersCount = (selectedRegion !== "todos" ? 1 : 0) + activeAdvancedFiltersCount;
  const hasAnyActiveFilter = totalActiveFiltersCount > 0 || debouncedQuery.trim() !== "";

  const handleResetFilters = () => {
    setSelectedRegion("todos");
    setSelectedYear("todos");
    setSelectedCategory("all");
    setSelectedImpact("todos");
    setSelectedSourceType("todos");
    setSortOrder("recientes");
    setSearchQuery("");
    setDebouncedQuery("");
  };

  // Render Card (Grid View) — Rediseño Museum Specimen
  const renderCard = (item: NewsItem) => {
    const isHighlighted = highlightedCardId === item.id;
    const glowBgClass = item.impact === "positivo"
      ? "bg-green-500/20 dark:bg-green-400/15"
      : "bg-red-500/20 dark:bg-red-500/15";
    const highlightedBorderClass = isHighlighted
      ? (item.impact === "positivo"
          ? "border-green-500 dark:border-green-400 ring-2 ring-green-500/30 scale-[1.01] z-20 shadow-[0_0_25px_rgba(34,197,94,0.15)]"
          : "border-red-500 dark:border-red-400 ring-2 ring-red-500/30 scale-[1.01] z-20 shadow-[0_0_25px_rgba(239,68,68,0.15)]")
      : "border-outline-variant/30";

    const SourceIcon = SOURCE_TYPE_CONFIG[item.sourceType]?.icon || Building2;
    const sourceConfig = SOURCE_TYPE_CONFIG[item.sourceType] || SOURCE_TYPE_CONFIG.prensa;
    const regionLabel = item.region === "españa" ? "España" : item.region === "europa" ? "Europa" : "Global";
    const accentBar = item.impact === "positivo" ? "bg-emerald-500" : "bg-red-500";

    return (
      <motion.div
        id={item.id}
        key={item.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] as any }}
        className="block w-full scroll-mt-24 relative group/card"
      >
        {isHighlighted && (
          <div className={`absolute -inset-2 rounded-2xl blur-xl opacity-60 z-0 animate-pulse pointer-events-none transition-all duration-700 ${glowBgClass}`} />
        )}
        <div
          className={`glass-enhance border rounded-xl flex flex-col justify-between relative overflow-hidden hover:border-primary/30 hover:shadow-[0_8px_32px_-16px_rgba(0,0,0,0.12)] hover:-translate-y-[1px] transition-all duration-300 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/15 dark:before:bg-surface-dim/5 before:backdrop-blur-md before:z-[-1] before:pointer-events-none group z-10 ${highlightedBorderClass}`}
        >
          {/* Acento lateral por impacto — sutil a altura completa */}
          <div className={`absolute left-0 top-0 bottom-0 w-[2px] ${accentBar} opacity-45`} />

          <div className="p-5 pl-[22px] flex flex-col gap-3.5 flex-1">
            {/* Meta superior: fecha • región  ·  tipo fuente discreto */}
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 font-mono text-[11px] tracking-widest uppercase text-on-surface-variant/70">
                <Calendar className="w-3 h-3 opacity-60 shrink-0" />
                <span className="font-medium">{formatDate(item.date)}</span>
                <span className="w-1 h-1 rounded-full bg-outline-variant/70 mx-0.5 shrink-0" />
                <span>{regionLabel}</span>
                {isRecent(item.date) && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full bg-amber-400 text-zinc-900 text-[9px] font-bold tracking-wider">NUEVO</span>
                )}
              </span>
              <span className="hidden sm:flex items-center gap-1.5 font-mono text-[10px] tracking-wide text-on-surface-variant/50 shrink-0">
                <SourceIcon className="w-3 h-3 opacity-60" />
                {sourceConfig.label}
              </span>
            </div>

            {/* Kicker editorial: categoría con dot de impacto */}
            <div className="flex items-center gap-2 -mt-0.5">
              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${accentBar}`} />
              <span className="font-mono text-[11px] font-bold tracking-[0.14em] uppercase text-primary">
                {getCategoryLabel(item.category)}
              </span>
              <span className="h-3 w-px bg-outline-variant/40 mx-1 hidden sm:block" />
              <span className="sm:hidden flex items-center gap-1 font-mono text-[10px] text-on-surface-variant/50">
                <SourceIcon className="w-3 h-3 opacity-50" />
                {sourceConfig.label}
              </span>
            </div>

            {/* Título — serif editorial, mayor contraste + highlight búsqueda + glosario */}
            <h4 className="font-serif text-[19px] md:text-[20px] font-semibold leading-[1.25] tracking-tight text-on-surface group-hover/card:text-primary transition-colors line-clamp-3">
              {renderWithGlossary(item.title, item, debouncedQuery) as any}
            </h4>

            {/* Summary + análisis detallado al expandir */}
            {(() => {
              const expanded = isExpanded(item.id);
              const hasDetails = !!item.details;
              const needsExpand = hasDetails || item.summary.length > 135;
              return (
                <div className="space-y-2">
                  <div
                    className="overflow-hidden transition-[max-height] duration-[380ms] ease-[0.16,1,0.3,1]"
                    style={{ maxHeight: !needsExpand ? "none" : expanded ? "980px" : "71px" }}
                  >
                    <p className={`text-[13.7px] leading-[1.65] text-on-surface-variant font-normal transition-opacity duration-200 ${!expanded && needsExpand ? "line-clamp-3 opacity-95" : "opacity-100"}`}>
                      {renderWithGlossary(item.summary, item, debouncedQuery) as any}
                    </p>
                    {expanded && hasDetails && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] as any }}
                        className="mt-3 pt-3 border-t border-outline-variant/10 space-y-2.5"
                      >
                        <div className="flex items-center gap-1.5">
                          <ScrollText className="w-3 h-3 text-primary/70" />
                          <span className="text-[10px] font-mono font-semibold tracking-wider uppercase text-primary/80">Análisis ampliado</span>
                        </div>
                        <p className="text-[13px] leading-[1.65] text-on-surface/80 font-normal">
                          {renderWithGlossary(item.details!, item, debouncedQuery) as any}
                        </p>
                        {item.takeaways && item.takeaways.length > 0 && (
                          <ul className="space-y-1.5 pt-1">
                            {item.takeaways.map((t, i) => (
                              <li key={i} className="flex items-start gap-2 text-[12.5px] leading-[1.5] text-on-surface-variant/80">
                                <span className="mt-[7px] w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                                <span>{renderWithGlossary(t, item, debouncedQuery) as any}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    )}
                  </div>
                  {needsExpand && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpanded(item.id);
                      }}
                      aria-expanded={expanded}
                      aria-label={expanded ? "Mostrar menos" : hasDetails ? "Leer análisis ampliado" : "Leer resumen completo"}
                      className="inline-flex items-center gap-1 text-[10px] font-mono font-normal tracking-wide text-on-surface-variant/55 hover:text-primary transition-colors cursor-pointer group/btn"
                    >
                      <span className="w-[15px] h-[15px] rounded-full border border-outline-variant/20 group-hover/btn:border-primary/30 flex items-center justify-center shrink-0 transition-colors">
                        {expanded ? <Minus className="w-2.5 h-2.5 stroke-[1.8] opacity-70 group-hover/btn:opacity-100" /> : <Plus className="w-2.5 h-2.5 stroke-[1.8] opacity-70 group-hover/btn:opacity-100" />}
                      </span>
                      <span className="underline decoration-dotted decoration-outline-variant/25 group-hover/btn:decoration-primary/30 underline-offset-[3px]">
                        {expanded ? "Mostrar menos" : hasDetails ? "Leer análisis" : "Leer más"}
                      </span>
                    </button>
                  )}
                </div>
              );
            })()}
          </div>

          {/* Footer: impacto + fuente + copiar */}
          <div className="mx-5 ml-[22px] py-3.5 border-t border-outline-variant/15 flex items-center justify-between gap-2">
            {/* Estado de protección */}
            {item.impact === "positivo" ? (
              <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wide text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <CheckCircle className="w-3 h-3" />
                Avance
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wide text-red-700 dark:text-red-300 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20">
                <AlertTriangle className="w-3 h-3" />
                Vulneración
              </span>
            )}

            {/* Acciones */}
            <div className="flex items-center gap-1.5">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-7 rounded-full bg-surface-dim dark:bg-surface-container border border-outline-variant/25 hover:border-link/40 hover:bg-link/[0.06] text-on-surface-variant/80 transition-all duration-300 group/link shadow-[0_1px_2px_rgba(0,0,0,0.04)] pl-0 pr-2.5 max-w-[150px]"
                title={`Abrir fuente: ${item.source}`}
              >
                <span className="-ml-px w-7 h-7 rounded-full bg-white dark:bg-zinc-800 border border-outline-variant/25 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                  <img
                    src={`https://www.google.com/s2/favicons?sz=64&domain=${getDomain(item.url)}`}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-4 h-4 object-contain transition-transform duration-300 group-hover/link:scale-110"
                    onError={(e) => {
                      const img = e.currentTarget as HTMLImageElement;
                      img.style.display = "none";
                      const fallback = img.nextElementSibling as HTMLElement | null;
                      if (fallback) fallback.style.display = "flex";
                    }}
                  />
                  <span className="hidden w-4 h-4 items-center justify-center text-[10px]" aria-hidden="true">📰</span>
                </span>
                <span className="tracking-wider uppercase text-[9.5px] font-mono font-bold text-on-surface-variant/85 group-hover/link:text-link transition-colors truncate">
                  {item.source}
                </span>
                <ExternalLink className="w-2.5 h-2.5 text-on-surface-variant/40 group-hover/link:text-link group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform shrink-0" />
              </a>

              <button
                onClick={(e) => handleCopyLink(e, item.id)}
                title="Copiar enlace a esta noticia"
                aria-label="Copiar enlace directo"
                className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-surface-dim/60 dark:bg-surface-container/60 hover:bg-primary/10 border border-outline-variant/25 hover:border-primary/30 text-on-surface-variant/60 hover:text-primary transition-all cursor-pointer shrink-0"
              >
                {copiedId === item.id ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Link2 className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // Render Row (List View) — unificado al sistema specimen
  const renderRow = (item: NewsItem) => {
    const isHighlighted = highlightedCardId === item.id;
    const highlightedBorderClass = isHighlighted
      ? "ring-2 ring-primary/40 bg-primary/5 border-primary/30"
      : "border-outline-variant/25";

    const SourceIcon = SOURCE_TYPE_CONFIG[item.sourceType]?.icon || Building2;
    const sourceConfig = SOURCE_TYPE_CONFIG[item.sourceType] || SOURCE_TYPE_CONFIG.prensa;
    const accentBar = item.impact === "positivo" ? "bg-emerald-500" : "bg-red-500";
    const regionLabel = item.region === "españa" ? "España" : item.region === "europa" ? "Europa" : "Global";

    return (
      <motion.div
        id={item.id}
        key={item.id}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] as any }}
        className={`glass-enhance border rounded-xl overflow-hidden transition-all duration-200 hover:border-primary/30 hover:shadow-[0_4px_20px_-12px_rgba(0,0,0,0.1)] flex flex-col md:flex-row md:items-stretch scroll-mt-24 group/row ${highlightedBorderClass}`}
      >
        {/* Acento lateral — versión sutil a altura/anchura completa */}
        <div className={`hidden md:block w-[2px] shrink-0 ${accentBar} opacity-45`} />
        <div className={`md:hidden h-[2px] w-full shrink-0 ${accentBar} opacity-45`} />

        <div className="flex-1 min-w-0 p-4 md:pl-5 flex flex-col md:flex-row md:items-center gap-3 md:gap-5">
          <div className="space-y-2 flex-1 min-w-0">
            {/* Meta superior lista */}
            <div className="flex items-center gap-2 flex-wrap font-mono text-[11px] tracking-widest uppercase text-on-surface-variant/70">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3 opacity-60" />
                {formatDate(item.date)}
              </span>
              {isRecent(item.date) && (
                <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-zinc-900 text-[9px] font-bold tracking-wider">NUEVO</span>
              )}
              <span className="w-1 h-1 rounded-full bg-outline-variant/60" />
              <span>{regionLabel}</span>
              <span className="w-1 h-1 rounded-full bg-outline-variant/60 hidden sm:block" />
              <span className="hidden sm:flex items-center gap-1.5 text-primary font-bold">
                <span className={`w-1 h-1 rounded-full ${accentBar}`} />
                {getCategoryLabel(item.category)}
              </span>
              <span className="hidden lg:flex items-center gap-1 text-on-surface-variant/50 normal-case tracking-normal">
                <SourceIcon className="w-3 h-3 opacity-50" />
                {sourceConfig.label}
              </span>
            </div>
            {/* Categoría móvil */}
            <div className="sm:hidden flex items-center gap-1.5 font-mono text-[11px] font-bold tracking-widest uppercase text-primary">
              <span className={`w-1.5 h-1.5 rounded-full ${accentBar}`} />
              {getCategoryLabel(item.category)}
            </div>

            <h4 className="font-serif text-[16px] md:text-[17px] font-semibold leading-snug text-on-surface group-hover/row:text-primary transition-colors line-clamp-2">
              {highlightMatch(item.title, debouncedQuery) as any}
            </h4>

            {(() => {
              const expanded = isExpanded(item.id);
              const hasDetails = !!item.details;
              const needsExpand = hasDetails || item.summary.length > 120;
              return (
                <div className="space-y-1.5 hidden sm:block">
                  <div
                    className="overflow-hidden transition-[max-height] duration-[360ms] ease-[0.16,1,0.3,1]"
                    style={{ maxHeight: !needsExpand ? "none" : expanded ? "900px" : "42px" }}
                  >
                    <p className={`text-[13px] leading-relaxed text-on-surface-variant/85 transition-opacity duration-200 ${!expanded && needsExpand ? "line-clamp-2 opacity-95" : "opacity-100"}`}>
                      {highlightMatch(item.summary, debouncedQuery) as any}
                    </p>
                    {expanded && hasDetails && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] as any }}
                        className="mt-2.5 pt-2.5 border-t border-outline-variant/10 space-y-2"
                      >
                        <div className="flex items-center gap-1.5">
                          <ScrollText className="w-3 h-3 text-primary/70" />
                          <span className="text-[10px] font-mono font-semibold tracking-wider uppercase text-primary/80">Análisis ampliado</span>
                        </div>
                        <p className="text-[12.5px] leading-[1.6] text-on-surface/80">
                          {highlightMatch(item.details!, debouncedQuery) as any}
                        </p>
                        {item.takeaways && item.takeaways.length > 0 && (
                          <ul className="space-y-1 pt-1">
                            {item.takeaways.map((t, i) => (
                              <li key={i} className="flex items-start gap-2 text-[12px] leading-[1.5] text-on-surface-variant/75">
                                <span className="mt-[6px] w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                                <span>{highlightMatch(t, debouncedQuery) as any}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    )}
                  </div>
                  {needsExpand && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpanded(item.id);
                      }}
                      aria-expanded={expanded}
                      aria-label={expanded ? "Mostrar menos" : hasDetails ? "Leer análisis ampliado" : "Leer resumen completo"}
                      className="inline-flex items-center gap-1 text-[10px] font-mono font-normal tracking-wide text-on-surface-variant/55 hover:text-primary transition-colors cursor-pointer group/btn"
                    >
                      <span className="w-[14px] h-[14px] rounded-full border border-outline-variant/20 group-hover/btn:border-primary/30 flex items-center justify-center shrink-0 transition-colors">
                        {expanded ? <Minus className="w-2.5 h-2.5 stroke-[1.8] opacity-70 group-hover/btn:opacity-100" /> : <Plus className="w-2.5 h-2.5 stroke-[1.8] opacity-70 group-hover/btn:opacity-100" />}
                      </span>
                      <span className="underline decoration-dotted decoration-outline-variant/25 group-hover/btn:decoration-primary/30 underline-offset-[3px]">
                        {expanded ? "Mostrar menos" : hasDetails ? "Leer análisis" : "Leer más"}
                      </span>
                    </button>
                  )}
                </div>
              );
            })()}
            {/* Resumen colapsable solo móvil — visible siempre en xs */}
            {(() => {
              const expanded = isExpanded(item.id);
              const hasDetails = !!item.details;
              const needsExpand = hasDetails || item.summary.length > 90;
              return (
                <div className="space-y-1.5 sm:hidden">
                  <div
                    className="overflow-hidden transition-[max-height] duration-[360ms] ease-[0.16,1,0.3,1]"
                    style={{ maxHeight: !needsExpand ? "none" : expanded ? "900px" : "40px" }}
                  >
                    <p className={`text-[12.5px] leading-relaxed text-on-surface-variant/85 transition-opacity duration-200 ${!expanded && needsExpand ? "line-clamp-2 opacity-95" : "opacity-100"}`}>
                      {highlightMatch(item.summary, debouncedQuery) as any}
                    </p>
                    {expanded && hasDetails && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] as any }}
                        className="mt-2 pt-2 border-t border-outline-variant/10 space-y-2"
                      >
                        <div className="flex items-center gap-1.5">
                          <ScrollText className="w-3 h-3 text-primary/70" />
                          <span className="text-[10px] font-mono font-semibold tracking-wider uppercase text-primary/80">Análisis ampliado</span>
                        </div>
                        <p className="text-[12px] leading-[1.6] text-on-surface/80">
                          {highlightMatch(item.details!, debouncedQuery) as any}
                        </p>
                        {item.takeaways && item.takeaways.length > 0 && (
                          <ul className="space-y-1 pt-1">
                            {item.takeaways.map((t, i) => (
                              <li key={i} className="flex items-start gap-2 text-[11.5px] leading-[1.5] text-on-surface-variant/75">
                                <span className="mt-[5px] w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                                <span>{highlightMatch(t, debouncedQuery) as any}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </motion.div>
                    )}
                  </div>
                  {needsExpand && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpanded(item.id);
                      }}
                      aria-expanded={expanded}
                      aria-label={expanded ? "Mostrar menos" : hasDetails ? "Leer análisis ampliado" : "Leer resumen completo"}
                      className="inline-flex items-center gap-1 text-[10px] font-mono font-normal tracking-wide text-on-surface-variant/55 hover:text-primary transition-colors cursor-pointer group/btn"
                    >
                      <span className="w-[14px] h-[14px] rounded-full border border-outline-variant/20 group-hover/btn:border-primary/30 flex items-center justify-center shrink-0 transition-colors">
                        {expanded ? <Minus className="w-2.5 h-2.5 stroke-[1.8] opacity-70 group-hover/btn:opacity-100" /> : <Plus className="w-2.5 h-2.5 stroke-[1.8] opacity-70 group-hover/btn:opacity-100" />}
                      </span>
                      <span className="underline decoration-dotted decoration-outline-variant/25 group-hover/btn:decoration-primary/30 underline-offset-[3px]">
                        {expanded ? "Mostrar menos" : hasDetails ? "Leer análisis" : "Leer más"}
                      </span>
                    </button>
                  )}
                </div>
              );
            })()}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2 shrink-0 self-stretch md:self-center justify-between md:justify-end border-t md:border-t-0 border-outline-variant/10 pt-3 md:pt-0">
            {item.impact === "positivo" ? (
              <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 whitespace-nowrap">
                <CheckCircle className="w-3 h-3" />
                Avance
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-red-700 dark:text-red-300 bg-red-500/10 px-2.5 py-1 rounded-full border border-red-500/20 whitespace-nowrap">
                <AlertTriangle className="w-3 h-3" />
                Vulneración
              </span>
            )}

            <button
              onClick={(e) => handleCopyLink(e, item.id)}
              title="Copiar enlace"
              aria-label="Copiar enlace"
              className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-surface-dim/50 dark:bg-surface-container/50 hover:bg-primary/10 border border-outline-variant/20 hover:border-primary/30 text-on-surface-variant/60 hover:text-primary transition-all cursor-pointer shrink-0"
            >
              {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Link2 className="w-3.5 h-3.5" />}
            </button>

            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`Abrir fuente: ${item.source}`}
              className="inline-flex items-center gap-1.5 h-7 px-3 rounded-full bg-white dark:bg-zinc-800 hover:bg-link/[0.06] text-on-surface-variant hover:text-link text-[10px] font-mono font-bold uppercase border border-outline-variant/25 hover:border-link/30 transition-colors shrink-0 shadow-sm"
            >
              <span className="max-w-[90px] truncate">{item.source}</span>
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div id="news-section-view" className="-mt-12 lg:-mt-20 space-y-8 w-full relative max-w-full mx-auto">

      {/* ───────────── HERO (restaurado 550/600 publicada + ambient glows StoryMode) ───────────── */}
      <div
        className="flex flex-col items-center relative overflow-visible"
        style={{
          width: "calc(100vw - var(--scrollbar-width, 0px))",
          marginLeft: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
          marginRight: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
        }}
      >
        <div className="w-full flex flex-col lg:justify-center items-center text-center relative h-[550px] min-h-[550px] lg:h-[600px] lg:min-h-[600px] pt-16 lg:pt-28 pb-20 lg:pb-24 px-6 lg:px-16 overflow-visible">
          {/* Esquinas tipo crosshair — publicada: 25px/20px */}
          <div className="absolute top-[25px] left-[20px] w-6 h-6 pointer-events-none select-none flex items-center justify-center z-10">
            <div className="absolute w-4 h-[2px] bg-primary/30" /><div className="absolute w-[2px] h-4 bg-primary/30" />
          </div>
          <div className="absolute top-[25px] right-[20px] w-6 h-6 pointer-events-none select-none flex items-center justify-center z-10">
            <div className="absolute w-4 h-[2px] bg-primary/30" /><div className="absolute w-[2px] h-4 bg-primary/30" />
          </div>
          <div className="absolute bottom-[25px] left-[20px] w-6 h-6 pointer-events-none select-none flex items-center justify-center z-10">
            <div className="absolute w-4 h-[2px] bg-primary/30" /><div className="absolute w-[2px] h-4 bg-primary/30" />
          </div>
          <div className="absolute bottom-[25px] right-[20px] w-6 h-6 pointer-events-none select-none flex items-center justify-center z-10">
            <div className="absolute w-4 h-[2px] bg-primary/30" /><div className="absolute w-[2px] h-4 bg-primary/30" />
          </div>

          <motion.div variants={headerVariants} initial="hidden" animate="visible" className="relative z-10 space-y-7 sm:space-y-8 max-w-3xl">
            <motion.h1 variants={childVariants} className="text-[clamp(42px,8.5vw,80px)] font-bold tracking-tight font-heading leading-[1.05] text-on-background select-none">
              Noticias
              <span className="font-serif italic font-light text-on-surface-variant/75 block mt-3 sm:mt-4 text-[clamp(20px,3.2vw,32px)] tracking-normal">
                Registro &amp; Análisis
              </span>
            </motion.h1>
            <motion.p variants={childVariants} className="max-w-2xl mx-auto pt-2 sm:pt-3 font-serif italic font-light text-on-surface-variant/70 leading-relaxed text-[14px] sm:text-[16px] md:text-[18px] lg:text-[19px] text-center tracking-normal select-none">
              Selección, síntesis y seguimiento de los eventos más determinantes para los animales, ordenados por metodología de impacto y con acceso a sus fuentes originales.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* ───────────── MAIN CONTENT (BELOW MENU & HERO) — margenes laterales reducidos ~50% ───────────── */}
      <div className="space-y-8 relative z-10">
        {/* Transparency & Methodology — colapsable para reducir scroll inicial (Fase 1) */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pl-1">
            <AnimatePresence initial={false}>
              {isMethodologyOpen && (
                <motion.h3
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                  className="text-3xl md:text-4xl lg:text-5xl font-serif text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight overflow-hidden"
                >
                  Criterios de Evaluación<br className="hidden sm:inline" /> <span className="italic font-light opacity-90">&amp; Metodología</span>
                </motion.h3>
              )}
            </AnimatePresence>
            <button
              type="button"
              onClick={() => setIsMethodologyOpen((v) => !v)}
              aria-expanded={isMethodologyOpen}
              className="inline-flex items-center gap-1.5 self-start sm:self-center sm:ml-auto px-3 py-1.5 rounded-full border border-outline-variant/25 bg-surface-container/40 hover:bg-surface-container/70 text-[11px] font-mono font-medium text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer shrink-0"
            >
              {isMethodologyOpen ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{isMethodologyOpen ? "Ocultar" : "Mostrar"} criterios</span>
              {isMethodologyOpen ? <ChevronUp className="w-3 h-3 opacity-60" /> : <ChevronDown className="w-3 h-3 opacity-60" />}
            </button>
          </div>

          <AnimatePresence initial={false}>
            {isMethodologyOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="space-y-5 overflow-hidden"
              >

          {/* 2 Main Criteria Cards (Interactive with Live Counts & 1-Click Impact Filter) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Avances (Green / Emerald) */}
            <div
              onClick={() => handleToggleImpactFilter("positivo")}
              className={`relative rounded-2xl p-4 sm:p-5 space-y-3 overflow-hidden border transition-all duration-200 cursor-pointer select-none backdrop-blur-md flex flex-col justify-between ${
                selectedImpact === "positivo"
                  ? "border-primary/50 bg-primary/5 ring-1 ring-primary/30"
                  : "border-outline-variant/25 bg-surface-container/25 hover:border-outline-variant/45 hover:bg-surface-container/50"
              }`}
            >
              <div className="space-y-2.5">
                {/* Header: Icon + Title + Count + Active state */}
                <div className="flex items-center justify-between gap-2 border-b border-primary/20 pb-2">
                  <div className="flex items-center gap-2 font-bold text-primary font-mono text-xs tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                    <span>CRITERIO: AVANCE EN PROTECCIÓN</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {selectedImpact === "positivo" && (
                      <span className="text-[10px] font-mono font-bold text-primary flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> Activo
                      </span>
                    )}
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border bg-primary/10 text-primary border-primary/20">
                      {taxonomyCounts.impact.positivo} Avances
                    </span>
                  </div>
                </div>

                {/* Editorial Guideline Structure with micro-icons */}
                <div className="space-y-2 pt-0.5">
                  <div className="flex items-start gap-2 text-[12px] sm:text-[12.5px] text-on-surface-variant/90 leading-relaxed">
                    <Landmark className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <p className="m-0">
                      <strong className="text-primary font-semibold">Leyes &amp; Normas:</strong> Aprobación de marcos jurídicos que restringen la explotación, amplían derechos o reconocen estatus legal de sintiencia.
                    </p>
                  </div>

                  <div className="flex items-start gap-2 text-[12px] sm:text-[12.5px] text-on-surface-variant/90 leading-relaxed">
                    <Brain className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <p className="m-0">
                      <strong className="text-primary font-semibold">Ciencia &amp; Neurobiología:</strong> Publicación de consensos empíricos y evidencia neurofisiológica que acreditan capacidad de sufrimiento consciente.
                    </p>
                  </div>

                  <div className="flex items-start gap-2 text-[12px] sm:text-[12.5px] text-on-surface-variant/90 leading-relaxed">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <p className="m-0">
                      <strong className="text-primary font-semibold">Bienestar &amp; Prácticas:</strong> Reducción efectiva del confinamiento intensivo, dolor en manejo o eliminación del uso de animales en pruebas.
                    </p>
                  </div>

                  <div className="flex items-start gap-2 text-[12px] sm:text-[12.5px] text-on-surface-variant/90 leading-relaxed">
                    <TrendingUp className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <p className="m-0">
                      <strong className="text-primary font-semibold">Mercado &amp; Consumo:</strong> Desplazamiento de la demanda hacia modelos y alternativas productivas que reducen el volumen total de sacrificios.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vulneraciones (Red / Ruby) */}
            <div
              onClick={() => handleToggleImpactFilter("negativo")}
              className={`relative rounded-2xl p-4 sm:p-5 space-y-3 overflow-hidden border transition-all duration-200 cursor-pointer select-none backdrop-blur-md flex flex-col justify-between ${
                selectedImpact === "negativo"
                  ? "border-primary/50 bg-primary/5 ring-1 ring-primary/30"
                  : "border-outline-variant/25 bg-surface-container/25 hover:border-outline-variant/45 hover:bg-surface-container/50"
              }`}
            >
              <div className="space-y-2.5">
                {/* Header: Icon + Title + Count + Active state */}
                <div className="flex items-center justify-between gap-2 border-b border-primary/20 pb-2">
                  <div className="flex items-center gap-2 font-bold text-primary font-mono text-xs tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                    <AlertTriangle className="w-4 h-4 text-primary shrink-0" />
                    <span>CRITERIO: VULNERACIÓN DOCUMENTADA</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {selectedImpact === "negativo" && (
                      <span className="text-[10px] font-mono font-bold text-primary flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> Activo
                      </span>
                    )}
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border bg-primary/10 text-primary border-primary/20">
                      {taxonomyCounts.impact.negativo} Vulneraciones
                    </span>
                  </div>
                </div>

                {/* Editorial Guideline Structure with micro-icons */}
                <div className="space-y-2 pt-0.5">
                  <div className="flex items-start gap-2 text-[12px] sm:text-[12.5px] text-on-surface-variant/90 leading-relaxed">
                    <Landmark className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <p className="m-0">
                      <strong className="text-primary font-semibold">Retrocesos Legales:</strong> Modificación o derogación de leyes protectoras, desregulación de prácticas lesivas o trabas a sustitutos.
                    </p>
                  </div>

                  <div className="flex items-start gap-2 text-[12px] sm:text-[12.5px] text-on-surface-variant/90 leading-relaxed">
                    <Factory className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <p className="m-0">
                      <strong className="text-primary font-semibold">Daño Físico &amp; Cría:</strong> Condiciones de cría, transporte o faenado que comprometen la integridad biológica y etológica fundamental.
                    </p>
                  </div>

                  <div className="flex items-start gap-2 text-[12px] sm:text-[12.5px] text-on-surface-variant/90 leading-relaxed">
                    <TrendingUp className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <p className="m-0">
                      <strong className="text-primary font-semibold">Expansión Productiva:</strong> Incremento en la escala de producción animal intensiva y aumento neto del número de individuos sacrificados.
                    </p>
                  </div>

                  <div className="flex items-start gap-2 text-[12px] sm:text-[12.5px] text-on-surface-variant/90 leading-relaxed">
                    <Globe className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                    <p className="m-0">
                      <strong className="text-primary font-semibold">Impacto Sistémico:</strong> Externalización del daño a través de cadenas globales de suministro sin estándares éticos verificables.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Interactive Taxonomy Cards */}
          <div className="pt-0.5">
            {(() => {
              const taxonomyCards = [
                {
                  id: "fuentes" as const,
                  title: "Tipos de Fuentes",
                  shortTitle: "Fuentes",
                  desc: "Garantía de trazabilidad y rigor para verificar cada evento noticioso.",
                  icon: Scale,
                  colorClass: "bg-ch1",
                  tags: ["BOE / DOUE", "Peer-Review", "EFSA / Informes", "Prensa Seria"],
                  items: [
                    {
                      id: "boe",
                      label: "BOE / DOUE",
                      text: "Boletines oficiales, leyes vigentes, decretos y resoluciones gubernamentales vinculantes.",
                      icon: ScrollText,
                      filterType: "sourceType" as const,
                      filterValue: "oficial",
                      accentColor: "text-blue-600 dark:text-blue-400",
                    },
                    {
                      id: "peer",
                      label: "Peer-Review",
                      text: "Estudios revisados por pares en revistas científicas internacionales y consensos de sintiencia.",
                      icon: FlaskConical,
                      filterType: "sourceType" as const,
                      filterValue: "cientifica",
                      accentColor: "text-purple-600 dark:text-purple-400",
                    },
                    {
                      id: "efsa",
                      label: "EFSA / Informes",
                      text: "Dictámenes de agencias reguladoras, auditorías zoosanitarias y reportes técnicos de ONGs.",
                      icon: Building2,
                      filterType: "sourceType" as const,
                      filterValue: "informe",
                      accentColor: "text-primary",
                    },
                    {
                      id: "prensa",
                      label: "Prensa Seria",
                      text: "Cobertura periodística contrastada en medios de comunicación de referencia internacional.",
                      icon: Newspaper,
                      filterType: "sourceType" as const,
                      filterValue: "prensa",
                      accentColor: "text-amber-600 dark:text-amber-400",
                    },
                  ],
                },
                {
                  id: "categorias" as const,
                  title: "Ejes de Análisis",
                  shortTitle: "Ejes",
                  desc: "Dimensiones de impacto para seguir la evolución del trato hacia los animales.",
                  icon: BookOpen,
                  colorClass: "bg-ch3",
                  tags: ["Leyes", "Sintiencia", "Industria", "Consumo", "Activismo"],
                  items: [
                    {
                      id: "ley",
                      label: "Leyes",
                      text: "Iniciativas legislativas, prohibiciones de explotación y concesión de estatutos de protección.",
                      icon: Landmark,
                      filterType: "category" as const,
                      filterValue: "ley",
                      accentColor: "text-indigo-600 dark:text-indigo-400",
                    },
                    {
                      id: "ciencia",
                      label: "Sintiencia",
                      text: "Consensos empíricos sobre consciencia, sufrimiento, cognición compleja y etología.",
                      icon: Brain,
                      filterType: "category" as const,
                      filterValue: "ciencia",
                      accentColor: "text-purple-600 dark:text-purple-400",
                    },
                    {
                      id: "industria",
                      label: "Industria",
                      text: "Macrogranjas, densidad de cría, estrés en transporte de larga distancia y faenado.",
                      icon: Factory,
                      filterType: "category" as const,
                      filterValue: "industria",
                      accentColor: "text-rose-600 dark:text-rose-400",
                    },
                    {
                      id: "consumo",
                      label: "Consumo",
                      text: "Crecimiento del mercado vegetal y celular, demanda de proteína y reducción de sacrificios.",
                      icon: TrendingUp,
                      filterType: "category" as const,
                      filterValue: "consumo",
                      accentColor: "text-amber-600 dark:text-amber-400",
                    },
                    {
                      id: "social",
                      label: "Activismo",
                      text: "Movilización ciudadana, litigio estratégico y evolución de la opinión pública global.",
                      icon: Megaphone,
                      filterType: "category" as const,
                      filterValue: "social",
                      accentColor: "text-teal-600 dark:text-teal-400",
                    },
                  ],
                },
                {
                  id: "regiones" as const,
                  title: "Cobertura Territorial",
                  shortTitle: "Territorios",
                  desc: "Ámbitos geográficos y jurisdicciones donde se aplican las normativas.",
                  icon: Globe,
                  colorClass: "bg-ch5",
                  tags: ["España", "Unión Europea", "Global"],
                  items: [
                    {
                      id: "españa",
                      label: "España",
                      text: "Leyes estatales (Bienestar Animal, Código Civil), normativas autonómicas y sentencias judiciales.",
                      icon: Compass,
                      filterType: "region" as const,
                      filterValue: "españa",
                      accentColor: "text-red-600 dark:text-red-400",
                    },
                    {
                      id: "europa",
                      label: "Unión Europea",
                      text: "Reglamentos y directivas de la UE, dictámenes EFSA e iniciativas ciudadanas vinculantes.",
                      icon: ShieldCheck,
                      filterType: "region" as const,
                      filterValue: "europa",
                      accentColor: "text-blue-600 dark:text-blue-400",
                    },
                    {
                      id: "global",
                      label: "Global",
                      text: "Tratados mundiales, jurisprudencia pionera internacional y tendencias macroeconómicas.",
                      icon: Globe,
                      filterType: "region" as const,
                      filterValue: "global",
                      accentColor: "text-primary",
                    },
                  ],
                },
              ];

              const selectedCard = taxonomyCards.find((c) => c.id === activeTaxonomyDrawer);

              return (
                <AnimatePresence mode="wait">
                  {selectedCard ? (
                    /* 1. FOCUS VIEW: Compact, clean, fluid expansion */
                    <motion.div
                      key={`expanded-${selectedCard.id}`}
                      initial={{ opacity: 0, y: 8, scale: 0.99 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.99 }}
                      transition={{ duration: 0.22, ease: "easeOut" }}
                      className="relative w-full rounded-2xl border border-primary/30 bg-primary/5 backdrop-blur-md p-4 sm:p-5 overflow-hidden space-y-3.5"
                    >
                      {/* Top Header: Title + Switcher + Close */}
                      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant/20 pb-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                           {(() => {
                            const IconComp = selectedCard.icon;
                            return <IconComp className="w-4 h-4 shrink-0 text-primary" />;
                          })()}
                          <div>
                            <span className="font-mono text-xs tracking-wider uppercase font-bold text-on-background m-0">
                              {selectedCard.title}
                            </span>
                            <p className="text-xs text-on-surface-variant/75 m-0">
                              {selectedCard.desc}
                            </p>
                          </div>
                        </div>

                        {/* Switcher & Close */}
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="flex items-center p-0.5 rounded-xl bg-surface-dim/60 dark:bg-zinc-900/60 border border-outline-variant/25">
                            {taxonomyCards.map((tab) => {
                              const isActiveTab = tab.id === activeTaxonomyDrawer;
                              const TabIcon = tab.icon;
                              return (
                                <button
                                  key={tab.id}
                                  onClick={() => setActiveTaxonomyDrawer(tab.id)}
                                  className={`relative px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                                    isActiveTab
                                      ? "text-primary dark:text-primary-fixed font-bold shadow-xs"
                                      : "text-on-surface-variant/70 hover:text-on-surface"
                                  }`}
                                >
                                  {isActiveTab && (
                                    <motion.div
                                      layoutId="active-taxonomy-tab-indicator"
                                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                      className="absolute inset-0 rounded-lg bg-surface dark:bg-surface-container-high border border-outline-variant/30 shadow-2xs z-0"
                                    />
                                  )}
                                  <TabIcon className="w-3 h-3 shrink-0 relative z-10" />
                                  <span className="relative z-10 hidden sm:inline">{tab.shortTitle}</span>
                                </button>
                              );
                            })}
                          </div>

                          <button
                            onClick={() => setActiveTaxonomyDrawer(null)}
                            className="text-xs font-mono text-on-surface-variant/75 hover:text-primary transition-colors cursor-pointer flex items-center gap-1 px-2.5 py-1 rounded-xl border border-outline-variant/25 hover:border-primary/35 bg-surface-dim/40 hover:bg-surface-dim/70"
                            title="Cerrar (ESC)"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Cerrar</span>
                          </button>
                        </div>
                      </div>

                      {/* Items Grid */}
                      <div
                        className={`relative z-10 grid gap-2.5 ${
                          selectedCard.items.length === 3
                            ? "grid-cols-1 md:grid-cols-3"
                            : selectedCard.items.length === 4
                            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5"
                        }`}
                      >
                        {selectedCard.items.map((it) => {
                          const ItemIcon = it.icon;
                          const count = getTaxonomyItemCount(it.filterType, it.filterValue);
                          const isActive = isTaxonomyItemActive(it.filterType, it.filterValue);

                          return (
                            <div
                              key={it.id}
                              onClick={(e) => handleApplyTaxonomyFilter(it.filterType, it.filterValue, e)}
                              className={`relative p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between gap-2 cursor-pointer select-none ${
                                isActive
                                  ? "bg-primary/10 border-primary ring-1 ring-primary/40"
                                  : "bg-surface/75 dark:bg-surface-container/50 border-outline-variant/20 hover:border-outline-variant/45 hover:bg-surface dark:hover:bg-surface-container/80"
                              }`}
                            >
                              <div className="space-y-1.5">
                                <div className="flex items-center justify-between gap-1.5">
                                  <div className="flex items-center gap-1.5 min-w-0">
                                    <ItemIcon className={`w-3.5 h-3.5 shrink-0 ${it.accentColor}`} />
                                    <span className="font-mono font-bold text-xs text-on-surface truncate">
                                      {it.label}
                                    </span>
                                  </div>
                                  <span
                                  className={`shrink-0 text-[10px] font-mono px-1.5 py-0.2 rounded-md border ${
                                    isActive
                                      ? "bg-primary text-on-primary border-primary font-bold"
                                      : "bg-surface-dim/50 text-on-surface-variant/70 border-outline-variant/25"
                                  }`}
                                  >
                                    {count}
                                  </span>
                                </div>

                                <p className="text-[11.5px] sm:text-[12px] text-on-surface-variant/85 font-sans leading-relaxed m-0">
                                  {it.text}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ) : (
                    /* 2. DEFAULT 3-COLUMN VIEW: Clean & Minimal */
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 items-stretch">
                      {taxonomyCards.map((card) => {
                        const IconComp = card.icon;
                        const isAnyActive = card.items.some((it) =>
                          isTaxonomyItemActive(it.filterType, it.filterValue)
                        );

                        return (
                          <div
                            key={card.id}
                            onClick={() => setActiveTaxonomyDrawer(card.id)}
                            className={`group relative w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer overflow-hidden backdrop-blur-md flex flex-col justify-between gap-3 ${
                              isAnyActive
                                ? "border-primary/50 bg-primary/5 ring-1 ring-primary/30"
                                : "border-outline-variant/25 bg-surface-container/25 hover:border-outline-variant/45 hover:bg-surface-container/50"
                            }`}
                          >
                            <div className="space-y-2 relative z-10 w-full">
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 min-w-0">
                                  <IconComp className="w-4 h-4 shrink-0 text-primary transition-colors" />
                                  <span className="font-mono text-xs tracking-wider uppercase font-bold text-on-background group-hover:text-primary transition-colors truncate">
                                    {card.title}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  {activeTaxonomyDrawer === card.id && (
                                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border bg-primary/10 text-primary border-primary/20`}>
                                      Abierto
                                    </span>
                                  )}
                                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border bg-primary/10 text-primary border-primary/20`}>
                                    {card.items.length}
                                  </span>
                                  <span
                                    aria-hidden="true"
                                    className="text-primary/70 group-hover:text-primary group-hover:scale-125 transition-transform text-sm font-bold leading-none shrink-0"
                                  >
                                    {activeTaxonomyDrawer === card.id ? "−" : "+"}
                                  </span>
                                </div>
                              </div>

                              <p className="text-[12px] sm:text-[12.5px] font-sans text-on-surface-variant/85 group-hover:text-on-surface-variant/95 leading-relaxed m-0 transition-colors">
                                {card.desc}
                              </p>

                              <div className="flex flex-wrap gap-1.5 pt-0.5">
                                {card.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-[10px] font-mono px-2 py-0.5 rounded-md border bg-surface-dim/40 border-outline-variant/25 text-on-surface-variant/75 group-hover:text-on-surface-variant/90 transition-colors"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </AnimatePresence>
              );
            })()}
          </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* News Database & Explorer Section Header */}
        <div ref={newsTitleRef} className="pl-1 pt-4 sm:pt-6 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
              Explorador de Noticias<br className="hidden sm:inline" /> <span className="italic font-light opacity-90">&amp; Archivo Documental</span>
            </h3>
            <div className="flex flex-col items-start sm:items-end gap-1 shrink-0 self-start sm:self-center">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium px-2.5 py-1 rounded-full border bg-surface-container/50 border-outline-variant/25 text-on-surface-variant">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Mostrando <strong className="text-on-surface">{sortedNews.length}</strong> de {NEWS_DATA.length} noticias
                {debouncedQuery && (
                  <span className="text-primary"> • “{debouncedQuery}”</span>
                )}
              </span>
              {hasAnyActiveFilter && (
                <span className="text-[11px] font-mono text-on-surface-variant/60">
                  {totalActiveFiltersCount > 0 ? `${totalActiveFiltersCount} filtro${totalActiveFiltersCount > 1 ? "s" : ""} activo${totalActiveFiltersCount > 1 ? "s" : ""}` : "búsqueda activa"}
                  {" — "}
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="text-primary hover:underline cursor-pointer font-medium"
                  >
                    Limpiar
                  </button>
                </span>
              )}
            </div>
          </div>
          <p className="text-xs sm:text-sm font-serif italic text-on-surface-variant/75 pt-0.5 max-w-2xl">
            Base de datos cronológica de eventos contrastados, marcos jurídicos y avances científicos sobre sintiencia animal.
          </p>
        </div>

        {/* Sentinel element to track sticky docking position */}
        <div ref={sentinelRef} className="h-0 w-full pointer-events-none" />

        {/* Unified Spotlight Sticky Bar — blur-md único */}
        <div ref={controlBarRef} className="sticky top-4 z-40 w-full max-w-[620px] mx-auto pt-2 relative">
          {/* Spotlight Pill — glass unificada */}
          <div
            className={`relative rounded-full border backdrop-blur-md p-1.5 sm:p-2 flex items-center gap-1.5 sm:gap-2 transition-[box-shadow,background-color,border-color] duration-300 ${
              isStuck
                ? "shadow-xl border-outline-variant/40 dark:border-white/20 ring-1 ring-primary/15 bg-surface/90 dark:bg-zinc-950/90"
                : "shadow-md border-outline-variant/25 dark:border-white/10 bg-surface/80 dark:bg-zinc-950/80 hover:border-outline-variant/40 dark:hover:border-white/20"
            }`}
          >
            {/* Search Input */}
            <div className="relative flex-1 flex items-center">
              <Search className="w-4 h-4 text-primary absolute left-3.5 pointer-events-none shrink-0" />
              <input
                type="text"
                placeholder="Buscar noticias, leyes, especies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Buscar noticias por título, resumen, etiquetas o fuente"
                aria-describedby="news-search-help"
                className="w-full bg-surface-dim/40 dark:bg-white/[0.05] border border-outline-variant/20 dark:border-white/10 rounded-full pl-9 pr-14 py-2 text-xs sm:text-sm font-sans focus:outline-none focus:border-primary text-on-surface placeholder-on-surface-variant/45 transition-colors"
              />
              <span id="news-search-help" className="sr-only">Escribe para filtrar las noticias. La búsqueda es insensible a mayúsculas y examina etiquetas y especies.</span>
              <AnimatePresence>
                {searchQuery && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.92 }}
                  transition={BAR_SPRING}
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setDebouncedQuery("");
                    }}
                    aria-label="Borrar búsqueda"
                    className="absolute right-8 p-1 text-on-surface-variant/60 hover:text-primary cursor-pointer transition-colors"
                    title="Borrar búsqueda"
                  >
                    <X className="w-3.5 h-3.5" />
                  </motion.button>
                )}
              </AnimatePresence>
                <motion.span
                  key={sortedNews.length}
                  initial={{ opacity: 0.4, y: -3 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: BAR_EASE }}
                className="absolute right-3.5 text-[10.5px] font-mono text-primary font-bold"
                aria-live="polite"
                aria-atomic="true"
              >
                {sortedNews.length}
              </motion.span>
              {/* Live region para lectores de pantalla */}
              <span className="sr-only" aria-live="polite" aria-atomic="true">
                {debouncedQuery.trim() ? `${sortedNews.length} resultados para ${debouncedQuery.trim()}` : `${sortedNews.length} noticias filtradas, ${paginatedNews.length} mostradas`}
              </span>
            </div>

            {/* Filters Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              aria-expanded={isMainFilterOpen}
              aria-controls="news-main-filters"
              aria-label="Filtros avanzados"
              onClick={(e) => {
                e.stopPropagation();
                setIsMainFilterOpen((prev) => !prev);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-mono transition-all cursor-pointer shrink-0 ${
                isMainFilterOpen || totalActiveFiltersCount > 0
                  ? "bg-primary text-on-primary font-bold shadow-xs"
                  : "bg-surface-dim/50 dark:bg-white/[0.06] border border-outline-variant/30 dark:border-white/10 text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Filtros</span>
              {totalActiveFiltersCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-400 text-zinc-950 font-bold text-[9.5px] flex items-center justify-center">
                  {totalActiveFiltersCount}
                </span>
              )}
            </motion.button>

            {/* View Mode Toggle — grid / list / timeline */}
            <div className="flex border border-outline-variant/30 dark:border-white/10 rounded-full overflow-hidden bg-surface-dim/40 dark:bg-black/30 p-0.5 shrink-0" role="group" aria-label="Modo de vista">
              <motion.button
                whileTap={{ scale: 0.92 }}
                type="button"
                onClick={() => setViewMode("grid")}
                title="Vista Cuadrícula"
                aria-label="Vista Cuadrícula"
                aria-pressed={viewMode === "grid"}
                className={`p-1.5 sm:p-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-surface dark:bg-zinc-800 text-primary shadow-xs font-bold"
                    : "text-on-surface-variant/60 hover:text-on-surface"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.92 }}
                type="button"
                onClick={() => setViewMode("list")}
                title="Vista Lista Compacta"
                aria-label="Vista Lista Compacta"
                aria-pressed={viewMode === "list"}
                className={`p-1.5 sm:p-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  viewMode === "list"
                    ? "bg-surface dark:bg-zinc-800 text-primary shadow-xs font-bold"
                    : "text-on-surface-variant/60 hover:text-on-surface"
                }`}
              >
                <List className="w-3.5 h-3.5" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.92 }}
                type="button"
                onClick={() => setViewMode("timeline")}
                title="Vista Cronológica"
                aria-label="Vista Cronológica"
                aria-pressed={viewMode === "timeline"}
                className={`p-1.5 sm:p-2 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  viewMode === "timeline"
                    ? "bg-surface dark:bg-zinc-800 text-primary shadow-xs font-bold"
                    : "text-on-surface-variant/60 hover:text-on-surface"
                }`}
              >
                <ScrollText className="w-3.5 h-3.5" />
              </motion.button>
            </div>

            {/* Scroll back to top capsule (Smoothly animates in when sticky) */}
            <AnimatePresence>
              {isStuck && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 36 }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={BAR_SPRING}
                  className="overflow-hidden shrink-0"
                >
                  <motion.button
                    initial={{ scale: 0.85 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.85 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.92 }}
                    transition={BAR_SPRING}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (newsTitleRef.current) {
                        const y = newsTitleRef.current.getBoundingClientRect().top + window.pageYOffset - 24;
                        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
                      } else {
                        scrollToNewsTop();
                      }
                    }}
                    title="Volver arriba"
                    className="w-9 h-9 p-2 rounded-full border border-outline-variant/30 dark:border-white/10 bg-surface-dim/50 dark:bg-white/[0.06] text-on-surface-variant hover:text-primary transition-colors cursor-pointer flex items-center justify-center"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Attached Floating Filter Overlay (Superimposed Over News Cards) */}
          <AnimatePresence>
            {isMainFilterOpen && (
              <>
                {/* Invisible click-outside dismiss layer */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsMainFilterOpen(false)}
                />
                <motion.div
                  id="news-main-filters"
                  ref={filterTrapRef as any}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Filtros avanzados de noticias"
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 rounded-2xl border border-outline-variant/20 dark:border-white/10 bg-surface/90 dark:bg-zinc-950/90 backdrop-blur-md p-4 sm:p-5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.6)] space-y-3.5 max-h-[75vh] overflow-y-auto overscroll-contain sm:max-h-none sm:overflow-visible"
                >
                  {/* Header: Title + Clear All */}
                  <div className="flex items-center justify-between pb-1.5 border-b border-outline-variant/20 dark:border-white/10">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold text-primary uppercase tracking-wider">
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>Filtros Avanzados</span>
                      {totalActiveFiltersCount > 0 && (
                        <span className="text-[9.5px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-bold">
                          {totalActiveFiltersCount} activo{totalActiveFiltersCount > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                    {hasAnyActiveFilter && (
                      <button
                        type="button"
                        onClick={() => {
                          handleResetFilters();
                          scrollToNewsTop();
                        }}
                        className="text-[11px] font-mono text-red-500 hover:text-red-600 transition-colors flex items-center gap-1 cursor-pointer font-medium"
                      >
                        <X className="w-3 h-3" />
                        <span>Limpiar todo</span>
                      </button>
                    )}
                  </div>

                  {/* Ejes Temáticos */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-on-surface-variant/70 tracking-wider font-semibold block">
                      Eje Temático
                    </span>
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCategory("all");
                          scrollToNewsTop();
                        }}
                        className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1.5 border ${
                          selectedCategory === "all"
                            ? "bg-surface dark:bg-zinc-800 text-on-surface font-bold shadow-xs border-outline-variant/50"
                            : "bg-surface-dim/40 dark:bg-white/[0.04] border-outline-variant/20 text-on-surface-variant/75 hover:text-on-surface"
                        }`}
                      >
                        <Sparkles className="w-3 h-3 text-primary" />
                        <span>Todas</span>
                      </button>

                      <div className="h-4 w-px bg-outline-variant/30 mx-0.5" />

                      {CATEGORIES.filter((c) => c.id !== "all").map((cat) => {
                        const isActive = selectedCategory === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                              setSelectedCategory(cat.id);
                              scrollToNewsTop();
                            }}
                            className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1.5 border ${
                              isActive
                                ? "bg-primary text-on-primary font-semibold shadow-xs border-primary"
                                : "bg-surface-dim/40 dark:bg-white/[0.04] border-outline-variant/20 dark:border-white/10 text-on-surface-variant/80 hover:text-on-surface"
                            }`}
                          >
                            {isActive && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />}
                            <span>{cat.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Tipos de Fuente */}
                  <div className="space-y-1.5 pt-2 border-t border-outline-variant/20 dark:border-white/10">
                    <span className="text-[10px] font-mono uppercase text-on-surface-variant/70 tracking-wider font-semibold block">
                      Tipo de Fuente
                    </span>
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSourceType("todos");
                          scrollToNewsTop();
                        }}
                        className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1.5 border ${
                          selectedSourceType === "todos"
                            ? "bg-surface dark:bg-zinc-800 text-on-surface font-bold shadow-xs border-outline-variant/50"
                            : "bg-surface-dim/40 dark:bg-white/[0.04] border-outline-variant/20 text-on-surface-variant/75 hover:text-on-surface"
                        }`}
                      >
                        <span>Todas</span>
                      </button>

                      <div className="h-4 w-px bg-outline-variant/30 mx-0.5" />

                      {(["oficial", "cientifica", "informe", "prensa"] as SourceType[]).map((st) => {
                        const cfg = SOURCE_TYPE_CONFIG[st];
                        const Icon = cfg.icon;
                        const isActive = selectedSourceType === st;
                        return (
                          <button
                            key={st}
                            type="button"
                            onClick={() => {
                              setSelectedSourceType(isActive ? "todos" : st);
                              scrollToNewsTop();
                            }}
                            className={`px-3 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1.5 border ${
                              isActive
                                ? "bg-primary text-on-primary font-semibold shadow-xs border-primary"
                                : "bg-surface-dim/40 dark:bg-white/[0.04] border-outline-variant/20 dark:border-white/10 text-on-surface-variant/80 hover:text-on-surface"
                            }`}
                          >
                            <Icon className="w-3 h-3" />
                            <span>{cfg.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Dimensions Grid: Región, Criterio, Año, Orden in 2x2 Clean Layout */}
                  <div className="space-y-2.5 pt-2 border-t border-outline-variant/20 dark:border-white/10">
                    {/* Row 1: Región & Criterio */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {/* Región */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase text-on-surface-variant/70 tracking-wider font-semibold block">
                          Región
                        </span>
                        <div className="flex items-center rounded-full bg-surface-dim/50 dark:bg-black/40 p-1 border border-outline-variant/20 dark:border-white/10">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedRegion("todos");
                              scrollToNewsTop();
                            }}
                            className={`flex-1 py-1 text-center text-[10.5px] font-mono rounded-full transition-all cursor-pointer ${
                              selectedRegion === "todos"
                                ? "bg-surface dark:bg-zinc-800 text-primary font-bold shadow-2xs"
                                : "text-on-surface-variant/70 hover:text-on-surface"
                            }`}
                          >
                            Todos
                          </button>
                          <div className="w-px h-3 bg-outline-variant/25 mx-0.5" />
                          {REGIONS.filter((r) => r.id !== "todos").map((r) => (
                            <button
                              key={r.id}
                              type="button"
                              onClick={() => {
                                setSelectedRegion(r.id as any);
                                scrollToNewsTop();
                              }}
                              className={`flex-1 py-1 text-center text-[10.5px] font-mono rounded-full transition-all cursor-pointer flex items-center justify-center gap-1 ${
                                selectedRegion === r.id
                                  ? "bg-primary text-on-primary font-bold shadow-2xs"
                                  : "text-on-surface-variant/70 hover:text-on-surface"
                              }`}
                            >
                              <span>{r.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Criterio */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase text-on-surface-variant/70 tracking-wider font-semibold block">
                          Criterio
                        </span>
                        <div className="flex items-center rounded-full bg-surface-dim/50 dark:bg-black/40 p-1 border border-outline-variant/20 dark:border-white/10">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedImpact("todos");
                              scrollToNewsTop();
                            }}
                            className={`flex-1 py-1 text-center text-[10.5px] font-mono rounded-full transition-all cursor-pointer ${
                              selectedImpact === "todos"
                                ? "bg-surface dark:bg-zinc-800 text-primary font-bold shadow-2xs"
                                : "text-on-surface-variant/70 hover:text-on-surface"
                            }`}
                          >
                            Todos
                          </button>
                          <div className="w-px h-3 bg-outline-variant/25 mx-0.5" />
                          {[
                            { id: "positivo", label: "Avances", dotColor: "bg-emerald-400" },
                            { id: "negativo", label: "Vulneraciones", dotColor: "bg-red-400" },
                          ].map((st) => (
                            <button
                              key={st.id}
                              type="button"
                              onClick={() => {
                                setSelectedImpact(st.id as any);
                                scrollToNewsTop();
                              }}
                              className={`flex-1 py-1 text-center text-[10.5px] font-mono rounded-full transition-all cursor-pointer flex items-center justify-center gap-1 ${
                                selectedImpact === st.id
                                  ? (st.id === "positivo"
                                      ? "bg-emerald-600 dark:bg-emerald-500 text-white font-bold shadow-xs"
                                      : "bg-red-600 dark:bg-red-500 text-white font-bold shadow-xs")
                                  : "text-on-surface-variant/70 hover:text-on-surface"
                              }`}
                            >
                              {selectedImpact === st.id && (
                                <span className={`w-1 h-1 rounded-full ${st.dotColor} animate-pulse shrink-0`} />
                              )}
                              <span>{st.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Row 2: Año & Orden */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {/* Año */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase text-on-surface-variant/70 tracking-wider font-semibold block">
                          Año
                        </span>
                        <div className="flex items-center rounded-full bg-surface-dim/50 dark:bg-black/40 p-1 border border-outline-variant/20 dark:border-white/10">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedYear("todos");
                              scrollToNewsTop();
                            }}
                            className={`flex-1 py-1 text-center text-[10.5px] font-mono rounded-full transition-all cursor-pointer ${
                              selectedYear === "todos"
                                ? "bg-surface dark:bg-zinc-800 text-primary font-bold shadow-2xs"
                                : "text-on-surface-variant/70 hover:text-on-surface"
                            }`}
                          >
                            Todos
                          </button>
                          <div className="w-px h-3 bg-outline-variant/25 mx-0.5" />
                          {YEARS.filter((yr) => yr !== "todos").map((yr) => (
                            <button
                              key={yr}
                              type="button"
                              onClick={() => {
                                setSelectedYear(yr);
                                scrollToNewsTop();
                              }}
                              className={`flex-1 py-1 text-center text-[10.5px] font-mono rounded-full transition-all cursor-pointer ${
                                selectedYear === yr
                                  ? "bg-primary text-on-primary font-bold shadow-2xs"
                                  : "text-on-surface-variant/70 hover:text-on-surface"
                              }`}
                            >
                              {yr}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Orden */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono uppercase text-on-surface-variant/70 tracking-wider font-semibold block">
                          Orden
                        </span>
                        <div className="flex items-center rounded-full bg-surface-dim/50 dark:bg-black/40 p-1 border border-outline-variant/20 dark:border-white/10">
                          {[
                            { id: "recientes", label: "Recientes" },
                            { id: "antiguas", label: "Antiguas" },
                          ].map((so) => (
                            <button
                              key={so.id}
                              type="button"
                              onClick={() => {
                                setSortOrder(so.id as SortOrder);
                                scrollToNewsTop();
                              }}
                              className={`flex-1 py-1 text-center text-[10.5px] font-mono rounded-full transition-all cursor-pointer ${
                                sortOrder === so.id
                                  ? "bg-surface dark:bg-zinc-800 text-secondary font-bold shadow-2xs"
                                  : "text-on-surface-variant/70 hover:text-secondary"
                              }`}
                            >
                              {so.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Chips de filtros activos — unificación visual, remover uno a uno sin reset total */}
        <AnimatePresence>
          {hasAnyActiveFilter && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="flex flex-wrap items-center gap-1.5 pt-2"
            >
              <span className="text-[11px] font-mono font-semibold text-on-surface-variant/70 mr-1">Filtros activos:</span>
              {selectedRegion !== "todos" && (
                <button
                  type="button"
                  onClick={() => setSelectedRegion("todos")}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-mono hover:bg-primary/15 transition-colors cursor-pointer"
                >
                  Región: {selectedRegion === "españa" ? "España" : selectedRegion === "europa" ? "Europa" : "Global"}
                  <X className="w-3 h-3 opacity-60" />
                </button>
              )}
              {selectedCategory !== "all" && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory("all")}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-mono hover:bg-primary/15 transition-colors cursor-pointer"
                >
                  Eje: {getCategoryLabel(selectedCategory)}
                  <X className="w-3 h-3 opacity-60" />
                </button>
              )}
              {selectedImpact !== "todos" && (
                <button
                  type="button"
                  onClick={() => setSelectedImpact("todos")}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-mono hover:bg-primary/15 transition-colors cursor-pointer"
                >
                  Criterio: {selectedImpact === "positivo" ? "Avances" : "Vulneraciones"}
                  <X className="w-3 h-3 opacity-60" />
                </button>
              )}
              {selectedSourceType !== "todos" && (
                <button
                  type="button"
                  onClick={() => setSelectedSourceType("todos")}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-mono hover:bg-primary/15 transition-colors cursor-pointer"
                >
                  Fuente: {SOURCE_TYPE_CONFIG[selectedSourceType].label}
                  <X className="w-3 h-3 opacity-60" />
                </button>
              )}
              {selectedYear !== "todos" && (
                <button
                  type="button"
                  onClick={() => setSelectedYear("todos")}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-mono hover:bg-primary/15 transition-colors cursor-pointer"
                >
                  Año: {selectedYear}
                  <X className="w-3 h-3 opacity-60" />
                </button>
              )}
              {sortOrder !== "recientes" && (
                <button
                  type="button"
                  onClick={() => setSortOrder("recientes")}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-mono hover:bg-primary/15 transition-colors cursor-pointer"
                >
                  Orden: Antiguas
                  <X className="w-3 h-3 opacity-60" />
                </button>
              )}
              {debouncedQuery.trim() !== "" && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setDebouncedQuery("");
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-800 dark:text-amber-200 text-[11px] font-mono hover:bg-amber-400/25 transition-colors cursor-pointer max-w-[220px]"
                >
                  <Search className="w-3 h-3 shrink-0" />
                  <span className="truncate">“{debouncedQuery.trim()}”</span>
                  <X className="w-3 h-3 opacity-60 shrink-0" />
                </button>
              )}
              <button
                type="button"
                onClick={handleResetFilters}
                className="ml-1 text-[11px] font-mono text-red-500 hover:text-red-600 hover:underline cursor-pointer"
              >
                Limpiar todo
              </button>
              <button
                type="button"
                onClick={() => {
                  const params = new URLSearchParams(window.location.search);
                  const hash = window.location.hash || "";
                  const qs = params.toString();
                  const url = `${window.location.origin}${window.location.pathname}${qs ? `?${qs}` : ""}${hash}`;
                  navigator.clipboard.writeText(url).then(() => {
                    // feedback visual breve via copiedId genérico no necesario, usamos alert sutil
                  }).catch(() => {});
                  // fallback: copiar con promoción
                  try { navigator.clipboard.writeText(url); } catch {}
                }}
                title="Copiar enlace con filtros actuales"
                className="ml-1 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-surface-container/50 border border-outline-variant/20 text-on-surface-variant hover:text-on-surface text-[11px] font-mono transition-colors cursor-pointer"
              >
                <Link2 className="w-3 h-3" />
                Compartir filtros
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      {/* Content View: Grid / List / Timeline — masonry columns, muy cuidadoso */}
      <div className="relative z-10 pt-2">
        <AnimatePresence mode="wait">
          {sortedNews.length > 0 ? (
            viewMode === "grid" ? (
              <>
                {/* Grid masonry: CSS columns mantiene un solo parent → motion layout funciona sin teleport */}
                <div className="hidden lg:block columns-3 gap-5 space-y-5 [column-fill:_balance]">
                  {paginatedNews.map((item) => (
                    <div key={item.id} className="break-inside-avoid mb-5">
                      {renderCard(item)}
                    </div>
                  ))}
                </div>
                <div className="hidden md:block lg:hidden columns-2 gap-5 space-y-5 [column-fill:_balance]">
                  {paginatedNews.map((item) => (
                    <div key={`t-${item.id}`} className="break-inside-avoid mb-5">
                      {renderCard(item)}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-5 md:hidden">
                  {paginatedNews.map((item) => renderCard(item))}
                </div>
              </>
            ) : viewMode === "list" ? (
              /* List Mode — paginado */
              <div className="flex flex-col gap-3">
                {paginatedNews.map((item) => renderRow(item))}
              </div>
            ) : (
              /* Timeline Mode — agrupado por año, línea vertical cuidadosa */
              <div className="relative pl-6 sm:pl-8">
                {/* Línea vertical continua */}
                <div className="absolute left-2 sm:left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-outline-variant/30 to-transparent" />
                {(() => {
                  const groups = new Map<string, typeof paginatedNews>();
                  for (const it of paginatedNews) {
                    const y = it.date.slice(0, 4);
                    if (!groups.has(y)) groups.set(y, []);
                    groups.get(y)!.push(it);
                  }
                  return Array.from(groups.entries()).map(([year, items]) => (
                    <div key={year} className="relative pb-8 last:pb-0">
                      {/* Año header */}
                      <div className="sticky top-16 z-10 flex items-center gap-3 mb-4 bg-background/80 backdrop-blur-md py-1 -ml-6 sm:-ml-8 pl-6 sm:pl-8">
                        <span className="absolute left-0 sm:left-1 w-3 h-3 rounded-full bg-primary border-2 border-background shadow-sm" style={{ left: '2px' }} />
                        <span className="absolute left-0 w-3 h-3 rounded-full bg-primary/20 animate-ping" style={{ left: '2px' }} />
                        <h4 className="text-sm font-mono font-bold tracking-widest text-primary ml-4">{year}</h4>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-surface-container border border-outline-variant/20 text-on-surface-variant/70">
                          {items.length} noticia{items.length > 1 ? "s" : ""}
                        </span>
                        <div className="flex-1 h-px bg-outline-variant/20 ml-2" />
                      </div>
                      <div className="space-y-3">
                        {items.map((item) => (
                          <div key={item.id} className="relative">
                            <span className="absolute -left-[22px] sm:-left-[28px] top-5 w-2 h-2 rounded-full bg-surface border-2 border-primary/50 shadow-sm" />
                            {renderRow(item)}
                          </div>
                        ))}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            )
          ) : (
            /* Smart Empty State with 1-Click Topic Pills */
            <div className="w-full text-center py-16 glass-enhance border border-outline-variant/30 rounded-2xl bg-surface-dim/10 flex flex-col items-center justify-center space-y-5 p-6">
              <Newspaper className="w-12 h-12 text-on-surface-variant/30 stroke-[1.5]" />
              <div className="space-y-1.5 max-w-md">
                <h4 className="text-base font-heading font-semibold text-on-surface">No se encontraron noticias coincidentes</h4>
                <p className="text-xs text-on-surface-variant/70 font-light">
                  Prueba a ajustar los criterios de búsqueda o explora algunos de los temas más consultados:
                </p>
              </div>

              {/* Popular Topic Pills */}
              <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                {POPULAR_TOPICS.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => {
                      setSearchQuery(topic);
                      setDebouncedQuery(topic);
                      setSelectedRegion("todos");
                      setSelectedCategory("all");
                      setSelectedImpact("todos");
                      setSelectedSourceType("todos");
                      setSelectedYear("todos");
                    }}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-surface-dim/60 hover:bg-primary/15 border border-outline-variant/30 hover:border-primary/40 text-on-surface-variant hover:text-primary text-[11px] font-mono transition-all cursor-pointer"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-primary" />
                    <span>{topic}</span>
                  </button>
                ))}
              </div>

              {hasAnyActiveFilter && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-mono text-link hover:underline pt-2 cursor-pointer"
                >
                  Restablecer todos los filtros y búsqueda
                </button>
              )}
            </div>
          )}
        </AnimatePresence>

        {/* Paginación cuidadosa — evita renderizar 50 cards con motion */}
        {sortedNews.length > 0 && (
          <div className="flex flex-col items-center gap-3 pt-8">
            <div className="text-[11px] font-mono text-on-surface-variant/60">
              Mostrando <strong className="text-on-surface">{paginatedNews.length}</strong> de <strong className="text-on-surface">{sortedNews.length}</strong> noticias filtradas
              {sortedNews.length !== NEWS_DATA.length && (
                <span> • {NEWS_DATA.length} en archivo total</span>
              )}
            </div>
            {hasMore ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setVisibleCount((c) => Math.min(c + LOAD_MORE_STEP, sortedNews.length))}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary font-mono text-xs font-bold hover:bg-primary/90 transition-colors cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Cargar {Math.min(LOAD_MORE_STEP, remaining)} más
                  <span className="opacity-80 font-normal">({remaining} restantes)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setVisibleCount(sortedNews.length)}
                  className="px-4 py-2.5 rounded-full border border-outline-variant/30 bg-surface-container/40 hover:bg-surface-container/70 text-on-surface-variant hover:text-on-surface font-mono text-xs transition-colors cursor-pointer"
                >
                  Ver todas
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-[11px] font-mono text-on-surface-variant/50">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                Has visto todas las noticias filtradas
                {sortedNews.length > INITIAL_VISIBLE && (
                  <button
                    type="button"
                    onClick={() => {
                      setVisibleCount(INITIAL_VISIBLE);
                      scrollToNewsTop();
                    }}
                    className="text-primary hover:underline cursor-pointer ml-1"
                  >
                    Volver arriba
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Newsletter CTA — distribución cuidadosa */}
        <div className="mt-10 rounded-2xl border border-outline-variant/20 bg-gradient-to-br from-primary/5 via-surface-container/20 to-surface-dim/20 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold font-heading text-on-surface flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-primary" />
              Mantente al día sin ruido
            </h4>
            <p className="text-xs text-on-surface-variant/70 leading-relaxed max-w-md">
              Resumen mensual con solo los avances y vulneraciones verificados. Sin spam, con fuentes originales y criterio transparente.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="/noticias.rss"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-outline-variant/25 bg-surface hover:bg-surface-container text-on-surface-variant hover:text-on-surface text-xs font-mono transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              RSS
            </a>
            <button
              type="button"
              onClick={() => {
                const subject = encodeURIComponent("Suscripción resumen mensual Sintiens — Noticias");
                const body = encodeURIComponent("Hola equipo Sintiens,\n\nQuiero recibir el resumen mensual de noticias verificadas.\n\nMi email: \n");
                window.location.href = `mailto:hola@sintiens.org?subject=${subject}&body=${body}`;
              }}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-primary text-on-primary text-xs font-mono font-bold hover:bg-primary/90 transition-colors cursor-pointer"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              Suscribirme
            </button>
          </div>
        </div>

        {/* SEO: JSON-LD CollectionPage con NewsArticle — muy cuidadoso, sin afectar render */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </div>

      </div>
    </div>
  );
});
