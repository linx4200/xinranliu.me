'use client';

import { usePathname } from 'next/navigation';

import { isHomePath } from '@/components/Link';

const Footer = () => {
  const pathname = usePathname();
  const year = (new Date()).getFullYear();

  if (isHomePath(pathname)) {
    return null;
  }

  return (
    <footer className="
      w-full mt-10 lg:mt-20 py-4
      border-t border-zinc-200/70 dark:border-zinc-800/80
      text-center lg:text-left"
    >
      <p className="text-xs text-text-muted/50">
        © {year} Xinran Liu. <span className="hidden min-[375px]:inline">Built with Next.js, React, Tailwind CSS & <span className="text-base" aria-label="Love">♥</span>.</span>
      </p>
    </footer>
  );
};

export default Footer;
