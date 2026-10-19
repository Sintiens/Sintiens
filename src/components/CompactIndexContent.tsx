import type { ReactNode } from "react";
import { X } from "lucide-react";
import { CATEGORIES, getCategoryForTab, getPathForTab } from "../data/sections";
import type { TabType } from "../types";

interface CompactIndexContentProps {
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
  themeToggle: ReactNode;
  onClose?: () => void;
}

const CATEGORY_HINTS: Record<string, string> = {
  argumento: "Empieza por el Relato: cifras, cronología y dilemas",
  glosario: "Conceptos, autores y obras",
  laboratorio: "7 herramientas para experimentar",
  noticias: "Casos reales y su análisis",
};

const NUMBERS = ["01", "02", "03", "04"];

const SUB_HINTS: Record<string, string> = {
  historia_narrativa: "La historia que abre el proyecto",
  datos: "Datos, fuentes y comparativas",
  cronologia: "Los hitos del debate",
  dialectica: "Objeciones y dilemas",
  grafo: "Consulta rápida de conceptos",
  laboratorio_hub: "Puerta de entrada",
  velo_rawls: "Experimento de justicia",
  termodinamica: "Energía y alimentación",
  neurobiologia: "Consciencia y dolor",
  nutricion: "Nutrientes y mitos",
  welfarewashing: "Bienestar de escaparate",
  calculadora: "Tu impacto anual",
  validador: "Desmonta tu argumento",
  noticias: "Actualidad y casos",
};

export default function CompactIndexContent({ activeTab, onNavigate, themeToggle, onClose }: CompactIndexContentProps) {
  const activeCategory = getCategoryForTab(activeTab);
  const activeCategoryData = CATEGORIES.find((category) => category.id === activeCategory) ?? CATEGORIES[0]!;
  const activeSubs = activeCategoryData.subSections;
  const apartadosLabel = (count: number) => `${count} ${count === 1 ? "apartado" : "apartados"}`;

  const header = (label: string) => (
    <div className="mb-3 flex items-center justify-between gap-3 px-1">
      <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-on-surface-variant">{label}</span>
      <div className="flex items-center gap-1">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar índice"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        )}
        {themeToggle}
      </div>
    </div>
  );

    const activeIndex = Math.max(0, CATEGORIES.findIndex((category) => category.id === activeCategory));
    return (
      <div className="w-full max-w-full min-w-0" data-compact-index="true">
        {/* Móvil compacto: cuatro pestañas en una fila + página del capítulo */}
        <div className="sm:hidden">
          {header("Índice")}
          <div className="grid grid-cols-4 gap-1 rounded-xl border border-outline-variant/25 p-1">
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
                  className={`flex min-h-[44px] flex-col items-center justify-center rounded-lg px-1 py-1 text-center transition-colors ${
                    isActive ? "bg-primary/10 text-primary" : "text-on-surface-variant hover:bg-surface-dim/40"
                  }`}
                >
                  <span className="font-mono text-[8px] leading-none opacity-60">{NUMBERS[index]}</span>
                  <span className="mt-1 font-heading text-[10px] font-semibold leading-tight">{category.label}</span>
                </a>
              );
            })}
          </div>
          <div className="mt-2 border-y border-outline-variant/25 bg-primary/[0.035] px-4 py-3">
            <div className="flex items-center justify-between gap-3 font-mono text-[8px] uppercase tracking-[0.16em]">
              <span className="text-primary">Capítulo {NUMBERS[activeIndex]}</span>
              {activeSubs.length > 1 && (
                <span className="text-on-surface-variant/80">{apartadosLabel(activeSubs.length)}</span>
              )}
            </div>
            <h3 className="mt-1 font-heading text-2xl leading-none text-primary">{activeCategoryData.label}</h3>
            <p className="mt-1.5 text-[10px] leading-snug text-on-surface-variant">
              {CATEGORY_HINTS[activeCategoryData.id]}
            </p>
            {activeSubs.length > 1 ? (
              <div className="mt-3 grid grid-cols-2 gap-1">
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
                      className={`flex min-h-[44px] items-center gap-1.5 rounded-md px-2 transition-colors ${
                        isActiveSub
                          ? "bg-primary/10 font-bold text-primary"
                          : "text-on-surface-variant hover:bg-surface-dim/50 hover:text-on-surface"
                      }`}
                    >
                      <span className="shrink-0 font-mono text-[8px] opacity-60">
                        {activeIndex + 1}.{subIndex + 1}
                      </span>
                      <span className="font-mono text-[9px] uppercase leading-tight tracking-[0.03em]">{sub.label}</span>
                    </a>
                  );
                })}
              </div>
            ) : (
              <a
                href={getPathForTab(activeCategoryData.defaultTabId)}
                onClick={(event) => {
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
                  event.preventDefault();
                  onNavigate(activeCategoryData.defaultTabId);
                }}
                className="mt-3 flex min-h-[44px] items-center justify-between rounded-md bg-primary/10 px-3 font-mono text-[10px] uppercase tracking-[0.08em] text-primary"
              >
                Abrir {activeCategoryData.label} <span aria-hidden>→</span>
              </a>
            )}
          </div>
        </div>

        {/* Escritorio compacto: mismo master-detail, menos aire y 44 px por fila */}
        <div className="hidden sm:block">
          {header("Índice")}
          <div className="grid grid-cols-[0.95fr_1.35fr] border-y border-outline-variant/25">
            <div className="border-r border-outline-variant/25">
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
                    className={`flex min-h-[56px] gap-3 border-b border-outline-variant/20 px-4 py-3 transition-colors last:border-b-0 ${
                      isActive
                        ? "border-l-2 border-l-primary bg-primary/[0.04]"
                        : "border-l-2 border-l-transparent hover:bg-surface-dim/30"
                    }`}
                  >
                    <span className={`mt-0.5 font-mono text-[9px] tracking-[0.18em] ${isActive ? "text-primary" : "text-on-surface-variant/80"}`}>
                      {NUMBERS[index]}
                    </span>
                    <span className="min-w-0">
                      <span className={`block font-heading text-lg leading-none ${isActive ? "text-primary" : "text-on-surface"}`}>
                        {category.label}
                      </span>
                      <span className="mt-1 block text-[9px] leading-snug text-on-surface-variant">
                        {CATEGORY_HINTS[category.id]}
                      </span>
                    </span>
                  </a>
                );
              })}
            </div>
            <div className="bg-primary/[0.025] px-5 py-4">
              <div className="flex items-center justify-between gap-3 font-mono text-[8px] uppercase tracking-[0.16em]">
                <span className="text-primary">Capítulo {NUMBERS[activeIndex]}</span>
                {activeSubs.length > 1 && (
                  <span className="text-on-surface-variant/80">{apartadosLabel(activeSubs.length)}</span>
                )}
              </div>
              <h3 className="mt-1 font-heading text-2xl leading-none text-primary">{activeCategoryData.label}</h3>
              <p className="mt-1.5 text-[10px] leading-snug text-on-surface-variant">
                {CATEGORY_HINTS[activeCategoryData.id]}
              </p>
              {activeSubs.length > 1 && (
                <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1">
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
                        className={`group flex min-h-[44px] items-start gap-2 rounded-sm px-1 py-1 transition-colors ${
                          isActiveSub ? "bg-primary/[0.06] text-primary" : "text-on-surface-variant hover:bg-surface-dim/40"
                        }`}
                      >
                        <span className="mt-0.5 shrink-0 font-mono text-[8px] opacity-60">
                          {activeIndex + 1}.{subIndex + 1}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={`block font-mono text-[9px] uppercase tracking-[0.05em] transition-colors group-hover:text-on-surface ${isActiveSub ? "font-bold" : ""}`}>
                            {sub.label}
                          </span>
                          <span className="mt-0.5 block text-[9px] leading-snug text-on-surface-variant/80">
                            {SUB_HINTS[sub.tabId]}
                          </span>
                        </span>
                      </a>
                    );
                  })}
                </div>
              )}
              <a
                href={getPathForTab(activeCategoryData.defaultTabId)}
                onClick={(event) => {
                  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
                  event.preventDefault();
                  onNavigate(activeCategoryData.defaultTabId);
                }}
                className="mt-3 inline-flex min-h-[32px] items-center gap-1 font-mono text-[9px] uppercase tracking-[0.12em] text-primary hover:underline hover:underline-offset-4"
              >
                Entrar en {activeCategoryData.label} <span aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
}
