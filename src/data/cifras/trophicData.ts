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
  feedConversionRatio: number;      // kg feed to produce 1 kg live weight
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
    percentage: 77,
    millionKm2: 39.0,
    outputDescription: "Suministra únicamente el 18% de las calorías globales y el 37% de las proteínas consumidas por la humanidad.",
    color: "#ef4444"
  },
  {
    category: "Cultivos Directos para Consumo Humano",
    percentage: 23,
    millionKm2: 12.0,
    outputDescription: "Suministra el 82% de las calorías globales y el 63% de las proteínas consumidas por la humanidad.",
    color: "#10b981"
  }
];

export const GLOBAL_HARVEST_FLOW_DATA: GlobalHarvestFlowItem[] = [
  {
    stage: "Consumo Humano Directo",
    percentage: 36,
    caloriesTrillionsKcal: 3600,
    color: "#10b981",
    description: "Cereales, legumbres, frutas, tubérculos y hortalizas consumidos directamente por los 8.000 millones de personas."
  },
  {
    stage: "Piensos para Ganado (Pérdida Metabólica)",
    percentage: 55,
    caloriesTrillionsKcal: 5500,
    color: "#ef4444",
    description: "Maíz, soja forrajera, cebada y trigo destinados a engordar animales. Entre el 80% y el 97% de esta energía se disipa en calor corporal, movimiento y heces."
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
    description: "Reducción del 50%: libera 1.550 millones de hectáreas (toda la superficie de Rusia) y absorbe más de 235 Gt de CO₂ en biomasa forestal nativa en 30 años."
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
    description: "Transición 100% basada en plantas (Poore & Nemecek 2018 / Hayek et al. 2021): libera 3.100 millones de hectáreas (el tamaño del continente africano completo) y captura 547 Gt de CO₂, neutralizando 16 años de emisiones humanas."
  }
];

export const TROPHIC_EFFICIENCY_DATA: TrophicEfficiencyItem[] = [
  {
    product: "Carne de Vacuno (Feedlot / Cebo)",
    caloricEfficiencyPercent: 2.5,
    proteinEfficiencyPercent: 3.8,
    feedConversionRatio: 12.0,
    energyLossPercent: 97.5,
    color: "#b91c1c",
    metabolicNote: "Por cada 100 kcal de pienso y forraje ingeridos, el vacuno retiene únicamente 2,5 kcal en carne comestible. El 97,5% se pierde en mantenimiento basal, metano entérico y calor."
  },
  {
    product: "Carne de Cerdo",
    caloricEfficiencyPercent: 10.0,
    proteinEfficiencyPercent: 12.5,
    feedConversionRatio: 4.5,
    energyLossPercent: 90.0,
    color: "#ea580c",
    metabolicNote: "Por cada 100 kcal de cereales y soja, se obtienen 10 kcal de carne. Se pierden 9 de cada 10 calorías cultivadas."
  },
  {
    product: "Pollo de Engorde (Broiler industrial)",
    caloricEfficiencyPercent: 18.0,
    proteinEfficiencyPercent: 21.0,
    feedConversionRatio: 2.2,
    energyLossPercent: 82.0,
    color: "#d97706",
    metabolicNote: "Incluso con la selección genética más extrema para conversión, se desperdicia el 82% de las calorías del pienso vegetal."
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
    feedConversionRatio: 1.8,
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
