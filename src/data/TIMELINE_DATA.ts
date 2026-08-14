import type { TimelineGroup } from "../types";

export const TIMELINE_DATA: TimelineGroup[] = [
  {
    id: "usos",
    title: "Usos e Instrumentalización",
    description: "La historia material de cómo la humanidad ha subordinado la fuerza, el cuerpo y el metabolismo animal para construir la infraestructura de la civilización.",
    color: "blue",
    milestones: [
      {
        id: "domesticacion-neolitica",
        year: -10000,
        yearLabel: "c. 10.000 a.C.",
        title: "La Revolución del Neolítico",
        shortDesc: "La transición de la caza a la domesticación selectiva de especies gregarias.",
        longDesc: "En el Creciente Fértil y otras regiones independientes, el Homo sapiens abandona el nomadismo y comienza a confinar y reproducir de forma selectiva a cabras, ovejas y rumiantes [1]. El animal deja de ser un competidor en estado salvaje para convertirse en un recurso vivo controlable: almacenamiento biológico de proteínas, grasa y abrigo [2]. Esta domesticación inicial sentó los cimientos del sedentarismo agrícola humano [3].",
        scientificFacts: [
          "La domesticación modificó la morfología y el comportamiento animal, reduciendo el tamaño del cerebro y atenuando sus respuestas de huida ante el ser humano [1].",
          "La dehesa agrícola primitiva del Neolítico generó una coevolución patógena debido a la estrecha proximidad con el ganado, dando origen a la mayoría de las enfermedades infecciosas humanas históricas (zoonosis) [3]."
        ],
        references: [
          {
            id: "1",
            citation: "Clutton-Brock, J. (2012). A Natural History of Domesticated Mammals. Cambridge University Press.",
            url: "https://doi.org/10.1017/CBO9781139165662"
          },
          {
            id: "2",
            citation: "Diamond, J. (1997). Guns, Germs, and Steel: The Fates of Human Societies. W. W. Norton & Company."
          , url: "https://en.wikipedia.org/wiki/Guns,_Germs,_and_Steel"},
          {
            id: "3",
            citation: "Zeder, M. A. (2008). Domestication and early agriculture in the Mediterranean Basin: Origins, diffusion, and impact. Proceedings of the National Academy of Sciences, 105(33), 11597-11604.",
            url: "https://doi.org/10.1073/pnas.0801317105"
          }
        ],
        relatedNodeId: "historia-dominacion"
      },
      {
        id: "infraestructura-romana",
        year: 100,
        yearLabel: "Siglo I d.C.",
        title: "El Imperio como Red Logística Animal",
        shortDesc: "El animal como tracción física pesada, transporte militar y espectáculo de masas.",
        longDesc: "El Imperio Romano codifica el uso animal a gran escala para sostener su infraestructura comercial y militar. Los équidos y camélidos sirven como la logística terrestre indispensable para la distribución y el correo estatal [1]. En paralelo, las fieras salvajes son capturadas sistemáticamente en los confines de las provincias para ser masacradas en anfiteatros (venationes), ejemplificando el uso lúdico y el dominio absoluto de Roma sobre el mundo natural [2].",
        scientificFacts: [
          "La logística militar romana dependía estrictamente del suministro de mulas y caballos para mover bagajes tácticos, consumiendo toneladas de grano vegetal [1].",
          "Durante la inauguración del Coliseo (80 d.C.), se registra la masacre de más de 9.000 animales en cien días de espectáculos circenses, acelerando la extinción local de leones del norte de África [2]."
        ],
        references: [
          {
            id: "1",
            citation: "Bulliet, R. W. (2005). Hunters, Herders, and Hamburgers: The Past and Future of Human-Animal Relationships. Columbia University Press."
          , url: "https://www.google.com/books/edition/Hunters_Herders_and_Hamburgers"},
          {
            id: "2",
            citation: "Toynbee, J. M. C. (1973). Animals in Roman Life and Art. Cornell University Press."
          , url: "https://www.google.com/books/edition/Animals_in_Roman_Life_and_Art"}
        ],
        relatedNodeId: "historia-dominacion"
      },
      {
        id: "traccion-medieval",
        year: 1050,
        yearLabel: "c. Año 1050",
        title: "La Revolución Agrícola Medieval",
        shortDesc: "El arado pesado y el collar de hombros multiplican la explotación de la tracción animal.",
        longDesc: "Durante la Plena Edad Media, la introducción del arado de vertedera pesado, la herradura de hierro y el collar rígido de hombros (collerón) revoluciona la agricultura europea [1]. Estos inventos mecánicos permiten que el caballo y el buey ejerzan una fuerza de tracción cinco veces superior sin ahogarse, convirtiendo al animal en el motor biológico fundamental que desbrozó los bosques templados y posibilitó la expansión demográfica de las ciudades feudales [2].",
        scientificFacts: [
          "El collerón medieval trasladó el punto de presión del cuello del caballo (que comprimía su tráquea) a sus hombros, permitiendo un tiro continuo de alta potencia [1].",
          "Este aumento de la eficiencia física requirió destinar extensos campos agrícolas a la siembra de avena para el ganado en lugar de cereales de consumo humano directo [2]."
        ],
        references: [
          {
            id: "1",
            citation: "White, L. (1962). Medieval Technology and Social Change. Oxford University Press."
          },
          {
            id: "2",
            citation: "Langdon, J. (1986). Horses, Oxen and Technological Innovation: The Use of Draught Animals in English Farming from 1066 to 1500. Cambridge University Press.",
            url: "https://doi.org/10.1017/CBO9780511522337"
          }
        ],
        relatedNodeId: "historia-dominacion"
      },
      {
        id: "chicago-stock-yards",
        year: 1865,
        yearLabel: "1865",
        title: "La Línea de Despiece de Chicago",
        shortDesc: "El nacimiento de la industrialización cárnica y la inspiración de la cadena de montaje moderna.",
        longDesc: "La apertura de los Union Stock Yards en Chicago (1865) marca el inicio de la cosificación industrial a gran escala [1]. Se diseñan gigantescas redes de ferrocarril, sistemas de refrigeración industrial y cadenas aéreas de despiece donde los animales son procesados mecánicamente a un ritmo frenético. Este sistema de despiece continuo (\"disassembly line\") inspiró directamente a Henry Ford para crear la línea de montaje automotriz [2].",
        scientificFacts: [
          "Chicago concentró por primera vez el sacrificio a gran escala mediante la división extrema del trabajo, procesando millones de reses y cerdos anualmente [1].",
          "La introducción de vagones refrigerados permitió centralizar la matanza en el medio oeste y distribuir carne procesada a largas distancias, desvinculando físicamente al consumidor de la muerte del animal [2]."
        ],
        references: [
          {
            id: "1",
            citation: "Cronon, W. (1991). Nature's Metropolis: Chicago and the Great West. W. W. Norton & Company."
          , url: "https://en.wikipedia.org/wiki/Nature%27s_Metropolis"},
          {
            id: "2",
            citation: "Ford, H. (1922). My Life and Work. Garden City Publishing Co."
          , url: "https://en.wikipedia.org/wiki/My_Life_and_Work"}
        ],
        relatedNodeId: "sistemas-alimentacion"
      },
      {
        id: "macrogranjas-mediados-siglo",
        year: 1950,
        yearLabel: "Década de 1950",
        title: "El Auge de la Ganadería Industrial Intensiva",
        shortDesc: "La reclusión del animal en espacios confinados controlados químicamente.",
        longDesc: "Tras la Segunda Guerra Mundial, la ganadería sufre una mutación química y mecánica: los animales son retirados de las dehesas y praderas para ser recluidos de por vida en macrogranjas confinadas de alta densidad [1]. Gracias al descubrimiento científico del uso de antibióticos como promotores del crecimiento y de la vitamina D sintética, es viable criarlos hacinados bajo luz artificial permanente, priorizando exclusivamente el índice de conversión de pienso a carne [2].",
        scientificFacts: [
          "El hacinamiento extremo impidió el desarrollo de comportamientos biológicos naturales, forzando cortes preventivos de rabos y despicados sin anestesia para evitar el canibalismo por estrés [2].",
          "La ganadería intensiva pasa a consumir más del 70% de la producción global de antibióticos, acelerando de forma crítica la resistencia bacteriana del planeta [3]."
        ],
        references: [
          {
            id: "1",
            citation: "Harrison, R. (1964). Animal Machines: The New Factory Farming Industry. Vincent Stuart Publishers."
          , url: "https://en.wikipedia.org/wiki/Animal_Machines"},
          {
            id: "2",
            citation: "Webster, J. (2008). Animal Welfare: Limiting Pain and Suffering. Wiley-Blackwell."
          , url: "https://www.google.com/books/edition/Animal_Welfare"},
          {
            id: "3",
            citation: "Landrigan, P. J., et al. (2018). The Lancet Commission on Pollution and Health. The Lancet, 391(10119), 462-512.",
            url: "https://doi.org/10.1016/S0140-6736(17)32345-0"
          }
        ],
        relatedNodeId: "sistemas-alimentacion"
      },
      {
        id: "agricultura-celular-era",
        year: 2013,
        yearLabel: "2013-Presente",
        title: "La Era de la Agricultura Celular",
        shortDesc: "La desvinculación biotecnológica: producir carne y lácteos directamente sin criar seres sintientes.",
        longDesc: "En 2013, el profesor Mark Post presenta públicamente la primera hamburguesa de ternera cultivada in vitro a partir de células madre musculares cosechadas de forma indolora [1]. Esto inicia una revolución biotecnológica global enfocada en sustituir la ganadería tradicional por agricultura celular y fermentación de precisión, eliminando el coste termodinámico del mantenimiento metabólico animal y erradicando el sufrimiento en mataderos [2].",
        scientificFacts: [
          "La carne cultivada in vitro reduce potencialmente el consumo de espacio de tierra en un 90% y la emisión de gases de efecto invernadero en más del 80% en comparación con la carne de rumiante convencional [2].",
          "La fermentación de precisión de microorganismos permite fabricar proteínas lácteas (caseína, suero) idénticas sin la ineficiencia de la preñez y ordeño bovino [1]."
        ],
        references: [
          {
            id: "1",
            citation: "Post, M. J. (2012). Cultured meat from stem cells: Challenges and prospects. Meat Science, 92(3), 297-301.",
            url: "https://doi.org/10.1016/j.meatsci.2012.04.008"
          },
          {
            id: "2",
            citation: "Tuomisto, H. L., & de Mattos, M. J. (2011). Environmental impacts of cultured meat production. Environmental Science & Technology, 45(14), 6117-6123.",
            url: "https://doi.org/10.1021/es200130u"
          }
        ],
        relatedNodeId: "vias-transicion"
      }
    ]
  },
  {
    id: "etica",
    title: "Ética, Filosofía y Consciencia",
    description: "La evolución intelectual del debate moral sobre los animales: desde los cuestionamientos místicos de la antigüedad hasta la demostración empírica de su consciencia neurobiológica.",
    color: "purple",
    milestones: [
      {
        id: "pitagoras-plutarco",
        year: -500,
        yearLabel: "c. 500 a.C.",
        title: "La Compasión de la Escuela Pitagórica",
        shortDesc: "Primeros cuestionamientos a la matanza animal basados en la metempsicosis y la coherencia moral.",
        longDesc: "En la Antigua Grecia, Pitágoras y sus seguidores abogan por una dieta estrictamente libre de carne (entonces llamada 'dieta pitagórica') [1]. Apoyándose en la metempsicosis (transmigración de las almas), sostienen que dañar a un animal sintiente violenta la hermandad universal de los seres vivos [2]. Siglos después, Plutarco escribe 'Sobre el comer carne', el primer gran manifiesto ético-vegetariano de la historia europea, argumentando que el consumo de carne embrutece el espíritu humano [2].",
        scientificFacts: [
          "La dieta pitagórica y la abstinencia de carnes se consideraban prácticas espirituales de consistencia lógica y moral frente a los cruentos sacrificios religiosos helenos [1].",
          "Plutarco introdujo el argumento de la innecesariedad fáctica: el ser humano dispone de abundancia de frutos y legumbres para sobrevivir dignamente sin infligir derramamiento de sangre [2]."
        ],
        references: [
          {
            id: "1",
            citation: "Sorabji, R. (1993). Animal Minds and Human Morals: The Origins of the Western Debate. Cornell University Press."
          , url: "https://www.google.com/books/edition/Animal_Minds_and_Human_Morals"},
          {
            id: "2",
            citation: "Plutarco. (c. 100 d.C.). Moralia: De esu carnium (Sobre el comer carne)."
          , url: "https://es.wikipedia.org/wiki/Moralia"}
        ],
        relatedNodeId: "marcos-eticos"
      },
      {
        id: "cartesianismo-maquina",
        year: 1637,
        yearLabel: "1637",
        title: "El Autómata Cartesiano",
        shortDesc: "René Descartes y la teoría de los animales como máquinas biológicas sin alma ni consciencia.",
        longDesc: "En su 'Discurso del método', René Descartes establece el dualismo mente-cuerpo, definiendo a los animales no humanos como autómatas biológicos desprovistos de alma (\"res cogitans\") [1]. Según esta hipótesis, al carecer de lenguaje verbal reflexivo y razón abstracta, sus chillidos de dolor no expresan sufrimiento consciente subjetivo, sino simples reacciones físicas de engranajes que se tensan [2]. Esta teoría sirvió históricamente para inmunizar moralmente las vivisecciones y abusos masivos [2].",
        scientificFacts: [
          "El cartesianismo justificó la experimentación fisiológica invasiva sin analgesia al sostener que un perro gime del mismo modo que un reloj da las horas mecánicamente [2].",
          "La noción cartesiana de que el lenguaje proposicional complejo es prerrequisito para la sintiencia ha sido desmentida por completo por la neurobiología evolutiva del tronco del encéfalo [1]."
        ],
        references: [
          {
            id: "1",
            citation: "Descartes, R. (1637). Discurso del método (Parte V)."
          , url: "https://es.wikipedia.org/wiki/Discurso_del_m%C3%A9todo"},
          {
            id: "2",
            citation: "Harrison, P. (1992). Descartes on animals. Philosophical Quarterly, 42(167), 219-227.",
            url: "https://doi.org/10.2307/2220217"
          }
        ],
        relatedNodeId: "neurobiologia-dolor"
      },
      {
        id: "bentham-sufrimiento",
        year: 1789,
        yearLabel: "1789",
        title: "La Nocicepción como Línea Moral",
        shortDesc: "Jeremy Bentham sitúa la capacidad de sufrir, y no la razón, como el criterio fundamental de consideración ética.",
        longDesc: "En 'Introducción a los principios de la moral y la legislación', el filósofo utilitarista Jeremy Bentham desafía la exclusión de los animales del círculo de la justicia [1]. En una famosa nota a pie de página, escribe que un caballo o un perro adulto es incomparablemente más racional y comunicativo que un lactante humano de un día. Sentencia: 'La cuestión no es ¿pueden razonar?, ni ¿pueden hablar?, sino ¿pueden sufrir?' [1]. Este cambio de paradigma independiza la moralidad del intelecto [2].",
        scientificFacts: [
          "Bentham anticipó que un día el estatus biológico de la sintiencia animal sería reconocido legalmente del mismo modo que la etnicidad de los esclavos africanos [1].",
          "La formulación de Bentham sentó las bases lógicas de los primeros proyectos de ley parlamentarios contra el maltrato animal en Europa [2]."
        ],
        references: [
          {
            id: "1",
            citation: "Bentham, J. (1789). An Introduction to the Principles of Morals and Legislation. T. Payne and Son."
          , url: "https://en.wikipedia.org/wiki/An_Introduction_to_the_Principles_of_Morals_and_Legislation"},
          {
            id: "2",
            citation: "Singer, P. (2011). Practical Ethics (3rd ed.). Cambridge University Press."
          , url: "https://en.wikipedia.org/wiki/Practical_Ethics"}
        ],
        relatedNodeId: "marcos-eticos"
      },
      {
        id: "singer-regan-auge",
        year: 1975,
        yearLabel: "1975-1983",
        title: "Liberación Animal y Deontología de Derechos",
        shortDesc: "La deconstrucción contemporánea del especismo y los 'sujetos-de-una-vida'.",
        longDesc: "El debate bioético animal explota con la publicación de 'Liberación Animal' de Peter Singer (1975) [1] y 'El caso de los derechos de los animales' de Tom Regan (1983) [2]. Singer deconstruye el 'especismo' como un prejuicio ético arbitrario equivalente al racismo, basándose en la igual consideración de intereses. Regan, desde una vía deontológica, argumenta que los mamíferos son 'sujetos-de-una-vida' con valor intrínseco, lo que prohíbe tratarlos como meras mercancías dietéticas [2].",
        scientificFacts: [
          "Singer expuso científicamente que el modelo alimentario intensivo inflige un volumen masivo de sufrimiento crónico para satisfacer fines gastronómicos efímeros no vitales [1].",
          "Regan demostró lógicamente que si a los humanos con discapacidades cognitivas severas les garantizamos plenos derechos morales y no los usamos en laboratorios, la consistencia ética obliga a hacer lo mismo con animales equivalentes en complejidad neural [2]."
        ],
        references: [
          {
            id: "1",
            citation: "Singer, P. (1975). Animal Liberation: A New Ethics. HarperCollins."
          , url: "https://en.wikipedia.org/wiki/Animal_Liberation_(book)"},
          {
            id: "2",
            citation: "Regan, T. (1983). The Case for Animal Rights. University of California Press."
          , url: "https://en.wikipedia.org/wiki/The_Case_for_Animal_Rights"}
        ],
        relatedNodeId: "marcos-eticos"
      },
      {
        id: "declaracion-cambridge",
        year: 2012,
        yearLabel: "2012",
        title: "La Declaración de Cambridge sobre la Consciencia",
        shortDesc: "El consenso neurobiológico formal de que los animales no humanos son seres conscientes.",
        longDesc: "El 7 de julio de 2012, un panel internacional de destacados neurocientíficos firma en la Universidad de Cambridge la Declaración sobre la Consciencia en presencia de Stephen Hawking [1]. El manifiesto certifica que los animales no humanos (incluyendo todos los vertebrados y moluscos cefalópodos) poseen las estructuras anatómicas, neuroquímicas y neurofisiológicas requeridas para albergar consciencia reflexiva y experiencia subjetiva [2].",
        scientificFacts: [
          "La declaración afirma que la ausencia de neocórtex no impide que un organismo experimente estados emocionales conscientes, ya que las estructuras subcorticales homólogas controlan estas sensaciones [1].",
          "Los cefalópodos (como pulpos y calamares) muestran complejos circuitos neuronales y una sofisticada autoconsciencia a pesar de carecer de una morfología cerebral similar a los vertebrados [2]."
        ],
        references: [
          {
            id: "1",
            citation: "Low, P., Panksepp, J., Reiss, D., Edelman, D., Van Swinderen, B., & Koch, C. (2012). The Cambridge Declaration on Consciousness. Churchill College, University of Cambridge.",
            url: "https://fcmconference.org/img/CambridgeDeclarationOnConsciousness.pdf"
          },
          {
            id: "2",
            citation: "Birch, J., et al. (2021). Review of the Evidence of Sentience in Cephalopod Molluscs and Decapod Crustaceans. LSE Consulting.",
            url: "https://www.lse.ac.uk/News/News-Assets/PDFs/2021/Sentience-Review.pdf"
          }
        ],
        relatedNodeId: "neurobiologia-dolor"
      },
      {
        id: "declaracion-montreal",
        year: 2022,
        yearLabel: "2022",
        title: "La Declaración de Montreal sobre la Explotación",
        shortDesc: "Cientos de filósofos exigen el cese legal de toda instrumentalización animal en base a la sintiencia.",
        longDesc: "En 2022, más de 500 filósofos y académicos internacionales firman la Declaración de Montreal sobre la Explotación Animal [1]. El documento va un paso más allá de la ciencia de la consciencia: establece que dado que los animales sufren y sus vidas les importan, es éticamente indefendible continuar mercantilizándolos, confinándolos y matándolos para fines gastronómicos triviales. Exigen reformas jurídicas abolicionistas globales [2].",
        scientificFacts: [
          "El manifiesto destaca que la ganadería representa la mayor explotación sistemática de seres conscientes de la historia terrestre, afectando a más de 80.000 millones de mamíferos y aves al año [1].",
          "La declaración condena la disonancia social que tolera la macrogranja a pesar de existir alternativas nutricionales vegetales seguras y completas [2]."
        ],
        references: [
          {
            id: "1",
            citation: "Declaration of Montreal on Animal Exploitation. (2022). Signed by over 500 ethicists and researchers worldwide.",
            url: "https://www.declaration-montreal-animal-exploitation.org/"
          },
          {
            id: "2",
            citation: "Nussbaum, M. C. (2023). Justice for Animals: Our Collective Responsibility. Simon & Schuster."
          , url: "https://www.google.com/books/edition/Justice_for_Animals"}
        ],
        relatedNodeId: "marcos-eticos"
      }
    ]
  },
  {
    id: "regulaciones",
    title: "Regulaciones y Leyes",
    description: "Los hitos legislativos mundiales que han ido restringiendo la propiedad absoluta del animal para reconocerlos formalmente en los códigos civiles de los Estados.",
    color: "emerald",
    milestones: [
      {
        id: "martins-act",
        year: 1822,
        yearLabel: "1822",
        title: "La Ley de Martin (Reino Unido)",
        shortDesc: "La primera ley moderna del mundo que castiga penalmente el maltrato animal doméstico.",
        longDesc: "En 1822, el parlamentario irlandés Richard Martin logra la aprobación en el Parlamento británico de la 'Cruel Treatment of Cattle Act' (conocida como Martin's Act) [1]. Es el primer estatuto legislativo estatal del mundo que prohíbe castigar y abusar de forma arbitraria de vacas, bueyes y caballos domésticos. Aunque solo cubría ganado de tracción y propiedad ajena, sentó el precedente histórico de la intervención de la ley penal en el trato de animales [2].",
        scientificFacts: [
          "Martin demostró un firme compromiso ético al llevar físicamente a un burro maltratado ante el tribunal de justicia para mostrar al juez sus lesiones físicas evidentes [1].",
          "La ley condujo de inmediato a la fundación de la SPCA (Society for the Prevention of Cruelty to Animals) en 1824, la primera organización de bienestar del mundo [2]."
        ],
        references: [
          {
            id: "1",
            citation: "Martin, R. (1822). Cruel Treatment of Cattle Act. UK Parliament."
          , url: "https://en.wikipedia.org/wiki/Martin%27s_Act"},
          {
            id: "2",
            citation: "Ryder, R. D. (2000). Animal Revolution: Changing Attitudes towards Speciesism. Berg Publishers."
          }
        ],
        relatedNodeId: "legislacion-bienestar"
      },
      {
        id: "informe-brambell-ley",
        year: 1965,
        yearLabel: "1965",
        title: "El Informe Brambell",
        shortDesc: "El origen científico del bienestarismo moderno y la definición de las 'Cinco Libertades'.",
        longDesc: "Tras la alarma social generada por el libro 'Animal Machines' sobre la cría intensiva [1], el gobierno del Reino Unido encarga un comité de investigación científica liderado por el catedrático Rogers Brambell. El documento resultante, publicado en 1965, redefine las obligaciones éticas al acuñar las 'Cinco Libertades' fundacionales del bienestarismo: ausencia de hambre, dolor, miedo, incomodidad física y la libertad de manifestar su conducta natural [2].",
        scientificFacts: [
          "El informe Brambell supuso la primera vez que un gobierno oficialmente reconoció que los animales de granja padecen aburrimiento, frustración y estrés crónico en aislamiento [1].",
          "Estableció que las jaulas de batería de gallinas y los cajones de terneros lactantes eran inaceptables ya que impedían físicamente a los animales darse la vuelta u asearse [2]."
        ],
        references: [
          {
            id: "1",
            citation: "Brambell Committee. (1965). Report of the Technical Committee to Enquire into the Welfare of Animals Kept under Intensive Livestock Husbandry Systems. HM Stationery Office."
          , url: "https://edepot.wur.nl/134379"},
          {
            id: "2",
            citation: "Mellor, D. J. (2016). Moving beyond the Five Freedoms: Positive welfare states. Animals, 6(3), 21.",
            url: "https://doi.org/10.3390/ani6030021"
          }
        ],
        relatedNodeId: "legislacion-bienestar"
      },
      {
        id: "tratado-lisboa",
        year: 2009,
        yearLabel: "2009",
        title: "El Tratado de Lisboa (Unión Europea)",
        shortDesc: "La legislación europea declara formalmente a los animales como 'seres sintientes'.",
        longDesc: "Con la entrada en vigor del Tratado de Lisboa de la Unión Europea el 1 de diciembre de 2009, se añade el histórico **Artículo 13** en el Tratado de Funcionamiento de la UE [1]. Por primera vez en el derecho constitucional multinacional, se decreta que las políticas agrícolas, pesqueras y de transporte deben tener plenamente en cuenta el bienestar de los animales, reconociéndolos expresamente como 'seres sintientes' y no meros objetos agrícolas comerciales [2].",
        scientificFacts: [
          "El Artículo 13 sentó la base jurídica comunitaria para restringir la experimentación cosmética animal y prohibir de forma gradual las jaulas de batería convencionales [1].",
          "A pesar del avance, el Tratado incluíu excepciones para proteger 'ritos religiosos, tradiciones culturales y patrimonios regionales' (como las corridas de toros), reflejando las tensiones de consistencia moral [2]."
        ],
        references: [
          {
            id: "1",
            citation: "European Union. (2007). Treaty of Lisbon Amending the Treaty on European Union. Official Journal of the European Union, C 306.",
            url: "https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:12007L/TXT"
          },
          {
            id: "2",
            citation: "Radford, M. (2001). Animal Welfare Law in Britain: Regulation and Responsibility. Oxford University Press."
          , url: "https://www.google.com/books/edition/Animal_Welfare_Law_in_Britain"}
        ],
        relatedNodeId: "estatus-juridico"
      },
      {
        id: "reforma-codigo-civil-es",
        year: 2021,
        yearLabel: "2021-2023",
        title: "La Reforma del Código Civil en España",
        shortDesc: "Los animales dejan de ser legalmente 'cosas' u 'objetos' en el ordenamiento español.",
        longDesc: "En diciembre de 2021, el Congreso de los Diputados español aprueba la Ley 17/2021, reformando el Código Civil, la Ley Hipotecaria y la Ley de Enjuiciamiento Civil [1]. La norma suprime de raíz el estatus arcaico de los animales como 'bienes semovientes' (cosas u objetos muebles de mercado) para definirlos formalmente como 'seres sintientes dotados de sensibilidad física y psíquica'. Esto prohíbe embargarlos en deudas, abandonarlos en herencias o maltratarlos en rupturas matrimoniales [2].",
        scientificFacts: [
          "La reforma adapta el derecho civil español a las exigencias neurobiológicas, obligando a los jueces a dictaminar custodias de mascotas en función del bienestar psicológico del animal en divorcios [1].",
          "Esta ley precedió a la Ley de Protección de los Derechos y el Bienestar de los Animales aprobada en 2023, la cual amplió drásticamente las sanciones por maltrato y abandono [2]."
        ],
        references: [
          {
            id: "1",
            citation: "Jefatura del Estado. (2021). Ley 17/2021, de 15 de diciembre, de modificación del Código Civil. Boletín Oficial del Estado, 300.",
            url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2021-20727"
          },
          {
            id: "2",
            citation: "Francione, G. L. (1995). Animals, Property, and the Law. Temple University Press."
          , url: "https://www.google.com/books/edition/Animals_Property_and_the_Law"}
        ],
        relatedNodeId: "estatus-juridico"
      },
      {
        id: "end-the-cage-age-initiative",
        year: 2020,
        yearLabel: "2020-Presente",
        title: "La Iniciativa 'End the Cage Age'",
        shortDesc: "Movilización de la ciudadanía europea para prohibir por ley toda cría en jaulas de ganado.",
        longDesc: "La Iniciativa Ciudadana Europea 'End the Cage Age' recoge más de 1,4 millones de firmas verificadas, exigiendo a la Comisión Europea prohibir por completo el confinamiento en jaulas de gallinas ponedoras, cerdas reproductoras, conejos, terneros y codornices en toda la Unión [1]. En 2021, la Comisión se comprometió legislativamente a redactar una propuesta para erradicar las jaulas de forma paulatina, representando un hito de movilización social directa contra las peores prácticas del bienestarismo industrial [2].",
        scientificFacts: [
          "La iniciativa prohíbe el uso de jaulas de parto para cerdas, donde la madre permanece inmovilizada sin poder girarse sobre sí misma durante semanas, provocándole llagas e infecciones por confinamiento [1].",
          "La ciencia del comportamiento animal demuestra que erradicar las jaulas reduce de forma inmediata los indicadores de cortisol y estereotipias anómalas en aves de granja [2]."
        ],
        references: [
          {
            id: "1",
            citation: "European Citizens' Initiative. (2020). End the Cage Age. European Commission Official Registry.",
            url: "https://citizens-initiative.europa.eu/initiatives/details/2018/000004_en"
          },
          {
            id: "2",
            citation: "Grandin, T. (2015). Improving Animal Welfare: A Practical Approach. CABI."
          , url: "https://www.google.com/books/edition/Improving_Animal_Welfare"}
        ],
        relatedNodeId: "legislacion-bienestar"
      }
    ]
  },
  {
    id: "alimentacion",
    title: "Alimentación y Evolución",
    description: "La relación biológica y alimentaria con la carne: del rol metabólico de la grasa y cocinado en la hominización primitiva a la síntesis biotecnológica de vitamina B12 en laboratorios.",
    color: "amber",
    milestones: [
      {
        id: "encefalizacion-pleistoceno",
        year: -2000000,
        yearLabel: "c. 2.000.000 a.C.",
        title: "La Hipótesis del Tejido Costoso",
        shortDesc: "El rol evolutivo de la grasa y carne animal cocinada en la expansión de la capacidad cerebral homínida.",
        longDesc: "Durante el Pleistoceno, los antepasados del Homo sapiens (como el Homo erectus) incorporan a su dieta médula ósea y carne de carroña, ricas en grasas y proteínas densas [1]. El descubrimiento del control del fuego permite cocinar estos alimentos, lo que reduce sustancialmente el coste metabólico de la digestión intestinal. La energía metabólica ahorrada en un tracto digestivo encogido se destina evolutivamente a expandir el cerebro (hipertrofia metabólica) [2].",
        scientificFacts: [
          "La morfología de los homínidos evolucionó hacia un colon corto y un intestino delgado largo, característico de omnívoros adaptados a absorber nutrientes concentrados con poco esfuerzo celular [2].",
          "El consumo de carne fue una inercia adaptativa e indispensable de supervivencia biológica estricta en entornos de glaciaciones y escasez constante de hidratos de carbono vegetales complejos [1]."
        ],
        references: [
          {
            id: "1",
            citation: "Aiello, L. C., & Wheeler, P. (1995). The expensive-tissue hypothesis: the brain and the digestive system in human and primate evolution. Current Anthropology, 36(2), 199-221.",
            url: "https://doi.org/10.1086/204350"
          },
          {
            id: "2",
            citation: "Wrangham, R. (2009). Catching Fire: How Cooking Made Us Human. Basic Books."
          , url: "https://en.wikipedia.org/wiki/Catching_Fire:_How_Cooking_Made_Us_Human"}
        ],
        relatedNodeId: "vias-transicion"
      },
      {
        id: "mutacion-lactasa",
        year: -10000,
        yearLabel: "c. 10.000 a.C.",
        title: "La Mutación de la Persistencia de la Lactasa",
        shortDesc: "La coevolución biológica: la capacidad genética de digerir la leche animal en la adultez humana.",
        longDesc: "Coincidiendo con la domesticación del ganado en el Neolítico, surge en poblaciones de Europa del norte y África oriental una mutación genética extraordinaria: la persistencia de la lactasa [1]. En los mamíferos salvajes, el gen que produce la enzima lactasa se apaga tras el destete. Sin embargo, la dependencia calórica humana de la leche animal generó una fortísima presión selectiva que favoreció a los individuos capaces de digerir lactosa de por vida [2].",
        scientificFacts: [
          "La persistencia de la lactasa es uno de los ejemplos más claros de coevolución gen-cultura en la especie humana reciente [1].",
          "En la actualidad, más del 65% de la población mundial adulta retiene el rasgo silvestre original y es biológicamente intolerante a la lactosa, evidenciando que no es una adaptación universal de la especie [2]."
        ],
        references: [
          {
            id: "1",
            citation: "Simoons, F. J. (1970). Primary adult lactose intolerance and the milking habit: A problem in biologic and cultural evolution. American Journal of Digestive Diseases, 15(8), 695-710.",
            url: "https://doi.org/10.1007/BF02236021"
          },
          {
            id: "2",
            citation: "Gerbault, P., et al. (2011). How evolution shaped the patterns of lactase persistence in humans. Philosophical Transactions of the Royal Society B, 366(1566), 863-877.",
            url: "https://doi.org/10.1098/rstb.2010.0268"
          }
        ],
        relatedNodeId: "vias-transicion"
      },
      {
        id: "watson-veganismo-origen",
        year: 1944,
        yearLabel: "1944",
        title: "La Fundación de la Vegan Society",
        shortDesc: "Donald Watson acuña el término 'veganismo' para proponer una alimentación libre de toda explotación animal.",
        longDesc: "En noviembre de 1944, el carpintero británico Donald Watson y un pequeño grupo de objetores vegetarianos se reúnen en Leicester para fundar la Vegan Society [1]. Deciden acuñar el término 've-gan' (usando las tres primeras y las dos últimas letras de 'vegetarian') para marcar la emancipación moral definitiva de los animales domésticos, eliminando no solo la carne sino también los huevos y la leche, al comprender que la industria láctea está intrínsecamente ligada al matadero [2].",
        scientificFacts: [
          "El término se definió formalmente como la doctrina que sostiene que el ser humano debe vivir sin explotar a los animales, promoviendo alternativas exentas de crueldad [1].",
          "En ese momento histórico, los fundadores carecían de conocimientos científicos sobre la vitamina B12, lo que provocó que los primeros veganos estrictos sufrieran anemia megaloblástica y problemas neurológicos [2]."
        ],
        references: [
          {
            id: "1",
            citation: "Watson, D. (1944). The Vegan News: Quarterley Organ of the Non-Dairy Vegetarians, 1(1)."
          , url: "https://veganhistory.org/2022/03/01/the-vegan-news-1944/"},
          {
            id: "2",
            citation: "Vegan Society. (2020). History of the Vegan Society: Looking back at over 75 years."
          , url: "https://www.vegansociety.com/about-us/history"}
        ],
        relatedNodeId: "vias-transicion"
      },
      {
        id: "sintesis-b12",
        year: 1948,
        yearLabel: "1948",
        title: "El Aislamiento de la Vitamina B12",
        shortDesc: "El hito biotecnológico que rompió el lazo biológico fáctico de la necesidad de comer animales.",
        longDesc: "En 1948, la investigadora Mary Shorb en EE.UU. y Karl Folkers en Merck lograron de forma simultánea aislar la vitamina B12 (cobalamina), el único nutriente esencial indetectable en el reino vegetal [1]. Con la subsiguiente patente de producción industrial por fermentación microbiana de bacterias no animales, el Homo sapiens rompe por primera vez en su historia evolutiva el determinismo biológico: la ingesta de carne ya no es indispensable para evitar el daño neurológico [2].",
        scientificFacts: [
          "La B12 no procede del metabolismo del ganado, sino de bacterias del suelo ingeridas con el agua sucia; debido a la desinfección moderna y pesticidas, al ganado industrial se le suplementa sistemáticamente con B12 microbiana sintética de laboratorio [2].",
          "La síntesis química de B12 permitió la expansión masiva y segura del veganismo y vegetarianismo en el último tercio del siglo XX [1]."
        ],
        references: [
          {
            id: "1",
            citation: "Rickes, E. L., Brink, N. G., Koniuszy, F. R., Wood, T. R., & Folkers, K. (1948). Crystalline vitamin B12. Science, 107(2781), 396-397.",
            url: "https://doi.org/10.1126/science.107.2781.396"
          },
          {
            id: "2",
            citation: "Watanabe, F. (2007). Vitamin B12 sources and bioavailability. Experimental Biology and Medicine, 232(10), 1266-1274.",
            url: "https://doi.org/10.3181/0703-MR-67"
          }
        ],
        relatedNodeId: "vias-transicion"
      },
      {
        id: "consenso-nutricional-and",
        year: 2016,
        yearLabel: "2016",
        title: "La Validación Nutricional Global",
        shortDesc: "La Academia de Nutrición y Dietética ratifica la idoneidad de la dieta vegana bien planificada.",
        longDesc: "En 2016, la Academy of Nutrition and Dietetics de EE.UU. (la organización de nutricionistas y dietistas más grande del mundo) emite su informe de posición oficial actualizado [1]. Ratifica con rotundidad científica que las dietas vegetarianas y veganas adecuadamente planificadas son completamente saludables, nutricionalmente adecuadas y proporcionan beneficios en la prevención y tratamiento de enfermedades crónicas durante todas las etapas de la vida [2].",
        scientificFacts: [
          "El consenso nutricional abarca lactancia, infancia extrema, adolescencia, vejez, embarazo y rendimiento deportivo de élite sin restricciones de aminoácidos [1].",
          "Estudios clínicos confirman que las dietas basadas en plantas directas reducen significativamente el riesgo de diabetes tipo II, cardiopatías isquémicas y tasas globales de cáncer colorrectal [2]."
        ],
        references: [
          {
            id: "1",
            citation: "Melina, V., Craig, W., & Levin, S. (2016). Position of the Academy of Nutrition and Dietetics: Vegetarian Diets. Journal of the Academy of Nutrition and Dietetics, 116(12), 1970-1980.",
            url: "https://doi.org/10.1016/j.jand.2016.09.025"
          },
          {
            id: "2",
            citation: "Springmann, M., et al. (2016). Analysis and valuation of the health and climate change co-benefits of dietary change. Proceedings of the National Academy of Sciences, 113(15), 4146-4151."
          , url: "https://doi.org/10.1073/pnas.1523119113"}
        ],
        relatedNodeId: "vias-transicion"
      }
    ]
  }
];
