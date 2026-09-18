export interface BehavioralFreedom {
  name: string;
  category: "locomotion" | "comfort" | "social" | "instinct";
  description: string;
  allowedInSystem: boolean;
  scientificImpact: string;
}

export interface ConfinementSystem {
  id: string;
  name: string;
  legalStatus: string;
  region: string;
  areaCm2OrM2: string;
  widthCm: number;
  lengthCm: number;
  densityNote: string;
  welfareRating: "critical" | "poor" | "acceptable" | "good";
  welfareScore: number; // 1 to 10
  description: string;
  freedoms: BehavioralFreedom[];
}

export interface SpeciesConfinementProfile {
  speciesId: "hen" | "sow" | "calf" | "salmon" | "broiler_barn";
  speciesName: string;
  scientificName: string;
  globalPopulation: string;
  keyIssueSummary: string;
  systems: ConfinementSystem[];
  naturalBehaviors: {
    name: string;
    spaceRequiredCm2OrM2: string;
    description: string;
    deprivationConsequence: string;
  }[];
  scientificCitationId: string;
}

export const MULTI_SPECIES_CONFINEMENT_DATA: Record<"hen" | "sow" | "calf" | "salmon" | "broiler_barn", SpeciesConfinementProfile> = {
  hen: {
    speciesId: "hen",
    speciesName: "Gallina Ponedora",
    scientificName: "Gallus gallus domesticus",
    globalPopulation: "7.900 millones en producción simultánea",
    keyIssueSummary: "Alojadas en jaulas de alambre donde el espacio asignado por ley es menor que la superficie de su cuerpo al extender las alas.",
    naturalBehaviors: [
      {
        name: "Extender las alas (Aleteo)",
        spaceRequiredCm2OrM2: "1.876 cm²",
        description: "Envergadura alar completa para batir las alas y mantener la densidad ósea.",
        deprivationConsequence: "Atrofia muscular masiva y osteoporosis severa con fracturas espontáneas en el 80% de las aves en jaula."
      },
      {
        name: "Darse la vuelta (Giro 180°)",
        spaceRequiredCm2OrM2: "1.271 cm²",
        description: "Capacidad de rotar sobre el propio eje sin colisionar con barrotes ni congéneres.",
        deprivationConsequence: "Frustración motora continua y microtraumatismos en plumas y crestas por rozamiento continuo."
      },
      {
        name: "Acicalarse el plumaje",
        spaceRequiredCm2OrM2: "1.150 cm²",
        description: "Estiramiento de cuello y patas para limpiar parásitos y distribuir grasa uropigial.",
        deprivationConsequence: "Pérdida de aislamiento térmico, heridas cutáneas e infecciones secundarias."
      },
      {
        name: "Baño de polvo y escarbado",
        spaceRequiredCm2OrM2: "2.500 cm² con sustrato",
        description: "Conducta instintiva diaria para eliminar ácaros y mantener la salud de la piel.",
        deprivationConsequence: "Picar en falso sobre el suelo de alambre desnudo (conducta estereotipada de estrés extremo)."
      },
      {
        name: "Puesta en nido cerrado y percha nocturna",
        spaceRequiredCm2OrM2: "Nido oscuro + 15 cm percha",
        description: "Búsqueda de refugio elevado para dormir y aislamiento visual para ovoposición.",
        deprivationConsequence: "Puesta en el suelo inclinado de alambre con dolor y retención ovárica por estrés."
      }
    ],
    systems: [
      {
        id: "battery_hen",
        name: "Jaula de Batería Convencional",
        legalStatus: "Estándar común en EE.UU., Asia y Latinoamérica; prohibida en UE desde 2012",
        region: "Global (excepto UE, Suiza, Reino Unido)",
        areaCm2OrM2: "450 cm² / ave (menos que un folio A4)",
        widthCm: 20,
        lengthCm: 22.5,
        densityNote: "18-22 gallinas por metro cuadrado",
        welfareRating: "critical",
        welfareScore: 1,
        description: "Jaula de alambre desnudo en pendiente sin percha, nido ni yacija. Las aves no pueden abrir las alas en toda su vida.",
        freedoms: [
          { name: "Ponerse de pie", category: "locomotion", description: "Apenas caben de pie en contacto constante con las compañeras.", allowedInSystem: true, scientificImpact: "Rozamiento continuo" },
          { name: "Extender las alas", category: "locomotion", description: "Imposible por espacio físico.", allowedInSystem: false, scientificImpact: "Atrofia ósea y fracturas" },
          { name: "Darse la vuelta", category: "locomotion", description: "Requiere empujar a otras aves.", allowedInSystem: false, scientificImpact: "Agresividad y picaje" },
          { name: "Anidar en privado", category: "instinct", description: "Sin nido.", allowedInSystem: false, scientificImpact: "Estrés de oviposición crónico" },
          { name: "Baño de polvo", category: "comfort", description: "Suelo de alambre desnudo.", allowedInSystem: false, scientificImpact: "Infestación de ácaros y estrés" }
        ]
      },
      {
        id: "enriched_hen",
        name: "Jaula Enriquecida / Acondicionada",
        legalStatus: "Obligatoria en UE (Directiva 1999/74/CE)",
        region: "Unión Europea",
        areaCm2OrM2: "750 cm² / ave (equivalente a 1 folio A4 útil + 15 cm percha)",
        widthCm: 25,
        lengthCm: 30,
        densityNote: "13-14 gallinas por metro cuadrado",
        welfareRating: "poor",
        welfareScore: 3,
        description: "Jaula metálica con pequeña cortina de nido de plástico y perchas bajas. Aunque añade enriquecimiento mínimo, sigue impidiendo el vuelo y el aleteo completo.",
        freedoms: [
          { name: "Ponerse de pie", category: "locomotion", description: "Permitido.", allowedInSystem: true, scientificImpact: "Marginalmente mejor" },
          { name: "Extender las alas", category: "locomotion", description: "Sigue siendo imposible para el grupo completo simultáneamente.", allowedInSystem: false, scientificImpact: "Osteoporosis persistente" },
          { name: "Darse la vuelta", category: "locomotion", description: "Dificultoso pero posible.", allowedInSystem: true, scientificImpact: "Movilidad restringida" },
          { name: "Anidar en privado", category: "instinct", description: "Cortina plástica compartida.", allowedInSystem: true, scientificImpact: "Acceso competitivo" },
          { name: "Baño de polvo", category: "comfort", description: "Tapete sintético mínimo.", allowedInSystem: false, scientificImpact: "No permite inmersión en sustrato" }
        ]
      },
      {
        id: "cage_free_hen",
        name: "Suelo / Aviario Libre de Jaula",
        legalStatus: "Estándar comercial alternativo y venta minorista en UE/EE.UU.",
        region: "Europa Occidental y marcas cage-free",
        areaCm2OrM2: "1.110 cm² / ave en interior (9 aves/m²)",
        widthCm: 33.3,
        lengthCm: 33.3,
        densityNote: "9 aves/m² utilizable en multinivel",
        welfareRating: "acceptable",
        welfareScore: 6,
        description: "Naves industriales cerradas con perchas a varias alturas, nidos comunitarios y cama de viruta en el suelo. Sin acceso al exterior, pero permite caminar y batir alas.",
        freedoms: [
          { name: "Ponerse de pie", category: "locomotion", description: "Plena libertad de marcha.", allowedInSystem: true, scientificImpact: "Mejora muscular" },
          { name: "Extender las alas", category: "locomotion", description: "Permite vuelo corto y aleteo.", allowedInSystem: true, scientificImpact: "Mayor fortaleza ósea" },
          { name: "Darse la vuelta", category: "locomotion", description: "Sin barreras mecánicas fijas.", allowedInSystem: true, scientificImpact: "Conducta social natural" },
          { name: "Anidar en privado", category: "instinct", description: "Nidos accesibles en altura.", allowedInSystem: true, scientificImpact: "Reducción de estrés" },
          { name: "Baño de polvo", category: "comfort", description: "Cama de viruta en suelo.", allowedInSystem: true, scientificImpact: "Conducta de confort lograda" }
        ]
      }
    ],
    scientificCitationId: "efsa-broiler-welfare-2023"
  },

  broiler_barn: {
    speciesId: "broiler_barn",
    speciesName: "Pollo de Engorde en Nave",
    scientificName: "Gallus gallus domesticus (Broiler)",
    globalPopulation: "Más de 74.000 millones sacrificados al año",
    keyIssueSummary: "Alojados en naves industriales cerradas a densidades de hasta 42 kg/m² (18 a 22 pollos adultos por metro cuadrado) sobre camas saturadas de amoníaco.",
    naturalBehaviors: [
      {
        name: "Caminar sin colisionar con otras aves",
        spaceRequiredCm2OrM2: ">1.000 cm² libres",
        description: "Capacidad de dar 10 pasos consecutivos sin tropezar ni pisar a congéneres.",
        deprivationConsequence: "Inmovilidad casi total al final del engorde, postración prolongada sobre la yacija y llagas químicas."
      },
      {
        name: "Percha nocturna en altura",
        spaceRequiredCm2OrM2: "Perchas a 20-40 cm del suelo",
        description: "Instinto ancestral de subirse a ramas para sentirse seguros durante la noche.",
        deprivationConsequence: "Imposible por falta de estructuras y por el excesivo peso corporal que fracturaría las patas."
      },
      {
        name: "Luz natural y ritmo circadiano",
        spaceRequiredCm2OrM2: "Ventanas y fotoperiodo natural",
        description: "Ciclos de luz natural diurna para el desarrollo ocular y actividad física.",
        deprivationConsequence: "Luz artificial tenue permanente (<20 lux) para evitar peleas y forzar a comer continuamente."
      }
    ],
    systems: [
      {
        id: "standard_broiler_barn",
        name: "Nave Industrial Convencional (UE/EE.UU.)",
        legalStatus: "Directiva 2007/43/CE de la UE permite hasta 42 kg/m² bajo excepciones",
        region: "Global (estándar en más del 90% de la producción mundial)",
        areaCm2OrM2: "450 a 550 cm² / ave adulta (18-22 pollos/m²)",
        widthCm: 22,
        lengthCm: 25,
        densityNote: "39 a 42 kg de peso vivo por metro cuadrado",
        welfareRating: "critical",
        welfareScore: 2,
        description: "Naves de 100-150 metros con 30.000 a 50.000 aves sin jaulas pero con un suelo totalmente tapizado de animales donde el espacio libre se reduce a cero en las últimas semanas.",
        freedoms: [
          { name: "Ponerse de pie", category: "locomotion", description: "Muy doloroso por discondroplasia tibial.", allowedInSystem: true, scientificImpact: "Gait Score 3-4" },
          { name: "Caminar libremente", category: "locomotion", description: "Bloqueado por la aglomeración masiva.", allowedInSystem: false, scientificImpact: "Postración ininterrumpida" },
          { name: "Subir a perchas", category: "instinct", description: "Inexistentes en naves estándar.", allowedInSystem: false, scientificImpact: "Frustración etológica" },
          { name: "Yacija seca y limpia", category: "comfort", description: "La cama no se cambia en todo el ciclo de 40 días.", allowedInSystem: false, scientificImpact: "Quemaduras cáusticas" },
          { name: "Luz solar diurna", category: "comfort", description: "Naves ciegas con luz artificial tenue.", allowedInSystem: false, scientificImpact: "Deformidades oculares" }
        ]
      },
      {
        id: "ecc_better_chicken",
        name: "Compromiso Europeo del Pollo (ECC)",
        legalStatus: "Estándar voluntario de bienestar promovido por ONGs y adoptado por minoristas líderes",
        region: "Europa Occidental",
        areaCm2OrM2: "800 cm² / ave (máx. 30 kg/m²)",
        widthCm: 28,
        lengthCm: 28,
        densityNote: "Máximo 30 kg/m² con cepas de crecimiento lento",
        welfareRating: "acceptable",
        welfareScore: 6,
        description: "Exige cepas de crecimiento más lento (máx. 50 g/día), luz natural mínima de 50 lux, 2 metros de percha por 1.000 aves y sustratos de picoteo.",
        freedoms: [
          { name: "Ponerse de pie", category: "locomotion", description: "Esqueleto sano y osificado.", allowedInSystem: true, scientificImpact: "Movilidad normal" },
          { name: "Caminar libremente", category: "locomotion", description: "Menor densidad que permite desplazarse.", allowedInSystem: true, scientificImpact: "Musculatura funcional" },
          { name: "Subir a perchas", category: "instinct", description: "Perchas obligatorias.", allowedInSystem: true, scientificImpact: "Comportamiento de descanso" },
          { name: "Luz solar", category: "comfort", description: "Ventanas con luz natural obligatorias.", allowedInSystem: true, scientificImpact: "Ritmo circadiano preservado" },
          { name: "Baño de polvo", category: "comfort", description: "Balas de paja y sustratos de enriquecimiento.", allowedInSystem: true, scientificImpact: "Salud cutánea" }
        ]
      }
    ],
    scientificCitationId: "efsa-broiler-welfare-2023"
  },

  sow: {
    speciesId: "sow",
    speciesName: "Cerda Reproductora",
    scientificName: "Sus domesticus",
    globalPopulation: "Más de 150 millones de cerdas reproductoras confinadas anualmente",
    keyIssueSummary: "Encerradas en jaulas de gestación y parideras de barras metálicas donde no pueden darse la vuelta durante meses consecutivos.",
    naturalBehaviors: [
      {
        name: "Darse la vuelta (Giro 180°)",
        spaceRequiredCm2OrM2: "350 × 250 cm (8,75 m²)",
        description: "Capacidad de una cerda adulta (200-300 kg) de girar su cuerpo sin golpear paredes.",
        deprivationConsequence: "Frustración locomotora extrema y lesiones en articulaciones tarsales por inmovilidad obligada."
      },
      {
        name: "Construcción de nido preparto",
        spaceRequiredCm2OrM2: "6,0 m² con paja y ramas",
        description: "Impulso hormonal incontrolable de cavar y recolectar material 24 horas antes de dar a luz.",
        deprivationConsequence: "Pico de cortisol un 400% superior, mordedura compulsiva de barrotes metálicos hasta sangrar encías."
      },
      {
        name: "Hocicar y buscar alimento",
        spaceRequiredCm2OrM2: "Área abierta con sustrato",
        description: "El cerdo dedica el 75% de su tiempo activo a explorar el suelo con el disco nasal.",
        deprivationConsequence: "Estereotipias de masticación en vacío ('sham-chewing') y agresión redirigida."
      },
      {
        name: "Interacción afectiva con lechones",
        spaceRequiredCm2OrM2: "Zona de amamantamiento libre",
        description: "Contacto visual, táctil y sonoro (gruñidos de llamada de lactancia) con sus crías.",
        deprivationConsequence: "Barrotes de contención impiden todo contacto más allá del amamantamiento forzado."
      }
    ],
    systems: [
      {
        id: "gestation_crate",
        name: "Jaula de Gestación Individual",
        legalStatus: "Legal en gran parte del mundo; restringida a las primeras 4 semanas tras inseminación en la UE",
        region: "Global (China, EE.UU., Brasil, UE las 4 primeras semanas)",
        areaCm2OrM2: "1,2 m² (200 cm × 60 cm)",
        widthCm: 60,
        lengthCm: 200,
        densityNote: "1 cerda adulta inmovilizada por jaula",
        welfareRating: "critical",
        welfareScore: 1,
        description: "Estructura metálica ajustada al contorno del animal. La cerda solo puede dar un paso adelante y uno atrás. El suelo de hormigón ranurado provoca úlceras por decúbito.",
        freedoms: [
          { name: "Ponerse de pie y tumbarse", category: "locomotion", description: "Muy dificultoso al final de la gestación.", allowedInSystem: true, scientificImpact: "Heridas en pezones y hombros" },
          { name: "Darse la vuelta", category: "locomotion", description: "Físicamente imposible.", allowedInSystem: false, scientificImpact: "Frustración y dolor muscular" },
          { name: "Interactuar socialmente", category: "social", description: "Aislada por barrotes.", allowedInSystem: false, scientificImpact: "Deprivación sensorial total" },
          { name: "Hocicar en el suelo", category: "instinct", description: "Hormigón ranurado desnudo.", allowedInSystem: false, scientificImpact: "Mordisqueo compulsivo de hierro" },
          { name: "Termorregularse", category: "comfort", description: "Sin cama ni sombras modulables.", allowedInSystem: false, scientificImpact: "Estrés térmico severo" }
        ]
      },
      {
        id: "group_housing_sow",
        name: "Alojamiento Grupal en Interior (UE tras 4 semanas)",
        legalStatus: "Obligatorio en la UE a partir de la 4ª semana de gestación",
        region: "Unión Europea",
        areaCm2OrM2: "2,25 m² / cerda en corral grupal",
        widthCm: 150,
        lengthCm: 150,
        densityNote: "Grupos de 6 a 40 cerdas",
        welfareRating: "poor",
        welfareScore: 4,
        description: "Permite caminar y darse la vuelta durante la mayor parte de la gestación, aunque suelen volver a jaulas de paridera individuales semanas antes del parto.",
        freedoms: [
          { name: "Ponerse de pie y tumbarse", category: "locomotion", description: "Pleno.", allowedInSystem: true, scientificImpact: "Menos úlceras" },
          { name: "Darse la vuelta", category: "locomotion", description: "Posible en el corral.", allowedInSystem: true, scientificImpact: "Alivio motor significativo" },
          { name: "Interactuar socialmente", category: "social", description: "Vida en grupo.", allowedInSystem: true, scientificImpact: "Jerarquías y peleas por comida" },
          { name: "Hocicar en el suelo", category: "instinct", description: "Suelo de rejilla con poco enriquecimiento.", allowedInSystem: false, scientificImpact: "Estereotipias residuales" },
          { name: "Construir nido preparto", category: "instinct", description: "Trasladadas a paridera metálica.", allowedInSystem: false, scientificImpact: "Pérdida de bienestar en parto" }
        ]
      }
    ],
    scientificCitationId: "van-boeckel-antibiotics-2017"
  },

  calf: {
    speciesId: "calf",
    speciesName: "Ternero Lechero",
    scientificName: "Bos taurus (Cría macho/hembra lechera)",
    globalPopulation: "Más de 35 millones de terneros separados de sus madres en sus primeras 24 horas",
    keyIssueSummary: "Separados de sus madres nada más nacer para destinar la leche al consumo humano y confinados en casetas individuales.",
    naturalBehaviors: [
      {
        name: "Amamantamiento y vínculo materno-filial",
        spaceRequiredCm2OrM2: "Contacto directo con la vaca",
        description: "Lamerse mutuamente, reconocer la llamada sonora y mamar 6-10 veces al día.",
        deprivationConsequence: "Vocalizaciones angustiosas continuas (bramidos) durante días por separación traumática."
      },
      {
        name: "Juego locomotor y carreras",
        spaceRequiredCm2OrM2: ">5,0 m² en campo abierto",
        description: "Correr en círculos y saltar con otros terneros para el desarrollo neuromuscular.",
        deprivationConsequence: "Pérdida de masa ósea y dificultades de marcha al ser liberados."
      },
      {
        name: "Aseo social y lamido mutuo",
        spaceRequiredCm2OrM2: "Contacto con congéneres",
        description: "El acicalamiento mutuo reduce el ritmo cardíaco y los niveles de estrés en terneros.",
        deprivationConsequence: "Chupeteo compulsivo de barrotes de hierro o cubos de plástico."
      }
    ],
    systems: [
      {
        id: "individual_hutch",
        name: "Box / Caseta Individual de Aislamiento",
        legalStatus: "Legal hasta las 8 semanas de vida en la UE; sin límite en muchos países",
        region: "Global",
        areaCm2OrM2: "1,2 m² a 1,6 m² (150 cm × 90 cm)",
        widthCm: 90,
        lengthCm: 160,
        densityNote: "1 ternero lactante en aislamiento visual/táctil",
        welfareRating: "critical",
        welfareScore: 2,
        description: "Caseta de fibra de vidrio o plástico con pequeño corralito frontal. Impide el contacto físico con otros animales para evitar contagios de diarreas neonatales.",
        freedoms: [
          { name: "Ponerse de pie y tumbarse", category: "locomotion", description: "Posible en el interior de la caseta.", allowedInSystem: true, scientificImpact: "Espacio estricto" },
          { name: "Correr y saltar", category: "locomotion", description: "Imposible.", allowedInSystem: false, scientificImpact: "Déficit neuromuscular" },
          { name: "Mamar del pezón", category: "instinct", description: "Sustituido por tetina de plástico o cubo.", allowedInSystem: false, scientificImpact: "Frustración de succión oral" },
          { name: "Contacto social con congéneres", category: "social", description: "Aislado por paredes sólidas.", allowedInSystem: false, scientificImpact: "Depresión inmunológica y estrés" },
          { name: "Rumiar pasto fresco", category: "comfort", description: "Dieta láctea artificial controlada.", allowedInSystem: false, scientificImpact: "Anemia y desarrollo ruminal deficiente" }
        ]
      }
    ],
    scientificCitationId: "poore-nemecek-2018"
  },

  salmon: {
    speciesId: "salmon",
    speciesName: "Salmón Atlántico de Acuicultura",
    scientificName: "Salmo salar",
    globalPopulation: "Más de 1.000 millones de salmones en jaulas marinas cada año",
    keyIssueSummary: "Peces migratorios confinados en jaulas de red flotantes a densidades extremas donde nadan en círculos repetitivos.",
    naturalBehaviors: [
      {
        name: "Migración oceánica miles de kilómetros",
        spaceRequiredCm2OrM2: "Océano abierto y ríos de desove",
        description: "Nadar miles de kilómetros en mar abierto navegando gradientes térmicos y salinos.",
        deprivationConsequence: "Natación estereotipada en círculos concéntricos con colisiones continuas contra la red."
      },
      {
        name: "Evasión de parásitos y aguas anóxicas",
        spaceRequiredCm2OrM2: "Libertad de profundidad vertical",
        description: "Sumergirse a capas profundas y frías para evitar infestación de piojos de mar.",
        deprivationConsequence: "Infestación severa por Lepeophtheirus salmonis que devora la piel y mucosa de los peces vivos."
      }
    ],
    systems: [
      {
        id: "sea_cage_salmon",
        name: "Jaula Marina Abierta de Red",
        legalStatus: "Estándar global en Noruega, Chile, Escocia y Canadá",
        region: "Costas oceánicas",
        areaCm2OrM2: "15 a 25 kg de biomasa por m³ de agua",
        widthCm: 100,
        lengthCm: 100,
        densityNote: "Hasta 200.000 salmones por jaula de red",
        welfareRating: "poor",
        welfareScore: 2,
        description: "Anillos de flotación con redes suspendidas de 30 metros de profundidad. Altas concentraciones de excrementos, caída de oxígeno y mortalidad anual de hasta el 20-25% antes del sacrificio.",
        freedoms: [
          { name: "Nadar hacia adelante", category: "locomotion", description: "En banco circular constante.", allowedInSystem: true, scientificImpact: "Deformidades espinales" },
          { name: "Migrar en agua dulce y salada", category: "instinct", description: "Bloqueado por la jaula.", allowedInSystem: false, scientificImpact: "Fallo osmorregulador" },
          { name: "Evitar aguas cálidas y piojos", category: "comfort", description: "Atrapados en la columna de agua.", allowedInSystem: false, scientificImpact: "Llagas abiertas y ceguera" },
          { name: "Cazar presas vivas", category: "instinct", description: "Pellets de pienso seco extrusionado.", allowedInSystem: false, scientificImpact: "Alimentación no natural" }
        ]
      }
    ],
    scientificCitationId: "fishcount-aquatic-2020"
  }
};
