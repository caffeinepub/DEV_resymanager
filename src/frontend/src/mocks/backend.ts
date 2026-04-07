import type { backendInterface, UserView, ReservationView, DayHours, AuthResult } from "../backend";
import { DayOfWeek, InviteStatus, UserRole } from "../backend";

const now = BigInt(Date.now()) * BigInt(1_000_000);

const sampleUser: UserView = {
  id: BigInt(1),
  name: "Maria Rossi",
  email: "maria@restaurant.com",
  inviteStatus: InviteStatus.accepted,
  inviteToken: "token-abc123",
  principal: undefined,
  createdAt: now,
  isActive: true,
};

const sampleUser2: UserView = {
  id: BigInt(2),
  name: "Luca Bianchi",
  email: "luca@restaurant.com",
  inviteStatus: InviteStatus.pending,
  inviteToken: "token-def456",
  principal: undefined,
  createdAt: now,
  isActive: true,
};

const sampleUser3: UserView = {
  id: BigInt(3),
  name: "Sofia Ferrari",
  email: "sofia@restaurant.com",
  inviteStatus: InviteStatus.accepted,
  inviteToken: "token-ghi789",
  principal: undefined,
  createdAt: now,
  isActive: false,
};

const todayStr = new Date().toISOString().split("T")[0];

const sampleReservation1: ReservationView = {
  id: BigInt(1),
  userId: BigInt(1),
  date: todayStr,
  name: "Famiglia Conti",
  phone: "+39 02 1234567",
  guestCount: BigInt(4),
  arriveTime: BigInt(780), // 13:00
  leaveTime: BigInt(900),  // 15:00
  notes: "Window table preferred. Anniversary dinner.",
  createdAt: now,
  updatedAt: now,
};

const sampleReservation2: ReservationView = {
  id: BigInt(2),
  userId: BigInt(2),
  date: todayStr,
  name: "Sig. Marchetti",
  phone: "+39 02 9876543",
  guestCount: BigInt(2),
  arriveTime: BigInt(840), // 14:00
  leaveTime: undefined,
  notes: "",
  createdAt: now,
  updatedAt: now,
};

const sampleReservation3: ReservationView = {
  id: BigInt(3),
  userId: BigInt(1),
  date: todayStr,
  name: "Gruppo Lavoro",
  phone: "+39 02 5555555",
  guestCount: BigInt(8),
  arriveTime: BigInt(1140), // 19:00
  leaveTime: BigInt(1260),  // 21:00
  notes: "Business dinner. Separate bill required.",
  createdAt: now,
  updatedAt: now,
};

const sampleReservation4: ReservationView = {
  id: BigInt(4),
  userId: BigInt(2),
  date: todayStr,
  name: "Dott.ssa Vitale",
  phone: "+39 02 7777777",
  guestCount: BigInt(3),
  arriveTime: BigInt(1200), // 20:00
  leaveTime: BigInt(1320),  // 22:00
  notes: "Gluten-free menu needed.",
  createdAt: now,
  updatedAt: now,
};

const openHours: DayHours[] = [
  { day: DayOfWeek.mon, isOpen: true, openTime: BigInt(720), closeTime: BigInt(1440) },
  { day: DayOfWeek.tue, isOpen: true, openTime: BigInt(720), closeTime: BigInt(1440) },
  { day: DayOfWeek.wed, isOpen: true, openTime: BigInt(720), closeTime: BigInt(1440) },
  { day: DayOfWeek.thu, isOpen: true, openTime: BigInt(720), closeTime: BigInt(1440) },
  { day: DayOfWeek.fri, isOpen: true, openTime: BigInt(720), closeTime: BigInt(1560) },
  { day: DayOfWeek.sat, isOpen: true, openTime: BigInt(720), closeTime: BigInt(1560) },
  { day: DayOfWeek.sun, isOpen: false, openTime: BigInt(720), closeTime: BigInt(1440) },
];

const authResult: AuthResult = {
  __kind__: "ok",
  ok: sampleUser,
};

export const mockBackend: backendInterface = {
  acceptInvite: async (_token: string) => sampleUser,
  assignCallerUserRole: async (_user: any, _role: UserRole) => undefined,
  createReservation: async (req) => ({
    id: BigInt(99),
    userId: BigInt(1),
    date: req.date,
    name: req.name,
    phone: req.phone,
    guestCount: req.guestCount,
    arriveTime: req.arriveTime,
    leaveTime: req.leaveTime,
    notes: req.notes,
    createdAt: now,
    updatedAt: now,
  }),
  createUser: async (_req) => "invite-token-new",
  deactivateUser: async (_userId) => true,
  deleteReservation: async (_id) => true,
  getAllOpenHours: async () => openHours,
  getCallerUserRole: async () => UserRole.admin,
  getMe: async () => authResult,
  isCallerAdmin: async () => true,
  listReservationsByDate: async (_date) => [
    sampleReservation1,
    sampleReservation2,
    sampleReservation3,
    sampleReservation4,
  ],
  listUsers: async () => [sampleUser, sampleUser2, sampleUser3],
  setDayHours: async (_dayHours) => undefined,
  updateReservation: async (_req) => true,
  _initializeAccessControl: async () => undefined,
};
