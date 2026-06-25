# Proof Bingo Implementation Spec

## Goal

Replace the current homepage hero with a focused **Proof Bingo** experience that helps potential clients quickly understand Xinran Liu's technical capability, project evidence, work style, service fit, and personality. The interaction should feel precise, restrained, and memorable without turning the portfolio into a game page.

## Product Shape

The homepage hero has two layers:

- **Hero Identity Anchor**: short static identity copy rendered in the bingo card header.
- **Proof Bingo**: a 3x3 interactive card that carries the main trust-building narrative.

Hero copy:

| Locale | Headline | Subline |
| --- | --- | --- |
| `en` | `Xinran Liu` | `Independent full-stack web developer` |
| `zh` | `Xinran Liu` | `独立全栈 Web 开发者` |

The previous in-hero Developer Mode prompt should be removed. The global floating Developer Mode control remains available.

## Content Model

Add a dedicated data source for the bingo configuration instead of scattering copy in JSX.
Keep Hero Identity Anchor copy in the homepage dictionary because it is page-level hero copy, not Proof Bingo configuration. Keep the Proof Bingo card title in the Proof Bingo data source because it labels the interaction itself.

Recommended file:

- `src/data/proof-bingo.ts`
- `src/services/proof-bingo.ts`
- `src/dictionaries/en.json`
- `src/dictionaries/zh-CN.json`

Recommended data shape:

```ts
import type { LangCode } from '@/dictionaries';

export type ProofBingoTileCategory =
  | 'technology'
  | 'project-evidence'
  | 'work-style'
  | 'service'
  | 'personal-signal';

export type ProofBingoLineId =
  | 'top-row'
  | 'middle-row'
  | 'bottom-row'
  | 'left-column'
  | 'center-column'
  | 'right-column'
  | 'main-diagonal'
  | 'anti-diagonal';

export type ProofBingoTile = {
  id: string;
  category: ProofBingoTileCategory;
  row: 0 | 1 | 2;
  col: 0 | 1 | 2;
  label: Record<LangCode, string>;
};

export type ProofBingoCopy = {
  title: Record<LangCode, string>;
  resetLabel: Record<LangCode, string>;
  completionSummaries: Record<ProofBingoLineId, {
    summary: Record<LangCode, string>;
  }>;
};
```

`src/services/proof-bingo.ts` should expose a localized helper:

```ts
export type LocalizedProofBingoTile = Omit<ProofBingoTile, 'label'> & {
  label: string;
};

export const getProofBingo = (lang: string) => ({
  title,
  tiles,
  resetLabel,
  completionSummaries,
});
```

Use `resolveLocale` so unsupported locale values fall back consistently with the rest of the site.

## Tile Layout

The first version uses this fixed 3x3 layout.

English:

```text
React / Vue / Next.js      Vue Color is live              Accessible UI details
TypeScript-first builds    This portfolio is handmade     SEO-aware by default
Freelance web apps         MirrorOn: tiny macOS utility   Precise, playful, detail-driven
```

Chinese:

```text
React / Vue / Next.js      Vue Color 已上线          无障碍 UI 细节
TypeScript 优先构建        这个作品集手工打造        默认考虑 SEO
自由职业 Web 应用          MirrorOn 小工具           精准、有趣、重细节
```

The center tile is `This portfolio is handmade` / `这个作品集手工打造` because the website itself is a central proof point and participates in the most possible winning lines.

## Component Boundary

Homepage route remains a Server Component:

- `src/app/[lang]/page.tsx` gets the localized proof bingo data.
- It renders the Hero Identity Anchor from the homepage dictionary, including the page-level `h1`.
- It renders SEO and JSON-LD as before.
- It passes localized bingo data into the client component.

Add a localized client component:

- `src/components/ProofBingo.tsx`

Suggested props:

```ts
type ProofBingoProps = {
  title: string;
  tiles: LocalizedProofBingoTile[];
  resetLabel: string;
  completionSummaries: Record<ProofBingoLineId, {
    summary: string;
  }>;
};
```

The component owns only UI interaction state:

- selected tile ids
- completed line
- completion status

Do not move the whole homepage to the client.
Keep the `h1` element authored in the homepage Server Component and pass it as a heading slot, so the card can visually contain the identity copy without moving page-level copy ownership into Proof Bingo data.

## Bingo Rules

The valid line indexes are fixed:

```ts
const WINNING_LINES = [
  { id: 'top-row', indexes: [0, 1, 2] },
  { id: 'middle-row', indexes: [3, 4, 5] },
  { id: 'bottom-row', indexes: [6, 7, 8] },
  { id: 'left-column', indexes: [0, 3, 6] },
  { id: 'center-column', indexes: [1, 4, 7] },
  { id: 'right-column', indexes: [2, 5, 8] },
  { id: 'main-diagonal', indexes: [0, 4, 8] },
  { id: 'anti-diagonal', indexes: [2, 4, 6] },
] as const;
```

Selection rules:

- Before completion, users may select or unselect any tile.
- Users may select more than three tiles.
- After each selection, check the winning lines.
- The first matched line id becomes the completed line id.
- After completion, tile selection is locked.
- A visible Reset button clears the selected tiles, completed line, and completion state.

## Completion State

Completion summaries are keyed by winning line. This keeps each bingo result connected to the evidence combination the visitor selected.

Recommended first-version summaries:

| Line id | EN | ZH |
| --- | --- | --- |
| `top-row` | `Bingo. You found a front-end builder who turns product details into polished interfaces.` | `Bingo。你找到了一位能把产品细节做成精致界面的前端开发者。` |
| `middle-row` | `Bingo. You found an engineer who treats the website itself as a maintainable, searchable product.` | `Bingo。你找到了一位会把网站本身也当作可维护、可搜索产品来做的工程师。` |
| `bottom-row` | `Bingo. You found an independent builder who keeps useful tools precise, practical, and human.` | `Bingo。你找到了一位会把实用工具做得精准、实际、有人味的独立开发者。` |
| `left-column` | `Bingo. You found a full-stack web developer ready to build typed, modern web apps.` | `Bingo。你找到了一位能构建现代、类型安全 Web 应用的全栈开发者。` |
| `center-column` | `Bingo. You found a maker with real projects, not just a skill list.` | `Bingo。你找到的不是技能清单，而是有真实项目的创造者。` |
| `right-column` | `Bingo. You found a detail-driven developer who makes web products clearer for people and search.` | `Bingo。你找到了一位重细节、也懂用户和搜索体验的开发者。` |
| `main-diagonal` | `Bingo. You found a precise builder with modern stack, handmade craft, and personality.` | `Bingo。你找到了一位有现代技术栈、手工质感和个人判断的开发者。` |
| `anti-diagonal` | `Bingo. You found a web developer who balances accessibility, craft, and client-ready delivery.` | `Bingo。你找到了一位能平衡无障碍、质感和客户交付的 Web 开发者。` |

Reset action:

- EN: `Reset`
- ZH: `重置`

The completion state should appear within the bingo hero area, not as a full-screen modal. It should render the summary for the completed line id and a visible Reset control. Do not repeat View Projects or Hire Xinran inside Proof Bingo completion because those conversion actions are already always visible in the homepage hero.

## Accessibility

Use real buttons for the tiles. Do not implement an ARIA grid unless the interaction is expanded later to support grid-style keyboard navigation.

Requirements:

- Each Proof Tile is a `<button type="button">`.
- Each tile exposes `aria-pressed`.
- Tab, Enter, and Space work through native button behavior.
- Focus states are visibly clear in light and dark mode.
- Completion summary uses `role="status"` or `aria-live="polite"`.
- The winning line is not indicated by color alone; use line, border, weight, or text-state changes.
- CTA link uses the existing localized `Link` component so `/contact` receives the current locale prefix.

## Visual And Motion

Proof Motion should stay aligned with `Precision Minimalist`:

- light surfaces
- restrained rose accent
- thin borders
- no heavy shadows
- no decorative orbs or game-like effects

Use `specs/DESIGN.md` as the visual source of truth. The implementation must preserve the current `Precision Minimalist` system: clear typography, generous whitespace, thin borders, restrained rose accents, stable dimensions, and no generic SaaS or game-like treatment.

Motion behavior:

- Tile click: small press or flip-like feedback.
- Selected state: clear border/background change.
- Winning line: thin rose line or connected emphasis across the three tiles.
- Completion: summary appears or expands inside the hero area.
- Reduced motion: keep selected state, line state, and completion summary, but remove or reduce movement.

Do not add a runtime animation library for this feature.

## Responsive Layout

Desktop:

- Hero is centered within the existing page width.
- Proof Bingo is the hero's core visual element.
- Keep enough whitespace so the card feels intentional, not dense.

Mobile:

- Keep the full 3x3 layout.
- Do not switch to a carousel or list.
- Tiles should use stable dimensions, preferably `aspect-ratio: 1 / 1`.
- Labels may wrap, but tile state changes must not resize the grid.
- Completion CTA and Reset must be thumb-friendly.

## Developer Mode

Remove the current hero `DevModeToggle` usage from the homepage.

Keep Developer Mode observability:

- Add `data-dev-mode-react-name="ProofBingo"` to the client component root or primary container.
- Add `dev-mode="tailwind"` to important layout elements and tile buttons.
- If the generated React metadata changes, run `npm run dev-mode:generate:react`.

The global floating Developer Mode toggle remains unchanged.

## SEO

Proof Bingo is homepage visible content and a hero expression pattern. It is not a separate SEO content type.

Do not add:

- `Game` JSON-LD
- `Quiz` JSON-LD
- `ItemList` JSON-LD just for the tiles

Keep homepage structured data aligned with the existing person, website, and homepage credibility signals. Metadata only needs to change if the final homepage copy no longer matches the current description.

## Verification

Minimum checks after implementation:

```bash
npm run lint
```

Also run:

```bash
npm run dev-mode:generate:react
```

if `data-dev-mode-react-name` coverage or marked component props change.

Run:

```bash
npm run build
```

if route, metadata, SSR, generated Developer Mode metadata, or build-sensitive behavior changes.

Manual verification paths:

- `/en`
- `/zh`
- mobile viewport on `/en`
- desktop dark mode on `/en`

Manual checks:

- 3x3 layout is stable on desktop and mobile.
- English and Chinese copy render correctly.
- Keyboard users can select tiles and trigger completion.
- Completion is announced and the hero-level View Projects / Hire Me CTAs remain available outside Proof Bingo.
- Reset clears state.
- Reduced motion remains understandable.
- Global floating Developer Mode still works.
- Hero no longer shows the old in-hero Developer Mode prompt.
