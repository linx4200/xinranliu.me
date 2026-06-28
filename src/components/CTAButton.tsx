import Link from '@/components/Link';
import { twMerge } from 'tailwind-merge';

import type { ReactNode } from 'react';

type CTAButtonVariant = 'primary' | 'secondary';

type Props = {
  children: ReactNode;
  href?: string;
  variant?: CTAButtonVariant;
  fullWidthOnMobile?: boolean;
  className?: string;
};

const variantClassNames: Record<CTAButtonVariant, string> = {
  primary: 'border-primary bg-primary text-white hover:bg-primary/85',
  secondary: 'border-primary text-primary hover:bg-primary/5',
};

export const CTAButton = ({
  children,
  href,
  variant = 'secondary',
  fullWidthOnMobile = false,
  className,
}: Props) => {
  const sharedClassName = twMerge(
    'inline-flex min-h-10 md:px-5 items-center justify-center',
    'rounded-md border text-sm font-semibold',
    'transition-colors duration-200 ease-out',
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
      <Link href={href} className={sharedClassName} dev-mode="tailwind">
        {children}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer noopener" className={sharedClassName} dev-mode="tailwind">
      {children}
    </a>
  );
};
