import { motion } from "motion/react";
import { EASE_SUBTLE } from "../styles/motionTokens";

interface ThemeRevealProps {
  rect: DOMRect;
  nextTheme: "dark" | "light";
  onDone: () => void;
}

/**
 * Fallback para navegadores sin View Transitions API.
 * Expande un círculo desde el botón que revela el próximo tema.
 * Muy ligero: 1 div fixed, solo clip-path (GPU), 0.75s afinado.
 */
export default function ThemeReveal({ rect, nextTheme, onDone }: ThemeRevealProps) {
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  // Radio máximo para cubrir toda la pantalla desde el punto de origen
  const maxR = Math.hypot(
    Math.max(cx, window.innerWidth - cx),
    Math.max(cy, window.innerHeight - cy)
  ) + 16;

  const bg = nextTheme === "dark" ? "oklch(15% 0.001 160)" : "oklch(98% 0.001 160)";

  return (
    <motion.div
      aria-hidden
      className="fixed inset-0 z-[9999] pointer-events-none"
      style={{
        background: bg,
        clipPath: `circle(0px at ${cx}px ${cy}px)`,
      }}
      initial={{ clipPath: `circle(0px at ${cx}px ${cy}px)` }}
      animate={{ clipPath: `circle(${maxR}px at ${cx}px ${cy}px)` }}
      transition={{ duration: 0.75, ease: EASE_SUBTLE }}
      onAnimationComplete={onDone}
    />
  );
}
