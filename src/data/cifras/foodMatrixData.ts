export type FoodCategory = 
  | "ruminant" 
  | "non_ruminant" 
  | "dairy_eggs" 
  | "seafood" 
  | "plant_protein" 
  | "plant_staple";

export interface FoodEnvironmentalMetric {
  id: string;
  name: string;
  category: FoodCategory;
  categoryLabel: string;
  /** Proteína del alimento en crudo/seco (g/kg), base FAO INFOODS vía Our World in Data. */
  proteinGramsPerKg: number;

  // Por Kilogramo de producto (Poore & Nemecek 2018 / OWID)
  ghgKgCO2eqPerKg: number;
  landM2PerKg: number;
  waterLitresPerKg: number;
  eutrophicationGramsPO4eqPerKg: number;

  // Por 100 gramos de proteína: perKg × 100 / proteinGramsPerKg
  ghgKgCO2eqPer100gProt: number;
  landM2Per100gProt: number;
  waterLitresPer100gProt: number;
  eutrophicationGramsPO4eqPer100gProt: number;
}

export const FOOD_CATEGORIES_INFO: Record<FoodCategory, { label: string; color: string; bgBadge: string }> = {
  ruminant: { label: "Carnes Rumiantes", color: "#ef4444", bgBadge: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20" },
  non_ruminant: { label: "Otras Carnes", color: "#f97316", bgBadge: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20" },
  dairy_eggs: { label: "Lácteos y Huevos", color: "#eab308", bgBadge: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20" },
  seafood: { label: "Pescados y Mariscos", color: "#06b6d4", bgBadge: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20" },
  plant_protein: { label: "Proteínas Vegetales", color: "#10b981", bgBadge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
  plant_staple: { label: "Cereales y Bebidas Veg.", color: "#3b82f6", bgBadge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" }
};

// Datos consolidados del metaanálisis de Poore & Nemecek (Science 2018) procesado por
// Our World in Data (grahpers ghg/land/water/eutrophying "per kg poore").
// Los valores por 100 g de proteína usan la proteína en crudo/seco (FAO INFOODS, vía OWID):
// ghg-per-protein-poore y land-use-protein-poore reproducen el resto de columnas.
export const MASTER_FOOD_MATRIX: FoodEnvironmentalMetric[] = [
  {
    id: "beef_pasture",
    name: "Carne de Vacuno (Pasto/Carne)",
    category: "ruminant",
    categoryLabel: "Carnes Rumiantes",
    proteinGramsPerKg: 199.4,
    ghgKgCO2eqPerKg: 99.48,
    landM2PerKg: 326.21,
    waterLitresPerKg: 1451.2,
    eutrophicationGramsPO4eqPerKg: 301.41,
    ghgKgCO2eqPer100gProt: 49.89,
    landM2Per100gProt: 163.60,
    waterLitresPer100gProt: 727.8,
    eutrophicationGramsPO4eqPer100gProt: 151.16
  },
  {
    id: "lamb_mutton",
    name: "Carne de Cordero y Cabra",
    category: "ruminant",
    categoryLabel: "Carnes Rumiantes",
    proteinGramsPerKg: 200.1,
    ghgKgCO2eqPerKg: 39.72,
    landM2PerKg: 369.81,
    waterLitresPerKg: 1802.8,
    eutrophicationGramsPO4eqPerKg: 97.13,
    ghgKgCO2eqPer100gProt: 19.85,
    landM2Per100gProt: 184.81,
    waterLitresPer100gProt: 901.0,
    eutrophicationGramsPO4eqPer100gProt: 48.54
  },
  {
    id: "beef_dairy_herd",
    name: "Carne de Vacuno (Cabaña Lechera)",
    category: "ruminant",
    categoryLabel: "Carnes Rumiantes",
    proteinGramsPerKg: 197.4,
    ghgKgCO2eqPerKg: 33.30,
    landM2PerKg: 43.24,
    waterLitresPerKg: 2714.3,
    eutrophicationGramsPO4eqPerKg: 365.29,
    ghgKgCO2eqPer100gProt: 16.87,
    landM2Per100gProt: 21.91,
    waterLitresPer100gProt: 1375.4,
    eutrophicationGramsPO4eqPer100gProt: 185.05
  },
  {
    id: "shrimp_farmed",
    name: "Langostinos / Camarón de Granja",
    category: "seafood",
    categoryLabel: "Pescados y Mariscos",
    proteinGramsPerKg: 147.7,
    ghgKgCO2eqPerKg: 26.87,
    landM2PerKg: 2.97,
    waterLitresPerKg: 3515.4,
    eutrophicationGramsPO4eqPerKg: 227.22,
    ghgKgCO2eqPer100gProt: 18.19,
    landM2Per100gProt: 2.01,
    waterLitresPer100gProt: 2380.2,
    eutrophicationGramsPO4eqPer100gProt: 153.84
  },
  {
    id: "cheese",
    name: "Queso Curado",
    category: "dairy_eggs",
    categoryLabel: "Lácteos y Huevos",
    proteinGramsPerKg: 220.8,
    ghgKgCO2eqPerKg: 23.88,
    landM2PerKg: 87.79,
    waterLitresPerKg: 5605.2,
    eutrophicationGramsPO4eqPerKg: 98.37,
    ghgKgCO2eqPer100gProt: 10.82,
    landM2Per100gProt: 39.76,
    waterLitresPer100gProt: 2538.8,
    eutrophicationGramsPO4eqPer100gProt: 44.55
  },
  {
    id: "fish_farmed",
    name: "Pescado de Piscifactoría (Salmón/Trucha)",
    category: "seafood",
    categoryLabel: "Pescados y Mariscos",
    proteinGramsPerKg: 228.0,
    ghgKgCO2eqPerKg: 13.63,
    landM2PerKg: 8.41,
    waterLitresPerKg: 3691.3,
    eutrophicationGramsPO4eqPerKg: 235.12,
    ghgKgCO2eqPer100gProt: 5.98,
    landM2Per100gProt: 3.69,
    waterLitresPer100gProt: 1619.0,
    eutrophicationGramsPO4eqPer100gProt: 103.12
  },
  {
    id: "pork",
    name: "Carne de Cerdo",
    category: "non_ruminant",
    categoryLabel: "Otras Carnes",
    proteinGramsPerKg: 161.8,
    ghgKgCO2eqPerKg: 12.31,
    landM2PerKg: 17.36,
    waterLitresPerKg: 1795.8,
    eutrophicationGramsPO4eqPerKg: 76.38,
    ghgKgCO2eqPer100gProt: 7.61,
    landM2Per100gProt: 10.73,
    waterLitresPer100gProt: 1109.9,
    eutrophicationGramsPO4eqPer100gProt: 47.21
  },
  {
    id: "poultry",
    name: "Carne de Pollo / Aves",
    category: "non_ruminant",
    categoryLabel: "Otras Carnes",
    proteinGramsPerKg: 173.2,
    ghgKgCO2eqPerKg: 9.87,
    landM2PerKg: 12.22,
    waterLitresPerKg: 660.0,
    eutrophicationGramsPO4eqPerKg: 48.70,
    ghgKgCO2eqPer100gProt: 5.70,
    landM2Per100gProt: 7.06,
    waterLitresPer100gProt: 381.1,
    eutrophicationGramsPO4eqPer100gProt: 28.12
  },
  {
    id: "eggs",
    name: "Huevos de Gallina",
    category: "dairy_eggs",
    categoryLabel: "Lácteos y Huevos",
    proteinGramsPerKg: 111.0,
    ghgKgCO2eqPerKg: 4.67,
    landM2PerKg: 6.27,
    waterLitresPerKg: 577.7,
    eutrophicationGramsPO4eqPerKg: 21.76,
    ghgKgCO2eqPer100gProt: 4.21,
    landM2Per100gProt: 5.65,
    waterLitresPer100gProt: 520.4,
    eutrophicationGramsPO4eqPer100gProt: 19.60
  },
  {
    id: "cow_milk",
    name: "Leche de Vaca Entera",
    category: "dairy_eggs",
    categoryLabel: "Lácteos y Huevos",
    proteinGramsPerKg: 33.0,
    ghgKgCO2eqPerKg: 3.15,
    landM2PerKg: 8.95,
    waterLitresPerKg: 628.2,
    eutrophicationGramsPO4eqPerKg: 10.65,
    ghgKgCO2eqPer100gProt: 9.55,
    landM2Per100gProt: 27.12,
    waterLitresPer100gProt: 1903.6,
    eutrophicationGramsPO4eqPer100gProt: 32.27
  },
  {
    id: "rice",
    name: "Arroz Blanco",
    category: "plant_staple",
    categoryLabel: "Cereales y Bebidas Veg.",
    proteinGramsPerKg: 71.0,
    ghgKgCO2eqPerKg: 4.45,
    landM2PerKg: 2.80,
    waterLitresPerKg: 2248.4,
    eutrophicationGramsPO4eqPerKg: 35.07,
    ghgKgCO2eqPer100gProt: 6.27,
    landM2Per100gProt: 3.94,
    waterLitresPer100gProt: 3166.8,
    eutrophicationGramsPO4eqPer100gProt: 49.39
  },
  {
    id: "tofu_soy",
    name: "Tofu / Proteína de Soja",
    category: "plant_protein",
    categoryLabel: "Proteínas Vegetales",
    proteinGramsPerKg: 160.0,
    ghgKgCO2eqPerKg: 3.16,
    landM2PerKg: 3.52,
    waterLitresPerKg: 148.6,
    eutrophicationGramsPO4eqPerKg: 6.16,
    ghgKgCO2eqPer100gProt: 1.98,
    landM2Per100gProt: 2.20,
    waterLitresPer100gProt: 92.9,
    eutrophicationGramsPO4eqPer100gProt: 3.85
  },
  {
    id: "soy_milk",
    name: "Bebida / Leche de Soja",
    category: "plant_protein",
    categoryLabel: "Proteínas Vegetales",
    proteinGramsPerKg: 30.0,
    ghgKgCO2eqPerKg: 0.98,
    landM2PerKg: 0.66,
    waterLitresPerKg: 27.8,
    eutrophicationGramsPO4eqPerKg: 1.06,
    ghgKgCO2eqPer100gProt: 3.27,
    landM2Per100gProt: 2.20,
    waterLitresPer100gProt: 92.7,
    eutrophicationGramsPO4eqPer100gProt: 3.53
  },
  {
    // Estimación propia fuera de P&N (bebida vegetal; no figura en el dataset original).
    id: "oat_milk",
    name: "Bebida de Avena (estimación)",
    category: "plant_staple",
    categoryLabel: "Cereales y Bebidas Veg.",
    proteinGramsPerKg: 10.0,
    ghgKgCO2eqPerKg: 0.90,
    landM2PerKg: 0.76,
    waterLitresPerKg: 48.2,
    eutrophicationGramsPO4eqPerKg: 1.62,
    ghgKgCO2eqPer100gProt: 9.00,
    landM2Per100gProt: 7.60,
    waterLitresPer100gProt: 482.0,
    eutrophicationGramsPO4eqPer100gProt: 16.20
  },
  {
    id: "pulses_lentils",
    name: "Legumbres (Lentejas / Garbanzos)",
    category: "plant_protein",
    categoryLabel: "Proteínas Vegetales",
    proteinGramsPerKg: 214.2,
    ghgKgCO2eqPerKg: 1.79,
    landM2PerKg: 15.57,
    waterLitresPerKg: 435.7,
    eutrophicationGramsPO4eqPerKg: 17.08,
    ghgKgCO2eqPer100gProt: 0.84,
    landM2Per100gProt: 7.27,
    waterLitresPer100gProt: 203.4,
    eutrophicationGramsPO4eqPer100gProt: 7.97
  },
  {
    id: "peas",
    name: "Guisantes Verdes",
    category: "plant_protein",
    categoryLabel: "Proteínas Vegetales",
    proteinGramsPerKg: 222.2,
    ghgKgCO2eqPerKg: 0.98,
    landM2PerKg: 7.46,
    waterLitresPerKg: 396.6,
    eutrophicationGramsPO4eqPerKg: 7.52,
    ghgKgCO2eqPer100gProt: 0.44,
    landM2Per100gProt: 3.36,
    waterLitresPer100gProt: 178.5,
    eutrophicationGramsPO4eqPer100gProt: 3.38
  },
  {
    id: "nuts",
    name: "Frutos Secos (Nueces / Almendras)",
    category: "plant_protein",
    categoryLabel: "Proteínas Vegetales",
    proteinGramsPerKg: 163.3,
    ghgKgCO2eqPerKg: 0.43,
    landM2PerKg: 12.96,
    waterLitresPerKg: 4133.8,
    eutrophicationGramsPO4eqPerKg: 19.15,
    ghgKgCO2eqPer100gProt: 0.26,
    landM2Per100gProt: 7.94,
    waterLitresPer100gProt: 2531.4,
    eutrophicationGramsPO4eqPer100gProt: 11.73
  },
  {
    id: "potatoes",
    name: "Patatas / Tubérculos",
    category: "plant_staple",
    categoryLabel: "Cereales y Bebidas Veg.",
    proteinGramsPerKg: 17.0,
    ghgKgCO2eqPerKg: 0.46,
    landM2PerKg: 0.88,
    waterLitresPerKg: 59.1,
    eutrophicationGramsPO4eqPerKg: 3.48,
    ghgKgCO2eqPer100gProt: 2.71,
    landM2Per100gProt: 5.18,
    waterLitresPer100gProt: 347.6,
    eutrophicationGramsPO4eqPer100gProt: 20.47
  }
];
