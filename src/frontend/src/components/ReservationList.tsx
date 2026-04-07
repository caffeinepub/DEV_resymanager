import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Plus, Users } from "lucide-react";
import type { ReservationView } from "../types";
import { ReservationItem } from "./ReservationItem";

interface ReservationListProps {
  reservations: ReservationView[];
  isLoading: boolean;
  onEdit: (r: ReservationView) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  isDeleting: boolean;
}

export function ReservationList({
  reservations,
  isLoading,
  onEdit,
  onDelete,
  onAdd,
  isDeleting,
}: ReservationListProps) {
  const sorted = [...reservations].sort(
    (a, b) => a.arriveMinutes - b.arriveMinutes,
  );

  return (
    <div
      className="flex-1 overflow-y-auto bg-background"
      data-ocid="reservation-list"
    >
      {isLoading ? (
        <div className="divide-y divide-border">
          {Array.from({ length: 5 }, (_, i) => `sk-${i}`).map((sk) => (
            <div key={sk} className="px-4 py-3 flex gap-3 items-start">
              <div className="flex flex-col gap-1.5 pt-0.5 w-14 shrink-0">
                <Skeleton className="h-3.5 w-12" />
                <Skeleton className="h-3 w-10" />
              </div>
              <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-5 w-8 rounded-full" />
            </div>
          ))}
        </div>
      ) : sorted.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center gap-3 py-16 px-6 text-center"
          data-ocid="reservations-empty"
        >
          <div className="w-12 h-12 rounded-full bg-muted/40 flex items-center justify-center">
            <Clock className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">
            No reservations for this day.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={onAdd}
            className="mt-1"
            data-ocid="empty-add-btn"
          >
            <Plus className="h-3.5 w-3.5 mr-1.5" />
            Add first reservation
          </Button>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {sorted.map((r) => (
            <ReservationItem
              key={r.id}
              reservation={r}
              onEdit={onEdit}
              onDelete={onDelete}
              isDeleting={isDeleting}
            />
          ))}
        </div>
      )}

      {/* Sticky add button at bottom */}
      <div className="sticky bottom-0 bg-background border-t border-border px-4 py-3">
        <Button
          onClick={onAdd}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          data-ocid="add-reservation-btn"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add reservation
        </Button>
      </div>
    </div>
  );
}
