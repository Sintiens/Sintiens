export type FoodCategory = "beef" | "pork" | "poultry" | "fish" | "plantBased";

export interface ImpactValues {
  co2: number;       // kg CO2 eq per meal (150g)
  water: number;     // Liters per meal (150g)
  land: number;      // m2 per meal (150g)
  grain: number;     // kg of grain/feed per meal (150g)
  animals: number;   // Animal lives consumed per meal (150g)
}

// Datos basados en Poore & Nemecek (Science 2018), Mekonnen & Hoekstra (2012)
// y estadísticas de rendimiento en canal de la FAO, adaptados a una ración de 150g.
export const FOOD_IMPACTS: Record<FoodCategory, ImpactValues> = {
  beef: { 
    co2: 9.0, 
    water: 2250, 
    land: 48.9, 
    grain: 4.0,
    animals: 0.0006 // 1 vaca rinde ~1.600 raciones
  },
  pork: { 
    co2: 1.05, 
    water: 900, 
    land: 2.5, 
    grain: 1.5,
    animals: 0.0019 // 1 cerdo rinde ~530 raciones
  },
  poultry: { 
    co2: 0.9, 
    water: 645, 
    land: 1.8, 
    grain: 1.2,
    animals: 0.077 // 1 pollo broíler rinde ~13 raciones (1 pollo cada 13 comidas)
  },
  fish: { 
    co2: 0.75, 
    water: 450, 
    land: 1.2, 
    grain: 0.8,
    animals: 0.85 // Peces de ración en acuicultura + descartes/bycatch por arrastre
  },
  plantBased: { 
    co2: 0.3, 
    water: 150, 
    land: 0.45, 
    grain: 0.0,
    animals: 0.0
  },
};

export const FOOD_LABELS: Record<FoodCategory, string> = {
  beef: "Carne de Vacuno",
  pork: "Carne de Cerdo",
  poultry: "Pollo / Ave de Corral",
  fish: "Pescado & Marisco",
  plantBased: "Legumbres / Alternativa Vegetal",
};

export type DietProfile = "carnivore" | "omnivore" | "reducetarian" | "pescatarian" | "vegan" | "custom";

// Cantidad de comidas semanales por categoría (14 comidas principales semanales: almuerzos y cenas)
export const DIET_PROFILES: Record<Exclude<DietProfile, "custom">, Record<FoodCategory, number>> = {
  carnivore: { beef: 6, pork: 4, poultry: 4, fish: 0, plantBased: 0 },
  omnivore: { beef: 2, pork: 3, poultry: 5, fish: 2, plantBased: 2 },
  reducetarian: { beef: 1, pork: 1, poultry: 2, fish: 1, plantBased: 9 },
  pescatarian: { beef: 0, pork: 0, poultry: 0, fish: 5, plantBased: 9 },
  vegan: { beef: 0, pork: 0, poultry: 0, fish: 0, plantBased: 14 },
};

export const PROFILE_LABELS: Record<DietProfile, string> = {
  carnivore: "Alta en Carne Roja",
  omnivore: "Omnívoro Estándar",
  reducetarian: "Flexitariano / Reducetariano (-60%)",
  pescatarian: "Pescatariano",
  vegan: "100% Vegetal / Vegano",
  custom: "Personalizado",
};

export interface TimeHorizon {
  id: string;
  label: string;
  multiplierWeeks: number;
}

export const TIME_HORIZONS: TimeHorizon[] = [
  { id: "1month", label: "1 Mes", multiplierWeeks: 4.33 },
  { id: "1year", label: "1 Año", multiplierWeeks: 52 },
  { id: "5years", label: "5 Años", multiplierWeeks: 260 },
  { id: "10years", label: "10 Años", multiplierWeeks: 520 },
  { id: "lifetime", label: "Toda una vida (80 años)", multiplierWeeks: 4160 },
];
