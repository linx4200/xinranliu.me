import type { Metadata } from 'next';

import { DEFAULT_LANG, htmlLangMap, resolveLocale, supportedLanguages, type LangCode } from '@/dictionaries';

export const siteUrl = 'https://xinranliu.me';
export const siteMetadataBase = new URL(siteUrl);
export const siteName = 'Xinran Liu';
export const homeSocialImagePath = '/images/search-landing-portfolio.png';

export type LocalizedRoute = '/' | '/projects' | '/contact';

const openGraphLocaleMap: Record<LangCode, string> = {
  en: 'en_US',
  zh: 'zh_CN',
};

export const getLocalizedPath = (lang: LangCode, route: LocalizedRoute) => {
  if (route === '/') {
    return `/${lang}`;
  }

  return `/${lang}${route}`;
};

export const getLocalizedUrl = (lang: LangCode, route: LocalizedRoute) => {
  return `${siteUrl}${getLocalizedPath(lang, route)}`;
};

const getLocalizedLanguageAlternates = (route: LocalizedRoute) => {
  const localeAlternates = Object.fromEntries(
    supportedLanguages.map((lang) => [htmlLangMap[lang], getLocalizedPath(lang, route)])
  );

  return {
    ...localeAlternates,
    'x-default': getLocalizedPath(DEFAULT_LANG, route),
  };
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

export const getSocialImageUrl = (path = homeSocialImagePath) => {
  return `${siteUrl}${path}`;
};

export const buildPageMetadata = ({
  lang,
  route,
  title,
  description,
  imagePath = homeSocialImagePath,
}: {
  lang: string;
  route: LocalizedRoute;
  title: string;
  description: string;
  imagePath?: string;
}): Metadata => {
  const locale = resolveLocale(lang);
  const imageUrl = getSocialImageUrl(imagePath);

  return {
    title,
    description,
    alternates: getLocalizedAlternates(locale, route),
    openGraph: {
      title,
      description,
      url: getLocalizedUrl(locale, route),
      siteName,
      locale: openGraphLocaleMap[locale],
      alternateLocale: supportedLanguages
        .filter((supportedLanguage) => supportedLanguage !== locale)
        .map((supportedLanguage) => openGraphLocaleMap[supportedLanguage]),
      type: 'website',
      images: [
        {
          url: imageUrl,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
};
