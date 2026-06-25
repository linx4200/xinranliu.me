import { twMerge } from 'tailwind-merge';

import type { PropsWithChildren, ComponentProps } from 'react';

export const SayHi = (props: PropsWithChildren<ComponentProps<'span'>>) => {
  return (
    <span className={twMerge("group relative", props.className)} data-dev-mode-react-name="SayHi">
      {props.children}
      <span className="
        absolute left-0 top-3/10
        text-2xl
        transform-[translateX(-150%)]
        origin-[-75%]
        opacity-0
        leading-none
        transition
        group-hover:opacity-100
        group-hover:animate-wiggle
      "
        aria-hidden="true"
      >👋</span>
    </span>
  )
};