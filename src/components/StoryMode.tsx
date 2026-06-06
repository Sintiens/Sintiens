import React from "react";
import { motion } from "motion/react";
import { Button } from "./ui/Button";
import { BrainCircuit, Clock, Activity, Scale, ArrowRight, ChevronDown } from "lucide-react";
import SocraticReflection from "./SocraticReflection";

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
  const [activeChapter, setActiveChapter] = React.useState<string | null>(null);
  const [hoveredChapter, setHoveredChapter] = React.useState<string | null>(null);
  const [flashChapter, setFlashChapter] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (activeChapter) {
      setFlashChapter(activeChapter);
      const timer = setTimeout(() => {
        setFlashChapter(null);
      }, 2500); // 2.5 seconds highlight
      return () => clearTimeout(timer);
    } else {
      setFlashChapter(null);
    }
  }, [activeChapter]);

  React.useEffect(() => {
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

    // Fallback for Act 6 if page is too short to hit the threshold
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        setActiveChapter("acto-6");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const chaptersList = [
    { id: "acto-1", num: "I", label: "Sintiencia & Biología", activeClass: "text-ch1", dotClass: "bg-ch1" },
    { id: "acto-2", num: "II", label: "Filosofía & Ética", activeClass: "text-ch4", dotClass: "bg-ch4" },
    { id: "acto-3", num: "III", label: "Psicología Humana", activeClass: "text-ch5", dotClass: "bg-ch5" },
    { id: "acto-4", num: "IV", label: "Sistemas & Antropocentrismo", activeClass: "text-ch2", dotClass: "bg-ch2" },
    { id: "acto-5", num: "V", label: "Impacto Ecológico", activeClass: "text-ch3", dotClass: "bg-ch3" },
    { id: "acto-6", num: "VI", label: "Marco Legal", activeClass: "text-ch6", dotClass: "bg-ch6" }
  ];

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

  return (
    <div className="flex flex-col w-full space-y-16 pb-16">
      
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
        <div className="min-h-[90vh] w-full flex flex-col lg:justify-center items-center text-center relative pt-12 lg:pt-20 pb-12 px-6 lg:px-16">
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
  
          {/* Ambient Glows (Spread out, matching the 'Conceptos' style but uniquely positioned) */}
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
              <motion.h1 initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18 } } }} className="text-[clamp(48px,7.2vw,80px)] font-bold tracking-tight font-heading leading-[1.05] text-on-background select-none">
                <motion.span variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }} className="block">
                  ¿Qué vidas merecen
                </motion.span>
                <motion.span variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }} className="italic font-light text-secondary font-serif relative inline-block mt-2">
                  consideración moral?
                </motion.span>
              </motion.h1>
              <p className="max-w-2xl mx-auto pt-1 font-serif italic font-light text-on-surface-variant/70 leading-relaxed text-[17px] sm:text-[19px] text-center tracking-normal select-none">
                Una mirada a la relación que mantenemos con los demás animales,<br className="hidden sm:inline" /> 
                y a lo que la evidencia tiene que decir al respecto.
              </p>
            </div>
 
            <div className="w-full max-w-7xl px-6 lg:px-16 pt-6 lg:pt-16 mt-10 lg:mt-12 relative z-10 font-sans font-light leading-relaxed">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-24 w-full">
                <div className="relative pt-0 text-center flex flex-col items-center">
                  <span className="text-[11px] font-mono font-bold text-primary select-none tracking-widest uppercase block leading-none mb-4">[ EL DESAFÍO ]</span>
                  <div className="relative px-6 md:px-12 text-[13px] text-on-surface-variant/60 leading-relaxed font-sans text-center">
                    <p>La información científica, ética y ecológica está hoy más disponible que nunca, pero se presenta dispersa, fragmentada y a menudo polarizada.</p>
                  </div>
                </div>
                <div className="relative pt-0 text-center flex flex-col items-center">
                  <span className="text-[11px] font-mono font-bold text-primary select-none tracking-widest uppercase block leading-none mb-4">[ ÁREAS DE ANÁLISIS ]</span>
                  <div className="relative px-6 text-[13px] text-on-surface-variant/80 leading-relaxed font-sans text-center w-full">
                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
                      <span>Sintiencia & Neurobiología</span><span>Recorrido Histórico & Uso</span><span>Dilemas & Contradicciones</span><span>Sistemas de Alimentación</span><span>Impacto Ambiental</span><span>Leyes & Regulación</span>
                    </div>
                  </div>
                </div>
                <div className="relative pt-0 text-center flex flex-col items-center">
                  <span className="text-[11px] font-mono font-bold text-primary select-none tracking-widest uppercase block leading-none mb-4">[ EL PROPÓSITO ]</span>
                  <div className="relative px-6 md:px-12 text-[13px] text-on-surface-variant/80 leading-relaxed font-sans text-center">
                    <p>Estructurar y ordenar esa evidencia de forma sistemática y transparente, facilitando un espacio de deconstrucción moral para que cada persona explore y decida con total autonomía.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center pt-16 select-none relative z-10">
            <motion.div className="text-primary/50 cursor-pointer" animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </div>

          <div className="mt-6 w-full relative z-10 px-6 lg:px-16">
            <div className="py-2 flex flex-wrap items-center justify-center gap-1">
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
                  className="px-4 py-2 rounded-md text-[11px] uppercase font-mono tracking-widest transition-all duration-300 text-on-surface-variant hover:text-primary"
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
      <div id="intro" className="max-w-6xl w-full mx-auto px-4 pt-4">
        {/* Intro Text (Centered) */}
        {/* Intro Text (Centered) */}
        <div className="relative w-full text-center mb-20 py-20 px-4">
          {/* Spread out Background Shapes (Full width, highly dispersed) */}
          <div className="absolute w-[100vw] left-1/2 -translate-x-1/2 top-[-100px] bottom-[-100px] z-0 pointer-events-none opacity-60" style={{ maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 70%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 70%, transparent 100%)" }}>
            {/* Ch1 Red - Extreme Top Left */}
            <div className="absolute top-[-50px] left-[-5vw] w-[500px] h-[500px] animate-float-1">
              <AmbientGlow colorClass="bg-ch1" className="w-full h-full" opacity={0.3} />
            </div>
            {/* Ch4 Blue - Extreme Bottom Right */}
            <div className="absolute bottom-[20px] right-[-5vw] w-[650px] h-[650px] animate-float-2">
              <AmbientGlow colorClass="bg-ch4" className="w-full h-full" opacity={0.2} />
            </div>
            {/* Ch5 Purple - Mid Left, pushed out */}
            <div className="absolute top-[30%] left-[8vw] w-[450px] h-[450px] animate-float-3">
              <AmbientGlow colorClass="bg-ch5" className="w-full h-full" opacity={0.3} />
            </div>
            {/* Ch2 Green - Extreme Top Right */}
            <div className="absolute top-[-80px] right-[10vw] w-[550px] h-[550px] animate-float-4">
              <AmbientGlow colorClass="bg-ch2" className="w-full h-full" opacity={0.3} />
            </div>
            {/* Ch3 Yellow - Bottom Left, further out */}
            <div className="absolute bottom-[50px] left-[20vw] w-[400px] h-[400px] animate-float-5">
              <AmbientGlow colorClass="bg-ch3" className="w-full h-full" opacity={0.3} />
            </div>
            {/* Ch6 Pink - Mid Right, pushed out */}
            <div className="absolute top-[40%] right-[25vw] w-[480px] h-[480px] animate-float-6">
              <AmbientGlow colorClass="bg-ch6" className="w-full h-full" opacity={0.3} />
            </div>
          </div>

          <div className="relative z-10 space-y-8 max-w-4xl mx-auto">
            <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest block leading-none mb-4 drop-shadow-md">[ MODO LECTURA ]</span>
            <h2 className="text-[clamp(40px,5.5vw,72px)] font-serif tracking-tight leading-[1.05] text-on-background mb-8 drop-shadow-2xl">
              Conceptos & Principios<br className="hidden md:inline" /> Fundamentales
            </h2>
            <p className="text-[18px] md:text-[21px] text-on-surface-variant/80 leading-[1.7] font-serif italic max-w-3xl mx-auto">
              Bienvenido al eje narrativo de Sintiens. Este es un apartado genérico y sintetizado de las principales áreas de estudio. Su propósito es servir como una lectura introductoria; desde aquí, podrás profundizar muchísimo más en cada temática.
            </p>
          </div>
        </div>

        {/* Index Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
          {[
            { id: "acto-1", num: "I", label: "Sintiencia & Biología", textColor: "text-ch1", hoverColor: "group-hover:text-ch1", colorName: "bg-ch1", desc: "Evidencia neurocientífica empírica sobre la capacidad de sufrir de los animales no humanos." },
            { id: "acto-2", num: "II", label: "Filosofía & Ética", textColor: "text-ch4", hoverColor: "group-hover:text-ch4", colorName: "bg-ch4", desc: "Análisis moral del especismo y disección de los argumentos que justifican la explotación." },
            { id: "acto-3", num: "III", label: "Psicología Humana", textColor: "text-ch5", hoverColor: "group-hover:text-ch5", colorName: "bg-ch5", desc: "Mecanismos de disonancia cognitiva y sesgos que nos desconectan del dolor." },
            { id: "acto-4", num: "IV", label: "Sistemas & Uso", textColor: "text-ch2", hoverColor: "group-hover:text-ch2", colorName: "bg-ch2", desc: "Estructuras e industrias diseñadas para la instrumentalización y cosificación sistemática." },
            { id: "acto-5", num: "V", label: "Ecología", textColor: "text-ch3", hoverColor: "group-hover:text-ch3", colorName: "bg-ch3", desc: "Las devastadoras consecuencias climáticas y ambientales de la ganadería moderna." },
            { id: "acto-6", num: "VI", label: "Marco Legal", textColor: "text-ch6", hoverColor: "group-hover:text-ch6", colorName: "bg-ch6", desc: "El estatus jurídico actual de los animales y las vías biotecnológicas hacia la liberación." }
          ].map((act) => (
            <div 
              key={act.id}
              onClick={() => handleScrollTo(act.id)}
              className="group relative py-6 px-4 transition-all duration-500 cursor-pointer flex flex-col items-start text-left"
            >
              {/* Background Glow on Hover */}
              <AmbientGlow 
                colorClass={act.colorName} 
                className="w-[150%] h-[250px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
                opacity={0.15} 
              />
              
              <div className="relative z-10 w-full">
                <span className={`text-[10px] font-mono font-bold ${act.textColor} uppercase tracking-widest block leading-none mb-3 group-hover:scale-105 origin-left transition-transform duration-500`}>
                  [ ACTO {act.num} ]
                </span>
                <h3 className={`text-lg md:text-xl font-bold font-heading text-on-background mb-2 transition-colors duration-500 ${act.hoverColor}`}>
                  {act.label}
                </h3>
                <p className="text-[13px] font-sans font-light text-on-surface-variant/60 group-hover:text-on-surface-variant/90 transition-colors duration-500 leading-relaxed m-0">
                  {act.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-b border-outline-variant/20 mt-12 mb-4" />
      </div>

      {/* ACTO I: SINTIENCIA (Color: ch1 - Rojo) */}
      <div id="acto-1" className="max-w-6xl w-full mx-auto px-4 scroll-mt-24 relative overflow-visible">
        <div className="absolute inset-y-0 right-[-5%] md:right-[5%] flex items-center justify-end pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
          <span className="font-serif font-bold leading-none text-ch1" style={{ fontSize: "clamp(250px, 40vw, 600px)", opacity: 0.03, transform: "translateY(-5%)" }}>I</span>
        </div>
        <AmbientGlow colorClass="bg-ch1" className={`animate-float-1 w-[600px] h-[600px] top-[-5%] left-[-15%] transition-opacity duration-1000 ${activeChapter === 'acto-1' ? 'opacity-100' : 'opacity-20'}`} opacity={0.15} />
        <AmbientGlow colorClass="bg-ch1" className={`animate-float-2 w-[650px] h-[500px] bottom-[5%] right-[-10%] transition-opacity duration-1000 ${activeChapter === 'acto-1' ? 'opacity-100' : 'opacity-20'}`} opacity={0.15} />
        <motion.section variants={chapterVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="relative z-10 py-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 text-left">
            <div className={`flex-1 lg:max-w-[760px] space-y-6 font-serif text-[17px] md:text-[19px] leading-[1.8] font-light transition-colors duration-1000 ${activeChapter === 'acto-1' ? 'text-on-surface-variant' : 'text-on-surface-variant/40'}`}>
              <span className={`text-[10px] font-mono font-bold text-ch1 uppercase tracking-widest block leading-none mb-4 transition-transform duration-700 origin-left ${flashChapter === 'acto-1' ? 'scale-110' : 'scale-100'}`}>[ ACTO I ]</span>
              <h2 className={`text-[clamp(32px,5vw,56px)] font-bold tracking-tight font-heading leading-tight mb-8 transition-colors duration-700 ${flashChapter === 'acto-1' ? 'text-ch1' : 'text-on-background'}`}>Fundamentos Biológicos</h2>
              <p>La materia de este planeta se organizó de tal forma que <em>despertó</em>. La sintiencia no es exclusividad humana. Como reitera la Declaración de Cambridge sobre la Conciencia (2012), todos los mamíferos, aves, y otras especies comparten los mismos sustratos neurológicos que generan la experiencia consciente.</p>
              <p>Es crucial entender la diferencia entre nocicepción (un reflejo autómata ante el daño, como retirar la mano del fuego) y el dolor subjetivo consciente. Este último requiere una dimensión afectiva: estrés crónico, miedo y evaluación cognitiva. Hoy sabemos que los peces y aves analizan el dolor y lo gestionan para sobrevivir, evidenciando un procesamiento emocional real.</p>
              <p>Más allá del dolor, la etología nos demuestra que vacas y cerdos poseen vínculos sociales profundos, memoria episódica, sufren duelo por separación y resuelven problemas lógicos. Son, bajo cualquier estándar biológico moderno, individuos con un rico "universo interior" y una voluntad de vivir innegable.</p>
            </div>
            <div className="lg:w-[280px] shrink-0 space-y-8 pt-8 lg:pt-24 select-none">
              <div className="border-l-2 border-ch1/30 pl-4 py-1 text-sm font-sans text-on-surface-variant/80">
                <strong className="text-on-background block mb-1">Declaración de Cambridge</strong>
                El consenso histórico de que la consciencia no requiere un neocórtex humano. <span className="opacity-50">[Low et al., 2012]</span>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* ACTO II: ÉTICA (Color: ch4 - Azul) */}
      <div id="acto-2" className="max-w-6xl w-full mx-auto px-4 scroll-mt-24 relative overflow-visible">
        <div className="absolute inset-y-0 right-[-5%] md:right-[5%] flex items-center justify-end pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
          <span className="font-serif font-bold leading-none text-ch4" style={{ fontSize: "clamp(250px, 40vw, 600px)", opacity: 0.03, transform: "translateY(-5%)" }}>II</span>
        </div>
        <AmbientGlow colorClass="bg-ch4" className={`animate-float-3 w-[650px] h-[550px] top-[10%] right-[-20%] transition-opacity duration-1000 ${activeChapter === 'acto-2' ? 'opacity-100' : 'opacity-20'}`} opacity={0.15} />
        <AmbientGlow colorClass="bg-ch4" className={`animate-float-4 w-[500px] h-[500px] bottom-[5%] left-[-10%] transition-opacity duration-1000 ${activeChapter === 'acto-2' ? 'opacity-100' : 'opacity-20'}`} opacity={0.15} />
        <motion.section variants={chapterVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="relative z-10 py-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 text-left">
            <div className={`flex-1 lg:max-w-[760px] space-y-6 font-serif text-[17px] md:text-[19px] leading-[1.8] font-light transition-colors duration-1000 ${activeChapter === 'acto-2' ? 'text-on-surface-variant' : 'text-on-surface-variant/40'}`}>
              <span className={`text-[10px] font-mono font-bold text-ch4 uppercase tracking-widest block leading-none mb-4 transition-transform duration-700 origin-left ${flashChapter === 'acto-2' ? 'scale-110' : 'scale-100'}`}>[ ACTO II ]</span>
              <h2 className={`text-[clamp(32px,5vw,56px)] font-bold tracking-tight font-heading leading-tight mb-8 transition-colors duration-700 ${flashChapter === 'acto-2' ? 'text-ch4' : 'text-on-background'}`}>Filosofía, Ética y Moral</h2>
              <p>Si aceptamos empíricamente que sienten, ¿qué obligaciones morales se derivan de ello? Históricamente, el mecanicismo cartesiano negaba su consciencia. Fue el utilitarismo clásico quien desplazó la barrera: "La cuestión no es si pueden razonar, sino si pueden sufrir" (Bentham).</p>
              <p>Excluir de la protección moral a un individuo únicamente por su especie biológica es un prejuicio injustificado que denominamos <strong>especismo</strong>. Filósofos como Peter Singer nos presentan el 'Argumento de los Casos Marginales': si usamos la racionalidad superior como condición para otorgar el derecho a vivir, excluiríamos lógicamente a bebés humanos y a personas con severa diversidad funcional.</p>
              <p>La ética contemporánea se divide entre el 'Bienestarismo' (que justifica la explotación siempre que el dolor sea "mínimo") y el 'Abolicionismo' (que exige reconocerlos como 'sujetos-de-una-vida' con valor intrínseco e irremplazable, prohibiendo rotundamente su cosificación legal y su uso como recursos).</p>
            </div>
            <div className="lg:w-[280px] shrink-0 space-y-8 pt-8 lg:pt-24 select-none">
              <div className="border-l-2 border-ch4/30 pl-4 py-1 text-sm font-sans text-on-surface-variant/80">
                <strong className="text-on-background block mb-1">Especismo</strong>
                Discriminación moral arbitraria basada en la pertenencia a una especie. <span className="opacity-50">[Ryder, 1970]</span>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* ACTO III: PSICOLOGÍA (Color: ch5 - Morado) */}
      <div id="acto-3" className="max-w-6xl w-full mx-auto px-4 scroll-mt-24 relative overflow-visible">
        <div className="absolute inset-y-0 right-[-5%] md:right-[5%] flex items-center justify-end pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
          <span className="font-serif font-bold leading-none text-ch5" style={{ fontSize: "clamp(250px, 40vw, 600px)", opacity: 0.03, transform: "translateY(-5%)" }}>III</span>
        </div>
        <AmbientGlow colorClass="bg-ch5" className={`animate-float-5 w-[600px] h-[500px] top-[5%] left-[-20%] transition-opacity duration-1000 ${activeChapter === 'acto-3' ? 'opacity-100' : 'opacity-20'}`} opacity={0.15} />
        <AmbientGlow colorClass="bg-ch5" className={`animate-float-6 w-[600px] h-[600px] bottom-[5%] right-[-5%] transition-opacity duration-1000 ${activeChapter === 'acto-3' ? 'opacity-100' : 'opacity-20'}`} opacity={0.15} />
        <motion.section variants={chapterVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="relative z-10 py-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 text-left">
            <div className={`flex-1 lg:max-w-[760px] space-y-6 font-serif text-[17px] md:text-[19px] leading-[1.8] font-light transition-colors duration-1000 ${activeChapter === 'acto-3' ? 'text-on-surface-variant' : 'text-on-surface-variant/40'}`}>
              <span className={`text-[10px] font-mono font-bold text-ch5 uppercase tracking-widest block leading-none mb-4 transition-transform duration-700 origin-left ${flashChapter === 'acto-3' ? 'scale-110' : 'scale-100'}`}>[ ACTO III ]</span>
              <h2 className={`text-[clamp(32px,5vw,56px)] font-bold tracking-tight font-heading leading-tight mb-8 transition-colors duration-700 ${flashChapter === 'acto-3' ? 'text-ch5' : 'text-on-background'}`}>Psicología Humana</h2>
              <p>¿Cómo convivimos diariamente con este choque de valores? La inmensa mayoría condena el maltrato animal, pero financia industrias masivas de aniquilación. La psicología define esto como la <strong>"Paradoja de la Carne"</strong>, sosteniendo una profunda disonancia cognitiva.</p>
              <p>Para amortiguar esta fractura mental, recurrimos a una compartimentación sociocultural inducida desde la infancia. Etiquetamos arbitrariamente: unos son familia (mascotas), otros son recursos (cerdos, aves) y otros plagas (roedores). Simultáneamente, el lenguaje enmascara la violencia mediante 'referentes ausentes' (hablamos de salchichas y filetes, no de partes de un ser desmembrado).</p>
              <p>Alcanzar la <strong>consistencia moral</strong> no implica adquirir nuevos y radicales valores, sino simplemente alinear nuestras decisiones diarias con nuestra capacidad humana ya existente de buscar la paz y evitar el daño innecesario.</p>
            </div>
            <div className="lg:w-[280px] shrink-0 space-y-8 pt-8 lg:pt-24 select-none">
              <div className="border-l-2 border-ch5/30 pl-4 py-1 text-sm font-sans text-on-surface-variant/80">
                <strong className="text-on-background block mb-1">Disonancia Cognitiva</strong>
                La tensión producida entre creer en la compasión y ejercer la opresión pasiva. <span className="opacity-50">[Loughnan et al., 2010]</span>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* ACTO IV: SISTEMAS DE USO (Color: ch2 - Amarillo) */}
      <div id="acto-4" className="max-w-6xl w-full mx-auto px-4 scroll-mt-24 relative overflow-visible">
        <div className="absolute inset-y-0 right-[-5%] md:right-[5%] flex items-center justify-end pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
          <span className="font-serif font-bold leading-none text-ch2" style={{ fontSize: "clamp(250px, 40vw, 600px)", opacity: 0.03, transform: "translateY(-5%)" }}>IV</span>
        </div>
        <AmbientGlow colorClass="bg-ch2" className={`animate-float-1 w-[650px] h-[500px] top-1/2 left-[-10%] transition-opacity duration-1000 ${activeChapter === 'acto-4' ? 'opacity-100' : 'opacity-20'}`} opacity={0.15} />
        <AmbientGlow colorClass="bg-ch2" className={`animate-float-2 w-[500px] h-[500px] bottom-[5%] right-[5%] transition-opacity duration-1000 ${activeChapter === 'acto-4' ? 'opacity-100' : 'opacity-20'}`} opacity={0.15} />
        <motion.section variants={chapterVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="relative z-10 py-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 text-left">
            <div className={`flex-1 lg:max-w-[760px] space-y-6 font-serif text-[17px] md:text-[19px] leading-[1.8] font-light transition-colors duration-1000 ${activeChapter === 'acto-4' ? 'text-on-surface-variant' : 'text-on-surface-variant/40'}`}>
              <span className={`text-[10px] font-mono font-bold text-ch2 uppercase tracking-widest block leading-none mb-4 transition-transform duration-700 origin-left ${flashChapter === 'acto-4' ? 'scale-110' : 'scale-100'}`}>[ ACTO IV ]</span>
              <h2 className={`text-[clamp(32px,5vw,56px)] font-bold tracking-tight font-heading leading-tight mb-8 transition-colors duration-700 ${flashChapter === 'acto-4' ? 'text-ch2' : 'text-on-background'}`}>Antropocentrismo y Sistemas</h2>
              <p>La brecha psicológica la cruzamos hace milenios. Con la domesticación agrícola en el Neolítico, sometimos a otras especies forzando su reproducción. El animal dejó de ser un compañero biológico para convertirse en un eslabón tecnológico y en la primera forma de "propiedad" humana.</p>
              <p>Pero la verdadera ruptura total llegó con las granjas factoría y el hacinamiento industrial. Transformamos al animal en una simple mercancía en una cadena de ensamblaje. Su confinamiento intensivo, los ciclos de engorde mutilantes y las operaciones de asfixia pesquera despojan a billones de seres de cualquier conducta biológica natural.</p>
              <p>Y la maquinaria se extiende: desde la explotación de visones y pieles, pasando por la experimentación biomédica bajo la deficiente premisa de las '3R', hasta llegar a su manifestación más absurda: el sometimiento animal puramente para entretenimiento en zoológicos y tauromaquia.</p>
            </div>
            <div className="lg:w-[280px] shrink-0 space-y-8 pt-8 lg:pt-24 select-none">
              <div className="border-l-2 border-ch2/30 pl-4 py-1 text-sm font-sans text-on-surface-variant/80">
                <strong className="text-on-background block mb-1">Máquinas de Carne</strong>
                La despersonalización absoluta del individuo convertido en biomasa productiva. <span className="opacity-50">[Harrison, 1964]</span>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* ACTO V: ECOLOGÍA (Color: ch3 - Marrón) */}
      <div id="acto-5" className="max-w-6xl w-full mx-auto px-4 scroll-mt-24 relative overflow-visible">
        <div className="absolute inset-y-0 right-[-5%] md:right-[5%] flex items-center justify-end pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
          <span className="font-serif font-bold leading-none text-ch3" style={{ fontSize: "clamp(250px, 40vw, 600px)", opacity: 0.03, transform: "translateY(-5%)" }}>V</span>
        </div>
        <AmbientGlow colorClass="bg-ch3" className={`animate-float-3 w-[700px] h-[500px] top-[5%] right-[-15%] transition-opacity duration-1000 ${activeChapter === 'acto-5' ? 'opacity-100' : 'opacity-20'}`} opacity={0.15} />
        <AmbientGlow colorClass="bg-ch3" className={`animate-float-4 w-[550px] h-[450px] bottom-[10%] left-1/4 transition-opacity duration-1000 ${activeChapter === 'acto-5' ? 'opacity-100' : 'opacity-20'}`} opacity={0.15} />
        <motion.section variants={chapterVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="relative z-10 py-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 text-left">
            <div className={`flex-1 lg:max-w-[760px] space-y-6 font-serif text-[17px] md:text-[19px] leading-[1.8] font-light transition-colors duration-1000 ${activeChapter === 'acto-5' ? 'text-on-surface-variant' : 'text-on-surface-variant/40'}`}>
              <span className={`text-[10px] font-mono font-bold text-ch3 uppercase tracking-widest block leading-none mb-4 transition-transform duration-700 origin-left ${flashChapter === 'acto-5' ? 'scale-110' : 'scale-100'}`}>[ ACTO V ]</span>
              <h2 className={`text-[clamp(32px,5vw,56px)] font-bold tracking-tight font-heading leading-tight mb-8 transition-colors duration-700 ${flashChapter === 'acto-5' ? 'text-ch3' : 'text-on-background'}`}>Impacto Sistémico y Ecológico</h2>
              <p>Si ignoramos la moral, nos topamos de frente con la física termodinámica y los límites planetarios. Usar a un animal como puente para asimilar nutrientes de la tierra es una colosal ineficiencia calórica. Cerca del 90% de la energía del forraje que come el ganado se pierde metabólicamente en lugar de convertirse en alimento humano final.</p>
              <p>Por esta razón puramente matemática, la ganadería utiliza casi el 80% de todas las tierras de cultivo del globo, provocando una masiva deforestación (en el Amazonas para soja y pastizales), extinguiendo aceleradamente la biodiversidad silvestre nativa y dejando una profunda huella hídrica y tóxica.</p>
              <p>Simultáneamente, la cría masiva es el motor de la sexta extinción masiva, y las emisiones de gases como metano y óxido nitroso son uno de los grandes culpables de la crisis climática global, superando a todo el sector de transporte combinado.</p>
            </div>
            <div className="lg:w-[280px] shrink-0 space-y-8 pt-8 lg:pt-24 select-none">
              <div className="border-l-2 border-ch3/30 pl-4 py-1 text-sm font-sans text-on-surface-variant/80">
                <strong className="text-on-background block mb-1">Ineficiencia Térmica</strong>
                Alimentar a la humanidad con dietas basadas en plantas devolvería el 75% del suelo agrícola a la naturaleza silvestre. <span className="opacity-50">[Poore & Nemecek, 2018]</span>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* ACTO VI: MARCO LEGAL (Color: ch6 - Verde) */}
      <div id="acto-6" className="max-w-6xl w-full mx-auto px-4 scroll-mt-24 relative overflow-visible">
        <div className="absolute inset-y-0 right-[-5%] md:right-[5%] flex items-center justify-end pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
          <span className="font-serif font-bold leading-none text-ch6" style={{ fontSize: "clamp(250px, 40vw, 600px)", opacity: 0.03, transform: "translateY(-5%)" }}>VI</span>
        </div>
        <AmbientGlow colorClass="bg-ch6" className={`animate-float-5 w-[600px] h-[600px] top-[10%] left-[-15%] transition-opacity duration-1000 ${activeChapter === 'acto-6' ? 'opacity-100' : 'opacity-20'}`} opacity={0.15} />
        <AmbientGlow colorClass="bg-ch6" className={`animate-float-6 w-[600px] h-[500px] bottom-[10%] right-[0%] transition-opacity duration-1000 ${activeChapter === 'acto-6' ? 'opacity-100' : 'opacity-20'}`} opacity={0.15} />
        <motion.section variants={chapterVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="relative z-10 py-6">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 text-left">
            <div className={`flex-1 lg:max-w-[760px] space-y-6 font-serif text-[17px] md:text-[19px] leading-[1.8] font-light transition-colors duration-1000 ${activeChapter === 'acto-6' ? 'text-on-surface-variant' : 'text-on-surface-variant/40'}`}>
              <span className={`text-[10px] font-mono font-bold text-ch6 uppercase tracking-widest block leading-none mb-4 transition-transform duration-700 origin-left ${flashChapter === 'acto-6' ? 'scale-110' : 'scale-100'}`}>[ ACTO VI ]</span>
              <h2 className={`text-[clamp(32px,5vw,56px)] font-bold tracking-tight font-heading leading-tight mb-8 transition-colors duration-700 ${flashChapter === 'acto-6' ? 'text-ch6' : 'text-on-background'}`}>Marco Legal y Transición</h2>
              <p>Históricamente, los códigos legales catalogaron a los animales como "bienes muebles" (cosas). Gracias a la presión científica y ética, estamos comenzando a reclasificarlos como "seres vivos dotados de sensibilidad", la primera gran victoria legal.</p>
              <p>A pesar de ello, la 'Legislación de Bienestar Animal' sigue operando en gran medida como un manual que instruye 'cómo maltratar legalmente' a un animal de granja, perdonando sistemáticamente prácticas crueles en nombre de la rentabilidad estándar. Las lagunas que permiten asfixia, confinamiento de jaulas y mutilaciones sin analgesia siguen blindadas por los ministerios agrícolas.</p>
              <p>La esperanza del futuro yace en una transición estructural: el auge de la biotecnología como la fermentación de precisión y la agricultura celular, y movimientos jurídicos inauditos como los litigios de <em>Habeas Corpus</em>, que buscan arrancar a los individuos biológicos de su condición de mercancía, transformándolos oficialmente ante la corte en personas no-humanas libres.</p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button onClick={() => onNavigate("grafo")} variant="outline" className="hover:border-ch6 hover:text-ch6 font-sans">Explorar Ontología Completa</Button>
                <Button onClick={() => onNavigate("dialectica")} variant="outline" className="hover:border-ch6 hover:text-ch6 font-sans">Abrir El Deconstructor</Button>
              </div>
            </div>
            <div className="lg:w-[280px] shrink-0 space-y-8 pt-8 lg:pt-24 select-none">
              <div className="border-l-2 border-ch6/30 pl-4 py-1 text-sm font-sans text-on-surface-variant/80">
                <strong className="text-on-background block mb-1">Estatus Jurídico</strong>
                La descosificación jurídica es el paso previo necesario para la abolición del matadero. <span className="opacity-50">[Giménez-Candela, 2019]</span>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* SECTION 5: About / Origin Story */}
      <div className="max-w-4xl w-full mx-auto px-4 pb-12">
        <motion.section variants={chapterVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="relative py-12">
          <AmbientGlow colorClass="bg-primary" className="w-[800px] h-[600px] top-[-10%] left-[-20%] -rotate-12" opacity={0.10} />
          <div className="glass-panel p-10 md:p-16 rounded-3xl border border-outline-variant/30 bg-surface/50 text-left space-y-8">
            <div className="space-y-2">
              <span className="text-sm font-mono text-primary font-medium tracking-wider uppercase">Génesis del Proyecto</span>
              <h2 className="text-display-sm">Por qué existe Sintiens</h2>
            </div>
            <div className="prose prose-invert prose-p:text-on-surface-variant prose-p:leading-relaxed max-w-none space-y-6">
              <p>Aunque esta página cobró vida literalmente a finales de mayo de 2026 durante un viaje, la necesidad de estructurar esta información lleva latente al menos dos años. Soy un estudiante obsesionado con ordenar y presentar la información de la mejor forma posible.</p>
              <p>Todo empezó al descubrir la realidad del maltrato animal y empezar a investigar sobre la sintiencia y el veganismo. Me encontré con muchas áreas grises, pero sobre todo, me di cuenta de un patrón en mi entorno: había personas que estaban de acuerdo con la evidencia empírica pero no tomaban acción, y otras que se oponían frontalmente basándose en falacias sistemáticas y falta de contexto.</p>
              <p>Hoy en día tenemos acceso infinito a la información, pero está increíblemente desordenada. <strong>Sintiens</strong> nace de mi necesidad personal de recopilar, estructurar y presentar toda la evidencia disponible para que cada lector pueda llegar tan lejos como desee.</p>
              <p className="text-sm text-on-surface-variant/70 border-l-2 border-primary/30 pl-4 mt-8 italic">Nota de desarrollo: Este proyecto es una versión muy preliminar. Utilizo herramientas de Inteligencia Artificial para programar, analizar falacias y ayudar en la revisión sistemática de los argumentos, consciente de que pueden cometer errores. Todo aquí está en constante evolución; la intención es empezar poco a poco para, eventualmente, hacer algo mucho más grande.</p>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Scroll Spy Sidebar - Desktop Only */}
      <div className={`fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-5 transition-all duration-700 ${activeChapter ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8 pointer-events-none'}`}>
        {chaptersList.map((ch) => {
          const isActive = activeChapter === ch.id;
          return (
            <button
              key={ch.id}
              onClick={() => handleScrollTo(ch.id)}
              onMouseEnter={() => setHoveredChapter(ch.label)}
              onMouseLeave={() => setHoveredChapter(null)}
              className={`group flex items-center gap-3 transition-all duration-300 cursor-pointer ${isActive ? ch.activeClass + ' font-bold opacity-100' : 'text-zinc-400 dark:text-zinc-500 hover:text-zinc-300 opacity-50 hover:opacity-100'}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isActive ? ch.dotClass + ' scale-[2] opacity-100' : 'bg-zinc-500 dark:bg-zinc-600 group-hover:bg-zinc-300 opacity-40 group-hover:opacity-100'}`} />
              <span className={`font-mono text-[10px] tracking-widest uppercase w-4 text-left ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>{ch.num}</span>
            </button>
          );
        })}
      </div>


    </div>
  );
}
