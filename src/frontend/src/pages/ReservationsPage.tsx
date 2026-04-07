import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { DayOfWeek } from "../backend";
import type {
  DayHours as BackendDayHours,
  ReservationView as BackendReservationView,
} from "../backend.d";
import { ReservationForm } from "../components/ReservationForm";
import { ReservationList } from "../components/ReservationList";
import { useUserRequired } from "../context/UserContext";
import { useBackend } from "../hooks/useBackend";
import {
  adjacentOpenDay,
  formatDateHeader,
  getRestaurantCurrentDay,
} from "../lib/date";
import type {
  CreateReservationInput,
  DayHours,
  ReservationView,
  UpdateReservationInput,
} from "../types";

// Map backend DayOfWeek enum to numeric 0=Sun…6=Sat
const DOW_MAP: Record<DayOfWeek, number> = {
  [DayOfWeek.sun]: 0,
  [DayOfWeek.mon]: 1,
  [DayOfWeek.tue]: 2,
  [DayOfWeek.wed]: 3,
  [DayOfWeek.thu]: 4,
  [DayOfWeek.fri]: 5,
  [DayOfWeek.sat]: 6,
};

function mapBackendHours(raw: BackendDayHours[]): DayHours[] {
  return raw.map((d) => ({
    dayOfWeek: DOW_MAP[d.day],
    isOpen: d.isOpen,
    openMinutes: Number(d.openTime),
    closeMinutes: Number(d.closeTime),
  }));
}

function mapReservation(r: BackendReservationView): ReservationView {
  return {
    id: r.id.toString(),
    name: r.name,
    phone: r.phone,
    employeeId: r.userId.toString(),
    employeeName: "",
    arriveMinutes: Number(r.arriveTime),
    leaveMinutes: r.leaveTime !== undefined ? Number(r.leaveTime) : null,
    numGuests: Number(r.guestCount),
    notes: r.notes,
    date: r.date,
  };
}

export function ReservationsPage() {
  const { actor } = useBackend();
  const { user } = useUserRequired();
  const queryClient = useQueryClient();

  const { data: rawHours = [], isLoading: hoursLoading } = useQuery({
    queryKey: ["openHours"],
    queryFn: async () => (actor ? actor.getAllOpenHours() : []),
    enabled: !!actor,
  });

  const openHours = mapBackendHours(rawHours);

  // Eagerly initialize to today's date string so the form can open immediately,
  // before openHours resolves. Once openHours loads we'll compute the correct
  // restaurant day; manual navigation overrides both.
  const todayStr = useMemo(() => {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }, []);

  const [currentDate, setCurrentDate] = useState<string | null>(null);

  const activeDate =
    currentDate ??
    (openHours.length > 0 ? getRestaurantCurrentDay(openHours) : todayStr);

  const { data: rawReservations = [], isLoading: resLoading } = useQuery({
    queryKey: ["reservations", activeDate],
    queryFn: async () =>
      actor && activeDate ? actor.listReservationsByDate(activeDate) : [],
    enabled: !!actor && !!activeDate,
  });

  const reservations: ReservationView[] = rawReservations.map(mapReservation);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ReservationView | null>(null);

  const createMutation = useMutation({
    mutationFn: async (input: CreateReservationInput) => {
      if (!actor) throw new Error("No actor");
      return actor.createReservation({
        date: input.date,
        guestCount: BigInt(input.numGuests),
        name: input.name,
        notes: input.notes,
        phone: input.phone,
        arriveTime: BigInt(input.arriveMinutes),
        leaveTime:
          input.leaveMinutes !== null ? BigInt(input.leaveMinutes) : undefined,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations", activeDate] });
      toast.success("Reservation added");
      setFormOpen(false);
    },
    onError: () => toast.error("Failed to save reservation"),
  });

  const updateMutation = useMutation({
    mutationFn: async (input: UpdateReservationInput) => {
      if (!actor) throw new Error("No actor");
      return actor.updateReservation({
        id: BigInt(input.id),
        date: input.date,
        guestCount: BigInt(input.numGuests),
        name: input.name,
        notes: input.notes,
        phone: input.phone,
        arriveTime: BigInt(input.arriveMinutes),
        leaveTime:
          input.leaveMinutes !== null ? BigInt(input.leaveMinutes) : undefined,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations", activeDate] });
      toast.success("Reservation updated");
      setEditing(null);
      setFormOpen(false);
    },
    onError: () => toast.error("Failed to update reservation"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteReservation(BigInt(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations", activeDate] });
      toast.success("Reservation deleted");
    },
    onError: () => toast.error("Failed to delete reservation"),
  });

  function handleAddClick() {
    setEditing(null);
    setFormOpen(true);
  }

  function handleEditClick(r: ReservationView) {
    setEditing(r);
    setFormOpen(true);
  }

  function handleFormClose() {
    setFormOpen(false);
    setEditing(null);
  }

  function handleSubmit(input: CreateReservationInput) {
    if (editing) {
      updateMutation.mutate({ ...input, id: editing.id });
    } else {
      createMutation.mutate(input);
    }
  }

  function handleDelete(id: string) {
    deleteMutation.mutate(id);
  }

  function goToPrevDay() {
    if (!activeDate || openHours.length === 0) return;
    const prev = adjacentOpenDay(activeDate, "prev", openHours);
    if (prev) setCurrentDate(prev);
  }

  function goToNextDay() {
    if (!activeDate || openHours.length === 0) return;
    const next = adjacentOpenDay(activeDate, "next", openHours);
    if (next) setCurrentDate(next);
  }

  const isLoading = hoursLoading || resLoading;
  const dateInfo = activeDate ? formatDateHeader(activeDate) : null;

  // Compute whether adjacent open days exist to enable/disable nav arrows.
  // While openHours is still loading, treat arrows as navigable so they remain
  // visible — they resolve to the correct state once loading finishes.
  const hasPrevDay = hoursLoading
    ? true
    : !!activeDate &&
      openHours.length > 0 &&
      adjacentOpenDay(activeDate, "prev", openHours) !== null;
  const hasNextDay = hoursLoading
    ? true
    : !!activeDate &&
      openHours.length > 0 &&
      adjacentOpenDay(activeDate, "next", openHours) !== null;

  const closeMinutes = activeDate
    ? (() => {
        const [, , d] = activeDate.split("-").map(Number);
        const candidate = new Date(
          Number(activeDate.split("-")[0]),
          Number(activeDate.split("-")[1]) - 1,
          d,
        );
        const dow = candidate.getDay();
        const h = openHours.find((o) => o.dayOfWeek === dow);
        return h ? h.closeMinutes : null;
      })()
    : null;

  const totalGuests = reservations.reduce((s, r) => s + r.numGuests, 0);

  return (
    <div className="flex flex-col min-h-0 flex-1">
      {/* Date header */}
      <div
        className="bg-card border-b border-border px-4 py-3 flex items-center gap-3"
        data-ocid="reservations-date-header"
      >
        <button
          type="button"
          className={`h-8 w-8 flex items-center justify-center rounded-md transition-colors ${hasPrevDay ? "text-foreground hover:bg-accent cursor-pointer" : "text-muted-foreground/40 cursor-not-allowed"}`}
          onClick={hasPrevDay ? goToPrevDay : undefined}
          aria-label="Previous day"
          aria-disabled={!hasPrevDay}
          data-ocid="date-prev-btn"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex-1 flex items-center gap-2 min-w-0">
          {isLoading || !dateInfo ? (
            <Skeleton className="h-5 w-40" />
          ) : (
            <>
              <span className="font-display font-semibold text-foreground text-base truncate">
                {dateInfo.label}
              </span>
              {dateInfo.isToday && (
                <Badge
                  className="text-[10px] px-1.5 py-0 font-semibold bg-primary/20 text-primary border-primary/30"
                  variant="outline"
                  data-ocid="today-badge"
                >
                  Today
                </Badge>
              )}
            </>
          )}
        </div>

        <button
          type="button"
          className={`h-8 w-8 flex items-center justify-center rounded-md transition-colors ${hasNextDay ? "text-foreground hover:bg-accent cursor-pointer" : "text-muted-foreground/40 cursor-not-allowed"}`}
          onClick={hasNextDay ? goToNextDay : undefined}
          aria-label="Next day"
          aria-disabled={!hasNextDay}
          data-ocid="date-next-btn"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Summary bar */}
      <div
        className="bg-muted/40 border-b border-border px-4 py-2 flex items-center gap-4 text-sm"
        data-ocid="reservations-summary"
      >
        {isLoading ? (
          <>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
          </>
        ) : (
          <>
            <span className="text-muted-foreground">
              <span className="text-foreground font-semibold">
                {reservations.length}
              </span>{" "}
              {reservations.length === 1 ? "reservation" : "reservations"}
            </span>
            <span className="text-border">·</span>
            <span className="text-muted-foreground">
              <span className="text-foreground font-semibold">
                {totalGuests}
              </span>{" "}
              {totalGuests === 1 ? "guest" : "guests"}
            </span>
          </>
        )}
      </div>

      {/* Reservation list */}
      <ReservationList
        reservations={reservations}
        isLoading={isLoading}
        onEdit={handleEditClick}
        onDelete={handleDelete}
        onAdd={handleAddClick}
        isDeleting={deleteMutation.isPending}
      />

      {/* Reservation form modal */}
      {formOpen && (
        <ReservationForm
          date={activeDate}
          editing={editing}
          closeMinutes={closeMinutes}
          currentUserId={user.id}
          onSubmit={handleSubmit}
          onClose={handleFormClose}
          isPending={createMutation.isPending || updateMutation.isPending}
        />
      )}
    </div>
  );
}
