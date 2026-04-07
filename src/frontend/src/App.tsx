import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { AuthGuard } from "./components/AuthGuard";
import { Layout } from "./components/Layout";
import { UserProvider } from "./context/UserContext";

// Lazy-loaded pages
const ReservationsPage = lazy(() =>
  import("./pages/ReservationsPage").then((m) => ({
    default: m.ReservationsPage,
  })),
);
const AdminUsersPage = lazy(() =>
  import("./pages/AdminUsersPage").then((m) => ({ default: m.AdminUsersPage })),
);
const AdminSettingsPage = lazy(() =>
  import("./pages/AdminSettingsPage").then((m) => ({
    default: m.AdminSettingsPage,
  })),
);
const InvitePage = lazy(() =>
  import("./pages/InvitePage").then((m) => ({ default: m.InvitePage })),
);

function PageFallback() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// Root layout wraps everything with UserProvider
const rootRoute = createRootRoute({
  component: () => (
    <UserProvider>
      <Outlet />
    </UserProvider>
  ),
});

// Invite route — no auth guard, just accept invite flow
const inviteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/invite/$token",
  component: () => (
    <Suspense fallback={<PageFallback />}>
      <InvitePage />
    </Suspense>
  ),
});

// App shell — auth-guarded, with Layout
const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "app",
  component: () => (
    <AuthGuard>
      <Layout>
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </Layout>
    </AuthGuard>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/",
  component: ReservationsPage,
});

const adminUsersRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/admin/users",
  component: () => (
    <AuthGuard requireAdmin>
      <AdminUsersPage />
    </AuthGuard>
  ),
});

const adminSettingsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/admin/settings",
  component: () => (
    <AuthGuard requireAdmin>
      <AdminSettingsPage />
    </AuthGuard>
  ),
});

const routeTree = rootRoute.addChildren([
  inviteRoute,
  appRoute.addChildren([indexRoute, adminUsersRoute, adminSettingsRoute]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
