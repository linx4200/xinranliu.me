'use client';

import { useEffect, useRef, useState } from "react";
import { useDeveloperModeStore } from '@/store/useDeveloperModeStore';

import { getInfo as getReactInfo, ReactInfo, type Props as ReactInfoProps } from './ReactInfo';
import { getInfo as getTailwindInfo, TailwindInfo, type Props as TailwindInfoProps } from './TailwindInfo';

export const Info = () => {

  const [reactInfoProps, setReactInfoProps] = useState<ReactInfoProps | undefined>();
  const [tailwindInfoProps, setTailwindInfoProps] = useState<TailwindInfoProps | undefined>();

  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [rerendered, setRerendered] = useState(0);

  const selfRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLElement | null>(null);

  const isDevModeEnabled = useDeveloperModeStore(state => state.isEnabled);
  const devMode = useDeveloperModeStore(state => state.mode);

  useEffect(() => {
    const forceRerender = () => setRerendered(prev => prev + 1);

    const handleMouseOver = (ev: MouseEvent) => {

      const target = ev.target as HTMLElement | null;
      if (!target) return;

      let reactInfo;
      let tailwindInfo;

      if (devMode === 'react') {
        reactInfo = getReactInfo(target);
      } else if (devMode === 'tailwind') {
        tailwindInfo = getTailwindInfo(target);
      }

      if (typeof reactInfo !== 'undefined') {
        setReactInfoProps(reactInfo.props);
        setShow(true);
        targetRef.current = reactInfo.ele;
      } else {
        setReactInfoProps(undefined);
      }

      if (typeof tailwindInfo !== 'undefined') {
        setTailwindInfoProps(tailwindInfo.props);
        setShow(true);
        targetRef.current = tailwindInfo.ele;
      } else {
        setTailwindInfoProps(undefined);
      }

      targetRef.current?.addEventListener('mouseleave', handleMouseLeft);
      targetRef.current?.classList.add(devMode === 'react' ? 'dev-mode-container-active-react' : 'dev-mode-container-active');

      // the state `show` is not necessarily changed, so need to ensure rerender
      forceRerender();
    };

    const handleMouseLeft = (ev: MouseEvent) => {
      const target = ev.target as HTMLElement | null;
      if (!target) return;

      setShow(false);
      targetRef.current = null;

      target.classList.remove('dev-mode-container-active', 'dev-mode-container-active-react');
      target.removeEventListener('mouseleave', handleMouseLeft);
    }

    const cleanUp = () => {
      document.removeEventListener('mouseover', handleMouseOver);
      targetRef.current?.removeEventListener('mouseleave', handleMouseLeft);
      targetRef.current = null;
    }

    if (isDevModeEnabled && (devMode === 'react' || devMode === 'tailwind')) {
      document.addEventListener('mouseover', handleMouseOver);
    } else {
      cleanUp();
    }

    return () => {
      cleanUp();
    };
  }, [isDevModeEnabled, devMode]);

  useEffect(() => {
    if (!show || selfRef.current === null || targetRef.current === null) {
      return;
    }

    const targetRect = targetRef.current.getBoundingClientRect();
    const selfRect = selfRef.current.getBoundingClientRect();

    const topSpace = targetRect.top;
    const placeAbove = topSpace >= selfRect.height;

    const left = targetRect.left + (targetRect.width - selfRect.width) / 2;
    const top = placeAbove ? topSpace + window.scrollY - selfRect.height - 5 : targetRect.bottom + window.scrollY + 5;

    setPosition({ top, left });
  }, [show, rerendered]);

  return (
    <div
      className="absolute p-2 font-mono text-sm bg-zinc-900 rounded-sm pointer-events-none"
      style={{
        top: position.top,
        left: position.left,
        display: show ? 'block' : 'none'
      }}
      ref={selfRef}
    >
      {reactInfoProps && <ReactInfo {...reactInfoProps} />}
      {tailwindInfoProps && <TailwindInfo {...tailwindInfoProps} />}
    </div>
  )
}
