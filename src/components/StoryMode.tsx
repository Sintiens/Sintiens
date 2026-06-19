import React, { useState, useEffect, useRef, useLayoutEffect, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Info, X } from "lucide-react";
import SocraticReflection from "./SocraticReflection";
import { actsData } from "../data/storyData";
import DeepDiveView from "./DeepDiveView";
import { DeepDiveData } from "../types/story";
import StoryTextRenderer from "./StoryTextRenderer";
import SideNoteCard from "./SideNoteCard";
import ReadingUtilities from "./ReadingUtilities";
import ReadingEnrichments from "./ReadingEnrichments";
import MicroQuiz from "./MicroQuiz";
import TabNav, { TabType } from "./TabNav";

const AmbientGlow = ({ 
colorClass, 
className = "",
opacity = 0.05,
style = {}
}: {
colorClass: string;
className?: string;
opacity?: number;
style?: React.CSSProperties;
}) => {
const textClass = colorClass.startsWith('bg-') 
  ? colorClass.replace('bg-', 'text-') 
  : colorClass;

return (
<div 
  className={`absolute pointer-events-none select-none z-0 overflow-visible ${className}`}
  style={style}
>
  {/* Centered Elongated Container for organic wobbly drift */}
  <div 
    className={`absolute top-1/2 left-1/2 w-[145%] h-[65%] aspect-[2.2/1] filter blur-[35px] sm:blur-[48px] ${textClass} animate-wobble-slow transition-colors duration-[600ms] ease-in-out`}
    style={{
      opacity: opacity,
    }}
  >
    <svg 
      viewBox="0 0 200 200" 
      xmlns="http://www.w3.org/2000/svg" 
      className="w-full h-full"
    >
      {/* Single Amorphous Path - Extremely smooth gradient transition via blur */}
      <path 
        fill="currentColor"
        d="M30,75 C70,15 130,25 175,55 C195,85 165,135 145,165 C105,195 55,175 35,135 C15,95 10,80 30,75 Z"
      >
        <animate 
          attributeName="d" 
          dur="28s" 
          repeatCount="indefinite" 
          values="
            M30,75 C70,15 130,25 175,55 C195,85 165,135 145,165 C105,195 55,175 35,135 C15,95 10,80 30,75 Z;
            M55,35 C115,5 155,45 165,95 C175,155 115,175 75,155 C35,135 15,95 25,65 C35,35 15,35 55,35 Z;
            M55,25 C115,5 145,55 155,105 C165,165 105,165 65,175 C25,185 35,115 35,75 C35,35 25,40 55,25 Z;
            M30,75 C70,15 130,25 175,55 C195,85 165,135 145,165 C105,195 55,175 35,135 C15,95 10,80 30,75 Z
          " 
        />
      </path>
    </svg>
  </div>
</div>
);
};

export default function StoryMode({ activeTab, onNavigate, theme, onToggleTheme }: { activeTab: TabType; onNavigate: (tab: TabType) => void; theme: "dark" | "light"; onToggleTheme: () => void }) {
const [activeChapter, setActiveChapter] = useState<string | null>(null);
const [flashChapter, setFlashChapter] = useState<string | null>(null);

// State for Deep Dive modal
const [deepDiveData, setDeepDiveData] = useState<{
actId: string;
actNum: string;
actColor: string;
data: DeepDiveData;
} | null>(null);
const [showMobileInfo, setShowMobileInfo] = useState(false);
const [activeBlocks, setActiveBlocks] = useState<Record<string, string>>({});
const [visitedChapters, setVisitedChapters] = useState<Set<string>>(new Set());
const [actProgress, setActProgress] = useState<Record<string, number>>({});
const [activeBlockId, setActiveBlockId] = useState<Record<string, string>>({});
const ttsTargetRef = useRef<HTMLDivElement | null>(null);

// States for floating notes and footnotes
interface ActiveNoteState {
  id: string;
  type: "glossary" | "citation";
  item: any;
  x: number;
  y: number;
  wordElement: HTMLElement | null;
}
const [activeNotesByAct, setActiveNotesByAct] = useState<Record<string, ActiveNoteState>>({});
const [mobileNote, setMobileNote] = useState<{
  id: string;
  type: "glossary" | "citation";
  item: any;
  actColor: string;
} | null>(null);

// Refs to compute dynamic SVG line positions
const gridContainerRefsByAct = useRef<Record<string, HTMLDivElement | null>>({});
const centerColumnRefsByAct = useRef<Record<string, HTMLDivElement | null>>({});
const sideNoteCardRefsByAct = useRef<Record<string, HTMLDivElement | null>>({});

// State with line coordinates per act (rendered declaratively in React)
interface LineCoords { x1: number; y1: number; x2: number; y2: number; d: string; }
const [lineCoordsByAct, setLineCoordsByAct] = useState<Record<string, LineCoords | null>>({});

// Recompute line coords from refs (used by ResizeObserver + scroll)
const recomputeAllLines = useCallback(() => {
  setLineCoordsByAct(prev => {
    const next: Record<string, LineCoords | null> = {};
    for (const actId of Object.keys(activeNotesByAct)) {
      const note = activeNotesByAct[actId];
      const gridEl = gridContainerRefsByAct.current[actId];
      const cardEl = sideNoteCardRefsByAct.current[actId];
      if (!gridEl || !cardEl || !note.wordElement) {
        next[actId] = null;
        continue;
      }
      const gridRect = gridEl.getBoundingClientRect();
      const wordRect = note.wordElement.getBoundingClientRect();
      const cardRect = cardEl.getBoundingClientRect();

      // y: vertical position of the clicked word (the line is at this height)
      const y1 = wordRect.top - gridRect.top + wordRect.height / 2;

      // x1: right edge of the TEXT COLUMN (not the word, so the line never crosses text)
      // Fallback to the word's right edge if the text column ref is missing.
      const textEl = centerColumnRefsByAct.current[actId];
      const textRect = textEl?.getBoundingClientRect();
      const x1 = textRect ? (textRect.right - gridRect.left) : (wordRect.right - gridRect.left);

      // x2: left edge of the card (where the line and end dot connect)
      const x2 = cardRect.left - gridRect.left;

      // The visible line stops well before the card so it never overlaps the card.
      const lineEndX = x2 - 32;

      // Path: a single horizontal line at the word's height, from the right edge
      // of the text column to 32px before the card. The card sits on top of the SVG
      // (z-20 vs z-0), so the line stays behind the card and never overlaps it.
      const d = `M ${x1} ${y1} L ${lineEndX} ${y1}`;

      next[actId] = { x1, y1, x2, y2: y1, d };
    }

    // Detect changes: any key removed, added, or with a different d
    const prevKeys = Object.keys(prev);
    const nextKeys = Object.keys(next);
    let changed = prevKeys.length !== nextKeys.length;
    if (!changed) {
      for (const k of nextKeys) {
        const a = next[k];
        const b = prev[k];
        if (!a || !b) { if (a !== b) { changed = true; break; } continue; }
        if (a.d !== b.d) { changed = true; break; }
      }
    }
    if (!changed) {
      for (const k of prevKeys) {
        if (!(k in next)) { changed = true; break; }
      }
    }
    return changed ? next : prev;
  });
}, [activeNotesByAct]);

// Update on layout changes (resize + scroll)
useEffect(() => {
  recomputeAllLines();
  window.addEventListener("scroll", recomputeAllLines, true);
  window.addEventListener("resize", recomputeAllLines);
  const ro = new ResizeObserver(recomputeAllLines);
  const els: Element[] = [];
  (Object.values(gridContainerRefsByAct.current) as Array<HTMLElement | null>).forEach(el => { if (el) { ro.observe(el); els.push(el); } });
  (Object.values(centerColumnRefsByAct.current) as Array<HTMLElement | null>).forEach(el => { if (el) { ro.observe(el); els.push(el); } });
  (Object.values(sideNoteCardRefsByAct.current) as Array<HTMLElement | null>).forEach(el => { if (el) { ro.observe(el); els.push(el); } });
  return () => {
    window.removeEventListener("scroll", recomputeAllLines, true);
    window.removeEventListener("resize", recomputeAllLines);
    ro.disconnect();
  };
}, [recomputeAllLines]);

// Footnotes/Glossary Handlers
const handleHoverNote = (e: React.MouseEvent, noteId: string, item: any, type: "glossary" | "citation", actId: string) => {
  // Hover triggers disabled as per user request (click-only now)
};

const handleLeaveNote = () => {
  // Do nothing
};

const handleClickNote = (e: React.MouseEvent, noteId: string, item: any, type: "glossary" | "citation", actId: string, actColor: string, instanceId?: string) => {
  e.preventDefault();
  e.stopPropagation();
  if (window.innerWidth < 1024) {
    setMobileNote({ id: noteId, type, item, actColor });
  } else {
    // Desktop: toggle active note on click
    const wordEl = e.currentTarget as HTMLElement;
    const gridContainer = wordEl.closest(".grid-container-relative");
    if (wordEl && gridContainer) {
      const wordRect = wordEl.getBoundingClientRect();
      const gridRect = gridContainer.getBoundingClientRect();

      const relativeX = wordRect.right - gridRect.left;
      const relativeY = wordRect.top - gridRect.top + (wordRect.height / 2);

      console.log('[StoryMode] handleClickNote', { actId, noteId, relativeX, relativeY });

      setActiveNotesByAct(prev => {
        const current = prev[actId];
        if (current && current.id === noteId && current.instanceId === instanceId) {
          // If clicked the active note, close it
          const copy = { ...prev };
          delete copy[actId];
          return copy;
        } else {
          // Otherwise, open it
          return {
            ...prev,
            [actId]: {
              id: noteId,
              type,
              item,
              x: relativeX,
              y: relativeY,
              wordElement: wordEl,
              instanceId
            }
          };
        }
      });
    }
  }
};

const handleHoverSidebarItem = (noteId: string, type: "glossary" | "citation", item: any, actId: string) => {
  // Just trigger a visual highlight of the word in the text (non-intrusive)
  const wordEl = document.querySelector(`[data-note-id="${noteId}"]`) as HTMLElement;
  if (wordEl) {
    wordEl.classList.add("pulse-highlight");
  }
};

const handleLeaveSidebarItem = (noteId: string) => {
  const wordEl = document.querySelector(`[data-note-id="${noteId}"]`) as HTMLElement;
  if (wordEl) {
    wordEl.classList.remove("pulse-highlight");
  }
};

const handleConceptClick = (noteId: string, type: "glossary" | "citation", item: any, actId: string) => {
  const wordEl = document.querySelector(`[data-note-id="${noteId}"]`) as HTMLElement;
  const gridContainer = wordEl?.closest(".grid-container-relative");
  if (wordEl && gridContainer) {
    const wordRect = wordEl.getBoundingClientRect();
    const gridRect = gridContainer.getBoundingClientRect();

    const relativeX = wordRect.right - gridRect.left;
    const relativeY = wordRect.top - gridRect.top + (wordRect.height / 2);

    // Scroll the word into view
    wordEl.scrollIntoView({ behavior: "smooth", block: "center" });
    wordEl.classList.add("pulse-highlight");
    setTimeout(() => {
      wordEl.classList.remove("pulse-highlight");
    }, 2000);

    // Set active note
    setActiveNotesByAct(prev => ({
      ...prev,
      [actId]: {
        id: noteId,
        type,
        item,
        x: relativeX,
        y: relativeY,
        wordElement: wordEl
      }
    }));
  }
};

// Close active note when clicking outside the card and outside highlighted words
useEffect(() => {
  if (Object.keys(activeNotesByAct).length === 0) return;

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('[data-side-note-card]')) return;
    if (target.closest('[data-note-id]')) return;
    setActiveNotesByAct({});
  };

  document.addEventListener('click', handleClickOutside);
  return () => document.removeEventListener('click', handleClickOutside);
}, [activeNotesByAct]);

const chaptersList = [
{ id: "acto-0", num: "0", label: "Introducción", activeClass: "text-primary", dotClass: "bg-primary" },
...actsData.map((act) => ({
id: act.id,
num: act.num,
label: act.label,
activeClass: act.textColor,
dotClass: act.colorName,
})),
];

useEffect(() => {
if (activeChapter) {
setFlashChapter(activeChapter);
const timer = setTimeout(() => {
setFlashChapter(null);
}, 2500);
return () => clearTimeout(timer);
} else {
setFlashChapter(null);
}
}, [activeChapter]);

useEffect(() => {
if (!activeChapter) return;
setVisitedChapters((prev) => {
if (prev.has(activeChapter)) return prev;
const next = new Set(prev);
next.add(activeChapter);
return next;
});
}, [activeChapter]);

useEffect(() => {
let ticking = false;
const handleScroll = () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    try {
      const sections = document.querySelectorAll('[id^="acto-"], #hero, #intro');
      const triggerLine = window.innerHeight * 0.2;
      let newActive: string | null = null;
      sections.forEach((sec) => {
        const rect = (sec as HTMLElement).getBoundingClientRect();
        if (rect.top <= triggerLine) {
          newActive = sec.id;
        }
      });
      if (newActive === "hero" || newActive === "intro") {
        newActive = null;
      }
      setActiveChapter((prev) => (prev === newActive ? prev : newActive));

      const newActiveBlocks: Record<string, string> = {};
      const newActProgress: Record<string, number> = {};
      const newActiveBlockId: Record<string, string> = {};

      const els = document.querySelectorAll(".narrative-text-container");
      els.forEach((el) => {
        const element = el as HTMLElement;
        const parentAct = element.closest('[id^="acto-"]');
        if (!parentAct) return;

        const h2 = parentAct.querySelector("h2");
        if (!h2) return;

        const headerContainer = parentAct.querySelector(".act-sticky-header") as HTMLElement | null;
        const headerRect = headerContainer ? headerContainer.getBoundingClientRect() : h2.getBoundingClientRect();
        const textRect = element.getBoundingClientRect();

        const relativeBottom = headerRect.bottom - textRect.top;

        if (relativeBottom <= 0) {
          element.style.webkitMaskImage = "";
          element.style.maskImage = "";
        } else {
          const fadeStart = relativeBottom - 15;
          const fadeEnd = relativeBottom + 35;

          const maskVal = `linear-gradient(to bottom, transparent ${fadeStart}px, black ${fadeEnd}px)`;
          element.style.webkitMaskImage = maskVal;
          element.style.maskImage = maskVal;
        }

        const blocks = parentAct.querySelectorAll(".narrative-block");
        let activeTitle = "";
        let activeBlockIdStr = "";
        const stickyHeaderBottom = headerRect.bottom;

        blocks.forEach((blockEl) => {
          const subtitleEl = blockEl.querySelector(":scope > span");
          const subtitleRect = subtitleEl ? subtitleEl.getBoundingClientRect() : blockEl.getBoundingClientRect();

          if (subtitleRect.bottom <= stickyHeaderBottom) {
            activeTitle = blockEl.getAttribute("data-block-title") || "";
            activeBlockIdStr = blockEl.getAttribute("data-block-id") || "";
          }
        });

        newActiveBlocks[parentAct.id] = activeTitle || "";

        const actRect = parentAct.getBoundingClientRect();
        const actHeight = (parentAct as HTMLElement).offsetHeight;
        const chipHeight = headerContainer ? headerContainer.offsetHeight : 36;
        const scrollable = Math.max(1, actHeight - chipHeight);
        const progress = Math.max(0, Math.min(1, -actRect.top / scrollable));
        const fillEl = parentAct.querySelector(".act-progress-fill") as HTMLElement | null;
        if (fillEl) {
          fillEl.style.transform = `scaleX(${progress.toFixed(4)})`;
        }

        newActProgress[parentAct.id] = progress;
        if (activeBlockIdStr) {
          newActiveBlockId[parentAct.id] = activeBlockIdStr;
        }

        const titleEl = parentAct.querySelector(".act-arrival-title") as HTMLElement | null;
        const chipInner = parentAct.querySelector(".act-chip-inner") as HTMLElement | null;
        const lastBlockEl = blocks.length > 0 ? (blocks[blocks.length - 1] as HTMLElement) : null;
        if (chipInner) {
          const fadeBand = 40;
          const headerHeight = headerContainer ? headerContainer.offsetHeight : chipHeight;
          const titleBottom = titleEl ? titleEl.getBoundingClientRect().bottom : actRect.top;
          const fadeIn = Math.max(0, Math.min(1, (fadeBand - titleBottom) / fadeBand));
          let fadeOut = 1;
          if (lastBlockEl) {
            const lastBottom = lastBlockEl.getBoundingClientRect().bottom;
            fadeOut = Math.max(0, Math.min(1, (lastBottom - headerHeight) / fadeBand));
          }
          chipInner.style.opacity = (fadeIn * fadeOut).toFixed(3);
        }
      });

      if (Object.keys(newActiveBlocks).length > 0) {
        setActiveBlocks((prev) => {
          let hasChanged = false;
          for (const key in newActiveBlocks) {
            if (prev[key] !== newActiveBlocks[key]) {
              hasChanged = true;
              break;
            }
          }
          if (hasChanged) {
            return { ...prev, ...newActiveBlocks };
          }
          return prev;
        });
      }

      if (Object.keys(newActProgress).length > 0) {
        setActProgress((prev) => {
          let hasChanged = false;
          for (const key in newActProgress) {
            if (Math.abs((prev[key] || 0) - newActProgress[key]) > 0.01) {
              hasChanged = true;
              break;
            }
          }
          return hasChanged ? { ...prev, ...newActProgress } : prev;
        });
      }

      if (Object.keys(newActiveBlockId).length > 0) {
        setActiveBlockId((prev) => {
          let hasChanged = false;
          for (const key in newActiveBlockId) {
            if (prev[key] !== newActiveBlockId[key]) {
              hasChanged = true;
              break;
            }
          }
          return hasChanged ? { ...prev, ...newActiveBlockId } : prev;
        });
      }
    } finally {
      ticking = false;
    }
  });
};

window.addEventListener("scroll", handleScroll, { passive: true });
window.addEventListener("resize", handleScroll);

// Run once on mount to initialize masks
handleScroll();

return () => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleScroll);
};
}, []);

const handleScrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const chapterVariants = {
hidden: { opacity: 0, y: 40 },
visible: { 
opacity: 1, 
y: 0, 
transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
}
};

// Prevent scroll when deep dive is open
useEffect(() => {
if (deepDiveData) {
document.body.style.overflow = 'hidden';
} else {
document.body.style.overflow = '';
}
return () => {
document.body.style.overflow = '';
};
}, [deepDiveData]);

return (
<>
<div className="flex flex-col w-full space-y-8 lg:space-y-12 pb-16">

{/* SECTION 0: Hero & Hook */}
<section 
id="hero"
className="-mt-12 lg:-mt-20 flex flex-col items-center relative overflow-hidden bg-background"
style={{
width: "calc(100vw - var(--scrollbar-width, 0px))",
marginLeft: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
marginRight: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
}}
>
{/* ... Hero Content ... */}
<div className="w-full flex flex-col lg:justify-center items-center text-center relative pt-6 lg:pt-12 pb-6 lg:pb-8 px-6 lg:px-16">
<div className="absolute top-[25px] left-[20px] w-6 h-6 pointer-events-none select-none flex items-center justify-center">
<div className="absolute w-4 h-[2px] bg-primary/30" /><div className="absolute w-[2px] h-4 bg-primary/30" />
</div>
<div className="absolute top-[25px] right-[20px] w-6 h-6 pointer-events-none select-none flex items-center justify-center">
<div className="absolute w-4 h-[2px] bg-primary/30" /><div className="absolute w-[2px] h-4 bg-primary/30" />
</div>

<div className="absolute top-8 left-8 text-left select-none hidden xl:block max-w-[280px]">
<div className="relative pt-0 space-y-4">
<span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest block leading-none pl-6">SINTIENS LAB</span>
<div className="relative pl-6 text-[11px] text-on-surface-variant font-light space-y-1.5 leading-relaxed border-l-2 border-primary/30">
<p>• Proyecto iniciado: Mayo 2026</p><p>• Enfoque: Empírico-racional</p><p>• Código abierto e independiente</p>
</div>
</div>
</div>

<div className="absolute top-8 right-8 text-right select-none hidden xl:block max-w-[280px]">
<div className="relative pt-0 space-y-4">
<span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest block leading-none pr-6">ESTADO DEL SISTEMA</span>
<div className="relative pr-6 text-[11px] text-on-surface-variant font-light space-y-1.5 leading-relaxed border-r-2 border-primary/30">
<p>Versión Alpha •</p><p>Desarrollo y revisión asistidos por IA •</p><p>Sujeto a posibles inexactitudes •</p>
</div>
</div>
</div>

        {/* Ambient Glows */}
        <div className="absolute inset-x-0 top-[-10%] bottom-[-10%] z-0 pointer-events-none opacity-80">
          <div className="absolute top-[-5%] left-[-2vw] w-[600px] h-[600px] animate-float-1">
            <AmbientGlow colorClass="bg-ch4" className="w-full h-full" opacity={0.3} />
          </div>
          <div className="absolute top-[30%] right-[-5vw] w-[700px] h-[700px] animate-float-2">
            <AmbientGlow colorClass="bg-ch1" className="w-full h-full" opacity={0.3} />
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

<div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
<span className="font-serif font-bold leading-none text-zinc-900 dark:text-zinc-100 blur" style={{ fontSize: "clamp(160px, 50vw, 600px)", opacity: 0.08, transform: "translateY(-20%)" }}>¿</span>
</div>

<div className="flex-1 lg:flex-none flex flex-col justify-center items-center w-full">
  {/* Title and Subtitle Section */}
  <div className="space-y-2 lg:space-y-4 max-w-3xl w-full text-center relative z-10 mt-2 lg:mt-4">
    <motion.h1 initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18 } } }} className="text-[clamp(42px,8.5vw,80px)] font-bold tracking-tight font-heading leading-[1.05] text-on-background select-none">
      <motion.span variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }} className="block sm:inline-block">
        ¿Qué vidas merecen&nbsp;
      </motion.span>
      <motion.span variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }} className="italic font-light text-secondary font-serif relative block sm:inline-block mt-2 sm:mt-0">
        consideración moral?
      </motion.span>
    </motion.h1>
    <p className="max-w-2xl mx-auto pt-1 font-serif italic font-light text-on-surface-variant/70 leading-relaxed text-[14px] sm:text-[16px] md:text-[18px] lg:text-[19px] text-center tracking-normal select-none">
      Una mirada a la relación que mantenemos con los demás animales,<br className="hidden sm:inline" /> 
      y a lo que la evidencia tiene que decir al respecto.
    </p>
  </div>

  {/* Crystalline Glass Card for Focus Columns Section */}
  <div className="w-full max-w-7xl px-6 lg:px-16 mt-8 lg:mt-12 relative z-10 font-sans font-light leading-relaxed">
    {/* Desktop View */}
    <div 
      className="hidden lg:block glass-enhance border border-outline-variant/35 rounded-3xl p-10 lg:p-12 w-full relative z-10 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none"
    >
      <div className="grid grid-cols-3 gap-12 lg:gap-16 w-full divide-x divide-outline-variant/30">
        <div className="flex relative pt-0 text-left flex-col items-start px-4 first:pl-0">
          <span className="text-[10px] font-mono font-bold text-primary select-none tracking-widest uppercase block leading-none mb-4 opacity-60">[ EL DESAFÍO ]</span>
          <div className="relative text-[13px] text-on-surface-variant/90 leading-relaxed font-sans font-light">
            <p>La información científica, ética y ecológica está hoy más disponible que nunca, pero se presenta dispersa, fragmentada y a menudo polarizada.</p>
          </div>
        </div>

        <div className="flex relative pt-0 text-left flex-col items-start px-8">
          <span className="text-[10px] font-mono font-bold text-primary select-none tracking-widest uppercase block leading-none mb-4 opacity-60">[ ÁREAS DE ANÁLISIS ]</span>
          <div className="relative text-[13px] text-on-surface-variant/90 leading-relaxed font-sans font-light w-full">
            <p>Seis bloques interactivos que estructuran la evidencia desde la neurobiología y el impacto ecológico hasta la regulación legal y los dilemas éticos.</p>
          </div>
        </div>

        <div className="flex relative pt-0 text-left flex-col items-start px-8 last:pr-0">
          <span className="text-[10px] font-mono font-bold text-primary select-none tracking-widest uppercase block leading-none mb-4 opacity-60">[ EL PROPÓSITO ]</span>
          <div className="relative text-[13px] text-on-surface-variant/90 leading-relaxed font-sans font-light">
            <p>Estructurar y ordenar esa evidencia de forma sistemática y transparente, facilitando un espacio de deconstrucción moral para que cada persona explore y decida con total autonomía.</p>
          </div>
        </div>
      </div>
    </div>

    {/* Mobile View */}
    <div className="lg:hidden w-full flex flex-col items-center">
      <button
        onClick={() => setShowMobileInfo(!showMobileInfo)}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-outline-variant/30 text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all bg-surface-dim/20 hover:bg-surface-dim/40 active:scale-[0.98] cursor-pointer"
      >
        <Info className="w-3.5 h-3.5 opacity-85" />
        <span>{showMobileInfo ? "Ocultar Enfoque" : "Ver Enfoque"}</span>
        <ChevronDown className={`w-3.5 h-3.5 opacity-85 transition-transform duration-300 ${showMobileInfo ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {showMobileInfo && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 20 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full overflow-hidden"
          >
            <div 
              className="flex flex-col gap-6 p-6 sm:p-8 glass-enhance border border-outline-variant/35 rounded-2xl text-left relative z-10 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold text-primary select-none tracking-widest uppercase block leading-none opacity-60">[ EL DESAFÍO ]</span>
                <p className="text-[13px] text-on-surface-variant/90 leading-relaxed">
                  La información científica, ética y ecológica está hoy más disponible que nunca, pero se presenta dispersa, fragmentada y a menudo polarizada.
                </p>
              </div>

              <div className="border-t border-outline-variant/20 pt-6 space-y-2">
                <span className="text-[10px] font-mono font-bold text-primary select-none tracking-widest uppercase block leading-none opacity-60">[ ÁREAS DE ANÁLISIS ]</span>
                <p className="text-[13px] text-on-surface-variant/90 leading-relaxed font-sans font-light">
                  Seis bloques interactivos que estructuran la evidencia desde la neurobiología y el impacto ecológico hasta la regulación legal y los dilemas éticos.
                </p>
              </div>

              <div className="border-t border-outline-variant/20 pt-6 space-y-2">
                <span className="text-[10px] font-mono font-bold text-primary select-none tracking-widest uppercase block leading-none opacity-60">[ EL PROPÓSITO ]</span>
                <p className="text-[13px] text-on-surface-variant/90 leading-relaxed font-sans font-light">
                  Estructurar y ordenar esa evidencia de forma sistemática y transparente, facilitando un espacio de deconstrucción moral para que cada persona explore y decida con total autonomía.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </div>
</div>

<div className="w-full flex justify-center pt-4 lg:pt-6 select-none relative z-10">
<motion.div className="text-primary/50 cursor-pointer" animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>
<ChevronDown className="w-5 h-5" />
</motion.div>
</div>

<div className="w-full relative z-10 px-6 lg:px-16 max-w-7xl mx-auto pt-2 lg:pt-4">
  <TabNav activeTab={activeTab} onNavigate={onNavigate} theme={theme} onToggleTheme={onToggleTheme} />
</div>

<div className="absolute bottom-[20px] left-[20px] w-6 h-6 pointer-events-none select-none flex items-center justify-center">
<div className="absolute w-4 h-[2px] bg-primary/30" /><div className="absolute w-[2px] h-4 bg-primary/30" />
</div>
<div className="absolute bottom-[20px] right-[20px] w-6 h-6 pointer-events-none select-none flex items-center justify-center">
<div className="absolute w-4 h-[2px] bg-primary/30" /><div className="absolute w-[2px] h-4 bg-primary/30" />
</div>
</div>

<div className="mt-2 w-full text-left relative z-10 pt-2 px-2 pb-2">
<SocraticReflection />
</div>
</section>

<div 
  id="intro" 
  className="w-full scroll-mt-0 relative overflow-visible"
  style={{
    width: "calc(100vw - var(--scrollbar-width, 0px))",
    marginLeft: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
    marginRight: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
  }}
>
  {/* Spread out Background Shapes - Unconfined, covers entire intro section */}
  <div className="absolute inset-x-0 top-[-100px] bottom-[-100px] z-0 pointer-events-none opacity-60">
    <div className="absolute top-[-50px] left-[-5vw] w-[500px] h-[500px] animate-float-1">
      <AmbientGlow colorClass="bg-ch1" className="w-full h-full" opacity={0.3} />
    </div>
    <div className="absolute bottom-[20px] right-[-5vw] w-[650px] h-[650px] animate-float-2">
      <AmbientGlow colorClass="bg-ch4" className="w-full h-full" opacity={0.2} />
    </div>
    <div className="absolute top-[30%] left-[8vw] w-[450px] h-[450px] animate-float-3">
      <AmbientGlow colorClass="bg-ch5" className="w-full h-full" opacity={0.3} />
    </div>
    <div className="absolute top-[-80px] right-[10vw] w-[550px] h-[550px] animate-float-4">
      <AmbientGlow colorClass="bg-ch2" className="w-full h-full" opacity={0.3} />
    </div>
    <div className="absolute bottom-[50px] left-[20vw] w-[400px] h-[400px] animate-float-5">
      <AmbientGlow colorClass="bg-ch3" className="w-full h-full" opacity={0.3} />
    </div>
    <div className="absolute top-[40%] right-[25vw] w-[480px] h-[480px] animate-float-6">
      <AmbientGlow colorClass="bg-ch6" className="w-full h-full" opacity={0.3} />
    </div>
  </div>

  <div className="w-full max-w-7xl mx-auto px-6 lg:px-16 pt-0 relative z-10">
    <div className="relative w-full text-center mb-8 lg:mb-12 pb-10 lg:pb-12 pt-6 lg:pt-8 px-4">
      <div className="relative z-10 space-y-6 lg:space-y-8 max-w-4xl mx-auto">
        {/* Restored Hero Details */}
        <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest block leading-none mb-4 drop-shadow-md">
          [ MODO LECTURA • ÍNDICE ]
        </span>
        <h2 className="text-[clamp(44px,6vw,72px)] font-serif tracking-tight leading-[1.05] text-on-background mb-8 drop-shadow-2xl">
          Conceptos & Principios Fundamentales
        </h2>
        <div className="text-[15px] md:text-[18px] lg:text-[21px] text-on-surface-variant/80 leading-[1.7] font-serif italic max-w-3xl mx-auto space-y-4">
          <p>Este es un apartado genérico y sintetizado de las principales áreas de estudio. Su propósito es servir como una lectura introductoria; desde aquí, podrás profundizar muchísimo más en cada temática.</p>
        </div>
      </div>
    </div>

    {/* Frosted Glass Index Card */}
    <div 
      className="glass-enhance border border-outline-variant/35 rounded-3xl p-6 sm:p-8 lg:p-10 w-full relative z-10 before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-container/25 dark:before:bg-surface-container/12 before:backdrop-blur-xl before:z-[-1] before:pointer-events-none"
    >
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-8 md:gap-x-12 gap-y-4 lg:gap-y-6">
        {actsData.map((act) => (
          <div 
            key={`idx-${act.id}`}
            onClick={() => handleScrollTo(act.id)}
            className="group relative py-2 px-2 sm:py-3 sm:px-4 lg:py-4 transition-all duration-500 cursor-pointer flex flex-col items-start text-left"
          >
            {/* Confined, morphing individual act glow */}
            <AmbientGlow 
              colorClass={act.colorName} 
              className="w-[160%] h-[240px] sm:h-[280px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 pointer-events-none" 
              opacity={0.20} 
            />

            <div className="relative z-10 w-full">
              <span className={`text-[9px] sm:text-[10px] font-mono font-bold ${act.textColor} uppercase tracking-widest block leading-none mb-2 sm:mb-3 group-hover:translate-x-1 transition-transform duration-300`}>
                [ ACTO {act.num} ]
              </span>
              <h3 className={`text-sm sm:text-base md:text-xl font-bold font-heading text-on-background mb-1 sm:mb-2 transition-colors duration-300 ${act.hoverColor}`}>
                {act.label}
              </h3>
              <p className="hidden sm:block text-[13px] font-sans font-light text-on-surface-variant/60 group-hover:text-on-surface-variant/90 transition-colors duration-300 leading-relaxed m-0">
                {act.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

<div className="border-b border-outline-variant/20 mt-12 mb-4" />
</div>
</div>



{/* Acto 0: Introducción */}
{(() => {
const act0 = {
id: "acto-0",
num: "0",
title: "Comprender a los Animales",
textColor: "text-primary",
colorName: "bg-primary",
blocks: [
      {
        id: "intro-trip",
        title: "Un Viaje a través de la Ciencia, la Ética, la Mente y el Planeta",
        content: (
          <div className="space-y-6">
            <p>Nuestra relación con el resto de los animales es uno de los temas más fascinantes, contradictorios y profundos de nuestro tiempo. Durante siglos, la humanidad ha convivido con ellos, los ha amado, los ha temido y los ha utilizado, a menudo sin detenerse a pensar en quiénes son realmente.</p>
            <p>Para entender este complejo escenario de verdad, no podemos mirar desde una sola ventana. Necesitamos conectar varias piezas fundamentales: qué ha descubierto la biología sobre lo que sienten, qué nos dice la filosofía sobre lo que es justo, cómo engaña la psicología a nuestra propia mente, cómo están diseñados nuestros sistemas de producción, qué impacto tiene esto en la supervivencia del planeta y hacia dónde nos lleva el futuro legal y tecnológico.</p>
            <p>Este es un viaje paso a paso para desentrañar este gran rompecabezas.</p>
          </div>
        ),
        keyIdea: "Nuestra relación con los animales solo se entiende cruzando seis ventanas a la vez: biología, ética, psicología, sistemas, ecología y futuro legal.",
        analogy: { text: "Es como armar un rompecabezas del que hasta ahora solo habíamos mirado unas pocas piezas: la imagen completa exige girar la mesa y verlas todas." },
        pullQuote: "No podemos mirar desde una sola ventana.",
        reflectionQuestion: {
          question: "¿Qué ventana has mirado menos hasta ahora, y qué crees que te impide abrirla?",
          prompt: "Anota mentalmente la primera respuesta; la reutilizaremos al final del recorrido."
        }
      }
]
};
const isActive = activeChapter === act0.id;
const isFlashing = flashChapter === act0.id;

  return (
    <div key={act0.id} id={act0.id} className="w-full scroll-mt-0 relative overflow-visible" style={{
      width: "calc(100vw - var(--scrollbar-width, 0px))",
      marginLeft: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
      marginRight: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
    }}>
      <div className="absolute inset-y-0 right-[-5%] md:right-[5%] flex items-center justify-end pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
        <span className={`font-serif font-bold leading-none ${act0.textColor}`} style={{ fontSize: "clamp(250px, 40vw, 600px)", opacity: 0.03, transform: "translateY(-5%)" }}>
          {act0.num}
        </span>
      </div>

      <AmbientGlow colorClass={act0.colorName} className={`animate-float-1 w-[900px] h-[700px] top-[-10%] left-[-20%] transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-20'}`} opacity={0.2} />
      <AmbientGlow colorClass={act0.colorName} className={`animate-float-3 w-[700px] h-[600px] bottom-[5%] right-[-15%] transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-20'}`} opacity={0.15} />
      <AmbientGlow colorClass={act0.colorName} className={`animate-float-5 w-[500px] h-[500px] top-[30%] left-[30%] transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-20'}`} opacity={0.12} />

      {/* Title (normal flow) + slim sticky chip + blocks */}
      <div className="relative w-full">
        {/* Arrival title — normal flow so it scrolls away, freeing vertical space while reading */}
        <div className="act-arrival-title w-full px-3 md:px-6 xl:pl-20 xl:pr-4 pt-2 lg:pt-3 pb-0">
          <span className={`text-[12px] md:text-[14px] font-mono font-bold ${act0.textColor} uppercase tracking-widest block leading-none mb-1`}>
            [ ACTO {act0.num} ]
          </span>
          <h2 className="text-[clamp(32px,5vw,56px)] font-bold tracking-tight font-heading leading-tight text-on-background pr-24 xl:pr-40">
            {act0.title}
          </h2>
        </div>
        {/* Sticky TTS button — joins the sticky block at top-0 */}
        <div className="sticky top-0 z-30 w-full pointer-events-none -mt-[52px] mb-[52px]">
          <div className="flex justify-end items-center pointer-events-none pr-3 md:pr-6 xl:pl-20 xl:pr-4">
            <div className="pointer-events-auto mr-5 xl:mr-20">
              <ReadingUtilities
                actId={act0.id}
                actColor={act0.textColor}
                blocks={act0.blocks}
                activeBlockId={activeBlockId[act0.id] || act0.blocks[0]?.id || ""}
              />
            </div>
          </div>
        </div>
        {/* Slim sticky orientation chip — pinned while reading: act + current block + progress.
            Invisible while the arrival title is in view; fades in once the title scrolls off. */}
        <div className="sticky top-0 z-20 w-full pointer-events-none act-sticky-header">
          <div className="act-chip-inner opacity-0">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-outline-variant/10 pointer-events-none">
              <div className="act-progress-fill h-full origin-left transition-transform duration-200 ease-out will-change-transform" style={{ backgroundColor: "var(--primary)" }} />
            </div>
            <div className="w-full px-3 md:px-6 xl:pl-20 xl:pr-4 pt-0 pb-0 pointer-events-auto">
              <div className="flex items-center gap-3 min-h-[20px]">
                <span className={`text-[11px] md:text-[12px] font-mono font-bold ${act0.textColor} uppercase tracking-widest leading-none whitespace-nowrap`}>
                  [ ACTO {act0.num} ]
                </span>
                <span className="text-on-surface-variant/30 select-none hidden sm:inline">·</span>
                <AnimatePresence mode="wait">
                  {(activeBlocks[act0.id] || act0.blocks.length === 1) && (
                    <motion.span
                      key={activeBlocks[act0.id] || act0.blocks[0].title}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className={`text-[11px] md:text-[12px] font-mono font-bold ${act0.textColor} uppercase tracking-[0.15em] leading-none truncate`}
                    >
                      {"<\u00a0"}{(activeBlocks[act0.id] || act0.blocks[0].title).toUpperCase()}{"\u00a0>"}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        <motion.section variants={chapterVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="relative z-10 pt-0 pb-3 lg:pb-4 w-full px-3 md:px-6 xl:pl-20 xl:pr-4">
          <div 
            className={`narrative-text-container relative w-full font-serif text-[18px] md:text-[20px] leading-[1.8] font-normal transition-colors duration-1000 ${isActive ? 'text-on-surface' : 'text-on-surface/35'} [&_p]:mb-5 [&_p:last-child]:mb-0`}
            style={{ 
              willChange: "mask-image, -webkit-mask-image",
              transform: "translate3d(0, 0, 0)",
              WebkitTransform: "translate3d(0, 0, 0)"
            }}
          >
            {act0.blocks.map((block, blockIndex) => (
              <div key={block.id} className="mb-10 last:mb-0 narrative-block" data-block-title={block.title} data-block-id={block.id}>
                {!(act0.blocks.length === 1 && blockIndex === 0) && (
                  <span className={`text-[12px] md:text-[14px] font-mono font-bold ${act0.textColor} uppercase tracking-[0.15em] block leading-normal ${blockIndex === 0 ? 'mt-2' : 'mt-12'} mb-4`}>
                    {"<\u00a0"}{block.title.toUpperCase()}{"\u00a0>"}
                  </span>
                )}

                <div className="mb-2">
                  <StoryTextRenderer
                    content={block.content}
                    activeNoteId={activeNotesByAct[act0.id]?.id || null}
                    activeInstanceId={activeNotesByAct[act0.id]?.instanceId || null}
                    onHoverNote={(e, id, item, type) => handleHoverNote(e, id, item, type, act0.id)}
                    onLeaveNote={handleLeaveNote}
                    onClickNote={(e, id, item, type, instId) => handleClickNote(e, id, item, type, act0.id, act0.textColor, instId)}
                    accentColor="primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
})()}

{/* Render each Act dynamically */}
{actsData.map((act, index) => {
const isActive = activeChapter === act.id;
const isFlashing = flashChapter === act.id;
const actAccent = act.textColor ? act.textColor.replace("text-", "") : "primary";
const actAccentVar = actAccent === "primary" ? "var(--primary)" : `var(--${actAccent})`;

return (
<div key={act.id} id={act.id} className="w-full scroll-mt-0 relative overflow-visible" style={{
  width: "calc(100vw - var(--scrollbar-width, 0px))",
  marginLeft: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
  marginRight: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
}}>
<div className="absolute inset-y-0 right-[-5%] md:right-[5%] flex items-center justify-end pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
<span className={`font-serif font-bold leading-none ${act.textColor}`} style={{ fontSize: "clamp(250px, 40vw, 600px)", opacity: 0.03, transform: "translateY(-5%)" }}>
{act.num}
</span>
</div>

<AmbientGlow colorClass={act.colorName} className={`animate-float-${(index % 6) + 1} w-[900px] h-[700px] top-[-10%] left-[-20%] transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-20'}`} opacity={0.25} />
<AmbientGlow colorClass={act.colorName} className={`animate-float-${((index + 1) % 6) + 1} w-[950px] h-[700px] bottom-[5%] right-[-15%] transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-20'}`} opacity={0.25} />
<AmbientGlow colorClass={act.colorName} className={`animate-float-${((index + 2) % 6) + 1} w-[650px] h-[550px] top-[20%] left-[25%] transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-20'}`} opacity={0.18} />
<AmbientGlow colorClass={act.colorName} className={`animate-float-${((index + 3) % 6) + 1} w-[700px] h-[600px] top-[40%] right-[-8%] transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-20'}`} opacity={0.18} />

{/* Title (normal flow) + slim sticky chip + blocks */}
<div className="relative w-full">
  {/* Arrival title — normal flow, scrolls away to free vertical space while reading */}
  <div className="act-arrival-title w-full px-3 md:px-6 xl:pl-20 xl:pr-4 pt-2 lg:pt-3 pb-0">
    <span className={`text-[12px] md:text-[14px] font-mono font-bold ${act.textColor} uppercase tracking-widest block leading-none mb-2 transition-transform duration-700 origin-left ${isFlashing ? 'scale-110' : 'scale-100'}`}>
      [ ACTO {act.num} ]
    </span>
    <h2 className="text-[clamp(32px,5vw,56px)] font-bold tracking-tight font-heading leading-tight text-on-background pr-24 xl:pr-40">
      {act.title}
    </h2>
  </div>
  {/* Sticky TTS button — joins the sticky block at top-0 */}
  <div className="sticky top-0 z-30 w-full pointer-events-none -mt-[52px] mb-[52px]">
    <div className="flex justify-end items-center pointer-events-none pr-3 md:pr-6 xl:pl-20 xl:pr-4">
      <div className="pointer-events-auto mr-5 xl:mr-20">
        <ReadingUtilities
          actId={act.id}
          actColor={act.textColor}
          blocks={act.blocks}
          activeBlockId={activeBlockId[act.id] || act.blocks[0]?.id || ""}
        />
      </div>
    </div>
  </div>
  {/* Slim sticky orientation chip — pinned while reading.
      Invisible while the arrival title is in view; fades in once the title scrolls off. */}
  <div className="sticky top-0 z-20 w-full pointer-events-none act-sticky-header">
    <div className="act-chip-inner opacity-0">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-outline-variant/10 pointer-events-none">
        <div className="act-progress-fill h-full origin-left transition-transform duration-200 ease-out will-change-transform" style={{ backgroundColor: actAccentVar }} />
      </div>
      <div className="w-full px-3 md:px-6 xl:pl-20 xl:pr-4 pt-0 pb-0 pointer-events-auto">
        <div className="flex items-center gap-3 min-h-[20px]">
          <span className={`text-[11px] md:text-[12px] font-mono font-bold ${act.textColor} uppercase tracking-widest leading-none whitespace-nowrap transition-transform duration-700 origin-left ${isFlashing ? 'scale-110' : 'scale-100'}`}>
            [ ACTO {act.num} ]
          </span>
          <span className="text-on-surface-variant/30 select-none hidden sm:inline">·</span>
          <AnimatePresence mode="wait">
            {(activeBlocks[act.id] || act.blocks.length === 1) && (
              <motion.span
                key={activeBlocks[act.id] || act.blocks[0].title}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`text-[11px] md:text-[12px] font-mono font-bold ${act.textColor} uppercase tracking-[0.15em] leading-none truncate`}
              >
                {"<\u00a0"}{(activeBlocks[act.id] || act.blocks[0].title).toUpperCase()}{"\u00a0>"}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  </div>

  <motion.section variants={chapterVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="relative z-10 pt-0 pb-3 lg:pb-4 w-full px-3 md:px-6 xl:pl-20 xl:pr-4">
    <div
      ref={(el) => { gridContainerRefsByAct.current[act.id] = el; }}
      className="grid grid-cols-1 lg:grid-cols-[1fr_240px] xl:grid-cols-[minmax(0,1fr)_300px] gap-8 lg:gap-10 xl:gap-14 items-stretch relative grid-container-relative"
    >

      {/* Center Column: Text (clean) */}
      <div
        ref={(el) => {
          ttsTargetRef.current = el;
          centerColumnRefsByAct.current[act.id] = el;
        }}
        className={`narrative-text-container relative w-full font-serif text-[18px] md:text-[20px] leading-[1.8] font-normal transition-colors duration-1000 ${isActive ? 'text-on-surface' : 'text-on-surface/35'} [&_p]:mb-5 [&_p:last-child]:mb-0 order-1`}
        style={{
          willChange: "mask-image, -webkit-mask-image",
          transform: "translate3d(0, 0, 0)",
          WebkitTransform: "translate3d(0, 0, 0)"
        }}
      >
        {act.blocks.map((block, blockIndex) => (
          <div key={block.id} className="mb-10 last:mb-0 narrative-block" data-block-title={block.title} data-block-id={block.id}>
            {!(act.blocks.length === 1 && blockIndex === 0) && (
              <span className={`text-[12px] md:text-[14px] font-mono font-bold ${act.textColor} uppercase tracking-[0.15em] block leading-normal ${blockIndex === 0 ? 'mt-2' : 'mt-12'} mb-4`}>
                {"<\u00a0"}{block.title.toUpperCase()}{"\u00a0>"}
              </span>
            )}

            <div className="mb-2">
              <StoryTextRenderer
                content={block.content}
                activeNoteId={activeNotesByAct[act.id]?.id || null}
                activeInstanceId={activeNotesByAct[act.id]?.instanceId || null}
                onHoverNote={(e, id, item, type) => handleHoverNote(e, id, item, type, act.id)}
                onLeaveNote={handleLeaveNote}
                onClickNote={(e, id, item, type, instId) => handleClickNote(e, id, item, type, act.id, act.textColor, instId)}
                accentColor={act.textColor.replace("text-", "")}
              />
            </div>

            {block.microQuiz && (
              <MicroQuiz quiz={block.microQuiz} accent={act.textColor.replace("text-", "")} />
            )}

            {block.deepDive && (
              <button
                onClick={() => setDeepDiveData({ actId: act.id, actNum: act.num, actColor: act.textColor, data: block.deepDive! })}
                className="text-sm md:text-[15px] font-medium italic text-on-surface-variant/60 hover:text-on-background transition-colors mt-4 block text-left cursor-pointer"
              >
                + Profundizar en {block.deepDive.label}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* SVG bezier line connecting clicked word to SideNoteCard (spans full grid) */}
      <AnimatePresence>
        {lineCoordsByAct[act.id] && (
          <motion.svg
            key={`svg-${act.id}`}
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            style={{ zIndex: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Glow halo behind the line */}
            <motion.path
              d={lineCoordsByAct[act.id]!.d}
              stroke="currentColor"
              className={`${act.textColor}`}
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              style={{ filter: "blur(4px)", opacity: 0.25 }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              exit={{ pathLength: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Main line */}
            <motion.path
              d={lineCoordsByAct[act.id]!.d}
              stroke="currentColor"
              className={`${act.textColor}`}
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              style={{ opacity: 0.85 }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              exit={{ pathLength: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Origin dot at the text edge with pulse */}
            <motion.circle
              cx={lineCoordsByAct[act.id]!.x1}
              cy={lineCoordsByAct[act.id]!.y1}
              r="4"
              className={`fill-current ${act.textColor}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.45, ease: "easeOut" }}
            />
            {/* Outer pulsing ring around origin dot */}
            <motion.circle
              cx={lineCoordsByAct[act.id]!.x1}
              cy={lineCoordsByAct[act.id]!.y1}
              r="4"
              className={`fill-current ${act.textColor}`}
              style={{ opacity: 0.4 }}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 2.5, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.svg>
        )}
      </AnimatePresence>

      {/* Right Rail (xl): Flowing enrichments + SideNoteCard at word's vertical position */}
      <div className="hidden xl:block relative w-full z-20 order-3">
        <ReadingEnrichments
          actColor={act.textColor}
          blocks={act.blocks}
        />

        {/* SideNoteCard positioned at the clicked word's vertical position */}
        <AnimatePresence>
          {activeNotesByAct[act.id] && (
            <motion.div
              key={`card-${act.id}-${activeNotesByAct[act.id].id}-${activeNotesByAct[act.id].instanceId || ""}`}
              ref={(el) => { sideNoteCardRefsByAct.current[act.id] = el; }}
              className="absolute left-0 right-16 z-20"
              style={{
                top: `${Math.max(20, activeNotesByAct[act.id].y - 80)}px`,
              }}
              initial={{ opacity: 0, x: 24, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 12, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            >
              <SideNoteCard
                item={activeNotesByAct[act.id].item}
                type={activeNotesByAct[act.id].type}
                actColor={act.textColor}
                onClose={() => {
                  setActiveNotesByAct(prev => {
                    const copy = { ...prev };
                    delete copy[act.id];
                    return copy;
                  });
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  </motion.section>
</div>
</div>
);
})}
</div>

<AnimatePresence>
{deepDiveData && (
<DeepDiveView 
actId={deepDiveData.actId}
actNum={deepDiveData.actNum}
actColor={deepDiveData.actColor}
data={deepDiveData.data}
onClose={() => setDeepDiveData(null)}
/>
)}
</AnimatePresence>

<AnimatePresence>
{mobileNote && (
  createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center pointer-events-auto select-none">
      {/* Dark glass backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setMobileNote(null)}
        className="absolute inset-0 bg-black/50 dark:bg-black/75 backdrop-blur-xs cursor-pointer"
      />
      {/* Bottom Sheet Card */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 26, stiffness: 240 }}
        className="relative w-full max-h-[75vh] overflow-y-auto bg-surface-container dark:bg-zinc-900 border-t border-surface-variant dark:border-zinc-800 p-6 rounded-t-3xl flex flex-col z-10 shadow-2xl text-left pointer-events-auto"
      >
        {/* Drag indicator */}
        <div className="w-12 h-1 rounded-full bg-zinc-350 dark:bg-zinc-800 mx-auto mb-4 shrink-0" />

        <div className="overflow-y-auto pb-4 select-text">
          <SideNoteCard 
             item={mobileNote.item} 
             type={mobileNote.type} 
             actColor={mobileNote.actColor}
             onClose={() => setMobileNote(null)}
          />
        </div>
      </motion.div>
    </div>,
    document.body
  )
)}
</AnimatePresence>

{/* Scroll Spy Sidebar - Desktop Only */}
{(() => {
const accentOf = (dotClass: string) => {
const name = dotClass.replace("bg-", "");
return name === "primary" ? "var(--primary)" : `var(--${name})`;
};

return (
<div className={`fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-2 transition-all duration-700 ${activeChapter ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 pointer-events-none'}`}>
{chaptersList.map((ch) => {
const isActive = activeChapter === ch.id;
const isVisited = visitedChapters.has(ch.id);
const accent = accentOf(ch.dotClass);

return (
<button
key={ch.id}
onClick={() => handleScrollTo(ch.id)}
className={`group relative flex items-center gap-3 py-1.5 pr-3 transition-all duration-300 cursor-pointer text-left ${
isActive
? `${ch.activeClass} font-bold opacity-100`
: 'text-zinc-500 dark:text-zinc-500 hover:text-zinc-300 opacity-70 hover:opacity-100'
}`}
>
{/* Subtle selection capsule behind active */}
{isActive && (
<span className="absolute -inset-x-1 -inset-y-1 rounded-full bg-surface-container/50 dark:bg-surface-container/25 pointer-events-none" />
)}
{/* Dot indicator: only the active act is colored; visited/unread stay neutral zinc (visited = brighter) */}
<span className="relative flex items-center justify-center w-1.5 h-1.5 shrink-0">
{isActive && (
<span className={`absolute inset-0 rounded-full opacity-40 animate-ping ${ch.dotClass}`} />
)}
<span
className={`relative w-1.5 h-1.5 rounded-full transition-all duration-300 ${
isActive
? `${ch.dotClass} scale-[2]`
: isVisited
? 'bg-zinc-400 dark:bg-zinc-500 scale-110'
: 'bg-zinc-400 dark:bg-zinc-600 group-hover:bg-zinc-300 dark:group-hover:bg-zinc-400'
}`}
style={isActive ? { boxShadow: `0 0 8px 0 color-mix(in oklch, ${accent} 55%, transparent)` } : undefined}
/>
</span>
{/* Roman / Arabic Numeral — only shown for the active act */}
<span className={`relative font-mono text-[10px] tracking-widest uppercase w-4 text-left transition-opacity duration-300 ${
isActive ? 'opacity-100' : 'opacity-0'
}`}>
{ch.num}
</span>
</button>
);
})}
</div>
);
})()}


</>
);
}
