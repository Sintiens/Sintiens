import type { ReferenceDetail } from "../types";

export type FunctionalLayerId = "nociception" | "limbic" | "cognition";

export interface BrainStructure {
  id: string;
  name: string;
  category: FunctionalLayerId;
  description: string;
  neurochemicalBasis: string; // ej: Receptores mu-opioides, Sustancia P, Glutamato
  homologyNote: string; // Explicación de la estructura homóloga en otros linajes
  svgPath: string; // Path o coordenadas del SVG
  centerCoord: { x: number; y: number };
}

export interface SpeciesBrainProfile {
  id: "human" | "mammal" | "bird" | "octopus";
  commonName: string;
  scientificName: string;
  evolutionaryLineage: string;
  totalNeuronsApprox: string;
  forebrainStructureName: string; // ej. Neocórtex de 6 capas, Pallium dorsocentral (DVR), Lóbulo Vertical
  sensorySpecialization: string;
  consciousnessEvidenceSummary: string;
  structures: BrainStructure[];
  keyExperiments: {
    title: string;
    leadResearcherAndYear: string;
    methodology: string;
    finding: string;
    implication: string;
    doiUrl?: string;
  }[];
}

export const SPECIES_BRAIN_PROFILES: SpeciesBrainProfile[] = [
  {
    id: "human",
    commonName: "Ser Humano",
    scientificName: "Homo sapiens",
    evolutionaryLineage: "Mamífero primate (Hominidae)",
    totalNeuronsApprox: "86.000 millones de neuronas (16.000M en corteza)",
    forebrainStructureName: "Neocórtex laminar de 6 capas",
    sensorySpecialization: "Visión tricromática de alta agudeza, propiocepción y lenguaje formal",
    consciousnessEvidenceSummary: "Autoconsciencia reflexiva, teoría de la mente, lenguaje simbólico y metacognición.",
    structures: [
      {
        id: "human_thalamus",
        name: "Tálamo & Vías Espinotalámicas",
        category: "nociception",
        description: "Estación de relevo que filtra y redirige las señales nociceptivas de dolor agudo y crónico hacia la corteza somatosensorial.",
        neurochemicalBasis: "Receptores opioides µ/κ, sustancia P, glutamato y canales iónicos Nav1.7/1.8.",
        homologyNote: "Presente en todos los vertebrados; idéntico en su papel de compuerta sensorial del dolor.",
        svgPath: "M 190,185 C 205,175 220,185 225,200 C 220,215 200,220 185,210 C 175,195 180,185 190,185 Z",
        centerCoord: { x: 200, y: 195 },
      },
      {
        id: "human_limbic",
        name: "Sistema Límbico (Amígdala e Hipocampo)",
        category: "limbic",
        description: "Regula el miedo condicionado, la memoria emocional episódica, la ansiedad anticipatoria y el apego filial.",
        neurochemicalBasis: "Oxitocina, dopamina, serotonina, eje HPA (cortisol) y receptores GABA-A.",
        homologyNote: "Conservado en todos los amniotas (mamíferos, aves, reptiles) desde hace más de 300 millones de años.",
        svgPath: "M 160,205 C 175,175 225,175 240,210 C 225,235 170,230 160,205 Z",
        centerCoord: { x: 200, y: 205 },
      },
      {
        id: "human_cortex",
        name: "Neocórtex Prefrontal y Somatosensorial",
        category: "cognition",
        description: "Integración consciente del estímulo doloroso, razonamiento abstracto, planificación a largo plazo e inhibición de impulsos.",
        neurochemicalBasis: "Redes córtico-talámicas recurrentes, receptores NMDA y dopamina mesocortical.",
        homologyNote: "Estructura laminar típica de mamíferos; sus funciones ejecutivas son replicadas por el Pallium en aves.",
        svgPath: "M 110,140 C 130,80 270,70 300,120 C 320,160 310,220 280,240 C 250,220 250,150 200,140 C 160,135 130,160 110,140 Z",
        centerCoord: { x: 200, y: 110 },
      },
    ],
    keyExperiments: [
      {
        title: "Correlatos neuronales del dolor afectivo en humanos",
        leadResearcherAndYear: "Rainville et al. (Science, 1997)",
        methodology: "PET funcional durante sugestión hipnótica para disociar la intensidad sensorial del desagrado emocional del dolor.",
        finding: "La corteza cingulada anterior procesa el 'sufrimiento subjetivo' independiente de la sensación táctil somática.",
        implication: "El dolor consciente requiere integración córtico-límbica, la cual está compartida en los animales vertebrados.",
        doiUrl: "https://doi.org/10.1126/science.277.5328.968",
      },
    ],
  },
  {
    id: "mammal",
    commonName: "Cerdo / Vaca (Mamíferos de Granja)",
    scientificName: "Sus scrofa domesticus / Bos taurus",
    evolutionaryLineage: "Mamífero ungulado (Artiodactyla)",
    totalNeuronsApprox: "Cerdos: ~425 millones de neuronas corticales (superior a perros y gatos)",
    forebrainStructureName: "Neocórtex girificado (plegado con circunvoluciones)",
    sensorySpecialization: "Olfato hipersensible (el cerdo tiene más genes olfativos que el perro), audición de baja frecuencia",
    consciousnessEvidenceSummary: "Uso de espejos para localizar objetos, empatía emocional ante la angustia de congéneres, juego social complejo y memoria espacial de largo alcance.",
    structures: [
      {
        id: "mammal_thalamus",
        name: "Tálamo & Vía Espinotalámica Ungulada",
        category: "nociception",
        description: "Transmisión idéntica de estímulos mecánicos, térmicos y químicos dolorosos con idénticos tipos de fibras nerviosas C y A-delta.",
        neurochemicalBasis: "Densidad masiva de receptores opioides; respuesta inmediata a la administración de morfina y AINEs.",
        homologyNote: "Estructural y funcionalmente indistinguible del tálamo humano.",
        svgPath: "M 180,180 C 195,170 215,175 220,190 C 215,205 195,210 180,200 C 170,190 175,180 180,180 Z",
        centerCoord: { x: 195, y: 190 },
      },
      {
        id: "mammal_limbic",
        name: "Sistema Límbico Mamífero & Amígdala",
        category: "limbic",
        description: "Procesa el pánico, el aislamiento social materno-filial y el estrés del matadero con liberación masiva de cortisol y taquicardia.",
        neurochemicalBasis: "Oxitocina en lactancia materna y reconocimiento de crías; cortisol y vasopresina en estrés agudo.",
        homologyNote: "Estructuras límbicas homólogas con conectividad paralela hacia el eje hipotálamo-hipófisis.",
        svgPath: "M 155,195 C 170,170 215,165 230,195 C 220,220 165,220 155,195 Z",
        centerCoord: { x: 190, y: 195 },
      },
      {
        id: "mammal_cortex",
        name: "Corteza Cerebral Girificada",
        category: "cognition",
        description: "Superficie plegada para maximizar la densidad neuronal; permite resolución de problemas en pantallas y manipulación de joysticks.",
        neurochemicalBasis: "Redes córtico-subcorticales densas, acetilcolina y dopamina estriatal.",
        homologyNote: "Corteza compleja de 6 capas con pliegues anatómicos similares a los carnívoros y primates.",
        svgPath: "M 100,150 C 120,90 260,85 290,130 C 305,165 295,215 270,230 C 240,210 240,155 195,145 C 155,140 120,170 100,150 Z",
        centerCoord: { x: 195, y: 120 },
      },
    ],
    keyExperiments: [
      {
        title: "Comprensión del reflejo del espejo en cerdos",
        leadResearcherAndYear: "Broom, Sena & Moynihan (Animal Behaviour, 2009)",
        methodology: "Cerdos expuestos a un espejo durante 5 horas; luego se colocó comida visible solo en el reflejo, detrás de una barrera.",
        finding: "7 de 8 cerdos usaron la información visual del espejo para dar la vuelta y encontrar la comida real sin ir hacia el espejo.",
        implication: "Demuestra consciencia de la perspectiva espacial y evaluación de información visual indirecta.",
        doiUrl: "https://doi.org/10.1016/j.anbehav.2009.07.027",
      },
      {
        title: "Contagio emocional y empatía en cerdos ante el dolor de otros",
        leadResearcherAndYear: "Reimert et al. (Physiology & Behavior, 2013)",
        methodology: "Exposición de cerdos ingenuos al comportamiento de compañeros sometidos a experiencias positivas (juego) o negativas (aislamiento y estrés).",
        finding: "Los cerdos observadores mimetizaron el estado afectivo de sus compañeros midiendo niveles de cortisol salival y posturas corporales.",
        implication: "Capacidad de empatía afectiva primaria y sensibilidad al clima emocional grupal.",
        doiUrl: "https://doi.org/10.1016/j.physbeh.2013.06.009",
      },
    ],
  },
  {
    id: "bird",
    commonName: "Pollo / Cuervo (Aves)",
    scientificName: "Gallus gallus domesticus / Corvus corax",
    evolutionaryLineage: "Dinosaurio terópodo aviar (Aves)",
    totalNeuronsApprox: "Cuervos: 1.500M de neuronas en palio (densidad superior a primates)",
    forebrainStructureName: "Pallium dorsocentral (DVR) y Nidopallium",
    sensorySpecialization: "Visión tetracromática (ven luz ultravioleta), audición rápida y magnetorrecepción",
    consciousnessEvidenceSummary: "Planificación de futuro, autoadministración selectiva de analgésicos, uso y fabricación de herramientas complejas y autocontrol en pruebas de gratificación retardada.",
    structures: [
      {
        id: "bird_thalamus",
        name: "Tálamo Aviar & Fascículo Espinotalámico",
        category: "nociception",
        description: "Receptores polimodales y nociceptores cutáneos de alta densidad en pico, patas y cavidad visceral.",
        neurochemicalBasis: "Corpúsculos de Herbst y Grandry altamente inervados; receptores opioides y respuesta a carprofeno.",
        homologyNote: "Transmisión idéntica del dolor hacia los núcleos sensoriales del telencéfalo.",
        svgPath: "M 185,175 C 200,165 215,170 220,185 C 215,200 195,205 180,195 C 175,185 180,175 185,175 Z",
        centerCoord: { x: 200, y: 185 },
      },
      {
        id: "bird_limbic",
        name: "Sistema Límbico Aviar & Núcleo Taeniae",
        category: "limbic",
        description: "Homólogo a la amígdala mamífera; procesa el pánico materno ante el peligro para sus polluelos y la ansiedad por separación.",
        neurochemicalBasis: "Mesotocina (homólogo aviar de la oxitocina), corticosterona y dopamina.",
        homologyNote: "El núcleo taeniae comparte arquitectura neuronal y neuroquímica con la amígdala medial de los mamíferos.",
        svgPath: "M 160,185 C 175,160 210,160 225,185 C 215,210 170,210 160,185 Z",
        centerCoord: { x: 195, y: 185 },
      },
      {
        id: "bird_cortex",
        name: "Pallium Dorsocentral (DVR / Wulst)",
        category: "cognition",
        description: "Estructura nuclear densa que realiza las mismas operaciones de computación cognitiva que el neocórtex mamífero de 6 capas.",
        neurochemicalBasis: "Extrema densidad de empaquetamiento neuronal (microcircuitos columnares funcionales).",
        homologyNote: "Prueba definitiva de que la consciencia no requiere arquitectura laminar mamífera (convergencia evolutiva).",
        svgPath: "M 115,145 C 130,95 250,90 275,130 C 290,160 280,205 255,220 C 230,205 230,150 190,140 C 155,135 130,160 115,145 Z",
        centerCoord: { x: 195, y: 125 },
      },
    ],
    keyExperiments: [
      {
        title: "Autoadministración selectiva de analgésicos en pollos con dolor",
        leadResearcherAndYear: "Danbury et al. (Veterinary Record, 2000)",
        methodology: "Pollos cojos vs pollos sanos tuvieron acceso a dos comederos: uno con pienso normal y otro con antiinflamatorio (carprofeno).",
        finding: "Los pollos cojos consumieron significativamente más pienso con analgésico. Al aliviarse su cojera, dejaron de preferirlo.",
        implication: "Demuestra que los pollos experimentan sufrimiento desagradable consciente y buscan activamente alivio farmacológico.",
        doiUrl: "https://doi.org/10.1136/vr.146.11.307",
      },
      {
        title: "Densidad neuronal del cerebro de las aves y capacidad cognitiva",
        leadResearcherAndYear: "Olkowicz et al. (PNAS, 2016)",
        methodology: "Contaje isotrópico de núcleos neuronales en cerebros de loros, córvidos y aves canoras frente a primates.",
        finding: "Las aves tienen el doble de neuronas por gramo de masa cerebral que los primates, concentradas en el telencéfalo anterior.",
        implication: "Desmonta el mito de 'cerebro de pájaro': el tamaño absoluto no limita la capacidad de consciencia compleja.",
        doiUrl: "https://doi.org/10.1073/pnas.1517131113",
      },
    ],
  },
  {
    id: "octopus",
    commonName: "Pulpo (Cefalópodos)",
    scientificName: "Octopus vulgaris",
    evolutionaryLineage: "Molusco cefalópodo (Invertebrado)",
    totalNeuronsApprox: "500 millones de neuronas (2/3 distribuidas en los 8 brazos)",
    forebrainStructureName: "Lóbulo Vertical y Complejo Supraesofágico",
    sensorySpecialization: "Quimiorrecepción táctil en miles de ventosas, visión polarizada y camuflaje dinámico",
    consciousnessEvidenceSummary: "Uso de cáscaras de coco como armaduras móviles, juego exploratorio, reconocimiento individual de cuidadores humanos y dolor emocional demostrado.",
    structures: [
      {
        id: "octopus_nociception",
        name: "Nociceptores Periféricos & Nervios Braquiales",
        category: "nociception",
        description: "Red distribuida de nociceptores que detectan cortes, ácido y calor, con procesamiento local en los ganglios de cada brazo.",
        neurochemicalBasis: "Glutamato, acetilcolina, neuropéptidos y modulación con anestésicos locales (lidocaína).",
        homologyNote: "Sistema nervioso no vertebrado que evolucionó nocicepción de forma independiente hace 550 millones de años.",
        svgPath: "M 170,210 C 185,190 215,190 230,210 C 220,240 180,240 170,210 Z",
        centerCoord: { x: 200, y: 215 },
      },
      {
        id: "octopus_limbic",
        name: "Lóbulo Vertical (Memoria y Afecto)",
        category: "limbic",
        description: "Centro maestro de memoria a largo plazo y plasticidad sináptica (LTP), homólogo al hipocampo de mamíferos.",
        neurochemicalBasis: "Serotonina, octopamina, dopamina y óxido nítrico.",
        homologyNote: "Estructura análoga funcional al hipocampo mamífero en un linaje de invertebrados.",
        svgPath: "M 175,150 C 190,135 210,135 225,150 C 220,180 180,180 175,150 Z",
        centerCoord: { x: 200, y: 155 },
      },
      {
        id: "octopus_cognition",
        name: "Complejo Supraesofágico Central",
        category: "cognition",
        description: "Integración sensorial de alto orden, toma de decisiones, control del mimetismo cromático y resolución de problemas.",
        neurochemicalBasis: "500 millones de neuronas con plasticidad extrema y edición de ARN cerebral acelerada.",
        homologyNote: "Cerebro centralizado que coordina la mente distribuida de los 8 brazos.",
        svgPath: "M 150,140 C 170,110 230,110 250,140 C 240,195 160,195 150,140 Z",
        centerCoord: { x: 200, y: 140 },
      },
    ],
    keyExperiments: [
      {
        title: "Demostración de dolor afectivo y evitación condicionada en pulpos",
        leadResearcherAndYear: "Crook (iScience, 2021)",
        methodology: "Pulpos recibieron una inyección dolorosa inocua en una cámara específica; luego se les ofreció analgesia local (lidocaína) en otra cámara.",
        finding: "Los pulpos desarrollaron aversión duradera a la cámara de dolor y preferencia por la cámara donde recibían anestésico, aseando el brazo herido.",
        implication: "Primera prueba inequívoca de que los invertebrados cefalópodos experimentan dolor subjetivo desagradable (no solo reflejos).",
        doiUrl: "https://doi.org/10.1016/j.isci.2021.102223",
      },
      {
        title: "Uso de herramientas y planificación en pulpos",
        leadResearcherAndYear: "Finn, Tregenza & Norman (Current Biology, 2009)",
        methodology: "Observación de pulpos transportando dos mitades de cáscaras de coco por el lecho marino para ensamblarlas como refugio defensivo ante depredadores.",
        finding: "Los animales cargaban con las cáscaras de forma incómoda a través de largas distancias anticipando su utilidad futura.",
        implication: "Demuestra planificación del futuro y uso de herramientas fuera de los vertebrados.",
        doiUrl: "https://doi.org/10.1016/j.cub.2009.10.052",
      },
    ],
  },
];

export const DECLARATIONS_DATA = [
  {
    id: "cambridge",
    title: "Declaración de Cambridge sobre la Consciencia (2012)",
    year: "2012",
    institution: "Universidad de Cambridge (Reino Unido)",
    signatories: "Philip Low, Christof Koch, David Edelman, Stephen Hawking, Jaak Panksepp y un panel de neurocientíficos globales.",
    verbatimQuote: "«La ausencia de un neocórtex no parece impedir que un organismo experimente estados afectivos. Evidencias convergentes indican que los animales no humanos poseen los sustratos neuroanatómicos, neuroquímicos y neurofisiológicos de los estados de consciencia, junto con la capacidad de exhibir conductas intencionales. Consecuentemente, el peso de la evidencia indica que los humanos no somos los únicos en poseer la base neurológica que genera la consciencia. Los animales no humanos, incluyendo todos los mamíferos y aves, y muchas otras criaturas, incluidos los pulpos, también poseen estos sustratos neuronales.»",
    doiUrl: "https://fcmconference.org/img/CambridgeDeclarationOnConsciousness.pdf",
  },
  {
    id: "new_york",
    title: "Declaración de Nueva York sobre la Consciencia Animal (2024)",
    year: "2024",
    institution: "New York University (NYU)",
    signatories: "Más de 400 investigadores de Harvard, Oxford, Sorbona, Cambridge y centros líderes de neurociencia y filosofía de la mente.",
    verbatimQuote: "«Existe un fuerte respaldo científico a la atribución de experiencia consciente a otros mamíferos y aves. La evidencia empírica indica al menos una posibilidad realista de experiencia consciente en todos los vertebrados (incluyendo reptiles, anfibios y peces) y en muchos invertebrados (como cefalópodos, crustáceos decápodos e insectos). Cuando existe una posibilidad realista de experiencia consciente en un animal, es irresponsable ignorar ese riesgo en las decisiones que afectan a ese animal.»",
    doiUrl: "https://sites.google.com/nyu.edu/nyu-declaration-on-animal-cond/home",
  },
];

export const NEUROBIOLOGY_REFERENCES: ReferenceDetail[] = [
  {
    id: "1",
    citation: "Low, P., et al. (2012). The Cambridge Declaration on Consciousness. Francis Crick Memorial Conference, Cambridge, UK.",
    url: "https://fcmconference.org/img/CambridgeDeclarationOnConsciousness.pdf",
  },
  {
    id: "2",
    citation: "Andrews, K., Birch, J., et al. (2024). The New York Declaration on Animal Consciousness. New York University.",
    url: "https://sites.google.com/nyu.edu/nyu-declaration-on-animal-cond/home",
  },
  {
    id: "3",
    citation: "Güntürkün, O., & Bugnyar, T. (2016). Cognition without cortex. Trends in Cognitive Sciences, 20(4), 291-303.",
    url: "https://doi.org/10.1016/j.tics.2016.02.001",
  },
  {
    id: "4",
    citation: "Crook, R. J. (2021). Behavioral and neurophysiological evidence for pain in cephalopod mollusks. iScience, 24(3), 102223.",
    url: "https://doi.org/10.1016/j.isci.2021.102223",
  },
];
