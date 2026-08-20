import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  BookOpen,
  User,
  BookMarked,
  ScrollText,
  Quote,
  Beaker,
  Scale,
  Globe,
  Brain,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ArrowLeft,
  X,
  Network,
  Cloud,
  List,
  Hash,
  ExternalLink,
  TrendingUp,
  Layers,
  Dices,
  Link2,
  Check,
  ChevronDown,
  ShieldAlert
} from "lucide-react";
import {
  GLOSSARY_UNIFIED,
  GlossaryEntry,
  GlossaryType,
  GlossaryCategory,
  GlossaryCritique,
  GLOSSARY_CATEGORIES,
  GLOSSARY_TYPES
} from "../data/glossaryUnified";
import {
  getGlossaryIndex,
  getAppearances,
  getCentrality,
  getCoOccurrences,
  getMostCentral,
  Appearance
} from "../utils/buildGlossaryIndex";
import { CORE_NODES } from "../data/CORE_NODES";
import { DILEMMAS_DATA } from "../data/DILEMMAS_DATA";
import GlossaryGraph from "./GlossaryGraph";
import type { TabType } from "../types";

// Build a lookup map of term names → entry IDs for inline link detection.
// Longest names are matched first so multi-word terms ("Liberación Animal")
// are caught before single words ("Liberación").
const TERM_NAME_TO_ID: { [name: string]: string } = {};
GLOSSARY_UNIFIED.forEach((e) => {
  TERM_NAME_TO_ID[e.term.toLowerCase()] = e.id;
  e.altTerms?.forEach((alt) => {
    TERM_NAME_TO_ID[alt.toLowerCase()] = e.id;
  });
});
const SORTED_TERM_NAMES = Object.keys(TERM_NAME_TO_ID).sort(
  (a, b) => b.length - a.length
);
const TERM_LINK_PATTERN = new RegExp(
  `\\b(${SORTED_TERM_NAMES.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`,
  "gi"
);


type ViewMode = "lista" | "grafo" | "nube";
type SortMode = "az" | "citado" | "conectado";
type ListGroup = "az" | "categoria" | "tipo";

interface ReadingRoute {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  steps: { entryId: string; note: string }[];
}

const READING_ROUTES: ReadingRoute[] = [
  {
    id: "etica",
    label: "Ética pura",
    description: "Del prejuicio de base al criterio moral",
    icon: <Scale className="w-4 h-4" />,
    steps: [
      { entryId: "especismo", note: "El prejuicio de base que atraviesa todo el sistema" },
      { entryId: "casos-marginales", note: "La prueba lógica que desmonta la barrera de la inteligencia" },
      { entryId: "utilitarismo", note: "Bentham y Singer: el sufrimiento como criterio" },
      { entryId: "abolicionismo", note: "Regan y el sujeto-de-una-vida" },
      { entryId: "consistencia-moral", note: "Del argumento a tu plato" }
    ]
  },
  {
    id: "ciencia",
    label: "Ciencia",
    description: "La neurobiología del sufrimiento",
    icon: <Beaker className="w-4 h-4" />,
    steps: [
      { entryId: "sintiencia", note: "La capacidad que abre la puerta moral" },
      { entryId: "nocicepcion", note: "Dolor físico frente a experiencia consciente" },
      { entryId: "dolor-vs-nocicepcion", note: "El matiz que cambia el debate" },
      { entryId: "declaracion-cambridge", note: "El consenso neurocientífico" },
      { entryId: "etologia", note: "La vida interior de los animales" }
    ]
  },
  {
    id: "ecologia",
    label: "Ecología",
    description: "El coste planetario del plato",
    icon: <Globe className="w-4 h-4" />,
    steps: [
      { entryId: "ganaderia-industrial", note: "El motor invisible del sistema" },
      { entryId: "termodinamica", note: "Por qué es ineficiente comer animales" },
      { entryId: "metano", note: "El gas que calienta el planeta" },
      { entryId: "deforestacion", note: "El coste en selva de cada kilo" },
      { entryId: "huella-hidrica", note: "El agua que se esconde en la carne" }
    ]
  },
  {
    id: "derecho",
    label: "Derecho",
    description: "De la propiedad al estatus jurídico",
    icon: <ScrollText className="w-4 h-4" />,
    steps: [
      { entryId: "cosificacion", note: "El estatus de propiedad como raíz del problema" },
      { entryId: "habeas-corpus", note: "Animales como titulares de derechos" },
      { entryId: "persona-no-humana", note: "El siguiente paso jurídico" },
      { entryId: "derechos-animales", note: "La teoría que lo sustenta" },
      { entryId: "declaracion-montreal", note: "El documento que abre la vía" }
    ]
  }
];

const routeStepTerm = (route: ReadingRoute, stepIdx: number): GlossaryEntry | undefined => {
  const step = route.steps[stepIdx];
  if (!step) return undefined;
  return GLOSSARY_UNIFIED.find((e) => e.id === step.entryId);
};

interface GlossaryExplorerProps {
  initialEntryId?: string | null;
  onClearInitialEntryId?: () => void;
  onNavigate: (tab: TabType) => void;
}

const TYPE_ICON: Record<GlossaryType, React.ReactNode> = {
  concepto: <BookOpen className="w-3.5 h-3.5" />,
  autor: <User className="w-3.5 h-3.5" />,
  obra: <BookMarked className="w-3.5 h-3.5" />,
  declaracion: <ScrollText className="w-3.5 h-3.5" />,
  cita: <Quote className="w-3.5 h-3.5" />,
  tecnico: <Beaker className="w-3.5 h-3.5" />
};

const TYPE_LABEL: Record<GlossaryType, string> = {
  concepto: "Concepto",
  autor: "Autor",
  obra: "Obra",
  declaracion: "Declaración",
  cita: "Cita",
  tecnico: "Técnico"
};

const CATEGORY_ICON: Partial<Record<GlossaryCategory, React.ReactNode>> = {
  sintiencia: <Brain className="w-3.5 h-3.5" />,
  etica: <Scale className="w-3.5 h-3.5" />,
  ecologia: <Globe className="w-3.5 h-3.5" />,
  sistemas_uso: <Layers className="w-3.5 h-3.5" />,
  legal: <ScrollText className="w-3.5 h-3.5" />,
  psicologia: <Sparkles className="w-3.5 h-3.5" />
};

const CATEGORY_COLOR_CLASS: Record<GlossaryCategory, string> = {
  sintiencia: "ch1",
  etica: "ch4",
  psicologia: "ch3",
  sistemas_uso: "ch2",
  ecologia: "ch5",
  legal: "ch6"
};

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

function getAppearanceTarget(appearance: Appearance): { tab: string; label: string } | null {
  switch (appearance.locationType) {
    case "nodo": {
      const node = CORE_NODES.find((n) => n.id === appearance.locationId);
      if (node) return { tab: "grafo", label: node.title };
      return { tab: "grafo", label: appearance.title };
    }
    case "dilema": {
      const dilemma = DILEMMAS_DATA.find((d) => d.id === appearance.locationId);
      if (dilemma) return { tab: "dialectica", label: dilemma.title };
      return { tab: "dialectica", label: appearance.title };
    }
    case "acto":
      return { tab: "historia_narrativa", label: appearance.title };
    case "referencia":
      return null;
    default:
      return null;
  }
}

const DETAIL_SECTION_TITLE = "text-technical-xs text-primary flex items-center gap-2 font-bold";

// Renders "[N]" markers inside critique rebuttals as subtle superscripts.
function renderCritiqueCitations(text: string): React.ReactNode {
  const parts = text.split(/(\[[0-9,\s]+\])/g);
  return parts.map((seg, i) => {
    const m = seg.match(/^\[([0-9,\s]+)\]$/);
    if (m) {
      return (
        <sup
          key={i}
          className="text-[0.62em] font-mono font-semibold text-on-surface-variant/50 select-none"
        >
          {m[1]!.split(",").map((n) => n.trim()).join(" ")}
        </sup>
      );
    }
    return <React.Fragment key={i}>{seg}</React.Fragment>;
  });
}

function CritiqueSection({ critiques }: { critiques: GlossaryCritique[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      <h4 className={DETAIL_SECTION_TITLE}>
        <ShieldAlert className="w-4 h-4" />
        Críticas frecuentes
      </h4>
      <div className="space-y-2">
        {critiques.map((c, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={i} className="border border-outline-variant/20 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full text-left px-3 py-2.5 flex items-center gap-2 hover:bg-surface-dim/30 transition-colors"
              >
                <span className="text-[10px] font-mono text-on-surface-variant/50 shrink-0">{i + 1}.</span>
                <span className="text-[12px] text-on-surface font-medium flex-1 leading-snug">{c.criticism}</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 shrink-0 text-on-surface-variant/50 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="px-3 pb-3.5 pl-9">
                  <p
                    className="text-[12px] leading-relaxed text-on-surface-variant/85 border-l-2 pl-3"
                    style={{ borderColor: "color-mix(in oklch, var(--primary) 40%, transparent)" }}
                  >
                    {renderCritiqueCitations(c.rebuttal)}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function AppearancesSection({
  appearances,
  onNavigate
}: {
  appearances: Appearance[];
  onNavigate: (app: Appearance) => void;
}) {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? appearances : appearances.slice(0, 4);
  return (
    <div className="space-y-3">
      <h4 className={`${DETAIL_SECTION_TITLE} justify-between`}>
        <span className="flex items-center gap-2">
          <Hash className="w-4 h-4" />
          Aparece en
        </span>
        <span className="text-[10px] font-mono text-on-surface-variant/60 font-normal">{appearances.length} lugares</span>
      </h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {visible.map((app, i) => {
          const target = getAppearanceTarget(app);
          const isExternal = target !== null;
          return (
            <button
              key={`${app.locationId}-${app.field}-${i}`}
              onClick={() => onNavigate(app)}
              disabled={!isExternal}
              className={`w-full text-left p-3 border border-outline-variant/15 rounded-lg transition-all group ${
                isExternal ? "hover:border-primary/40 hover:bg-surface-dim/30 cursor-pointer" : "cursor-default opacity-70"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span
                      className="text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded-sm"
                      style={{
                        backgroundColor: app.category ? `color-mix(in oklch, var(--${CATEGORY_COLOR_CLASS[app.category]}) 12%, transparent)` : "transparent",
                        color: app.category ? `var(--${CATEGORY_COLOR_CLASS[app.category]})` : "var(--on-surface-variant)"
                      }}
                    >
                      {app.locationType}
                    </span>
                    <span className="text-[9px] font-mono text-on-surface-variant/50">{app.field}</span>
                  </div>
                  <p className="text-[12px] text-on-surface font-medium leading-snug line-clamp-2">{app.title}</p>
                </div>
                {isExternal && (
                  <ArrowUpRight className="w-3 h-3 text-primary/40 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
                )}
              </div>
            </button>
          );
        })}
      </div>
      {appearances.length > 4 && (
        <button
          onClick={() => setShowAll((v) => !v)}
          aria-expanded={showAll}
          className="text-[10px] font-mono uppercase tracking-widest text-primary/80 hover:text-primary flex items-center gap-1 transition-all"
        >
          {showAll ? "Ver menos" : `Ver los ${appearances.length} lugares`}
          <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${showAll ? "rotate-180" : ""}`} />
        </button>
      )}
    </div>
  );
}

export default React.memo(function GlossaryExplorer({ initialEntryId, onClearInitialEntryId, onNavigate }: GlossaryExplorerProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("lista");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<GlossaryType | "all">("all");
  const [selectedCategory, setSelectedCategory] = useState<GlossaryCategory | "all">("all");
  const [sortMode, setSortMode] = useState<SortMode>("az");
  const [listGroup, setListGroup] = useState<ListGroup>("az");
  const [selectedEntry, setSelectedEntry] = useState<GlossaryEntry | null>(null);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [forwardStack, setForwardStack] = useState<string[]>([]);
  const [flashEntryId, setFlashEntryId] = useState<string | null>(null);
  const cardScrollRef = useRef<HTMLDivElement>(null);
  const prevEntryIdRef = useRef<string | null>(null);
  const loadedFromHashRef = useRef<boolean>(false);
  const listItemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const azSectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const index = useMemo(() => getGlossaryIndex(), []);
  const mostCentral = useMemo(() => getMostCentral(12), []);

  // Read the URL hash ONLY when we are NOT being navigated to by an explicit
  // initialEntryId (i.e. card click). This prevents a stale hash from a
  // previous visit from overriding the correct entry on first mount.
  useEffect(() => {
    if (initialEntryId) return;
    const hash = window.location.hash;
    if (hash && hash.startsWith("#glosario-")) {
      const id = hash.replace("#glosario-", "");
      const entry = GLOSSARY_UNIFIED.find((e) => e.id === id);
      if (entry) {
        // Mark that this selection came from a hash-based navigation so the
        // auto-scroll effect leaves the page at the top instead of jumping
        // to the list item.
        loadedFromHashRef.current = true;
        setSelectedEntry(entry);
      }
    }
  }, [initialEntryId]);

  // Sync selectedEntry with back/forward navigation (popstate).
  useEffect(() => {
    const onPop = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith("#glosario-")) {
        const id = hash.replace("#glosario-", "");
        const entry = GLOSSARY_UNIFIED.find((e) => e.id === id);
        if (entry) setSelectedEntry(entry);
      }
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (initialEntryId) {
      const entry = GLOSSARY_UNIFIED.find((e) => e.id === initialEntryId);
      if (entry) {
        setViewMode("lista");
        setSearchQuery("");
        setSelectedType("all");
        setSelectedCategory("all");
        setSelectedEntry(entry);
        setFlashEntryId(entry.id);
        if (window.innerWidth < 1024) setIsMobileDetailOpen(true);
        // Clear any stale hash so the hash effect (and popstate) never
        // override this entry on subsequent visits.
        if (window.location.hash.startsWith("#glosario-")) {
          const cleanUrl = window.location.pathname + window.location.search;
          window.history.replaceState(null, "", cleanUrl);
        }
        // Scroll the list item into view and the page to the list section
        requestAnimationFrame(() => {
          const listItem = listItemRefs.current[entry.id];
          if (listItem) {
            listItem.scrollIntoView({ behavior: "auto", block: "center" });
          }
        });
      }
      if (onClearInitialEntryId) onClearInitialEntryId();
    }
  }, [initialEntryId, onClearInitialEntryId]);

  // Auto-scroll the list item into view whenever selectedEntry changes via
  // internal navigation (e.g. clicking another item from inside the glossary).
  useEffect(() => {
    if (!selectedEntry) return;
    if (loadedFromHashRef.current) {
      // The selection came from the URL hash (e.g. tab menu navigation).
      // Skip the auto-scroll so the page stays at the top.
      loadedFromHashRef.current = false;
      return;
    }
    const isInitialFlash = flashEntryId === selectedEntry.id;
    if (isInitialFlash) {
      // Already handled in the initialEntryId effect.
      return;
    }
    const listItem = listItemRefs.current[selectedEntry.id];
    if (listItem) {
      listItem.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [selectedEntry, flashEntryId]);

  // Clear the flash highlight after a short delay so it acts as a pulse.
  useEffect(() => {
    if (!flashEntryId) return;
    const t = setTimeout(() => setFlashEntryId(null), 1200);
    return () => clearTimeout(t);
  }, [flashEntryId]);

  useEffect(() => {
    if (selectedEntry) {
      const newHash = `#glosario-${selectedEntry.id}`;
      if (window.location.hash !== newHash) {
        window.history.replaceState(null, "", newHash);
      }
    }
  }, [selectedEntry]);

  // Scroll the detail card to top when navigating to a new entry
  useEffect(() => {
    if (selectedEntry && prevEntryIdRef.current !== selectedEntry.id) {
      cardScrollRef.current?.scrollTo({ top: 0, behavior: "auto" });
      prevEntryIdRef.current = selectedEntry.id;
    }
  }, [selectedEntry]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
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

  const filteredEntries = useMemo(() => {
    let list = GLOSSARY_UNIFIED.filter((entry) => {
      const matchesType = selectedType === "all" || entry.type === selectedType;
      const matchesCategory = selectedCategory === "all" || entry.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        entry.term.toLowerCase().includes(q) ||
        (entry.altTerms || []).some((a) => a.toLowerCase().includes(q)) ||
        entry.shortDef.toLowerCase().includes(q) ||
        entry.patterns.some((p) => p.toLowerCase().includes(q));
      return matchesType && matchesCategory && matchesSearch;
    });

    if (sortMode === "az") {
      list = [...list].sort((a, b) => a.term.localeCompare(b.term, "es", { sensitivity: "base" }));
    } else if (sortMode === "citado") {
      list = [...list].sort((a, b) => (index[b.id]?.count || 0) - (index[a.id]?.count || 0));
    } else if (sortMode === "conectado") {
      list = [...list].sort((a, b) => (index[b.id]?.centrality || 0) - (index[a.id]?.centrality || 0));
    }

    return list;
  }, [searchQuery, selectedType, selectedCategory, sortMode, index]);

  const routeForEntry = useMemo(() => {
    if (!selectedEntry) return null;
    for (const route of READING_ROUTES) {
      const stepIdx = route.steps.findIndex((s) => s.entryId === selectedEntry.id);
      if (stepIdx >= 0) return { route, stepIdx };
    }
    return null;
  }, [selectedEntry]);

  // Cloud entries: the 12 most central by default, or the filtered list
  // (top 24 by centrality) when search/filters are active.
  const cloudEntries = useMemo(() => {
    const hasActive = searchQuery.trim() !== "" || selectedType !== "all" || selectedCategory !== "all";
    if (!hasActive) return mostCentral;
    return [...filteredEntries]
      .sort((a, b) => (index[b.id]?.centrality || 0) - (index[a.id]?.centrality || 0))
      .slice(0, 24);
  }, [mostCentral, filteredEntries, index, searchQuery, selectedType, selectedCategory]);

  useEffect(() => {
    setActiveItemId(null);
  }, [viewMode]);

  useEffect(() => {
    setActiveItemId(null);
  }, [searchQuery, selectedType, selectedCategory, sortMode]);

  const groupedAz = useMemo(() => {
    const groups: Record<string, GlossaryEntry[]> = {};
    filteredEntries.forEach((e) => {
      const letter = (e.term[0] ?? "").toUpperCase();
      const key = /[A-ZÀ-ÚÑ]/.test(letter) ? letter : "#";
      if (!groups[key]) groups[key] = [];
      groups[key].push(e);
    });
    return Object.keys(groups).sort((a, b) => {
      if (a === "#") return 1;
      if (b === "#") return -1;
      return a.localeCompare(b);
    }).map((k) => ({ letter: k, entries: groups[k]! }));
  }, [filteredEntries]);

  const groupedByCategory = useMemo(() => {
    return GLOSSARY_CATEGORIES
      .map((cat) => ({
        category: cat,
        entries: filteredEntries.filter((e) => e.category === cat.id)
      }))
      .filter((g) => g.entries.length > 0);
  }, [filteredEntries]);

  const groupedByType = useMemo(() => {
    return GLOSSARY_TYPES
      .map((t) => ({
        type: t,
        entries: filteredEntries.filter((e) => e.type === t.id)
      }))
      .filter((g) => g.entries.length > 0);
  }, [filteredEntries]);

  const handleSelectEntry = (entry: GlossaryEntry) => {
    setSelectedEntry((prev) => {
      if (prev && prev.id !== entry.id) {
        setHistory((h) => [prev.id, ...h].slice(0, 50));
      }
      return entry;
    });
    setForwardStack([]);
    setActiveItemId(entry.id);
    if (window.innerWidth < 1024) setIsMobileDetailOpen(true);
  };

  const handleGoBack = () => {
    if (history.length === 0) return;
    setSelectedEntry((prev) => {
      if (!prev) return prev;
      setForwardStack((f) => [prev.id, ...f].slice(0, 50));
      const prevId = history[0];
      const prevEntry = GLOSSARY_UNIFIED.find((e) => e.id === prevId);
      setHistory((h) => h.slice(1));
      return prevEntry ?? prev;
    });
  };

  const handleGoForward = () => {
    if (forwardStack.length === 0) return;
    setSelectedEntry((prev) => {
      if (!prev) return prev;
      setHistory((h) => [prev.id, ...h].slice(0, 50));
      const nextId = forwardStack[0];
      const nextEntry = GLOSSARY_UNIFIED.find((e) => e.id === nextId);
      setForwardStack((f) => f.slice(1));
      return nextEntry ?? prev;
    });
  };

  const handleNavigateAppearance = (appearance: Appearance) => {
    const target = getAppearanceTarget(appearance);
    if (!target) return;
    if (appearance.locationType === "acto") {
      onNavigate?.("grafo");
      return;
    }
    if (target.tab === "grafo" || target.tab === "dialectica" || target.tab === "cronologia" || target.tab === "calculadora" || target.tab === "validador") {
      onNavigate?.(target.tab as any);
      setTimeout(() => {
        if (appearance.locationType === "dilema") {
          window.dispatchEvent(new CustomEvent("expand-dilemma", { detail: appearance.locationId }));
        } else if (appearance.locationType === "nodo") {
          window.dispatchEvent(new CustomEvent("navigate-to-item", { detail: appearance.locationId }));
        }
      }, 80);
    }
  };

  const handleNavigateRelated = (id: string) => {
    const related = GLOSSARY_UNIFIED.find((e) => e.id === id);
    if (related) handleSelectEntry(related);
  };

  const handleNavigateExternalNode = (nodeId: string) => {
    if (CORE_NODES.some((n) => n.id === nodeId)) {
      onNavigate?.("grafo");
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("navigate-to-item", { detail: nodeId }));
      }, 80);
    } else if (DILEMMAS_DATA.some((d) => d.id === nodeId)) {
      onNavigate?.("dialectica");
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("expand-dilemma", { detail: nodeId }));
      }, 80);
    }
  };

  const handleRandom = () => {
    const pool = filteredEntries.length > 0 ? filteredEntries : GLOSSARY_UNIFIED;
    if (pool.length === 0) return;
    const entry = pool[Math.floor(Math.random() * pool.length)]!;
    handleSelectEntry(entry);
  };

  const handleCopyLink = async (entry: GlossaryEntry) => {
    const url = `${window.location.origin}${window.location.pathname}#glosario-${entry.id}`;
    let ok = false;
    try {
      await navigator.clipboard.writeText(url);
      ok = true;
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = url;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        ok = true;
      } catch {
        ok = false;
      }
    }
    if (ok) {
      setCopiedId(entry.id);
      window.setTimeout(() => setCopiedId((c) => (c === entry.id ? null : c)), 1600);
    }
  };

  const handleRouteStart = (route: ReadingRoute) => {
    const entry = routeStepTerm(route, 0);
    if (entry) handleSelectEntry(entry);
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedType !== "all" ||
    selectedCategory !== "all";

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedType("all");
    setSelectedCategory("all");
    setSortMode("az");
    setListGroup("az");
    setActiveItemId(null);
  };

  const scrollToLetter = (letter: string) => {
    const el = azSectionRefs.current[letter];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Keyboard navigation over the flattened list (arrows move, Enter opens).
  useEffect(() => {
    const onListKeys = (e: KeyboardEvent) => {
      if (viewMode !== "lista" || filteredEntries.length === 0) return;
      const t = document.activeElement;
      if (t instanceof HTMLElement && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)) return;
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp" && e.key !== "Enter") return;

      const idx = filteredEntries.findIndex((en) => en.id === activeItemId);
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const dir = e.key === "ArrowDown" ? 1 : -1;
        const next = idx < 0 ? 0 : Math.min(Math.max(idx + dir, 0), filteredEntries.length - 1);
        const entry = filteredEntries[next];
        if (!entry) return;
        setActiveItemId(entry.id);
        const itemEl = listItemRefs.current[entry.id];
        itemEl?.focus({ preventScroll: true });
        requestAnimationFrame(() => {
          itemEl?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
      } else if (e.key === "Enter" && idx >= 0) {
        e.preventDefault();
        const entry = filteredEntries[idx];
        if (entry) handleSelectEntry(entry);
      }
    };
    window.addEventListener("keydown", onListKeys);
    return () => window.removeEventListener("keydown", onListKeys);
  }, [viewMode, filteredEntries, activeItemId, handleSelectEntry]);

  const renderEntryDetail = (entry: GlossaryEntry) => {
    const catColor = `var(--${CATEGORY_COLOR_CLASS[entry.category]})`;
    const appearances = getAppearances(entry.id);
    const coOccurrences = getCoOccurrences(entry.id).slice(0, 12);
    const centrality = getCentrality(entry.id);
    const refs = entry.references || [];

    // Renders text turning any mention of another glossary term into a clickable link.
    // The current term is excluded (no self-links).
    const renderTextWithLinks = (text: string): React.ReactNode => {
      if (!text) return null;
      const parts = text.split(TERM_LINK_PATTERN);
      return parts.map((part, i) => {
        const id = TERM_NAME_TO_ID[part.toLowerCase()];
        if (id && id !== entry.id) {
          return (
            <button
              key={i}
              onClick={() => handleNavigateRelated(id)}
              className="text-primary font-medium hover:underline underline-offset-2 decoration-primary/40 cursor-pointer transition-colors"
            >
              {part}
            </button>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      });
    };

    return (
      <div className="flex flex-col gap-6 w-full">
        {/* Sticky header — stays visible while scrolling inside the card */}
        <div
          className="sticky top-0 z-20 -mx-6 px-6 py-4 bg-background border-b border-outline-variant/20"
        >
          {/* Back / forward navigation */}
          <div className="flex items-center gap-1 mb-3 -ml-1">
            <button
              onClick={handleGoBack}
              disabled={history.length === 0}
              aria-label="Término anterior"
              className="p-1.5 rounded-md text-on-surface-variant/60 hover:text-primary hover:bg-surface-dim/50 disabled:opacity-25 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleGoForward}
              disabled={forwardStack.length === 0}
              aria-label="Término siguiente"
              className="p-1.5 rounded-md text-on-surface-variant/60 hover:text-primary hover:bg-surface-dim/50 disabled:opacity-25 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
            >
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="ml-2 text-[9px] font-mono uppercase tracking-widest text-on-surface-variant/30 select-none">
              {history.length > 0 || forwardStack.length > 0
                ? `${history.length} · ${forwardStack.length}`
                : "inicio"}
            </span>
            <div className="ml-auto flex items-center gap-1.5">
              <button
                onClick={() => {
                  setViewMode("grafo");
                  setActiveItemId(entry.id);
                }}
                aria-label="Explorar en Grafo Conceptual"
                title="Explorar en Grafo Conceptual"
                className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider text-primary bg-primary/10 hover:bg-primary hover:text-on-primary border border-primary/20 transition-all cursor-pointer"
              >
                <Network className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ver en Grafo</span>
              </button>
              <button
                onClick={handleRandom}
                aria-label="Concepto aleatorio"
                title="Concepto aleatorio"
                className="p-1.5 rounded-md text-on-surface-variant/60 hover:text-primary hover:bg-surface-dim/50 transition-all"
              >
                <Dices className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleCopyLink(entry)}
                aria-label="Copiar enlace del término"
                title="Copiar enlace"
                className="p-1.5 rounded-md text-on-surface-variant/60 hover:text-primary hover:bg-surface-dim/50 transition-all"
              >
                {copiedId === entry.id ? (
                  <Check className="w-3.5 h-3.5 text-primary" />
                ) : (
                  <Link2 className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm border border-outline-variant/30 text-[10px] font-mono uppercase tracking-[0.2em] text-on-surface-variant"
              style={{ backgroundColor: `color-mix(in oklch, ${catColor} 12%, transparent)` }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: catColor }} />
              {GLOSSARY_CATEGORIES.find((c) => c.id === entry.category)?.label}
            </span>
            <span className="flex items-center gap-1.5 px-2.5 py-0.5 bg-surface-dim/50 border border-outline-variant/30 rounded-sm text-[10px] font-mono uppercase tracking-[0.2em] text-on-surface-variant">
              {TYPE_ICON[entry.type]}
              {TYPE_LABEL[entry.type]}
            </span>
          </div>
          <h2 className="text-display-md text-on-surface border-l-4 pl-4 py-1 leading-tight" style={{ borderColor: catColor }}>
            {entry.term}
          </h2>
          {entry.altTerms && entry.altTerms.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {entry.altTerms.map((alt) => (
                <span key={alt} className="text-[10px] italic text-on-surface-variant/60 px-2 py-0.5 border-l border-outline-variant/30">
                  {alt}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Definition */}
        <div className="space-y-4">
          <p className="text-body-md leading-relaxed font-sans" style={{ color: `var(--${CATEGORY_COLOR_CLASS[entry.category]})` }}>
            {renderTextWithLinks(entry.shortDef)}
          </p>
          {entry.longDef && (
            <p className="text-body-md text-on-surface/85 leading-relaxed border-l-2 pl-4 ml-1" style={{ borderColor: `color-mix(in oklch, ${catColor} 40%, transparent)` }}>
              {renderTextWithLinks(entry.longDef)}
            </p>
          )}
        </div>

        {/* Author block */}
        {entry.author && (
          <div className="p-5 border border-outline-variant/15 rounded-lg bg-surface-dim/20 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
              <User className="w-4 h-4 text-primary" />
              <h4 className={DETAIL_SECTION_TITLE}>Ficha de autor</h4>
            </div>
            <div className="space-y-2 text-body-sm text-on-surface-variant">
              {entry.author.era && (
                <p className="flex gap-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 w-20 shrink-0">Época</span>
                  <span>{entry.author.era}</span>
                </p>
              )}
              {entry.author.works && entry.author.works.length > 0 && (
                <div className="flex gap-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 w-20 shrink-0 pt-0.5">Obras</span>
                  <ul className="space-y-1">
                    {entry.author.works.map((w) => (
                      <li key={w} className="text-body-sm text-on-surface-variant">{w}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Open question */}
        {entry.openQuestion && (
          <div className="p-4 border-l-2 border-primary/60 bg-primary/5 rounded-r-lg">
            <p className="text-body-sm text-on-surface-variant italic leading-relaxed">
              {renderTextWithLinks(entry.openQuestion)}
            </p>
          </div>
        )}

        {/* Aparece en — collapsible */}
        {appearances.length > 0 && (
          <AppearancesSection appearances={appearances} onNavigate={handleNavigateAppearance} />
        )}

        {/* Conecta con — unified: related terms + system nodes + dilemmas */}
        {(entry.relatedEntries?.length || entry.relatedNodes?.length || entry.relatedDilemmas?.length || coOccurrences.length) ? (
          <div className="space-y-3">
            <h4 className={DETAIL_SECTION_TITLE}>
              <Network className="w-4 h-4" />
              Conecta con
            </h4>

            <div className="flex flex-wrap gap-2">
              {/* Related glossary entries */}
              {entry.relatedEntries?.map((relId) => {
                const rel = GLOSSARY_UNIFIED.find((e) => e.id === relId);
                if (!rel) return null;
                const relColor = `var(--${CATEGORY_COLOR_CLASS[rel.category]})`;
                return (
                  <button
                    key={relId}
                    onClick={() => handleNavigateRelated(relId)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-outline-variant/30 hover:border-primary/50 hover:bg-surface-dim/40 transition-all text-[11px] group"
                  >
                    {TYPE_ICON[rel.type]}
                    <span className="text-on-surface">{rel.term}</span>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: relColor }} />
                  </button>
                );
              })}

              {/* Co-occurrences (statistical neighbors) */}
              {coOccurrences.map((co) => {
                const rel = GLOSSARY_UNIFIED.find((e) => e.id === co.id);
                if (!rel) return null;
                return (
                  <button
                    key={`co-${co.id}`}
                    onClick={() => handleNavigateRelated(co.id)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-dim/30 border border-outline-variant/20 hover:border-primary/40 transition-all text-[11px] text-on-surface-variant hover:text-on-surface"
                  >
                    {rel.term}
                    <span className="text-[9px] font-mono text-on-surface-variant/50">×{co.count}</span>
                  </button>
                );
              })}

              {/* System nodes */}
              {entry.relatedNodes?.map((id) => {
                const node = CORE_NODES.find((n) => n.id === id);
                if (!node) return null;
                return (
                  <button
                    key={`node-${id}`}
                    onClick={() => handleNavigateExternalNode(id)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-outline-variant/30 hover:border-primary/50 transition-all text-[11px] group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `var(--${CATEGORY_COLOR_CLASS[node.category as GlossaryCategory] || "ch1"})` }} />
                    <span className="text-on-surface">{node.title}</span>
                    <ArrowUpRight className="w-3 h-3 text-primary/40 group-hover:text-primary transition-all" />
                  </button>
                );
              })}

              {/* Dilemmas */}
              {entry.relatedDilemmas?.map((id) => {
                const dilemma = DILEMMAS_DATA.find((d) => d.id === id);
                if (!dilemma) return null;
                return (
                  <button
                    key={`dilemma-${id}`}
                    onClick={() => handleNavigateExternalNode(id)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-outline-variant/30 hover:border-primary/50 transition-all text-[11px] group"
                  >
                    <Quote className="w-3 h-3" />
                    <span className="text-on-surface">{dilemma.title}</span>
                    <ArrowUpRight className="w-3 h-3 text-primary/40 group-hover:text-primary transition-all" />
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* Críticas frecuentes — accordion */}
        {entry.commonCritiques && entry.commonCritiques.length > 0 && (
          <CritiqueSection critiques={entry.commonCritiques} />
        )}

        {/* References — always visible, compact */}
        {refs.length > 0 && (
          <div className="space-y-3">
            <h4 className={DETAIL_SECTION_TITLE}>
              <BookMarked className="w-4 h-4" />
              Referencias
            </h4>
            <ol className="space-y-2.5">
              {refs.map((ref) => (
                <li key={ref.id} className="text-[11px] leading-relaxed text-on-surface-variant/80 font-sans pl-3 border-l border-outline-variant/30 flex items-start gap-2">
                  <span className="text-[9px] font-mono text-primary/50 shrink-0 mt-0.5">[{ref.id}]</span>
                  <span className="flex-1">{ref.citation}</span>
                  {ref.url && (
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-link hover:underline shrink-0 mt-0.5"
                      aria-label="Abrir enlace"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Next step in reading route */}
        {routeForEntry && routeForEntry.stepIdx < routeForEntry.route.steps.length - 1 && (
          (() => {
            const nextIdx = routeForEntry.stepIdx + 1;
            const nextStep = routeForEntry.route.steps[nextIdx];
            const nextTerm = nextStep ? routeStepTerm(routeForEntry.route, nextIdx) : undefined;
            if (!nextStep || !nextTerm) return null;
            return (
              <div className="p-4 border border-primary/25 bg-primary/[0.04] rounded-xl">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[9px] font-mono uppercase tracking-widest text-primary">
                      Siguiente en «{routeForEntry.route.label}» · paso {routeForEntry.stepIdx + 1}/{routeForEntry.route.steps.length}
                    </p>
                    <p className="text-body-sm font-medium mt-1">
                      {nextTerm.term}
                      <span className="text-on-surface-variant/70 font-normal"> — {nextStep.note}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => handleSelectEntry(nextTerm)}
                    aria-label={`Continuar la ruta: ${nextTerm.term}`}
                    className="shrink-0 p-2 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-all"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })()
        )}

        {/* Footer meta — subtle */}
        <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/40 px-1 border-t border-outline-variant/15 pt-3">
          <span className="flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3" />
            Centralidad {typeof centrality === "number" ? centrality.toFixed(2) : centrality}
          </span>
          <span className="text-outline-variant/40">·</span>
          <span className="flex items-center gap-1.5">
            <Hash className="w-3 h-3" />
            {appearances.length} apariciones
          </span>
        </div>
      </div>
    );
  };

  const renderListItem = (entry: GlossaryEntry) => {
    const isSelected = selectedEntry?.id === entry.id;
    const isFlashing = flashEntryId === entry.id;
    const isActive = activeItemId === entry.id;
    const catColor = `var(--${CATEGORY_COLOR_CLASS[entry.category]})`;
    const count = index[entry.id]?.count || 0;
    const centrality = getCentrality(entry.id);
    return (
      <button
        key={entry.id}
        ref={(el) => { listItemRefs.current[entry.id] = el; }}
        onClick={() => handleSelectEntry(entry)}
        className={`group w-full text-left p-4 border-l-2 rounded-r-md transition-all duration-300 hover:shadow-sm ${
          isSelected
            ? "bg-surface-dim/40 border-l-transparent"
            : isActive
              ? "bg-surface-dim/30 border-l-transparent ring-1 ring-primary/40"
              : "bg-transparent hover:bg-surface-dim/20 border-l-transparent hover:translate-x-0.5"
        } ${isFlashing ? "animate-pulse-ring" : ""}`}
        style={isSelected || isActive ? { borderLeftColor: catColor, backgroundColor: `color-mix(in oklch, ${catColor} 6%, transparent)` } : undefined}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="shrink-0" style={{ color: catColor }}>{TYPE_ICON[entry.type]}</span>
              <span className="text-body-sm font-medium text-on-surface truncate group-hover:text-primary transition-colors">
                {highlight(entry.term, searchQuery)}
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant/70 leading-relaxed line-clamp-2">
              {highlight(entry.shortDef, searchQuery)}
            </p>
            <div className="flex items-center gap-2.5 flex-wrap text-[9px] font-mono uppercase tracking-widest text-on-surface-variant/50">
              <span className="flex items-center gap-1" style={{ color: catColor }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: catColor }} />
                {GLOSSARY_CATEGORIES.find((c) => c.id === entry.category)?.label}
              </span>
              {count > 0 && (
                <span className="flex items-center gap-1">
                  <Hash className="w-2.5 h-2.5" />
                  {count}
                </span>
              )}
              <span className="flex items-center gap-1">
                <TrendingUp className="w-2.5 h-2.5" />
                {centrality.toFixed(1)}
              </span>
            </div>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-primary/30 group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
        </div>
      </button>
    );
  };

  const renderList = () => {
    if (filteredEntries.length === 0) {
      return (
        <div className="py-16 text-center text-on-surface-variant/50 space-y-4">
          <Search className="w-8 h-8 mx-auto opacity-40" />
          <p className="text-body-sm">Sin resultados para "{searchQuery}"</p>
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant/30 text-[10px] font-mono uppercase tracking-widest text-on-surface-variant hover:text-primary hover:border-primary/40 transition-all"
            >
              <X className="w-3 h-3" />
              Quitar filtros
            </button>
          )}
        </div>
      );
    }

    if (listGroup === "categoria") {
      return (
        <div className="space-y-8">
          {groupedByCategory.map(({ category, entries }) => (
            <div key={category.id}>
              <h5 className="text-[10px] font-mono uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: `var(--${category.color})` }}>
                {CATEGORY_ICON[category.id]}
                {category.label}
                <span className="text-on-surface-variant/40">({entries.length})</span>
              </h5>
              <div className="space-y-1">
                {entries.map((e) => renderListItem(e))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (listGroup === "tipo") {
      return (
        <div className="space-y-8">
          {groupedByType.map(({ type, entries }) => (
            <div key={type.id}>
              <h5 className="text-[10px] font-mono uppercase tracking-widest mb-3 flex items-center gap-2 text-primary">
                {TYPE_ICON[type.id]}
                {type.label}
                <span className="text-on-surface-variant/40">({entries.length})</span>
              </h5>
              <div className="space-y-1">
                {entries.map((e) => renderListItem(e))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-1.5 py-2 -mx-1 px-1 overflow-x-auto no-scrollbar">
          {groupedAz.map(({ letter }) => (
            <button
              key={letter}
              onClick={() => scrollToLetter(letter)}
              aria-label={`Ir a la letra ${letter}`}
              className="w-8 h-8 shrink-0 rounded-lg text-[11px] font-mono font-bold text-on-surface-variant hover:text-primary hover:bg-surface-dim/50 transition-all border border-transparent hover:border-primary/30"
            >
              {letter}
            </button>
          ))}
        </div>
        {groupedAz.map(({ letter, entries }) => (
          <div key={letter} ref={(el) => { azSectionRefs.current[letter] = el; }}>
            <h5 className="text-[10px] font-mono uppercase tracking-widest mb-3 text-on-surface-variant/40 py-1 scroll-mt-[180px]">
              {letter}
              <span className="ml-2 text-on-surface-variant/30">({entries.length})</span>
            </h5>
            <div className="space-y-1">
              {entries.map((e) => renderListItem(e))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCloud = () => {
    const maxCentral = Math.max(...cloudEntries.map((e) => index[e.id]?.centrality || 0), 1);
    return (
      <div className="w-full h-full flex flex-col">
        <div className="flex items-baseline justify-between mb-4 shrink-0">
          <h3 className="text-technical-sm text-primary font-bold">Nube de términos</h3>
          <p className="text-[11px] text-on-surface-variant/70 hidden sm:block">
            {hasActiveFilters
              ? `${cloudEntries.length} términos filtrados`
              : "Tamaño = centralidad (apariciones + conexiones)"}
          </p>
        </div>
        <div className="glass-enhance border border-outline-variant/20 rounded-2xl flex-1 relative z-10 overflow-hidden before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none">
          {cloudEntries.length === 0 ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-on-surface-variant/50">
              <Search className="w-8 h-8 opacity-40" />
              <p className="text-body-sm">Sin resultados para "{searchQuery}"</p>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant/30 text-[10px] font-mono uppercase tracking-widest text-on-surface-variant hover:text-primary hover:border-primary/40 transition-all"
                >
                  <X className="w-3 h-3" />
                  Quitar filtros
                </button>
              )}
            </div>
          ) : (
          <>
          <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 p-8 lg:p-12 overflow-auto custom-scrollbar">
            {cloudEntries.map((entry) => {
              const centrality = index[entry.id]?.centrality || 0;
              const size = 0.9 + (centrality / maxCentral) * 1.8;
              const catColor = `var(--${CATEGORY_COLOR_CLASS[entry.category]})`;
              return (
                <button
                  key={entry.id}
                  onClick={() => handleSelectEntry(entry)}
                  style={{ fontSize: `${size}rem`, color: catColor }}
                  className="font-heading font-bold hover:scale-110 transition-transform duration-300 px-2 py-1 rounded hover:bg-surface-dim/40 leading-none"
                  title={`${entry.term} · centralidad ${centrality} — ${entry.shortDef}`}
                >
                  {entry.term}
                </button>
              );
            })}
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-4 flex-wrap text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/60 py-3 px-4 border-t border-outline-variant/15 bg-background/40 backdrop-blur-sm">
            {GLOSSARY_CATEGORIES.map((c) => (
              <span key={c.id} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: `var(--${c.color})` }} />
                {c.label}
              </span>
            ))}
          </div>
          </>
          )}
        </div>
      </div>
    );
  };

  const headerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08 } }
  };
  const childVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] as const } }
  };

  return (
    <div className="-mt-12 lg:-mt-20 space-y-10 w-full">
      {/* ==================== UPPER ZONE WITH GLOWS ==================== */}
      <div
        className="relative"
        style={{
          width: "calc(100vw - var(--scrollbar-width, 0px))",
          marginLeft: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
          marginRight: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
        }}
      >

        {/* HERO SECTION — unificado con Laboratorio: border-b + icon blur 0.10 */}
        <div className="h-[550px] min-h-[550px] lg:h-[600px] lg:min-h-[600px] w-full flex flex-col items-center justify-center text-center relative py-6 lg:py-8 px-6 lg:px-16 border-b border-outline-variant/15">
          {/* Crosshair corners */}
          <div className="absolute top-6 left-6 w-6 h-6 pointer-events-none select-none flex items-center justify-center">
            <div className="absolute w-4 h-[2px] bg-primary/30" />
            <div className="absolute w-[2px] h-4 bg-primary/30" />
          </div>
          <div className="absolute top-6 right-6 w-6 h-6 pointer-events-none select-none flex items-center justify-center">
            <div className="absolute w-4 h-[2px] bg-primary/30" />
            <div className="absolute w-[2px] h-4 bg-primary/30" />
          </div>
          <div className="absolute bottom-6 left-6 w-6 h-6 pointer-events-none select-none flex items-center justify-center">
            <div className="absolute w-4 h-[2px] bg-primary/30" />
            <div className="absolute w-[2px] h-4 bg-primary/30" />
          </div>
          <div className="absolute bottom-6 right-6 w-6 h-6 pointer-events-none select-none flex items-center justify-center">
            <div className="absolute w-4 h-[2px] bg-primary/30" />
            <div className="absolute w-[2px] h-4 bg-primary/30" />
          </div>

          {/* Background book icon — unificado: blur + 0.10 */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <BookOpen
              className="text-zinc-900 dark:text-zinc-100 blur"
              style={{
                width: "clamp(140px, 35vw, 400px)",
                height: "clamp(140px, 35vw, 400px)",
                opacity: 0.10,
                strokeWidth: 1.2,
              }}
            />
          </div>

          {/* Hero content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            className="relative z-10 space-y-6 max-w-3xl"
          >
            <motion.h1 variants={childVariants} className="text-display-lg text-on-background select-none">
              Glosario<span className="text-secondary/60 font-light"> · Sintiens</span>
            </motion.h1>

            <motion.p variants={childVariants} className="text-body-md text-on-surface-variant max-w-xl mx-auto leading-relaxed">
              Navega por los conceptos, autores, obras y declaraciones que vertebran el sistema.
            </motion.p>

            <motion.div variants={childVariants} className="flex items-center justify-center gap-6 pt-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5" />
                {GLOSSARY_UNIFIED.length} ENTRADAS
              </span>
              <span className="w-px h-4 bg-outline-variant/50" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/50 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5" />
                {GLOSSARY_CATEGORIES.length} CATEGORÍAS
              </span>
            </motion.div>

          </motion.div>
        </div>

        <div className="w-full relative z-[100] px-6 lg:px-16 max-w-7xl mx-auto pb-8 lg:pb-12">
          <div className="flex justify-center">
            <div className="pointer-events-auto">
              {/* TabNav is now global in App.tsx */}
            </div>
          </div>
        </div>

        {/* View mode tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pb-6 max-w-3xl mx-auto relative z-10">
        {([
          {
            id: "lista",
            label: "Lista",
            description: "Vista filtrable y ordenada de todas las entradas del glosario.",
            icon: <List className="w-4 h-4" />,
          },
          {
            id: "grafo",
            label: "Grafo",
            description: "Red visual de conexiones entre conceptos, autores y obras.",
            icon: <Network className="w-4 h-4" />,
          },
          {
            id: "nube",
            label: "Nube",
            description: "Términos centrales dimensionados por su importancia en el sistema.",
            icon: <Cloud className="w-4 h-4" />,
          },
        ] as { id: ViewMode; label: string; description: string; icon: React.ReactNode }[]).map((v) => (
          <button
            key={v.id}
            onClick={() => setViewMode(v.id)}
            className={`glass-enhance border rounded-xl p-4 text-left relative z-10 transition-all cursor-pointer
              before:content-[''] before:absolute before:inset-0 before:rounded-[inherit]
              before:bg-surface-dim/20 dark:before:bg-surface-dim/10
              before:backdrop-blur-md before:z-[-1] before:pointer-events-none
              ${
                viewMode === v.id
                  ? "border-primary/60 bg-primary/5"
                  : "border-outline-variant/30 hover:border-outline-variant/60"
              }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className={viewMode === v.id ? "text-primary" : "text-on-surface-variant"}>
                {v.icon}
              </span>
              <span className={`text-[10px] font-mono uppercase tracking-widest font-bold ${
                viewMode === v.id ? "text-primary" : "text-on-surface"
              }`}>
                {v.label}
              </span>
            </div>
            <p className="text-[11px] leading-snug text-on-surface-variant/80">
              {v.description}
            </p>
          </button>
        ))}
      </div>
      </div>

      {/* ==================== COMPACT PERMANENT SEARCH (all views) ==================== */}
      <div className="relative max-w-xs mx-auto pb-4 z-20 sticky top-[76px]" role="search">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-on-surface-variant/40 pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar término…"
            aria-label="Buscar en el glosario"
            className="w-full bg-surface-dim/50 border border-outline-variant/25 focus:border-primary/50 rounded-full pl-9 pr-16 py-1.5 text-sm outline-none transition-all placeholder:text-on-surface-variant/40 backdrop-blur-md"
          />
          <kbd className="absolute right-9 top-1/2 -translate-y-1/2 pointer-events-none px-1.5 py-0.5 rounded border border-outline-variant/30 bg-surface-dim/40 text-[10px] font-mono text-on-surface-variant/60 select-none">
            /
          </kbd>
          {searchQuery && (
            <button
                   type="button"
                   onClick={() => setSearchQuery("")}
                   aria-label="Limpiar búsqueda"
                   className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-surface-dim text-on-surface-variant hover:text-on-surface transition-all"
                 >
                   <X className="w-3 h-3" />
                 </button>
          )}
        </div>
      </div>

      {/* ==================== READING ROUTES (lista view) ==================== */}
      {viewMode === "lista" && (
        <div className="pb-6 flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible sm:snap-none sm:max-w-5xl sm:mx-auto">
          {READING_ROUTES.map((route) => (
            <button
              key={route.id}
              onClick={() => handleRouteStart(route)}
              className="min-w-[260px] snap-start sm:min-w-0 glass-enhance border border-outline-variant/25 rounded-xl p-4 text-left relative z-10 transition-all cursor-pointer group hover:border-primary/40 shrink-0 sm:shrink
                before:content-[''] before:absolute before:inset-0 before:rounded-[inherit]
                before:bg-surface-dim/20 dark:before:bg-surface-dim/10
                before:backdrop-blur-md before:z-[-1] before:pointer-events-none"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-primary">{route.icon}</span>
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-on-surface">
                  {route.label}
                </span>
              </div>
              <p className="text-[11px] leading-snug text-on-surface-variant/80 mb-2">
                {route.description}
              </p>
              <p className="text-[10px] text-on-surface-variant/50 leading-snug">
                {route.steps.map((s, i) => {
                  const t = routeStepTerm(route, i)?.term ?? "·";
                  return (
                    <span key={s.entryId}>
                      {i > 0 && <span className="text-on-surface-variant/30"> → </span>}
                      {t}
                    </span>
                  );
                })}
              </p>
              <span className="inline-flex items-center gap-1 mt-2 text-[9px] font-mono uppercase tracking-widest text-primary opacity-70 group-hover:opacity-100 transition-opacity">
                Empezar
                <ArrowRight className="w-2.5 h-2.5" />
              </span>
            </button>
          ))}
        </div>
      )}

      {/* ==================== FILTERS (hidden in grafo view) ==================== */}
      {viewMode !== "grafo" && (
        <div
          className="glass-enhance border border-outline-variant/20 rounded-2xl p-3 lg:p-4 sticky top-[132px] z-20 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none"
          style={{
            width: "calc(100vw - 96px - var(--scrollbar-width, 0px))",
            marginLeft: "calc(-50vw + 48px + var(--scrollbar-width, 0px) / 2 + 50%)"
          }}
        >
          <div className="flex flex-wrap items-center gap-3">
            {/* Categories */}
            <div className="flex gap-1 flex-wrap">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`text-[10px] font-mono uppercase tracking-tighter px-2.5 py-0.5 rounded-md border transition-all ${
                  selectedCategory === "all"
                    ? "bg-primary/10 border-primary text-primary"
                    : "border-outline-variant/30 text-on-surface-variant hover:border-outline-variant"
                }`}
              >
                Todas
              </button>
              {GLOSSARY_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`text-[10px] font-mono uppercase tracking-tighter px-2.5 py-0.5 rounded-md border transition-all flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? "border-primary/60 text-on-surface"
                      : "border-outline-variant/30 text-on-surface-variant hover:border-outline-variant"
                  }`}
                  style={selectedCategory === cat.id ? { backgroundColor: `color-mix(in oklch, var(--${cat.color}) 12%, transparent)` } : undefined}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `var(--${cat.color})` }} />
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Types */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as GlossaryType | "all")}
              className="text-[10px] font-mono uppercase tracking-tighter px-2.5 py-1 rounded-md border border-outline-variant/30 bg-surface-dim/30 text-on-surface-variant hover:border-outline-variant transition-all outline-none"
            >
              <option value="all">Todos los tipos</option>
              {GLOSSARY_TYPES.map((t) => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>

            {/* Sort */}
            {viewMode === "lista" && (
              <>
                <select
                  value={sortMode}
                  onChange={(e) => setSortMode(e.target.value as SortMode)}
                  className="text-[10px] font-mono uppercase tracking-tighter px-2.5 py-1 rounded-md border border-outline-variant/30 bg-surface-dim/30 text-on-surface-variant hover:border-outline-variant transition-all outline-none"
                >
                  <option value="az">Orden A-Z</option>
                  <option value="citado">Más citado</option>
                  <option value="conectado">Más conectado</option>
                </select>
                <select
                  value={listGroup}
                  onChange={(e) => setListGroup(e.target.value as ListGroup)}
                  className="text-[10px] font-mono uppercase tracking-tighter px-2.5 py-1 rounded-md border border-outline-variant/30 bg-surface-dim/30 text-on-surface-variant hover:border-outline-variant transition-all outline-none"
                >
                  <option value="az">Agrupar A-Z</option>
                  <option value="categoria">Por categoría</option>
                  <option value="tipo">Por tipo</option>
                </select>
              </>
            )}

            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={handleRandom}
                title="Concepto aleatorio"
                className="text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-outline-variant/30 text-on-surface-variant hover:text-primary hover:border-primary/40 transition-all"
              >
                <Dices className="w-3 h-3" />
                Aleatorio
              </button>
              <span className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/40">
                {filteredEntries.length} resultados
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ==================== VIEW CONTENT — mode wait para evitar flash scrollbar */}
      <AnimatePresence mode="wait" initial={false}>
        {viewMode === "grafo" ? (
          <motion.div
            key="graph-view"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] as const }}
            className="w-full"
            style={{
              width: "calc(100vw - var(--scrollbar-width, 0px))",
              marginLeft: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
              height: "calc(100vh - 200px)",
              minHeight: "560px"
            }}
          >
            <GlossaryGraph
              onSelectEntry={handleSelectEntry}
              selectedEntryId={selectedEntry?.id}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
            />
          </motion.div>
        ) : viewMode === "nube" ? (
          <motion.div
            key="cloud-view"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] as const }}
            className="w-full px-3 md:px-8 lg:px-16"
            style={{
              width: "calc(100vw - var(--scrollbar-width, 0px))",
              marginLeft: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
              height: "calc(100vh - 200px)",
              minHeight: "560px"
            }}
          >
            {renderCloud()}
          </motion.div>
        ) : (
          <motion.div
            key="list-view"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] as const }}
            className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-8"
            style={{
              width: "calc(100vw - 96px - var(--scrollbar-width, 0px))",
              marginLeft: "calc(-50vw + 48px + var(--scrollbar-width, 0px) / 2 + 50%)"
            }}
          >
            {/* List */}
            <div className="flex flex-col gap-4 min-w-0">
              {renderList()}
            </div>

            {/* Detail */}
            <div className="hidden lg:block relative">
              <div ref={cardScrollRef} className="sticky top-[76px] max-h-[calc(100vh-88px)] overflow-y-auto overscroll-y-contain custom-scrollbar glass-enhance border border-outline-variant/20 rounded-xl p-6 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none">
                <AnimatePresence mode="wait" initial={false}>
                  {selectedEntry ? (
                    <motion.div
                      key={selectedEntry.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] as const }}
                    >
                      {renderEntryDetail(selectedEntry)}
                    </motion.div>
                  ) : (
                    <div className="h-[400px] flex flex-col items-center justify-center text-center text-on-surface-variant/40 space-y-4">
                      <BookOpen className="w-12 h-12 stroke-[0.5px]" />
                      <p className="text-technical-xs uppercase tracking-[0.2em]">Selecciona un término</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile modal */}
      <AnimatePresence>
        {isMobileDetailOpen && selectedEntry && (
          <div  role="dialog" aria-modal="true" aria-label="Detalle de glosario" className="lg:hidden fixed inset-0 z-[100] flex items-end justify-center">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileDetailOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 380 }}
              className="relative w-full max-h-[92vh] overflow-y-auto overscroll-y-contain bg-background border-t border-outline-variant/30 p-8 rounded-t-xl z-10 custom-scrollbar shadow-2xl"
            >
              <button
                onClick={() => setIsMobileDetailOpen(false)}
                aria-label="Cerrar detalle"
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-surface-dim transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="pb-10">
                {renderEntryDetail(selectedEntry)}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
});
