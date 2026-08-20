export interface DialogueOption {
  text: string;
  nextNodeId: string;
  intention: string; // Brief badge indicating the stance (e.g. "Apelar a la naturaleza", "Conceder y plantear duda")
}

export interface FallacyAlert {
  name: string;
  description: string;
  academicTerm: string;
}

export interface ScientificCitation {
  author: string;
  year: string;
  text: string;
  url?: string;
}

export interface DialogueNode {
  id: string;
  speaker: "interlocutor" | "socrates";
  text: string;
  fallacyDetected?: FallacyAlert;
  coreConceptLink?: { id: string; title: string };
  citation?: ScientificCitation;
  options?: DialogueOption[];
  isConclusion?: boolean;
  conclusionSummary?: {
    keyTakeaway: string;
    ethicalPrinciple: string;
  };
}

export interface DialogueTree {
  id: string;
  dilemmaId?: string; // Corresponds to DILEMMAS_DATA.ts ID
  title: string;
  subtitle: string;
  category: "sintiencia" | "etica" | "sistemas_uso" | "ecologia";
  initialNodeId: string;
  nodes: Record<string, DialogueNode>;
}

export const SOCRATIC_DIALOGUES: DialogueTree[] = [
  // =========================================================================
  // 1. CADENA TRÓFICA Y APELACIÓN A LA NATURALEZA
  // =========================================================================
  {
    id: "cadena-trofica",
    dilemmaId: "leones-carne",
    title: "La Cadena Trófica & Los Leones",
    subtitle: "«Los leones comen carne en la selva, por tanto es natural que los humanos hagamos lo mismo.»",
    category: "sistemas_uso",
    initialNodeId: "ct-1",
    nodes: {
      "ct-1": {
        id: "ct-1",
        speaker: "interlocutor",
        text: "Comer carne es el orden natural. En la naturaleza, los leones cazan cebras y los peces grandes se comen a los pequeños. Nosotros estamos en la cima de la cadena trófica, es pura biología.",
        fallacyDetected: {
          name: "Falacia Naturalista (Ley de Hume)",
          description: "Deducir un 'deber ser' moral a partir de lo que 'es' o sucede en el mundo biológico.",
          academicTerm: "Is-Ought Problem / Naturalistic Fallacy"
        },
        options: [
          {
            text: "Preguntar si imitamos a los animales salvajes en otras conductas.",
            nextNodeId: "ct-2",
            intention: "Prueba de consistencia moral"
          },
          {
            text: "Cuestionar si el león tiene alternativa biológica para sobrevivir.",
            nextNodeId: "ct-3",
            intention: "Diferencia entre necesidad y elección"
          }
        ]
      },
      "ct-2": {
        id: "ct-2",
        speaker: "socrates",
        text: "Interesante analogía. Los leones machos a menudo matan a los cachorros de otros machos al tomar una manada, y los animales no usan ropa ni pagan impuestos. ¿Consideras que la conducta de los animales salvajes debe ser nuestra guía para definir lo que es éticamente correcto en la sociedad humana?",
        options: [
          {
            text: "«No, claro que no imitamos todo lo que hacen los leones, solo en lo de comer.»",
            nextNodeId: "ct-4",
            intention: "Admisión de selección arbitraria"
          },
          {
            text: "«Pero ellos necesitan carne para vivir, nosotros también hemos evolucionado comiendo carne.»",
            nextNodeId: "ct-3",
            intention: "Desplazamiento a necesidad biológica"
          }
        ]
      },
      "ct-3": {
        id: "ct-3",
        speaker: "socrates",
        text: "Un león es un carnívoro estricto: su fisiología no puede sintetizar ciertos nutrientes como la taurina sin tejido animal; si no caza, muere. En cambio, las principales academias de nutrición del mundo confirman que los seres humanos podemos prosperar en todas las etapas de la vida con una dieta 100% vegetal. Si tú tienes la opción de no causar daño para estar sano, ¿qué justifica causarlo?",
        citation: {
          author: "Academy of Nutrition and Dietetics",
          year: "2016",
          text: "Las dietas vegetarianas apropiadamente planificadas, incluidas las veganas, son saludables, nutricionalmente adecuadas y pueden proporcionar beneficios para la salud en la prevención y tratamiento de ciertas enfermedades.",
          url: "https://pubmed.ncbi.nlm.nih.gov/27886704/"
        },
        options: [
          {
            text: "«Es que el león no tiene moral, pero el ser humano sí puede elegir.»",
            nextNodeId: "ct-5",
            intention: "Reconocimiento de agencia moral"
          },
          {
            text: "«Pero una granja industrial no es la selva, criamos a los animales para eso.»",
            nextNodeId: "ct-6",
            intention: "Argumento del propósito de cría"
          }
        ]
      },
      "ct-4": {
        id: "ct-4",
        speaker: "socrates",
        text: "Si descartamos el infanticidio y la violencia animal porque somos seres morales racionales, pero usamos al león exclusivamente para justificar comer animales cuando nos conviene, estamos usando un doble rasero arbitrario. Si somos agentes morales capaces de reflexionar, ¿por qué renunciar a la ética justo al sentarnos a la mesa?",
        options: [
          {
            text: "«Tienes razón: si tenemos alternativas éticas, apelar al león es una contradicción.»",
            nextNodeId: "ct-conclusion-1",
            intention: "Conclusión filosófica"
          }
        ]
      },
      "ct-5": {
        id: "ct-5",
        speaker: "socrates",
        text: "Exacto. El león no es un agente moral con capacidad de deliberación ética ni tiene supermercados repletos de legumbres. Nosotros sí somos agentes morales con libre albedrío. Tener el poder de matar no convierte el acto en moralmente justo.",
        coreConceptLink: {
          id: "agencia-moral",
          title: "Agencia Moral vs Paciencia Moral"
        },
        options: [
          {
            text: "«Comprendo: nuestra capacidad de elegir nos hace responsables de nuestras decisiones.»",
            nextNodeId: "ct-conclusion-1",
            intention: "Síntesis socrática"
          }
        ]
      },
      "ct-6": {
        id: "ct-6",
        speaker: "socrates",
        text: "Haber creado a alguien con el propósito explícito de utilizarlo o matarlo no reduce su capacidad de sentir dolor ni su deseo de vivir. Si alguien criara perros específicamente para peleas clandestinas, ¿el hecho de haberlos 'criado para eso' haría que las peleas fueran moralmente buenas?",
        options: [
          {
            text: "«No, el sufrimiento del perro sigue siendo el mismo independientemente del motivo de su cría.»",
            nextNodeId: "ct-conclusion-1",
            intention: "Consistencia de criterio sintiente"
          }
        ]
      },
      "ct-conclusion-1": {
        id: "ct-conclusion-1",
        speaker: "socrates",
        text: "Hemos alcanzado una conclusión fundamental: la naturaleza describe lo que ocurre biológicamente, pero no prescribe lo que es ético. Los humanos somos agentes morales dotados de alternativas nutricionales plenas, por lo que causar sufrimiento innecesario a seres sintientes no puede justificarse señalando a un depredador salvaje.",
        isConclusion: true,
        conclusionSummary: {
          keyTakeaway: "La apelación a los leones incurre en la Falacia Naturalista. El ser humano es un agente moral libre y capaz de alimentarse sin intermediarios de sufrimiento animal.",
          ethicalPrinciple: "Principio de no maleficencia innecesaria y asimetría de agencia moral."
        }
      }
    }
  },

  // =========================================================================
  // 2. LAS PLANTAS TAMBIÉN SIENTEN
  // =========================================================================
  {
    id: "plantas-sienten",
    dilemmaId: "plantas-sienten-dolor",
    title: "La Sensibilidad de las Plantas",
    subtitle: "«Las plantas también son seres vivos y reaccionan al daño. Comer lechuga es igual que comer pollo.»",
    category: "sintiencia",
    initialNodeId: "ps-1",
    nodes: {
      "ps-1": {
        id: "ps-1",
        speaker: "interlocutor",
        text: "Las plantas también están vivas, emiten señales químicas cuando las cortas y se comunican bajo tierra. Si te preocupa el dolor, comer una lechuga o una manzana causa el mismo sufrimiento que matar a un animal.",
        fallacyDetected: {
          name: "Falsa Equivalencia Biológica & Falacia del Nirvana",
          description: "Equiparar respuestas fisiológicas automáticas sin sistema nervioso con la experiencia consciente de dolor sintiente.",
          academicTerm: "False Equivalence / Retorsio Argumenti"
        },
        options: [
          {
            text: "Examinar la diferencia neurobiológica entre reflejo celular y sintiencia.",
            nextNodeId: "ps-2",
            intention: "Diferenciación neuroanatómica"
          },
          {
            text: "Analizar cuántas plantas consume el ganado por termodinámica.",
            nextNodeId: "ps-3",
            intention: "Reducción al absurdo termodinámica"
          }
        ]
      },
      "ps-2": {
        id: "ps-2",
        speaker: "socrates",
        text: "Un teléfono inteligente reacciona a la presión de tu dedo con luz y sonido, y una planta emite etileno al cortarla. Pero, ¿existe alguien 'dentro' experimentando esa señal? La ciencia neurobiológica demuestra que el dolor requiere nociceptores, sistema nervioso centralizado y estructuras cerebrales que procesen la valencia afectiva subjetiva. Las plantas carecen por completo de neuronas y cerebro. ¿Estás de acuerdo en que reaccionar químicamente no es lo mismo que sentir dolor subjetivo?",
        citation: {
          author: "Trends in Plant Science (Taiz et al.)",
          year: "2019",
          text: "Las plantas carecen de las estructuras necesarias para la consciencia: no tienen sistema nervioso, ni cerebro, ni necesidad evolutiva de procesar dolor consciente al ser organismos sésiles incapaces de huir.",
          url: "https://doi.org/10.1016/j.tplants.2019.05.010"
        },
        options: [
          {
            text: "«De acuerdo, biológicamente un cerdo sufre de forma consciente y una planta no.»",
            nextNodeId: "ps-4",
            intention: "Reconocimiento de la sintiencia"
          },
          {
            text: "«Incluso si no tienen cerebro, ¿y si descubrimos en el futuro que sienten de otra manera?»",
            nextNodeId: "ps-3",
            intention: "Planteamiento escéptico preventivo"
          }
        ]
      },
      "ps-3": {
        id: "ps-3",
        speaker: "socrates",
        text: "Imaginemos por un momento la hipótesis extrema de que las plantas sintieran. Para que un cerdo o una vaca produzca 1 kg de carne, debe consumir entre 6 y 16 kg de plantas y cereales debido a la pérdida termodinámica. Por tanto, comer carne destruye hasta 16 veces más plantas que comerlas directamente. Si de verdad te preocupan las plantas, ¿no sería el veganismo la dieta que minimiza tanto el sufrimiento animal como el vegetal?",
        citation: {
          author: "Science (Poore & Nemecek)",
          year: "2018",
          text: "La ganadería utiliza el 83% de la tierra agrícola mundial pero solo aporta el 18% de las calorías, destruyendo inmensas cosechas vegetales como forraje.",
          url: "https://doi.org/10.1126/science.aaq0216"
        },
        options: [
          {
            text: "«Es un punto matemático demoledor: comer plantas directamente salva tanto animales como plantas.»",
            nextNodeId: "ps-conclusion-1",
            intention: "Aceptación de la lógica trófica"
          },
          {
            text: "«Es cierto, la analogía de las plantas suele usarse como excusa para no hacer nada.»",
            nextNodeId: "ps-4",
            intention: "Deconstrucción psicológica"
          }
        ]
      },
      "ps-4": {
        id: "ps-4",
        speaker: "socrates",
        text: "Efectivamente. Cuando una persona atropella a un perro, se detiene horrorizada; cuando pisa el césped, camina con tranquilidad. Todos reconocemos instintivamente la inmensa diferencia moral entre un ser sintiente que puede sufrir pánico y una brizna vegetal sin sistema nervioso.",
        options: [
          {
            text: "«Completamente claro: el criterio ético coherente es la sintiencia, no la mera vida celular.»",
            nextNodeId: "ps-conclusion-1",
            intention: "Consolidación de la sintiencia"
          }
        ]
      },
      "ps-conclusion-1": {
        id: "ps-conclusion-1",
        speaker: "socrates",
        text: "Hemos establecido con solidez científica y lógica que las plantas son vivas pero no sintientes. Además, incluso bajo cualquier duda, la dieta vegetal reduce drásticamente la cantidad total de cosechas agrícolas necesarias al eliminar el derroche forrajero de la ganadería.",
        isConclusion: true,
        conclusionSummary: {
          keyTakeaway: "La sintiencia requiere sistema nervioso y cerebro centralizado. Comer vegetales directamente minimiza tanto el sufrimiento de animales conscientes como el consumo total de biomasa vegetal.",
          ethicalPrinciple: "La sintiencia (capacidad de tener experiencias subjetivas positivas o negativas) es el único umbral racional para la consideración moral."
        }
      }
    }
  },

  // =========================================================================
  // 3. NECESIDAD NUTRICIONAL Y SALUD
  // =========================================================================
  {
    id: "nutricion-necesidad",
    title: "La Necesidad Nutricional & Salud",
    subtitle: "«Necesitamos comer carne, huevos y lácteos para obtener proteínas de calidad, B12 y hierro.»",
    category: "sistemas_uso",
    initialNodeId: "nut-1",
    nodes: {
      "nut-1": {
        id: "nut-1",
        speaker: "interlocutor",
        text: "La carne es fundamental para la salud. Sin ella sufriríamos anemia, falta de aminoácidos esenciales y déficit de vitamina B12. Ser vegano es antinatural y peligroso para el cuerpo humano.",
        fallacyDetected: {
          name: "Desinformación Nutricional & Falacia de Falso Dilema",
          description: "Asumir que los nutrientes proceden exclusivamente del tejido animal y que no existen fuentes alternativas saludables.",
          academicTerm: "False Dilemma / Nutritional Myth"
        },
        options: [
          {
            text: "Consultar el consenso oficial de las mayores organizaciones de nutricionistas del mundo.",
            nextNodeId: "nut-2",
            intention: "Evidencia de consenso científico"
          },
          {
            text: "Explicar el verdadero origen biológico de la vitamina B12 y las proteínas.",
            nextNodeId: "nut-3",
            intention: "Deconstrucción bioquímica"
          }
        ]
      },
      "nut-2": {
        id: "nut-2",
        speaker: "socrates",
        text: "La mayor asociación de profesionales de la nutrición del planeta (la Academia de Nutrición y Dietética de EE.UU., con más de 100.000 dietistas), así como la Asociación Dietética Británica y la Escuela de Salud Pública de Harvard, afirman que las dietas 100% vegetales bien planificadas son nutricionalmente completas, seguras y previenen enfermedades cardiovasculares y diabetes tipo 2. Si las máximas autoridades médicas lo avalan, ¿por qué dudar de su viabilidad?",
        citation: {
          author: "Harvard T.H. Chan School of Public Health",
          year: "2021",
          text: "Un cambio hacia patrones dietéticos ricos en alimentos vegetales integrales se asocia consistentemente con un menor riesgo de mortalidad general, cardiopatía isquémica y ciertos tipos de cáncer.",
          url: "https://www.hsph.harvard.edu/nutritionsource/what-should-you-eat/protein/"
        },
        options: [
          {
            text: "«¿Pero de dónde sacan los veganos la proteína completa si las plantas no tienen todos los aminoácidos?»",
            nextNodeId: "nut-4",
            intention: "Duda sobre el perfil aminoacídico"
          },
          {
            text: "«¿Y la vitamina B12? Si hay que suplementarla, ¿no demuestra que es una dieta deficiente?»",
            nextNodeId: "nut-3",
            intention: "Objeción de la B12"
          }
        ]
      },
      "nut-3": {
        id: "nut-3",
        speaker: "socrates",
        text: "La vitamina B12 no la producen ni los animales ni las plantas: la sintetizan bacterias que habitan en el suelo y el agua natural. En la ganadería industrial moderna, los animales no pastan en suelos silvestres, por lo que a ellos mismos se les suministran suplementos de B12 en el pienso. Tomar una pastilla de B12 directamente de origen bacteriano es simplemente saltarse el intermediario animal contaminante y cruel. ¿Tiene sentido sacrificar a un animal solo para usarlo como filtro de una vitamina bacteriana?",
        options: [
          {
            text: "«Tiene todo el sentido: tomar la B12 directamente es más limpio y ético.»",
            nextNodeId: "nut-5",
            intention: "Aceptación del origen de la B12"
          }
        ]
      },
      "nut-4": {
        id: "nut-4",
        speaker: "socrates",
        text: "Ese es un mito desmentido hace décadas: alimentos como la soja (tofu, tempeh), el garbanzo, la quinoa, las semillas de cáñamo y los pistachos contienen todos los aminoácidos esenciales en proporciones óptimas. Además, combinar legumbres con cereales a lo largo del día proporciona un perfil proteico perfecto sin el colesterol ni las grasas saturadas de la carne.",
        options: [
          {
            text: "«Entonces, si podemos estar perfectamente sanos con plantas, matar animales es una elección de placer, no de necesidad.»",
            nextNodeId: "nut-conclusion-1",
            intention: "Deducción ética final"
          }
        ]
      },
      "nut-5": {
        id: "nut-5",
        speaker: "socrates",
        text: "Exacto. Suplementar la B12, al igual que yodar la sal o enriquecer las harinas con ácido fólico, es un triunfo de la biotecnología preventiva que nos permite vivir vidas plenas sin arrebatar la vida a otros seres sintientes.",
        options: [
          {
            text: "«Queda claro: la nutrición vegetal no solo es viable, sino beneficiosa.»",
            nextNodeId: "nut-conclusion-1",
            intention: "Consolidación"
          }
        ]
      },
      "nut-conclusion-1": {
        id: "nut-conclusion-1",
        speaker: "socrates",
        text: "El consenso científico y bioquímico es unánime: el consumo de productos animales no es una necesidad biológica humana. Comer animales es una preferencia de sabor o hábito cultural. Al desaparecer la justificación de la necesidad vital, el daño causado a los animales pierde cualquier coartada ética.",
        isConclusion: true,
        conclusionSummary: {
          keyTakeaway: "Las dietas 100% vegetales bien planificadas son aptas para todas las etapas de la vida según las máximas academias de salud mundiales. La B12 es de origen bacteriano y la proteína vegetal es completa.",
          ethicalPrinciple: "Cuando no existe necesidad biológica de dañar para subsistir, continuar haciéndolo por placer gastronómico constituye una agresión moralmente injustificable."
        }
      }
    }
  },

  // =========================================================================
  // 4. TRADICIÓN Y CULTURA
  // =========================================================================
  {
    id: "tradicion-cultura",
    title: "La Tradición, la Cultura & la Historia",
    subtitle: "«Comer carne, jamón o celebrar fiestas con animales es parte de nuestra tradición cultural de siglos.»",
    category: "etica",
    initialNodeId: "tr-1",
    nodes: {
      "tr-1": {
        id: "tr-1",
        speaker: "interlocutor",
        text: "Mis abuelos comían carne, nuestra gastronomía típica se basa en productos animales y forma parte de nuestra identidad cultural. Las tradiciones deben respetarse, no podemos borrarlas por modas actuales.",
        fallacyDetected: {
          name: "Apelación a la Tradición (Argumentum ad Antiquitatem)",
          description: "Asumir que una práctica es moralmente correcta o justa únicamente porque se ha realizado durante mucho tiempo.",
          academicTerm: "Appeal to Tradition / Fallacy of History"
        },
        options: [
          {
            text: "Preguntar si la antigüedad de una práctica garantiza su bondad moral.",
            nextNodeId: "tr-2",
            intention: "Prueba de validez del criterio histórico"
          },
          {
            text: "Analizar cómo evolucionan las tradiciones culinarias sin perder la identidad.",
            nextNodeId: "tr-3",
            intention: "Evolución cultural positiva"
          }
        ]
      },
      "tr-2": {
        id: "tr-2",
        speaker: "socrates",
        text: "A lo largo de la historia de la humanidad han existido tradiciones milenarias como la esclavitud, la negación del voto a las mujeres o los sacrificios rituales. Si la antigüedad de una costumbre bastara para justificarla moralmente, nunca habríamos abolido ninguna injusticia. ¿Estás de acuerdo en que una práctica puede ser tradicional y al mismo tiempo éticamente inaceptable?",
        options: [
          {
            text: "«Sí, es evidente que el paso del tiempo no convierte una injusticia en algo bueno.»",
            nextNodeId: "tr-4",
            intention: "Descalificación de la tradición como axioma moral"
          },
          {
            text: "«Pero la gastronomía une a las familias, es diferente a la esclavitud.»",
            nextNodeId: "tr-3",
            intention: "Diferenciación por valor emocional"
          }
        ]
      },
      "tr-3": {
        id: "tr-3",
        speaker: "socrates",
        text: "Lo que une a una familia en torno a una mesa es el afecto, la reunión, los aromas y la compañía, no el sufrimiento de la víctima en el plato. Hoy en día podemos recrear recetas tradicionales —guisos, paellas, pastas, asados— utilizando alternativas 100% vegetales que conservan los sabores y especias sin derramar una sola gota de sangre. ¿No es hermoso celebrar la vida sin exigir la muerte de nadie?",
        options: [
          {
            text: "«Cierto: podemos mantener el valor cultural y gastronómico renovando los ingredientes.»",
            nextNodeId: "tr-conclusion-1",
            intention: "Evolución ética de la cultura"
          }
        ]
      },
      "tr-4": {
        id: "tr-4",
        speaker: "socrates",
        text: "Exacto. La cultura no es una piedra inmutable, sino un río en constante evolución. Las mejores sociedades son aquellas que tienen la valentía de conservar lo bello de su arte y descartar la crueldad que antes daban por normal.",
        options: [
          {
            text: "«La verdadera cultura progresa cuando amplía su círculo de empatía.»",
            nextNodeId: "tr-conclusion-1",
            intention: "Conclusión"
          }
        ]
      },
      "tr-conclusion-1": {
        id: "tr-conclusion-1",
        speaker: "socrates",
        text: "La apelación a la tradición confunde lo habitual con lo moral. Una costumbre centenaria no posee blindaje ético frente al dolor que inflige. El progreso moral consiste en depurar nuestras tradiciones para que reflejen nuestros valores más elevados de compasión y justicia.",
        isConclusion: true,
        conclusionSummary: {
          keyTakeaway: "La antigüedad de una conducta nunca justifica el daño a víctimas sintientes. La cultura evoluciona reemplazando la violencia por alternativas éticas.",
          ethicalPrinciple: "El progreso ético exige revisar críticamente las inercias históricas y subordinar la costumbre al respeto por la vida sintiente."
        }
      }
    }
  },

  // =========================================================================
  // 5. INTELIGENCIA Y CASOS MARGINALES
  // =========================================================================
  {
    id: "casos-marginales-inteligencia",
    dilemmaId: "casos-marginales",
    title: "Inteligencia & Casos Marginales",
    subtitle: "«Los animales no tienen la inteligencia de los humanos ni pueden razonar sobre el bien y el mal.»",
    category: "etica",
    initialNodeId: "cm-1",
    nodes: {
      "cm-1": {
        id: "cm-1",
        speaker: "interlocutor",
        text: "Los humanos somos superiores porque tenemos lenguaje abstracto, matemáticas, filosofía y tecnología. Un cerdo o una vaca no comprenden la democracia ni pueden crear arte, por tanto no merecen los mismos derechos a no ser comidos.",
        fallacyDetected: {
          name: "Argumento de la Inteligencia (Inconsistencia de Casos Marginales)",
          description: "Condicionar el derecho a no ser dañado o matado al nivel de inteligencia o capacidad cognitiva.",
          academicTerm: "Argument from Marginal Cases / Speciesist Bias"
        },
        options: [
          {
            text: "Aplicar la prueba lógica a los seres humanos con menor capacidad cognitiva.",
            nextNodeId: "cm-2",
            intention: "Prueba socrática de consistencia"
          },
          {
            text: "Recordar la célebre distinción de Jeremy Bentham sobre el sufrimiento.",
            nextNodeId: "cm-3",
            intention: "Criterio de sintiencia de Bentham"
          }
        ]
      },
      "cm-2": {
        id: "cm-2",
        speaker: "socrates",
        text: "Examinemos esa premisa: si el nivel de inteligencia determina el valor moral de una vida, ¿significaría eso que los humanos más inteligentes tienen derecho a usar o dañar a humanos con menor coeficiente intelectual? ¿Y qué ocurre con los bebés humanos o personas con discapacidades cognitivas severas que no pueden razonar abstractamente? ¿Sería ético experimentar con ellos o comerlos?",
        citation: {
          author: "Tom Regan (The Case for Animal Rights)",
          year: "1983",
          text: "Si los derechos derivaran de la racionalidad o la inteligencia, los seres humanos con diversidad funcional cognitiva severa quedarían desprotegidos. Es la sintiencia —ser el sujeto-de-una-vida— lo que confiere valor inherente.",
          url: "https://en.wikipedia.org/wiki/The_Case_for_Animal_Rights"
        },
        options: [
          {
            text: "«¡Por supuesto que no! A los bebés y personas vulnerables se les protege precisamente por su fragilidad.»",
            nextNodeId: "cm-4",
            intention: "Reconocimiento de la inconsistencia"
          },
          {
            text: "«Pero ellos son de nuestra especie biológica humana, los animales no.»",
            nextNodeId: "cm-5",
            intention: "Retorno al especismo puro"
          }
        ]
      },
      "cm-3": {
        id: "cm-3",
        speaker: "socrates",
        text: "Como escribió Jeremy Bentham en 1789: 'La pregunta no es ¿pueden razonar?, ni ¿pueden hablar?, sino ¿pueden sufrir?'. Un perro o un cerdo tal vez no resuelvan ecuaciones de cálculo diferencial, pero sienten el mismo terror ante la muerte, el mismo dolor físico y la misma alegría de vivir que nosotros. ¿Por qué la inteligencia debería ser el pase de entrada para no ser torturado?",
        citation: {
          author: "Jeremy Bentham (Principles of Morals and Legislation)",
          year: "1789",
          text: "Un caballo o un perro adultos son incomparablemente más racionales y sociables que un bebé humano de un día o un mes. Pero supongamos que fuera de otro modo: la cuestión no es ¿pueden razonar?, sino ¿pueden sufrir?",
          url: "https://en.wikipedia.org/wiki/An_Introduction_to_the_Principles_of_Morals_and_Legislation"
        },
        options: [
          {
            text: "«Comprendo: el sufrimiento es lo que importa, no la capacidad intelectual.»",
            nextNodeId: "cm-conclusion-1",
            intention: "Alineación moral"
          }
        ]
      },
      "cm-4": {
        id: "cm-4",
        speaker: "socrates",
        text: "Exacto. Si proteges a un bebé o a una persona con discapacidad cognitiva porque 'siente dolor y tiene una vida que perder', has demostrado que la inteligencia no es tu verdadero criterio moral: es la capacidad de sentir (la sintiencia). Y esa misma capacidad la comparten plenamente las vacas, cerdos, pollos y corderos.",
        options: [
          {
            text: "«La lógica es irrefutable: la sintiencia es el único criterio universal justo.»",
            nextNodeId: "cm-conclusion-1",
            intention: "Conclusión de casos marginales"
          }
        ]
      },
      "cm-5": {
        id: "cm-5",
        speaker: "socrates",
        text: "Usar la pertenencia a una especie biológica como único justificante para causar daño es idéntico a usar la raza o el sexo: es discriminar a alguien por una característica biológica arbitraria en lugar de por su capacidad de sufrir. Es la definición exacta de 'especismo'.",
        options: [
          {
            text: "«Veo la analogía: la especie no puede justificar el maltrato hacia quien tiene capacidad de sufrir.»",
            nextNodeId: "cm-conclusion-1",
            intention: "Desmontaje del especismo"
          }
        ]
      },
      "cm-conclusion-1": {
        id: "cm-conclusion-1",
        speaker: "socrates",
        text: "El argumento de los casos marginales demuestra que condicionar la consideración moral a la inteligencia es contradictorio. El dolor no duele menos porque quien lo experimente no sepa leer; la sintiencia es el único fundamento coherente para el respeto moral.",
        isConclusion: true,
        conclusionSummary: {
          keyTakeaway: "La inteligencia no dicta el derecho a no sufrir. De ser así, los humanos vulnerables quedarían desprotegidos. La sintiencia es el criterio moral objetivo universal.",
          ethicalPrinciple: "Principio de igual consideración de intereses semejantes (Singer, Bentham, Regan)."
        }
      }
    }
  },

  // =========================================================================
  // 6. EL IMPACTO INDIVIDUAL
  // =========================================================================
  {
    id: "impacto-individual",
    title: "El Impacto Individual & la Acción Colectiva",
    subtitle: "«Que yo deje de comer carne no va a cerrar los mataderos ni va a salvar el planeta.»",
    category: "ecologia",
    initialNodeId: "ii-1",
    nodes: {
      "ii-1": {
        id: "ii-1",
        speaker: "interlocutor",
        text: "La industria ganadera es gigantesca y mueve miles de millones. Que yo pida una ensalada en lugar de una hamburguesa no va a evitar que sacrifiquen al animal: la carne ya está en el supermercado y si no la compro yo, se tirará a la basura.",
        fallacyDetected: {
          name: "Falacia de la Inutilidad / Difusión de Responsabilidad",
          description: "Creer que la acción individual no tiene efecto causal sobre las cadenas de suministro y la demanda agregada de mercado.",
          academicTerm: "Fallacy of Inefficacy / Collective Action Problem"
        },
        options: [
          {
            text: "Explicar la ley económica de oferta y demanda en las cadenas de distribución.",
            nextNodeId: "ii-2",
            intention: "Mecanismo económico de inventario"
          },
          {
            text: "Calcular el número concreto de animales y recursos salvados por una persona.",
            nextNodeId: "ii-3",
            intention: "Evidencia de impacto medible"
          }
        ]
      },
      "ii-2": {
        id: "ii-2",
        speaker: "socrates",
        text: "Los supermercados y mataderos no operan por azar: utilizan algoritmos hiper-optimizados de gestión de existencias. Cada compra es un voto económico directo. Cuando 100 personas dejan de comprar carne, los pedidos a la distribuidora caen, y la granja reduce el número de animales inseminados en el siguiente ciclo reproductivo. La oferta siempre sigue a la demanda.",
        citation: {
          author: "Oxford University (Harwatt et al.)",
          year: "2019",
          text: "El comportamiento agregado de los consumidores en las últimas dos décadas ha forzado a las mayores multinacionales cárnicas a abrir líneas de producción vegetal a gran escala para compensar la caída de demanda.",
          url: "https://www.ox.ac.uk/news/2019-10-02-plant-based-diets-key-tackling-climate-crisis"
        },
        options: [
          {
            text: "«¿Pero realmente una sola persona salva vidas en su tiempo de vida?»",
            nextNodeId: "ii-3",
            intention: "Pregunta sobre el impacto unitario"
          }
        ]
      },
      "ii-3": {
        id: "ii-3",
        speaker: "socrates",
        text: "Las estadísticas son asombrosas: en España, una persona promedio consume a lo largo de su vida más de 1.500 animales terrestres y miles de peces marinos, además de millones de litros de agua virtual. Al adoptar una dieta vegetal, evitas literalmente la cría y muerte de cientos de seres sintientes y liberas miles de metros cuadrados de bosque. ¿Llamarías a eso 'no cambiar nada'?",
        options: [
          {
            text: "«1.500 animales por persona es una cifra enorme. No era consciente de la magnitud.»",
            nextNodeId: "ii-4",
            intention: "Toma de conciencia cuantitativa"
          }
        ]
      },
      "ii-4": {
        id: "ii-4",
        speaker: "socrates",
        text: "Además, las grandes transformaciones éticas de la historia —la abolición de la esclavitud, el sufragio femenino, los derechos civiles— comenzaron siempre cuando individuos aislados decidieron alinear sus acciones cotidianas con su conciencia, inspirando a quienes les rodeaban. La ética es coherencia personal, no oportunismo de masas.",
        options: [
          {
            text: "«Comprendo: cada decisión cuenta ética y económicamente.»",
            nextNodeId: "ii-conclusion-1",
            intention: "Síntesis"
          }
        ]
      },
      "ii-conclusion-1": {
        id: "ii-conclusion-1",
        speaker: "socrates",
        text: "Cada persona salva cientos de vidas conscientes y reduce drásticamente la huella ecológica a lo largo de su existencia. No necesitamos que una persona lo haga perfecto, necesitamos que millones de personas elijan la compasión en cada comida.",
        isConclusion: true,
        conclusionSummary: {
          keyTakeaway: "La economía de mercado responde directamente a la demanda agregada. Una persona salva miles de vidas de animales y millones de litros de agua en su vida.",
          ethicalPrinciple: "Responsabilidad ética individual e imperativo categórico kantiano: actúa según aquella máxima que puedas desear que se convierta en ley universal."
        }
      }
    }
  }
];
