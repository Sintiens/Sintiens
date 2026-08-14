import type { NodeDetail } from "../types";

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
      , url: "https://nyudeclaration.org/"}
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
      , url: "https://www.google.com/books/edition/Do_Fish_Feel_Pain"}
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
      , url: "https://doi.org/10.1016/j.anbehav.2015.03.014"},
      {
        id: "2",
        citation: "Weary, D. M., & Chua, B. (2000). Effects of early separation on the dairy cow and calf. Applied Animal Behaviour Science, 69(3), 177-188."
      , url: "https://doi.org/10.1016/S0168-1591(00)00137-2"}
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
      , url: "https://es.wikipedia.org/wiki/Discurso_del_m%C3%A9todo"},
      {
        id: "2",
        citation: "Bentham, J. (1789). An Introduction to the Principles of Morals and Legislation. T. Payne and Son."
      , url: "https://en.wikipedia.org/wiki/An_Introduction_to_the_Principles_of_Morals_and_Legislation"}
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
      , url: "https://en.wikipedia.org/wiki/Speciesism"},
      {
        id: "2",
        citation: "Singer, P. (1975). Animal Liberation: A New Ethics. HarperCollins."
      , url: "https://en.wikipedia.org/wiki/Animal_Liberation_(book)"}
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
      , url: "https://www.google.com/books/edition/Rain_Without_Thunder"},
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
      , url: "https://doi.org/10.1016/j.appet.2010.05.043"},
      {
        id: "2",
        citation: "Joy, M. (2010). Why We Love Dogs, Eat Pigs, and Wear Cows: An Introduction to Carnism. Conari Press."
      , url: "https://en.wikipedia.org/wiki/Carnism"}
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
      , url: "https://en.wikipedia.org/wiki/The_Sexual_Politics_of_Meat"},
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
      , url: "https://www.google.com/books/edition/Introduction_to_Animal_Rights"},
      {
        id: "2",
        citation: "Bastian, B., & Loughnan, S. (2017). Resolving the Meat-Paradox: A Motivational Account of Moral Disengagement. Personality and Social Psychology Review, 21(3), 278-299."
      , url: "https://doi.org/10.1177/0146167217709240"}
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
      , url: "https://en.wikipedia.org/wiki/J._C._Scott"},
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
      , url: "https://en.wikipedia.org/wiki/Animal_Machines"},
      {
        id: "2",
        citation: "Mood, A., & Brooke, P. (2010). Estimating the Number of Fish Caught in Global Fishing Each Year. Fishcount."
      , url: "https://www.fishcount.org.uk/fish-count-estimates-2012"}
    ]
  },
  {
    id: "otras-instrumentalizaciones",
    category: "sistemas_uso",
    title: "Otros Ejes de Instrumentalización",
    shortDesc: "La vivisección biomédica, vestimenta y la explotación como entretenimiento.",
    longDesc: "El antropocentrismo se ramifica más allá del plato. Institucionalmente, encerramos y experimentamos en millones de animales al año para investigación biomédica y cosmética (donde el limitado paradigma ético de las '3R' rara vez se cuestiona de fondo) [1]. Arrancamos la piel a visones, ovejas y vacas para confeccionar vestimenta [2]. Y en la cima de lo absurdo, financiamos zoológicos, tauromaquia y espectáculos que reducen la vida de un individuo cognitivamente brillante a un chiste o a una tragedia de entretenimiento temporal.",
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
      , url: "https://www.palgrave.com/gp/book/9780230241349"},
      {
        id: "2",
        citation: "Cudworth, E. (2011). Social Lives and Other Animals: The Sociology of Human-Animal Relations."
      , url: "https://www.google.com/books/edition/Social_Lives_and_Other_Animals"}
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
      , url: "https://doi.org/10.1073/pnas.1713820115"},
      {
        id: "2",
        citation: "Cassidy, E. S., West, P. C., Gerber, J. S., & Foley, J. A. (2013). Redefining agricultural yields: from tonnes to people fed per hectare. Environmental Research Letters, 8(3)."
      , url: "https://doi.org/10.1088/1748-9326/8/3/034015"}
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
    citation: "Poore, J., & Nemecek, T. (2018). Reducing food's environmental impacts.",
    references: [
      {
        id: "1",
        citation: "Poore, J., & Nemecek, T. (2018). Reducing food's environmental impacts through producers and consumers. Science, 360(6392), 987-992."
      , url: "https://doi.org/10.1126/science.aaq0216"},
      {
        id: "2",
        citation: "Mekonnen, M. M., & Hoekstra, A. Y. (2012). A Global Assessment of the Water Footprint of Farm Animal Products. Ecosystems, 15, 401-415."
      , url: "https://doi.org/10.1007/s10021-011-9517-8"}
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
      , url: "https://doi.org/10.1073/pnas.1711842115"},
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
      , url: "https://revistes.uab.cat/da"},
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
      , url: "https://www.google.com/books/edition/Foxes_in_the_Hen_House"},
      {
        id: "2",
        citation: "Pachirat, T. (2011). Every Twelve Seconds: Industrialized Slaughter and the Politics of Sight. Yale University Press."
      , url: "https://www.google.com/books/edition/Every_Twelve_Seconds"}
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
      , url: "https://doi.org/10.1021/es200130u"},
      {
        id: "2",
        citation: "Wise, S. M. (2000). Rattling the Cage: Toward Legal Rights for Animals. Perseus Books."
      , url: "https://www.google.com/books/edition/Rattling_the_Cage"}
    ]
  }
];