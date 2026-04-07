import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { LogIn, UserPlus, UtensilsCrossed } from "lucide-react";

interface LoginPageProps {
  isFirstSignup?: boolean;
}

export function LoginPage({ isFirstSignup = false }: LoginPageProps) {
  const { login } = useInternetIdentity();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-sm w-full space-y-8">
        {/* Brand mark */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto shadow-lg">
            <UtensilsCrossed className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">
              ReserveDesk
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Restaurant reservation management
            </p>
          </div>
        </div>

        {/* Card */}
        <div className="card-elevated p-6 space-y-5">
          {isFirstSignup ? (
            <>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-primary" />
                  <h2 className="text-base font-semibold text-foreground">
                    Create admin account
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  No administrator exists yet. Sign in with Internet Identity to
                  become the first admin and set up this restaurant's workspace.
                </p>
              </div>
              <Button
                className="w-full"
                onClick={login}
                data-ocid="btn-first-signup"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Sign in &amp; become admin
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-1.5">
                <h2 className="text-base font-semibold text-foreground">
                  Sign in
                </h2>
                <p className="text-sm text-muted-foreground">
                  Use your Internet Identity to access this workspace.
                </p>
              </div>
              <Button className="w-full" onClick={login} data-ocid="btn-login">
                <LogIn className="w-4 h-4 mr-2" />
                Sign in with Internet Identity
              </Button>
            </>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Access is by invitation only.
        </p>
      </div>
    </div>
  );
}
