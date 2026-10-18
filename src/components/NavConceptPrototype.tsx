import type { ReactNode } from "react";
import { Compass } from "lucide-react";
import { CATEGORIES, getCategoryForTab, getPathForTab } from "../data/sections";
import type { TabType } from "../types";

type ConceptVariant = "INDEX" | "MAP" | "COMPASS";

interface NavConceptPrototypeProps {
  variant: ConceptVariant;
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
  themeToggle: ReactNode;
}

const CATEGORY_HINTS: Record<string, string> = {
  argumento: "Empieza por el Relato: cifras, cronología y dilemas",
  glosario: "Conceptos, autores y obras",
  laboratorio: "7 herramientas para experimentar",
  noticias: "Casos reales y su análisis",
};

const NUMBERS = ["01", "02", "03", "04"];

export default function NavConceptPrototype({
  variant,
  activeTab,
  onNavigate,
  themeToggle,
}: NavConceptPrototypeProps) {
  const activeCategory = getCategoryForTab(activeTab);
  const activeCategoryData = CATEGORIES.find((category) => category.id === activeCategory) ?? CATEGORIES[0]!;
  const activeSubs = activeCategoryData.subSections;

  const subLinks = (className: string) => (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      {activeSubs.map((sub) => {
        const isActive = sub.tabId === activeTab;
        return (
          <a
            key={sub.tabId}
            href={sub.path}
            onClick={(event) => {
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
              event.preventDefault();
              onNavigate(sub.tabId);
            }}
            aria-current={isActive ? "page" : undefined}
            className={`${className} ${
              isActive
                ? "font-bold text-primary underline decoration-primary/50 underline-offset-4"
                : "text-on-surface-variant hover:text-on-surface hover:underline hover:underline-offset-4"
            }`}
          >
            {sub.label}
          </a>
        );
      })}
    </div>
  );

  const header = (label: string) => (
    <div className="mb-3 flex items-center justify-between gap-3 px-1">
      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-on-surface-variant">{label}</span>
      {themeToggle}
    </div>
  );

  if (variant === "INDEX") {
    return (
      <div className="w-full max-w-full min-w-0" data-nav-concept="INDEX">
        {header("Índice")}
        <div className="border-y border-outline-variant/25">
          <div className="grid grid-cols-1 sm:grid-cols-4 sm:items-stretch">
            {CATEGORIES.map((category, index) => {
              const isActive = category.id === activeCategory;
              return (
                <div
                  key={category.id}
                  className={`flex flex-col border-b border-outline-variant/20 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 ${
                    isActive ? "bg-primary/[0.04]" : ""
                  }`}
                >
                  <a
                    href={getPathForTab(category.defaultTabId)}
                    onClick={(event) => {
                      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
                      event.preventDefault();
                      onNavigate(category.defaultTabId);
                    }}
                    aria-current={isActive ? "page" : undefined}
                    className={`group flex flex-col px-4 py-3 transition-colors ${isActive ? "" : "hover:bg-surface-dim/30"}`}
                  >
                    <span className="flex items-center justify-between gap-2">
                      <span className={`font-mono text-[9px] tracking-[0.2em] ${isActive ? "text-primary" : "text-on-surface-variant/70"}`}>
                        {NUMBERS[index]}
                      </span>
                      {isActive && <span className="h-px w-8 bg-primary" aria-hidden />}
                    </span>
                    <span className={`mt-1 block font-heading text-xl leading-none sm:text-[22px] ${isActive ? "text-primary" : "text-on-surface"}`}>
                      {category.label}
                    </span>
                    <span className="mt-1.5 block text-[10px] leading-snug text-on-surface-variant">
                      {CATEGORY_HINTS[category.id]}
                    </span>
                  </a>

                  {isActive && activeSubs.length > 1 && (
                    <div className="mx-4 mb-4 border-t border-primary/20 pt-2">
                      <div className="mb-1.5 flex items-center justify-between gap-2">
                        <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-primary">
                          Dentro de este capítulo
                        </span>
                        <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-on-surface-variant/60">
                          {activeSubs.length}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                        {activeSubs.map((sub, subIndex) => {
                          const isActiveSub = sub.tabId === activeTab;
                          return (
                            <a
                              key={sub.tabId}
                              href={sub.path}
                              onClick={(event) => {
                                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
                                event.preventDefault();
                                onNavigate(sub.tabId);
                              }}
                              aria-current={isActiveSub ? "page" : undefined}
                              className={`flex items-baseline gap-1.5 font-mono text-[9px] uppercase leading-snug tracking-[0.04em] transition-colors ${
                                isActiveSub
                                  ? "font-bold text-primary underline decoration-primary/50 underline-offset-4"
                                  : "text-on-surface-variant hover:text-on-surface hover:underline hover:underline-offset-4"
                              }`}
                            >
                              <span className="shrink-0 text-[8px] text-on-surface-variant/80">
                                {index + 1}.{subIndex + 1}
                              </span>
                              <span>{sub.label}</span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "MAP") {
    return (
      <div className="w-full max-w-full min-w-0" data-nav-concept="MAP">
        {header("Mapa")}
        {/* Móvil: línea vertical */}
        <div className="relative pl-6 sm:hidden">
          <div className="absolute bottom-3 left-[9px] top-3 w-px bg-outline-variant/35" aria-hidden />
          {CATEGORIES.map((category, index) => {
            const isActive = category.id === activeCategory;
            return (
              <div key={category.id} className="relative pb-4 last:pb-0">
                <span
                  className={`absolute -left-6 top-0 flex h-[19px] w-[19px] items-center justify-center rounded-full border text-[8px] font-mono ${
                    isActive
                      ? "border-primary bg-primary text-on-primary"
                      : "border-outline-variant/50 bg-surface text-on-surface-variant"
                  }`}
                  aria-hidden
                >
                  {index + 1}
                </span>
                <a
                  href={getPathForTab(category.defaultTabId)}
                  onClick={(event) => {
                    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
                    event.preventDefault();
                    onNavigate(category.defaultTabId);
                  }}
                  aria-current={isActive ? "page" : undefined}
                  className={`block ${isActive ? "text-primary" : "text-on-surface"}`}
                >
                  <span className="block font-heading text-lg font-semibold leading-tight">{category.label}</span>
                  <span className="mt-0.5 block text-[10px] leading-snug text-on-surface-variant">
                    {CATEGORY_HINTS[category.id]}
                  </span>
                  {isActive && (
                    <span className="mt-1 inline-block font-mono text-[8px] uppercase tracking-[0.16em] text-primary">
                      Estás aquí
                    </span>
                  )}
                </a>
                {isActive && activeSubs.length > 1 && (
                  <div className="mt-2 border-l border-primary/30 pl-3">
                    {subLinks("font-mono text-[9px] uppercase tracking-[0.06em]")}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Escritorio: línea horizontal */}
        <div className="hidden sm:block">
          <div className="relative">
            <div className="absolute left-[12.5%] right-[12.5%] top-[18px] h-px bg-outline-variant/40" aria-hidden />
            <div className="grid grid-cols-4">
              {CATEGORIES.map((category, index) => {
                const isActive = category.id === activeCategory;
                return (
                  <a
                    key={category.id}
                    href={getPathForTab(category.defaultTabId)}
                    onClick={(event) => {
                      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
                      event.preventDefault();
                      onNavigate(category.defaultTabId);
                    }}
                    aria-current={isActive ? "page" : undefined}
                    className="group flex flex-col items-center px-4 text-center"
                  >
                    <span
                      className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border font-mono text-[10px] transition-colors ${
                        isActive
                          ? "border-primary bg-primary text-on-primary"
                          : "border-outline-variant/50 bg-surface text-on-surface-variant group-hover:border-primary/50"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className={`mt-3 font-heading text-base font-semibold ${isActive ? "text-primary" : "text-on-surface"}`}>
                      {category.label}
                    </span>
                    <span className="mt-1 max-w-[180px] text-[10px] leading-snug text-on-surface-variant">
                      {CATEGORY_HINTS[category.id]}
                    </span>
                    {isActive && (
                      <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-primary">
                        Estás aquí
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-3 border-t border-outline-variant/20 pt-3">
            <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-primary">
              Paradas de {activeCategoryData.label}
            </span>
            {subLinks("font-mono text-[10px] uppercase tracking-[0.08em]")}
            <span className="ml-auto shrink-0 font-mono text-[9px] uppercase tracking-[0.12em] text-on-surface-variant/60">
              {activeSubs.length} paradas
            </span>
          </div>
        </div>
      </div>
    );
  }

  // COMPASS
  const positions = [
    "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
    "right-0 top-1/2 translate-x-1/2 -translate-y-1/2",
    "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
    "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
  ];
  const activeIndex = Math.max(0, CATEGORIES.findIndex((category) => category.id === activeCategory));

  return (
    <div className="w-full max-w-full min-w-0" data-nav-concept="COMPASS">
      {header("Brújula")}
      <div className="flex flex-col items-center">
        <div className="relative h-[210px] w-[210px] sm:h-[250px] sm:w-[250px]">
          <div className="absolute inset-0 rounded-full border border-outline-variant/30" aria-hidden />
          <div className="absolute inset-[18px] rounded-full border border-dashed border-outline-variant/25" aria-hidden />
          <div className="absolute inset-[38px] rounded-full border border-outline-variant/15" aria-hidden />

          {CATEGORIES.map((category, index) => {
            const isActive = category.id === activeCategory;
            return (
              <a
                key={category.id}
                href={getPathForTab(category.defaultTabId)}
                onClick={(event) => {
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
                  event.preventDefault();
                  onNavigate(category.defaultTabId);
                }}
                aria-current={isActive ? "page" : undefined}
                className={`absolute z-20 max-w-[86px] rounded-full border px-2.5 py-1.5 text-center font-mono text-[8px] uppercase leading-tight tracking-[0.04em] transition-colors sm:max-w-[100px] sm:text-[9px] ${positions[index]} ${
                  isActive
                    ? "border-primary bg-primary text-on-primary shadow-sm"
                    : "border-outline-variant/30 bg-surface/90 text-on-surface-variant hover:border-primary/40 hover:text-on-surface"
                }`}
              >
                {category.label}
              </a>
            );
          })}

          <div className="absolute inset-[62px] flex flex-col items-center justify-center rounded-full border border-outline-variant/20 bg-surface/70 text-center shadow-inner backdrop-blur-sm sm:inset-[72px]">
            <Compass
              className="mb-1 h-5 w-5 text-primary transition-transform duration-500 sm:h-6 sm:w-6"
              style={{ transform: `rotate(${activeIndex * 90}deg)` }}
              aria-hidden
            />
            <span className="font-heading text-[11px] font-semibold leading-tight text-on-surface sm:text-xs">
              {activeCategoryData.label}
            </span>
            <span className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.14em] text-on-surface-variant">
              Estás aquí
            </span>
          </div>
        </div>

        <div className="mt-4 flex w-full flex-col items-center gap-1.5 border-t border-outline-variant/20 pt-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary">
            Dentro de {activeCategoryData.label}
          </span>
          {subLinks("font-mono text-[9px] uppercase tracking-[0.06em] sm:text-[10px]")}
        </div>
      </div>
    </div>
  );
}
