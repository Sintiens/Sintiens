import type { DilemmaDetail } from "../types";

export const DILEMMAS_DATA: DilemmaDetail[] = [
  {
    id: "leones-carne",
    category: "sistemas_uso",
    title: "El Argumento de la Cadena Trófica",
    popularStatement: "Los leones comen carne en la naturaleza, por tanto es natural que los seres humanos hagamos lo mismo.",
    consensus: "FALACIA",
    scientificDeconstruction: "Los leones son carnívoros biológicos obligatorios: carecen de las enzimas necesarias para sintetizar nutrientes vitales a partir de plantas [3]. En cambio, el ser humano es un omnívoro flexible dotado de un tracto digestivo capaz de asimilar perfectamente todos los macro y micronutrientes necesarios a partir de fuentes vegetales [1]. Además, los animales salvajes operan por instinto de supervivencia y no generan industrias de cría masiva confinada ni contaminan el planeta.",
    philosophicalDeconstruction: "Apelar a la conducta de un felino salvaje cae directamente en la 'Falacia Naturalista' o ley de Hume: asumir que lo que ocurre en la naturaleza dicta lo que es éticamente correcto [2]. Los leones carecen de discernimiento moral; los humanos somos agentes morales con libre albedrío, conciencia y pleno acceso a alternativas vegetales. Justificar el maltrato animal masivo copiando la conducta de un carnívoro salvaje es una contradicción lógica [1].",
    coexistenceImpact: "Relegar nuestra ética humana moderna a la conducta de un felino salvaje para justificar la ganadería industrial representa una renuncia voluntaria a nuestra racionalidad moral y compasión.",
    citation: "Singer, P. (1975). Animal Liberation (Chapter 6).",
    references: [
      {
        id: "1",
        citation: "Singer, P. (1975). Animal Liberation (Chapter 6). HarperCollins."
      , url: "https://en.wikipedia.org/wiki/Animal_Liberation_(book)"},
      {
        id: "2",
        citation: "Hume, D. (1739). A Treatise of Human Nature (Book III, Part I, Section I)."
      , url: "https://en.wikipedia.org/wiki/A_Treatise_of_Human_Nature"},
      {
        id: "3",
        citation: "National Research Council. (2006). Nutrient Requirements of Dogs and Cats. National Academies Press."
      , url: "https://doi.org/10.17226/10668"}
    ]
  },
  {
    id: "plantas-sienten-dolor",
    category: "sintiencia",
    title: "La Sensibilidad de las Plantas",
    popularStatement: "Las plantas también sienten dolor al ser cosechadas, así que comer lechuga es igual que comer ternera.",
    consensus: "FALACIA",
    scientificDeconstruction: "Las plantas reaccionan mecánicamente a las agresiones físicas liberando gases químicos (etileno fitohormonal) [1]. Sin embargo, carecen por completo de sistema nervioso centralizado, nociceptores y cerebro. Al no tener esta infraestructura fisiológica, sus respuestas son reflejos bioquímicos automáticos que no se traducen en una experiencia emocional subjetiva ni en dolor consciente [2].",
    philosophicalDeconstruction: "Incluso si aceptáramos el absurdo biológico de que las plantas sienten dolor, la ineficiencia termodinámica de la ganadería industrial significa que los animales consumen entre 10 y 16 veces más alimento vegetal para producir un kilo de carne [3]. Por tanto, comer plantas directamente (veganismo) reduce drásticamente el volumen total de vidas vegetales destruidas en más de un 90% [3].",
    coexistenceImpact: "Equiparar la reacción bioquímica de una lechuga con el pánico conscientes y el dolor real de un animal en el matadero es una severa simplificación de la conciencia biológica.",
    citation: "Taiz, L. et al. (2019). Plant sentience: The burden of proof.",
    references: [
      {
        id: "1",
        citation: "Taiz, L., Robinson, D. G., et al. (2019). Plants neither possess nor require consciousness. Trends in Plant Science, 24(8), 677-687.",
        url: "https://doi.org/10.1016/j.tplants.2019.05.010"
      },
      {
        id: "2",
        citation: "Robinson, D. G., et al. (2023). Plant sentience: The burden of proof. Animal Sentience, 8(36), 1-12.",
        url: "https://wellbeingintlstudiesrepository.org/animsent/vol8/iss36/1/"
      },
      {
        id: "3",
        citation: "Poore, J., & Nemecek, T. (2018). Reducing food's environmental impacts. Science, 360(6392)."
      , url: "https://doi.org/10.1126/science.aaq0216"}
    ]
  },
  {
    id: "bivalvos-ostras",
    category: "sintiencia",
    title: "El Dilema de los Bivalvos",
    popularStatement: "¿Es moralmente aceptable consumir bivalvos como mejillones u ostras con total tranquilidad?",
    consensus: "ESCENARIO_GRIS",
    scientificDeconstruction: "Los bivalvos (mejillones, ostras) son moluscos sésiles extremadamente simples. Carecen de cerebro y de un Sistema Nervioso Central (SNC) complejo; solo poseen una red descentralizada de ganglios biológicos sencillos [1]. La ciencia moderna no halla nociceptores activos ni indicadores bioquímicos de sufrimiento conscious [1]. Su cría, además, limpia el agua local y tiene una huella ecológica insignificante.",
    philosophicalDeconstruction: "Este es un debate ético interno en el veganismo. El utilitarismo pragmático sostiene que comer bivalvos es correcto porque no genera sufrimiento consciente y reduce las muertes de insectos colaterales causadas por cosechadoras de cereales agrícolas [1]. El abolicionismo de derechos apela al principio de precaución: ante el menor atisbo de duda sobre su microconciencia, es preferible no mercantilizarlos [2].",
    coexistenceImpact: "Representa un área gris fértil que enseña a modular con humildad la consideración moral según la complejidad neurológica de la vida animal.",
    citation: "Cox, C. (2010). Ethical considerations of bivalve consumption in vegan diets.",
    references: [
      {
        id: "1",
        citation: "Cox, C. (2010). Ethical considerations of bivalve consumption in vegan diets. Journal of Agricultural and Environmental Ethics, 23(4)."
      },
      {
        id: "2",
        citation: "Birch, J. (2017). Animal sentience and the precautionary principle. Animal Sentience, 2(16), 1-16.",
        url: "https://doi.org/10.51291/2377-7478.1200"
      }
    ]
  },
  {
    id: "granja-feliz-ecologia",
    category: "etica",
    title: "Mito de la Granja Feliz",
    popularStatement: "Consumir animales criados en libertad (ganadería ecológica) y sacrificados de forma indolora no tiene nada de malo.",
    consensus: "DILEMA",
    scientificDeconstruction: "Aunque la ganadería ecológica tradicional aporta a los animales una existencia superior al infierno industrial, el sacrificio sistemático ocurre en su juventud temprana (ej. terneros a los 18 meses frente a una longevidad natural de 20 años) [1]. Además, alimentar a los 8.000 millones de humanos con este modelo extensivo exigiría la superficie de tres planetas Tierra adicionales debido a su baja densidad calórica espacial [3].",
    philosophicalDeconstruction: "Este dilema enfrenta al bienestarismo con los derechos de los animales. El bienestarismo argumenta que dotar al animal de una vida agradable genera una suma de utilidad neta positiva [2]. La deontología de derechos (Regan) replica que asesinar a un 'sujeto-de-una-vida' antes de tiempo le priva de experimentar su bienestar futuro, violando su derecho a la vida por un interés gastronómico prescindible [1].",
    coexistenceImpact: "Nos sitúa ante la paradoja ética del sacrificio indoloro: decidir si las vidas animales son meras mercancías intercambiables o seres irremplazables con valor intrínseco.",
    citation: "Regan, T. (1983). The Case for Animal Rights (Chapter 8).",
    references: [
      {
        id: "1",
        citation: "Regan, T. (1983). The Case for Animal Rights (Chapter 8). University of California Press."
      , url: "https://en.wikipedia.org/wiki/The_Case_for_Animal_Rights"},
      {
        id: "2",
        citation: "McMahan, J. (2008). Eating animals the nice way. Daedalus, 137(1), 66-76.",
        url: "https://doi.org/10.1162/daed.2008.137.1.66"
      },
      {
        id: "3",
        citation: "Poore, J., & Nemecek, T. (2018). Reducing food's environmental impacts. Science, 360(6392)."
      , url: "https://doi.org/10.1126/science.aaq0216"}
    ]
  },
  {
    id: "conservacion-dehesas",
    category: "ecologia",
    title: "La Ganadería en Ecosistemas",
    popularStatement: "Si eliminamos el ganado, ecosistemas protegidos como la dehesa ibérica o las praderas de montaña desaparecerían.",
    consensus: "DILEMA",
    scientificDeconstruction: "Ecosistemas modelados por el hombre como las dehesas mediterráneas o praderas alpinas dependen del pastoreo de herbívoros domésticos para limpiar la maleza, abonar el suelo y prevenir incendios [2]. Retirar por completo la ganadería extensiva tradicional de estas zonas degradaría gravemente la biodiversidad local de plantas, insectos y aves que coevolucionaron con este ciclo [2].",
    philosophicalDeconstruction: "Este dilema expone la tensión entre la ética ecocéntrica (el deber de proteger la integridad del ecosistema común) [1] y la ética individualista (los derechos del animal a no ser explotado y sacrificado) [2]. Para el ecosistema, el pastoreo es simbiosis; para el individuo animal, su cría para el matadero representa un uso ilegítimo de su sintiencia [2].",
    coexistenceImpact: "Un espejo incómodo que demuestra que a veces, proteger la salud global de un bioma común requiere evaluar compromisos éticos con los derechos individuales.",
    citation: "Bugalho, M. N. et al. (2011). Mediterranean cork oak savannas (dehesas): Biodiversity and conservation.",
    references: [
      {
        id: "1",
        citation: "Callicott, J. B. (1980). Animal liberation: A triangular affair. Environmental Ethics, 2(4), 311-338.",
        url: "https://doi.org/10.5840/enviroethics19802424"
      },
      {
        id: "2",
        citation: "Bugalho, M. N., Caldeira, M. C., Pereira, J. S., Aronson, J., & Diaz, M. (2011). Mediterranean cork oak savannas (dehesas): Biodiversity and conservation. Frontiers in Ecology and the Environment, 9(5), 278-286.",
        url: "https://doi.org/10.1890/100067"
      }
    ]
  },
  {
    id: "comer-insectos-harinas",
    category: "etica",
    title: "La Apuesta de la Entomofagia",
    popularStatement: "La entomofagia (ingerir grillos o gusanos) es el sustituto ideal de la ganadería barata para proteger el cambio climático.",
    consensus: "ESCENARIO_GRIS",
    scientificDeconstruction: "La producción de harinas de insectos es enormemente más eficiente que la ganadería bovina o porcina, reduciendo un 99% el espacio territorial y emitiendo mínimas trazas de gases de efecto invernadero (GEI) [3]. Sin embargo, la ciencia debate aún la presencia de trazas de sintiencia consciente en artrópodos: aunque muestran aprendizaje complejo, sus sistemas nerviosos descentralizados son en gran parte reflejos [2].",
    philosophicalDeconstruction: "Si el sufrimiento de los insectos es nulo, esta industria representa una vía de transición para erradicar las macrogranjas de vertebrados [3]. Sin embargo, para el veganismo abolicionista, la cría industrial de trillones de insectos hacinados en cajones mecánicos perpetúa el antropocentrismo imperante, tratando a toda vida cerebral como mercancía utilitaria [1, 2].",
    coexistenceImpact: "Un portal híbrido fascinante donde la urgencia de salvar la biosfera del colapso ecológico nos obliga a revaluar la frontera moral de las microconciencias neurales.",
    citation: "Chittka, L. (2022). The Mind of a Bee.",
    references: [
      {
        id: "1",
        citation: "Chittka, L. (2022). The Mind of a Bee. Princeton University Press."
      , url: "https://en.wikipedia.org/wiki/The_Mind_of_a_Bee"},
      {
        id: "2",
        citation: "Gibbons, M., et al. (2022). Can insects feel pain? Advances in Insect Physiology, 63, 155-229."
      },
      {
        id: "3",
        citation: "van Huis, A. (2013). Potential of insects as food and feed in assuring food security. Annual Review of Entomology, 58, 563-583.",
        url: "https://doi.org/10.1146/annurev-ento-120811-150247"
      }
    ]
  },
  {
    id: "caninos-dentadura",
    category: "sistemas_uso",
    title: "La Dentadura y Caninos",
    popularStatement: "Los seres humanos tenemos dientes caninos (colmillos) diseñados para comer carne, lo que demuestra que somos depredadores naturales.",
    consensus: "FALACIA",
    scientificDeconstruction: "Nuestros dientes colmillos son extremadamente pequeños, planos y romos comparados con los de cualquier depredador carnívoro verdadero (como felinos o cánidos). La morfología digestiva humana posee mandíbulas flexibles de masticación lateral, saliva rica en amilasa para digerir almidones y un colon largo adaptado a la fibra vegetal directa [1]. Los dientes caninos no determinan una necesidad biológica de explotar animales [2].",
    philosophicalDeconstruction: "Este argumento confunde la capacidad anatómica con la justificación moral (falacia de apelación a la naturaleza). Aunque tuviéramos colmillos afilados para desgarrar carne cruda, poseemos libre albedrío y alternativas vegetales completas. Apoyarse en la forma de un diente para justificar la reclusión industrial y el sacrificio masivo de seres sintientes es una incoherencia ética obvia [1, 2].",
    coexistenceImpact: "Desmonta el mito anatómico que disfraza a la masticación humana como una garra biológica para legitimar el maltrato animal en el matadero moderno.",
    citation: "Ungar, P. S. (2010). Mammalian Teeth: Origin, Structure, and Function.",
    references: [
      {
        id: "1",
        citation: "Ungar, P. S. (2010). Mammalian Teeth: Origin, Structure, and Function. Johns Hopkins University Press."
      },
      {
        id: "2",
        citation: "Melina, V. et al. (2016). Position of the Academy of Nutrition and Dietetics: Vegetarian Diets."
      , url: "https://doi.org/10.1016/j.jand.2016.09.025"}
    ]
  },
  {
    id: "explotacion-industrial-clima",
    category: "ecologia",
    title: "Explotación Industrial y Clima",
    popularStatement: "La ganadería industrial no es tan responsable del cambio climático; los transportes y la industria pesada contaminan mucho más.",
    consensus: "FALACIA",
    scientificDeconstruction: "La ganadería emite directamente cerca del 14.5% de los gases de efecto invernadero (GEI) antropogénicos globales [1]. Aunque la quema de combustibles fósiles en el transporte aporta una inmensa huella de carbono, el ganado rumiante libera metano (CH4), un gas con un potencial de calentamiento global a corto plazo enormemente superior al CO2 y que destruye los sumideros de selva tropical colaterales [2, 3].",
    philosophicalDeconstruction: "Intentar minimizar el impacto climático de nuestra dieta escudándose en otros sectores contaminantes es un desvío de la consistencia moral. El consumidor medio no puede rediseñar de inmediato la red de vuelos mundiales, pero puede modificar drásticamente su huella de carbono diaria de manera autónoma simplemente retirando la carne de su plato [1].",
    coexistenceImpact: "Pone en jaque las excusas colectivas que postergan las soluciones éticas sobre la biosfera alegando que otras industrias pesadas contaminan más.",
    citation: "Gerber, P. J. et al. (2013). Tackling climate change through livestock.",
    references: [
      {
        id: "1",
        citation: "Gerber, P. J., et al. (2013). Tackling climate change through livestock: a global assessment of emissions and mitigation opportunities. FAO."
      , url: "https://www.fao.org/3/i3437e/i3437e.pdf"},
      {
        id: "2",
        citation: "IPCC. (2019). Special Report on Climate Change and Land."
      , url: "https://www.ipcc.ch/srccl/"},
      {
        id: "3",
        citation: "Springmann, M. et al. (2016). Analysis and valuation of the health and climate change co-benefits of dietary change. PNAS."
      , url: "https://doi.org/10.1073/pnas.1523119113"}
    ]
  },
  {
    id: "el-argumento-del-antropocentrismo-cartesiano",
    category: "sintiencia",
    title: "El Autómata Cartesiano",
    popularStatement: "Los animales no tienen alma ni conciencia reflexiva humana, por tanto sus chillidos son meras reacciones mecánicas.",
    consensus: "FALACIA",
    scientificDeconstruction: "René Descartes argumentaba en 1637 que los animales eran autómatas biológicos desprovistos de dolor consciente [1]. La neurobiología evolutiva moderna desmiente radicalmente este dualismo: todos los vertebrados poseen un tronco encefálico homólogo al humano y neurotransmisores idénticos (como las endorfinas y el cortisol) para procesar el dolor emocional y el miedo de forma consciente [2]. La Declaración de Cambridge sobre la Conciencia certifica científicamente esta realidad [2].",
    philosophicalDeconstruction: "Esta perspectiva cartesiana actuó como una 'inmunización moral' para justificar abusos salvajes y vivisecciones históricas. La consistencia ética secular dicta que para merecer consideración moral no se requiere la capacidad de hablar o resolver ecuaciones abstractas, sino el estatus biológico de la sintiencia: la capacidad de sufrir de forma consciente [1, 2].",
    coexistenceImpact: "Erradica el negacionismo intelectual que trata al maltrato animal como un simple crujido de engranajes para ignorar el pánico y el dolor subjetivo en el cautiverio.",
    citation: "Descartes, R. (1637). Discurso del método.",
    references: [
      {
        id: "1",
        citation: "Descartes, R. (1637). Discurso del método (Parte V)."
      , url: "https://es.wikipedia.org/wiki/Discurso_del_m%C3%A9todo"},
      {
        id: "2",
        citation: "Low, P., Panksepp, J. et al. (2012). The Cambridge Declaration on Consciousness."
      , url: "https://fcmconference.org/img/CambridgeDeclarationOnConsciousness.pdf"}
    ]
  },
  {
    id: "el-argumento-del-contrato-social",
    category: "etica",
    title: "El Límite del Contrato Social",
    popularStatement: "Los animales no pueden firmar contratos sociales ni respetar nuestros deberes morales, por tanto no tenemos obligaciones éticas hacia ellos.",
    consensus: "FALACIA",
    scientificDeconstruction: "Los animales salvajes y domésticos demuestran conductas cooperativas complejas, altruismo recíproco y códigos sociales internos [1]. Sin embargo, el argumento de que un ser carece de derechos morales por no poder formular deberes abstractos es fisiológicamente inconsistente con nuestras propias leyes: los bebés, personas con discapacidades cognitivas severas o ancianos con demencia avanzada tampoco pueden firmar un contrato, y les garantizamos plenos derechos inalienables [2].",
    philosophicalDeconstruction: "Confunde los agentes morales (seres capaces de reflexionar y asumir deberes) con los pacientes morales (seres dignos de protección legal). El límite ético para no torturar o esclavizar a un ser vivo no es su capacidad intelectual de firmar acuerdos, sino su vulnerabilidad al dolor [1]. Excluir a los animales basándose en el contrato social es una distorsión del concepto de justicia [2].",
    coexistenceImpact: "Establece que una sociedad moralmente avanzada debe proteger a los seres más vulnerables por su propia capacidad de sufrir, y no basándose en pactos racionales recíprocos.",
    citation: "Nussbaum, M. C. (2006). Frontiers of Justice.",
    references: [
      {
        id: "1",
        citation: "Nussbaum, M. C. (2006). Frontiers of Justice: Species Membership. Harvard University Press."
      , url: "https://en.wikipedia.org/wiki/Frontiers_of_Justice"},
      {
        id: "2",
        citation: "Regan, T. (1983). The Case for Animal Rights. University of California Press."
      , url: "https://en.wikipedia.org/wiki/The_Case_for_Animal_Rights"}
    ]
  },
  {
    id: "el-mito-de-la-carne-humanitaria",
    category: "etica",
    title: "El Mito de la Carne Humanitaria",
    popularStatement: "Si compramos carne ecológica de granjas de pastoreo donde se sacrifican 'humanitariamente', no financiamos el maltrato animal.",
    consensus: "DILEMA",
    scientificDeconstruction: "Aunque estas granjas otorgan a los animales una existencia mejor que las macrogranjas intensivas, el sacrificio sistemático se ejecuta a una edad extremadamente temprana y bajo los mismos métodos de aturdimiento y degüello del matadero general [2]. Adicionalmente, el forrajeo de baja densidad ecológica exige un espacio de tierra tan elevado que resulta termodinámicamente inviable para alimentar a la población mundial [3].",
    philosophicalDeconstruction: "El concepto de 'matar humanitariamente' es una contradicción en los términos (oxímoron). Si un animal es un 'sujeto-de-una-vida' con valor intrínseco, arrebatarle su vida de forma prematura para satisfacer un fin gastronómico redundante viola sus derechos fundamentales de justicia, sin importar cuán agradable haya sido su cautiverio previo [1, 2].",
    coexistenceImpact: "Deconstruye la disonancia cognitiva y la anestesia social del consumidor que utiliza sellos de 'bienestar animal' para eludir su dilema moral en el supermercado.",
    citation: "Regan, T. (1983). The Case for Animal Rights.",
    references: [
      {
        id: "1",
        citation: "Regan, T. (1983). The Case for Animal Rights. University of California Press."
      , url: "https://en.wikipedia.org/wiki/The_Case_for_Animal_Rights"},
      {
        id: "2",
        citation: "McMahan, J. (2008). Eating animals the nice way. Daedalus, 137(1)."
      , url: "https://doi.org/10.1162/daed.2008.137.1.66"},
      {
        id: "3",
        citation: "Poore, J. & Nemecek, T. (2018). Reducing food's environmental impacts."
      , url: "https://doi.org/10.1126/science.aaq0216"}
    ]
  },
  {
    id: "la-prioridad-humanitaria",
    category: "etica",
    title: "La Prioridad Humanitaria",
    popularStatement: "Debemos concentrar todos nuestros recursos en solucionar el hambre y la pobreza humana antes de preocuparnos por los animales.",
    consensus: "FALACIA",
    scientificDeconstruction: "La ganadería industrial e intensiva consume anualmente miles de millones de toneladas de soja y cereales que podrían alimentar directamente a toda la población mundial de forma directa y eficiente [3]. La ineficiencia termodinámica del filtrado calórico a través del ganado acapara el 80% del suelo agrícola global, agravando de forma directa la escasez mundial de recursos agrarios [2, 3].",
    philosophicalDeconstruction: "Este argumento cae en la falacia del falso dilema. El veganismo y los derechos de los animales no son una causa que reste recursos a los humanos: es un cese pasivo de la financiación de la violencia industrial. Dejar de consumir carne no impide luchar contra el hambre humana; de hecho, libera inmensos recursos de tierras y agua en favor de los países del tercer mundo [1, 2].",
    coexistenceImpact: "Desarticula la excusa colectiva de que el respeto por las vidas animales compite con la justicia humana, mostrando que ambos círculos de compasión se refuerzan mutuamente.",
    citation: "Adams, C. J. (1990). The Sexual Politics of Meat.",
    references: [
      {
        id: "1",
        citation: "Adams, C. J. (1990). The Sexual Politics of Meat. Continuum."
      , url: "https://en.wikipedia.org/wiki/The_Sexual_Politics_of_Meat"},
      {
        id: "2",
        citation: "Singer, P. (1975). Animal Liberation. HarperCollins."
      , url: "https://en.wikipedia.org/wiki/Animal_Liberation_(book)"},
      {
        id: "3",
        citation: "Springmann, M. et al. (2016). Analysis and valuation of the health and climate change co-benefits of dietary change. PNAS.",
        url: "https://doi.org/10.1073/pnas.1523119113"
      }
    ]
  },

  // ─── BLOQUE A: 7 TESIS DE EXPANSIÓN v1 ───
  {
    id: "lo-natural-no-es-moral",
    category: "etica",
    title: "Lo natural no es intrínsecamente moral",
    popularStatement: "«Si es natural, no le hace daño al cuerpo; la carne es parte de nuestra naturaleza»",
    consensus: "FALACIA",
    scientificDeconstruction: "Definir «bueno» como lo que existe en la naturaleza incurre en la falacia naturalista. George Edward Moore señaló que confundir «lo que es» (propiedades naturales) con «lo que debería ser» (valor moral) es falaz [1]. La biología muestra que muchos animales —incluidos herbívoros— consumen carne por conveniencia evolutiva, no por mérito ético. Prácticas «naturales» como el infanticidio en algunas especies o la agresión intraespecífica causan sufrimiento, lo cual no se justifica moralmente. La filosofía de la biología coincide: apelar a la naturaleza carece de rigor como criterio ético; la evolución describe comportamientos, no prescribe normas [2].",
    philosophicalDeconstruction: "El argumento «lo natural es bueno» ignora distinciones metaéticas clave. Moore argumentó que atribuir bondad a lo natural confunde lo descriptivo con lo normativo. Aunque ciertos animales cazan (lo «natural»), esto no convierte en moralmente correcto causar sufrimiento para el placer humano. Filósofos contemporáneos (Singer, Regan) enfatizan que la ética requiere justificaciones independientes de la biología: la mera pertenencia a un proceso evolutivo no confiere deber moral alguno. Es un error lógico asumir que el universo natural opera conforme a principios morales; la moralidad exige argumentos éticos, no meras observaciones naturales [1, 2].",
    coexistenceImpact: "Asumir erróneamente que «lo natural» es justo impide reconocer injusticias en prácticas alimentarias. Usar animales porque somos «omnívoros naturales» distrae del sufrimiento real. ¿Por qué otorgar valor moral a una característica evolutiva arbitraria? ¿Realmente la naturaleza decide qué está bien o mal en la alimentación humana?",
    references: [
      { id: "1", citation: "Moore, G. E. (1903). Principia Ethica. Cambridge University Press." , url: "https://en.wikipedia.org/wiki/Principia_Ethica"},
      { id: "2", citation: "Singer, P. (2011). Practical Ethics (3rd ed.). Cambridge University Press." , url: "https://en.wikipedia.org/wiki/Practical_Ethics"}
    ],
    openQuestion: "¿Puede algo ser moral solo porque existe en la naturaleza? ¿Deberíamos derivar normas éticas directamente de la observación natural?"
  },
  {
    id: "tradicion-no-hace-correcto",
    category: "etica",
    title: "La tradición no justifica el sufrimiento animal",
    popularStatement: "«Lo hemos hecho siempre así, por tradición. ¿Por qué cambiarlo?»",
    consensus: "FALACIA",
    scientificDeconstruction: "Apelar a la tradición (falacia ad antiquitatem) sostiene que algo es bueno solo por ser histórico. La antropología moral muestra que muchas costumbres pasadas (sacrificios humanos, esclavitud) se juzgaron éticamente inaceptables pese a su arraigo cultural [1]. En el caso de la tauromaquia, análisis etológicos documentan que el toro sufre inmenso dolor físico y estrés psicológico durante la corrida. La bioética actual concluye que el valor de una costumbre debe evaluarse a la luz de evidencia empírica y principios universales, no asumirse intocable por su antigüedad [2].",
    philosophicalDeconstruction: "Filósofos políticos como Rawls y Sen remarcan que no toda tradición es éticamente legítima. El argumento «siempre fue así» se opone al principio de justicia: solo ritos que respetan derechos fundamentales pueden sobrevivir a la crítica ética. Singer argumentaría que la tradición no puede sobreponerse al principio de reducir sufrimiento si existen alternativas morales viables. Frente a la falacia tradicional, debe aplicarse reflexión crítica: la existencia de una práctica no prueba que sea valiosa moralmente [1, 2].",
    coexistenceImpact: "La insistencia en «mantener tradiciones» choca con los avances éticos (leyes antibullfighting, vetos internacionales). Si algo causa dolor evidente, ¿sigue justificado por su antigüedad? ¿Cómo equilibrar el respeto cultural con la evidencia científica de daño?",
    references: [
      { id: "1", citation: "Sen, A. (2006). Identity and Violence. W. W. Norton & Company." , url: "https://en.wikipedia.org/wiki/Identity_and_Violence"},
      { id: "2", citation: "Mariscal-Lucero, S. et al. (2020). Cognitive and emotional indicators of pain in bulls during bullfighting. Animals, 10(11), 2118." , url: "https://doi.org/10.3390/ani10112118"}
    ],
    openQuestion: "¿Debe la tradición justificar prácticas que hoy sabemos causan sufrimiento? ¿Cómo reconciliamos respeto cultural con el principio de no causar daño?"
  },
  {
    id: "bienestarismo-como-abolicionismo-fracaso",
    category: "etica",
    title: "¿Reformar la ganadería o abolirla?",
    popularStatement: "«Podemos mejorar poco a poco el bienestar animal en granjas intensivas; no hace falta prohibir la carne de golpe»",
    consensus: "DILEMA",
    scientificDeconstruction: "Este dilema contrapone bienestarismo (mejoras graduales) frente a abolicionismo (fin total del uso animal). Los informes FAO muestran que la producción ganadera intensiva sigue creciendo y contribuye significativamente al cambio climático (≈15% de GEI globales) [1]. Sin embargo, mejoras en condiciones (enriquecimiento ambiental, menor hacinamiento) reducen lesiones y estrés crónico. Singer (welfarista) reconoce que todo cambio gradual cuenta, mientras que Francione (abolicionista) insiste en que el uso sigue siendo inmoral. Los datos de bienestar animal sugieren que los sistemas reformados atenúan el daño, pero no logran la meta de sufrimiento cero, manteniendo vivo el debate real entre ambos valores [2].",
    philosophicalDeconstruction: "Filosóficamente, el dilema refleja una tensión entre utilitarismo pragmático y principios de derechos. El bienestarismo se asocia al consecuencialismo: si se reduce sufrimiento agregado, el uso podría ser éticamente tolerable. El abolicionismo parte de derechos inalienables (Kantiano) que prohibirían tratar animales como medios, sin importar los resultados. Autores como Regan y Francione sostienen que cualquier concesión al uso animal implica seguir violando deberes éticos fundamentales. ¿Es más grave causar sufrimiento evitable (abolición), o es preferible disminuirlo gradualmente (bienestarismo)? La filosofía contemporánea no resuelve el dilema [1, 2].",
    coexistenceImpact: "El dilema lleva a la sociedad a preguntarse si podemos coexistir con prácticas que optimizan bienestar sin eliminarlas. Influye en políticas agropecuarias y dietas. ¿Aceptamos sacrificios éticos parciales para avances graduales, o apostamos por la transformación radical aunque sea socialmente difícil?",
    references: [
      { id: "1", citation: "FAO. (2013). Tackling climate change through livestock. Food and Agriculture Organization." , url: "https://www.fao.org/3/i3437e/i3437e.pdf"},
      { id: "2", citation: "Francione, G. L. (1996). Rain Without Thunder. Temple University Press." , url: "https://www.google.com/books/edition/Rain_Without_Thunder"}
    ],
    openQuestion: "¿Debe nuestra ética animal priorizar la reducción gradual del daño o la erradicación completa del uso animal?"
  },
  {
    id: "sintiencia-insectos-granjas",
    category: "sintiencia",
    title: "¿Sienten algo los insectos criados en granjas?",
    popularStatement: "«Un grillo no es como una vaca; podemos criarlos en masa sin problema»",
    consensus: "ESCENARIO_GRIS",
    scientificDeconstruction: "La sintiencia en invertebrados es incierta. Aunque decápodos (cangrejos, langostas) y cefalópodos (pulpos) han sido reconocidos como sintientes por la Declaración de Nueva York (2024), faltan pruebas concluyentes en insectos de granja [1]. Los estudios muestran que muchos insectos tienen nociceptores y comportamientos complejos, pero no se ha demostrado que tengan experiencias subjetivas comparables a mamíferos. Dada la escala de insectos criados (billones anuales) y la falta de investigación directa, expertos como Jonathan Birch abogan por el principio de precaución: asumir sintiencia potencial hasta que se demuestre lo contrario [2]. La ciencia no ha resuelto este límite; los bioeticistas concluyen que es un escenario gris.",
    philosophicalDeconstruction: "Este caso cuestiona dónde trazamos la línea moral de la sintiencia. Algunos utilitaristas podrían restar importancia al sufrimiento de insectos por su bajo desarrollo neural; otros lo ven bajo el principio de igualdad para cualquier ser capaz de sufrir en cualquier grado. Birch plantea que, en caso de duda, debemos priorizar la prevención de sufrimiento potencial [2]. Así, la coexistencia con insectos de granja entra en una zona gris de ética práctica: aun asumiendo que quizá no «sienten» igual, el hecho de tratarlos masivamente despierta el dilema de si deberíamos extenderles alguna consideración mínima.",
    coexistenceImpact: "Refleja el dilema sobre prácticas emergentes como la entomofagia masiva. ¿Debemos aplicar normativas de bienestar a insectos? Dado lo incierto, ¿cómo convivir con la duda científica? Esto exige revaluar normas alimentarias según nuevos hallazgos. ¿Tratamos a los insectos como simples recursos o planteamos límites prudentes mientras la ciencia avanza?",
    references: [
      { id: "1", citation: "Andrews, K. et al. (2024). The New York Declaration on Animal Consciousness." , url: "https://nyudeclaration.org/"},
      { id: "2", citation: "Birch, J. (2017). Animal sentience and the precautionary principle. Animal Sentience, 2(16)." , url: "https://doi.org/10.51291/2377-7478.1016"}
    ],
    openQuestion: "¿En la duda, deberíamos asumir que los insectos pueden sufrir y actuar en consecuencia? ¿Qué norma ética aplicar mientras la ciencia avanza?"
  },
  {
    id: "consenso-sintiencia-animal",
    category: "sintiencia",
    title: "Los animales sienten (consenso científico)",
    popularStatement: "«El consenso científico dice que muchos animales sienten dolor y emociones»",
    consensus: "CONSENSO",
    scientificDeconstruction: "La Declaración de Cambridge sobre la Conciencia (2012), reunida por expertos en neurociencia, concluyó que los humanos no son únicos en poseer los sustratos neuronales de la consciencia: mamíferos, aves y cefalópodos comparten circuitos cerebrales similares implicados en experiencias subjetivas [1]. Pronunciamientos posteriores (Declaración de Nueva York 2024, Declaración de Montreal 2022) confirman y amplían este consenso basándose en evidencia etológica y neurológica [2, 3]. Varios gobiernos (Reino Unido, Nueva Zelanda) han reconocido legalmente la sintiencia de crustáceos y cefalópodos. La idea de que los animales sienten ha pasado a ser un consenso científico establecido; la bibliografía actual lo da por sentado.",
    philosophicalDeconstruction: "Desde la filosofía de la ciencia, las declaraciones formales representan un amplio acuerdo epistemológico: ciertos animales son sintientes. Este consenso supera la mera opinión pública: expertos en neuroética recomiendan tratarlos con consideración moral. Éticamente, si el conocimiento científico es sólido, el imperativo moral es actuar en consecuencia (principio de precaución respaldado por evidencia). En la Declaración de Montreal, los intereses de evitar el dolor animal se equiparan a principios de justicia. Esta tesis afirma que existen «hechos bioéticos» resueltos, reflejando la corriente dominante en la comunidad científica y filosófica actual [1, 2, 3].",
    coexistenceImpact: "El reconocimiento casi unánime de la sintiencia animal ya influye en políticas (leyes de bienestar, restricción de prácticas crueles). Si muchos animales son sintientes como afirma la ciencia, ¿debemos revisar conductas cotidianas (alimentación, vestimenta, entretenimiento)? ¿Estamos preparados para integrar este consenso en nuestra convivencia diaria?",
    references: [
      { id: "1", citation: "Low, P. et al. (2012). The Cambridge Declaration on Consciousness." , url: "https://fcmconference.org/img/CambridgeDeclarationOnConsciousness.pdf"},
      { id: "2", citation: "Andrews, K. et al. (2024). The New York Declaration on Animal Consciousness." , url: "https://nyudeclaration.org/"},
      { id: "3", citation: "Declaration of Montreal on Animal Exploitation. (2022)." }
    ],
    openQuestion: "¿Cómo deberíamos cambiar prácticas humanas a la luz de este consenso científico sobre la conciencia animal?"
  },
  {
    id: "consenso-b12-suplementacion",
    category: "ecologia",
    title: "La viabilidad nutricional vegana (consenso B12)",
    popularStatement: "«Me preocupa la B12. ¿Cómo comeré bien sin suplementos?»",
    consensus: "CONSENSO",
    scientificDeconstruction: "Existe consenso nutricional de que la vitamina B12 (esencial para humanos) solo se obtiene de síntesis microbiana. Sin embargo, la suplementación y los alimentos fortificados han resuelto esta carencia para dietas vegetales. Guías de la Academy of Nutrition and Dietetics y de la Vegan Society avalan que consumir alimentos enriquecidos con B12 previene la deficiencia sin necesidad de productos animales [1]. El cuerpo la utiliza igual, independientemente de su origen, y los suplementos sintéticos son seguros y efectivos. Así se ha alcanzado un consenso: una dieta vegana bien planificada con B12 suplementada es nutricionalmente completa [2].",
    philosophicalDeconstruction: "Este consenso refleja un acuerdo científico-farmacológico: la B12 no es intrínseca de plantas, pero sí producible por bacterias cultivadas industrialmente. Éticamente, si la salud humana puede preservarse sin sacrificar animales (mediante suplementos económicos), el fundamento práctico de muchas objeciones dietéticas desaparece. Cierra el dilema moral sobre si abstenerse de carne se «paga» con riesgo sanitario: la respuesta objetiva es no, gracias al consenso nutricional y biotecnológico [1, 2].",
    coexistenceImpact: "Apoya que la elección vegana es compatible con la salud. Impulsa cambios sociales: más productos fortificados, políticas de nutrición pública, reducción del estigma ético por «deficiencia de B12». ¿Qué otros mitos dietéticos necesitan claridad científica? ¿Puede la gente confiar plenamente en que el consenso nutricional admite estilos de vida sin consumo animal?",
    references: [
      { id: "1", citation: "Melina, V. et al. (2016). Position of the Academy of Nutrition and Dietetics: Vegetarian Diets. Journal of the Academy of Nutrition and Dietetics, 116(12), 1970-1980." , url: "https://doi.org/10.1016/j.jand.2016.09.025"},
      { id: "2", citation: "Rizzo, G. et al. (2023). Vitamin B12 in vegan diets. Critical Reviews in Food Science and Nutrition, 63(29), 9805-9816." }
    ],
    openQuestion: "Dado este consenso nutricional, ¿qué otras creencias sobre dietas requieren revisarse éticamente?"
  },
  {
    id: "consenso-ineficiencia-energetica",
    category: "ecologia",
    title: "La ineficiencia energética de producir carne",
    popularStatement: "«No hay otra forma de alimentar al mundo excepto con carne»",
    consensus: "CONSENSO",
    scientificDeconstruction: "Está ampliamente aceptado que la conversión de alimento vegetal a carne es altamente ineficiente. Obtener 1 kg de carne vacuna requiere ≈10 kg de alimento vegetal y agua agrícola. Estudios de Our World in Data indican que el ganado vacuno convierte en carne menos del 10% de la energía del pienso. Además, la ganadería produce ≈14.5% de los gases invernadero antropogénicos [1, 2]. Estos hechos termodinámicos son citados por la mayoría de organismos científicos como argumento a favor de dietas basadas en plantas. La evidencia empírica del balance tierra-calorías concluye de forma contundente que la producción ganadera es sustancialmente menos eficiente que la agricultura directa, un punto en el que hay consenso científico amplio.",
    philosophicalDeconstruction: "Este consenso termodinámico resuena con argumentos éticos utilitaristas sobre recursos limitados: si la tierra disponible puede alimentar a más humanos con dietas vegetales, perseguir una vía menos eficiente puede verse como desperdicio de bienes globales (justicia distributiva). Filósofos ambientales señalan que reducir la ineficiencia alimentaria es un deber moral hacia la sostenibilidad. Al reconocer el consenso científico, el dilema moral básico sobre cómo usar el planeta recibe respuesta: la ciencia abrumadora indica que priorizar cultivos directos favorece el bienestar colectivo [1, 2].",
    coexistenceImpact: "Refuerza políticas públicas de fomento de dietas vegetales. Cierra argumentos de que «necesitamos más ganado». Para la convivencia social, ¿estamos dispuestos a cambiar la producción alimentaria por razones de eficiencia? ¿Sería éticamente inconsistente ignorar pruebas científicas que muestran que podemos alimentar mejor al mundo con recursos más directamente?",
    references: [
      { id: "1", citation: "Poore, J. & Nemecek, T. (2018). Reducing food's environmental impacts through producers and consumers. Science, 360(6392), 987-992." , url: "https://doi.org/10.1126/science.aaq0216"},
      { id: "2", citation: "Ritchie, H. (2020). Food production is responsible for one-quarter of the world's greenhouse gas emissions. Our World in Data." , url: "https://ourworldindata.org/food-emissions"}
    ],
    openQuestion: "¿Estamos dispuestos a reorientar la producción alimentaria global basándonos en este consenso termodinámico?"
  },

  // ─── BLOQUE B: 12 TESIS DE EXPANSIÓN v2 (prefijo r2-) ───
  {
    id: "r2-mascotas-carnivoras",
    category: "sistemas_uso",
    title: "Alimentación de mascotas carnívoras con piensos cárnicos industriales",
    popularStatement: "«Los perros y gatos son carnívoros por naturaleza; ¡hay que darles carne de verdad!»",
    consensus: "DILEMA",
    scientificDeconstruction: "La alimentación de perros y gatos plantea dudas médicas y ecológicas. Desde el punto de vista nutricional, los gatos son carnívoros estrictos y requieren nutrientes como la taurina, presente sólo en la carne, para evitar cardiopatías y problemas retinianos. Aunque algunos estudios señalan que dietas veganas bien formuladas pueden mantener la salud de perros y gatos con suplementos adecuados, la evidencia mayoritariamente subraya que la dieta carnívora cubre naturalmente esas necesidades específicas. Adicionalmente, el impacto ambiental de alimentar mascotas con proteína animal es considerable: Nicholles y Knight (2025) estiman que dietas veganas para mascotas podrían reducir hasta 96% el uso de tierra y otros recursos en comparación con dietas tradicionales de carne. Así, desde el enfoque científico, se enfrentan la necesidad biológica de cada especie con los efectos globales de la producción de carne para mascotas.",
    philosophicalDeconstruction: "Ético y filosóficamente, el debate se centra en priorizar el bienestar individual de cada animal versus el bien común ambiental. Desde una perspectiva deontológica, la obligación de cuidar a las mascotas implica respetar sus necesidades naturales: forzarlas a dietas ajenas a su biología podría verse como una negligencia de su bienestar intrínseco. Por otro lado, un enfoque utilitarista extiende la consideración a los efectos colaterales: si la crianza industrial de carne causa sufrimiento masivo, reducir el consumo de carne (incluso para mascotas) podría incrementaría el bienestar global. Estos argumentos resaltan un conflicto: ¿debemos adaptar nuestras prácticas por respeto al sufrimiento animal a gran escala, o priorizar las preferencias naturales de cada animal? En cualquier caso, la discusión también cuestiona la instrumentalización de las mascotas para fines humanos: ¿un alimento óptimo para el animal o un subproducto de la industria? La literatura señala que, con la formulación correcta, las dietas alternativas pueden ser nutricionalmente adecuadas, pero queda el interrogante moral de si imponer dichas dietas respeta la identidad carnívora de los animales.",
    coexistenceImpact: "Para lograr coexistir, la pregunta final es cómo armonizar el vínculo humano-mascota con un compromiso ético más amplio. Una opción pragmática ha sido mejorar los procesos de producción de piensos (p. ej. usando subproductos animales o tecnologías más limpias) o desarrollar dietas vegetales balanceadas que no comprometan la salud de los animales. De fondo, el dilema invita a reflexionar si conviene incentivar a los propietarios a asumir un rol ético expandido, buscando alimentos para mascotas que minimicen el sufrimiento y el impacto ecológico. ¿Debería nuestra responsabilidad hacia los animales incluir la reevaluación de lo que les damos de comer, incluso cuando esto contradice su dieta natural?",
    references: [
      { id: "1", citation: "European Pet Food Federation. (2023). Are vegetarian diets for cats and dogs safe? FEDIAF.", url: "https://europeanpetfood.org/pet-food-facts/fact-sheets/nutrition/vegetarian-diets/" },
      { id: "2", citation: "Nicholles, B. N., & Knight, A. K. (2025). The environmental sustainability of meat-based versus vegan pet food. Frontiers in Sustainable Food Systems, 9, 1569372.", url: "https://doi.org/10.3389/fsufs.2025.1569372" }
    ],
    openQuestion: "¿Debe adaptarse la dieta de las mascotas a imperativos éticos y ambientales más amplios, aun comprometiendo sus preferencias naturales?"
  },
  {
    id: "r2-ecologismo-animalismo",
    category: "ecologia",
    title: "Ecologismo vs. animalismo: ¿prioridad de la especie o del individuo?",
    popularStatement: "«Si para salvar el ecosistema hay que sacrificar unos pocos animales, entonces habremos hecho lo correcto»",
    consensus: "DILEMA",
    scientificDeconstruction: "Las estrategias de conservación a menudo enfrentan el dilema de sacrificar individuos para proteger especies. Ejemplo: en Nueva Zelanda se cazan plagas introducidas (zarigüeyas, comadrejas) para salvar aves autóctonas, acción que la mayoría acepta al no haber opción evidente mejor. La ecología demuestra que especies invasoras o poblaciones fuera de control pueden extinguir otras (p.ej. ratas en islas, peste porcina africana en cerdos). La ciencia no da criterios absolutos, pero estudios como Gamborg et al. (2012) muestran cómo distintas perspectivas analizan el trade-off: los utilitaristas podrían justificar el sacrificio de algunos animales para reducir sufrimiento global, mientras que otros enfoques destacan los riesgos de interferir con poblaciones naturales.",
    philosophicalDeconstruction: "Desde el punto de vista ético, el animalismo defiende que cada individuo sintiente tiene valor propio, por lo que matarlo para beneficio de otros es moralmente problemático. En contraposición, la visión ecocéntrica (o de conservación) atribuye un valor intrínseco a ecosistemas y especies completas; en ese marco, eliminar invasoras o controlar sobrepoblaciones se considera justificable para proteger el bioma. Gamborg et al. observan que estos conflictos se abordan según la escuela filosófica: p.ej. los defensores de los derechos animales sostienen que no debemos matar (ni detener selectivamente) animales inocentes, mientras que enfoques de 'respeto a la naturaleza' permitirían eliminar especies exóticas que amenazan la estabilidad. Los filósofos de Animal Ethics argumentan que centrar el valor moral en especies (entidades abstractas) en lugar de individuos es falaz: 'una especie es una entidad abstracta que no puede sentir', y, por tanto, no hay justificación intrínseca para sacrificar seres sintientes por una presunta causa mayor (especialmente si existen métodos alternativos).",
    coexistenceImpact: "En términos de convivencia, el debate plantea si es posible diseñar estrategias de conservación que no sacrifiquen vidas individuales. Por ejemplo, se proponen métodos no letales (como anticoncepción de animales salvajes o control de plagas mediante barreras físicas) siempre que sea viable. El dilema invita a reflexionar: ¿hasta qué punto una sociedad que valora a todos los seres sintientes puede emplear la fuerza letal contra parte de ellos? En última instancia, la pregunta es si la ética de conservación debe evolucionar hacia enfoques más inclusivos que consideren simultáneamente a los ecosistemas y a cada ser sensible.",
    references: [
      { id: "1", citation: "Gamborg, C., Palmer, C., & Sandoe, P. (2012). Ethics of Wildlife Management and Conservation: What Should We Try to Protect? Nature Education Knowledge, 3(10):8.", url: "https://www.nature.com/scitable/knowledge/library/ethics-of-wildlife-management-and-conservation-what-80060473/" },
      { id: "2", citation: "Parke, E. C., & Russell, J. C. (2018). Ethical responsibilities in invasion biology. The Ecological Citizen, 2(1), 17-19."}
    ],
    openQuestion: "¿Debe la conservación reconsiderar sus objetivos para incluir de manera equitativa el bienestar de cada individuo sintiente junto a la protección de especies enteras?"
  },
  {
    id: "r2-tauromaquia-patrimonio",
    category: "sistemas_uso",
    title: "Tauromaquia: ¿patrimonio cultural o exhibición de crueldad?",
    popularStatement: "«La tauromaquia es arte y tradición nacional, no es un maltrato animal»",
    consensus: "DILEMA",
    scientificDeconstruction: "Las corridas de toros son controvertidas en cuanto al bienestar animal. Encuestas recientes en Perú indican que más del 68% reconoce que los toros sufren durante las corridas y un 69% opina que se vulneran sus derechos. Fisiológicamente, los toros son sometidos a estrés extremo: pueden resultar heridos gravemente, agitados por las banderillas y el esfuerzo, y sufren lesiones dolorosas. Estudios de fisiología animal confirman que estos eventos causan dolor intenso. Además, datos en España muestran que apenas el 8% de la población asiste a estas fiestas y un 80% rechaza subvencionar la tauromaquia, reflejando una tendencia generalizada contra la práctica. Si bien defensores mencionan beneficios tales como la conservación de la raza del toro de lidia o argumentos antropológicos, desde el punto de vista científico esos beneficios no eliminan el sufrimiento agudo causado en cada corrida.",
    philosophicalDeconstruction: "Ético y filosóficamente, la tauromaquia enfrenta el relativismo cultural frente a valores universales. Los partidarios la consideran un elemento del patrimonio cultural, pero críticos del bienestar animal sostienen que la tradición no puede justificar causar dolor innecesario a un ser sintiente. Desde el utilitarismo, se ponderaría el placer estético o cultural frente al dolor del toro; la mayoría de pensadores concluyen que causar sufrimiento consciente para entretener al público es excesivo. Argumentos basados en derechos animales (p.ej., Tom Regan, Peter Singer) subrayan que los animales no deben ser tratados como medios para fines humanos, sin importar la tradición. Mientras la cultura es relevante, cada vez más la filosofía moral moderna rechaza la instrumentalización del toro, enfatizando que la coherencia ética exigiría abolir prácticas que terminan con la vida del animal sin necesidad, ya que alternativas culturales (festivales simbólicos o educativos) podrían preservar la identidad cultural sin crueldad.",
    coexistenceImpact: "La cuestión final es cómo integrar las costumbres arraigadas en un marco ético en evolución. Una opción avanzada ha sido transformar el espectáculo (p.ej. capea sin lance, recortes sin cornadas) para reducir el daño físico, aunque esto genera debate sobre si la esencia de la tradición se pierde. Queda la pregunta: ¿es posible convivir respetando ambas aristas? En todo caso, el dilema obliga a plantear si la convivencia social debe redefinir tradiciones cuando entran en conflicto con los principios del respeto animal. En última instancia: ¿permanece la tauromaquia dentro del marco ético aceptable cuando se busca la armonía entre tradición y compasión animal?",
    references: [
      { id: "1", citation: "Cano-López, R. (2024). Percepción de los pobladores sobre el bienestar animal en corridas de toros en Huancavelica, Perú. Salud y Tecnología Veterinaria, 12(2)."},
      { id: "2", citation: "CAS International. (2014). Spain declares bullfighting to be Cultural Heritage.", url: "https://casint.org/press-release-spain-declares-bullfighting-to-be-cultural-heritage" }
    ],
    openQuestion: "¿Es posible armonizar la preservación de tradiciones culturales con una ética de compasión, o la tauromaquia debe ceder ante los principios del respeto animal?"
  },
  {
    id: "r2-especies-invasoras",
    category: "ecologia",
    title: "Especies invasoras: ¿erradicación aceptable en aras de la conservación?",
    popularStatement: "«Cuando una especie invasora está destruyendo el ecosistema, lo más útil es eliminarla de inmediato»",
    consensus: "DILEMA",
    scientificDeconstruction: "La eliminación de especies invasoras es una práctica común para proteger ecosistemas amenazados. Por ejemplo, en Nueva Zelanda, plagas introducidas que amenazan a aves endémicas son aniquiladas masivamente; defensores indican que si no se actúa, las especies autóctonas mueren por omisión. Estudios en biología de la conservación reconocen que controlar invasoras (p.ej. ratas en islas, ardillas no autóctonas, serpientes exóticas) puede ser la única medida eficaz para preservar la biodiversidad. Sin embargo, no hay criterio científico único: algunos muestran que métodos letales urgentes pueden reducir drásticamente las poblaciones invasoras y salvar hábitats críticos, mientras otros proponen métodos alternativos no letales cuando sean viables.",
    philosophicalDeconstruction: "Filosóficamente, este tema reabre el conflicto entre biocentrismo y derechos individuales. Un enfoque utilitarista puede justificar el sacrificio de invasores para minimizar el sufrimiento total y evitar extinciones mayores. Desde el punto de vista de los derechos animales, cuestiona la moralidad de matar seres sintientes por un fin ecológico. Parke y Russell argumentan que la respuesta no es clara: no hay consigna ética única, cada caso requiere balancear la obligación hacia el ecosistema con el deber de no dañar individuos. En la teoría, se invita a considerar el principio de precaución: ¿se puede resolver el problema sin recurrir a muertes masivas, o el beneficio de salvar un ecosistema justifica sacrificar invasores? El diálogo filosófico sugiere que la respuesta puede depender del consenso social y de las alternativas disponibles, como programas de esterilización o barreras, procurando respetar en lo posible la vida individual.",
    coexistenceImpact: "La reflexión final plantea si podemos convivir con la naturaleza invasora usando medios menos letales. Se exploran estrategias alternativas (control biológico, esterilización) que reduzcan población invasora sin matar. Aun así, el dilema concluye con la pregunta de si eliminar invasores puede justificarse moralmente para proteger a muchos otros. ¿Es aceptable sacrificar animales invasores si ello evita la extinción de numerosas especies nativas? Este planteamiento socrático lleva a cuestionar cómo pesamos el valor de una vida invasora frente al bienestar de todo un ecosistema y sus especies originarias.",
    references: [
      { id: "1", citation: "Parke, E. C., & Russell, J. C. (2018). Ethical responsibilities in invasion biology. The Ecological Citizen, 2(1), 17-19."},
      { id: "2", citation: "Sommer, L., & Kellman, R. (2025). New Zealand's bold plan to save endangered animals: kill millions of invasive animals. NPR.", url: "https://www.npr.org/sections/goatsandsoda/2025/09/09" }
    ],
    openQuestion: "¿Puede justificarse moralmente sacrificar animales invasores para proteger otros, o esta práctica contradice principios básicos de respeto a la vida?"
  },
  {
    id: "r2-quimeras-humanas",
    category: "sintiencia",
    title: "Quimeras humano-animales: ¿estatus moral de los embriones mixtos?",
    popularStatement: "«Un cerdo al que le trasplantas células humanas nunca será un humano, no tendrá conciencia humana»",
    consensus: "ESCENARIO_GRIS",
    scientificDeconstruction: "La investigación de quimeras humano-animal consiste en insertar células madre humanas en embriones animales para generar tejidos mixtos (p. ej., cerdos quimera para producir órganos compatibles). Hasta la fecha, se logra que un pequeño porcentaje de células humanas (por ejemplo, en hígado o riñón) coexitan con células animales, sin formar un cerebro humano funcional. Aun así, hay preocupación científica: ¿qué sucede si las células humanas se incorporan al cerebro animal? Estudios como Aravena (2025) señalan la necesidad de precaución, pues el progreso técnico puede difuminar límites éticos y legales. Actualmente no hay casos de quimeras con conciencia humana, pero experimentos muestran que algunas especies de mamíferos quimera pueden desarrollarse parcialmente, lo que exige regulación rigurosa y monitoreo del desarrollo neural.",
    philosophicalDeconstruction: "Ético y filosóficamente, surge la pregunta del estatuto moral del embrión quimérico. Algunos filósofos (Singer, Regan) argumentarían que si un embrión desarrolla un nivel de consciencia similar al humano, debería considerarse como sujeto moral equivalente a un humano. Aravena alerta que este campo impone límites no establecidos: introducir células humanas en animales extiende los límites de lo éticamente aceptable. En la discusión, Bhan et al. (2010) proponen un enfoque utilitario: sopesar los beneficios potenciales (vacunas, trasplantes) frente a los temores culturales, recordando que la prohibición absoluta podría impedir curas vitales. En última instancia, la cuestión filosófica es definir si el embrión quimera merece un estatus similar al de seres humanos o queda en un espacio intermedio; muchos eticistas concluyen que se requiere un marco ético específico (p. ej., no sobrepasar cierto porcentaje de contribución humana en el cerebro) para resolverlo con criterio.",
    coexistenceImpact: "Este escenario radical plantea cómo acompañar el avance científico manteniendo valores éticos. Una propuesta es la regulación: por ejemplo, si un embrión quimérico llega a cierto estadio o proporción humana crítica, se debería interrumpir su gestación por respeto a su dignidad emergente. Otro enfoque es la transparencia y el diálogo público sobre estos experimentos. La pregunta final es si es posible convivir con esta tecnología creando límites claros: ¿qué características debería tener un embrión quimérico para que la sociedad le reconozca derechos propios? En consecuencia, se invita a la reflexión sobre si la posibilidad de salvar vidas humanas justifica el riesgo de crear entes híbridos éticamente problemáticos.",
    references: [
      { id: "1", citation: "Aravena, M. (2025). Desafíos ético-legales de la experimentación con quimeras humano-animales. Revista de Bioética y Derecho, 31, 53-69.", url: "https://revistes.ub.edu/index.php/RBD/article/view/50112"},
      { id: "2", citation: "Bhan, A., Singer, P. A., & Daar, A. S. (2010). Human–animal chimeras for vaccine development: An endangered species or opportunity for the developing world? BMC International Health and Human Rights, 10(8).", url: "https://doi.org/10.1186/1472-698X-10-8"}
    ],
    openQuestion: "¿Cuáles límites éticos debemos trazar en la investigación con quimeras para que los beneficios médicos no comprometan la dignidad de especies sintientes?"
  },
  {
    id: "r2-fetos-animales",
    category: "sintiencia",
    title: "Embriones y fetos animales: ¿umbral de sintiencia prenatal?",
    popularStatement: "«Un embrión animal en las primeras semanas no siente dolor ni conciencia, solo desarrolla sus sentidos más adelante en la gestación»",
    consensus: "ESCENARIO_GRIS",
    scientificDeconstruction: "La existencia de sensaciones fetales antes del nacimiento es debatida. La neurociencia comparada indica que en la mayoría de los animales las vías nerviosas necesarias para el dolor consciente no se conectan plenamente hasta etapas avanzadas de la gestación (equivalentes al segundo o tercer trimestre en humanos). Por ejemplo, se sabe que recién después de formarse conexiones corticales las hormonas del estrés en fetos pueden indicar conciencia potencial. En consecuencia, muchos expertos asumen que los embriones tempranos no experimentan dolor real; sin embargo, se reconoce la incertidumbre hasta establecer bioseñales precisas. Las regulaciones actuales, como la Directiva 2010/63/EU, exigen analgesia o eutanasia temprana en procedimientos invasivos que puedan afectar a fetos animales en desarrollo avanzado, reflejando precaución científica ante posibles experiencias fetales tardías.",
    philosophicalDeconstruction: "Ético y filosóficamente, se debate cuál es el estatus moral de los embriones y fetos. Algunos filósofos defienden el principio de precaución: si no estamos seguros de la presencia de sensaciones, merece la pena minimizar cualquier posible sufrimiento administrando analgésicos o evitando procedimientos innecesarios. Otros argumentan que, si no hay evidencia clara de conciencia fetal, no hay obligación moral equiparable a la de un ser nacido. En la práctica, muchos bioéticos toman una posición intermedia: conceden mayor consideración conforme avanza la gestación y la capacidad neural del feto. Este enfoque va en línea con directrices éticas que requieren tratamientos más estrictos (anestesia, limitaciones en experimentación) en fetos tardíos, intentando respetar su posible desarrollo sintiente sin paralizar la investigación científica necesaria.",
    coexistenceImpact: "Finalmente, este dilema incita a preguntarse cómo operan los principios de prudencia en la convivencia práctica. En la ganadería y la investigación, la cuestión es: ¿qué nivel de precaución adoptamos? Algunos proponen protocolos donde, llegado cierto umbral de desarrollo neural, se suspendan procedimientos y se administre analgesia; otros piden investigación adicional para delimitar mejor la sintiencia fetal. El interrogante socrático resultante es si debemos tratar a todo embrión animal como sujeto potencial de dolor o asumir un umbral mínimo: ¿qué criterio usar para decidir en qué momento moralizar las intervenciones sobre fetos, y cómo garantizar que las decisiones reflejen un equilibrio entre progreso y respeto a la vida?",
    references: [
      { id: "1", citation: "Aravena, M. (2025). Desafíos ético-legales de la experimentación con quimeras humano-animales. Revista de Bioética y Derecho, 31, 53-69.", url: "https://revistes.ub.edu/index.php/RBD/article/view/50112"},
      { id: "2", citation: "European Union (2010). Directive 2010/63/EU on the protection of animals used for scientific purposes.", url: "https://eur-lex.europa.eu/eli/dir/2010/63" }
    ],
    openQuestion: "¿Hasta qué etapa gestacional debe considerarse la posibilidad de sensación fetal al planificar intervenciones en animales?"
  },
  {
    id: "r2-animales-modificados-geneticamente",
    category: "sistemas_uso",
    title: "Animales transgénicos: ¿qué pasa con su sintiencia?",
    popularStatement: "«A los animales transgénicos los modifican para producir más comida, no hay que preocuparse por su conciencia»",
    consensus: "ESCENARIO_GRIS",
    scientificDeconstruction: "La modificación genética en animales se emplea para investigación y producción. Por ejemplo, se crean ratones transgénicos que expresan genes humanos para estudiar enfermedades; se obtienen salmones transgénicos de crecimiento rápido para la alimentación. Desde el punto de vista biológico, no existe evidencia de que estos cambios aumenten la sintiencia de los animales. En el caso de animales de experimento, la genética permite reducir el número de mamíferos más complejos usados, pues ratones genéticamente alterados pueden reemplazar parcialmentre a primates en cierto tipo de investigación. Sin embargo, los opositores alertan que la ingeniería animal podría introducir problemas de bienestar: por ejemplo, si un cambio genético provoca dolor crónico o alteraciones en el comportamiento, el animal podría sufrir más. Hasta ahora, el debate científico se centra más en los efectos fisiológicos de los transgenes (enfermedades asociadas, metabolismo alterado) que en la consciencia en sí. No obstante, se reconoce la necesidad de monitorear las consecuencias sobre el bienestar completo del animal modificado.",
    philosophicalDeconstruction: "Ética y filosóficamente, la cuestión aborda el respeto a la naturaleza del animal. La constitución suiza es pionera al exigir que la dignidad del ser vivo sea considerada en biotecnología, lo que implica que no basta la eficiencia productiva si se vulnera el bienestar intrínseco. Desde este enfoque, los animales transgénicos no deben reducirse a meros instrumentos: la modificación genética debe evaluarse también por sus efectos sobre el ser vivo en sí. En contraste, algunos utilitaristas podrían justificar ciertas modificaciones si se reducen daños mayores (p.ej., eliminar enfermedades genéticas) y en general mejorar el bienestar de poblaciones. La discusión ética invita a preguntarse si dotar a los animales de nuevos genes cambia su estatus moral o si sigue aplicando para ellos la misma consideración de interés que antes de la modificación. En últimas, se plantea si conviene aplicar principios de precaución: ¿debe tener más protección un animal cuyo genoma ha sido alterado artificialmente?",
    coexistenceImpact: "En la praxis social, los animales transgénicos plantean retos de regulación y aceptación. ¿Deben recibir protecciones especiales? Por ejemplo, el primer salmón transgénico aprobado para consumo generó debates regulatorios sobre rotulado y bioseguridad. La pregunta final es cómo integrar estos seres en una coexistencia ética: ¿existe un límite ético en la ingeniería animal que la sociedad deba acordar, pensando en el interés y bienestar de los animales involucrados? El asunto sugiere que debemos decidir colectivamente cuánto interviniendo en su naturaleza vamos a aceptar para fines humanos.",
    references: [
      { id: "1", citation: "Dennis, C. J. (2002). Engineering animals through transgenesis: issues and perspectives for animal welfare. ILAR Journal, 43(3), 236–239.", url: "https://doi.org/10.1093/ilar.43.3.236"},
      { id: "2", citation: "Cimadori, I. (2025). Farm Animal Welfare in Breeding and Gene Editing: EU and Swiss law. Journal of Animal Law, Ethics & One Health (LEOH)."}
    ],
    openQuestion: "¿Qué límites éticos deben regir la manipulación genética de animales si así se altera irreversiblemente su naturaleza?"
  },
  {
    id: "r2-marco-legal-tfue",
    category: "legal",
    title: "Marco legal internacional: artículo 13 del TFUE y reformas civiles",
    popularStatement: "«Hasta hace poco los animales eran considerados objetos jurídicos; ahora la ley reconoce que son seres sintientes»",
    consensus: "CONSENSO",
    scientificDeconstruction: "El reconocimiento legal de los animales ha avanzado notablemente en años recientes. A nivel internacional, el Tratado de Lisboa (UE) incluyó en el Artículo 13 la consideración de los animales como seres sintientes, exigiendo que las instituciones comunitarias tengan en cuenta su bienestar. A nivel nacional, varios países han reformado sus códigos civiles: por ejemplo, España aprobó en 2021 una ley que define los animales como \"seres vivos dotados de sensibilidad\" en lugar de cosas. Otros países (Francia, Alemania, etc.) han introducido enmiendas similares o leyes de protección que reflejan la nueva visión. Estos cambios legales reflejan un consenso creciente: muchos sistemas jurídicos ahora reconocen en sus textos que los animales no son meros objetos, garantizando así bases para futuras medidas de protección y responsabilidad.",
    philosophicalDeconstruction: "El cambio legal refleja también un consenso moral emergente: cada vez se considera menos tolerable tratar a los animales como propiedad sin derechos. Filósofos del derecho comparan este proceso con la extensión histórica de derechos a otros grupos vulnerables. En concreto, incorporar la sintiencia en la ley implica que la interacción humana con animales debe restringirse por su bienestar, acercándose más a visiones antropológicas donde se reconoce cierto estatus moral. Por ejemplo, la normativa europea y los códigos civiles reformados concuerdan con teorías éticas que postulan un deber positivo hacia los animales (no solo no dañarlos, sino velar activamente por su bienestar). En resumen, las bases jurídicas sentadas sugieren que la comunidad internacional ha llegado a un consenso sobre la validez ética de otorgar protección legal a los animales como seres sintientes.",
    coexistenceImpact: "Este consenso legal mejora la convivencia humano-animal al establecer estándares mínimos de trato. Al reconocerse jurídicamente su sintiencia, las leyes proveen fundamento para prohibir prácticas crueles y fomentar cuidados adecuados. La pregunta final es cómo seguir evolucionando: por ejemplo, ¿debe extenderse el bienestar animal a todos los ámbitos (entrenamiento, entretenimiento, mascotas) con la misma rigurosidad? ¿Debe garantizarse acceso a cuidados veterinarios básicos a todos los animales? En última instancia, la sociedad debe decidir qué nuevos deberes crea este reconocimiento: la coexistencia exige que la ley y la práctica social converjan, traduciéndose los valores en normativas operativas que protejan a los animales.",
    references: [
      { id: "1", citation: "Ley 17/2021, de 15 de diciembre, de régimen jurídico de la protección de los animales (BOE 2021).", url: "https://www.boe.es/eli/es/l/2021/12/15/17" },
      { id: "2", citation: "Tratado de Funcionamiento de la Unión Europea (TFUE), art. 13 (Lisboa, 2007).", url: "https://eur-lex.europa.eu/legal-content/ES/TXT/?uri=CELEX:12012E-T" }
    ],
    openQuestion: "¿Cómo debe evolucionar el derecho internacional para garantizar que la consideración legal de la sintiencia animal se traduzca efectivamente en mayor protección real para los animales?"
  },
  {
    id: "r2-prohibicion-mutilaciones-granjas",
    category: "sistemas_uso",
    title: "Mutilaciones rutinarias en granjas: prohibición creciente",
    popularStatement: "«Cortar colas de cerdos y picos de pollos es normal en la ganadería; no es crueldad, es rutina»",
    consensus: "CONSENSO",
    scientificDeconstruction: "En la ganadería industrial se han identificado prácticas dolorosas sin beneficio para los animales, como el corte rutinario de colas en cerdos o el despique de picos en aves. Estas mutilaciones causan dolor agudo y estrés crónico, como han documentado veterinarios especialistas. En respuesta, muchos países y la Unión Europea han prohibido estas prácticas sin razones veterinarias estrictas: la Directiva 2008/120/CE prohíbe el amordazado rutinario de cerdos y requiere analgesia si se realiza por motivos médicos; de igual manera, la UE eliminó progresivamente el despique obligatorio en aves (Directiva 1999/74/CE prohíbe cortar picos excepto en circunstancias excepcionales). Estas medidas reflejan la conclusión científica de que las mutilaciones causan sufrimiento innecesario y que existen métodos alternativos (ambientes enriquecidos, manejo sanitario) para evitar comportamientos agresivos sin infligir dolor.",
    philosophicalDeconstruction: "Ética y filosóficamente, la eliminación de estas prácticas se fundamenta en principios básicos de bienestar: si una intervención causa sufrimiento sin mejorar la vida del animal, carece de justificación moral. Filósofos del bienestar animal señalan que reconocer legalmente su incompatibilidad (como ha hecho la legislación actual) es coherente con la idea de tratar a los animales con compasión. En efecto, si aceptamos que los animales son sintientes (como reconoce el marco legal internacional), el sacrificar su integridad física por conveniencia industrial se vuelve inaceptable. Estos enfoques concuerdan en aplicar un standard mínimo: está justificado prohibir actos que infringen los derechos implícitos de los animales (a no sufrir desamparados) y promover alternativas que velen por su salud y comportamiento natural.",
    coexistenceImpact: "Este consenso legal cambia las reglas de convivencia humano-animal al elevar los estándares de manejo. Para la coexistencia futura, la pregunta es cómo avanzar aún más: por ejemplo, ¿deberían prohibirse otras prácticas correlacionadas (como el descornado sin anestesia)? En la práctica, se proponen sustitutos (por ejemplo, ambientes con estímulos para reducir comportamientos agresivos) y capacitación a granjeros. En definitiva, el dilema final es si bastan las leyes para eliminar el sufrimiento sistemático, o si hace falta un cambio de mentalidad más profundo en la cría industrial. Socráticamente: ¿qué otras intervenciones habituales podrían cuestionarse al aplicar estos principios, y cómo podemos asegurar que la ley sea sólo el primer paso hacia una relación más respetuosa con los animales?",
    references: [
      { id: "1", citation: "European Commission (2008). Council Directive 2008/120/EC laying down minimum standards for the protection of pigs.", url: "https://eur-lex.europa.eu/eli/dir/2008/120" },
      { id: "2", citation: "European Commission (1999). Council Directive 1999/74/EC laying down minimum standards for the protection of laying hens.", url: "https://eur-lex.europa.eu/eli/dir/1999/74/oj" }
    ],
    openQuestion: "¿Qué medidas adicionales (legales o de manejo) pueden sustituir definitivamente estas prácticas, asegurando a la vez la salud y el manejo de los animales?"
  },
  {
    id: "r2-falacia-ad-hominem",
    category: "psicologia",
    title: "Falacia ad hominem: atacar al mensajero en debates animales",
    popularStatement: "«Los veganos son ricos privilegiados y millennials de moda; no tienen autoridad moral»",
    consensus: "FALACIA",
    scientificDeconstruction: "La falacia ad hominem ocurre cuando se descalifica la propuesta atacando a quien la plantea en lugar de discutir sus argumentos. Por ejemplo, tachar el veganismo de “moda de privilegiados” ataca la identidad de quienes lo defienden en vez de sus razones éticas. En lógica informal, esto se define como sustituir un juicio sobre el contenido por uno sobre la persona, lo cual no invalida el argumento original. A pesar de que estas descalificaciones son comunes en el discurso público, carecen de respaldo lógico. Incluso si un argumento proviene de alguien con cierto perfil, su veracidad o validez permanece independiente de quién lo enuncie. Estudios en psicología cognitiva señalan que esta falacia suele provenir de prejuicios sociales o sesgos de rechazo, pero no aporta evidencia real contra la causa defendida.",
    philosophicalDeconstruction: "Desde un punto de vista filosófico, recurrir a ataques personales en lugar de razones es considerado un comportamiento irracional y poco ético en el debate público. Filósofos del argumento han indicado que esta táctica favorece la polarización y evita la negociación de ideas: en lugar de enfrentar la cuestión moral en sí, se centra la atención en el estatus social o características personales de quienes expone. Esto contraviene los ideales de diálogo racional y justo que proponen pensadores como Habermas, quienes sostienen que el discurso debe evaluar ideas por sus méritos, no por el origen de quien las propone. En síntesis, la falacia ad hominem actúa como una distracción impropia: el valor de un argumento, incluyendo los sobre bienestar animal, debe juzgarse por su contenido, no por quien lo defiende.",
    coexistenceImpact: "Reconocer y evitar esta falacia favorece una convivencia discursiva más madura, en la que se evalúan ideas y no identidades. La pregunta final es cómo podemos estructurar debates que estén a salvo de ataques personales, de modo que permitan a veganos y no veganos entenderse mejor. En otras palabras: ¿de qué serviría rechazar un argumento sólo por el origen de quien lo plantea, si la verdad de fondo podría permanecer? Este cuestionamiento socrático invita a centrarse en las propuestas reales para avanzar en temas de cohabitación entre personas y animales.",
    references: [
      { id: "1", citation: "Walton, D. (1998). Ad hominem arguments. University of Alabama Press.", url: "https://en.wikipedia.org/wiki/Ad_hominem"},
      { id: "2", citation: "Logically Fallacious (2023). Ad Hominem (Abusive). Archieboy Holdings.", url: "https://www.logicallyfallacious.com/logicalfallacies/Ad-Hominem-Abusive" }
    ],
    openQuestion: "¿Cómo puede mejorarse el debate público sobre bienestar animal si evaluamos los argumentos independientemente de quién los plantea?"
  },
  {
    id: "r2-falacia-pendiente-resbaladiza",
    category: "psicologia",
    title: "Falacia de la pendiente resbaladiza en el debate alimentario",
    popularStatement: "«Si prohibimos la carne, después vendrán la prohibición de huevos, luego la de tener mascotas; al final perderemos toda libertad alimentaria»",
    consensus: "FALACIA",
    scientificDeconstruction: "La pendiente resbaladiza es una falacia donde se predice un encadenamiento de consecuencias extremas sin base firme. En el ejemplo, se asume que prohibir la carne inevitablemente conducirá a vetar otros alimentos o prácticas, sin evidencia que sostenga esa conexión necesaria. La lógica informal define este error como inferir la inevitabilidad de un resultado lejano por aceptar un paso inicial. En realidad, cambiar una política (por ejemplo, regular la producción cárnica) no implica automáticamente nuevos vetos, ya que cada decisión requiere su propio análisis. El error al presentar la cadena de consecuencias como segura se basa en el miedo y no en datos, desviando la discusión de los méritos reales de la regulación dietaria.",
    philosophicalDeconstruction: "Desde el punto de vista filosófico del argumento, la falacia radica en que no hay conexión demostrada entre cada paso hipotético. Pensadores del discurso racional insisten en evaluar cada propuesta por sus méritos independientes. En ética pragmática, conjurar escenarios extremos sirve más como una técnica de persuasión emocional que como un razonamiento válido. Por tanto, este argumento carece de justificación moral sólida: incluso si a alguien le preocupa la libertad alimentaria, debe aportar motivos concretos para cada prohibición propuesta, no suponerlas todas derivadas unas de otras. Este tipo de razonamiento suele agravar la polarización en el debate social al apelar al miedo a lo desconocido en lugar de a consideraciones fundadas.",
    coexistenceImpact: "Reflexionando sobre esto, surge la pregunta: ¿cómo distinguir entre un escenario plausible y uno infundado al discutir cambios de consumo? La invitación socrática es a examinar cada paso de la supuesta pendiente críticamente: ¿qué evidencia existe de que prohibir un producto lleve a cerrar puertas adicionales? Este cuestionamiento sugiere que para convivir pacíficamente deberíamos exigir argumentos sólidos para cada cambio, en lugar de basarnos en temores encadenados. En última instancia, nos insta a ser escépticos con advertencias alarmistas: en el diálogo sobre alimentación, ¿deberíamos reformular el debate centrándonos en la causa directa (por qué prohibir carne) y no en los miedos colaterales?",
    references: [
      { id: "1", citation: "Excelsior OWL. (s.f.). Slippery Slope Fallacy. Writing Commons.", url: "https://owl.excelsior.edu/argument-and-critical-thinking/logical-fallacies/"},
      { id: "2", citation: "Stanford Encyclopedia of Philosophy (2017). Fallacy of Slippery Slope (Walton, D.).", url: "https://plato.stanford.edu/entries/fallacies/" }
    ],
    openQuestion: "¿Cómo podemos distinguir entre un escenario plausible y un miedo infundado cuando debatimos cambios en prácticas humanas?"
  },
  {
    id: "r2-falacia-composicion",
    category: "psicologia",
    title: "Falacia de la composición: ¿generalizar a partir de casos individuales?",
    popularStatement: "«Conozco a un ganadero que cuida muy bien a sus animales; por lo tanto, la industria ganadera no puede ser mala»",
    consensus: "FALACIA",
    scientificDeconstruction: "La falacia de la composición ocurre al atribuir las cualidades de una parte a todo el conjunto. En el ejemplo, asumir que todo el sector ganadero es ético porque un productor individual es ejemplar no es lógico. La lógica informal define este error como inferir que un enunciado aplicable a cada elemento individual es válido para el conjunto. Por ejemplo, si cada miembro de un equipo es un excelente investigador, no implica que el equipo sea necesariamente excelente debido al trabajo colaborativo. En ganadería, un caso aislado de buen trato no elimina evidencia de prácticas crueles generalizadas en la industria. Este tipo de generalización ha sido identificado como falaz porque ignora la posible heterogeneidad y dinámicas sistémicas; no considera que, además del cuidado individual, existen estructuras económicas y culturales que afectan el bienestar en distintas explotaciones.",
    philosophicalDeconstruction: "Filósofos de la argumentación señalan que esta falacia viola el principio de individuación: no todos los miembros de una categoría comparten las mismas propiedades, y la experiencia singular no sustituye a la evaluación global. En ética, sostener que un hecho particular invalida una problemática general se considera insuficiente; se necesita evidencia representativa. Por ello, aunque un ganadero sea ejemplar, esto no transforma el sistema en su totalidad. Este razonamiento falla por omisión de contexto: la industria agropecuaria es diversa y compleja. En el fondo, el error moral es suponer que un caso virtuoso exime a todo un sector de crítica. Una evaluación ética rigurosa requeriría estudiar las prácticas comunes y sus efectos colectivos, no confiar en ejemplos aislados.",
    coexistenceImpact: "Este error demuestra que, para convivir, debemos cuestionar nuestras generalizaciones. Socráticamente: ¿cómo cambia la conversación si reconocemos que un buen ejemplo individual no anula los problemas sistémicos? Esto nos invita a examinar la totalidad de la industria antes de concluir. Implica que, al abordar temas de bienestar animal, no bastan testimonios aislados; se necesitan datos amplios y análisis crítico. En la práctica, el mensaje para la convivencia es que cada uno debe hacer el esfuerzo de informarse más allá de impresiones personales: ¿qué cifras globales apoyan o refutan nuestra visión del sector, y cómo podemos alinear nuestras conclusiones con la evidencia completa?",
    references: [
      { id: "1", citation: "Logically Fallacious (2023). Fallacy of Composition. Archieboy Holdings.", url: "https://www.logicallyfallacious.com/logicalfallacies/Fallacy-of-Composition" },
      { id: "2", citation: "Stanford Encyclopedia of Philosophy (2017). Fallacies (Walton, D.).", url: "https://plato.stanford.edu/entries/fallacies/" }
    ],
    openQuestion: "¿En qué medida nuestras propias generalizaciones basadas en experiencias individuales moldean injustamente cómo valoramos el comportamiento de industrias enteras?"
  },
  {
    id: "sexado-in-ovo",
    category: "sistemas_uso",
    title: "Sexado in-ovo: ¿la biotecnología resuelve el sacrificio de pollitos machos?",
    popularStatement: "«El sexado in-ovo ya detecta el sexo del embrión dentro del huevo antes de nacer: ¿es el fin del sacrificio masivo de pollitos machos, o la industria solo ha encontrado una forma más aséptica de descartar vidas?»",
    consensus: "ESCENARIO_GRIS",
    scientificDeconstruction: "En la industria avícola de puesta, la mitad de los huevos fértiles producen pollitos machos, inútiles para la producción de huevos y económicamente inviables para la carne: cada año se sacrifican miles de millones de pollitos recién nacidos en todo el mundo, normalmente por maceración o gasificación [1]. El sexado in-ovo analiza el embrión dentro del huevo entre los días 9 y 14 de incubación mediante espectroscopía óptica (p. ej. espectroscopía Raman o espectroscopía de infrarrojo cercano) o análisis de ADN a partir de micro-muestras, permitiendo retirar los huevos machos antes de la eclosión [1]. Sistemas comerciales como SelEggt alcanzan una precisión superior al 99% en la identificación del sexo y descartan los huevos machos en fase embrionaria [2]. Esta tecnología está siendo impulsada por legislación: Alemania prohibió el sacrificio de pollitos machos a partir de 2022 y Francia a partir de 2023, forzando a la industria a adoptar alternativas [1].",
    philosophicalDeconstruction: "La tecnología plantea una paradoja moral: elimina el sufrimiento de cientos de millones de pollitos ya nacidos, pero convierte la vida animal en un input de producción aún más perfectamente gestionado, donde el macho es descartado como defecto de fábrica en estado embrionario [1]. Quienes defienden el bienestarismo ven un progreso tangible y mensurable; quienes sostienen posturas abolicionistas argumentan que optimizar el descarte no cuestiona el sistema que define a los animales como mercancía, solo perfecciona su gestión [2]. Además, la evidencia sobre la sintiencia embrionaria temprana sigue siendo limitada, lo que convierte el umbral del día 9 en una decisión política tanto como científica: ¿qué confiere estatus moral a un embrión, y cuándo exactamente?",
    coexistenceImpact: "El sexado in-ovo demuestra que la legislación puede forzar cambios tecnológicos reales en favor de los animales, un precedente de cómo la sociedad civil y el derecho pueden moldear la industria [1]. Pero la coexistencia futura exigirá decidir si estas soluciones son el destino final o una estación intermedia: la misma capacidad de análisis que hoy descarta huevos machos podría mañana usarse para seleccionar rasgos de mayor sufrimiento silencioso. La pregunta socrática queda abierta: ¿cuando la tecnología nos permite evitar el sufrimiento sin coste, seguimos justificando el resto del sistema de explotación?",
    references: [
      { id: "1", citation: "Krautwald-Junghanns, M.-E., Cramer, K., Fischer, B., et al. (2018). Current approaches to avoid the culling of day-old male chicks in the layer industry, with special reference to spectroscopic methods. Poultry Science, 97(3), 749-757.", url: "https://doi.org/10.3382/ps/pex389" },
      { id: "2", citation: "HatchTech Group (2026). SelEggt In-Ovo Sexing: early DNA-based sex determination from day 9 of incubation.", url: "https://www.respeggt.com/" }
    ],
    openQuestion: "¿El sexado in-ovo elimina un sufrimiento real o solo vuelve invisible un descarte que el sistema sigue considerando inevitable?"
  },
  {
    id: "ia-bienestar-animal",
    category: "sistemas_uso",
    title: "Inteligencia artificial en favor del bienestar animal",
    popularStatement: "«La tecnología se usa para producir más barato; ¿puede la IA ponerse también al servicio de medir y proteger el bienestar de los animales?»",
    consensus: "CONSENSO",
    scientificDeconstruction: "La inteligencia artificial y el aprendizaje automático ya se aplican de forma demostrada al monitoreo del bienestar animal [1]. Modelos de deep learning entrenados con miles de vocalizaciones identifican automáticamente llamadas de angustia en pollos de granja, un 'indicador iceberg' del bienestar que antes dependía de anotación manual lenta y costosa [2]. En paralelo, sensores conectados, big data y visión por computadora permiten detectar de forma continua y no invasiva signos de dolor, estrés y enfermedad en ganadería de precisión: cojeras, problemas respiratorios y comportamientos anómalos son reconocidos antes de que los humanos los perciban [1]. La misma tecnología acústica se emplea en conservación y santuarios para monitorizar fauna silvestre sin interferir en su comportamiento [1].",
    philosophicalDeconstruction: "La IA es una herramienta moralmente neutra cuyo signo ético depende de quien la despliegue. En la ganadería de precisión, el monitoreo puede mejorar el bienestar de los animales existentes —un avance bienestarista real— o convertirse en un sistema de vigilancia que optimiza la productividad sin cuestionar el marco de explotación [1]. Para los animales que ya existen en las granjas, cada capacidad de detectar dolor evitable se traduce en sufrimiento evitado, lo que concede a estas tecnologías un valor utilitario inmediato; pero la pregunta de fondo sigue siendo si perfeccionar el cuidado dentro del sistema es un paso hacia su superación o una forma de hacerlo moralmente más cómodo de sostener [2].",
    coexistenceImpact: "La IA abre una vía concreta de reconciliación entre industria y ética: etiquetas de bienestar verificadas por monitoreo algorítmico independiente, auditorías continuas frente a inspecciones puntuales y una transparencia que hoy no existe en la cadena de suministro [1]. Para la convivencia futura, la cuestión no es si la tecnología puede medir el sufrimiento —ya puede— sino quién controla esos datos y con qué incentivos: ¿un modelo de negocio que cobra por certificar bienestar, o una infraestructura pública que garantice que los animales no paguen el coste de nuestra desatención?",
    references: [
      { id: "1", citation: "Neethirajan, S. (2020). The role of sensors, big data and machine learning in modern animal farming. Sensing and Bio-Sensing Research, 29, 100367.", url: "https://doi.org/10.1016/j.sbsr.2020.100367" },
      { id: "2", citation: "Mao, A., Giraudet, C. S. E., Liu, K., et al. (2022). Automated identification of chicken distress vocalizations using deep learning models. Journal of the Royal Society Interface, 19(191), 20210921.", url: "https://doi.org/10.1098/rsif.2021.0921" }
    ],
    openQuestion: "Si la IA ya es capaz de leer el sufrimiento de los animales en tiempo real, ¿qué nos impide —a nosotros como sociedad— dejar de causarlo?"
  }
];
