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
  { country: "Chipre", flag: "🇨🇾", mgPerPcu: 296.5, category: "extreme", note: "Uso profiláctico masivo en porcino y avicultura." },
  { country: "España", flag: "🇪🇸", mgPerPcu: 154.3, category: "high", note: "Líder de la UE en producción porcina intensiva; ha reducido su uso desde los 400 mg/PCU de 2014 pero sigue quintuplicando la media nórdica." },
  { country: "Estados Unidos", flag: "🇺🇸", mgPerPcu: 160.0, category: "high", note: "Estimación FDA/NRDC: el 65% de los antibióticos médicamente importantes se venden a la ganadería." },
  { country: "Italia", flag: "🇮🇹", mgPerPcu: 144.1, category: "high", note: "Alto uso en terneros lecheros y cerdos de cebo del Valle del Po." },
  { country: "Polonia", flag: "🇵🇱", mgPerPcu: 138.6, category: "high", note: "Rápida expansión de macrogranjas avícolas intensivas." },
  { country: "Alemania", flag: "🇩🇪", mgPerPcu: 58.2, category: "moderate", note: "Reducción sostenida mediante monitorización veterinaria digital obligatoria." },
  { country: "Francia", flag: "🇫🇷", mgPerPcu: 38.4, category: "moderate", note: "Planes EcoAntibio con bajada del 45% en una década." },
  { country: "Dinamarca", flag: "🇩🇰", mgPerPcu: 32.1, category: "low", note: "Sistema de 'Tarjeta Amarilla' que sanciona a granjas con exceso de prescripción." },
  { country: "Reino Unido", flag: "🇬🇧", mgPerPcu: 28.3, category: "low", note: "Reducción voluntaria coordinada por la alianza RUMA." },
  { country: "Países Bajos", flag: "🇳🇱", mgPerPcu: 42.5, category: "low", note: "Reducción histórica del 70% tras brotes de MRSA resistente en granjas." },
  { country: "Suecia", flag: "🇸🇪", mgPerPcu: 11.2, category: "minimal", note: "Prohibición pionera de antibióticos promotores de crecimiento en 1986 y bienestar animal estricto." },
  { country: "Islandia", flag: "🇮🇸", mgPerPcu: 4.8, category: "minimal", note: "Baja densidad y aislamiento geográfico." },
  { country: "Noruega", flag: "🇳🇴", mgPerPcu: 3.1, category: "minimal", note: "El estándar más bajo del mundo gracias a vacunas eficaces en piscicultura de salmón." }
];

export const AMR_PROJECTION_DATA = [
  { year: 2019, deathsMillions: 1.27, label: "Muertes directas anuales actuales por resistencia a antibióticos (The Lancet, 2022)" },
  { year: 2030, deathsMillions: 3.50, label: "Proyección intermedia sin cambios regulatorios" },
  { year: 2050, deathsMillions: 10.00, label: "Proyección Informe O'Neill (Superando a todas las muertes por cáncer juntas)" }
];

export const ZOONOTIC_TIMELINE_DATA: ZoonoticRiskEvent[] = [
  {
    year: "1997—Presente",
    name: "Gripe Aviar de Alta Patogenicidad H5N1",
    pathogen: "Virus Influenza A (H5N1 Clado 2.3.4.4b)",
    animalReservoir: "Macrogranjas de pollos de engorde y patos comerciales ➔ Salto a mamíferos silvestres y vacas lecheras",
    humanImpact: "Tasa de letalidad en humanos superior al 50% en infecciones confirmadas. Cientos de millones de aves sacrificadas.",
    intensiveFarmingLink: "Naves con 50.000 aves genéticamente idénticas y hacinadas actúan como biorreactores de amplificación y recombinación viral continua.",
    severity: "critical"
  },
  {
    year: "1998",
    name: "Brote del Virus Nipah (Malasia)",
    pathogen: "Henipavirus (Virus Nipah)",
    animalReservoir: "Murciélagos frugívoros (Pteropus) ➔ Granjas porcinas intensivas ➔ Trabajadores de matadero",
    humanImpact: "105 muertes humanas con encefalitis aguda y tasa de letalidad del 40-75%. Sacrificio de 1,1 millones de cerdos.",
    intensiveFarmingLink: "Macrogranjas porcinas instaladas en el límite de selvas tropicales taladas con árboles frutales sobre las pocilgas.",
    severity: "critical"
  },
  {
    year: "2009",
    name: "Pandemia de Gripe Porcina H1N1",
    pathogen: "Virus Influenza A H1N1/09 (triple reordenamiento)",
    animalReservoir: "Granjas industriales de cerdos en Norteamérica (Veracruz, México y EE.UU.)",
    humanImpact: "Entre 151.700 y 575.400 muertes humanas estimadas durante el primer año (CDC).",
    intensiveFarmingLink: "Recombinación genética entre virus aviares, porcinos clásicos y humanos en cerdos alojados en altas densidades.",
    severity: "high"
  },
  {
    year: "2015",
    name: "Aparición del Gen de Resistencia mcr-1",
    pathogen: "Plásmido de resistencia transferible a Colistina (mcr-1)",
    animalReservoir: "Granjas porcinas y avícolas en Shanghái (China)",
    humanImpact: "Pérdida de la colistina como antibiótico de último recurso para tratar infecciones por bacterias Gram-negativas multirresistentes en UCI.",
    intensiveFarmingLink: "Uso rutinario de más de 8.000 toneladas anuales de colistina en el pienso de cerdos y aves para compensar el estrés digestivo del destete forzado.",
    severity: "critical"
  },
  {
    year: "2020",
    name: "Mutaciones de SARS-CoV-2 en Granjas de Visones",
    pathogen: "Coronavirus SARS-CoV-2 (Variante 'Cluster 5')",
    animalReservoir: "Granjas peleteras de visones en Dinamarca, España y Países Bajos",
    humanImpact: "Transmisión bidireccional visón-humano con mutaciones en la proteína spike que amenazaban la eficacia de las vacunas iniciales.",
    intensiveFarmingLink: "Miles de animales carnívoros semiacuáticos hacinados en jaulas de alambre en hileras de varios kilómetros.",
    severity: "high"
  }
];
