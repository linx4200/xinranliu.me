# Proof Bingo Implementation Todo

## 1. Prepare Data

- [ ] Create `src/data/proof-bingo.ts`.
- [ ] Define tile category, tile, and copy types.
- [ ] Add the fixed 3x3 tile data with `id`, `category`, `row`, `col`, and bilingual labels.
- [ ] Add Hero Identity Anchor copy.
- [ ] Add line-specific Bingo Completion summaries, CTA, and Reset copy.
- [ ] Keep tile ids stable and readable, for example `stack-react-vue-next`, `project-vue-color`, and `style-accessible-ui`.

## 2. Add Localization Service

- [ ] Create `src/services/proof-bingo.ts`.
- [ ] Use `resolveLocale` from `src/dictionaries`.
- [ ] Return localized identity copy, tile labels, line-specific completion summaries, completion actions, and stable tile metadata.
- [ ] Sort tiles by row and column before returning them.
- [ ] Export localized types for component props.

## 3. Build Client Component

- [ ] Create `src/components/ProofBingo.tsx`.
- [ ] Mark it with `'use client'`.
- [ ] Accept only localized data as props.
- [ ] Render the Hero Identity Anchor.
- [ ] Render the 3x3 tile grid using real buttons.
- [ ] Add `data-dev-mode-react-name="ProofBingo"` on the root component container.
- [ ] Add `dev-mode="tailwind"` to key containers and tile buttons.

## 4. Implement Interaction State

- [ ] Track selected tile ids.
- [ ] Track the completed line indexes or ids.
- [ ] Add the fixed `WINNING_LINES` constant with stable line ids.
- [ ] Allow select and unselect before completion.
- [ ] Allow more than three selected tiles.
- [ ] Check for completion after each selection.
- [ ] Lock tile selection after the first completed line.
- [ ] Render the completed line state.

## 5. Add Completion Actions

- [ ] Render the completion summary for the completed winning line inside the hero area.
- [ ] Add a localized primary CTA to `/contact` using the existing `Link` component.
- [ ] Add a localized secondary Reset button.
- [ ] Reset selected tiles, completed line, and completion state.
- [ ] Move focus to the first tile after Reset.

## 6. Add Accessibility Details

- [ ] Set `type="button"` on every tile.
- [ ] Set `aria-pressed` for selected state.
- [ ] Keep native button keyboard behavior.
- [ ] Add a polite live region for completion summary.
- [ ] Ensure winning state is not color-only.
- [ ] Confirm visible focus states in light and dark mode.
- [ ] Confirm Reset focus behavior with keyboard navigation.

## 7. Add Styling And Motion

- [ ] Re-read `specs/DESIGN.md` before styling.
- [ ] Use stable grid dimensions and `aspect-ratio: 1 / 1` for tiles.
- [ ] Match `Precision Minimalist`: light surfaces, thin borders, restrained rose accent, minimal shadow.
- [ ] Add selected state styling.
- [ ] Add completed line styling.
- [ ] Add lightweight tile press or flip-like feedback.
- [ ] Add completion reveal or expansion inside the hero area.
- [ ] Add `prefers-reduced-motion` handling that removes or reduces movement while preserving state clarity.
- [ ] Verify text does not overflow or resize tiles on mobile.

## 8. Integrate Homepage

- [ ] Update `src/app/[lang]/page.tsx` to import `getProofBingo`.
- [ ] Replace the existing hero greeting/description block with `ProofBingo`.
- [ ] Remove the in-hero `DevModeToggle` import and render call.
- [ ] Keep the rest of homepage sections intact.
- [ ] Confirm homepage remains a Server Component.

## 9. Refresh Developer Mode Metadata

- [ ] If React Developer Mode markers changed, run `npm run dev-mode:generate:react`.
- [ ] Review generated `src/data/dev-mode-react-components.js`.
- [ ] Do not hand-edit generated metadata.

## 10. Verify Quality

- [ ] Run `npm run lint`.
- [ ] Run `npm run build` if route, metadata, SSR, generated Developer Mode metadata, or build-sensitive behavior changed.
- [ ] Manually verify `/en`.
- [ ] Manually verify `/zh`.
- [ ] Manually verify mobile `/en`.
- [ ] Manually verify dark mode.
- [ ] Confirm CTA navigates to localized `/contact`.
- [ ] Confirm the 8 winning lines render distinct completion summaries.
- [ ] Confirm visual styling follows `specs/DESIGN.md`.
- [ ] Confirm global floating Developer Mode still works.

## 11. Final Documentation Pass

- [ ] Update `specs/summaries/bingo.md` if implementation changes any confirmed behavior.
- [ ] Update `specs/PRD.md` only if the product behavior materially changes.
- [ ] Do not create an ADR unless a later implementation decision becomes hard to reverse, surprising, and trade-off driven.
