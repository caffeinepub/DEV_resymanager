import { type ReactNode, createContext, useContext } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import type { CurrentUserState, UserView } from "../types";

interface UserContextValue extends CurrentUserState {
  isAdmin: boolean;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const state = useCurrentUser();

  const value: UserContextValue = {
    ...state,
    isAdmin: state.user?.role === "admin",
    isAuthenticated: state.status === "authenticated",
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within <UserProvider>");
  }
  return ctx;
}

export function useUserRequired(): UserContextValue & { user: UserView } {
  const ctx = useUser();
  if (!ctx.user) {
    throw new Error("useUserRequired: user is null");
  }
  return ctx as UserContextValue & { user: UserView };
}
