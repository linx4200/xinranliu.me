---
name: Precision Minimalist Mobile
description: Mobile responsive delta for https://xinranliu.me. This file only documents what differs from ./DESIGN.md.

breakpoints:
  mobile-first:
    description: Base Tailwind utilities apply to mobile and narrow viewports.
  sm:
    token: 'sm:'
    current_usage: 'Small mobile menu width expansion.'
  md:
    token: 'md:'
    current_usage: 'Typography increases, contact-page two-column layout, CTA width reset, and alignment changes.'
  lg:
    token: 'lg:'
    current_usage: 'Desktop shell width, desktop nav, three-column grids, wider spacing, and Developer Mode visibility.'
---

# Precision Minimalist Mobile

This document extends `./DESIGN.md`. All color, typography, component, content, SEO, and accessibility rules from the desktop design system still apply unless this file explicitly overrides them.

## Delta Summary

- Mobile is the unprefixed Tailwind baseline.
- Desktop enhancements start mostly at `lg`; contact-page layout and some type/alignment changes start at `md`.
- The page shell is unconstrained on mobile and becomes `lg:w-5xl mx-auto` on desktop.
- Navigation collapses into a hamburger popover below `lg`.
- Project and skill grids collapse to one column.
- Section headings are usually left-aligned on mobile and may center from `md`.
- Contact-page CTAs become full-width below `md`.
- Developer Mode controls are hidden below `lg`.

## Breakpoint Overrides

- **Base/mobile:** single column, compact spacing, mobile nav, readable card width, stacked contact actions.
- **`sm:`:** only for narrow refinements, currently the mobile menu width change from `w-45` to `sm:w-64`.
- **`md:`:** use for medium layout improvements such as `text-3xl md:text-5xl`, `flex-col md:flex-row`, `text-center md:text-left`, and `w-full md:w-auto`.
- **`lg:`:** use for the desktop shell, desktop nav, `grid-cols-3`, larger section spacing, and Developer Mode.

Do not use viewport-width-scaled font sizes. Use explicit responsive utilities.

## Layout Overrides

- Mobile pages should use `px-4` or `px-5` where content would otherwise touch the viewport edge, then remove that padding with `lg:px-0`.
- Major mobile sections usually use `mt-10`; desktop may promote to `md:mt-20` or `lg:mt-20`.
- One-column card lists should keep `w-full max-w-md lg:max-w-none mx-auto` so cards stay readable before the desktop grid takes over.
- Cards keep the desktop shape and padding: `rounded-md`, `p-5`, `bg-surface`.
- Media should keep stable dimensions, usually `aspect-square`, to avoid layout shift.

## Navigation Delta

Below `lg`, navigation changes from inline links to a compact top bar:

- Left: hamburger button.
- Middle: `Xinran Liu` identity text.
- Right: dark mode switch, language switch, and documentation link.
- Links move into an absolutely positioned popover below the nav.

The hamburger button must keep `type="button"`, `aria-label`, and `aria-expanded`. Menu links must keep `aria-current="page"` for the active route and close the menu after navigation.

Do not expose all desktop links inline on mobile; the persistent utility controls already consume the available horizontal space.

## Page Deltas

### Home

- Hero remains centered.
- Hero description uses horizontal padding such as `px-5`.
- Developer Mode prompt is hidden below `lg`.
- Selected Projects and Skills use one-column grids.
- Section headings use mobile-left alignment with `pl-4`, then may center from `md`.
- The contact CTA band uses mobile padding and a `max-w-md` inner width.

### Projects

- Heading is left-aligned with `pl-4`.
- Project cards render one per row below `lg`.
- Do not hide project descriptions, tags, or accessible external-link labels on mobile.

### Contact

- Page padding uses `px-5 lg:px-0`.
- Hero uses `flex-col-reverse md:flex-row`, visually placing the portrait above the copy on mobile while keeping copy first in the DOM.
- Portrait uses `w-[60%]` on mobile and `md:w-[280px]` from `md`.
- Hero text is centered on mobile and left-aligned from `md`.
- Availability is centered on mobile, grows from `text-lg` to `md:text-2xl`, and hides the dot below `lg`.
- Professional and hiring rows stack below `md`; CTAs use `fullWidthOnMobile`, implemented as `w-full md:w-auto`.

## Touch And Accessibility Deltas

- Nav icon controls should keep a stable `size-10` or equivalent tap target.
- CTA buttons keep `min-h-11`; contact CTAs are full-width below `md`.
- Focus visible must remain clear inside the mobile menu and on icon-only utility controls.
- Skip link must still target `#main-content`.
- Availability must keep `role="status"` and `aria-live="polite"`.
- Do not hide meaningful project/contact content just to shorten mobile pages. Stack or regroup it instead.

## Dark Mode On Mobile

Mobile dark mode follows `./DESIGN.dark.md`. The mobile nav popover is the main mobile-specific dark surface and may use translucent background, backdrop blur, a soft border, and shadow for separation.

Verify open and closed nav states in both themes.

## Developer Mode Delta

Developer Mode is desktop-only for now:

- Hero prompt: `hidden lg:block`
- Floating toggle: `hidden lg:block`
- Hover inspection overlay: desktop pointer interaction only

Do not expose the full React/Tailwind inspector on mobile without adding a separate mobile interaction spec.

## QA Delta

When mobile behavior changes, verify:

- `/en` and `/zh` have readable hero copy and usable navigation.
- The hamburger menu opens, closes, shows active route, and does not cover utility controls.
- Dark mode, language switch, and documentation controls remain tappable.
- `/en/projects` renders one readable project card per row.
- `/zh/contact` shows portrait, availability, professional links, and hiring CTAs without overlap.
- Contact CTAs are full width below `md`.
- Developer Mode controls are hidden below `lg`.
- No text overflows buttons, cards, or popovers at narrow phone widths.
