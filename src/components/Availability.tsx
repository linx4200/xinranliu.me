'use client';

import { useState, useEffect, useMemo } from "react";

import type { Response } from '@/app/api/google-calendar/route';

export const Availability = ({ summaries, calendarUrl }: { summaries: Record<string, string>, calendarUrl: string }) => {

  const [availability, setAvailability] = useState<'free' | 'busy' | 'unknown'>('unknown');
  const [freeInDays, setFreeInDays] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await fetch('/api/google-calendar');
        const data: Response = await resp.json();
        setAvailability(data.data?.availability || 'unknown');
        setFreeInDays(data.data?.freeInDays || 0);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []); // this runs only once on mount

  const status = useMemo(() => {
    if (loading) {
      return {
        indicatorClass: 'bg-stone-300 dark:bg-stone-600 animate-pulse',
        label: summaries.unknown,
        labelClass: 'text-stone-300 dark:text-stone-700 bg-stone-300 dark:bg-stone-700 rounded-md animate-pulse',
        summary: 'Loading...', // Placeholder text to define height/width roughly? Or just use "Loading"
      };
    }
    if (availability === 'free') {
      return {
        indicatorClass: 'bg-emerald-500',
        label: summaries.free,
        labelClass: 'text-emerald-600',
        summary: summaries.available,
      };
    } else if (availability === 'busy') {
      let summary = summaries.booked;
      if (freeInDays > 0) {
        summary = `${summary}. ${summaries.nextAvailable.replace('{n}', freeInDays.toString())}`;
      }
      return {
        indicatorClass: 'bg-red-500',
        label: summaries.busy,
        labelClass: 'text-red-600',
        summary: summary,
      };
    } else {
      return {
        indicatorClass: 'bg-gray-400',
        label: summaries.unknown,
        labelClass: 'text-gray-600',
        summary: summaries.unknown,
      };
    }
  }, [availability, freeInDays, summaries, loading]);

  return (
    <a
      href={calendarUrl}
      target="_blank"
      rel="noreferrer noopener"
      className={`
            text-lg md:text-2xl
            w-fit mt-6 md:mt-10 mx-auto md:mx-0
            flex items-center justify-center md:justify-start
            hover:opacity-80 transition-opacity
            ${loading ? 'pointer-events-none cursor-default' : ''}
            `}
      role="status"
      aria-live="polite"
      dev-mode="tailwind"
      data-dev-mode-react-name="Availability"
    >
      <span className={`hidden lg:inline-block size-3 md:size-4 rounded-full mr-3 ${status.indicatorClass}`} aria-hidden="true" />
      <span className={status.labelClass}>{status.summary}</span>
    </a>
  )
}
