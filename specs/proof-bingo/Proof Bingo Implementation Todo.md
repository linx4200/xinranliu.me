# Proof Bingo Implementation Todo

## 1. Prepare Data

- [x] Create `src/data/proof-bingo.ts`.
- [x] Define tile category, tile, and copy types.
- [x] Add the fixed 3x3 tile data with `id`, `category`, `row`, `col`, and bilingual labels.
- [x] Keep Hero Identity Anchor copy in the homepage dictionaries.
- [x] Add line-specific Bingo Completion summaries, CTA, and Reset copy.
- [x] Keep tile ids stable and readable, for example `stack-react-vue-next`, `project-vue-color`, and `style-accessible-ui`.

## 2. Add Localization Service

- [x] Create `src/services/proof-bingo.ts`.
- [x] Use `resolveLocale` from `src/dictionaries`.
- [x] Return localized tile labels, line-specific completion summaries, completion actions, and stable tile metadata.
- [x] Sort tiles by row and column before returning them.
- [x] Export localized types for component props.

## 3. Build Client Component

- [x] Create `src/components/ProofBingo.tsx`.
- [x] Mark it with `'use client'`.
- [x] Accept only localized data as props.
- [x] Render the Hero Identity Anchor.
- [x] Render the 3x3 tile grid using real buttons.
- [x] Add `data-dev-mode-react-name="ProofBingo"` on the root component container.
- [x] Add `dev-mode="tailwind"` to key containers and tile buttons.

## 4. Implement Interaction State

- [x] Track selected tile ids.
- [x] Track the completed line indexes or ids.
- [x] Add the fixed `WINNING_LINES` constant with stable line ids.
- [x] Allow select and unselect before completion.
- [x] Allow more than three selected tiles.
- [x] Check for completion after each selection.
- [x] Lock tile selection after the first completed line.
- [x] Render the completed line state.

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

- [x] Update `src/app/[lang]/page.tsx` to import `getProofBingo`.
- [x] Replace the existing hero greeting/description block with `ProofBingo`.
- [x] Remove the in-hero `DevModeToggle` import and render call.
- [x] Keep the rest of homepage sections intact.
- [x] Confirm homepage remains a Server Component.

## 9. Refresh Developer Mode Metadata

- [x] If React Developer Mode markers changed, run `npm run dev-mode:generate:react`.
- [x] Review generated `src/data/dev-mode-react-components.js`.
- [x] Do not hand-edit generated metadata.

## 10. Verify Quality

- [x] Run `npm run lint`.
- [x] Run `npm run build` if route, metadata, SSR, generated Developer Mode metadata, or build-sensitive behavior changed.
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
