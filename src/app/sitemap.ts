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
  const lastModified = new Date();

  return localizedPages.flatMap(({ route, priority }) => {
    const alternates = getSitemapLanguageAlternates(route);

    return Object.values(alternates).map((url) => ({
      url: `${siteUrl}${url}`,
      lastModified,
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
