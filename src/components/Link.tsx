'use client';

import NextLink from 'next/link';
import { useParams } from 'next/navigation';

import { DEFAULT_LANG, resolveLocale, supportedLanguages, type LangCode } from '@/dictionaries';

import type { ComponentProps } from 'react';

type LinkProps = ComponentProps<typeof NextLink>;
type Href = LinkProps['href'];

const hasLangPrefix = (pathname: string) => {
  return supportedLanguages.some((lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`));
};

const stripLangPrefix = (pathname: string) => {
  const normalizedPathname = supportedLanguages.reduce((currentPath, lang) => {
    if (currentPath === `/${lang}`) {
      return '/';
    }

    if (currentPath.startsWith(`/${lang}/`)) {
      return currentPath.slice(lang.length + 1);
    }

    return currentPath;
  }, pathname);

  return normalizedPathname === '' ? '/' : normalizedPathname;
};

export const isCurrentPath = (pathname: string, path: string) => {
  return stripLangPrefix(pathname) === path;
};

const prefixPathname = (pathname: string, lang: LangCode) => {
  if (!pathname.startsWith('/') || pathname.startsWith('//') || hasLangPrefix(pathname)) {
    return pathname;
  }

  if (pathname === '/') {
    return `/${lang}`;
  }

  return `/${lang}${pathname}`;
};

const withLangPrefix = (href: Href, lang: LangCode): Href => {
  if (typeof href === 'string') {
    if (!href.startsWith('/') || href.startsWith('//')) {
      return href;
    }

    const searchIndex = href.indexOf('?');
    const hashIndex = href.indexOf('#');
    const suffixIndex = [searchIndex, hashIndex].filter((index) => index >= 0).sort((a, b) => a - b)[0] ?? href.length;
    const pathname = href.slice(0, suffixIndex);
    const suffix = href.slice(suffixIndex);

    return `${prefixPathname(pathname, lang)}${suffix}`;
  }

  if (typeof href.pathname === 'string') {
    return {
      ...href,
      pathname: prefixPathname(href.pathname, lang),
    };
  }

  return href;
};

export default function Link({ href, ...props }: LinkProps) {
  const params = useParams<{ lang?: string | string[] }>();
  const langParam = Array.isArray(params.lang) ? params.lang[0] : params.lang;
  const lang = resolveLocale(langParam ?? DEFAULT_LANG);

  return <NextLink href={withLangPrefix(href, lang)} {...props} />;
}
