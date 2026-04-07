import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Settings2 } from "lucide-react";
import type { DayHours } from "../backend.d";
import { OpenHoursForm } from "../components/OpenHoursForm";
import { useBackend } from "../hooks/useBackend";

export function AdminSettingsPage() {
  const { actor, isFetching } = useBackend();
  const queryClient = useQueryClient();

  const { data: openHours = [], isLoading } = useQuery({
    queryKey: ["openHours"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllOpenHours();
    },
    enabled: !!actor && !isFetching,
  });

  async function handleSave(hours: DayHours) {
    if (!actor) return;
    await actor.setDayHours(hours);
    await queryClient.invalidateQueries({ queryKey: ["openHours"] });
  }

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      {/* Page header */}
      <div className="bg-card border-b border-border px-8 py-5 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary/15 flex items-center justify-center">
            <Settings2 className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground leading-tight">
              Restaurant Settings
            </h1>
            <p className="text-xs text-muted-foreground">
              Configure open hours for each day of the week
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 max-w-3xl">
        <section aria-labelledby="open-hours-heading">
          <div className="card-elevated overflow-hidden">
            <div className="px-5 py-4 border-b border-border bg-muted/20">
              <h2
                id="open-hours-heading"
                className="text-sm font-semibold text-foreground"
              >
                Opening Hours
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Set which days you're open and the open/close times. Save each
                day individually.
              </p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="p-5">
                <OpenHoursForm initialHours={openHours} onSave={handleSave} />
              </div>
            )}
          </div>
        </section>

        {/* Info callout */}
        <div className="mt-4 rounded border border-border bg-muted/20 px-4 py-3">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground/70">Note:</span> Close
            times past midnight (e.g. 2:00 AM) belong to the same service day as
            the open time. The reservation list will correctly show the previous
            calendar day's entries during late-night hours.
          </p>
        </div>
      </div>
    </div>
  );
}
