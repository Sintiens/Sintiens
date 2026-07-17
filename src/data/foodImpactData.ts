export type FoodCategory = "beef" | "pork" | "poultry" | "fish" | "plantBased";

export interface ImpactValues {
  co2: number;    // kg CO2 eq per meal (150g)
  water: number;  // Liters per meal (150g)
  land: number;   // m2 per meal (150g)
  grain: number;  // kg of grain/feed per meal (150g)
}

// Datos basados en Poore & Nemecek (2018), adaptados a una comida promedio de 150g de proteína.
export const FOOD_IMPACTS: Record<FoodCategory, ImpactValues> = {
  beef: { co2: 9.0, water: 2250, land: 48.9, grain: 4.0 },
  pork: { co2: 1.05, water: 900, land: 2.5, grain: 1.5 },
  poultry: { co2: 0.9, water: 645, land: 1.8, grain: 1.2 },
  fish: { co2: 0.75, water: 450, land: 1.2, grain: 0.8 },
  plantBased: { co2: 0.3, water: 150, land: 0.45, grain: 0.1 },
};

export const FOOD_LABELS: Record<FoodCategory, string> = {
  beef: "Ternera / Vaca",
  pork: "Cerdo",
  poultry: "Pollo / Ave",
  fish: "Pescado / Marisco",
  plantBased: "Alternativa Vegetal",
};

export type DietProfile = "carnivore" | "omnivore" | "pescatarian" | "vegan" | "custom";

// Cantidad de comidas por categoría en una semana (asumiendo 14 comidas principales a la semana)
export const DIET_PROFILES: Record<Exclude<DietProfile, "custom">, Record<FoodCategory, number>> = {
  carnivore: { beef: 7, pork: 4, poultry: 3, fish: 0, plantBased: 0 },
  omnivore: { beef: 2, pork: 3, poultry: 5, fish: 2, plantBased: 2 },
  pescatarian: { beef: 0, pork: 0, poultry: 0, fish: 7, plantBased: 7 },
  vegan: { beef: 0, pork: 0, poultry: 0, fish: 0, plantBased: 14 },
};

export const PROFILE_LABELS: Record<DietProfile, string> = {
  carnivore: "Mucha Carne Roja",
  omnivore: "Omnívoro Promedio",
  pescatarian: "Pescatariano",
  vegan: "Vegetariano / Vegano",
  custom: "Personalizado",
};
