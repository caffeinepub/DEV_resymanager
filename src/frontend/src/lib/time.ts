/**
 * Convert minutes-from-midnight to a 12-hour time string.
 * Handles crossover past midnight (e.g. 1500 -> 3:00 AM)
 */
export function minutesToTime(minutes: number): string {
  const normalized = minutes % 1440; // wrap at 24h
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  const period = h < 12 ? "AM" : "PM";
  const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  const paddedMin = m.toString().padStart(2, "0");
  return `${hour12}:${paddedMin} ${period}`;
}

/**
 * Convert a 12-hour time string back to minutes from midnight.
 * Accepts: "1:00 PM", "12:30 AM", "9:15 AM"
 */
export function timeToMinutes(timeStr: string): number {
  const match = timeStr.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return 0;
  let hours = Number.parseInt(match[1], 10);
  const mins = Number.parseInt(match[2], 10);
  const period = match[3].toUpperCase();
  if (period === "AM" && hours === 12) hours = 0;
  if (period === "PM" && hours !== 12) hours += 12;
  return hours * 60 + mins;
}

/**
 * Format minutes-from-midnight as an input-friendly "HH:MM" (24h).
 */
export function minutesToInput(minutes: number): string {
  const normalized = minutes % 1440;
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

/**
 * Convert "HH:MM" (24h input) to minutes from midnight.
 */
export function inputToMinutes(value: string): number {
  const [h, m] = value.split(":").map(Number);
  return (h || 0) * 60 + (m || 0);
}
