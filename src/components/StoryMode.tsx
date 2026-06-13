import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Info } from "lucide-react";
import SocraticReflection from "./SocraticReflection";
import { actsData } from "../data/storyData";
import DeepDiveView from "./DeepDiveView";
import { DeepDiveData } from "../types/story";

const AmbientGlow = ({ 
colorClass, 
className = "",
opacity = 0.05
}: {
colorClass: string;
className?: string;
opacity?: number;
}) => {
const svgNoise = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;
const smoothGradient = "radial-gradient(closest-side, black 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 70%, rgba(0,0,0,0.05) 85%, transparent 100%)";

return (
<div className={`absolute pointer-events-none select-none z-0 ${className}`}>
<div 
className={`absolute inset-0 ${colorClass}`}
style={{
opacity: opacity,
maskImage: smoothGradient,
WebkitMaskImage: smoothGradient,
}}
>
<div 
className="absolute inset-0 mix-blend-overlay opacity-40" 
style={{ backgroundImage: svgNoise }} 
/>
</div>
</div>
);
};

interface StoryModeProps {
onNavigate: (tab: "grafo" | "cronologia" | "calculadora" | "dialectica" | "validador") => void;
}

export default function StoryMode({ onNavigate }: StoryModeProps) {
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
const observer = new IntersectionObserver(
(entries) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
if (entry.target.id === "hero" || entry.target.id === "intro") {
setActiveChapter(null);
} else {
setActiveChapter(entry.target.id);
}
}
});
},
{ rootMargin: "-20% 0px -40% 0px", threshold: 0.1 }
);

const elements = document.querySelectorAll('[id^="acto-"], #hero, #intro');
elements.forEach((c) => observer.observe(c));

const handleScroll = () => {
if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
setActiveChapter("acto-6");
}

const newActiveBlocks: Record<string, string> = {};

const els = document.querySelectorAll(".narrative-text-container");
els.forEach((el) => {
const element = el as HTMLElement;
// Encontrar la sección del acto padre para ubicar su h2
const parentAct = element.closest('[id^="acto-"]');
if (!parentAct) return;

const h2 = parentAct.querySelector("h2");
if (!h2) return;

const headerContainer = parentAct.querySelector(".act-sticky-header");
const headerRect = headerContainer ? headerContainer.getBoundingClientRect() : h2.getBoundingClientRect();
const textRect = element.getBoundingClientRect();

// relativeBottom es la posición inferior de la cabecera sticky relativa al top de este contenedor
const relativeBottom = headerRect.bottom - textRect.top;

if (relativeBottom <= 0) {
element.style.webkitMaskImage = "";
element.style.maskImage = "";
} else {
// Ajuste: -16 compensa el padding del contenedor sticky; 160px de rango para transición muy suave
const fadeStart = relativeBottom - 16;
const fadeEnd = relativeBottom + 144;

const maskVal = `linear-gradient(to bottom, transparent ${fadeStart}px, black ${fadeEnd}px)`;
element.style.webkitMaskImage = maskVal;
element.style.maskImage = maskVal;
}

// Detectar bloque activo para este acto
const blocks = parentAct.querySelectorAll(".narrative-block");
let activeTitle = "";
const stickyHeaderBottom = headerRect.bottom;

blocks.forEach((blockEl) => {
const subtitleEl = blockEl.querySelector("span");
const subtitleRect = subtitleEl ? subtitleEl.getBoundingClientRect() : blockEl.getBoundingClientRect();

// Si el subtítulo del bloque ha subido y cruzado el límite inferior de la cabecera sticky
if (subtitleRect.top <= stickyHeaderBottom) {
activeTitle = blockEl.getAttribute("data-block-title") || "";
}
});

// Guardar el título activo (o vacío para no duplicar si el primer subtítulo aún está visible)
newActiveBlocks[parentAct.id] = activeTitle || "";
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
};

window.addEventListener("scroll", handleScroll, { passive: true });
window.addEventListener("resize", handleScroll);

// Run once on mount to initialize masks
handleScroll();

return () => {
observer.disconnect();
window.removeEventListener("scroll", handleScroll);
window.removeEventListener("resize", handleScroll);
};
}, []);

const handleScrollTo = (id: string) => {
const el = document.getElementById(id);
if (el) {
el.scrollIntoView({ behavior: "smooth" });
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
<div className="min-h-[90vh] w-full flex flex-col lg:justify-center items-center text-center relative pt-12 lg:pt-20 pb-20 lg:pb-24 px-6 lg:px-16">
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
<div className="absolute w-[100vw] left-1/2 -translate-x-1/2 top-[-10%] bottom-[-10%] z-0 pointer-events-none opacity-80" style={{ maskImage: "radial-gradient(ellipse at top, black 0%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse at top, black 0%, transparent 100%)" }}>
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
<div className="space-y-4 lg:space-y-6 max-w-3xl w-full relative z-10 translate-y-6 lg:translate-y-8 mt-4 lg:mt-6">
<motion.h1 initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18 } } }} className="text-[clamp(34px,7.2vw,80px)] font-bold tracking-tight font-heading leading-[1.05] text-on-background select-none">
<motion.span variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }} className="block sm:inline-block">
¿Qué vidas merecen&nbsp;
</motion.span>
<motion.span variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }} className="italic font-light text-secondary font-serif relative block sm:inline-block mt-2 sm:mt-0">
consideración moral?
</motion.span>
</motion.h1>
<p className="max-w-2xl mx-auto pt-1 font-serif italic font-light text-on-surface-variant/70 leading-relaxed text-[17px] sm:text-[19px] text-center tracking-normal select-none">
Una mirada a la relación que mantenemos con los demás animales,<br className="hidden sm:inline" /> 
y a lo que la evidencia tiene que decir al respecto.
</p>
</div>

{/* Desktop View: Keep the original 3 columns inside a matching glassmorphic card */}
<div className="hidden lg:block w-full max-w-7xl px-6 lg:px-16 mt-12 relative z-10 font-sans font-light leading-relaxed">
<div className="border border-outline-variant/60 rounded-3xl bg-surface-dim/30 dark:bg-surface-dim/15 backdrop-blur-md p-10 lg:p-12 shadow-lg shadow-black/[0.02] dark:shadow-none w-full">
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
</div>

{/* Mobile View: Collapsible Button + Accordion Card */}
<div className="lg:hidden w-full max-w-lg px-6 mt-16 mb-6 relative z-10 flex flex-col items-center">
<button
onClick={() => setShowMobileInfo(!showMobileInfo)}
className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-outline-variant text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-all bg-surface-dim/50 hover:bg-surface-dim active:scale-[0.98] cursor-pointer shadow-sm shadow-black/5"
>
<Info className="w-3.5 h-3.5 opacity-85" />
<span>{showMobileInfo ? "Ocultar Enfoque" : "Ver Enfoque"}</span>
<ChevronDown className={`w-3.5 h-3.5 opacity-85 transition-transform duration-300 ${showMobileInfo ? 'rotate-180' : ''}`} />
</button>

<AnimatePresence>
{showMobileInfo && (
<motion.div
initial={{ height: 0, opacity: 0, marginTop: 0 }}
animate={{ height: "auto", opacity: 1, marginTop: 24 }}
exit={{ height: 0, opacity: 0, marginTop: 0 }}
transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
className="w-full overflow-hidden"
>
<div className="flex flex-col gap-6 p-6 sm:p-8 border border-outline-variant/60 rounded-2xl bg-surface-dim/30 dark:bg-surface-dim/15 backdrop-blur-md text-left shadow-lg shadow-black/[0.02] dark:shadow-none">
<div className="space-y-2">
<span className="text-[10px] font-mono font-bold text-primary select-none tracking-widest uppercase block leading-none opacity-60">[ EL DESAFÍO ]</span>
<p className="text-[13px] text-on-surface-variant/90 leading-relaxed font-sans font-light">
La información científica, ética y ecológica está hoy más disponible que nunca, pero se presenta dispersa, fragmentada y a menudo polarizada.
</p>
</div>

<div className="border-t border-outline-variant/30 pt-6 space-y-2">
<span className="text-[10px] font-mono font-bold text-primary select-none tracking-widest uppercase block leading-none opacity-60">[ ÁREAS DE ANÁLISIS ]</span>
<p className="text-[13px] text-on-surface-variant/90 leading-relaxed font-sans font-light">
Seis bloques interactivos que estructuran la evidencia desde la neurobiología y el impacto ecológico hasta la regulación legal y los dilemas éticos.
</p>
</div>

<div className="border-t border-outline-variant/30 pt-6 space-y-2">
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

<div className="w-full flex justify-center pt-8 lg:pt-16 select-none relative z-10">
<motion.div className="text-primary/50 cursor-pointer" animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>
<ChevronDown className="w-5 h-5" />
</motion.div>
</div>

<div className="mt-4 lg:mt-6 w-full relative z-10 px-6 lg:px-16">
<div className="py-2 flex flex-wrap items-center justify-center gap-1.5">
{([
{ tab: "grafo", label: "Ontología" },
{ tab: "cronologia", label: "Historia" },
{ tab: "dialectica", label: "Tesis" },
{ tab: "calculadora", label: "Impacto" },
{ tab: "validador", label: "IA" },
] as { tab: "grafo" | "cronologia" | "dialectica" | "calculadora" | "validador"; label: string }[]).map((item) => (
<button
key={item.tab}
onClick={() => onNavigate(item.tab)}
className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-md text-[10px] sm:text-[11px] uppercase font-mono tracking-widest transition-all duration-300 text-on-surface-variant hover:text-primary cursor-pointer active:scale-95"
>
{item.label}
</button>
))}
</div>
</div>

<div className="absolute bottom-[40px] left-[20px] w-6 h-6 pointer-events-none select-none flex items-center justify-center">
<div className="absolute w-4 h-[2px] bg-primary/30" /><div className="absolute w-[2px] h-4 bg-primary/30" />
</div>
<div className="absolute bottom-[40px] right-[20px] w-6 h-6 pointer-events-none select-none flex items-center justify-center">
<div className="absolute w-4 h-[2px] bg-primary/30" /><div className="absolute w-[2px] h-4 bg-primary/30" />
</div>
</div>

<div className="mt-2 w-full text-left relative z-10 pt-2 px-2 pb-2 lg:pb-4">
<SocraticReflection />
</div>
</section>

{/* INTRO BLOCK: Modo Lectura & Índice Principal */}
<div 
  id="intro" 
  className="w-full scroll-mt-24 relative overflow-visible"
  style={{
    width: "calc(100vw - var(--scrollbar-width, 0px))",
    marginLeft: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
    marginRight: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
  }}
>
  <div className="w-full px-3 md:px-6 xl:pl-20 xl:pr-4 pt-4">
<div className="relative w-full text-center mb-8 lg:mb-12 py-10 lg:py-12 px-4">
{/* Spread out Background Shapes */}
<div className="absolute w-[100vw] left-1/2 -translate-x-1/2 top-[-100px] bottom-[-100px] z-0 pointer-events-none opacity-60" style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 70%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 70%, transparent 100%)" }}>
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

<div className="relative z-10 space-y-8 max-w-4xl mx-auto">
{/* Restored Hero Details */}
<span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest block leading-none mb-4 drop-shadow-md">
[ MODO LECTURA ]
</span>
<h2 className="text-[clamp(40px,5.5vw,72px)] font-serif tracking-tight leading-[1.05] text-on-background mb-8 drop-shadow-2xl">
Conceptos & Principios Fundamentales
</h2>
<div className="text-[18px] md:text-[21px] text-on-surface-variant/80 leading-[1.7] font-serif italic max-w-3xl mx-auto space-y-4">
<p>Este es un apartado genérico y sintetizado de las principales áreas de estudio. Su propósito es servir como una lectura introductoria; desde aquí, podrás profundizar muchísimo más en cada temática.</p>
</div>
</div>
</div>

<div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-8 md:gap-x-12 gap-y-4 lg:gap-y-6">
{actsData.map((act) => (
<div 
key={`idx-${act.id}`}
onClick={() => handleScrollTo(act.id)}
className="group relative py-2 px-2 sm:py-3 sm:px-4 lg:py-4 transition-all duration-500 cursor-pointer flex flex-col items-start text-left"
>
<AmbientGlow 
colorClass={act.colorName} 
className="w-[150%] h-[200px] sm:h-[250px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
opacity={0.15} 
/>

<div className="relative z-10 w-full">
<span className={`text-[9px] sm:text-[10px] font-mono font-bold ${act.textColor} uppercase tracking-widest block leading-none mb-2 sm:mb-3 group-hover:scale-105 origin-left transition-transform duration-500`}>
[ ACTO {act.num} ]
</span>
<h3 className={`text-sm sm:text-base md:text-xl font-bold font-heading text-on-background mb-1 sm:mb-2 transition-colors duration-500 ${act.hoverColor}`}>
{act.label}
</h3>
<p className="hidden sm:block text-[13px] font-sans font-light text-on-surface-variant/60 group-hover:text-on-surface-variant/90 transition-colors duration-500 leading-relaxed m-0">
{act.desc}
</p>
</div>
</div>
))}
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
)
}
]
};
const isActive = activeChapter === act0.id;
const isFlashing = flashChapter === act0.id;

return (
<div key={act0.id} id={act0.id} className="w-full scroll-mt-24 relative overflow-visible" style={{
width: "calc(100vw - var(--scrollbar-width, 0px))",
marginLeft: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
marginRight: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
}}>
<div className="absolute inset-y-0 right-[-5%] md:right-[5%] flex items-center justify-end pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
<span className={`font-serif font-bold leading-none ${act0.textColor}`} style={{ fontSize: "clamp(250px, 40vw, 600px)", opacity: 0.03, transform: "translateY(-5%)" }}>
{act0.num}
</span>
</div>

<AmbientGlow colorClass={act0.colorName} className={`animate-float-1 w-[600px] h-[500px] top-[-5%] left-[-15%] transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-20'}`} opacity={0.1} />

{/* Sticky header placed outside motion.section to prevent CSS transforms from breaking position: sticky */}
<div className="sticky top-0 z-20 pt-2 lg:pt-3 pb-2 w-full pointer-events-none act-sticky-header">
<div className="w-full px-3 md:px-6 xl:pl-20 xl:pr-4 pointer-events-auto">
<span className={`text-[12px] md:text-[14px] font-mono font-bold ${act0.textColor} uppercase tracking-widest block leading-none mb-3`}>
[ ACTO {act0.num} ]
</span>
<h2 className="text-[clamp(32px,5vw,56px)] font-bold tracking-tight font-heading leading-tight text-on-background">
{act0.title}
</h2>
{/* Subtitle slot — reserved height on xl to prevent layout shift */}
<div className="xl:min-h-[20px] overflow-hidden transition-all duration-300 ease-out" style={{ height: activeBlocks[act0.id] ? 'auto' : undefined }}>
{activeBlocks[act0.id] ? (
  <motion.span
    key={activeBlocks[act0.id]}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.35, ease: "easeOut" }}
    className={`text-[11px] md:text-[12px] font-mono font-bold ${act0.textColor} uppercase tracking-[0.15em] block mt-2`}
  >
    &lt; {activeBlocks[act0.id].toUpperCase()} &gt;
  </motion.span>
) : (
  <span className="hidden xl:block text-[12px] mt-2 opacity-0 pointer-events-none select-none">&nbsp;</span>
)}
</div>
</div>
</div>

<motion.section variants={chapterVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="relative z-10 pt-2 pb-3 lg:pb-4 w-full px-3 md:px-6 xl:pl-20 xl:pr-4">
<div 
className={`narrative-text-container relative w-full font-serif text-[18px] md:text-[20px] leading-[1.8] font-normal transition-colors duration-1000 ${isActive ? 'text-on-surface' : 'text-on-surface/35'} [&_p]:mb-5 [&_p:last-child]:mb-0`}
style={{ 
willChange: "mask-image, -webkit-mask-image",
transform: "translate3d(0, 0, 0)",
WebkitTransform: "translate3d(0, 0, 0)"
}}
>
{act0.blocks.map((block, blockIndex) => (
<div key={block.id} className="mb-10 last:mb-0 narrative-block" data-block-title={block.title}>
<span className={`text-[12px] md:text-[14px] font-mono font-bold ${act0.textColor} uppercase tracking-[0.2em] block leading-normal ${blockIndex === 0 ? 'mt-2' : 'mt-12'} mb-4`}>
&lt; {block.title.toUpperCase()} &gt;
</span>

<div className="mb-2">
{block.content}
</div>
</div>
))}
</div>
</motion.section>
</div>
);
})()}

{/* Render each Act dynamically */}
{actsData.map((act, index) => {
const isActive = activeChapter === act.id;
const isFlashing = flashChapter === act.id;

return (
<div key={act.id} id={act.id} className="w-full scroll-mt-24 relative overflow-visible" style={{
  width: "calc(100vw - var(--scrollbar-width, 0px))",
  marginLeft: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
  marginRight: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
}}>
<div className="absolute inset-y-0 right-[-5%] md:right-[5%] flex items-center justify-end pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
<span className={`font-serif font-bold leading-none ${act.textColor}`} style={{ fontSize: "clamp(250px, 40vw, 600px)", opacity: 0.03, transform: "translateY(-5%)" }}>
{act.num}
</span>
</div>

<AmbientGlow colorClass={act.colorName} className={`animate-float-${(index % 6) + 1} w-[600px] h-[500px] top-[-5%] left-[-15%] transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-20'}`} opacity={0.15} />
<AmbientGlow colorClass={act.colorName} className={`animate-float-${((index + 1) % 6) + 1} w-[650px] h-[500px] bottom-[5%] right-[-10%] transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-20'}`} opacity={0.15} />

{/* Sticky header placed outside motion.section to prevent CSS transforms from breaking position: sticky */}
<div className="sticky top-0 z-20 w-full pointer-events-none pt-2 lg:pt-3 pb-2 act-sticky-header">
<div className="w-full px-3 md:px-6 xl:pl-20 xl:pr-4 pointer-events-auto">
<span className={`text-[12px] md:text-[14px] font-mono font-bold ${act.textColor} uppercase tracking-widest block leading-none mb-4 transition-transform duration-700 origin-left ${isFlashing ? 'scale-110' : 'scale-100'}`}>
[ ACTO {act.num} ]
</span>
<h2 className="text-[clamp(32px,5vw,56px)] font-bold tracking-tight font-heading leading-tight text-on-background">
{act.title}
</h2>
{/* Subtitle slot — reserved height on xl to prevent layout shift */}
<div className="xl:min-h-[20px] overflow-hidden transition-all duration-300 ease-out" style={{ height: activeBlocks[act.id] ? 'auto' : undefined }}>
{activeBlocks[act.id] ? (
  <motion.span
    key={activeBlocks[act.id]}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.35, ease: "easeOut" }}
    className={`text-[11px] md:text-[12px] font-mono font-bold ${act.textColor} uppercase tracking-[0.15em] block mt-2`}
  >
    &lt; {activeBlocks[act.id].toUpperCase()} &gt;
  </motion.span>
) : (
  <span className="hidden xl:block text-[12px] mt-2 opacity-0 pointer-events-none select-none">&nbsp;</span>
)}
</div>
</div>
</div>

<motion.section variants={chapterVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="relative z-10 pt-2 pb-3 lg:pb-4 w-full px-3 md:px-6 xl:pl-20 xl:pr-4">
<div 
className={`narrative-text-container relative w-full font-serif text-[18px] md:text-[20px] leading-[1.8] font-normal transition-colors duration-1000 ${isActive ? 'text-on-surface' : 'text-on-surface/35'} [&_p]:mb-5 [&_p:last-child]:mb-0`}
style={{ 
willChange: "mask-image, -webkit-mask-image",
transform: "translate3d(0, 0, 0)",
WebkitTransform: "translate3d(0, 0, 0)"
}}
>
{/* Render blocks inside the act */}
{act.blocks.map((block, blockIndex) => (
<div key={block.id} className="mb-10 last:mb-0 narrative-block" data-block-title={block.title}>
<span className={`text-[12px] md:text-[14px] font-mono font-bold ${act.textColor} uppercase tracking-[0.2em] block leading-normal ${blockIndex === 0 ? 'mt-2' : 'mt-12'} mb-4`}>
&lt; {block.title.toUpperCase()} &gt;
</span>

<div className="mb-2">
{block.content}
</div>

{block.deepDive && (
<button 
onClick={() => setDeepDiveData({ actId: act.id, actNum: act.num, actColor: act.textColor, data: block.deepDive! })} 
className="text-sm md:text-[15px] italic text-on-surface-variant/60 hover:text-on-background transition-colors mt-4 block text-left"
>
+ Profundizar en {block.deepDive.label}
</button>
)}
</div>
))}
</div>
</motion.section>
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

{/* Scroll Spy Sidebar - Desktop Only */}
<div className={`fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-5 transition-all duration-700 ${activeChapter ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 pointer-events-none'}`}>
{chaptersList.map((ch) => {
const isActive = activeChapter === ch.id;
return (
<button
key={ch.id}
onClick={() => handleScrollTo(ch.id)}
className={`group flex items-center gap-3 transition-all duration-300 cursor-pointer text-left relative ${
isActive 
? `${ch.activeClass} font-bold opacity-100` 
: 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-300 opacity-50 hover:opacity-100'
}`}
>
{/* Animated Dot indicator */}
<span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
isActive 
? `${ch.dotClass} scale-[2] shadow-[0_0_8px_rgba(var(--color-primary-rgb),0.5)]` 
: 'bg-zinc-500 dark:bg-zinc-600 group-hover:bg-zinc-300 opacity-40 group-hover:opacity-100'
}`} />

{/* Roman / Arabic Numeral */}
<span className={`font-mono text-[10px] tracking-widest uppercase w-4 text-left ${
isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
} transition-opacity duration-300`}>
{ch.num}
</span>
</button>
);
})}
</div>
</>
);
}
