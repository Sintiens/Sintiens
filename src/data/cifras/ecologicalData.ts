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
  losses: number; // pérdidas entre granja y minorista (Food Balance Sheets, FAO)
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

// Datos de Bar-On et al., PNAS (2018): 0,10 / 0,06 / 0,007 Gt C → 60% / 36% / 4%.
// Nota: el estudio de Greenspoon et al. (PNAS 2023) revisa ligeramente los valores
// (36% humanos, 59% ganado+mascotas, 5% silvestres); se mantiene Bar-On por coherencia.
export const MAMMAL_BIOMASS_GROUPS: MammalBiomassGroup[] = [
  {
    id: "livestock",
    label: "Ganado Doméstico",
    percent: 60,
    gigatonsCarbon: 0.10,
    color: "#ef4444", // red
    description: "Animales criados por el ser humano para carne, lácteos, huevos y cuero.",
    subGroups: [
      { name: "Vacas y Búfalos", percent: 37.3, description: "La mayor biomasa agregada de mamíferos del planeta (≈420 Mt)." },
      { name: "Cerdos", percent: 11.6, description: "Unos 800 millones de cerdos vivos; ~1.500 millones sacrificados al año." },
      { name: "Ovejas y Cabras", percent: 8.2, description: "Ganadería ovina y caprina extensiva e intensiva." },
      { name: "Caballos, Asnos y Camélidos", percent: 2.9, description: "Animales de tiro y pastoreo tradicional." }
    ]
  },
  {
    id: "humans",
    label: "Humanos",
    percent: 36,
    gigatonsCarbon: 0.06,
    color: "#3b82f6", // blue
    description: "Más de 8.000 millones de personas que habitan el planeta.",
    subGroups: [
      { name: "Población Humana Global", percent: 36.0, description: "Consumo de recursos y alimentos que sostiene al 60% de la biomasa ganadera." }
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
      { name: "Mamíferos Marinos (Cetáceos, Focas)", percent: 2.4, description: "Ballenas, orcas, delfines y pinnípedos (≈0,004 Gt C)." },
      { name: "Mamíferos Terrestres Silvestres", percent: 1.8, description: "Fauna salvaje en bosques, sabanas y tundras (≈0,003 Gt C)." }
    ]
  }
];

// Comparativa de Aves (Bar-On 2018 / OWID): 71% aves de corral vs 29% silvestres.
export const BIRD_BIOMASS_GROUPS = {
  poultryPercent: 71, // predominantemente pollos broilers
  wildBirdsPercent: 29
};

// Poore & Nemecek (Science 2018), procesado por Our World in Data.
// Etapas por kg de producto (grapher "food-emissions-supply-chain", 2018).
// La suma de etapas = total medio por kg de "ghg-per-kg-poore".
// "Leche de Avena" es una estimación propia fuera de P&N (marcada en comentario).
export const SUPPLY_CHAIN_EMISSIONS_DATA: SupplyChainEmissionsItem[] = [
  {
    food: "Carne de Vacuno (Ganado de Carne)",
    category: "ruminant",
    landUseChange: 23.24,
    farmEmissions: 56.23,
    animalFeed: 2.68,
    processing: 1.81,
    transport: 0.49,
    packaging: 0.35,
    retail: 0.23,
    losses: 14.44,
    totalKgCO2eq: 99.48,
    proteinGramsPerKg: 200,
    co2Per100gProtein: 49.74
  },
  {
    food: "Carne de Cordero y Cabrito",
    category: "ruminant",
    landUseChange: 0.65,
    farmEmissions: 27.03,
    animalFeed: 3.28,
    processing: 1.54,
    transport: 0.68,
    packaging: 0.35,
    retail: 0.30,
    losses: 5.90,
    totalKgCO2eq: 39.72,
    proteinGramsPerKg: 200,
    co2Per100gProtein: 19.86
  },
  {
    food: "Carne de Vacuno (Cabaña Lechera)",
    category: "ruminant",
    landUseChange: 1.27,
    farmEmissions: 21.92,
    animalFeed: 3.50,
    processing: 1.55,
    transport: 0.59,
    packaging: 0.37,
    retail: 0.25,
    losses: 3.85,
    totalKgCO2eq: 33.30,
    proteinGramsPerKg: 200,
    co2Per100gProtein: 16.65
  },
  {
    food: "Queso",
    category: "dairy_egg",
    landUseChange: 4.47,
    farmEmissions: 13.10,
    animalFeed: 2.35,
    processing: 0.74,
    transport: 0.14,
    packaging: 0.17,
    retail: 0.33,
    losses: 2.58,
    totalKgCO2eq: 23.88,
    proteinGramsPerKg: 220,
    co2Per100gProtein: 10.85
  },
  {
    food: "Piscifactoría (Pescado de Granja)",
    category: "fish",
    landUseChange: 1.19,
    farmEmissions: 8.06,
    animalFeed: 1.83,
    processing: 0.04,
    transport: 0.25,
    packaging: 0.14,
    retail: 0.09,
    losses: 2.03,
    totalKgCO2eq: 13.63,
    proteinGramsPerKg: 200,
    co2Per100gProtein: 6.82
  },
  {
    food: "Carne de Cerdo",
    category: "meat",
    landUseChange: 2.24,
    farmEmissions: 2.48,
    animalFeed: 4.30,
    processing: 0.42,
    transport: 0.50,
    packaging: 0.43,
    retail: 0.28,
    losses: 1.66,
    totalKgCO2eq: 12.31,
    proteinGramsPerKg: 170,
    co2Per100gProtein: 7.24
  },
  {
    food: "Carne de Pollo / Aves",
    category: "meat",
    landUseChange: 3.51,
    farmEmissions: 0.93,
    animalFeed: 2.45,
    processing: 0.61,
    transport: 0.38,
    packaging: 0.29,
    retail: 0.24,
    losses: 1.45,
    totalKgCO2eq: 9.87,
    proteinGramsPerKg: 175,
    co2Per100gProtein: 5.64
  },
  {
    food: "Huevos",
    category: "dairy_egg",
    landUseChange: 0.71,
    farmEmissions: 1.32,
    animalFeed: 2.21,
    processing: 0.00,
    transport: 0.08,
    packaging: 0.16,
    retail: 0.04,
    losses: 0.15,
    totalKgCO2eq: 4.67,
    proteinGramsPerKg: 110,
    co2Per100gProtein: 4.25
  },
  {
    food: "Arroz",
    category: "plant_staple",
    landUseChange: -0.02,
    farmEmissions: 3.55,
    animalFeed: 0.00,
    processing: 0.07,
    transport: 0.10,
    packaging: 0.08,
    retail: 0.06,
    losses: 0.61,
    totalKgCO2eq: 4.45,
    proteinGramsPerKg: 27,
    co2Per100gProtein: 16.48
  },
  {
    food: "Leche de Vaca",
    category: "dairy_egg",
    landUseChange: 0.51,
    farmEmissions: 1.51,
    animalFeed: 0.24,
    processing: 0.15,
    transport: 0.09,
    packaging: 0.10,
    retail: 0.27,
    losses: 0.27,
    totalKgCO2eq: 3.15,
    proteinGramsPerKg: 33,
    co2Per100gProtein: 9.55
  },
  {
    food: "Tofu / Proteína de Soja",
    category: "plant_protein",
    landUseChange: 0.96,
    farmEmissions: 0.49,
    animalFeed: 0.00,
    processing: 0.79,
    transport: 0.18,
    packaging: 0.18,
    retail: 0.27,
    losses: 0.29,
    totalKgCO2eq: 3.16,
    proteinGramsPerKg: 160,
    co2Per100gProtein: 1.98
  },
  {
    food: "Leche de Soja",
    category: "plant_protein",
    landUseChange: 0.18,
    farmEmissions: 0.09,
    animalFeed: 0.00,
    processing: 0.16,
    transport: 0.11,
    packaging: 0.10,
    retail: 0.27,
    losses: 0.06,
    totalKgCO2eq: 0.98,
    proteinGramsPerKg: 30,
    co2Per100gProtein: 3.27
  },
  {
    // Estimación propia fuera de P&N (bebida vegetal; no figura en el dataset original).
    food: "Leche de Avena (estimación)",
    category: "plant_staple",
    landUseChange: 0.00,
    farmEmissions: 0.40,
    animalFeed: 0.00,
    processing: 0.20,
    transport: 0.10,
    packaging: 0.10,
    retail: 0.10,
    losses: 0.00,
    totalKgCO2eq: 0.90,
    proteinGramsPerKg: 10,
    co2Per100gProtein: 9.00
  },
  {
    food: "Guisantes (Legumbres)",
    category: "plant_protein",
    landUseChange: 0.00,
    farmEmissions: 0.72,
    animalFeed: 0.00,
    processing: 0.00,
    transport: 0.10,
    packaging: 0.04,
    retail: 0.04,
    losses: 0.08,
    totalKgCO2eq: 0.98,
    proteinGramsPerKg: 80,
    co2Per100gProtein: 1.23
  },
  {
    food: "Frutos Secos (Nueces / Almendras)",
    category: "plant_protein",
    landUseChange: -3.26, // Fijación de carbono en masa forestal de árboles leñosos (dato P&N)
    farmEmissions: 3.37,
    animalFeed: 0.00,
    processing: 0.05,
    transport: 0.11,
    packaging: 0.12,
    retail: 0.04,
    losses: -0.01,
    totalKgCO2eq: 0.43,
    proteinGramsPerKg: 210,
    co2Per100gProtein: 0.20
  }
];

// Reparto por commodity: Pendrill et al. 2019 (Global Environmental Change), difundido por OWID.
// Contexto: Pendrill et al. 2022 (Science) estima que el 90-99% de la deforestación tropical
// está ligada a la agricultura, pero solo el 45-65% termina en producción agrícola.
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
    driverDetail: "A nivel mundial, alrededor del 77% de la soja se destina a pienso (aves, cerdos y acuicultura). En la Amazonía brasileña el principal motor ha sido el pastoreo; la soja pesa más en el Cerrado.",
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
