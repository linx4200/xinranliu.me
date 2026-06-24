import NextLink from 'next/link';

import type { ReactNode } from 'react';

type CTAButtonVariant = 'primary' | 'secondary';

type Props = {
  children: ReactNode;
  href?: string;
  variant?: CTAButtonVariant;
  fullWidthOnMobile?: boolean;
  className?: string;
};

const classNames = (...classes: Array<string | false | undefined>) => {
  return classes.filter(Boolean).join(' ');
};

const variantClassNames: Record<CTAButtonVariant, string> = {
  primary: 'border-primary bg-primary text-white hover:border-accent-600 hover:bg-accent-600',
  secondary: 'border-border/25 bg-transparent text-text hover:border-primary hover:bg-primary/5 hover:text-primary',
};

export const CTAButton = ({
  children,
  href,
  variant = 'secondary',
  fullWidthOnMobile = false,
  className,
}: Props) => {
  const sharedClassName = classNames(
    'inline-flex min-h-11 items-center justify-center rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors duration-200 ease-out',
    fullWidthOnMobile ? 'w-full md:w-auto' : 'w-fit',
    href ? variantClassNames[variant] : `${variantClassNames[variant]} cursor-not-allowed opacity-55`,
    className,
  );

  if (!href) {
    return (
      <button type="button" className={sharedClassName} disabled aria-disabled dev-mode="tailwind">
        {children}
      </button>
    );
  }

  if (href.startsWith('/')) {
    return (
      <NextLink href={href} className={sharedClassName} dev-mode="tailwind">
        {children}
      </NextLink>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer noopener" className={sharedClassName} dev-mode="tailwind">
      {children}
    </a>
  );
};
