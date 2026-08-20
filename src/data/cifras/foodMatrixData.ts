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
  proteinGramsPerKg: number;
  caloriesPerKg: number;
  
  // Por Kilogramo de producto
  ghgKgCO2eqPerKg: number;
  landM2PerKg: number;
  waterLitresPerKg: number;
  eutrophicationGramsPO4eqPerKg: number;
  
  // Por 100 gramos de proteína
  ghgKgCO2eqPer100gProt: number;
  landM2Per100gProt: number;
  waterLitresPer100gProt: number;
  eutrophicationGramsPO4eqPer100gProt: number;

  multiplierCO2VsTofu: number;
  multiplierLandVsTofu: number;
  badge?: string;
}

export const FOOD_CATEGORIES_INFO: Record<FoodCategory, { label: string; color: string; bgBadge: string }> = {
  ruminant: { label: "Carnes Rumiantes", color: "#ef4444", bgBadge: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20" },
  non_ruminant: { label: "Otras Carnes", color: "#f97316", bgBadge: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20" },
  dairy_eggs: { label: "Lácteos y Huevos", color: "#eab308", bgBadge: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20" },
  seafood: { label: "Pescados y Mariscos", color: "#06b6d4", bgBadge: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20" },
  plant_protein: { label: "Proteínas Vegetales", color: "#10b981", bgBadge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
  plant_staple: { label: "Cereales y Bebidas Veg.", color: "#3b82f6", bgBadge: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" }
};

// Datos consolidados del metaanálisis de Oxford (Poore & Nemecek, Science 2018 / Our World in Data)
export const MASTER_FOOD_MATRIX: FoodEnvironmentalMetric[] = [
  {
    id: "beef_pasture",
    name: "Carne de Vacuno (Pasto/Carne)",
    category: "ruminant",
    categoryLabel: "Carnes Rumiantes",
    proteinGramsPerKg: 200,
    caloriesPerKg: 2500,
    ghgKgCO2eqPerKg: 99.48,
    landM2PerKg: 326.21,
    waterLitresPerKg: 1451.2,
    eutrophicationGramsPO4eqPerKg: 301.41,
    ghgKgCO2eqPer100gProt: 49.74,
    landM2Per100gProt: 163.11,
    waterLitresPer100gProt: 725.6,
    eutrophicationGramsPO4eqPer100gProt: 150.71,
    multiplierCO2VsTofu: 31.1,
    multiplierLandVsTofu: 96.0,
    badge: "Máximo impacto"
  },
  {
    id: "lamb_mutton",
    name: "Carne de Cordero y Cabra",
    category: "ruminant",
    categoryLabel: "Carnes Rumiantes",
    proteinGramsPerKg: 200,
    caloriesPerKg: 2940,
    ghgKgCO2eqPerKg: 39.72,
    landM2PerKg: 369.81,
    waterLitresPerKg: 1802.8,
    eutrophicationGramsPO4eqPerKg: 97.13,
    ghgKgCO2eqPer100gProt: 19.86,
    landM2Per100gProt: 184.91,
    waterLitresPer100gProt: 901.4,
    eutrophicationGramsPO4eqPer100gProt: 48.57,
    multiplierCO2VsTofu: 12.4,
    multiplierLandVsTofu: 108.8
  },
  {
    id: "beef_dairy_herd",
    name: "Carne de Vacuno (Cabaña Lechera)",
    category: "ruminant",
    categoryLabel: "Carnes Rumiantes",
    proteinGramsPerKg: 200,
    caloriesPerKg: 2500,
    ghgKgCO2eqPerKg: 33.30,
    landM2PerKg: 43.20,
    waterLitresPerKg: 2714.3,
    eutrophicationGramsPO4eqPerKg: 110.50,
    ghgKgCO2eqPer100gProt: 16.65,
    landM2Per100gProt: 21.60,
    waterLitresPer100gProt: 1357.2,
    eutrophicationGramsPO4eqPer100gProt: 55.25,
    multiplierCO2VsTofu: 10.4,
    multiplierLandVsTofu: 12.7
  },
  {
    id: "shrimp_farmed",
    name: "Langostinos / Camarón de Granja",
    category: "seafood",
    categoryLabel: "Pescados y Mariscos",
    proteinGramsPerKg: 140,
    caloriesPerKg: 850,
    ghgKgCO2eqPerKg: 26.87,
    landM2PerKg: 2.97,
    waterLitresPerKg: 3515.0,
    eutrophicationGramsPO4eqPerKg: 227.22,
    ghgKgCO2eqPer100gProt: 19.19,
    landM2Per100gProt: 2.12,
    waterLitresPer100gProt: 2510.7,
    eutrophicationGramsPO4eqPer100gProt: 162.30,
    multiplierCO2VsTofu: 8.4,
    multiplierLandVsTofu: 0.9
  },
  {
    id: "cheese",
    name: "Queso Curado",
    category: "dairy_eggs",
    categoryLabel: "Lácteos y Huevos",
    proteinGramsPerKg: 220,
    caloriesPerKg: 3840,
    ghgKgCO2eqPerKg: 23.88,
    landM2PerKg: 87.79,
    waterLitresPerKg: 5605.2,
    eutrophicationGramsPO4eqPerKg: 98.65,
    ghgKgCO2eqPer100gProt: 10.85,
    landM2Per100gProt: 39.90,
    waterLitresPer100gProt: 2547.8,
    eutrophicationGramsPO4eqPer100gProt: 44.84,
    multiplierCO2VsTofu: 7.5,
    multiplierLandVsTofu: 25.8
  },
  {
    id: "fish_farmed",
    name: "Pescado de Piscifactoría (Salmón/Trucha)",
    category: "seafood",
    categoryLabel: "Pescados y Mariscos",
    proteinGramsPerKg: 200,
    caloriesPerKg: 2080,
    ghgKgCO2eqPerKg: 13.63,
    landM2PerKg: 8.41,
    waterLitresPerKg: 3691.3,
    eutrophicationGramsPO4eqPerKg: 235.12,
    ghgKgCO2eqPer100gProt: 6.82,
    landM2Per100gProt: 4.21,
    waterLitresPer100gProt: 1845.7,
    eutrophicationGramsPO4eqPer100gProt: 117.56,
    multiplierCO2VsTofu: 4.3,
    multiplierLandVsTofu: 2.5
  },
  {
    id: "pork",
    name: "Carne de Cerdo",
    category: "non_ruminant",
    categoryLabel: "Otras Carnes",
    proteinGramsPerKg: 170,
    caloriesPerKg: 2420,
    ghgKgCO2eqPerKg: 12.31,
    landM2PerKg: 17.36,
    waterLitresPerKg: 1795.8,
    eutrophicationGramsPO4eqPerKg: 76.38,
    ghgKgCO2eqPer100gProt: 7.24,
    landM2Per100gProt: 10.21,
    waterLitresPer100gProt: 1056.4,
    eutrophicationGramsPO4eqPer100gProt: 44.93,
    multiplierCO2VsTofu: 3.8,
    multiplierLandVsTofu: 5.1
  },
  {
    id: "poultry",
    name: "Carne de Pollo / Aves",
    category: "non_ruminant",
    categoryLabel: "Otras Carnes",
    proteinGramsPerKg: 175,
    caloriesPerKg: 1870,
    ghgKgCO2eqPerKg: 9.87,
    landM2PerKg: 12.22,
    waterLitresPerKg: 660.0,
    eutrophicationGramsPO4eqPerKg: 48.70,
    ghgKgCO2eqPer100gProt: 5.64,
    landM2Per100gProt: 6.98,
    waterLitresPer100gProt: 377.1,
    eutrophicationGramsPO4eqPer100gProt: 27.83,
    multiplierCO2VsTofu: 3.1,
    multiplierLandVsTofu: 3.6
  },
  {
    id: "eggs",
    name: "Huevos de Gallina",
    category: "dairy_eggs",
    categoryLabel: "Lácteos y Huevos",
    proteinGramsPerKg: 110,
    caloriesPerKg: 1430,
    ghgKgCO2eqPerKg: 4.67,
    landM2PerKg: 6.27,
    waterLitresPerKg: 577.7,
    eutrophicationGramsPO4eqPerKg: 21.76,
    ghgKgCO2eqPer100gProt: 4.25,
    landM2Per100gProt: 5.70,
    waterLitresPer100gProt: 525.2,
    eutrophicationGramsPO4eqPer100gProt: 19.78,
    multiplierCO2VsTofu: 1.5,
    multiplierLandVsTofu: 1.8
  },
  {
    id: "cow_milk",
    name: "Leche de Vaca Entera",
    category: "dairy_eggs",
    categoryLabel: "Lácteos y Huevos",
    proteinGramsPerKg: 33,
    caloriesPerKg: 620,
    ghgKgCO2eqPerKg: 3.15,
    landM2PerKg: 8.95,
    waterLitresPerKg: 628.2,
    eutrophicationGramsPO4eqPerKg: 10.65,
    ghgKgCO2eqPer100gProt: 9.55,
    landM2Per100gProt: 27.12,
    waterLitresPer100gProt: 1903.6,
    eutrophicationGramsPO4eqPer100gProt: 32.27,
    multiplierCO2VsTofu: 1.0,
    multiplierLandVsTofu: 2.6
  },
  {
    id: "rice",
    name: "Arroz Blanco",
    category: "plant_staple",
    categoryLabel: "Cereales y Bebidas Veg.",
    proteinGramsPerKg: 27,
    caloriesPerKg: 1300,
    ghgKgCO2eqPerKg: 4.45,
    landM2PerKg: 2.80,
    waterLitresPerKg: 2248.4,
    eutrophicationGramsPO4eqPerKg: 35.07,
    ghgKgCO2eqPer100gProt: 16.48,
    landM2Per100gProt: 10.37,
    waterLitresPer100gProt: 8327.4,
    eutrophicationGramsPO4eqPer100gProt: 129.89,
    multiplierCO2VsTofu: 1.4,
    multiplierLandVsTofu: 0.8
  },
  {
    id: "tofu_soy",
    name: "Tofu / Proteína de Soja",
    category: "plant_protein",
    categoryLabel: "Proteínas Vegetales",
    proteinGramsPerKg: 160,
    caloriesPerKg: 1440,
    ghgKgCO2eqPerKg: 3.16,
    landM2PerKg: 3.41,
    waterLitresPerKg: 148.6,
    eutrophicationGramsPO4eqPerKg: 6.16,
    ghgKgCO2eqPer100gProt: 1.98,
    landM2Per100gProt: 2.13,
    waterLitresPer100gProt: 92.9,
    eutrophicationGramsPO4eqPer100gProt: 3.85,
    multiplierCO2VsTofu: 1.0,
    multiplierLandVsTofu: 1.0,
    badge: "Referencia base"
  },
  {
    id: "soy_milk",
    name: "Bebida / Leche de Soja",
    category: "plant_protein",
    categoryLabel: "Proteínas Vegetales",
    proteinGramsPerKg: 30,
    caloriesPerKg: 450,
    ghgKgCO2eqPerKg: 0.98,
    landM2PerKg: 0.66,
    waterLitresPerKg: 27.8,
    eutrophicationGramsPO4eqPerKg: 1.06,
    ghgKgCO2eqPer100gProt: 3.27,
    landM2Per100gProt: 2.20,
    waterLitresPer100gProt: 92.7,
    eutrophicationGramsPO4eqPer100gProt: 3.53,
    multiplierCO2VsTofu: 0.3,
    multiplierLandVsTofu: 0.2
  },
  {
    id: "oat_milk",
    name: "Bebida de Avena",
    category: "plant_staple",
    categoryLabel: "Cereales y Bebidas Veg.",
    proteinGramsPerKg: 10,
    caloriesPerKg: 480,
    ghgKgCO2eqPerKg: 0.90,
    landM2PerKg: 0.76,
    waterLitresPerKg: 48.2,
    eutrophicationGramsPO4eqPerKg: 1.62,
    ghgKgCO2eqPer100gProt: 9.00,
    landM2Per100gProt: 7.60,
    waterLitresPer100gProt: 482.0,
    eutrophicationGramsPO4eqPer100gProt: 16.20,
    multiplierCO2VsTofu: 0.3,
    multiplierLandVsTofu: 0.2
  },
  {
    id: "pulses_lentils",
    name: "Legumbres (Lentejas / Garbanzos)",
    category: "plant_protein",
    categoryLabel: "Proteínas Vegetales",
    proteinGramsPerKg: 90,
    caloriesPerKg: 1160,
    ghgKgCO2eqPerKg: 1.79,
    landM2PerKg: 15.57,
    waterLitresPerKg: 403.5,
    eutrophicationGramsPO4eqPerKg: 17.08,
    ghgKgCO2eqPer100gProt: 1.99,
    landM2Per100gProt: 17.30,
    waterLitresPer100gProt: 448.3,
    eutrophicationGramsPO4eqPer100gProt: 18.98,
    multiplierCO2VsTofu: 0.6,
    multiplierLandVsTofu: 4.6
  },
  {
    id: "peas",
    name: "Guisantes Verdes",
    category: "plant_protein",
    categoryLabel: "Proteínas Vegetales",
    proteinGramsPerKg: 80,
    caloriesPerKg: 810,
    ghgKgCO2eqPerKg: 0.98,
    landM2PerKg: 7.46,
    waterLitresPerKg: 396.5,
    eutrophicationGramsPO4eqPerKg: 7.52,
    ghgKgCO2eqPer100gProt: 1.23,
    landM2Per100gProt: 9.33,
    waterLitresPer100gProt: 495.6,
    eutrophicationGramsPO4eqPer100gProt: 9.40,
    multiplierCO2VsTofu: 0.3,
    multiplierLandVsTofu: 2.2
  },
  {
    id: "nuts",
    name: "Frutos Secos (Nueces / Almendras)",
    category: "plant_protein",
    categoryLabel: "Proteínas Vegetales",
    proteinGramsPerKg: 210,
    caloriesPerKg: 6540,
    ghgKgCO2eqPerKg: 0.43,
    landM2PerKg: 12.96,
    waterLitresPerKg: 4133.8,
    eutrophicationGramsPO4eqPerKg: 19.15,
    ghgKgCO2eqPer100gProt: 0.20,
    landM2Per100gProt: 6.17,
    waterLitresPer100gProt: 1968.5,
    eutrophicationGramsPO4eqPer100gProt: 9.12,
    multiplierCO2VsTofu: 0.1,
    multiplierLandVsTofu: 3.8
  },
  {
    id: "potatoes",
    name: "Patatas / Tubérculos",
    category: "plant_staple",
    categoryLabel: "Cereales y Bebidas Veg.",
    proteinGramsPerKg: 20,
    caloriesPerKg: 770,
    ghgKgCO2eqPerKg: 0.46,
    landM2PerKg: 0.88,
    waterLitresPerKg: 59.1,
    eutrophicationGramsPO4eqPerKg: 3.48,
    ghgKgCO2eqPer100gProt: 2.30,
    landM2Per100gProt: 4.40,
    waterLitresPer100gProt: 295.5,
    eutrophicationGramsPO4eqPer100gProt: 17.40,
    multiplierCO2VsTofu: 0.1,
    multiplierLandVsTofu: 0.3
  }
];
