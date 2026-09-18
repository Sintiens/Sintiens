import type { ReferenceDetail } from "../types";

export interface ProteinVector {
  id: "beef" | "pork" | "poultry" | "salmon" | "soy" | "legumes";
  name: string;
  category: "animal" | "vegetal";
  description: string;
  caloricEfficiency: number; // Porcentaje de energía calórica aprovechada (ej. 1.9%)
  caloricLoss: number; // Porcentaje disipado (ej. 98.1%)
  proteinEfficiency: number; // Porcentaje de proteína aprovechada (ej. 3.8%)
  proteinLoss: number; // Porcentaje disipado (ej. 96.2%)
  feedConversionRatio: number; // kg de alimento agrícola requeridos para 1 kg de producto
  landUsePer100gProteinM2: number; // m² de tierra por 100g de proteína
  ghgPer100gProteinKgCO2: number; // kg CO2eq por 100g de proteína
  waterLitersPerKg: number; // Litros de agua por kg de producto
  metabolicDissipationBreakdown: {
    basalMetabolismAndHeatPct: number; // Pérdida por calor y respiración celular
    inedibleTissuesPct: number; // Huesos, plumas, sangre, pezuñas
    excretionsAndMethanePct: number; // Heces, orina y emisiones entéricas
    edibleUsefulOutputPct: number; // Porción comestible final
  };
  keyFact: string;
  color: string;
}

export const PROTEIN_VECTORS: ProteinVector[] = [
  {
    id: "beef",
    name: "Carne de Vacuno (Ternera)",
    category: "animal",
    description: "Rumiante con digestión entérica y ciclo de vida largo (18-30 meses). Máxima ineficiencia trófica.",
    caloricEfficiency: 1.9,
    caloricLoss: 98.1,
    proteinEfficiency: 3.8,
    proteinLoss: 96.2,
    feedConversionRatio: 25.0,
    landUsePer100gProteinM2: 164.0,
    ghgPer100gProteinKgCO2: 49.9,
    waterLitersPerKg: 15415,
    metabolicDissipationBreakdown: {
      basalMetabolismAndHeatPct: 62.0,
      inedibleTissuesPct: 18.1,
      excretionsAndMethanePct: 18.0,
      edibleUsefulOutputPct: 1.9,
    },
    keyFact: "Para producir 1 caloría comestible de vacuno se deben quemar e invertir 52 calorías de forraje y cereal.",
    color: "#b91c1c", // red-700
  },
  {
    id: "pork",
    name: "Carne de Cerdo",
    category: "animal",
    description: "Monogástrico alimentado con piensos concentrados de soja importada y cereales de alto rendimiento.",
    caloricEfficiency: 8.6,
    caloricLoss: 91.4,
    proteinEfficiency: 8.9,
    proteinLoss: 91.1,
    feedConversionRatio: 6.5,
    landUsePer100gProteinM2: 10.7,
    ghgPer100gProteinKgCO2: 7.6,
    waterLitersPerKg: 5988,
    metabolicDissipationBreakdown: {
      basalMetabolismAndHeatPct: 54.0,
      inedibleTissuesPct: 17.4,
      excretionsAndMethanePct: 20.0,
      edibleUsefulOutputPct: 8.6,
    },
    keyFact: "Más del 91% de la proteína vegetal que come un cerdo se disipa en su mantenimiento corporal y purines.",
    color: "#ea580c", // orange-600
  },
  {
    id: "poultry",
    name: "Pollo Broíler",
    category: "animal",
    description: "Ave seleccionada genéticamente para crecimiento forzado ultra-acelerado (42 días).",
    caloricEfficiency: 11.2,
    caloricLoss: 88.8,
    proteinEfficiency: 19.6,
    proteinLoss: 80.4,
    feedConversionRatio: 3.3,
    landUsePer100gProteinM2: 7.1,
    ghgPer100gProteinKgCO2: 5.7,
    waterLitersPerKg: 4325,
    metabolicDissipationBreakdown: {
      basalMetabolismAndHeatPct: 48.0,
      inedibleTissuesPct: 22.8,
      excretionsAndMethanePct: 18.0,
      edibleUsefulOutputPct: 11.2,
    },
    keyFact: "A pesar de ser el animal terrestre más eficiente, se pierden 8 de cada 10 gramos de proteína de grano suministrada.",
    color: "#d97706", // amber-600
  },
  {
    id: "salmon",
    name: "Salmón de Piscifactoría",
    category: "animal",
    description: "Carnívoro acuático alimentado con pellets de pescado salvaje pelágico deshidratado y soja.",
    caloricEfficiency: 14.5,
    caloricLoss: 85.5,
    proteinEfficiency: 21.0,
    proteinLoss: 79.0,
    feedConversionRatio: 2.3,
    landUsePer100gProteinM2: 3.7,
    ghgPer100gProteinKgCO2: 5.1,
    waterLitersPerKg: 2800,
    metabolicDissipationBreakdown: {
      basalMetabolismAndHeatPct: 42.0,
      inedibleTissuesPct: 23.5,
      excretionsAndMethanePct: 20.0,
      edibleUsefulOutputPct: 14.5,
    },
    keyFact: "Requiere extraer hasta 3 kg de peces forrajeros salvajes marinos para producir 1 kg de salmón en jaula.",
    color: "#0284c7", // sky-600
  },
  {
    id: "soy",
    name: "Soja (Tofu, Tempeh, Edamame)",
    category: "vegetal",
    description: "Leguminosa de consumo humano directo con perfil completo de aminoácidos esenciales y fijación de nitrógeno.",
    caloricEfficiency: 100.0,
    caloricLoss: 0.0,
    proteinEfficiency: 100.0,
    proteinLoss: 0.0,
    feedConversionRatio: 1.0,
    landUsePer100gProteinM2: 2.2,
    ghgPer100gProteinKgCO2: 0.4,
    waterLitersPerKg: 1800,
    metabolicDissipationBreakdown: {
      basalMetabolismAndHeatPct: 0.0,
      inedibleTissuesPct: 0.0,
      excretionsAndMethanePct: 0.0,
      edibleUsefulOutputPct: 100.0,
    },
    keyFact: "Aprovechamiento directo al 100% sin intermediario disipador. Ocupa 75 veces menos tierra que la ternera.",
    color: "#16a34a", // green-600
  },
  {
    id: "legumes",
    name: "Legumbres (Lentejas, Garbanzos, Alubias)",
    category: "vegetal",
    description: "Cultivo ancestral de alta densidad proteica y regeneración biológica natural del suelo.",
    caloricEfficiency: 100.0,
    caloricLoss: 0.0,
    proteinEfficiency: 100.0,
    proteinLoss: 0.0,
    feedConversionRatio: 1.0,
    landUsePer100gProteinM2: 1.6,
    ghgPer100gProteinKgCO2: 0.8,
    waterLitersPerKg: 1250,
    metabolicDissipationBreakdown: {
      basalMetabolismAndHeatPct: 0.0,
      inedibleTissuesPct: 0.0,
      excretionsAndMethanePct: 0.0,
      edibleUsefulOutputPct: 100.0,
    },
    keyFact: "La opción de menor impacto global: fertiliza el suelo de forma natural sin demandar abonos petroquímicos.",
    color: "#059669", // emerald-600
  },
];

export const REWILDING_METRICS = {
  globalAgriculturalLandMillionHa: 5100, // 5.100 millones de hectáreas (50% de la tierra habitable)
  livestockLandSharePct: 83, // 83% de la tierra agrícola para animales
  livestockCalorieSupplyPct: 18, // Solo aportan 18% de calorías
  livestockProteinSupplyPct: 37, // Solo aportan 37% de proteínas
  freedLandIfPlantBasedMillionHa: 3100, // 3.100 millones de hectáreas liberables (Science 2018)
  freedLandEquivalentRegions: "Superficie combinada de Estados Unidos, China, la Unión Europea y Australia",
  carbonSequestrationPotentialGtCO2PerYear: 8.1, // Gigatoneladas anuales de secuestro de carbono en bosques recuperados
  additionalPeopleFedWithSavedGrainBillions: 4.0, // 4.000 millones de personas alimentables con el grano forrajero
};

export const THERMODYNAMICS_REFERENCES: ReferenceDetail[] = [
  {
    id: "1",
    citation: "Poore, J., & Nemecek, T. (2018). Reducing food's environmental impacts through producers and consumers. Science, 360(6392), 987-992.",
    url: "https://doi.org/10.1126/science.aaq0216",
  },
  {
    id: "2",
    citation: "Alexander, P., Brown, C., Arneth, A., Finnigan, J., & Rounsevell, M. D. (2017). Losses, inefficiencies and waste in the global food system. Agricultural Systems, 153, 190-200.",
    url: "https://doi.org/10.1016/j.agsy.2017.01.014",
  },
  {
    id: "3",
    citation: "Lindeman, R. L. (1942). The trophic-dynamic aspect of ecology. Ecology, 23(4), 399-417.",
    url: "https://doi.org/10.2307/1930126",
  },
  {
    id: "4",
    citation: "Springmann, M., et al. (2018). Options for keeping the food system within environmental limits. Nature, 562(7728), 519-525.",
    url: "https://doi.org/10.1038/s41586-018-0594-0",
  },
];
