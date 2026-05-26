'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { type Dictionary, type LangCode } from '@/dictionaries';

const fillTemplate = (template: string, replacements: Record<string, string>) => {
  return Object.entries(replacements).reduce(
    (result, [key, value]) => result.replace(`{${key}}`, value),
    template
  );
};

export const LangSwitch = ({ copy }: { copy: Dictionary['ui']['languageSwitch'] }) => {

  const params = useParams();
  const lang = params.lang as LangCode;
  const router = useRouter();
  const pathname = usePathname();

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'zh' : 'en';
    let newPath;
    if (pathname.startsWith(`/${lang}`)) {
      newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    } else {
      newPath = `/${newLang}${pathname}`;
    }
    router.push(newPath);
  };

  const selectedStyle = 'top-4/20 left-5/20 z-10 text-white dark:text-bg bg-stone-800 dark:bg-text';
  const normalStyle = 'top-8/20 left-9/20 border border-stone-800 dark:border-text';
  const currentLanguageLabel = lang === 'en' ? copy.english : copy.chinese;

  return (
    <button
      type="button"
      className="relative size-10 rounded-full
        text-xs/4 text-stone-800 dark:text-text
        cursor-pointer hover:bg-surface-strong"
      onClick={toggleLang}
      aria-label={fillTemplate(copy.toggleCurrent, { language: currentLanguageLabel })}
      aria-pressed={lang === 'zh'}
      data-dev-mode-react-name="LangSwitch"
    >
      <span className={`absolute size-4 text-tiny ${lang === 'en' ? selectedStyle : normalStyle}`}>EN</span>
      <span className={`absolute size-4 ${lang === 'zh' ? selectedStyle : normalStyle}`}>中</span>
    </button>
  );
};
