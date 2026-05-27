---
name: Precision Minimalist
colors:
  surface: '#fbf8ff'
  surface-dim: '#dad9e3'
  surface-bright: '#fbf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f2fd'
  surface-container: '#eeedf7'
  surface-container-high: '#e8e7f1'
  surface-container-highest: '#e3e1ec'
  on-surface: '#1a1b22'
  on-surface-variant: '#4c4546'
  inverse-surface: '#2f3038'
  inverse-on-surface: '#f1effa'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#b90538'
  on-secondary: '#ffffff'
  secondary-container: '#dc2c4f'
  on-secondary-container: '#fffbff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1b1b'
  on-tertiary-container: '#848484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#ffdadb'
  secondary-fixed-dim: '#ffb2b7'
  on-secondary-fixed: '#40000d'
  on-secondary-fixed-variant: '#92002a'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1b1b1b'
  on-tertiary-fixed-variant: '#474747'
  background: '#fbf8ff'
  on-background: '#1a1b22'
  surface-variant: '#e3e1ec'
  surface-alt: '#F9FAFB'
  border-subtle: '#E4E4E7'
  accent-rose: '#F43F5E'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1120px
  gutter: 24px
  margin-mobile: 20px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 80px
---

## Brand & Style
The design system is defined by a "Precision Minimalist" aesthetic, prioritizing content clarity and typographic intent over decorative elements. It targets a sophisticated audience—likely in tech, design, or engineering—who values efficiency, readability, and subtle detail.

The style is characterized by heavy use of negative space, a restricted monochromatic palette punctuated by high-energy accents, and a focus on structural alignment. It draws heavily from **Minimalism** and **Developer-centric** design movements, utilizing sharp layouts and high-contrast text to create a digital environment that feels both utilitarian and premium.

## Colors
The palette is rooted in a high-contrast monochromatic base. White (`#FFFFFF`) serves as the primary canvas, while Black (`#000000`) is used for primary text and structural elements to ensure maximum legibility.

- **Primary:** Black is used for all core communication and primary actions.
- **Secondary/Accent:** Rose (`#F43F5E`) is used sparingly for interactive cues, highlights, and critical calls to action.
- **Neutral:** Zinc (`#71717A`) is reserved for secondary metadata, labels, and helper text.
- **Surface:** A very light gray (`#F9FAFB`) provides subtle tonal separation for cards or background sections without breaking the minimalist flow.

## Typography
Typography is the primary vehicle for visual hierarchy in this design system. It exclusively uses **Geist**, a typeface that embodies technical precision and modern minimalism.

- **Scale:** Headlines use tight tracking and leading to create a "block" effect.
- **Body:** Body text is optimized for long-form reading with generous line-height (`1.6`) and standard tracking.
- **Metadata:** Smaller labels and captions use a slightly heavier weight (`500`) and increased letter spacing to maintain clarity at small scales.
- **Mobile:** Headline sizes reduce on mobile, but line-height remains consistent to preserve the airy feel.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy for desktop, centering content within a clean 1120px container to prevent excessive line lengths.

- **Grid:** A 12-column system is used, but content typically occupies the central 8 or 10 columns to increase white space on the peripheries.
- **Vertical Rhythm:** Sections are separated by large gaps (`80px`+) to allow the design to "breathe." 
- **Mobile:** On smaller screens, margins transition to `20px` and the layout collapses to a single-column stack. 
- **Alignment:** Strict horizontal alignment is required; elements should align to the left edge of the typographic container to reinforce the structured, orderly feel.

## Elevation & Depth
Depth is created through **Tonal Layers** and **Low-Contrast Outlines** rather than traditional shadows. 

- **Surfaces:** Use `#F9FAFB` for background blocks or "cards" to distinguish them from the pure white background.
- **Borders:** Instead of shadows, use 1px solid borders in `#E4E4E7` to define boundaries between interactive elements.
- **Interactivity:** Elevation is implied by a color shift (e.g., a background change from White to `#F9FAFB`) or a slight increase in border contrast upon hover, rather than a physical lift.

## Shapes
The shape language is "Soft" (`0.25rem`). This slight rounding takes the edge off the brutalist tendencies of the monochromatic palette without making the UI feel overly playful or "bubbly."

- **Base Radius:** 4px for buttons, input fields, and small UI components.
- **Large Radius:** 8px (`rounded-lg`) for container blocks or large imagery.
- **Consistency:** All interactive elements must share the same corner radius to maintain a cohesive, disciplined appearance.

## Components
- **Buttons:** Solid Black background with White text for primary actions. Ghost buttons (Black 1px border, transparent background) for secondary actions. Always 4px rounded.
- **Chips:** Small, `#F9FAFB` background with Zinc (`#71717A`) text. Used for categories or tags.
- **Inputs:** Minimalist bottom-border or 1px light gray outline. Focused state uses a 1px Black border. No heavy inner shadows.
- **Cards:** Flat design. No shadow. Defined by a subtle border (`#E4E4E7`) or a tonal shift to `#F9FAFB`. 
- **Links:** Inline links are underlined or use the Accent Rose color on hover. The transition should be an instant color snap, reflecting the technical nature of the system.
- **Lists:** Clean, bulletless lists for navigation, using vertical spacing (`stack-md`) and subtle divider lines to separate items.