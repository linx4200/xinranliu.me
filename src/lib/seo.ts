import { htmlLangMap, supportedLanguages, resolveLocale, type LangCode } from '@/dictionaries';

export const siteUrl = 'https://xinranliu.me';
export const siteMetadataBase = new URL(siteUrl);

export type LocalizedRoute = '/' | '/projects' | '/contact';

export const getLocalizedPath = (lang: LangCode, route: LocalizedRoute) => {
  if (route === '/') {
    return `/${lang}`;
  }

  return `/${lang}${route}`;
};

export const getLanguageAlternates = (route: LocalizedRoute) => {
  const alternates = Object.fromEntries(
    supportedLanguages.map((lang) => [htmlLangMap[lang], getLocalizedPath(lang, route)])
  );

  // if (route === '/') {
  //   return {
  //     ...alternates,
  //     'x-default': '/',
  //   };
  // }

  return alternates;
};

export const getLocalizedAlternates = (lang: string, route: LocalizedRoute) => {
  return {
    canonical: getLocalizedPath(resolveLocale(lang), route),
    languages: getLanguageAlternates(route),
  };
};
