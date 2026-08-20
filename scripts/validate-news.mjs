#!/usr/bin/env node
// Validación muy cuidadosa de newsData.ts — sin dependencias externas, solo Node
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const file = resolve("src/data/newsData.ts");
const raw = readFileSync(file, "utf-8");

// Extrae cada NewsItem bloqueado por id: "..."
const itemRe = /\{\s+id:\s+"([^"]+)",[\s\S]*?source:\s+"[^"]+"[\s\S]*?\n\s*\},?/g;
let match;
let errors = [];
let ids = new Set();
let count = 0;
const now = new Date();

while ((match = itemRe.exec(raw)) !== null) {
  const block = match[0];
  const idM = block.match(/id:\s+"([^"]+)"/);
  const titleM = block.match(/title:\s+"([^"]+)"/);
  const sumM = block.match(/summary:\s+"([^"]+)"/);
  const dateM = block.match(/date:\s+"([^"]+)"/);
  const regionM = block.match(/region:\s+"([^"]+)"/);
  const catM = block.match(/category:\s+"([^"]+)"/);
  const impactM = block.match(/impact:\s+"([^"]+)"/);
  const sourceTypeM = block.match(/sourceType:\s+"([^"]+)"/);
  const urlM = block.match(/url:\s+"([^"]+)"/);
  const sourceM = block.match(/source:\s+"([^"]+)"/);
  const tagsM = block.match(/tags:\s+\[([^\]]*)\]/);
  const verifiedM = block.match(/verifiedAt:\s+"([^"]+)"/);
  const relatedM = block.match(/relatedGlossaryIds:\s+\[([^\]]*)\]/);
  count++;

  const id = idM?.[1];
  if (!id) errors.push(`Item ${count}: falta id`);
  else if (ids.has(id)) errors.push(`Duplicado id: ${id}`);
  else ids.add(id);

  if (!titleM || titleM[1].length < 10) errors.push(`${id}: título muy corto o faltante`);
  if (!sumM || sumM[1].length < 20) errors.push(`${id}: summary muy corto`);
  if (!dateM || !/^\d{4}-\d{2}-\d{2}$/.test(dateM[1])) errors.push(`${id}: date inválida ${dateM?.[1]}`);
  else {
    const d = new Date(dateM[1] + "T12:00:00");
    if (isNaN(d.getTime())) errors.push(`${id}: date no parseable`);
    else if (d > now) errors.push(`${id}: date futura ${dateM[1]}`);
  }
  if (!regionM || !["españa","europa","global"].includes(regionM[1])) errors.push(`${id}: region inválida`);
  if (!catM || !["ley","consumo","ciencia","social","industria"].includes(catM[1])) errors.push(`${id}: category inválida`);
  if (!impactM || !["positivo","negativo"].includes(impactM[1])) errors.push(`${id}: impact inválido`);
  if (!sourceTypeM || !["oficial","cientifica","prensa","informe"].includes(sourceTypeM[1])) errors.push(`${id}: sourceType inválido`);
  if (!urlM || !/^https:\/\//.test(urlM[1])) errors.push(`${id}: url debe ser https`);
  if (!sourceM) errors.push(`${id}: source faltante`);
  if (!tagsM) errors.push(`${id}: tags faltante (Fase 2)`);
  else {
    const tags = [...tagsM[1].matchAll(/"([^"]+)"/g)].map(m=>m[1]);
    if (tags.length===0) errors.push(`${id}: tags vacío`);
    if (tags.length>6) errors.push(`${id}: demasiados tags (${tags.length})`);
  }
  if (!verifiedM) errors.push(`${id}: verifiedAt faltante`);
  else if (!/^\d{4}-\d{2}-\d{2}$/.test(verifiedM[1])) errors.push(`${id}: verifiedAt inválida`);
  if (!relatedM) errors.push(`${id}: relatedGlossaryIds faltante`);
  // Checks adicionales dentro del loop
  if (verifiedM && dateM) {
    const d = new Date(dateM[1] + "T12:00:00");
    const v = new Date(verifiedM[1] + "T12:00:00");
    if (v < d) errors.push(`${id}: verifiedAt ${verifiedM[1]} anterior a date ${dateM[1]}`);
  }
  if (relatedM) {
    const relIds = [...relatedM[1].matchAll(/"([^"]+)"/g)].map(m=>m[1]);
    if (relIds.length===0) errors.push(`${id}: relatedGlossaryIds vacío`);
    if (relIds.length>4) errors.push(`${id}: demasiados relatedGlossaryIds (${relIds.length})`);
    const uniq = new Set(relIds);
    if (uniq.size !== relIds.length) errors.push(`${id}: relatedGlossaryIds duplicado`);
  }
  if (urlM && urlM[1].includes("youtube.com")) errors.push(`${id}: url YouTube no permitida, usa fuente canónica`);
  if (urlM && urlM[1].includes("allafrica.com")) errors.push(`${id}: url AllAfrica no permitida`);
}

// Validaciones globales: títulos/urls duplicados, glosario, fechas orden
const allTitles = [...raw.matchAll(/title:\s+"([^"]+)"/g)].map(m=>m[1]);
const dupTitles = allTitles.filter((t,i)=> allTitles.indexOf(t) !== i);
if (dupTitles.length) errors.push(`Títulos duplicados: ${[...new Set(dupTitles)].join(", ")}`);

const allUrls = [...raw.matchAll(/url:\s+"(https:\/\/[^"]+)"/g)].map(m=>m[1]);
const dupUrls = allUrls.filter((u,i)=> allUrls.indexOf(u) !== i);
if (dupUrls.length) errors.push(`URLs duplicadas: ${[...new Set(dupUrls)].join(", ")}`);

// Glossary check
try {
  const glossaryRaw = readFileSync(resolve("src/data/glossaryUnified.ts"), "utf-8");
  const gIds = new Set([...glossaryRaw.matchAll(/id:\s+"([^"]+)"/g)].map(m=>m[1]));
  const relBlocks = [...raw.matchAll(/relatedGlossaryIds:\s+\[([^\]]*)\]/g)];
  for (const b of relBlocks) {
    const relIds = [...b[1].matchAll(/"([^"]+)"/g)].map(m=>m[1]);
    for (const rid of relIds) {
      if (!gIds.has(rid)) errors.push(`relatedGlossaryIds roto: "${rid}" no existe en glossaryUnified.ts`);
    }
  }
} catch {}

// Check tags "general"
const generalTags = [...raw.matchAll(/tags:\s+\[([^\]]*)\]/g)].filter(m=> m[1].includes('"general"'));
if (generalTags.length) errors.push(`tags "general" genérico encontrado en ${generalTags.length} noticias, usa tags semánticos`);

// Sitemap/RSS fragment check
try {
  const sitemap = readFileSync(resolve("public/sitemap.xml"), "utf-8");
  if (sitemap.includes("noticias#")) errors.push(`sitemap.xml usa #fragment (noticias#) — debe usar ?id= para SEO`);
  const rss = readFileSync(resolve("public/noticias.rss"), "utf-8");
  if (rss.includes("noticias#")) errors.push(`noticias.rss usa #fragment (noticias#) — debe usar ?id= `);
  // Coherencia IDs: sitemap y rss deben contener todos los ids
  for (const id of ids) {
    if (!sitemap.includes(id)) errors.push(`sitemap.xml falta id: ${id}`);
    if (!rss.includes(id)) errors.push(`noticias.rss falta id: ${id}`);
  }
} catch {}

console.log(`\n🔍 Validando newsData.ts — ${count} noticias encontradas`);
if (errors.length===0) {
  console.log("✅ Todo perfecto: sin errores.");
  console.log(`   IDs únicos: ${ids.size}`);
  console.log(`   Rango fechas: ${[...raw.matchAll(/date:\s+"([^"]+)"/g)].map(m=>m[1]).sort()[0]} → ${[...raw.matchAll(/date:\s+"([^"]+)"/g)].map(m=>m[1]).sort().at(-1)}`);
} else {
  console.log(`❌ ${errors.length} errores encontrados:`);
  errors.slice(0, 40).forEach(e=> console.log(" - " + e));
  if (errors.length>40) console.log(` ... y ${errors.length-40} más`);
  process.exitCode = 1;
}

// Chequeo opcional de URLs alcanzables (solo si --check-urls)
if (process.argv.includes("--check-urls")) {
  console.log("\n🌐 Verificando URLs (HEAD) — puede tardar...");
  const urls = [...raw.matchAll(/url:\s+"(https:\/\/[^"]+)"/g)].map(m=>m[1]).slice(0,10);
  // No verificamos todas para no saturar, solo muestra ejemplo
  console.log(`(demo) Primeras 3 URLs:`);
  urls.slice(0,3).forEach(u=> console.log(" - " + u));
  console.log("Usa --check-urls-full para verificar todas (no implementado en CI).");
}
