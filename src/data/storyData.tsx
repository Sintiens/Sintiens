import React from 'react';
import { BranchNode, TopicBlockData } from '../types/story';
import { GlossaryWord } from '../components/ui/GlossaryWord';

export interface ActData {
  id: string;
  num: string;
  label: string;
  colorName: string; // e.g. "bg-ch1"
  textColor: string; // e.g. "text-ch1"
  hoverColor: string;
  desc: string;
  title: string;
  blocks: TopicBlockData[];
}

export const actsData: ActData[] = [
  {
    id: "acto-1",
    num: "I",
    label: "Sintiencia & Biología",
    colorName: "bg-ch1",
    textColor: "text-ch1",
    hoverColor: "group-hover:text-ch1",
    desc: "Evidencia neurocientífica empírica sobre la capacidad de sufrir de los animales no humanos.",
    title: "Fundamentos Biológicos",
    blocks: [
      {
        id: "la-diferencia-entre-",
        title: "La diferencia entre vivir y sentir: El concepto de Sintiencia",
        content: (
          <p>La sintiencia —recordemos— es la capacidad de tener experiencias subjetivas. Lo que la neurobiología ha hecho en las últimas décadas es mapear dónde existe esa capacidad. La <strong>Declaración de Cambridge</strong> (2012) estableció que mamíferos, aves y muchas otras criaturas comparten los sustratos neuronales de la consciencia. La <strong>Declaración de Nueva York</strong> (2024) amplió ese consenso a cefalópodos, decápodos e insectos, basándose en respuestas observables al dolor, aprendizaje complejo y comportamientos intencionales.</p>
        ),
        keyIdea: "Estar vivo no es lo mismo que ser sintiente: la sintiencia es tener una experiencia subjetiva, sentir placer, dolor, miedo o apego.",
        analogy: { text: "Un termostato reacciona al frío, una planta busca la luz, pero ninguno 'siente' nada. La sintiencia empieza donde aparece un 'alguien' que experimenta, no solo un mecanismo que responde." },
        pullQuote: "Un ser sintiente tiene una perspectiva propia del mundo.",
        didYouKnow: "El término 'sintiencia' distingue deliberadamente la capacidad de sentir de la mera vida biológica: una bacteria está viva, pero no por ello es alguien.",
        reflectionQuestion: {
          question: "Si la frontera moral fuera la vida y no la sintiencia, ¿deberíamos proteger igual a una bacteria que a un perro?",
          prompt: "Piensa en qué es lo que de verdad te hace dudar antes de dañar a alguien."
        },
        microQuiz: {
          question: "Un termostato enciende la calefacción cuando hace frío. ¿Es un ser sintiente?",
          options: ["Sí, porque reacciona al frío", "No: reacciona, pero no experimenta nada", "Solo si aprende de la experiencia"],
          correctIndex: 1,
          revealFact: "La clave está en la experiencia subjetiva. Reaccionar a un estímulo —como hace un termostato, una bacteria o una planta— no implica sentir nada. La sintiencia empieza solo donde hay 'alguien' que experimenta lo que ocurre, no un mecanismo que responde."
        },
        deepDive: {
          id: "dd-la-diferencia-entre-",
          label: "la neurobiología de la sintiencia",
          nodes: [
          {
            id: "neocortex",
            label: "El mito del Neocórtex",
            shortDesc: "¿Necesitan cerebro humano para sentir?",
            content: <p>A menudo se asume que solo los animales con un neocórtex grande (como los humanos) pueden ser conscientes. Sin embargo, estudios recientes demuestran que otras estructuras cerebrales asumen las funciones de consciencia en aves, pulpos e incluso peces.</p>
          },
          {
            id: "nocicepcion",
            label: "Nocicepción frente a Dolor",
            shortDesc: "Reacción mecánica vs. Experiencia subjetiva",
            content: <p>Mientras la nocicepción es un reflejo físico que ocurre en la médula espinal, el dolor es la experiencia consciente y subjetiva de sufrimiento procesada en el cerebro.</p>
          },
          {
            id: "cambridge",
            label: "La Declaración de Cambridge sobre la Conciencia",
            shortDesc: "El consenso científico (2012)",
            content: <p>Firmada en 2012 por destacados neurocientíficos, establece formalmente que la ausencia de un neocórtex no impide que un organismo experimente estados afectivos, incluyendo explícitamente a mamíferos, aves y muchas otras criaturas.</p>
          },
          {
            id: "diseños",
            label: "Diferentes diseños, un mismo resultado",
            shortDesc: "Inteligencias alternativas",
            content: <p>La evolución ha encontrado múltiples caminos para llegar a la consciencia. Un pulpo, por ejemplo, tiene un sistema nervioso distribuido (dos tercios de sus neuronas están en sus tentáculos), evidenciando que no hay un único diseño para la mente.</p>
          },
          {
            id: "casos",
            label: "Casos prácticos y ejemplos",
            category: "Ejemplos",
            content: <p>Desde las vacas que muestran dolor ante la separación de sus crías, hasta los peces que modulan su comportamiento al recibir analgésicos, los ejemplos están en todas partes.</p>
          },
          {
            id: "impacto",
            label: "Impacto en otras disciplinas",
            category: "Relaciones",
            content: <p>Comprender la neurobiología de la sintiencia cambia radicalmente la jurisprudencia, obligándonos a crear leyes que no traten a los animales como objetos (bienes muebles).</p>
          }
        ]
        }
      },
      {
        id: "el-dolor-consciente-",
        title: "El dolor consciente frente al acto reflejo",
        content: (
          <div className="space-y-4">
            <p>La distinción entre <strong>nocicepción</strong> (reflejo automático) y <strong>dolor</strong> (experiencia consciente) es clave, y los últimos quince años de investigación la han confirmado en especies inesperadas.</p>
            <p>Braithwaite (2010) demostró que los peces teleósteos modulan su comportamiento al recibir analgésicos, no solo al recibir estímulos mecánicos. Elwood y Adams (2015) mostraron que cangrejos de playa expuestos a descargas eléctricas presentan respuestas fisiológicas coherentes con dolor —no mero reflejo— y renuncian a refugios valiosos para evitar futuros choques. En invertebrados con sistemas nerviosos radicalmente distintos al nuestro, la evidencia de dolor se acumula.</p>
            <p>El neurocientífico Jaak Panksepp identificó siete sistemas emocionales básicos compartidos por todos los mamíferos —búsqueda, ira, miedo, lujuria, cuidado, pánico y juego— que se originan en regiones profundas del cerebro (subcorticales), no en el neocórtex. Por eso la ausencia de neocórtex humano no excluye la experiencia: la maquinaria emocional es anterior en la evolución.</p>
            <p>La <strong>Declaración de Cambridge sobre la Conciencia</strong> (2012) formalizó este consenso entre neurocientíficos. Más recientemente, la <strong>Declaración de Nueva York sobre la Conciencia Animal</strong> (2024) amplió ese reconocimiento a invertebrados como cefalópodos (pulpos, calamares), decápodos (cangrejos, langostas) e insectos, basándose en evidencia acumulada de comportamientos complejos y respuestas al dolor.</p>
          </div>
        ),
        keyIdea: "Nocicepción es un reflejo automático; el dolor es una experiencia consciente. Los animales no humanos tienen ambas, igual que nosotros.",
        analogy: { text: "Cuando apartas la mano del fuego antes de doler, eso es nocicepción. El grito que viene después, cuando el cerebro lo procesa, eso es el dolor." },
        pullQuote: "Diferentes cerebros, el mismo 'software' para sufrir y alegrarse.",
        didYouKnow: "Los peces reciben analgésicos en experimentos de laboratorio: su comportamiento cambia de forma medible, lo que indica que no están reaccionando solo, sino sufriendo.",
        reflectionQuestion: {
          question: "Si el reflejo y el dolor son cosas distintas, ¿qué implica para cómo tratamos a quien sí siente la segunda?",
          prompt: "Pregúntate si justificamos el daño solo porque el otro no puede contárnoslo."
        }
      },
      {
        id: "una-vida-interior-as",
        title: "Una vida interior asombrosamente compleja",
        content: (
          <p>La ciencia moderna (la etología) ha ido mucho más allá del dolor físico y ha descubierto que los animales tienen una vida cognitiva y emocional deslumbrante. No viven atrapados en un "presente perpetuo". Los estudios demuestran que muchas especies recuerdan eventos pasados para planificar su futuro, usan herramientas para resolver problemas y forman vínculos familiares de por vida. Hemos documentado cómo los elefantes y los grandes simios velan a sus muertos, mostrando comportamientos inconfundibles de luto, angustia y empatía profunda.</p>
        ),
        keyIdea: "Los animales no viven en un presente perpetuo: recuerdan, planifican, usan herramientas y muestran luto y empatía.",
        analogy: { text: "Imagina a un elefante regresando años después a los huesos de un familiar: es la diferencia entre sobrevivir y tener una biografía." },
        pullQuote: "No viven atrapados en un 'presente perpetuo'.",
        didYouKnow: "Los cuervos de Nueva Caledonia fabrican herramientas a medida y recuerdan a personas concretas durante años, por la cara.",
        reflectionQuestion: {
          question: "Si un ser recuerda, planifica y llora a sus muertos, ¿qué palabra usarías para describir lo que tiene?",
          prompt: "Más allá de 'instinto', intenta nombrarlo con honestidad."
        }
      }
    ]
  },
  {
    id: "acto-2",
    num: "II",
    label: "Filosofía & Ética",
    colorName: "bg-ch4",
    textColor: "text-ch4",
    hoverColor: "group-hover:text-ch4",
    desc: "Análisis moral del especismo y disección de los argumentos que justifican la explotación.",
    title: "Filosofía y Ética",
    blocks: [
      {
        id: "el-sufrimiento-como-",
        title: "El sufrimiento como la única medida justa",
        content: (
          <div className="space-y-4">
            <p>En el pasado, los filósofos justificaban el dominio sobre los animales diciendo que no tenían lenguaje humano o que no eran "seres racionales" capaces de hacer matemáticas o filosofía. Sin embargo, pensadores posteriores cambiaron las reglas del juego para siempre con una simple pregunta: "La cuestión moral no es si pueden razonar o si pueden hablar, sino, ¿pueden sufrir?".</p>
            <p>Bajo esta lógica, la inteligencia de un ser no determina si merece respeto. Un bebé humano de seis meses no sabe hablar ni resolver ecuaciones, pero lo protegemos porque sabemos que puede sufrir. La filosofía ética nos dice que la capacidad de sufrir y disfrutar de la vida es lo único que debería importar para decidir si alguien merece consideración moral.</p>
          </div>
        ),
        keyIdea: "El criterio moral no es la inteligencia ni el lenguaje, sino la capacidad de sufrir: si alguien puede sufrir, merece consideración.",
        analogy: { text: "No protegemos a un bebé de seis meses por resolver ecuaciones, sino porque puede sufrir. La pregunta para el resto de animales es exactamente la misma." },
        pullQuote: "La cuestión no es si pueden razonar o hablar, sino: ¿pueden sufrir?",
        didYouKnow: "Esta pregunta, atribuida a Jeremy Bentham en 1789, anticipó por dos siglos lo que la neurobiología confirmaría en el siglo XXI.",
        reflectionQuestion: {
          question: "Si defendemos a un bebé porque sufre y no por su inteligencia, ¿qué nos impide aplicar el mismo rasero a otros seres que también sufren?",
          prompt: "Busca la razón real, no la costumbre."
        },
        microQuiz: {
          question: "¿Qué criterio debería decidir si alguien merece protección moral?",
          options: ["La inteligencia o el lenguaje", "La capacidad de sufrir", "La utilidad para los humanos"],
          correctIndex: 1,
          revealFact: "Para Bentham y la ética moderna lo que cuenta es la capacidad de sufrir, no la inteligencia. Por eso protegemos a un bebé aunque no hable ni resuelva ecuaciones: no por su razonamiento, sino porque puede sufrir. Aplicar el mismo rasero a otros animales no es sentimentalismo, es coherencia."
        },
        deepDive: {
          id: "dd-el-sufrimiento-como-",
          label: "este concepto",
          nodes: [
          {
            id: "cartesianismo",
            label: "Mecanicismo de Descartes",
            shortDesc: "Animales como autómatas",
            content: (
              <p>Descartes argumentó que los animales eran literalmente máquinas de relojería sin alma ni mente, justificando así la vivisección sin anestesia.</p>
            )
          }
        ]
        }
      },
      {
        id: "el-problema-del-",
        title: "El problema del \"Especismo\"",
        content: (
          <div className="space-y-4">
            <p>El especismo, como vimos en los conceptos clave, es el sesgo que usa la especie como criterio moral. El debate filosófico no es si existe —el consenso es que sí— sino cómo responder.</p>
            <p>El filósofo Carl Cohen contraargumentó que los derechos son inherentemente humanos porque requieren agencia moral: solo los agentes morales pueden ser titulares de derechos. Pero esta postura tiene un problema: si la agencia moral es el criterio, también quedarían excluidos los bebés humanos y las personas con discapacidad cognitiva profunda, lo que se conoce como el <strong>problema de los casos marginales</strong>. Tom Regan respondió que un animal con creencias, deseos, memoria y sentido del futuro es un "sujeto-de-una-vida" con valor inherente, independientemente de su especie. El debate sigue vivo.</p>
            <p>La filosofía nos invita a pensar en el conflicto de intereses: ¿Es ético sacrificar un interés fundamental de un animal (su deseo de vivir, no ser mutilado y no sentir dolor) solo para satisfacer un interés periférico de un ser humano (el deseo de comer un plato que le gusta durante 15 minutos, cuando tiene otras alternativas)?</p>
          </div>
        ),
        keyIdea: "Especismo: discriminar a alguien solo por su especie. Tratar distinto a un perro y a un cerdo siendo tan parecidos es moralmente arbitrario.",
        analogy: { text: "Si cambiaras 'perro' por 'cerdo' en cualquier argumento y te sonara monstruoso, probablemente estés viendo el especismo en acción." },
        pullQuote: "¿Es ético sacrificar un interés fundamental de un animal para saciar un interés periférico de 15 minutos?",
        didYouKnow: "El término 'especismo' fue acuñado en 1970 por el psicólogo Richard Ryder y popularizado por Peter Singer en 'Liberación Animal' (1975).",
        reflectionQuestion: {
          question: "¿Puedes señalar una diferencia entre un perro y un cerdo que no sea la especie, y que justifique tratar a uno como familia y al otro como alimento?",
          prompt: "Si la inteligencia no basta y el cariño tampoco, ¿qué queda?"
        },
        deepDive: {
          id: "dd-el-problema-del-",
          label: "este concepto",
          nodes: [
          {
            id: "casos_marginales",
            label: "Argumento de Casos Marginales",
            shortDesc: "La falacia de la inteligencia",
            content: (
              <div className="space-y-2">
                <p>Si justificamos comer cerdos "porque son menos inteligentes", entonces para ser lógicamente consistentes, el nivel de inteligencia debería dictar el derecho a la vida en todas las especies, incluida la nuestra.</p>
                <p>Esto demuestra que la inteligencia no es la base de la consideración moral, sino la sintiencia.</p>
              </div>
            )
          }
        ]
        }
      },
      {
        id: "bienestarismo-frente",
        title: "Bienestarismo frente a Abolicionismo",
        content: (
          <div className="space-y-4">
            <p>Frente a este dilema ético, existen dos posturas principales sobre cómo actuar:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>El Bienestarismo (utilitarista, heredero de Singer):</strong> Es la postura más común. Acepta que los humanos sigamos usando a los animales para comida o investigación, pero exige que minimicemos su sufrimiento. Pide jaulas más grandes, transporte menos cruel y aturdimiento antes de la muerte. Busca reducir el daño sin cuestionar la estructura que lo permite.
              </li>
              <li>
                <strong>El Abolicionismo (derechos animales, heredero de Regan y Francione):</strong> Esta postura argumenta que los seres sintientes no deben ser propiedad de nadie. El filósofo Tom Regan defendió que los animales son "sujetos-de-una-vida" con valor inherente, no recursos. El jurista Gary Francione sostiene que las reformas bienestaristas son un maquillaje que adormece la conciencia del consumidor sin cambiar la raíz del problema: el estatus de propiedad. Para el abolicionismo, al igual que ocurrió con la esclavitud humana, el objetivo no debe ser tratar "amablemente" a los animales que usamos, sino dejar de usarlos como recursos.
              </li>
            </ul>
            <p>Existen otros marcos que enriquecen el debate: Martha Nussbaum propuso el <strong>enfoque de las capacidades</strong> (cada animal tiene derecho a desarrollar sus capacidades naturales), y Sue Donaldson y Will Kymlicka, en <strong>Zoopolis</strong>, trasladaron la discusión al terreno político, defendiendo derechos de ciudadanía para animales domésticos, residencia para los liminales y soberanía para los salvajes.</p>
          </div>
        ),
        keyIdea: "Bienestarismo: usarlos pero con menos sufrimiento. Abolicionismo: dejar de usarlos. La pregunta de fondo es si 'menos cruel' es suficiente.",
        analogy: { text: "Es la diferencia entre hacer más suave una jaula y preguntar si la jaula debería existir." },
        pullQuote: "El objetivo no debe ser tratar amablemente a los animales que usamos, sino dejar de usarlos.",
        didYouKnow: "Históricamente, reformas 'amables' de sistemas injustos convivieron durante décadas con su abolición total: el debate bienestarismo/abolicionismo en animales replica esa tensión.",
        reflectionQuestion: {
          question: "Si estuvieras del lado del explotado, ¿qué pedirías: que tu jaula fuera más grande, o no estar en una jaula?",
          prompt: "Ponte en el lugar del otro, no en el del sistema."
        }
      }
    ]
  },
  {
    id: "acto-3",
    num: "III",
    label: "Psicología Humana",
    colorName: "bg-ch5",
    textColor: "text-ch5",
    hoverColor: "group-hover:text-ch5",
    desc: "Mecanismos de disonancia cognitiva y sesgos que nos desconectan del dolor.",
    title: "Psicología Humana",
    blocks: [
      {
        id: "la-",
        title: "La \"Paradoja de la carne\" y la disonancia cognitiva",
        content: (
          <div className="space-y-4">
            <p>La psicología denomina a este fenómeno la "Paradoja de la carne". Ocurre cuando lo que pensamos ("soy una buena persona que ama a los animales") choca violentamente con lo que hacemos ("me estoy comiendo a un animal que ha pasado su vida encerrado").</p>
            <p>Este choque produce en nuestro cerebro un malestar muy profundo llamado disonancia cognitiva. Como cambiar de hábitos alimenticios y sociales es difícil, nuestro cerebro (para protegernos de la culpa) despliega una serie de "trucos" mentales automáticos para que podamos seguir actuando igual sin sentirnos mal.</p>
          </div>
        ),
        keyIdea: "La 'paradoja de la carne' nace del choque entre amar a los animales y comérselos. El cerebro resuelve la tensión con autoengaños automáticos.",
        analogy: { text: "Es como un detector de humos que, en lugar de avisarte del fuego, apaga la alarma para que puedas seguir durmiendo: te calma, pero no apaga el incendio." },
        pullQuote: "Nuestro cerebro despliega trucos para que podamos seguir actuando igual sin sentirnos mal.",
        didYouKnow: "El término 'disonancia cognitiva' fue formalizado por Leon Festinger en 1957 y explica desde por qué seguimos fumando hasta por qué justificamos elecciones costosas.",
        reflectionQuestion: {
          question: "¿Recuerdas la última vez que sentiste este choque? ¿Qué 'truco' usó tu mente para apagarlo?",
          prompt: "No es culpabilidad, es observación: nombra el truco, no el sentimiento."
        },
        deepDive: {
          id: "dd-la-",
          label: "este concepto",
          nodes: [
          {
            id: "disonancia",
            label: "Disonancia Cognitiva",
            shortDesc: "Tensión psicológica",
            content: (
              <p>Es la incomodidad mental que experimentamos al tener creencias contradictorias. Amamos a los animales, pero comemos animales. Para resolver la tensión, solemos cambiar nuestras creencias ("no sufren tanto", "es necesario") en lugar de cambiar nuestras acciones.</p>
            )
          }
        ]
        }
      },
      {
        id: "las-herramientas-del",
        title: "Las herramientas del autoengaño mental",
        content: (
          <div className="space-y-4">
            <p>Como vimos en el concepto de <strong>axioma implícito</strong>, estas tres herramientas del autoengaño son premisas que damos por ciertas sin haberlas examinado. Nuestro cerebro utiliza varias estrategias fascinantes para apagar nuestra empatía:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>La Compartimentalización (Las "cajas" mentales):</strong> Subdividimos a los animales en categorías cerradas. La caja de "mascotas" (donde ponemos toda nuestra empatía), la caja de "comida" (donde apagamos la empatía) y la caja de "plagas". Al etiquetar a una vaca simplemente como "comida", operamos bajo un sesgo cultural profundo.
              </li>
              <li>
                <strong>Minimizar la inteligencia del animal:</strong> Los estudios demuestran que, cuando las personas están a punto de comer carne, tienden a convencerse a sí mismas de que los animales de granja son tontos o que no sienten el dolor de la misma manera que nosotros. Es un mecanismo de defensa para justificar el acto.
              </li>
              <li>
                <strong>La invisibilidad y el lenguaje:</strong> El sistema está diseñado para que no veamos la realidad. Usamos palabras distanciadoras: decimos "ternera", "bacon", "jamón" o "filete" para no tener que pensar en una vaca, un cerdito o el músculo de un animal muerto. Además, los mataderos y las macrogranjas están construidos lejos de las ciudades, sin ventanas. Al no ver el proceso, la mente del consumidor nunca conecta el producto empaquetado en el supermercado con el animal vivo y respirando.
              </li>
            </ul>
          </div>
        ),
        keyIdea: "Compartimentar, minimizar su inteligencia y esconder el proceso con el lenguaje: tres trucos para apagar la empatía sin darse cuenta.",
        analogy: { text: "Es como poner un filtro de Instagram al matadero: 'ternera', 'bacon', 'filete'. La palabra dibuja otra cosa, y la mente se relaja." },
        pullQuote: "Los mataderos se construyen lejos de las ciudades y sin ventanas.",
          didYouKnow: "Estudios de Melanie Joy bautizaron este sistema invisible de creencias como 'carnismo': por qué comemos a unos animales y no a otros sin ningún motivo biológico. Investigaciones como las de Loughnan, Bastian y Haslam (2010) demostraron que quienes comen carne tienden a negar la capacidad mental de los animales de granja —atribuyéndoles menos dolor y conciencia— como mecanismo para reducir la culpa.",
        reflectionQuestion: {
          question: "¿Qué palabra usas tú para no ver al animal? ¿Qué pasaría si la sustituyeras por su nombre durante una semana?",
          prompt: "El lenguaje no es neutral: prueba a nombrar y observa qué cambia por dentro."
        }
      }
    ]
  },
  {
    id: "acto-4",
    num: "IV",
    label: "Sistemas & Uso",
    colorName: "bg-ch2",
    textColor: "text-ch2",
    hoverColor: "group-hover:text-ch2",
    desc: "Estructuras e industrias diseñadas para la instrumentalización y cosificación sistemática.",
    title: "Antropocentrismo y Sistemas de Uso",
    blocks: [
      {
        id: "la-domesticaci-n-ext",
        title: "La domesticación extrema y la ingeniería genética",
        content: (
          <p>A lo largo de los siglos, no solo hemos domesticado animales, sino que los hemos convertido en máquinas de producción mediante una cría selectiva implacable. El caso más claro es el del pollo de engorde. En la década de 1950, un pollo tardaba meses en crecer. Hoy, gracias a la manipulación genética, alcanzan el tamaño de mercado en apenas 40 días. Sus músculos (la pechuga) crecen a una velocidad biológicamente antinatural, lo que provoca que sus propios huesos se rompen y sus corazones colapsan por no poder soportar su propio peso.</p>
        ),
        keyIdea: "La cría selectiva ha transformado a los animales en máquinas de producción: crecen tan rápido que sus propios cuerpos colapsan.",
        analogy: { text: "Es como obligar a un niño a pesar 100 kilos a los seis años: la economía de la granja gana, el cuerpo pierde." },
        pullQuote: "Alcanzan el tamaño de mercado en 40 días; sus huesos se rompen y sus corazones colapsan.",
        didYouKnow: "Un pollo de engorde moderno crece unas cuatro veces más rápido que en 1950, pero su esperanza de vida sana apenas cambia: si no se sacrificara, moriría joven de forma natural.",
        reflectionQuestion: {
          question: "Si el cuerpo de un animal se rompe por el ritmo que le impusimos, ¿podemos seguir llamando 'natural' a este sistema?",
          prompt: "Lo 'natural' sería lo que el cuerpo del animal permite, no lo que el mercado exige."
        }
      },
      {
        id: "la-ganader-a-industr",
        title: "La Ganadería Industrial (Factory Farming)",
        content: (
          <p>Para alimentar a miles de millones de personas de forma barata, el mundo pasó de las granjas tradicionales a las macrogranjas industriales. Estos sistemas se basan en el confinamiento extremo. Las gallinas ponedoras viven en jaulas de alambre tan estrechas que jamás pueden extender sus alas. Las cerdas reproductoras pasan la mayor parte de sus vidas en jaulas de metal del tamaño exacto de su cuerpo, donde no pueden ni siquiera darse la vuelta. Este nivel de encierro les causa un estrés psicológico y físico tan insoportable que, por pura desesperación, los animales empiezan a morderse y atacarse entre sí. ¿La solución de la industria? En lugar de darles más espacio, realizan mutilaciones rutinarias: les cortan los picos a las aves, y las colas y dientes a los cerditos, generalmente sin ningún tipo de anestesia.</p>
        ),
        keyIdea: "El confinamiento extremo genera tanto estrés que los animales se atacan. La industria resuelve el síntoma mutilándolos, no dándoles espacio.",
        analogy: { text: "Si metieras a mil personas en un vagón de metro sin moverse, se morderían entre ellas. La respuesta de la industria equivalente sería cortarles los dientes, no abrir la puerta." },
        pullQuote: "La solución de la industria no fue darles más espacio: fue cortarles picos, colas y dientes sin anestesia.",
        didYouKnow: "Las jaulas de gestación para cerdas son tan pequeñas que el animal no puede girarse: el espacio se calcula para que no 'desperdicie' ni un centímetro de pienso.",
        reflectionQuestion: {
          question: "Si la solución al estrés del encierro es mutilar al animal, ¿estamos tratando el problema o silenciando su síntoma?",
          prompt: "El síntoma se ve; el problema, no. Esa es justamente la pregunta."
        },
        deepDive: {
          id: "dd-la-ganader-a-industr",
          label: "este concepto",
          nodes: [
          {
            id: "granjas_factoria",
            label: "Granjas Factoría (CAFO)",
            shortDesc: "Operaciones concentradas",
            content: (
              <p>Las Operaciones Concentradas de Alimentación Animal (CAFOs) encierran a miles de individuos sin acceso a luz solar ni espacio para darse la vuelta, maximizando el margen de beneficio corporativo a costa del colapso biológico del animal.</p>
            )
          }
        ]
        }
      },
      {
        id: "m-s-all-de-la-granja",
        title: "Más allá de la granja: El mar, la ciencia y el entretenimiento",
        content: (
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Acuicultura:</strong> No solo los animales terrestres sufren esto. Las granjas de peces (acuicultura) mantienen a miles de animales hacinados en piscinas o redes acuáticas, sufriendo estrés severo, falta de oxígeno y propagación de parásitos.
            </li>
            <li>
              <strong>Experimentación Científica:</strong> Aunque existe un código ético llamado "Las 3R" (Reemplazar, Reducir y Refinar el uso de animales), la realidad es que millones de ratones, perros, conejos y primates siguen siendo sometidos a pruebas de toxicidad, biotecnología y cosmética en laboratorios de todo el mundo.
            </li>
            <li>
              <strong>Ropa y Entretenimiento:</strong> Los animales continúan siendo criados y desollados por la industria peletera (pieles, cueros, lanas), y utilizados para el ocio humano en zoológicos, parques marinos y circos, donde se les priva sistemáticamente de todos sus comportamientos instintivos naturales.
            </li>
            <li>
              <strong>Pandemias y salud pública:</strong> Las granjas industriales, con miles de animales genéticamente uniformes y sistemas inmunitarios debilitados, son caldos de cultivo para enfermedades que pueden saltar a humanos. Aproximadamente el 70% de las enfermedades infecciosas emergentes son de origen animal (IPBES, 2020), y la gripe aviar, el SARS y el COVID-19 han mostrado la conexión directa entre la ganadería intensiva, la destrucción de hábitats y el riesgo pandémico global.
            </li>
          </ul>
        ),
        keyIdea: "El uso instrumental no se limita al plato: peces hacinados, experimentación, piel y ocio. Mismos principios, distintos escaparates.",
        analogy: { text: "Es el mismo músculo ético que mueve la granja industrial: el animal como insumo, esté en tu plato, en un tanque, en un laboratorio o en una jaula de circo." },
        pullQuote: "Se les priva sistemáticamente de todos sus comportamientos instintivos naturales.",
        didYouKnow: "Las '3R' de Russell y Burch (1959) nacieron para limitar la experimentación, pero el número absoluto de animales usados en laboratorios sigue creciendo cada década.",
        reflectionQuestion: {
          question: "Si te incomoda una sola de estas industrias, ¿qué tienen todas en común que las hace aceptables o inaceptables a la vez?",
          prompt: "Busca el principio que une, no el ejemplo que separa."
        }
      }
    ]
  },
  {
    id: "acto-5",
    num: "V",
    label: "Ecología",
    colorName: "bg-ch3",
    textColor: "text-ch3",
    hoverColor: "group-hover:text-ch3",
    desc: "Las devastadoras consecuencias climáticas y ambientales de la ganadería moderna.",
    title: "Ecología y Termodinámica",
    blocks: [
      {
        id: "la-ineficiencia-term",
        title: "La ineficiencia termodinámica",
        content: (
          <p>Para entender el problema ambiental, hay que mirar las leyes de la física. En la naturaleza, la energía se pierde cada vez que subimos un escalón en la cadena alimentaria. Si cultivamos vegetales y nos los comemos directamente, aprovechamos casi toda esa energía. Pero si cultivamos soja, se la damos de comer a una vaca durante años, y luego nos comemos a la vaca, el sistema colapsa. ¿Por qué? Porque la vaca gasta casi toda esa energía vegetal en mantenerse viva (respirar, moverse, generar calor corporal, desarrollar huesos). Se estima que por cada 100 calorías de cultivos que le damos a una vaca, solo nos devuelve unas 2 calorías en forma de carne. Usar a un animal como "intermediario" o "fábrica" para producir nuestra comida es el sistema energético más ineficiente jamás inventado.</p>
        ),
        keyIdea: "Cada salto en la cadena alimentaria pierde ~90% de la energía. Usar animales como 'fábricas' es el sistema más ineficiente posible.",
        analogy: { text: "Es como calentar tu casa quemando diez leños para sentir el calor de uno solo: el resto se va por la chimenea." },
        pullQuote: "Por cada 100 calorías de cultivos que damos a una vaca, nos devuelve apenas 2.",
          didYouKnow: "La Ley del 10% de Lindeman describe esta pérdida: en cada escalón trófico, ~90% de la energía se disipa como calor y metabolismo. Un estudio en Science (Poore & Nemecek, 2018) analizó 38.700 granjas en 119 países y encontró que los productos animales usan el 83% de la tierra agrícola global pero aportan solo el 18% de las calorías. Además, el 96% de la biomasa de mamíferos terrestres del planeta es ganado y humanos (Bar-On et al., 2018).",
        reflectionQuestion: {
          question: "Si el sistema pierde un 90% de energía en cada escalón, ¿por qué seguimos diseñando nuestra comida dando un rodeo por un animal?",
          prompt: "Piensa en términos de eficiencia, no de hábito."
        },
        deepDive: {
          id: "dd-la-ineficiencia-term",
          label: "este concepto",
          nodes: [
          {
            id: "ratio_conversion",
            label: "Ratio de Conversión",
            shortDesc: "Pérdida calórica masiva",
            content: (
              <p>Por cada 100 calorías de cultivos comestibles dados al ganado, solo se recuperan 3 calorías en forma de carne de vaca, haciendo que comer animales sea la forma más destructiva e ineficiente de alimentarnos a escala global.</p>
            )
          }
        ]
        }
      },
      {
        id: "la-p-rdida-de-espaci",
        title: "La pérdida de espacio y la Deforestación",
        content: (
          <p>A causa de esta ineficiencia brutal, necesitamos cantidades titánicas de comida para los animales. Actualmente, usamos cerca del 80% de todas las tierras agrícolas del mundo única y exclusivamente para pastos y para cultivar el pienso que comen los animales de granja. Como no hay suficiente espacio, la industria tala bosques milenarios. La ganadería es la causa número uno de deforestación en la Amazonía. Al destruir estos bosques, arrasamos con los hábitats de miles de animales salvajes, siendo la principal causa de la extinción masiva de especies que vivimos hoy.</p>
        ),
        keyIdea: "~80% de la tierra agrícola mundial se usa para criar animales, que aportan una porción minoritaria de las calorías humanas. La ineficiencia devora territorio.",
        analogy: { text: "Si una ciudad reservara el 80% de sus calles para moversa coches vacíos, sería un escándalo urbanístico. Esto es lo mismo, pero con selvas." },
        pullQuote: "La ganadería es la causa número uno de deforestación en la Amazonía.",
          didYouKnow: "La ganadería y el pienso para ganado son el principal motor de deforestación amazónica, por delante de la madera o la minería en superficie afectada. Un dato que sorprende: entre el 75% y el 80% de la soja cultivada en el mundo se destina a piensos para animales, no al consumo humano directo. El tofu y la leche de soja no son los responsables de la deforestación: lo es el filete.",
        reflectionQuestion: {
          question: "Si el 80% de la tierra agrícola alimenta a animales y no a personas, ¿de quién es hambre el que dicen resolver?",
          prompt: "Sigue las calorías, no las leyendas: ¿quién recibe el 80%?"
        }
      },
      {
        id: "la-huella-h-drica-y-",
        title: "La huella hídrica y el Cambio Climático",
        content: (
          <p>El coste de recursos es astronómico. Producir un solo kilogramo de carne de res requiere aproximadamente 15.400 litros de agua dulce, frente a los 4.000 litros de un kilogramo de legumbres o los 300 litros de la mayoría de vegetales (Mekonnen & Hoekstra, 2012). Por si fuera poco, el sistema digestivo de los rumiantes (vacas, ovejas) y la descomposición de sus excrementos liberan inmensas cantidades de metano, un gas de efecto invernadero que atrapa el calor en la atmósfera con una potencia unas 80 veces mayor que el CO₂ en un horizonte de 20 años. La ganadería es responsable de aproximadamente el 57% de las emisiones del sistema alimentario global (Poore & Nemecek, 2018), y la comunidad científica —incluida la comisión EAT-Lancet— coincide en que una transición hacia dietas con menos productos animales y más vegetales es una de las palancas más rápidas y efectivas para mitigar el cambio climático.</p>
        ),
        keyIdea: "Un kilo de carne de res cuesta ~15.400 litros de agua y emite metano 80 veces más potente que el CO₂. El 57% de las emisiones alimentarias vienen de productos animales.",
        analogy: { text: "Es como si cada burger viniera con una factura invisible: 15.400 litros de agua y un sobre de metano que pagamos entre todos, aunque no aparezca en la etiqueta." },
        pullQuote: "15.400 litros de agua por un kilo de carne. 4.000 por un kilo de legumbres.",
        didYouKnow: "El metano dura menos en la atmósfera que el CO₂, pero calienta ~80 veces más a 20 años. La comisión EAT-Lancet (2019) propuso una 'Dieta Planetaria' que limita la carne roja a 14 gramos al día —el equivalente a una albóndiga pequeña— para hacer el sistema alimentario sostenible.",
        reflectionQuestion: {
          question: "Si el precio real del filete incluye agua, selva y metano, ¿por qué la etiqueta solo muestra euros?",
          prompt: "Las externalidades existen aunque no las imprima el supermercado."
        }
      }
    ]
  },
  {
    id: "acto-6",
    num: "VI",
    label: "Marco Legal",
    colorName: "bg-ch6",
    textColor: "text-ch6",
    hoverColor: "group-hover:text-ch6",
    desc: "El estatus jurídico actual de los animales y las vías biotecnológicas hacia la liberación.",
    title: "Leyes, Tecnología y el Futuro",
    blocks: [
      {
        id: "el-despertar-legal-d",
        title: "El despertar legal: De \"cosas\" a \"seres sintientes\"",
        content: (
          <p>Durante siglos, los códigos civiles de casi todos los países consideraban a los animales literalmente como "bienes muebles" o propiedades, exactamente al mismo nivel legal que un coche o una silla. Afortunadamente, esta visión anticuada está cambiando. Muchos países, incluidos varios europeos y latinoamericanos, han modificado sus leyes para reconocer oficialmente a los animales como "seres vivos dotados de sintiencia". Aunque las leyes actuales de "bienestar animal" siguen siendo muy hipócritas (protegen a un perro de ser golpeado, pero permiten por ley mutilar a millones de cerdos en granjas), el simple hecho de que la ley reconozca oficialmente que "sienten" es la primera piedra. Abre la puerta a que, en el futuro, los jueces les otorguen protecciones reales y fundamentales contra el sufrimiento y el encierro.</p>
        ),
        keyIdea: "El derecho pasa de tratar al animal como 'cosa' a reconocerlo como 'ser sintiente'. Es la primera grieta para futuras protecciones reales.",
        analogy: { text: "Es como cuando la ley dejó de considerar 'propiedad' a ciertos humanos: el cambio de etiqueta legal no acabó la injusticia, pero la hizo por fin enunciabilidad jurídica." },
        pullQuote: "El simple hecho de que la ley reconozca que 'sienten' es la primera piedra.",
          didYouKnow: "Varios países ya reformaron sus códigos civiles para desclasificar a los animales del capítulo de 'bienes muebles', un cambio de redacción con consecuencias legales reales. Francia, Austria, Alemania, Suiza y Colombia, entre otros, ya reconocen a los animales como seres sintientes en sus códigos civiles. La Declaración de Toulon (2019), firmada por juristas europeos, es la contraparte jurídica de la Declaración de Cambridge: pide formalmente que los animales dejen de ser considerados 'cosas' ante la ley.",
        reflectionQuestion: {
          question: "Si la ley admite que el animal siente pero sigue permitiendo su mutilación masiva, ¿es coherente o es un parche para dormir la conciencia?",
          prompt: "Una ley puede reconocer y permitir a la vez: ahí está la pregunta."
        },
        deepDive: {
          id: "dd-el-despertar-legal-d",
          label: "este concepto",
          nodes: [
          {
            id: "descosificacion",
            label: "Descosificación",
            shortDesc: "El animal ya no es 'cosa'",
            content: (
              <p>Recientes reformas en códigos civiles de varios países han dejado de clasificar a los animales como objetos (como si fueran una silla o un coche) para reconocerlos jurídicamente como seres sintientes con intereses propios.</p>
            )
          }
        ]
        }
      },
      {
        id: "nuevas-fronteras-en-",
        title: "Nuevas fronteras en los tribunales: El Habeas Corpus",
        content: (
          <p>Más allá de las leyes de bienestar, algunos abogados pioneros están usando herramientas legales revolucionarias. Están presentando recursos de Habeas corpus —una figura jurídica inventada hace siglos para liberar a seres humanos encarcelados injustamente— para defender a los animales. Su objetivo es sacar a animales cognitivamente complejos (como chimpancés, orangutanes u elefantes) de zoológicos, argumentando ante los jueces que estos animales no son "cosas", sino "personas no humanas" que merecen el derecho básico a la libertad corporal en un santuario.</p>
        ),
        keyIdea: "El Habeas Corpus, creado para liberar humanos encarcelados injustamente, se está usando ya para sacar a grandes simios y elefantes de jaulas.",
        analogy: { text: "Es pedirle al juez la misma herramienta que liberó a un preso injusto, pero para un chimpancé encerrado sin delito." },
        pullQuote: "No son 'cosas', sino 'personas no humanas' con derecho a la libertad corporal.",
          didYouKnow: "El Nonhuman Rights Project, fundado por el abogado Steven Wise (autor de 'Rattling the Cage', 2000), ha presentado recursos de Habeas Corpus para chimpancés y osos en EE.UU. En Argentina, la jueza Elena Liberatori falló a favor del Habeas Corpus de la orangutana Sandra (2015), reconociéndola como 'persona no humana', y la jueza María Alejandra Mauricio hizo lo mismo con la chimpancé Cecilia en Mendoza (2016), ordenando su traslado al santuario de Sorocaba, Brasil.",
        reflectionQuestion: {
          question: "Si aceptamos que un chimpancé tiene interés en no estar en una jaula, ¿qué diferencia relevante justifica que sí esté en una?",
          prompt: "Si la respuesta es 'su especie', vuelve al concepto de especismo."
        },
        deepDive: {
          id: "dd-nuevas-fronteras-en-",
          label: "este concepto",
          nodes: [
          {
            id: "habeas_corpus",
            label: "Habeas Corpus",
            shortDesc: "Derechos fundamentales",
            content: (
              <p>Iniciativas legales han logrado liberar a individuos (como chimpancés y osos) usando la herramienta legal del Habeas Corpus, reconociendo que tienen un derecho fundamental a la libertad corporal.</p>
            ),
            children: [
              {
                id: "persona_no_humana",
                label: "Persona No Humana",
                shortDesc: "Estatus jurídico elevado",
                content: (
                  <p>Este concepto jurídico otorga derechos básicos a ciertos animales sin equipararlos a los humanos. Es el reconocimiento de que alguien "es" un individuo ante la ley, no "algo".</p>
                )
              }
            ]
          }
        ]
        }
      },
      {
        id: "la-revoluci-n-tecnol",
        title: "La Revolución Tecnológica",
        content: (
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Agricultura Celular (Carne Cultivada):</strong> No es ciencia ficción, es biología celular. Consiste en tomar una pequeña muestra de células de un animal vivo (como una pequeña biopsia, sin hacerle daño) y poner esas células en un tanque especial lleno de nutrientes. Las células se multiplican y forman tejido real. El resultado es carne 100% real, pero producida sin criar, encerrar ni matar a ningún animal, utilizando un 90% menos de tierra y agua.
            </li>
            <li>
              <strong>Fermentación de precisión:</strong> Se utilizan microorganismos (como levaduras) que son "programados" para crear exactamente las mismas proteínas de la leche de vaca o la clara del huevo. Se elabora en tanques de fermentación, similar a como hacemos la cerveza o el queso hoy en día, logrando lácteos idénticos pero sin vacas.
            </li>
            <li>
              <strong>Alternativas vegetales (Plant-based):</strong> Productos que ya están en los supermercados, que mediante combinaciones avanzadas de proteínas de guisantes, soja y grasas vegetales, logran replicar perfectamente el sabor, la textura e incluso el sangrado de la carne tradicional.
            </li>
          </ul>
        ),
        keyIdea: "Tres caminos técnicos ya reales —carne cultivada, fermentación de precisión y plant-based— que reproducen el producto sin necesidad de criar, encerrar ni matar.",
        analogy: { text: "Es como si para tener cerveza tuvieras que criar y sacrificar cervezas vivas; ya no: fermentamos. La próxima revolución es fermentar o cultivar proteína animal sin el animal." },
        pullQuote: "Carne 100% real, sin criar, encerrar ni matar, usando 90% menos de tierra y agua.",
        didYouKnow: "Singapur y EE.UU. (FDA) ya aprobaron venta comercial de carne cultivada: no es futuro lejano, es catálogo regulatorio actual.",
        reflectionQuestion: {
          question: "Si mañana tuvieras el mismo producto sin animal de por medio, ¿qué excusa ética te quedaría para seguir prefiriendo el que sí lo tiene?",
          prompt: "Cuando la tecnología disuelve la necesidad, lo que queda es preferencia. Pregunta honesta."
        }
      }
    ]
  }
];
