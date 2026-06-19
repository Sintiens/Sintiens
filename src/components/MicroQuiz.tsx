import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, Sparkles, Check } from "lucide-react";
import type { MicroQuizData } from "../types/story";

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

const MicroQuiz: React.FC<{ quiz: MicroQuizData; accent: string }> = ({ quiz, accent }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const accentText = getAccentTextClass(accent);
  const cssVar = getAccentVar(accent);
  const answered = selected !== null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative my-8 rounded-xl overflow-hidden"
      style={{ border: `1px solid color-mix(in oklch, ${cssVar} 30%, transparent)` }}
    >
      <div
        className="px-4 py-3"
        style={{ background: `color-mix(in oklch, ${cssVar} 6%, transparent)` }}
      >
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className={`w-4 h-4 shrink-0 ${accentText}`} strokeWidth={1.8} />
          <span className={`text-[9px] font-mono tracking-widest uppercase ${accentText} opacity-90`}>
            [ Pausa activa · Micro-quiz ]
          </span>
        </div>
        <p className="font-serif text-[17px] leading-snug text-on-surface m-0">
          {quiz.question}
        </p>
      </div>

      <div className="px-4 py-3 flex flex-col gap-2">
        {quiz.options.map((opt, i) => {
          const isSelected = selected === i;
          return (
            <button
              key={i}
              onClick={() => !answered && setSelected(i)}
              disabled={answered}
              className={`w-full text-left px-3 py-2 rounded-md text-[14px] font-sans transition-all cursor-pointer border ${
                answered
                  ? isSelected
                    ? "cursor-default"
                    : "opacity-50 cursor-default"
                  : "hover:bg-surface-container-low/60"
              }`}
              style={{
                borderColor: isSelected
                  ? `color-mix(in oklch, ${cssVar} 50%, transparent)`
                  : "color-mix(in oklch, var(--outline-variant) 30%, transparent)",
                background: isSelected
                  ? `color-mix(in oklch, ${cssVar} 12%, transparent)`
                  : "transparent",
                color: isSelected ? cssVar : "var(--on-surface)",
              }}
            >
              <span className="flex items-center gap-2">
                {isSelected && <Check className="w-3.5 h-3.5 shrink-0" strokeWidth={2.2} />}
                <span>{opt}</span>
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div
              className="px-4 py-3 border-t"
              style={{ borderColor: `color-mix(in oklch, ${cssVar} 20%, transparent)` }}
            >
              <div className="flex items-start gap-2">
                <Sparkles className={`w-4 h-4 shrink-0 mt-[2px] ${accentText}`} strokeWidth={1.8} />
                <div className="flex-1 min-w-0">
                  <span className={`text-[9px] font-mono tracking-widest uppercase ${accentText} block mb-1 opacity-90`}>
                    [ Dato revelado ]
                  </span>
                  <p className="font-serif text-[15px] leading-snug text-on-surface/90 m-0">
                    {quiz.revealFact}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MicroQuiz;
