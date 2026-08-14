import React from "react";
import { X, ExternalLink, Quote, BookText, ArrowUpRight } from "lucide-react";
import { GLOSSARY_BY_ID } from "../data/glossaryUnified";

export interface SideNoteCardProps {
  item: any;
  type: "glossary" | "citation";
  actColor: string;
  onClose?: () => void;
}

export default function SideNoteCard({ item, type, actColor, onClose }: SideNoteCardProps) {
  const handleOpenInGlossary = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!item?.id) return;
    const navEvent = new CustomEvent("navigate-to-glossary", { detail: item.id });
    window.dispatchEvent(navEvent);
  };

  const description = item.shortDef || item.definition || item.citation;
  const itemUrl = item.url || (item.references && item.references[0]?.url);
  const isInGlossary = item?.id && GLOSSARY_BY_ID[item.id] !== undefined;

  return (
    <div
      data-side-note-card="true"
      className="glass-enhance w-full xl:max-w-[340px] rounded-xl border border-outline-variant/35 dark:border-zinc-800/80 bg-surface-container-low/65 dark:bg-zinc-900/45 backdrop-blur-2xl p-4 md:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.22)] relative z-10 transition-all select-text overflow-hidden"
    >
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Cerrar nota"
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-surface-variant/50 dark:hover:bg-zinc-800/70 text-on-surface-variant transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}

      <div className="border-b border-outline-variant/20 dark:border-zinc-800 pb-2 mb-2.5 pr-6">
        <div className="flex items-center gap-2">
          <span className={`shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-md ${type === "glossary" ? `${actColor} bg-current/10` : "text-on-surface-variant/60"}`}>
            {type === "glossary"
              ? <BookText className="w-3 h-3" />
              : <Quote className="w-3 h-3" />
            }
          </span>
          <h4 className="text-[14px] md:text-[16px] font-bold font-serif text-on-surface tracking-tight leading-tight">
            {item.term || item.title}
          </h4>
        </div>
      </div>

      <div className="text-[12.5px] md:text-[13.5px] leading-snug text-on-surface-variant/90 font-sans font-light mb-2.5">
        {description}
      </div>

      {isInGlossary && (
        <div className="pt-2 pb-2 border-t border-outline-variant/10 dark:border-zinc-800/40">
          <button
            onClick={handleOpenInGlossary}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase text-primary dark:text-cyan-400 hover:opacity-80 transition-opacity cursor-pointer px-3 py-1.5 rounded-lg border border-outline-variant/20 dark:border-zinc-800/40 hover:border-primary/40 group"
          >
            <span>Ver en Glosario</span>
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </button>
        </div>
      )}

      {type === "citation" && itemUrl && (
        <div className="pt-2 border-t border-outline-variant/10 dark:border-zinc-800/40">
          <a
            href={itemUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase text-primary dark:text-cyan-400 hover:opacity-80 transition-opacity cursor-pointer px-3 py-1.5 rounded-lg border border-outline-variant/20 dark:border-zinc-800/40 hover:border-primary/40"
          >
            <span>Ver estudio</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

    </div>
  );
}
