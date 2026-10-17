export interface SpeciesSlaughterRate {
  id: string;
  name: string;
  scientificGroup: string;
  annualTotal: number; // in units (individuals)
  perSecondRate: number;
  iconType: "chicken" | "pig" | "cow" | "fish" | "duck" | "turkey" | "sheep";
  color: string;
  notes: string;
}

export interface HistoricalSlaughterPoint {
  year: number;
  chickens: number; // in Billions (10^9)
  pigs: number;
  cattle: number;
  sheepAndGoats: number;
  ducksAndTurkeys: number;
  farmedFishEstimated: number;
  totalTerrestrial: number;
}

export interface CountryMeatConsumption {
  country: string;
  code: string;
  kgPerCapita1961: number;
  kgPerCapita1990: number;
  kgPerCapita2021: number;
  growthPercent: number;
  primaryMeat: string;
}

// Tasas calculadas a partir de la base FAOSTAT QCL (sacrificio 2024) ÷ 31.536.000 s/año,
// con peces de piscifactoría según Fishcount/Our World in Data (estimación central 2022, último dato publicado).
// Nota: los datos FAOSTAT se revisan anualmente; revisar la serie al actualizar el dataset.
export const SLAUGHTER_RATES_PER_SECOND: SpeciesSlaughterRate[] = [
  {
    id: "chickens",
    name: "Pollos de engorde",
    scientificGroup: "Gallus gallus domesticus",
    annualTotal: 78534000000, // 78.53 mil millones (FAOSTAT 2024)
    perSecondRate: 2490.3,
    iconType: "chicken",
    color: "#f59e0b", // amber
    notes: "Representa en torno al 91% de todos los vertebrados terrestres sacrificados para consumo humano (2024)."
  },
  {
    id: "farmed_fish",
    name: "Peces de piscifactoría",
    scientificGroup: "Teleostei (Acuicultura)",
    annualTotal: 133500000000, // estimación central 2022 (Fishcount): 133,5 mil millones
    perSecondRate: 4233.3,
    iconType: "fish",
    color: "#06b6d4", // cyan
    notes: "Estimación central de Fishcount para 2022 (vía Our World in Data): ≈133.500 millones de peces de granja sacrificados al año (rango 86.000-185.000). Último dato publicado."
  },
  {
    id: "wild_fish",
    name: "Peces silvestres capturados",
    scientificGroup: "Peces marinos y fluviales",
    annualTotal: 1500000000000, // ~1.5 billones (trillones en inglés)
    perSecondRate: 47564.6,
    iconType: "fish",
    color: "#3b82f6", // blue
    notes: "Calculado a partir de las 80-90 millones de toneladas métricas de captura pesquera bruta y pesos medios por especie."
  },
  {
    id: "ducks",
    name: "Patos",
    scientificGroup: "Anas platyrhynchos domesticus",
    annualTotal: 4228000000, // 4.23 mil millones (FAOSTAT 2024)
    perSecondRate: 134.1,
    iconType: "duck",
    color: "#10b981", // emerald
    notes: "Alta concentración en el este y sudeste asiático, además de producción de foie gras en Europa."
  },
  {
    id: "pigs",
    name: "Cerdos",
    scientificGroup: "Sus domesticus",
    annualTotal: 1494000000, // 1.49 mil millones (FAOSTAT 2024)
    perSecondRate: 47.4,
    iconType: "pig",
    color: "#f43f5e", // rose
    notes: "El mamífero terrestre más sacrificado numéricamente a nivel global."
  },
  {
    id: "sheep_goats",
    name: "Ovejas y Cabras",
    scientificGroup: "Ovis aries & Capra hircus",
    annualTotal: 1268000000, // 1.27 mil millones (FAOSTAT 2024)
    perSecondRate: 40.2,
    iconType: "sheep",
    color: "#8b5cf6", // violet
    notes: "Importante presencia en Oriente Medio, África subsahariana y cuenca mediterránea."
  },
  {
    id: "turkeys",
    name: "Pavos",
    scientificGroup: "Meleagris gallopavo",
    annualTotal: 504000000, // 504 millones (FAOSTAT 2024)
    perSecondRate: 16.0,
    iconType: "turkey",
    color: "#d97706", // amber-700
    notes: "Criados principalmente en América del Norte y la Unión Europea."
  },
  {
    id: "cattle",
    name: "Vacas y Terneros",
    scientificGroup: "Bos taurus, Bos indicus & Bubalus bubalis",
    annualTotal: 334000000, // 334 millones (bovino + búfalo, FAOSTAT 2024)
    perSecondRate: 10.6,
    iconType: "cow",
    color: "#ef4444", // red
    notes: "Incluye búfalos de agua (FAOSTAT agrupa la carne de vacuno y de búfalo). El ganado bovino representa la mayor biomasa corporal individual y el mayor impacto de gases de efecto invernadero."
  }
];

// Totales agregados por segundo (FAOSTAT QCL 2024; peces de granja, Fishcount/OWID 2022):
// Solo terrestres: 2.490,3 (pollos) + 134,1 (patos) + 47,4 (cerdos) + 40,2 (ovejas/cabras) + 16,0 (pavos) + 10,6 (bovino/búfalo) ≈ 2.738,6 terrestres/segundo.
// Con acuicultura: + 4.233,3 ≈ 6.971,9 animales criados/segundo.
// Con pesca silvestre: + 47.564,6 ≈ 54.536,5 animales sensibles/segundo.

export const TOTAL_TERRESTRIAL_PER_SECOND = 2738.6;
export const TOTAL_AQUATIC_FARMED_PER_SECOND = 4233.3;
export const TOTAL_WILD_FISH_PER_SECOND = 47564.6;

// Serie temporal histórica 1961 - 2024 (en Miles de Millones de individuos, Billions 10^9).
// Terrestres: FAOSTAT QCL (cattle = vacuno + búfalo). Peces de piscifactoría: Fishcount/OWID,
// estimación central; último dato publicado 2022, mantenido para 2023-2024 a falta de actualización.
export const HISTORICAL_SLAUGHTER_SERIES: HistoricalSlaughterPoint[] = [
  { year: 1961, chickens: 6.58, pigs: 0.38, cattle: 0.18, sheepAndGoats: 0.43, ducksAndTurkeys: 0.37, farmedFishEstimated: 3.2, totalTerrestrial: 7.94 },
  { year: 1970, chickens: 11.03, pigs: 0.54, cattle: 0.22, sheepAndGoats: 0.49, ducksAndTurkeys: 0.53, farmedFishEstimated: 5.8, totalTerrestrial: 12.81 },
  { year: 1980, chickens: 18.39, pigs: 0.76, cattle: 0.25, sheepAndGoats: 0.54, ducksAndTurkeys: 0.83, farmedFishEstimated: 11.2, totalTerrestrial: 20.76 },
  { year: 1990, chickens: 27.18, pigs: 0.92, cattle: 0.27, sheepAndGoats: 0.69, ducksAndTurkeys: 1.37, farmedFishEstimated: 13.0, totalTerrestrial: 30.44 },
  { year: 2000, chickens: 40.49, pigs: 1.10, cattle: 0.28, sheepAndGoats: 0.78, ducksAndTurkeys: 2.60, farmedFishEstimated: 31.0, totalTerrestrial: 45.25 },
  { year: 2010, chickens: 56.61, pigs: 1.37, cattle: 0.31, sheepAndGoats: 0.93, ducksAndTurkeys: 3.26, farmedFishEstimated: 76.0, totalTerrestrial: 62.48 },
  { year: 2015, chickens: 64.00, pigs: 1.48, cattle: 0.31, sheepAndGoats: 1.04, ducksAndTurkeys: 3.53, farmedFishEstimated: 107.0, totalTerrestrial: 70.36 },
  { year: 2020, chickens: 73.09, pigs: 1.32, cattle: 0.31, sheepAndGoats: 1.17, ducksAndTurkeys: 4.17, farmedFishEstimated: 126.2, totalTerrestrial: 80.06 },
  { year: 2022, chickens: 75.45, pigs: 1.50, cattle: 0.32, sheepAndGoats: 1.24, ducksAndTurkeys: 4.63, farmedFishEstimated: 133.5, totalTerrestrial: 83.13 },
  { year: 2024, chickens: 78.53, pigs: 1.49, cattle: 0.33, sheepAndGoats: 1.27, ducksAndTurkeys: 4.73, farmedFishEstimated: 133.5, totalTerrestrial: 86.36 }
];

export const COUNTRY_MEAT_CONSUMPTION_DATA: CountryMeatConsumption[] = [
  { country: "Estados Unidos", code: "USA", kgPerCapita1961: 89.8, kgPerCapita1990: 112.4, kgPerCapita2021: 126.8, growthPercent: 41.2, primaryMeat: "Pollo y Vacuno" },
  { country: "España", code: "ESP", kgPerCapita1961: 21.8, kgPerCapita1990: 89.6, kgPerCapita2021: 100.3, growthPercent: 360.1, primaryMeat: "Cerdo y Aves" },
  { country: "Brasil", code: "BRA", kgPerCapita1961: 27.5, kgPerCapita1990: 48.9, kgPerCapita2021: 98.7, growthPercent: 258.9, primaryMeat: "Vacuno y Pollo" },
  { country: "Alemania", code: "DEU", kgPerCapita1961: 64.2, kgPerCapita1990: 95.1, kgPerCapita2021: 79.2, growthPercent: 23.4, primaryMeat: "Cerdo" },
  { country: "China", code: "CHN", kgPerCapita1961: 3.8, kgPerCapita1990: 25.1, kgPerCapita2021: 63.6, growthPercent: 1573.7, primaryMeat: "Cerdo y Pollo" },
  { country: "Media Mundial", code: "WLD", kgPerCapita1961: 23.1, kgPerCapita1990: 33.4, kgPerCapita2021: 42.8, growthPercent: 85.3, primaryMeat: "Aves y Cerdo" },
  { country: "Nigeria", code: "NGA", kgPerCapita1961: 8.6, kgPerCapita1990: 9.8, kgPerCapita2021: 7.2, growthPercent: -16.3, primaryMeat: "Bovino y Caprino" },
  { country: "India", code: "IND", kgPerCapita1961: 3.7, kgPerCapita1990: 4.3, kgPerCapita2021: 4.5, growthPercent: 21.6, primaryMeat: "Pollo" }
];

// Serie por década para el gráfico comparativo (kg per cápita / año).
// Los anclajes 1961/1990/2021 coinciden con COUNTRY_MEAT_CONSUMPTION_DATA; los años
// intermedios son estimaciones a partir de FAO Food Balance Sheets / Our World in Data.
export interface CountryConsumptionPoint {
  year: number;
  usa: number;
  spain: number;
  china: number;
  brazil: number;
  germany: number;
  world: number;
  india: number;
}

export const COUNTRY_MEAT_CONSUMPTION_TIMESERIES: CountryConsumptionPoint[] = [
  { year: 1961, usa: 89.8, spain: 21.8, china: 3.8, brazil: 27.5, germany: 64.0, world: 23.1, india: 3.7 },
  { year: 1970, usa: 104.5, spain: 38.4, china: 8.5, brazil: 34.1, germany: 78.5, world: 28.4, india: 3.9 },
  { year: 1980, usa: 108.0, spain: 67.2, china: 13.8, brazil: 41.2, germany: 92.1, world: 30.1, india: 4.1 },
  { year: 1990, usa: 112.4, spain: 89.6, china: 25.1, brazil: 55.8, germany: 95.1, world: 33.4, india: 4.4 },
  { year: 2000, usa: 120.1, spain: 118.4, china: 45.2, brazil: 74.3, germany: 86.2, world: 38.2, india: 4.6 },
  { year: 2010, usa: 117.8, spain: 98.2, china: 56.4, brazil: 91.5, germany: 87.0, world: 41.8, india: 4.5 },
  { year: 2020, usa: 124.1, spain: 100.2, china: 63.8, brazil: 99.8, germany: 82.5, world: 42.6, india: 4.2 },
  { year: 2021, usa: 126.8, spain: 100.3, china: 63.6, brazil: 98.7, germany: 79.2, world: 42.8, india: 4.5 }
];
