export const supportedLanguages = ['en', 'zh'] as const;

export const DEFAULT_LANG = 'en';

export type LangCode = typeof supportedLanguages[number];

export const htmlLangMap: Record<LangCode, string> = {
  en: 'en',
  zh: 'zh-CN', // 内部路由叫 zh, HTML 标记为 zh-CN
};

const dictionaries = {
  en: () => import('./en.json').then((module) => module.default),
  zh: () => import('./zh-CN.json').then((module) => module.default),
}

export const hasLocale = (locale?: string): locale is LangCode => {
  if (typeof locale === 'string') {
    return (supportedLanguages as unknown as string[]).includes(locale);
  }
  return false;
}

export const resolveLocale = (locale?: string): LangCode => {
  if (hasLocale(locale)) return locale
  return DEFAULT_LANG
}

export const getDictionary = async (locale?: string) => {
  return dictionaries[resolveLocale(locale)]();
}

export const getHtmlLang = (lang?: string) => {
  if (hasLocale(lang)) {
    return htmlLangMap[lang];
  }
}

export type Dictionary = Awaited<ReturnType<typeof dictionaries['en']>>;