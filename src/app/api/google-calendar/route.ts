import { getAvailability } from '@/services/google';
import dayjs from 'dayjs';

export type Response = {
  data?: {
    availability?: 'busy' | 'free';
    freeInDays?: number;
  },
  error?: string;
};

const nonIndexableHeaders = {
  'X-Robots-Tag': 'noindex, nofollow',
};

// Helper: Check if a given time range overlaps with any busy interval
function isBusy(targetStart: dayjs.Dayjs, targetEnd: dayjs.Dayjs, busyIntervals: { start: string, end: string }[]) {
  return busyIntervals.some(interval => {
    const busyStart = dayjs(interval.start);
    const busyEnd = dayjs(interval.end);
    // Overlap condition: Not (End <= BusyStart OR Start >= BusyEnd)
    // Equivalent to: End > BusyStart AND Start < BusyEnd
    return targetEnd.isAfter(busyStart) && targetStart.isBefore(busyEnd);
  });
}

export async function GET() {
  const resp = await getAvailability();

  if (!resp || !resp.busy) {
    // If API fails or no busy array, be conservative? Or assume free?
    // Let's assume free if no data (or handle error). 
    // Code below handles empty array.
    return Response.json({ error: 'Failed to fetch availability' }, { headers: nonIndexableHeaders });
  }

  // start 和 end 都是 UTC（世界标准时间）， 如 ‘2026-01-23T23:30:00Z’
  const busyIntervals = resp.busy.filter(
    (item): item is { start: string; end: string } =>
      typeof item.start === 'string' && typeof item.end === 'string'
  );
  const now = dayjs();

  // 1. Check current availability
  // Check if NOW is inside any busy slot
  const isBusyNow = isBusy(now, now, busyIntervals);
  const availability = isBusyNow ? 'busy' : 'free';

  // 2. Calculate freeInDays
  let freeInDays = 0;

  if (availability === 'free') {
    freeInDays = 0;
  } else {
    // Look for the first free day
    // We check availability for "Whole Day"
    for (let i = 1; i < 30; i++) {
      const start = now.add(i, 'day').startOf('day');
      const end = now.add(i, 'day').endOf('day');

      // Check if ANY event overlaps with this day
      // Logic: If there is an event on this day, it is busy.
      const dayHasEvent = isBusy(start, end, busyIntervals);

      if (!dayHasEvent) {
        freeInDays = i;
        break;
      }
    }
  }

  return Response.json({
    data: {
      availability,
      freeInDays
    }
  }, { headers: nonIndexableHeaders });
}
