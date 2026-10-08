#!/usr/bin/env node
/**
 * scripts/publish-twitter-thread.mjs
 *
 * Utilidad CLI para validar y publicar hilos en Twitter/X.
 *
 * Uso:
 *   # 1. Simulación / comprobación de longitud (sin credenciales ni publicar):
 *   node scripts/publish-twitter-thread.mjs docs/hilo_twitter_mobile.md
 *   node scripts/publish-twitter-thread.mjs docs/hilo_twitter_mobile.md --dry-run
 *
 *   # 2. Publicación real en Twitter (requiere credenciales en .env):
 *   node scripts/publish-twitter-thread.mjs docs/hilo_twitter_mobile.md --publish
 */

import fs from "node:fs";
import path from "node:url";
import { TwitterApi } from "twitter-api-v2";
import "dotenv/config";

// --- Configuración y Argumentos CLI ---
const args = process.argv.slice(2);
const isPublish = args.includes("--publish");
const isDryRun = args.includes("--dry-run") || !isPublish;
const fileArg = args.find((a) => !a.startsWith("--")) || "docs/hilo_twitter_mobile.md";

console.log("==================================================");
console.log("🐦 Sintiens — Publicador de Hilos de Twitter / X");
console.log(`Modo: ${isPublish ? "🚀 PUBLICACIÓN REAL" : "🔍 SIMULACIÓN (DRY-RUN)"}`);
console.log(`Archivo objetivo: ${fileArg}`);
console.log("==================================================\n");

if (!fs.existsSync(fileArg)) {
  console.error(`❌ Error: El archivo "${fileArg}" no existe.`);
  process.exit(1);
}

const rawContent = fs.readFileSync(fileArg, "utf-8");

// --- Parser de Tweets desde Markdown ---
function parseThread(content) {
  // Dividir por bloques separados por `---`
  const rawBlocks = content.split(/\n---+\n/);
  const tweets = [];

  for (const block of rawBlocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    // Ignorar título principal del archivo si es solo cabecera #
    if (trimmed.startsWith("# ") && !trimmed.includes("### Tweet")) {
      continue;
    }

    // Limpiar cabeceras de markdown como "### Tweet 1 (...)"
    const lines = trimmed.split("\n");
    const cleanedLines = [];
    for (const line of lines) {
      if (/^###\s+Tweet\s+\d+/i.test(line.trim())) {
        continue; // Quitar la cabecera identificadora
      }
      cleanedLines.push(line);
    }

    const tweetText = cleanedLines.join("\n").trim();
    if (tweetText.length > 0) {
      tweets.push(tweetText);
    }
  }

  return tweets;
}

const tweets = parseThread(rawContent);

if (tweets.length === 0) {
  console.error("❌ No se encontraron tweets válidos en el archivo.");
  console.error("Asegúrate de separar los tweets con líneas '---'.");
  process.exit(1);
}

// Twitter calcula cualquier URL como 23 caracteres (t.co)
function getTwitterLength(text) {
  const urlRegex = /https?:\/\/[^\s]+/g;
  let simulatedText = text.replace(urlRegex, "x".repeat(23));
  return Array.from(simulatedText).length;
}

// --- Validación de Longitud ---
console.log(`📋 Total de tweets identificados en el hilo: ${tweets.length}\n`);

let hasLengthErrors = false;
tweets.forEach((tweet, idx) => {
  const len = getTwitterLength(tweet);
  const isOver = len > 280;
  if (isOver) hasLengthErrors = true;

  console.log(`--------------------------------------------------`);
  console.log(`Tweet ${idx + 1}/${tweets.length} [${len}/280 caracteres] ${isOver ? "⚠️ EXCEDE LÍMITE" : "✅ OK"}`);
  console.log(`--------------------------------------------------`);
  console.log(tweet);
  console.log();
});

if (hasLengthErrors) {
  console.error("❌ Uno o más tweets superan el límite de 280 caracteres de Twitter.");
  console.error("Ajusta el texto antes de intentar publicar.");
  process.exit(1);
}

// --- Si es modo Simulación, terminar aquí ---
if (isDryRun) {
  console.log("==================================================");
  console.log("✅ Validación de longitud superada para todos los tweets.");
  console.log("ℹ️  Estás en modo DRY-RUN: NO se ha publicado nada en Twitter.");
  console.log("Para publicar de verdad, ejecuta con el flag --publish:");
  console.log(`   node scripts/publish-twitter-thread.mjs ${fileArg} --publish`);
  console.log("==================================================");
  process.exit(0);
}

// --- Modo Publicación Real ---
const appKey = process.env.TWITTER_API_KEY;
const appSecret = process.env.TWITTER_API_SECRET;
const accessToken = process.env.TWITTER_ACCESS_TOKEN;
const accessSecret = process.env.TWITTER_ACCESS_SECRET;

if (!appKey || !appSecret || !accessToken || !accessSecret) {
  console.error("❌ Faltan credenciales de Twitter en tu archivo .env local.");
  console.error("Por favor, asegúrate de definir en tu .env las siguientes variables:");
  console.error("  TWITTER_API_KEY=tu_consumer_key");
  console.error("  TWITTER_API_SECRET=tu_consumer_secret");
  console.error("  TWITTER_ACCESS_TOKEN=tu_access_token");
  console.error("  TWITTER_ACCESS_SECRET=tu_access_token_secret");
  console.error("\nPuedes obtenerlas de forma gratuita en https://developer.x.com");
  process.exit(1);
}

console.log("🚀 Iniciando conexión con la API de X / Twitter...");

const client = new TwitterApi({
  appKey,
  appSecret,
  accessToken,
  accessSecret,
});

async function publishThread() {
  try {
    console.log("Enviando tweets encadenados...");
    const result = await client.v2.tweetThread(tweets);

    console.log("\n🎉 ¡Hilo publicado con éxito en Twitter / X!");
    console.log("Detalle de los tweets creados:");
    result.forEach((t, i) => {
      console.log(`  [${i + 1}/${tweets.length}] ID: ${t.data.id} -> https://x.com/i/status/${t.data.id}`);
    });
    console.log(`\n🔗 Enlace directo al inicio del hilo: https://x.com/i/status/${result[0].data.id}`);
  } catch (err) {
    console.error("❌ Error al publicar en Twitter:", err?.data || err?.message || err);
    process.exit(1);
  }
}

publishThread();
