// Shared helpers to build the glossary matching regex used by the text
// renderers. Kept in one place so the (expensive, module-level) regex
// construction is never duplicated.

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function lettersClass(extraBoundaryChars: string): string {
  return `a-zA-ZáéíóúÁÉÍÓÚñÑ${escapeRegExp(extraBoundaryChars)}`;
}

/**
 * Builds a single alternation regex that matches any of the given patterns
 * as a standalone word (not a substring of a larger word). Patterns are
 * sorted by length so longer terms win over shorter prefixes.
 *
 * Sin lookbehind (no soportado en Safari < 16.4, donde reventaría al
 * construirlo): el límite IZQUIERDO se valida en `splitGlossaryText`,
 * que es el único consumidor; el límite derecho usa lookahead (universal).
 */
export function buildGlossaryRegex(
  patterns: string[],
  extraBoundaryChars = ""
): RegExp {
  const sorted = [...patterns].sort((a, b) => b.length - a.length);
  const escaped = sorted.map(escapeRegExp).join("|");
  const boundaryClass = `[^${lettersClass(extraBoundaryChars)}]`;
  return new RegExp(`(${escaped})(?=$|${boundaryClass})`, "gi");
}

/**
 * Reemplazo directo de `text.split(glossaryRegex)` con la misma forma de
 * salida (pares = texto normal, impares = término del glosario) y con el
 * límite izquierdo verificado a mano: inicio de cadena o carácter que no
 * sea letra. Solo se usa con regex construidos por `buildGlossaryRegex`.
 */
export function splitGlossaryText(
  text: string,
  regex: RegExp,
  extraBoundaryChars = ""
): string[] {
  const wordChar = new RegExp(`[${lettersClass(extraBoundaryChars)}]`);
  const parts: string[] = [];
  let last = 0;
  regex.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    const start = match.index;
    if (start > 0 && wordChar.test(text[start - 1]!)) {
      // El término está pegado a una letra anterior: no es palabra completa.
      // Reintenta desde el carácter siguiente; ninguna otra alternativa de la
      // alternación pasaría el límite izquierdo en esta misma posición.
      regex.lastIndex = start + 1;
      continue;
    }
    parts.push(text.slice(last, start), match[0]);
    last = start + match[0].length;
  }
  parts.push(text.slice(last));
  return parts;
}
