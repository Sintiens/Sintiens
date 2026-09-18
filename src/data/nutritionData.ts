import type { ReferenceDetail } from "../types";

export interface NutrientProfile {
  id: "protein" | "b12" | "iron" | "calcium" | "omega3";
  name: string;
  chemicalName: string;
  popularMyth: string;
  biochemicalReality: string;
  absorptionMechanics: string;
  recommendedDailyIntake: string;
  optimalPlantSources: {
    name: string;
    portion: string;
    nutrientAmount: string;
    absorptionNote: string;
  }[];
  bioavailabilityScore: {
    plantAvgPct: number;
    animalAvgPct: number;
    enhancerStrategy: string;
    enhancerFactor: string; // ej: "+400% con Vitamina C"
  };
  healthRiskContrast: {
    animalSourceRisk: string; // ej: Cáncer colorrectal, TMAO, sobrecarga de hierro hemo
    plantSourceBenefit: string; // ej: Fibra prebiótica, fitoquímicos, menor inflamación sistémica
  };
}

export const NUTRIENT_PROFILES: NutrientProfile[] = [
  {
    id: "protein",
    name: "Proteínas & Aminoácidos",
    chemicalName: "Polímeros de 20 Aminoácidos (9 Esenciales)",
    popularMyth: "«Las proteínas vegetales son 'incompletas', de baja calidad y obligan a hacer combinaciones complejas en el mismo plato.»",
    biochemicalReality: "Todos los alimentos vegetales integrales contienen los 9 aminoácidos esenciales en proporciones variables. El hígado mantiene un 'pool metabólico' de aminoácidos libres que se recicla continuamente a lo largo de 24 horas; no es necesario combinarlos en la misma comida. Alimentos como la soja, el garbanzo, la quinoa, el cáñamo y el trigo sarraceno presentan puntuaciones DIAAS/PDCAAS comparables a la carne o el huevo.",
    absorptionMechanics: "Digestión por pepsinas gástricas y proteasas pancreáticas en el duodeno. La cocción, remojo y fermentación (tempeh, tofu) eliminan fitatos e incrementan la digestibilidad proteica por encima del 92-95%.",
    recommendedDailyIntake: "0.83 g / kg de peso corporal al día (ej: 58g para 70 kg; 1.2-1.6 g/kg en atletas de fuerza).",
    optimalPlantSources: [
      {
        name: "Tempeh / Tofu firme de soja",
        portion: "150 g",
        nutrientAmount: "28 - 32 g de proteína",
        absorptionNote: "Perfil completo de aminoácidos; digestibilidad >95% gracias a la fermentación.",
      },
      {
        name: "Lentejas cocidas",
        portion: "200 g (un plato)",
        nutrientAmount: "18 g de proteína",
        absorptionNote: "Ricas en lisina, hierro y fibra prebiótica de fermentación lenta.",
      },
      {
        name: "Seitán (gluten de trigo lavado)",
        portion: "100 g",
        nutrientAmount: "24 - 30 g de proteína",
        absorptionNote: "Muy rico en metionina y cisteína; ideal complementar a lo largo del día con legumbres.",
      },
      {
        name: "Semillas de cáñamo / Chía",
        portion: "30 g (2 cucharadas)",
        nutrientAmount: "10 g de proteína",
        absorptionNote: "Aporte simultáneo de Omega-3 ALA y magnesio biodisponible.",
      },
    ],
    bioavailabilityScore: {
      plantAvgPct: 92,
      animalAvgPct: 96,
      enhancerStrategy: "Cocción, remojo y consumo de legumbres fermentadas (tempeh/miso).",
      enhancerFactor: "Digestibilidad equiparable al 95%",
    },
    healthRiskContrast: {
      animalSourceRisk: "La proteína animal incrementa los niveles circulantes de IGF-1 (factor de crecimiento insulínico tipo 1), asociado a proliferación tumoral, y genera TMAO (óxido de trimetilamina) proaterogénico.",
      plantSourceBenefit: "La proteína vegetal se acompaña de fibra dietética soluble/insoluble, polifenoles antioxidantes y cero colesterol o grasas trans.",
    },
  },
  {
    id: "b12",
    name: "Vitamina B12",
    chemicalName: "Cobalamina (C63H88CoN14O14P)",
    popularMyth: "«La B12 es de origen animal; si los veganos necesitan suplementarse, demuestra que el veganismo es 'antinatural'.»",
    biochemicalReality: "La vitamina B12 NO la producen ni las plantas ni los animales: la sintetizan exclusivamente bacterias anaerobias del suelo y aguas no cloradas. En la ganadería intensiva actual (donde los animales viven en naves de cemento sin pasto salvaje), a los propios animales se les suplementa sistemáticamente con B12 o cobalto sintetizado en su pienso. Tomar un suplemento de B12 es simplemente saltarse el intermediario animal contaminado.",
    absorptionMechanics: "En humanos, se une al Factor Intrínseco en el estómago y se absorbe por endocitosis en el íleon terminal (~1.5-2.0 µg por ingesta activa) más un 1% por difusión pasiva en dosis altas.",
    recommendedDailyIntake: "2.000 µg / semana (en una sola toma de cianocobalamina masticable) o 50 - 100 µg / día.",
    optimalPlantSources: [
      {
        name: "Suplemento de Cianocobalamina",
        portion: "1 dosis semanal (2.000 µg)",
        nutrientAmount: "100% de requerimientos semanales",
        absorptionNote: "La forma más estable, segura, estudiada y económica (apenas ~5€ al año).",
      },
      {
        name: "Alimentos fortificados (Bebidas vegetales / Levadura nutricional)",
        portion: "2-3 raciones diarias",
        nutrientAmount: "2.4 - 5.0 µg al día",
        absorptionNote: "Aporte fraccionado; requiere constancia diaria.",
      },
    ],
    bioavailabilityScore: {
      plantAvgPct: 100, // Direct supplement absorption
      animalAvgPct: 50, // Meat-bound B12 requires gastric acid cleaving
      enhancerStrategy: "Tomar masticada en ayunas o con agua; sin necesidad de combinar con alimentos.",
      enhancerFactor: "Absorción pasiva garantizada en megadosis",
    },
    healthRiskContrast: {
      animalSourceRisk: "Obtener B12 de carne roja/procesada conlleva exposición a aminas heterocíclicas, grasas saturadas y dioxinas acumuladas en la grasa animal.",
      plantSourceBenefit: "El suplemento bacteriano purificado es inocuo, no tiene dosis tóxica (el exceso se excreta por orina) y evita cualquier sufrimiento animal.",
    },
  },
  {
    id: "iron",
    name: "Hierro (Hemo vs No Hemo)",
    chemicalName: "Hierro Iónico (Fe2+ / Fe3+)",
    popularMyth: "«El hierro de las plantas no se absorbe, por eso los vegetarianos tienen siempre anemia.»",
    biochemicalReality: "Los estudios de cohortes (EPIC-Oxford, AHS-2) demuestran que vegetarianos y veganos tienen ingestas totales de hierro iguales o superiores a los omnívoros, con tasas de anemia ferropénica similares. El hierro no hemo (vegetal) cuenta con una ventaja fisiológica crucial: su absorción está estrictamente regulada por la hormona hepcidina según las reservas del organismo, protegiendo contra el estrés oxidativo por sobrecarga de hierro hemo (asociado a infarto de miocardio y cáncer).",
    absorptionMechanics: "El hierro no hemo se absorbe en los enterocitos del duodeno a través del transportador DMT1. La presencia de ácido ascórbico (Vitamina C) reduce el Fe3+ a Fe2+, multiplicando la absorción por 4 a 6 veces.",
    recommendedDailyIntake: "8 mg / día (hombres y mujeres posmenopáusicas); 18 mg / día (mujeres fértiles).",
    optimalPlantSources: [
      {
        name: "Lentejas y Garbanzos",
        portion: "200 g cocidos",
        nutrientAmount: "6.6 mg de hierro",
        absorptionNote: "Añadir zumo de limón, pimiento crudo o tomate en la misma comida para maximizar absorción.",
      },
      {
        name: "Semillas de calabaza / Sésamo (Tahin)",
        portion: "30 g",
        nutrientAmount: "4.2 mg de hierro",
        absorptionNote: "Tostar ligeramente o consumir en puré (hummus/tahin) reduce fitatos.",
      },
      {
        name: "Tofu firme enriquecido",
        portion: "150 g",
        nutrientAmount: "4.0 mg de hierro",
        absorptionNote: "Excelente densidad mineral por caloría.",
      },
      {
        name: "Espinacas / Acelgas cocidas",
        portion: "150 g",
        nutrientAmount: "3.6 mg de hierro",
        absorptionNote: "Al cocinarlas se reduce el volumen y se liberan minerales del complejo oxálico.",
      },
    ],
    bioavailabilityScore: {
      plantAvgPct: 15,
      animalAvgPct: 25,
      enhancerStrategy: "Consumir con 50-100 mg de Vitamina C (cítricos, pimiento, kiwi) y separar café/té 1 hora.",
      enhancerFactor: "+400% a +600% de aumento de absorción",
    },
    healthRiskContrast: {
      animalSourceRisk: "El hierro hemo animal actúa como catalizador pro-oxidante en el colon, promoviendo la formación de compuestos N-nitrosos carcinogénicos.",
      plantSourceBenefit: "El hierro vegetal autorregulado previene la ferritina excesiva y la aterosclerosis carotídea sin toxicidad tisular.",
    },
  },
  {
    id: "calcium",
    name: "Calcio & Salud Ósea",
    chemicalName: "Calcio Iónico (Ca2+)",
    popularMyth: "«Los lácteos de vaca son indispensables para unos huesos fuertes y prevenir la osteoporosis.»",
    biochemicalReality: "Los países con mayor consumo de lácteos per cápita (EE.UU., Suecia, Finlandia) presentan algunas de las tasas más altas de fracturas de cadera del mundo (la 'paradoja del calcio'). La biodisponibilidad del calcio en verduras crucíferas (brócoli, col kale, rúcula) es del 50-60%, frente a solo el 32% de la leche de vaca. La salud ósea depende del balance neto: ingesta de calcio biodisponible, niveles adecuados de vitamina D3, vitamina K2 y ejercicio físico de fuerza con impacto gravitatorio.",
    absorptionMechanics: "Absorción activa dependiente de vitamina D3 (calbindina) y transporte paracelular pasivo en el yeyuno.",
    recommendedDailyIntake: "800 - 1.000 mg / día.",
    optimalPlantSources: [
      {
        name: "Col Kale / Rúcula / Brócoli",
        portion: "150 g",
        nutrientAmount: "250 mg de calcio",
        absorptionNote: "Biodisponibilidad del 55-60% (casi el doble que la leche) por su bajísimo contenido en oxalatos.",
      },
      {
        name: "Tofu cuajado con sales de calcio (Nigari/Sulfato)",
        portion: "150 g",
        nutrientAmount: "350 - 450 mg de calcio",
        absorptionNote: "Aporte masivo de calcio en matriz proteica altamente digestible.",
      },
      {
        name: "Bebidas vegetales fortificadas",
        portion: "250 ml (un vaso)",
        nutrientAmount: "300 mg de calcio",
        absorptionNote: "Idéntica concentración y absorción (32%) que la leche de vaca comercial.",
      },
      {
        name: "Semillas de sésamo molidas (Tahin)",
        portion: "30 g (2 cucharadas)",
        nutrientAmount: "280 mg de calcio",
        absorptionNote: "Consumir molido para romper la cutícula exterior indigestible.",
      },
    ],
    bioavailabilityScore: {
      plantAvgPct: 55, // In low-oxalate greens
      animalAvgPct: 32, // In dairy milk
      enhancerStrategy: "Elegir crucíferas bajas en oxalatos (kale, brócoli, berros) y tofu cálcico.",
      enhancerFactor: "Tasa de absorción superior a los lácteos",
    },
    healthRiskContrast: {
      animalSourceRisk: "Los lácteos comerciales contienen estrógenos bovinos naturales, galactosa (pro-inflamatoria) y se asocian a mayor riesgo de cáncer de próstata.",
      plantSourceBenefit: "Las fuentes vegetales aportan simultáneamente vitamina K1/K2, boro y magnesio, esenciales para la fijación del calcio en la matriz ósea.",
    },
  },
  {
    id: "omega3",
    name: "Ácidos Grasos Omega-3 (ALA, EPA, DHA)",
    chemicalName: "Ácido Alfa-Linolénico / Eicosapentaenoico / Docosahexaenoico",
    popularMyth: "«Solo comiendo pescado azul se puede obtener Omega-3 suficiente para el cerebro y el corazón.»",
    biochemicalReality: "Los peces NO fabrican EPA ni DHA: los acumulan en sus tejidos al alimentarse de microalgas marinas unicelulares (*Schizochytrium*). El cuerpo humano convierte el ácido alfa-linolénico vegetal (ALA) en EPA y DHA mediante elongasas y desaturasas hepáticas. Para necesidades incrementadas (embarazo, lactancia, edad avanzada), los suplementos directos de aceite de microalgas aportan DHA/EPA 100% puros y libres de microplásticos, mercurio, dioxinas y PCBs acumulados en la grasa del pescado.",
    absorptionMechanics: "Incorporación en quilomicrones tras emulsificación biliar y absorción micelar en el intestino delgado.",
    recommendedDailyIntake: "1.6 g / día de ALA (o 250 mg / día de DHA/EPA preformado).",
    optimalPlantSources: [
      {
        name: "Semillas de lino molidas / Aceite de lino",
        portion: "1 cucharada sopera (10 g)",
        nutrientAmount: "2.400 mg de ALA",
        absorptionNote: "Supera con creces los requerimientos diarios de Omega-3 en una sola cucharada.",
      },
      {
        name: "Nueces de California",
        portion: "30 g (un puñado)",
        nutrientAmount: "2.600 mg de ALA",
        absorptionNote: "Excelente snack neuroprotector con antioxidantes polifenólicos.",
      },
      {
        name: "Aceite de Microalgas (Suplemento directo)",
        portion: "1 perla vegana",
        nutrientAmount: "250 - 500 mg de DHA + EPA",
        absorptionNote: "La fuente original primaria donde los peces obtienen el Omega-3 marino.",
      },
      {
        name: "Semillas de chía hidratadas",
        portion: "15 g",
        nutrientAmount: "2.800 mg de ALA",
        absorptionNote: "Forma un mucílago protector gástrico que libera lípidos gradualmente.",
      },
    ],
    bioavailabilityScore: {
      plantAvgPct: 100, // Direct algae DHA
      animalAvgPct: 100, // Fish oil
      enhancerStrategy: "Reducir el exceso de Omega-6 (aceites de girasol refinados) para no saturar las desaturasas.",
      enhancerFactor: "Conversión endógena optimizada",
    },
    healthRiskContrast: {
      animalSourceRisk: "El pescado graso es la principal fuente dietética humana de metilmercurio (neurotóxico), microplásticos y contaminantes orgánicos persistentes.",
      plantSourceBenefit: "Las fuentes de microalgas y semillas ofrecen ácidos grasos poliinsaturados limpios sin riesgo de neurotoxicidad por metales pesados.",
    },
  },
];

export const OFFICIAL_HEALTH_CONSENSUS = [
  {
    institution: "Academy of Nutrition and Dietetics (AND)",
    country: "Estados Unidos (Más de 100.000 profesionales de la salud)",
    year: "2016 (Reafirmada)",
    verbatimQuote: "«Es la postura oficial de la Academia de Nutrición y Dietética que las dietas vegetarianas adecuadamente planificadas, incluidas las totalmente veganas, son saludables, nutricionalmente adecuadas y pueden proporcionar beneficios para la salud en la prevención y tratamiento de ciertas enfermedades. Estas dietas son apropiadas para todas las etapas del ciclo vital, incluidos el embarazo, la lactancia, la infancia, la niñez, la adolescencia, la edad adulta avanzada y para atletas.»",
    doiUrl: "https://doi.org/10.1016/j.jand.2016.09.025",
  },
  {
    institution: "Harvard T.H. Chan School of Public Health",
    country: "Universidad de Harvard",
    year: "2020",
    verbatimQuote: "«Cambiar el consumo de proteínas de origen animal por fuentes de proteína vegetal como legumbres, frutos secos y soja se asocia con una reducción significativa en el riesgo de enfermedad coronaria, diabetes tipo 2 y mortalidad prematura por todas las causas.»",
    doiUrl: "https://www.hsph.harvard.edu/nutritionsource/what-should-you-eat/protein/",
  },
  {
    institution: "Organización Mundial de la Salud (OMS / IARC)",
    country: "Naciones Unidas",
    year: "2015",
    verbatimQuote: "«Tras una rigurosa revisión de más de 800 estudios epidemiológicos, la carne procesada (embutidos, salchichas, beicon) se clasifica en el Grupo 1 (Carcinógeno confirmado para humanos, mismo nivel que el tabaco y el amianto) por su vínculo con el cáncer colorrectal, y la carne roja en el Grupo 2A (Probable carcinógeno).»",
    doiUrl: "https://doi.org/10.1016/S1470-2045(15)00444-1",
  },
];

export const NUTRITION_REFERENCES: ReferenceDetail[] = [
  {
    id: "1",
    citation: "Melina, V., Craig, W., & Levin, S. (2016). Position of the Academy of Nutrition and Dietetics: Vegetarian Diets. Journal of the Academy of Nutrition and Dietetics, 116(12), 1970-1980.",
    url: "https://doi.org/10.1016/j.jand.2016.09.025",
  },
  {
    id: "2",
    citation: "Bouvard, V., et al. (2015). Carcinogenicity of consumption of red and processed meat. The Lancet Oncology, 16(16), 1599-1600.",
    url: "https://doi.org/10.1016/S1470-2045(15)00444-1",
  },
  {
    id: "3",
    citation: "Song, M., et al. (2016). Association of animal and plant protein intake with all-cause and cause-specific mortality. JAMA Internal Medicine, 176(10), 1453-1463.",
    url: "https://doi.org/10.1001/jamainternmed.2016.4182",
  },
];
