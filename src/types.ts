export type ConsensusType = "CONSENSO" | "ESCENARIO_GRIS" | "DILEMA" | "FALACIA";

export interface ReferenceDetail {
  id: string; // e.g. "1", "2"
  citation: string; // Full APA citation
  url?: string; // Optional official link/DOI
}

export interface NodeDetail {
  id: string;
  category: "sintiencia" | "etica" | "psicologia" | "sistemas_uso" | "ecologia" | "legal";
  title: string;
  shortDesc: string;
  longDesc: string;
  scientificFacts: string[];
  connections: string[]; // connects to other node IDs
  citation?: string; // Legacy field for backwards compatibility
  references?: ReferenceDetail[];
  openQuestion?: string;
}

export interface DilemmaDetail {
  id: string;
  category: "sintiencia" | "etica" | "psicologia" | "sistemas_uso" | "ecologia" | "legal";
  title: string;
  popularStatement: string;
  consensus: ConsensusType;
  scientificDeconstruction: string;
  philosophicalDeconstruction: string;
  coexistenceImpact: string;
  citation?: string; // Legacy field for backwards compatibility
  references?: ReferenceDetail[];
  openQuestion?: string;
}

export const CORE_NODES: NodeDetail[] = [
  // I. SINTIENCIA Y NEUROBIOLOGÍA
  {
    id: "neuroanatomia-consciencia",
    category: "sintiencia",
    title: "Neuroanatomía de la Consciencia",
    shortDesc: "Sustratos neurológicos de las emociones y la homología cerebral entre especies.",
    longDesc: "La ciencia moderna demuestra que el dolor y la consciencia no son exclusivos de los humanos. La Declaración de Cambridge (2012) confirmó que mamíferos, aves y otras especies poseen los sustratos neuroanatómicos, neuroquímicos y neurofisiológicos necesarios para la consciencia y el sufrimiento emocional. La evolución ha convergido en estructuras análogas que procesan estas experiencias [1].",
    scientificFacts: [
      "El cerebro de los vertebrados posee estructuras homólogas a las humanas, como el tálamo y la amígdala, encargadas de procesar el miedo y el sufrimiento subjetivo [1].",
      "La Declaración de Nueva York (2024) amplió este consenso a pulpos, decápodos e insectos, indicando que existen múltiples arquitecturas neuronales capaces de sostener la sintiencia [2]."
    ],
    connections: ["neurobiologia-dolor", "etologia-cognitiva", "casos-marginales"],
    citation: "Low, P. et al. (2012). The Cambridge Declaration on Consciousness.",
    references: [
      {
        id: "1",
        citation: "Low, P., Panksepp, J., Reiss, D., Edelman, D., Van Swinderen, B., & Koch, C. (2012). The Cambridge Declaration on Consciousness.",
        url: "https://fcmconference.org/img/CambridgeDeclarationOnConsciousness.pdf"
      },
      {
        id: "2",
        citation: "Andrews, K., et al. (2024). The New York Declaration on Animal Consciousness."
      }
    ]
  },
  {
    id: "neurobiologia-dolor",
    category: "sintiencia",
    title: "La Neurobiología del Dolor",
    shortDesc: "La diferencia crucial entre la simple nocicepción refleja y la experiencia consciente del dolor y el estrés.",
    longDesc: "Existe una diferencia fundamental entre la 'nocicepción' (un simple reflejo biológico automático ante un daño) y el dolor consciente. El dolor subjetivo tiene dimensiones afectivas: provoca estrés crónico, miedo y un deseo activo de evitarlo en el futuro. Los animales explotados en la ganadería no solo experimentan daño tisular agudo, sino un profundo sufrimiento emocional derivado del cautiverio y el terror [1].",
    scientificFacts: [
      "Los animales muestran conductas avanzadas como el 'trade-off' motivacional: soportan el dolor solo si la recompensa es muy alta, evidenciando que evalúan el sufrimiento conscientemente [1].",
      "Peces y aves administran analgésicos de forma autónoma cuando sufren lesiones, demostrando respuestas afectivas al dolor [2]."
    ],
    connections: ["neuroanatomia-consciencia", "sistemas-alimentacion", "legislacion-bienestar"],
    citation: "Sneddon, L. U. (2019). Clinical signs of pain in vertebrates.",
    references: [
      {
        id: "1",
        citation: "Sneddon, L. U. (2019). Clinical signs of pain in vertebrates and invertebrates. Journal of Experimental Biology, 222(14).",
        url: "https://doi.org/10.1242/jeb.205773"
      },
      {
        id: "2",
        citation: "Braithwaite, V. A. (2010). Do Fish Feel Pain? Oxford University Press."
      }
    ]
  },
  {
    id: "etologia-cognitiva",
    category: "sintiencia",
    title: "Etología Cognitiva y Social",
    shortDesc: "Capacidades de resolución de problemas, memoria episódica y estructuras afectivas en otras especies.",
    longDesc: "Más allá del sufrimiento, los animales poseen ricas vidas cognitivas y sociales. La etología cognitiva ha demostrado que muchas especies de granja, como cerdos y vacas, poseen excelente memoria episódica, comprenden conceptos espaciales y de tiempo, y establecen profundos vínculos afectivos y familiares. Son capaces de experimentar duelo por la separación de sus crías o compañeros, un sufrimiento psicológico sistemáticamente ignorado por la industria [1].",
    scientificFacts: [
      "Los cerdos superan a muchas mascotas domésticas en tareas de resolución de problemas y uso de espejos, demostrando niveles de autoconciencia espacial [1].",
      "Las vacas exhiben respuestas fisiológicas de estrés extremo (aumento de cortisol y vocalizaciones de angustia) cuando son separadas de sus crías al nacer en la industria láctea [2]."
    ],
    connections: ["neuroanatomia-consciencia", "categorizacion-sociocultural"],
    citation: "Marino, L., & Colvin, C. M. (2015). Thinking pigs.",
    references: [
      {
        id: "1",
        citation: "Marino, L., & Colvin, C. M. (2015). Thinking pigs: A comparative review of cognition, emotion, and personality. International Journal of Comparative Psychology, 28."
      },
      {
        id: "2",
        citation: "Weary, D. M., & Chua, B. (2000). Effects of early separation on the dairy cow and calf. Applied Animal Behaviour Science, 69(3), 177-188."
      }
    ]
  },

  // II. FILOSOFÍA, ÉTICA Y MORAL
  {
    id: "recorrido-historico-estatus",
    category: "etica",
    title: "Recorrido Histórico del Estatus",
    shortDesc: "Del mecanicismo cartesiano al utilitarismo moderno.",
    longDesc: "La concepción moral del animal ha evolucionado. Durante siglos dominó el mecanicismo (impulsado por Descartes), que consideraba a los animales como meros autómatas biológicos sin alma ni capacidad de sentir [1]. Posteriormente, el utilitarismo clásico de Jeremy Bentham revolucionó la ética al plantear que la verdadera pregunta no es '¿pueden razonar?' ni '¿pueden hablar?', sino '¿pueden sufrir?'. Este cambio de paradigma estableció la capacidad de sufrir como el único criterio moral válido [2].",
    scientificFacts: [
      "La ciencia moderna ha refutado por completo el mecanicismo, validando las intuiciones de Bentham sobre la sintiencia universal [2].",
      "La ética secular establece que si un ser tiene la capacidad de sufrir, ese sufrimiento debe ser considerado en pie de igualdad al nuestro [1]."
    ],
    connections: ["marcos-eticos", "estatus-juridico", "neuroanatomia-consciencia"],
    citation: "Bentham, J. (1789). An Introduction to the Principles of Morals.",
    references: [
      {
        id: "1",
        citation: "Descartes, R. (1637). Discurso del método."
      },
      {
        id: "2",
        citation: "Bentham, J. (1789). An Introduction to the Principles of Morals and Legislation. T. Payne and Son."
      }
    ]
  },
  {
    id: "especismo",
    category: "etica",
    title: "El Concepto de Especismo",
    shortDesc: "La discriminación arbitraria basada en la especie biológica y el conflicto de intereses.",
    longDesc: "El especismo es un sesgo cognitivo y moral sistemático que discrimina a un individuo únicamente por no pertenecer a la especie humana [1]. Desde un punto de vista analítico, se produce un conflicto injusto cuando sometemos los intereses fundamentales de los animales (el interés supremo de vivir y no ser torturados) para satisfacer nuestros intereses periféricos o triviales (placer gustativo, tradición o conveniencia) [2].",
    scientificFacts: [
      "Filosóficamente, usar la 'inteligencia' como barrera moral (el problema de los casos marginales) excluiría de derechos básicos a humanos con diversidad funcional cognitiva [2].",
      "El rechazo al especismo no implica tratar a todos igual (no tiene sentido dar derecho a voto a un perro), sino dar igual consideración a intereses similares, como evitar el dolor [1]."
    ],
    connections: ["recorrido-historico-estatus", "disonancia-placer", "marcos-eticos"],
    citation: "Singer, P. (1975). Animal Liberation.",
    references: [
      {
        id: "1",
        citation: "Ryder, R. D. (1970). Speciesism. (First coined in a printed leaflet)."
      },
      {
        id: "2",
        citation: "Singer, P. (1975). Animal Liberation: A New Ethics. HarperCollins."
      }
    ]
  },
  {
    id: "marcos-eticos",
    category: "etica",
    title: "Marcos Éticos Contemporáneos",
    shortDesc: "La diferencia entre el bienestarismo compasivo y el abolicionismo de derechos.",
    longDesc: "El debate ético actual se divide en dos corrientes. El 'Bienestarismo' acepta el uso y consumo de animales por parte de los humanos, pero condiciona este uso a la minimización del daño, buscando jaulas más grandes o mataderos aturdidos [1]. El 'Abolicionismo' (o teoría de los Derechos Animales) sostiene que el animal es un fin en sí mismo, un 'sujeto-de-una-vida', y rechaza frontalmente su estatus legal como propiedad humana o mercancía, argumentando que una esclavitud 'humanitaria' sigue siendo esclavitud [2].",
    scientificFacts: [
      "Las reformas bienestaristas a menudo actúan como un placebo psicológico para el consumidor, perpetuando el sistema de uso en lugar de desmantelarlo [1].",
      "El enfoque de capacidades de Martha Nussbaum defiende que cada animal tiene un derecho moral inalienable a florecer de acuerdo a su naturaleza biológica [2]."
    ],
    connections: ["especismo", "legislacion-bienestar", "estatus-juridico"],
    citation: "Regan, T. (1983). The Case for Animal Rights.",
    references: [
      {
        id: "1",
        citation: "Francione, G. L. (1996). Rain Without Thunder: The Ideology of the Animal Rights Movement. Temple University Press."
      },
      {
        id: "2",
        citation: "Regan, T. (1983). The Case for Animal Rights. University of California Press."
      }
    ]
  },

  // III. PSICOLOGÍA HUMANA Y CONSISTENCIA SOCIAL
  {
    id: "disonancia-placer",
    category: "psicologia",
    title: "Disonancia y Paradoja de la Carne",
    shortDesc: "La tensión psicológica entre nuestro rechazo al maltrato y nuestro consumo pasivo.",
    longDesc: "La inmensa mayoría de las personas se opone firmemente al maltrato animal. Sin embargo, participan diariamente en el consumo de productos que requieren un nivel de violencia sistemática sin precedentes. A esta fractura mental la psicología la llama 'la paradoja de la carne' [1]. Para soportar esta tensión insostenible (disonancia cognitiva), la mente humana despliega una serie de autoengaños y bloqueos emocionales para evitar conectar el producto final con la víctima original [2].",
    scientificFacts: [
      "Estudios demuestran que, antes de consumir carne, las personas rebajan subconscientemente la inteligencia atribuida al animal que van a comer para aliviar su culpa [1].",
      "La disonancia cognitiva se alimenta por la desconexión espacial: la industria oculta deliberadamente los mataderos lejos de los núcleos urbanos [2]."
    ],
    connections: ["categorizacion-sociocultural", "consistencia-moral", "especismo"],
    citation: "Loughnan, S. et al. (2010). The role of meat consumption in the denial of moral status.",
    references: [
      {
        id: "1",
        citation: "Loughnan, S., Haslam, N., & Bastian, B. (2010). The role of meat consumption in the denial of moral status and mind to meat animals. Appetite, 55(1), 156-159."
      },
      {
        id: "2",
        citation: "Joy, M. (2010). Why We Love Dogs, Eat Pigs, and Wear Cows: An Introduction to Carnism. Conari Press."
      }
    ]
  },
  {
    id: "categorizacion-sociocultural",
    category: "psicologia",
    title: "Mecanismos de Categorización",
    shortDesc: "Cómo el lenguaje y la cultura deciden a quién amamos y a quién devoramos.",
    longDesc: "Nuestra brújula moral con los animales está distorsionada por la categorización arbitraria que nos impone la cultura desde la infancia. Compartimentamos moralmente a las especies: los perros son 'Mascotas/Familia' (sujetos a derechos), los cerdos son 'Recursos/Alimento' (objetos mercantilizados) y las ratas son 'Plagas' (objetos de exterminio) [1]. El lenguaje actúa como anestésico usando 'referentes ausentes' (decimos 'ternera', no 'becerro decapitado') para invisibilizar el proceso productivo y desensibilizar sistemáticamente al consumidor [2].",
    scientificFacts: [
      "El ecofeminismo ha demostrado cómo la maquinaria industrial cosifica simultáneamente a la naturaleza, a los animales y a los grupos humanos marginados mediante mecanismos lingüísticos idénticos [2].",
      "Estas clasificaciones no tienen ninguna base biológica real: un cerdo es cognitivamente más avanzado que un perro y su capacidad de sufrir es exactamente la misma [1]."
    ],
    connections: ["disonancia-placer", "etologia-cognitiva", "historia-dominacion"],
    citation: "Adams, C. J. (1990). The Sexual Politics of Meat.",
    references: [
      {
        id: "1",
        citation: "Joy, M. (2010). Why We Love Dogs, Eat Pigs, and Wear Cows: An Introduction to Carnism. Conari Press."
      },
      {
        id: "2",
        citation: "Adams, C. J. (1990). The Sexual Politics of Meat: A Feminist-Vegetarian Critical Theory. Continuum."
      }
    ]
  },
  {
    id: "consistencia-moral",
    category: "psicologia",
    title: "La Consistencia Moral",
    shortDesc: "El análisis de la brecha entre los valores declarados y el comportamiento práctico.",
    longDesc: "La consistencia moral es el pilar de un comportamiento ético íntegro. Existe una falla masiva en la arquitectura social: nuestros valores declarados ('amo a los animales', 'odio la injusticia') no están alineados con nuestra práctica diaria en el supermercado [1]. El despertar ético (el veganismo como postura moral) no consiste en adquirir nuevos valores radicales, sino simplemente en empezar a vivir de forma alineada y consistente con los valores de paz y justicia que ya poseemos [2].",
    scientificFacts: [
      "La psicología muestra que cuando los humanos logran alinear sus acciones con sus valores compasivos (cerrando la brecha de la disonancia), experimentan mejoras significativas en su bienestar psicológico a largo plazo [1]."
    ],
    connections: ["disonancia-placer", "vias-transicion"],
    citation: "Francione, G. L. (2000). Introduction to Animal Rights.",
    references: [
      {
        id: "1",
        citation: "Francione, G. L. (2000). Introduction to Animal Rights: Your Child or the Dog? Temple University Press."
      },
      {
        id: "2",
        citation: "Bastian, B., & Loughnan, S. (2017). Resolving the Meat-Paradox: A Motivational Account of Moral Disengagement. Personality and Social Psychology Review, 21(3), 278-299."
      }
    ]
  },

  // IV. ANTROPOCENTRISMO Y SISTEMAS DE USO
  {
    id: "historia-dominacion",
    category: "sistemas_uso",
    title: "Historia de la Dominación",
    shortDesc: "La transición histórica hacia la domesticación y la modificación genética.",
    longDesc: "Para comprender el presente antropocéntrico debemos mirar al Neolítico. La domesticación animal marcó el punto donde el humano dejó de convivir con la naturaleza para someterla [1]. Los animales dejaron de ser individuos autónomos para convertirse en herramientas y en la primera forma de 'propiedad' biológica. Durante siglos de selección artificial y modificación genética, hemos retorcido sus cuerpos para forzar extrema docilidad y un rendimiento productivo monstruoso (gallinas que ponen 300 huevos al año frente a los 15 de sus ancestros) que les causa enormes dolores físicos crónicos [2].",
    scientificFacts: [
      "El cuerpo de los pollos de engorde modernos ('broilers') crece tan rápido (un 400% más rápido que hace 50 años) que sus patas no pueden sostenerlos y sufren fallos cardíacos [2].",
      "La domesticación originó el concepto moderno de propiedad privada y sentó las bases para los primeros sistemas estatales de control [1]."
    ],
    connections: ["sistemas-alimentacion", "categorizacion-sociocultural"],
    citation: "Scott, J. C. (2017). Against the Grain.",
    references: [
      {
        id: "1",
        citation: "Scott, J. C. (2017). Against the Grain: A Deep History of the Earliest States. Yale University Press."
      },
      {
        id: "2",
        citation: "Webster, J. (2008). Animal Welfare: Limiting Pain and Suffering. Wiley-Blackwell."
      }
    ]
  },
  {
    id: "sistemas-alimentacion",
    category: "sistemas_uso",
    title: "Sistemas de Alimentación Masiva",
    shortDesc: "La maquinaria industrial del hacinamiento y el colapso de los océanos.",
    longDesc: "La cúspide del antropocentrismo son las Granjas Factoría (CAFOs) y la Pesca Industrial. En la ganadería intensiva, el animal queda atrapado en ciclos de engorde acelerados, sometido a confinamiento perpetuo y mutilaciones estandarizadas sin anestesia (corte de picos, rabos y castración) [1]. Simultáneamente, la acuicultura intensiva y las inmensas redes de arrastre están barriendo el fondo del mar, agotando brutalmente los océanos y asfixiando por trillones a peces sintientes [2].",
    scientificFacts: [
      "El 99% de los animales terrestres consumidos en el mundo occidental provienen de granjas industriales hiper-intensificadas [1].",
      "Se estima que la pesca industrial captura entre 1 y 2.7 billones (trillones en escala corta) de peces salvajes al año, sometidos a muerte por asfixia y descompresión prolongada [2]."
    ],
    connections: ["historia-dominacion", "eficiencia-termodinamica", "otras-instrumentalizaciones"],
    citation: "Harrison, R. (1964). Animal Machines.",
    references: [
      {
        id: "1",
        citation: "Harrison, R. (1964). Animal Machines: The New Factory Farming Industry."
      },
      {
        id: "2",
        citation: "Mood, A., & Brooke, P. (2010). Estimating the Number of Fish Caught in Global Fishing Each Year. Fishcount."
      }
    ]
  },
  {
    id: "otras-instrumentalizaciones",
    category: "sistemas_uso",
    title: "Otros Ejes de Instrumentalización",
    shortDesc: "La vivisección biomédica, vestimenta y la explotación como entretenimiento.",
    longDesc: "El antropocentrismo se ramifica más allá del plato. Institucionalmente, encerramos y experimentamos en millones de animales al año para investigación biomédica y cosmética (donde el limitado paradigma ético de las '3R' rara vez se cuestiona de fondo) [1]. Arrancamos la piel a visones, ovejas y vacas para confeccionar vestimenta [2]. Y en la cima de lo absurdo, financiamos zoológicos, tauromaquia y espectáculos que reducen la vida de un individuo cognitivamente brillante a un chiste o a una tragedia de entretenimiento temporal [3].",
    scientificFacts: [
      "Gran parte de la experimentación en modelos animales fracasa (más del 90%) a la hora de extrapolarse a ensayos clínicos humanos debido a diferencias genéticas insalvables [1].",
      "La producción de cuero no es un mero 'subproducto' de la carne, sino un co-producto altamente rentable que subvenciona el matadero [2]."
    ],
    connections: ["sistemas-alimentacion", "estatus-juridico"],
    citation: "Knight, A. (2011). The Costs and Benefits of Animal Experiments.",
    references: [
      {
        id: "1",
        citation: "Knight, A. (2011). The Costs and Benefits of Animal Experiments. Palgrave Macmillan."
      },
      {
        id: "2",
        citation: "Cudworth, E. (2011). Social Lives and Other Animals: The Sociology of Human-Animal Relations."
      }
    ]
  },

  // V. IMPACTO SISTÉMICO, ECOLÓGICO Y MACROECONÓMICO
  {
    id: "eficiencia-termodinamica",
    category: "ecologia",
    title: "Eficiencia Termodinámica",
    shortDesc: "La absurda pérdida matemática de energía en la cadena trófica ganadera.",
    longDesc: "En términos de física básica y ecología de sistemas, usar animales para producir comida es una imposibilidad matemática en un planeta superpoblado. Cada vez que filtramos proteínas vegetales a través de un rumiante, la termodinámica dicta que el 90% de esas calorías originales se destruyen en forma de calor metabólico, heces y mantenimiento vital de los huesos [1]. Gastamos cantidades obscenas de recursos vegetales para recuperar una fracción minúscula de energía en forma animal [2].",
    scientificFacts: [
      "Las aves de corral tienen una tasa de conversión calórica del 11%, los cerdos del 10% y las vacas apenas de un 3% [2].",
      "Alimentar directamente a los humanos con los cultivos forrajeros que hoy destinamos al ganado permitiría erradicar el hambre global y devolver miles de millones de hectáreas a la naturaleza [1]."
    ],
    connections: ["huella-ecologica", "crisis-ambiental", "sistemas-alimentacion"],
    citation: "Cassidy, E. S. et al. (2013). Redefining agricultural yields.",
    references: [
      {
        id: "1",
        citation: "Shepon, A., Eshel, G., Noor, E., & Milo, R. (2018). The opportunity cost of animal based diets exceeds all food losses. PNAS, 115(15), 3804-3809."
      },
      {
        id: "2",
        citation: "Cassidy, E. S., West, P. C., Gerber, J. S., & Foley, J. A. (2013). Redefining agricultural yields: from tonnes to people fed per hectare. Environmental Research Letters, 8(3)."
      }
    ]
  },
  {
    id: "huella-ecologica",
    category: "ecologia",
    title: "Huella Ecológica y Recursos",
    shortDesc: "El uso monstruoso de agua y suelo cultivable para alimentar a nuestra comida.",
    longDesc: "Debido a la ineficiencia térmica, la agricultura animal acapara el espacio y el agua del mundo. Enormes latifundios de monocultivos de soja y maíz (tratados con pesticidas tóxicos) no se siembran para consumo humano directo, sino como pienso animal [1]. Esto absorbe acuíferos enteros: producir un solo kilogramo de carne de vaca requiere miles y miles de litros de agua dulce, dejando una profunda y destructiva huella hídrica y territorial [2].",
    scientificFacts: [
      "La ganadería utiliza el 83% del suelo agrícola mundial (para pastoreo y cultivo de forrajes), pero provee apenas el 18% de las calorías que consumimos [1].",
      "El nitrógeno y el fósforo derivados de los purines (excrementos) de los cerdos en las macrogranjas están colapsando los ecosistemas acuíferos locales (ej. el Mar Menor en España) [2]."
    ],
    connections: ["eficiencia-termodinamica", "crisis-ambiental"],
    citation: "Poore, J., & Nemecek, T. (2018). Reducing food’s environmental impacts.",
    references: [
      {
        id: "1",
        citation: "Poore, J., & Nemecek, T. (2018). Reducing food’s environmental impacts through producers and consumers. Science, 360(6392), 987-992."
      },
      {
        id: "2",
        citation: "Mekonnen, M. M., & Hoekstra, A. Y. (2012). A Global Assessment of the Water Footprint of Farm Animal Products. Ecosystems, 15, 401-415."
      }
    ]
  },
  {
    id: "crisis-ambiental",
    category: "ecologia",
    title: "Crisis Ambiental Global",
    shortDesc: "Emisiones de gases, deforestación masiva y el gran motor de la sexta extinción.",
    longDesc: "El sistema agroganadero actual empuja a la biosfera hacia su colapso total. La industria ganadera es el principal motor directo de la deforestación en el Amazonas (despejando selva para pastos y soja). Además, emite entre el 14% y el 18% de todos los Gases de Efecto Invernadero del planeta, especialmente Metano (CH4) proveniente de la digestión de los rumiantes y Óxido Nitroso proveniente de los fertilizantes, aniquilando activamente la biodiversidad silvestre [1, 2].",
    scientificFacts: [
      "El ganado vacuno y la ganadería comercial son la causa de más del 70% de la tala en las selvas de Brasil y del desplazamiento de poblaciones indígenas [2].",
      "La biomasa de los mamíferos salvajes de la Tierra ha quedado aplastada; representan solo el 4%. El 96% restante somos humanos y nuestro ganado en cautiverio [1]."
    ],
    connections: ["huella-ecologica", "eficiencia-termodinamica", "vias-transicion"],
    citation: "IPCC. (2019). Special Report on Climate Change and Land.",
    references: [
      {
        id: "1",
        citation: "Bar-On, Y. M., Phillips, R., & Milo, R. (2018). The biomass distribution on Earth. PNAS, 115(25), 6506-6511."
      },
      {
        id: "2",
        citation: "IPCC. (2019). Special Report on Climate Change and Land. Intergovernmental Panel on Climate Change."
      }
    ]
  },

  // VI. MARCO LEGAL, REGULACIÓN Y TRANSICIÓN
  {
    id: "estatus-juridico",
    category: "legal",
    title: "Estatus Jurídico del Animal",
    shortDesc: "La evolución de los códigos legales: del animal como 'cosa' a 'ser sintiente'.",
    longDesc: "Históricamente, los códigos civiles de todo el mundo definían a los animales como simples 'bienes muebles' o 'cosas', exactamente igual que una mesa o un coche. En los últimos años, impulsados por la abrumadora evidencia científica sobre la sintiencia, países a la vanguardia ética han comenzado a reformar sus códigos civiles para dotarlos de una categoría jurídica propia: 'seres vivos dotados de sensibilidad' [1]. Aunque esto no impide su matanza comercial, representa la primera gran grieta formal en la coraza legal del antropocentrismo [2].",
    scientificFacts: [
      "Cambiar el estatus jurídico permite que, en casos de embargo o divorcio, los animales no puedan ser tratados como simples propiedades financieras subastables [1].",
      "Sin embargo, bajo la actual doctrina, los animales de granja siguen estando exentos en la práctica de la protección que el código penal otorga a otros animales domésticos [2]."
    ],
    connections: ["recorrido-historico-estatus", "legislacion-bienestar"],
    citation: "Favre, D. (2018). Respecting Animals: A Balanced Approach to Our Relationship with Pets, Food, and Wildlife.",
    references: [
      {
        id: "1",
        citation: "Giménez-Candela, T. (2019). La descosificación de los animales en el derecho. Derecho Animal (Forum of Animal Law Studies)."
      },
      {
        id: "2",
        citation: "Favre, D. (2018). Respecting Animals. Prometheus Books."
      }
    ]
  },
  {
    id: "legislacion-bienestar",
    category: "legal",
    title: "Legislación de Bienestar",
    shortDesc: "Las normativas de estabulación y matadero, y las inmensas lagunas legales que permiten la tortura.",
    longDesc: "Las leyes de bienestar animal (transporte, densidades máximas, métodos de aturdimiento por electrocución o gas) nacieron con la promesa de minimizar el sufrimiento de los animales explotados. Sin embargo, en el fondo operan como manuales de instrucciones sobre 'cómo' maltratar legalmente. Existen enormes limitaciones y omisiones legales deliberadas: las mutilaciones rutinarias (corte de picos a aves y colas a cerdos sin anestesia), que serían constitutivas de delito penal si se hicieran a un perro, están legalmente protegidas bajo el escudo de la 'práctica agrícola estándar' [1].",
    scientificFacts: [
      "Las regulaciones permiten densidades de transporte y confinamiento tan extremas que miles de aves mueren literalmente aplastadas o infartadas antes de llegar al matadero, un margen asumido como merma económica [1].",
      "Los sistemas de 'aturdimiento' en alta velocidad a menudo fallan (ej. tanques de escaldado), resultando en animales desangrados o hervidos vivos en la línea de montaje [2]."
    ],
    connections: ["estatus-juridico", "neurobiologia-dolor", "marcos-eticos"],
    citation: "Wolfson, D. J., & Sullivan, M. (2004). Foxes in the Hen House.",
    references: [
      {
        id: "1",
        citation: "Wolfson, D. J., & Sullivan, M. (2004). Foxes in the Hen House: Animals, Agribusiness, and the Law. In Animal Rights: Current Debates and New Directions."
      },
      {
        id: "2",
        citation: "Pachirat, T. (2011). Every Twelve Seconds: Industrialized Slaughter and the Politics of Sight. Yale University Press."
      }
    ]
  },
  {
    id: "vias-transicion",
    category: "legal",
    title: "Vías de Transición Futura",
    shortDesc: "El camino hacia la agricultura celular y los litigios de vanguardia por la libertad.",
    longDesc: "El colapso inminente de nuestro sistema requiere soluciones transformadoras. A nivel tecnológico, la fermentación de precisión, la 'agricultura celular' (carne cultivada a partir de biopsias sin sacrificio) y las carnes vegetales de nueva generación prometen desmantelar la ganadería por pura disrupción económica [1]. A nivel judicial, abogados de vanguardia están utilizando el recurso de 'Habeas Corpus' (diseñado originalmente para evitar encarcelamientos humanos injustos) para lograr que cortes supremas reconozcan legalmente a ciertos animales (como grandes simios y elefantes) como 'personas no humanas' sujetos a derechos fundamentales de libertad [2].",
    scientificFacts: [
      "La carne cultivada in vitro reduciría teóricamente la huella territorial en un 99% y las emisiones GEI hasta en un 96% en comparación con la carne bovina [1].",
      "El Habeas Corpus de la orangutana Sandra en Argentina (2014) sentó jurisprudencia histórica al reconocerla por primera vez como un sujeto de derecho y otorgarle su liberación del cautiverio hacia un santuario [2]."
    ],
    connections: ["estatus-juridico", "consistencia-moral", "crisis-ambiental"],
    citation: "Tuomisto, H. L., & Teixeira de Mattos, M. J. (2011). Environmental Impacts of Cultured Meat Production.",
    references: [
      {
        id: "1",
        citation: "Tuomisto, H. L., & Teixeira de Mattos, M. J. (2011). Environmental Impacts of Cultured Meat Production. Environmental Science & Technology, 45(14)."
      },
      {
        id: "2",
        citation: "Wise, S. M. (2000). Rattling the Cage: Toward Legal Rights for Animals. Perseus Books."
      }
    ]
  }
];

export const DILEMMAS_DATA: DilemmaDetail[] = [
  {
    id: "leones-carne",
    category: "sistemas_uso",
    title: "El Argumento de la Cadena Trófica",
    popularStatement: "Los leones comen carne en la naturaleza, por tanto es natural que los seres humanos hagamos lo mismo.",
    consensus: "FALACIA",
    scientificDeconstruction: "Los leones son carnívoros biológicos obligatorios: carecen de las enzimas necesarias para sintetizar nutrientes vitales a partir de plantas [3]. En cambio, el ser humano es un omnívoro flexible dotado de un tracto digestivo capaz de asimilar perfectamente todos los macro y micronutrientes necesarios a partir de fuentes vegetales [1]. Además, los animales salvajes operan por instinto de supervivencia y no generan industrias de cría masiva confinada ni contaminan el planeta.",
    philosophicalDeconstruction: "Apelar a la conducta de un felino salvaje cae directamente en la 'Falacia Naturalista' o ley de Hume: asumir que lo que ocurre en la naturaleza dicta lo que es éticamente correcto [2]. Los leones carecen de discernimiento moral; los humanos somos agentes morales con libre albedrío, conciencia y pleno acceso a alternativas vegetales. Justificar el maltrato animal masivo copiando la conducta de un carnívoro salvaje es una contradicción lógica [1].",
    coexistenceImpact: "Relegar nuestra ética humana moderna a la conducta de un felino salvaje para justificar la ganadería industrial representa una renuncia voluntaria a nuestra racionalidad moral y compasión.",
    citation: "Singer, P. (1975). Animal Liberation (Chapter 6).",
    references: [
      {
        id: "1",
        citation: "Singer, P. (1975). Animal Liberation (Chapter 6). HarperCollins."
      },
      {
        id: "2",
        citation: "Hume, D. (1739). A Treatise of Human Nature (Book III, Part I, Section I)."
      },
      {
        id: "3",
        citation: "National Research Council. (2006). Nutrient Requirements of Dogs and Cats. National Academies Press."
      }
    ]
  },
  {
    id: "plantas-sienten-dolor",
    category: "sintiencia",
    title: "La Sensibilidad de las Plantas",
    popularStatement: "Las plantas también sienten dolor al ser cosechadas, así que comer lechuga es igual que comer ternera.",
    consensus: "FALACIA",
    scientificDeconstruction: "Las plantas reaccionan mecánicamente a las agresiones físicas liberando gases químicos (etileno fitohormonal) [1]. Sin embargo, carecen por completo de sistema nervioso centralizado, nociceptores y cerebro. Al no tener esta infraestructura fisiológica, sus respuestas son reflejos bioquímicos automáticos que no se traducen en una experiencia emocional subjetiva ni en dolor consciente [2].",
    philosophicalDeconstruction: "Incluso si aceptáramos el absurdo biológico de que las plantas sienten dolor, la ineficiencia termodinámica de la ganadería industrial significa que los animales consumen entre 10 y 16 veces más alimento vegetal para producir un kilo de carne [3]. Por tanto, comer plantas directamente (veganismo) reduce drásticamente el volumen total de vidas vegetales destruidas en más de un 90% [3].",
    coexistenceImpact: "Equiparar la reacción bioquímica de una lechuga con el pánico conscientes y el dolor real de un animal en el matadero es una severa simplificación de la conciencia biológica.",
    citation: "Taiz, L. et al. (2019). Plant sentience: The burden of proof.",
    references: [
      {
        id: "1",
        citation: "Taiz, L., Robinson, D. G., et al. (2019). Plants neither possess nor require consciousness. Trends in Plant Science, 24(8), 677-687.",
        url: "https://doi.org/10.1016/j.tplants.2019.05.010"
      },
      {
        id: "2",
        citation: "Robinson, D. G., et al. (2023). Plant sentience: The burden of proof. Animal Sentience, 8(36), 1-12.",
        url: "https://wellbeingintlstudiesrepository.org/animsent/vol8/iss36/1/"
      },
      {
        id: "3",
        citation: "Poore, J., & Nemecek, T. (2018). Reducing food’s environmental impacts. Science, 360(6392)."
      }
    ]
  },
  {
    id: "bivalvos-ostras",
    category: "sintiencia",
    title: "El Dilema de los Bivalvos",
    popularStatement: "¿Es moralmente aceptable consumir bivalvos como mejillones u ostras con total tranquilidad?",
    consensus: "ESCENARIO_GRIS",
    scientificDeconstruction: "Los bivalvos (mejillones, ostras) son moluscos sésiles extremadamente simples. Carecen de cerebro y de un Sistema Nervioso Central (SNC) complejo; solo poseen una red descentralizada de ganglios biológicos sencillos [1]. La ciencia moderna no halla nociceptores activos ni indicadores bioquímicos de sufrimiento conscious [1]. Su cría, además, limpia el agua local y tiene una huella ecológica insignificante.",
    philosophicalDeconstruction: "Este es un debate ético interno en el veganismo. El utilitarismo pragmático sostiene que comer bivalvos es correcto porque no genera sufrimiento consciente y reduce las muertes de insectos colaterales causadas por cosechadoras de cereales agrícolas [1]. El abolicionismo de derechos apela al principio de precaución: ante el menor atisbo de duda sobre su microconciencia, es preferible no mercantilizarlos [2].",
    coexistenceImpact: "Representa un área gris fértil que enseña a modular con humildad la consideración moral según la complejidad neurológica de la vida animal.",
    citation: "Cox, C. (2010). Ethical considerations of bivalve consumption in vegan diets.",
    references: [
      {
        id: "1",
        citation: "Cox, C. (2010). Ethical considerations of bivalve consumption in vegan diets. Journal of Agricultural and Environmental Ethics, 23(4)."
      },
      {
        id: "2",
        citation: "Birch, J. (2017). Animal sentience and the precautionary principle. Animal Sentience, 2(16), 1-16.",
        url: "https://doi.org/10.51291/2377-7478.1200"
      }
    ]
  },
  {
    id: "granja-feliz-ecologia",
    category: "etica",
    title: "Mito de la Granja Feliz",
    popularStatement: "Consumir animales criados en libertad (ganadería ecológica) y sacrificados de forma indolora no tiene nada de malo.",
    consensus: "DILEMA",
    scientificDeconstruction: "Aunque la ganadería ecológica tradicional aporta a los animales una existencia superior al infierno industrial, el sacrificio sistemático ocurre en su juventud temprana (ej. terneros a los 18 meses frente a una longevidad natural de 20 años) [1]. Además, alimentar a los 8.000 millones de humanos con este modelo extensivo exigiría la superficie de tres planetas Tierra adicionales debido a su baja densidad calórica espacial [3].",
    philosophicalDeconstruction: "Este dilema enfrenta al bienestarismo con los derechos de los animales. El bienestarismo argumenta que dotar al animal de una vida agradable genera una suma de utilidad neta positiva [2]. La deontología de derechos (Regan) replica que asesinar a un 'sujeto-de-una-vida' antes de tiempo le priva de experimentar su bienestar futuro, violando su derecho a la vida por un interés gastronómico prescindible [1].",
    coexistenceImpact: "Nos sitúa ante la paradoja ética del sacrificio indoloro: decidir si las vidas animales son meras mercancías intercambiables o seres irremplazables con valor intrínseco.",
    citation: "Regan, T. (1983). The Case for Animal Rights (Chapter 8).",
    references: [
      {
        id: "1",
        citation: "Regan, T. (1983). The Case for Animal Rights (Chapter 8). University of California Press."
      },
      {
        id: "2",
        citation: "McMahan, J. (2008). Eating animals the nice way. Daedalus, 137(1), 66-76.",
        url: "https://doi.org/10.1162/daed.2008.137.1.66"
      },
      {
        id: "3",
        citation: "Poore, J., & Nemecek, T. (2018). Reducing food’s environmental impacts. Science, 360(6392)."
      }
    ]
  },
  {
    id: "conservacion-dehesas",
    category: "ecologia",
    title: "La Ganadería en Ecosistemas",
    popularStatement: "Si eliminamos el ganado, ecosistemas protegidos como la dehesa ibérica o las praderas de montaña desaparecerían.",
    consensus: "DILEMA",
    scientificDeconstruction: "Ecosistemas modelados por el hombre como las dehesas mediterráneas o praderas alpinas dependen del pastoreo de herbívoros domésticos para limpiar la maleza, abonar el suelo y prevenir incendios [2]. Retirar por completo la ganadería extensiva tradicional de estas zonas degradaría gravemente la biodiversidad local de plantas, insectos y aves que coevolucionaron con este ciclo [2].",
    philosophicalDeconstruction: "Este dilema expone la tensión entre la ética ecocéntrica (el deber de proteger la integridad del ecosistema común) [1] y la ética individualista (los derechos del animal a no ser explotado y sacrificado) [2]. Para el ecosistema, el pastoreo es simbiosis; para el individuo animal, su cría para el matadero representa un uso ilegítimo de su sintiencia [2].",
    coexistenceImpact: "Un espejo incómodo que demuestra que a veces, proteger la salud global de un bioma común requiere evaluar compromisos éticos con los derechos individuales.",
    citation: "Bugalho, M. N. et al. (2011). Mediterranean cork oak savannas (dehesas): Biodiversity and conservation.",
    references: [
      {
        id: "1",
        citation: "Callicott, J. B. (1980). Animal liberation: A triangular affair. Environmental Ethics, 2(4), 311-338.",
        url: "https://doi.org/10.5840/enviroethics19802424"
      },
      {
        id: "2",
        citation: "Bugalho, M. N., Caldeira, M. C., Pereira, J. S., Aronson, J., & Diaz, M. (2011). Mediterranean cork oak savannas (dehesas): Biodiversity and conservation. Frontiers in Ecology and the Environment, 9(5), 278-286.",
        url: "https://doi.org/10.1890/100067"
      }
    ]
  },
  {
    id: "comer-insectos-harinas",
    category: "etica",
    title: "La Apuesta de la Entomofagia",
    popularStatement: "La entomofagia (ingerir grillos o gusanos) es el sustituto ideal de la ganadería barata para proteger el cambio climático.",
    consensus: "ESCENARIO_GRIS",
    scientificDeconstruction: "La producción de harinas de insectos es enormemente más eficiente que la ganadería bovina o porcina, reduciendo un 99% el espacio territorial y emitiendo mínimas trazas de gases de efecto invernadero (GEI) [3]. Sin embargo, la ciencia debate aún la presencia de trazas de sintiencia consciente en artrópodos: aunque muestran aprendizaje complejo, sus sistemas nerviosos descentralizados son en gran parte reflejos [2].",
    philosophicalDeconstruction: "Si el sufrimiento de los insectos es nulo, esta industria representa una vía de transición para erradicar las macrogranjas de vertebrados [3]. Sin embargo, para el veganismo abolicionista, la cría industrial de trillones de insectos hacinados en cajones mecánicos perpetúa el antropocentrismo imperante, tratando a toda vida cerebral como mercancía utilitaria [1, 2].",
    coexistenceImpact: "Un portal híbrido fascinante donde la urgencia de salvar la biosfera del colapso ecológico nos obliga a revaluar la frontera moral de las microconciencias neurales.",
    citation: "Chittka, L. (2022). The Mind of a Bee.",
    references: [
      {
        id: "1",
        citation: "Chittka, L. (2022). The Mind of a Bee. Princeton University Press."
      },
      {
        id: "2",
        citation: "Gibbons, M., et al. (2022). Can insects feel pain? Advances in Insect Physiology, 63, 155-229."
      },
      {
        id: "3",
        citation: "van Huis, A. (2013). Potential of insects as food and feed in assuring food security. Annual Review of Entomology, 58, 563-583.",
        url: "https://doi.org/10.1146/annurev-ento-120811-150247"
      }
    ]
  },
  {
    id: "caninos-dentadura",
    category: "sistemas_uso",
    title: "La Dentadura y Caninos",
    popularStatement: "Los seres humanos tenemos dientes caninos (colmillos) diseñados para comer carne, lo que demuestra que somos depredadores naturales.",
    consensus: "FALACIA",
    scientificDeconstruction: "Nuestros dientes colmillos son extremadamente pequeños, planos y romos comparados con los de cualquier depredador carnívoro verdadero (como felinos o cánidos). La morfología digestiva humana posee mandíbulas flexibles de masticación lateral, saliva rica en amilasa para digerir almidones y un colon largo adaptado a la fibra vegetal directa [1]. Los dientes caninos no determinan una necesidad biológica de explotar animales [2].",
    philosophicalDeconstruction: "Este argumento confunde la capacidad anatómica con la justificación moral (falacia de apelación a la naturaleza). Aunque tuviéramos colmillos afilados para desgarrar carne cruda, poseemos libre albedrío y alternativas vegetales completas. Apoyarse en la forma de un diente para justificar la reclusión industrial y el sacrificio masivo de seres sintientes es una incoherencia ética obvia [1, 2].",
    coexistenceImpact: "Desmonta el mito anatómico que disfraza a la masticación humana como una garra biológica para legitimar el maltrato animal en el matadero moderno.",
    citation: "Ungar, P. S. (2010). Mammalian Teeth: Origin, Structure, and Function.",
    references: [
      {
        id: "1",
        citation: "Ungar, P. S. (2010). Mammalian Teeth: Origin, Structure, and Function. Johns Hopkins University Press."
      },
      {
        id: "2",
        citation: "Melina, V. et al. (2016). Position of the Academy of Nutrition and Dietetics: Vegetarian Diets."
      }
    ]
  },
  {
    id: "explotacion-industrial-clima",
    category: "ecologia",
    title: "Explotación Industrial y Clima",
    popularStatement: "La ganadería industrial no es tan responsable del cambio climático; los transportes y la industria pesada contaminan mucho más.",
    consensus: "FALACIA",
    scientificDeconstruction: "La ganadería emite directamente cerca del 14.5% de los gases de efecto invernadero (GEI) antropogénicos globales [1]. Aunque la quema de combustibles fósiles en el transporte aporta una inmensa huella de carbono, el ganado rumiante libera metano (CH4), un gas con un potencial de calentamiento global a corto plazo enormemente superior al CO2 y que destruye los sumideros de selva tropical colaterales [2, 3].",
    philosophicalDeconstruction: "Intentar minimizar el impacto climático de nuestra dieta escudándose en otros sectores contaminantes es un desvío de la consistencia moral. El consumidor medio no puede rediseñar de inmediato la red de vuelos mundiales, pero puede modificar drásticamente su huella de carbono diaria de manera autónoma simplemente retirando la carne de su plato [1].",
    coexistenceImpact: "Pone en jaque las excusas colectivas que postergan las soluciones éticas sobre la biosfera alegando que otras industrias pesadas contaminan más.",
    citation: "Gerber, P. J. et al. (2013). Tackling climate change through livestock.",
    references: [
      {
        id: "1",
        citation: "Gerber, P. J., et al. (2013). Tackling climate change through livestock: a global assessment of emissions and mitigation opportunities. FAO."
      },
      {
        id: "2",
        citation: "IPCC. (2019). Special Report on Climate Change and Land."
      },
      {
        id: "3",
        citation: "Springmann, M. et al. (2016). Analysis and valuation of the health and climate change co-benefits of dietary change. PNAS."
      }
    ]
  },
  {
    id: "el-argumento-del-antropocentrismo-cartesiano",
    category: "sintiencia",
    title: "El Autómata Cartesiano",
    popularStatement: "Los animales no tienen alma ni conciencia reflexiva humana, por tanto sus chillidos son meras reacciones mecánicas.",
    consensus: "FALACIA",
    scientificDeconstruction: "René Descartes argumentaba en 1637 que los animales eran autómatas biológicos desprovistos de dolor consciente [1]. La neurobiología evolutiva moderna desmiente radicalmente este dualismo: todos los vertebrados poseen un tronco encefálico homólogo al humano y neurotransmisores idénticos (como las endorfinas y el cortisol) para procesar el dolor emocional y el miedo de forma consciente [2]. La Declaración de Cambridge sobre la Conciencia certifica científicamente esta realidad [2].",
    philosophicalDeconstruction: "Esta perspectiva cartesiana actuó como una 'inmunización moral' para justificar abusos salvajes y vivisecciones históricas. La consistencia ética secular dicta que para merecer consideración moral no se requiere la capacidad de hablar o resolver ecuaciones abstractas, sino el estatus biológico de la sintiencia: la capacidad de sufrir de forma consciente [1, 2].",
    coexistenceImpact: "Erradica el negacionismo intelectual que trata al maltrato animal como un simple crujido de engranajes para ignorar el pánico y el dolor subjetivo en el cautiverio.",
    citation: "Descartes, R. (1637). Discurso del método.",
    references: [
      {
        id: "1",
        citation: "Descartes, R. (1637). Discurso del método (Parte V)."
      },
      {
        id: "2",
        citation: "Low, P., Panksepp, J. et al. (2012). The Cambridge Declaration on Consciousness."
      }
    ]
  },
  {
    id: "el-argumento-del-contrato-social",
    category: "etica",
    title: "El Límite del Contrato Social",
    popularStatement: "Los animales no pueden firmar contratos sociales ni respetar nuestros deberes morales, por tanto no tenemos obligaciones éticas hacia ellos.",
    consensus: "FALACIA",
    scientificDeconstruction: "Los animales salvajes y domésticos demuestran conductas cooperativas complejas, altruismo recíproco y códigos sociales internos [1]. Sin embargo, el argumento de que un ser carece de derechos morales por no poder formular deberes abstractos es fisiológicamente inconsistente con nuestras propias leyes: los bebés, personas con discapacidades cognitivas severas o ancianos con demencia avanzada tampoco pueden firmar un contrato, y les garantizamos plenos derechos inalienables [2].",
    philosophicalDeconstruction: "Confunde los agentes morales (seres capaces de reflexionar y asumir deberes) con los pacientes morales (seres dignos de protección legal). El límite ético para no torturar o esclavizar a un ser vivo no es su capacidad intelectual de firmar acuerdos, sino su vulnerabilidad al dolor [1]. Excluir a los animales basándose en el contrato social es una distorsión del concepto de justicia [2].",
    coexistenceImpact: "Establece que una sociedad moralmente avanzada debe proteger a los seres más vulnerables por su propia capacidad de sufrir, y no basándose en pactos racionales recíprocos.",
    citation: "Nussbaum, M. C. (2006). Frontiers of Justice.",
    references: [
      {
        id: "1",
        citation: "Nussbaum, M. C. (2006). Frontiers of Justice: Species Membership. Harvard University Press."
      },
      {
        id: "2",
        citation: "Regan, T. (1983). The Case for Animal Rights. University of California Press."
      }
    ]
  },
  {
    id: "el-mito-de-la-carne-humanitaria",
    category: "etica",
    title: "El Mito de la Carne Humanitaria",
    popularStatement: "Si compramos carne ecológica de granjas de pastoreo donde se sacrifican 'humanitariamente', no financiamos el maltrato animal.",
    consensus: "DILEMA",
    scientificDeconstruction: "Aunque estas granjas otorgan a los animales una existencia mejor que las macrogranjas intensivas, el sacrificio sistemático se ejecuta a una edad extremadamente temprana y bajo los mismos métodos de aturdimiento y degüello del matadero general [2]. Adicionalmente, el forrajeo de baja densidad ecológica exige un espacio de tierra tan elevado que resulta termodinámicamente inviable para alimentar a la población mundial [3].",
    philosophicalDeconstruction: "El concepto de 'matar humanitariamente' es una contradicción en los términos (oxímoron). Si un animal es un 'sujeto-de-una-vida' con valor intrínseco, arrebatarle su vida de forma prematura para satisfacer un fin gastronómico redundante viola sus derechos fundamentales de justicia, sin importar cuán agradable haya sido su cautiverio previo [1, 2].",
    coexistenceImpact: "Deconstruye la disonancia cognitiva y la anestesia social del consumidor que utiliza sellos de 'bienestar animal' para eludir su dilema moral en el supermercado.",
    citation: "Regan, T. (1983). The Case for Animal Rights.",
    references: [
      {
        id: "1",
        citation: "Regan, T. (1983). The Case for Animal Rights. University of California Press."
      },
      {
        id: "2",
        citation: "McMahan, J. (2008). Eating animals the nice way. Daedalus, 137(1)."
      },
      {
        id: "3",
        citation: "Poore, J. & Nemecek, T. (2018). Reducing food’s environmental impacts."
      }
    ]
  },
  {
    id: "la-prioridad-humanitaria",
    category: "etica",
    title: "La Prioridad Humanitaria",
    popularStatement: "Debemos concentrar todos nuestros recursos en solucionar el hambre y la pobreza humana antes de preocuparnos por los animales.",
    consensus: "FALACIA",
    scientificDeconstruction: "La ganadería industrial e intensiva consume anualmente miles de millones de toneladas de soja y cereales que podrían alimentar directamente a toda la población mundial de forma directa y eficiente [3]. La ineficiencia termodinámica del filtrado calórico a través del ganado acapara el 80% del suelo agrícola global, agravando de forma directa la escasez mundial de recursos agrarios [2, 3].",
    philosophicalDeconstruction: "Este argumento cae en la falacia del falso dilema. El veganismo y los derechos de los animales no son una causa que reste recursos a los humanos: es un cese pasivo de la financiación de la violencia industrial. Dejar de consumir carne no impide luchar contra el hambre humana; de hecho, libera inmensos recursos de tierras y agua en favor de los países del tercer mundo [1, 2].",
    coexistenceImpact: "Desarticula la excusa colectiva de que el respeto por las vidas animales compite con la justicia humana, mostrando que ambos círculos de compasión se refuerzan mutuamente.",
    citation: "Adams, C. J. (1990). The Sexual Politics of Meat.",
    references: [
      {
        id: "1",
        citation: "Adams, C. J. (1990). The Sexual Politics of Meat. Continuum."
      },
      {
        id: "2",
        citation: "Singer, P. (1975). Animal Liberation. HarperCollins."
      },
      {
        id: "3",
        citation: "Springmann, M. et al. (2016). Analysis and valuation of the health and climate change co-benefits of dietary change. PNAS.",
        url: "https://doi.org/10.1073/pnas.1523119113"
      }
    ]
  },

  // ─── BLOQUE A: 7 TESIS DE EXPANSIÓN v1 ───
  {
    id: "lo-natural-no-es-moral",
    category: "etica",
    title: "Lo natural no es intrínsecamente moral",
    popularStatement: "«Si es natural, no le hace daño al cuerpo; la carne es parte de nuestra naturaleza»",
    consensus: "FALACIA",
    scientificDeconstruction: "Definir «bueno» como lo que existe en la naturaleza incurre en la falacia naturalista. George Edward Moore señaló que confundir «lo que es» (propiedades naturales) con «lo que debería ser» (valor moral) es falaz [1]. La biología muestra que muchos animales —incluidos herbívoros— consumen carne por conveniencia evolutiva, no por mérito ético. Prácticas «naturales» como el infanticidio en algunas especies o la agresión intraespecífica causan sufrimiento, lo cual no se justifica moralmente. La filosofía de la biología coincide: apelar a la naturaleza carece de rigor como criterio ético; la evolución describe comportamientos, no prescribe normas [2].",
    philosophicalDeconstruction: "El argumento «lo natural es bueno» ignora distinciones metaéticas clave. Moore argumentó que atribuir bondad a lo natural confunde lo descriptivo con lo normativo. Aunque ciertos animales cazan (lo «natural»), esto no convierte en moralmente correcto causar sufrimiento para el placer humano. Filósofos contemporáneos (Singer, Regan) enfatizan que la ética requiere justificaciones independientes de la biología: la mera pertenencia a un proceso evolutivo no confiere deber moral alguno. Es un error lógico asumir que el universo natural opera conforme a principios morales; la moralidad exige argumentos éticos, no meras observaciones naturales [1, 2].",
    coexistenceImpact: "Asumir erróneamente que «lo natural» es justo impide reconocer injusticias en prácticas alimentarias. Usar animales porque somos «omnívoros naturales» distrae del sufrimiento real. ¿Por qué otorgar valor moral a una característica evolutiva arbitraria? ¿Realmente la naturaleza decide qué está bien o mal en la alimentación humana?",
    references: [
      { id: "1", citation: "Moore, G. E. (1903). Principia Ethica. Cambridge University Press." },
      { id: "2", citation: "Singer, P. (2011). Practical Ethics (3rd ed.). Cambridge University Press." }
    ],
    openQuestion: "¿Puede algo ser moral solo porque existe en la naturaleza? ¿Deberíamos derivar normas éticas directamente de la observación natural?"
  },
  {
    id: "tradicion-no-hace-correcto",
    category: "etica",
    title: "La tradición no justifica el sufrimiento animal",
    popularStatement: "«Lo hemos hecho siempre así, por tradición. ¿Por qué cambiarlo?»",
    consensus: "FALACIA",
    scientificDeconstruction: "Apelar a la tradición (falacia ad antiquitatem) sostiene que algo es bueno solo por ser histórico. La antropología moral muestra que muchas costumbres pasadas (sacrificios humanos, esclavitud) se juzgaron éticamente inaceptables pese a su arraigo cultural [1]. En el caso de la tauromaquia, análisis etológicos documentan que el toro sufre inmenso dolor físico y estrés psicológico durante la corrida. La bioética actual concluye que el valor de una costumbre debe evaluarse a la luz de evidencia empírica y principios universales, no asumirse intocable por su antigüedad [2].",
    philosophicalDeconstruction: "Filósofos políticos como Rawls y Sen remarcan que no toda tradición es éticamente legítima. El argumento «siempre fue así» se opone al principio de justicia: solo ritos que respetan derechos fundamentales pueden sobrevivir a la crítica ética. Singer argumentaría que la tradición no puede sobreponerse al principio de reducir sufrimiento si existen alternativas morales viables. Frente a la falacia tradicional, debe aplicarse reflexión crítica: la existencia de una práctica no prueba que sea valiosa moralmente [1, 2].",
    coexistenceImpact: "La insistencia en «mantener tradiciones» choca con los avances éticos (leyes antibullfighting, vetos internacionales). Si algo causa dolor evidente, ¿sigue justificado por su antigüedad? ¿Cómo equilibrar el respeto cultural con la evidencia científica de daño?",
    references: [
      { id: "1", citation: "Sen, A. (2006). Identity and Violence. W. W. Norton & Company." },
      { id: "2", citation: "Mariscal-Lucero, S. et al. (2020). Cognitive and emotional indicators of pain in bulls during bullfighting. Animals, 10(11), 2118." }
    ],
    openQuestion: "¿Debe la tradición justificar prácticas que hoy sabemos causan sufrimiento? ¿Cómo reconciliamos respeto cultural con el principio de no causar daño?"
  },
  {
    id: "bienestarismo-como-abolicionismo-fracaso",
    category: "etica",
    title: "¿Reformar la ganadería o abolirla?",
    popularStatement: "«Podemos mejorar poco a poco el bienestar animal en granjas intensivas; no hace falta prohibir la carne de golpe»",
    consensus: "DILEMA",
    scientificDeconstruction: "Este dilema contrapone bienestarismo (mejoras graduales) frente a abolicionismo (fin total del uso animal). Los informes FAO muestran que la producción ganadera intensiva sigue creciendo y contribuye significativamente al cambio climático (≈15% de GEI globales) [1]. Sin embargo, mejoras en condiciones (enriquecimiento ambiental, menor hacinamiento) reducen lesiones y estrés crónico. Singer (welfarista) reconoce que todo cambio gradual cuenta, mientras que Francione (abolicionista) insiste en que el uso sigue siendo inmoral. Los datos de bienestar animal sugieren que los sistemas reformados atenúan el daño, pero no logran la meta de sufrimiento cero, manteniendo vivo el debate real entre ambos valores [2].",
    philosophicalDeconstruction: "Filosóficamente, el dilema refleja una tensión entre utilitarismo pragmático y principios de derechos. El bienestarismo se asocia al consecuencialismo: si se reduce sufrimiento agregado, el uso podría ser éticamente tolerable. El abolicionismo parte de derechos inalienables (Kantiano) que prohibirían tratar animales como medios, sin importar los resultados. Autores como Regan y Francione sostienen que cualquier concesión al uso animal implica seguir violando deberes éticos fundamentales. ¿Es más grave causar sufrimiento evitable (abolición), o es preferible disminuirlo gradualmente (bienestarismo)? La filosofía contemporánea no resuelve el dilema [1, 2].",
    coexistenceImpact: "El dilema lleva a la sociedad a preguntarse si podemos coexistir con prácticas que optimizan bienestar sin eliminarlas. Influye en políticas agropecuarias y dietas. ¿Aceptamos sacrificios éticos parciales para avances graduales, o apostamos por la transformación radical aunque sea socialmente difícil?",
    references: [
      { id: "1", citation: "FAO. (2013). Tackling climate change through livestock. Food and Agriculture Organization." },
      { id: "2", citation: "Francione, G. L. (1996). Rain Without Thunder. Temple University Press." }
    ],
    openQuestion: "¿Debe nuestra ética animal priorizar la reducción gradual del daño o la erradicación completa del uso animal?"
  },
  {
    id: "sintiencia-insectos-granjas",
    category: "sintiencia",
    title: "¿Sienten algo los insectos criados en granjas?",
    popularStatement: "«Un grillo no es como una vaca; podemos criarlos en masa sin problema»",
    consensus: "ESCENARIO_GRIS",
    scientificDeconstruction: "La sintiencia en invertebrados es incierta. Aunque decápodos (cangrejos, langostas) y cefalópodos (pulpos) han sido reconocidos como sintientes por la Declaración de Nueva York (2024), faltan pruebas concluyentes en insectos de granja [1]. Los estudios muestran que muchos insectos tienen nociceptores y comportamientos complejos, pero no se ha demostrado que tengan experiencias subjetivas comparables a mamíferos. Dada la escala de insectos criados (billones anuales) y la falta de investigación directa, expertos como Jonathan Birch abogan por el principio de precaución: asumir sintiencia potencial hasta que se demuestre lo contrario [2]. La ciencia no ha resuelto este límite; los bioeticistas concluyen que es un escenario gris.",
    philosophicalDeconstruction: "Este caso cuestiona dónde trazamos la línea moral de la sintiencia. Algunos utilitaristas podrían restar importancia al sufrimiento de insectos por su bajo desarrollo neural; otros lo ven bajo el principio de igualdad para cualquier ser capaz de sufrir en cualquier grado. Birch plantea que, en caso de duda, debemos priorizar la prevención de sufrimiento potencial [2]. Así, la coexistencia con insectos de granja entra en una zona gris de ética práctica: aun asumiendo que quizá no «sienten» igual, el hecho de tratarlos masivamente despierta el dilema de si deberíamos extenderles alguna consideración mínima.",
    coexistenceImpact: "Refleja el dilema sobre prácticas emergentes como la entomofagia masiva. ¿Debemos aplicar normativas de bienestar a insectos? Dado lo incierto, ¿cómo convivir con la duda científica? Esto exige revaluar normas alimentarias según nuevos hallazgos. ¿Tratamos a los insectos como simples recursos o planteamos límites prudentes mientras la ciencia avanza?",
    references: [
      { id: "1", citation: "Andrews, K. et al. (2024). The New York Declaration on Animal Consciousness." },
      { id: "2", citation: "Birch, J. (2017). Animal sentience and the precautionary principle. Animal Sentience, 2(16)." }
    ],
    openQuestion: "¿En la duda, deberíamos asumir que los insectos pueden sufrir y actuar en consecuencia? ¿Qué norma ética aplicar mientras la ciencia avanza?"
  },
  {
    id: "consenso-sintiencia-animal",
    category: "sintiencia",
    title: "Los animales sienten (consenso científico)",
    popularStatement: "«El consenso científico dice que muchos animales sienten dolor y emociones»",
    consensus: "CONSENSO",
    scientificDeconstruction: "La Declaración de Cambridge sobre la Conciencia (2012), reunida por expertos en neurociencia, concluyó que los humanos no son únicos en poseer los sustratos neuronales de la consciencia: mamíferos, aves y cefalópodos comparten circuitos cerebrales similares implicados en experiencias subjetivas [1]. Pronunciamientos posteriores (Declaración de Nueva York 2024, Declaración de Montreal 2022) confirman y amplían este consenso basándose en evidencia etológica y neurológica [2, 3]. Varios gobiernos (Reino Unido, Nueva Zelanda) han reconocido legalmente la sintiencia de crustáceos y cefalópodos. La idea de que los animales sienten ha pasado a ser un consenso científico establecido; la bibliografía actual lo da por sentado.",
    philosophicalDeconstruction: "Desde la filosofía de la ciencia, las declaraciones formales representan un amplio acuerdo epistemológico: ciertos animales son sintientes. Este consenso supera la mera opinión pública: expertos en neuroética recomiendan tratarlos con consideración moral. Éticamente, si el conocimiento científico es sólido, el imperativo moral es actuar en consecuencia (principio de precaución respaldado por evidencia). En la Declaración de Montreal, los intereses de evitar el dolor animal se equiparan a principios de justicia. Esta tesis afirma que existen «hechos bioéticos» resueltos, reflejando la corriente dominante en la comunidad científica y filosófica actual [1, 2, 3].",
    coexistenceImpact: "El reconocimiento casi unánime de la sintiencia animal ya influye en políticas (leyes de bienestar, restricción de prácticas crueles). Si muchos animales son sintientes como afirma la ciencia, ¿debemos revisar conductas cotidianas (alimentación, vestimenta, entretenimiento)? ¿Estamos preparados para integrar este consenso en nuestra convivencia diaria?",
    references: [
      { id: "1", citation: "Low, P. et al. (2012). The Cambridge Declaration on Consciousness." },
      { id: "2", citation: "Andrews, K. et al. (2024). The New York Declaration on Animal Consciousness." },
      { id: "3", citation: "Declaration of Montreal on Animal Exploitation. (2022)." }
    ],
    openQuestion: "¿Cómo deberíamos cambiar prácticas humanas a la luz de este consenso científico sobre la conciencia animal?"
  },
  {
    id: "consenso-b12-suplementacion",
    category: "ecologia",
    title: "La viabilidad nutricional vegana (consenso B12)",
    popularStatement: "«Me preocupa la B12. ¿Cómo comeré bien sin suplementos?»",
    consensus: "CONSENSO",
    scientificDeconstruction: "Existe consenso nutricional de que la vitamina B12 (esencial para humanos) solo se obtiene de síntesis microbiana. Sin embargo, la suplementación y los alimentos fortificados han resuelto esta carencia para dietas vegetales. Guías de la Academy of Nutrition and Dietetics y de la Vegan Society avalan que consumir alimentos enriquecidos con B12 previene la deficiencia sin necesidad de productos animales [1]. El cuerpo la utiliza igual, independientemente de su origen, y los suplementos sintéticos son seguros y efectivos. Así se ha alcanzado un consenso: una dieta vegana bien planificada con B12 suplementada es nutricionalmente completa [2].",
    philosophicalDeconstruction: "Este consenso refleja un acuerdo científico-farmacológico: la B12 no es intrínseca de plantas, pero sí producible por bacterias cultivadas industrialmente. Éticamente, si la salud humana puede preservarse sin sacrificar animales (mediante suplementos económicos), el fundamento práctico de muchas objeciones dietéticas desaparece. Cierra el dilema moral sobre si abstenerse de carne se «paga» con riesgo sanitario: la respuesta objetiva es no, gracias al consenso nutricional y biotecnológico [1, 2].",
    coexistenceImpact: "Apoya que la elección vegana es compatible con la salud. Impulsa cambios sociales: más productos fortificados, políticas de nutrición pública, reducción del estigma ético por «deficiencia de B12». ¿Qué otros mitos dietéticos necesitan claridad científica? ¿Puede la gente confiar plenamente en que el consenso nutricional admite estilos de vida sin consumo animal?",
    references: [
      { id: "1", citation: "Melina, V. et al. (2016). Position of the Academy of Nutrition and Dietetics: Vegetarian Diets. Journal of the Academy of Nutrition and Dietetics, 116(12), 1970-1980." },
      { id: "2", citation: "Rizzo, G. et al. (2023). Vitamin B12 in vegan diets. Critical Reviews in Food Science and Nutrition, 63(29), 9805-9816." }
    ],
    openQuestion: "Dado este consenso nutricional, ¿qué otras creencias sobre dietas requieren revisarse éticamente?"
  },
  {
    id: "consenso-ineficiencia-energetica",
    category: "ecologia",
    title: "La ineficiencia energética de producir carne",
    popularStatement: "«No hay otra forma de alimentar al mundo excepto con carne»",
    consensus: "CONSENSO",
    scientificDeconstruction: "Está ampliamente aceptado que la conversión de alimento vegetal a carne es altamente ineficiente. Obtener 1 kg de carne vacuna requiere ≈10 kg de alimento vegetal y agua agrícola. Estudios de Our World in Data indican que el ganado vacuno convierte en carne menos del 10% de la energía del pienso. Además, la ganadería produce ≈14.5% de los gases invernadero antropogénicos [1, 2]. Estos hechos termodinámicos son citados por la mayoría de organismos científicos como argumento a favor de dietas basadas en plantas. La evidencia empírica del balance tierra-calorías concluye de forma contundente que la producción ganadera es sustancialmente menos eficiente que la agricultura directa, un punto en el que hay consenso científico amplio.",
    philosophicalDeconstruction: "Este consenso termodinámico resuena con argumentos éticos utilitaristas sobre recursos limitados: si la tierra disponible puede alimentar a más humanos con dietas vegetales, perseguir una vía menos eficiente puede verse como desperdicio de bienes globales (justicia distributiva). Filósofos ambientales señalan que reducir la ineficiencia alimentaria es un deber moral hacia la sostenibilidad. Al reconocer el consenso científico, el dilema moral básico sobre cómo usar el planeta recibe respuesta: la ciencia abrumadora indica que priorizar cultivos directos favorece el bienestar colectivo [1, 2].",
    coexistenceImpact: "Refuerza políticas públicas de fomento de dietas vegetales. Cierra argumentos de que «necesitamos más ganado». Para la convivencia social, ¿estamos dispuestos a cambiar la producción alimentaria por razones de eficiencia? ¿Sería éticamente inconsistente ignorar pruebas científicas que muestran que podemos alimentar mejor al mundo con recursos más directamente?",
    references: [
      { id: "1", citation: "Poore, J. & Nemecek, T. (2018). Reducing food's environmental impacts through producers and consumers. Science, 360(6392), 987-992." },
      { id: "2", citation: "Ritchie, H. (2020). Food production is responsible for one-quarter of the world's greenhouse gas emissions. Our World in Data." }
    ],
    openQuestion: "¿Estamos dispuestos a reorientar la producción alimentaria global basándonos en este consenso termodinámico?"
  },

  // ─── BLOQUE B: 12 TESIS DE EXPANSIÓN v2 (prefijo r2-) ───
  {
    id: "r2-mascotas-carnivoras",
    category: "sistemas_uso",
    title: "Alimentación de mascotas carnívoras con piensos cárnicos industriales",
    popularStatement: "«Los perros y gatos son carnívoros por naturaleza; ¡hay que darles carne de verdad!»",
    consensus: "DILEMA",
    scientificDeconstruction: "La alimentación de perros y gatos plantea dudas médicas y ecológicas. Desde el punto de vista nutricional, los gatos son carnívoros estrictos y requieren nutrientes como la taurina, presente sólo en la carne, para evitar cardiopatías y problemas retinianos. Aunque algunos estudios señalan que dietas veganas bien formuladas pueden mantener la salud de perros y gatos con suplementos adecuados, la evidencia mayoritariamente subraya que la dieta carnívora cubre naturalmente esas necesidades específicas. Adicionalmente, el impacto ambiental de alimentar mascotas con proteína animal es considerable: Nicholles y Knight (2025) estiman que dietas veganas para mascotas podrían reducir hasta 96% el uso de tierra y otros recursos en comparación con dietas tradicionales de carne. Así, desde el enfoque científico, se enfrentan la necesidad biológica de cada especie con los efectos globales de la producción de carne para mascotas.",
    philosophicalDeconstruction: "Ético y filosóficamente, el debate se centra en priorizar el bienestar individual de cada animal versus el bien común ambiental. Desde una perspectiva deontológica, la obligación de cuidar a las mascotas implica respetar sus necesidades naturales: forzarlas a dietas ajenas a su biología podría verse como una negligencia de su bienestar intrínseco. Por otro lado, un enfoque utilitarista extiende la consideración a los efectos colaterales: si la crianza industrial de carne causa sufrimiento masivo, reducir el consumo de carne (incluso para mascotas) podría incrementaría el bienestar global. Estos argumentos resaltan un conflicto: ¿debemos adaptar nuestras prácticas por respeto al sufrimiento animal a gran escala, o priorizar las preferencias naturales de cada animal? En cualquier caso, la discusión también cuestiona la instrumentalización de las mascotas para fines humanos: ¿un alimento óptimo para el animal o un subproducto de la industria? La literatura señala que, con la formulación correcta, las dietas alternativas pueden ser nutricionalmente adecuadas, pero queda el interrogante moral de si imponer dichas dietas respeta la identidad carnívora de los animales.",
    coexistenceImpact: "Para lograr coexistir, la pregunta final es cómo armonizar el vínculo humano-mascota con un compromiso ético más amplio. Una opción pragmática ha sido mejorar los procesos de producción de piensos (p. ej. usando subproductos animales o tecnologías más limpias) o desarrollar dietas vegetales balanceadas que no comprometan la salud de los animales. De fondo, el dilema invita a reflexionar si conviene incentivar a los propietarios a asumir un rol ético expandido, buscando alimentos para mascotas que minimicen el sufrimiento y el impacto ecológico. ¿Debería nuestra responsabilidad hacia los animales incluir la reevaluación de lo que les damos de comer, incluso cuando esto contradice su dieta natural?",
    references: [
      { id: "1", citation: "European Pet Food Federation. (2023). Are vegetarian diets for cats and dogs safe? FEDIAF.", url: "https://europeanpetfood.org/pet-food-facts/fact-sheets/nutrition/vegetarian-diets/" },
      { id: "2", citation: "Nicholles, B. N., & Knight, A. K. (2025). The environmental sustainability of meat-based versus vegan pet food. Frontiers in Sustainable Food Systems, 9, 1569372.", url: "https://doi.org/10.3389/fsufs.2025.1569372" }
    ],
    openQuestion: "¿Debe adaptarse la dieta de las mascotas a imperativos éticos y ambientales más amplios, aun comprometiendo sus preferencias naturales?"
  },
  {
    id: "r2-ecologismo-animalismo",
    category: "ecologia",
    title: "Ecologismo vs. animalismo: ¿prioridad de la especie o del individuo?",
    popularStatement: "«Si para salvar el ecosistema hay que sacrificar unos pocos animales, entonces habremos hecho lo correcto»",
    consensus: "DILEMA",
    scientificDeconstruction: "Las estrategias de conservación a menudo enfrentan el dilema de sacrificar individuos para proteger especies. Ejemplo: en Nueva Zelanda se cazan plagas introducidas (zarigüeyas, comadrejas) para salvar aves autóctonas, acción que la mayoría acepta al no haber opción evidente mejor. La ecología demuestra que especies invasoras o poblaciones fuera de control pueden extinguir otras (p.ej. ratas en islas, peste porcina africana en cerdos). La ciencia no da criterios absolutos, pero estudios como Gamborg et al. (2012) muestran cómo distintas perspectivas analizan el trade-off: los utilitaristas podrían justificar el sacrificio de algunos animales para reducir sufrimiento global, mientras que otros enfoques destacan los riesgos de interferir con poblaciones naturales.",
    philosophicalDeconstruction: "Desde el punto de vista ético, el animalismo defiende que cada individuo sintiente tiene valor propio, por lo que matarlo para beneficio de otros es moralmente problemático. En contraposición, la visión ecocéntrica (o de conservación) atribuye un valor intrínseco a ecosistemas y especies completas; en ese marco, eliminar invasoras o controlar sobrepoblaciones se considera justificable para proteger el bioma. Gamborg et al. observan que estos conflictos se abordan según la escuela filosófica: p.ej. los defensores de los derechos animales sostienen que no debemos matar (ni detener selectivamente) animales inocentes, mientras que enfoques de 'respeto a la naturaleza' permitirían eliminar especies exóticas que amenazan la estabilidad. Los filósofos de Animal Ethics argumentan que centrar el valor moral en especies (entidades abstractas) en lugar de individuos es falaz: 'una especie es una entidad abstracta que no puede sentir', y, por tanto, no hay justificación intrínseca para sacrificar seres sintientes por una presunta causa mayor (especialmente si existen métodos alternativos).",
    coexistenceImpact: "En términos de convivencia, el debate plantea si es posible diseñar estrategias de conservación que no sacrifiquen vidas individuales. Por ejemplo, se proponen métodos no letales (como anticoncepción de animales salvajes o control de plagas mediante barreras físicas) siempre que sea viable. El dilema invita a reflexionar: ¿hasta qué punto una sociedad que valora a todos los seres sintientes puede emplear la fuerza letal contra parte de ellos? En última instancia, la pregunta es si la ética de conservación debe evolucionar hacia enfoques más inclusivos que consideren simultáneamente a los ecosistemas y a cada ser sensible.",
    references: [
      { id: "1", citation: "Gamborg, C., Palmer, C., & Sandoe, P. (2012). Ethics of Wildlife Management and Conservation: What Should We Try to Protect? Nature Education Knowledge, 3(10):8.", url: "https://www.nature.com/scitable/knowledge/library/ethics-of-wildlife-management-and-conservation-what-80060473/" },
      { id: "2", citation: "Parke, E. C., & Russell, J. C. (2018). Ethical responsibilities in invasion biology. The Ecological Citizen, 2(1), 17-19.", url: "" }
    ],
    openQuestion: "¿Debe la conservación reconsiderar sus objetivos para incluir de manera equitativa el bienestar de cada individuo sintiente junto a la protección de especies enteras?"
  },
  {
    id: "r2-tauromaquia-patrimonio",
    category: "sistemas_uso",
    title: "Tauromaquia: ¿patrimonio cultural o exhibición de crueldad?",
    popularStatement: "«La tauromaquia es arte y tradición nacional, no es un maltrato animal»",
    consensus: "DILEMA",
    scientificDeconstruction: "Las corridas de toros son controvertidas en cuanto al bienestar animal. Encuestas recientes en Perú indican que más del 68% reconoce que los toros sufren durante las corridas y un 69% opina que se vulneran sus derechos. Fisiológicamente, los toros son sometidos a estrés extremo: pueden resultar heridos gravemente, agitados por las banderillas y el esfuerzo, y sufren lesiones dolorosas. Estudios de fisiología animal confirman que estos eventos causan dolor intenso. Además, datos en España muestran que apenas el 8% de la población asiste a estas fiestas y un 80% rechaza subvencionar la tauromaquia, reflejando una tendencia generalizada contra la práctica. Si bien defensores mencionan beneficios tales como la conservación de la raza del toro de lidia o argumentos antropológicos, desde el punto de vista científico esos beneficios no eliminan el sufrimiento agudo causado en cada corrida.",
    philosophicalDeconstruction: "Ético y filosóficamente, la tauromaquia enfrenta el relativismo cultural frente a valores universales. Los partidarios la consideran un elemento del patrimonio cultural, pero críticos del bienestar animal sostienen que la tradición no puede justificar causar dolor innecesario a un ser sintiente. Desde el utilitarismo, se ponderaría el placer estético o cultural frente al dolor del toro; la mayoría de pensadores concluyen que causar sufrimiento consciente para entretener al público es excesivo. Argumentos basados en derechos animales (p.ej., Tom Regan, Peter Singer) subrayan que los animales no deben ser tratados como medios para fines humanos, sin importar la tradición. Mientras la cultura es relevante, cada vez más la filosofía moral moderna rechaza la instrumentalización del toro, enfatizando que la coherencia ética exigiría abolir prácticas que terminan con la vida del animal sin necesidad, ya que alternativas culturales (festivales simbólicos o educativos) podrían preservar la identidad cultural sin crueldad.",
    coexistenceImpact: "La cuestión final es cómo integrar las costumbres arraigadas en un marco ético en evolución. Una opción avanzada ha sido transformar el espectáculo (p.ej. capea sin lance, recortes sin cornadas) para reducir el daño físico, aunque esto genera debate sobre si la esencia de la tradición se pierde. Queda la pregunta: ¿es posible convivir respetando ambas aristas? En todo caso, el dilema obliga a plantear si la convivencia social debe redefinir tradiciones cuando entran en conflicto con los principios del respeto animal. En última instancia: ¿permanece la tauromaquia dentro del marco ético aceptable cuando se busca la armonía entre tradición y compasión animal?",
    references: [
      { id: "1", citation: "Cano-López, R. (2024). Percepción de los pobladores sobre el bienestar animal en corridas de toros en Huancavelica, Perú. Salud y Tecnología Veterinaria, 12(2).", url: "" },
      { id: "2", citation: "CAS International. (2014). Spain declares bullfighting to be Cultural Heritage.", url: "https://casint.org/press-release-spain-declares-bullfighting-to-be-cultural-heritage" }
    ],
    openQuestion: "¿Es posible armonizar la preservación de tradiciones culturales con una ética de compasión, o la tauromaquia debe ceder ante los principios del respeto animal?"
  },
  {
    id: "r2-especies-invasoras",
    category: "ecologia",
    title: "Especies invasoras: ¿erradicación aceptable en aras de la conservación?",
    popularStatement: "«Cuando una especie invasora está destruyendo el ecosistema, lo más útil es eliminarla de inmediato»",
    consensus: "DILEMA",
    scientificDeconstruction: "La eliminación de especies invasoras es una práctica común para proteger ecosistemas amenazados. Por ejemplo, en Nueva Zelanda, plagas introducidas que amenazan a aves endémicas son aniquiladas masivamente; defensores indican que si no se actúa, las especies autóctonas mueren por omisión. Estudios en biología de la conservación reconocen que controlar invasoras (p.ej. ratas en islas, ardillas no autóctonas, serpientes exóticas) puede ser la única medida eficaz para preservar la biodiversidad. Sin embargo, no hay criterio científico único: algunos muestran que métodos letales urgentes pueden reducir drásticamente las poblaciones invasoras y salvar hábitats críticos, mientras otros proponen métodos alternativos no letales cuando sean viables.",
    philosophicalDeconstruction: "Filosóficamente, este tema reabre el conflicto entre biocentrismo y derechos individuales. Un enfoque utilitarista puede justificar el sacrificio de invasores para minimizar el sufrimiento total y evitar extinciones mayores. Desde el punto de vista de los derechos animales, cuestiona la moralidad de matar seres sintientes por un fin ecológico. Parke y Russell argumentan que la respuesta no es clara: no hay consigna ética única, cada caso requiere balancear la obligación hacia el ecosistema con el deber de no dañar individuos. En la teoría, se invita a considerar el principio de precaución: ¿se puede resolver el problema sin recurrir a muertes masivas, o el beneficio de salvar un ecosistema justifica sacrificar invasores? El diálogo filosófico sugiere que la respuesta puede depender del consenso social y de las alternativas disponibles, como programas de esterilización o barreras, procurando respetar en lo posible la vida individual.",
    coexistenceImpact: "La reflexión final plantea si podemos convivir con la naturaleza invasora usando medios menos letales. Se exploran estrategias alternativas (control biológico, esterilización) que reduzcan población invasora sin matar. Aun así, el dilema concluye con la pregunta de si eliminar invasores puede justificarse moralmente para proteger a muchos otros. ¿Es aceptable sacrificar animales invasores si ello evita la extinción de numerosas especies nativas? Este planteamiento socrático lleva a cuestionar cómo pesamos el valor de una vida invasora frente al bienestar de todo un ecosistema y sus especies originarias.",
    references: [
      { id: "1", citation: "Parke, E. C., & Russell, J. C. (2018). Ethical responsibilities in invasion biology. The Ecological Citizen, 2(1), 17-19.", url: "" },
      { id: "2", citation: "Sommer, L., & Kellman, R. (2025). New Zealand's bold plan to save endangered animals: kill millions of invasive animals. NPR.", url: "https://www.npr.org/sections/goatsandsoda/2025/09/09" }
    ],
    openQuestion: "¿Puede justificarse moralmente sacrificar animales invasores para proteger otros, o esta práctica contradice principios básicos de respeto a la vida?"
  },
  {
    id: "r2-quimeras-humanas",
    category: "sintiencia",
    title: "Quimeras humano-animales: ¿estatus moral de los embriones mixtos?",
    popularStatement: "«Un cerdo al que le trasplantas células humanas nunca será un humano, no tendrá conciencia humana»",
    consensus: "ESCENARIO_GRIS",
    scientificDeconstruction: "La investigación de quimeras humano-animal consiste en insertar células madre humanas en embriones animales para generar tejidos mixtos (p. ej., cerdos quimera para producir órganos compatibles). Hasta la fecha, se logra que un pequeño porcentaje de células humanas (por ejemplo, en hígado o riñón) coexitan con células animales, sin formar un cerebro humano funcional. Aun así, hay preocupación científica: ¿qué sucede si las células humanas se incorporan al cerebro animal? Estudios como Aravena (2025) señalan la necesidad de precaución, pues el progreso técnico puede difuminar límites éticos y legales. Actualmente no hay casos de quimeras con conciencia humana, pero experimentos muestran que algunas especies de mamíferos quimera pueden desarrollarse parcialmente, lo que exige regulación rigurosa y monitoreo del desarrollo neural.",
    philosophicalDeconstruction: "Ético y filosóficamente, surge la pregunta del estatuto moral del embrión quimérico. Algunos filósofos (Singer, Regan) argumentarían que si un embrión desarrolla un nivel de consciencia similar al humano, debería considerarse como sujeto moral equivalente a un humano. Aravena alerta que este campo impone límites no establecidos: introducir células humanas en animales extiende los límites de lo éticamente aceptable. En la discusión, Bhan et al. (2010) proponen un enfoque utilitario: sopesar los beneficios potenciales (vacunas, trasplantes) frente a los temores culturales, recordando que la prohibición absoluta podría impedir curas vitales. En última instancia, la cuestión filosófica es definir si el embrión quimera merece un estatus similar al de seres humanos o queda en un espacio intermedio; muchos eticistas concluyen que se requiere un marco ético específico (p. ej., no sobrepasar cierto porcentaje de contribución humana en el cerebro) para resolverlo con criterio.",
    coexistenceImpact: "Este escenario radical plantea cómo acompañar el avance científico manteniendo valores éticos. Una propuesta es la regulación: por ejemplo, si un embrión quimérico llega a cierto estadio o proporción humana crítica, se debería interrumpir su gestación por respeto a su dignidad emergente. Otro enfoque es la transparencia y el diálogo público sobre estos experimentos. La pregunta final es si es posible convivir con esta tecnología creando límites claros: ¿qué características debería tener un embrión quimérico para que la sociedad le reconozca derechos propios? En consecuencia, se invita a la reflexión sobre si la posibilidad de salvar vidas humanas justifica el riesgo de crear entes híbridos éticamente problemáticos.",
    references: [
      { id: "1", citation: "Aravena, M. (2025). Desafíos ético-legales de la experimentación con quimeras humano-animales. Revista de Bioética y Derecho, 31, 53-69.", url: "" },
      { id: "2", citation: "Bhan, A., Singer, P. A., & Daar, A. S. (2010). Human–animal chimeras for vaccine development: An endangered species or opportunity for the developing world? BMC International Health and Human Rights, 10(8).", url: "" }
    ],
    openQuestion: "¿Cuáles límites éticos debemos trazar en la investigación con quimeras para que los beneficios médicos no comprometan la dignidad de especies sintientes?"
  },
  {
    id: "r2-fetos-animales",
    category: "sintiencia",
    title: "Embriones y fetos animales: ¿umbral de sintiencia prenatal?",
    popularStatement: "«Un embrión animal en las primeras semanas no siente dolor ni conciencia, solo desarrolla sus sentidos más adelante en la gestación»",
    consensus: "ESCENARIO_GRIS",
    scientificDeconstruction: "La existencia de sensaciones fetales antes del nacimiento es debatida. La neurociencia comparada indica que en la mayoría de los animales las vías nerviosas necesarias para el dolor consciente no se conectan plenamente hasta etapas avanzadas de la gestación (equivalentes al segundo o tercer trimestre en humanos). Por ejemplo, se sabe que recién después de formarse conexiones corticales las hormonas del estrés en fetos pueden indicar conciencia potencial. En consecuencia, muchos expertos asumen que los embriones tempranos no experimentan dolor real; sin embargo, se reconoce la incertidumbre hasta establecer bioseñales precisas. Las regulaciones actuales, como la Directiva 2010/63/EU, exigen analgesia o eutanasia temprana en procedimientos invasivos que puedan afectar a fetos animales en desarrollo avanzado, reflejando precaución científica ante posibles experiencias fetales tardías.",
    philosophicalDeconstruction: "Ético y filosóficamente, se debate cuál es el estatus moral de los embriones y fetos. Algunos filósofos defienden el principio de precaución: si no estamos seguros de la presencia de sensaciones, merece la pena minimizar cualquier posible sufrimiento administrando analgésicos o evitando procedimientos innecesarios. Otros argumentan que, si no hay evidencia clara de conciencia fetal, no hay obligación moral equiparable a la de un ser nacido. En la práctica, muchos bioéticos toman una posición intermedia: conceden mayor consideración conforme avanza la gestación y la capacidad neural del feto. Este enfoque va en línea con directrices éticas que requieren tratamientos más estrictos (anestesia, limitaciones en experimentación) en fetos tardíos, intentando respetar su posible desarrollo sintiente sin paralizar la investigación científica necesaria.",
    coexistenceImpact: "Finalmente, este dilema incita a preguntarse cómo operan los principios de prudencia en la convivencia práctica. En la ganadería y la investigación, la cuestión es: ¿qué nivel de precaución adoptamos? Algunos proponen protocolos donde, llegado cierto umbral de desarrollo neural, se suspendan procedimientos y se administre analgesia; otros piden investigación adicional para delimitar mejor la sintiencia fetal. El interrogante socrático resultante es si debemos tratar a todo embrión animal como sujeto potencial de dolor o asumir un umbral mínimo: ¿qué criterio usar para decidir en qué momento moralizar las intervenciones sobre fetos, y cómo garantizar que las decisiones reflejen un equilibrio entre progreso y respeto a la vida?",
    references: [
      { id: "1", citation: "Aravena, M. (2025). Desafíos ético-legales de la experimentación con quimeras humano-animales. Revista de Bioética y Derecho, 31, 53-69.", url: "" },
      { id: "2", citation: "European Union (2010). Directive 2010/63/EU on the protection of animals used for scientific purposes.", url: "https://eur-lex.europa.eu/eli/dir/2010/63" }
    ],
    openQuestion: "¿Hasta qué etapa gestacional debe considerarse la posibilidad de sensación fetal al planificar intervenciones en animales?"
  },
  {
    id: "r2-animales-modificados-geneticamente",
    category: "sistemas_uso",
    title: "Animales transgénicos: ¿qué pasa con su sintiencia?",
    popularStatement: "«A los animales transgénicos los modifican para producir más comida, no hay que preocuparse por su conciencia»",
    consensus: "ESCENARIO_GRIS",
    scientificDeconstruction: "La modificación genética en animales se emplea para investigación y producción. Por ejemplo, se crean ratones transgénicos que expresan genes humanos para estudiar enfermedades; se obtienen salmones transgénicos de crecimiento rápido para la alimentación. Desde el punto de vista biológico, no existe evidencia de que estos cambios aumenten la sintiencia de los animales. En el caso de animales de experimento, la genética permite reducir el número de mamíferos más complejos usados, pues ratones genéticamente alterados pueden reemplazar parcialmentre a primates en cierto tipo de investigación. Sin embargo, los opositores alertan que la ingeniería animal podría introducir problemas de bienestar: por ejemplo, si un cambio genético provoca dolor crónico o alteraciones en el comportamiento, el animal podría sufrir más. Hasta ahora, el debate científico se centra más en los efectos fisiológicos de los transgenes (enfermedades asociadas, metabolismo alterado) que en la consciencia en sí. No obstante, se reconoce la necesidad de monitorear las consecuencias sobre el bienestar completo del animal modificado.",
    philosophicalDeconstruction: "Ética y filosóficamente, la cuestión aborda el respeto a la naturaleza del animal. La constitución suiza es pionera al exigir que la dignidad del ser vivo sea considerada en biotecnología, lo que implica que no basta la eficiencia productiva si se vulnera el bienestar intrínseco. Desde este enfoque, los animales transgénicos no deben reducirse a meros instrumentos: la modificación genética debe evaluarse también por sus efectos sobre el ser vivo en sí. En contraste, algunos utilitaristas podrían justificar ciertas modificaciones si se reducen daños mayores (p.ej., eliminar enfermedades genéticas) y en general mejorar el bienestar de poblaciones. La discusión ética invita a preguntarse si dotar a los animales de nuevos genes cambia su estatus moral o si sigue aplicando para ellos la misma consideración de interés que antes de la modificación. En últimas, se plantea si conviene aplicar principios de precaución: ¿debe tener más protección un animal cuyo genoma ha sido alterado artificialmente?",
    coexistenceImpact: "En la praxis social, los animales transgénicos plantean retos de regulación y aceptación. ¿Deben recibir protecciones especiales? Por ejemplo, el primer salmón transgénico aprobado para consumo generó debates regulatorios sobre rotulado y bioseguridad. La pregunta final es cómo integrar estos seres en una coexistencia ética: ¿existe un límite ético en la ingeniería animal que la sociedad deba acordar, pensando en el interés y bienestar de los animales involucrados? El asunto sugiere que debemos decidir colectivamente cuánto interviniendo en su naturaleza vamos a aceptar para fines humanos.",
    references: [
      { id: "1", citation: "Dennis, C. J. (2002). Engineering animals through transgenesis: issues and perspectives for animal welfare. ILAR Journal, 43(3), 236–239.", url: "" },
      { id: "2", citation: "Cimadori, I. (2025). Farm Animal Welfare in Breeding and Gene Editing: EU and Swiss law. Journal of Animal Law, Ethics & One Health (LEOH).", url: "" }
    ],
    openQuestion: "¿Qué límites éticos deben regir la manipulación genética de animales si así se altera irreversiblemente su naturaleza?"
  },
  {
    id: "r2-marco-legal-tfue",
    category: "legal",
    title: "Marco legal internacional: artículo 13 del TFUE y reformas civiles",
    popularStatement: "«Hasta hace poco los animales eran considerados objetos jurídicos; ahora la ley reconoce que son seres sintientes»",
    consensus: "CONSENSO",
    scientificDeconstruction: "El reconocimiento legal de los animales ha avanzado notablemente en años recientes. A nivel internacional, el Tratado de Lisboa (UE) incluyó en el Artículo 13 la consideración de los animales como seres sintientes, exigiendo que las instituciones comunitarias tengan en cuenta su bienestar. A nivel nacional, varios países han reformado sus códigos civiles: por ejemplo, España aprobó en 2021 una ley que define los animales como \"seres vivos dotados de sensibilidad\" en lugar de cosas. Otros países (Francia, Alemania, etc.) han introducido enmiendas similares o leyes de protección que reflejan la nueva visión. Estos cambios legales reflejan un consenso creciente: muchos sistemas jurídicos ahora reconocen en sus textos que los animales no son meros objetos, garantizando así bases para futuras medidas de protección y responsabilidad.",
    philosophicalDeconstruction: "El cambio legal refleja también un consenso moral emergente: cada vez se considera menos tolerable tratar a los animales como propiedad sin derechos. Filósofos del derecho comparan este proceso con la extensión histórica de derechos a otros grupos vulnerables. En concreto, incorporar la sintiencia en la ley implica que la interacción humana con animales debe restringirse por su bienestar, acercándose más a visiones antropológicas donde se reconoce cierto estatus moral. Por ejemplo, la normativa europea y los códigos civiles reformados concuerdan con teorías éticas que postulan un deber positivo hacia los animales (no solo no dañarlos, sino velar activamente por su bienestar). En resumen, las bases jurídicas sentadas sugieren que la comunidad internacional ha llegado a un consenso sobre la validez ética de otorgar protección legal a los animales como seres sintientes.",
    coexistenceImpact: "Este consenso legal mejora la convivencia humano-animal al establecer estándares mínimos de trato. Al reconocerse jurídicamente su sintiencia, las leyes proveen fundamento para prohibir prácticas crueles y fomentar cuidados adecuados. La pregunta final es cómo seguir evolucionando: por ejemplo, ¿debe extenderse el bienestar animal a todos los ámbitos (entrenamiento, entretenimiento, mascotas) con la misma rigurosidad? ¿Debe garantizarse acceso a cuidados veterinarios básicos a todos los animales? En última instancia, la sociedad debe decidir qué nuevos deberes crea este reconocimiento: la coexistencia exige que la ley y la práctica social converjan, traduciéndose los valores en normativas operativas que protejan a los animales.",
    references: [
      { id: "1", citation: "Ley 17/2021, de 15 de diciembre, de régimen jurídico de la protección de los animales (BOE 2021).", url: "https://www.boe.es/eli/es/l/2021/12/15/17" },
      { id: "2", citation: "Tratado de Funcionamiento de la Unión Europea (TFUE), art. 13 (Lisboa, 2007).", url: "https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:12012E-T" }
    ],
    openQuestion: "¿Cómo debe evolucionar el derecho internacional para garantizar que la consideración legal de la sintiencia animal se traduzca efectivamente en mayor protección real para los animales?"
  },
  {
    id: "r2-prohibicion-mutilaciones-granjas",
    category: "sistemas_uso",
    title: "Mutilaciones rutinarias en granjas: prohibición creciente",
    popularStatement: "«Cortar colas de cerdos y picos de pollos es normal en la ganadería; no es crueldad, es rutina»",
    consensus: "CONSENSO",
    scientificDeconstruction: "En la ganadería industrial se han identificado prácticas dolorosas sin beneficio para los animales, como el corte rutinario de colas en cerdos o el despique de picos en aves. Estas mutilaciones causan dolor agudo y estrés crónico, como han documentado veterinarios especialistas. En respuesta, muchos países y la Unión Europea han prohibido estas prácticas sin razones veterinarias estrictas: la Directiva 2008/120/CE prohíbe el amordazado rutinario de cerdos y requiere analgesia si se realiza por motivos médicos; de igual manera, la UE eliminó progresivamente el despique obligatorio en aves (Directiva 1999/74/CE prohíbe cortar picos excepto en circunstancias excepcionales). Estas medidas reflejan la conclusión científica de que las mutilaciones causan sufrimiento innecesario y que existen métodos alternativos (ambientes enriquecidos, manejo sanitario) para evitar comportamientos agresivos sin infligir dolor.",
    philosophicalDeconstruction: "Ética y filosóficamente, la eliminación de estas prácticas se fundamenta en principios básicos de bienestar: si una intervención causa sufrimiento sin mejorar la vida del animal, carece de justificación moral. Filósofos del bienestar animal señalan que reconocer legalmente su incompatibilidad (como ha hecho la legislación actual) es coherente con la idea de tratar a los animales con compasión. En efecto, si aceptamos que los animales son sintientes (como reconoce el marco legal internacional), el sacrificar su integridad física por conveniencia industrial se vuelve inaceptable. Estos enfoques concuerdan en aplicar un standard mínimo: está justificado prohibir actos que infringen los derechos implícitos de los animales (a no sufrir desamparados) y promover alternativas que velen por su salud y comportamiento natural.",
    coexistenceImpact: "Este consenso legal cambia las reglas de convivencia humano-animal al elevar los estándares de manejo. Para la coexistencia futura, la pregunta es cómo avanzar aún más: por ejemplo, ¿deberían prohibirse otras prácticas correlacionadas (como el descornado sin anestesia)? En la práctica, se proponen sustitutos (por ejemplo, ambientes con estímulos para reducir comportamientos agresivos) y capacitación a granjeros. En definitiva, el dilema final es si bastan las leyes para eliminar el sufrimiento sistemático, o si hace falta un cambio de mentalidad más profundo en la cría industrial. Socráticamente: ¿qué otras intervenciones habituales podrían cuestionarse al aplicar estos principios, y cómo podemos asegurar que la ley sea sólo el primer paso hacia una relación más respetuosa con los animales?",
    references: [
      { id: "1", citation: "European Commission (2008). Council Directive 2008/120/EC laying down minimum standards for the protection of pigs.", url: "https://eur-lex.europa.eu/eli/dir/2008/120" },
      { id: "2", citation: "European Commission (1999). Council Directive 1999/74/EC laying down minimum standards for the protection of laying hens.", url: "https://eur-lex.europa.eu/eli/dir/1999/74/oj" }
    ],
    openQuestion: "¿Qué medidas adicionales (legales o de manejo) pueden sustituir definitivamente estas prácticas, asegurando a la vez la salud y el manejo de los animales?"
  },
  {
    id: "r2-falacia-ad-hominem",
    category: "psicologia",
    title: "Falacia ad hominem: atacar al mensajero en debates animales",
    popularStatement: "«Los veganos son ricos privilegiados y millennials de moda; no tienen autoridad moral»",
    consensus: "FALACIA",
    scientificDeconstruction: "La falacia ad hominem ocurre cuando se descalifica la propuesta atacando a quien la plantea en lugar de discutir sus argumentos. Por ejemplo, tachar el veganismo de “moda de privilegiados” ataca la identidad de quienes lo defienden en vez de sus razones éticas. En lógica informal, esto se define como sustituir un juicio sobre el contenido por uno sobre la persona, lo cual no invalida el argumento original. A pesar de que estas descalificaciones son comunes en el discurso público, carecen de respaldo lógico. Incluso si un argumento proviene de alguien con cierto perfil, su veracidad o validez permanece independiente de quién lo enuncie. Estudios en psicología cognitiva señalan que esta falacia suele provenir de prejuicios sociales o sesgos de rechazo, pero no aporta evidencia real contra la causa defendida.",
    philosophicalDeconstruction: "Desde un punto de vista filosófico, recurrir a ataques personales en lugar de razones es considerado un comportamiento irracional y poco ético en el debate público. Filósofos del argumento han indicado que esta táctica favorece la polarización y evita la negociación de ideas: en lugar de enfrentar la cuestión moral en sí, se centra la atención en el estatus social o características personales de quienes expone. Esto contraviene los ideales de diálogo racional y justo que proponen pensadores como Habermas, quienes sostienen que el discurso debe evaluar ideas por sus méritos, no por el origen de quien las propone. En síntesis, la falacia ad hominem actúa como una distracción impropia: el valor de un argumento, incluyendo los sobre bienestar animal, debe juzgarse por su contenido, no por quien lo defiende.",
    coexistenceImpact: "Reconocer y evitar esta falacia favorece una convivencia discursiva más madura, en la que se evalúan ideas y no identidades. La pregunta final es cómo podemos estructurar debates que estén a salvo de ataques personales, de modo que permitan a veganos y no veganos entenderse mejor. En otras palabras: ¿de qué serviría rechazar un argumento sólo por el origen de quien lo plantea, si la verdad de fondo podría permanecer? Este cuestionamiento socrático invita a centrarse en las propuestas reales para avanzar en temas de cohabitación entre personas y animales.",
    references: [
      { id: "1", citation: "Walton, D. (1998). Ad hominem arguments. University of Alabama Press.", url: "" },
      { id: "2", citation: "Logically Fallacious (2023). Ad Hominem (Abusive). Archieboy Holdings.", url: "https://www.logicallyfallacious.com/logicalfallacies/Ad-Hominem-Abusive" }
    ],
    openQuestion: "¿Cómo puede mejorarse el debate público sobre bienestar animal si evaluamos los argumentos independientemente de quién los plantea?"
  },
  {
    id: "r2-falacia-pendiente-resbaladiza",
    category: "psicologia",
    title: "Falacia de la pendiente resbaladiza en el debate alimentario",
    popularStatement: "«Si prohibimos la carne, después vendrán la prohibición de huevos, luego la de tener mascotas; al final perderemos toda libertad alimentaria»",
    consensus: "FALACIA",
    scientificDeconstruction: "La pendiente resbaladiza es una falacia donde se predice un encadenamiento de consecuencias extremas sin base firme. En el ejemplo, se asume que prohibir la carne inevitablemente conducirá a vetar otros alimentos o prácticas, sin evidencia que sostenga esa conexión necesaria. La lógica informal define este error como inferir la inevitabilidad de un resultado lejano por aceptar un paso inicial. En realidad, cambiar una política (por ejemplo, regular la producción cárnica) no implica automáticamente nuevos vetos, ya que cada decisión requiere su propio análisis. El error al presentar la cadena de consecuencias como segura se basa en el miedo y no en datos, desviando la discusión de los méritos reales de la regulación dietaria.",
    philosophicalDeconstruction: "Desde el punto de vista filosófico del argumento, la falacia radica en que no hay conexión demostrada entre cada paso hipotético. Pensadores del discurso racional insisten en evaluar cada propuesta por sus méritos independientes. En ética pragmática, conjurar escenarios extremos sirve más como una técnica de persuasión emocional que como un razonamiento válido. Por tanto, este argumento carece de justificación moral sólida: incluso si a alguien le preocupa la libertad alimentaria, debe aportar motivos concretos para cada prohibición propuesta, no suponerlas todas derivadas unas de otras. Este tipo de razonamiento suele agravar la polarización en el debate social al apelar al miedo a lo desconocido en lugar de a consideraciones fundadas.",
    coexistenceImpact: "Reflexionando sobre esto, surge la pregunta: ¿cómo distinguir entre un escenario plausible y uno infundado al discutir cambios de consumo? La invitación socrática es a examinar cada paso de la supuesta pendiente críticamente: ¿qué evidencia existe de que prohibir un producto lleve a cerrar puertas adicionales? Este cuestionamiento sugiere que para convivir pacíficamente deberíamos exigir argumentos sólidos para cada cambio, en lugar de basarnos en temores encadenados. En última instancia, nos insta a ser escépticos con advertencias alarmistas: en el diálogo sobre alimentación, ¿deberíamos reformular el debate centrándonos en la causa directa (por qué prohibir carne) y no en los miedos colaterales?",
    references: [
      { id: "1", citation: "Excelsior OWL. (s.f.). Slippery Slope Fallacy. Writing Commons.", url: "" },
      { id: "2", citation: "Stanford Encyclopedia of Philosophy (2017). Fallacy of Slippery Slope (Walton, D.).", url: "https://plato.stanford.edu/entries/fallacies/" }
    ],
    openQuestion: "¿Cómo podemos distinguir entre un escenario plausible y un miedo infundado cuando debatimos cambios en prácticas humanas?"
  },
  {
    id: "r2-falacia-composicion",
    category: "psicologia",
    title: "Falacia de la composición: ¿generalizar a partir de casos individuales?",
    popularStatement: "«Conozco a un ganadero que cuida muy bien a sus animales; por lo tanto, la industria ganadera no puede ser mala»",
    consensus: "FALACIA",
    scientificDeconstruction: "La falacia de la composición ocurre al atribuir las cualidades de una parte a todo el conjunto. En el ejemplo, asumir que todo el sector ganadero es ético porque un productor individual es ejemplar no es lógico. La lógica informal define este error como inferir que un enunciado aplicable a cada elemento individual es válido para el conjunto. Por ejemplo, si cada miembro de un equipo es un excelente investigador, no implica que el equipo sea necesariamente excelente debido al trabajo colaborativo. En ganadería, un caso aislado de buen trato no elimina evidencia de prácticas crueles generalizadas en la industria. Este tipo de generalización ha sido identificado como falaz porque ignora la posible heterogeneidad y dinámicas sistémicas; no considera que, además del cuidado individual, existen estructuras económicas y culturales que afectan el bienestar en distintas explotaciones.",
    philosophicalDeconstruction: "Filósofos de la argumentación señalan que esta falacia viola el principio de individuación: no todos los miembros de una categoría comparten las mismas propiedades, y la experiencia singular no sustituye a la evaluación global. En ética, sostener que un hecho particular invalida una problemática general se considera insuficiente; se necesita evidencia representativa. Por ello, aunque un ganadero sea ejemplar, esto no transforma el sistema en su totalidad. Este razonamiento falla por omisión de contexto: la industria agropecuaria es diversa y compleja. En el fondo, el error moral es suponer que un caso virtuoso exime a todo un sector de crítica. Una evaluación ética rigurosa requeriría estudiar las prácticas comunes y sus efectos colectivos, no confiar en ejemplos aislados.",
    coexistenceImpact: "Este error demuestra que, para convivir, debemos cuestionar nuestras generalizaciones. Socráticamente: ¿cómo cambia la conversación si reconocemos que un buen ejemplo individual no anula los problemas sistémicos? Esto nos invita a examinar la totalidad de la industria antes de concluir. Implica que, al abordar temas de bienestar animal, no bastan testimonios aislados; se necesitan datos amplios y análisis crítico. En la práctica, el mensaje para la convivencia es que cada uno debe hacer el esfuerzo de informarse más allá de impresiones personales: ¿qué cifras globales apoyan o refutan nuestra visión del sector, y cómo podemos alinear nuestras conclusiones con la evidencia completa?",
    references: [
      { id: "1", citation: "Logically Fallacious (2023). Fallacy of Composition. Archieboy Holdings.", url: "https://www.logicallyfallacious.com/logicalfallacies/Fallacy-of-Composition" },
      { id: "2", citation: "Stanford Encyclopedia of Philosophy (2017). Fallacies (Walton, D.).", url: "https://plato.stanford.edu/entries/fallacies/" }
    ],
    openQuestion: "¿En qué medida nuestras propias generalizaciones basadas en experiencias individuales moldean injustamente cómo valoramos el comportamiento de industrias enteras?"
  }
];

export interface TimelineMilestone {
  id: string;
  year: number; // For sorting and timeline-lag computations (can be negative for BCE/a.C.)
  yearLabel: string; // e.g. "c. 10.000 a.C." o "1637"
  title: string;
  shortDesc: string;
  longDesc: string;
  scientificFacts: string[];
  references?: ReferenceDetail[];
  relatedNodeId?: string; // Optional reference to a CORE_NODE id (for linking back to concepts/dilemmas!)
  openQuestion?: string;
}

export interface TimelineGroup {
  id: "usos" | "etica" | "regulaciones" | "alimentacion";
  title: string;
  description: string;
  color: string; // color theme identifier
  milestones: TimelineMilestone[];
}

export const TIMELINE_DATA: TimelineGroup[] = [
  {
    id: "usos",
    title: "Usos e Instrumentalización",
    description: "La historia material de cómo la humanidad ha subordinado la fuerza, el cuerpo y el metabolismo animal para construir la infraestructura de la civilización.",
    color: "blue",
    milestones: [
      {
        id: "domesticacion-neolitica",
        year: -10000,
        yearLabel: "c. 10.000 a.C.",
        title: "La Revolución del Neolítico",
        shortDesc: "La transición de la caza a la domesticación selectiva de especies gregarias.",
        longDesc: "En el Creciente Fértil y otras regiones independientes, el Homo sapiens abandona el nomadismo y comienza a confinar y reproducir de forma selectiva a cabras, ovejas y rumiantes [1]. El animal deja de ser un competidor en estado salvaje para convertirse en un recurso vivo controlable: almacenamiento biológico de proteínas, grasa y abrigo [2]. Esta domesticación inicial sentó los cimientos del sedentarismo agrícola humano [3].",
        scientificFacts: [
          "La domesticación modificó la morfología y el comportamiento animal, reduciendo el tamaño del cerebro y atenuando sus respuestas de huida ante el ser humano [1].",
          "La dehesa agrícola primitiva del Neolítico generó una coevolución patógena debido a la estrecha proximidad con el ganado, dando origen a la mayoría de las enfermedades infecciosas humanas históricas (zoonosis) [3]."
        ],
        references: [
          {
            id: "1",
            citation: "Clutton-Brock, J. (2012). A Natural History of Domesticated Mammals. Cambridge University Press.",
            url: "https://doi.org/10.1017/CBO9781139165662"
          },
          {
            id: "2",
            citation: "Diamond, J. (1997). Guns, Germs, and Steel: The Fates of Human Societies. W. W. Norton & Company."
          },
          {
            id: "3",
            citation: "Zeder, M. A. (2008). Domestication and early agriculture in the Mediterranean Basin: Origins, diffusion, and impact. Proceedings of the National Academy of Sciences, 105(33), 11597-11604.",
            url: "https://doi.org/10.1073/pnas.0801317105"
          }
        ],
        relatedNodeId: "animal-herramienta"
      },
      {
        id: "infraestructura-romana",
        year: 100,
        yearLabel: "Siglo I d.C.",
        title: "El Imperio como Red Logística Animal",
        shortDesc: "El animal como tracción física pesada, transporte militar y espectáculo de masas.",
        longDesc: "El Imperio Romano codifica el uso animal a gran escala para sostener su infraestructura comercial y militar. Los équidos y camélidos sirven como la logística terrestre indispensable para la distribución y el correo estatal [1]. En paralelo, las fieras salvajes son capturadas sistemáticamente en los confines de las provincias para ser masacradas en anfiteatros (venationes), ejemplificando el uso lúdico y el dominio absoluto de Roma sobre el mundo natural [2].",
        scientificFacts: [
          "La logística militar romana dependía estrictamente del suministro de mulas y caballos para mover bagajes tácticos, consumiendo toneladas de grano vegetal [1].",
          "Durante la inauguración del Coliseo (80 d.C.), se registra la masacre de más de 9.000 animales en cien días de espectáculos circenses, acelerando la extinción local de leones del norte de África [2]."
        ],
        references: [
          {
            id: "1",
            citation: "Bulliet, R. W. (2005). Hunters, Herders, and Hamburgers: The Past and Future of Human-Animal Relationships. Columbia University Press."
          },
          {
            id: "2",
            citation: "Toynbee, J. M. C. (1973). Animals in Roman Life and Art. Cornell University Press."
          }
        ],
        relatedNodeId: "animal-herramienta"
      },
      {
        id: "traccion-medieval",
        year: 1050,
        yearLabel: "c. Año 1050",
        title: "La Revolución Agrícola Medieval",
        shortDesc: "El arado pesado y el collar de hombros multiplican la explotación de la tracción animal.",
        longDesc: "Durante la Plena Edad Media, la introducción del arado de vertedera pesado, la herradura de hierro y el collar rígido de hombros (collerón) revoluciona la agricultura europea [1]. Estos inventos mecánicos permiten que el caballo y el buey ejerzan una fuerza de tracción cinco veces superior sin ahogarse, convirtiendo al animal en el motor biológico fundamental que desbrozó los bosques templados y posibilitó la expansión demográfica de las ciudades feudales [2].",
        scientificFacts: [
          "El collerón medieval trasladó el punto de presión del cuello del caballo (que comprimía su tráquea) a sus hombros, permitiendo un tiro continuo de alta potencia [1].",
          "Este aumento de la eficiencia física requirió destinar extensos campos agrícolas a la siembra de avena para el ganado en lugar de cereales de consumo humano directo [2]."
        ],
        references: [
          {
            id: "1",
            citation: "White, L. (1962). Medieval Technology and Social Change. Oxford University Press."
          },
          {
            id: "2",
            citation: "Langdon, J. (1986). Horses, Oxen and Technological Innovation: The Use of Draught Animals in English Farming from 1066 to 1500. Cambridge University Press.",
            url: "https://doi.org/10.1017/CBO9780511522337"
          }
        ],
        relatedNodeId: "animal-herramienta"
      },
      {
        id: "chicago-stock-yards",
        year: 1865,
        yearLabel: "1865",
        title: "La Línea de Despiece de Chicago",
        shortDesc: "El nacimiento de la industrialización cárnica y la inspiración de la cadena de montaje moderna.",
        longDesc: "La apertura de los Union Stock Yards en Chicago (1865) marca el inicio de la cosificación industrial a gran escala [1]. Se diseñan gigantescas redes de ferrocarril, sistemas de refrigeración industrial y cadenas aéreas de despiece donde los animales son procesados mecánicamente a un ritmo frenético. Este sistema de despiece continuo (\"disassembly line\") inspiró directamente a Henry Ford para crear la línea de montaje automotriz [2].",
        scientificFacts: [
          "Chicago concentró por primera vez el sacrificio a gran escala mediante la división extrema del trabajo, procesando millones de reses y cerdos anualmente [1].",
          "La introducción de vagones refrigerados permitió centralizar la matanza en el medio oeste y distribuir carne procesada a largas distancias, desvinculando físicamente al consumidor de la muerte del animal [2]."
        ],
        references: [
          {
            id: "1",
            citation: "Cronon, W. (1991). Nature's Metropolis: Chicago and the Great West. W. W. Norton & Company."
          },
          {
            id: "2",
            citation: "Ford, H. (1922). My Life and Work. Garden City Publishing Co."
          }
        ],
        relatedNodeId: "domesticacion-industrial"
      },
      {
        id: "macrogranjas-mediados-siglo",
        year: 1950,
        yearLabel: "Década de 1950",
        title: "El Auge de la Ganadería Industrial Intensiva",
        shortDesc: "La reclusión del animal en espacios confinados controlados químicamente.",
        longDesc: "Tras la Segunda Guerra Mundial, la ganadería sufre una mutación química y mecánica: los animales son retirados de las dehesas y praderas para ser recluidos de por vida en macrogranjas confinadas de alta densidad [1]. Gracias al descubrimiento científico del uso de antibióticos como promotores del crecimiento y de la vitamina D sintética, es viable criarlos hacinados bajo luz artificial permanente, priorizando exclusivamente el índice de conversión de pienso a carne [2].",
        scientificFacts: [
          "El hacinamiento extremo impidió el desarrollo de comportamientos biológicos naturales, forzando cortes preventivos de rabos y despicados sin anestesia para evitar el canibalismo por estrés [2].",
          "La ganadería intensiva pasa a consumir más del 70% de la producción global de antibióticos, acelerando de forma crítica la resistencia bacteriana del planeta [3]."
        ],
        references: [
          {
            id: "1",
            citation: "Harrison, R. (1964). Animal Machines: The New Factory Farming Industry. Vincent Stuart Publishers."
          },
          {
            id: "2",
            citation: "Webster, J. (2008). Animal Welfare: Limiting Pain and Suffering. Wiley-Blackwell."
          },
          {
            id: "3",
            citation: "Landrigan, P. J., et al. (2018). The Lancet Commission on Pollution and Health. The Lancet, 391(10119), 462-512.",
            url: "https://doi.org/10.1016/S0140-6736(17)32345-0"
          }
        ],
        relatedNodeId: "domesticacion-industrial"
      },
      {
        id: "agricultura-celular-era",
        year: 2013,
        yearLabel: "2013-Presente",
        title: "La Era de la Agricultura Celular",
        shortDesc: "La desvinculación biotecnológica: producir carne y lácteos directamente sin criar seres sintientes.",
        longDesc: "En 2013, el profesor Mark Post presenta públicamente la primera hamburguesa de ternera cultivada in vitro a partir de células madre musculares cosechadas de forma indolora [1]. Esto inicia una revolución biotecnológica global enfocada en sustituir la ganadería tradicional por agricultura celular y fermentación de precisión, eliminando el coste termodinámico del mantenimiento metabólico animal y erradicando el sufrimiento en mataderos [2].",
        scientificFacts: [
          "La carne cultivada in vitro reduce potencialmente el consumo de espacio de tierra en un 90% y la emisión de gases de efecto invernadero en más del 80% en comparación con la carne de rumiante convencional [2].",
          "La fermentación de precisión de microorganismos permite fabricar proteínas lácteas (caseína, suero) idénticas sin la ineficiencia de la preñez y ordeño bovino [1]."
        ],
        references: [
          {
            id: "1",
            citation: "Post, M. J. (2012). Cultured meat from stem cells: Challenges and prospects. Meat Science, 92(3), 297-301.",
            url: "https://doi.org/10.1016/j.meatsci.2012.04.008"
          },
          {
            id: "2",
            citation: "Tuomisto, H. L., & de Mattos, M. J. (2011). Environmental impacts of cultured meat production. Environmental Science & Technology, 45(14), 6117-6123.",
            url: "https://doi.org/10.1021/es200130u"
          }
        ],
        relatedNodeId: "suplementacion-progreso"
      }
    ]
  },
  {
    id: "etica",
    title: "Ética, Filosofía y Consciencia",
    description: "La evolución intelectual del debate moral sobre los animales: desde los cuestionamientos místicos de la antigüedad hasta la demostración empírica de su consciencia neurobiológica.",
    color: "purple",
    milestones: [
      {
        id: "pitagoras-plutarco",
        year: -500,
        yearLabel: "c. 500 a.C.",
        title: "La Compasión de la Escuela Pitagórica",
        shortDesc: "Primeros cuestionamientos a la matanza animal basados en la metempsicosis y la coherencia moral.",
        longDesc: "En la Antigua Grecia, Pitágoras y sus seguidores abogan por una dieta estrictamente libre de carne (entonces llamada 'dieta pitagórica') [1]. Apoyándose en la metempsicosis (transmigración de las almas), sostienen que dañar a un animal sintiente violenta la hermandad universal de los seres vivos [2]. Siglos después, Plutarco escribe 'Sobre el comer carne', el primer gran manifiesto ético-vegetariano de la historia europea, argumentando que el consumo de carne embrutece el espíritu humano [2].",
        scientificFacts: [
          "La dieta pitagórica y la abstinencia de carnes se consideraban prácticas espirituales de consistencia lógica y moral frente a los cruentos sacrificios religiosos helenos [1].",
          "Plutarco introdujo el argumento de la innecesariedad fáctica: el ser humano dispone de abundancia de frutos y legumbres para sobrevivir dignamente sin infligir derramamiento de sangre [2]."
        ],
        references: [
          {
            id: "1",
            citation: "Sorabji, R. (1993). Animal Minds and Human Morals: The Origins of the Western Debate. Cornell University Press."
          },
          {
            id: "2",
            citation: "Plutarco. (c. 100 d.C.). Moralia: De esu carnium (Sobre el comer carne)."
          }
        ],
        relatedNodeId: "axiomas-morales"
      },
      {
        id: "cartesianismo-maquina",
        year: 1637,
        yearLabel: "1637",
        title: "El Autómata Cartesiano",
        shortDesc: "René Descartes y la teoría de los animales como máquinas biológicas sin alma ni consciencia.",
        longDesc: "En su 'Discurso del método', René Descartes establece el dualismo mente-cuerpo, definiendo a los animales no humanos como autómatas biológicos desprovistos de alma (\"res cogitans\") [1]. Según esta hipótesis, al carecer de lenguaje verbal reflexivo y razón abstracta, sus chillidos de dolor no expresan sufrimiento consciente subjetivo, sino simples reacciones físicas de engranajes que se tensan [2]. Esta teoría sirvió históricamente para inmunizar moralmente las vivisecciones y abusos masivos [2].",
        scientificFacts: [
          "El cartesianismo justificó la experimentación fisiológica invasiva sin analgesia al sostener que un perro gime del mismo modo que un reloj da las horas mecánicamente [2].",
          "La noción cartesiana de que el lenguaje proposicional complejo es prerrequisito para la sintiencia ha sido desmentida por completo por la neurobiología evolutiva del tronco del encéfalo [1]."
        ],
        references: [
          {
            id: "1",
            citation: "Descartes, R. (1637). Discurso del método (Parte V)."
          },
          {
            id: "2",
            citation: "Harrison, P. (1992). Descartes on animals. Philosophical Quarterly, 42(167), 219-227.",
            url: "https://doi.org/10.2307/2220217"
          }
        ],
        relatedNodeId: "el-argumento-del-antropocentrismo-cartesiano"
      },
      {
        id: "bentham-sufrimiento",
        year: 1789,
        yearLabel: "1789",
        title: "La Nocicepción como Línea Moral",
        shortDesc: "Jeremy Bentham sitúa la capacidad de sufrir, y no la razón, como el criterio fundamental de consideración ética.",
        longDesc: "En 'Introducción a los principios de la moral y la legislación', el filósofo utilitarista Jeremy Bentham desafía la exclusión de los animales del círculo de la justicia [1]. En una famosa nota a pie de página, escribe que un caballo o un perro adulto es incomparablemente más racional y comunicativo que un lactante humano de un día. Sentencia: 'La cuestión no es ¿pueden razonar?, ni ¿pueden hablar?, sino ¿pueden sufrir?' [1]. Este cambio de paradigma independiza la moralidad del intelecto [2].",
        scientificFacts: [
          "Bentham anticipó que un día el estatus biológico de la sintiencia animal sería reconocido legalmente del mismo modo que la etnicidad de los esclavos africanos [1].",
          "La formulación de Bentham sentó las bases lógicas de los primeros proyectos de ley parlamentarios contra el maltrato animal en Europa [2]."
        ],
        references: [
          {
            id: "1",
            citation: "Bentham, J. (1789). An Introduction to the Principles of Morals and Legislation. T. Payne and Son."
          },
          {
            id: "2",
            citation: "Singer, P. (2011). Practical Ethics (3rd ed.). Cambridge University Press."
          }
        ],
        relatedNodeId: "axiomas-morales"
      },
      {
        id: "singer-regan-auge",
        year: 1975,
        yearLabel: "1975-1983",
        title: "Liberación Animal y Deontología de Derechos",
        shortDesc: "La deconstrucción contemporánea del especismo y los 'sujetos-de-una-vida'.",
        longDesc: "El debate bioético animal explota con la publicación de 'Liberación Animal' de Peter Singer (1975) [1] y 'El caso de los derechos de los animales' de Tom Regan (1983) [2]. Singer deconstruye el 'especismo' como un prejuicio ético arbitrario equivalente al racismo, basándose en la igual consideración de intereses. Regan, desde una vía deontológica, argumenta que los mamíferos son 'sujetos-de-una-vida' con valor intrínseco, lo que prohíbe tratarlos como meras mercancías dietéticas [2].",
        scientificFacts: [
          "Singer expuso científicamente que el modelo alimentario intensivo inflige un volumen masivo de sufrimiento crónico para satisfacer fines gastronómicos efímeros no vitales [1].",
          "Regan demostró lógicamente que si a los humanos con discapacidades cognitivas severas les garantizamos plenos derechos morales y no los usamos en laboratorios, la consistencia ética obliga a hacer lo mismo con animales equivalentes en complejidad neural [2]."
        ],
        references: [
          {
            id: "1",
            citation: "Singer, P. (1975). Animal Liberation: A New Ethics. HarperCollins."
          },
          {
            id: "2",
            citation: "Regan, T. (1983). The Case for Animal Rights. University of California Press."
          }
        ],
        relatedNodeId: "utilitarismo-singer"
      },
      {
        id: "declaracion-cambridge",
        year: 2012,
        yearLabel: "2012",
        title: "La Declaración de Cambridge sobre la Consciencia",
        shortDesc: "El consenso neurobiológico formal de que los animales no humanos son seres conscientes.",
        longDesc: "El 7 de julio de 2012, un panel internacional de destacados neurocientíficos firma en la Universidad de Cambridge la Declaración sobre la Consciencia en presencia de Stephen Hawking [1]. El manifiesto certifica que los animales no humanos (incluyendo todos los vertebrados y moluscos cefalópodos) poseen las estructuras anatómicas, neuroquímicas y neurofisiológicas requeridas para albergar consciencia reflexiva y experiencia subjetiva [2].",
        scientificFacts: [
          "La declaración afirma que la ausencia de neocórtex no impide que un organismo experimente estados emocionales conscientes, ya que las estructuras subcorticales homólogas controlan estas sensaciones [1].",
          "Los cefalópodos (como pulpos y calamares) muestran complejos circuitos neuronales y una sofisticada autoconsciencia a pesar de carecer de una morfología cerebral similar a los vertebrados [2]."
        ],
        references: [
          {
            id: "1",
            citation: "Low, P., Panksepp, J., Reiss, D., Edelman, D., Van Swinderen, B., & Koch, C. (2012). The Cambridge Declaration on Consciousness. Churchill College, University of Cambridge.",
            url: "https://fcmconference.org/img/CambridgeDeclarationOnConsciousness.pdf"
          },
          {
            id: "2",
            citation: "Birch, J., et al. (2021). Review of the Evidence of Sentience in Cephalopod Molluscs and Decapod Crustaceans. LSE Consulting.",
            url: "https://www.lse.ac.uk/News/News-Assets/PDFs/2021/Sentience-Review.pdf"
          }
        ],
        relatedNodeId: "dolor-fisico"
      },
      {
        id: "declaracion-montreal",
        year: 2022,
        yearLabel: "2022",
        title: "La Declaración de Montreal sobre la Explotación",
        shortDesc: "Cientos de filósofos exigen el cese legal de toda instrumentalización animal en base a la sintiencia.",
        longDesc: "En 2022, más de 500 filósofos y académicos internacionales firman la Declaración de Montreal sobre la Explotación Animal [1]. El documento va un paso más allá de la ciencia de la consciencia: establece que dado que los animales sufren y sus vidas les importan, es éticamente indefendible continuar mercantilizándolos, confinándolos y matándolos para fines gastronómicos triviales. Exigen reformas jurídicas abolicionistas globales [2].",
        scientificFacts: [
          "El manifiesto destaca que la ganadería representa la mayor explotación sistemática de seres conscientes de la historia terrestre, afectando a más de 80.000 millones de mamíferos y aves al año [1].",
          "La declaración condena la disonancia social que tolera la macrogranja a pesar de existir alternativas nutricionales vegetales seguras y completas [2]."
        ],
        references: [
          {
            id: "1",
            citation: "Declaration of Montreal on Animal Exploitation. (2022). Signed by over 500 ethicists and researchers worldwide.",
            url: "https://www.declaration-montreal-animal-exploitation.org/"
          },
          {
            id: "2",
            citation: "Nussbaum, M. C. (2023). Justice for Animals: Our Collective Responsibility. Simon & Schuster."
          }
        ],
        relatedNodeId: "enfoque-capacidades-nussbaum"
      }
    ]
  },
  {
    id: "regulaciones",
    title: "Regulaciones y Leyes",
    description: "Los hitos legislativos mundiales que han ido restringiendo la propiedad absoluta del animal para reconocerlos formalmente en los códigos civiles de los Estados.",
    color: "emerald",
    milestones: [
      {
        id: "martins-act",
        year: 1822,
        yearLabel: "1822",
        title: "La Ley de Martin (Reino Unido)",
        shortDesc: "La primera ley moderna del mundo que castiga penalmente el maltrato animal doméstico.",
        longDesc: "En 1822, el parlamentario irlandés Richard Martin logra la aprobación en el Parlamento británico de la 'Cruel Treatment of Cattle Act' (conocida como Martin's Act) [1]. Es el primer estatuto legislativo estatal del mundo que prohíbe castigar y abusar de forma arbitraria de vacas, bueyes y caballos domésticos. Aunque solo cubría ganado de tracción y propiedad ajena, sentó el precedente histórico de la intervención de la ley penal en el trato de animales [2].",
        scientificFacts: [
          "Martin demostró un firme compromiso ético al llevar físicamente a un burro maltratado ante el tribunal de justicia para mostrar al juez sus lesiones físicas evidentes [1].",
          "La ley condujo de inmediato a la fundación de la SPCA (Society for the Prevention of Cruelty to Animals) en 1824, la primera organización de bienestar del mundo [2]."
        ],
        references: [
          {
            id: "1",
            citation: "Martin, R. (1822). Cruel Treatment of Cattle Act. UK Parliament."
          },
          {
            id: "2",
            citation: "Ryder, R. D. (2000). Animal Revolution: Changing Attitudes towards Speciesism. Berg Publishers."
          }
        ],
        relatedNodeId: "el-brambell-report"
      },
      {
        id: "informe-brambell-ley",
        year: 1965,
        yearLabel: "1965",
        title: "El Informe Brambell",
        shortDesc: "El origen científico del bienestarismo moderno y la definición de las 'Cinco Libertades'.",
        longDesc: "Tras la alarma social generada por el libro 'Animal Machines' sobre la cría intensiva [1], el gobierno del Reino Unido encarga un comité de investigación científica liderado por el catedrático Rogers Brambell. El documento resultante, publicado en 1965, redefine las obligaciones éticas al acuñar las 'Cinco Libertades' fundacionales del bienestarismo: ausencia de hambre, dolor, miedo, incomodidad física y la libertad de manifestar su conducta natural [2].",
        scientificFacts: [
          "El informe Brambell supuso la primera vez que un gobierno oficialmente reconoció que los animales de granja padecen aburrimiento, frustración y estrés crónico en aislamiento [1].",
          "Estableció que las jaulas de batería de gallinas y los cajones de terneros lactantes eran inaceptables ya que impedían físicamente a los animales darse la vuelta u asearse [2]."
        ],
        references: [
          {
            id: "1",
            citation: "Brambell Committee. (1965). Report of the Technical Committee to Enquire into the Welfare of Animals Kept under Intensive Livestock Husbandry Systems. HM Stationery Office."
          },
          {
            id: "2",
            citation: "Mellor, D. J. (2016). Moving beyond the Five Freedoms: Positive welfare states. Animals, 6(3), 21.",
            url: "https://doi.org/10.3390/ani6030021"
          }
        ],
        relatedNodeId: "el-brambell-report"
      },
      {
        id: "tratado-lisboa",
        year: 2009,
        yearLabel: "2009",
        title: "El Tratado de Lisboa (Unión Europea)",
        shortDesc: "La legislación europea declara formalmente a los animales como 'seres sintientes'.",
        longDesc: "Con la entrada en vigor del Tratado de Lisboa de la Unión Europea el 1 de diciembre de 2009, se añade el histórico **Artículo 13** en el Tratado de Funcionamiento de la UE [1]. Por primera vez en el derecho constitucional multinacional, se decreta que las políticas agrícolas, pesqueras y de transporte deben tener plenamente en cuenta el bienestar de los animales, reconociéndolos expresamente como 'seres sintientes' y no meros objetos agrícolas comerciales [2].",
        scientificFacts: [
          "El Artículo 13 sentó la base jurídica comunitaria para restringir la experimentación cosmética animal y prohibir de forma gradual las jaulas de batería convencionales [1].",
          "A pesar del avance, el Tratado incluíu excepciones para proteger 'ritos religiosos, tradiciones culturales y patrimonios regionales' (como las corridas de toros), reflejando las tensiones de consistencia moral [2]."
        ],
        references: [
          {
            id: "1",
            citation: "European Union. (2007). Treaty of Lisbon Amending the Treaty on European Union. Official Journal of the European Union, C 306.",
            url: "https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:12007L/TXT"
          },
          {
            id: "2",
            citation: "Radford, M. (2001). Animal Welfare Law in Britain: Regulation and Responsibility. Oxford University Press."
          }
        ],
        relatedNodeId: "el-argumento-del-contrato-social"
      },
      {
        id: "reforma-codigo-civil-es",
        year: 2021,
        yearLabel: "2021-2023",
        title: "La Reforma del Código Civil en España",
        shortDesc: "Los animales dejan de ser legalmente 'cosas' u 'objetos' en el ordenamiento español.",
        longDesc: "En diciembre de 2021, el Congreso de los Diputados español aprueba la Ley 17/2021, reformando el Código Civil, la Ley Hipotecaria y la Ley de Enjuiciamiento Civil [1]. La norma suprime de raíz el estatus arcaico de los animales como 'bienes semovientes' (cosas u objetos muebles de mercado) para definirlos formalmente como 'seres sintientes dotados de sensibilidad física y psíquica'. Esto prohíbe embargarlos en deudas, abandonarlos en herencias o maltratarlos en rupturas matrimoniales [2].",
        scientificFacts: [
          "La reforma adapta el derecho civil español a las exigencias neurobiológicas, obligando a los jueces a dictaminar custodias de mascotas en función del bienestar psicológico del animal en divorcios [1].",
          "Esta ley precedió a la Ley de Protección de los Derechos y el Bienestar de los Animales aprobada en 2023, la cual amplió drásticamente las sanciones por maltrato y abandono [2]."
        ],
        references: [
          {
            id: "1",
            citation: "Jefatura del Estado. (2021). Ley 17/2021, de 15 de diciembre, de modificación del Código Civil. Boletín Oficial del Estado, 300.",
            url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2021-20727"
          },
          {
            id: "2",
            citation: "Francione, G. L. (1995). Animals, Property, and the Law. Temple University Press."
          }
        ],
        relatedNodeId: "el-argumento-del-contrato-social"
      },
      {
        id: "end-the-cage-age-initiative",
        year: 2020,
        yearLabel: "2020-Presente",
        title: "La Iniciativa 'End the Cage Age'",
        shortDesc: "Movilización de la ciudadanía europea para prohibir por ley toda cría en jaulas de ganado.",
        longDesc: "La Iniciativa Ciudadana Europea 'End the Cage Age' recoge más de 1,4 millones de firmas verificadas, exigiendo a la Comisión Europea prohibir por completo el confinamiento en jaulas de gallinas ponedoras, cerdas reproductoras, conejos, terneros y codornices en toda la Unión [1]. En 2021, la Comisión se comprometió legislativamente a redactar una propuesta para erradicar las jaulas de forma paulatina, representando un hito de movilización social directa contra las peores prácticas del bienestarismo industrial [2].",
        scientificFacts: [
          "La iniciativa prohíbe el uso de jaulas de parto para cerdas, donde la madre permanece inmovilizada sin poder girarse sobre sí misma durante semanas, provocándole llagas e infecciones por confinamiento [1].",
          "La ciencia del comportamiento animal demuestra que erradicar las jaulas reduce de forma inmediata los indicadores de cortisol y estereotipias anómalas en aves de granja [2]."
        ],
        references: [
          {
            id: "1",
            citation: "European Citizens' Initiative. (2020). End the Cage Age. European Commission Official Registry.",
            url: "https://citizens-initiative.europa.eu/initiatives/details/2018/000004_en"
          },
          {
            id: "2",
            citation: "Grandin, T. (2015). Improving Animal Welfare: A Practical Approach. CABI."
          }
        ],
        relatedNodeId: "el-argumento-del-bienestarismo-industrial"
      }
    ]
  },
  {
    id: "alimentacion",
    title: "Alimentación y Evolución",
    description: "La relación biológica y alimentaria con la carne: del rol metabólico de la grasa y cocinado en la hominización primitiva a la síntesis biotecnológica de vitamina B12 en laboratorios.",
    color: "amber",
    milestones: [
      {
        id: "encefalizacion-pleistoceno",
        year: -2000000,
        yearLabel: "c. 2.000.000 a.C.",
        title: "La Hipótesis del Tejido Costoso",
        shortDesc: "El rol evolutivo de la grasa y carne animal cocinada en la expansión de la capacidad cerebral homínida.",
        longDesc: "Durante el Pleistoceno, los antepasados del Homo sapiens (como el Homo erectus) incorporan a su dieta médula ósea y carne de carroña, ricas en grasas y proteínas densas [1]. El descubrimiento del control del fuego permite cocinar estos alimentos, lo que reduce sustancialmente el coste metabólico de la digestión intestinal. La energía metabólica ahorrada en un tracto digestivo encogido se destina evolutivamente a expandir el cerebro (hipertrofia metabólica) [2].",
        scientificFacts: [
          "La morfología de los homínidos evolucionó hacia un colon corto y un intestino delgado largo, característico de omnívoros adaptados a absorber nutrientes concentrados con poco esfuerzo celular [2].",
          "El consumo de carne fue una inercia adaptativa e indispensable de supervivencia biológica estricta en entornos de glaciaciones y escasez constante de hidratos de carbono vegetales complejos [1]."
        ],
        references: [
          {
            id: "1",
            citation: "Aiello, L. C., & Wheeler, P. (1995). The expensive-tissue hypothesis: the brain and the digestive system in human and primate evolution. Current Anthropology, 36(2), 199-221.",
            url: "https://doi.org/10.1086/204350"
          },
          {
            id: "2",
            citation: "Wrangham, R. (2009). Catching Fire: How Cooking Made Us Human. Basic Books."
          }
        ],
        relatedNodeId: "evolucion-dieta"
      },
      {
        id: "mutacion-lactasa",
        year: -10000,
        yearLabel: "c. 10.000 a.C.",
        title: "La Mutación de la Persistencia de la Lactasa",
        shortDesc: "La coevolución biológica: la capacidad genética de digerir la leche animal en la adultez humana.",
        longDesc: "Coincidiendo con la domesticación del ganado en el Neolítico, surge en poblaciones de Europa del norte y África oriental una mutación genética extraordinaria: la persistencia de la lactasa [1]. En los mamíferos salvajes, el gen que produce la enzima lactasa se apaga tras el destete. Sin embargo, la dependencia calórica humana de la leche animal generó una fortísima presión selectiva que favoreció a los individuos capaces de digerir lactosa de por vida [2].",
        scientificFacts: [
          "La persistencia de la lactasa es uno de los ejemplos más claros de coevolución gen-cultura en la especie humana reciente [1].",
          "En la actualidad, más del 65% de la población mundial adulta retiene el rasgo silvestre original y es biológicamente intolerante a la lactosa, evidenciando que no es una adaptación universal de la especie [2]."
        ],
        references: [
          {
            id: "1",
            citation: "Simoons, F. J. (1970). Primary adult lactose intolerance and the milking habit: A problem in biologic and cultural evolution. American Journal of Digestive Diseases, 15(8), 695-710.",
            url: "https://doi.org/10.1007/BF02236021"
          },
          {
            id: "2",
            citation: "Gerbault, P., et al. (2011). How evolution shaped the patterns of lactase persistence in humans. Philosophical Transactions of the Royal Society B, 366(1566), 863-877.",
            url: "https://doi.org/10.1098/rstb.2010.0268"
          }
        ],
        relatedNodeId: "evolucion-dieta"
      },
      {
        id: "watson-veganismo-origen",
        year: 1944,
        yearLabel: "1944",
        title: "La Fundación de la Vegan Society",
        shortDesc: "Donald Watson acuña el término 'veganismo' para proponer una alimentación libre de toda explotación animal.",
        longDesc: "En noviembre de 1944, el carpintero británico Donald Watson y un pequeño grupo de objetores vegetarianos se reúnen en Leicester para fundar la Vegan Society [1]. Deciden acuñar el término 've-gan' (usando las tres primeras y las dos últimas letras de 'vegetarian') para marcar la emancipación moral definitiva de los animales domésticos, eliminando no solo la carne sino también los huevos y la leche, al comprender que la industria láctea está intrínsecamente ligada al matadero [2].",
        scientificFacts: [
          "El término se definió formalmente como la doctrina que sostiene que el ser humano debe vivir sin explotar a los animales, promoviendo alternativas exentas de crueldad [1].",
          "En ese momento histórico, los fundadores carecían de conocimientos científicos sobre la vitamina B12, lo que provocó que los primeros veganos estrictos sufrieran anemia megaloblástica y problemas neurológicos [2]."
        ],
        references: [
          {
            id: "1",
            citation: "Watson, D. (1944). The Vegan News: Quarterley Organ of the Non-Dairy Vegetarians, 1(1)."
          },
          {
            id: "2",
            citation: "Vegan Society. (2020). History of the Vegan Society: Looking back at over 75 years."
          }
        ],
        relatedNodeId: "suplementacion-progreso"
      },
      {
        id: "sintesis-b12",
        year: 1948,
        yearLabel: "1948",
        title: "El Aislamiento de la Vitamina B12",
        shortDesc: "El hito biotecnológico que rompió el lazo biológico fáctico de la necesidad de comer animales.",
        longDesc: "En 1948, la investigadora Mary Shorb en EE.UU. y Karl Folkers en Merck logруют de forma simultánea aislar la vitamina B12 (cobalamina), el único nutriente esencial indetectable en el reino vegetal [1]. Con la subsiguiente patente de producción industrial por fermentación microbiana de bacterias no animales, el Homo sapiens rompe por primera vez en su historia evolutiva el determinismo biológico: la ingesta de carne ya no es indispensable para evitar el daño neurológico [2].",
        scientificFacts: [
          "La B12 no procede del metabolismo del ganado, sino de bacterias del suelo ingeridas con el agua sucia; debido a la desinfección moderna y pesticidas, al ganado industrial se le suplementa sistemáticamente con B12 microbiana sintética de laboratorio [2].",
          "La síntesis química de B12 permitió la expansión masiva y segura del veganismo y vegetarianismo en el último tercio del siglo XX [1]."
        ],
        references: [
          {
            id: "1",
            citation: "Rickes, E. L., Brink, N. G., Koniuszy, F. R., Wood, T. R., & Folkers, K. (1948). Crystalline vitamin B12. Science, 107(2781), 396-397.",
            url: "https://doi.org/10.1126/science.107.2781.396"
          },
          {
            id: "2",
            citation: "Watanabe, F. (2007). Vitamin B12 sources and bioavailability. Experimental Biology and Medicine, 232(10), 1266-1274.",
            url: "https://doi.org/10.3181/0703-MR-67"
          }
        ],
        relatedNodeId: "suplementacion-progreso"
      },
      {
        id: "consenso-nutricional-and",
        year: 2016,
        yearLabel: "2016",
        title: "La Validación Nutricional Global",
        shortDesc: "La Academia de Nutrición y Dietética ratifica la idoneidad de la dieta vegana bien planificada.",
        longDesc: "En 2016, la Academy of Nutrition and Dietetics de EE.UU. (la organización de nutricionistas y dietistas más grande del mundo) emite su informe de posición oficial actualizado [1]. Ratifica con rotundidad científica que las dietas vegetarianas y veganas adecuadamente planificadas son completamente saludables, nutricionalmente adecuadas y proporcionan beneficios en la prevención y tratamiento de enfermedades crónicas durante todas las etapas de la vida [2].",
        scientificFacts: [
          "El consenso nutricional abarca lactancia, infancia extrema, adolescencia, vejez, embarazo y rendimiento deportivo de élite sin restricciones de aminoácidos [1].",
          "Estudios clínicos confirman que las dietas basadas en plantas directas reducen significativamente el riesgo de diabetes tipo II, cardiopatías isquémicas y tasas globales de cáncer colorrectal [2]."
        ],
        references: [
          {
            id: "1",
            citation: "Melina, V., Craig, W., & Levin, S. (2016). Position of the Academy of Nutrition and Dietetics: Vegetarian Diets. Journal of the Academy of Nutrition and Dietetics, 116(12), 1970-1980.",
            url: "https://doi.org/10.1016/j.jand.2016.09.025"
          },
          {
            id: "2",
            citation: "Springmann, M., et al. (2016). Analysis and valuation of the health and climate change co-benefits of dietary change. Proceedings of the National Academy of Sciences, 113(15), 4146-4151."
          }
        ],
        relatedNodeId: "evolucion-dieta"
      }
    ]
  }
];
