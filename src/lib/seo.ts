import { htmlLangMap, supportedLanguages, resolveLocale, type LangCode } from '@/dictionaries';

export const siteUrl = 'https://xinranliu.me';
export const siteMetadataBase = new URL(siteUrl);
export const homeSocialImagePath = '/images/search-landing-portfolio.png';

export type LocalizedRoute = '/' | '/projects' | '/contact';

export const getLocalizedPath = (lang: LangCode, route: LocalizedRoute) => {
  if (route === '/') {
    return `/${lang}`;
  }

  return `/${lang}${route}`;
};

const getLocalizedLanguageAlternates = (route: LocalizedRoute) => {
  return Object.fromEntries(
    supportedLanguages.map((lang) => [htmlLangMap[lang], getLocalizedPath(lang, route)])
  );
};

export const getSitemapLanguageAlternates = (route: LocalizedRoute) => {
  return getLocalizedLanguageAlternates(route);
};

export const getLocalizedAlternates = (lang: string, route: LocalizedRoute) => {
  return {
    canonical: getLocalizedPath(resolveLocale(lang), route),
    languages: getLocalizedLanguageAlternates(route),
  };
};
