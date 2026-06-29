'use client';

import { useEffect, useRef, useState } from "react";
import { useDeveloperModeStore } from '@/store/useDeveloperModeStore';

import { getInfo as getReactInfo, ReactInfo, type Props as ReactInfoProps } from './ReactInfo';
import { getInfo as getTailwindInfo, TailwindInfo, type Props as TailwindInfoProps } from './TailwindInfo';

const POPUP_GAP = 5;
const POPUP_MAX_HEIGHT = 320;
const POPUP_MAX_VIEWPORT_RATIO = 0.4;
const POPUP_MIN_READABLE_HEIGHT = 72;
const VIEWPORT_EDGE_GAP = 8;

export const Info = () => {

  const [reactInfoProps, setReactInfoProps] = useState<ReactInfoProps | undefined>();
  const [tailwindInfoProps, setTailwindInfoProps] = useState<TailwindInfoProps | undefined>();

  const [show, setShow] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [maxHeight, setMaxHeight] = useState(POPUP_MAX_HEIGHT);
  const [rerendered, setRerendered] = useState(0);

  const selfRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLElement | null>(null);
  const hideTimerRef = useRef<number | undefined>(undefined);

  const isDevModeEnabled = useDeveloperModeStore(state => state.isEnabled);
  const devMode = useDeveloperModeStore(state => state.mode);

  useEffect(() => {
    const forceRerender = () => setRerendered(prev => prev + 1);

    const cancelScheduledHide = () => {
      if (typeof hideTimerRef.current === 'undefined') return;

      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = undefined;
    };

    const clearTarget = () => {
      targetRef.current?.removeEventListener('mouseleave', handleTargetMouseLeft);
      targetRef.current?.classList.remove('dev-mode-container-active', 'dev-mode-container-active-react');
      targetRef.current = null;
    };

    const hideInfo = () => {
      cancelScheduledHide();
      setShow(false);
      clearTarget();
    };

    // The popup is scrollable, so it must be able to receive pointer events.
    // That creates a tiny timing gap when the cursor leaves the inspected
    // target and crosses POPUP_GAP before entering the popup. Delaying hide by
    // one short frame lets that transition cancel the hide, while normal
    // mouse-away behavior still feels immediate.
    const scheduleHide = () => {
      cancelScheduledHide();
      hideTimerRef.current = window.setTimeout(hideInfo, 80);
    };

    const handleMouseOver = (ev: MouseEvent) => {

      const target = ev.target as HTMLElement | null;
      if (!target) return;
      if (selfRef.current?.contains(target)) {
        cancelScheduledHide();
        return;
      }

      let reactInfo;
      let tailwindInfo;

      if (devMode === 'react') {
        reactInfo = getReactInfo(target);
      } else if (devMode === 'tailwind') {
        tailwindInfo = getTailwindInfo(target);
      }

      if (typeof reactInfo === 'undefined' && typeof tailwindInfo === 'undefined') {
        return;
      }

      cancelScheduledHide();

      if (typeof reactInfo !== 'undefined') {
        if (targetRef.current !== reactInfo.ele) {
          clearTarget();
        }
        setReactInfoProps(reactInfo.props);
        setTailwindInfoProps(undefined);
        setShow(true);
        targetRef.current = reactInfo.ele;
      } else {
        setReactInfoProps(undefined);
      }

      if (typeof tailwindInfo !== 'undefined') {
        if (targetRef.current !== tailwindInfo.ele) {
          clearTarget();
        }
        setReactInfoProps(undefined);
        setTailwindInfoProps(tailwindInfo.props);
        setShow(true);
        targetRef.current = tailwindInfo.ele;
      } else {
        setTailwindInfoProps(undefined);
      }

      targetRef.current?.addEventListener('mouseleave', handleTargetMouseLeft);
      targetRef.current?.classList.add(devMode === 'react' ? 'dev-mode-container-active-react' : 'dev-mode-container-active');

      // the state `show` is not necessarily changed, so need to ensure rerender
      forceRerender();
    };

    const handleTargetMouseLeft = (ev: MouseEvent) => {
      const nextTarget = ev.relatedTarget as Node | null;

      if (nextTarget && selfRef.current?.contains(nextTarget)) {
        return;
      }

      scheduleHide();
    }

    const handlePopupMouseLeft = (ev: MouseEvent) => {
      const nextTarget = ev.relatedTarget as Node | null;

      if (nextTarget && targetRef.current?.contains(nextTarget)) {
        return;
      }

      scheduleHide();
    }

    const cleanUp = () => {
      cancelScheduledHide();
      document.removeEventListener('mouseover', handleMouseOver);
      selfRef.current?.removeEventListener('mouseleave', handlePopupMouseLeft);
      clearTarget();
    }

    if (isDevModeEnabled && (devMode === 'react' || devMode === 'tailwind')) {
      document.addEventListener('mouseover', handleMouseOver);
      selfRef.current?.addEventListener('mouseleave', handlePopupMouseLeft);
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

    // Cap the popup by a predictable design limit first. The actual max height
    // may be smaller when the target is close to a viewport edge, but it should
    // never grow beyond this bound just because a component has many props.
    const viewportMaxHeight = Math.min(POPUP_MAX_HEIGHT, window.innerHeight * POPUP_MAX_VIEWPORT_RATIO);

    // Measure usable space on both sides of the target in viewport coordinates.
    // The popup itself is absolutely positioned against the document later, so
    // scroll offsets are intentionally not included in these availability checks.
    const availableTopHeight = targetRect.top - POPUP_GAP - VIEWPORT_EDGE_GAP;
    const availableBottomHeight = window.innerHeight - targetRect.bottom - POPUP_GAP - VIEWPORT_EDGE_GAP;

    // Prefer the top placement whenever it can show a readable slice of content.
    // Falling back only when the top is nearly unusable keeps popup placement
    // stable: long prop lists reduce the scrollable height instead of flipping
    // the popup to the bottom.
    const placeAbove = availableTopHeight >= POPUP_MIN_READABLE_HEIGHT || availableTopHeight >= availableBottomHeight;
    const availableHeight = placeAbove ? availableTopHeight : availableBottomHeight;

    // Clamp the rendered popup height to the chosen side. If the content is
    // taller, the popup scrolls internally; if it is shorter, it keeps its
    // natural height and does not reserve unnecessary empty space.
    const popupMaxHeight = Math.max(
      POPUP_MIN_READABLE_HEIGHT,
      Math.min(viewportMaxHeight, availableHeight),
    );

    // Keep the popup centered over the inspected element when possible, while
    // clamping it inside the viewport so narrow targets near the page edge do
    // not push the popup off-screen.
    const desiredLeft = targetRect.left + window.scrollX + (targetRect.width - selfRect.width) / 2;
    const minLeft = window.scrollX + VIEWPORT_EDGE_GAP;
    const maxLeft = window.scrollX + window.innerWidth - selfRect.width - VIEWPORT_EDGE_GAP;
    const left = Math.min(Math.max(desiredLeft, minLeft), Math.max(minLeft, maxLeft));

    // Use the actual rendered height for final placement, but never let that
    // value exceed the side-specific max height. This is what allows "mostly
    // above" placement even when the popup content itself is very tall.
    const top = placeAbove
      ? targetRect.top + window.scrollY - Math.min(selfRect.height, popupMaxHeight) - POPUP_GAP
      : targetRect.bottom + window.scrollY + POPUP_GAP;

    setPosition({ top, left });
    setMaxHeight(popupMaxHeight);
  }, [show, rerendered]);

  return (
    <div
      className="
        absolute z-50 max-h-[min(320px,40vh)] max-w-[calc(50vw-16px)]
        overflow-y-auto overscroll-contain
        rounded-sm bg-border text-sm
        p-2 font-mono"
      style={{
        top: position.top,
        left: position.left,
        maxHeight,
        display: show ? 'block' : 'none'
      }}
      ref={selfRef}
    >
      {reactInfoProps && <ReactInfo {...reactInfoProps} />}
      {tailwindInfoProps && <TailwindInfo {...tailwindInfoProps} />}
    </div>
  )
}
