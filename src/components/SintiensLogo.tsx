/**
 * SintiensLogo — "S" serif (Georgia) + green leaf accent.
 *
 * Mirrors the approved data-URL preview: flex container with a <span>
 * for the S and an inline <svg> for the leaf, sized in em so the
 * logo scales with the parent's font-size.
 *
 * Colors adapt to light/dark theme via Tailwind utilities.
 */

interface SintiensLogoProps {
  /** Tailwind sizing classes (e.g. "w-5 h-7") */
  className?: string;
  /** Accessible label for screen readers */
  ariaLabel?: string;
}

export default function SintiensLogo({
  className = "",
  ariaLabel = "Sintiens",
}: SintiensLogoProps) {
  return (
    <div
      role="img"
      aria-label={ariaLabel}
      style={{ display: "flex", alignItems: "flex-end", justifyContent: "center" }}
      className={`text-zinc-900 dark:text-zinc-50 ${className}`}
    >
      <span
        style={{
          fontFamily: 'Georgia, "Times New Roman", serif',
          fontSize: "1.6em",
          fontWeight: 500,
          lineHeight: 0.85,
          color: "currentColor",
        }}
      >
        S
      </span>
      <svg
        style={{
          width: "0.57em",
          height: "0.57em",
          marginLeft: "-0.21em",
          marginBottom: "0.25em",
        }}
        viewBox="0 0 22 22"
        fill="currentColor"
        className="text-[#1B6B37] dark:text-[#4ade80]"
        aria-hidden="true"
      >
        <path d="M18 18Q8 14 4 4Q16 4 18 18Z" />
      </svg>
    </div>
  );
}
