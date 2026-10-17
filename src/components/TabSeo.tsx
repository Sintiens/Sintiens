import { Helmet } from "react-helmet-async";
import type { TabType } from "../types.ts";
import { SITE_URL } from "../utils/site.ts";
import { LEGAL_SEO, TAB_SEO } from "../data/seoRoutes";

export { TAB_SEO };

export default function TabSeo({ tab, legal = false }: { tab: TabType; legal?: boolean }) {
  // Página legal (ruta /privacidad): SEO propio, sin JSON-LD de tab
  if (legal) {
    const { title, description, path } = LEGAL_SEO;
    const canonical = `${SITE_URL}${path}`;
    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
    );
  }
  const seo = TAB_SEO[tab];
  // Noticias gestiona sus propios metadatos en NewsExplorer (incluye el artículo
  // concreto de ?id=). Evitamos duplicar <title>/<meta> con React 19.
  if (tab === "noticias") return null;
  // En noticias, un ?id= concreto es una página indexable propia: su canonical
  // debe incluirlo (coincide con lo listado en sitemap.xml)
  const canonical = `${SITE_URL}${seo.path}`;
  // JSON-LD estructurado solo en Cifras (Dataset) para buscadores
  const jsonLd =
    tab === "datos"
      ? JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dataset",
          name: "Cifras y evidencia — Sintiens",
          description: seo.description,
          url: canonical,
          isAccessibleForFree: true,
          license: "https://creativecommons.org/licenses/by/4.0/",
          creator: { "@type": "Organization", name: "Sintiens", url: SITE_URL },
          keywords: [
            "ganadería",
            "impacto ambiental",
            "bienestar animal",
            "emisiones",
            "uso del suelo",
            "antibióticos",
            "biomasa"
          ]
        })
      : null;
  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      {jsonLd && <script type="application/ld+json">{jsonLd}</script>}
    </Helmet>
  );
}
