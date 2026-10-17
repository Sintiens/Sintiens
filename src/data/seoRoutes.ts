import type { TabType } from "../types";

export type SeoEntry = {
  title: string;
  description: string;
  path: string;
};

/** Metadatos por pestaña. Fuente única para cliente (Helmet) y servidor (inyección SEO). */
export const TAB_SEO: Record<TabType, SeoEntry> = {
  historia_narrativa: {
    title: "Sintiens — ¿Qué vidas importan?",
    description:
      "Un análisis crítico, científico y filosófico sobre nuestra relación con los animales y los axiomas morales que la sostienen.",
    path: "/",
  },
  grafo: {
    title: "Glosario interactivo — Sintiens",
    description:
      "Explora los conceptos clave del debate: sintiencia, especismo, disonancia cognitiva y más, conectados en un grafo navegable.",
    path: "/glosario",
  },
  cronologia: {
    title: "Cronología del debate — Sintiens",
    description:
      "De Bentham a la Declaración de Nueva York: los hitos científicos, éticos y legales de nuestra relación con los animales.",
    path: "/argumento/cronologia",
  },
  dialectica: {
    title: "Crítica de excusas y dilemas — Sintiens",
    description:
      "33 tesis analizadas: falacias habituales, dilemas reales y consensos científicos sobre el consumo de animales.",
    path: "/argumento/critica",
  },
  calculadora: {
    title: "Calculadora de impacto — Sintiens",
    description:
      "Calcula tu huella: vidas de animales, agua virtual y emisiones asociadas a tus hábitos de consumo.",
    path: "/laboratorio/impacto",
  },
  validador: {
    title: "Descompón tu argumento — Sintiens",
    description:
      "Somete tus razones a una deconstrucción socrática, científica y bioética con la IA dialéctica de Sintiens.",
    path: "/laboratorio/descomponer",
  },
  datos: {
    title: "Cifras y evidencia — Sintiens",
    description:
      "Datos empíricos con fuentes trazables: emisiones, uso del suelo, biomasa, antibióticos y paradoja de la carne.",
    path: "/argumento/cifras",
  },
  noticias: {
    title: "Noticias — Sintiens",
    description:
      "Avances científicos, legales y sociales sobre sintiencia animal y transición alimentaria, verificados y con fuentes.",
    path: "/noticias",
  },
  laboratorio_hub: {
    title: "Laboratorio — Sintiens",
    description:
      "7 herramientas interactivas para experimentar con la ética, la física y la biología de nuestra relación con los animales.",
    path: "/laboratorio",
  },
  velo_rawls: {
    title: "Velo rawlsiano — Sintiens",
    description:
      "¿Qué sistema elegirías sin saber en qué cuerpo nacerás? El experimento de justicia de Rawls aplicado a todas las especies.",
    path: "/laboratorio/velo-rawls",
  },
  termodinamica: {
    title: "Matriz termodinámica — Sintiens",
    description:
      "La regla del 10% de Lindeman: por qué convertir plantas en carne desperdicia hasta el 90% de la energía.",
    path: "/laboratorio/termodinamica",
  },
  neurobiologia: {
    title: "Neurobiología de la sintiencia — Sintiens",
    description:
      "Homología neural, Cambridge 2012 y Nueva York 2024: la evidencia de la consciencia animal.",
    path: "/laboratorio/neurobiologia",
  },
  nutricion: {
    title: "Nutrición comparada — Sintiens",
    description:
      "Proteína, B12, hierro, calcio y omega-3 sin mitos: biodisponibilidad molecular y evidencia dietética.",
    path: "/laboratorio/nutricion",
  },
  welfarewashing: {
    title: "Detector de welfarewashing — Sintiens",
    description:
      "Derecho comparado de la UE y dictámenes EFSA para detectar el maquillaje del bienestar animal.",
    path: "/laboratorio/welfarewashing",
  },
};

export const LEGAL_SEO: SeoEntry = {
  title: "Privacidad y aviso legal — Sintiens",
  description:
    "Cómo trata Sintiens tus datos: servicios de IA (Google Gemini), tipografías de Google Fonts, almacenamiento local, derechos y condiciones de uso.",
  path: "/privacidad",
};

/** Rutas canónicas conocidas (sin contar /noticias?id=*). */
export const KNOWN_SEO_PATHS = new Set<string>([
  ...Object.values(TAB_SEO).map((entry) => entry.path),
  LEGAL_SEO.path,
]);
