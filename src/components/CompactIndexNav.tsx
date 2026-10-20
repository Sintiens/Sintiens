import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BookOpen, Moon, Sun } from "lucide-react";
import type { TabType } from "../types";
import { lockScroll, unlockScroll } from "../utils/scrollLock";
import CompactIndexContent from "./CompactIndexContent";

interface CompactIndexNavProps {
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
  theme: "dark" | "light";
  onToggleTheme: (rect?: DOMRect) => void;
}

export default function CompactIndexNav({ activeTab, onNavigate, theme, onToggleTheme }: CompactIndexNavProps) {
  const [mode, setMode] = useState<"apart" | "top" | "off">("apart");
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia("(max-width: 639px)").matches,
  );
  const navRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const themeToggle = (
    <button
      type="button"
      onClick={(event) => onToggleTheme(event.currentTarget.getBoundingClientRect())}
      className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-on-surface-variant transition-colors hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
    </button>
  );

  useEffect(() => {
    const readMode = () => {
      const wrapper = navRef.current?.closest("[data-nav-mode]");
      const next = wrapper?.getAttribute("data-nav-mode");
      setMode(next === "top" ? "top" : next === "off" ? "off" : "apart");
    };
    readMode();
    const id = requestAnimationFrame(readMode);
    const wrapper = navRef.current?.closest("[data-nav-mode]");
    const observer = wrapper ? new MutationObserver(readMode) : null;
    observer?.observe(wrapper!, { attributes: true, attributeFilter: ["data-nav-mode"] });
    window.addEventListener("scroll", readMode, { passive: true });
    window.addEventListener("resize", readMode, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      observer?.disconnect();
      window.removeEventListener("scroll", readMode);
      window.removeEventListener("resize", readMode);
    };
  }, []);

  useEffect(() => {
    setOverlayOpen(false);
  }, [activeTab]);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 639px)");
    const onChange = () => {
      setIsMobile(query.matches);
      if (!query.matches) setOverlayOpen(false);
    };
    onChange();
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const closeOverlay = () => {
    setOverlayOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  useEffect(() => {
    if (!overlayOpen) return;
    lockScroll();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeOverlay();
    };
    document.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => {
      document.querySelector<HTMLElement>("[data-compact-overlay]")?.focus();
    }, 80);
    return () => {
      unlockScroll();
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [overlayOpen]);

  const handleNavigate = (tab: TabType) => {
    setOverlayOpen(false);
    onNavigate(tab);
  };

  const overlay =
    overlayOpen && isMobile && typeof document !== "undefined"
      ? createPortal(
          <div
            className="fixed inset-0 z-[200] flex items-start justify-center bg-black/55 p-2 backdrop-blur-sm sm:items-center sm:p-6"
            onPointerDown={closeOverlay}
          >
            <div
              data-compact-overlay
              id="compact-nav-overlay"
              role="dialog"
              aria-modal="true"
              aria-label="Índice de navegación"
              tabIndex={-1}
              style={{ outline: "none" }}
              className="mt-[max(0.5rem,env(safe-area-inset-top))] max-h-[calc(100dvh-1rem)] w-full max-w-3xl overflow-y-auto rounded-2xl border border-outline-variant/25 bg-surface/95 p-3 shadow-2xl backdrop-blur-xl sm:mt-0 sm:max-h-[calc(100dvh-3rem)] sm:p-4"
              onPointerDown={(event) => event.stopPropagation()}
            >
              <CompactIndexContent
                activeTab={activeTab}
                onNavigate={handleNavigate}
                themeToggle={themeToggle}
                onClose={closeOverlay}
              />
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <div ref={navRef} className="relative w-full max-w-full min-w-0">
      {mode === "apart" ? (
        <CompactIndexContent
          activeTab={activeTab}
          onNavigate={handleNavigate}
          themeToggle={themeToggle}
        />
      ) : (
        <div className="h-0" aria-hidden />
      )}

      {mode !== "apart" &&
        isMobile &&
        typeof document !== "undefined" &&
        createPortal(
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOverlayOpen(true)}
            aria-expanded={overlayOpen}
            aria-controls="compact-nav-overlay"
            className="fixed bottom-4 right-4 z-[95] inline-flex min-h-[48px] items-center gap-2 rounded-full border border-outline-variant/30 bg-surface/90 px-4 font-mono text-[10px] uppercase tracking-[0.12em] text-on-surface shadow-lg backdrop-blur-xl transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <BookOpen className="h-4 w-4" aria-hidden />
            Índice
          </button>,
          document.body,
        )}

      {overlay}
    </div>
  );
}
