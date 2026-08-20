import type { ReferenceDetail } from "../types";

export interface ConstitutionalDilemma {
  id: string;
  category: string;
  title: string;
  question: string;
  context: string;
  options: {
    id: "industrial" | "welfare" | "rights";
    label: string;
    description: string;
    impactSummary: string;
  }[];
  affectedSpeciesIds: string[];
}

export interface SpecimenProfile {
  id: string;
  commonName: string;
  scientificName: string;
  category: "ave" | "pez" | "mamifero" | "humano";
  demographicWeight: number; // Porcentaje global real sobre total de seres sintientes que nacen al año
  annualCountDescription: string;
  naturalLifespan: string;
  actualLifespan: string;
  lifespanLossPercentage: number;
  spaceAssigned: string;
  spaceAssignedMetric: string;
  sensoryEnvironment: string;
  standardInterventions: string[];
  endOfLife: string;
  cognitiveProfile: string;
  consequencesByChoice: Record<string, {
    lawId: string;
    lawTitle: string;
    status: "suffering_allowed" | "partially_regulated" | "protected";
    detail: string;
  }>;
  humanDetails?: {
    incomePercentile: string;
    region: string;
    vulnerability: string;
    footprintPerYear: string;
  };
  references: ReferenceDetail[];
}

export const CONSTITUTIONAL_DILEMMAS: ConstitutionalDilemma[] = [
  {
    id: "confinement",
    category: "Espacio y Movilidad",
    title: "Densidad y Confinamiento Físico",
    question: "¿Qué grado de restricción de movimiento corporal consideras legítimo imponer a un individuo sintiente para abaratar los costes de producción de alimentos?",
    context: "El hacinamiento intensivo reduce el coste por metro cuadrado de nave industrial pero impide conductas biológicas básicas como caminar, aletear o formar jerarquías naturales.",
    options: [
      {
        id: "industrial",
        label: "Máxima Densidad de Producción",
        description: "Permitir densidades de hasta 18-22 individuos/m² o jaulas individuales sin espacio de giro para maximizar el rendimiento económico.",
        impactSummary: "Precios de carne un 40% más bajos. Inmovilidad forzada y estrés crónico para el 95% de los animales de granja.",
      },
      {
        id: "welfare",
        label: "Regulación Bienestarista Mínima",
        description: "Garantizar espacio mínimo de expansión de alas/extremidades (aprox. 12-14 individuos/m²), prohibiendo jaulas individuales extremas.",
        impactSummary: "Costes un 20-30% superiores. Reducción parcial del estrés, pero persistencia de patologías asociadas al confinamiento en naves cerradas.",
      },
      {
        id: "rights",
        label: "Inviolabilidad del Espacio Biológico",
        description: "Prohibición total del confinamiento artificial. Ningún individuo sintiente puede ser privado de su hábitat natural o espacio libre de movimiento.",
        impactSummary: "Incompatibilidad total con la ganadería industrial. Transición obligatoria hacia sistemas 100% vegetales.",
      },
    ],
    affectedSpeciesIds: ["broiler", "laying_hen", "pig", "farmed_fish", "dairy_cow"],
  },
  {
    id: "genetics",
    category: "Selección Genética",
    title: "Cría Selectiva y Crecimiento Forzado",
    question: "¿Debe permitirse la alteración genética que maximiza el tejido muscular a costa del sufrimiento metabólico y óseo del individuo?",
    context: "El pollo broíler actual alcanza 2.5 kg en 42 días (un 400% más rápido que en 1957), provocando que su esqueleto inmaduro colapse bajo el peso de sus pechugas hipertrofiadas.",
    options: [
      {
        id: "industrial",
        label: "Optimización Genética Máxima",
        description: "Autorizar cualquier selección artificial que reduzca el índice de conversión de pienso a carne, independientemente de las patologías crónicas generadas.",
        impactSummary: "Ciclos de engorde ultrarrápidos (42 días). Dolor musculoesquelético crónico y fallos cardiopulmonares sistemáticos.",
      },
      {
        id: "welfare",
        label: "Líneas de Crecimiento Lento",
        description: "Limitar la tasa de crecimiento a estirpes de crecimiento medio (56-80 días) con menor incidencia de fallo orgánico.",
        impactSummary: "Mayor gasto en forraje e impacto de huella ambiental un 15% superior por animal. Disminución de cojeras agudas.",
      },
      {
        id: "rights",
        label: "Integridad Genómica y Corporal",
        description: "Prohibir la instrumentalización del genoma de seres sintientes como fábricas biológicas de tejido proteico.",
        impactSummary: "Fin de las líneas genéticas artificiales dependientes de fármacos para sobrevivir.",
      },
    ],
    affectedSpeciesIds: ["broiler", "pig", "dairy_cow"],
  },
  {
    id: "mutilations",
    category: "Mutilaciones y Manejo",
    title: "Mutilaciones Corporales Preventivas",
    question: "¿Debe autorizarse la amputación de partes del cuerpo (rabos, picos, testículos, cuernos) sin anestesia para evitar que el hacinamiento derive en canibalismo o agresión?",
    context: "Debido a la densidad y el aburrimiento ambiental, cerdos y aves recurren al picaje y mordedura de colas. La industria extirpa rutinariamente estos tejidos nerviosos.",
    options: [
      {
        id: "industrial",
        label: "Mutilación Rutinaria por Manejo",
        description: "Permitir corte de cola, corte de pico por infrarrojos y castración quirúrgica sin anestesia en los primeros días de vida.",
        impactSummary: "Costes operativos mínimos. Formación de neuromas dolorosos de por vida en las terminaciones nerviosas seccionadas.",
      },
      {
        id: "welfare",
        label: "Mutilación Solo con Analgesia y Justificación",
        description: "Exigir analgésicos/anestésicos y enriquecimiento ambiental previo obligatorio antes de cualquier intervención quirúrgica.",
        impactSummary: "Mayor coste veterinario. Dolor postoperatorio atenuado pero persistencia de secuelas funcionales.",
      },
      {
        id: "rights",
        label: "Inviolabilidad de la Integridad Física",
        description: "Prohibición absoluta de amputar partes corporales sanas por conveniencia de alojamiento o manejo económico.",
        impactSummary: "Obliga a rediseñar o erradicar los sistemas de confinamiento donde el canibalismo por estrés aparece.",
      },
    ],
    affectedSpeciesIds: ["pig", "laying_hen", "dairy_cow"],
  },
  {
    id: "separation",
    category: "Familia y Sociabilidad",
    title: "Separación Materno-Filial",
    question: "¿Es éticamente admisible separar de inmediato a una madre de su cría recién nacida para recolectar su leche o criar al recién nacido para carne?",
    context: "En la industria láctea, el ternero es separado de la vaca en las primeras 24-48 horas de vida para evitar que consuma la leche comercializable, alojándose en boxes individuales.",
    options: [
      {
        id: "industrial",
        label: "Separación Inmediata (0-24h)",
        description: "Permitir la retirada inmediata del neonato para maximizar el ordeño comercial y controlar la curva de lactancia.",
        impactSummary: "Máxima producción láctea. Angustia vocal, estrés hormonal por separación y privación de amamantamiento natural.",
      },
      {
        id: "welfare",
        label: "Alojamiento en Parejas con Contacto Parcial",
        description: "Permitir que la cría permanezca algunos días y se aloje en pequeños grupos tras el destete temprano con leche sustitutiva.",
        impactSummary: "Menor aislamiento social pero estrés persistente por ruptura prematura del vínculo madre-cría.",
      },
      {
        id: "rights",
        label: "Respeto a los Vínculos Filiales y Lactancia",
        description: "Prohibición de separar forzadamente a madres y crías. La leche pertenece biológicamente a la cría para su desarrollo.",
        impactSummary: "Incompatibilidad con el modelo de producción láctea comercial masiva.",
      },
    ],
    affectedSpeciesIds: ["dairy_cow", "pig"],
  },
  {
    id: "slaughter",
    category: "Fin de Vida",
    title: "Soberanía sobre la Vida y Sacrificio",
    question: "¿Debe la ley proteger la vida de un individuo sintiente contra la muerte provocada cuando este aún goza de salud biológica?",
    context: "Los animales criados para consumo son sacrificados a una fracción mínima de su vida natural (los broílers a las 6 semanas de 8 años; los cerdos a los 6 meses de 15 años).",
    options: [
      {
        id: "industrial",
        label: "Propiedad y Destino Comercial",
        description: "Los animales no humanos son propiedad jurídica; su vida puede ser terminada en cualquier momento mediante métodos de matadero autorizados.",
        impactSummary: "Disponibilidad continua de proteína animal barata. Muerte sistemática de más de 80.000 millones de animales terrestres al año.",
      },
      {
        id: "welfare",
        label: "Sacrificio con Aturdimiento Obligatorio",
        description: "Garantizar aturdimiento reversible o irreversible previo a la sangría (gas, electrocución o perno cautivo) para mitigar el pánico.",
        impactSummary: "Reducción del tiempo de agonía consciente, aunque con fallos de aturdimiento en un porcentaje estadístico de líneas rápidas.",
      },
      {
        id: "rights",
        label: "Derecho Inalienable a la Vida",
        description: "Reconocimiento del interés intrínseco de todo ser sintiente a continuar viviendo. Prohibición del homicidio interespecífico.",
        impactSummary: "Fin legal del sacrificio forzado por motivos económicos o gastronómicos.",
      },
    ],
    affectedSpeciesIds: ["broiler", "farmed_fish", "pig", "laying_hen", "dairy_cow", "human"],
  },
];

export const SPECIMEN_PROFILES: SpecimenProfile[] = [
  {
    id: "farmed_fish",
    commonName: "Pez de Piscifactoría / Captura Marina",
    scientificName: "Salmo salar / Sparus aurata / Trachurus",
    category: "pez",
    demographicWeight: 82.5, // ~1 a 2.7 billones frente a ~80 mil millones terrestres
    annualCountDescription: "Entre 1.000.000.000.000 y 2.700.000.000.000 individuos al año",
    naturalLifespan: "6 - 15 años",
    actualLifespan: "1 - 2 años (o minutos tras captura)",
    lifespanLossPercentage: 85,
    spaceAssigned: "Densidad de jaula marina: hasta 25-40 kg de biomasa de peces por m³ de agua",
    spaceAssignedMetric: "Equivalente a un pez por el volumen de una bañera pequeña compartida con decenas de congéneres infestados de piojos de mar.",
    sensoryEnvironment: "Agua saturada de heces, antibióticos y alimento concentrado; abrasión constante contra redes sintéticas.",
    standardInterventions: [
      "Vacunación masiva manual o mecanizada",
      "Tratamientos químicos para piojos de mar y hongos branquiales",
      "Hambre forzada previa al sacrificio (hasta 2 semanas sin alimento)",
    ],
    endOfLife: "Asfixia lenta fuera del agua (hasta 60 minutos de consciencia), descompresión o corte branquial sin aturdimiento efectivo.",
    cognitiveProfile: "Nocicepción demostrada (Lynne Sneddon), memoria espacial a largo plazo, uso de herramientas en lábridos y transmisión social de aprendizaje.",
    consequencesByChoice: {
      confinement: {
        lawId: "confinement",
        lawTitle: "Densidad y Confinamiento",
        status: "suffering_allowed",
        detail: "Tus leyes permitieron densidades extremas. Vivirás en constante roce con otros peces sufriendo erosión de aletas y cataratas.",
      },
      slaughter: {
        lawId: "slaughter",
        lawTitle: "Soberanía sobre la Vida",
        status: "suffering_allowed",
        detail: "Morirás por asfixia agónica en hielo picado al considerarse tu vida una mercancía.",
      },
    },
    references: [
      {
        id: "1",
        citation: "Sneddon, L. U. (2015). Pain in aquatic animals. Journal of Experimental Biology, 218(7), 967-976.",
        url: "https://doi.org/10.1242/jeb.088823",
      },
      {
        id: "2",
        citation: "Mood, A., & Brooke, P. (2019). Estimating global numbers of fishes caught from the wild each year. Fishcount.org.uk.",
        url: "http://fishcount.org.uk/",
      },
    ],
  },
  {
    id: "broiler",
    commonName: "Pollo Broíler de Engorde Rápido",
    scientificName: "Gallus gallus domesticus (Línea Ross 308 / Cobb 500)",
    category: "ave",
    demographicWeight: 12.2, // ~75.000 millones anuales
    annualCountDescription: "Más de 75.000 millones de individuos sacrificados anualmente en el mundo",
    naturalLifespan: "8 - 10 años",
    actualLifespan: "42 días (6 semanas de vida de bebé)",
    lifespanLossPercentage: 98.8,
    spaceAssigned: "33-39 kg/m² (aprox. 18-20 aves por m², unos 500 cm² por pollo)",
    spaceAssignedMetric: "Menos superficie que una hoja de papel estándar A4 por ave adulta al final de su ciclo.",
    sensoryEnvironment: "Cama de viruta saturada de amoníaco que quema las patas y el pecho (dermatitis de contacto); luz artificial tenue 23 horas diarias para forzar la ingesta continua.",
    standardInterventions: [
      "Selección genética de apetito insaciable y crecimiento muscular hipertrófico",
      "Administración profiláctica de anticoccidiostáticos en el pienso",
      "Amputación de espolones o picos por infrarrojos en reproductoras",
    ],
    endOfLife: "Captura brusca nocturna por las patas, enjaulado en módulos de transporte, colgado boca abajo vivo en ganchos metálicos y baño electrificado.",
    cognitiveProfile: "Autocontrol demostrado en test de recompensa diferida, empatía maternal con sus polluelos, comunicación vocal con más de 24 llamadas distintas.",
    consequencesByChoice: {
      confinement: {
        lawId: "confinement",
        lawTitle: "Densidad y Confinamiento",
        status: "suffering_allowed",
        detail: "Al final de tus 42 días no podrás moverte sin tropezar con el cuerpo de otros 19 compañeros.",
      },
      genetics: {
        lawId: "genetics",
        lawTitle: "Selección Genética",
        status: "suffering_allowed",
        detail: "Tus huesos infantiles no soportarán tu pecho adulto; pasarás tus últimos 15 días postrado sobre tus propias heces con cojera dolorosa.",
      },
    },
    references: [
      {
        id: "1",
        citation: "Knowles, T. G., et al. (2008). Leg disorders in broiler chickens: prevalence, risk factors and prevention. PLoS ONE, 3(2), e1545.",
        url: "https://doi.org/10.1371/journal.pone.0001545",
      },
      {
        id: "2",
        citation: "Marino, L. (2017). Thinking chickens: a review of cognition, emotion, and behavior in the domestic chicken. Animal Cognition, 20(2), 127-147.",
        url: "https://doi.org/10.1007/s10071-016-1064-4",
      },
    ],
  },
  {
    id: "laying_hen",
    commonName: "Gallina Ponedora",
    scientificName: "Gallus gallus domesticus (Línea Lohmann Brown)",
    category: "ave",
    demographicWeight: 2.3, // ~8.000 millones
    annualCountDescription: "Aproximadamente 8.000 millones de gallinas en producción simultánea",
    naturalLifespan: "8 - 10 años",
    actualLifespan: "18 meses (al caer la tasa de puesta por agotamiento metabólico)",
    lifespanLossPercentage: 85,
    spaceAssigned: "Jaulas acondicionadas: 750 cm² por gallina (solo 600 cm² utilizables)",
    spaceAssignedMetric: "Un área apenas superior a un folio A4 durante 550 días seguidos sin pisar tierra.",
    sensoryEnvironment: "Mallas de alambre inclinado para rodar los huevos; atmósfera de polvo seco y partículas de pluma; sin baño de arena para el aseo del plumaje.",
    standardInterventions: [
      "Despique por haz infrarrojo al primer día de vida",
      "Triturado o gaseado inmediato de todos los hermanos macho al nacer (más de 6.000 millones/año)",
      "Puesta forzada de 320 huevos/año (frente a 15-20 huevos de su ancestro salvaje)",
    ],
    endOfLife: "Agotamiento por descalcificación (osteoporosis por cáscaras de huevo) y sacrificio como carne de baja calidad para caldos y subproductos.",
    cognitiveProfile: "Conteo aritmético básico, reconocimiento individual de más de 80 miembros de su bandada y percepción del paso del tiempo.",
    consequencesByChoice: {
      confinement: {
        lawId: "confinement",
        lawTitle: "Densidad y Confinamiento",
        status: "suffering_allowed",
        detail: "Pasarás 18 meses sobre alambre metálico sin poder extender tus dos alas a la vez.",
      },
      mutilations: {
        lawId: "mutilations",
        lawTitle: "Mutilaciones",
        status: "suffering_allowed",
        detail: "La punta de tu pico (órgano ricamente inervado con corpúsculos de Herbst) fue cauterizada de recién nacida.",
      },
    },
    references: [
      {
        id: "1",
        citation: "Nicol, C. J. (2015). The Behavioural Biology of Chickens. CABI Publishing.",
        url: "https://www.cabi.org/bookshop/book/9781780642499/",
      },
    ],
  },
  {
    id: "pig",
    commonName: "Cerdo en Cebo Intensivo",
    scientificName: "Sus scrofa domesticus (Línea Large White / Landrace / Pietrain)",
    category: "mamifero",
    demographicWeight: 0.9, // ~1.500 millones anuales
    annualCountDescription: "Más de 1.500 millones de individuos sacrificados al año en el mundo",
    naturalLifespan: "15 - 20 años",
    actualLifespan: "6 meses (al alcanzar los 100-115 kg de peso)",
    lifespanLossPercentage: 96.6,
    spaceAssigned: "0.65 a 1.0 m² por cerdo de 110 kg sobre suelo de hormigón enrejillado (slat)",
    spaceAssignedMetric: "Superficie equivalente a una pequeña mesa de escritorio compartida en grupos de 15 a 30 animales.",
    sensoryEnvironment: "Fosos de purines abiertos bajo el suelo que emiten sulfuro de hidrógeno y amoníaco; suelo duro sin paja ni tierra para hozar.",
    standardInterventions: [
      "Corte de cola sin anestesia en los primeros 7 días de vida",
      "Castración quirúrgica sin anestesia o analgesia para evitar el olor a verraco",
      "Limado o corte de colmillos de lechón",
    ],
    endOfLife: "Aturdimiento por descenso en fosa de gas CO2 (asfixia e hipercapnia con pánico y quemazón pulmonar durante 30-40 segundos) y desangrado posterior.",
    cognitiveProfile: "Inteligencia espacial comparable a la de primates no humanos, capacidad de manejar palancas y joysticks en pruebas cognitivas de ordenador, empatía y juego social complejo.",
    consequencesByChoice: {
      mutilations: {
        lawId: "mutilations",
        lawTitle: "Mutilaciones",
        status: "suffering_allowed",
        detail: "Te cortaron la cola a sangre viva de bebé para que el hacinamiento no provoque que tus compañeros te la muerdan.",
      },
      slaughter: {
        lawId: "slaughter",
        lawTitle: "Soberanía sobre la Vida",
        status: "suffering_allowed",
        detail: "Descenderás a una fosa de gas CO2 sintiendo que tus pulmones arden mientras intentas saltar la cesta metálica.",
      },
    },
    references: [
      {
        id: "1",
        citation: "Broom, D. M., Sena, M. V., & Moynihan, K. L. (2009). Pigs learn what a mirror image represents and use it to obtain information. Animal Behaviour, 78(5), 1037-1041.",
        url: "https://doi.org/10.1016/j.anbehav.2009.07.027",
      },
    ],
  },
  {
    id: "dairy_cow",
    commonName: "Vaca Lechera & Ternero de Cebo",
    scientificName: "Bos taurus (Línea Holstein Friesian)",
    category: "mamifero",
    demographicWeight: 0.3, // ~300 millones de vacas lecheras y ganado vacuno anual
    annualCountDescription: "Aproximadamente 300 millones de vacas en ordeño continuo en el mundo",
    naturalLifespan: "20 - 25 años",
    actualLifespan: "4 - 5 años (tras 3-4 ciclos de gestación y colapso por mastitis/cojeras)",
    lifespanLossPercentage: 80,
    spaceAssigned: "Cubículo de cemento / cama de serrín en estabulación libre en nave cerrada",
    spaceAssignedMetric: "Aproximadamente 6 a 9 m² por vaca en granjas estabuladas de cero pastoreo.",
    sensoryEnvironment: "Ruido mecánico constante de bombas de ordeño, suelo de hormigón húmedo resbaladizo, estrés calórico en verano.",
    standardInterventions: [
      "Inseminación artificial forzada anual para inducir la producción de leche",
      "Separación de la cría en las primeras 24-48 horas tras el parto",
      "Descornillado térmico en los primeros meses de vida",
    ],
    endOfLife: "Pistola de perno cautivo penetrante al cráneo en matadero cuando la fertilidad o la producción láctea decaen.",
    cognitiveProfile: "Formación de amistades preferenciales estables, aprendizaje de discriminación visual compleja, llamadas vocales individualizadas entre madre y ternero.",
    consequencesByChoice: {
      separation: {
        lawId: "separation",
        lawTitle: "Separación Materno-Filial",
        status: "suffering_allowed",
        detail: "Cada uno de tus terneros te será arrebatado a las pocas horas de nacer mientras emites mugidos de búsqueda durante días.",
      },
      slaughter: {
        lawId: "slaughter",
        lawTitle: "Soberanía sobre la Vida",
        status: "suffering_allowed",
        detail: "Cuando tus ubres enfermen de mastitis a los 4 años, serás descartada y enviada a la línea de sacrificio.",
      },
    },
    references: [
      {
        id: "1",
        citation: "Weary, D. M., & Chua, B. (2000). Effects of early separation on the dairy cow and calf. Applied Animal Behaviour Science, 69(3), 177-188.",
        url: "https://doi.org/10.1016/S0168-1591(00)00128-3",
      },
    ],
  },
  {
    id: "human",
    commonName: "Ser Humano (Homo sapiens)",
    scientificName: "Homo sapiens",
    category: "humano",
    demographicWeight: 0.3, // ~140 millones de nacimientos humanos al año frente a más de 80.000 millones terrestres + 2 billones marinos
    annualCountDescription: "Aproximadamente 140 millones de nacimientos humanos anuales en el planeta",
    naturalLifespan: "75 - 85 años",
    actualLifespan: "72 años (promedio global variable según geografía y renta)",
    lifespanLossPercentage: 5,
    spaceAssigned: "Vivienda / Entorno urbano o rural variable",
    spaceAssignedMetric: "Libertad ambulatoria y estatus de sujeto de derecho (persona jurídica).",
    sensoryEnvironment: "Sociedad humana tecnológica y cultural.",
    standardInterventions: [
      "Socialización cultural y educación formal",
      "Adquisición de hábitos de consumo modelados por tradición y mercado",
      "Consumo de derivados animales bajo el sesgo de la disonancia cognitiva",
    ],
    endOfLife: "Atención médica / Hospitalaria con cuidados paliativos.",
    cognitiveProfile: "Raciocinio abstracto, lenguaje formal, autoconsciencia reflexiva y capacidad de agencia moral universal.",
    consequencesByChoice: {
      slaughter: {
        lawId: "slaughter",
        lawTitle: "Soberanía sobre la Vida",
        status: "protected",
        detail: "Tus leyes te reconocen como agente moral inviolable con plenos derechos humanos fundamentales.",
      },
    },
    humanDetails: {
      incomePercentile: "Dependiente del país de nacimiento (el 80% nace en países del Sur Global con ingresos < 10$ al día).",
      region: "Distribución global probabilística (60% Asia, 18% África, 10% Europa, 8% América Latina, 4% Norteamérica).",
      vulnerability: "Sujeto a las consecuencias ecológicas y zoonóticas de la ganadería industrial global.",
      footprintPerYear: "Responsable directo o indirecto del sacrificio de ~7.000 animales a lo largo de una vida promedio.",
    },
    references: [
      {
        id: "1",
        citation: "United Nations, Department of Economic and Social Affairs, Population Division (2024). World Population Prospects 2024.",
        url: "https://population.un.org/wpp/",
      },
    ],
  },
];

export interface VeilRollResult {
  specimen: SpecimenProfile;
  rollNumber: number;
  totalRolls: number;
  isHuman: boolean;
  humanStreakRequired?: number;
}

export function drawFromVeil(): SpecimenProfile {
  const rand = Math.random() * 100;
  let cumulative = 0;

  for (const profile of SPECIMEN_PROFILES) {
    cumulative += profile.demographicWeight;
    if (rand <= cumulative) {
      return profile;
    }
  }

  return SPECIMEN_PROFILES[0]!;
}
