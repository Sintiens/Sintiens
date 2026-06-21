import React from 'react';
import { GLOSSARY_BY_ID } from '../data/glossaryUnified';

interface ConceptCardProps {
  key?: string | number;
  number: number;
  glossaryId: string;
}

export default function ConceptCard({ number, glossaryId }: ConceptCardProps) {
  const entry = GLOSSARY_BY_ID[glossaryId];

  if (!entry) {
    return (
      <div className="w-full p-5 sm:p-6 rounded-2xl border border-outline-variant/20 bg-surface-container/20 text-on-surface-variant/50 text-sm">
        Concepto no encontrado: {glossaryId}
      </div>
    );
  }

  const handleGlossaryClick = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    window.dispatchEvent(
      new CustomEvent("navigate-to-glossary", { detail: glossaryId })
    );
  };

  return (
    <div
      onClick={handleGlossaryClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleGlossaryClick(e);
        }
      }}
      aria-label={`Ver ${entry.term} en el glosario`}
      className="group relative w-full h-full text-left p-5 sm:p-6 rounded-2xl border border-outline-variant/25 bg-surface-container/30 hover:bg-surface-container/60 hover:border-outline-variant/50 transition-all duration-500 flex flex-col justify-between gap-3 cursor-pointer"
    >
      <div className="space-y-2.5 flex-1">
        <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest block leading-none">
          — 0{number}
        </span>
        <h3 className="text-base sm:text-lg font-bold font-heading text-on-background group-hover:text-primary transition-colors duration-300">
          {entry.term}
        </h3>
        <p className="text-[13px] sm:text-sm font-sans text-on-surface-variant/80 group-hover:text-on-surface-variant/90 leading-relaxed m-0 transition-colors duration-300">
          {entry.shortDef}
        </p>
      </div>
      <span
        aria-hidden="true"
        className="self-end text-primary/50 group-hover:text-primary transition-colors duration-300 text-xl leading-none -mt-1"
      >
        +
      </span>
    </div>
  );
}
