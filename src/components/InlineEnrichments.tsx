import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lightbulb, HelpCircle, Quote, Sparkles, KeyRound, ChevronDown } from "lucide-react";
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

// ─── Container: "Notas de lectura" ──────────────────────────────────────────

interface NotePreview {
  key: string;
  icon: React.ReactNode;
}

export const BlockEnrichments: React.FC<{
  block: TopicBlockData;
  accent: string;
}> = ({ block, accent }) => {
  const [open, setOpen] = useState(false);
  const accentText = getAccentTextClass(accent);
  const cssVar = getAccentVar(accent);

  const items: { key: string; node: React.ReactNode; previewIcon: React.ReactNode }[] = [];
  if (block.keyIdea) {
    items.push({
      key: "key",
      node: <KeyIdeaBox text={block.keyIdea} accent={accent} />,
      previewIcon: <KeyRound className="w-3.5 h-3.5" strokeWidth={1.8} />,
    });
  }
  if (block.pullQuote) {
    items.push({
      key: "quote",
      node: <PullQuote text={block.pullQuote} accent={accent} />,
      previewIcon: <Quote className="w-3.5 h-3.5" strokeWidth={1.6} />,
    });
  }
  if (block.analogy) {
    items.push({
      key: "ana",
      node: <AnalogyBox text={block.analogy.text} accent={accent} />,
      previewIcon: <Lightbulb className="w-3.5 h-3.5" strokeWidth={1.7} />,
    });
  }
  if (block.didYouKnow) {
    items.push({
      key: "dyk",
      node: <DidYouKnowBox text={block.didYouKnow} accent={accent} />,
      previewIcon: <Sparkles className="w-3.5 h-3.5" strokeWidth={1.7} />,
    });
  }
  if (block.reflectionQuestion) {
    items.push({
      key: "ref",
      node: (
        <ReflectionPrompt
          question={block.reflectionQuestion.question}
          prompt={block.reflectionQuestion.prompt}
          accent={accent}
        />
      ),
      previewIcon: <HelpCircle className="w-3.5 h-3.5" strokeWidth={1.7} />,
    });
  }

  if (items.length === 0) return null;

  return (
    <div
      className="relative my-3 rounded-xl overflow-hidden"
      style={{ border: `1px solid color-mix(in oklch, ${cssVar} 24%, transparent)` }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-4 py-3 flex items-center gap-2.5 cursor-pointer transition-colors hover:bg-surface-container-low/40"
        aria-expanded={open}
      >
        <span className={`shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-lg ${accentText}`} style={{ backgroundColor: `color-mix(in oklch, ${cssVar} 12%, transparent)` }}>
          <Sparkles className="w-3.5 h-3.5" strokeWidth={1.8} />
        </span>
        <span className={`text-[11px] font-mono tracking-widest uppercase ${accentText} opacity-90 flex-1`}>
          Notas de lectura
        </span>
        {/* Preview icons — a glance at what's inside, without opening */}
        <span className={`hidden sm:flex items-center gap-1.5 ${accentText} opacity-60 mr-1`}>
          {items.slice(0, 4).map((it) => (
            <React.Fragment key={it.key}>{it.previewIcon}</React.Fragment>
          ))}
        </span>
        <span className={`shrink-0 text-[10px] font-mono ${accentText} opacity-70`}>
          {items.length}
        </span>
        <ChevronDown
          className={`shrink-0 w-4 h-4 ${accentText} opacity-70 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3.5 pt-1">
              <motion.div
                variants={containerV}
                initial="hidden"
                animate="visible"
              >
                {items.map((it) => (
                  <React.Fragment key={it.key}>{it.node}</React.Fragment>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
