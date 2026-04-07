// Mirrored from backend Motoko types

export type InvitationStatus = "pending" | "accepted";

export interface UserView {
  id: string;
  name: string;
  email: string;
  role: "admin" | "staff";
  invitationStatus: InvitationStatus;
  isActive: boolean;
  principalId: string | null;
}

export interface DayHours {
  dayOfWeek: number; // 0=Sun, 1=Mon, ... 6=Sat
  isOpen: boolean;
  openMinutes: number; // minutes from midnight, e.g. 780 = 1:00 PM
  closeMinutes: number; // minutes from midnight, e.g. 120 = 2:00 AM next day (midnight crossover when > 1440)
}

export interface ReservationView {
  id: string;
  name: string;
  phone: string;
  employeeId: string;
  employeeName: string;
  arriveMinutes: number; // minutes from midnight
  leaveMinutes: number | null;
  numGuests: number;
  notes: string;
  date: string; // YYYY-MM-DD
}

export interface CreateReservationInput {
  name: string;
  phone: string;
  arriveMinutes: number;
  leaveMinutes: number | null;
  numGuests: number;
  notes: string;
  date: string;
}

export interface UpdateReservationInput extends CreateReservationInput {
  id: string;
}

export type AuthStatus =
  | "loading"
  | "unauthenticated"
  | "no-admin"
  | "no-user"
  | "deactivated"
  | "authenticated";

export interface CurrentUserState {
  status: AuthStatus;
  user: UserView | null;
}
