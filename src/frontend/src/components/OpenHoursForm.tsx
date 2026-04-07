import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { type DayHours, DayOfWeek } from "../backend.d";

const DAY_ORDER: DayOfWeek[] = [
  DayOfWeek.sun,
  DayOfWeek.mon,
  DayOfWeek.tue,
  DayOfWeek.wed,
  DayOfWeek.thu,
  DayOfWeek.fri,
  DayOfWeek.sat,
];

const DAY_LABELS: Record<DayOfWeek, string> = {
  [DayOfWeek.sun]: "Sunday",
  [DayOfWeek.mon]: "Monday",
  [DayOfWeek.tue]: "Tuesday",
  [DayOfWeek.wed]: "Wednesday",
  [DayOfWeek.thu]: "Thursday",
  [DayOfWeek.fri]: "Friday",
  [DayOfWeek.sat]: "Saturday",
};

const DAY_ABBR: Record<DayOfWeek, string> = {
  [DayOfWeek.sun]: "Sun",
  [DayOfWeek.mon]: "Mon",
  [DayOfWeek.tue]: "Tue",
  [DayOfWeek.wed]: "Wed",
  [DayOfWeek.thu]: "Thu",
  [DayOfWeek.fri]: "Fri",
  [DayOfWeek.sat]: "Sat",
};

/** minutes-from-midnight → "HH:MM" (24h) */
function minutesToTime(mins: bigint): string {
  const m = Number(mins) % 1440;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

/** "HH:MM" → BigInt minutes-from-midnight */
function timeToMinutes(time: string): bigint {
  const [h, m] = time.split(":").map(Number);
  return BigInt((h ?? 0) * 60 + (m ?? 0));
}

/** Display "HH:MM" with AM/PM label */
function formatDisplay(mins: bigint): string {
  const total = Number(mins) % 1440;
  const h = Math.floor(total / 60);
  const m = total % 60;
  const suffix = h < 12 ? "AM" : "PM";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

type DayState = {
  isOpen: boolean;
  openTime: string; // "HH:MM"
  closeTime: string; // "HH:MM"
};

function buildDefault(): Record<DayOfWeek, DayState> {
  const defaults: Partial<Record<DayOfWeek, DayState>> = {};
  for (const day of DAY_ORDER) {
    defaults[day] = { isOpen: false, openTime: "11:00", closeTime: "22:00" };
  }
  return defaults as Record<DayOfWeek, DayState>;
}

interface OpenHoursFormProps {
  initialHours: DayHours[];
  onSave: (hours: DayHours) => Promise<void>;
}

export function OpenHoursForm({ initialHours, onSave }: OpenHoursFormProps) {
  const [days, setDays] = useState<Record<DayOfWeek, DayState>>(buildDefault);
  const [savingDay, setSavingDay] = useState<DayOfWeek | null>(null);
  const [savedDay, setSavedDay] = useState<DayOfWeek | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Hydrate from server data
  useEffect(() => {
    if (!initialHours.length) return;
    setDays((prev) => {
      const next = { ...prev };
      for (const dh of initialHours) {
        next[dh.day] = {
          isOpen: dh.isOpen,
          openTime: minutesToTime(dh.openTime),
          closeTime: minutesToTime(dh.closeTime),
        };
      }
      return next;
    });
  }, [initialHours]);

  function updateDay(day: DayOfWeek, patch: Partial<DayState>) {
    setDays((prev) => ({ ...prev, [day]: { ...prev[day], ...patch } }));
  }

  async function handleSave(day: DayOfWeek) {
    const state = days[day];
    setError(null);
    setSavingDay(day);
    try {
      await onSave({
        day,
        isOpen: state.isOpen,
        openTime: timeToMinutes(state.openTime),
        closeTime: timeToMinutes(state.closeTime),
      });
      setSavedDay(day);
      setTimeout(() => setSavedDay(null), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSavingDay(null);
    }
  }

  return (
    <div className="space-y-1" data-ocid="open-hours-form">
      {error && (
        <p className="text-sm text-destructive px-1 pb-2" role="alert">
          {error}
        </p>
      )}

      {DAY_ORDER.map((day) => {
        const state = days[day];
        const isSaving = savingDay === day;
        const isSaved = savedDay === day;

        return (
          <div
            key={day}
            className="flex items-center gap-4 px-4 py-3 rounded border border-border bg-card/50 hover:bg-card transition-colors"
            data-ocid={`open-hours-row-${day}`}
          >
            {/* Day toggle */}
            <div className="flex items-center gap-3 w-36 flex-shrink-0">
              <Switch
                id={`switch-${day}`}
                checked={state.isOpen}
                onCheckedChange={(v) => updateDay(day, { isOpen: v })}
                aria-label={`Toggle ${DAY_LABELS[day]}`}
                data-ocid={`switch-${day}`}
              />
              <label
                htmlFor={`switch-${day}`}
                className="text-sm font-medium cursor-pointer select-none"
              >
                <span className="hidden sm:inline">{DAY_LABELS[day]}</span>
                <span className="sm:hidden">{DAY_ABBR[day]}</span>
              </label>
            </div>

            {/* Time fields */}
            {state.isOpen ? (
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-muted-foreground w-9 text-right flex-shrink-0">
                    Open
                  </span>
                  <input
                    type="time"
                    value={state.openTime}
                    onChange={(e) =>
                      updateDay(day, { openTime: e.target.value })
                    }
                    className="input-field w-28 text-sm tabular-nums"
                    aria-label={`${DAY_LABELS[day]} open time`}
                    data-ocid={`input-open-${day}`}
                  />
                </div>
                <span className="text-muted-foreground text-xs flex-shrink-0">
                  —
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-muted-foreground w-9 text-right flex-shrink-0">
                    Close
                  </span>
                  <input
                    type="time"
                    value={state.closeTime}
                    onChange={(e) =>
                      updateDay(day, { closeTime: e.target.value })
                    }
                    className="input-field w-28 text-sm tabular-nums"
                    aria-label={`${DAY_LABELS[day]} close time`}
                    data-ocid={`input-close-${day}`}
                  />
                </div>
                <span className="text-xs text-muted-foreground hidden lg:block">
                  ({formatDisplay(timeToMinutes(state.openTime))} –{" "}
                  {formatDisplay(timeToMinutes(state.closeTime))})
                </span>
              </div>
            ) : (
              <div className="flex-1">
                <span className="text-sm text-muted-foreground/50 italic">
                  Closed
                </span>
              </div>
            )}

            {/* Save button */}
            <Button
              size="sm"
              variant={isSaved ? "outline" : "default"}
              onClick={() => handleSave(day)}
              disabled={isSaving}
              className={`flex-shrink-0 gap-1.5 h-7 px-3 text-xs ${
                isSaved ? "border-secondary/40 text-secondary" : ""
              }`}
              aria-label={`Save ${DAY_LABELS[day]}`}
              data-ocid={`btn-save-${day}`}
            >
              {isSaving ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                <Save className="w-3 h-3" />
              )}
              {isSaving ? "Saving…" : isSaved ? "Saved!" : "Save"}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
