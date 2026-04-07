import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  CalendarDays,
  ChevronRight,
  LogOut,
  Settings,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import type { ReactNode } from "react";
import { useUser } from "../context/UserContext";
import { cn } from "../lib/utils";

interface NavItemProps {
  to: string;
  icon: ReactNode;
  label: string;
  "data-ocid"?: string;
}

function NavItem({ to, icon, label, "data-ocid": ocid }: NavItemProps) {
  const router = useRouterState();
  const isActive =
    router.location.pathname === to ||
    router.location.pathname.startsWith(`${to}/`);

  return (
    <Link
      to={to}
      data-ocid={ocid}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-smooth group",
        isActive
          ? "bg-primary/15 text-primary"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
      )}
    >
      <span
        className={cn(
          "w-4 h-4 flex-shrink-0",
          isActive
            ? "text-primary"
            : "text-muted-foreground group-hover:text-sidebar-accent-foreground",
        )}
      >
        {icon}
      </span>
      <span className="flex-1 min-w-0 truncate">{label}</span>
      {isActive && (
        <ChevronRight className="w-3 h-3 text-primary/60 flex-shrink-0" />
      )}
    </Link>
  );
}

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isAdmin, user } = useUser();
  const { clear } = useInternetIdentity();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-60 flex-shrink-0 flex flex-col bg-sidebar border-r border-sidebar-border">
        {/* Brand */}
        <div className="h-16 flex items-center gap-2.5 px-4 border-b border-sidebar-border">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center flex-shrink-0">
            <UtensilsCrossed className="w-4 h-4 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-sidebar-foreground truncate leading-tight">
              ReserveDesk
            </p>
            <p className="text-xs text-muted-foreground leading-tight">
              {isAdmin ? "Administrator" : "Staff"}
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav
          className="flex-1 p-3 space-y-0.5 overflow-y-auto"
          aria-label="Main navigation"
        >
          <NavItem
            to="/"
            icon={<CalendarDays className="w-4 h-4" />}
            label="Reservations"
            data-ocid="nav-reservations"
          />

          {isAdmin && (
            <>
              <div className="pt-3 pb-1 px-3">
                <p className="text-label">Admin</p>
              </div>
              <NavItem
                to="/admin/users"
                icon={<Users className="w-4 h-4" />}
                label="Users"
                data-ocid="nav-admin-users"
              />
              <NavItem
                to="/admin/settings"
                icon={<Settings className="w-4 h-4" />}
                label="Settings"
                data-ocid="nav-admin-settings"
              />
            </>
          )}
        </nav>

        {/* User footer */}
        <div className="p-3 border-t border-sidebar-border">
          <Separator className="mb-3 bg-sidebar-border" />
          <div className="flex items-center gap-2 mb-2 px-1">
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-semibold text-primary">
                {user?.name?.[0]?.toUpperCase() ?? "?"}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-sidebar-foreground truncate">
                {user?.name ?? "—"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email ?? ""}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
            onClick={clear}
            data-ocid="btn-logout"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 flex flex-col bg-background overflow-hidden">
        {children}
      </main>
    </div>
  );
}
