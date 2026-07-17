import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, ArrowUpRight, HelpCircle, Activity, Globe, Scale, BookOpen, Brain, Layers, ScrollText, Sparkles } from "lucide-react";
import { GlossaryEntry, GLOSSARY_CATEGORIES } from "../data/glossaryUnified";
import { CORE_NODES } from "../data/CORE_NODES";
import { DILEMMAS_DATA } from "../data/DILEMMAS_DATA";

interface GlossaryLinkProps {
  entry: GlossaryEntry;
  children: React.ReactNode;
  key?: any;
  noPopup?: boolean;
  isActive?: boolean;
  onActivate?: (entry: GlossaryEntry, element: HTMLElement) => void;
}

const CATEGORY_ICON: Record<string, React.ReactNode> = {
  sintiencia: <Activity className="w-3 h-3" />,
  etica: <Scale className="w-3 h-3" />,
  psicologia: <Sparkles className="w-3 h-3" />,
  sistemas_uso: <Layers className="w-3 h-3" />,
  ecologia: <Globe className="w-3 h-3" />,
  legal: <ScrollText className="w-3 h-3" />
};

const CATEGORY_COLOR_VAR: Record<string, string> = {
  sintiencia: "var(--ch1)",
  etica: "var(--ch4)",
  psicologia: "var(--ch3)",
  sistemas_uso: "var(--ch2)",
  ecologia: "var(--ch5)",
  legal: "var(--ch6)"
};

export default function GlossaryLink({ entry, children, noPopup, isActive, onActivate }: GlossaryLinkProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (noPopup) return;
    if (isMobile || !isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, isMobile, noPopup]);

  const handleLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (noPopup && onActivate && containerRef.current) {
      onActivate(entry, containerRef.current);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleNavigate = (targetId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen(false);
    const navEvent = new CustomEvent("navigate-to-item", { detail: targetId });
    window.dispatchEvent(navEvent);
  };

  const handleOpenInGlossary = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen(false);
    const navEvent = new CustomEvent("navigate-to-glossary", { detail: entry.id });
    window.dispatchEvent(navEvent);
  };

  const getRelatedItemTitle = (id: string) => {
    const node = CORE_NODES.find((n) => n.id === id);
    if (node) return { title: node.title, category: node.category, type: "node" };
    const dilemma = DILEMMAS_DATA.find((d) => d.id === id);
    if (dilemma) return { title: dilemma.title, category: dilemma.category, type: "dilemma" };
    return { title: id, category: "other", type: "other" };
  };

  const isOpenActive = noPopup ? (isActive ?? false) : isOpen;
  const showPopupDesktop = !noPopup && isOpen && !isMobile;

  const accentColor = CATEGORY_COLOR_VAR[entry.category] || "var(--primary)";
  const accentIcon = CATEGORY_ICON[entry.category] || <HelpCircle className="w-3 h-3" />;

  const allRelations = [
    ...(entry.relatedNodes || []),
    ...(entry.relatedDilemmas || [])
  ];

  const renderCardContent = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-outline-variant/30 pb-2 gap-2">
        <h4 className="text-sm font-black tracking-tight text-on-surface flex items-center gap-1.5 font-sans min-w-0">
          <span className="w-2 h-2 rounded-full animate-pulse shrink-0" style={{ backgroundColor: accentColor }} />
          <span className="truncate">{entry.term}</span>
        </h4>
        <span
          className="text-[9px] font-mono uppercase px-2 py-0.5 rounded font-bold shrink-0"
          style={{
            backgroundColor: `color-mix(in oklch, ${accentColor} 12%, transparent)`,
            color: accentColor
          }}
        >
          Glosario
        </span>
      </div>

      <p className="text-xs text-on-surface-variant font-light leading-relaxed select-text font-sans">
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
        <div className="space-y-2 pt-1">
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

  return (
    <span ref={containerRef} className="relative inline-block" data-glossary-word>
      <button
        onClick={handleLinkClick}
          className={`cursor-pointer transition-all duration-300 select-text rounded-md inline px-1.5 py-[2px] mx-[1px] border outline-none ${
          isOpenActive
            ? "bg-primary/15 dark:bg-primary/25 text-primary border-primary/40 shadow-sm shadow-primary/10"
            : "bg-surface-container/60 hover:bg-primary/10 text-on-surface hover:text-primary border-outline-variant/15 hover:border-primary/30"
        }`}
      >
        {children}
      </button>

      <AnimatePresence>
        {showPopupDesktop && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-80 p-4 bg-surface-container backdrop-blur-md text-on-surface rounded-2xl shadow-xl border border-surface-variant dark:border-zinc-850/80 z-50 text-left pointer-events-auto cursor-default normal-case tracking-normal whitespace-normal block"
            onClick={(e) => e.stopPropagation()}
          >
            {renderCardContent()}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white dark:border-t-zinc-950" />
          </motion.div>
        )}
      </AnimatePresence>

      {isMobile &&
        !noPopup &&
        isOpen &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-end justify-center select-none pointer-events-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/50 dark:bg-black/75 backdrop-blur-xs cursor-pointer"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 240 }}
              className="relative w-full max-h-[75vh] overflow-y-auto bg-surface-container border-t border-surface-variant dark:border-zinc-850 p-6 rounded-t-3xl flex flex-col z-10 shadow-2xl text-left pointer-events-auto select-none"
            >
              <div className="w-12 h-1 rounded-full bg-zinc-350 dark:bg-zinc-800 mx-auto mb-4 shrink-0" />
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-surface-container border border-surface-variant text-on-surface-variant hover:text-on-surface dark:hover:text-white transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="overflow-y-auto pb-4 select-text">
                {renderCardContent()}
              </div>
            </motion.div>
          </div>,
          document.body
        )}
    </span>
  );
}

void GLOSSARY_CATEGORIES;
void Brain;
