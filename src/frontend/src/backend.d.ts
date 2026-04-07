import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface CreateUserRequest {
    name: string;
    email: string;
}
export interface UserView {
    id: UserId;
    inviteStatus: InviteStatus;
    inviteToken: string;
    principal?: Principal;
    name: string;
    createdAt: Timestamp;
    isActive: boolean;
    email: string;
}
export interface CreateReservationRequest {
    date: DateString;
    guestCount: bigint;
    name: string;
    notes: string;
    phone: string;
    leaveTime?: MinutesFromMidnight;
    arriveTime: MinutesFromMidnight;
}
export interface UpdateReservationRequest {
    id: bigint;
    date: DateString;
    guestCount: bigint;
    name: string;
    notes: string;
    phone: string;
    leaveTime?: MinutesFromMidnight;
    arriveTime: MinutesFromMidnight;
}
export type UserId = bigint;
export interface DayHours {
    day: DayOfWeek;
    closeTime: MinutesFromMidnight;
    isOpen: boolean;
    openTime: MinutesFromMidnight;
}
export type MinutesFromMidnight = bigint;
export interface ReservationView {
    id: bigint;
    userId: UserId;
    date: DateString;
    guestCount: bigint;
    name: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    notes: string;
    phone: string;
    leaveTime?: MinutesFromMidnight;
    arriveTime: MinutesFromMidnight;
}
export type DateString = string;
export type AuthResult = {
    __kind__: "ok";
    ok: UserView;
} | {
    __kind__: "deactivated";
    deactivated: null;
} | {
    __kind__: "notFound";
    notFound: null;
};
export enum DayOfWeek {
    fri = "fri",
    mon = "mon",
    sat = "sat",
    sun = "sun",
    thu = "thu",
    tue = "tue",
    wed = "wed"
}
export enum InviteStatus {
    pending = "pending",
    accepted = "accepted"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    acceptInvite(inviteToken: string): Promise<UserView | null>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createReservation(req: CreateReservationRequest): Promise<ReservationView>;
    createUser(req: CreateUserRequest): Promise<string>;
    deactivateUser(userId: UserId): Promise<boolean>;
    deleteReservation(id: bigint): Promise<boolean>;
    getAllOpenHours(): Promise<Array<DayHours>>;
    getCallerUserRole(): Promise<UserRole>;
    getMe(): Promise<AuthResult>;
    isCallerAdmin(): Promise<boolean>;
    listReservationsByDate(date: DateString): Promise<Array<ReservationView>>;
    listUsers(): Promise<Array<UserView>>;
    setDayHours(dayHours: DayHours): Promise<void>;
    updateReservation(req: UpdateReservationRequest): Promise<boolean>;
}
