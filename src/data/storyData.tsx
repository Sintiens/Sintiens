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
    label: "Sintiencia & BiologÃ­a",
    colorName: "bg-ch1",
    textColor: "text-ch1",
    hoverColor: "group-hover:text-ch1",
    desc: "Evidencia neurocientÃ­fica empÃ­rica sobre la capacidad de sufrir de los animales no humanos.",
    title: "Fundamentos BiolÃ³gicos",
    blocks: [
      {
        title: "Sustratos NeurolÃ³gicos",
        content: (
          <p>La materia de este planeta se organizÃ³ de tal forma que <em>despertÃ³</em>. La sintiencia no es exclusividad humana. Como reitera la DeclaraciÃ³n de Cambridge sobre la Conciencia (2012), todos los mamÃ­feros, aves, y otras especies comparten los mismos sustratos neurolÃ³gicos que generan la experiencia consciente.</p>
        ),
        treeData: [
          {
            id: "cambridge",
            label: "Profundizar: Manifiesto",
            category: "deepen",
            shortDesc: "Leer el texto completo",
            content: (
              <div className="space-y-2">
                <p>Firmada en 2012 por destacados neurocientÃ­ficos, establece que <strong>la ausencia de un neocÃ³rtex no impide que un organismo experimente estados afectivos</strong>.</p>
                <p>Se confirmÃ³ que aves, mamÃ­feros e incluso pulpos poseen los sustratos neuroanatÃ³micos equivalentes a los humanos.</p>
              </div>
            ),
            children: [
              {
                id: "pulpos",
                label: "Subrama: Pulpos",
                category: "subtopic",
                shortDesc: "Mentes descentralizadas",
                content: (
                  <p>La inclusiÃ³n explÃ­cita de pulpos marcÃ³ un hito: demostrÃ³ que la inteligencia y la consciencia pueden evolucionar en ramas evolutivas completamente separadas de la nuestra, usando arquitecturas neuronales descentralizadas.</p>
                )
              }
            ]
          },
          {
            id: "related_brains",
            label: "Relacionado: IA vs BiologÃ­a",
            category: "related",
            shortDesc: "El sustrato de silicio",
            content: (
              <p>Aunque aquÃ­ hablamos de biologÃ­a, el mismo marco se aplica para preguntarnos si las redes neuronales artificiales avanzadas podrÃ­an algÃºn dÃ­a requerir consideraciÃ³n moral.</p>
            )
          }
        ]
      },
      {
        title: "NocicepciÃ³n vs Dolor",
        content: (
          <p>
            Es crucial entender la diferencia entre{' '}
            <GlossaryWord word="nocicepciÃ³n">
              La nocicepciÃ³n es la capacidad del sistema nervioso para detectar estÃ­mulos nocivos (mecÃ¡nicos, tÃ©rmicos o quÃ­micos) que pueden daÃ±ar el tejido. Es un reflejo primario, presente incluso en organismos sin sistema nervioso central complejo.
            </GlossaryWord>{' '}
            (un reflejo autÃ³mata ante el daÃ±o, como retirar la mano del fuego) y el dolor subjetivo consciente. Este Ãºltimo requiere una dimensiÃ³n afectiva: estrÃ©s crÃ³nico, miedo y evaluaciÃ³n cognitiva. Hoy sabemos que los peces y aves analizan el dolor y lo gestionan para sobrevivir, evidenciando un procesamiento emocional real.
          </p>
        ),
        treeData: [
          {
            id: "dolor_peces",
            label: "NocicepciÃ³n vs Dolor",
            shortDesc: "Peces y dolor subjetivo",
            content: (
              <div className="space-y-2">
                <p>Existe un mito comÃºn de que los peces no sienten dolor, sino que solo tienen "nocicepciÃ³n" (reflejos autÃ³matas).</p>
                <p>Sin embargo, estudios recientes muestran que cambian su comportamiento a largo plazo tras un daÃ±o y responden a analgÃ©sicos.</p>
              </div>
            )
          }
        ]
      },
      {
        title: "EtologÃ­a y CogniciÃ³n",
        content: (
          <p>MÃ¡s allÃ¡ del dolor, la etologÃ­a nos demuestra que vacas y cerdos poseen vÃ­nculos sociales profundos, memoria episÃ³dica, sufren duelo por separaciÃ³n y resuelven problemas lÃ³gicos. Son, bajo cualquier estÃ¡ndar biolÃ³gico moderno, individuos con un rico "universo interior" y una voluntad de vivir innegable.</p>
        ),
        treeData: [
          {
            id: "duelo",
            label: "Duelo y Memoria",
            shortDesc: "Luto por separaciÃ³n",
            content: (
              <div className="space-y-2">
                <p>Las vacas y cerdos muestran signos claros de duelo y ansiedad severa cuando son separados de sus crÃ­as o compaÃ±eros. Tienen memoria episÃ³dica a largo plazo.</p>
              </div>
            )
          }
        ]
      }
    ]
  },
  {
    id: "acto-2",
    num: "II",
    label: "FilosofÃ­a & Ã‰tica",
    colorName: "bg-ch4",
    textColor: "text-ch4",
    hoverColor: "group-hover:text-ch4",
    desc: "AnÃ¡lisis moral del especismo y disecciÃ³n de los argumentos que justifican la explotaciÃ³n.",
    title: "FilosofÃ­a, Ã‰tica y Moral",
    blocks: [
      {
        title: "El Criterio Moral",
        content: (
          <p>Si aceptamos empÃ­ricamente que sienten, Â¿quÃ© obligaciones morales se derivan de ello? HistÃ³ricamente, el mecanicismo cartesiano negaba su consciencia. Fue el utilitarismo clÃ¡sico quien desplazÃ³ la barrera: "La cuestiÃ³n no es si pueden razonar, sino si pueden sufrir" (Bentham).</p>
        ),
        treeData: [
          {
            id: "cartesianismo",
            label: "Mecanicismo de Descartes",
            shortDesc: "Animales como autÃ³matas",
            content: (
              <p>Descartes argumentÃ³ que los animales eran literalmente mÃ¡quinas de relojerÃ­a sin alma ni mente, justificando asÃ­ la vivisecciÃ³n sin anestesia.</p>
            )
          }
        ]
      },
      {
        title: "Especismo",
        content: (
          <p>Excluir de la protecciÃ³n moral a un individuo Ãºnicamente por su especie biolÃ³gica es un prejuicio injustificado que denominamos <strong>especismo</strong>. FilÃ³sofos como Peter Singer nos presentan el 'Argumento de los Casos Marginales': si usamos la racionalidad superior como condiciÃ³n para otorgar el derecho a vivir, excluirÃ­amos lÃ³gicamente a bebÃ©s humanos y a personas con severa diversidad funcional.</p>
        ),
        treeData: [
          {
            id: "casos_marginales",
            label: "Argumento de Casos Marginales",
            shortDesc: "La falacia de la inteligencia",
            content: (
              <div className="space-y-2">
                <p>Si justificamos comer cerdos "porque son menos inteligentes", entonces para ser lÃ³gicamente consistentes, el nivel de inteligencia deberÃ­a dictar el derecho a la vida en todas las especies, incluida la nuestra.</p>
                <p>Esto demuestra que la inteligencia no es la base de la consideraciÃ³n moral, sino la sintiencia.</p>
              </div>
            )
          }
        ]
      },
      {
        title: "Bienestarismo vs Abolicionismo",
        content: (
          <p>La Ã©tica contemporÃ¡nea se divide entre el 'Bienestarismo' (que justifica la explotaciÃ³n siempre que el dolor sea "mÃ­nimo") y el 'Abolicionismo' (que exige reconocerlos como 'sujetos-de-una-vida' con valor intrÃ­nseco e irremplazable, prohibiendo rotundamente su cosificaciÃ³n legal y su uso como recursos).</p>
        )
      }
    ]
  },
  {
    id: "acto-3",
    num: "III",
    label: "PsicologÃ­a Humana",
    colorName: "bg-ch5",
    textColor: "text-ch5",
    hoverColor: "group-hover:text-ch5",
    desc: "Mecanismos de disonancia cognitiva y sesgos que nos desconectan del dolor.",
    title: "PsicologÃ­a Humana",
    blocks: [
      {
        title: "La Paradoja de la Carne",
        content: (
          <p>Â¿CÃ³mo convivimos diariamente con este choque de valores? La inmensa mayorÃ­a condena el maltrato animal, pero financia industrias masivas de aniquilaciÃ³n. La psicologÃ­a define esto como la <strong>"Paradoja de la Carne"</strong>, sosteniendo una profunda disonancia cognitiva.</p>
        ),
        treeData: [
          {
            id: "disonancia",
            label: "Disonancia Cognitiva",
            shortDesc: "TensiÃ³n psicolÃ³gica",
            content: (
              <p>Es la incomodidad mental que experimentamos al tener creencias contradictorias. Amamos a los animales, pero comemos animales. Para resolver la tensiÃ³n, solemos cambiar nuestras creencias ("no sufren tanto", "es necesario") en lugar de cambiar nuestras acciones.</p>
            )
          }
        ]
      },
      {
        title: "CompartimentaciÃ³n",
        content: (
          <p>Para amortiguar esta fractura mental, recurrimos a una compartimentaciÃ³n sociocultural inducida desde la infancia. Etiquetamos arbitrariamente: unos son familia (mascotas), otros son recursos (cerdos, aves) y otros plagas (roedores). SimultÃ¡neamente, el lenguaje enmascara la violencia mediante 'referentes ausentes' (hablamos de salchichas y filetes, no de partes de un ser desmembrado).</p>
        )
      },
      {
        title: "Consistencia Moral",
        content: (
          <p>Alcanzar la <strong>consistencia moral</strong> no implica adquirir nuevos y radicales valores, sino simplemente alinear nuestras decisiones diarias con nuestra capacidad humana ya existente de buscar la paz y evitar el daÃ±o innecesario.</p>
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
    desc: "Estructuras e industrias diseÃ±adas para la instrumentalizaciÃ³n y cosificaciÃ³n sistemÃ¡tica.",
    title: "Antropocentrismo y Sistemas",
    blocks: [
      {
        title: "OrÃ­genes NeolÃ­ticos",
        content: (
          <p>La brecha psicolÃ³gica la cruzamos hace milenios. Con la domesticaciÃ³n agrÃ­cola en el NeolÃ­tico, sometimos a otras especies forzando su reproducciÃ³n. El animal dejÃ³ de ser un compaÃ±ero biolÃ³gico para convertirse en un eslabÃ³n tecnolÃ³gico y en la primera forma de "propiedad" humana.</p>
        )
      },
      {
        title: "Hacinamiento Industrial",
        content: (
          <p>Pero la verdadera ruptura total llegÃ³ con las granjas factorÃ­a y el hacinamiento industrial. Transformamos al animal en una simple mercancÃ­a en una cadena de ensamblaje. Su confinamiento intensivo, los ciclos de engorde mutilantes y las operaciones de asfixia pesquera despojan a billones de seres de cualquier conducta biolÃ³gica natural.</p>
        ),
        treeData: [
          {
            id: "granjas_factoria",
            label: "Granjas FactorÃ­a (CAFO)",
            shortDesc: "Operaciones concentradas",
            content: (
              <p>Las Operaciones Concentradas de AlimentaciÃ³n Animal (CAFOs) encierran a miles de individuos sin acceso a luz solar ni espacio para darse la vuelta, maximizando el margen de beneficio corporativo a costa del colapso biolÃ³gico del animal.</p>
            )
          }
        ]
      },
      {
        title: "AmpliaciÃ³n de la Maquinaria",
        content: (
          <p>Y la maquinaria se extiende: desde la explotaciÃ³n de visones y pieles, pasando por la experimentaciÃ³n biomÃ©dica bajo la deficiente premisa de las '3R', hasta llegar a su manifestaciÃ³n mÃ¡s absurda: el sometimiento animal puramente para entretenimiento en zoolÃ³gicos y tauromaquia.</p>
        )
      }
    ]
  },
  {
    id: "acto-5",
    num: "V",
    label: "EcologÃ­a",
    colorName: "bg-ch3",
    textColor: "text-ch3",
    hoverColor: "group-hover:text-ch3",
    desc: "Las devastadoras consecuencias climÃ¡ticas y ambientales de la ganaderÃ­a moderna.",
    title: "Impacto SistÃ©mico y EcolÃ³gico",
    blocks: [
      {
        title: "TermodinÃ¡mica TrÃ³fica",
        content: (
          <p>Si ignoramos la moral, nos topamos de frente con la fÃ­sica termodinÃ¡mica y los lÃ­mites planetarios. Usar a un animal como puente para asimilar nutrientes de la tierra es una colosal ineficiencia calÃ³rica. Cerca del 90% de la energÃ­a del forraje que come el ganado se pierde metabÃ³licamente en lugar de convertirse en alimento humano final.</p>
        ),
        treeData: [
          {
            id: "ratio_conversion",
            label: "Ratio de ConversiÃ³n",
            shortDesc: "PÃ©rdida calÃ³rica masiva",
            content: (
              <p>Por cada 100 calorÃ­as de cultivos comestibles dados al ganado, solo se recuperan 3 calorÃ­as en forma de carne de vaca, haciendo que comer animales sea la forma mÃ¡s destructiva e ineficiente de alimentarnos a escala global.</p>
            )
          }
        ]
      },
      {
        title: "Huella Territorial",
        content: (
          <p>Por esta razÃ³n puramente matemÃ¡tica, la ganaderÃ­a utiliza casi el 80% de todas las tierras de cultivo del globo, provocando una masiva deforestaciÃ³n (en el Amazonas para soja y pastizales), extinguiendo aceleradamente la biodiversidad silvestre nativa y dejando una profunda huella hÃ­drica y tÃ³xica.</p>
        )
      },
      {
        title: "Crisis ClimÃ¡tica",
        content: (
          <p>SimultÃ¡neamente, la crÃ­a masiva es el motor de la sexta extinciÃ³n masiva, y las emisiones de gases como metano y Ã³xido nitroso son uno de los grandes culpables de la crisis climÃ¡tica global, superando a todo el sector de transporte combinado.</p>
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
    desc: "El estatus jurÃ­dico actual de los animales y las vÃ­as biotecnolÃ³gicas hacia la liberaciÃ³n.",
    title: "Marco Legal y TransiciÃ³n",
    blocks: [
      {
        title: "Bienes Muebles",
        content: (
          <p>HistÃ³ricamente, los cÃ³digos legales catalogaron a los animales como "bienes muebles" (cosas). Gracias a la presiÃ³n cientÃ­fica y Ã©tica, estamos comenzando a reclasificarlos como "seres vivos dotados de sensibilidad", la primera gran victoria legal.</p>
        ),
        treeData: [
          {
            id: "descosificacion",
            label: "DescosificaciÃ³n",
            shortDesc: "El animal ya no es 'cosa'",
            content: (
              <p>Recientes reformas en cÃ³digos civiles de varios paÃ­ses han dejado de clasificar a los animales como objetos (como si fueran una silla o un coche) para reconocerlos jurÃ­dicamente como seres sintientes con intereses propios.</p>
            )
          }
        ]
      },
      {
        title: "Bienestarismo Legal",
        content: (
          <p>A pesar de ello, la 'LegislaciÃ³n de Bienestar Animal' sigue operando en gran medida como un manual que instruye 'cÃ³mo maltratar legalmente' a un animal de granja, perdonando sistemÃ¡ticamente prÃ¡cticas crueles en nombre de la rentabilidad estÃ¡ndar. Las lagunas que permiten asfixia, confinamiento de jaulas y mutilaciones sin analgesia siguen blindadas por los ministerios agrÃ­colas.</p>
        )
      },
      {
        title: "Rutas de LiberaciÃ³n",
        content: (
          <p>La esperanza del futuro yace en una transiciÃ³n estructural: el auge de la biotecnologÃ­a como la fermentaciÃ³n de precisiÃ³n y la agricultura celular, y movimientos jurÃ­dicos inauditos como los litigios de <em>Habeas Corpus</em>, que buscan arrancar a los individuos biolÃ³gicos de su condiciÃ³n de mercancÃ­a, transformÃ¡ndolos oficialmente ante la corte en personas no-humanas libres.</p>
        ),
        treeData: [
          {
            id: "habeas_corpus",
            label: "Habeas Corpus",
            shortDesc: "Derechos fundamentales",
            content: (
              <p>Iniciativas legales han logrado liberar a individuos (como chimpancÃ©s y osos) usando la herramienta legal del Habeas Corpus, reconociendo que tienen un derecho fundamental a la libertad corporal.</p>
            ),
            children: [
              {
                id: "persona_no_humana",
                label: "Persona No Humana",
                shortDesc: "Estatus jurÃ­dico elevado",
                content: (
                  <p>Este concepto jurÃ­dico otorga derechos bÃ¡sicos a ciertos animales sin equipararlos a los humanos. Es el reconocimiento de que alguien "es" un individuo ante la ley, no "algo".</p>
                )
              }
            ]
          }
        ]
      }
    ]
  }
];
