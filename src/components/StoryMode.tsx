import React from "react";
import { motion } from "motion/react";
import { Button } from "./ui/Button";
import { BrainCircuit, Clock, Activity, Scale, ArrowRight, ChevronDown } from "lucide-react";
import SocraticReflection from "./SocraticReflection";

interface StoryModeProps {
  onNavigate: (tab: "grafo" | "cronologia" | "calculadora" | "dialectica" | "validador") => void;
}

export default function StoryMode({ onNavigate }: StoryModeProps) {

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
      
      {/* SECTION 0: Hero & Hook - Perfectly Centered Viewport-Wide Grid Hero (Scrollbar-Immune) */}
      <section 
        className="-mt-12 lg:-mt-20 flex flex-col items-center relative overflow-hidden bg-background"
        style={{
          width: "calc(100vw - var(--scrollbar-width, 0px))",
          marginLeft: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
          marginRight: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
        }}
      >
        {/* COVER WRAPPER: min-h-[90vh] to perfectly frame the cover content with absolute crosses and HUD widgets */}
        <div className="min-h-[90vh] w-full flex flex-col lg:justify-center items-center text-center relative pt-12 lg:pt-20 pb-12 px-6 lg:px-16">
          
          {/* SVG Perfect Grid Background — mathematically centered, crisp, extremely subtle (3% opacity) with smooth fade-out */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none select-none text-primary/3" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ 
              zIndex: 0,
              maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
            }}
          >
            <defs>
              <pattern 
                id="hero-grid" 
                width="40" 
                height="40" 
                patternUnits="userSpaceOnUse" 
                x="50%" 
                y="0"
              >
                <path 
                  d="M 0 20 H 40 M 20 0 V 40" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1" 
                  shapeRendering="crispEdges"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
          
          {/* Top-Left Corner Cross (+): ALWAYS visible, horizontal line aligned exactly with the vertical center of SINTIENS LAB title */}
          <div className="absolute top-[25px] left-[20px] w-6 h-6 pointer-events-none select-none flex items-center justify-center">
            <div className="absolute w-4 h-[2px] bg-primary/30" />
            <div className="absolute w-[2px] h-4 bg-primary/30" />
          </div>
  
          {/* Top-Right Corner Cross (+): ALWAYS visible, horizontal line aligned exactly with the vertical center of ESTADO DEL SISTEMA title */}
          <div className="absolute top-[25px] right-[20px] w-6 h-6 pointer-events-none select-none flex items-center justify-center">
            <div className="absolute w-4 h-[2px] bg-primary/30" />
            <div className="absolute w-[2px] h-4 bg-primary/30" />
          </div>
  
          {/* Left Side HUD Widget: Meta information / Philosophy (Only on desktop xl+) */}
          <div className="absolute top-8 left-8 text-left select-none hidden xl:block max-w-[280px]">
            <div className="relative pt-0 space-y-4">
              {/* SINTIENS LAB Title (centered vertically at 37px from the top of the section) */}
              <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest block leading-none pl-6">
                SINTIENS LAB
              </span>
              
              {/* Bullet points frame (vertical line restored) */}
              <div className="relative pl-6 text-[11px] text-on-surface-variant font-light space-y-1.5 leading-relaxed border-l-2 border-primary/30">
                <p>• Proyecto iniciado: Mayo 2026</p>
                <p>• Enfoque: Empírico-racional</p>
                <p>• Código abierto e independiente</p>
              </div>
            </div>
          </div>
  
          {/* Right Side HUD Widget: System status / Tech stack (Only on desktop xl+) */}
          <div className="absolute top-8 right-8 text-right select-none hidden xl:block max-w-[280px]">
            <div className="relative pt-0 space-y-4">
              {/* ESTADO DEL SISTEMA Title (centered vertically at 37px from the top of the section) */}
              <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest block leading-none pr-6">
                ESTADO DEL SISTEMA
              </span>
              
              {/* Bullet points frame (vertical line restored) */}
              <div className="relative pr-6 text-[11px] text-on-surface-variant font-light space-y-1.5 leading-relaxed border-r-2 border-primary/30">
                <p>Versión Alpha •</p>
                <p>Desarrollo y revisión asistidos por IA •</p>
                <p>Sujeto a posibles inexactitudes •</p>
              </div>
            </div>
          </div>
  
  
  
          {/* Ambient glow — top center */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/4 rounded-full blur-[120px] -z-10 pointer-events-none" />
          {/* Ambient glow — center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-primary/5 rounded-full blur-[90px] -z-10 pointer-events-none" />
  
          {/* Decorative: giant faint '¿' behind the title — perfectly positioned relative to cover wrapper */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden" style={{ zIndex: 0 }}>
            <span 
              className="font-serif font-bold leading-none"
              style={{ fontSize: "clamp(160px, 50vw, 600px)", color: "var(--primary)", opacity: 0.04, transform: "translateY(-20%)" }}
            >¿</span>
          </div>
  
          {/* Main content - centered vertically, takes available space */}
          <div className="flex-1 lg:flex-none flex flex-col justify-center items-center w-full">
  
          {/* Title and main content lowered slightly for a centered, grounded visual look */}
          <div className="space-y-4 lg:space-y-6 max-w-3xl w-full relative z-10 translate-y-6 lg:translate-y-8 mt-4 lg:mt-6">
            
            {/* Elegant and highly striking Serif/Sans High-Contrast Title with Staggered Entrance */}
            <motion.h1 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.18
                  }
                }
              }}
              className="text-[clamp(48px,7.2vw,80px)] font-bold tracking-tight font-heading leading-[1.05] text-on-background select-none"
            >
              <motion.span 
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="block"
              >
                ¿Qué vidas merecen
              </motion.span>
              <motion.span 
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                }}
                className="italic font-light text-primary font-serif relative inline-block mt-2"
              >
                consideración moral?
              </motion.span>
            </motion.h1>
 
            {/* Editorial Subtitle — italic serif for contrast from the analytic columns below */}
            <p className="max-w-2xl mx-auto pt-1 font-serif italic font-light text-on-surface-variant/70 leading-relaxed text-[17px] sm:text-[19px] text-center tracking-normal select-none">
              Una mirada a la relación que mantenemos con los demás animales,<br className="hidden sm:inline" /> 
              y a lo que la evidencia tiene que decir al respecto.
            </p>
 
          </div>
 
          {/* Three-column layout with top divider for visual separation */}
          <div className="w-full max-w-7xl px-6 lg:px-16 pt-6 lg:pt-16 mt-10 lg:mt-12 relative z-10 font-sans font-light leading-relaxed">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-24 w-full">
              
              {/* Context Column (Left) */}
              <div className="relative pt-0 text-center flex flex-col items-center">
                <span className="text-[11px] font-mono font-bold text-primary select-none tracking-widest uppercase block leading-none mb-4">
                  [ EL DESAFÍO ]
                </span>
                
                {/* Centered description text container */}
                <div className="relative px-6 md:px-12 text-[13px] text-on-surface-variant/60 leading-relaxed font-sans text-center">
                  <p>
                    La información científica, ética y ecológica está hoy más disponible que nunca, pero se presenta dispersa, fragmentada y a menudo polarizada.
                  </p>
                </div>
              </div>
 
              {/* Areas Column (Center) */}
              <div className="relative pt-0 text-center flex flex-col items-center">
                <span className="text-[11px] font-mono font-bold text-primary select-none tracking-widest uppercase block leading-none mb-4">
                  [ ÁREAS DE ANÁLISIS ]
                </span>
                
                {/* Centered list container, same typography and pure line-height matching as others */}
                <div className="relative px-6 text-[13px] text-on-surface-variant/80 leading-relaxed font-sans text-center w-full">
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
                    <span>Sintiencia & Neurobiología</span>
                    <span>Recorrido Histórico & Uso</span>
                    <span>Dilemas & Contradicciones</span>
                    <span>Sistemas de Alimentación</span>
                    <span>Impacto Ambiental</span>
                    <span>Leyes & Regulación</span>
                  </div>
                </div>
              </div>
 
              {/* Purpose Column (Right) */}
              <div className="relative pt-0 text-center flex flex-col items-center">
                <span className="text-[11px] font-mono font-bold text-primary select-none tracking-widest uppercase block leading-none mb-4">
                  [ EL PROPÓSITO ]
                </span>
                
                {/* Centered description text container */}
                <div className="relative px-6 md:px-12 text-[13px] text-on-surface-variant/80 leading-relaxed font-sans text-center">
                  <p>
                    Estructurar y ordenar esa evidencia de forma sistemática y transparente, facilitando un espacio de deconstrucción moral para que cada persona explore y decida con total autonomía.
                  </p>
                </div>
              </div>
 
            </div>
          </div>

          </div>

          {/* Monospace elegant micro-animated scroll indicator (perfectly centered directly on the screen's horizontal axis) */}
          <div className="w-full flex justify-center pt-16 select-none relative z-10">
            <motion.div 
              className="text-primary/50 cursor-pointer"
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </div>

          {/* Inline Navigation Panel — positioned under scroll indicator, no borders, full width responsive */}
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

          {/* Symmetrical Bottom-Left Corner Cross (+) — perfectly aligned with top crosses & navigation bar */}
          <div className="absolute bottom-[40px] left-[20px] w-6 h-6 pointer-events-none select-none flex items-center justify-center">
            <div className="absolute w-4 h-[2px] bg-primary/30" />
            <div className="absolute w-[2px] h-4 bg-primary/30" />
          </div>

          {/* Symmetrical Bottom-Right Corner Cross (+) — perfectly aligned with top crosses & navigation bar */}
          <div className="absolute bottom-[40px] right-[20px] w-6 h-6 pointer-events-none select-none flex items-center justify-center">
            <div className="absolute w-4 h-[2px] bg-primary/30" />
            <div className="absolute w-[2px] h-4 bg-primary/30" />
          </div>

        </div>

        {/* Socratic Reflection Cards below — no horizontal borders, full width responsive, minuscule edge-to-edge margins */}
        <div className="mt-2 w-full text-left relative z-10 pt-2 px-2 pb-6 lg:pb-16">
          <SocraticReflection />
        </div>
      </section>

      {/* SECTION 1: Sintiencia (Ontology) */}
      <div className="max-w-4xl w-full mx-auto">
        <motion.section 
          variants={chapterVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative pt-4 lg:pt-12 pb-12 px-4"
        >
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-dim border border-outline-variant/30 text-primary text-[10px] uppercase font-mono tracking-widest rounded-full">
                <BrainCircuit className="w-3 h-3" />
                <span>Capítulo 1</span>
              </div>
              <h2 className="text-display-md">La Anatomía del Dolor</h2>
              <p className="text-body-lg text-on-surface-variant leading-relaxed">
                La sintiencia no es una abstracción filosófica, es un fenómeno físico rastreable. Desde la Declaración de Cambridge sobre la Conciencia, la neurociencia ha confirmado que los mamíferos, aves, pulpos e innumerables otros animales poseen los sustratos neuroanatómicos necesarios para experimentar el mundo, sufrir y desear seguir viviendo.
              </p>
              <Button 
                onClick={() => onNavigate("grafo")}
                className="mt-4 gap-2 group bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container"
              >
                Explorar Ontología <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="flex-1 w-full aspect-square md:aspect-auto md:h-80 bg-surface-dim/30 border border-outline-variant/20 rounded-3xl relative overflow-hidden flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent" />
               <BrainCircuit className="w-32 h-32 text-primary/20" strokeWidth={1} />
            </div>
          </div>
        </motion.section>
      </div>

      {/* SECTION 2: History (Timeline) */}
      <div className="max-w-4xl w-full mx-auto">
        <motion.section 
          variants={chapterVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative py-12 px-4"
        >
          <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-dim border border-outline-variant/30 text-secondary text-[10px] uppercase font-mono tracking-widest rounded-full">
                <Clock className="w-3 h-3" />
                <span>Capítulo 2</span>
              </div>
              <h2 className="text-display-md">La Brecha del Progreso</h2>
              <p className="text-body-lg text-on-surface-variant leading-relaxed">
                A lo largo de la historia, nuestra tecnología se ha desarrollado a un ritmo exponencial, mientras que nuestro círculo de consideración moral ha avanzado a un paso trágicamente lento. Hoy, aplicamos una eficiencia industrial propia del siglo XXI a una relación arcaica con los animales, creando un sistema de sufrimiento sistematizado y automatizado.
              </p>
              <Button 
                onClick={() => onNavigate("cronologia")}
                variant="outline"
                className="mt-4 gap-2 group hover:border-secondary hover:text-secondary"
              >
                Explorar Historia <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="flex-1 w-full aspect-square md:aspect-auto md:h-80 bg-surface-dim/30 border border-outline-variant/20 rounded-3xl relative overflow-hidden flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent" />
               <Clock className="w-32 h-32 text-secondary/20" strokeWidth={1} />
            </div>
          </div>
        </motion.section>
      </div>

      {/* SECTION 3: Impact (Calculator) */}
      <div className="max-w-4xl w-full mx-auto">
        <motion.section 
          variants={chapterVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative py-12 px-4"
        >
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-dim border border-outline-variant/30 text-error text-[10px] uppercase font-mono tracking-widest rounded-full">
                <Activity className="w-3 h-3" />
                <span>Capítulo 3</span>
              </div>
              <h2 className="text-display-md">El Peso de los Números</h2>
              <p className="text-body-lg text-on-surface-variant leading-relaxed">
                El coste de nuestras decisiones no es solo moral, es físico. La cría animal es termodinámicamente ineficiente, requiriendo vastas cantidades de tierra, agua y alimento, y generando impactos catastróficos a nivel ecológico, desde la deforestación hasta el forzamiento climático por emisiones de metano.
              </p>
              <Button 
                onClick={() => onNavigate("calculadora")}
                variant="outline"
                className="mt-4 gap-2 group hover:border-error hover:text-error"
              >
                Abrir Cuantificador <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="flex-1 w-full aspect-square md:aspect-auto md:h-80 bg-surface-dim/30 border border-outline-variant/20 rounded-3xl relative overflow-hidden flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-tr from-error/5 to-transparent" />
               <Activity className="w-32 h-32 text-error/20" strokeWidth={1} />
            </div>
          </div>
        </motion.section>
      </div>

      {/* SECTION 4: Ethics (Dilemmas / AI) */}
      <div className="max-w-4xl w-full mx-auto px-4">
        <motion.section 
          variants={chapterVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative py-12"
        >
          <div className="glass-panel p-10 md:p-16 rounded-3xl border border-primary/20 bg-primary/5 text-center space-y-8">
            <Scale className="w-16 h-16 text-primary mx-auto opacity-80" strokeWidth={1} />
            <h2 className="text-display-md">Es hora de reflexionar</h2>
            <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              Hemos explorado la ciencia, la historia y el impacto físico. Ahora, la cuestión final recae en la integridad ética. Explora los dilemas socráticos, analiza tus propios argumentos con nuestra IA, o descubre las falacias más comunes que usamos para justificar el status quo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Button 
                onClick={() => onNavigate("dialectica")}
                className="bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container"
              >
                Explorar Tesis Socráticas
              </Button>
              <Button 
                onClick={() => onNavigate("validador")}
                variant="outline"
                className="hover:border-primary hover:text-primary"
              >
                Usar Analizador IA
              </Button>
            </div>
          </div>
        </motion.section>
      </div>
      {/* SECTION 5: About / Origin Story */}
      <div className="max-w-4xl w-full mx-auto px-4 pb-12">
        <motion.section 
          variants={chapterVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative py-12"
        >
          <div className="glass-panel p-10 md:p-16 rounded-3xl border border-outline-variant/30 bg-surface/50 text-left space-y-8">
            <div className="space-y-2">
              <span className="text-sm font-mono text-primary font-medium tracking-wider uppercase">Génesis del Proyecto</span>
              <h2 className="text-display-sm">Por qué existe Sintiens</h2>
            </div>
            
            <div className="prose prose-invert prose-p:text-on-surface-variant prose-p:leading-relaxed max-w-none space-y-6">
              <p>
                Aunque esta página cobró vida literalmente a finales de mayo de 2026 durante un viaje, la necesidad de estructurar esta información lleva latente al menos dos años. Soy un estudiante obsesionado con ordenar y presentar la información de la mejor forma posible.
              </p>
              <p>
                Todo empezó al descubrir la realidad del maltrato animal y empezar a investigar sobre la sintiencia y el veganismo. Me encontré con muchas áreas grises, pero sobre todo, me di cuenta de un patrón en mi entorno: había personas que estaban de acuerdo con la evidencia empírica pero no tomaban acción, y otras que se oponían frontalmente basándose en falacias sistemáticas y falta de contexto.
              </p>
              <p>
                Hoy en día tenemos acceso infinito a la información, pero está increíblemente desordenada. <strong>Sintiens</strong> nace de mi necesidad personal de recopilar, estructurar y presentar toda la evidencia disponible para que cada lector pueda llegar tan lejos como desee.
              </p>
              <p className="text-sm text-on-surface-variant/70 border-l-2 border-primary/30 pl-4 mt-8 italic">
                Nota de desarrollo: Este proyecto es una versión muy preliminar. Utilizo herramientas de Inteligencia Artificial para programar, analizar falacias y ayudar en la revisión sistemática de los argumentos, consciente de que pueden cometer errores. Todo aquí está en constante evolución; la intención es empezar poco a poco para, eventualmente, hacer algo mucho más grande.
              </p>
            </div>
          </div>
        </motion.section>
      </div>

    </div>
  );
}
