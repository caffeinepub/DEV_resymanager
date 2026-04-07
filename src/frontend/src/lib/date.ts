import type { DayHours } from "../types";

/**
 * Given the restaurant's open hours config and the current Date,
 * return the "restaurant day" as a YYYY-MM-DD string.
 *
 * Logic: if the current time is before today's close time AND
 * the previous day's close time crosses midnight (closeMinutes >= 1440 OR
 * closeMinutes < openMinutes), and now is before that close time,
 * the active day is still "yesterday".
 *
 * Example: open 1 PM – 2 AM. If it's July 5th at 1:00 AM,
 * we're still in July 4th's service window → return "2024-07-04".
 */
export function getRestaurantCurrentDay(
  openHours: DayHours[],
  now: Date = new Date(),
): string {
  const todayIndex = now.getDay(); // 0=Sun
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  // Check if we're inside yesterday's late-night window
  const yesterdayIndex = (todayIndex + 6) % 7;
  const yesterdayHours = openHours.find((d) => d.dayOfWeek === yesterdayIndex);

  if (yesterdayHours?.isOpen) {
    const close = yesterdayHours.closeMinutes;
    // Crossover if close > 1440 (explicit next-day) or close < open (wraps)
    const crossesMidnight =
      close > 1440 ||
      (close < yesterdayHours.openMinutes && yesterdayHours.openMinutes > 720);

    if (crossesMidnight) {
      // The close time in today's minutes
      const todayCloseMinutes = close % 1440;
      if (nowMinutes < todayCloseMinutes) {
        // Still in yesterday's window
        const d = new Date(now);
        d.setDate(d.getDate() - 1);
        return toDateString(d);
      }
    }
  }

  return toDateString(now);
}

/**
 * Format a YYYY-MM-DD string into a display-friendly date with
 * an optional "Today" label.
 */
export function formatDateHeader(dateString: string): {
  label: string;
  isToday: boolean;
} {
  const today = toDateString(new Date());
  const isToday = dateString === today;

  // Parse as local date
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  const label = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return { label, isToday };
}

/**
 * Navigate to the next or previous open day from a given date.
 * Returns the new YYYY-MM-DD string, or null if no open day is found
 * within a 14-day lookahead window.
 */
export function adjacentOpenDay(
  dateString: string,
  direction: "prev" | "next",
  openHours: DayHours[],
): string | null {
  const [year, month, day] = dateString.split("-").map(Number);
  const current = new Date(year, month - 1, day);
  const delta = direction === "next" ? 1 : -1;

  // Try up to 14 days to find next open day
  for (let i = 1; i <= 14; i++) {
    const candidate = new Date(current);
    candidate.setDate(candidate.getDate() + delta * i);
    const dow = candidate.getDay();
    const hours = openHours.find((h) => h.dayOfWeek === dow);
    if (hours?.isOpen) {
      return toDateString(candidate);
    }
  }

  // No open day found within 14 days
  return null;
}

export function toDateString(date: Date): string {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");
  return `${y}-${m}-${d}`;
}
