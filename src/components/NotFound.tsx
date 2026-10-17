import { Helmet } from "react-helmet-async";
import { CATEGORIES } from "../data/sections";
import type { TabType } from "../types";

interface NotFoundProps {
  onNavigate: (tab: TabType) => void;
}

/**
 * Página 404 real. El servidor devuelve estado 404 para rutas desconocidas y
 * esta vista evita que un enlace roto reescriba la URL a la portada.
 */
export default function NotFound({ onNavigate }: NotFoundProps) {
  return (
    <section className="max-w-[800px] mx-auto py-10 sm:py-16" aria-labelledby="notfound-title">
      <Helmet>
        <title>Página no encontrada — Sintiens</title>
        <meta name="description" content="La página que buscas no existe o ha cambiado de dirección. Vuelve al inicio para seguir explorando." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <p className="text-technical-sm font-mono uppercase tracking-[0.2em] text-primary mb-4">Error 404</p>
      <h1 id="notfound-title" className="font-heading text-3xl md:text-5xl font-bold tracking-tight text-on-surface">
        Esta página no existe
      </h1>
      <p className="text-body-lg text-on-surface-variant mt-5 max-w-xl leading-relaxed">
        Puede que el enlace esté mal escrito o que la página haya cambiado de dirección. Desde aquí puedes volver a
        cualquiera de los cuatro apartados del proyecto.
      </p>

      <nav aria-label="Volver a una sección" className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CATEGORIES.map((category) => (
          <a
            key={category.id}
            href={category.subSections[0]?.path ?? "/"}
            onClick={(event) => {
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
              event.preventDefault();
              onNavigate(category.defaultTabId);
            }}
            className="group flex items-center justify-between gap-3 rounded-2xl border border-outline-variant/30 bg-surface-container/40 px-5 py-4 text-on-surface transition-colors hover:border-primary/40 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <span className="font-medium">{category.label}</span>
            <span aria-hidden="true" className="text-primary transition-transform group-hover:translate-x-0.5">→</span>
          </a>
        ))}
      </nav>

      <a href="/" className="inline-flex items-center gap-2 mt-10 text-sm text-on-surface-variant hover:text-on-surface underline underline-offset-4">
        ← Volver al inicio
      </a>
    </section>
  );
}
