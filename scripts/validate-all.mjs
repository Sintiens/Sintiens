#!/usr/bin/env node
// Validador cruzado de integridad referencial — sin dependencias, solo Node.
// Cruza: CORE.connections <-> CORE ∪ GLOSSARY · GLOSSARY.related* <->
// CORE/DILEMMAS/GLOSSARY/storyData · TIMELINE.relatedNodeId -> CORE ·
// NEWS.relatedGlossaryIds -> GLOSSARY · SOCRATIC.dilemmaId -> DILEMMAS,
// initialNodeId/nextNodeId -> nodos del propio fichero, coreConceptLink -> GLOSSARY.
//
// Severidad: ERROR (exit 1) = id huérfano total, no existe en ningún dataset.
// WARN = resuelve en un dataset distinto al esperado (ej. connection a glosario).
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const errors = [];
const warnings = [];

function read(rel) {
  return readFileSync(resolve(rel), "utf-8");
}

/** Todos los id: "..." del fichero, excluyendo referencias numéricas ("1","2"). */
function collectIds(raw) {
  const out = new Set();
  for (const m of raw.matchAll(/\bid:\s+"([^"]+)"/g)) {
    if (!/^\d+$/.test(m[1])) out.add(m[1]);
  }
  return out;
}

/** Extrae arrays `campo: [...]` con sus valores "..." (multilínea OK). */
function collectArrays(raw, field) {
  const out = [];
  const re = new RegExp(field + ":\\s*\\[([\\s\\S]*?)\\]", "g");
  let match;
  while ((match = re.exec(raw)) !== null) {
    out.push([...match[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]));
  }
  return out;
}

// --- Carga de datasets ---
const coreRaw = read("src/data/CORE_NODES.ts");
const glossRaw = read("src/data/glossaryUnified.ts");
const dilemRaw = read("src/data/DILEMMAS_DATA.ts");
const timeRaw = read("src/data/TIMELINE_DATA.ts");
const newsRaw = read("src/data/newsData.ts");
const socRaw = read("src/data/socraticDialoguesData.ts");
const storyRaw = read("src/data/storyData.tsx");

const coreIds = collectIds(coreRaw);
const glossIds = collectIds(glossRaw);
const dilemIds = collectIds(dilemRaw);
const storyActIds = new Set(
  [...storyRaw.matchAll(/\bid:\s+"(acto-\d+)"/g)].map((m) => m[1])
);

// --- 1. CORE.connections -> CORE ∪ GLOSSARY ---
for (const arr of collectArrays(coreRaw, "connections")) {
  for (const ref of arr) {
    if (coreIds.has(ref)) continue;
    if (glossIds.has(ref)) {
      warnings.push(`CORE.connections "${ref}" no es nodo (solo existe en glosario)`);
    } else {
      errors.push(`CORE.connections huérfano: "${ref}" no existe en CORE ni en glosario`);
    }
  }
}

// --- 2. GLOSSARY.related* ---
for (const arr of collectArrays(glossRaw, "relatedNodes")) {
  for (const ref of arr) {
    if (!coreIds.has(ref)) errors.push(`glosario.relatedNodes huérfano: "${ref}" no es nodo CORE`);
  }
}
for (const arr of collectArrays(glossRaw, "relatedDilemmas")) {
  for (const ref of arr) {
    if (!dilemIds.has(ref)) errors.push(`glosario.relatedDilemmas huérfano: "${ref}" no existe en DILEMMAS_DATA`);
  }
}
for (const arr of collectArrays(glossRaw, "relatedEntries")) {
  for (const ref of arr) {
    if (!glossIds.has(ref)) errors.push(`glosario.relatedEntries huérfano: "${ref}" no existe en glosario`);
  }
}
for (const arr of collectArrays(glossRaw, "relatedActs")) {
  for (const ref of arr) {
    if (!storyActIds.has(ref)) errors.push(`glosario.relatedActs huérfano: "${ref}" no existe en storyData (acto-N)`);
  }
}

// --- 3. TIMELINE.relatedNodeId -> CORE ---
for (const m of timeRaw.matchAll(/relatedNodeId:\s+"([^"]+)"/g)) {
  if (!coreIds.has(m[1])) errors.push(`timeline.relatedNodeId huérfano: "${m[1]}" no es nodo CORE`);
}

// --- 4. NEWS.relatedGlossaryIds -> GLOSSARY ---
for (const m of newsRaw.matchAll(/relatedGlossaryIds:\s+\[([^\]]*)\]/g)) {
  for (const r of m[1].matchAll(/"([^"]+)"/g)) {
    if (!glossIds.has(r[1])) errors.push(`news.relatedGlossaryIds huérfano: "${r[1]}" no existe en glosario`);
  }
}

// --- 5. SOCRATIC ---
for (const m of socRaw.matchAll(/dilemmaId:\s+"([^"]+)"/g)) {
  if (!dilemIds.has(m[1])) errors.push(`socratic.dilemmaId huérfano: "${m[1]}" no existe en DILEMMAS_DATA`);
}
for (const m of socRaw.matchAll(/coreConceptLink:\s*\{\s*id:\s*"([^"]+)"/g)) {
  if (!glossIds.has(m[1])) errors.push(`socratic.coreConceptLink huérfano: "${m[1]}" no existe en glosario`);
}
// initialNodeId/nextNodeId deben existir como clave "id": { en el propio fichero
const socNodeKeys = new Set(
  [...socRaw.matchAll(/"((?:ct|ve|td|nb|nu|ww|ic)-\d+)":\s*\{/g)].map((m) => m[1])
);
for (const m of socRaw.matchAll(/(?:initialNodeId|nextNodeId):\s+"([^"]+)"/g)) {
  if (!socNodeKeys.has(m[1]) && !new RegExp(`"${m[1]}":\\s*\\{`).test(socRaw)) {
    errors.push(`socratic.nextNodeId huérfano: "${m[1]}" no existe como nodo de diálogo`);
  }
}

// --- 6. Números canónicos (WARN): Poore & Nemecek 2018 = 83% suelo / 18% calorías.
// Caza variantes divergentes (ej. "80% de la tierra agrícola") cerca de keywords.
const CANON_FILES = {
  "CORE_NODES.ts": coreRaw,
  "glossaryUnified.ts": glossRaw,
  "DILEMMAS_DATA.ts": dilemRaw,
  "TIMELINE_DATA.ts": timeRaw,
  "storyData.tsx": storyRaw,
};
for (const [name, raw] of Object.entries(CANON_FILES)) {
  for (const m of raw.matchAll(/\b(8[02]|7[67])\s?%([^"'\n]{0,90})/g)) {
    const ctx = m[2].toLowerCase();
    if (/(tierra|suelo|agrícola|agricola|pastor|forraje)/.test(ctx) && m[1] !== "83") {
      warnings.push(`${name}: "${m[1]}%" junto a tierra/suelo — el canónico Poore 2018 es 83%`);
    }
  }
}
// --- 7. Fuentes secundarias en datasets de evidencia (WARN agregado, no bloqueante).
// Wikipedia/Google Books solo son aceptables para obras clásicas (tipo obra/autor);
// para datos factuales se prefiere DOI/fuente primaria. cifras/ debe estar limpio.
const SECONDARY_RE = /wikipedia\.org|books\.google|google\.com\/books/g;
const EVIDENCE_FILES = {
  "CORE_NODES.ts": coreRaw,
  "DILEMMAS_DATA.ts": dilemRaw,
  "TIMELINE_DATA.ts": timeRaw,
};
for (const [name, raw] of Object.entries(EVIDENCE_FILES)) {
  const n = (raw.match(SECONDARY_RE) || []).length;
  if (n > 0) {
    warnings.push(
      `${name}: ${n} citas a Wikipedia/Google Books — migrar datos factuales a DOI/primaria (obras clásicas OK)`
    );
  }
}

// --- Informe ---
console.log(`\n🔗 validate-all: CORE ${coreIds.size} · glosario ${glossIds.size} · dilemas ${dilemIds.size} · actos ${storyActIds.size}`);
const uniqWarn = [...new Set(warnings)];
if (uniqWarn.length) {
  console.log(`⚠️  ${uniqWarn.length} avisos (no bloquean):`);
  uniqWarn.slice(0, 20).forEach((w) => console.log(" - " + w));
  if (uniqWarn.length > 20) console.log(` ... y ${uniqWarn.length - 20} más`);
}
if (errors.length === 0) {
  console.log("✅ Sin referencias huérfanas.");
} else {
  console.log(`❌ ${errors.length} referencias huérfanas:`);
  [...new Set(errors)].slice(0, 40).forEach((e) => console.log(" - " + e));
  process.exitCode = 1;
}
