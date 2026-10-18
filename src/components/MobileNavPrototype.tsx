import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { BookOpen, Compass, FlaskConical, Newspaper, ChevronDown, X } from "lucide-react";
import { CATEGORIES, getCategoryForTab, getPathForTab } from "../data/sections";
import type { TabType } from "../types";

type Variant = "A" | "B";

interface MobileNavPrototypeProps {
  variant: Variant;
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
  themeToggle: ReactNode;
}

const CATEGORY_ICONS = {
  argumento: Compass,
  glosario: BookOpen,
  laboratorio: FlaskConical,
  noticias: Newspaper,
} as const;

const CATEGORY_HINTS: Record<string, string> = {
  argumento: "Relato, cifras, cronología y crítica",
  glosario: "Conceptos, autores y obras",
  laboratorio: "8 herramientas interactivas",
  noticias: "Actualidad y análisis",
};

/**
 * Prototipos de navegación móvil (solo para revisión visual).
 * Se activan con ?nav=A o ?nav=B; el menú actual sigue siendo el de por defecto.
 */
export default function MobileNavPrototype({
  variant,
  activeTab,
  onNavigate,
  themeToggle,
}: MobileNavPrototypeProps) {
  const activeCategory = getCategoryForTab(activeTab);
  const activeCategoryData = CATEGORIES.find((category) => category.id === activeCategory) ?? CATEGORIES[0]!;
  const activeSubs = activeCategoryData.subSections;
  const [moreOpen, setMoreOpen] = useState(false);
  const moreButtonRef = useRef<HTMLButtonElement | null>(null);
  const morePanelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMoreOpen(false);
  }, [activeTab]);

  useEffect(() => {
    if (!moreOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMoreOpen(false);
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (morePanelRef.current?.contains(target) || moreButtonRef.current?.contains(target)) return;
      setMoreOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [moreOpen]);

  const visibleSubs = (() => {
    if (activeSubs.length <= 4) return activeSubs.map((sub) => ({ ...sub, overflow: false }));
    const activeIndex = activeSubs.findIndex((sub) => sub.tabId === activeTab);
    const current = activeIndex >= 0 ? activeSubs[activeIndex] : undefined;
    const ordered =
      activeIndex >= 3 && current
        ? [current, ...activeSubs.filter((_, index) => index !== activeIndex).slice(0, 2)]
        : activeSubs.slice(0, 3);
    return ordered.map((sub) => ({ ...sub, overflow: false }));
  })();
  const hiddenSubs = activeSubs.filter((sub) => !visibleSubs.some((visible) => visible.tabId === sub.tabId));

  const categoryLink = (category: (typeof CATEGORIES)[number], className: string) => {
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
        className={className}
      >
        {category.label}
      </a>
    );
  };

  return (
    <div
      className={variant === "B" ? "w-full max-w-full min-w-0" : "sm:hidden w-full max-w-full min-w-0"}
      data-nav-prototype={variant}
    >
      {variant === "A" ? (
        <div className="flex w-full min-w-0 items-center gap-1.5">
          <div className="flex min-w-0 flex-1 items-center rounded-full border border-outline-variant/25 bg-surface/85 dark:bg-surface-container/70 shadow-sm backdrop-blur-md p-1">
            <div className="grid w-full min-w-0 grid-cols-4 gap-0.5 max-[359px]:grid-cols-2">
              {CATEGORIES.map((category) =>
                categoryLink(
                  category,
                  `flex min-h-[38px] min-w-0 items-center justify-center rounded-full px-1 text-center text-[9px] font-mono uppercase leading-[1.15] tracking-[0.04em] transition-colors ${
                    category.id === activeCategory
                      ? "bg-primary/15 text-primary font-bold"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`
                )
              )}
            </div>
          </div>
          <div className="shrink-0">{themeToggle}</div>
        </div>
      ) : (
        <div className="w-full">
          <div className="flex items-center justify-between gap-2 px-2 pb-1">
            <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-on-surface-variant">Explorar</span>
            {themeToggle}
          </div>
          <div className="grid grid-cols-2 gap-1.5 rounded-2xl border border-outline-variant/20 bg-surface/75 p-1.5 shadow-sm backdrop-blur-md dark:bg-surface-container/55 sm:grid-cols-4 sm:gap-2 sm:p-2">
            {CATEGORIES.map((category) => {
              const Icon = CATEGORY_ICONS[category.id as keyof typeof CATEGORY_ICONS];
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
                  className={`flex min-h-[62px] flex-col justify-between rounded-xl border px-3 py-2.5 text-left transition-colors sm:min-h-[86px] sm:px-4 sm:py-3 ${
                    isActive
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-outline-variant/20 bg-surface-container/30 text-on-surface hover:border-primary/25"
                  }`}
                >
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-[12px] font-heading font-bold leading-none sm:text-[14px]">{category.label}</span>
                    <Icon className="h-3.5 w-3.5 shrink-0 opacity-80 sm:h-4 sm:w-4" aria-hidden />
                  </span>
                  <span className="mt-1 block text-[9px] font-sans leading-tight opacity-70 sm:text-[10px]">
                    {CATEGORY_HINTS[category.id]}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {activeSubs.length > 1 && (
        <div className="relative mt-2 w-full min-w-0 rounded-2xl border border-primary/15 bg-primary/[0.035] p-2 sm:p-2.5">
          <div className="mb-1.5 flex items-center gap-2 px-1">
            <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-primary sm:text-[10px]">
              Dentro de {activeCategoryData.label}
            </span>
            <span className="h-px flex-1 bg-primary/15" />
            <span className="text-[9px] font-mono uppercase tracking-widest text-on-surface-variant">
              {activeSubs.length} apartados
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1">
            {visibleSubs.map((sub) => {
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
                  className={`flex min-h-[32px] items-center rounded-lg border px-2.5 text-[9px] font-mono uppercase tracking-[0.06em] transition-colors sm:min-h-[34px] sm:text-[10px] ${
                    isActive
                      ? "border-primary/25 bg-primary/15 font-bold text-primary"
                      : "border-transparent text-on-surface-variant hover:bg-surface-dim/50 hover:text-on-surface"
                  }`}
                >
                  {sub.label}
                </a>
              );
            })}
            {hiddenSubs.length > 0 && (
              <button
                ref={moreButtonRef}
                type="button"
                onClick={() => setMoreOpen((open) => !open)}
                aria-expanded={moreOpen}
                aria-controls="mobile-more-subs"
                className="flex min-h-[32px] items-center gap-1 rounded-lg px-2.5 text-[9px] font-mono uppercase tracking-[0.06em] text-primary hover:bg-primary/10 sm:min-h-[34px] sm:text-[10px]"
              >
                +{hiddenSubs.length} <ChevronDown className={`h-3 w-3 transition-transform ${moreOpen ? "rotate-180" : ""}`} aria-hidden />
              </button>
            )}
          </div>
        </div>
      )}

      {moreOpen && hiddenSubs.length > 0 && (
        <div
          ref={morePanelRef}
          id="mobile-more-subs"
          className="absolute inset-x-0 top-full z-[130] mt-2 rounded-2xl border border-outline-variant/25 bg-surface/95 p-3 shadow-2xl backdrop-blur-xl dark:bg-zinc-950/95"
        >
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="text-[9px] font-mono uppercase tracking-[0.16em] text-on-surface-variant">
              Herramientas del laboratorio
            </span>
            <button
              type="button"
              onClick={() => setMoreOpen(false)}
              aria-label="Cerrar herramientas"
              className="rounded-full p-1 text-on-surface-variant hover:text-on-surface"
            >
              <X className="h-3.5 w-3.5" aria-hidden />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-1">
            {activeSubs.map((sub) => {
              const isActive = sub.tabId === activeTab;
              return (
                <a
                  key={`all-${sub.tabId}`}
                  href={sub.path}
                  onClick={(event) => {
                    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
                    event.preventDefault();
                    setMoreOpen(false);
                    onNavigate(sub.tabId);
                  }}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex min-h-[38px] items-center rounded-lg px-2.5 text-[9px] font-mono uppercase tracking-[0.05em] ${
                    isActive ? "bg-primary/15 font-bold text-primary" : "text-on-surface-variant hover:bg-surface-dim/50 hover:text-on-surface"
                  }`}
                >
                  {sub.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
