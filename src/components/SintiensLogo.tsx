/**
 * SintiensLogo — Logo component using CSS mask-image for pixel-perfect fidelity.
 *
 * Uses the original PNG as a mask shape, with the fill color controlled by
 * CSS background-color — enabling theme-reactive coloring (green in light,
 * white in dark) without any loss of detail from SVG tracing.
 *
 * The logo depicts a leaf containing a human face profile (left),
 * a fox face (right), and leaf veins (center) — symbolizing the
 * interconnection between humans, animals, and nature.
 */

interface SintiensLogoProps {
  /** Additional CSS classes */
  className?: string;
  /** Enable hover animation (scale + subtle rotation) */
  animated?: boolean;
  /** Override color (ignores theme) */
  color?: string;
  /** Accessible label for screen readers */
  ariaLabel?: string;
}

export default function SintiensLogo({
  className = "",
  animated = false,
  color,
  ariaLabel = "Logo de Sintiens",
}: SintiensLogoProps) {
  const bgColor = color
    ? color
    : undefined; // Will be handled via Tailwind classes

  const colorClass = color
    ? ""
    : "bg-[#1B6B37] dark:bg-surface-container";

  const animationClass = animated
    ? "transition-all duration-300 ease-out hover:scale-[1.08] hover:rotate-[3deg]"
    : "transition-[background-color] duration-300";

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={`${colorClass} ${animationClass} ${className}`.trim()}
      style={{
        maskImage: "url(/logo-green-transparent.png)",
        WebkitMaskImage: "url(/logo-green-transparent.png)",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        ...(bgColor ? { backgroundColor: bgColor } : {}),
      }}
    />
  );
}
