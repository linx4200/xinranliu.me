'use client';

import { useEffect, useState } from 'react';

import type { Dictionary } from '@/dictionaries';

type Theme = 'light' | 'dark';

const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const prefersDark = mediaQuery.matches;
const initialTheme = prefersDark ? 'dark' : 'light';

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.classList.toggle('light', theme === 'light');
};

applyTheme(initialTheme);

const fillTemplate = (template: string, replacements: Record<string, string>) => {
  return Object.entries(replacements).reduce(
    (result, [key, value]) => result.replace(`{${key}}`, value),
    template
  );
};

export const DarkModeSwitch = ({ copy }: { copy: Dictionary['ui']['darkMode'] }) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const syncWithSystem = (event: MediaQueryListEvent) => {
    const nextTheme: Theme = event.matches ? 'dark' : 'light';
    applyTheme(nextTheme);
    setTheme(nextTheme);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', syncWithSystem);
    return () => mediaQuery.removeEventListener('change', syncWithSystem);
  }, []);

  const toggleTheme = () => {
    setTheme(current => {
      const nextTheme: Theme = current === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      return nextTheme;
    });
  };

  const isDark = theme === 'dark';
  const currentMode = isDark ? copy.dark : copy.light;

  return (
    <button
      type="button"
      role="switch"
      aria-label={fillTemplate(copy.toggleCurrent, { mode: currentMode })}
      aria-checked={isDark}
      onClick={toggleTheme}
      className={`size-10 rounded-full p-2 hover:bg-surface-strong cursor-pointer`}
      dev-mode="tailwind"
      data-dev-mode-react-name="DarkModeSwitch"
    >
      {isDark ? <MoonIcon className="size-6" /> : <SunIcon className="size-6" />}
    </button>
  );
};

const SunIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="4.5" />
    <path d="M12 2v2.5M12 19.5V22M4.22 4.22l1.77 1.77M17.98 17.98l1.8 1.8M2 12h2.5M19.5 12H22M4.22 19.78l1.77-1.77M17.98 6.02l1.8-1.8" />
  </svg>
);

const MoonIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <g transform="translate(-4 1)">
      <path d="M21 12.79A9 9 0 0 1 11.21 3 6.5 6.5 0 1 0 21 12.79Z" />
    </g>
  </svg>
);
