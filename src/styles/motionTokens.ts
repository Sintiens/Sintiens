/**
 * motionTokens — Sistema físico único para toda la app
 * Academic Naturalism: quiet, preciso, sin rebotes.
 * Todos los componentes deben importar de aquí, nunca hardcodear durations/eases.
 */

// Easing — curva editorial principal (usada en StoryMode, ExcusesDilemmas)
export const EASE_ENTER = [0.22, 1, 0.36, 1] as const;
export const EASE_SUBTLE = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT = "easeOut" as const;
export const EASE_SPRING = [0.25, 1, 0.5, 1] as const;

// Spring — único para toda la navegación. Tenso premium, sin overshoot.
export const SPRING_NAV = {
  type: "spring" as const,
  stiffness: 380,
  damping: 32,
};

export const SPRING_SMOOTH = {
  type: "spring" as const,
  stiffness: 320,
  damping: 30,
};

export const SPRING_GENTLE = {
  type: "spring" as const,
  stiffness: 260,
  damping: 28,
};

// Durations (segundos)
export const DUR = {
  instant: 0.14,
  fast: 0.2,
  base: 0.32,
  slow: 0.55,
  stagger: 0.06,
  pageSub: 0.22,
  pageCat: 0.34,
} as const;

// Variants reutilizables
export const headerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
} as const;

export const childVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE_ENTER },
  },
} as const;

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DUR.fast, ease: EASE_ENTER } },
  exit: { opacity: 0, transition: { duration: DUR.instant, ease: EASE_OUT } },
} as const;

export const slideUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: EASE_ENTER } },
  exit: { opacity: 0, y: -6, transition: { duration: DUR.fast, ease: EASE_OUT } },
} as const;

// Page transitions (usadas en App.tsx)
export const PAGE_SUB = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: DUR.pageSub, ease: EASE_SUBTLE },
} as const;

export const PAGE_CAT = {
  initial: { opacity: 0, y: 10, scale: 0.985 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -6, scale: 0.99 },
  transition: { duration: DUR.pageCat, ease: EASE_SPRING },
} as const;

// Hook para respetar prefers-reduced-motion
export function getReducedMotionDurations(isReduced: boolean): typeof DUR {
  if (!isReduced) return DUR;
  return {
    instant: 0.01,
    fast: 0.01,
    base: 0.01,
    slow: 0.01,
    stagger: 0,
    pageSub: 0.01,
    pageCat: 0.01,
  } as unknown as typeof DUR;
}
