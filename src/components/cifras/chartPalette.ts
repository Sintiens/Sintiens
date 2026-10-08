/**
 * Paleta de datos oficial de la sección Cifras.
 * Valores RGB computados de los tokens --ch1…--ch6 de index.css (idénticos en
 * tema claro y oscuro). Semántica de uso:
 *   ch1 rojo     → impacto animal / pérdida / riesgo
 *   ch2 amarillo → avisos, pienso, etapas industriales
 *   ch3 naranja  → tierra, proceso, categorías altas
 *   ch4 azul     → agua, transporte, pesca
 *   ch5 violeta  → «otros», proyecciones
 *   ch6 verde    → vegetal, ahorro, solución
 * Ejes y series neutras usan CHART_AXIS; la rejilla, CHART_GRID.
 */

export const CHART_SERIES = {
  ch1: "rgb(232, 88, 84)",
  ch2: "rgb(230, 184, 22)",
  ch3: "rgb(190, 101, 23)",
  ch4: "rgb(58, 147, 230)",
  ch5: "rgb(158, 119, 220)",
  ch6: "rgb(142, 192, 83)"
} as const;

/** Gris neutro de ejes/ticks y series «otros» (funciona en ambos temas). */
export const CHART_AXIS = "#71717a";
/** Grises secundarios para etapas neutrales. */
export const CHART_NEUTRAL_LIGHT = "#9aa1a9";
export const CHART_NEUTRAL_DARK = "#6b7280";

/** Rejilla tenue común. */
export const CHART_GRID = "rgba(113, 113, 122, 0.18)";

/** Estilo único de tooltip (los tokens CSS se resuelven por tema de forma nativa). */
export const CHART_TOOLTIP_STYLE = {
  backgroundColor: "var(--surface-container)",
  borderColor: "var(--outline)",
  color: "var(--on-surface)",
  borderRadius: "0.75rem",
  fontSize: "12px",
  fontFamily: "JetBrains Mono, monospace",
  whiteSpace: "normal",
  maxWidth: "min(320px, 80vw)"
} as const;
