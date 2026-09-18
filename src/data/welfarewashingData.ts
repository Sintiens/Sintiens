import type { ReferenceDetail } from "../types";

export interface IndustrialPracticeContrast {
  id: "tail_docking" | "co2_slaughter" | "chick_culling" | "calf_separation" | "broiler_density" | "beak_trimming";
  title: string;
  targetSpecies: string;
  speciesCategory: "cerdo" | "ave" | "vaca";
  theLawAndMarketing: {
    officialRegulation: string; // ej. Directiva 2008/120/CE
    legalQuote: string;
    marketingClaim: string; // ej. "Criados bajo estrictos estándares de bienestar"
    publicPerception: string;
  };
  theRealityAndExceptions: {
    escapeClause: string; // La cláusula de excepción en el texto legal
    applicationPercentage: string; // ej: 98.5% en España
    veterinaryFact: string; // Consecuencia etológica/fisiológica
    scientificEvidence: string;
  };
  efsaVerdict: string;
}

export interface CommercialSealAudit {
  id: string;
  sealName: string;
  promoter: string;
  whatItClaims: string;
  whatItActuallyPermits: string[];
  auditGrade: "Mínimo legal encubierto" | "Bienestar cosmético" | "Cero impacto en fin de vida";
}

export const INDUSTRIAL_PRACTICES: IndustrialPracticeContrast[] = [
  {
    id: "tail_docking",
    title: "Caudectomía Preventiva (Corte de Rabos)",
    targetSpecies: "Cerdos de cebo intensivo",
    speciesCategory: "cerdo",
    theLawAndMarketing: {
      officialRegulation: "Directiva 2008/120/CE del Consejo (Anexo I, Capítulo I)",
      legalQuote: "«Ni el raboteo ni la reducción de dientes deben realizarse de forma rutinaria, sino únicamente cuando existan pruebas de que se han producido lesiones de las ubres de las cerdas o de las orejas o rabos de otros cerdos.»",
      marketingClaim: "«Carne porcina de granjas comprometidas con el bienestar animal y la normativa europea.»",
      publicPerception: "El consumidor cree que los cerdos conservan su cola natural y que solo se interviene en casos clínicos aislados.",
    },
    theRealityAndExceptions: {
      escapeClause: "Basta un informe veterinario que alegue 'riesgo de mordeduras' por hacinamiento para autorizar el corte preventivo sistemático.",
      applicationPercentage: "98.5% de los cerdos en España y >95% en la UE sufren el corte de cola.",
      veterinaryFact: "Seccionamiento de piel, músculo, tendones, vértebras coccígeas y nervios periféricos sin anestesia ni analgesia en los primeros 7 días de vida. Provoca dolor agudo severo y formación de neuromas dolorosos permanentes.",
      scientificEvidence: "La mordedura de colas es una patología del comportamiento provocada por la falta de paja para hozar y densidades extremas; la industria prefiere mutilar el rabo antes que reducir la densidad de la nave.",
    },
    efsaVerdict: "EFSA (2007/2020): «El corte rutinario de colas es una infracción persistente de la legislación de la UE. La provisión de material deformable adecuado (paja) reduce la caudofagia sin necesidad de mutilaciones dolorosas.»",
  },
  {
    id: "co2_slaughter",
    title: "Aturdimiento por Inmersión en Fosa de Gas CO2",
    targetSpecies: "Cerdos en mataderos industriales",
    speciesCategory: "cerdo",
    theLawAndMarketing: {
      officialRegulation: "Reglamento (CE) nº 1099/2009 relativo a la protección de los animales en el momento de la matanza",
      legalQuote: "«Se autoriza la exposición a concentraciones elevadas de dióxido de carbono (>80% en volumen) como método de aturdimiento humanitario para cerdos.»",
      marketingClaim: "«Sacrificio humanitario sin sufrimiento bajo la tecnología más avanzada de aturdimiento con gas inerte.»",
      publicPerception: "El consumidor imagina que el cerdo simplemente 'se duerme plácidamente' como bajo una anestesia médica hospitalaria.",
    },
    theRealityAndExceptions: {
      escapeClause: "El gas CO2 es el estándar preferido por la industria cárnica porque permite aturdir grupos masivos en góndolas automáticas sin reducir la velocidad de la línea.",
      applicationPercentage: "Aproximadamente el 85% de los cerdos sacrificados en mataderos industriales de España y la UE.",
      veterinaryFact: "El dióxido de carbono al entrar en contacto con las mucosas húmedas (ojos, nariz, tráquea, pulmones) forma ácido carbónico cáustico. Provoca quemazón química intensa, sensación de ahogamiento agudo, hipercapnia y pánico durante 30 a 40 segundos conscientes antes de perder el conocimiento.",
      scientificEvidence: "Grabaciones en mataderos y registros fisiológicos demuestran que los animales intentan saltar desesperadamente las paredes metálicas de la cesta, chillando y convulsionando por asfixia.",
    },
    efsaVerdict: "EFSA Panel on Animal Health and Welfare (2020): «La exposición a altas concentraciones de CO2 es altamente aversiva y produce dolor severo, miedo y angustia respiratoria. La EFSA recomienda sustituir el CO2 por métodos alternativos no aversivos.»",
  },
  {
    id: "chick_culling",
    title: "Triturado y Gaseado de Pollitos Macho",
    targetSpecies: "Pollitos recién nacidos de estirpe ponedora",
    speciesCategory: "ave",
    theLawAndMarketing: {
      officialRegulation: "Reglamento (CE) nº 1099/2009 (Anexo I, Capítulo I, Método 1)",
      legalQuote: "«Se autoriza la maceración (triturado en cuchillas mecánicas de alta velocidad) y el gaseado para animales de hasta 72 horas de vida y embriones.»",
      marketingClaim: "«Huevos frescos de gallinas felices con certificado de bienestar animal.»",
      publicPerception: "El consumidor cree que el sello de bienestar de la caja de huevos avala todo el ciclo productivo de la especie.",
    },
    theRealityAndExceptions: {
      escapeClause: "La selección genética ha bifurcado las aves en dos líneas: broílers (engorde de carne) y ponedoras (puesta de huevos). Los hermanos macho de las ponedoras no ponen huevos ni desarrollan músculo rentable, por lo que son declarados 'residuo biológico comercial'.",
      applicationPercentage: "Más de 6.000 millones de pollitos macho al año en el mundo (~35 millones al año solo en España).",
      veterinaryFact: "En sus primeras 24 horas de vida, los pollitos son sexados en cintas transportadoras. Los machos son arrojados vivos a molinos trituradores de cuchillas giratorias o introducidos en contenedores de gas CO2.",
      scientificEvidence: "Los pollitos al nacer son seres sintientes con nocicepción activa, audición desarrollada y respuesta a llamadas maternales.",
    },
    efsaVerdict: "EFSA (2019): Reconoce la sintiencia del neonato aviar y la necesidad ética de implementar el sexaje in-ovo para evitar el nacimiento y sacrificio sistemático de miles de millones de individuos.",
  },
  {
    id: "calf_separation",
    title: "Separación Forzosa Materno-Filial",
    targetSpecies: "Vacas lecheras y terneros recién nacidos",
    speciesCategory: "vaca",
    theLawAndMarketing: {
      officialRegulation: "Directiva 2008/119/CE relativa a las normas mínimas para la protección de terneros",
      legalQuote: "«Ningún ternero de más de ocho semanas de edad se mantendrá en un recinto individual, a menos que un veterinario haya certificado que es necesario.»",
      marketingClaim: "«Leche pura y natural de vacas cuidadas con esmero en entornos tradicionales.»",
      publicPerception: "La publicidad muestra vacas amamantando a sus terneros en praderas abiertas mientras 'sobra leche' para los humanos.",
    },
    theRealityAndExceptions: {
      escapeClause: "La ley autoriza el confinamiento en boxes individuales durante las primeras 8 semanas de vida del ternero.",
      applicationPercentage: "Más del 95% de las granjas lecheras comerciales separan al ternero en las primeras 24-48 horas de vida.",
      veterinaryFact: "La separación inmediata impide que el ternero beba la leche comercializable. El recién nacido se aloja en un 'iglú' de plástico individual sin contacto físico con su madre. Madres y crías emiten mugidos de llamada durante días, con picos de cortisol y supresión inmunitaria.",
      scientificEvidence: "Estudios de etología (Weary & Chua, 2000) demuestran que el vínculo afectivo se establece en las primeras horas y que la ruptura forzada genera trauma psicológico prolongado.",
    },
    efsaVerdict: "EFSA (2023): «Los terneros deben mantenerse con la madre durante al menos varios días para permitir el comportamiento natural de amamantamiento y el contacto social materno.»",
  },
  {
    id: "broiler_density",
    title: "Densidad Extrema en Naves de Pollo Broíler",
    targetSpecies: "Pollos de engorde para carne",
    speciesCategory: "ave",
    theLawAndMarketing: {
      officialRegulation: "Directiva 2007/43/CE por la que se establecen las normas mínimas para la protección de los pollos destinados a la producción de carne",
      legalQuote: "«La densidad de población máxima no superará en ningún momento los 33 kg/m²...»",
      marketingClaim: "«Carne de ave criada bajo los rigurosos estándares de seguridad y bienestar de la Unión Europea.»",
      publicPerception: "El consumidor cree que el límite legal garantiza que los pollos tienen espacio suficiente para caminar y explorar.",
    },
    theRealityAndExceptions: {
      escapeClause: "El artículo 3 permite a los países autorizar excepciones de hasta 39 kg/m² y 42 kg/m² si la explotación cumple ciertos ratios de mortalidad y ventilación.",
      applicationPercentage: "La inmensa mayoría de las macrogranjas avícolas operan bajo las excepciones de 39-42 kg/m².",
      veterinaryFact: "A 39-42 kg/m², una nave alberga unos 18 a 22 pollos adultos de 2.5 kg por metro cuadrado. Al final del ciclo de 42 días, cada ave dispone de menos superficie que un folio A4 (unos 450-500 cm²), sin poder dar un paso sin pisar a otros compañeros sobre viruta empapada de amoníaco.",
      scientificEvidence: "A partir de 30 kg/m² la prevalencia de quemaduras por amoníaco en pechugas (pododermatitis) y cojeras severas se dispara exponencialmente (Knowles et al., 2008).",
    },
    efsaVerdict: "EFSA (2023): «Para garantizar el bienestar de los pollos broíler y permitir que descansen sin ser pisoteados, la densidad no debería superar bajo ningún concepto los 11 kg/m² (unas 4-5 aves/m²).»",
  },
  {
    id: "beak_trimming",
    title: "Despique por Infrarrojos (Debeaking)",
    targetSpecies: "Gallinas ponedoras comerciales",
    speciesCategory: "ave",
    theLawAndMarketing: {
      officialRegulation: "Directiva 1999/74/CE sobre normas mínimas para la protección de gallinas ponedoras",
      legalQuote: "«Se prohíben todas las mutilaciones... no obstante, los Estados miembros podrán autorizar el despuntado del pico de los polluelos de menos de 10 días para evitar el picaje.»",
      marketingClaim: "«Huevos de gallinas libres de jaula con certificado de bienestar animal.»",
      publicPerception: "El consumidor cree que en sistemas 'suelo' o 'camperos' las gallinas conservan su pico intacto.",
    },
    theRealityAndExceptions: {
      escapeClause: "La excepción legal se ha convertido en la norma industrial universal en las plantas de incubación automatizadas.",
      applicationPercentage: "Prácticamente el 100% de las gallinas ponedoras en sistemas comerciales de España y gran parte de la UE.",
      veterinaryFact: "El pico de las aves no es una uña insensible: es un órgano sensorial altamente inervado con corpúsculos táctiles (Herbst y Grandry). El haz infrarrojo quema el tejido germinativo provocando necrosis de la punta del pico y dolor crónico.",
      scientificEvidence: "El picaje agresivo surge por el hacinamiento de miles de aves en naves cerradas sin enriquecimiento; mutilar el pico enmascara el síntoma sin resolver la causa del estrés.",
    },
    efsaVerdict: "EFSA (2023): Recomienda la prohibición total del corte de picos y la reducción drástica de densidades con acceso a sustratos de forrajeo para prevenir el picaje de forma natural.",
  },
];

export const COMMERCIAL_SEALS: CommercialSealAudit[] = [
  {
    id: "welfair",
    sealName: "Sello Welfair / Welfare Quality",
    promoter: "IRTA / Neiker (Certificadoras privadas de la industria)",
    whatItClaims: "«Certifica el bienestar animal evaluando alimentación, alojamiento, estado sanitario y comportamiento.»",
    whatItActuallyPermits: [
      "Permite el corte de cola en el 100% de los cerdos si se justifica por riesgo.",
      "Permite el sacrificio con gas CO2 y quemazón respiratoria en matadero.",
      "Permite el triturado de pollitos macho recién nacidos.",
      "Permite la separación forzosa del ternero a las 24 horas en granjas lecheras.",
      "Permite densidades de 39 kg/m² en naves de pollo de engorde.",
    ],
    auditGrade: "Mínimo legal encubierto",
  },
  {
    id: "aenor_conform",
    sealName: "AENOR Bienestar Animal",
    promoter: "Asociación Española de Normalización",
    whatItClaims: "«Garantía independiente de que la granja y el matadero cumplen los más altos estándares éticos.»",
    whatItActuallyPermits: [
      "No exige acceso al aire libre en ganado porcino o avícola de carne.",
      "Avala granjas industriales intensivas cerradas de miles de animales.",
      "No modifica los métodos de sacrificio en matadero industrial.",
      "Certifica instalaciones que cumplen la ley obligatoria como si fuera un plus ético voluntario.",
    ],
    auditGrade: "Bienestar cosmético",
  },
  {
    id: "campero_code1",
    sealName: "Huevos Camperos (Código 1)",
    promoter: "Reglamento UE de Comercialización de Huevos",
    whatItClaims: "«Gallinas con acceso continuo durante el día a corrales al aire libre con vegetación.»",
    whatItActuallyPermits: [
      "Todas las gallinas tienen el pico amputado por infrarrojos al nacer.",
      "Todos los hermanos macho fueron triturados vivos en la incubadora.",
      "Densidad interior de hasta 9 gallinas por m² de suelo cubierto.",
      "Sacrificio forzado de la gallina a los 18 meses de vida al caer la tasa de puesta.",
    ],
    auditGrade: "Cero impacto en fin de vida",
  },
];

export const WELFARE_REFERENCES: ReferenceDetail[] = [
  {
    id: "1",
    citation: "EFSA Panel on Animal Health and Welfare (AHAW). (2020). Welfare of pigs at slaughter. EFSA Journal, 18(6), e06148.",
    url: "https://doi.org/10.2903/j.efsa.2020.6148",
  },
  {
    id: "2",
    citation: "EFSA Panel on Animal Health and Welfare (AHAW). (2023). Welfare of broilers on farm. EFSA Journal, 21(2), e07788.",
    url: "https://doi.org/10.2903/j.efsa.2023.7788",
  },
  {
    id: "3",
    citation: "Knowles, T. G., et al. (2008). Leg disorders in broiler chickens: prevalence, risk factors and prevention. PLoS ONE, 3(2), e1545.",
    url: "https://doi.org/10.1371/journal.pone.0001545",
  },
  {
    id: "4",
    citation: "Weary, D. M., & Chua, B. (2000). Effects of early separation on the dairy cow and calf. Applied Animal Behaviour Science, 69(3), 177-188.",
    url: "https://doi.org/10.1016/S0168-1591(00)00128-3",
  },
];
