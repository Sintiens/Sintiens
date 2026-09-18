import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function isVisible(el: HTMLElement): boolean {
  // offsetParent es null en fixed/ocultos; getClientRects cubre todos los casos
  return el.getClientRects().length > 0 && !el.hasAttribute("hidden") && el.getAttribute("aria-hidden") !== "true";
}

export function useFocusTrap(active: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    const container = containerRef.current;
    // Restaurar el foco al elemento que lo tenía al cerrar
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusable = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(isVisible);

    const focusInitial = () => {
      const first = focusable()[0];
      if (first) {
        first.focus();
      } else {
        // Sin elementos focusables: el propio contenedor recibe el foco
        if (!container.hasAttribute("tabindex")) container.setAttribute("tabindex", "-1");
        container.focus();
      }
    };

    // Focus first element after paint
    const raf = requestAnimationFrame(focusInitial);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const els = focusable();
      if (els.length === 0) return;
      const firstEl = els[0]!;
      const lastEl = els[els.length - 1]!;
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };
    // Red de seguridad: si el foco escapa (lectores de pantalla, clic programático), devolverlo al diálogo
    const onFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || container.contains(target)) return;
      // Si otro diálogo modal activo reclama el foco, no interferir
      const otherDialog = target.closest('[aria-modal="true"]');
      if (otherDialog && otherDialog !== container) return;
      focusInitial();
    };

    container.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
      previouslyFocused?.focus?.();
    };
  }, [active]);

  return containerRef;
}
