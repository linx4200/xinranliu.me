import { MetadataRoute } from 'next'

import { getSitemapLanguageAlternates, siteUrl, type LocalizedRoute } from '@/lib/seo';

const localizedPages: Array<{
  route: LocalizedRoute;
  priority: number;
}> = [
  { route: '/', priority: 1 },
  { route: '/projects', priority: 0.8 },
  { route: '/contact', priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return localizedPages.flatMap(({ route, priority }) => {
    const alternates = getSitemapLanguageAlternates(route);
    const canonicalUrls = [...new Set(Object.values(alternates))];

    return canonicalUrls.map((url) => ({
      url: `${siteUrl}${url}`,
      changeFrequency: 'monthly' as const,
      priority,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(alternates).map(([locale, localizedUrl]) => [locale, `${siteUrl}${localizedUrl}`])
        ),
      },
    }));
  });
}
