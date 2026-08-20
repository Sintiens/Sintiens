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

// Tasas calculadas a partir de datos consolidados FAOSTAT (2022/2023) y Fishcount UK
export const SLAUGHTER_RATES_PER_SECOND: SpeciesSlaughterRate[] = [
  {
    id: "chickens",
    name: "Pollos de engorde",
    scientificGroup: "Gallus gallus domesticus",
    annualTotal: 74200000000, // 74.2 mil millones
    perSecondRate: 2352.8,
    iconType: "chicken",
    color: "#f59e0b", // amber
    notes: "Representa más del 92% de todos los vertebrados terrestres sacrificados para consumo humano."
  },
  {
    id: "farmed_fish",
    name: "Peces de piscifactoría",
    scientificGroup: "Teleostei (Acuicultura)",
    annualTotal: 124000000000, // media estimada: 124 mil millones
    perSecondRate: 3931.9,
    iconType: "fish",
    color: "#06b6d4", // cyan
    notes: "Estimación científica conservadora de peces criados y sacrificados anualmente en granjas acuícolas (Fishcount.org.uk)."
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
    annualTotal: 3300000000, // 3.3 mil millones
    perSecondRate: 104.6,
    iconType: "duck",
    color: "#10b981", // emerald
    notes: "Alta concentración en el este y sudeste asiático, además de producción de foie gras en Europa."
  },
  {
    id: "pigs",
    name: "Cerdos",
    scientificGroup: "Sus domesticus",
    annualTotal: 1520000000, // 1.52 mil millones
    perSecondRate: 48.2,
    iconType: "pig",
    color: "#f43f5e", // rose
    notes: "El mamífero terrestre más sacrificado numéricamente a nivel global."
  },
  {
    id: "sheep_goats",
    name: "Ovejas y Cabras",
    scientificGroup: "Ovis aries & Capra hircus",
    annualTotal: 1100000000, // 1.10 mil millones
    perSecondRate: 34.9,
    iconType: "sheep",
    color: "#8b5cf6", // violet
    notes: "Importante presencia en Oriente Medio, África subsahariana y cuenca mediterránea."
  },
  {
    id: "turkeys",
    name: "Pavos",
    scientificGroup: "Meleagris gallopavo",
    annualTotal: 620000000, // 620 millones
    perSecondRate: 19.7,
    iconType: "turkey",
    color: "#d97706", // amber-700
    notes: "Criados principalmente en América del Norte y la Unión Europea."
  },
  {
    id: "cattle",
    name: "Vacas y Terneros",
    scientificGroup: "Bos taurus & Bos indicus",
    annualTotal: 332000000, // 332 millones
    perSecondRate: 10.5,
    iconType: "cow",
    color: "#ef4444", // red
    notes: "El ganado bovino representa la mayor biomasa corporal individual y el mayor impacto de gases de efecto invernadero."
  }
];

// Totales agregados por segundo:
// Solo terrestres: 2.352,8 (pollos) + 104,6 (patos) + 48,2 (cerdos) + 34,9 (ovejas/cabras) + 19,7 (pavos) + 10,5 (vacas) ≈ 2.570 terrestres/segundo.
// Con acuicultura: + 3.931,9 ≈ 6.502 animales criados/segundo.
// Con pesca silvestre: + 47.564,6 ≈ 54.066 animales sensibles/segundo.

export const TOTAL_TERRESTRIAL_PER_SECOND = 2570.7;
export const TOTAL_AQUATIC_FARMED_PER_SECOND = 3931.9;
export const TOTAL_WILD_FISH_PER_SECOND = 47564.6;

// Serie temporal histórica 1961 - 2024 (en Miles de Millones de individuos, Billions 10^9)
export const HISTORICAL_SLAUGHTER_SERIES: HistoricalSlaughterPoint[] = [
  { year: 1961, chickens: 6.60, pigs: 0.38, cattle: 0.17, sheepAndGoats: 0.37, ducksAndTurkeys: 0.35, farmedFishEstimated: 3.2, totalTerrestrial: 7.87 },
  { year: 1970, chickens: 10.8, pigs: 0.52, cattle: 0.20, sheepAndGoats: 0.44, ducksAndTurkeys: 0.48, farmedFishEstimated: 5.8, totalTerrestrial: 12.44 },
  { year: 1980, chickens: 16.5, pigs: 0.69, cattle: 0.23, sheepAndGoats: 0.51, ducksAndTurkeys: 0.72, farmedFishEstimated: 11.2, totalTerrestrial: 18.65 },
  { year: 1990, chickens: 27.9, pigs: 0.86, cattle: 0.27, sheepAndGoats: 0.63, ducksAndTurkeys: 1.15, farmedFishEstimated: 26.5, totalTerrestrial: 30.81 },
  { year: 2000, chickens: 40.5, pigs: 1.15, cattle: 0.29, sheepAndGoats: 0.75, ducksAndTurkeys: 2.10, farmedFishEstimated: 54.0, totalTerrestrial: 44.79 },
  { year: 2010, chickens: 58.1, pigs: 1.38, cattle: 0.30, sheepAndGoats: 0.88, ducksAndTurkeys: 3.20, farmedFishEstimated: 85.2, totalTerrestrial: 63.86 },
  { year: 2015, chickens: 65.8, pigs: 1.48, cattle: 0.31, sheepAndGoats: 0.98, ducksAndTurkeys: 3.55, farmedFishEstimated: 104.0, totalTerrestrial: 72.12 },
  { year: 2020, chickens: 72.3, pigs: 1.49, cattle: 0.32, sheepAndGoats: 1.05, ducksAndTurkeys: 3.82, farmedFishEstimated: 118.0, totalTerrestrial: 78.98 },
  { year: 2022, chickens: 74.2, pigs: 1.52, cattle: 0.33, sheepAndGoats: 1.10, ducksAndTurkeys: 3.92, farmedFishEstimated: 124.0, totalTerrestrial: 81.07 },
  { year: 2024, chickens: 75.8, pigs: 1.54, cattle: 0.33, sheepAndGoats: 1.12, ducksAndTurkeys: 4.01, farmedFishEstimated: 129.0, totalTerrestrial: 82.80 }
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
