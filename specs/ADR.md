# Architecture Decision Records

This document captures the major architecture decisions that shape Xinran Liu's personal portfolio website. It is intentionally concise: each record should help future maintainers understand why the project works this way, what should be preserved, and where changes would carry tradeoffs.

## ADR-001: Use Next.js App Router For A SEO-First Portfolio

### Status

Accepted

### Context

The site is a personal portfolio and freelancer digital business card. Its public pages need strong first-load readability, crawlable content, localized metadata, structured data, and simple deployment. The product is content-heavy and interaction-light, with only a few client-side experiences such as navigation state, dark mode, language switching, availability fetching, and Developer Mode.

### Decision

Use Next.js App Router as the core framework. Public pages should default to Server Components, and Client Components should be limited to the smallest interactive boundaries.

### Consequences

- SEO-critical page content, metadata, and JSON-LD can be generated close to the route layer.
- The site keeps a simple mental model: route pages compose data, dictionaries, SEO helpers, and presentational components.
- Hydration cost stays constrained because broad layout and content areas do not become client-rendered by default.
- Any future interactive feature should justify its client boundary instead of moving page or layout ownership to the client.

## ADR-002: Use Route-Prefixed Internationalization

### Status

Accepted

### Context

The site supports English and Simplified Chinese. Both language versions need crawlable, shareable URLs and correct language metadata. Client-only translation or query-param language switching would weaken SEO and make canonical/alternate language handling less reliable.

### Decision

Use locale-prefixed routes for public pages. Supported route locales are `en` and `zh`. The internal Chinese route prefix is `zh`, while the HTML language marker is `zh-CN`. The root path redirects to the preferred supported locale based on request language, with English as the default fallback.

### Consequences

- Search engines can index both language versions independently.
- Language switching must preserve equivalent paths where possible.
- User-visible copy changes must be reflected in both English and Chinese dictionaries.
- SEO helpers, sitemap generation, and page metadata must keep canonical and alternate language mappings in sync.