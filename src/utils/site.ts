// Única fuente de verdad del dominio público del sitio.
// Se puede sobreescribir con VITE_SITE_URL en build/deploy.
const rawSiteUrl = import.meta.env.VITE_SITE_URL as string | undefined;

export const SITE_URL = (
  rawSiteUrl && rawSiteUrl.trim() ? rawSiteUrl.trim() : "https://sintiens.duckdns.org"
).replace(/\/+$/, "");

export const SITE_NAME = "Sintiens";
