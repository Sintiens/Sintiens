export interface OrganSystemEvolution {
  systemId: "breast" | "skeleton" | "cardio" | "pododermatitis";
  title: string;
  clinicalDiagnosis: string;
  description: string;
  severityLevel: "normal" | "mild" | "moderate" | "severe" | "critical";
  severityPercent: number; // 0 to 100
  histologicalNote: string;
  badge: string;
}

export interface BroilerYearMetric {
  year: number;
  label: string;
  strainName: string;
  weightAt56DaysG: number;
  daysToMarketWeight2kg: number;
  dailyGrowthRateGrams: number;
  breastYieldPercent: number;
  feedConversionRatio: number;
  metabolicMortalityRate: number; // % death due to ascitis/heart failure
  scaleRatio: number; // 3D volume scale cube root
  systems: Record<"breast" | "skeleton" | "cardio" | "pododermatitis", OrganSystemEvolution>;
}

export const BROILER_YEARS = [1957, 1978, 2005, 2025] as const;
export type BroilerYearType = typeof BROILER_YEARS[number];

export const BROILER_EVOLUTION_DATA: Record<BroilerYearType, BroilerYearMetric> = {
  1957: {
    year: 1957,
    label: "1957 (Base Histórica)",
    strainName: "Athens-Canadian Randombred (ACRBC)",
    weightAt56DaysG: 905,
    daysToMarketWeight2kg: 84,
    dailyGrowthRateGrams: 11.2,
    breastYieldPercent: 11.6,
    feedConversionRatio: 3.25,
    metabolicMortalityRate: 1.2,
    scaleRatio: 0.60,
    systems: {
      breast: {
        systemId: "breast",
        title: "Proporción y Tejido Fisiológico Natural",
        clinicalDiagnosis: "Musculatura Pectoral Eutrófica",
        description: "Masa muscular magra equilibrada y funcional (11,6% del peso vivo total). Centro de gravedad centrado y elevado que permite aleteo, saltos y equilibrio al caminar.",
        severityLevel: "normal",
        severityPercent: 5,
        histologicalNote: "Fibras musculares estriadas con irrigación capilar profusa y espacio intersticial fisiológico sin infiltración grasa.",
        badge: "Fisiología Sana"
      },
      skeleton: {
        systemId: "skeleton",
        title: "Esqueleto Robusto y Osificación Completa",
        clinicalDiagnosis: "Estructura Ósea Estable",
        description: "Huesos largos del tarso y fémur densamente mineralizados. La tasa lenta de crecimiento permite una osificación endocondral completa sin desviaciones angulares.",
        severityLevel: "normal",
        severityPercent: 5,
        histologicalNote: "Corteza tibial densa con trabéculas de colágeno bien orientadas y placas de crecimiento simétricas.",
        badge: "Plena Movilidad"
      },
      cardio: {
        systemId: "cardio",
        title: "Homeostasis Cardiopulmonar",
        clinicalDiagnosis: "Ventrículo Derecho Equilibrado",
        description: "El ratio peso cardíaco / masa corporal total es del 0,82%. Los pulmones tienen capacidad volumétrica holgada para oxigenar los tejidos en reposo y ejercicio.",
        severityLevel: "normal",
        severityPercent: 3,
        histologicalNote: "Espesor de pared ventricular normal, sin edema pericárdico ni hipertensión en la arteria pulmonar.",
        badge: "Circulación Normal"
      },
      pododermatitis: {
        systemId: "pododermatitis",
        title: "Almohadillas Plantares Intactas",
        clinicalDiagnosis: "Dermis Plantar Sana (Grado 0)",
        description: "Las patas y tarsos pasan la mayor parte del tiempo secos y elevados gracias a la movilidad constante del ave en el suelo.",
        severityLevel: "normal",
        severityPercent: 0,
        histologicalNote: "Estrato córneo queratinizado íntegro sin ulceración ni quemaduras químicas por ácido úrico.",
        badge: "Sin Lesiones"
      }
    }
  },

  1978: {
    year: 1978,
    label: "1978 (Inicio de Selección Intensiva)",
    strainName: "Línea Comercial Híbrida 1978",
    weightAt56DaysG: 1808,
    daysToMarketWeight2kg: 56,
    dailyGrowthRateGrams: 32.1,
    breastYieldPercent: 15.2,
    feedConversionRatio: 2.35,
    metabolicMortalityRate: 4.8,
    scaleRatio: 0.76,
    systems: {
      breast: {
        systemId: "breast",
        title: "Hipertrofia Muscular Moderada",
        clinicalDiagnosis: "Aumento de Calibre de Fibras",
        description: "El músculo pectoral se incrementa casi al doble. El centro de gravedad del animal empieza a desplazarse hacia la quilla pectoral, modificando el ángulo de marcha.",
        severityLevel: "mild",
        severityPercent: 30,
        histologicalNote: "Leve reducción del ratio de capilares por fibra muscular; incremento del diámetro transversal de los miocitos.",
        badge: "Hipertrofia Inicial"
      },
      skeleton: {
        systemId: "skeleton",
        title: "Tensión Mecánica en Huesos Jóvenes",
        clinicalDiagnosis: "Microdeformidades Articulares",
        description: "Los huesos soportan el doble de masa en un organismo aún juvenil. Comienza a registrarse un 10-15% de aves con marcha irregular o dolor moderado al andar.",
        severityLevel: "mild",
        severityPercent: 35,
        histologicalNote: "Retraso leve en la maduración de los condrocitos de la placa epifisaria proximal de la tibia.",
        badge: "Tensión Ósea"
      },
      cardio: {
        systemId: "cardio",
        title: "Esfuerzo Compensatorio Miocárdico",
        clinicalDiagnosis: "Sobrecarga Ventricular Compensada",
        description: "La demanda de oxígeno de la masa muscular aumentada obliga al corazón a trabajar cerca del límite fisiológico. Primeros casos documentados de síndrome ascítico.",
        severityLevel: "mild",
        severityPercent: 28,
        histologicalNote: "Ligero engrosamiento del miocardio ventricular y aumento de la presión media en el circuito menor.",
        badge: "Esfuerzo Circulatorio"
      },
      pododermatitis: {
        systemId: "pododermatitis",
        title: "Irritación Temprana por Contacto",
        clinicalDiagnosis: "Pododermatitis Grado 1",
        description: "Al volverse más pesadas, las aves pasan más horas sentadas sobre la yacija. Aparecen manchas de decoloración y callosidades leves en las almohadillas plantares.",
        severityLevel: "mild",
        severityPercent: 20,
        histologicalNote: "Hiperqueratosis superficial focal sin solución de continuidad epidérmica.",
        badge: "Eritema Leve"
      }
    }
  },

  2005: {
    year: 2005,
    label: "2005 (Selección Genética Avanzada)",
    strainName: "Ross 308 (Cepa Comercial 2005)",
    weightAt56DaysG: 4202,
    daysToMarketWeight2kg: 39,
    dailyGrowthRateGrams: 66.1,
    breastYieldPercent: 21.4,
    feedConversionRatio: 1.72,
    metabolicMortalityRate: 14.5,
    scaleRatio: 1.00,
    systems: {
      breast: {
        systemId: "breast",
        title: "Miopatías Severas: Pechuga de Madera",
        clinicalDiagnosis: "Necrosis y Fibrosis por Isquemia Pectoral",
        description: "El pectoral crece más rápido de lo que el sistema circulatorio puede ramificar capilares. Las fibras musculares sufren asfixia metabólica, necrosis y reemplazo por tejido conectivo fibroso rígido.",
        severityLevel: "severe",
        severityPercent: 80,
        histologicalNote: "Estrías blancas (infiltración grasa lipídica), degeneración hialina de fibras y miofibrosis difusa (Wooden Breast).",
        badge: "Miopatía Crónica"
      },
      skeleton: {
        systemId: "skeleton",
        title: "Discondroplasia Tibial y Colapso Locomotor",
        clinicalDiagnosis: "Necrosis de Cabeza Femoral y Deformidad Valgus",
        description: "Las patas se arquean lateralmente bajo un peso cuatro veces superior al natural. Más del 30% de los broilers sufren dolor crónico severo (Gait Score 3-5) y pasan el 85% del día postrados.",
        severityLevel: "severe",
        severityPercent: 85,
        histologicalNote: "Fallo de vascularización en el cartílago de crecimiento con persistencia de tapones cartilaginosos no calcificados.",
        badge: "Colapso Óseo"
      },
      cardio: {
        systemId: "cardio",
        title: "Síndrome de Ascitis e Hipertensión Pulmonar",
        clinicalDiagnosis: "Hipertrofia Ventricular Derecha Descompensada",
        description: "El volumen pulmonar no aumentó con el peso corporal. La falta de oxígeno desencadena hipertensión pulmonar, el ventrículo derecho se deforma y el suero sanguíneo se filtra al abdomen ahogando al ave.",
        severityLevel: "critical",
        severityPercent: 90,
        histologicalNote: "Ratio ventricular derecho/total >0,28 (umbral crítico clínico de fallo congestivo) con trasudado ascítico peritoneal.",
        badge: "Fallo Cardíaco"
      },
      pododermatitis: {
        systemId: "pododermatitis",
        title: "Úlceras Químicas por Contacto Continuo",
        clinicalDiagnosis: "Pododermatitis Ulcerosa Grado 3-4",
        description: "Incapaces de caminar por el dolor óseo y la debilidad muscular, las aves permanecen inmóviles sobre sus propios excrementos amoniacales, provocando llagas abiertas sangrantes en tarsos y pechuga.",
        severityLevel: "severe",
        severityPercent: 75,
        histologicalNote: "Ulceración profunda de la dermis con necrosis por contacto y colonización bacteriana secundaria.",
        badge: "Llagas Ulceradas"
      }
    }
  },

  2025: {
    year: 2025,
    label: "2025 (Cepa Ultra-Rápida Contemporánea)",
    strainName: "Ross 708 / Cobb 500 Fast Growth",
    weightAt56DaysG: 4950,
    daysToMarketWeight2kg: 34,
    dailyGrowthRateGrams: 78.4,
    breastYieldPercent: 24.8,
    feedConversionRatio: 1.51,
    metabolicMortalityRate: 18.2,
    scaleRatio: 1.08,
    systems: {
      breast: {
        systemId: "breast",
        title: "Miopatía Masiva y 'Espaguetización' Muscular",
        clinicalDiagnosis: "Pechuga de Madera Grado III y Spaghetti Meat",
        description: "La estructura fibrilar se desintegra por apoptosis celular acelerada. El músculo pectoral pierde cohesión estructural convirtiéndose en haces deshilachados con pérdidas del 50% de valor proteico biológico.",
        severityLevel: "critical",
        severityPercent: 95,
        histologicalNote: "Pérdida de la integridad de la matriz extracelular con lisis de fibras musculares y esteatosis masiva generalizada.",
        badge: "Desintegración Tisular"
      },
      skeleton: {
        systemId: "skeleton",
        title: "Invalidez Mecánica Terminal",
        clinicalDiagnosis: "Rotura de Tendones y Espondilolistesis",
        description: "Esqueleto cartilaginoso sometido a sobrecarga extrema a los 30 días de vida. Frecuente pinzamiento medular (deformidad en vértebras torácicas) que provoca parálisis parcial de extremidades.",
        severityLevel: "critical",
        severityPercent: 95,
        histologicalNote: "Osteocondrosis avanzada con microfracturas por estrés en fémur y epifisiolisis articular severa.",
        badge: "Invalidez Grave"
      },
      cardio: {
        systemId: "cardio",
        title: "Síndrome de Muerte Súbita (Flip-Over Syndrome)",
        clinicalDiagnosis: "Fibrilación Ventricular por Isquemia Aguda",
        description: "Muerte repentina por arritmia aguda en animales aparentemente sanos al menor estímulo de estrés, como el encendido de luces o el inicio de la línea de captura.",
        severityLevel: "critical",
        severityPercent: 95,
        histologicalNote: "Microtrombosis capilar pulmonar masiva e isquemia aguda del haz de conducción cardíaco.",
        badge: "Muerte Súbita"
      },
      pododermatitis: {
        systemId: "pododermatitis",
        title: "Quemaduras Severas y Quemadura de Pechuga",
        clinicalDiagnosis: "Quemaduras Químicas Cáusticas Grado 4",
        description: "Dermatitis de contacto necrosante que cubre más del 50% de la superficie plantar y la quilla del esternón (quemaduras de pechuga por contacto ininterrumpido con camas húmedas).",
        severityLevel: "critical",
        severityPercent: 90,
        histologicalNote: "Pérdida total del epitelio cutáneo con exposición de fascia y tendones a la infección por Staphylococcus aureus.",
        badge: "Necrosis Plantar"
      }
    }
  }
};
