import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertCircle,
  Check,
  Copy,
  Loader2,
  ShieldOff,
  UserCheck,
  UserX,
} from "lucide-react";
import { useState } from "react";
import type { InviteStatus, UserView } from "../backend.d";

async function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // fall through to legacy method
    }
  }
  // Legacy execCommand fallback
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.inset = "0";
    ta.style.opacity = "0";
    ta.style.pointerEvents = "none";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

interface UserRowProps {
  user: UserView;
  onDeactivate: (id: bigint) => Promise<void>;
}

function statusLabel(status: InviteStatus, isActive: boolean): string {
  if (!isActive) return "deactivated";
  if (status === "pending") return "pending";
  return "accepted";
}

function StatusBadge({ user }: { user: UserView }) {
  const label = statusLabel(user.inviteStatus, user.isActive);
  const variants: Record<string, { className: string; icon: React.ReactNode }> =
    {
      pending: {
        className: "border-border text-muted-foreground bg-muted/30",
        icon: <UserCheck className="w-3 h-3" />,
      },
      accepted: {
        className: "border-secondary/40 text-secondary bg-secondary/10",
        icon: <UserCheck className="w-3 h-3" />,
      },
      deactivated: {
        className: "border-destructive/40 text-destructive bg-destructive/10",
        icon: <UserX className="w-3 h-3" />,
      },
    };
  const v = variants[label];
  return (
    <Badge
      variant="outline"
      className={`gap-1 capitalize text-xs ${v.className}`}
    >
      {v.icon}
      {label}
    </Badge>
  );
}

function CopyInviteButton({ token }: { token: string }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const url = `${window.location.origin}/invite/${token}`;

  async function handleCopy() {
    const ok = await copyToClipboard(url);
    if (ok) {
      setCopied(true);
      setFailed(false);
      setTimeout(() => setCopied(false), 2000);
    } else {
      setFailed(true);
      setTimeout(() => setFailed(false), 3000);
    }
  }

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={handleCopy}
      className="gap-1.5 text-muted-foreground hover:text-foreground h-7 px-2"
      aria-label="Copy invite URL"
      data-ocid="btn-copy-invite"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-secondary" />
      ) : failed ? (
        <AlertCircle className="w-3.5 h-3.5 text-destructive" />
      ) : (
        <Copy className="w-3.5 h-3.5" />
      )}
      <span className="text-xs">
        {copied ? "Copied" : failed ? "Failed" : "Copy link"}
      </span>
    </Button>
  );
}

function UserRow({ user, onDeactivate }: UserRowProps) {
  const [deactivating, setDeactivating] = useState(false);

  async function handleDeactivate() {
    setDeactivating(true);
    try {
      await onDeactivate(user.id);
    } finally {
      setDeactivating(false);
    }
  }

  const initials = user.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-muted/10 transition-colors"
      data-ocid="user-list-row"
    >
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
        <span className="text-xs font-semibold text-primary">{initials}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {user.name}
        </p>
        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
      </div>

      {/* Status */}
      <div className="flex-shrink-0">
        <StatusBadge user={user} />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        {user.isActive && user.inviteStatus === "pending" && (
          <CopyInviteButton token={user.inviteToken} />
        )}

        {user.isActive && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="gap-1.5 text-muted-foreground hover:text-destructive h-7 px-2"
                aria-label={`Deactivate ${user.name}`}
                data-ocid="btn-deactivate-user"
              >
                <ShieldOff className="w-3.5 h-3.5" />
                <span className="text-xs">Deactivate</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-card border-border">
              <AlertDialogHeader>
                <AlertDialogTitle>Deactivate {user.name}?</AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground">
                  This will immediately revoke their access. They will not be
                  able to log in or view any data until reactivated.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  className="bg-background border-border hover:bg-muted/20"
                  data-ocid="btn-deactivate-cancel"
                >
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeactivate}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  disabled={deactivating}
                  data-ocid="btn-deactivate-confirm"
                >
                  {deactivating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : null}
                  {deactivating ? "Deactivating…" : "Yes, deactivate"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
}

interface UserListProps {
  users: UserView[];
  loading: boolean;
  onDeactivate: (id: bigint) => Promise<void>;
}

export function UserList({ users, loading, onDeactivate }: UserListProps) {
  if (loading) {
    return (
      <div className="space-y-px" data-ocid="user-list-loading">
        {(["a", "b", "c"] as const).map((k) => (
          <div key={k} className="flex items-center gap-3 px-4 py-3">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3.5 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-14 gap-2"
        data-ocid="user-list-empty"
      >
        <UserX className="w-8 h-8 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">No users yet</p>
        <p className="text-xs text-muted-foreground/60">
          Create your first user above to get started.
        </p>
      </div>
    );
  }

  return (
    <div data-ocid="user-list">
      {users.map((u) => (
        <UserRow key={String(u.id)} user={u} onDeactivate={onDeactivate} />
      ))}
    </div>
  );
}
