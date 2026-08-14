/**
 * Generates favicon PNGs and multi-size .ico files for both light and dark
 * browser themes, from public/logo-mark.svg and public/logo-mark-dark.svg.
 *
 * Run with: npm run favicons
 *
 * Requires @resvg/resvg-js (installed as devDependency).
 *
 * Output:
 *   - favicon-{16,32}x{16,32}.png          (light, default)
 *   - favicon-{16,32}x{16,32}-dark.png     (dark, via media query)
 *   - apple-touch-icon.png                  (light)
 *   - apple-touch-icon-dark.png             (dark)
 *   - favicon.ico / favicon-dark.ico        (multi-size 16/32/48)
 *
 * Note: the loading-screen logo is now an inline SVG in index.html,
 * not a PNG asset. It uses the same path and viewBox as
 * public/logo-mark.svg so the two are pixel-identical.
 */

import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

const lightSvg = readFileSync(join(publicDir, "logo-mark.svg"), "utf-8");
const darkSvg = readFileSync(join(publicDir, "logo-mark-dark.svg"), "utf-8");

function renderPng(svg, size) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: size },
    background: "transparent",
  });
  return resvg.render().asPng();
}

// Sizes used for the .ico multi-size container
const ICO_SIZES = [16, 32, 48];

// (filename, size) per theme — only favicon assets here.
// The loading-screen SVG is inline in index.html now, so no PNGs needed.
const FAVICON_SET = {
  light: {
    "favicon-16x16.png": 16,
    "favicon-32x32.png": 32,
    "apple-touch-icon.png": 180,
  },
  dark: {
    "favicon-16x16-dark.png": 16,
    "favicon-32x32-dark.png": 32,
    "apple-touch-icon-dark.png": 180,
  },
};

for (const [theme, outputs] of Object.entries(FAVICON_SET)) {
  const svg = theme === "light" ? lightSvg : darkSvg;
  for (const [filename, size] of Object.entries(outputs)) {
    const png = renderPng(svg, size);
    writeFileSync(join(publicDir, filename), png);
    console.log(`  [${theme}] ${filename} (${size}x${size})`);
  }

  // Multi-size .ico for this theme
  const icoPngs = ICO_SIZES.map((size) => renderPng(svg, size));
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // Reserved
  icoHeader.writeUInt16LE(1, 2); // Type: icon
  icoHeader.writeUInt16LE(ICO_SIZES.length, 4); // Image count

  let cursor = 6 + 16 * ICO_SIZES.length;
  const icoDir = Buffer.alloc(16 * ICO_SIZES.length);
  icoPngs.forEach((png, i) => {
    const o = i * 16;
    icoDir.writeUInt8(ICO_SIZES[i] === 256 ? 0 : ICO_SIZES[i], o);
    icoDir.writeUInt8(ICO_SIZES[i] === 256 ? 0 : ICO_SIZES[i], o + 1);
    icoDir.writeUInt8(0, o + 2);
    icoDir.writeUInt8(0, o + 3);
    icoDir.writeUInt16LE(1, o + 4);
    icoDir.writeUInt16LE(32, o + 6);
    icoDir.writeUInt32LE(png.length, o + 8);
    icoDir.writeUInt32LE(cursor, o + 12);
    cursor += png.length;
  });

  const icoName = theme === "light" ? "favicon.ico" : "favicon-dark.ico";
  writeFileSync(
    join(publicDir, icoName),
    Buffer.concat([icoHeader, icoDir, ...icoPngs])
  );
  console.log(`  [${theme}] ${icoName} (${ICO_SIZES.join("+")})`);
}

console.log("Done.");
