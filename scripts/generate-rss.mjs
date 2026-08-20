#!/usr/bin/env node
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const file = resolve("src/data/newsData.ts");
const raw = readFileSync(file, "utf-8");

const itemRe = /\{\s+id:\s+"([^"]+)",[\s\S]*?source:\s+"[^"]+"[\s\S]*?\n\s*\},?/g;
let items = [];
let m;
while ((m = itemRe.exec(raw)) !== null) {
  const block = m[0];
  const get = (re) => block.match(re)?.[1] || "";
  const id = get(/id:\s+"([^"]+)"/);
  const title = get(/title:\s+"([^"]+)"/);
  const summary = get(/summary:\s+"([^"]+)"/);
  const date = get(/date:\s+"([^"]+)"/);
  const url = get(/url:\s+"([^"]+)"/);
  const source = get(/source:\s+"([^"]+)"/);
  if (id) items.push({ id, title, summary, date, url, source });
}
items.sort((a,b)=> a.date.localeCompare(b.date));

const esc = (s) => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;");

const now = new Date().toUTCString();
let rss = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n  <channel>\n    <title>Sintiens — Noticias</title>\n    <link>https://sintiens.onrender.com/noticias</link>\n    <description>Selección, síntesis y seguimiento de los eventos más determinantes para los animales, ordenados por metodología de impacto y con acceso a sus fuentes originales.</description>\n    <language>es-ES</language>\n    <lastBuildDate>${now}</lastBuildDate>\n    <atom:link href="https://sintiens.onrender.com/noticias.rss" rel="self" type="application/rss+xml" />\n`;

for(const it of items){
  const pubDate = new Date(it.date + "T12:00:00Z").toUTCString();
  const link = `https://sintiens.onrender.com/noticias?id=${it.id}`;
  rss += `    <item>\n      <title>${esc(it.title)}</title>\n      <link>${link}</link>\n      <guid isPermaLink="false">${link}</guid>\n      <description>${esc(it.summary)}</description>\n      <pubDate>${pubDate}</pubDate>\n      <source url="${it.url}">${esc(it.source)}</source>\n    </item>\n`;
}
rss += `  </channel>\n</rss>\n`;

const out = resolve("public/noticias.rss");
writeFileSync(out, rss, "utf8");
console.log(`✅ RSS generado: ${items.length} noticias → public/noticias.rss`);
console.log(`   lastBuildDate: ${now}`);
