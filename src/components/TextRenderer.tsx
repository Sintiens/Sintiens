import React, { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react";
import { X, ArrowRight, ArrowUpRight, BookOpen, ExternalLink, HelpCircle, Activity, Globe, Scale, Layers, ScrollText, Sparkles } from "lucide-react";
import { ReferenceDetail } from "../types";
import { GLOSSARY_UNIFIED, GlossaryEntry } from "../data/glossaryUnified";
import { CORE_NODES, DILEMMAS_DATA } from "../types";
import GlossaryLink from "./GlossaryLink";

const CATEGORY_COLOR_VAR: Record<string, string> = {
  sintiencia: "var(--ch1)",
  etica: "var(--ch4)",
  psicologia: "var(--ch3)",
  sistemas_uso: "var(--ch2)",
  ecologia: "var(--ch5)",
  legal: "var(--ch6)"
};

const CATEGORY_ICON: Record<string, React.ReactNode> = {
  sintiencia: <Activity className="w-3 h-3" />,
  etica: <Scale className="w-3 h-3" />,
  psicologia: <Sparkles className="w-3 h-3" />,
  sistemas_uso: <Layers className="w-3 h-3" />,
  ecologia: <Globe className="w-3 h-3" />,
  legal: <ScrollText className="w-3 h-3" />
};

interface ReferenceTooltipProps {
  refDetail: ReferenceDetail;
  children: React.ReactNode;
  key?: any;
}

function ReferenceTooltip({ refDetail, children }: ReferenceTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <span
      ref={containerRef}
      className="relative inline-block select-none"
      onClick={(e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
      }}
    >
      {children}
      <span
        className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-zinc-900 text-white rounded-xl shadow-xl border border-zinc-800/80 z-50 text-left font-sans block pointer-events-auto cursor-default normal-case tracking-normal whitespace-normal font-normal transition-all duration-150 ${
          isOpen ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-1 scale-95 pointer-events-none"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="block text-[9px] font-mono uppercase tracking-wider text-cyan-400 font-bold mb-1">
          Referencia [{refDetail.id}]
        </span>
        <span className="block text-[10.5px] leading-relaxed text-zinc-200 font-light font-sans select-text">
          {refDetail.citation}
        </span>
        {refDetail.url && (
          <a
            href={refDetail.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 inline-flex items-center gap-1 text-[9px] font-mono uppercase font-bold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer select-none"
          >
            <span>Ver artículo completo</span>
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        )}
      </span>
    </span>
  );
}

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const patternList: { pattern: string; entry: GlossaryEntry }[] = [];
GLOSSARY_UNIFIED.forEach((entry) => {
  entry.patterns.forEach((pat) => {
    patternList.push({ pattern: pat, entry });
  });
});
patternList.sort((a, b) => b.pattern.length - a.pattern.length);

const escapedPatterns = patternList.map((p) => escapeRegExp(p.pattern)).join("|");
const glossaryRegex = new RegExp(
  `(?<=^|[^a-zA-ZáéíóúÁÉÍÓÚñÑ])(${escapedPatterns})(?=$|[^a-zA-ZáéíóúÁÉÍÓÚñÑ])`,
  "gi"
);

interface TextRendererProps {
  text: string;
  references?: ReferenceDetail[];
}

function GlossaryCardContent({ entry, onClose }: { entry: GlossaryEntry; onClose: () => void }) {
  const accentColor = CATEGORY_COLOR_VAR[entry.category] || "var(--primary)";
  const accentIcon = CATEGORY_ICON[entry.category] || <HelpCircle className="w-3 h-3" />;

  const getRelatedItemTitle = (id: string) => {
    const node = CORE_NODES.find((n) => n.id === id);
    if (node) return { title: node.title, category: node.category, type: "node" };
    const dilemma = DILEMMAS_DATA.find((d) => d.id === id);
    if (dilemma) return { title: dilemma.title, category: dilemma.category, type: "dilemma" };
    return { title: id, category: "other", type: "other" };
  };

  const allRelations = [
    ...(entry.relatedNodes || []),
    ...(entry.relatedDilemmas || [])
  ];

  const handleOpenInGlossary = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const navEvent = new CustomEvent("navigate-to-glossary", { detail: entry.id });
    window.dispatchEvent(navEvent);
    onClose();
  };

  const handleNavigate = (targetId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const navEvent = new CustomEvent("navigate-to-item", { detail: targetId });
    window.dispatchEvent(navEvent);
    onClose();
  };

  return (
    <div
      data-glossary-card
      className="w-full p-5 bg-surface-container backdrop-blur-md text-on-surface rounded-2xl shadow-xl border border-surface-variant dark:border-zinc-850/80"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: accentColor }} />
          <h4 className="text-sm font-black tracking-tight text-on-surface font-sans truncate">{entry.term}</h4>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className="text-[9px] font-mono uppercase px-2 py-0.5 rounded font-bold"
            style={{
              backgroundColor: `color-mix(in oklch, ${accentColor} 12%, transparent)`,
              color: accentColor
            }}
          >
            Glosario
          </span>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-surface-variant/50 text-on-surface-variant transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <p className="text-xs text-on-surface-variant font-light leading-relaxed select-text font-sans mb-3">
        {entry.shortDef}
      </p>

      <button
        onClick={handleOpenInGlossary}
        className="w-full text-left text-[11px] px-3 py-2 rounded-xl border transition-all flex items-center justify-between group cursor-pointer"
        style={{
          backgroundColor: `color-mix(in oklch, ${accentColor} 6%, transparent)`,
          borderColor: `color-mix(in oklch, ${accentColor} 30%, transparent)`,
          color: accentColor
        }}
      >
        <span className="flex items-center gap-2 font-medium">
          <BookOpen className="w-3 h-3" />
          Ver en Glosario
        </span>
        <ArrowUpRight className="w-3 h-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </button>

      {allRelations.length > 0 && (
        <div className="space-y-2 pt-3 mt-3 border-t border-outline-variant/20">
          <span className="text-[9px] font-mono tracking-wider uppercase text-on-surface-variant block font-bold">
            Ver más sobre esto en:
          </span>
          <div className="flex flex-col gap-1.5">
            {allRelations.slice(0, 6).map((relId) => {
              const rel = getRelatedItemTitle(relId);
              return (
                <button
                  key={relId}
                  onClick={(e) => handleNavigate(relId, e)}
                  className="w-full text-left text-[11px] px-3 py-2 rounded-xl bg-surface-container hover:bg-surface-variant border border-surface-variant text-on-surface hover:border-primary/30 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2 truncate">
                    {accentIcon}
                    <span className="truncate font-medium">{rel.title}</span>
                  </div>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-0.5 text-primary shrink-0" />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function TextRenderer({ text, references }: TextRendererProps) {
  const [activeEntry, setActiveEntry] = useState<GlossaryEntry | null>(null);
  const [activeElement, setActiveElement] = useState<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleGlossaryClick = (entry: GlossaryEntry, element: HTMLElement) => {
    if (activeEntry?.id === entry.id && activeElement === element) {
      setActiveEntry(null);
      setActiveElement(null);
    } else {
      setActiveEntry(entry);
      setActiveElement(element);
    }
  };

  const handleClose = () => {
    setActiveEntry(null);
    setActiveElement(null);
  };

  useEffect(() => {
    if (!activeEntry) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-glossary-card]')) return;
      if (target.closest('[data-glossary-word]')) return;
      handleClose();
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [activeEntry]);

  const drawLine = useCallback(() => {
    const svg = svgRef.current;
    if (!activeEntry || !activeElement || !containerRef.current || !cardRef.current || !svg) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const wordRect = activeElement.getBoundingClientRect();
    const cardRect = cardRef.current.getBoundingClientRect();

    const x1 = wordRect.right - containerRect.left;
    const y1 = wordRect.top - containerRect.top + wordRect.height / 2;
    const x2 = cardRect.left - containerRect.left + 24;
    const y2 = cardRect.top - containerRect.top;

    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const cp1x = x1 + dx * 0.35;
    const cp1y = y1 + dy * 0.15;
    const cp2x = x2 - dx * 0.35;
    const cp2y = y2 - dy * 0.15;

    const accentColor = CATEGORY_COLOR_VAR[activeEntry.category] || "var(--primary)";

    const ns = "http://www.w3.org/2000/svg";

    while (svg.firstChild) svg.removeChild(svg.firstChild);

    const path = document.createElementNS(ns, "path");
    path.setAttribute("d", `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`);
    path.setAttribute("stroke", accentColor);
    path.setAttribute("stroke-width", "2");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke-linecap", "round");
    svg.appendChild(path);

    const circle = document.createElementNS(ns, "circle");
    circle.setAttribute("cx", String(x1));
    circle.setAttribute("cy", String(y1));
    circle.setAttribute("r", "3.5");
    circle.setAttribute("fill", accentColor);
    svg.appendChild(circle);
  }, [activeEntry, activeElement]);

  useLayoutEffect(() => {
    drawLine();
    if (!containerRef.current || !activeEntry) return;
    const observer = new ResizeObserver(drawLine);
    observer.observe(containerRef.current);
    window.addEventListener("scroll", drawLine, true);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", drawLine, true);
    };
  }, [activeEntry, activeElement, drawLine]);

  if (!text) return null;

  const citationParts = text.split(/(\[[0-9,\s]+\])/g);

  if (!citationParts || citationParts.length === 0) return <span>{text}</span>;

  return (
    <div ref={containerRef} className="relative" data-glossary-container>
      <div>
        {citationParts.map((segment, idx) => {
          const citationMatch = segment.match(/^\[([0-9,\s]+)\]$/);
          if (citationMatch) {
            if (!references || references.length === 0) return <span key={idx}>{segment}</span>;
            const numbers = citationMatch[1].split(",").map((num) => num.trim());
            return (
              <span key={idx} className="inline-flex gap-0.5 select-none">
                {numbers.map((refId, nIdx) => {
                  const ref = references.find((r) => r.id === refId);
                  if (ref) {
                    return (
                      <ReferenceTooltip key={nIdx} refDetail={ref}>
                        <sup className="text-cyan-500 dark:text-cyan-400 font-bold hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors px-0.5 cursor-pointer select-none">
                          [{refId}]
                        </sup>
                      </ReferenceTooltip>
                    );
                  }
                  return <sup key={nIdx}>[{refId}]</sup>;
                })}
              </span>
            );
          }

          const glossaryParts = segment.split(glossaryRegex);

          return (
            <React.Fragment key={idx}>
              {glossaryParts.map((subSegment, sIdx) => {
                if (sIdx % 2 !== 0) {
                  const matchedText = subSegment;
                  const matchEntry = patternList.find(
                    (p) =>
                      p.entry.patterns.some(
                        (pat) => pat.toLowerCase() === matchedText.toLowerCase()
                      )
                  )?.entry;

                  if (matchEntry) {
                    return (
                      <GlossaryLink
                        key={sIdx}
                        entry={matchEntry}
                        noPopup={!isMobile}
                        isActive={activeEntry?.id === matchEntry.id}
                        onActivate={!isMobile ? handleGlossaryClick : undefined}
                      >
                        {matchedText}
                      </GlossaryLink>
                    );
                  }
                }
                return <span key={sIdx}>{subSegment}</span>;
              })}
            </React.Fragment>
          );
        })}
      </div>

      {activeEntry && !isMobile && (
        <div ref={cardRef} className="mt-4 pt-4 border-t border-outline-variant/20">
          <GlossaryCardContent entry={activeEntry} onClose={handleClose} />
        </div>
      )}

      {activeEntry && !isMobile && (
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
          style={{ zIndex: 5 }}
        />
      )}
    </div>
  );
}
