import { useEffect, useRef } from "react";
import { useFocusTrap } from "./useFocusTrap";
import { lockScroll, unlockScroll } from "../utils/scrollLock";

/**
 * Overlay accesible para bottom sheets y diálogos:
 * - atrapa el foco dentro del contenedor (con red de seguridad si escapa)
 * - bloquea el scroll del body mientras está activo
 * - cierra con Escape (opcional)
 * Devuelve el ref que debe asignarse al contenedor del overlay.
 */
export function useModalOverlay(active: boolean, onEscape?: () => void) {
  const containerRef = useFocusTrap(active);
  const onEscapeRef = useRef(onEscape);
  onEscapeRef.current = onEscape;

  useEffect(() => {
    if (!active) return;
    lockScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onEscapeRef.current?.();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [active]);

  return containerRef;
}
