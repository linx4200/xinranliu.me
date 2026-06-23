---
name: Precision Minimalist
description: The design system of https://xinranliu.me , Light theme (the Dark theme is documented at ./DESIGN.dark.md), desktop version (the mobile version is documented at ./DESIGN.mobile.md)

colors:
  bg:
    token: 'var(--color-bg)'
    value: '#fff'
  surface:
    token: 'var(--color-surface)'
    value: 'oklch(98.5% 0 0)'
  surface-strong:
    token: 'var(--color-surface-strong)'
    value: 'oklch(37.1% 0 0)'
  text:
    token: 'var(--color-text)'
    value: '#1f1510'
  text-muted:
    token: 'var(--color-text-muted)'
    value: 'oklch(55.6% 0 0)'
  border:
    token: 'var(--color-border)'
    value: 'oklch(20.5% 0 0)'
  primary:
    token: 'var(--color-primary)'
    value: '#ff637e'
  accent-400:
    token: 'var(--color-accent-400)'
    value: '#ff7d93'
  accent-600:
    token: 'var(--color-accent-600)'
    value: '#e6526b'

rounded:
  # sm: 0.125rem
  # DEFAULT: 0.25rem
  # md: 0.375rem
  # lg: 0.5rem
  # xl: 0.75rem
  # full: 9999px

spacing:
  container-max: 1120px
  gutter: 24px
  margin-mobile: 20px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  section-gap: 80px
---

# Precision Minimalist

## Overview

The design system is defined by a "Precision Minimalist" aesthetic, prioritizing content clarity and typographic intent over decorative elements. It targets a sophisticated audience—likely in tech, design, or engineering—who values efficiency, readability, and subtle detail.

The aesthetic is minimal and high-contrast: plenty of whitespace, restrained color, and content set on near-neutral surfaces. Prioritize readability and accessibility, and use color to signal state or hierarchy rather than decoration.

This is the Light theme and desktop version. The Dark theme uses the same token names with different values and lives at `./design.dark.md`.
The mobile version lives at `./DESIGN.mobile.md`.

本 design system 沿用 Tailwind CSS 的设计语言。整个系统的技术实现也是使用 Tailwind CSS.

## Colors

The palette is rooted in a warm, high-contrast minimalist base.

The design system uses semantic color tokens as the implementation source of truth. In the YAML metadata block at the top of this file, `token` is the value agents should use in implementation, while `value` is only the current light-theme visual reference. Use semantic Tailwind utilities such as `bg-bg`, `bg-surface`, `text-text`, `text-text-muted`, `border-border`, and `text-primary` / `bg-primary`; if raw CSS is required, use semantic variables such as `var(--color-text-muted)`. Do not replace semantic tokens with `value`, raw OKLCH, or hex colors unless the task is explicitly changing the token definition in `src/styles/theme.css`.

- **Background:** `var(--color-bg)` serves as the primary canvas.
- **Text:** `var(--color-text)` is used for primary text. `var(--color-text-muted)` is reserved for secondary metadata, labels, and helper text.
- **Surface:** `var(--color-surface)` and `var(--color-surface-strong)` provide subtle tonal separation for cards or background sections without breaking the minimalist flow.
- **Border:** `var(--color-border)` is used for structural edges.
- **Primary:** `var(--color-primary)` is the primary action color.
- **Accent:** `var(--color-accent-400)`, `var(--color-accent-500)`, and `var(--color-accent-600)` provide lighter, base, and stronger interaction states.

## Typography

Geist Sans sets UI and prose; Geist Mono sets code, data, and tabular figures. Both are open-source.

Typography should feel crisp, direct, and editorial rather than decorative. Use semantic HTML first, then apply Tailwind typography utilities. Do not replace Tailwind utilities with copied `rem`, `px`, or computed font-weight values unless writing shared CSS.

- **Hero headline:** Use `h1` with `text-5xl font-bold` on desktop. On smaller screens, reduce the size with responsive utilities such as `text-3xl md:text-5xl`.
- **Hero subtitle:** Use `text-lg font-normal` for the main supporting sentence. Keep it readable and restrained; do not make subtitle text compete with the headline.
- **Section title:** Use `h2` with `text-2xl font-bold` on desktop. Current responsive pattern is usually `text-xl md:text-2xl`.
- **Item title:** Use `h3` with `text-base font-semibold` for project names, contact links, and compact content headings.
- **Body:** Use `text-base font-normal` for normal prose and descriptions.
- **Body strong:** Use `text-base font-semibold` when a short phrase needs emphasis without becoming a heading.
- **Label:** Use `text-xs font-medium` for tags, metadata, compact labels, and low-emphasis UI text.

Use `var(--font-geist-sans)` and `var(--font-geist-mono)` only when writing CSS directly. In React markup, rely on the font variables already attached in `src/app/[lang]/layout.tsx` and use Tailwind utilities for size, weight, and line-height.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy for desktop, centering content within a clean 1120px container to prevent excessive line lengths.

- **Grid:** A 12-column system is used, but content typically occupies the central 8 or 10 columns to increase white space on the peripheries.
- **Vertical Rhythm:** Sections are separated by large gaps (`80px`+) to allow the design to "breathe." 
- **Mobile:** On smaller screens, margins transition to `20px` and the layout collapses to a single-column stack. 
- **Alignment:** Strict horizontal alignment is required; elements should align to the left edge of the typographic container to reinforce the structured, orderly feel.

## Elevation & Depth
Depth is created through **Tonal Layers** and **Low-Contrast Outlines** rather than traditional shadows. 

- **Surfaces:** Use `var(--color-surface)` for background blocks or "cards" to distinguish them from the primary canvas.
- **Borders:** Instead of shadows, use 1px solid borders in `var(--color-border)` when a clear boundary is needed.
- **Interactivity:** Elevation is implied by a color shift, such as moving from `var(--color-bg)` to `var(--color-surface)`, or by using the accent scale for active states rather than a physical lift.

## Shapes
The shape language is "Soft" (`0.25rem`). This slight rounding takes the edge off the brutalist tendencies of the monochromatic palette without making the UI feel overly playful or "bubbly."

- **Base Radius:** 4px for buttons, input fields, and small UI components.
- **Large Radius:** 8px (`rounded-lg`) for container blocks or large imagery.
- **Consistency:** All interactive elements must share the same corner radius to maintain a cohesive, disciplined appearance.

## Components
- **Buttons:** Primary actions use `var(--color-primary)` with high-contrast foreground text. Ghost buttons use a `var(--color-border)` 1px border and transparent background. Always 4px rounded.
- **Chips:** Small, `var(--color-surface)` background with `var(--color-text-muted)` text. Used for categories or tags.
- **Inputs:** Minimalist bottom-border or 1px outline. Focused state uses `var(--color-border)`. No heavy inner shadows.
- **Cards:** Flat design. No shadow. Defined by a subtle border or a tonal shift to `var(--color-surface)`. 
- **Links:** Inline links are underlined or use the rose accent scale on hover. The transition should be an instant color snap, reflecting the technical nature of the system.
- **Lists:** Clean, bulletless lists for navigation, using vertical spacing (`stack-md`) and subtle divider lines to separate items.
