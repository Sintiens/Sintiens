import { useState, useEffect } from "react";
import { HelpCircle, Heart, Scale, Sparkles, ChevronDown, EyeOff, RotateCcw, Shuffle, Eye, HelpCircle as HelpIcon, Flame, Globe, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ReflectionItem {
  id: number;
  icon: any;
  title: string;
  question: string;
  reflection: string;
  deepDiveQuestion: string;
  colorClass: string;
  activeBorderClass: string;
  badgeText: string;
  broadCategory: "sintiencia" | "ecologia" | "etica" | "cultura";
}

const ALL_QUESTIONS: ReflectionItem[] = [
  {
    id: 1,
    icon: Heart,
    badgeText: "Coherencia Moral",
    broadCategory: "etica",
    title: "La paradoja de la empatía",
    question: "¿Por qué protegemos a los perros pero nos comemos a los cerdos?",
    reflection: "Las vacas, cerdos y aves experimentan alegría, dolor y apego de forma muy similar a un perro o un gato. Esta distinción suele responder más a la inercia de nuestras costumbres y tradiciones culinarias que a una diferencia neurobiológica real.",
    deepDiveQuestion: "¿Es esta distinción moral un axioma deducido por la razón, o simplemente una costumbre heredada que repetimos de forma automática?",
    colorClass: "from-rose-500/10 via-rose-500/5 to-transparent border-rose-200/50 dark:border-rose-900/30 text-rose-500 dark:text-rose-450",
    activeBorderClass: "border-rose-500/20 dark:border-rose-500/30"
  },
  {
    id: 2,
    icon: Scale,
    badgeText: "Alternativas",
    broadCategory: "etica",
    title: "La elección inofensiva",
    question: "¿Se puede vivir 100% sano sin comer nada de carne?",
    reflection: "Cuando nuestra supervivencia o salud no dependen de la explotación animal (gracias a la enorme abundancia de alternativas modernas), el consumo se convierte en una elección ética activa y diaria en lugar de una necesidad biológica.",
    deepDiveQuestion: "Si tenemos la libertad y el poder de evitar el dolor sin sacrificar nuestro propio bienestar, ¿no es la compasión la opción más coerente?",
    colorClass: "from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-200/50 dark:border-emerald-900/30 text-emerald-500 dark:text-emerald-400",
    activeBorderClass: "border-emerald-500/20 dark:border-emerald-500/30"
  },
  {
    id: 3,
    icon: Sparkles,
    badgeText: "Cultura",
    broadCategory: "cultura",
    title: "Costumbre y hábito",
    question: "¿Pero comer carne no es lo normal, lo natural y lo que hemos hecho toda la vida?",
    reflection: "Que una conducta sea mayoritaria, histórica o habitual no la convierte automáticamente en éticamente correcta. La historia humana está llena de tradiciones que decidimos superar cuando adquirimos mayor empatía y mejores alternativas.",
    deepDiveQuestion: "¿Deben las costumbres del pasado dictar nuestras decisiones éticas del presente, o tenemos la capacidad de diseñar una relación más respetuosa con nuestro entorno?",
    colorClass: "from-purple-500/10 via-purple-500/5 to-transparent border-purple-200/50 dark:border-purple-900/30 text-purple-600 dark:text-purple-400",
    activeBorderClass: "border-purple-500/20 dark:border-purple-500/30"
  },
  {
    id: 4,
    icon: Eye,
    badgeText: "Disonancia Cognitiva",
    broadCategory: "etica",
    title: "Placer frente a compasión",
    question: "Me da pena que sufran los animales, pero me gusta demasiado el sabor de la carne como para dejarla.",
    reflection: "Es un conflicto honesto y sumamente común. Reconocer que nos importa el bienestar animal pero nos frenan los hábitos sensoriales es el primer paso. No se trata de perfección inmediata, sino de empezar a reducir conscientemente y explorar deliciosas alternativas vegetales que recrean texturas familiares.",
    deepDiveQuestion: "Si coincidimos en que nuestro agrado o placer sensorial por algo no justifica causar dolor en otros ámbitos de la vida, ¿por qué permitimos esta excepción en nuestro plato?",
    colorClass: "from-amber-500/10 via-amber-500/5 to-transparent border-amber-200/50 dark:border-amber-900/30 text-amber-500 dark:text-amber-400",
    activeBorderClass: "border-amber-500/20 dark:border-amber-500/30"
  },
  {
    id: 5,
    icon: HelpIcon,
    badgeText: "Inteligencia",
    broadCategory: "sintiencia",
    title: "El criterio ético",
    question: "¿Pero los humanos no somos superiores y más inteligentes que el resto de animales?",
    reflection: "Nuestra mayor capacidad tecnológica y cognitiva nos confiere un gran poder, pero el poder no legitima moralmente el sometimiento del vulnerable. La sintiencia (la capacidad de sufrir y disfrutar la vida) no depende de la inteligencia: un cerdo experimenta el dolor con el mismo pavor que un humano.",
    deepDiveQuestion: "Si la inteligencia no define la consideración moral entre los propios seres humanos (respetamos a todos por igual sin importar su coeficiente intelectual), ¿por qué la usamos como frontera con otras especies?",
    colorClass: "from-blue-500/10 via-blue-500/5 to-transparent border-blue-200/50 dark:border-blue-900/30 text-blue-500 dark:text-blue-400",
    activeBorderClass: "border-blue-500/20 dark:border-blue-500/30"
  },
  {
    id: 6,
    icon: Globe,
    badgeText: "Medio Ambiente",
    broadCategory: "ecologia",
    title: "El coste del plato",
    question: "¿De verdad comer animales destruye el planeta?",
    reflection: "La evidencia científica is rotunda: la cría animal es uno de los motores principales de la deforestación (para pastos y soja forrajera), el gasto masivo de agua dulce y las emisiones de gases de efecto invernadero. Comer plantas de forma directa elimina al intermediario animal, reduciendo drásticamente nuestra huella ecológica.",
    deepDiveQuestion: "¿Es sostenible y lógicamente defendible alimentar a miles de millones de animales de granja para luego consumirlos, en lugar de destinar esas tierras a alimentarnos de forma directa y eficiente?",
    colorClass: "from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-200/50 dark:border-emerald-900/30 text-emerald-500 dark:text-emerald-400",
    activeBorderClass: "border-emerald-500/20 dark:border-emerald-500/30"
  },
  {
    id: 7,
    icon: Flame,
    badgeText: "Biología",
    broadCategory: "sintiencia",
    title: "La falsa equivalencia vegetal",
    question: "¿Pero las plantas no sienten dolor también al cosecharlas?",
    reflection: "Las plantas reaccionan a estímulos físicos mediante impulsos químicos, pero carecen de sistema nervioso central, cerebro y receptores de dolor (nociceptores), por lo que no poseen una experiencia subjetiva del sufrimiento. Además, comer carne exige cosechar hasta diez veces más plantas para alimentar al ganado.",
    deepDiveQuestion: "¿Utilizamos a veces la hipotética 'vida de las plantas' como un escudo lógico para calmar la culpa real que nos provoca presenciar el sufrimiento de un animal sintiente?",
    colorClass: "from-red-500/10 via-red-500/5 to-transparent border-red-200/50 dark:border-red-900/30 text-red-500 dark:text-red-450",
    activeBorderClass: "border-red-500/20 dark:border-red-500/30"
  },
  {
    id: 8,
    icon: Scale,
    badgeText: "Derecho Natural",
    broadCategory: "etica",
    title: "Criados para consumo",
    question: "¿Qué tiene de malo comer carne si a estos animales los criamos específicamente para eso?",
    reflection: "El hecho de que demos la vida a un ser sintiente no nos otorga la legitimidad moral para arrebatársela o someterlo a un ciclo industrial de sufrimiento. Traer una vida al mundo con el único plan preconcebido de explotarla no aminora éticamente el dolor de su muerte.",
    deepDiveQuestion: "Si criáramos perros o incluso humanos específicamente para un fin cruel, ¿consideraríamos que el origen del nacimiento justifica moralmente el trato recibido?",
    colorClass: "from-indigo-500/10 via-indigo-500/5 to-transparent border-indigo-200/50 dark:border-indigo-900/30 text-indigo-500 dark:text-indigo-400",
    activeBorderClass: "border-indigo-500/20 dark:border-indigo-500/30"
  },
  {
    id: 9,
    icon: Heart,
    badgeText: "Acción Colectiva",
    broadCategory: "etica",
    title: "El impacto individual",
    question: "¿De verdad sirve de algo que yo deje de comer carne si la gente va a seguir comiendo carne igual?",
    reflection: "El mercado funciona por oferta y demanda: cada persona que decide no consumir carne reduce la estadística anual de compra de manera real (ahorrando cientos de vidas a lo largo de su existencia). Además, tu ejemplo inspira y normaliza opciones compasivas en tu círculo cercano, impulsando un cambio social real.",
    deepDiveQuestion: "Si ningún gran cambio histórico habría comenzado si los primeros individuos hubieran pensado que su acción solitaria no serviría de nada, ¿no es nuestro ejemplo la herramienta más transformadora que poseemos?",
    colorClass: "from-rose-500/10 via-rose-500/5 to-transparent border-rose-200/50 dark:border-rose-900/30 text-rose-500 dark:text-rose-450",
    activeBorderClass: "border-rose-500/20 dark:border-rose-500/30"
  },
  {
    id: 10,
    icon: Scale,
    badgeText: "Ley Natural",
    broadCategory: "cultura",
    title: "La ética en la naturaleza",
    question: "¿Por qué está mal que comamos carne si los animales también se comen entre sí en la naturaleza?",
    reflection: "Un animal salvaje caza por instinto ciego y estricta necesidad biológica para sobrevivir, careciendo de brújula ética o alternativas alimentarias. Los humanos en sociedades modernas tenemos abundancia de alternativas y la capacidad racional de decidir no causar daño innecesario.",
    deepDiveQuestion: "Dado que no imitamos el resto de conductas naturales o brutales de los animales salvajes para regular nuestras leyes sociales, ¿por qué los tomamos como referente ético únicamente para lo que decidimos comer?",
    colorClass: "from-amber-500/10 via-amber-500/5 to-transparent border-amber-200/50 dark:border-amber-900/30 text-amber-500 dark:text-amber-400",
    activeBorderClass: "border-emerald-500/20 dark:border-emerald-500/30"
  },
  {
    id: 11,
    icon: HelpIcon,
    badgeText: "Nutrición",
    broadCategory: "sintiencia",
    title: "Salud y vigor",
    question: "¿Si no como carne, no me sentiré débil, cansado o con falta de proteínas?",
    reflection: "Es uno de los temores más infundados. Los principales consensos médicos y de nutrición mundiales afirman que una dieta vegetal bien estructurada aporta todos los nutrientes necesarios (incluyendo proteínas completas, hierro y calcio) para cualquier etapa de la vida o nivel de rendimiento atlético de élite.",
    deepDiveQuestion: "Si la ciencia respalda unánimemente que una dieta vegetal bien planificada es saludable y óptima, ¿sigue siendo la nutrición un impedimento biológico o una barrera puramente psicológica?",
    colorClass: "from-blue-500/10 via-blue-500/5 to-transparent border-blue-200/50 dark:border-blue-900/30 text-blue-500 dark:text-blue-450",
    activeBorderClass: "border-blue-500/20 dark:border-blue-500/30"
  },
  {
    id: 12,
    icon: Globe,
    badgeText: "Economía Doméstica",
    broadCategory: "ecologia",
    title: "Precio y accesibilidad",
    question: "¿Pero comer a base de plantas no es muchísimo más caro y difícil?",
    reflection: "Los ingredientes más económicos, saludables y abundantes del planeta (legumbres, arroz, patatas, avena, pasta y verduras locales) son 100% vegetales. El coste elevado y la dificultad suelen asociarse erróneamente a los productos procesados imitación carne, los cuales son ricos pero totalmente opcionales.",
    deepDiveQuestion: "Si la cesta de la compra basada en materias primas vegetales sin procesar es la más económica del mundo, ¿por qué persiste el mito de que comer éticamente es un lujo?",
    colorClass: "from-emerald-500/10 via-emerald-500/5 to-transparent border-emerald-200/50 dark:border-emerald-900/30 text-emerald-500 dark:text-emerald-400",
    activeBorderClass: "border-emerald-500/20 dark:border-emerald-500/30"
  },
  {
    id: 13,
    icon: Sparkles,
    badgeText: "Psicología Social",
    broadCategory: "cultura",
    title: "El distanciamiento cognitivo",
    question: "¿Por qué compramos la carne en bandejas asépticas que no nos recuerdan para nada al animal vivo?",
    reflection: "Nuestra mente necesita protegernos del malestar moral. La industria alimentaria utiliza la comercialización aséptica del filete para desvincular psicológicamente el producto final del proceso industrial del matadero, permitiendo el consumo sin activar nuestra empatía natural por el animal sufriente.",
    deepDiveQuestion: "¿Es éticamente sólido delegar sistemáticamente en terceros un proceso industrial de muerte que nos causaría profunda repulsión, rechazo o compasión presenciar directamente?",
    colorClass: "from-purple-500/10 via-purple-500/5 to-transparent border-purple-200/50 dark:border-purple-600/40 text-purple-600 dark:text-purple-400",
    activeBorderClass: "border-purple-500/20 dark:border-purple-500/30"
  },
  {
    id: 14,
    icon: Globe,
    badgeText: "Ecosistemas",
    broadCategory: "ecologia",
    title: "El futuro de las especies domésticas",
    question: "Si todo el mundo dejara de comer carne, ¿qué haríamos con las miles de millones de vacas y cerdos?",
    reflection: "La transición global a una dieta vegetal sería gradual y progresiva a lo largo de décadas, no de un día para otro. Conforme disminuyera la demanda de carne, las granjas criarían artificialmente a menos animales cada año, reduciendo su población doméstica a números sostenibles y pacíficos para la naturaleza.",
    deepDiveQuestion: "Si criamos de forma artificial y masiva a estos animales únicamente para matarlos a los pocos meses de edad, ¿realmente los estamos protegiendo de la extinción o sosteniendo un ciclo mercantilizado de nacimiento y muerte?",
    colorClass: "from-cyan-500/10 via-cyan-500/5 to-transparent border-cyan-200/50 dark:border-cyan-900/30 text-cyan-500 dark:text-cyan-400",
    activeBorderClass: "border-cyan-500/20 dark:border-cyan-500/30"
  },
  {
    id: 15,
    icon: Sparkles,
    badgeText: "Economía y Sociedad",
    broadCategory: "cultura",
    title: "La transición socioeconómica",
    question: "¿Si dejamos de comer carne, no arruinaríamos el empleo de millones de familias ganaderas?",
    reflection: "Toda evolución moral e industrial conlleva una reestructuración del empleo. Así como en el pasado sustituimos carruajes por automóviles, los ganaderos y agricultores se adaptan y reorientan progresivamente hacia cultivos de legumbres, avena, frutos secos o la floreciente industria de proteínas vegetales, generando empleo verde y sostenible.",
    deepDiveQuestion: "¿Es éticamente justificable seguir financiar la explotación y el sufrimiento sistematizado de seres sintientes con el único propósito corporativo de salvaguardar un sector económico obsoleto?",
    colorClass: "from-indigo-500/10 via-indigo-500/5 to-transparent border-indigo-200/50 dark:border-indigo-900/30 text-indigo-500 dark:text-indigo-400",
    activeBorderClass: "border-indigo-500/20 dark:border-indigo-500/30"
  },
  {
    id: 16,
    icon: Scale,
    badgeText: "Supervivencia",
    broadCategory: "etica",
    title: "La isla desierta",
    question: "Si estuvieras en una isla desierta y solo hubiera un animal para sobrevivir, ¿te lo comerías?",
    reflection: "En una situación de supervivencia límite donde peligra nuestra vida de verdad, alimentarse de carne se vuelve una estricta necesidad biológica justificada por la autopreservación. Sin embargo, en nuestro día a día moderno no estamos en esa isla desierta y gozamos de infinitas alternativas vegetales saludables en el supermercado.",
    deepDiveQuestion: "¿Por qué recurrimos sistemáticamente a fantasías hipotéticas de supervivencia extrema en islas desiertas para tratar de justificar las cómodas decisiones alimentarias que tomamos a diario?",
    colorClass: "from-rose-500/10 via-rose-500/5 to-transparent border-rose-200/50 dark:border-rose-900/30 text-rose-500 dark:text-rose-450",
    activeBorderClass: "border-rose-500/20 dark:border-rose-500/30"
  }
];

export default function SocraticReflection() {
  const [visibleQuestions, setVisibleQuestions] = useState<ReflectionItem[]>([]);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [spinDegrees, setSpinDegrees] = useState<number>(0);
  const [shuffleKey, setShuffleKey] = useState<number>(0);

  // Get 4 random questions from 4 categories (3 visible on mobile, 4 on desktop)
  const getRandomQuestions = (currentQuestions: ReflectionItem[] = []) => {
    const categories: ("sintiencia" | "ecologia" | "etica" | "cultura")[] = ["sintiencia", "ecologia", "etica", "cultura"];
    return categories.map(cat => {
      const pool = ALL_QUESTIONS.filter(q => q.broadCategory === cat);
      const currentOfCat = currentQuestions.find(q => q.broadCategory === cat);
      
      if (currentOfCat && pool.length > 1) {
        const otherPool = pool.filter(q => q.id !== currentOfCat.id);
        return otherPool[Math.floor(Math.random() * otherPool.length)]!;
      }
      
      return pool[Math.floor(Math.random() * pool.length)]!;
    });
  };

  useEffect(() => {
    setVisibleQuestions(getRandomQuestions());
  }, []);

  const handleShuffle = () => {
    setExpandedCard(null);
    setSpinDegrees(prev => prev + 360);
    setTimeout(() => {
      setVisibleQuestions(prev => getRandomQuestions(prev));
      setShuffleKey(prev => prev + 1);
    }, 150);
  };

  const handleToggleCard = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  // Find the selected question details
  const activeQuestion = visibleQuestions.find(q => q.id === expandedCard);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-transparent pb-12 pt-2 relative transition-all duration-300"
    >
      {/* Header of the reflection box */}
      <div className="flex flex-row items-center lg:items-end gap-4 lg:gap-8 pb-4 mb-2 relative z-10 px-4">
        <div className="flex-1 min-w-[60%] lg:min-w-0 pr-10 lg:pr-0">
          <h3 className="text-4xl md:text-5xl font-serif text-zinc-900 dark:text-zinc-100 tracking-tight leading-none pl-4">
            Preguntas Comunes<br />& Reflexiones
          </h3>
        </div>
        
        <div className="shrink-0 mr-5 xl:mr-20">
          <button
            onClick={handleShuffle}
            className="flex items-center gap-1 text-[10px] font-bold font-mono text-zinc-400 hover:text-primary transition-colors cursor-pointer uppercase tracking-widest select-none"
            title="Cambiar preguntas"
          >
            <RotateCcw 
              className="w-3.5 h-3.5 transition-transform duration-500" 
              style={{ transform: `rotate(${spinDegrees}deg)` }} 
            />
            <span className="hidden lg:inline">Nuevas Preguntas</span>
          </button>
        </div>
      </div>

      {/* Main stable layout with smooth entrance animation on shuffle key change */}
      <div className="relative z-10 w-full bg-transparent">
        <motion.div 
          key={shuffleKey}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col lg:flex-row w-full relative gap-0"
        >
          {visibleQuestions.map((item, index) => {
            const isExpanded = expandedCard === item.id;
            const isAnyExpanded = expandedCard !== null;
            const isThisCollapsed = isAnyExpanded && !isExpanded;
            const isFourthCard = index === 3;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                layout
                transition={{
                  layout: { type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.35 },
                  opacity: { type: "tween", ease: "easeOut", duration: 0.2 }
                }}
                onClick={() => !isExpanded && handleToggleCard(item.id)}
                className={`group flex flex-col text-left bg-transparent relative overflow-hidden transition-colors duration-300 select-none ${
                  isExpanded
                    ? `border border-zinc-200 dark:border-zinc-800 shadow-lg p-6 lg:p-12 w-full h-auto min-h-[500px] lg:flex-[3] bg-white dark:bg-zinc-900 z-10 my-4`
                    : isThisCollapsed
                    ? "w-0 lg:w-0 h-0 lg:h-0 opacity-0 p-0 border-0 overflow-hidden pointer-events-none lg:flex-[0]"
                    : `border border-zinc-200 dark:border-zinc-800 border-b-0 last:border-b lg:border-b lg:border-l-0 lg:first:border-l hover:bg-zinc-50 dark:hover:bg-zinc-900/50 cursor-pointer lg:flex-1 min-h-[160px] lg:h-[280px] p-6 lg:p-8 w-full ${isFourthCard && !isExpanded ? "max-lg:hidden" : ""} ${index === 2 && !isExpanded ? "max-lg:border-b" : ""}`
                }`}
              >
                {!isThisCollapsed && (
                  <div className="w-full h-full flex flex-col justify-between relative z-10">
                    {!isExpanded ? (
                      // Collapsed Card Content
                      <div className="flex flex-col justify-between h-full w-full">
                        <div>
                          <div className="flex items-start justify-between w-full mb-4">
                            <Icon className="w-6 h-6 text-zinc-900 dark:text-zinc-200" strokeWidth={1.5} />
                          </div>

                          <div className="space-y-4">
                            <h4 className="text-[20px] lg:text-[24px] font-serif italic text-zinc-900 dark:text-zinc-100 leading-[1.2]">
                              "{item.question}"
                            </h4>
                          </div>
                        </div>

                        <div className="mt-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleCard(item.id);
                            }}
                            className="w-full pt-4 border-t border-zinc-100 dark:border-zinc-800/50 text-[10px] font-bold font-mono tracking-widest text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors flex items-center justify-between gap-2 cursor-pointer focus:outline-none uppercase"
                          >
                            <span>Profundizar</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Expanded Card Content
                      <div className="flex flex-col lg:flex-row gap-12 w-full h-full">
                        {/* Column 1: The Question & Toggle Return */}
                        <div className="flex flex-col justify-between h-full space-y-8 lg:w-1/2 lg:border-r border-zinc-200 dark:border-zinc-800 lg:pr-12">
                          <div className="space-y-6">
                            <span className="inline-block text-[10px] font-sans font-bold tracking-widest text-zinc-400 uppercase">
                              {item.badgeText}
                            </span>
                            <h4 className="text-[32px] md:text-4xl font-serif italic text-zinc-900 dark:text-zinc-100 leading-[1.2]">
                              "{item.question}"
                            </h4>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleCard(item.id);
                            }}
                            className="w-full pt-6 border-t border-zinc-100 dark:border-zinc-800/50 text-[10px] font-bold font-mono tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors flex items-center justify-between cursor-pointer focus:outline-none uppercase"
                          >
                            <span>Cerrar Reflexión</span>
                            <ArrowRight className="w-4 h-4 rotate-180" />
                          </button>
                        </div>

                        {/* Column 2: Detailed Reflection & Deep Dive */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.15, duration: 0.3 }}
                          className="flex flex-col justify-between h-full lg:w-1/2 space-y-10"
                        >
                          <div className="space-y-12">
                            <div className="space-y-4">
                              <h4 className="text-[10px] font-bold text-zinc-400 font-mono uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-800/50 pb-2">
                                Análisis Racional
                              </h4>
                              <div className="text-[15px] text-zinc-600 dark:text-zinc-400 leading-[1.8] font-light">
                                {item.reflection}
                              </div>
                            </div>

                            <div className="space-y-4">
                              <h4 className="text-[10px] font-bold text-zinc-400 font-mono uppercase tracking-widest border-b border-zinc-100 dark:border-zinc-800/50 pb-2">
                                Ejercicio Deductivo
                              </h4>
                              <div className="bg-zinc-50 dark:bg-zinc-900/50 p-8 border border-zinc-200 dark:border-zinc-800">
                                <p className="text-[17px] text-zinc-900 dark:text-zinc-200 leading-[1.6] italic font-serif">
                                  &ldquo;{item.deepDiveQuestion}&rdquo;
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}
