import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lightbulb, HelpCircle, Sparkles, KeyRound, ChevronDown } from "lucide-react";
import type { TopicBlockData } from "../types/story";

const getAccentVar = (accent: string) =>
  accent === "primary" ? "var(--primary)" : `var(--${accent})`;

const getAccentTextClass = (accent: string) => {
  switch (accent) {
    case "ch1": return "text-ch1";
    case "ch2": return "text-ch2";
    case "ch3": return "text-ch3";
    case "ch4": return "text-ch4";
    case "ch5": return "text-ch5";
    case "ch6": return "text-ch6";
    default: return "text-primary";
  }
};

const containerV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const itemV = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

// ─── Unified note cards ─────────────────────────────────────────────────────
// All five note types share the same base layout (icon + label + body) and the
// same typographic scale. Only the accent treatment differs so the reader can
// tell them apart at a glance without learning five different visual languages.

export const KeyIdeaBox: React.FC<{ text: string; accent: string }> = ({ text, accent }) => {
  const accentText = getAccentTextClass(accent);
  const cssVar = getAccentVar(accent);
  return (
    <motion.div
      variants={itemV}
      className="relative my-2 rounded-xl bg-surface-container-low/40 px-4 py-3.5 flex gap-3"
      style={{ borderLeft: `3px solid ${cssVar}` }}
    >
      <KeyRound className={`w-4 h-4 shrink-0 mt-[3px] ${accentText}`} strokeWidth={1.8} />
      <div className="flex-1 min-w-0">
        <span className={`text-[10px] font-mono tracking-widest uppercase ${accentText} block mb-1.5 opacity-90`}>
          Idea clave
        </span>
        <p className="font-sans text-[14px] leading-relaxed text-on-surface/90 font-medium m-0">
          {text}
        </p>
      </div>
    </motion.div>
  );
};

export const PullQuote: React.FC<{ text: string; accent: string }> = ({ text, accent }) => {
  const accentText = getAccentTextClass(accent);
  return (
    <motion.blockquote
      variants={itemV}
      className="relative my-3 pl-6 text-left"
    >
      {/* Oversized decorative opening quote */}
      <span
        aria-hidden="true"
        className={`absolute left-0 top-[-8px] font-serif leading-none select-none ${accentText}`}
        style={{ fontSize: "40px", opacity: 0.35 }}
      >
        &ldquo;
      </span>
      <p className="font-serif italic text-[16px] md:text-[17px] leading-relaxed text-on-surface font-medium m-0">
        {text}
      </p>
    </motion.blockquote>
  );
};

export const AnalogyBox: React.FC<{ text: string; accent: string }> = ({ text, accent }) => {
  const accentText = getAccentTextClass(accent);
  const cssVar = getAccentVar(accent);
  return (
    <motion.div
      variants={itemV}
      className="relative my-2 rounded-xl px-4 py-3.5 border border-outline-variant/20"
      style={{ background: `color-mix(in oklch, ${cssVar} 8%, transparent)` }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <Lightbulb className={`w-4 h-4 ${accentText}`} strokeWidth={1.7} />
        <span className={`text-[10px] font-mono tracking-widest uppercase ${accentText} opacity-90`}>
          Piénsalo así
        </span>
      </div>
      <p className="font-serif italic text-[14px] leading-relaxed text-on-surface/90 m-0">
        {text}
      </p>
    </motion.div>
  );
};

export const DidYouKnowBox: React.FC<{ text: string; accent: string }> = ({ text, accent }) => {
  const accentText = getAccentTextClass(accent);
  return (
    <motion.div
      variants={itemV}
      className="relative my-2 rounded-xl border border-dashed border-outline-variant/35 bg-surface-container-lowest/40 px-4 py-3.5 flex gap-3"
    >
      <Sparkles className={`w-4 h-4 shrink-0 mt-[3px] ${accentText}`} strokeWidth={1.7} />
      <div className="flex-1 min-w-0">
        <span className={`text-[10px] font-mono tracking-widest uppercase ${accentText} block mb-1.5 opacity-90`}>
          ¿Sabías que?
        </span>
        <p className="font-sans text-[13px] leading-relaxed text-on-surface-variant/90 font-light m-0">
          {text}
        </p>
      </div>
    </motion.div>
  );
};

export const ReflectionPrompt: React.FC<{
  question: string;
  prompt?: string;
  accent: string;
}> = ({ question, prompt, accent }) => {
  const [open, setOpen] = useState(false);
  const accentText = getAccentTextClass(accent);
  const cssVar = getAccentVar(accent);

  return (
    <motion.div
      variants={itemV}
      className="relative my-2 rounded-xl overflow-hidden"
      style={{ border: `1px solid color-mix(in oklch, ${cssVar} 32%, transparent)` }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-4 py-3.5 flex items-start gap-3 cursor-pointer transition-colors hover:bg-surface-container-low/40"
        aria-expanded={open}
      >
        <HelpCircle className={`w-4 h-4 shrink-0 mt-[3px] ${accentText}`} strokeWidth={1.7} />
        <div className="flex-1 min-w-0">
          <span className={`text-[10px] font-mono tracking-widest uppercase ${accentText} block mb-1.5 opacity-90`}>
            Pausa y reflexiona
          </span>
          <p className="font-serif italic text-[14px] leading-relaxed text-on-surface/90 m-0">
            {question}
          </p>
        </div>
        <ChevronDown
          className={`shrink-0 w-3.5 h-3.5 mt-1.5 ${accentText} opacity-70 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>
      {open && prompt && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <div
            className="px-4 py-3 border-t text-[13px] leading-relaxed font-sans font-light text-on-surface-variant/85"
            style={{ borderColor: `color-mix(in oklch, ${cssVar} 20%, transparent)` }}
          >
            {prompt}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

// ─── Shared item builder ────────────────────────────────────────────────────
// Every note type maps to a labeled item so the reader always sees a clear
// word ("Idea clave", "Piénsalo así", ...) instead of cryptic icons.

export interface EnrichmentItem {
  key: string;
  label: string;
  node: React.ReactNode;
}

export function buildEnrichmentItems(block: TopicBlockData, accent: string): EnrichmentItem[] {
  const items: EnrichmentItem[] = [];
  if (block.keyIdea) {
    items.push({
      key: "key",
      label: "Idea clave",
      node: <KeyIdeaBox text={block.keyIdea} accent={accent} />,
    });
  }
  if (block.pullQuote) {
    items.push({
      key: "quote",
      label: "Frase clave",
      node: <PullQuote text={block.pullQuote} accent={accent} />,
    });
  }
  if (block.analogy) {
    items.push({
      key: "ana",
      label: "Piénsalo así",
      node: <AnalogyBox text={block.analogy.text} accent={accent} />,
    });
  }
  if (block.didYouKnow) {
    items.push({
      key: "dyk",
      label: "¿Sabías que?",
      node: <DidYouKnowBox text={block.didYouKnow} accent={accent} />,
    });
  }
  if (block.reflectionQuestion) {
    items.push({
      key: "ref",
      label: "Pausa y reflexiona",
      node: (
        <ReflectionPrompt
          question={block.reflectionQuestion.question}
          prompt={block.reflectionQuestion.prompt}
          accent={accent}
        />
      ),
    });
  }
  return items;
}

// ─── Mobile: notes inline after the block, partially open ──────────────────
// Key idea + pull quote are always visible; the rest sit behind a labeled
// "Ver más" toggle so the page stays short without hiding good content.

export const BlockEnrichments: React.FC<{
  block: TopicBlockData;
  accent: string;
  alwaysVisible?: boolean;
}> = ({ block, accent, alwaysVisible }) => {
  const [showMore, setShowMore] = useState(false);
  const accentText = getAccentTextClass(accent);
  const cssVar = getAccentVar(accent);
  const items = buildEnrichmentItems(block, accent);

  if (items.length === 0) return null;

  const alwaysOpenKeys = new Set(["key", "quote"]);
  const openItems = items.filter((it) => alwaysOpenKeys.has(it.key));
  const hiddenItems = items.filter((it) => !alwaysOpenKeys.has(it.key));

  return (
    <div className={`${alwaysVisible ? "" : "lg:hidden"} my-4 rounded-xl overflow-hidden`} style={{ border: `1px solid color-mix(in oklch, ${cssVar} 24%, transparent)` }}>
      <div
        className="w-full px-4 py-3 flex items-center gap-2.5"
        style={{ backgroundColor: `color-mix(in oklch, ${cssVar} 7%, transparent)` }}
      >
        <span className={`shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-lg ${accentText}`} style={{ backgroundColor: `color-mix(in oklch, ${cssVar} 12%, transparent)` }}>
          <Sparkles className="w-3.5 h-3.5" strokeWidth={1.8} />
        </span>
        <span className={`text-[11px] font-mono tracking-widest uppercase ${accentText} opacity-90 flex-1`}>
          Notas de lectura
        </span>
        <span className={`shrink-0 text-[10px] font-mono ${accentText} opacity-70`}>
          {items.length} {items.length === 1 ? "nota" : "notas"}
        </span>
      </div>
      <div className="px-3 pb-1">
        <motion.div variants={containerV} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-40px" }}>
          {openItems.map((it) => (
            <React.Fragment key={it.key}>{it.node}</React.Fragment>
          ))}
        </motion.div>

        {hiddenItems.length > 0 && (
          <div className="pb-1">
            <button
              onClick={() => setShowMore((v) => !v)}
              aria-expanded={showMore}
              className={`w-full text-left px-4 py-2.5 mt-1 flex items-center gap-2.5 cursor-pointer transition-colors hover:bg-surface-container-low/40 rounded-lg ${accentText} opacity-80`}
            >
              <ChevronDown
                className={`shrink-0 w-3.5 h-3.5 opacity-70 transition-transform duration-300 ${showMore ? "rotate-180" : ""}`}
                strokeWidth={2}
              />
              <span className="text-[11px] font-mono tracking-widest uppercase">
                {showMore ? "Ocultar" : `Ver más (${hiddenItems.length})`}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {showMore && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <motion.div variants={containerV} initial="hidden" animate="visible">
                    {hiddenItems.map((it) => (
                      <React.Fragment key={it.key}>{it.node}</React.Fragment>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Desktop: notes rail synced to the block being read ────────────────────
// While the reader is at the act title (no active block) it shows a clickable
// mini-index of the act's blocks; once reading, it shows that block's notes.

export const RailNotes: React.FC<{
  blocks: TopicBlockData[];
  activeBlockId: string;
  accent: string;
  readingMin?: number;
  onNavigate: (blockId: string) => void;
}> = ({ blocks, activeBlockId, accent, readingMin, onNavigate }) => {
  const accentText = getAccentTextClass(accent);
  const cssVar = getAccentVar(accent);
  const block = blocks.find((b) => b.id === activeBlockId) ?? null;
  const items = block ? buildEnrichmentItems(block, accent) : [];

  if (blocks.length === 0) return null;

  const showToc = !block;
  const counter = showToc
    ? `${blocks.length} ${blocks.length === 1 ? "bloque" : "bloques"}${readingMin ? ` · ~${readingMin} min` : ""}`
    : `${items.length} ${items.length === 1 ? "nota" : "notas"}${readingMin ? ` · ~${readingMin} min` : ""}`;

  return (
    <div
      className="rounded-2xl overflow-hidden backdrop-blur-md"
      style={{
        border: `1px solid color-mix(in oklch, ${cssVar} 24%, transparent)`,
        background: `color-mix(in oklch, var(--surface-container-low) 55%, transparent)`,
      }}
    >
      <div
        className="w-full px-4 py-3 flex items-center gap-2.5"
        style={{ backgroundColor: `color-mix(in oklch, ${cssVar} 7%, transparent)` }}
      >
        <span className={`shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-lg ${accentText}`} style={{ backgroundColor: `color-mix(in oklch, ${cssVar} 12%, transparent)` }}>
          <Sparkles className="w-3.5 h-3.5" strokeWidth={1.8} />
        </span>
        <span className={`text-[11px] font-mono tracking-widest uppercase ${accentText} opacity-90 flex-1`}>
          Notas de lectura
        </span>
        <span className={`shrink-0 text-[10px] font-mono ${accentText} opacity-70 text-right`}>
          {counter}
        </span>
      </div>
      <div className="px-3 pb-2 max-h-[calc(100vh-7rem)] overflow-y-auto overscroll-y-contain custom-scrollbar">
        <AnimatePresence mode="wait" initial={false}>
          {showToc ? (
            <motion.div
              key="toc"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <p className={`text-[10px] font-mono tracking-widest uppercase ${accentText} opacity-70 block mb-2 mt-1`}>
                En este acto
              </p>
              <div className="flex flex-col gap-1">
                {blocks.map((b, i) => (
                  <button
                    key={b.id}
                    onClick={() => onNavigate(b.id)}
                    className="group flex items-start gap-2.5 text-left px-3 py-2 rounded-lg hover:bg-surface-container-low/70 transition-colors cursor-pointer"
                  >
                    <span className={`font-mono text-[10px] font-bold ${accentText} opacity-70 mt-[2px] shrink-0`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-sans text-[13px] leading-snug text-on-surface/80 group-hover:text-on-surface transition-colors">
                      {b.title}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={block!.id}
              variants={containerV}
              initial="hidden"
              animate="visible"
            >
              {items.map((it) => (
                <React.Fragment key={it.key}>{it.node}</React.Fragment>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
