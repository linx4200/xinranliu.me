import {
  getHtmlLang,
  htmlLangMap,
  resolveLocale,
  supportedLanguages,
  type Dictionary,
} from '@/dictionaries';
import type { LocalizedProject } from '@/services/projects';
import {
  getLocalizedUrl,
  getSocialImageUrl,
  siteName,
  siteUrl,
} from '@/lib/seo';

const personId = `${siteUrl}#person`;
const websiteId = `${siteUrl}#website`;

const serializeJsonLd = (data: object) => JSON.stringify(data).replace(/</g, '\\u003c');

const JsonLdScript = ({ data }: { data: object }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
};

const getInLanguage = (lang: string) => {
  return getHtmlLang(resolveLocale(lang)) ?? htmlLangMap.en;
};

const sameAsLinks = [
  'https://github.com/linx4200',
  'https://www.linkedin.com/in/xinran-liu-502897318',
  'https://www.instagram.com/xinranwhatever',
];

export const SiteJsonLd = ({ dict }: { dict: Dictionary }) => {
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId,
    url: siteUrl,
    name: siteName,
    inLanguage: supportedLanguages.map((lang) => htmlLangMap[lang]),
  };

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId,
    name: siteName,
    url: siteUrl,
    description: dict.metadata.home.description,
    jobTitle: dict.jsonld.jobTitle,
    image: getSocialImageUrl(),
    sameAs: sameAsLinks,
    knowsAbout: ['React', 'Vue', 'Next.js', 'Web Development', 'Tailwind CSS'],
  };

  return (
    <>
      <JsonLdScript data={websiteJsonLd} />
      <JsonLdScript data={personJsonLd} />
    </>
  );
};

export const HomePageJsonLd = ({ lang, dict }: { lang: string; dict: Dictionary }) => {
  const locale = resolveLocale(lang);
  const pageUrl = getLocalizedUrl(locale, '/');
  const inLanguage = getInLanguage(lang);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: dict.metadata.home.title,
    description: dict.metadata.home.description,
    inLanguage,
    isPartOf: { '@id': websiteId },
    about: { '@id': personId },
    primaryImageOfPage: getSocialImageUrl(),
  };

  return <JsonLdScript data={jsonLd} />;
};

export const ProjectsPageJsonLd = ({ lang, dict, projects }: { lang: string; dict: Dictionary; projects: LocalizedProject[] }) => {
  const locale = resolveLocale(lang);
  const pageUrl = getLocalizedUrl(locale, '/projects');
  const inLanguage = getInLanguage(lang);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: dict.metadata.projects.title,
    description: dict.metadata.projects.description,
    inLanguage,
    isPartOf: { '@id': websiteId },
    about: { '@id': personId },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: project.site ?? project.github ?? getLocalizedUrl(locale, '/projects'),
        item: {
          '@type': 'CreativeWork',
          name: project.title,
          description: project.desc,
          inLanguage,
          image: project.image ? getSocialImageUrl(project.image) : undefined,
          keywords: project.tags?.join(', ') ?? undefined,
          author: { '@id': personId },
        },
      })),
    },
  };

  return <JsonLdScript data={jsonLd} />;
};

export const ContactPageJsonLd = ({ lang, dict }: { lang: string; dict: Dictionary }) => {
  const locale = resolveLocale(lang);
  const pageUrl = getLocalizedUrl(locale, '/contact');
  const inLanguage = getInLanguage(lang);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: dict.metadata.contact.title,
    description: dict.metadata.contact.description,
    inLanguage,
    isPartOf: { '@id': websiteId },
    about: { '@id': personId },
    mainEntity: { '@id': personId },
  };

  return <JsonLdScript data={jsonLd} />;
};
