// Shared helpers to build the glossary matching regex used by the text
// renderers. Kept in one place so the (expensive, module-level) regex
// construction is never duplicated.

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Builds a single alternation regex that matches any of the given patterns
 * as a standalone word (not a substring of a larger word). Patterns are
 * sorted by length so longer terms win over shorter prefixes.
 */
export function buildGlossaryRegex(
  patterns: string[],
  extraBoundaryChars = ""
): RegExp {
  const sorted = [...patterns].sort((a, b) => b.length - a.length);
  const escaped = sorted.map(escapeRegExp).join("|");
  const boundary = `^|[^a-zA-ZáéíóúÁÉÍÓÚñÑ${escapeRegExp(extraBoundaryChars)}]`;
  return new RegExp(`(?<=${boundary})(${escaped})(?=$|[^a-zA-ZáéíóúÁÉÍÓÚñÑ${escapeRegExp(extraBoundaryChars)}])`, "gi");
}
