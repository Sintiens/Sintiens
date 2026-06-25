import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, Sparkles, Check, X } from "lucide-react";
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

const OPTION_LETTERS = ["A", "B", "C", "D", "E"];

const MicroQuiz: React.FC<{ quiz: MicroQuizData; accent: string }> = ({ quiz, accent }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const accentText = getAccentTextClass(accent);
  const cssVar = getAccentVar(accent);
  const answered = selected !== null;
  const isCorrect = answered && selected === quiz.correctIndex;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="relative my-8 rounded-2xl overflow-hidden"
      style={{ border: `1px solid color-mix(in oklch, ${cssVar} 28%, transparent)` }}
    >
      <div
        className="px-5 py-4"
        style={{ background: `color-mix(in oklch, ${cssVar} 7%, transparent)` }}
      >
        <div className="flex items-center gap-2 mb-2.5">
          <HelpCircle className={`w-4 h-4 shrink-0 ${accentText}`} strokeWidth={1.8} />
          <span className={`text-[10px] font-mono tracking-widest uppercase ${accentText} opacity-90`}>
            [ Pausa activa · Micro-quiz ]
          </span>
        </div>
        <p className="font-serif text-[18px] md:text-[19px] leading-relaxed text-on-surface m-0">
          {quiz.question}
        </p>
      </div>

      <div className="px-4 py-4 flex flex-col gap-2.5">
        {quiz.options.map((opt, i) => {
          const isSelected = selected === i;
          const isAnswerCorrect = i === quiz.correctIndex;
          // After answering: highlight the correct one in accent; dim others.
          let stateClasses = "text-on-surface";
          let borderStyle = "color-mix(in oklch, var(--outline-variant) 35%, transparent)";
          let bgStyle = "transparent";

          if (answered) {
            if (isAnswerCorrect) {
              // Correct answer always revealed in accent.
              borderStyle = `color-mix(in oklch, ${cssVar} 55%, transparent)`;
              bgStyle = `color-mix(in oklch, ${cssVar} 14%, transparent)`;
              stateClasses = "";
            } else if (isSelected) {
              // The wrong option the reader picked: subtly faded out.
              stateClasses = "text-on-surface-variant/70";
            } else {
              stateClasses = "text-on-surface-variant/55";
            }
          }

          return (
            <button
              key={i}
              onClick={() => !answered && setSelected(i)}
              disabled={answered}
              className={`w-full text-left px-4 py-3 rounded-xl text-[15px] font-sans transition-all border ${
                answered
                  ? "cursor-default"
                  : "cursor-pointer hover:bg-surface-container-low/60"
              } ${stateClasses}`}
              style={{
                borderColor: borderStyle,
                background: bgStyle,
                color: isAnswerCorrect && answered ? cssVar : undefined,
              }}
            >
              <span className="flex items-center gap-3">
                {/* Letter guide (A/B/C) — aids scanning; becomes the check/x after answering */}
                <span
                  className={`shrink-0 inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-mono font-bold ${
                    answered && isAnswerCorrect
                      ? `${accentText}`
                      : answered && isSelected
                        ? "text-on-surface-variant/60"
                        : "text-on-surface-variant/50"
                  }`}
                  style={
                    answered && isAnswerCorrect
                      ? { backgroundColor: `color-mix(in oklch, ${cssVar} 20%, transparent)` }
                      : undefined
                  }
                >
                  {answered && isAnswerCorrect ? (
                    <Check className="w-3 h-3" strokeWidth={2.4} />
                  ) : answered && isSelected ? (
                    <X className="w-3 h-3" strokeWidth={2.2} />
                  ) : (
                    OPTION_LETTERS[i] || (i + 1)
                  )}
                </span>
                <span>{opt}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Feedback banner + revealed fact */}
      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div
              className="px-5 py-4 border-t"
              style={{ borderColor: `color-mix(in oklch, ${cssVar} 22%, transparent)` }}
            >
              {/* Short empathic verdict */}
              <p className={`text-[13px] font-sans font-semibold ${accentText} mb-2.5 m-0`}>
                {isCorrect ? "Acertaste." : "Casi."}
              </p>
              <div className="flex items-start gap-2.5">
                <Sparkles className={`w-4 h-4 shrink-0 mt-[3px] ${accentText}`} strokeWidth={1.8} />
                <div className="flex-1 min-w-0">
                  <span className={`text-[10px] font-mono tracking-widest uppercase ${accentText} block mb-1.5 opacity-90`}>
                    [ Dato revelado ]
                  </span>
                  <p className="font-serif text-[15px] md:text-[16px] leading-relaxed text-on-surface/90 m-0">
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
