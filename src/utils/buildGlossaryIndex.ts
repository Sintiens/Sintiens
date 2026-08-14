import { ReferenceDetail } from "../types";
import { CORE_NODES } from "../data/CORE_NODES";
import { DILEMMAS_DATA } from "../data/DILEMMAS_DATA";
import { GLOSSARY_UNIFIED, GlossaryEntry, GlossaryCategory } from "../data/glossaryUnified";

export type AppearanceLocation =
  | "nodo"
  | "dilema"
  | "acto"
  | "referencia";

export interface Appearance {
  locationId: string;
  locationType: AppearanceLocation;
  title: string;
  category?: GlossaryCategory;
  snippet: string;
  field?: string;
}

export interface GlossaryIndexEntry {
  termId: string;
  appearances: Appearance[];
  count: number;
  coOccurrences: Record<string, number>;
  centrality: number;
}

export type GlossaryIndex = Record<string, GlossaryIndexEntry>;

const ACT_TITLES: Record<string, { title: string; category: GlossaryCategory }> = {
  "acto-1": { title: "Acto I — Sintiencia & Biología", category: "sintiencia" },
  "acto-2": { title: "Acto II — Especismo & Ética", category: "etica" },
  "acto-3": { title: "Acto III — Psicología & Cultura", category: "psicologia" },
  "acto-4": { title: "Acto IV — Sistemas de Uso", category: "sistemas_uso" },
  "acto-5": { title: "Acto V — Ecología & Impacto", category: "ecologia" },
  "acto-6": { title: "Acto VI — Legal & Transición", category: "legal" }
};

const ACT_CONCEPT_MAP: Record<string, string[]> = {
  "acto-1": ["declaracion-cambridge", "frans-de-waal", "jennifer-ackerman", "sintiencia", "etologia", "nocicepcion", "snc", "cefalopodos"],
  "acto-2": ["bentham", "especismo", "abolicionismo", "singer", "ryder", "utilitarismo", "obra-liberacion-animal", "falacia-naturalista", "hume", "casos-marginales"],
  "acto-3": ["disonancia-cognitiva", "festinger", "melanie-joy", "carnismo", "paradoja-carne", "loughnan", "bastian", "safran-foer", "obra-comer-animales", "referente-ausente", "adams", "obra-sexual-politics-meat"],
  "acto-4": ["ganaderia-industrial", "tres-erres", "viviseccion", "cinco-libertades", "informe-brambell", "harrison", "obra-animal-machines", "mecanicismo-cartesiano", "descartes", "atuomiento", "zoonosis", "resistencia-bacteriana", "acuicultura"],
  "acto-5": ["termodinamica", "david-robinson-simon", "obra-meatonomics", "metano", "oxido-nitroso", "gases-efecto-invernadero", "rumiante", "deforestacion", "huella-hidrica", "antropoceno"],
  "acto-6": ["habeas-corpus", "steven-wise", "obra-rattling-cage", "agricultura-celular", "donaldson-kymlicka", "obra-zoopolis", "persona-no-humana", "cosificacion", "b12", "veganismo", "consistencia-moral", "enfoque-capacidades", "nussbaum", "obra-frontiers-justice", "declaracion-nueva-york", "declaracion-montreal"]
};

function extractSnippet(text: string, pattern: string, radius = 90): string {
  const idx = text.toLowerCase().indexOf(pattern.toLowerCase());
  if (idx === -1) return text.slice(0, radius * 2);
  const start = Math.max(0, idx - radius);
  const end = Math.min(text.length, idx + pattern.length + radius);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < text.length ? "…" : "";
  return `${prefix}${text.slice(start, end).trim()}${suffix}`;
}

function scanText(
  text: string,
  entry: GlossaryEntry,
  locationId: string,
  locationType: AppearanceLocation,
  title: string,
  category: GlossaryCategory | undefined,
  field: string
): Appearance[] {
  if (!text) return [];
  const results: Appearance[] = [];
  const lowerText = text.toLowerCase();
  for (const pat of entry.patterns) {
    const patLower = pat.toLowerCase();
    let idx = lowerText.indexOf(patLower);
    while (idx !== -1) {
      const before = idx === 0 || /[^a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(text[idx - 1] || " ");
      const afterIdx = idx + pat.length;
      const after = afterIdx >= text.length || /[^a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(text[afterIdx] || " ");
      if (before && after) {
        results.push({
          locationId,
          locationType,
          title,
          category,
          snippet: extractSnippet(text, pat),
          field
        });
        break;
      }
      idx = lowerText.indexOf(patLower, idx + 1);
    }
  }
  return results;
}

export function buildGlossaryIndex(): GlossaryIndex {
  const index: GlossaryIndex = {};
  GLOSSARY_UNIFIED.forEach((entry) => {
    index[entry.id] = { termId: entry.id, appearances: [], count: 0, coOccurrences: {}, centrality: 0 };
  });

  GLOSSARY_UNIFIED.forEach((entry) => {
    CORE_NODES.forEach((node) => {
      const fields: { text: string; field: string }[] = [
        { text: node.longDesc, field: "Definición" },
        { text: node.shortDesc, field: "Resumen" },
        ...node.scientificFacts.map((f, i) => ({ text: f, field: `Evidencia ${i + 1}` }))
      ];
      fields.forEach(({ text, field }) => {
        const apps = scanText(text, entry, node.id, "nodo", node.title, node.category, field);
        index[entry.id]!.appearances.push(...apps);
      });
      (node.references || []).forEach((ref) => {
        const apps = scanText(ref.citation, entry, node.id, "referencia", node.title, node.category, `Ref [${ref.id}]`);
        index[entry.id]!.appearances.push(...apps);
      });
    });

    DILEMMAS_DATA.forEach((dilemma) => {
      const fields: { text: string; field: string }[] = [
        { text: dilemma.popularStatement, field: "Tesis popular" },
        { text: dilemma.scientificDeconstruction, field: "Deconstrucción científica" },
        { text: dilemma.philosophicalDeconstruction, field: "Deconstrucción filosófica" },
        { text: dilemma.coexistenceImpact, field: "Impacto coexistencia" }
      ];
      fields.forEach(({ text, field }) => {
        const apps = scanText(text, entry, dilemma.id, "dilema", dilemma.title, dilemma.category, field);
        index[entry.id]!.appearances.push(...apps);
      });
      (dilemma.references || []).forEach((ref) => {
        const apps = scanText(ref.citation, entry, dilemma.id, "referencia", dilemma.title, dilemma.category, `Ref [${ref.id}]`);
        index[entry.id]!.appearances.push(...apps);
      });
    });

    Object.entries(ACT_CONCEPT_MAP).forEach(([actId, termIds]) => {
      if (termIds.includes(entry.id)) {
        const meta = ACT_TITLES[actId];
        if (meta) {
          index[entry.id]!.appearances.push({
            locationId: actId,
            locationType: "acto",
            title: meta.title,
            category: meta.category,
            snippet: `Concepto clave desarrollado en ${meta.title}.`,
            field: "Concepto del acto"
          });
        }
      }
    });
  });

  GLOSSARY_UNIFIED.forEach((entry) => {
    const deduped = new Map<string, Appearance>();
    index[entry.id]!.appearances.forEach((a) => {
      const key = `${a.locationType}:${a.locationId}:${a.field}`;
      if (!deduped.has(key)) deduped.set(key, a);
    });
    index[entry.id]!.appearances = Array.from(deduped.values());
    index[entry.id]!.count = index[entry.id]!.appearances.length;
  });

  // One pass: map each location to the set of terms that appear there
  const termsByLocation = new Map<string, Set<string>>();
  GLOSSARY_UNIFIED.forEach((entry) => {
    index[entry.id]!.appearances.forEach((a) => {
      const key = `${a.locationType}:${a.locationId}`;
      let set = termsByLocation.get(key);
      if (!set) {
        set = new Set();
        termsByLocation.set(key, set);
      }
      set.add(entry.id);
    });
  });

  // For each appearance of a term, count every other term sharing the location
  GLOSSARY_UNIFIED.forEach((entry) => {
    const coOccur: Record<string, number> = {};
    index[entry.id]!.appearances.forEach((a) => {
      const others = termsByLocation.get(`${a.locationType}:${a.locationId}`);
      if (!others) return;
      others.forEach((otherId) => {
        if (otherId === entry.id) return;
        coOccur[otherId] = (coOccur[otherId] || 0) + 1;
      });
    });
    index[entry.id]!.coOccurrences = coOccur;
  });

  GLOSSARY_UNIFIED.forEach((entry) => {
    const explicit = (entry.relatedEntries || []).length + (entry.relatedNodes || []).length + (entry.relatedDilemmas || []).length;
    const coCount = Object.keys(index[entry.id]!.coOccurrences).length;
    index[entry.id]!.centrality = index[entry.id]!.count + coCount * 2 + explicit;
  });

  return index;
}

let cachedIndex: GlossaryIndex | null = null;

export function getGlossaryIndex(): GlossaryIndex {
  if (!cachedIndex) {
    cachedIndex = buildGlossaryIndex();
  }
  return cachedIndex;
}

export function getAppearances(termId: string): Appearance[] {
  return getGlossaryIndex()[termId]?.appearances || [];
}

export function getCentrality(termId: string): number {
  return getGlossaryIndex()[termId]?.centrality || 0;
}

export function getCoOccurrences(termId: string): { id: string; count: number }[] {
  const co = getGlossaryIndex()[termId]?.coOccurrences || {};
  return Object.entries(co)
    .map(([id, count]) => ({ id, count }))
    .sort((a, b) => b.count - a.count);
}

export function getMostCentral(limit = 10): GlossaryEntry[] {
  const idx = getGlossaryIndex();
  return [...GLOSSARY_UNIFIED]
    .sort((a, b) => (idx[b.id]?.centrality || 0) - (idx[a.id]?.centrality || 0))
    .slice(0, limit);
}

export function getReferencesForTerm(entry: GlossaryEntry): ReferenceDetail[] {
  if (entry.references && entry.references.length > 0) return entry.references;
  return [];
}
