import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { CheckCircle, LogIn, UtensilsCrossed, XCircle } from "lucide-react";
import { useState } from "react";
import { useBackend } from "../hooks/useBackend";

/**
 * Invite acceptance page.
 * Route: /invite/:token
 * The user must be logged in to accept. Once they click accept,
 * their principal is linked to the pending user invitation.
 */
export function InvitePage() {
  const { token } = useParams({ strict: false }) as { token: string };
  const { identity, login } = useInternetIdentity();
  const { actor } = useBackend();
  const queryClient = useQueryClient();

  const [status, setStatus] = useState<
    "idle" | "accepting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isLoggedIn = identity != null;

  async function handleAccept() {
    if (!actor || !token) return;
    setStatus("accepting");
    try {
      await (
        actor as unknown as {
          acceptInvite: (token: string) => Promise<void>;
        }
      ).acceptInvite(token);
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      setStatus("success");
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to accept invitation.",
      );
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-sm w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto shadow-lg">
            <UtensilsCrossed className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">
            ReserveDesk
          </h1>
        </div>

        <div className="card-elevated p-6 space-y-5">
          {status === "success" ? (
            <div className="text-center space-y-3">
              <CheckCircle className="w-10 h-10 text-secondary mx-auto" />
              <h2 className="text-base font-semibold text-foreground">
                Invitation accepted!
              </h2>
              <p className="text-sm text-muted-foreground">
                Your account is now active. You can close this page and navigate
                to the app.
              </p>
              <Button
                className="w-full"
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                Go to app
              </Button>
            </div>
          ) : status === "error" ? (
            <div className="text-center space-y-3">
              <XCircle className="w-10 h-10 text-destructive mx-auto" />
              <h2 className="text-base font-semibold text-foreground">
                Something went wrong
              </h2>
              <p className="text-sm text-muted-foreground">{errorMsg}</p>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setStatus("idle")}
              >
                Try again
              </Button>
            </div>
          ) : !isLoggedIn ? (
            <>
              <div className="space-y-1.5">
                <h2 className="text-base font-semibold text-foreground">
                  You're invited!
                </h2>
                <p className="text-sm text-muted-foreground">
                  Sign in with Internet Identity to accept your invitation and
                  activate your account.
                </p>
              </div>
              <Button
                className="w-full"
                onClick={login}
                data-ocid="btn-invite-login"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign in to accept
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-1.5">
                <h2 className="text-base font-semibold text-foreground">
                  Accept invitation
                </h2>
                <p className="text-sm text-muted-foreground">
                  Click below to link your identity and activate your account.
                </p>
              </div>
              <Button
                className="w-full"
                onClick={handleAccept}
                disabled={status === "accepting"}
                data-ocid="btn-accept-invite"
              >
                {status === "accepting" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin mr-2" />
                    Accepting…
                  </>
                ) : (
                  "Accept invitation"
                )}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
