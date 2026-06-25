'use client';

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LangSwitch } from '@/components/LangSwitch';
import { SayHi } from '@/components/SayHi';
import { DocumentationLink } from '@/components/DocumentationLink';
import Link, { isCurrentPath, isHomePath } from '@/components/Link';

import type { Dictionary } from '@/dictionaries';

const DarkModeSwitch = dynamic(() => import('@/components/DarkModeSwitch').then((mod) => mod.DarkModeSwitch), {
  ssr: false,
  loading: () => <div className="size-10" />,
});

const Nav = ({ dict }: { dict: Dictionary }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const ui = dict.ui;
  const isHomePage = isHomePath(pathname);

  const pages = [
    {
      name: dict.nav.home,
      route: '/'
    },
    {
      name: dict.nav.projects,
      route: '/projects'
    },
    {
      name: dict.nav.contact,
      route: '/contact'
    }
  ];

  return (
    <nav
      className="
        w-full h-16 relative
        pr-2 lg:pr-0
        flex items-center justify-between lg:justify-end lg:gap-5
        text-base/15"
      aria-label={ui.navigation.primary}
      dev-mode="tailwind"
      data-dev-mode-react-name="Nav"
    >
      {!isHomePage && <div className='hidden lg:block flex-1 text-primary text-left font-bold text-2xl/15'><SayHi name="Xinran Liu" /></div>}

      {!isHomePage && (
        <>
          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="lg:hidden p-2 text-text-muted"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={ui.navigation.toggleMenu}
            aria-expanded={isOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <div className='lg:hidden flex-1 text-primary text-left font-bold text-2xl/15'>Xinran Liu</div>

          <ul className={`
              absolute top-full left-1 mt-2 w-45 sm:w-64 p-2 rounded-2xl flex flex-col gap-1 z-50
              bg-white/80 dark:bg-[#0f0b09]/90 backdrop-blur-xl
              border border-black/5 dark:border-white/10
              shadow-2xl shadow-stone-500/10 dark:shadow-black/50
              origin-top-left transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
              ${isOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'}
              lg:opacity-100 lg:scale-100 lg:translate-y-0 lg:visible
              lg:static lg:mt-0 lg:w-auto lg:p-0 lg:border-none lg:shadow-none lg:flex-row lg:bg-transparent lg:gap-15
            `}
          >
            {
              pages.map(page => {
                const current = isCurrentPath(pathname, page.route);
                return (
                  <li key={page.name} className={`${current && 'text-primary'}`}>
                    <Link
                      href={page.route}
                      aria-current={current ? 'page' : undefined}
                      onClick={() => setIsOpen(false)}
                    >
                      {page.name}
                    </Link>
                  </li>
                )
              })
            }
          </ul>

          <div className='hidden lg:block text-stone-300' aria-hidden="true">|</div>
        </>
      )}

      {isHomePage && <div className="flex-1" aria-hidden="true" />}

      <div
        className="flex items-center gap-5"
        dev-mode="tailwind"
      >
        <DarkModeSwitch copy={ui.darkMode} />
        <LangSwitch copy={ui.languageSwitch} />
        <DocumentationLink ariaLabel={ui.documentationLink} />
      </div>
    </nav>
  );
};

export default Nav;
