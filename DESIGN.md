---
name: Scientific Ethos
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#424844'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#727974'
  outline-variant: '#c2c8c3'
  surface-tint: '#4c6358'
  primary: '#051b12'
  on-primary: '#ffffff'
  primary-container: '#1a3026'
  on-primary-container: '#80988b'
  inverse-primary: '#b3ccbe'
  secondary: '#4f6359'
  on-secondary: '#ffffff'
  secondary-container: '#cfe5d9'
  on-secondary-container: '#54675e'
  tertiary: '#0d1a12'
  on-tertiary: '#ffffff'
  tertiary-container: '#222f26'
  on-tertiary-container: '#88978b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cfe9d9'
  primary-fixed-dim: '#b3ccbe'
  on-primary-fixed: '#092016'
  on-primary-fixed-variant: '#354c40'
  secondary-fixed: '#d2e7dc'
  secondary-fixed-dim: '#b6cbc0'
  on-secondary-fixed: '#0d1f18'
  on-secondary-fixed-variant: '#384b42'
  tertiary-fixed: '#d7e6d9'
  tertiary-fixed-dim: '#bbcabd'
  on-tertiary-fixed: '#111e16'
  on-tertiary-fixed-variant: '#3c4a40'
  background: '#fcf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  technical-sm:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.5'
    letterSpacing: 0.05em
  technical-xs:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 32px
  margin-desktop: 64px
  margin-mobile: 20px
  unit: 8px
---

## Brand & Style

This design system establishes a visual language of "Academic Naturalism." It balances the raw, organic beauty of the natural world with the rigorous, clinical precision of scientific inquiry. The aesthetic is inspired by high-end digital journals and modern museum exhibits, prioritizing intellectual depth over fleeting trends.

The style is a hybrid of **Minimalism** and **Glassmorphism**, using generous whitespace to allow complex ethical concepts to breathe, while employing translucent layers to represent the "lens" through which we observe sentient life. Every element should feel intentional, quiet, and authoritative.

## Colors

The palette is designed to evoke the serenity of a deep forest and the gravity of a scholarly archive.

- **Primary (Forest Green):** Used for primary branding, navigation anchors, and significant headings to ground the experience in the natural world.
- **Secondary (Muted Sage):** Used for supporting elements and iconography.
- **Neutral (Slate Charcoal):** Reserved for body text and technical data to ensure maximum legibility and a serious tone.
- **Background (Warm Off-White):** A "paper-like" base that reduces eye strain and distinguishes the platform from generic white-label SaaS products.

## Typography

Typography is the primary vehicle for the brand’s "Scientific Ethos." 

1. **The Editorial Voice:** Use **Playfair Display** for all headlines. This high-contrast serif provides the "moral depth" and prestige of a luxury publication.
2. **The Narrative Voice:** Use **Hanken Grotesk** for long-form reading. It is a contemporary, clean sans-serif that remains unobtrusive and highly legible.
3. **The Analytical Voice:** Use **JetBrains Mono** for data visualizations, citations, metadata, and technical labels. The monospaced nature communicates accuracy, rigor, and the raw data behind ethical arguments.

## Layout & Spacing

This design system utilizes a **Structured Fluid Grid**. It follows a 12-column system for desktop and a 4-column system for mobile.

- **Museum Layouts:** Utilize asymmetrical layouts where text blocks are offset from images to create an editorial feel.
- **Vertical Rhythm:** A strict 8px baseline grid ensures that technical data and body text align perfectly across columns.
- **Negative Space:** Margin and padding should be "uncomfortably" generous. For long-form articles, use a max-width of 720px for the text container to maintain an optimal line length.

## Elevation & Depth

To maintain a sophisticated and modern feel, depth is achieved through layering and material properties rather than traditional shadows.

- **Glassmorphic Overlays:** Use a subtle backdrop blur (12px to 20px) on navigation bars and modal overlays. This creates a "specimen slide" effect, suggesting that content is being observed through a lens.
- **Tonal Layering:** Instead of shadows, use subtle shifts in background color (e.g., a slightly darker green or a warm grey) to indicate a surface is elevated.
- **Hairline Outlines:** Use 0.5px or 1px borders in a low-opacity slate charcoal (#2D2D2D, 15% opacity) to define cards and input fields without adding visual weight.

## Shapes

The shape language is primarily **Soft (0.25rem)**. 

- UI elements like buttons and input fields use a slight radius to feel approachable and organic.
- Images and "Specimen Cards" should maintain sharp corners or very minimal rounding to preserve the "museum exhibit" aesthetic. 
- Avoid pill-shaped buttons; instead, use rectangular buttons with soft corners to maintain a serious, architectural tone.

## Components

### Buttons
Primary buttons are solid Forest Green with White technical-sm typography. Secondary buttons use a slate charcoal hairline border with no fill. Interaction should involve a subtle color shift rather than a shadow.

### Cards
Cards are "Specimen Containers." They use a warm off-white background slightly darker than the page or a translucent glass effect. They feature 1px hairlines and no shadows. Headers within cards always use the Technical-XS monospaced style.

### Input Fields
Inputs are minimalist, defined only by a bottom border or a very light ghost outline. The focus state uses a Primary color 1px border.

### Data Visualization
Charts and graphs should be rendered in monochrome Forest Green or Slate Charcoal. Labels must be in JetBrains Mono. Use thin lines and avoid gradients in data representation to emphasize scientific rigor.

### Citations & Footnotes
Citations are treated as high-priority components. Use a specific "Footnote" style using JetBrains Mono, placed in the margins or at the base of the layout to mimic academic papers.