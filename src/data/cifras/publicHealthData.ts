export interface AntibioticSectorItem {
  sector: string;
  percentage: number;
  tonnesPerYear: number;
  color: string;
  description: string;
}

export interface ZoonoticRiskEvent {
  year: string;
  name: string;
  /** Etiqueta corta para selectores (p. ej. «H5N1», «Nipah»). */
  shortLabel: string;
  pathogen: string;
  animalReservoir: string;
  humanImpact: string;
  intensiveFarmingLink: string;
  severity: "critical" | "high" | "moderate";
}

export interface CountryAntibioticIntensity {
  country: string;
  flag: string;
  mgPerPcu: number;
  category: "extreme" | "high" | "moderate" | "low" | "minimal";
  note: string;
}

export const ANTIBIOTIC_SECTORS_DATA: AntibioticSectorItem[] = [
  {
    sector: "Animales de Granja (Ganadería y Acuicultura)",
    percentage: 73,
    tonnesPerYear: 93300,
    color: "#ef4444",
    description: "Utilizados mayoritariamente de forma preventiva en masa (profilaxis y metafilaxis a través del agua de bebida o piensos medicamentosos) y como promotores ilegales o alegales de crecimiento en densidades extremas."
  },
  {
    sector: "Medicina Humana Global",
    percentage: 27,
    tonnesPerYear: 34500,
    color: "#3b82f6",
    description: "Prescripciones médicas hospitalarias y comunitarias para el tratamiento de infecciones bacterianas humanas en todo el mundo."
  }
];

export const COUNTRY_ANTIBIOTIC_INTENSITY_DATA: CountryAntibioticIntensity[] = [
  { country: "Chipre", flag: "🇨🇾", mgPerPcu: 254.7, category: "extreme", note: "El mayor uso de la UE en 2022 (ESVAC): uso profiláctico masivo en porcino y avicultura." },
  { country: "Polonia", flag: "🇵🇱", mgPerPcu: 196.0, category: "high", note: "196 mg/PCU en 2022 (ESVAC), con subida del 16% en el periodo 2018-2022." },
  { country: "Estados Unidos", flag: "🇺🇸", mgPerPcu: 160.0, category: "high", note: "Estimación FDA/NRDC (unidad no estrictamente comparable con ESVAC): ~65% de los antibióticos médicamente importantes se venden a la ganadería." },
  { country: "Italia", flag: "🇮🇹", mgPerPcu: 157.5, category: "high", note: "157,5 mg/PCU en 2022 (ESVAC); alto uso en terneros lecheros y cerdos del Valle del Po." },
  { country: "España", flag: "🇪🇸", mgPerPcu: 127.4, category: "high", note: "127,4 mg/PCU en 2022 (ESVAC); reducción superior al 60% desde los 418 mg/PCU de 2014." },
  { country: "Alemania", flag: "🇩🇪", mgPerPcu: 58.2, category: "moderate", note: "Último dato ESVAC disponible (2021); reducción sostenida mediante monitorización veterinaria obligatoria." },
  { country: "Países Bajos", flag: "🇳🇱", mgPerPcu: 42.5, category: "low", note: "Reducción histórica >70% tras los brotes de MRSA en granjas." },
  { country: "Francia", flag: "🇫🇷", mgPerPcu: 38.4, category: "low", note: "Planes EcoAntibio con una bajada superior al 45% en una década." },
  { country: "Dinamarca", flag: "🇩🇰", mgPerPcu: 32.1, category: "low", note: "Sistema de 'Tarjeta Amarilla' que sanciona a granjas con exceso de prescripción." },
  { country: "Reino Unido", flag: "🇬🇧", mgPerPcu: 28.3, category: "low", note: "Reducción voluntaria coordinada por la alianza RUMA." },
  { country: "Suecia", flag: "🇸🇪", mgPerPcu: 10.6, category: "minimal", note: "10,6 mg/PCU en 2022 (ESVAC), tras prohibir los promotores de crecimiento en 1986." },
  { country: "Islandia", flag: "🇮🇸", mgPerPcu: 4.8, category: "minimal", note: "Baja densidad y aislamiento geográfico." },
  { country: "Noruega", flag: "🇳🇴", mgPerPcu: 2.1, category: "minimal", note: "2,1 mg/PCU en 2022 (ESVAC): el estándar más bajo de Europa, gracias a vacunas eficaces en piscicultura de salmón." }
];

/** Umbrales únicos de categorización (mg/PCU) para todo el visualizador. */
export function getAntibioticCategory(mgPerPcu: number): CountryAntibioticIntensity["category"] {
  if (mgPerPcu >= 200) return "extreme";
  if (mgPerPcu >= 100) return "high";
  if (mgPerPcu >= 50) return "moderate";
  if (mgPerPcu >= 25) return "low";
  return "minimal";
}

export interface AmrProjectionPoint {
  year: number;
  deathsMillions: number;
  metric: "attributable" | "associated";
  projection: boolean;
  sourceLabel: string;
}

// Set canónico GRAM/Lancet: muertes atribuibles (directas) y asociadas, históricas y a 2050.
// La proyección de O'Neill (10 M en 2050, muertes totales por RAM) se cita como escenario
// separado y contestado; no se mezcla con las métricas de GRAM.
export const AMR_PROJECTION_DATA: AmrProjectionPoint[] = [
  { year: 2019, deathsMillions: 1.27, metric: "attributable", projection: false, sourceLabel: "GRAM · Lancet 2022 (2019)" },
  { year: 2019, deathsMillions: 4.95, metric: "associated", projection: false, sourceLabel: "GRAM · Lancet 2022 (2019)" },
  { year: 2021, deathsMillions: 1.14, metric: "attributable", projection: false, sourceLabel: "GRAM · Lancet 2024 (2021)" },
  { year: 2021, deathsMillions: 4.71, metric: "associated", projection: false, sourceLabel: "GRAM · Lancet 2024 (2021)" },
  { year: 2050, deathsMillions: 1.91, metric: "attributable", projection: true, sourceLabel: "Previsión GRAM · Lancet 2024 (2050)" },
  { year: 2050, deathsMillions: 8.22, metric: "associated", projection: true, sourceLabel: "Previsión GRAM · Lancet 2024 (2050)" }
];

export const ZOONOTIC_TIMELINE_DATA: ZoonoticRiskEvent[] = [
  {
    year: "1997—Presente",
    name: "Gripe Aviar de Alta Patogenicidad H5N1",
    shortLabel: "H5N1",
    pathogen: "Virus Influenza A (H5N1 Clado 2.3.4.4b)",
    animalReservoir: "Macrogranjas de pollos de engorde y patos comerciales ➔ Salto a mamíferos silvestres y vacas lecheras",
    humanImpact: "Tasa de letalidad en torno al 48% en casos humanos confirmados (WHO, 2003-2026). Cientos de millones de aves sacrificadas.",
    intensiveFarmingLink: "Naves con 50.000 aves genéticamente idénticas y hacinadas actúan como biorreactores de amplificación y recombinación viral continua.",
    severity: "critical"
  },
  {
    year: "1998",
    name: "Brote del Virus Nipah (Malasia)",
    shortLabel: "Nipah",
    pathogen: "Henipavirus (Virus Nipah)",
    animalReservoir: "Murciélagos frugívoros (Pteropus) ➔ Granjas porcinas intensivas ➔ Trabajadores de matadero",
    humanImpact: "105 muertes humanas con encefalitis aguda y tasa de letalidad del 40-75%. Sacrificio de más de 1 millón de cerdos.",
    intensiveFarmingLink: "Macrogranjas porcinas instaladas en el límite de selvas tropicales taladas con árboles frutales sobre las pocilgas.",
    severity: "critical"
  },
  {
    year: "2009",
    name: "Pandemia de Gripe Porcina H1N1",
    shortLabel: "H1N1",
    pathogen: "Virus Influenza A H1N1/09 (triple reordenamiento)",
    animalReservoir: "Granjas industriales de cerdos en Norteamérica (Veracruz, México y EE.UU.)",
    humanImpact: "Entre 151.700 y 575.400 muertes humanas estimadas durante el primer año (CDC).",
    intensiveFarmingLink: "Recombinación genética entre virus aviares, porcinos clásicos y humanos en cerdos alojados en altas densidades.",
    severity: "high"
  },
  {
    year: "2015",
    name: "Aparición del Gen de Resistencia mcr-1",
    shortLabel: "mcr-1",
    pathogen: "Plásmido de resistencia transferible a Colistina (mcr-1)",
    animalReservoir: "Granjas porcinas y avícolas en Shanghái (China)",
    humanImpact: "Pérdida de la colistina como antibiótico de último recurso para tratar infecciones por bacterias Gram-negativas multirresistentes en UCI.",
    intensiveFarmingLink: "Uso masivo de colistina en el pienso (China produjo ~30.000 t en 2015; la producción global fue de ~4.300 t en 2019, 96% para uso animal) para compensar el estrés digestivo del destete forzado.",
    severity: "critical"
  },
  {
    year: "2020",
    name: "Mutaciones de SARS-CoV-2 en Granjas de Visones",
    shortLabel: "Cluster 5",
    pathogen: "Coronavirus SARS-CoV-2 (Variante 'Cluster 5')",
    animalReservoir: "Granjas peleteras de visones en Dinamarca, España y Países Bajos",
    humanImpact: "Transmisión bidireccional visón-humano con mutaciones en la proteína spike que amenazaban la eficacia de las vacunas iniciales.",
    intensiveFarmingLink: "Miles de animales carnívoros semiacuáticos hacinados en jaulas de alambre en hileras de varios kilómetros.",
    severity: "high"
  }
];
