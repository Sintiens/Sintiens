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

export const SOURCE_IDS = [
  "poore-nemecek-2018",
  "bar-on-biomass-2018",
  "faostat-slaughter-2024",
  "fishcount-aquatic-2020",
  "zuidhof-broiler-2014",
  "efsa-broiler-welfare-2023",
  "efsa-laying-hens-2023",
  "efsa-pigs-welfare-2022",
  "eu-directive-calves-2008",
  "van-boeckel-antibiotics-2017",
  "pendrill-deforestation-2022",
  "hayek-rewilding-2021",
  "ema-esvac-antibiotics-2023"
] as const;

export type ScientificSourceId = (typeof SOURCE_IDS)[number];

export const SCIENTIFIC_SOURCES: Record<ScientificSourceId, ScientificSource> = {
  "poore-nemecek-2018": {
    id: "poore-nemecek-2018",
    title: "Reducing food's environmental impacts through producers and consumers",
    authors: "Poore, J., & Nemecek, T.",
    journalOrPublisher: "Science, 360(6392), 987-992",
    year: 2018,
    doi: "10.1126/science.aaq0216",
    url: "https://doi.org/10.1126/science.aaq0216",
    institution: "Universidad de Oxford y Agroscope (Suiza)",
    sampleOrScope: "Metaanálisis de ~38.700 explotaciones comerciales en 119 países y 40 productos alimentarios, representativos de ~90% de la proteína y las calorías consumidas globalmente.",
    methodologySummary: "Evaluación del ciclo de vida (LCA) estandarizada desde la cuna hasta el punto de venta minorista. Mide 5 indicadores ambientales: uso de tierra (m²), emisiones de gases de efecto invernadero (kg CO₂eq ponderado GWP100 IPCC), extracciones de agua dulce (L) —con una métrica separada ponderada por estrés hídrico—, potencial de acidificación (g SO₂eq) y potencial de eutrofización acuática (g PO₄eq).",
    statisticalUncertainty: "Intervalos de confianza al 95% calculados sobre distribuciones no paramétricas (percentiles 5º, 50º y 95º) para cada sistema de producción.",
    keyFindings: [
      "La ganadería utiliza el 83% de la superficie agrícola mundial pero aporta únicamente el 18% de las calorías y el 37% de las proteínas consumidas por la humanidad.",
      "La carne de vacuno de rebaño de carne emite de media 99,5 kg CO₂eq por kg (33,3 kg el vacuno de rebaño lechero), mientras que las legumbres emiten alrededor de 1 kg CO₂eq por kg o menos.",
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
      "El ganado doméstico (vacas, cerdos, ovejas, etc.) representa ≈60% de toda la biomasa de mamíferos del planeta (0,10 Gt C).",
      "Los seres humanos representan ≈36% de toda la biomasa de mamíferos (0,06 Gt C; incluye, por tanto, los mamíferos marinos).",
      "Todos los mamíferos silvestres del planeta (ballenas, elefantes, ciervos, leones, roedores salvajes, etc.) representan ≈4% de la biomasa de mamíferos (0,007 Gt C), con mayor masa marina que terrestre.",
      "En aves, las aves de corral domesticadas (predominantemente pollos de engorde y gallinas) suponen ≈71% de la biomasa aviar global, frente a ≈29% de todas las aves silvestres."
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
      "La serie del repositorio suma ≈82,8 mil millones de animales terrestres sacrificados en 2024 (≈79,8 mil millones de aves y ≈3,0 mil millones de mamíferos).",
      "El sacrificio de pollos se ha multiplicado por más de 11 desde 1961 (de 6.600 millones a 75.800 millones en 2024).",
      "Cada segundo son sacrificados ≈2.571 animales terrestres en mataderos de todo el mundo (≈2.403 pollos/s)."
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
    title: "Estimating global numbers of farmed and wild fishes killed for food",
    authors: "Mood, A., & Brooke, P.",
    journalOrPublisher: "Animal Welfare (2023, 32:e12; 2024, 33:e6) · Fishcount.org.uk",
    year: 2024,
    url: "https://fishcount.org.uk/fish-count-estimates-2",
    institution: "Fishcount Consultancy & Animal Ethics Research Group",
    sampleOrScope: "Cálculo global de individuos a partir de los datos de tonelaje pesquero y de acuicultura de la FAO, utilizando pesos medios por especie y estadio de desarrollo.",
    methodologySummary: "Conversión matemática de toneladas métricas brutas de captura y cosecha a número individual de peces y crustáceos mediante distribuciones alométricas de peso por especie.",
    keyFindings: [
      "Se estima que entre 1,1 y 2,2 billones (10¹²) de peces silvestres fueron capturados y asfixiados anualmente durante 2000-2019.",
      "Entre 78.000 y 171.000 millones de peces de piscifactoría fueron sacrificados en 2019 (estimación central: 124.000 millones).",
      "Cientos de miles de millones de crustáceos decápodos (camarones, langostinos, cangrejos) son sacrificados en granjas intensivas."
    ],
    bibtex: `@article{mood2024fishcount,
  title={Estimating global numbers of fishes caught from the wild annually from 2000 to 2019},
  author={Mood, Alison and Brooke, Phil},
  journal={Animal Welfare},
  volume={33},
  pages={e6},
  year={2024},
  url={https://fishcount.org.uk}
}`
  },

  "zuidhof-broiler-2014": {
    id: "zuidhof-broiler-2014",
    title: "Growth, efficiency, and yield of commercial broilers from 1957, 1978, and 2005",
    authors: "Zuidhof, M. J., Schneider, B. L., Carney, V. L., Korver, D. R., & Robinson, F. E.",
    journalOrPublisher: "Poultry Science, 93(12), 2970-2982",
    year: 2014,
    doi: "10.3382/ps.2014-04291",
    url: "https://doi.org/10.3382/ps.2014-04291",
    institution: "Universidad de Alberta (Canadá)",
    sampleOrScope: "Estudio experimental controlado de cría simultánea con cepas genéticas no seleccionadas de 1957 (Athens-Canadian Randombred), 1978 y una línea comercial moderna Ross 308 alimentadas con la misma dieta estandarizada.",
    methodologySummary: "Evaluación isométrica de ganancia de peso diaria, consumo de pienso, rendimiento de pechuga, alometría ósea y análisis histológico de miopatías.",
    keyFindings: [
      "A los 56 días de vida, el pollo comercial de 2005 pesa más de un 400% que el de 1957 (4.202 g frente a 905 g).",
      "El rendimiento del músculo pectoral (pectoralis major) aumentó desde ≈11,6% hacia el 21-25% del peso vivo según la edad de medida, y el FCR acumulado 0-42 días bajó de 2,88 (1957) a 1,67 (2005).",
      "La tasa de crecimiento pasó de 11 g/día en 1957 a más de 66 g/día en la cepa moderna.",
      "La selección extrema generó desequilibrios alométricos severos: el sistema cardiovascular y esquelético no puede sostener la tasa metabólica del tejido muscular acelerado."
    ],
    bibtex: `@article{zuidhof2014growth,
  title={Growth, efficiency, and yield of commercial broilers from 1957, 1978, and 2005},
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
      "El trabajo original estimó 131.109 t de consumo en 2013 con una proyección de 200.235 t en 2030; revisiones posteriores (Tiseo et al. 2020) rebajan la cifra a 93.309 t (2017) → 104.079 t (2030).",
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
    title: "Disentangling the numbers behind agriculture-driven tropical deforestation",
    authors: "Pendrill, F., Gardner, T. A., Meyfroidt, P., Persson, U. M., Adams, J., Azevedo, T., y cols.",
    journalOrPublisher: "Science, 377(6611), eabm9267",
    year: 2022,
    doi: "10.1126/science.abm9267",
    url: "https://doi.org/10.1126/science.abm9267",
    institution: "Chalmers University of Technology (Suecia) y Senckenberg Biodiversity and Climate Research Centre",
    sampleOrScope: "Síntesis pantropical del papel de la agricultura en la deforestación; análisis principal para 2011-2015 a nivel de bioma (Amazonía, Cerrado, Gran Chaco, Sudeste Asiático).",
    methodologySummary: "Modelado de balance de masa comercial y trazabilidad de cadenas de suministro (TRASE) cruzado con series temporales satelitales de deforestación y cambio de uso de suelo.",
    keyFindings: [
      "Entre el 90% y el 99% de la deforestación tropical ocurre en paisajes donde la agricultura es el motor dominante, pero solo el 45-65% del bosque perdido se convierte en producción agrícola activa.",
      "El pastoreo es el mayor motor directo, con alrededor de la mitad de la deforestación atribuida a la producción agrícola (≈41% del desmonte por commodities, Pendrill et al. 2019).",
      "La soja (≈77% destinada a pienso a nivel global) es un motor relevante, especialmente en el Cerrado; en la Amazonía brasileña predomina el pastoreo."
    ],
    bibtex: `@article{pendrill2022disentangling,
  title={Disentangling the numbers behind agriculture-driven tropical deforestation},
  author={Pendrill, Florence and Gardner, Toby A and Meyfroidt, Patrick and Persson, U Martin and Adams, Justin},
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
      "La restauración de las tierras actualmente dedicadas a la ganadería podría retirar de la atmósfera cientos de gigatoneladas de CO₂ (estimación publicada: ≈358-743 Gt CO₂ hasta 2050, según escenario).",
      "Esta captura biológica equivale a entre ≈10 y ≈20 años de las emisiones globales de combustibles fósiles actuales.",
      "Contribuiría de forma significativa a los objetivos del Acuerdo de París, pero no sustituye la descarbonización de los combustibles fósiles ni garantiza por sí sola los 1,5 °C."
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
    url: "https://www.ema.europa.eu/en/veterinary-regulatory-overview/antimicrobial-resistance-veterinary-medicine/european-surveillance-veterinary-antimicrobial-consumption-esvac-2009-2023",
    institution: "Agencia Europea de Medicamentos (EMA)",
    sampleOrScope: "Ventas oficiales de antibióticos veterinarios normalizadas por unidad de corrección de población animal (mg/PCU) en 31 países europeos.",
    methodologySummary: "Cálculo estandarizado de miligramos de ingrediente activo administrados por cada kilogramo de biomasa ganadera estimada (mg/PCU) para permitir comparaciones internacionales directas.",
    keyFindings: [
      "Existen brechas de más de 100× entre países europeos: en 2022, Chipre registró 254,7 mg/PCU, Polonia 196, Italia 157,5 y España 127,4, frente a Suecia (10,6) o Noruega (≈2). La media de los 31 países fue 73,9 mg/PCU (mediana: 45,8).",
      "La mayoría de las ventas corresponde a formulaciones orales colectivas (premezclas y polvos orales en pienso o agua).",
      "Las políticas estrictas de bienestar animal y baja densidad en los países nórdicos demuestran que es viable reducir el uso de antibióticos en más de un 90%."
    ],
    bibtex: `@techreport{ema2023esvac,
  title={Sales of veterinary antimicrobial agents in 31 European countries in 2022},
  author={{European Medicines Agency}},
  year={2023},
  institution={EMA},
  address={Amsterdam, Netherlands}
}`
  },

  "efsa-laying-hens-2023": {
    id: "efsa-laying-hens-2023",
    title: "Welfare of laying hens on farm",
    authors: "EFSA Panel on Animal Health and Animal Welfare (AHAW)",
    journalOrPublisher: "EFSA Journal, 21(2), e07789",
    year: 2023,
    doi: "10.2903/j.efsa.2023.7789",
    url: "https://doi.org/10.2903/j.efsa.2023.7789",
    institution: "Autoridad Europea de Seguridad Alimentaria (EFSA)",
    sampleOrScope: "Opinión científica sobre sistemas de alojamiento, consecuencias en bienestar y medidas basadas en el animal en ponedoras, pollitas y reproductoras en la UE.",
    methodologySummary: "Revisión sistemática y evaluación de riesgos de los sistemas de jaulas (convencionales y enriquecidas) frente a alternativas sin jaula, con indicadores de bienestar medibles.",
    keyFindings: [
      "En jaulas enriquecidas (750 cm²/ave) persisten consecuencias relevantes de bienestar: fracturas de quilla, daño de plumaje, pododermatitis y restricción de comportamiento.",
      "Los sistemas sin jaula reducen algunas restricciones, pero trasladan riesgos (fracturas de quilla, pluma, mortalidad) que exigen manejo específico; el dictamen recomienda mitigaciones por sistema."
    ],
    bibtex: `@article{efsa2023layinghens,
  title={Welfare of laying hens on farm},
  author={{EFSA Panel on Animal Health and Animal Welfare (AHAW)}},
  journal={EFSA Journal},
  volume={21},
  number={2},
  pages={e07789},
  year={2023},
  doi={10.2903/j.efsa.2023.7789}
}`
  },

  "efsa-pigs-welfare-2022": {
    id: "efsa-pigs-welfare-2022",
    title: "Welfare of pigs on farm",
    authors: "EFSA Panel on Animal Health and Animal Welfare (AHAW)",
    journalOrPublisher: "EFSA Journal, 20(8), e07421",
    year: 2022,
    doi: "10.2903/j.efsa.2022.7421",
    url: "https://doi.org/10.2903/j.efsa.2022.7421",
    institution: "Autoridad Europea de Seguridad Alimentaria (EFSA)",
    sampleOrScope: "Opinión sobre bienestar de todas las categorías de cerdo (cachorras, cerdas secas y lactantes, lechones, cebo y verracos) en los sistemas de alojamiento europeos.",
    methodologySummary: "Revisión de literatura y juicio experto; evaluación de espacio disponible, comportamiento de echado, mordedura de cola y medidas basadas en el animal en matadero.",
    keyFindings: [
      "Las jaulas de gestación y el confinamiento de las cerdas limitan el movimiento y el comportamiento natural; se cuantifican relaciones entre espacio, crecimiento y mordedura de cola en cebo.",
      "Recomienda periodos de adaptación y mitigaciones por sistema, con indicadores de bienestar medibles en granja y matadero."
    ],
    bibtex: `@article{efsa2022pigs,
  title={Welfare of pigs on farm},
  author={{EFSA Panel on Animal Health and Animal Welfare (AHAW)}},
  journal={EFSA Journal},
  volume={20},
  number={8},
  pages={e07421},
  year={2022},
  doi={10.2903/j.efsa.2022.7421}
}`
  },

  "eu-directive-calves-2008": {
    id: "eu-directive-calves-2008",
    title: "Council Directive 2008/119/EC laying down minimum standards for the protection of calves",
    authors: "Consejo de la Unión Europea",
    journalOrPublisher: "Diario Oficial de la Unión Europea, L 10/7",
    year: 2008,
    url: "https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32008L0119",
    institution: "Unión Europea",
    sampleOrScope: "Norma europea de protección de terneros en explotaciones, incluidos espacios mínimos por animal y condiciones de alojamiento.",
    methodologySummary: "Directiva vinculante para los Estados miembros de la UE, transpuesta a la legislación nacional; se complementa con la Directiva 98/58/CE.",
    keyFindings: [
      "Fija dimensiones mínimas de los alojamientos individuales y colectivos de terneros y prohíbe el confinamiento permanente en cajas individuales a partir de las 8 semanas de edad.",
      "Los Estados miembros deben garantizar espacio libre suficiente y condiciones que eviten lesiones y sufrimiento innecesario."
    ],
    bibtex: `@misc{eu2008calves,
  title={Council Directive 2008/119/EC laying down minimum standards for the protection of calves},
  author={{Consejo de la Unión Europea}},
  year={2008},
  url={https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:32008L0119}
}`
  }
};
