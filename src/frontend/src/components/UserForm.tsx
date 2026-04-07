import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Check, Copy, Loader2, UserPlus } from "lucide-react";
import { useState } from "react";
import { useBackend } from "../hooks/useBackend";

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

interface UserFormProps {
  onCreated: () => void;
}

export function UserForm({ onCreated }: UserFormProps) {
  const { actor } = useBackend();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [inviteToken, setInviteToken] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inviteUrl = inviteToken
    ? `${window.location.origin}/invite/${inviteToken}`
    : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!actor) return;
    setError(null);
    setSubmitting(true);
    try {
      const token = await actor.createUser({
        name: name.trim(),
        email: email.trim(),
      });
      setInviteToken(token);
      setName("");
      setEmail("");
      onCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCopy() {
    if (!inviteUrl) return;
    const ok = await copyToClipboard(inviteUrl);
    if (ok) {
      setCopied(true);
      setCopyFailed(false);
      setTimeout(() => setCopied(false), 2000);
    } else {
      setCopyFailed(true);
      setTimeout(() => setCopyFailed(false), 3000);
    }
  }

  return (
    <div className="space-y-5">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="user-name" className="text-label">
              Full Name
            </Label>
            <Input
              id="user-name"
              placeholder="Jane Smith"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={submitting}
              className="bg-background border-border focus-visible:ring-ring/50"
              data-ocid="input-user-name"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="user-email" className="text-label">
              Email
            </Label>
            <Input
              id="user-email"
              type="email"
              placeholder="jane@restaurant.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={submitting}
              className="bg-background border-border focus-visible:ring-ring/50"
              data-ocid="input-user-email"
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={submitting || !name.trim() || !email.trim()}
          className="gap-2"
          data-ocid="btn-create-user"
        >
          {submitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <UserPlus className="w-4 h-4" />
          )}
          {submitting ? "Creating…" : "Create User"}
        </Button>
      </form>

      {inviteUrl && (
        <div
          className="rounded border border-border bg-muted/30 p-4 space-y-2"
          data-ocid="invite-url-box"
        >
          <p className="text-label text-xs">Invite URL generated</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 min-w-0 text-xs text-foreground/80 font-mono bg-background border border-border rounded px-2 py-1.5 truncate">
              {inviteUrl}
            </code>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCopy}
              className="flex-shrink-0 gap-1.5 border-border"
              aria-label="Copy invite URL"
              data-ocid="btn-copy-invite-url"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-secondary" />
              ) : copyFailed ? (
                <AlertCircle className="w-3.5 h-3.5 text-destructive" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {copied ? "Copied!" : copyFailed ? "Failed" : "Copy"}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Share this link with the user so they can accept their invitation.
          </p>
        </div>
      )}
    </div>
  );
}
