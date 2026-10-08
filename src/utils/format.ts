/**
 * Formateo numérico único de la web (locale es-ES).
 * Evita mezclar `toFixed` (punto decimal) con `toLocaleString` (coma decimal).
 */

const cache = new Map<number, Intl.NumberFormat>();

function getFormatter(maximumFractionDigits: number, minimumFractionDigits = 0): Intl.NumberFormat {
  const key = maximumFractionDigits * 10 + minimumFractionDigits;
  let nf = cache.get(key);
  if (!nf) {
    nf = new Intl.NumberFormat("es-ES", { maximumFractionDigits, minimumFractionDigits });
    cache.set(key, nf);
  }
  return nf;
}

/** Formatea un número con separadores es-ES. decimals = máximo de decimales. */
export function formatEs(value: number, decimals = 0): string {
  if (!Number.isFinite(value)) return "—";
  return getFormatter(decimals).format(value);
}

/** Igual que formatEs pero asegura al menos `min` decimales. */
export function formatEsFixed(value: number, decimals: number): string {
  if (!Number.isFinite(value)) return "—";
  return getFormatter(decimals, decimals).format(value);
}
