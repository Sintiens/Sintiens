import { useEffect, useRef } from "react";

export function useFocusTrap(active: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    const container = containerRef.current;
    const focusable = () => Array.from(container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter(el => !el.hasAttribute("hidden") && el.getAttribute("aria-hidden") !== "true");

    const first = focusable()[0];
    // Focus first element after paint
    requestAnimationFrame(() => first?.focus());

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
    container.addEventListener("keydown", onKeyDown);
    return () => container.removeEventListener("keydown", onKeyDown);
  }, [active]);

  return containerRef;
}
