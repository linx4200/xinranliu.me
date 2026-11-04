'use client';

import { usePathname } from 'next/navigation';
import Link, { isHomePath } from '@/components/Link';
import { useEnsureRunOnClient } from '@/hooks/useEnsureRunOnClient';

import type { Dictionary } from '@/dictionaries';

const getCurrentYear = () => (new Date()).getFullYear();

const Footer = ({ dict }: { dict: Dictionary }) => {
  const pathname = usePathname();
  const year = useEnsureRunOnClient(getCurrentYear);
  const isHomePage = isHomePath(pathname);

  return (
    <footer className={`
      w-full px-5 lg:px-0 py-4
      text-center text-xs text-text-muted
      ${isHomePage ? '' : 'mt-10 border-t border-border/10 lg:mt-20 lg:text-left'}`}
      data-dev-mode-react-name="Footer"
    >
      <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 ${isHomePage ? 'justify-end' : 'justify-center sm:justify-between'}`}>
        {!isHomePage && (
          <p>
            { year ? `@ ${year} Xinran Liu.` : ''} <span className="hidden md:inline">Built with Next.js, React, Tailwind CSS & <span className="text-base" aria-label="Love">♥</span>.</span>
          </p>
        )}
        {!isHomePage && <span className="sm:hidden" aria-hidden="true">·</span>}
        <Link
          href="/privacy"
          className="underline-offset-4 hover:text-primary hover:underline focus-visible:text-primary"
        >
          {dict.ui.footer.privacy}
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
