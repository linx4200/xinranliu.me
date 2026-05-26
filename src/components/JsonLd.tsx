import { projects } from '@/data/projects';
import { getHtmlLang, resolveLocale, DEFAULT_LANG, type Dictionary } from '@/dictionaries';
import { getLocalizedPath, siteUrl } from '@/lib/seo';

export const JsonLd = ({ lang, dict }: { lang: string, dict: Dictionary }) => {
  const locale = resolveLocale(lang);
  const localizedHomeUrl = `${siteUrl}${getLocalizedPath(locale, '/')}`;
  const inLanguage = getHtmlLang(locale) ?? DEFAULT_LANG;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}#me`,
    inLanguage,
    name: 'Xinran Liu',
    url: localizedHomeUrl,
    description: dict.metadata.home.description,
    jobTitle: dict.jsonld.jobTitle,
    knowsAbout: ['React', 'Vue', 'Next.js', 'Web Development', 'Tailwind CSS'],
    subjectOf: projects.map((project) => ({
      '@type': 'CreativeWork', // https://schema.org/CreativeWork
      name: project.title[locale],
      description: project.desc[locale],
      inLanguage,
      url: project.site ?? project.github ?? `${siteUrl}${getLocalizedPath(locale, '/projects')}`,
      keywords: project.tags?.join(',') ?? '',
      author: { '@id': `${siteUrl}#me` }
    })),
    sameAs: [
      'https://github.com/linx4200',
      'https://www.linkedin.com/in/xinran-liu-502897318'
    ],
    primaryImageOfPage: "/images/search-landing-portfolio.png"
  };


  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
