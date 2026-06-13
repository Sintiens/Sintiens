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
          <p>A menudo confundimos estar vivos con ser sintientes, pero la biología marca una línea clara. Una planta está viva, crece y busca la luz; un termostato de pared reacciona al frío encendiendo la calefacción. Sin embargo, ninguno de los dos es "sintiente". La <strong>sintiencia</strong> es la capacidad de tener experiencias subjetivas. Significa que el animal no es un simple mecanismo biológico, sino que tiene una perspectiva propia del mundo. Un ser sintiente es capaz de experimentar sensaciones positivas (como el placer, el apego o la comodidad) y negativas (como el dolor, el miedo o la frustración).</p>
        ),
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
            <p>Para entender el sufrimiento animal, la ciencia hace una distinción vital entre dos procesos corporales:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>La Nocicepción (El reflejo biológico):</strong> Es el sistema de alarma automático del cuerpo. Imagina que tocas una estufa ardiendo; tu mano se retira sola una fracción de segundo antes de que te des cuenta de lo que ha pasado. Ese reflejo es físico, ocurre en los nervios y la médula espinal, y no requiere conciencia.
              </li>
              <li>
                <strong>El Dolor (El sufrimiento consciente):</strong> Es la experiencia emocional, profundamente desagradable, que ocurre en el cerebro después del reflejo. Es el sufrimiento real.
              </li>
            </ul>
            <p>Durante mucho tiempo, algunos científicos creían que los animales solo tenían nocicepción (actuaban por puro instinto, sin sufrir). Hoy, la neurobiología ha demostrado de forma irrefutable que los animales sufren el dolor al igual que nosotros. La evolución ha creado diferentes modelos de cerebros: el de un perro, el de un cuervo o el de un pulpo son físicamente distintos al nuestro, pero todos han desarrollado el mismo "software" neurológico necesario para sufrir, sentir terror o experimentar alegría.</p>
          </div>
        )
      },
      {
        id: "una-vida-interior-as",
        title: "Una vida interior asombrosamente compleja",
        content: (
          <p>La ciencia moderna (la etología) ha ido mucho más allá del dolor físico y ha descubierto que los animales tienen una vida cognitiva y emocional deslumbrante. No viven atrapados en un "presente perpetuo". Los estudios demuestran que muchas especies recuerdan eventos pasados para planificar su futuro, usan herramientas para resolver problemas y forman vínculos familiares de por vida. Hemos documentado cómo los elefantes y los grandes simios velan a sus muertos, mostrando comportamientos inconfundibles de luto, angustia y empatía profunda.</p>
        )
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
            <p>De aquí nace uno de los conceptos más importantes y debatidos de la actualidad: el Especismo. Se define como la discriminación de un individuo basándose única y exclusivamente en la especie a la que pertenece (de forma análoga al racismo o el sexismo).</p>
            <p>Para entenderlo, piensa en cómo nuestra cultura trata a un perro frente a un cerdo. Al perro lo consideramos parte de la familia; lo protegemos con leyes, le damos un nombre y lloramos si enferma. Al cerdo, a pesar de que la ciencia ha demostrado que es igual o más inteligente y sociable que el perro, lo encerramos en una granja industrial para convertirlo en comida. El especismo nos dice que esta diferencia de trato es totalmente arbitraria y carece de lógica moral.</p>
            <p>La filosofía nos invita a pensar en el conflicto de intereses: ¿Es ético sacrificar un interés fundamental de un animal (su deseo de vivir, no ser mutilado y no sentir dolor) solo para satisfacer un interés periférico de un ser humano (el deseo de comer un plato que le gusta durante 15 minutos, cuando tiene otras alternativas)?</p>
          </div>
        ),
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
                <strong>El Bienestarismo:</strong> Es la postura más común. Acepta que los humanos sigamos usando a los animales para comida o investigación, pero exige que minimicemos su sufrimiento. Pide jaulas más grandes, transporte menos cruel y aturdimiento antes de la muerte.
              </li>
              <li>
                <strong>El Abolicionismo (Derechos Animales):</strong> Esta postura argumenta que los seres sintientes no deben ser propiedad de nadie. Para ellos, hacer las jaulas un poco más grandes no soluciona el problema de fondo. Sostienen que, al igual que ocurrió con la esclavitud humana, el objetivo no debe ser tratar "amablemente" a los animales que usamos, sino dejar de usarlos como recursos.
              </li>
            </ul>
          </div>
        )
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
            <p>Nuestro cerebro utiliza varias estrategias fascinantes para apagar nuestra empatía:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>La Compartimentalización (Las "cajas" mentales):</strong> Subdividimos a los animales en categorías cerradas. La caja de "mascotas" (donde ponemos toda nuestra empatía), la caja de "comida" (donde apagamos la empatía) y la caja de "plagas". Al etiquetar a una vaca simplemente como "comida", le quitamos todo su valor psicológico.
              </li>
              <li>
                <strong>Minimizar la inteligencia del animal:</strong> Los estudios demuestran que, cuando las personas están a punto de comer carne, tienden a convencerse a sí mismas de que los animales de granja son tontos o que no sienten el dolor de la misma manera que nosotros. Es un mecanismo de defensa para justificar el acto.
              </li>
              <li>
                <strong>La invisibilidad y el lenguaje:</strong> El sistema está diseñado para que no veamos la realidad. Usamos palabras distanciadoras: decimos "ternera", "bacon", "jamón" o "filete" para no tener que pensar en una vaca, un cerdito o el músculo de un animal muerto. Además, los mataderos y las macrogranjas están construidos lejos de las ciudades, sin ventanas. Al no ver el proceso, la mente del consumidor nunca conecta el producto empaquetado en el supermercado con el animal vivo y respirando.
              </li>
            </ul>
          </div>
        )
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
          <p>A lo largo de los siglos, no solo hemos domesticado animales, sino que los hemos convertido en máquinas de producción mediante una cría selectiva implacable. El caso más claro es el del pollo de engorde. En la década de 1950, un pollo tardaba meses en crecer. Hoy, gracias a la manipulación genética, alcanzan el tamaño de mercado en apenas 40 días. Sus músculos (la pechuga) crecen a una velocidad biológicamente antinatural, lo que provoca que sus propios huesos se rompan y sus corazones colapsen por no poder soportar su propio peso.</p>
        )
      },
      {
        id: "la-ganader-a-industr",
        title: "La Ganadería Industrial (Factory Farming)",
        content: (
          <p>Para alimentar a miles de millones de personas de forma barata, el mundo pasó de las granjas tradicionales a las macrogranjas industriales. Estos sistemas se basan en el confinamiento extremo. Las gallinas ponedoras viven en jaulas de alambre tan estrechas que jamás pueden extender sus alas. Las cerdas reproductoras pasan la mayor parte de sus vidas en jaulas de metal del tamaño exacto de su cuerpo, donde no pueden ni siquiera darse la vuelta. Este nivel de encierro les causa un estrés psicológico y físico tan insoportable que, por pura desesperación, los animales empiezan a morderse y atacarse entre sí. ¿La solución de la industria? En lugar de darles más espacio, realizan mutilaciones rutinarias: les cortan los picos a las aves, y las colas y dientes a los cerditos, generalmente sin ningún tipo de anestesia.</p>
        ),
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
          </ul>
        )
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
        )
      },
      {
        id: "la-huella-h-drica-y-",
        title: "La huella hídrica y el Cambio Climático",
        content: (
          <p>El coste de recursos es astronómico. Se necesitan miles y miles de litros de agua dulce para producir un solo filete de carne (sumando el agua que bebe el animal, la limpieza y, sobre todo, el riego de sus cultivos). Por si fuera poco, el sistema digestivo de los rumiantes (vacas, ovejas) y el manejo de montañas de sus excrementos liberan inmensas cantidades de metano. El metano es un gas de efecto invernadero que atrapa el calor en la atmósfera con una potencia decenas de veces mayor que el CO2 a corto plazo, acelerando drásticamente el cambio climático.</p>
        )
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
        )
      }
    ]
  }
];
