'use client';

import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

import { SayHi } from '@/components/SayHi';
import { LogoText } from '@/components/Nav/LogoText';
import { MobileMenu } from '@/components/Nav/MobileMenu';
import { LangSwitch } from '@/components/LangSwitch';
import { DocumentationLink } from '@/components/DocumentationLink';
import Link, { isCurrentPath, isHomePath } from '@/components/Link';

import type { Dictionary } from '@/dictionaries';

const DarkModeSwitch = dynamic(() => import('@/components/DarkModeSwitch').then((mod) => mod.DarkModeSwitch), {
  ssr: false,
  loading: () => <div className="size-10" />,
});

export const NAV_HEIGHT_SPACING = 16;

const STYLE_ONLY_SHOW_IN_DESKTOP = 'hidden lg:block';

const Nav = ({ dict }: { dict: Dictionary }) => {
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

  const PageList = pages.map(page => {
    const current = isCurrentPath(pathname, page.route);
    return (
      <li key={page.name} className={`${current ? 'text-primary' : ''}`}>
        <Link
          href={page.route}
          aria-current={current ? 'page' : undefined}
        >
          {page.name}
        </Link>
      </li>
    )
  });

  return (
    <nav
      className={`
        relative h-${NAV_HEIGHT_SPACING}
        w-full px-2 lg:px-0
        flex items-center justify-between lg:justify-end lg:gap-5
        text-base/15
      `}
      aria-label={ui.navigation.primary}
      dev-mode="tailwind"
      data-dev-mode-react-name="Nav"
    >
      {!isHomePage && <SayHi className={STYLE_ONLY_SHOW_IN_DESKTOP}><LogoText /></SayHi>}

      <MobileMenu toggleLabel={ui.navigation.toggleMenu} PageList={PageList} isHomePage={isHomePage} />

      {!isHomePage && <div className={twMerge(STYLE_ONLY_SHOW_IN_DESKTOP, 'flex-2')}><ul className="flex gap-15 justify-end">
        { PageList }
      </ul></div>}

      {!isHomePage && <div className='hidden lg:block text-surface-strong' aria-hidden="true">|</div>}

      <div
        className="flex items-center lg:gap-5"
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
