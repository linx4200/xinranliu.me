---
name: Precision Minimalist Dark
description: Dark theme delta for https://xinranliu.me. This file only documents what differs from ./DESIGN.md.

colors:
  bg:
    token: 'var(--color-bg)'
    value: '#0f0b09'
  surface:
    token: 'var(--color-surface)'
    value: 'oklch(37.1% 0 0)'
  surface-strong:
    token: 'var(--color-surface-strong)'
    value: 'oklch(43.9% 0 0)'
  text:
    token: 'var(--color-text)'
    value: '#f2e9e2'
  text-muted:
    token: 'var(--color-text-muted)'
    value: '#c8b8ad'
  border:
    token: 'var(--color-border)'
    value: 'oklch(55.6% 0 0)'
  primary:
    token: 'var(--color-primary)'
    value: 'oklch(47.3% 0.137 46.201)'
  accent-400:
    token: 'var(--color-accent-400)'
    value: '#fff7f8'
  accent-500:
    token: 'var(--color-accent-500)'
    value: '#fff1f2'
  accent-600:
    token: 'var(--color-accent-600)'
    value: '#f4dfe4'
---

# Precision Minimalist Dark

This document extends `./DESIGN.md`. All layout, typography, spacing, shape, component, content, and accessibility rules from the light desktop design system still apply unless this file explicitly overrides them.

## Delta Summary

- The canvas changes from light white to warm near-black: `#0f0b09`.
- Primary text changes to warm off-white: `#f2e9e2`.
- Muted text changes to warm beige-gray: `#c8b8ad`.
- Surfaces become neutral dark layers rather than white cards.
- The primary token becomes warmer and darker than the light rose accent.
- Pale rose accent tokens are used for hover or emphasis, not large backgrounds.
- Dark mode is class-driven through `.dark` on `<html>`, not a separate theme provider.

## Token Overrides

The implementation source of truth is `src/styles/theme.css`.

```css
@custom-variant dark (&:where(.dark, .dark *));

html.dark {
  color-scheme: dark;
  --color-bg: #0f0b09;
  --color-surface: var(--color-neutral-800);
  --color-surface-strong: var(--color-neutral-700);
  --color-text: #f2e9e2;
  --color-text-muted: #c8b8ad;
  --color-border: var(--color-neutral-500);
  --color-primary: var(--color-amber-800);
  --color-accent-400: #fff7f8;
  --color-accent-500: #fff1f2;
  --color-accent-600: #f4dfe4;
}
```

Use the same semantic utilities required by `DESIGN.md`: `bg-bg`, `bg-surface`, `bg-surface-strong`, `text-text`, `text-text-muted`, `border-border`, `bg-primary`, `text-primary`, and `border-primary`.

## Overrides And Exceptions

- Do not use pure black as the background. The warm near-black canvas is part of the brand feel.
- Do not increase font weights to compensate for dark mode. If text feels weak, fix color contrast.
- Do not add dark-mode-only glows, ambient backgrounds, or decorative gradients.
- Large pale accent surfaces are not allowed; `accent-*` colors should stay limited to hover, focus, or small emphasis states.
- The homepage hero may use `dark:text-primary` as an identity/personality cue. Do not copy this treatment to ordinary headings.
- Floating UI, such as the mobile nav popover, may use raw translucent colors like `dark:bg-[#0f0b09]/90`, `dark:border-white/10`, and `dark:shadow-black/50` when semantic tokens do not express the needed overlay behavior.
- Brand/status colors remain allowed in small doses: Instagram gradient, availability red/green/gray states, loading skeleton grays, and project placeholder gradients.
- Developer Mode inspection chrome may use non-product colors such as the blue highlight ring and `bg-zinc-900` overlay. These colors are tool UI exceptions, not product UI tokens.

## Component Deltas

- **Navigation:** active links still use `text-primary`; utility controls use `hover:bg-surface-strong`; the mobile popover needs enough shadow/border contrast against `bg-bg`.
- **CTAButton:** keep the shared variants. Do not introduce glowing, gradient, or pill-shaped dark CTAs.
- **Cards and chips:** continue using `bg-surface` and `bg-surface-strong`; add borders only when adjacent dark surfaces collapse visually.
- **Project media:** real images do not change by theme. Missing-image placeholders may use a darker `dark:bg-[linear-gradient(...)]`.
- **Availability:** status color must be backed by visible text and `role="status"`; never rely on the colored dot alone.
- **Footer:** stays low-emphasis with a quiet dark border and muted text.

## QA Delta

When dark-mode behavior changes, verify:

- `/en`, `/zh`, `/en/projects`, and `/zh/contact` remain readable in dark mode.
- The manual theme switch updates the `<html>` class and visible UI.
- Nav, mobile menu, CTAs, cards, chips, footer, and availability states remain legible.
- Focus visible is clear on icon-only controls and links.
- Developer Mode desktop controls still contrast against the page.
