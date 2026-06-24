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

## Layout

The site uses a centered desktop shell with a restrained maximum width. Pages should feel intentionally framed rather than full-bleed, with content aligned to a shared vertical axis across navigation, page sections, and footer.

Each route follows the same structural frame: navigation header, main content, and footer. The header and footer stay consistent across language routes and subpages; individual pages should only define the content inside `<main>`.

Desktop layouts may use multiple columns for comparison, project cards, and contact options, but they should stay quiet and grid-led. Mobile layouts collapse to a focused single column with fewer simultaneous choices.

Implementation note: the current desktop shell is implemented with `lg:w-5xl mx-auto`. Keep new page-level layouts aligned to that shell unless the design intentionally calls for a different container.

## Spacing

Spacing follows a simple three-step rhythm: compact spacing inside a group, medium spacing between related groups, and generous spacing between major sections.

Sections need enough vertical separation to feel calm and breathable, but spacing should come from the shared rhythm rather than arbitrary margins.

Cards use consistent internal padding. In multi-card rows, cards should distribute evenly across the parent width and keep enough gap for each card to read as an independent item.

Implementation note: the current spacing rhythm maps to `calc(var(--spacing) * 5)` inside a group, `calc(var(--spacing) * 10)` between related groups, and `calc(var(--spacing) * 20)` between major sections.


## Shapes

The shape language is "Soft" (`0.375rem` to `0.5rem`). This slight rounding takes the edge off the brutalist tendencies of the monochromatic palette without making the UI feel overly playful or "bubbly."

- **Consistency:** Interactive elements of the same type must share the same corner radius to maintain a cohesive, disciplined appearance. Do not mix pill buttons, squared buttons, and soft rectangular buttons within the same action family.

## Components

- **Buttons:** Text CTA buttons are the main button family. Use the shared `CTAButton` component rather than hand-writing page-level button classes. CTA buttons use `inline-flex`, `min-h-11`, `px-5`, `py-2.5`, `text-sm`, `font-medium`, `rounded-lg`, and a 1px border. The shape is a soft rectangle, not a pill.

  - **Primary CTA:** Use for the strongest conversion action in a group, such as hiring on Upwork. Style with `bg-primary`, `border-primary`, and high-contrast foreground text. Hover moves to the stronger accent state (`accent-600`) rather than adding shadow or scale.
  - **Secondary CTA:** Use for supporting actions, such as Contact Me, LinkedIn, and GitHub. Style with transparent background, `text-text`, and a quiet low-opacity border. Hover may shift to the primary accent through border, background tint, and text color.
  - **Disabled CTA:** Keep the same size, radius, and variant color as the enabled CTA, then add reduced opacity and a not-allowed cursor. Do not introduce a separate disabled shape.
  - **Responsive behavior:** Contact-page CTA buttons are full width on mobile and return to content width from the `md` breakpoint. Homepage CTA buttons may stay content width because they sit in centered, isolated action areas.
  - **Scope:** Navigation text links, icon-only controls, Developer Mode controls, and project-card icon links are not CTA buttons. They should stay visually distinct and follow their own component-level interaction patterns.

- **Chips:** Chips are compact metadata for tags, categories, and short skill labels. Keep copy brief, use `text-xs`, compact padding, `rounded-full`, `bg-surface` or `bg-surface-strong`, and `text-text-muted`. Do not use `bg-primary` for ordinary metadata; reserve interaction states for chips that actually filter or navigate.

- **Cards:** Cards are quiet content containers, not decorative panels. Prefer flat tonal separation with `bg-surface`, `rounded-md`, and consistent padding, currently `p-5`. Prefer no border by default; add a low-opacity 1px border only when the card needs clearer separation. Avoid shadows, nested cards, scale effects, and layout movement on hover.

- **Links:** Links should stay text-first and visually lighter than CTA buttons. Use semantic anchors or the shared locale-aware `Link` component for internal routes. Inline links may use an underline; navigation and utility links may rely on inherited text color with `text-primary` for active states and restrained rose-accent hover. Icon-only links need an `aria-label`; external links use `target="_blank"` with `rel="noreferrer noopener"`.

# Voice & Content

Copy is part of the design; keep it precise and free of filler.

- Use Title Case for labels, buttons, titles, and tabs; sentence case for body, helper text, and toasts.
- Name actions with a verb and a noun (`Deploy Project`, `Delete Member`), never `Confirm`, `OK`, or a bare verb.
- Write errors as what happened plus what to do next: `Build failed. Bundle exceeds 50 MB. Reduce it or raise the limit.`
- Toasts name the specific thing that changed, drop the trailing period, and never say `successfully`: `Project deleted`, not `Successfully deleted the project.`
- Empty states point to the first action: `No deployments yet. Push to your Git repository to create one.`
- Use the present participle with an ellipsis for in-progress states: `Deploying…`, `Saving…`.
- Use numerals (`3 projects`), curly quotes, and the ellipsis character; skip `please` and marketing superlatives.
