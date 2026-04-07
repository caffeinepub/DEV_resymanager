import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Users } from "lucide-react";
import { minutesToTime } from "../lib/time";
import type { ReservationView } from "../types";

interface ReservationItemProps {
  reservation: ReservationView;
  onEdit: (r: ReservationView) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

export function ReservationItem({
  reservation,
  onEdit,
  onDelete,
  isDeleting,
}: ReservationItemProps) {
  const { id, name, phone, arriveMinutes, leaveMinutes, numGuests, notes } =
    reservation;
  const arriveLabel = minutesToTime(arriveMinutes);
  const leaveLabel = leaveMinutes !== null ? minutesToTime(leaveMinutes) : null;

  return (
    <div
      className="group relative flex items-start gap-3 px-4 py-3 hover:bg-muted/20 transition-colors"
      data-ocid={`reservation-item-${id}`}
    >
      {/* Clickable overlay button for editing — covers everything except delete zone */}
      <button
        type="button"
        className="absolute inset-0 w-full cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
        onClick={() => onEdit(reservation)}
        aria-label={`Edit reservation for ${name}`}
      />

      {/* Time column */}
      <div className="relative z-10 flex flex-col items-end shrink-0 w-16 pt-0.5 pointer-events-none">
        <span className="text-xs font-semibold text-primary font-mono tabular-nums">
          {arriveLabel}
        </span>
        {leaveLabel && (
          <span className="text-[10px] text-muted-foreground font-mono tabular-nums">
            → {leaveLabel}
          </span>
        )}
      </div>

      {/* Divider dot */}
      <div className="relative z-10 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 flex-1 min-w-0 pointer-events-none">
        <div className="flex items-baseline gap-2 min-w-0">
          <span className="font-semibold text-sm text-foreground truncate">
            {name}
          </span>
          <span className="text-xs text-muted-foreground shrink-0 font-mono">
            {phone}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-0.5">
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="h-3 w-3" />
            {numGuests} {numGuests === 1 ? "guest" : "guests"}
          </span>
          {notes && (
            <span className="text-xs text-muted-foreground truncate italic">
              {notes}
            </span>
          )}
        </div>
      </div>

      {/* Delete action — above the overlay */}
      <div className="relative z-20 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              aria-label="Delete reservation"
              data-ocid={`delete-reservation-${id}`}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-card border-border">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete reservation?</AlertDialogTitle>
              <AlertDialogDescription>
                Remove <strong>{name}</strong>'s reservation? This cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel data-ocid="delete-cancel">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => onDelete(id)}
                disabled={isDeleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                data-ocid="delete-confirm"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
