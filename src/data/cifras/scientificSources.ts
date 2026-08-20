export interface ScientificSource {
  id: string;
  title: string;
  authors: string;
  journalOrPublisher: string;
  year: number;
  doi?: string;
  url: string;
  institution: string;
  sampleOrScope: string;
  methodologySummary: string;
  keyFindings: string[];
  bibtex: string;
  statisticalUncertainty?: string;
}

export const SCIENTIFIC_SOURCES: Record<string, ScientificSource> = {
  "poore-nemecek-2018": {
    id: "poore-nemecek-2018",
    title: "Reducing food's environmental impacts through producers and consumers",
    authors: "Poore, J., & Nemecek, T.",
    journalOrPublisher: "Science, 360(6392), 987-992",
    year: 2018,
    doi: "10.1126/science.aaq0216",
    url: "https://doi.org/10.1126/science.aaq0216",
    institution: "Universidad de Oxford y Agroscope (Suiza)",
    sampleOrScope: "Metaanálisis de 38.700 granjas comerciales y 1.600 procesadores de alimentos en 119 países, cubriendo 40 productos alimentarios representativos del 90% de la ingesta proteica y calórica global.",
    methodologySummary: "Evaluación del ciclo de vida (LCA) estandarizada desde la cuna hasta el punto de venta minorista. Mide 5 indicadores ambientales: uso de tierra (m²), emisiones de gases de efecto invernadero (kg CO₂eq ponderado GWP100 IPCC), extracciones de agua dulce ponderadas por estrés hídrico (L), potencial de acidificación (g SO₂eq) y potencial de eutrofización acuática (g PO₄eq).",
    statisticalUncertainty: "Intervalos de confianza al 95% calculados sobre distribuciones no paramétricas (percentiles 5º, 50º y 95º) para cada sistema de producción.",
    keyFindings: [
      "La ganadería utiliza el 83% de la superficie agrícola mundial pero aporta únicamente el 18% de las calorías y el 37% de las proteínas consumidas por la humanidad.",
      "La carne de vacuno emite de media 99,5 kg CO₂eq por kg producido, mientras que las legumbres emiten menos de 1 kg CO₂eq por kg.",
      "Incluso los productores de carne y lácteos con menor impacto ambiental generan una huella ecológica sustancialmente superior a los equivalentes vegetales promedio.",
      "Una transición global a dietas basadas en plantas liberaría más de 3.100 millones de hectáreas de tierra agrícola (el tamaño equivalente a África)."
    ],
    bibtex: `@article{poore2018reducing,
  title={Reducing food's environmental impacts through producers and consumers},
  author={Poore, Joseph and Nemecek, Thomas},
  journal={Science},
  volume={360},
  number={6392},
  pages={987--992},
  year={2018},
  publisher={American Association for the Advancement of Science},
  doi={10.1126/science.aaq0216}
}`
  },

  "bar-on-biomass-2018": {
    id: "bar-on-biomass-2018",
    title: "The biomass distribution on Earth",
    authors: "Bar-On, Y. M., Phillips, R., & Milo, R.",
    journalOrPublisher: "Proceedings of the National Academy of Sciences (PNAS), 115(25), 6506-6511",
    year: 2018,
    doi: "10.1073/pnas.1711842115",
    url: "https://doi.org/10.1073/pnas.1711842115",
    institution: "Weizmann Institute of Science (Israel) y California Institute of Technology (Caltech)",
    sampleOrScope: "Censo global cuantitativo de la biomasa de todos los taxones biológicos del planeta (expresada en gigatoneladas de carbono, Gt C).",
    methodologySummary: "Integración de cientos de estudios ecológicos cuantitativos, teledetección satelital, muestreos de biomasa oceánica y terrestre, censos agropecuarios globales y modelos alométricos de masa corporal de fauna silvestre y domesticada.",
    statisticalUncertainty: "Incertidumbre de biomasa de mamíferos estimada en un factor de 1,2x (alta certeza debido a censos ganaderos y demográficos oficiales).",
    keyFindings: [
      "El ganado doméstico (vacas, cerdos, ovejas, etc.) representa el 60-62% de toda la biomasa de mamíferos del planeta.",
      "Los seres humanos representan el 34-36% de la biomasa de mamíferos terrestres.",
      "Todos los mamíferos silvestres del planeta (ballenas, elefantes, ciervos, leones, roedores salvajes, etc.) representan únicamente el 4% restante de la biomasa de mamíferos.",
      "En aves, las aves de corral domesticadas (predominantemente pollos de engorde y gallinas) suponen el 70% de la biomasa aviar global, frente a solo un 30% de todas las aves silvestres."
    ],
    bibtex: `@article{baron2018biomass,
  title={The biomass distribution on Earth},
  author={Bar-On, Yinon M and Phillips, Rob and Milo, Ron},
  journal={Proceedings of the National Academy of Sciences},
  volume={115},
  number={25},
  pages={6506--6511},
  year={2018},
  publisher={National Acad Sciences},
  doi={10.1073/pnas.1711842115}
}`
  },

  "faostat-slaughter-2024": {
    id: "faostat-slaughter-2024",
    title: "FAOSTAT Database: Livestock and Aquaculture Production & Slaughter Statistics",
    authors: "Food and Agriculture Organization of the United Nations (FAO)",
    journalOrPublisher: "FAO Statistical Yearbook & FAOSTAT Live Database",
    year: 2024,
    url: "https://www.fao.org/faostat/en/#data/QCL",
    institution: "Organización de las Naciones Unidas para la Alimentación y la Agricultura (FAO)",
    sampleOrScope: "Estadísticas oficiales anuales de producción pecuaria, censos ganaderos y sacrificio en más de 200 países y territorios desde 1961 hasta el presente.",
    methodologySummary: "Agregación sistemática de registros veterinarios ministeriales, encuestas censales y declaraciones aduaneras y de mataderos oficiales de los estados miembros de la ONU.",
    keyFindings: [
      "En 2022-2024, se sacrifican anualmente más de 74.000 millones de aves (pollos, pavos, patos) y más de 4.000 millones de mamíferos terrestres para consumo humano.",
      "El sacrificio de pollos se ha multiplicado por más de 11 desde 1961 (pasando de 6.600 millones a más de 74.000 millones al año).",
      "Cada segundo son sacrificados aproximadamente 2.350 animales terrestres en mataderos de todo el mundo."
    ],
    bibtex: `@misc{fao2024faostat,
  title={FAOSTAT statistical database},
  author={{Food and Agriculture Organization of the United Nations}},
  year={2024},
  publisher={FAO Rome},
  url={https://www.fao.org/faostat}
}`
  },

  "fishcount-aquatic-2020": {
    id: "fishcount-aquatic-2020",
    title: "Estimating the number of farmed and wild fishes killed globally",
    authors: "Mood, A., & Brooke, P.",
    journalOrPublisher: "Fishcount.org.uk & Animal Welfare Science Reports",
    year: 2020,
    url: "https://fishcount.org.uk/farmed-fish-numbers",
    institution: "Fishcount Consultancy & Animal Ethics Research Group",
    sampleOrScope: "Cálculo global de individuos a partir de los datos de tonelaje pesquero y de acuicultura de la FAO, utilizando pesos medios por especie y estadio de desarrollo.",
    methodologySummary: "Conversión matemática de toneladas métricas brutas de captura y cosecha a número individual de peces y crustáceos mediante distribuciones alométricas de peso por especie.",
    keyFindings: [
      "Se estima que entre 1,1 y 2,2 billones (trillones anglosajones: 10¹²) de peces silvestres son capturados y asfixiados anualmente.",
      "Entre 78.000 y 170.000 millones de peces de piscifactoría son sacrificados anualmente.",
      "Cientos de miles de millones de crustáceos decápodos (camarones, langostinos, cangrejos) son sacrificados en granjas intensivas."
    ],
    bibtex: `@techreport{mood2020fishcount,
  title={Estimating the number of farmed and wild fishes killed globally},
  author={Mood, Alison and Brooke, Phil},
  year={2020},
  institution={Fishcount Consultancy},
  url={https://fishcount.org.uk}
}`
  },

  "zuidhof-broiler-2014": {
    id: "zuidhof-broiler-2014",
    title: "Growth, efficiency, and yield of commercial broilers from 1957, 1978, and 2005 on modern feed diets",
    authors: "Zuidhof, M. J., Schneider, B. L., Carney, V. L., Korver, D. R., & Robinson, F. E.",
    journalOrPublisher: "Poultry Science, 93(12), 2970-2982",
    year: 2014,
    doi: "10.3382/ps.2014-04291",
    url: "https://doi.org/10.3382/ps.2014-04291",
    institution: "Universidad de Alberta (Canadá)",
    sampleOrScope: "Estudio experimental controlado de cría simultánea con cepas genéticas no seleccionadas de 1957 (Athens-Canadian Randombred), 1978 y una línea comercial moderna Ross 308 alimentadas con la misma dieta estandarizada.",
    methodologySummary: "Evaluación isométrica de ganancia de peso diaria, consumo de pienso, rendimiento de pechuga, alometría ósea y análisis histológico de miopatías.",
    keyFindings: [
      "A los 56 días de vida, el pollo comercial moderno pesa un 400% más que el pollo de 1957 (4.202 g frente a 905 g).",
      "El rendimiento del músculo pectoral aumentó del 11,6% al 21,3% del peso vivo total.",
      "La tasa de crecimiento pasó de 11 g/día en 1957 a más de 66 g/día en la cepa moderna.",
      "La selección extrema generó desequilibrios alométricos severos: el sistema cardiovascular y esquelético no puede sostener la tasa metabólica del tejido muscular acelerado."
    ],
    bibtex: `@article{zuidhof2014growth,
  title={Growth, efficiency, and yield of commercial broilers from 1957, 1978, and 2005 on modern feed diets},
  author={Zuidhof, Martin J and Schneider, Brittany L and Carney, Valerie L and Korver, Douglas R and Robinson, Frank E},
  journal={Poultry Science},
  volume={93},
  number={12},
  pages={2970--2982},
  year={2014},
  publisher={Oxford University Press},
  doi={10.3382/ps.2014-04291}
}`
  },

  "efsa-broiler-welfare-2023": {
    id: "efsa-broiler-welfare-2023",
    title: "Scientific Opinion on the welfare of broilers on farm",
    authors: "EFSA Panel on Animal Health and Welfare (AHAW)",
    journalOrPublisher: "EFSA Journal, 21(2), e07788",
    year: 2023,
    doi: "10.2903/j.efsa.2023.7788",
    url: "https://doi.org/10.2903/j.efsa.2023.7788",
    institution: "Autoridad Europea de Seguridad Alimentaria (EFSA)",
    sampleOrScope: "Revisión sistemática exhaustiva de toda la literatura científica veterinaria y zootécnica sobre bienestar en pollos de engorde para la Comisión Europea.",
    methodologySummary: "Evaluación de riesgos cualitativa y cuantitativa de factores como tasa de crecimiento genético, densidad de población (kg/m²), calidad de yacija, patologías locomotoras y fallo metabólico.",
    keyFindings: [
      "La selección por tasa de crecimiento rápido es el factor causal primario de dolor crónico, cojera (gait score >3), dermatitis plantar y fallo cardiopulmonar en broilers.",
      "La EFSA recomienda reducir drásticamente la tasa de crecimiento diaria (a un máximo de 50 g/día) y limitar la densidad a un máximo de 11 kg/m² para prevenir patologías severas."
    ],
    bibtex: `@article{efsa2023welfare,
  title={Scientific Opinion on the welfare of broilers on farm},
  author={{EFSA Panel on Animal Health and Welfare (AHAW)}},
  journal={EFSA Journal},
  volume={21},
  number={2},
  pages={e07788},
  year={2023},
  doi={10.2903/j.efsa.2023.7788}
}`
  },

  "van-boeckel-antibiotics-2017": {
    id: "van-boeckel-antibiotics-2017",
    title: "Reducing antimicrobial use in food animals",
    authors: "Van Boeckel, T. P., Glennon, E. E., Chen, D., Gilbert, M., Robinson, T. P., Grenfell, B. T., Levin, S. A., Bonhoeffer, S., & Laxminarayan, R.",
    journalOrPublisher: "Science, 357(6358), 1350-1352",
    year: 2017,
    doi: "10.1126/science.aao1495",
    url: "https://doi.org/10.1126/science.aao1495",
    institution: "ETH Zurich, Princeton University y Center for Disease Dynamics, Economics & Policy (CDDEP)",
    sampleOrScope: "Modelo global de consumo de antibióticos veterinarios en 228 países basado en censos ganaderos y perfiles de prescripción zootécnica.",
    methodologySummary: "Cartografía espacial de alta resolución de densidad de ganado porcino, avícola y bovino cruzada con datos de consumo antimicrobiano por kilogramo de biomasa animal (mg/PCU).",
    keyFindings: [
      "El 73% de todos los antimicrobianos vendidos a nivel mundial se administran a animales de producción, predominantemente para profilaxis masiva y promotores de crecimiento en explotaciones intensivas.",
      "El consumo de antibióticos en ganadería superó las 93.000 toneladas anuales y alcanzará más de 105.000 toneladas si no se imponen regulaciones estrictas.",
      "La ganadería intensiva actúa como el principal reservorio global de genes de resistencia a antibióticos de último recurso (como la colistina, gen mcr-1)."
    ],
    bibtex: `@article{vanboeckel2017reducing,
  title={Reducing antimicrobial use in food animals},
  author={Van Boeckel, Thomas P and Glennon, Emma E and Chen, Dora and Gilbert, Marius and Robinson, Timothy P and Grenfell, Bryan T and Levin, Simon A and Bonhoeffer, Sebastian and Laxminarayan, Ramanan},
  journal={Science},
  volume={357},
  number={6358},
  pages={1350--1352},
  year={2017},
  publisher={American Association for the Advancement of Science},
  doi={10.1126/science.aao1495}
}`
  },

  "pendrill-deforestation-2022": {
    id: "pendrill-deforestation-2022",
    title: "Disentangling the numbers on agriculture-driven deforestation",
    authors: "Pendrill, F., Persson, U. M., Godar, J., & Kastner, T.",
    journalOrPublisher: "Science, 377(6611), eabm9267",
    year: 2022,
    doi: "10.1126/science.abm9267",
    url: "https://doi.org/10.1126/science.abm9267",
    institution: "Chalmers University of Technology (Suecia) y Senckenberg Biodiversity and Climate Research Centre",
    sampleOrScope: "Cuantificación de la pérdida de bosque tropical atribuible a materias primas agropecuarias entre 2000 y 2020 a nivel de bioma (Amazonía, Cerrado, Gran Chaco, Sudeste Asiático).",
    methodologySummary: "Modelado de balance de masa comercial y trazabilidad de cadenas de suministro (TRASE) cruzado con series temporales satelitales de deforestación y cambio de uso de suelo.",
    keyFindings: [
      "Entre el 90% y el 99% de toda la deforestación en los trópicos está impulsada por la expansión agropecuaria.",
      "El pastoreo para ganado vacuno es responsable de al menos el 41% de la deforestación tropical directa.",
      "El cultivo de soja (cuyo 75-80% se destina a fabricar pienso compuesto para cerdos, aves y vacas lecheras) es el segundo motor directo e indirecto de desmonte en América del Sur."
    ],
    bibtex: `@article{pendrill2022disentangling,
  title={Disentangling the numbers on agriculture-driven deforestation},
  author={Pendrill, Florence and Persson, U Martin and Godar, Javier and Kastner, Thomas},
  journal={Science},
  volume={377},
  number={6611},
  pages={eabm9267},
  year={2022},
  publisher={American Association for the Advancement of Science},
  doi={10.1126/science.abm9267}
}`
  },

  "hayek-rewilding-2021": {
    id: "hayek-rewilding-2021",
    title: "The carbon opportunity cost of animal-sourced food production on land",
    authors: "Hayek, M. N., Harwatt, H., Ripple, W. J., & Mueller, N. D.",
    journalOrPublisher: "Nature Sustainability, 4(1), 21-24",
    year: 2021,
    doi: "10.1038/s41893-020-00613-6",
    url: "https://doi.org/10.1038/s41893-020-00613-6",
    institution: "Harvard University, New York University y Oregon State University",
    sampleOrScope: "Cartografía global de alta resolución del potencial de captura de carbono biológico en tierras agrícolas actualmente dedicadas a ganadería.",
    methodologySummary: "Modelado espacial de biomasa vegetal potencial si la tierra de pastoreo y cultivo forrajero se devolviera a su estado de bosque nativo o sabana natural sin ganado.",
    keyFindings: [
      "La reforestación y restauración natural de las tierras actualmente dedicadas al ganado podría secuestrar entre 332 y 547 gigatoneladas de CO₂.",
      "Esta captura biológica equivale a compensar la totalidad de las emisiones globales de combustibles fósiles de los últimos 9 a 16 años.",
      "Permitiría cumplir de forma holgada los objetivos del Acuerdo de París limitando el calentamiento a 1,5°C."
    ],
    bibtex: `@article{hayek2021carbon,
  title={The carbon opportunity cost of animal-sourced food production on land},
  author={Hayek, Matthew N and Harwatt, Helen and Ripple, William J and Mueller, Nathaniel D},
  journal={Nature Sustainability},
  volume={4},
  number={1},
  pages={21--24},
  year={2021},
  publisher={Nature Publishing Group},
  doi={10.1038/s41893-020-00613-6}
}`
  },

  "ema-esvac-antibiotics-2023": {
    id: "ema-esvac-antibiotics-2023",
    title: "Sales of veterinary antimicrobial agents in 31 European countries in 2022 (ESVAC report)",
    authors: "European Medicines Agency (EMA)",
    journalOrPublisher: "EMA Technical Reports Series",
    year: 2023,
    url: "https://www.ema.europa.eu/en/veterinary-regulatory/overview/antimicrobial-resistance/european-surveillance-veterinary-antimicrobial-consumption-esvac",
    institution: "Agencia Europea de Medicamentos (EMA)",
    sampleOrScope: "Ventas oficiales de antibióticos veterinarios normalizadas por unidad de corrección de población animal (mg/PCU) en 31 países europeos.",
    methodologySummary: "Cálculo estandarizado de miligramos de ingrediente activo administrados por cada kilogramo de biomasa ganadera estimada (mg/PCU) para permitir comparaciones internacionales directas.",
    keyFindings: [
      "Existen brechas de hasta 50x entre países europeos en el uso de antibióticos ganaderos: Chipre (296 mg/PCU), España (154 mg/PCU) e Italia (144 mg/PCU) frente a Suecia (11 mg/PCU) y Noruega (3 mg/PCU).",
      "El 85% de las ventas corresponde a presentaciones para medicación colectiva (premezclas medicamentosas en agua o pienso).",
      "Las políticas estrictas de bienestar animal y baja densidad en los países nórdicos demuestran que es viable producir alimentos reduciendo el uso de antibióticos en más de un 90%."
    ],
    bibtex: `@report{ema2023esvac,
  title={Sales of veterinary antimicrobial agents in 31 European countries in 2022},
  author={{European Medicines Agency}},
  year={2023},
  institution={EMA},
  address={Amsterdam, Netherlands}
}`
  }
};
