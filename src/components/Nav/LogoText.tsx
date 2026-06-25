import { twMerge } from 'tailwind-merge';

import type { ComponentProps } from 'react';

export const LogoText = (props: ComponentProps<'div'>) => {
  return <div className={twMerge('flex-1 text-primary text-left font-bold text-2xl/15', props.className)}>Xinran Liu</div>
}