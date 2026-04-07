import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { inputToMinutes, minutesToInput } from "../lib/time";
import type { CreateReservationInput, ReservationView } from "../types";

interface ReservationFormProps {
  date: string;
  editing: ReservationView | null;
  closeMinutes: number | null;
  currentUserId: string;
  onSubmit: (input: CreateReservationInput) => void;
  onClose: () => void;
  isPending: boolean;
}

interface FormState {
  name: string;
  phone: string;
  arriveTime: string;
  leaveTime: string;
  numGuests: string;
  notes: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  arriveTime?: string;
  leaveTime?: string;
  numGuests?: string;
}

function defaultLeaveTime(closeMinutes: number | null): string {
  if (closeMinutes === null) return "";
  return minutesToInput(closeMinutes % 1440);
}

function initForm(
  editing: ReservationView | null,
  closeMinutes: number | null,
): FormState {
  if (editing) {
    return {
      name: editing.name,
      phone: editing.phone,
      arriveTime: minutesToInput(editing.arriveMinutes),
      leaveTime:
        editing.leaveMinutes !== null
          ? minutesToInput(editing.leaveMinutes)
          : defaultLeaveTime(closeMinutes),
      numGuests: editing.numGuests.toString(),
      notes: editing.notes,
    };
  }
  return {
    name: "",
    phone: "",
    arriveTime: "",
    leaveTime: defaultLeaveTime(closeMinutes),
    numGuests: "2",
    notes: "",
  };
}

export function ReservationForm({
  date,
  editing,
  closeMinutes,
  onSubmit,
  onClose,
  isPending,
}: ReservationFormProps) {
  const [form, setForm] = useState<FormState>(() =>
    initForm(editing, closeMinutes),
  );
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormState, boolean>>
  >({});

  useEffect(() => {
    setForm(initForm(editing, closeMinutes));
    setErrors({});
    setTouched({});
  }, [editing, closeMinutes]);

  function set(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function blur(field: keyof FormState) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, form[field]);
  }

  function validateField(field: keyof FormState, value: string) {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field as keyof FormErrors];

      if (field === "name" && !value.trim()) next.name = "Name is required";
      if (field === "phone" && !value.trim()) next.phone = "Phone is required";
      if (field === "arriveTime" && !value)
        next.arriveTime = "Arrive time is required";
      if (field === "numGuests") {
        const n = Number(value);
        if (!value || Number.isNaN(n) || n < 1)
          next.numGuests = "At least 1 guest required";
      }
      if (field === "leaveTime" && value && form.arriveTime) {
        if (inputToMinutes(value) < inputToMinutes(form.arriveTime)) {
          next.leaveTime = "Leave time must be after arrive time";
        }
      }

      return next;
    });
  }

  function validate(): boolean {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.phone.trim()) errs.phone = "Phone is required";
    if (!form.arriveTime) errs.arriveTime = "Arrive time is required";
    const guests = Number(form.numGuests);
    if (!form.numGuests || Number.isNaN(guests) || guests < 1)
      errs.numGuests = "At least 1 guest required";
    if (form.leaveTime && form.arriveTime) {
      if (inputToMinutes(form.leaveTime) < inputToMinutes(form.arriveTime)) {
        errs.leaveTime = "Leave time must be after arrive time";
      }
    }
    setErrors(errs);
    setTouched({
      name: true,
      phone: true,
      arriveTime: true,
      numGuests: true,
      leaveTime: true,
      notes: true,
    });
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const leaveMinutes = form.leaveTime
      ? inputToMinutes(form.leaveTime)
      : closeMinutes !== null
        ? closeMinutes % 1440
        : null;

    onSubmit({
      name: form.name.trim(),
      phone: form.phone.trim(),
      arriveMinutes: inputToMinutes(form.arriveTime),
      leaveMinutes,
      numGuests: Number(form.numGuests),
      notes: form.notes.trim(),
      date,
    });
  }

  const title = editing ? "Edit Reservation" : "New Reservation";

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="bg-card border-border max-w-md w-full"
        data-ocid="reservation-form-modal"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-lg">{title}</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-4 pt-1"
        >
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="res-name">Guest name *</Label>
            <Input
              id="res-name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              onBlur={() => blur("name")}
              placeholder="Jane Smith"
              className="bg-background border-border"
              data-ocid="res-name-input"
              autoFocus
            />
            {touched.name && errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="res-phone">Phone *</Label>
            <Input
              id="res-phone"
              type="tel"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              onBlur={() => blur("phone")}
              placeholder="+1 555 000 0000"
              className="bg-background border-border"
              data-ocid="res-phone-input"
            />
            {touched.phone && errors.phone && (
              <p className="text-xs text-destructive">{errors.phone}</p>
            )}
          </div>

          {/* Time row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="res-arrive">Arrive *</Label>
              <Input
                id="res-arrive"
                type="time"
                value={form.arriveTime}
                onChange={(e) => set("arriveTime", e.target.value)}
                onBlur={() => blur("arriveTime")}
                className="bg-background border-border"
                data-ocid="res-arrive-input"
              />
              {touched.arriveTime && errors.arriveTime && (
                <p className="text-xs text-destructive">{errors.arriveTime}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="res-leave">Leave</Label>
              <Input
                id="res-leave"
                type="time"
                value={form.leaveTime}
                onChange={(e) => set("leaveTime", e.target.value)}
                onBlur={() => blur("leaveTime")}
                className="bg-background border-border"
                data-ocid="res-leave-input"
              />
              {touched.leaveTime && errors.leaveTime && (
                <p className="text-xs text-destructive">{errors.leaveTime}</p>
              )}
            </div>
          </div>

          {/* Guests */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="res-guests">Guests *</Label>
            <Input
              id="res-guests"
              type="number"
              min={1}
              max={999}
              value={form.numGuests}
              onChange={(e) => set("numGuests", e.target.value)}
              onBlur={() => blur("numGuests")}
              className="bg-background border-border"
              data-ocid="res-guests-input"
            />
            {touched.numGuests && errors.numGuests && (
              <p className="text-xs text-destructive">{errors.numGuests}</p>
            )}
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="res-notes">Notes</Label>
            <Textarea
              id="res-notes"
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              placeholder="Allergies, seating preferences…"
              rows={2}
              className="bg-background border-border resize-none"
              data-ocid="res-notes-input"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              disabled={isPending}
              data-ocid="res-cancel-btn"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
              disabled={isPending}
              data-ocid="res-submit-btn"
            >
              {isPending
                ? "Saving…"
                : editing
                  ? "Save changes"
                  : "Add reservation"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
