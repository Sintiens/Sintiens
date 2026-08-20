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
  const id = block.match(/id:\s+"([^"]+)"/)?.[1] || "";
  const date = block.match(/date:\s+"([^"]+)"/)?.[1] || "";
  const verified = block.match(/verifiedAt:\s+"([^"]+)"/)?.[1] || date;
  if(id) items.push({ id, lastmod: verified || date });
}
items.sort((a,b)=> a.lastmod.localeCompare(b.lastmod));

const base = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

const staticUrls = [
  { loc: "https://sintiens.onrender.com/", changefreq: "weekly", priority: "1.0" },
  { loc: "https://sintiens.onrender.com/grafo", changefreq: "weekly", priority: "0.8" },
  { loc: "https://sintiens.onrender.com/cronologia", changefreq: "weekly", priority: "0.8" },
  { loc: "https://sintiens.onrender.com/dialectica", changefreq: "weekly", priority: "0.8" },
  { loc: "https://sintiens.onrender.com/calculadora", changefreq: "monthly", priority: "0.7" },
  { loc: "https://sintiens.onrender.com/validador", changefreq: "monthly", priority: "0.7" },
  { loc: "https://sintiens.onrender.com/datos", changefreq: "monthly", priority: "0.6" },
  { loc: "https://sintiens.onrender.com/noticias", changefreq: "weekly", priority: "0.8" },
];

let xml = base;
for(const u of staticUrls){
  xml += `  <url>\n    <loc>${u.loc}</loc>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>\n`;
}
for(const it of items){
  const loc = `https://sintiens.onrender.com/noticias?id=${it.id}`;
  xml += `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${it.lastmod}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
}
xml += `  <url>\n    <loc>https://sintiens.onrender.com/laboratorio</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
xml += `</urlset>\n`;

const out = resolve("public/sitemap.xml");
writeFileSync(out, xml, "utf8");
console.log(`✅ Sitemap generado: ${items.length} noticias → public/sitemap.xml`);
console.log(`   URLs: ${staticUrls.length + items.length + 1} totales`);
console.log(`   Usa ?id= (no #fragment) para SEO correcto`);
