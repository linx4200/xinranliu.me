# PRD: Xinran Liu Personal Portfolio Website

## Problem Statement

Xinran Liu 需要一个不只是“个人主页”的作品集网站，而是一个面向潜在客户、合作方和技术同侪的数字名片。访问者在很短时间内需要判断三件事：Xinran 是否能解决真实业务问题，技术能力是否扎实可信，以及这个人是否有清晰审美、判断力和活人感。

当前市场里的独立开发者作品集很容易滑向两种失衡：一种是只列技术栈和项目链接，无法建立业务信任；另一种是过度包装成通用 SaaS 落地页，失去个人判断和工程可信度。Xinran 的站点需要在“可信、克制、精致、有个性”之间取得平衡，同时保证 SEO、双语、移动端、可访问性和联系转化不是事后补丁，而是产品能力的一部分。

## Solution

构建一个基于 Next.js App Router 的双语个人作品集网站，以 `full-stack engineer + freelancer` 为核心定位，通过首页、项目页、联系页和 Developer Mode 共同完成信任建立。

首页负责以一屏数字名片快速传达 Xinran 的定位，并通过 Proof Bingo、View Projects 和 Hire Me 两个 CTA 完成第一印象分流；项目页负责集中展示业务能力、技能脉络和可验证成果；联系页负责承载雇佣入口、专业资料、个人头像和 Google Calendar availability；Developer Mode 则作为差异化体验，允许桌面访问者用 React 模式和 Tailwind 模式窥见站点的实现细节，从而把“专业能力”和“有趣灵魂”变成可交互证据。

整个体验应遵循 `Precision Minimalist` 设计系统：轻背景、清晰排版、大留白、细边框、低饱和玫瑰红点缀、克制动效和明确的信息层级。站点内容保持中英双语，路由使用 `/en` 与 `/zh` 前缀，中文 HTML 标记为 `zh-CN`，所有页面级内容都应有正确 metadata、canonical、alternate languages、Open Graph、JSON-LD、sitemap 和 robots 约束。

## User Stories

1. As a potential client, I want to understand Xinran's professional positioning within the first screen, so that I can quickly decide whether this freelancer is relevant to my project.
2. As a potential client, I want the homepage copy to emphasize fast, reliable, and scalable web applications, so that I can connect the site with business outcomes rather than only technical taste.
3. As a potential client, I want the homepage to route me clearly to Projects or Hire Me after the first impression, so that I can choose between evaluating proof and starting contact.
4. As a potential client, I want every project card to include a clear description, so that I can understand what problem the project represents.
5. As a potential client, I want project cards to show technology tags, so that I can judge fit with my preferred stack.
6. As a potential client, I want project cards to provide live site links when available, so that I can inspect the actual shipped result.
7. As a potential client, I want project cards to provide GitHub links when available, so that I can review implementation quality and engineering habits.
8. As a potential client, I want a dedicated contact page, so that hiring and collaboration actions do not compete with project browsing.
9. As a potential client, I want contact CTAs for Upwork and other hiring platforms, so that I can start work through a channel I already trust.
10. As a potential client, I want a current availability signal, so that I can judge whether it is worth reaching out now.
11. As a potential client, I want availability copy to be conservative and factual, so that I do not feel like I am reading exaggerated marketing.
12. As a potential client, I want the contact page to include professional background links, so that I can verify identity and experience.
13. As a potential client, I want external links to open safely in a new tab, so that I do not lose my place on the portfolio site.
14. As a technical collaborator, I want to inspect Xinran's project choices, so that I can infer engineering judgment beyond a skills list.
15. As a technical collaborator, I want to see React, Vue, Next.js, TypeScript, Tailwind CSS, Vite, and related skills organized by category, so that I can quickly map strengths.
16. As a technical collaborator, I want skill levels to be visible but restrained, so that the page communicates confidence without overclaiming.
17. As a technical collaborator, I want Developer Mode to reveal React component names, so that the site demonstrates its own architecture as part of the portfolio.
18. As a technical collaborator, I want Developer Mode to reveal component props and prop types where metadata exists, so that the implementation feels transparent and inspectable.
19. As a technical collaborator, I want Tailwind mode to reveal class names on marked elements, so that I can understand how the Precision Minimalist system is composed.
20. As a technical collaborator, I want Developer Mode hover overlays to follow the inspected element, so that the interaction feels direct and legible.
21. As a technical collaborator, I want Developer Mode to highlight the inspected element, so that I can connect overlay information to the page surface.
22. As a technical collaborator, I want Developer Mode to be optional, so that the main site remains clean for non-technical visitors.
23. As a desktop visitor, I want a floating Developer Mode toggle, so that I can explore the implementation from anywhere on the site.
24. As a homepage visitor, I want the hero to combine concise positioning copy, two clear CTAs, and Proof Bingo, so that the first screen feels like a complete digital business card.
25. As a mobile visitor, I want the site to prioritize core content over complex developer tooling, so that the experience stays focused on a small screen.
26. As a mobile visitor, I want subpage navigation to collapse into a usable menu, while the homepage uses direct hero CTAs instead of duplicated navigation links.
27. As a mobile visitor, I want project cards to stack vertically, so that images, descriptions, tags, and links remain readable.
28. As a mobile visitor, I want contact CTAs to be thumb-friendly, so that I can tap hiring links without precision effort.
29. As a mobile visitor, I want the portrait and availability status to remain readable, so that the contact page keeps its trust-building role.
30. As an English-speaking visitor, I want the site to be available at English routes, so that I can read the portfolio naturally.
31. As a Chinese-speaking visitor, I want the site to be available at Chinese routes, so that the portfolio can serve local clients and collaborators.
32. As a bilingual visitor, I want the language switch to preserve the equivalent page path, so that switching language does not reset my browsing context.
33. As a bilingual visitor, I want the language switch to have accessible labels, so that assistive technology can describe the current action.
34. As a search visitor, I want each language version to have its own crawlable URL, so that search results can point me to content in my language.
35. As a search visitor, I want page titles and descriptions to be localized, so that search snippets match the language I expect.
36. As a search crawler, I want canonical and alternate language metadata, so that duplicate-language concerns are handled correctly.
37. As a search crawler, I want JSON-LD for the website, person, homepage, projects page, and contact page, so that the site has structured credibility signals.
38. As a search crawler, I want sitemap entries for localized public pages, so that indexable routes are discoverable.
39. As a search crawler, I want API routes to be disallowed and marked non-indexable, so that availability infrastructure does not appear in search results.
40. As an accessibility user, I want a skip link, so that keyboard navigation can jump directly to main content.
41. As an accessibility user, I want visible focus states on interactive controls, so that I can navigate confidently with a keyboard.
42. As an accessibility user, I want semantic headings and landmark structure, so that page structure is understandable to assistive technology.
43. As an accessibility user, I want navigation to expose the current page, so that I know where I am in the site.
44. As an accessibility user, I want icon-only controls to have accessible labels, so that their purpose is not dependent on visual recognition.
45. As an accessibility user, I want availability status to announce changes politely, so that dynamic contact information is not invisible.
46. As a dark mode user, I want the site to respect system preference on load, so that the first render aligns with my environment.
47. As a dark mode user, I want to manually toggle light and dark themes, so that I can choose the reading mode I prefer.
48. As a dark mode user, I want the Precision Minimalist palette to remain legible in dark mode, so that dark mode feels designed rather than inverted.
49. As a hiring platform user, I want Upwork to be the primary hiring action when present, so that I can move from trust evaluation to transaction.
50. As a social proof seeker, I want links to GitHub, LinkedIn, and Instagram, so that I can verify professional and personal presence.
51. As a design-sensitive visitor, I want the site to feel precise, modern, restrained, and personal, so that the presentation itself becomes evidence of taste.
52. As a design-sensitive visitor, I want animation and playful details to be subtle, so that personality does not undermine credibility.
53. As a repeat visitor, I want navigation, theme, language, and project structures to stay predictable, so that I can return to information quickly.
54. As a site owner, I want project data to be maintained centrally, so that adding or updating work does not require touching multiple page layouts.
55. As a site owner, I want user-visible copy to be maintained in paired English and Chinese dictionaries, so that content updates do not break bilingual parity.
56. As a site owner, I want SEO metadata to be generated through shared decisions, so that new public pages do not drift from canonical and alternate language rules.
57. As a site owner, I want availability to be derived from Google Calendar, so that the contact page reflects a real work signal rather than static claims.
58. As a site owner, I want private Google credentials to remain environment-based, so that deployable code never contains secrets.
59. As a maintainer, I want page components to remain server-rendered by default, so that SEO and initial load performance stay strong.
60. As a maintainer, I want client components to be limited to actual interactions, so that hydration cost and mental overhead stay low.
61. As a maintainer, I want Developer Mode metadata to be generated outside the framework compiler, so that the site can keep using the current Next.js build path.
62. As a maintainer, I want React mode to rely on explicit component markers, so that only intentional components appear in inspection overlays.
63. As a maintainer, I want Tailwind mode to rely on explicit element markers, so that inspection coverage is deliberate and not noisy.
64. As a maintainer, I want the Developer Mode store to have a small state surface, so that mode transitions remain easy to reason about.
65. As a maintainer, I want the availability API response contract to stay small, so that the frontend can render free, busy, next-available, and unknown states without coupling to Google Calendar details.
66. As a maintainer, I want robots and X-Robots-Tag constraints to protect API endpoints, so that operational routes do not become public content.
67. As a maintainer, I want documentation links to point to the project specifications, so that technically curious visitors can inspect decision-making.
68. As a future agent, I want the PRD to use the same vocabulary as the project specs, so that I can continue work without reinterpreting the product.
69. As a future agent, I want testing decisions to name the highest useful boundaries, so that I can add coverage without overfitting to implementation details.
70. As a future agent, I want out-of-scope boundaries to be explicit, so that I do not accidentally turn the site into a generic template, CMS, blog, or product dashboard.

## Implementation Decisions

- The product remains a three-page public portfolio: Home, Projects, and Contact. Home acts as a one-screen business card and proof gateway, Projects validates business and technical capability, and Contact converts interest into collaboration.
- The core positioning remains `full-stack engineer + freelancer`, expressed through bilingual copy, project evidence, skills, availability, and hiring CTAs.
- The site uses locale-prefixed routes for all public pages. Supported locales are `en` and `zh`; the Chinese route prefix remains `zh`, while the HTML language value is `zh-CN`.
- The root entrypoint redirects to the preferred supported locale based on request language, with English as the default fallback.
- Internal language switching preserves the current page route whenever possible, instead of sending users back to the homepage.
- Page-level user-visible content is sourced from paired English and Simplified Chinese dictionaries. Any new visible copy must be checked in both languages.
- Project content is loaded from the Supabase `projects` table through a service-level transformation before rendering; skill content remains centralized static data.
- Public pages should remain Server Components by default. Client Components are reserved for navigation state, language switching, dark mode, availability fetching, and Developer Mode interactions.
- SEO decisions are centralized through shared metadata helpers rather than repeated per-page metadata construction.
- Every public page must provide localized title, description, canonical URL, alternate languages, Open Graph data, Twitter card data, and appropriate JSON-LD.
- The sitemap includes localized public pages with alternate language mappings. The robots policy allows public pages while disallowing API routes.
- The Google Calendar availability endpoint remains a site-facing API for frontend consumption and must remain non-indexable through response headers.
- The availability API contract remains intentionally small:

```ts
type AvailabilityResponse =
  | { data: { availability: 'busy' | 'free'; freeInDays: number } }
  | { error: string };
```

- The contact page renders availability as `free`, `busy`, or `unknown`, using localized summaries and a conservative fallback if the API cannot provide useful data.
- Google Calendar credentials and calendar identifiers remain environment configuration and are never committed into source.
- External contact and profile destinations open in a new tab with safe `rel` attributes.
- Upwork is treated as the primary hiring CTA where available; Fiverr is represented but may be disabled until a real destination exists.
- The design system remains `Precision Minimalist`: light background, high-contrast text, restrained rose accent, thin borders, large whitespace, clear typography, and minimal shadows.
- Dark mode is controlled by classes on the HTML element and backed by CSS variables. It should respect system preference on initial load and allow manual toggling.
- Navigation remains a Client Component because it owns mobile menu state and route-aware interactions.
- The primary navigation includes Home, Projects, and Hire Me/Contact on subpages, plus dark mode, language switch, and documentation access. On the homepage, the main navigation links are intentionally suppressed; Projects and Hire Me are exposed as hero CTAs, while theme, language, and documentation remain available as a compact utility group.
- Accessibility requirements include skip link, semantic landmarks, page heading structure, visible focus states, accurate ARIA labels, and `aria-current` on active navigation.
- Project cards are semantic article-like units with image/placeholder, title, description, tags, and optional external links.
- Project image hover variants are allowed when they clarify or enrich the presentation, but the base state must remain complete and accessible.
- Developer Mode remains a desktop-oriented differentiator and should not expose full complex interactions on mobile.
- The homepage hero should fit as a focused first-screen experience on desktop: concise positioning copy, View Projects and Hire Me CTAs, and Proof Bingo as the core visual interaction. Proof Bingo completion should provide a localized summary and a reset control; project/contact conversion remains handled by the always-visible hero CTAs to avoid duplicated actions.
- Developer Mode global state is managed through a small store with enabled status, active mode, and hero-section visibility.
- Developer Mode currently supports React and Tailwind modes. The Next.js mode is reserved in the state shape but not a committed user-facing mode.
- React mode relies on explicit component markers and generated metadata. If marked components or prop shapes change, metadata generation must be rerun.
- Tailwind mode relies on explicit element markers and reads class names from marked DOM elements at runtime.
- Developer Mode overlay behavior uses document-level hover handling and target lookup so that individual inspected elements do not need bespoke event listeners.
- Developer Mode should visually highlight inspected elements and position the overlay near the target without blocking normal page reading.
- Documentation access points to the project specifications, reinforcing that the site is spec-driven and intentionally built.
- Vercel Speed Insights remains part of the page shell to support performance awareness without adding visible UI complexity.
- No new heavy runtime dependency should be introduced for static presentation, localization, or simple interaction work unless it clearly reduces risk.

## Testing Decisions

- The seam check for this PRD is based on the current codebase and specs. Because this document was requested without a user interview, these seams are treated as the expected default: localized public pages, locale routing, SEO metadata generation, dictionary/data localization, Availability API, Developer Mode store and DOM markers, sitemap/robots behavior, and responsive navigation.
- Good tests should assert externally observable behavior: rendered content, route behavior, metadata, structured data, API response shape, ARIA states, link destinations, and mode transitions. They should avoid asserting private component structure, internal state names, exact Tailwind class strings, or implementation-only helper calls unless the public contract is the class metadata itself.
- The highest-value page-level tests should cover Home, Projects, and Contact in both supported locales, verifying that the correct localized headings, homepage CTAs, subpage navigation labels, project content, and contact labels appear.
- Routing tests should cover root locale redirect behavior, valid locale pages, invalid locale handling, and language switch path preservation.
- SEO tests should cover canonical URLs, alternate language mappings, localized metadata, Open Graph locale values, JSON-LD presence, sitemap localized entries, and robots disallow rules for API routes.
- Accessibility tests should cover skip link visibility on focus, homepage utility navigation labeling, subpage primary navigation labeling, mobile menu expanded state, icon-only button labels, theme switch role/checked state, language switch labels, Proof Bingo `aria-pressed` and completion `role=status` behavior, project card labelling, and availability `role=status` behavior.
- Responsive tests should cover desktop and mobile layouts at the highest page level, especially the homepage one-screen composition on desktop, mobile hero stacking, subpage mobile navigation, single-column project cards, contact CTA sizing, and hidden desktop-only Developer Mode controls.
- Dark mode tests should cover initial system preference application where feasible and manual theme toggling as a visible DOM/class behavior.
- Dictionary tests should cover supported locale resolution, fallback locale behavior, paired dictionary shape compatibility, and `zh` to `zh-CN` HTML language mapping.
- Static data service tests should cover localized project and skill transformation, selected project filtering, optional project links, and missing image fallback behavior.
- Availability API tests should cover success with free calendar state, success with busy calendar state, next available day calculation, malformed/empty Google response, and non-indexable response headers.
- Availability UI tests should mock the API at the network boundary and assert loading, free, busy with next-available, and unknown states by visible copy rather than internal hooks.
- Developer Mode store tests should cover toggle-on default mode, toggle-off clearing mode, direct mode selection enabling Developer Mode, and reserved/undefined mode transitions.
- Developer Mode React tests should cover that marked components with generated metadata can be discovered from hover targets and displayed through the overlay.
- Developer Mode Tailwind tests should cover that marked elements reveal class names while unmarked elements remain quiet.
- Developer Mode integration tests should cover the floating toggle cycle through off, React, Tailwind, and off again on desktop viewports.
- Build-quality checks should continue to include lint. Build should be run when route, metadata, SSR, generated Developer Mode metadata, or integration-sensitive behavior changes.
- If React Developer Mode markers, component props, or generated metadata sources change, the metadata generation command must be part of verification.
- Current prior art in the repository is mostly quality-gate oriented rather than automated behavioral tests: lint, build, generated Developer Mode metadata, centralized metadata helpers, centralized dictionaries, and manual verification routes. Future tests should build from those existing public contracts rather than introducing low-level snapshots.
- Manual verification should prioritize `/en`, `/zh`, `/en/projects`, and `/zh/contact`; confirm language switching, dark mode, mobile navigation and CTA usability, skip link/focus visible behavior, SEO basics, and desktop Developer Mode behavior.

## Out of Scope

- A blog, CMS, newsletter, admin dashboard, or authenticated editing flow.
- Payment processing, booking checkout, or platform-specific hiring automation beyond external links.
- A full CRM-style lead intake system or multi-step contact form.
- Full Google Calendar scheduling, event creation, cancellation, or user OAuth.
- New supported locales beyond English and Simplified Chinese.
- Replacing route-prefixed localization with query-based or client-only translation.
- A heavy animation system, 3D scene, game-like experience, or effect-driven redesign.
- Turning the visual direction into a generic SaaS template or marketing landing page.
- A full mobile Developer Mode experience equivalent to desktop.
- A public API product, API documentation site, or indexed availability endpoint.
- A general-purpose CMS, admin dashboard, or authenticated project editing flow.
- Comprehensive analytics dashboards beyond lightweight performance insight.
- Rewriting the architecture away from Next.js App Router, React, Tailwind CSS, and Zustand.

## Further Notes

This PRD is a synthesized product baseline from the current repository and specs. It intentionally treats the existing implementation as a partially shipped product, not a greenfield feature request.

The most important product tension is trust versus personality. When a tradeoff appears, the site should favor credible expression, clear structure, SEO, accessibility, and maintainability, while preserving small moments of character through logo behavior, Developer Mode, project presentation, and restrained interaction details.

The technical documentation contains some historical drift around route naming and framework version references. The current source of truth for this PRD is the implemented locale model: `/en` and `/zh`, with `zh-CN` as the HTML language value for Chinese pages.

Future agents should update this PRD only when product behavior, architecture, constraints, or testing seams materially change. Small implementation refinements do not require PRD churn.
