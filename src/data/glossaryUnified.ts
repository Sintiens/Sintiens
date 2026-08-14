import { ReferenceDetail } from "../types";

export type GlossaryType =
  | "concepto"
  | "autor"
  | "obra"
  | "declaracion"
  | "cita"
  | "tecnico";

export type GlossaryCategory =
  | "sintiencia"
  | "etica"
  | "psicologia"
  | "sistemas_uso"
  | "ecologia"
  | "legal";

export interface GlossaryAuthor {
  name: string;
  era?: string;
  works?: string[];
  portrait?: string;
}

export interface GlossaryEntry {
  id: string;
  term: string;
  altTerms?: string[];
  patterns: string[];
  type: GlossaryType;
  category: GlossaryCategory;
  shortDef: string;
  longDef?: string;
  keyFacts?: string[];
  openQuestion?: string;
  references?: ReferenceDetail[];
  relatedEntries?: string[];
  relatedNodes?: string[];
  relatedDilemmas?: string[];
  relatedActs?: string[];
  author?: GlossaryAuthor;
}

export const GLOSSARY_UNIFIED: GlossaryEntry[] = [
  // =====================================================================
  // I. SINTIENCIA Y NEUROBIOLOGÍA
  // =====================================================================
  {
    id: "sintiencia",
    term: "Sintiencia",
    patterns: ["sintiencia", "sintiente", "sintientes", "siente"],
    type: "concepto",
    category: "sintiencia",
    shortDef: "Capacidad de un ser vivo de sentir de forma consciente y en primera persona cosas buenas y malas (dolor, placer, alegría, estrés, aburrimiento). Más allá de reaccionar mecánicamente: hay un 'alguien' experimentando.",
    longDef: "La sintiencia es la capacidad de tener experiencias subjetivas. Significa que el animal no es un simple mecanismo biológico, sino que tiene una perspectiva propia del mundo. Un ser sintiente es capaz de experimentar sensaciones positivas (placer, apego, comodidad) y negativas (dolor, miedo, frustración). Es la base única de la consideración moral: no importan ni la inteligencia ni la especie, sino si hay alguien que sufre.",
    keyFacts: [
      "Distingue la capacidad de sentir de la mera vida biológica: una bacteria está viva, pero no por ello es alguien.",
      "Es el criterio moral fundacional: la pregunta no es '¿pueden razonar?' ni '¿pueden hablar?', sino '¿pueden sufrir?' (Bentham)."
    ],
    openQuestion: "¿Hasta dónde se extiende la frontera de la sintiencia en el reino animal?",
    references: [
      { id: "1", citation: "Bentham, J. (1789). An Introduction to the Principles of Morals and Legislation. T. Payne and Son." , url: "https://en.wikipedia.org/wiki/An_Introduction_to_the_Principles_of_Morals_and_Legislation"}
    ],
    relatedEntries: ["nocicepcion", "snc", "declaracion-cambridge", "declaracion-nueva-york", "bentham"],
    relatedNodes: ["neuroanatomia-consciencia", "neurobiologia-dolor", "etologia-cognitiva"],
    relatedDilemmas: ["plantas-sienten-dolor", "bivalvos-ostras", "r2-fetos-animales", "consenso-sintiencia-animal"],
    relatedActs: ["acto-1"]
  },
  {
    id: "snc",
    term: "Sistema Nervioso Central (SNC)",
    altTerms: ["SNC"],
    patterns: ["Sistema Nervioso Central", "SNC", "sistemas nerviosos centrales"],
    type: "tecnico",
    category: "sintiencia",
    shortDef: "Red central de vertebrados y animales complejos (cerebro, tronco encefálico, médula espinal) encargada de procesar las señales de dolor o placer y transformarlas en una experiencia subjetiva o mental.",
    relatedEntries: ["sintiencia", "nocicepcion", "cefalopodos", "declaracion-cambridge"],
    relatedNodes: ["neuroanatomia-consciencia", "neurobiologia-dolor"],
    relatedDilemmas: ["bivalvos-ostras", "comer-insectos-harinas"]
  },
  {
    id: "nocicepcion",
    term: "Nocicepción",
    patterns: ["nocicepción", "nociceptores", "nociceptivas", "nociceptivo", "nociceptivos"],
    type: "tecnico",
    category: "sintiencia",
    shortDef: "Capacidad puramente biológica y física de detectar un daño en los tejidos a través de receptores de alarma (nociceptores). Diferente al sufrimiento emocional consciente: las plantas tienen respuestas químicas de alarma pero no una traducción emocional del dolor.",
    longDef: "La nocicepción es un reflejo físico que ocurre en la médula espinal. El dolor, en cambio, es la experiencia consciente y subjetiva de sufrimiento procesada en el cerebro. Esta distinción es clave para desmontar el mito de que 'las plantas sienten dolor'.",
    relatedEntries: ["sintiencia", "snc", "frontera-vegetal-plantas", "dolor-vs-nocicepcion"],
    relatedNodes: ["neurobiologia-dolor"],
    relatedDilemmas: ["plantas-sienten-dolor", "bivalvos-ostras"]
  },
  {
    id: "cefalopodos",
    term: "Cefalópodos",
    patterns: ["cefalópodos", "cefalópodo", "cefalopodos", "cefalopodo"],
    type: "concepto",
    category: "sintiencia",
    shortDef: "Familia de moluscos marinos (pulpos, calamares, sepias) cuyo sistema nervioso evolucionó de forma totalmente distinta al de los vertebrados pero desarrolló consciencia, aprendizaje y resolución de problemas. Incluidos explícitamente en la Declaración de Cambridge (2012).",
    relatedEntries: ["sintiencia", "snc", "declaracion-cambridge", "declaracion-nueva-york"],
    relatedNodes: ["neuroanatomia-consciencia"],
    relatedDilemmas: ["bivalvos-ostras"]
  },
  {
    id: "etologia",
    term: "Etología",
    patterns: ["etología", "etologías", "etología cognitiva", "etólogo", "etólogos", "etóloga"],
    type: "concepto",
    category: "sintiencia",
    shortDef: "Rama de la biología que estudia el comportamiento animal en su contexto natural y su evolución. La 'etología cognitiva' moderna reveló que especies de granja como cerdos y vacas poseen memoria episódica, resolución de problemas, vínculos familiares y duelo, desmontando el mito del 'presente perpetuo' sin vida interior.",
    relatedEntries: ["frans-de-waal", "jennifer-ackerman"],
    relatedNodes: ["etologia-cognitiva"],
    relatedDilemmas: ["plantas-sienten-dolor"]
  },
  {
    id: "frontera-vegetal-plantas",
    term: "Frontera Vegetal",
    altTerms: ["Sensibilidad de las plantas"],
    patterns: ["plantas sienten", "sensibilidad de las plantas", "consciencia vegetal"],
    type: "concepto",
    category: "sintiencia",
    shortDef: "Límite biológico que separa la reacción bioquímica de las plantas (sin sistema nervioso) de la experiencia consciente del dolor animal. Las plantas liberan gases químicos de alarma pero carecen de nociceptores, cerebro y traducción emocional.",
    relatedEntries: ["nocicepcion", "sintiencia", "snc"],
    relatedDilemmas: ["plantas-sienten-dolor"]
  },

  // =====================================================================
  // II. FILOSOFÍA, ÉTICA Y MARCOS MORALES
  // =====================================================================
  {
    id: "especismo",
    term: "Especismo",
    patterns: ["especismo", "especista", "especistas", "Especismo"],
    type: "concepto",
    category: "etica",
    shortDef: "Discriminación moral hacia ciertos animales simplemente por no pertenecer a nuestra especie (antropocentrismo), o la distinción injustificada entre especies (proteger por ley a perros y gatos mientras se financia la matanza masiva de cerdos o vacas).",
    longDef: "Término acuñado en 1970 por el psicólogo Richard Ryder y popularizado por Peter Singer en 'Liberación Animal' (1975). Es un sesgo cognitivo y moral sistemático que discrimina a un individuo únicamente por no pertenecer a la especie humana. Se produce un conflicto injusto cuando sometemos los intereses fundamentales de los animales (vivir, no ser torturados) para satisfacer intereses periféricos humanos (placer gustativo, tradición).",
    keyFacts: [
      "Acuñado por Richard Ryder en 1970, popularizado por Singer en 'Liberación Animal' (1975).",
      "No implica tratar a todos igual (no tiene sentido dar derecho a voto a un perro), sino dar igual consideración a intereses similares, como evitar el dolor."
    ],
    openQuestion: "Si usar la inteligencia como barrera moral excluiría a humanos con discapacidad cognitiva, ¿no es la capacidad de sufrir el único criterio moral coherente?",
    references: [
      { id: "1", citation: "Ryder, R. D. (1970). Speciesism. (First coined in a printed leaflet)." , url: "https://en.wikipedia.org/wiki/Speciesism"},
      { id: "2", citation: "Singer, P. (1975). Animal Liberation: A New Ethics. HarperCollins." , url: "https://www.google.com/books/edition/Animal_Liberation/zb8nAQAAIAAJ"}
    ],
    relatedEntries: ["antropocentrismo", "falacia-naturalista", "casos-marginales", "singer", "ryder", "obra-liberacion-animal"],
    relatedNodes: ["especismo", "disonancia-placer", "recorrido-historico-estatus"],
    relatedDilemmas: ["leones-carne", "granja-feliz-ecologia", "el-argumento-del-contrato-social", "r2-tauromaquia-patrimonio"],
    relatedActs: ["acto-2"]
  },
  {
    id: "antropocentrismo",
    term: "Antropocentrismo",
    patterns: ["antropocentrismo", "antropocentrista", "antropocentristas", "antropocéntrico"],
    type: "concepto",
    category: "etica",
    shortDef: "Corriente que sitúa al ser humano como único centro e interés del universo, relegando al resto del ecosistema y a los animales a meros objetos para beneficio, diversión o alimentación humana.",
    relatedEntries: ["especismo", "mecanicismo-cartesiano", "descartes"],
    relatedNodes: ["especismo", "historia-dominacion"],
    relatedDilemmas: ["leones-carne", "el-argumento-del-contrato-social"]
  },
  {
    id: "utilitarismo",
    term: "Utilitarismo",
    patterns: ["utilitarismo", "utilitarista", "utilitaristas"],
    type: "concepto",
    category: "etica",
    shortDef: "Teoría filosófica que defiende que la acción moralmente correcta es aquella que maximiza la felicidad y el bienestar general reduciendo todo lo posible el sufrimiento de cualquier ser capaz de sentir, sin importar su nivel de inteligencia.",
    longDef: "El utilitarismo clásico de Jeremy Bentham revolucionó la ética al plantear que la verdadera pregunta no es '¿pueden razonar?' ni '¿pueden hablar?', sino '¿pueden sufrir?'. Este cambio de paradigma estableció la capacidad de sufrir como el único criterio moral válido. Su versión moderna aplicada a los animales fue desarrollada por Peter Singer.",
    relatedEntries: ["singer", "bentham", "deontologia", "bienestarismo", "abolicionismo"],
    relatedNodes: ["recorrido-historico-estatus"],
    relatedDilemmas: ["granja-feliz-ecologia", "conservacion-dehesas", "bivalvos-ostras", "bienestarismo-como-abolicionismo-fracaso"],
    relatedActs: ["acto-2"]
  },
  {
    id: "deontologia",
    term: "Deontología",
    patterns: ["deontología", "deontológica", "deontológicos"],
    type: "concepto",
    category: "etica",
    shortDef: "Teoría filosófica basada en que ciertos seres poseen derechos absolutos y un valor intrínseco inalienable que prohíbe usarlos éticamente como simples herramientas o mercancías, sin importar el supuesto beneficio para otros.",
    relatedEntries: ["utilitarismo", "abolicionismo", "sujeto-de-una-vida", "regan", "derechos-animales"],
    relatedNodes: ["recorrido-historico-estatus", "estatus-juridico"],
    relatedDilemmas: ["granja-feliz-ecologia", "conservacion-dehesas", "bienestarismo-como-abolicionismo-fracaso"]
  },
  {
    id: "bienestarismo",
    term: "Bienestarismo",
    patterns: ["bienestarismo", "bienestarista", "bienestaristas"],
    type: "concepto",
    category: "etica",
    shortDef: "Postura ética reformista que acepta el uso de animales por los humanos pero exige reducir su sufrimiento (jaulas más grandes, transporte menos cruel, aturdimiento previo al sacrificio). Sus críticos abolicionistas argumentan que perpetúa el sistema al aceptar su marco.",
    relatedEntries: ["abolicionismo", "utilitarismo", "cinco-libertades", "aturdimiento", "ganaderia-industrial"],
    relatedNodes: ["marcos-eticos", "legislacion-bienestar"],
    relatedDilemmas: ["granja-feliz-ecologia", "el-mito-de-la-carne-humanitaria", "r2-mascotas-carnivoras", "bienestarismo-como-abolicionismo-fracaso"]
  },
  {
    id: "abolicionismo",
    term: "Abolicionismo",
    patterns: ["abolicionismo", "abolicionista", "abolicionistas", "Abolicionismo"],
    type: "concepto",
    category: "etica",
    shortDef: "Corriente ética, defendida por Tom Regan y Gary Francione, que sostiene que los animales sintientes son 'fines en sí mismos' y no pueden ser tratados legalmente como propiedad o mercancía. Rechaza las reformas bienestaristas y propone el cese del uso animal como único camino moralmente coherente.",
    longDef: "Análoga a la abolición de la esclavitud humana, defiende que los animales tienen derechos morales inviolables y no deben ser tratados como propiedades. Tom Regan ('En defensa de los derechos de los animales') y Gary Francione son sus principales teóricos.",
    keyFacts: [
      "Tom Regan: los animales son 'sujetos-de-una-vida' con valor inherente.",
      "Gary Francione: rechaza el bienestarismo como placebo que perpetúa la explotación."
    ],
    references: [
      { id: "1", citation: "Regan, T. (1983). The Case for Animal Rights. University of California Press." , url: "https://www.google.com/books/edition/The_Case_for_Animal_Rights/mFqJDwAAQBAJ"},
      { id: "2", citation: "Francione, G. L. (1996). Rain Without Thunder: The Ideology of the Animal Rights Movement. Temple University Press." , url: "https://www.google.com/books/edition/Rain_Without_Thunder"}
    ],
    relatedEntries: ["regan", "francione", "deontologia", "sujeto-de-una-vida", "bienestarismo", "obra-case-animal-rights"],
    relatedNodes: ["marcos-eticos", "consistencia-moral"],
    relatedDilemmas: ["granja-feliz-ecologia", "el-mito-de-la-carne-humanitaria", "r2-mascotas-carnivoras", "r2-prohibicion-mutilaciones-granjas", "bienestarismo-como-abolicionismo-fracaso"],
    relatedActs: ["acto-2"]
  },
  {
    id: "sujeto-de-una-vida",
    term: "Sujeto-de-una-vida",
    patterns: ["sujeto-de-una-vida", "sujeto de una vida", "sujetos-de-una-vida", "sujetos de una vida"],
    type: "concepto",
    category: "etica",
    shortDef: "Concepto central de la filosofía de Tom Regan que describe a todo ser con creencias, deseos, memoria, futuro y un bienestar propio que le importa activamente. Cualquier 'sujeto-de-una-vida' posee un valor inherente que prohíbe usarlo como mero instrumento para los fines de otros.",
    relatedEntries: ["regan", "deontologia", "abolicionismo", "enfoque-capacidades"],
    relatedNodes: ["marcos-eticos"],
    relatedDilemmas: ["granja-feliz-ecologia", "el-mito-de-la-carne-humanitaria"]
  },
  {
    id: "enfoque-capacidades",
    term: "Enfoque de las Capacidades",
    patterns: ["enfoque de las capacidades", "capacidades esenciales"],
    type: "concepto",
    category: "etica",
    shortDef: "Marco filosófico de Martha Nussbaum que argumenta que cada animal sintiente tiene derecho a prosperar en libertad desarrollando sus actividades naturales específicas (jugar, correr, volar, interactuar socialmente, vivir libre de miedo).",
    relatedEntries: ["nussbaum", "deontologia", "abolicionismo", "obra-frontiers-justice"],
    relatedNodes: ["marcos-eticos", "estatus-juridico"],
    relatedDilemmas: ["granja-feliz-ecologia", "conservacion-dehesas"]
  },
  {
    id: "casos-marginales",
    term: "Argumento de los Casos Marginales",
    patterns: ["casos marginales", "argumento de los casos marginales", "caso marginal"],
    type: "concepto",
    category: "etica",
    shortDef: "Razonamiento lógico que desmonta el especismo: si excluimos a los animales de la consideración moral por su menor inteligencia, deberíamos excluir también a humanos con discapacidades cognitivas severas, bebés o personas en coma. Como nadie defiende eso, la inteligencia no puede ser el criterio moral válido: lo es la capacidad de sufrir.",
    relatedEntries: ["especismo", "utilitarismo", "singer"],
    relatedNodes: ["neuroanatomia-consciencia"],
    relatedDilemmas: ["el-argumento-del-contrato-social"]
  },
  {
    id: "falacia-naturalista",
    term: "Falacia Naturalista",
    altTerms: ["Ley de Hume", "Apelación a la naturaleza"],
    patterns: ["falacia naturalista", "falacia naturalística", "ley de Hume", "apelación a la naturaleza"],
    type: "concepto",
    category: "etica",
    shortDef: "Error lógico, formulado por David Hume, que consiste en deducir que algo es 'bueno' o 'ético' simplemente porque ocurre en la naturaleza. Justificar la ganadería porque 'los leones cazan' o 'tenemos caninos' cae en esta trampa: confunde lo biológicamente natural con lo moralmente permisible.",
    references: [
      { id: "1", citation: "Hume, D. (1739). A Treatise of Human Nature (Book III, Part I, Section I)." , url: "https://en.wikipedia.org/wiki/A_Treatise_of_Human_Nature"}
    ],
    relatedEntries: ["hume", "antropocentrismo", "especismo"],
    relatedNodes: ["recorrido-historico-estatus"],
    relatedDilemmas: ["leones-carne", "caninos-dentadura"]
  },
  {
    id: "derechos-animales",
    term: "Derechos de los Animales",
    patterns: ["derechos de los animales", "derechos animales", "derechos de los animales domésticos"],
    type: "concepto",
    category: "etica",
    shortDef: "Idea moral y jurídica de que los animales merecen una consideración de justicia directa: tienen intereses fundamentales inherentes (a la vida, libertad e integridad) que la ley y los humanos deben respetar.",
    relatedEntries: ["regan", "abolicionismo", "deontologia", "enfoque-capacidades", "persona-no-humana", "habeas-corpus"],
    relatedNodes: ["estatus-juridico", "marcos-eticos"],
    relatedDilemmas: ["granja-feliz-ecologia", "el-argumento-del-contrato-social"]
  },
  {
    id: "veganismo",
    term: "Veganismo",
    patterns: ["veganismo", "vegano", "vegana", "veganos", "veganas"],
    type: "concepto",
    category: "etica",
    shortDef: "Postura ética y modo de vida que busca excluir —en la medida de lo posible— toda forma de explotación y crueldad hacia los animales para alimentación, vestimenta, entretenimiento o experimentación. No es una dieta restrictiva, sino alinear las acciones cotidianas con el valor de no causar daño a seres sintientes cuando existen alternativas viables.",
    relatedEntries: ["abolicionismo", "consistencia-moral", "carnismo", "agricultura-celular"],
    relatedNodes: ["consistencia-moral"],
    relatedDilemmas: ["granja-feliz-ecologia", "el-mito-de-la-carne-humanitaria"]
  },
  {
    id: "consistencia-moral",
    term: "Consistencia Moral",
    patterns: ["consistencia moral", "brecha de consistencia"],
    type: "concepto",
    category: "etica",
    shortDef: "Pilar del comportamiento ético íntegro: alinear los valores declarados ('amo a los animales', 'odio la injusticia') con la práctica diaria. El veganismo no consiste en adquirir nuevos valores radicales, sino en vivir de forma alineada con los valores de paz y justicia que ya poseemos.",
    relatedEntries: ["veganismo", "disonancia-cognitiva", "francione"],
    relatedNodes: ["consistencia-moral"],
    relatedDilemmas: ["el-mito-de-la-carne-humanitaria"]
  },

  // =====================================================================
  // III. PSICOLOGÍA HUMANA Y CONSISTENCIA SOCIAL
  // =====================================================================
  {
    id: "disonancia-cognitiva",
    term: "Disonancia Cognitiva",
    patterns: ["disonancia cognitiva", "disonancia", "disonancias", "Disonancia Cognitiva"],
    type: "concepto",
    category: "psicologia",
    shortDef: "Malestar mental inconsciente que sentimos cuando nuestras acciones contradicen nuestros valores. Teorizada por Leon Festinger en 1957. En este contexto, describe la contradicción de considerarse amante de los animales mientras consumimos productos que requieren su confinamiento y sacrificio.",
    longDef: "Tensión psicológica teorizada por Leon Festinger (1957). Nuestro cerebro busca resolver esta incomodidad alterando creencias o justificando acciones. En el caso del consumo animal, la disonancia se resuelve mediante autoengaños: rebajar la inteligencia atribuida al animal, alejar físicamente los mataderos, o usar el lenguaje ('carne' en vez de 'cadáver').",
    keyFacts: [
      "Estudios muestran que antes de consumir carne, las personas rebajan subconscientemente la inteligencia atribuida al animal (Loughnan, 2010).",
      "La industria oculta deliberadamente los mataderos lejos de los núcleos urbanos para alimentar la desconexión."
    ],
    references: [
      { id: "1", citation: "Festinger, L. (1957). A Theory of Cognitive Dissonance. Stanford University Press." , url: "https://en.wikipedia.org/wiki/A_Theory_of_Cognitive_Dissonance"},
      { id: "2", citation: "Loughnan, S., Haslam, N., & Bastian, B. (2010). The role of meat consumption in the denial of moral status and mind to meat animals. Appetite, 55(1), 156-159." , url: "https://doi.org/10.1016/j.appet.2010.05.043"}
    ],
    relatedEntries: ["paradoja-carne", "carnismo", "referente-ausente", "festinger", "loughnan"],
    relatedNodes: ["disonancia-placer", "categorizacion-sociocultural"],
    relatedDilemmas: ["granja-feliz-ecologia", "el-mito-de-la-carne-humanitaria"],
    relatedActs: ["acto-3"]
  },
  {
    id: "paradoja-carne",
    term: "Paradoja de la Carne",
    altTerms: ["Meat paradox"],
    patterns: ["paradoja de la carne", "paradoja del carne", "meat paradox"],
    type: "concepto",
    category: "psicologia",
    shortDef: "Término acuñado por la psicología social para describir la tensión mental de quienes aman a los animales y, al mismo tiempo, los consumen como alimento. Es la expresión cotidiana de la disonancia cognitiva aplicada a la dieta.",
    relatedEntries: ["disonancia-cognitiva", "carnismo", "loughnan", "bastian"],
    relatedNodes: ["disonancia-placer"],
    relatedDilemmas: ["el-mito-de-la-carne-humanitaria", "granja-feliz-ecologia"]
  },
  {
    id: "carnismo",
    term: "Carnismo",
    patterns: ["carnismo", "carnista", "carnistas", "Carnismo"],
    type: "concepto",
    category: "psicologia",
    shortDef: "Sistema de creencias invisible, descrito por la psicóloga Melanie Joy, que nos enseña a clasificar a ciertas especies como 'comestibles' y a otras como 'amadas' sin percibir esa decisión como una elección cultural arbitraria. Es la ideología dominante, espejo invertido del veganismo.",
    longDef: "Bautizado por la psicóloga Melanie Joy en 'Why We Love Dogs, Eat Pigs, and Wear Cows'. Da por 'normal' y 'natural' comer ciertos animales mientras rechazamos comer a otros. Funciona mediante tres pilares: normalizar, naturalizar y necesitar el consumo de ciertos animales.",
    references: [
      { id: "1", citation: "Joy, M. (2010). Why We Love Dogs, Eat Pigs, and Wear Cows: An Introduction to Carnism. Conari Press." , url: "https://en.wikipedia.org/wiki/Carnism"}
    ],
    relatedEntries: ["melanie-joy", "disonancia-cognitiva", "paradoja-carne", "referente-ausente", "especismo"],
    relatedNodes: ["categorizacion-sociocultural", "disonancia-placer"],
    relatedDilemmas: ["leones-carne", "caninos-dentadura"],
    relatedActs: ["acto-3"]
  },
  {
    id: "referente-ausente",
    term: "Referente Ausente",
    patterns: ["referente ausente"],
    type: "concepto",
    category: "psicologia",
    shortDef: "Fenómeno lingüístico propuesto por Carol J. Adams donde el lenguaje comercial oculta al animal vivo. Al renombrar el cadáver del animal como 'carne', 'chuleta', 'filete' o 'salchicha', el lenguaje elimina al animal sintiente de nuestra empatía cotidiana.",
    relatedEntries: ["adams", "carnismo", "disonancia-cognitiva"],
    relatedNodes: ["categorizacion-sociocultural"],
    relatedDilemmas: ["el-mito-de-la-carne-humanitaria"]
  },

  // =====================================================================
  // IV. SISTEMAS DE USO E INSTRUMENTALIZACIÓN
  // =====================================================================
  {
    id: "ganaderia-industrial",
    term: "Ganadería Industrial / Macrogranjas",
    altTerms: ["CAFOs", "Granjas factoría"],
    patterns: ["ganadería industrial", "ganadería intensiva", "macrogranjas", "macrogranja", "ganadería ecológica", "macrogranjas industriales", "CAFOs", "Operaciones Concentradas de Alimentación Animal"],
    type: "concepto",
    category: "sistemas_uso",
    shortDef: "Sistema moderno de confinamiento masivo (CAFOs) que trata a los seres sintientes como máquinas industriales. Su objetivo es producir carne, huevos o leche al menor precio posible, sometiendo la salud física y mental del animal a la eficiencia mercantil.",
    longDef: "Conocidas técnicamente como Operaciones Concentradas de Alimentación Animal (CAFOs). Priorizan la eficiencia económica absoluta por encima del bienestar biológico del individuo. El 99% de los animales terrestres consumidos en el mundo occidental provienen de ellas.",
    keyFacts: [
      "El 99% de los animales terrestres consumidos en el mundo occidental provienen de granjas industriales hiper-intensificadas.",
      "El cuerpo de los pollos de engorde modernos crece un 400% más rápido que hace 50 años: sus patas no pueden sostenerlos y sufren fallos cardíacos."
    ],
    relatedEntries: ["bienestarismo", "cinco-libertades", "aturdimiento", "acuicultura", "resistencia-bacteriana", "zoonosis"],
    relatedNodes: ["sistemas-alimentacion", "historia-dominacion"],
    relatedDilemmas: ["granja-feliz-ecologia", "explotacion-industrial-clima", "el-mito-de-la-carne-humanitaria"],
    relatedActs: ["acto-4"]
  },
  {
    id: "acuicultura",
    term: "Acuicultura y Pesca Industrial",
    patterns: ["acuicultura", "acuicultura intensiva", "pesca industrial", "pesca de arrastre", "redes de arrastre"],
    type: "concepto",
    category: "sistemas_uso",
    shortDef: "Sistemas masivos de extracción acuática: la acuicultura confina a miles de peces en piscimas o redes (estrés, parásitos, falta de oxígeno), mientras la pesca de arrastre barre el fondo del mar capturando entre 1 y 2.7 billones de peces salvajes al año que mueren por asfixia y descompresión.",
    references: [
      { id: "1", citation: "Mood, A., & Brooke, P. (2010). Estimating the Number of Fish Caught in Global Fishing Each Year. Fishcount." , url: "https://www.fishcount.org.uk/fish-count-estimates-2012"}
    ],
    relatedEntries: ["ganaderia-industrial", "sintiencia"],
    relatedNodes: ["sistemas-alimentacion"],
    relatedDilemmas: ["explotacion-industrial-clima"]
  },
  {
    id: "viviseccion",
    term: "Vivisección",
    patterns: ["vivisección", "vivisecciones", "viviseccion"],
    type: "concepto",
    category: "sistemas_uso",
    shortDef: "Práctica histórica de realizar experimentos y cirugías invasivas en animales vivos y conscientes, sin anestesia, amparada por la creencia cartesiana de que sus gritos eran meros ruidos mecánicos. Hoy regulada y anestesiada, simboliza el extremo más oscuro del antropocentrismo científico.",
    relatedEntries: ["mecanicismo-cartesiano", "descartes", "tres-erres", "antropocentrismo"],
    relatedNodes: ["otras-instrumentalizaciones"],
    relatedDilemmas: ["el-argumento-del-antropocentrismo-cartesiano"]
  },
  {
    id: "tres-erres",
    term: "Principio de las 3R",
    altTerms: ["Las 3R"],
    patterns: ["las 3R", "3R", "3Rs", "tres erres", "principio de las 3R", "Reemplazar, Reducir y Refinar", "Las 3R"],
    type: "concepto",
    category: "sistemas_uso",
    shortDef: "Marco ético propuesto en 1959 por Russell y Burch para la experimentación animal: Reemplazar el uso de animales por alternativas no animales, Reducir el número de individuos usados y Refinar los procedimientos para minimizar su dolor. Estándar oficial en muchos laboratorios, aunque rara vez se aplica de forma que cuestione el propio uso del animal.",
    references: [
      { id: "1", citation: "Russell, W. M. S., & Burch, R. L. (1959). The Principles of Humane Experimental Technique. Methuen." , url: "https://caat.jhsph.edu/principles/the-principles-of-humane-experimental-technique"}
    ],
    relatedEntries: ["viviseccion", "bienestarismo"],
    relatedNodes: ["otras-instrumentalizaciones"],
    relatedDilemmas: ["la-prioridad-humanitaria"],
    relatedActs: ["acto-4"]
  },
  {
    id: "mecanicismo-cartesiano",
    term: "Mecanicismo Cartesiano",
    altTerms: ["Autómata cartesiano"],
    patterns: ["mecanicismo", "mecanicista", "autómata cartesiano", "automata cartesiano", "máquina de relojería"],
    type: "concepto",
    category: "sistemas_uso",
    shortDef: "Doctrina de René Descartes (1637) que consideraba a los animales como autómatas biológicos sin alma ni consciencia, cuyos gritos de dolor eran equiparables al chirrido de un engranaje. Sirvió históricamente como 'inmunización moral' para justificar vivisecciones y abusos. Refutada por la neurobiología evolutiva y la Declaración de Cambridge.",
    relatedEntries: ["descartes", "declaracion-cambridge", "viviseccion", "antropocentrismo"],
    relatedNodes: ["recorrido-historico-estatus"],
    relatedDilemmas: ["el-argumento-del-antropocentrismo-cartesiano"]
  },
  {
    id: "aturdimiento",
    term: "Aturdimiento en Matadero",
    patterns: ["aturdimiento", "aturdir", "aturdido", "aturdidos", "escaldado"],
    type: "concepto",
    category: "sistemas_uso",
    shortDef: "Procedimiento industrial destinado a dejar insensible al animal antes del degüello, mediante electrocución, gas o perno captivo. Aunque es obligatorio por ley, en líneas de alta velocidad falla con frecuencia, provocando que animales sean desangrados o incluso escaldados vivos.",
    relatedEntries: ["bienestarismo", "cinco-libertades", "ganaderia-industrial"],
    relatedNodes: ["legislacion-bienestar"],
    relatedDilemmas: ["el-mito-de-la-carne-humanitaria"]
  },
  {
    id: "cinco-libertades",
    term: "Cinco Libertades",
    patterns: ["Cinco Libertades", "cinco libertades"],
    type: "concepto",
    category: "sistemas_uso",
    shortDef: "Estándar fundacional del bienestarismo moderno, surgido del Informe Brambell (1965): ausencia de hambre y sed, de incomodidad, de dolor y enfermedad, de miedo y estrés, y la libertad de expresar el comportamiento natural de la especie. Sus críticos recuerdan que la sexta libertad —no ser matado— nunca figura en la lista.",
    relatedEntries: ["bienestarismo", "informe-brambell", "aturdimiento"],
    relatedNodes: ["legislacion-bienestar"],
    relatedDilemmas: ["granja-feliz-ecologia", "el-mito-de-la-carne-humanitaria"]
  },
  {
    id: "resistencia-bacteriana",
    term: "Resistencia Bacteriana",
    altTerms: ["Antibióticos promotores del crecimiento"],
    patterns: ["resistencia bacteriana", "resistencia a los antibióticos", "antibióticos promotores del crecimiento"],
    type: "tecnico",
    category: "sistemas_uso",
    shortDef: "Fenómeno por el que las bacterias mutan y sobreviven a los medicamentos, convirtiendo infecciones comunes en mortales. La ganadería industrial consume más del 70% de los antibióticos globales, gran parte como 'promotores del crecimiento' en animales sanos, acelerando esta crisis sanitaria mundial.",
    relatedEntries: ["ganaderia-industrial", "zoonosis"],
    relatedNodes: ["sistemas-alimentacion"],
    relatedDilemmas: ["explotacion-industrial-clima", "la-prioridad-humanitaria"]
  },
  {
    id: "zoonosis",
    term: "Zoonosis",
    patterns: ["zoonosis", "zoonótica", "zoonóticas", "zoonótico"],
    type: "tecnico",
    category: "sistemas_uso",
    shortDef: "Enfermedades infecciosas que saltan de los animales no humanos a los humanos. La proximidad extrema con el ganado doméstico, ya desde el Neolítico, originó la mayoría de las grandes epidemias históricas. El hacinamiento contemporáneo en macrogranjas y mercados sigue siendo un motor clave en la aparición de nuevas pandemias.",
    relatedEntries: ["ganaderia-industrial", "resistencia-bacteriana"],
    relatedNodes: ["sistemas-alimentacion"],
    relatedDilemmas: ["la-prioridad-humanitaria"]
  },

  // =====================================================================
  // V. IMPACTO ECOLÓGICO Y SISTÉMICO
  // =====================================================================
  {
    id: "termodinamica",
    term: "Leyes de la Termodinámica",
    altTerms: ["Ley del 10% (Lindeman)", "Ineficiencia termodinámica"],
    patterns: ["termodinámica", "termodinámicas", "ineficiencia termodinámica", "leyes de la física"],
    type: "tecnico",
    category: "ecologia",
    shortDef: "Reglas físicas que dictan cómo la energía se transforma y se pierde. En agricultura, cuando alimentas a un animal con plantas para luego comerte al animal, cerca del 90% de las calorías originales del vegetal se pierden en el calor corporal y el metabolismo del animal. La Ley del 10% de Lindeman cuantifica este fenómeno.",
    longDef: "En ecología, la Ley del 10% de Lindeman demuestra que alrededor del 90% de la energía metabólica se pierde irremediablemente en cada salto de la cadena alimentaria. Por esto, alimentar a los humanos con cultivos forrajeros filtrados a través del ganado es una imposibilidad matemática en un planeta superpoblado.",
    keyFacts: [
      "Aves de corral: tasa de conversión calórica del 11%; cerdos 10%; vacas apenas 3%.",
      "Alimentar directamente a los humanos con los cultivos forrajeros que hoy destinamos al ganado permitiría erradicar el hambre global."
    ],
    relatedEntries: ["huella-hidrica", "deforestacion", "antropoceno", "metano"],
    relatedNodes: ["eficiencia-termodinamica", "huella-ecologica"],
    relatedDilemmas: ["plantas-sienten-dolor", "explotacion-industrial-clima", "la-prioridad-humanitaria"],
    relatedActs: ["acto-5"]
  },
  {
    id: "metano",
    term: "Metano (CH4)",
    patterns: ["metano", "CH4"],
    type: "tecnico",
    category: "ecologia",
    shortDef: "Gas de efecto invernadero sumamente potente que calienta el planeta con una intensidad de 28 a 34 veces superior al CO2 a corto plazo. Generado masivamente por la digestión de las vacas y ovejas de la industria ganadera.",
    relatedEntries: ["gases-efecto-invernadero", "rumiante", "deforestacion", "termodinamica"],
    relatedNodes: ["crisis-ambiental"],
    relatedDilemmas: ["explotacion-industrial-clima"]
  },
  {
    id: "oxido-nitroso",
    term: "Óxido Nitroso (N2O)",
    patterns: ["óxido nitroso", "oxido nitroso", "N2O"],
    type: "tecnico",
    category: "ecologia",
    shortDef: "Gas de efecto invernadero liberado masivamente por los fertilizantes químicos y los purines (excrementos) de las macrogranjas. Calienta el planeta con una potencia hasta 300 veces superior al CO2 y permanece más de un siglo en la atmósfera.",
    relatedEntries: ["metano", "gases-efecto-invernadero", "ganaderia-industrial"],
    relatedNodes: ["crisis-ambiental"],
    relatedDilemmas: ["explotacion-industrial-clima"]
  },
  {
    id: "gases-efecto-invernadero",
    term: "Gases de Efecto Invernadero (GEI)",
    altTerms: ["GEI"],
    patterns: ["gases de efecto invernadero", "gas de efecto invernadero", "GEI", "GEIs"],
    type: "tecnico",
    category: "ecologia",
    shortDef: "Gases que atrapan el calor en la atmósfera y calientan el planeta: CO2, metano (CH4) y óxido nitroso (N2O). La ganadería emite cerca del 14,5% de todos los GEI antropogénicos globales, siendo uno de los mayores contribuyentes directos al cambio climático, comparable a todo el sector del transporte mundial.",
    relatedEntries: ["metano", "oxido-nitroso", "deforestacion"],
    relatedNodes: ["crisis-ambiental"],
    relatedDilemmas: ["explotacion-industrial-clima"]
  },
  {
    id: "rumiante",
    term: "Rumiante",
    patterns: ["rumiante", "rumiantes"],
    type: "tecnico",
    category: "ecologia",
    shortDef: "Mamífero herbívoro (vacas, ovejas, cabras) cuyo estómago complejo fermenta la vegetación y libera metano (CH4) como subproducto de la digestión. Por este proceso biológico, la carne y leche de rumiante tienen una huella climática muy superior, convirtiéndolos en el principal foco de las emisiones ganaderas.",
    relatedEntries: ["metano", "gases-efecto-invernadero", "termodinamica"],
    relatedNodes: ["crisis-ambiental"],
    relatedDilemmas: ["explotacion-industrial-clima"]
  },
  {
    id: "deforestacion",
    term: "Deforestación",
    patterns: ["deforestación", "deforestar", "deforestadas", "pérdida forestal"],
    type: "concepto",
    category: "ecologia",
    shortDef: "Proceso de destrucción de bosques nativos y selvas (como la amazónica) para convertirlos en tierras de pastoreo de ganado o en campos de soja industrial, usada principalmente para alimentar a los animales confinados en granjas del primer mundo.",
    relatedEntries: ["antropoceno", "termodinamica", "huella-hidrica", "ganaderia-industrial"],
    relatedNodes: ["crisis-ambiental", "huella-ecologica"],
    relatedDilemmas: ["explotacion-industrial-clima"]
  },
  {
    id: "huella-hidrica",
    term: "Huella Hídrica",
    patterns: ["huella hídrica", "huella hidrica", "huella del agua"],
    type: "tecnico",
    category: "ecologia",
    shortDef: "Indicador que mide el volumen total de agua dulce utilizada para producir un bien. Debido a la ineficiencia termodinámica, producir un solo kilo de carne de vacuno requiere miles de litros de agua (beber, limpieza y, sobre todo, regar los cultivos de pienso), frente a una fracción mínima para los mismos nutrientes de origen vegetal directo.",
    relatedEntries: ["termodinamica", "deforestacion", "antropoceno"],
    relatedNodes: ["huella-ecologica"],
    relatedDilemmas: ["explotacion-industrial-clima", "la-prioridad-humanitaria"]
  },
  {
    id: "antropoceno",
    term: "Antropoceno y Sexta Extinción",
    patterns: ["Antropoceno", "antropoceno", "sexta extinción", "sexta extinción masiva", "extinción masiva"],
    type: "concepto",
    category: "ecologia",
    shortDef: "Era geológica definida por el impacto abrumador de la actividad humana sobre el planeta. La ganadería es uno de sus mayores motores: ocupa el 83% del suelo agrícola mundial, deforesta selvas milenarias y es la primera causa directa de la 'sexta extinción masiva', el colapso acelerado de la biodiversidad silvestre.",
    keyFacts: [
      "La ganadería ocupa el 83% del suelo agrícola mundial pero provee apenas el 18% de las calorías que consumimos.",
      "La biomasa de mamíferos salvajes representa solo el 4%; el 96% restante somos humanos y nuestro ganado en cautiverio."
    ],
    references: [
      { id: "1", citation: "Bar-On, Y. M., Phillips, R., & Milo, R. (2018). The biomass distribution on Earth. PNAS, 115(25), 6506-6511." , url: "https://doi.org/10.1073/pnas.1711842115"}
    ],
    relatedEntries: ["deforestacion", "termodinamica", "gases-efecto-invernadero", "ganaderia-industrial"],
    relatedNodes: ["crisis-ambiental", "huella-ecologica"],
    relatedDilemmas: ["explotacion-industrial-clima"]
  },

  // =====================================================================
  // VI. MARCO LEGAL Y TRANSICIÓN
  // =====================================================================
  {
    id: "habeas-corpus",
    term: "Habeas Corpus",
    patterns: ["Habeas Corpus", "habeas corpus", "hábeas corpus", "Habeas corpus"],
    type: "tecnico",
    category: "legal",
    shortDef: "Figura jurídica creada hace siglos para liberar a personas encarceladas injustamente, que abogados de vanguardia están reutilizando para defender a animales cognitivamente complejos (grandes simios, elefantes). El objetivo es que un juez reconozca al animal como 'persona no humana' con derecho a la libertad corporal y ordene su traslado a un santuario.",
    longDef: "El Nonhuman Rights Project, liderado por el abogado Steven Wise, utiliza esta figura para exigir ante la Corte el derecho a la libertad de animales cognitivamente complejos. El Habeas Corpus de la orangutana Sandra en Argentina (2014) sentó jurisprudencia histórica al reconocerla por primera vez como sujeto de derecho.",
    relatedEntries: ["steven-wise", "persona-no-humana", "derechos-animales", "enfoque-capacidades", "obra-rattling-cage"],
    relatedNodes: ["vias-transicion", "estatus-juridico"],
    relatedDilemmas: ["el-argumento-del-contrato-social"],
    relatedActs: ["acto-6"]
  },
  {
    id: "cosificacion",
    term: "Cosificación / Propiedad Animal",
    altTerms: ["Descosificación"],
    patterns: ["cosificación", "cosificar", "cosificado", "propiedad animal", "descosificación", "descosificacion"],
    type: "concepto",
    category: "legal",
    shortDef: "Tratamiento legal y moral de un ser sintiente como una 'cosa' u objeto de propiedad intercambiable, al nivel de una mesa o un coche. Las recientes reformas de 'descosificación' los redefinen como seres vivos dotados de sensibilidad, abriendo la primera grieta jurídica en su estatus de mercancía.",
    relatedEntries: ["persona-no-humana", "derechos-animales"],
    relatedNodes: ["estatus-juridico"],
    relatedDilemmas: ["el-argumento-del-contrato-social", "el-mito-de-la-carne-humanitaria"]
  },
  {
    id: "persona-no-humana",
    term: "Persona No Humana",
    patterns: ["persona no humana", "personas no humanas", "persona jurídica no humana"],
    type: "concepto",
    category: "legal",
    shortDef: "Concepto jurídico emergente que reconoce a ciertos animales cognitivamente complejos (grandes simios, elefantes) como 'personas' ante la ley —no como objetos—, otorgándoles derechos básicos como la libertad corporal. No los equipara a los humanos, pero les reconoce el estatus de 'alguien' que sufre y merece protección.",
    relatedEntries: ["habeas-corpus", "steven-wise", "derechos-animales", "enfoque-capacidades"],
    relatedNodes: ["vias-transicion", "estatus-juridico"],
    relatedDilemmas: ["el-argumento-del-contrato-social"]
  },
  {
    id: "agricultura-celular",
    term: "Agricultura Celular / Carne Cultivada",
    altTerms: ["Carne cultivada", "Fermentación de precisión"],
    patterns: ["agricultura celular", "carne cultivada", "fermentación de precisión", "Agricultura Celular", "tejido real"],
    type: "concepto",
    category: "legal",
    shortDef: "Conjunto de tecnologías que permiten fabricar carne real, lácteos y huevos directamente cultivando células o mediante bacterias modificadas en tanques. Permite obtener alimento idéntico sin criar, enjaular ni matar animales. Aprobada ya por la FDA y Singapur.",
    keyFacts: [
      "Reduciría teóricamente la huella territorial en un 99% y las emisiones GEI hasta en un 96% frente a la carne bovina.",
      "Autoridades de seguridad alimentaria en Singapur y Estados Unidos (FDA) ya han evaluado y aprobado su venta comercial."
    ],
    references: [
      { id: "1", citation: "Tuomisto, H. L., & Teixeira de Mattos, M. J. (2011). Environmental Impacts of Cultured Meat Production. Environmental Science & Technology, 45(14)." , url: "https://doi.org/10.1021/es200130u"}
    ],
    relatedEntries: ["veganismo", "consistencia-moral", "b12"],
    relatedNodes: ["vias-transicion"],
    relatedDilemmas: ["granja-feliz-ecologia", "explotacion-industrial-clima"],
    relatedActs: ["acto-6"]
  },
  {
    id: "b12",
    term: "Vitamina B12",
    altTerms: ["Cobalamina"],
    patterns: ["vitamina B12", "B12", "cobalamina"],
    type: "tecnico",
    category: "legal",
    shortDef: "Micronutriente esencial para el cerebro humano que no es producido por plantas ni por animales, sino por bacterias en el suelo. Hoy en día se produce de forma ultra limpia en laboratorios sin necesidad de explotar o sacrificar a ningún ser vivo.",
    relatedEntries: ["agricultura-celular", "veganismo"],
    relatedNodes: ["vias-transicion"],
    relatedDilemmas: ["granja-feliz-ecologia"]
  },
  {
    id: "principio-precaucion",
    term: "Principio de Precaución",
    patterns: ["principio de precaución", "precaución"],
    type: "concepto",
    category: "sintiencia",
    shortDef: "Principio moral que establece que si existe una sospecha razonable de que una acción causa daño severo (como el dolor en insectos o bivalvos), y carecemos de un consenso absoluto, lo éticamente correcto es evitar esa acción de manera cautelar.",
    relatedEntries: ["declaracion-nueva-york"],
    relatedNodes: ["neuroanatomia-consciencia"],
    relatedDilemmas: ["bivalvos-ostras", "comer-insectos-harinas"]
  },

  // =====================================================================
  // VII. DECLARACIONES Y CONSENSOS CIENTÍFICOS
  // =====================================================================
  {
    id: "declaracion-cambridge",
    term: "Declaración de Cambridge sobre la Conciencia",
    patterns: ["Declaración de Cambridge", "Declaración de Cambridge sobre la Conciencia"],
    type: "declaracion",
    category: "sintiencia",
    shortDef: "Consenso formal firmado en 2012 por eminentes neurocientíficos que declaró científicamente que los animales no humanos (mamíferos, aves, pulpos) tienen las bases cerebrales y químicas para experimentar estados conscientes y subjetivos de la misma forma que los humanos.",
    longDef: "Firmada en 2012 por figuras como Stephen Hawking y neurocientíficos destacados, establece formalmente que la ausencia de un neocórtex no impide que un organismo experimente estados afectivos, incluyendo explícitamente a mamíferos, aves y muchas otras criaturas.",
    references: [
      { id: "1", citation: "Low, P., Panksepp, J., Reiss, D., Edelman, D., Van Swinderen, B., & Koch, C. (2012). The Cambridge Declaration on Consciousness.", url: "https://fcmconference.org/img/CambridgeDeclarationOnConsciousness.pdf" }
    ],
    relatedEntries: ["declaracion-nueva-york", "sintiencia", "snc", "cefalopodos", "mecanicismo-cartesiano"],
    relatedNodes: ["neuroanatomia-consciencia"],
    relatedDilemmas: ["plantas-sienten-dolor", "bivalvos-ostras", "el-argumento-del-antropocentrismo-cartesiano", "consenso-sintiencia-animal", "r2-quimeras-humanas"],
    relatedActs: ["acto-1"]
  },
  {
    id: "declaracion-nueva-york",
    term: "Declaración de Nueva York sobre la Consciencia Animal",
    patterns: ["Declaración de Nueva York", "Declaración de Nueva York sobre la Consciencia Animal", "New York Declaration on Animal Consciousness"],
    type: "declaracion",
    category: "sintiencia",
    shortDef: "Manifiesto firmado en 2024 por un amplio consenso de científicos que amplió la Declaración de Cambridge a más grupos: pulpos, decápodos (cangrejos, langostas) e insectos. Establece que existe evidencia sólida de experiencia consciente en estos animales y recomienda aplicar el principio de precaución ante la duda razonable.",
    references: [
      { id: "1", citation: "Andrews, K., et al. (2024). The New York Declaration on Animal Consciousness." , url: "https://nyudeclaration.org/"}
    ],
    relatedEntries: ["declaracion-cambridge", "declaracion-montreal", "principio-precaucion", "sintiencia", "cefalopodos"],
    relatedNodes: ["neuroanatomia-consciencia"],
    relatedDilemmas: ["bivalvos-ostras", "comer-insectos-harinas", "consenso-sintiencia-animal", "r2-fetos-animales", "sintiencia-insectos-granjas"]
  },
  {
    id: "declaracion-montreal",
    term: "Declaración de Montreal sobre la Explotación Animal",
    patterns: ["Declaración de Montreal", "Declaración de Montreal sobre la Explotación Animal"],
    type: "declaracion",
    category: "etica",
    shortDef: "Documento de 2022 firmado por más de 500 filósofos y académicos que da un paso más allá de la ciencia de la consciencia: sostiene que, dado que los animales sufren y sus vidas les importan, es éticamente indefendible seguir confinándolos, mercantilizándolos y matándolos por fines gastronómicos triviales, y exige reformas jurídicas abolicionistas globales.",
    relatedEntries: ["declaracion-cambridge", "declaracion-nueva-york", "abolicionismo", "derechos-animales"],
    relatedNodes: ["estatus-juridico", "marcos-eticos"],
    relatedDilemmas: ["el-mito-de-la-carne-humanitaria", "consenso-sintiencia-animal", "r2-marco-legal-tfue"]
  },
  {
    id: "informe-brambell",
    term: "Informe Brambell (1965)",
    patterns: ["Informe Brambell", "Brambell Report", "informe Brambell"],
    type: "declaracion",
    category: "sistemas_uso",
    shortDef: "Informe oficial británico de 1965, redactado por el profesor Roger Brambell tras el escándalo de 'Animal Machines' de Ruth Harrison, que definió por primera vez las condiciones mínimas de bienestar animal que toda granja debe garantizar. De él nacieron las 'Cinco Libertades', estándar fundacional del bienestarismo moderno.",
    references: [
      { id: "1", citation: "Brambell, F. W. R. (1965). Report of the Technical Committee to Enquire into the Welfare of Animals Kept under Intensive Livestock Husbandry Systems. HMSO London." , url: "https://edepot.wur.nl/134379"}
    ],
    relatedEntries: ["cinco-libertades", "bienestarismo", "ganaderia-industrial", "harrison"],
    relatedNodes: ["legislacion-bienestar"],
    relatedDilemmas: ["granja-feliz-ecologia"]
  },

  // =====================================================================
  // VIII. AUTORES
  // =====================================================================
  {
    id: "singer",
    term: "Peter Singer",
    patterns: ["Peter Singer", "Singer, P.", "Singer"],
    type: "autor",
    category: "etica",
    shortDef: "Filósofo australiano (1946–) y uno de los padres de la ética animal contemporánea. Profesor en Princeton. Su obra 'Liberación Animal' (1975) aplicó el utilitarismo clásico al sufrimiento de los animales no humanos y popularizó el concepto de 'especismo' acuñado por Ryder.",
    longDef: "Aplica el utilitarismo benthamiano a la consideración moral de los animales: la capacidad de sufrir, no la inteligencia ni la especie, es el único criterio moral válido. Su rechazo al especismo y su defensa de la igual consideración de intereses transformaron la ética aplicada del siglo XX.",
    keyFacts: [
      "Su libro 'Liberación Animal' (1975) es considerado el fundamento del movimiento animalista moderno.",
      "Defiende una postura utilitarista: maximizar el bienestar y minimizar el sufrimiento de cualquier ser sintiente."
    ],
    references: [
      { id: "1", citation: "Singer, P. (1975). Animal Liberation: A New Ethics for Our Treatment of Animals. HarperCollins." , url: "https://en.wikipedia.org/wiki/Animal_Liberation_(book)"}
    ],
    author: { name: "Peter Singer", era: "1946–", works: ["Liberación Animal (1975)", "Practical Ethics (1979)", "Animal Liberation Now! (2023)"] },
    relatedEntries: ["obra-liberacion-animal", "utilitarismo", "especismo", "ryder", "bentham", "casos-marginales"],
    relatedNodes: ["especismo", "recorrido-historico-estatus"],
    relatedDilemmas: ["leones-carne", "el-mito-de-la-carne-humanitaria", "la-prioridad-humanitaria"],
    relatedActs: ["acto-2"]
  },
  {
    id: "regan",
    term: "Tom Regan",
    patterns: ["Tom Regan", "Regan, T.", "Regan"],
    type: "autor",
    category: "etica",
    shortDef: "Filósofo estadounidense (1938–2017) y padre de la teoría de los derechos animales desde una óptica deontológica. Su obra 'The Case for Animal Rights' (1983) introdujo el concepto de 'sujeto-de-una-vida' y defendió que los animales tienen un valor inherente que prohíbe usarlos como medios para fines ajenos.",
    longDef: "Frente al utilitarismo de Singer, Regan defendió un enfoque de derechos deontológico: los animales no son recipientes de bienestar a sumar, sino sujetos con valor inherente inviolable. Defendió el abolicionismo frente a las reformas bienestaristas.",
    keyFacts: [
      "Introdujo el concepto de 'sujeto-de-una-vida' para designar a todo ser con creencias, deseos, memoria y un bienestar propio.",
      "Defendió el abolicionismo: las reformas bienestaristas perpetúan el sistema de uso animal."
    ],
    references: [
      { id: "1", citation: "Regan, T. (1983). The Case for Animal Rights. University of California Press." }
    ],
    author: { name: "Tom Regan", era: "1938–2017", works: ["The Case for Animal Rights (1983)", "Empty Cages (2004)"] },
    relatedEntries: ["obra-case-animal-rights", "deontologia", "abolicionismo", "sujeto-de-una-vida", "derechos-animales"],
    relatedNodes: ["marcos-eticos"],
    relatedDilemmas: ["granja-feliz-ecologia", "el-mito-de-la-carne-humanitaria", "el-argumento-del-contrato-social"]
  },
  {
    id: "bentham",
    term: "Jeremy Bentham",
    patterns: ["Jeremy Bentham", "Bentham, J.", "Bentham"],
    type: "autor",
    category: "etica",
    shortDef: "Filósofo y jurista británico (1748–1832), fundador del utilitarismo clásico. En una nota célebre de 1789 planteó la pregunta que cambiaría la ética animal: 'La pregunta no es ¿pueden razonar?, ni ¿pueden hablar?, sino ¿pueden sufrir?'.",
    longDef: "Su 'An Introduction to the Principles of Morals and Legislation' (1789) estableció que el placer y el dolor son los únicos soberanos de la humanidad y que la capacidad de sufrir, no la racionalidad, es la base de la consideración moral. Su idea es el cimiento de toda la ética animal contemporánea.",
    references: [
      { id: "1", citation: "Bentham, J. (1789). An Introduction to the Principles of Morals and Legislation. T. Payne and Son." }
    ],
    author: { name: "Jeremy Bentham", era: "1748–1832", works: ["An Introduction to the Principles of Morals and Legislation (1789)"] },
    relatedEntries: ["utilitarismo", "sintiencia", "singer"],
    relatedNodes: ["recorrido-historico-estatus"],
    relatedActs: ["acto-2"]
  },
  {
    id: "descartes",
    term: "René Descartes",
    patterns: ["René Descartes", "Descartes, R.", "Descartes"],
    type: "autor",
    category: "sintiencia",
    shortDef: "Filósofo, matemático y científico francés (1596–1650). En 'Discurso del método' (1637) defendió el mecanicismo: los animales son autómatas biológicos sin alma ni consciencia, cuyos gritos de dolor serían equivalentes al chirrido de un engranaje. Su doctrina sirvió como 'inmunización moral' para justificar la vivisección y el abuso durante siglos.",
    references: [
      { id: "1", citation: "Descartes, R. (1637). Discurso del método (Parte V)." , url: "https://es.wikipedia.org/wiki/Discurso_del_m%C3%A9todo"}
    ],
    author: { name: "René Descartes", era: "1596–1650", works: ["Discurso del método (1637)", "Meditaciones metafísicas (1641)"] },
    relatedEntries: ["obra-discurso-metodo", "mecanicismo-cartesiano", "viviseccion", "antropocentrismo"],
    relatedNodes: ["recorrido-historico-estatus"],
    relatedDilemmas: ["el-argumento-del-antropocentrismo-cartesiano"]
  },
  {
    id: "nussbaum",
    term: "Martha Nussbaum",
    patterns: ["Martha Nussbaum", "Nussbaum, M. C.", "Nussbaum"],
    type: "autor",
    category: "etica",
    shortDef: "Filósofa estadounidense (1947–2024) desarrolladora del 'enfoque de las capacidades'. En 'Frontiers of Justice' (2006) lo extendió a los animales: cada ser sintiente tiene derecho a prosperar desarrollando sus actividades naturales específicas (jugar, correr, volar, vivir libre de miedo).",
    references: [
      { id: "1", citation: "Nussbaum, M. C. (2006). Frontiers of Justice: Species Membership. Harvard University Press." , url: "https://www.google.com/books/edition/Frontiers_of_Justice/6ZPgCgAAQBAJ"}
    ],
    author: { name: "Martha Nussbaum", era: "1947–2024", works: ["Frontiers of Justice (2006)", "Creating Capabilities (2011)"] },
    relatedEntries: ["obra-frontiers-justice", "enfoque-capacidades", "deontologia", "derechos-animales"],
    relatedNodes: ["marcos-eticos", "estatus-juridico"],
    relatedDilemmas: ["el-argumento-del-contrato-social"]
  },
  {
    id: "adams",
    term: "Carol J. Adams",
    patterns: ["Carol J. Adams", "Adams, C. J.", "Carol Adams"],
    type: "autor",
    category: "psicologia",
    shortDef: "Filósofa y feminista estadounidense (1951–). Su obra 'The Sexual Politics of Meat' (1990) vinculó el ecofeminismo con el antropocentrismo y teorizó el 'referente ausente': cómo el lenguaje oculta al animal-víctima ('carne', 'filete') para desensibilizar al consumidor.",
    references: [
      { id: "1", citation: "Adams, C. J. (1990). The Sexual Politics of Meat: A Feminist-Vegetarian Critical Theory. Continuum." , url: "https://www.google.com/books/edition/The_Sexual_Politics_of_Meat/f_8KDwAAQBAJ"}
    ],
    author: { name: "Carol J. Adams", era: "1951–", works: ["The Sexual Politics of Meat (1990)", "The Pornography of Meat (2003)"] },
    relatedEntries: ["obra-sexual-politics-meat", "referente-ausente", "carnismo", "disonancia-cognitiva"],
    relatedNodes: ["categorizacion-sociocultural"],
    relatedDilemmas: ["el-mito-de-la-carne-humanitaria", "la-prioridad-humanitaria"]
  },
  {
    id: "francione",
    term: "Gary Francione",
    patterns: ["Gary Francione", "Francione, G. L.", "Francione"],
    type: "autor",
    category: "etica",
    shortDef: "Jurista y filósofo estadounidense (1954–), teórico del abolicionismo jurídico. Sostiene que los animales tienen un derecho moral inviolable a no ser propiedad y que las reformas bienestaristas son un placebo que perpetúa el sistema de uso. Defiende el veganismo como línea de base moral.",
    references: [
      { id: "1", citation: "Francione, G. L. (1996). Rain Without Thunder: The Ideology of the Animal Rights Movement. Temple University Press." },
      { id: "2", citation: "Francione, G. L. (2000). Introduction to Animal Rights: Your Child or the Dog? Temple University Press." , url: "https://www.google.com/books/edition/Introduction_to_Animal_Rights"}
    ],
    author: { name: "Gary Francione", era: "1954–", works: ["Rain Without Thunder (1996)", "Introduction to Animal Rights (2000)"] },
    relatedEntries: ["abolicionismo", "bienestarismo", "consistencia-moral", "veganismo"],
    relatedNodes: ["consistencia-moral", "marcos-eticos"],
    relatedDilemmas: ["el-mito-de-la-carne-humanitaria"]
  },
  {
    id: "melanie-joy",
    term: "Melanie Joy",
    patterns: ["Melanie Joy", "Joy, M.", "Melanie Joy Carnismo"],
    type: "autor",
    category: "psicologia",
    shortDef: "Psicóloga social estadounidense (1961–). Bautizó el 'carnismo' en 'Why We Love Dogs, Eat Pigs, and Wear Cows' (2010) como el sistema de creencias invisible que nos enseña a clasificar arbitrariamente a unas especies como 'comestibles' y a otras como 'amadas'.",
    references: [
      { id: "1", citation: "Joy, M. (2010). Why We Love Dogs, Eat Pigs, and Wear Cows: An Introduction to Carnism. Conari Press." }
    ],
    author: { name: "Melanie Joy", era: "1961–", works: ["Why We Love Dogs, Eat Pigs, and Wear Cows (2010)"] },
    relatedEntries: ["carnismo", "disonancia-cognitiva", "paradoja-carne"],
    relatedNodes: ["categorizacion-sociocultural", "disonancia-placer"],
    relatedDilemmas: ["leones-carne", "caninos-dentadura"],
    relatedActs: ["acto-3"]
  },
  {
    id: "steven-wise",
    term: "Steven Wise",
    patterns: ["Steven Wise", "Wise, S. M.", "Steven M. Wise"],
    type: "autor",
    category: "legal",
    shortDef: "Jurista estadounidense (1952–2024) fundador del Nonhuman Rights Project. Pionero en utilizar el recurso de 'Habeas Corpus' para exigir ante la Corte el derecho a la libertad de animales cognitivamente complejos (grandes simios, elefantes), buscando que se les reconozca como 'personas no humanas'.",
    references: [
      { id: "1", citation: "Wise, S. M. (2000). Rattling the Cage: Toward Legal Rights for Animals. Perseus Books." , url: "https://www.google.com/books/edition/Rattling_the_Cage/DCppAAAAMAAJ"}
    ],
    author: { name: "Steven Wise", era: "1952–2024", works: ["Rattling the Cage (2000)", "Drawing the Line (2002)"] },
    relatedEntries: ["obra-rattling-cage", "habeas-corpus", "persona-no-humana", "derechos-animales"],
    relatedNodes: ["vias-transicion"],
    relatedDilemmas: ["el-argumento-del-contrato-social"],
    relatedActs: ["acto-6"]
  },
  {
    id: "frans-de-waal",
    term: "Frans de Waal",
    patterns: ["Frans de Waal", "de Waal", "Frans de waal"],
    type: "autor",
    category: "sintiencia",
    shortDef: "Primatólogo y etólogo neerlandés (1948–2024). Documentó extensamente la vida cognitiva y emocional de los grandes simios en obras como '¿Tenemos suficiente inteligencia para entender la inteligencia de los animales?', desmontando la frontera entre la mente humana y la animal.",
    references: [
      { id: "1", citation: "de Waal, F. (2016). Are We Smart Enough to Know How Smart Animals Are? W. W. Norton." , url: "https://en.wikipedia.org/wiki/Are_We_Smart_Enough_to_Know_How_Smart_Animals_Are%3F"}
    ],
    author: { name: "Frans de Waal", era: "1948–2024", works: ["Chimpanzee Politics (1982)", "Are We Smart Enough to Know How Smart Animals Are? (2016)"] },
    relatedEntries: ["etologia", "jennifer-ackerman", "sintiencia"],
    relatedNodes: ["etologia-cognitiva"],
    relatedActs: ["acto-1"]
  },
  {
    id: "jennifer-ackerman",
    term: "Jennifer Ackerman",
    patterns: ["Jennifer Ackerman", "Ackerman, J."],
    type: "autor",
    category: "sintiencia",
    shortDef: "Divulgadora científica y ornitóloga estadounidense. En 'El ingenio de los pájaros' documentó cómo aves como los cuervos de Nueva Caledonia fabrican herramientas complejas, hito cognitivo que redefinió nuestra comprensión de la inteligencia aviar.",
    references: [
      { id: "1", citation: "Ackerman, J. (2016). The Genius of Birds. Penguin Press." , url: "https://www.google.com/books/edition/The_Genius_of_Birds/qm5BDAAAQBAJ"}
    ],
    author: { name: "Jennifer Ackerman", era: "1959–", works: ["The Genius of Birds (2016)", "The Bird Way (2020)"] },
    relatedEntries: ["obra-ingenio-pajaros", "etologia", "frans-de-waal", "sintiencia"],
    relatedNodes: ["etologia-cognitiva"],
    relatedActs: ["acto-1"]
  },
  {
    id: "safran-foer",
    term: "Jonathan Safran Foer",
    patterns: ["Jonathan Safran Foer", "Safran Foer", "Foer, J. S."],
    type: "autor",
    category: "etica",
    shortDef: "Novelista y ensayista estadounidense (1977–). En 'Comer animales' (2009) expone cómo el lenguaje culinario y el aislamiento arquitectónico de los mataderos están diseñados para desconectar al consumidor de la realidad del animal, narrando su propia transformación ética.",
    references: [
      { id: "1", citation: "Foer, J. S. (2009). Eating Animals. Little, Brown and Company." , url: "https://www.google.com/books/edition/Eating_Animals/8vZiQgAACAAJ"}
    ],
    author: { name: "Jonathan Safran Foer", era: "1977–", works: ["Eating Animals (2009)"] },
    relatedEntries: ["obra-comer-animales", "referente-ausente", "disonancia-cognitiva", "ganaderia-industrial"],
    relatedActs: ["acto-3"]
  },
  {
    id: "ryder",
    term: "Richard Ryder",
    patterns: ["Richard Ryder", "Ryder, R. D.", "Ryder"],
    type: "autor",
    category: "etica",
    shortDef: "Psicólogo y filósofo británico (1945–). Acuñó el término 'especismo' en 1970 en un folleto impreso, concepto que más tarde fue popularizado por Peter Singer en 'Liberación Animal'. Defendió que la discriminación por especie es tan arbitraria como el racismo o el sexismo.",
    references: [
      { id: "1", citation: "Ryder, R. D. (1970). Speciesism. (First coined in a printed leaflet)." }
    ],
    author: { name: "Richard Ryder", era: "1945–", works: ["Speciesism (1970, folleto)", "Animal Revolution (1989)"] },
    relatedEntries: ["especismo", "singer", "obra-liberacion-animal"],
    relatedActs: ["acto-2"]
  },
  {
    id: "hume",
    term: "David Hume",
    patterns: ["David Hume", "Hume, D.", "Hume"],
    type: "autor",
    category: "etica",
    shortDef: "Filósofo empirista escocés (1711–1776). Formuló la 'ley de Hume' o guillotina de Hume, base de la 'falacia naturalista': no se puede deducir lo que 'debe ser' (ética) únicamente a partir de lo que 'es' (naturaleza). Por tanto, justificar el consumo animal porque 'los leones cazan' es un error lógico.",
    references: [
      { id: "1", citation: "Hume, D. (1739). A Treatise of Human Nature (Book III, Part I, Section I)." }
    ],
    author: { name: "David Hume", era: "1711–1776", works: ["A Treatise of Human Nature (1739)"] },
    relatedEntries: ["falacia-naturalista", "especismo"],
    relatedDilemmas: ["leones-carne"]
  },
  {
    id: "festinger",
    term: "Leon Festinger",
    patterns: ["Leon Festinger", "Festinger, L.", "Festinger"],
    type: "autor",
    category: "psicologia",
    shortDef: "Psicólogo social estadounidense (1919–1989). Teorizó la 'disonancia cognitiva' en 1957: el malestar mental que surge cuando nuestras acciones contradicen nuestras creencias, y cómo el cerebro lo resuelve alterando las creencias o justificando las acciones.",
    references: [
      { id: "1", citation: "Festinger, L. (1957). A Theory of Cognitive Dissonance. Stanford University Press." }
    ],
    author: { name: "Leon Festinger", era: "1919–1989", works: ["A Theory of Cognitive Dissonance (1957)"] },
    relatedEntries: ["disonancia-cognitiva", "paradoja-carne"],
    relatedActs: ["acto-3"]
  },
  {
    id: "loughnan",
    term: "Steve Loughnan",
    patterns: ["Steve Loughnan", "Loughnan, S.", "Loughnan"],
    type: "autor",
    category: "psicologia",
    shortDef: "Psicólogo social investigador de la 'paradoja de la carne'. Sus estudios demostraron que, antes de consumir carne, las personas rebajan subconscientemente la inteligencia atribuida al animal que van a comer para aliviar su culpa (disonancia cognitiva en acción).",
    references: [
      { id: "1", citation: "Loughnan, S., Haslam, N., & Bastian, B. (2010). The role of meat consumption in the denial of moral status and mind to meat animals. Appetite, 55(1), 156-159." }
    ],
    author: { name: "Steve Loughnan", era: "fl. 2010", works: ["The role of meat consumption in the denial of moral status (2010)"] },
    relatedEntries: ["paradoja-carne", "disonancia-cognitiva", "bastian"]
  },
  {
    id: "bastian",
    term: "Brock Bastian",
    patterns: ["Brock Bastian", "Bastian, B.", "Bastian"],
    type: "autor",
    category: "psicologia",
    shortDef: "Psicólogo social coautor con Loughnan de los estudios fundacionales de la 'paradoja de la carne'. En 'Resolving the Meat-Paradox' (2017) analizó los mecanismos motivacionales de desvinculación moral que el consumidor despliega para sostener la contradicción entre amar y comer animales.",
    references: [
      { id: "1", citation: "Bastian, B., & Loughnan, S. (2017). Resolving the Meat-Paradox: A Motivational Account of Moral Disengagement. Personality and Social Psychology Review, 21(3), 278-299." , url: "https://doi.org/10.1177/0146167217709240"}
    ],
    author: { name: "Brock Bastian", era: "fl. 2010", works: ["Resolving the Meat-Paradox (2017)"] },
    relatedEntries: ["paradoja-carne", "disonancia-cognitiva", "loughnan"]
  },
  {
    id: "donaldson-kymlicka",
    term: "Sue Donaldson & Will Kymlicka",
    patterns: ["Sue Donaldson", "Will Kymlicka", "Donaldson y Kymlicka", "Donaldson & Kymlicka"],
    type: "autor",
    category: "legal",
    shortDef: "Filósofos políticos canadienses autores de 'Zoopolis' (2011). Proponen ir más allá de los derechos negativos y otorgar derechos políticos: considerar a los animales domésticos como 'ciudadanos' con deberes y protecciones compartidas, a los salvajes como naciones soberanas y a los liminales (urbanos) como residentes.",
    references: [
      { id: "1", citation: "Donaldson, S., & Kymlicka, W. (2011). Zoopolis: A Political Theory of Animal Rights. Oxford University Press." , url: "https://www.google.com/books/edition/Zoopolis/YzSNgXr7n5oC"}
    ],
    author: { name: "Sue Donaldson & Will Kymlicka", era: "fl. 2011", works: ["Zoopolis (2011)"] },
    relatedEntries: ["obra-zoopolis", "derechos-animales", "persona-no-humana", "enfoque-capacidades"],
    relatedNodes: ["estatus-juridico", "vias-transicion"],
    relatedActs: ["acto-6"]
  },
  {
    id: "harrison",
    term: "Ruth Harrison",
    patterns: ["Ruth Harrison", "Harrison, R."],
    type: "autor",
    category: "sistemas_uso",
    shortDef: "Activista y escritora británica (1920–2000). Su libro 'Animal Machines' (1964) denunció por primera vez las condiciones de la granadería industrial intensiva y provocó tal escándalo público que el Parlamento británico encargó el Informe Brambell (1965), origen de las 'Cinco Libertades'.",
    references: [
      { id: "1", citation: "Harrison, R. (1964). Animal Machines: The New Factory Farming Industry. Vincent Stuart." , url: "https://www.google.com/books/edition/Animal_Machines/HYdtAAAAMAAJ"}
    ],
    author: { name: "Ruth Harrison", era: "1920–2000", works: ["Animal Machines (1964)"] },
    relatedEntries: ["obra-animal-machines", "informe-brambell", "cinco-libertades", "ganaderia-industrial"],
    relatedNodes: ["sistemas-alimentacion", "legislacion-bienestar"]
  },
  {
    id: "david-robinson-simon",
    term: "David Robinson Simon",
    patterns: ["David Robinson Simon", "Robinson Simon", "Simon, D. R."],
    type: "autor",
    category: "ecologia",
    shortDef: "Autor de 'Meatonomics' (2013), donde analiza cómo la industria cárnica externaliza inmensos costes ambientales, sanitarios y morales, haciendo creer al consumidor que la producción animal es 'barata' cuando su precio real lo paga la sociedad y el planeta.",
    references: [
      { id: "1", citation: "Simon, D. R. (2013). Meatonomics: How the Rigged Economics of Meat and Dairy Make You Consume Too Much. Conari Press." , url: "https://www.google.com/books/edition/Meatonomics/0M0uAAAAQBAJ"}
    ],
    author: { name: "David Robinson Simon", era: "fl. 2013", works: ["Meatonomics (2013)"] },
    relatedEntries: ["obra-meatonomics", "ganaderia-industrial", "antropoceno", "termodinamica"],
    relatedNodes: ["crisis-ambiental"],
    relatedActs: ["acto-5"]
  },

  // =====================================================================
  // IX. OBRAS
  // =====================================================================
  {
    id: "obra-liberacion-animal",
    term: "Liberación Animal (1975)",
    patterns: ["Liberación Animal", "Animal Liberation"],
    type: "obra",
    category: "etica",
    shortDef: "Libro fundamental de Peter Singer (1975) que aplicó el utilitarismo clásico al sufrimiento de los animales no humanos, popularizó el concepto de 'especismo' (acuñado por Ryder) y es considerado el fundamento filosófico del movimiento animalista moderno.",
    references: [
      { id: "1", citation: "Singer, P. (1975). Animal Liberation: A New Ethics for Our Treatment of Animals. HarperCollins." }
    ],
    relatedEntries: ["singer", "especismo", "utilitarismo", "ryder", "bentham"],
    relatedActs: ["acto-2"]
  },
  {
    id: "obra-case-animal-rights",
    term: "The Case for Animal Rights (1983)",
    patterns: ["The Case for Animal Rights", "En defensa de los derechos de los animales"],
    type: "obra",
    category: "etica",
    shortDef: "Libro de Tom Regan (1983) que fundó la teoría de los derechos animales desde una óptica deontológica. Introdujo el concepto de 'sujeto-de-una-vida' y defendió el abolicionismo frente a las reformas bienestaristas.",
    references: [
      { id: "1", citation: "Regan, T. (1983). The Case for Animal Rights. University of California Press." }
    ],
    relatedEntries: ["regan", "abolicionismo", "sujeto-de-una-vida", "deontologia"]
  },
  {
    id: "obra-sexual-politics-meat",
    term: "The Sexual Politics of Meat (1990)",
    patterns: ["The Sexual Politics of Meat", "Políticas sexuales de la carne"],
    type: "obra",
    category: "psicologia",
    shortDef: "Libro de Carol J. Adams (1990) que vinculó el ecofeminismo con el antropocentrismo y teorizó el 'referente ausente': cómo el lenguaje comercial ('carne', 'filete') oculta al animal-víctima para desensibilizar al consumidor.",
    references: [
      { id: "1", citation: "Adams, C. J. (1990). The Sexual Politics of Meat: A Feminist-Vegetarian Critical Theory. Continuum." }
    ],
    relatedEntries: ["adams", "referente-ausente", "carnismo"]
  },
  {
    id: "obra-zoopolis",
    term: "Zoopolis (2011)",
    patterns: ["Zoopolis", "Zoópolis"],
    type: "obra",
    category: "legal",
    shortDef: "Libro de Sue Donaldson y Will Kymlicka (2011) que propone una teoría política de los derechos animales: animales domésticos como 'ciudadanos', salvajes como 'naciones soberanas' y liminales como 'residentes'. Más allá de los derechos negativos.",
    references: [
      { id: "1", citation: "Donaldson, S., & Kymlicka, W. (2011). Zoopolis: A Political Theory of Animal Rights. Oxford University Press." }
    ],
    relatedEntries: ["donaldson-kymlicka", "derechos-animales", "persona-no-humana"],
    relatedActs: ["acto-6"]
  },
  {
    id: "obra-meatonomics",
    term: "Meatonomics (2013)",
    patterns: ["Meatonomics"],
    type: "obra",
    category: "ecologia",
    shortDef: "Libro de David Robinson Simon (2013) que analiza cómo la industria cárnica externaliza inmensos costes ambientales, sanitarios y morales, haciéndonos creer que la producción animal es 'barata' cuando su precio real lo paga la sociedad.",
    references: [
      { id: "1", citation: "Simon, D. R. (2013). Meatonomics. Conari Press." }
    ],
    relatedEntries: ["david-robinson-simon", "ganaderia-industrial", "antropoceno"],
    relatedActs: ["acto-5"]
  },
  {
    id: "obra-comer-animales",
    term: "Comer animales (2009)",
    patterns: ["Comer animales", "Eating Animals"],
    type: "obra",
    category: "etica",
    shortDef: "Libro de Jonathan Safran Foer (2009) que expone cómo el lenguaje culinario y el aislamiento arquitectónico de los mataderos están diseñados para desconectar al consumidor de la realidad del animal, narrando su propia transformación ética.",
    references: [
      { id: "1", citation: "Foer, J. S. (2009). Eating Animals. Little, Brown and Company." }
    ],
    relatedEntries: ["safran-foer", "referente-ausente", "disonancia-cognitiva"]
  },
  {
    id: "obra-ingenio-pajaros",
    term: "El ingenio de los pájaros (2016)",
    patterns: ["El ingenio de los pájaros", "The Genius of Birds"],
    type: "obra",
    category: "sintiencia",
    shortDef: "Libro de Jennifer Ackerman (2016) que documenta cómo aves como los cuervos de Nueva Caledonia fabrican herramientas complejas, hito cognitivo que redefinió nuestra comprensión de la inteligencia aviar.",
    references: [
      { id: "1", citation: "Ackerman, J. (2016). The Genius of Birds. Penguin Press." }
    ],
    relatedEntries: ["jennifer-ackerman", "etologia", "sintiencia"]
  },
  {
    id: "obra-discurso-metodo",
    term: "Discurso del método (1637)",
    patterns: ["Discurso del método", "Discurso del metodo"],
    type: "obra",
    category: "sintiencia",
    shortDef: "Obra de René Descartes (1637) donde, en su Parte V, defendió el mecanicismo: los animales son autómatas biológicos sin alma ni consciencia, cuyos gritos de dolor serían chirridos de engranajes. Sirvió como 'inmunización moral' para justificar la vivisección histórica.",
    references: [
      { id: "1", citation: "Descartes, R. (1637). Discurso del método (Parte V)." }
    ],
    relatedEntries: ["descartes", "mecanicismo-cartesiano", "viviseccion"]
  },
  {
    id: "obra-animal-machines",
    term: "Animal Machines (1964)",
    patterns: ["Animal Machines"],
    type: "obra",
    category: "sistemas_uso",
    shortDef: "Libro de Ruth Harrison (1964) que denunció por primera vez las condiciones de la ganadería industrial intensiva y provocó tal escándalo público que el Parlamento británico encargó el Informe Brambell (1965), origen de las 'Cinco Libertades'.",
    references: [
      { id: "1", citation: "Harrison, R. (1964). Animal Machines: The New Factory Farming Industry. Vincent Stuart." }
    ],
    relatedEntries: ["harrison", "informe-brambell", "cinco-libertades", "ganaderia-industrial"]
  },
  {
    id: "obra-frontiers-justice",
    term: "Frontiers of Justice (2006)",
    patterns: ["Frontiers of Justice", "Las fronteras de la justicia"],
    type: "obra",
    category: "etica",
    shortDef: "Libro de Martha Nussbaum (2006) que extiende el 'enfoque de las capacidades' a tres fronteras de la justicia olvidadas por Rawls: los animales no humanos, las personas con discapacidad y la justicia global. Cada ser sintiente tiene derecho a prosperar.",
    references: [
      { id: "1", citation: "Nussbaum, M. C. (2006). Frontiers of Justice: Species Membership. Harvard University Press." }
    ],
    relatedEntries: ["nussbaum", "enfoque-capacidades", "derechos-animales"]
  },
  {
    id: "obra-rattling-cage",
    term: "Rattling the Cage (2000)",
    patterns: ["Rattling the Cage", "Rattling the cage"],
    type: "obra",
    category: "legal",
    shortDef: "Libro de Steven Wise (2000) que sentó las bases jurídicas para reclamar derechos fundamentales (libertad corporal, Habeas Corpus) para grandes simios, abriendo la vía legal del reconocimiento de animales como 'personas no humanas'.",
    references: [
      { id: "1", citation: "Wise, S. M. (2000). Rattling the Cage: Toward Legal Rights for Animals. Perseus Books." }
    ],
    relatedEntries: ["steven-wise", "habeas-corpus", "persona-no-humana"],
    relatedActs: ["acto-6"]
  },

  // =====================================================================
  // IX-A. FALACIAS CLÁSICAS Y CONCEPTOS DIALÉCTICOS (nuevas)
  // =====================================================================
  {
    id: "falacia-ad-hominem",
    term: "Falacia ad hominem",
    altTerms: ["Ataque personal", "Falacia del mensajero"],
    patterns: ["ad hominem", "ataque personal", "falacia del mensajero", "Ad Hominem"],
    type: "tecnico",
    category: "psicologia",
    shortDef: "Falacia que consiste en descalificar una propuesta atacando a quien la enuncia, en lugar de evaluar el contenido del argumento.",
    longDef: "La falacia ad hominem es una estrategia argumentativa falaz que rechaza o debilita una posición centrándose en características personales, identidad o circunstancias de quien la defiende, en lugar de discutir la validez del razonamiento. En debates sobre ética animal, se manifiesta al descalificar el veganismo por motivos de clase, etnia, género o apariencia del mensajero, sin abordar los argumentos sustantivos. La psicología cognitiva la relaciona con sesgos de rechazo y mecanismos de defensa identitaria.",
    references: [
      { id: "1", citation: "Walton, D. (1998). Ad hominem arguments. University of Alabama Press." }
    ],
    relatedEntries: ["falacia", "disonancia-cognitiva"],
    relatedNodes: ["disonancia-placer", "categorizacion-sociocultural"],
    relatedDilemmas: ["r2-falacia-ad-hominem"]
  },
  {
    id: "falacia-pendiente-resbaladiza",
    term: "Falacia de pendiente resbaladiza",
    altTerms: ["Slippery slope", "Pendiente resbaladiza"],
    patterns: ["pendiente resbaladiza", "slippery slope", "efecto dominó", "cascada de prohibiciones"],
    type: "tecnico",
    category: "psicologia",
    shortDef: "Falacia que predice un encadenamiento de consecuencias extremas e inevitables a partir de una acción inicial, sin evidencia de la conexión causal entre cada paso.",
    longDef: "La falacia de pendiente resbaladiza asume que aceptar una medida (por ejemplo, regular la producción cárnica) conducirá inevitablemente a una cadena de prohibiciones (huevos, lácteos, mascotas, etc.) sin demostrar empíricamente cada eslabón. Es una técnica retórica basada en el miedo y la persuasión emocional, no en la argumentación racional. Filósofos del discurso subrayan que cada decisión política requiere su propio análisis de méritos, sin asumir conexiones necesarias entre ellas.",
    references: [
      { id: "1", citation: "Walton, D. (2017). The slippery slope argument. In Oxford Handbook of Fallacies." }
    ],
    relatedEntries: ["falacia", "falacia-ad-hominem"],
    relatedNodes: ["disonancia-placer"],
    relatedDilemmas: ["r2-falacia-pendiente-resbaladiza"]
  },
  {
    id: "falacia-composicion",
    term: "Falacia de composición",
    altTerms: ["Generalización apresurada", "Falacia de la parte por el todo"],
    patterns: ["falacia de composición", "generalización apresurada", "de uno a todos", "composición"],
    type: "tecnico",
    category: "psicologia",
    shortDef: "Falacia que atribuye las propiedades de un caso individual a todo un conjunto, o viceversa, asumiendo que lo que vale para una parte vale para el todo.",
    longDef: "La falacia de composición consiste en inferir que un enunciado aplicable a cada elemento individual es necesariamente válido para el conjunto, o que lo verdadero del todo lo es para cada parte. En el debate sobre ganadería, se manifiesta al asumir que un ganadero ejemplar hace ética a toda la industria, ignorando dinámicas sistémicas, regulaciones permisivas y mayorías estadísticas. Es un error frecuente en discursos polarizados y se combate con muestreo representativo y evidencia agregada.",
    references: [
      { id: "1", citation: "Walton, D. (2017). Fallacies. Stanford Encyclopedia of Philosophy." , url: "https://plato.stanford.edu/entries/fallacies/"}
    ],
    relatedEntries: ["falacia", "falacia-ad-hominem"],
    relatedNodes: ["disonancia-placer", "categorizacion-sociocultural"],
    relatedDilemmas: ["r2-falacia-composicion"]
  },
  {
    id: "mascotas-carnivoras",
    term: "Mascotas carnívoras (debate ético)",
    altTerms: ["Alimentación de mascotas"],
    patterns: ["mascotas carnívoras", "pienso cárnico", "alimentación mascotas", "dietas veganas mascotas"],
    type: "concepto",
    category: "sistemas_uso",
    shortDef: "Debate ético sobre la alimentación de perros y gatos con piensos cárnicos industriales y la contradicción moral que esto genera en consumidores éticos.",
    longDef: "La alimentación de mascotas carnívoras (especialmente gatos, que son carnívoros estrictos) plantea un dilema entre el bienestar del animal doméstico y la coherencia ética de su propietario. Mientras que los perros admiten dietas vegetales bien formuladas con suplementación, los gatos requieren nutrientes presentes solo en tejidos animales (taurina, ácido araquidónico, vitamina A preformada). El pienso comercial proviene en gran medida de subproductos de la ganadería industrial, perpetuando una cadena de sufrimiento que muchos propietarios intentan evitar en su dieta personal. Empresas como Meatly y Wagr han desarrollado piensos felinos a base de carne cultivada in vitro como solución tecnológica al dilema.",
    references: [
      { id: "1", citation: "Knight, A. & Leitsberger, M. (2016). A systematic review of vegan diets in dogs and cats. Veterinary Record, 179(7), 169-170." , url: "https://doi.org/10.1136/vr.103953"}
    ],
    relatedEntries: ["bienestarismo", "abolicionismo", "agricultura-celular"],
    relatedNodes: ["sistemas-alimentacion", "vias-transicion"],
    relatedDilemmas: ["r2-mascotas-carnivoras"]
  },
  {
    id: "tauromaquia",
    term: "Tauromaquia",
    altTerms: ["Corridas de toros", "Fiesta brava"],
    patterns: ["tauromaquia", "corrida de toros", "fiesta brava", "toreo", "lid"],
    type: "concepto",
    category: "sistemas_uso",
    shortDef: "Práctica cultural consistente en la lidia y muerte de toros en plazas, declarada patrimonio cultural en algunos países y prohibida en otros por motivos de bienestar animal.",
    longDef: "La tauromaquia es una práctica ritual y deportiva con siglos de tradición en España, Portugal, sur de Francia, países andinos y otras regiones hispanohablantes. Implica diversas fases (lanceo, banderillas, estoque) que producen dolor físico y estrés psicológico severo en el toro, documentados por etólogos y fisiólogos animales. Mientras España la declaró patrimonio cultural en 2013, regiones como Cataluña, Canarias y varias ciudades autónomas la han prohibido. En Latinoamérica, países como Argentina, Colombia y México mantienen la práctica con regulación variable. El debate enfrenta el relativismo cultural con valores universales de bienestar animal.",
    references: [
      { id: "1", citation: "Mariscal-Lucero, S. et al. (2020). Cognitive and emotional indicators of pain in bulls during bullfighting. Animals, 10(11), 2118." , url: "https://doi.org/10.3390/ani10112118"}
    ],
    relatedEntries: ["especismo", "bienestarismo"],
    relatedNodes: ["historia-dominacion", "legislacion-bienestar", "otras-instrumentalizaciones"],
    relatedDilemmas: ["r2-tauromaquia-patrimonio", "tradicion-no-hace-correcto"]
  },
  {
    id: "quimeras-humano-animales",
    term: "Quimeras humano-animales",
    altTerms: ["Quimeras interespecíficas", "Embrión mixto"],
    patterns: ["quimeras", "quimera humano-animal", "embrión mixto", "células madre humanas en animales"],
    type: "concepto",
    category: "sintiencia",
    shortDef: "Organismos resultantes de la introducción de células humanas en embriones animales, empleados en investigación biomédica para generar tejidos y órganos compatibles.",
    longDef: "Las quimeras humano-animales son organismos viables que contienen células de dos especies distintas, logrados mediante la inserción de células madre humanas en embriones animales en fases tempranas del desarrollo. Su objetivo principal es producir órganos trasplantables (riñones, hígados, páncreas) sin rechazo inmunológico. El debate ético se concentra en el porcentaje de células humanas admitidas en tejidos neurales: si estas migran al cerebro animal, podrían alterar la capacidad de consciencia. Marcos regulatorios como los Institutos Nacionales de Salud de EE.UU. han establecido límites al financiamiento federal, exigiendo moratorias para quimeras con contribución neural significativa.",
    references: [
      { id: "1", citation: "Aravena, M. (2025). Desafíos ético-legales de la experimentación con quimeras humano-animales. Revista de Bioética y Derecho, 31, 53-69." , url: "https://revistes.ub.edu/index.php/RBD/article/view/50112"}
    ],
    relatedEntries: ["sintiencia", "declaracion-cambridge"],
    relatedNodes: ["vias-transicion", "neuroanatomia-consciencia"],
    relatedDilemmas: ["r2-quimeras-humanas"]
  },
  {
    id: "organismos-modificados-geneticamente",
    term: "Animales modificados genéticamente",
    altTerms: ["Transgénicos", "OGM animales", "CRISPR animal"],
    patterns: ["animales transgénicos", "transgénicos", "OGM animales", "animales modificados genéticamente", "CRISPR animal"],
    type: "concepto",
    category: "sistemas_uso",
    shortDef: "Animales cuyo genoma ha sido alterado mediante técnicas de ingeniería genética (transgénesis, CRISPR) para fines de investigación, producción o biomedicina.",
    longDef: "Los animales modificados genéticamente incluyen organismos a los que se les ha insertado, eliminado o editado genes específicos. Casos representativos: ratones knockout para estudio de enfermedades humanas, salmones AquAdvantage de crecimiento acelerado para alimentación, cerdos donantes de órganos para xenotrasplantes. La edición genética puede alterar el bienestar del animal mismo (enfermedades asociadas, metabolismo anómalo, dolor crónico) y plantea dilemas sobre su estatus moral: ¿es legítimo modificar un ser vivo hasta el punto de alterar su naturaleza biológica? La constitución suiza y la legislación europea exigen evaluaciones de dignidad animal previas a la aprobación.",
    references: [
      { id: "1", citation: "Dennis, C. J. (2002). Engineering animals through transgenesis: issues and perspectives for animal welfare. ILAR Journal, 43(3), 236-239." , url: "https://doi.org/10.1093/ilar.43.3.236"}
    ],
    relatedEntries: ["sintiencia", "agricultura-celular"],
    relatedNodes: ["vias-transicion", "sistemas-alimentacion"],
    relatedDilemmas: ["r2-animales-modificados-geneticamente", "r2-quimeras-humanas"]
  },
  {
    id: "especies-invasoras",
    term: "Especies invasoras",
    altTerms: ["Especies exóticas invasoras", "Plagas introducidas"],
    patterns: ["especies invasoras", "especies exóticas", "plagas introducidas", "fauna invasora"],
    type: "concepto",
    category: "ecologia",
    shortDef: "Especies no nativas introducidas en un ecosistema, que se expanden causando daño ecológico, económico o de salud pública, y cuyo control genera dilemas éticos.",
    longDef: "Las especies invasoras son aquellas trasladadas por acción humana fuera de su área de distribución natural, donde establecen poblaciones autosostenibles y causan impactos negativos en la biodiversidad nativa. Ejemplos notables: ratas y gatos asilvestrados en islas oceánicas, ranas toro en Australia, mapaches en Europa, serpientes arbóreas en Guam. La UICN las identifica como la segunda causa de pérdida de biodiversidad global. Su control letal (cebos tóxicos, trampas, caza) choca con la ética individualista de protección animal, generando dilemas sobre si es aceptable matar individuos invasores para proteger especies nativas.",
    references: [
      { id: "1", citation: "Roy, H. E. et al. (2023). Curbing the major and growing threats from invasive alien species. Science, 380(6643), 462-467." , url: "https://doi.org/10.1126/science.adi3650"}
    ],
    relatedEntries: ["bienestarismo"],
    relatedNodes: ["crisis-ambiental", "huella-ecologica"],
    relatedDilemmas: ["r2-especies-invasoras", "r2-ecologismo-animalismo"]
  },
  {
    id: "fetos-animales-sintiencia",
    term: "Sintiencia fetal animal",
    altTerms: ["Conciencia prenatal", "Umbral de dolor fetal"],
    patterns: ["sintiencia fetal", "conciencia prenatal", "umbral de dolor fetal", "dolor fetal animal"],
    type: "concepto",
    category: "sintiencia",
    shortDef: "Capacidad de experiencia subjetiva (dolor, estrés) en embriones y fetos animales en desarrollo, cuyo umbral exacto es objeto de debate científico y ético.",
    longDef: "La sintiencia fetal animal se refiere al momento del desarrollo gestacional en que un embrión o feto puede experimentar dolor consciente, más allá de respuestas reflejas. La neurociencia comparada sitúa este umbral en fases avanzadas de la gestación, cuando se completan las conexiones corticales y talámicas. La Directiva 2010/63/UE sobre protección de animales usados en investigación exige analgesia y eutanasia humanitaria para fetos en etapas avanzadas. El debate ético se centra en cómo aplicar el principio de precaución sin paralizar la investigación biomédica necesaria.",
    references: [
      { id: "1", citation: "European Union (2010). Directive 2010/63/EU on the protection of animals used for scientific purposes." , url: "https://eur-lex.europa.eu/eli/dir/2010/63/oj"}
    ],
    relatedEntries: ["sintiencia", "nocicepcion", "declaracion-nueva-york"],
    relatedNodes: ["neurobiologia-dolor", "neuroanatomia-consciencia"],
    relatedDilemmas: ["r2-fetos-animales"]
  },

  // =====================================================================
  // X. TAXONOMÍA DIALÉCTICA (clasificaciones de Tesis)
  // =====================================================================
  {
    id: "falacia",
    term: "Falacia",
    altTerms: ["Falacia lógica", "Falacia argumentativa"],
    patterns: ["falacia", "falacias", "falacia lógica", "falacia argumentativa", "Falacia"],
    type: "tecnico",
    category: "etica",
    shortDef: "Argumento popular que parece válido pero contiene un error lógico o científico que lo invalida. En Sintiens, una tesis marcada como FALACIA ha sido refutada por la evidencia científica y/o la consistencia ética: sostenerla implica ignorar datos objetivos o caer en contradicción moral.",
    longDef: "Las falacias identificadas en la sección Tesis son justificaciones comunes que la gente repite de buena fe pero que no resisten un análisis dialéctico riguroso. Pueden ser falacias lógicas (como la falacia naturalista o de falso dilema), falacias factuales (basadas en información científica incorrecta) o falacias de distracción (desviar la atención a problemas irrelevantes). Clasificar un argumento como FALACIA no es un juicio sobre quien lo dice, sino una corrección racional y empírica.",
    keyFacts: [
      "La mayoría de las excusas populares para justificar el consumo animal caen en alguna categoría de falacia.",
      "Una falacia puede ser lógica (error de razonamiento), factual (error científico) o ambas."
    ],
    relatedEntries: ["falacia-naturalista", "especismo", "disonancia-cognitiva", "falacia-ad-hominem", "falacia-pendiente-resbaladiza", "falacia-composicion"],
    relatedDilemmas: ["leones-carne", "plantas-sienten-dolor", "caninos-dentadura", "explotacion-industrial-clima", "el-argumento-del-antropocentrismo-cartesiano", "el-argumento-del-contrato-social", "la-prioridad-humanitaria", "lo-natural-no-es-moral", "tradicion-no-hace-correcto", "r2-falacia-ad-hominem", "r2-falacia-pendiente-resbaladiza", "r2-falacia-composicion"]
  },
  {
    id: "consenso-cientifico",
    term: "Consenso Científico",
    altTerms: ["Consenso"],
    patterns: ["consenso científico", "consenso", "consensos", "Consenso científico", "Consenso"],
    type: "tecnico",
    category: "etica",
    shortDef: "Acuerdo mayoritario entre expertos independientes basado en evidencia reproducible y revisada por pares. En Sintiens, una tesis etiquetada como CONSENSO representa una posición respaldada abrumadoramente por la comunidad científica y ética contemporánea.",
    longDef: "El consenso científico no es una verdad absoluta, sino la mejor aproximación al conocimiento disponible en un momento dado. Se construye mediante la acumulación de estudios replicables, revisiones sistemáticas y acuerdos interdisciplinarios (como la Declaración de Cambridge sobre la Conciencia). En el contexto de Sintiens, los consensos marcan dónde el debate está razonablemente cerrado y la acción moral puede apoyarse en certezas compartidas.",
    keyFacts: [
      "La Declaración de Cambridge (2012) y la de Nueva York (2024) son ejemplos de consenso científico sobre sintiencia.",
      "El consenso no es inmunidad a revisión: puede refinarse con nueva evidencia."
    ],
    relatedEntries: ["declaracion-cambridge", "declaracion-nueva-york", "declaracion-montreal", "sintiencia"],
    relatedNodes: ["neuroanatomia-consciencia", "neurobiologia-dolor"],
    relatedDilemmas: ["consenso-sintiencia-animal", "consenso-b12-suplementacion", "consenso-ineficiencia-energetica", "r2-marco-legal-tfue", "r2-prohibicion-mutilaciones-granjas"]
  },
  {
    id: "escenario-gris",
    term: "Escenario Gris",
    altTerms: ["Área gris", "Zona gris"],
    patterns: ["escenario gris", "área gris", "zona gris", "area gris", "Escenario gris", "Área gris"],
    type: "tecnico",
    category: "etica",
    shortDef: "Situación donde la evidencia científica o ética aún no es concluyente, generando un debate legítimo entre posturas razonables. Requiere humildad epistémica y aplicación del principio de precaución.",
    longDef: "Los escenarios grises son los casos más fértiles del pensamiento moral porque fuerzan a reconocer que no todo está resuelto. En Sintiens, estas tesis no tienen una respuesta única correcta: diferentes marcos éticos (utilitarismo, deontología, enfoque de capacidades) pueden llegar a conclusiones distintas. La función del escenario gris no es dar una respuesta, sino enseñar a navegar la incertidumbre moral con rigor.",
    keyFacts: [
      "Los bivalvos y los insectos son los dos escenarios grises principales en el debate actual sobre sintiencia.",
      "El principio de precaución sugiere inclinarse por la opción que minimice el daño potencial cuando hay incertidumbre."
    ],
    relatedEntries: ["sintiencia", "cefalopodos", "principio-precaucion", "utilitarismo", "derechos-animales", "fetos-animales-sintiencia", "quimeras-humano-animales", "organismos-modificados-geneticamente"],
    relatedDilemmas: ["bivalvos-ostras", "comer-insectos-harinas", "sintiencia-insectos-granjas", "r2-quimeras-humanas", "r2-fetos-animales", "r2-animales-modificados-geneticamente"]
  },
  {
    id: "dilema",
    term: "Dilema",
    altTerms: ["Dilema ético"],
    patterns: ["dilema", "dilemas", "dilema ético", "Dilema", "Dilema ético"],
    type: "tecnico",
    category: "etica",
    shortDef: "Situación donde dos valores éticos legítimos entran en conflicto, y cualquier decisión implica sacrificar un principio valioso. No hay una opción 'correcta' sencilla, sino que exige ponderar matices y consecuencias.",
    longDef: "A diferencia de la falacia (refutada) o el consenso (resuelto), el dilema es un conflicto real entre principios morales igualmente respetables. En Sintiens, los dilemas suelen enfrentar el bienestar colectivo (ecosistemas, eficiencia) contra los derechos individuales (del animal sintiente). Resolverlos no es cuestión de lógica o datos, sino de qué marco ético prioriza cada cual.",
    keyFacts: [
      "El dilema 'Granja Feliz' enfrenta bienestarismo vs. derechos animales: la vaca vive bien pero muere joven.",
      "El dilema 'Dehesas' enfrenta ecocentrismo (proteger el ecosistema) vs. individualismo (derecho del animal a no ser explotado)."
    ],
    relatedEntries: ["bienestarismo", "abolicionismo", "utilitarismo", "deontologia", "enfoque-capacidades", "mascotas-carnivoras", "tauromaquia", "especies-invasoras"],
    relatedDilemmas: ["granja-feliz-ecologia", "conservacion-dehesas", "el-mito-de-la-carne-humanitaria", "bienestarismo-como-abolicionismo-fracaso", "r2-mascotas-carnivoras", "r2-ecologismo-animalismo", "r2-tauromaquia-patrimonio", "r2-especies-invasoras"]
  },
  {
    id: "dolor-vs-nocicepcion",
    term: "Dolor vs Nocicepción",
    patterns: ["dolor vs nocicepción", "dolor y nocicepción", "sufrir vs reaccionar", "dolor consciente"],
    type: "concepto",
    category: "sintiencia",
    shortDef: "Distinción clave entre el dolor (experiencia subjetiva consciente de sufrimiento) y la nocicepción (reflejo físico automático de detección de daño). Reaccionar no es sufrir.",
    longDef: "Un termostato reacciona al frío, una planta busca la luz, pero ninguno 'siente' nada. La nocicepción es el sistema de alarma automático del cuerpo que ocurre en los nervios y la médula espinal. El dolor, en cambio, es la experiencia emocional desagradable procesada en el cerebro después del reflejo. Esta distinción es fundamental para la bioética animal: demuestra que los animales no son autómatas que reaccionan, sino seres que experimentan sufrimiento real.",
    keyFacts: [
      "Los peces modulan su comportamiento al recibir analgésicos, lo que indica que no solo reaccionan, sino que sufren.",
      "La Declaración de Cambridge (2012) confirmó que los sustratos neuronales de la consciencia están presentes en todos los mamíferos, aves y otras criaturas.",
      "Crustáceos decápodos como cangrejos y langostas muestran comportamientos de evitación del dolor que van más allá del simple reflejo (Elwood & Adams, 2015)."
    ],
    relatedEntries: ["nocicepcion", "sintiencia", "declaracion-cambridge", "declaracion-nueva-york"],
    relatedNodes: ["neurobiologia-dolor"],
    relatedDilemmas: ["plantas-sienten-dolor"]
  },
  {
    id: "causalidad-sistemica",
    term: "Causalidad sistémica",
    altTerms: ["Pensamiento sistémico"],
    patterns: ["causalidad sistémica", "pensamiento sistémico", "sistema vs individuo", "causa sistémica"],
    type: "concepto",
    category: "sistemas_uso",
    shortDef: "Distinción entre un acto individual y el sistema que lo produce. No es lo mismo dejar de comer carne una vez que aceptar la lógica de toda una industria.",
    longDef: "Muchos de los problemas que Sintiens examina (deforestación, emisiones, explotación animal) no son causados por individuos aislados sino por sistemas industriales, económicos y culturales. La causalidad sistémica permite ver que cambiar un hábito personal es distinto de cambiar la estructura que lo produce. Ambos niveles importan, pero confundirlos lleva a culpar solo al consumidor o a eximirse en la inercia del sistema.",
    keyFacts: [
      "El 80% de la tierra agrícola mundial se destina a la ganadería, pero produce solo el 18% de las calorías humanas (Poore & Nemecek, 2018).",
      "Las decisiones individuales de consumo operan dentro de sistemas de subsidios, marketing y disponibilidad que las condicionan.",
      "El concepto de 'externalidad negativa' (coste no reflejado en el precio) es un ejemplo de cómo los sistemas ocultan el daño real."
    ],
    relatedEntries: ["ganaderia-industrial", "especismo"],
    relatedNodes: ["sistemas-alimentacion", "crisis-ambiental"]
  },
  {
    id: "axioma-implicito",
    term: "Axioma implícito",
    altTerms: ["Supuesto no examinado", "Premisa oculta", "Axioma no declarado"],
    patterns: ["axioma implícito", "axiomas implícitos", "supuesto no examinado", "premisa oculta", "axioma no declarado", "no examinado"],
    type: "concepto",
    category: "psicologia",
    shortDef: "Premisa que damos por cierta sin haberla examinado conscientemente y que sostiene la mayoría de nuestras decisiones y argumentos.",
    longDef: "Un axioma implícito es una creencia que opera como fundamento de nuestro razonamiento pero que nunca ha sido sometida a escrutinio. Funciona como el 'sistema operativo' de nuestros argumentos: lo usamos constantemente sin ser conscientes de que está ahí. La herramienta Sintiens IA (Decompresor de Axiomas) está diseñada precisamente para detectar estos supuestos en los argumentos del usuario y hacerlos visibles.",
    keyFacts: [
      "El término 'axioma' proviene de la lógica y las matemáticas: una proposición que se asume verdadera sin necesidad de demostración.",
      "En el contexto de Sintiens, un axioma implícito típico es 'los humanos merecen prioridad moral automática por ser humanos', que opera sin ser declarado.",
      "La deconstrucción socrática consiste precisamente en hacer explícitos estos axiomas para examinarlos a la luz de la evidencia."
    ],
    relatedEntries: ["especismo", "carnismo", "disonancia-cognitiva", "falacia-naturalista"],
    relatedNodes: ["disonancia-placer", "marcos-eticos"]
  }
];

export const GLOSSARY_BY_ID: Record<string, GlossaryEntry> = GLOSSARY_UNIFIED.reduce(
  (acc, entry) => {
    acc[entry.id] = entry;
    return acc;
  },
  {} as Record<string, GlossaryEntry>
);

export function getGlossaryEntry(id: string): GlossaryEntry | undefined {
  return GLOSSARY_BY_ID[id];
}

export const GLOSSARY_CATEGORIES: { id: GlossaryCategory; label: string; color: string }[] = [
  { id: "sintiencia", label: "Sintiencia", color: "ch1" },
  { id: "etica", label: "Ética", color: "ch4" },
  { id: "psicologia", label: "Psicología", color: "ch3" },
  { id: "sistemas_uso", label: "Sistemas de Uso", color: "ch2" },
  { id: "ecologia", label: "Ecología", color: "ch5" },
  { id: "legal", label: "Legal", color: "ch6" }
];

export const GLOSSARY_TYPES: { id: GlossaryType; label: string }[] = [
  { id: "concepto", label: "Concepto" },
  { id: "autor", label: "Autor" },
  { id: "obra", label: "Obra" },
  { id: "declaracion", label: "Declaración" },
  { id: "cita", label: "Cita" },
  { id: "tecnico", label: "Término técnico" }
];
