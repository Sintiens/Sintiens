export interface LandAllocationItem {
  category: string;
  percentage: number;
  millionKm2: number;
  outputDescription: string;
  color: string;
}

export interface TrophicEfficiencyItem {
  product: string;
  caloricEfficiencyPercent: number; // % kcal out per 100 kcal feed in
  proteinEfficiencyPercent: number; // % g protein out per 100 g feed in
  feedConversionRatio: number;      // kg de materia seca de pienso por kg de producto comestible (ref. Alexander et al. 2017)
  energyLossPercent: number;        // % wasted in heat and feces
  color: string;
  metabolicNote: string;
}

export interface GlobalHarvestFlowItem {
  stage: string;
  percentage: number;
  caloriesTrillionsKcal: number;
  color: string;
  description: string;
}

export interface RewildingScenario {
  shiftPercent: number;
  landFreedMillionHa: number;
  co2SequestrationGt: number;
  description: string;
}

export const GLOBAL_LAND_ALLOCATION: LandAllocationItem[] = [
  {
    category: "Ganadería (Pastos + Cultivos Forrajeros)",
    percentage: 83,
    millionKm2: 42.3,
    outputDescription: "Suministra únicamente el 18% de las calorías globales y el 37% de las proteínas consumidas por la humanidad.",
    color: "#ef4444"
  },
  {
    category: "Cultivos Directos para Consumo Humano",
    percentage: 17,
    millionKm2: 8.7,
    outputDescription: "Suministra el 82% de las calorías globales y el 63% de las proteínas consumidas por la humanidad.",
    color: "#10b981"
  }
];

export const GLOBAL_HARVEST_FLOW_DATA: GlobalHarvestFlowItem[] = [
  {
    stage: "Consumo Humano Directo",
    percentage: 55,
    caloriesTrillionsKcal: 5500,
    color: "#10b981",
    description: "Cereales, legumbres, frutas, tubérculos y hortalizas consumidos directamente por los 8.000 millones de personas (Cassidy et al. 2013)."
  },
  {
    stage: "Piensos para Ganado (Pérdida Metabólica)",
    percentage: 36,
    caloriesTrillionsKcal: 3600,
    color: "#ef4444",
    description: "Maíz, soja forrajera, cebada y trigo destinados a engordar animales. Más del 88% de esta energía se disipa en calor corporal, movimiento y heces."
  },
  {
    stage: "Biocombustibles y Usos Industriales",
    percentage: 9,
    caloriesTrillionsKcal: 900,
    color: "#f59e0b",
    description: "Bioetanol, biodiésel, almidones industriales y aceites no alimentarios."
  }
];

export const REWILDING_SCENARIOS: RewildingScenario[] = [
  {
    shiftPercent: 25,
    landFreedMillionHa: 775,
    co2SequestrationGt: 110,
    description: "Reducción del 25% del consumo global de carne: libera una superficie equivalente al doble de la Unión Europea y secuestra el equivalente a 3 años de emisiones fósiles globales."
  },
  {
    shiftPercent: 50,
    landFreedMillionHa: 1550,
    co2SequestrationGt: 235,
    description: "Reducción del 50%: libera 1.550 millones de hectáreas (casi la superficie de Rusia) y absorbe más de 235 Gt de CO₂ en biomasa forestal nativa en 30 años."
  },
  {
    shiftPercent: 75,
    landFreedMillionHa: 2325,
    co2SequestrationGt: 380,
    description: "Reducción del 75%: libera 2.325 millones de hectáreas para regeneración masiva de bosques templados y selvas tropicales."
  },
  {
    shiftPercent: 100,
    landFreedMillionHa: 3100,
    co2SequestrationGt: 547,
    description: "Transición 100% basada en plantas (Poore & Nemecek 2018; Hayek et al. 2021): libera 3.100 millones de hectáreas (el tamaño del continente africano) y captura del orden de 547 Gt de CO₂ (escenario vegano publicado: −547 Gt a 2050, intervalo −358 a −743), equivalente a ≈15 años de emisiones fósiles actuales."
  }
];

export const TROPHIC_EFFICIENCY_DATA: TrophicEfficiencyItem[] = [
  {
    product: "Carne de Vacuno (Feedlot / Cebo)",
    caloricEfficiencyPercent: 1.9,
    proteinEfficiencyPercent: 3.8,
    feedConversionRatio: 25.0,
    energyLossPercent: 98.1,
    color: "#b91c1c",
    metabolicNote: "Por cada 100 kcal de pienso y forraje ingeridos, el vacuno retiene únicamente 1,9 kcal en carne comestible. El 98,1% se pierde en mantenimiento basal, metano entérico y calor."
  },
  {
    product: "Carne de Cerdo",
    caloricEfficiencyPercent: 8.6,
    proteinEfficiencyPercent: 8.9,
    feedConversionRatio: 6.5,
    energyLossPercent: 91.4,
    color: "#ea580c",
    metabolicNote: "Por cada 100 kcal de cereales y soja, se obtienen 8,6 kcal de carne. Se pierden más de 9 de cada 10 calorías cultivadas."
  },
  {
    product: "Pollo de Engorde (Broiler industrial)",
    caloricEfficiencyPercent: 11.2,
    proteinEfficiencyPercent: 19.6,
    feedConversionRatio: 3.3,
    energyLossPercent: 88.8,
    color: "#d97706",
    metabolicNote: "Incluso con la selección genética más extrema para conversión, se desperdicia el 88,8% de las calorías del pienso vegetal (y el 80,4% de su proteína)."
  },
  {
    product: "Huevos de Gallina",
    caloricEfficiencyPercent: 19.0,
    proteinEfficiencyPercent: 25.0,
    feedConversionRatio: 2.3,
    energyLossPercent: 81.0,
    color: "#ca8a04",
    metabolicNote: "El 81% de las calorías del pienso se disipan en el metabolismo corporal de la gallina ponedora."
  },
  {
    product: "Leche de Vaca",
    caloricEfficiencyPercent: 24.0,
    proteinEfficiencyPercent: 26.0,
    feedConversionRatio: 0.7,
    energyLossPercent: 76.0,
    color: "#2563eb",
    metabolicNote: "Conversión de rumen a glándula mamaria: pérdida del 76% de la energía calórica ingerida."
  },
  {
    product: "Legumbres y Tofu (Consumo Humano Directo)",
    caloricEfficiencyPercent: 100.0,
    proteinEfficiencyPercent: 100.0,
    feedConversionRatio: 1.0,
    energyLossPercent: 0.0,
    color: "#16a34a",
    metabolicNote: "Eficiencia del 100%: no existe intermediación animal ni pérdida por termogénesis basal. Todas las calorías y proteínas cosechadas alimentan directamente a los seres humanos."
  }
];
