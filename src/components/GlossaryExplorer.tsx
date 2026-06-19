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
  ChevronUp,
  ChevronDown,
  X,
  Network,
  Cloud,
  List,
  Hash,
  Award,
  ExternalLink,
  Clock,
  TrendingUp,
  Layers,
  Lightbulb
} from "lucide-react";
import {
  GLOSSARY_UNIFIED,
  GlossaryEntry,
  GlossaryType,
  GlossaryCategory,
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
import { CORE_NODES, DILEMMAS_DATA } from "../types";
import { Button } from "./ui/Button";
import GlossaryGraph from "./GlossaryGraph";
import TabNav, { TabType } from "./TabNav";

const AmbientGlow = ({
  colorClass,
  className = "",
  opacity = 0.05,
}: {
  colorClass: string;
  className?: string;
  opacity?: number;
}) => {
  const textClass = colorClass.startsWith("bg-")
    ? colorClass.replace("bg-", "text-")
    : colorClass;
  return (
    <div className={`absolute pointer-events-none select-none z-0 overflow-visible ${className}`}>
      <div
        className={`absolute top-1/2 left-1/2 w-[145%] h-[65%] aspect-[2.2/1] filter blur-[35px] sm:blur-[48px] ${textClass} animate-wobble-slow`}
        style={{ opacity }}
      />
      <div
        className={`absolute top-1/2 left-1/2 w-[130%] h-[55%] aspect-[2.5/1] filter blur-[60px] sm:blur-[80px] ${textClass} animate-rotate-slow`}
        style={{ opacity: opacity * 0.6 }}
      />
    </div>
  );
};

type ViewMode = "lista" | "grafo" | "nube";
type SortMode = "az" | "citado" | "conectado";
type ListGroup = "az" | "categoria" | "tipo";

interface GlossaryExplorerProps {
  initialEntryId?: string | null;
  onClearInitialEntryId?: () => void;
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
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

export default function GlossaryExplorer({ initialEntryId, onClearInitialEntryId, activeTab, onNavigate, theme, onToggleTheme }: GlossaryExplorerProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("lista");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<GlossaryType | "all">("all");
  const [selectedCategory, setSelectedCategory] = useState<GlossaryCategory | "all">("all");
  const [sortMode, setSortMode] = useState<SortMode>("az");
  const [listGroup, setListGroup] = useState<ListGroup>("az");
  const [selectedEntry, setSelectedEntry] = useState<GlossaryEntry | null>(null);
  const [isBibliographyOpen, setIsBibliographyOpen] = useState(false);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const index = useMemo(() => getGlossaryIndex(), []);
  const mostCentral = useMemo(() => getMostCentral(12), []);

  useEffect(() => {
    if (initialEntryId) {
      const entry = GLOSSARY_UNIFIED.find((e) => e.id === initialEntryId);
      if (entry) {
        setSelectedEntry(entry);
        setSelectedType("all");
        setSelectedCategory("all");
        if (window.innerWidth < 1024) setIsMobileDetailOpen(true);
      }
      if (onClearInitialEntryId) onClearInitialEntryId();
    }
  }, [initialEntryId, onClearInitialEntryId]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith("#glosario-")) {
      const id = hash.replace("#glosario-", "");
      const entry = GLOSSARY_UNIFIED.find((e) => e.id === id);
      if (entry) {
        setSelectedEntry(entry);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedEntry) {
      const newHash = `#glosario-${selectedEntry.id}`;
      if (window.location.hash !== newHash) {
        window.history.replaceState(null, "", newHash);
      }
    }
  }, [selectedEntry]);

  useEffect(() => {
    setIsBibliographyOpen(false);
  }, [selectedEntry]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
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

  useEffect(() => {
    setHighlightedIndex(0);
  }, [searchQuery, selectedType, selectedCategory, sortMode]);

  const groupedAz = useMemo(() => {
    const groups: Record<string, GlossaryEntry[]> = {};
    filteredEntries.forEach((e) => {
      const letter = e.term[0].toUpperCase();
      const key = /[A-ZÑ]/.test(letter) ? letter : "#";
      if (!groups[key]) groups[key] = [];
      groups[key].push(e);
    });
    return Object.keys(groups).sort((a, b) => {
      if (a === "#") return 1;
      if (b === "#") return -1;
      return a.localeCompare(b);
    }).map((k) => ({ letter: k, entries: groups[k] }));
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
    setSelectedEntry(entry);
    setHistory((prev) => [entry.id, ...prev.filter((id) => id !== entry.id)].slice(0, 8));
    if (window.innerWidth < 1024) setIsMobileDetailOpen(true);
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

  const renderEntryDetail = (entry: GlossaryEntry) => {
    const catColor = `var(--${CATEGORY_COLOR_CLASS[entry.category]})`;
    const appearances = getAppearances(entry.id);
    const coOccurrences = getCoOccurrences(entry.id).slice(0, 12);
    const centrality = getCentrality(entry.id);
    const refs = entry.references || [];

    const sectionTitleClass = "text-technical-xs text-primary flex items-center gap-2 font-bold";

    return (
      <div className="flex flex-col gap-10 w-full">
        {/* Header */}
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className="flex items-center gap-1.5 px-3 py-1 rounded-sm border border-outline-variant/30 text-[10px] font-mono uppercase tracking-[0.2em] text-on-surface-variant backdrop-blur-sm"
                style={{ backgroundColor: `color-mix(in oklch, ${catColor} 12%, transparent)` }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: catColor }} />
                {GLOSSARY_CATEGORIES.find((c) => c.id === entry.category)?.label}
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-surface-dim/50 border border-outline-variant/30 rounded-sm text-[10px] font-mono uppercase tracking-[0.2em] text-on-surface-variant backdrop-blur-sm">
                {TYPE_ICON[entry.type]}
                {TYPE_LABEL[entry.type]}
              </span>
            </div>
            <div className="text-[10px] font-mono text-on-surface-variant/40 select-all">ID: {entry.id.toUpperCase()}</div>
          </div>

          <h2 className="text-display-md text-on-surface border-l-4 pl-6 py-2 leading-tight" style={{ borderColor: catColor }}>
            {entry.term}
          </h2>

          {entry.altTerms && entry.altTerms.length > 0 && (
            <div className="flex flex-wrap gap-2 -mt-2">
              {entry.altTerms.map((alt) => (
                <span key={alt} className="text-[11px] italic text-on-surface-variant/70 px-2 py-0.5 border-l border-outline-variant/40">
                  {alt}
                </span>
              ))}
            </div>
          )}

          <div className="text-body-md leading-relaxed font-sans" style={{ color: `var(--${CATEGORY_COLOR_CLASS[entry.category]})` }}>
            {entry.shortDef}
          </div>

          {entry.longDef && (
            <div className="text-body-md text-on-surface/85 leading-relaxed border-l-2 pl-5 ml-1" style={{ borderColor: `color-mix(in oklch, ${catColor} 40%, transparent)` }}>
              {entry.longDef}
            </div>
          )}
        </div>

        {/* Section separator */}
        <div className="border-t border-outline-variant/15" />

        {/* Author block */}
        {entry.author && (
          <div className="p-6 border border-outline-variant/15 rounded-lg bg-surface-dim/20 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-4 h-4 text-primary" />
              <h4 className={sectionTitleClass}>Ficha de autor</h4>
            </div>
            <div className="space-y-2.5 text-body-sm text-on-surface-variant">
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

        {/* Key facts */}
        {entry.keyFacts && entry.keyFacts.length > 0 && (
          <div className="space-y-4">
            <h4 className={sectionTitleClass}>
              <Lightbulb className="w-4 h-4" />
              Datos clave
            </h4>
            <div className="space-y-3">
              {entry.keyFacts.map((fact, i) => (
                <div key={i} className="flex gap-4 p-5 bg-surface-dim/15 border border-outline-variant/10 rounded-lg hover:bg-surface-dim/30 transition-colors">
                  <span className="text-[10px] font-mono text-primary/40 pt-1 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-body-md text-on-surface-variant/90 leading-snug">{fact}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Open question */}
        {entry.openQuestion && (
          <div className="p-5 border-l-2 border-primary/60 bg-primary/5 rounded-r-lg">
            <p className="text-body-md text-on-surface-variant italic leading-relaxed">{entry.openQuestion}</p>
          </div>
        )}

        {/* Section separator */}
        <div className="border-t border-outline-variant/15" />

        {/* Aparece en */}
        {appearances.length > 0 && (
          <div className="space-y-4">
            <h4 className={`${sectionTitleClass} justify-between`}>
              <span className="flex items-center gap-2">
                <Hash className="w-4 h-4" />
                Aparece en
              </span>
              <span className="text-[10px] font-mono text-on-surface-variant/60 font-normal">{appearances.length} lugares</span>
            </h4>
            <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
              {appearances.map((app, i) => {
                const target = getAppearanceTarget(app);
                const isExternal = target !== null;
                return (
                  <button
                    key={`${app.locationId}-${app.field}-${i}`}
                    onClick={() => handleNavigateAppearance(app)}
                    disabled={!isExternal}
                    className={`w-full text-left p-3.5 border border-outline-variant/15 rounded-lg transition-all group ${
                      isExternal ? "hover:border-primary/40 hover:bg-surface-dim/30 cursor-pointer" : "cursor-default opacity-70"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span
                            className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-sm"
                            style={{
                              backgroundColor: app.category ? `color-mix(in oklch, var(--${CATEGORY_COLOR_CLASS[app.category]}) 12%, transparent)` : "transparent",
                              color: app.category ? `var(--${CATEGORY_COLOR_CLASS[app.category]})` : "var(--on-surface-variant)"
                            }}
                          >
                            {app.locationType}
                          </span>
                          <span className="text-[10px] font-mono text-on-surface-variant/60">{app.field}</span>
                        </div>
                        <p className="text-body-sm text-on-surface font-medium leading-snug truncate">{app.title}</p>
                        {app.snippet && (
                          <p className="text-[11px] text-on-surface-variant/70 leading-relaxed line-clamp-2">{app.snippet}</p>
                        )}
                      </div>
                      {isExternal && (
                        <ArrowUpRight className="w-3.5 h-3.5 text-primary/40 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Related glossary entries */}
        {entry.relatedEntries && entry.relatedEntries.length > 0 && (
          <div className="space-y-4">
            <h4 className={sectionTitleClass}>
              <Sparkles className="w-4 h-4" />
              Términos relacionados
            </h4>
            <div className="flex flex-wrap gap-2">
              {entry.relatedEntries.map((relId) => {
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
            </div>
          </div>
        )}

        {/* Co-occurrences */}
        {coOccurrences.length > 0 && (
          <div className="space-y-4">
            <h4 className={sectionTitleClass}>
              <TrendingUp className="w-4 h-4" />
              Suele aparecer junto a
            </h4>
            <div className="flex flex-wrap gap-2">
              {coOccurrences.map((co) => {
                const rel = GLOSSARY_UNIFIED.find((e) => e.id === co.id);
                if (!rel) return null;
                return (
                  <button
                    key={co.id}
                    onClick={() => handleNavigateRelated(co.id)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-dim/30 border border-outline-variant/20 hover:border-primary/40 transition-all text-[11px] text-on-surface-variant hover:text-on-surface"
                  >
                    {rel.term}
                    <span className="text-[9px] font-mono text-on-surface-variant/50">×{co.count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Section separator */}
        <div className="border-t border-outline-variant/15" />

        {/* Related system nodes / dilemmas */}
        {((entry.relatedNodes && entry.relatedNodes.length > 0) || (entry.relatedDilemmas && entry.relatedDilemmas.length > 0)) && (
          <div className="space-y-4">
            <h4 className="text-technical-xs text-on-surface-variant/80 flex items-center gap-2 font-bold">
              <Network className="w-3.5 h-3.5" />
              En el sistema
            </h4>
            <div className="flex flex-wrap gap-2">
              {(entry.relatedNodes || []).map((id) => {
                const node = CORE_NODES.find((n) => n.id === id);
                if (!node) return null;
                return (
                  <button
                    key={id}
                    onClick={() => handleNavigateExternalNode(id)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-outline-variant/30 hover:border-primary/50 transition-all text-[11px] group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: `var(--${CATEGORY_COLOR_CLASS[node.category as GlossaryCategory] || "ch1"})` }} />
                    <span className="text-on-surface">{node.title}</span>
                    <ArrowUpRight className="w-3 h-3 text-primary/40 group-hover:text-primary transition-all" />
                  </button>
                );
              })}
              {(entry.relatedDilemmas || []).map((id) => {
                const dilemma = DILEMMAS_DATA.find((d) => d.id === id);
                if (!dilemma) return null;
                return (
                  <button
                    key={id}
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
        )}

        {/* Section separator */}
        <div className="border-t border-outline-variant/15" />

        {/* References */}
        {refs.length > 0 && (
          <div>
            <button
              onClick={() => setIsBibliographyOpen(!isBibliographyOpen)}
              className="flex items-center justify-between w-full py-4 text-technical-xs text-on-surface-variant hover:text-primary transition-all group"
            >
              <span className="flex items-center gap-2">
                <BookMarked className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                REFERENCIAS ({refs.length})
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
                  <ul className="pb-6 space-y-4 pt-2">
                    {refs.map((ref) => (
                      <li key={ref.id} className="text-[11px] leading-relaxed text-on-surface-variant/70 font-sans pl-4 border-l border-outline-variant/50">
                        <span className="font-bold text-primary mr-2">[{ref.id}]</span>
                        {ref.citation}
                        {ref.url && (
                          <a href={ref.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-link hover:underline ml-2">
                            DOI <ExternalLink className="w-2.5 h-2.5" />
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

        {/* Centrality footer */}
        <div className="pt-6 border-t border-outline-variant/15 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/40">
          <span className="flex items-center gap-2">
            <TrendingUp className="w-3 h-3" />
            Centralidad: {typeof centrality === 'number' ? centrality.toFixed(2) : centrality}
          </span>
          <span className="flex items-center gap-2">
            <Hash className="w-3 h-3" />
            {appearances.length} apariciones
          </span>
        </div>
      </div>
    );
  };

  const renderListItem = (entry: GlossaryEntry, idx: number) => {
    const isSelected = selectedEntry?.id === entry.id;
    const catColor = `var(--${CATEGORY_COLOR_CLASS[entry.category]})`;
    const count = index[entry.id]?.count || 0;
    const centrality = getCentrality(entry.id);
    return (
      <button
        key={entry.id}
        onClick={() => handleSelectEntry(entry)}
        onMouseEnter={() => setHighlightedIndex(idx)}
        className={`group w-full text-left p-4 border-l-2 rounded-r-md transition-all duration-300 ${
          isSelected
            ? "bg-surface-dim/40 border-l-transparent"
            : "bg-transparent hover:bg-surface-dim/20 border-l-transparent hover:translate-x-0.5"
        }`}
        style={isSelected ? { borderLeftColor: catColor, backgroundColor: `color-mix(in oklch, ${catColor} 6%, transparent)` } : undefined}
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
        <div className="py-16 text-center text-on-surface-variant/50 space-y-2">
          <Search className="w-8 h-8 mx-auto opacity-40" />
          <p className="text-body-sm">Sin resultados para "{searchQuery}"</p>
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
                {entries.map((e, i) => renderListItem(e, i))}
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
                {entries.map((e, i) => renderListItem(e, i))}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {groupedAz.map(({ letter, entries }) => (
          <div key={letter}>
            <h5 className="text-[10px] font-mono uppercase tracking-widest mb-3 text-on-surface-variant/40 sticky top-0 bg-background/80 backdrop-blur-sm py-1 z-10">
              {letter}
              <span className="ml-2 text-on-surface-variant/30">({entries.length})</span>
            </h5>
            <div className="space-y-1">
              {entries.map((e, i) => renderListItem(e, i))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCloud = () => {
    const maxCentral = Math.max(...mostCentral.map((e) => index[e.id]?.centrality || 0), 1);
    return (
      <div className="w-full h-full flex flex-col">
        <div className="flex items-baseline justify-between mb-4 shrink-0">
          <h3 className="text-technical-sm text-primary font-bold">Nube de términos</h3>
          <p className="text-[11px] text-on-surface-variant/70 hidden sm:block">
            Tamaño = centralidad (apariciones + conexiones)
          </p>
        </div>
        <div className="glass-enhance border border-outline-variant/20 rounded-2xl flex-1 relative z-10 overflow-hidden before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none">
          <div className="absolute inset-0 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 p-8 lg:p-12 overflow-auto custom-scrollbar">
            {mostCentral.map((entry) => {
              const centrality = index[entry.id]?.centrality || 0;
              const size = 0.9 + (centrality / maxCentral) * 1.8;
              const catColor = `var(--${CATEGORY_COLOR_CLASS[entry.category]})`;
              return (
                <button
                  key={entry.id}
                  onClick={() => handleSelectEntry(entry)}
                  style={{ fontSize: `${size}rem`, color: catColor }}
                  className="font-heading font-bold hover:scale-110 transition-transform duration-300 px-2 py-1 rounded hover:bg-surface-dim/40 leading-none"
                  title={`${entry.term} · centralidad ${centrality}`}
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
        </div>
      </div>
    );
  };

  const headerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } }
  };
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="space-y-10 w-full">
      {/* ==================== HERO SECTION ==================== */}
      <section
        className="relative overflow-hidden bg-background"
        style={{
          width: "calc(100vw - var(--scrollbar-width, 0px))",
          marginLeft: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
          marginRight: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
        }}
      >
        <div className="min-h-[50vh] lg:min-h-[55vh] w-full flex flex-col items-center justify-center text-center relative py-16 lg:py-24 px-6 lg:px-16">
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

          {/* Ambient Glows */}
          <div className="absolute inset-x-0 top-[-10%] bottom-[-10%] z-0 pointer-events-none opacity-80">
            <div className="absolute top-[-5%] left-[-2vw] w-[600px] h-[600px] animate-float-1">
              <AmbientGlow colorClass="bg-ch1" className="w-full h-full" opacity={0.3} />
            </div>
            <div className="absolute top-[30%] right-[-5vw] w-[700px] h-[700px] animate-float-2">
              <AmbientGlow colorClass="bg-ch4" className="w-full h-full" opacity={0.3} />
            </div>
            <div className="absolute top-[10%] left-[20vw] w-[500px] h-[500px] animate-float-3">
              <AmbientGlow colorClass="bg-ch2" className="w-full h-full" opacity={0.25} />
            </div>
            <div className="absolute top-[-10%] right-[15vw] w-[550px] h-[550px] animate-float-4">
              <AmbientGlow colorClass="bg-ch5" className="w-full h-full" opacity={0.25} />
            </div>
            <div className="absolute bottom-[20%] left-[10vw] w-[450px] h-[450px] animate-float-5">
              <AmbientGlow colorClass="bg-ch3" className="w-full h-full" opacity={0.3} />
            </div>
            <div className="absolute bottom-[10%] right-[25vw] w-[480px] h-[480px] animate-float-6">
              <AmbientGlow colorClass="bg-ch6" className="w-full h-full" opacity={0.3} />
            </div>
          </div>

          {/* Background book icon */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
            <BookOpen
              className="text-zinc-900 dark:text-zinc-100"
              style={{
                width: "clamp(140px, 35vw, 400px)",
                height: "clamp(140px, 35vw, 400px)",
                opacity: 0.04,
                strokeWidth: 0.5,
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
            <motion.span variants={childVariants} className="text-[10px] font-mono font-bold text-primary select-none tracking-[0.25em] uppercase block opacity-60">
              [ DICCIONARIO VIVO ]
            </motion.span>

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
      </section>

      <div className="w-full py-4">
        <TabNav activeTab={activeTab} onNavigate={onNavigate} theme={theme} onToggleTheme={onToggleTheme} />
      </div>

      {/* View mode tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pb-6 max-w-3xl mx-auto">
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

      {/* ==================== SEARCH + FILTERS (hidden in grafo view) ==================== */}
      {viewMode !== "grafo" && (
        <div className="glass-enhance border border-outline-variant/30 rounded-2xl p-6 lg:p-8 space-y-5 relative z-10 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar término, autor, obra…  (pulsa /)"
              className="w-full bg-surface-dim/30 border border-outline-variant/30 focus:border-primary rounded-lg px-12 py-3.5 text-body-md outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-surface-dim text-on-surface-variant hover:text-on-surface transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Categories */}
            <div className="flex gap-1 flex-wrap">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`text-[10px] font-mono uppercase tracking-tighter px-3 py-1.5 rounded-md border transition-all ${
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
                  className={`text-[10px] font-mono uppercase tracking-tighter px-3 py-1.5 rounded-md border transition-all flex items-center gap-1.5 ${
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
              className="text-[10px] font-mono uppercase tracking-tighter px-3 py-1.5 rounded-md border border-outline-variant/30 bg-surface-dim/30 text-on-surface-variant hover:border-outline-variant transition-all outline-none"
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
                  className="text-[10px] font-mono uppercase tracking-tighter px-3 py-1.5 rounded-md border border-outline-variant/30 bg-surface-dim/30 text-on-surface-variant hover:border-outline-variant transition-all outline-none"
                >
                  <option value="az">Orden A-Z</option>
                  <option value="citado">Más citado</option>
                  <option value="conectado">Más conectado</option>
                </select>
                <select
                  value={listGroup}
                  onChange={(e) => setListGroup(e.target.value as ListGroup)}
                  className="text-[10px] font-mono uppercase tracking-tighter px-3 py-1.5 rounded-md border border-outline-variant/30 bg-surface-dim/30 text-on-surface-variant hover:border-outline-variant transition-all outline-none"
                >
                  <option value="az">Agrupar A-Z</option>
                  <option value="categoria">Por categoría</option>
                  <option value="tipo">Por tipo</option>
                </select>
              </>
            )}

            <span className="ml-auto text-[10px] font-mono uppercase tracking-widest text-on-surface-variant/40">
              {filteredEntries.length} resultados
            </span>
          </div>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 flex-wrap text-[10px] font-mono"
        >
          <span className="flex items-center gap-1 text-on-surface-variant/50 uppercase tracking-widest">
            <Clock className="w-3 h-3" />
            Recientes
          </span>
          {history.slice(0, 6).map((id) => {
            const e = GLOSSARY_UNIFIED.find((x) => x.id === id);
            if (!e) return null;
            return (
              <button
                key={id}
                onClick={() => handleSelectEntry(e)}
                className="px-2 py-0.5 rounded-sm border border-outline-variant/20 hover:border-primary/40 text-on-surface-variant hover:text-on-surface transition-all"
              >
                {e.term}
              </button>
            );
          })}
        </motion.div>
      )}

      {/* ==================== VIEW CONTENT ==================== */}
      <AnimatePresence mode="wait">
        {viewMode === "grafo" ? (
          <motion.div
            key="graph-view"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
            style={{
              width: "calc(100vw - var(--scrollbar-width, 0px))",
              marginLeft: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
              height: "calc(100vh - 200px)",
              minHeight: "560px"
            }}
          >
            <GlossaryGraph onSelectEntry={handleSelectEntry} selectedEntryId={selectedEntry?.id} />
          </motion.div>
        ) : viewMode === "nube" ? (
          <motion.div
            key="cloud-view"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
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
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 min-h-[700px]"
          >
            {/* List */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="overflow-y-auto max-h-[820px] pr-3 custom-scrollbar">
                {renderList()}
              </div>
            </div>

            {/* Detail */}
            <div className="hidden lg:block lg:col-span-5 relative">
              <div className="sticky top-32 glass-enhance border border-outline-variant/25 rounded-xl p-8 h-fit max-h-[80vh] overflow-y-auto custom-scrollbar before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none">
                <AnimatePresence mode="wait">
                  {selectedEntry ? (
                    <motion.div
                      key={selectedEntry.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
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
          <div className="lg:hidden fixed inset-0 z-[100] flex items-end justify-center">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileDetailOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="relative w-full max-h-[92vh] overflow-y-auto bg-background border-t border-outline-variant/30 p-8 rounded-t-xl z-10 custom-scrollbar shadow-2xl"
            >
              <button
                onClick={() => setIsMobileDetailOpen(false)}
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
}
