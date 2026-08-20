/**
 * glass — Tokens de glassmorphism unificados
 * Academic Naturalism: blur-md (12px) como base, before: pseudo para no bloquear blur
 * Usa estas clases en lugar de hardcodear backdrop-blur-2xl/3xl
 */

export const GLASS_CARD = "glass-enhance border border-outline-variant/20 rounded-2xl before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none relative";
export const GLASS_CARD_SM = "glass-enhance border border-outline-variant/15 rounded-xl before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none relative";
export const GLASS_PILL = "glass-enhance border border-outline-variant/20 rounded-full before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none relative";
export const GLASS_NAV = "glass-enhance border-y border-outline-variant/15 before:content-[''] before:absolute before:inset-0 before:bg-surface-dim/20 dark:before:bg-surface-dim/10 before:backdrop-blur-md before:z-[-1] before:pointer-events-none";

export const HERO_WRAPPER = "w-full flex flex-col lg:justify-center items-center text-center relative h-[550px] min-h-[550px] lg:h-[600px] lg:min-h-[600px] pt-16 lg:pt-28 pb-20 lg:pb-24 px-4 md:px-6 lg:px-8 border-b border-outline-variant/15";
export const HERO_ICON_STYLE = { width: "clamp(144px, 45vw, 540px)", height: "clamp(144px, 45vw, 540px)", opacity: 0.10, strokeWidth: 1.2 } as const;
export const HERO_FULL_BLEED = {
  width: "calc(100vw - var(--scrollbar-width, 0px))",
  marginLeft: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
  marginRight: "calc(-50vw + var(--scrollbar-width, 0px) / 2 + 50%)",
} as const;

export const BADGE_MONO = "text-[10px] font-mono uppercase tracking-widest font-semibold";
export const BADGE_MONO_SM = "text-[9px] font-mono uppercase tracking-widest font-semibold";
