export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  region: "españa" | "mundo";
  category: "ley" | "consumo" | "ciencia" | "social" | "industria";
  impact: "positivo" | "negativo";
  url: string;
}

export const NEWS_DATA: NewsItem[] = [
  {
    id: "es-ley-circos-2024",
    title: "Entrada en vigor de la prohibición de circos con animales silvestres en España",
    summary: "El 29 de marzo de 2024 culmina el periodo transitorio de la Ley 7/2023 de protección de los derechos y el bienestar de los animales, de modo que queda prohibido en toda España el uso de animales silvestres en circos y caducan las licencias que permitían su utilización en espectáculos. La noticia se considera favorable porque elimina una forma de explotación de fauna salvaje y obliga a realojar a los animales en centros o refugios que garanticen mejor su bienestar.",
    date: "2024-03-29",
    region: "españa",
    category: "ley",
    impact: "positivo",
    url: "https://maldita.es/malditateexplica/20240403/prohibicion-animales-circos-ley-bienestar-animal/"
  },
  {
    id: "es-consumo-smart-protein-2024",
    title: "Encuesta Smart Protein: 48% de consumidores españoles reduce su ingesta de carne",
    summary: "En abril de 2024 la Unión Vegetariana Española y ProVeg difunden los resultados del proyecto paneuropeo Smart Protein, según los cuales un 48% de los consumidores de carne en España declara haber reducido su ingesta en el último año, especialmente de carne de vaca y cerdo. Esta tendencia se considera favorable desde la perspectiva de bienestar animal y ambiental, ya que refleja un cambio de hábitos motivado por la salud, el sufrimiento de los animales y las preocupaciones ecológicas.",
    date: "2024-04-04",
    region: "españa",
    category: "consumo",
    impact: "positivo",
    url: "https://www.buenoyvegano.com/2024/04/05/el-48-porciento-espanoles-reducen-ingesta-de-carne-informe-smart-protein/"
  },
  {
    id: "world-alabama-labmeat-2024",
    title: "Alabama se convierte en el segundo estado de EE.UU. en prohibir la carne cultivada",
    summary: "El 7 de mayo de 2024 la gobernadora Kay Ivey firmó una ley que prohíbe la producción, venta y distribución de alimentos derivados de células animales cultivadas en Alabama, siguiendo la estela de Florida. Al bloquear una tecnología que podría reducir el sacrificio de animales, la norma se clasifica como perjudicial para el avance ético del bienestar animal.",
    date: "2024-05-07",
    region: "mundo",
    category: "ley",
    impact: "negativo",
    url: "https://www.usatoday.com/story/news/nation/2024/05/13/lab-grown-meat-ban-alabama/73678952007/"
  },
  {
    id: "world-uk-liveexports-2024",
    title: "Reino Unido aprueba la prohibición de exportar animales vivos para sacrificio y engorde",
    summary: "El 20 de mayo de 2024 entró en vigor en Gran Bretaña la Animal Welfare (Livestock Exports) Act, que prohíbe la exportación de bovinos, ovinos, caprinos, porcinos y caballos vivos para sacrificio y engorde fuera del país. La ley busca evitar viajes largos y estresantes y se considera un avance legislativo significativo en protección de animales de granja, por lo que su impacto se clasifica como positivo.",
    date: "2024-05-20",
    region: "mundo",
    category: "ley",
    impact: "positivo",
    url: "https://www.gov.uk/government/news/export-of-live-animals-banned"
  },
  {
    id: "es-ciencia-carne-cultivada-2024",
    title: "Biotech Foods impulsa la carne cultivada como alternativa ambientalmente sostenible",
    summary: "El 25 de julio de 2024 El País destaca el trabajo de la empresa vasca Biotech Foods y otras startups en el desarrollo de carne cultivada en laboratorio, señalando que esta tecnología podría reducir hasta un 92% las emisiones de gases de efecto invernadero, un 95% el uso de suelo y un 78% el consumo de agua frente a la ganadería tradicional. La noticia se considera favorable porque abre la puerta a proteínas de origen animal sin sacrificio directo y con menor impacto ambiental, lo que potencialmente reduce el número de animales explotados en sistemas intensivos.",
    date: "2024-07-25",
    region: "españa",
    category: "ciencia",
    impact: "positivo",
    url: "https://elpais.com/proyecto-tendencias/2024-07-26/carne-cultivada-la-alternativa-no-vegana-para-proteger-el-ambiente.html"
  },
  {
    id: "world-romania-fur-ban-2024",
    title: "Rumanía vota la eliminación de las granjas peleteras para 2027",
    summary: "El 22 de octubre de 2024 el Parlamento rumano aprobó una ley para eliminar progresivamente las granjas de visones y chinchillas destinadas a la producción de pieles, con fecha límite en 2027. Al sumarse al creciente número de países europeos que cierran la industria peletera por motivos éticos, la medida mejora la protección legal de millones de animales y se clasifica como de impacto positivo.",
    date: "2024-10-22",
    region: "mundo",
    category: "ley",
    impact: "positivo",
    url: "https://www.reuters.com/world/europe/romanian-lawmakers-vote-phase-out-fur-farming-2027-2024-10-22/"
  },
  {
    id: "es-social-macrogranja-burgo-2024",
    title: "Movilización vecinal contra una macrogranja porcina en El Burgo Ranero (León)",
    summary: "El 27 de diciembre de 2024 La Nueva Crónica informa de una concentración de vecinos en El Burgo Ranero (León) contra el proyecto de una macrogranja de cerdas y lechones que pretende instalarse entre Villamuñío y Villamarco, con más de 3.100 animales y grandes balsas de purines. La noticia se considera favorable desde una óptica socioambiental y animalista porque visibiliza la oposición ciudadana a la ganadería porcina intensiva, asociada a contaminación de acuíferos, emisiones y sufrimiento animal, y refuerza la presión social para frenar este tipo de explotaciones.",
    date: "2024-12-27",
    region: "españa",
    category: "social",
    impact: "positivo",
    url: "https://www.lanuevacronica.com/actualidad/clamor-vecinal-contra-macrogranja-cerdos-se-proyecta-en-burgo-ranero_168009_102.html"
  },
  {
    id: "es-industria-fin-moratoria-clm-2025",
    title: "Fin de la moratoria a macrogranjas porcinas en Castilla-La Mancha y reactivación de proyectos",
    summary: "El 3 de enero de 2025 Cadena SER Manchuela explica en un reportaje audiovisual que el 31 de diciembre de 2024 ha expirado la moratoria que desde 2022 impedía autorizar nuevas macrogranjas porcinas o ampliar las existentes en Castilla-La Mancha, abriendo la puerta a retomar expedientes suspendidos. La noticia se considera perjudicial para los animales porque la reactivación de grandes explotaciones porcinas implica más ganadería intensiva, con altos volúmenes de purines, riesgos de contaminación y condiciones de vida empobrecidas para miles de cerdos.",
    date: "2025-01-03",
    region: "españa",
    category: "industria",
    impact: "negativo",
    url: "https://www.youtube.com/watch?v=krx7fY0Nu6I"
  },
  {
    id: "world-nebraska-labmeat-ban-2025",
    title: "Nebraska aprueba la Ley LB246 que veta la carne cultivada en laboratorio",
    summary: "El 14 de mayo de 2025 la Legislatura de Nebraska aprobó el proyecto LB246, que prohíbe la venta y distribución de proteínas cultivadas, comúnmente denominadas carne de laboratorio, en el estado. Al impedir el desarrollo y comercialización de alternativas potencialmente menos dañinas para los animales, esta ley representa un retroceso ético y se clasifica como de impacto negativo.",
    date: "2025-05-14",
    region: "mundo",
    category: "ley",
    impact: "negativo",
    url: "https://www.nefb.org/05/16/2025/nebraska-passes-lab-grow-protein-ban-legal-challenge-to-florida-ban-continues/"
  },
  {
    id: "es-ley-agricultura-aragon-2025",
    title: "Reforma de la ley de agricultura social y familiar de Aragón que facilita nuevas granjas",
    summary: "El 15 de mayo de 2025 el pleno de las Cortes de Aragón aprueba la Ley 2/2025, que modifica la Ley 6/2023 de protección y modernización de la agricultura social y familiar para flexibilizar la unidad mínima de cultivo y favorecer la instalación de explotaciones ganaderas, en una iniciativa impulsada por Vox y respaldada por PP y PAR. Diversas organizaciones ambientales alertan de que la reforma, pensada para facilitar la viabilidad económica del sector, también elimina límites y salvaguardas que dificultaban la expansión de macrogranjas, por lo que se considera perjudicial al incentivar modelos de producción intensiva que agravan la explotación animal y los impactos sobre el territorio rural.",
    date: "2025-05-15",
    region: "españa",
    category: "industria",
    impact: "negativo",
    url: "https://www.ultimahora.es/noticias/comunidades/2025/05/15/2387531/aprobada-reforma-ley-agricultura-social-familiar-aragon.html"
  },
  {
    id: "world-wildtype-salmon-2025",
    title: "La FDA de EE.UU. autoriza el primer salmón cultivado para consumo en restaurantes",
    summary: "El 6 de junio de 2025 la Agencia de Alimentos y Medicamentos de EE.UU. (FDA) emitió una carta de \"no objeciones\" que permite a la empresa Wildtype comercializar salmón cultivado a partir de células, considerado tan seguro como el salmón convencional. Al ofrecer pescado sin pesca ni sacrificio de animales, este hito tecnológico y regulatorio se interpreta como favorable para el bienestar animal y se clasifica con impacto positivo.",
    date: "2025-06-06",
    region: "mundo",
    category: "consumo",
    impact: "positivo",
    url: "https://finance.yahoo.com/news/us-fda-clears-wildtype-lab-110926147.html"
  },
  {
    id: "es-ley-prohibicion-pulpos-2025",
    title: "Registro en el Congreso de una proposición de ley para prohibir la acuicultura de pulpos en España",
    summary: "El 11 de junio de 2025 representantes de Sumar, ERC y Podemos registran en el Congreso una Proposición de Ley para modificar la Ley de Cultivos Marinos y prohibir la cría en cautividad y la acuicultura de pulpos, así como la comercialización de ejemplares procedentes de granjas, en respuesta al proyecto de Nueva Pescanova de instalar la primera macrogranja de pulpos del mundo en Galicia. La iniciativa se considera favorable porque reconoce la alta inteligencia y capacidad de sufrimiento de los pulpos y plantea vetar un nuevo modelo de explotación intensiva antes de que se considere, incorporando criterios de sintiencia y bienestar animal a la regulación pesquera y acuícola.",
    date: "2025-06-11",
    region: "españa",
    category: "ley",
    impact: "positivo",
    url: "https://www.ecoavant.com/consumo/sumar-erc-y-podemos-piden-al-gobierno-prohibir-la-acuicultura-de-pulpos_15280_102.html"
  },
  {
    id: "es-ley-galgos-aragon-2025",
    title: "Plan General de Caza de Aragón 2025-2026 que prohíbe la caza con galgos",
    summary: "El Boletín Oficial de Aragón publica el 25 de junio de 2025 la Orden MAT/692/2025, de 13 de junio, por la que se aprueba el Plan General de Caza para la temporada 2025-2026, incluyendo una disposición que establece expresamente que queda prohibida la caza con galgos en la comunidad. La medida se considera favorable porque elimina una práctica cinegética asociada históricamente al maltrato y abandono de estos perros de caza, reduciendo el riesgo de explotación y desprotección de miles de galgos en Aragón.",
    date: "2025-06-25",
    region: "españa",
    category: "ley",
    impact: "positivo",
    url: "https://www.boa.aragon.es/cgi-bin/EBOA/BRSCGI?CMD=VERDOC&BASE=BOLE&SEC=BUSQUEDA_AVANZADA&DOCN=007950302"
  },
  {
    id: "world-oecd-fao-meat-outlook-2025",
    title: "Informe OCDE-FAO 2025–2034 proyecta aumento sostenido del consumo mundial de carne",
    summary: "El informe conjunto OCDE‑FAO Agricultural Outlook 2025–2034, publicado el 15 de julio de 2025, proyecta un incremento de la producción y consumo global de carne en la próxima década, impulsado por el crecimiento de ingresos y urbanización en países de renta media. El escenario describe una expansión de la ganadería intensiva y del comercio de bovino y aves, lo que implica una presión creciente sobre millones de animales y se clasifica como impacto negativo en términos de bienestar.",
    date: "2025-07-15",
    region: "mundo",
    category: "consumo",
    impact: "negativo",
    url: "https://www.oecd.org/en/publications/2025/07/oecd-fao-agricultural-outlook-2025-2034_3eb15914/full-report/meat_5462e384.html"
  },
  {
    id: "es-ley-tauromaquia-ilp-2025",
    title: "El Congreso bloquea la ILP ‘No Es Mi Cultura’ y mantiene la tauromaquia como patrimonio cultural",
    summary: "El 7 de octubre de 2025 el pleno del Congreso de los Diputados rechaza debatir y admitir a trámite la Iniciativa Legislativa Popular ‘No Es Mi Cultura’, respaldada por más de 664.000 firmas, que pedía derogar la Ley 18/2013 que protege la tauromaquia como patrimonio cultural inmaterial en España; la abstención del PSOE resulta decisiva para que la ILP decaiga. La noticia se considera perjudicial porque frena una demanda social significativa orientada a retirar la protección institucional a las corridas de toros, perpetuando la consideración de esta práctica como bien cultural pese al sufrimiento de los animales implicados.",
    date: "2025-10-07",
    region: "españa",
    category: "ley",
    impact: "negativo",
    url: "https://unionvegetariana.org/el-congreso-bloquea-la-ilp-no-es-mi-cultura-y-frena-el-debate-sobre-la-tauromaquia/"
  },
  {
    id: "world-sei-nyu-sdg-animals-2025",
    title: "Nuevo informe alerta que los ODS descuidan la salud y el bienestar animal",
    summary: "El 9 de diciembre de 2025 el Stockholm Environment Institute y el NYU Center for Environmental and Animal Protection publicaron el informe \"Integrating Animal Health and Welfare into the 2030 Agenda and Beyond\", que denuncia que los Objetivos de Desarrollo Sostenible omiten sistemáticamente la dimensión animal. El documento propone vías concretas para incorporar el bienestar y la salud animal en la gobernanza global, reduciendo riesgos de zoonosis, resistencia antimicrobiana y pérdida de biodiversidad, por lo que se considera un avance normativo y científico de impacto positivo.",
    date: "2025-12-09",
    region: "mundo",
    category: "ciencia",
    impact: "positivo",
    url: "https://allafrica.com/stories/202512090087.html"
  },
  {
    id: "world-unea7-onehealth-2025",
    title: "UNEA‑7 refuerza el enfoque One Health e incluye la resistencia antimicrobiana vinculada a animales",
    summary: "Entre el 8 y el 12 de diciembre de 2025, la Asamblea de las Naciones Unidas para el Medio Ambiente (UNEA‑7) adoptó una resolución sobre las dimensiones ambientales de la resistencia antimicrobiana que reconoce la interconexión entre salud humana, animal y ecosistemas. Al dar más peso político al enfoque One Health e integrar la cuestión del uso de antimicrobianos en sistemas ganaderos, estas decisiones abren espacio para políticas que mejoren el bienestar animal y se clasifican como de impacto positivo.",
    date: "2025-12-12",
    region: "mundo",
    category: "ley",
    impact: "positivo",
    url: "https://wfa.org/unea-7-advances-on-one-health/"
  },
  {
    id: "es-industria-macrogranja-burgo-dia-2026",
    title: "Declaración de impacto ambiental favorable para una macrogranja porcina en El Burgo Ranero",
    summary: "El 11 de febrero de 2026 Tribuna León informa de que la Consejería de Medio Ambiente de Castilla y León ha emitido una declaración de impacto ambiental favorable para una explotación porcina intensiva en El Burgo Ranero, con capacidad para 3.146 animales y unas emisiones previstas de 44 toneladas anuales de metano y 16 de amoniaco. La noticia se considera perjudicial porque avala administrativamente un proyecto de macrogranja que incrementa la ganadería industrial en la zona, con altas cargas de purines y gases contaminantes, consolidando un modelo de producción que dificulta el bienestar de los animales y agrava los impactos sobre el entorno rural.",
    date: "2026-02-11",
    region: "españa",
    category: "industria",
    impact: "negativo",
    url: "https://www.tribunaleon.com/noticias/433932/la-junta-da-luz-verde-ambiental-a-una-macrogranja-porcina-en-el-burgo-ranero"
  },
  {
    id: "world-florida-labmeat-appeal-2026",
    title: "Un tribunal federal mantiene la prohibición de carne cultivada en Florida",
    summary: "El 24 de marzo de 2026 el Tribunal de Apelaciones del 11.º Circuito confirmó la ley de Florida (SB 1084) que prohíbe la fabricación y venta de carne cultivada en el estado. Al validar la primera prohibición estatal de proteínas cultivadas y animar medidas similares en otros estados, la sentencia consolida un bloqueo regulatorio a alternativas potencialmente menos crueles y se clasifica como de impacto negativo.",
    date: "2026-03-24",
    region: "mundo",
    category: "ley",
    impact: "negativo",
    url: "https://www.wftv.com/news/florida/floridas-cultivated-meat-ban-stands-after-legal-challenge/CRTIH7LVOVEVDNDHEPACOO4YLI/"
  },
  {
    id: "world-mercosur-feedlots-2026",
    title: "Imágenes de feedlots del Mercosur revelan condiciones extremas para ganado de exportación",
    summary: "En abril de 2026 Eurogroup for Animals difundió imágenes de corrales de engorde intensivos en Brasil, Argentina y Uruguay destinados a exportar carne bovina a la Unión Europea bajo el acuerdo Mercosur, mostrando hacinamiento, falta de sombra y agua limpia, y animales con estrés térmico y lesiones. La exposición de estas prácticas industriales pone de relieve la desconexión entre los estándares de bienestar de destino y las condiciones de producción, y se clasifica como noticia de impacto negativo por aumentar la explotación masiva de animales.",
    date: "2026-04-30",
    region: "mundo",
    category: "industria",
    impact: "negativo",
    url: "https://www.eurogroupforanimals.org/news/mercosur-feedlot-footage-exposes-harsh-reality-behind-trade-agreement"
  },
  {
    id: "world-eu-roadmap-testing-2026",
    title: "La Comisión Europea adopta una hoja de ruta para eliminar gradualmente las pruebas con animales en seguridad química",
    summary: "El 1 de junio de 2026 la Comisión Europea aprobó la \"Roadmap towards phasing out animal testing for chemical safety assessments\", que fija objetivos y más de veinte acciones para sustituir progresivamente la experimentación animal por métodos alternativos en 15 marcos legislativos relacionados con sustancias químicas, fármacos y aditivos. Al responder a una iniciativa ciudadana y orientar reformas regulatorias hacia un sistema de evaluación de riesgos sin animales, la hoja de ruta supone un avance estructural en reconocimiento de la sintiencia y se clasifica como de impacto positivo.",
    date: "2026-06-01",
    region: "mundo",
    category: "ley",
    impact: "positivo",
    url: "https://single-market-economy.ec.europa.eu/sectors/chemicals/reach/roadmap-towards-phasing-out-animal-testing_en"
  },
  {
    id: "world-denmark-pig-election-2026",
    title: "Dinamarca anuncia reformas profundas para reducir la ganadería porcina ultraintensiva",
    summary: "Tras la llamada \"elección del cerdo\", el nuevo programa de gobierno danés anunciado el 6 de junio de 2026 incluye el fin del corte rutinario de rabos, límites a la cría extrema y más espacio para cerdas y lechones, además de crear un ministerio específico de naturaleza y bienestar animal. El compromiso de transformar un sector altamente intensivo hacia modelos más sostenibles y centrados en el bienestar se considera un hito político favorable para los animales y se clasifica con impacto positivo.",
    date: "2026-06-06",
    region: "mundo",
    category: "ley",
    impact: "positivo",
    url: "https://www.theguardian.com/world/2026/jun/06/industrial-farming-denmark-pig-election"
  },
  {
    id: "world-eu-warzone-transport-2026",
    title: "ONGs entregan 50.000 firmas pidiendo a la UE que detenga el envío de animales vivos a zonas de guerra",
    summary: "El 14 de junio de 2026 varias organizaciones de protección animal presentaron casi 50.000 firmas a la Comisión Europea reclamando que se ordene a los Estados miembros dejar de autorizar transportes de animales vivos hacia zonas de guerra y crisis, como regiones de Oriente Medio en conflicto. La campaña evidencia que, pese al riesgo extremo y sufrimiento asociado, estos envíos siguen siendo legales, lo que señala una grave laguna de protección y se clasifica como noticia de impacto negativo.",
    date: "2026-06-14",
    region: "mundo",
    category: "social",
    impact: "negativo",
    url: "https://www.eurogroupforanimals.org/news/50000-signatures-against-animal-transport-war-zones-submitted-eu-commission"
  },
  {
    id: "es-social-estadistica-animal-2026",
    title: "España supera los 15 millones de animales de compañía registrados",
    summary: "En junio de 2026, el Ministerio de Derechos Sociales, Consumo y Agenda 2030 presentó el primer avance de la Estadística Nacional sobre Protección Animal, unificando registros autonómicos entre 2021 y 2025. El informe reveló un censo histórico de 15.171.569 mascotas registradas (un 14% más que en 2021), compuesto principalmente por perros (7,5 millones) y gatos (5,6 millones). Este avance estadístico facilita la coordinación estatal en emergencias y el diseño de políticas públicas de bienestar animal.",
    date: "2026-06-05",
    region: "españa",
    category: "social",
    impact: "positivo",
    url: "https://www.europapress.es/sociedad/noticia-espanoles-tienen-mas-15-millones-animales-compania-75-millones-perros-56-gatos-20260605111059.html"
  },
  {
    id: "es-social-vivotecnia-absolucion-2026",
    title: "El tribunal del caso Vivotecnia absuelve a los acusados por prescripción de delitos leves",
    summary: "El 18 de mayo de 2026, el Juzgado de lo Penal n.º 30 de Madrid absolvió a los dos técnicos de la empresa Vivotecnia juzgados por maltrato animal. Pese a considerar probado que se infligió dolor y sufrimiento innecesario en roedores por extracciones sin anestesia correcta, el juez dictaminó que se trataba de delitos leves ya prescritos en el momento de la denuncia. Organizaciones como PACMA y FAADA han recurrido el fallo al considerar insuficiente la motivación judicial.",
    date: "2026-05-18",
    region: "españa",
    category: "social",
    impact: "negativo",
    url: "https://elpais.com/sociedad/2026-05-18/el-juez-absuelve-a-los-acusados-de-maltrato-en-el-caso-vivotecnia-porque-los-delitos-leves-han-prescrito.html"
  },
  {
    id: "world-social-marineland-orcas-2026",
    title: "El cierre de Marineland en Francia inicia una carrera contrarreloj para reubicar a sus orcas",
    summary: "En febrero de 2026, se intensificó la movilización de ONGs y del Gobierno francés para encontrar un santuario o destino adecuado para las últimas orcas cautivas de Francia tras el cierre del parque Marineland Antibes. Este proceso se enmarca en la inminente entrada en vigor de la prohibición de mantener cetáceos en cautividad con fines comerciales en diciembre de 2026, lo que presiona para lograr transiciones éticas que eviten traslados a parques de entretenimiento fuera de Europa.",
    date: "2026-02-12",
    region: "mundo",
    category: "social",
    impact: "positivo",
    url: "https://www.theguardian.com/environment/2026/feb/12/the-race-to-save-wikie-and-keijo-the-mother-and-son-orcas-left-in-a-shut-down-aquarium"
  },
  {
    id: "es-ley-lobo-supremo-2026",
    title: "El Tribunal Supremo dictamina que la caza del lobo solo es legal como último recurso",
    summary: "El 12 de febrero de 2026, el Tribunal Supremo de España emitió una sentencia que restringe severamente las extracciones letales del lobo ibérico. El fallo establece que las comunidades autónomas solo pueden autorizar su caza cuando sea la única medida viable y tras acreditarse el fracaso de medidas de prevención razonables, reafirmando los límites estrictos de protección europea.",
    date: "2026-02-12",
    region: "españa",
    category: "ley",
    impact: "positivo",
    url: "https://efeverde.com/tribunal-supremo-valida-cazar-lobo-unica-solucion-danos-ganado/"
  },
  {
    id: "es-ley-coordinacion-ganado-2026",
    title: "Aprobado el Real Decreto 69/2026 para coordinar el bienestar en ganadería y acuicultura",
    summary: "El 6 de febrero de 2026 se publicó en el BOE el Real Decreto 69/2026, que crea la Mesa de Coordinación sobre bienestar y protección de animales mantenidos con fines agrarios y acuícolas. La norma busca unificar y optimizar los controles oficiales de bienestar animal en todo el país, designando además a un consorcio del IRTA y universidades catalanas como el nuevo Centro Nacional de Referencia.",
    date: "2026-02-06",
    region: "españa",
    category: "ley",
    impact: "positivo",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2026-2727"
  },
  {
    id: "world-ley-farrowing-crates-2025",
    title: "El Reino Unido announces plans para prohibir las jaulas de parición de cerdas",
    summary: "El 22 de diciembre de 2025, el Gobierno británico presentó la Estrategia de Bienestar Animal para Inglaterra, detallando su compromiso de consultar y legislar para eliminar progresivamente el confinamiento de cerdas en jaulas de parición (farrowing crates). La medida busca transformar la ganadería porcina intensiva, aunque ONGs advierten de la necesidad de impedir importaciones de carne de cerdos criados bajo estándares inferiores.",
    date: "2025-12-22",
    region: "mundo",
    category: "ley",
    impact: "positivo",
    url: "https://www.gov.uk/government/publications/animal-welfare-strategy-for-england/animal-welfare-strategy-for-england"
  },
  {
    id: "es-ley-grandes-simios-2025",
    title: "España inicia la tramitación de la pionera 'Ley Jane Goodall' para grandes simios",
    summary: "El 13 de octubre de 2025, el Ministerio de Derechos Sociales anunció la puesta en marcha de la Ley de Grandes Simios, denominada informalmente \"Ley Jane Goodall\". El proyecto busca dotar de derechos fundamentales (vida, libertad, no tortura) a orangutanes, chimpancés, bonobos y gorilas en España, prohibiendo la experimentación lesiva y su explotación en espectáculos comerciales.",
    date: "2025-10-13",
    region: "españa",
    category: "ley",
    impact: "positivo",
    url: "https://www.rtve.es/noticias/20251013/gobierno-pondra-marcha-ley-jane-goodall-proteger-dignidad-libertad-grandes-simios/23641775.shtml"
  },
  {
    id: "es-ley-violencia-vicaria-2025",
    title: "Sentencia pionera reconoce el maltrato animal como una forma de violencia vicaria",
    summary: "El 23 de septiembre de 2025, el Juzgado de Violencia sobre la Mujer n.º 2 de Las Palmas de Gran Canaria condenó a un hombre a 12 meses de prisión por matar al cachorro de su expareja. La jueza aplicó perspectiva de género al considerar el maltrato animal en concurso medial con el maltrato psicológico de la mujer, al ser el animal un instrumento de tortura psicológica dirigida a su pareja.",
    date: "2025-09-23",
    region: "españa",
    category: "ley",
    impact: "positivo",
    url: "https://elpais.com/sociedad/2025-09-23/una-jueza-dicta-la-primera-sentencia-de-violencia-vicaria-por-matar-el-perro-de-su-expareja.html"
  },
  {
    id: "es-ley-toro-de-la-vega-2025",
    title: "El TSJ de Castilla y León anula el reglamento del torneo del Toro de la Vega",
    summary: "El 14 de mayo de 2025, el Tribunal Superior de Justicia de Castilla y León ratificó la prohibición de herir al Toro de la Vega, al anular las bases del torneo de 2022 que pretendían usar punzones para clavar insignias en el lomo del animal. El fallo determinó que estas bases no se adaptaban al festejo tradicional sino que constituían un nuevo espectáculo ilegal que maltrataba y causaba heridas en público.",
    date: "2025-05-14",
    region: "españa",
    category: "ley",
    impact: "positivo",
    url: "https://elpais.com/sociedad/2025-05-14/la-justicia-ratifica-la-prohibicion-del-nuevo-torneo-del-toro-de-la-vega-de-tordesillas.html"
  },
  {
    id: "es-ley-lobo-desproteccion-2025",
    title: "El Congreso rebaja la protección del lobo ibérico mediante la ley de desperdicio alimentario",
    summary: "El 12 de marzo de 2025, el Congreso de los Diputados aprobó una polémica enmienda del PP para excluir al lobo del listado LESPRE al norte del Duero, habilitando de nuevo su caza controlada. La enmienda, aprobada dentro de una ley de desperdicio alimentario bajo el argumento de que el ganado atacado constituye \"desperdicio de carne\", ha sido recurrida ante el Constitucional por sospechas de inconstitucionalidad procedimental.",
    date: "2025-03-12",
    region: "españa",
    category: "ley",
    impact: "negativo",
    url: "https://www.eldiario.es/sociedad/congreso-desprotege-lobo-enmienda-pp-apoyada-vox-junts-pnv-ley-desperdicio-alimentario_1_11993432.html"
  },
  {
    id: "world-ley-puppy-mills-ny-2024",
    title: "Entra en vigor la prohibición de vender perros, gatos y conejos en tiendas de Nueva York",
    summary: "El 15 de diciembre de 2024 entró en vigor la Ley de Oleoductos de Cachorros (Puppy Mill Pipeline Act) de Nueva York, que prohíbe a las tiendas minoristas de mascotas la venta de perros, gatos y conejos. El objetivo es frenar el lucrativo mercado alimentado por criaderos industriales crueles, permitiendo en su lugar que las tiendas organicen eventos de adopción con refugios locales.",
    date: "2024-12-15",
    region: "mundo",
    category: "ley",
    impact: "positivo",
    url: "https://www.governor.ny.gov/news/governor-hochul-signs-legislation-ban-sale-dogs-cats-and-rabbits-retail-pet-shops"
  },
  {
    id: "world-ley-octopus-ban-ca-2024",
    title: "California prohíbe la cría y venta de carne de pulpo de acuicultura",
    summary: "El 27 de septiembre de 2024, el gobernador de California firmó la ley AB 3162, conocida como la Ley OCTO, prohibiendo la acuicultura de pulpos en tierra y aguas estatales, así como la comercialización de su carne en el estado. Con esta norma, California se convirtió en el segundo estado estadounidense en vetar esta controvertida industria debido a la alta sintiencia e inteligencia de estos animales.",
    date: "2024-09-27",
    region: "mundo",
    category: "ley",
    impact: "positivo",
    url: "https://aldf.org/article/california-bans-octopus-farming/"
  },
  {
    id: "world-ley-pet-abduction-uk-2024",
    title: "El Reino Unido aprueba la Ley de Secuestro de Mascotas para castigar el robo de perros y gatos",
    summary: "El 24 de agosto de 2024 entró en vigor en Inglaterra e Irlanda del Norte la Ley de Secuestro de Mascotas (Pet Abduction Act). Esta norma crea delitos penales específicos para el secuestro de perros y gatos, con penas de hasta cinco años de prisión, reconociendo que los animales son seres sintientes que sufren angustia psicológica en lugar de ser meros bienes materiales.",
    date: "2024-08-24",
    region: "mundo",
    category: "ley",
    impact: "positivo",
    url: "https://www.theguardian.com/uk-news/article/2024/aug/24/pet-thieves-could-be-jailed-for-up-to-five-years-under-new-law-in-uk"
  },
  {
    id: "es-social-protestas-taurinas-gijon-2024",
    title: "El retorno de los toros a Gijón en la Feria de Begoña reaviva el conflicto taurino",
    summary: "El 15 de agosto de 2024, la celebración de corridas de toros en la plaza de El Bibio de Gijón tras tres años de suspensión municipal provocó masivas manifestaciones de rechazo organizadas por colectivos animalistas asturianos. Las protestas exigieron que la tauromaquia se defina legalmente como maltrato animal en la Ley de Espectáculos regional, visibilizando la fuerte oposición ciudadana al regreso de espectáculos crueles.",
    date: "2024-08-15",
    region: "españa",
    category: "social",
    impact: "negativo",
    url: "https://www.eldiario.es/asturias/asturias-antitaurina-vuelve-calle-gijon-denunciar-maltrato-animal-feria-begona_1_11593922.html"
  },
  {
    id: "world-ley-glue-traps-ban-2024",
    title: "Entra en vigor en Inglaterra la prohibición de uso de trampas de pegamento para roedores",
    summary: "El 31 de julio de 2024 entró en vigor la Ley de Trampas de Pegamento (Glue Traps (Offences) Act 2022) en Inglaterra, haciendo ilegal el uso de estas trampas adhesivas por parte del público debido al dolor extremo y la lenta agonía que causan a los roedores y otros animales silvestres atrapados. Su uso queda restringido a técnicos autorizados en situaciones excepcionales bajo licencia estatal.",
    date: "2024-07-31",
    region: "mundo",
    category: "ley",
    impact: "positivo",
    url: "https://www.gov.uk/government/news/use-of-glue-traps-to-catch-rodents-strictly-controlled-from-today"
  },
  {
    id: "world-ley-live-sheep-export-ban-2024",
    title: "Australia aprueba poner fin a las exportaciones marítimas de ovejas vivas para 2028",
    summary: "El 1 de julio de 2024, el Senado de Australia aprobó la ley que prohíbe la exportación por mar de ovejas vivas a partir del 1 de mayo de 2028. La norma, apoyada por una dotación de 107 millones de dólares australianos para facilitar la transición del sector ganadero, responde a décadas de activismo que denunciaba las pésimas condiciones de hacinamiento y estrés térmico del transporte marítimo.",
    date: "2024-07-01",
    region: "mundo",
    category: "ley",
    impact: "positivo",
    url: "https://www.theguardian.com/australia-news/article/2024/jul/01/live-sheep-export-ban-passes-senate-australia"
  },
  {
    id: "es-ley-premio-tauromaquia-2024",
    title: "El Ministerio de Cultura de España suprime el Premio Nacional de Tauromaquia",
    summary: "El 3 de mayo de 2024, el ministro de Cultura, Ernest Urtasun, inició los trámites para cancelar de forma definitiva el Premio Nacional de Tauromaquia. La decisión se justificó por coherencia con la evolución social y el rechazo al maltrato animal en espectáculos públicos, provocando una enérgica respuesta de los sectores taurinos y la creación de galardones alternativos en autonomías gobernadas por el PP y Vox.",
    date: "2024-05-03",
    region: "españa",
    category: "ley",
    impact: "positivo",
    url: "https://elpais.com/cultura/2024-05-03/urtasun-cancela-el-premio-nacional-de-tauromaquia-por-la-tortura-animal.html"
  },
  {
    id: "world-consumo-meat-decline-germany-2024",
    title: "El consumo de carne en Alemania desciende a un mínimo histórico",
    summary: "El 4 de abril de 2024, el Centro Federal de Información Agrícola de Alemania reportó que el consumo per cápita de carne cayó en 2023 a 51,6 kg, el nivel más bajo desde que hay registros en 1991. Este descenso refleja un giro cultural hacia dietas flexitarianas y vegetales debido a preocupaciones ambientales y éticas de los consumidores sobre el bienestar de los animales en sistemas industriales.",
    date: "2024-04-04",
    region: "mundo",
    category: "consumo",
    impact: "positivo",
    url: "https://www.bmel.de/SharedDocs/Pressemitteilungen/DE/2024/240404-fleischkonsum.html"
  },
  {
    id: "world-ley-cage-age-court-2026",
    title: "La Comisión Europea afronta un juicio histórico en Luxemburgo por la moratoria de las jaulas",
    summary: "El 5 de marzo de 2026, el Tribunal de Justicia de la UE celebró la audiencia del caso que enfrenta a los organizadores de la iniciativa \"End the Cage Age\" contra la Comisión Europea. Se acusa a la Comisión de incumplir su compromiso vinculante de 2021 de proponer la abolición de las jaulas de cría de aves, cerdos y conejos en 2023, estableciendo un precedente clave para la rendición de cuentas institucional.",
    date: "2026-03-05",
    region: "mundo",
    category: "ley",
    impact: "positivo",
    url: "https://www.animanaturalis.org/n/la-comision-europea-se-enfrenta-a-un-juicio-historico-en-luxemburgo-por-la-iniciativa-end-the-cage-age"
  },
  {
    id: "world-ley-octopus-farming-wa-2024",
    title: "Washington se convierte en el primer estado del mundo en prohibir la cría de pulpos",
    summary: "El 13 de marzo de 2024, el gobernador del estado de Washington firmó la ley HB 1153, prohibiendo de forma preventiva la cría y la acuicultura comercial de pulpos. Los legisladores argumentaron que los pulpos son animales inteligentes e incapaces de vivir en cautividad sin sufrir un estrés extremo y daños biológicos, sentando el primer precedente global.",
    date: "2024-03-13",
    region: "mundo",
    category: "ley",
    impact: "positivo",
    url: "https://www.pasadosafehaven.org/advocacy/octopus-farming-ban/"
  }
];
