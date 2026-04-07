import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import type { AuthResult, UserView as BackendUserView } from "../backend.d";
import type { CurrentUserState, UserView } from "../types";
import { useBackend } from "./useBackend";

interface BackendUserResult {
  user: UserView | null;
  adminExists: boolean;
  status: "ok" | "deactivated" | "notFound";
}

function mapBackendUser(raw: BackendUserView, isAdmin: boolean): UserView {
  return {
    id: raw.id.toString(),
    name: raw.name,
    email: raw.email,
    role: isAdmin ? "admin" : "staff",
    invitationStatus: raw.inviteStatus === "accepted" ? "accepted" : "pending",
    isActive: raw.isActive,
    principalId: raw.principal ? raw.principal.toText() : null,
  };
}

/**
 * Fetches the current user from the backend and returns a structured auth state.
 * - "loading": still fetching identity or user data
 * - "unauthenticated": not logged in (anonymous)
 * - "no-admin": logged in but no admin exists yet (first run)
 * - "no-user": logged in but principal not registered
 * - "deactivated": user account is deactivated
 * - "authenticated": fully active user
 */
export function useCurrentUser(): CurrentUserState {
  const { identity, isInitializing } = useInternetIdentity();
  const { actor } = useBackend();

  const isLoggedIn = identity != null && !isInitializing;
  const principalStr = identity?.getPrincipal().toText();

  // Allow the query to run as soon as actor is non-null, even if actorLoading is
  // still true — isFetching may be stuck indefinitely on some deployments.
  const actorReady = !!actor;

  const { data, isLoading } = useQuery<BackendUserResult | null>({
    queryKey: ["currentUser", principalStr],
    queryFn: async () => {
      if (!actor) return null;

      // Check if the caller is admin (also acts as "admin exists" for admins)
      const isAdmin = await actor.isCallerAdmin().catch(() => false);

      // Get the current user record — always unwrap the AuthResult variant
      const authResult: AuthResult = await actor.getMe();

      if (authResult.__kind__ === "ok") {
        return {
          user: mapBackendUser(authResult.ok, isAdmin),
          adminExists: true,
          status: "ok",
        };
      }

      if (authResult.__kind__ === "deactivated") {
        return { user: null, adminExists: true, status: "deactivated" };
      }

      // notFound — if isAdmin is false AND we got notFound, no admin bootstrapped yet
      return {
        user: null,
        adminExists: isAdmin,
        status: "notFound",
      };
    },
    enabled: isLoggedIn && actorReady,
    retry: 1,
    staleTime: 30_000,
  });

  // Still initializing Internet Identity — always show loading
  if (isInitializing) {
    return { status: "loading", user: null };
  }

  if (!isLoggedIn) {
    return { status: "unauthenticated", user: null };
  }

  // Logged in but actor not available yet — show loading only while query is in-flight
  if (!actorReady || isLoading) {
    return { status: "loading", user: null };
  }

  if (!data) {
    return { status: "loading", user: null };
  }

  if (!data.adminExists && data.status === "notFound") {
    return { status: "no-admin", user: null };
  }

  if (data.status === "deactivated") {
    return { status: "deactivated", user: null };
  }

  if (data.status === "notFound") {
    return { status: "no-user", user: null };
  }

  if (!data.user) {
    return { status: "no-user", user: null };
  }

  if (!data.user.isActive) {
    return { status: "deactivated", user: data.user };
  }

  return { status: "authenticated", user: data.user };
}
