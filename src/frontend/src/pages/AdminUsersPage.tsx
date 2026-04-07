import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Users } from "lucide-react";
import { UserForm } from "../components/UserForm";
import { UserList } from "../components/UserList";
import { useBackend } from "../hooks/useBackend";

export function AdminUsersPage() {
  const { actor, isFetching } = useBackend();
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listUsers();
    },
    enabled: !!actor && !isFetching,
  });

  async function handleDeactivate(id: bigint) {
    if (!actor) return;
    await actor.deactivateUser(id);
    await queryClient.invalidateQueries({ queryKey: ["users"] });
  }

  function handleCreated() {
    queryClient.invalidateQueries({ queryKey: ["users"] });
  }

  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      {/* Page header */}
      <div className="bg-card border-b border-border px-8 py-5 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-primary/15 flex items-center justify-center">
            <Users className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground leading-tight">
              User Management
            </h1>
            <p className="text-xs text-muted-foreground">
              Create users and send invite links
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-8 space-y-8 max-w-3xl">
        {/* Create user card */}
        <section aria-labelledby="create-user-heading">
          <div className="card-elevated overflow-hidden">
            <div className="px-5 py-4 border-b border-border bg-muted/20">
              <h2
                id="create-user-heading"
                className="text-sm font-semibold text-foreground"
              >
                Invite New User
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Enter their name and email to generate an invite link.
              </p>
            </div>
            <div className="p-5">
              <UserForm onCreated={handleCreated} />
            </div>
          </div>
        </section>

        {/* User list card */}
        <section aria-labelledby="user-list-heading">
          <div className="card-elevated overflow-hidden">
            <div className="px-5 py-4 border-b border-border bg-muted/20 flex items-center justify-between">
              <div>
                <h2
                  id="user-list-heading"
                  className="text-sm font-semibold text-foreground"
                >
                  All Users
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {isLoading
                    ? "Loading…"
                    : `${users.length} user${users.length !== 1 ? "s" : ""}`}
                </p>
              </div>
            </div>
            <UserList
              users={users}
              loading={isLoading}
              onDeactivate={handleDeactivate}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
