import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Lightbulb, HelpCircle, Quote, Sparkles, KeyRound } from "lucide-react";
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
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const itemV = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export const KeyIdeaBox: React.FC<{ text: string; accent: string }> = ({ text, accent }) => {
  const accentText = getAccentTextClass(accent);
  const cssVar = getAccentVar(accent);
  return (
    <motion.div
      variants={itemV}
      className="relative my-3 rounded-lg border border-outline-variant/25 bg-surface-container-low/40 px-3 py-2.5 flex gap-2.5"
      style={{ borderLeft: `2px solid ${cssVar}` }}
    >
      <KeyRound className={`w-3.5 h-3.5 shrink-0 mt-[2px] ${accentText}`} strokeWidth={1.8} />
      <div className="flex-1 min-w-0">
        <span className={`text-[8.5px] font-mono tracking-widest uppercase ${accentText} block mb-1 opacity-90`}>
          [ Idea clave ]
        </span>
        <p className="font-sans text-[12.5px] leading-snug text-on-surface/90 font-medium m-0">
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
      className="relative my-4 text-left"
    >
      <Quote className={`w-3.5 h-3.5 mb-2 opacity-50 ${accentText}`} strokeWidth={1.4} />
      <p className="font-serif italic text-[14px] md:text-[15px] leading-[1.5] text-on-surface font-medium m-0">
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
      className="relative my-3 rounded-lg px-3 py-2.5 border border-outline-variant/20"
      style={{ background: `color-mix(in oklch, ${cssVar} 7%, transparent)` }}
    >
      <div className="flex items-center gap-1.5 mb-1">
        <Lightbulb className={`w-3.5 h-3.5 ${accentText}`} strokeWidth={1.7} />
        <span className={`text-[8.5px] font-mono tracking-widest uppercase ${accentText} opacity-90`}>
          [ Piénsalo así ]
        </span>
      </div>
      <p className="font-serif italic text-[12.5px] leading-snug text-on-surface/85 m-0">
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
      className="relative my-3 rounded-lg border border-dashed border-outline-variant/35 bg-surface-container-lowest/40 px-3 py-2.5 flex gap-2.5"
    >
      <Sparkles className={`w-3.5 h-3.5 shrink-0 mt-[2px] ${accentText}`} strokeWidth={1.7} />
      <div className="flex-1 min-w-0">
        <span className={`text-[8.5px] font-mono tracking-widest uppercase ${accentText} block mb-1 opacity-90`}>
          [ ¿Sabías que? ]
        </span>
        <p className="font-sans text-[11.5px] leading-snug text-on-surface-variant/90 font-light m-0">
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
      className="relative my-3 rounded-lg overflow-hidden"
      style={{ border: `1px solid color-mix(in oklch, ${cssVar} 30%, transparent)` }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-3 py-2.5 flex items-start gap-2.5 cursor-pointer transition-colors hover:bg-surface-container-low/40"
        aria-expanded={open}
      >
        <HelpCircle className={`w-3.5 h-3.5 shrink-0 mt-[2px] ${accentText}`} strokeWidth={1.7} />
        <div className="flex-1 min-w-0">
          <span className={`text-[8.5px] font-mono tracking-widest uppercase ${accentText} block mb-1 opacity-90`}>
            [ Pausa y reflexiona ]
          </span>
          <p className="font-serif italic text-[12.5px] leading-snug text-on-surface/90 m-0">
            {question}
          </p>
        </div>
        <span className={`shrink-0 text-[9px] font-mono uppercase tracking-widest ${accentText} opacity-70 mt-1`}>
          {open ? "×" : "+"}
        </span>
      </button>
      {open && prompt && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <div
            className="px-3 py-2 border-t text-[11.5px] leading-snug font-sans font-light text-on-surface-variant/85"
            style={{ borderColor: `color-mix(in oklch, ${cssVar} 18%, transparent)` }}
          >
            {prompt}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export const BlockEnrichments: React.FC<{
  block: TopicBlockData;
  accent: string;
}> = ({ block, accent }) => {
  const [open, setOpen] = useState(false);
  const accentText = getAccentTextClass(accent);
  const cssVar = getAccentVar(accent);

  const items: { key: string; node: React.ReactNode }[] = [];
  if (block.keyIdea) items.push({ key: "key", node: <KeyIdeaBox text={block.keyIdea} accent={accent} /> });
  if (block.pullQuote) items.push({ key: "quote", node: <PullQuote text={block.pullQuote} accent={accent} /> });
  if (block.analogy) items.push({ key: "ana", node: <AnalogyBox text={block.analogy.text} accent={accent} /> });
  if (block.didYouKnow) items.push({ key: "dyk", node: <DidYouKnowBox text={block.didYouKnow} accent={accent} /> });
  if (block.reflectionQuestion) items.push({ key: "ref", node: <ReflectionPrompt question={block.reflectionQuestion.question} prompt={block.reflectionQuestion.prompt} accent={accent} /> });

  if (items.length === 0) return null;

  return (
    <div
      className="relative my-2 rounded-lg overflow-hidden"
      style={{ border: `1px solid color-mix(in oklch, ${cssVar} 22%, transparent)` }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left px-3 py-2.5 flex items-center gap-2 cursor-pointer transition-colors hover:bg-surface-container-low/40"
        aria-expanded={open}
      >
        <Sparkles className={`w-3.5 h-3.5 shrink-0 ${accentText}`} strokeWidth={1.7} />
        <span className={`text-[8.5px] font-mono tracking-widest uppercase ${accentText} opacity-90 flex-1`}>
          [ Notas de este bloque ]
        </span>
        <span className={`shrink-0 text-[9px] font-mono ${accentText} opacity-70`}>
          {items.length}{"\u00a0"}{open ? "×" : "+"}
        </span>
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
            <div className="px-3 pb-2">
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
