/**
 * Genera iconos PWA (192/512 + maskable) y la imagen OG (1200x630)
 * a partir de public/logo-mark.svg usando sharp.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");
const logo = readFileSync(join(publicDir, "logo-mark.svg"));

// 1) Iconos PWA (con fondo oscuro para instalación)
for (const size of [192, 512]) {
  const png = await sharp(logo)
    .resize(size, size)
    .flatten({ background: "#09090b" })
    .png()
    .toBuffer();
  writeFileSync(join(publicDir, `icon-${size}x${size}.png`), png);
  console.log(`  icon-${size}x${size}.png`);
}

// 2) Maskable 512 (logo al 60% centrado, fondo oscuro)
const maskable = await sharp(logo)
  .resize(307, 307)
  .composite([
    {
      input: await sharp({ create: { width: 512, height: 512, channels: 4, background: "#09090b" } }).png().toBuffer(),
      left: 0,
      top: 0,
    },
  ])
  .resize(512, 512)
  .png()
  .toBuffer();
writeFileSync(join(publicDir, "icon-512-maskable.png"), maskable);
console.log("  icon-512-maskable.png");

// 3) Imagen OG 1200x630: fondo oscuro + logo grande + nombre
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#09090b"/>
  <circle cx="600" cy="270" r="150" fill="rgba(74,222,128,0.06)"/>
  <g transform="translate(480,110) scale(2.4)">
    <text x="50" y="80" font-family="Georgia, 'Times New Roman', serif" font-size="68" font-weight="500" text-anchor="middle" fill="#fafafa">S</text>
    <path d="M 80 80 Q 63 73, 56 56 Q 77 56, 80 80 Z" fill="#1B6B37"/>
  </g>
  <text x="600" y="430" font-family="Georgia, serif" font-size="64" font-weight="600" fill="#fafafa" text-anchor="middle">Sintiens</text>
  <text x="600" y="485" font-family="Arial, sans-serif" font-size="24" fill="#a1a1aa" text-anchor="middle">¿Qué vidas importan? Análisis crítico sobre nuestra relación con los animales</text>
</svg>`;

const og = await sharp(Buffer.from(ogSvg)).png().toBuffer();
writeFileSync(join(publicDir, "og-image.png"), og);
console.log("  og-image.png (1200x630)");

console.log("Done.");
