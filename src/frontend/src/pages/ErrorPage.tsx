import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { AlertTriangle } from "lucide-react";

interface ErrorPageProps {
  title: string;
  message: string;
}

export function ErrorPage({ title, message }: ErrorPageProps) {
  const { clear } = useInternetIdentity();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-sm w-full text-center space-y-6">
        <div className="w-16 h-16 bg-destructive/15 rounded-full flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {message}
          </p>
        </div>
        <Button
          variant="outline"
          className="w-full"
          onClick={clear}
          data-ocid="btn-error-signout"
        >
          Sign out
        </Button>
      </div>
    </div>
  );
}
