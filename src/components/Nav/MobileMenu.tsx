import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import { twJoin } from 'tailwind-merge';

import { LogoText } from '@/components/Nav/LogoText';

type MobileMenuProps = {
  toggleLabel: string;
  PageList: ReactNode;
  isHomePage?: boolean;
};

export const MobileMenu = ({ toggleLabel, PageList, isHomePage = false }: MobileMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnOutsideInteraction = (event: PointerEvent | FocusEvent) => {
      if (
        event.target instanceof Node
        && !menuRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', closeOnOutsideInteraction);
    document.addEventListener('focusin', closeOnOutsideInteraction);

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideInteraction);
      document.removeEventListener('focusin', closeOnOutsideInteraction);
    };
  }, [isOpen]);

  const closeOnMenuItemClick = (event: MouseEvent<HTMLUListElement>) => {
    if (event.target instanceof Element && event.target.closest('a')) {
      setIsOpen(false);
    }
  };

  return (
    <div ref={menuRef} className='flex'>
      <button
        type="button"
        className="p-2 text-text-muted lg:hidden"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={toggleLabel}
        aria-expanded={isOpen}
      >
        <svg
          className="size-6"
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

      <LogoText className={twJoin('lg:hidden', isHomePage ? 'invisible' :'visible')} />

      <ul className={`
        lg:hidden
        absolute top-full left-1 mt-2 w-45 sm:w-64 p-2
        flex flex-col gap-1 z-50
        bg-white/80 dark:bg-[#0f0b09]/90 backdrop-blur-xl
        rounded-2xl border border-black/5 dark:border-white/10
        shadow-2xl shadow-stone-500/10 dark:shadow-black/50
        origin-top-left transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
        ${isOpen ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 -translate-y-2 invisible'}
      `}
      onClick={closeOnMenuItemClick}
    >
      { PageList }
    </ul>
    </div>
  );
};
