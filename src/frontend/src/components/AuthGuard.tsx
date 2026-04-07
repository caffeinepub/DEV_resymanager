import type { ReactNode } from "react";
import { useUser } from "../context/UserContext";
import { ErrorPage } from "../pages/ErrorPage";
import { LoginPage } from "../pages/LoginPage";

interface AuthGuardProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

/**
 * Guards a route:
 * 1. Loading → spinner
 * 2. Not logged in → LoginPage
 * 3. No admin exists yet → LoginPage (first-signup mode)
 * 4. Principal not in system → ErrorPage
 * 5. Deactivated → ErrorPage
 * 6. Requires admin but user is staff → ErrorPage
 * 7. Otherwise → render children
 */
export function AuthGuard({ children, requireAdmin = false }: AuthGuardProps) {
  const { status, isAdmin } = useUser();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground text-sm">Loading…</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <LoginPage />;
  }

  if (status === "no-admin") {
    return <LoginPage isFirstSignup />;
  }

  if (status === "no-user") {
    return (
      <ErrorPage
        title="Access not granted"
        message="Your account isn't registered in this system. Please contact an administrator to receive an invitation."
      />
    );
  }

  if (status === "deactivated") {
    return (
      <ErrorPage
        title="Account deactivated"
        message="Your account has been deactivated. Please contact an administrator if you believe this is a mistake."
      />
    );
  }

  if (requireAdmin && !isAdmin) {
    return (
      <ErrorPage
        title="Access denied"
        message="You need administrator privileges to view this page."
      />
    );
  }

  return <>{children}</>;
}
