export interface MammalBiomassGroup {
  id: string;
  label: string;
  percent: number; // 0 to 100
  gigatonsCarbon: number;
  color: string;
  description: string;
  subGroups?: {
    name: string;
    percent: number;
    description: string;
  }[];
}

export interface SupplyChainEmissionsItem {
  food: string;
  category: "ruminant" | "meat" | "dairy_egg" | "fish" | "plant_protein" | "plant_staple";
  landUseChange: number; // kg CO2eq / kg product
  farmEmissions: number;
  animalFeed: number;
  processing: number;
  transport: number;
  packaging: number;
  retail: number;
  totalKgCO2eq: number;
  proteinGramsPerKg: number;
  co2Per100gProtein: number;
}

export interface DeforestationDriver {
  name: string;
  sharePercent: number;
  annualHectaresLoss: string;
  primaryRegions: string;
  driverDetail: string;
  color: string;
}

// Datos de Bar-On et al., PNAS (2018)
export const MAMMAL_BIOMASS_GROUPS: MammalBiomassGroup[] = [
  {
    id: "livestock",
    label: "Ganado Doméstico",
    percent: 62,
    gigatonsCarbon: 0.10,
    color: "#ef4444", // red
    description: "Animales criados por el ser humano para carne, lácteos, huevos y cuero.",
    subGroups: [
      { name: "Vacas y Búfalos", percent: 38.5, description: "La especie con mayor masa biológica individual del planeta." },
      { name: "Cerdos", percent: 12.0, description: "Más de 1.500 millones de cerdos en granjas intensivas." },
      { name: "Ovejas y Cabras", percent: 8.5, description: "Ganadería ovina y caprina extensiva e intensiva." },
      { name: "Caballos, Asnos y Camélidos", percent: 3.0, description: "Animales de tiro y pastoreo tradicional." }
    ]
  },
  {
    id: "humans",
    label: "Humanos",
    percent: 34,
    gigatonsCarbon: 0.06,
    color: "#3b82f6", // blue
    description: "Más de 8.000 millones de personas que habitan la superficie terrestre.",
    subGroups: [
      { name: "Población Humana Global", percent: 34.0, description: "Consumo de recursos y alimentos que sostiene al 62% ganadero." }
    ]
  },
  {
    id: "wild_mammals",
    label: "Mamíferos Silvestres",
    percent: 4,
    gigatonsCarbon: 0.007,
    color: "#10b981", // emerald
    description: "Todos los mamíferos salvajes del planeta juntos: elefantes, ballenas, ciervos, leones, osos, lobos, primates, delfines y roedores.",
    subGroups: [
      { name: "Mamíferos Terrestres Silvestres", percent: 2.3, description: "Fauna salvaje en bosques, sabanas y tundras." },
      { name: "Mamíferos Marinos (Cetáceos, Focas)", percent: 1.7, description: "Ballenas, orcas, delfines y pinnípedos." }
    ]
  }
];

// Comparativa de Aves: 70% aves de corral de granja vs 30% aves silvestres
export const BIRD_BIOMASS_GROUPS = {
  poultryPercent: 70, // predominantemente pollos broilers
  wildBirdsPercent: 30
};

// Datos del metaanálisis de Poore & Nemecek (Science 2018)
export const SUPPLY_CHAIN_EMISSIONS_DATA: SupplyChainEmissionsItem[] = [
  {
    food: "Carne de Vacuno (Ganado de Carne)",
    category: "ruminant",
    landUseChange: 16.3,
    farmEmissions: 39.4,
    animalFeed: 39.0,
    processing: 1.3,
    transport: 0.3,
    packaging: 0.2,
    retail: 3.0,
    totalKgCO2eq: 99.5,
    proteinGramsPerKg: 200,
    co2Per100gProtein: 49.75
  },
  {
    food: "Carne de Cordero y Cabrito",
    category: "ruminant",
    landUseChange: 0.5,
    farmEmissions: 35.1,
    animalFeed: 2.4,
    processing: 1.1,
    transport: 0.5,
    packaging: 0.3,
    retail: 0.2,
    totalKgCO2eq: 40.1,
    proteinGramsPerKg: 200,
    co2Per100gProtein: 20.05
  },
  {
    food: "Carne de Vacuno (Cabaña Lechera)",
    category: "ruminant",
    landUseChange: 0.9,
    farmEmissions: 15.7,
    animalFeed: 2.5,
    processing: 0.7,
    transport: 0.4,
    packaging: 0.2,
    retail: 0.7,
    totalKgCO2eq: 21.1,
    proteinGramsPerKg: 200,
    co2Per100gProtein: 10.55
  },
  {
    food: "Queso",
    category: "dairy_egg",
    landUseChange: 4.5,
    farmEmissions: 13.1,
    animalFeed: 2.3,
    processing: 0.7,
    transport: 0.1,
    packaging: 0.2,
    retail: 0.3,
    totalKgCO2eq: 21.2,
    proteinGramsPerKg: 220,
    co2Per100gProtein: 9.64
  },
  {
    food: "Piscifactoría (Pescado de Granja)",
    category: "fish",
    landUseChange: 0.5,
    farmEmissions: 3.6,
    animalFeed: 6.8,
    processing: 0.1,
    transport: 0.1,
    packaging: 0.1,
    retail: 0.2,
    totalKgCO2eq: 11.4,
    proteinGramsPerKg: 200,
    co2Per100gProtein: 5.70
  },
  {
    food: "Carne de Cerdo",
    category: "meat",
    landUseChange: 1.5,
    farmEmissions: 1.7,
    animalFeed: 2.9,
    processing: 0.3,
    transport: 0.3,
    packaging: 0.3,
    retail: 0.2,
    totalKgCO2eq: 7.2,
    proteinGramsPerKg: 170,
    co2Per100gProtein: 4.24
  },
  {
    food: "Carne de Pollo / Aves",
    category: "meat",
    landUseChange: 2.5,
    farmEmissions: 0.7,
    animalFeed: 1.8,
    processing: 0.4,
    transport: 0.3,
    packaging: 0.2,
    retail: 0.2,
    totalKgCO2eq: 6.1,
    proteinGramsPerKg: 175,
    co2Per100gProtein: 3.49
  },
  {
    food: "Huevos",
    category: "dairy_egg",
    landUseChange: 0.7,
    farmEmissions: 1.3,
    animalFeed: 2.2,
    processing: 0.0,
    transport: 0.1,
    packaging: 0.2,
    retail: 0.0,
    totalKgCO2eq: 4.5,
    proteinGramsPerKg: 110,
    co2Per100gProtein: 4.09
  },
  {
    food: "Arroz",
    category: "plant_staple",
    landUseChange: 0.0,
    farmEmissions: 3.6,
    animalFeed: 0.0,
    processing: 0.1,
    transport: 0.1,
    packaging: 0.1,
    retail: 0.1,
    totalKgCO2eq: 4.0,
    proteinGramsPerKg: 27,
    co2Per100gProtein: 14.81
  },
  {
    food: "Leche de Vaca",
    category: "dairy_egg",
    landUseChange: 0.5,
    farmEmissions: 1.5,
    animalFeed: 0.6,
    processing: 0.1,
    transport: 0.1,
    packaging: 0.1,
    retail: 0.3,
    totalKgCO2eq: 3.2,
    proteinGramsPerKg: 33,
    co2Per100gProtein: 9.70
  },
  {
    food: "Tofu / Proteína de Soja",
    category: "plant_protein",
    landUseChange: 1.0,
    farmEmissions: 0.8,
    animalFeed: 0.0,
    processing: 0.8,
    transport: 0.2,
    packaging: 0.2,
    retail: 0.2,
    totalKgCO2eq: 3.2,
    proteinGramsPerKg: 160,
    co2Per100gProtein: 2.00
  },
  {
    food: "Leche de Soja",
    category: "plant_protein",
    landUseChange: 0.2,
    farmEmissions: 0.1,
    animalFeed: 0.0,
    processing: 0.3,
    transport: 0.1,
    packaging: 0.1,
    retail: 0.1,
    totalKgCO2eq: 0.9,
    proteinGramsPerKg: 30,
    co2Per100gProtein: 3.00
  },
  {
    food: "Leche de Avena",
    category: "plant_staple",
    landUseChange: 0.0,
    farmEmissions: 0.4,
    animalFeed: 0.0,
    processing: 0.2,
    transport: 0.1,
    packaging: 0.1,
    retail: 0.1,
    totalKgCO2eq: 0.9,
    proteinGramsPerKg: 10,
    co2Per100gProtein: 9.00
  },
  {
    food: "Guisantes y Legumbres",
    category: "plant_protein",
    landUseChange: 0.0,
    farmEmissions: 0.7,
    animalFeed: 0.0,
    processing: 0.0,
    transport: 0.1,
    packaging: 0.1,
    retail: 0.0,
    totalKgCO2eq: 0.9,
    proteinGramsPerKg: 80,
    co2Per100gProtein: 1.13
  },
  {
    food: "Frutos Secos (Nueces / Almendras)",
    category: "plant_protein",
    landUseChange: -1.3, // Fijación de carbono en masa forestal de árboles leñosos
    farmEmissions: 0.9,
    animalFeed: 0.0,
    processing: 0.1,
    transport: 0.1,
    packaging: 0.1,
    retail: 0.0,
    totalKgCO2eq: -0.1,
    proteinGramsPerKg: 210,
    co2Per100gProtein: -0.05
  }
];

// Datos de Pendrill et al. (Science 2022)
export const DEFORESTATION_DRIVERS_DATA: DeforestationDriver[] = [
  {
    name: "Pastoreo de Ganado Vacuno",
    sharePercent: 41.2,
    annualHectaresLoss: "2,1 millones ha/año",
    primaryRegions: "Amazonía (Brasil, Bolivia, Perú), Gran Chaco y Centroamérica",
    driverDetail: "La tala y quema masiva de selva tropical virgen para crear pasturas de pastoreo extensivo de vacuno es el mayor motor directo de deforestación del planeta.",
    color: "#ef4444"
  },
  {
    name: "Semillas Oleaginosas (Soja para Pienso y Palma)",
    sharePercent: 18.4,
    annualHectaresLoss: "950.000 ha/año",
    primaryRegions: "Cerrado y Amazonía brasileña (soja) e Indonesia/Malasia (palma)",
    driverDetail: "Más del 77% de la soja cultivada en tierras desmontadas en Sudamérica se exporta para alimentar cerdos, pollos y vacas en la UE y China.",
    color: "#f59e0b"
  },
  {
    name: "Silvicultura y Explotación Maderera",
    sharePercent: 12.8,
    annualHectaresLoss: "660.000 ha/año",
    primaryRegions: "Sudeste Asiático, Cuenca del Congo y Boreal",
    driverDetail: "Extracción selectiva y tala para pulpa de papel y madera de construcción.",
    color: "#10b981"
  },
  {
    name: "Cultivos Directos para Consumo Humano",
    sharePercent: 13.1,
    annualHectaresLoss: "680.000 ha/año",
    primaryRegions: "África Subsahariana y Sudeste Asiático",
    driverDetail: "Agricultura de subsistencia local de maíz, mandioca, arroz y hortalizas.",
    color: "#3b82f6"
  },
  {
    name: "Cultivos Comerciales (Café, Cacao, Caucho)",
    sharePercent: 5.2,
    annualHectaresLoss: "270.000 ha/año",
    primaryRegions: "África Occidental (Costa de Marfil, Ghana) y Sudeste Asiático",
    driverDetail: "Plantaciones para mercados de exportación globales.",
    color: "#8b5cf6"
  },
  {
    name: "Otros Usos, Minería e Incendios Inducidos",
    sharePercent: 9.3,
    annualHectaresLoss: "480.000 ha/año",
    primaryRegions: "Global",
    driverDetail: "Infraestructuras viales, minería y expansión urbana dispersa.",
    color: "#6b7280"
  }
];
