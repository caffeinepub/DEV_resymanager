import { c as createLucideIcon, e as useBackend, r as reactExports, j as jsxRuntimeExports, B as Button, k as UserPlus, u as useQueryClient, i as useQuery, U as Users } from "./index-DjUS783R.js";
import { L as Label, I as Input, S as Skeleton, A as AlertDialog, b as AlertDialogTrigger, c as AlertDialogContent, d as AlertDialogHeader, e as AlertDialogTitle, f as AlertDialogDescription, g as AlertDialogFooter, h as AlertDialogCancel, i as AlertDialogAction, B as Badge } from "./alert-dialog-CRRAzysw.js";
import { L as LoaderCircle } from "./loader-circle-D-rZo_Yz.js";
import "./index-C8BGPssw.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  [
    "path",
    {
      d: "M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71",
      key: "1jlk70"
    }
  ],
  [
    "path",
    {
      d: "M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264",
      key: "18rp1v"
    }
  ]
];
const ShieldOff = createLucideIcon("shield-off", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 11 2 2 4-4", key: "9rsbq5" }],
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const UserCheck = createLucideIcon("user-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "17", x2: "22", y1: "8", y2: "13", key: "3nzzx3" }],
  ["line", { x1: "22", x2: "17", y1: "8", y2: "13", key: "1swrse" }]
];
const UserX = createLucideIcon("user-x", __iconNode);
async function copyToClipboard$1(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
    }
  }
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
function UserForm({ onCreated }) {
  const { actor } = useBackend();
  const [name, setName] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [inviteToken, setInviteToken] = reactExports.useState(null);
  const [copied, setCopied] = reactExports.useState(false);
  const [copyFailed, setCopyFailed] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  const inviteUrl = inviteToken ? `${window.location.origin}/invite/${inviteToken}` : null;
  async function handleSubmit(e) {
    e.preventDefault();
    if (!actor) return;
    setError(null);
    setSubmitting(true);
    try {
      const token = await actor.createUser({
        name: name.trim(),
        email: email.trim()
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
    const ok = await copyToClipboard$1(inviteUrl);
    if (ok) {
      setCopied(true);
      setCopyFailed(false);
      setTimeout(() => setCopied(false), 2e3);
    } else {
      setCopyFailed(true);
      setTimeout(() => setCopyFailed(false), 3e3);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "user-name", className: "text-label", children: "Full Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "user-name",
              placeholder: "Jane Smith",
              value: name,
              onChange: (e) => setName(e.target.value),
              required: true,
              disabled: submitting,
              className: "bg-background border-border focus-visible:ring-ring/50",
              "data-ocid": "input-user-name"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "user-email", className: "text-label", children: "Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              id: "user-email",
              type: "email",
              placeholder: "jane@restaurant.com",
              value: email,
              onChange: (e) => setEmail(e.target.value),
              required: true,
              disabled: submitting,
              className: "bg-background border-border focus-visible:ring-ring/50",
              "data-ocid": "input-user-email"
            }
          )
        ] })
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", role: "alert", children: error }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "submit",
          disabled: submitting || !name.trim() || !email.trim(),
          className: "gap-2",
          "data-ocid": "btn-create-user",
          children: [
            submitting ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }),
            submitting ? "Creating…" : "Create User"
          ]
        }
      )
    ] }),
    inviteUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "rounded border border-border bg-muted/30 p-4 space-y-2",
        "data-ocid": "invite-url-box",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-label text-xs", children: "Invite URL generated" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "flex-1 min-w-0 text-xs text-foreground/80 font-mono bg-background border border-border rounded px-2 py-1.5 truncate", children: inviteUrl }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                onClick: handleCopy,
                className: "flex-shrink-0 gap-1.5 border-border",
                "aria-label": "Copy invite URL",
                "data-ocid": "btn-copy-invite-url",
                children: [
                  copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-secondary" }) : copyFailed ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 text-destructive" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" }),
                  copied ? "Copied!" : copyFailed ? "Failed" : "Copy"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Share this link with the user so they can accept their invitation." })
        ]
      }
    )
  ] });
}
async function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
    }
  }
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
function statusLabel(status, isActive) {
  if (!isActive) return "deactivated";
  if (status === "pending") return "pending";
  return "accepted";
}
function StatusBadge({ user }) {
  const label = statusLabel(user.inviteStatus, user.isActive);
  const variants = {
    pending: {
      className: "border-border text-muted-foreground bg-muted/30",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-3 h-3" })
    },
    accepted: {
      className: "border-secondary/40 text-secondary bg-secondary/10",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-3 h-3" })
    },
    deactivated: {
      className: "border-destructive/40 text-destructive bg-destructive/10",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "w-3 h-3" })
    }
  };
  const v = variants[label];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Badge,
    {
      variant: "outline",
      className: `gap-1 capitalize text-xs ${v.className}`,
      children: [
        v.icon,
        label
      ]
    }
  );
}
function CopyInviteButton({ token }) {
  const [copied, setCopied] = reactExports.useState(false);
  const [failed, setFailed] = reactExports.useState(false);
  const url = `${window.location.origin}/invite/${token}`;
  async function handleCopy() {
    const ok = await copyToClipboard(url);
    if (ok) {
      setCopied(true);
      setFailed(false);
      setTimeout(() => setCopied(false), 2e3);
    } else {
      setFailed(true);
      setTimeout(() => setFailed(false), 3e3);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      size: "sm",
      variant: "ghost",
      onClick: handleCopy,
      className: "gap-1.5 text-muted-foreground hover:text-foreground h-7 px-2",
      "aria-label": "Copy invite URL",
      "data-ocid": "btn-copy-invite",
      children: [
        copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-3.5 h-3.5 text-secondary" }) : failed ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 text-destructive" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: copied ? "Copied" : failed ? "Failed" : "Copy link" })
      ]
    }
  );
}
function UserRow({ user, onDeactivate }) {
  const [deactivating, setDeactivating] = reactExports.useState(false);
  async function handleDeactivate() {
    setDeactivating(true);
    try {
      await onDeactivate(user.id);
    } finally {
      setDeactivating(false);
    }
  }
  const initials = user.name.split(" ").slice(0, 2).map((w) => {
    var _a;
    return ((_a = w[0]) == null ? void 0 : _a.toUpperCase()) ?? "";
  }).join("");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-muted/10 transition-colors",
      "data-ocid": "user-list-row",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-primary", children: initials }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: user.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: user.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { user }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 flex-shrink-0", children: [
          user.isActive && user.inviteStatus === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx(CopyInviteButton, { token: user.inviteToken }),
          user.isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "gap-1.5 text-muted-foreground hover:text-destructive h-7 px-2",
                "aria-label": `Deactivate ${user.name}`,
                "data-ocid": "btn-deactivate-user",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldOff, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Deactivate" })
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { className: "bg-card border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { children: [
                  "Deactivate ",
                  user.name,
                  "?"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { className: "text-muted-foreground", children: "This will immediately revoke their access. They will not be able to log in or view any data until reactivated." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AlertDialogCancel,
                  {
                    className: "bg-background border-border hover:bg-muted/20",
                    "data-ocid": "btn-deactivate-cancel",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  AlertDialogAction,
                  {
                    onClick: handleDeactivate,
                    className: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                    disabled: deactivating,
                    "data-ocid": "btn-deactivate-confirm",
                    children: [
                      deactivating ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : null,
                      deactivating ? "Deactivating…" : "Yes, deactivate"
                    ]
                  }
                )
              ] })
            ] })
          ] })
        ] })
      ]
    }
  );
}
function UserList({ users, loading, onDeactivate }) {
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-px", "data-ocid": "user-list-loading", children: ["a", "b", "c"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-8 h-8 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-32" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-48" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-20 rounded-full" })
    ] }, k)) });
  }
  if (users.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-14 gap-2",
        "data-ocid": "user-list-empty",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "w-8 h-8 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No users yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60", children: "Create your first user above to get started." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "user-list", children: users.map((u) => /* @__PURE__ */ jsxRuntimeExports.jsx(UserRow, { user: u, onDeactivate }, String(u.id))) });
}
function AdminUsersPage() {
  const { actor, isFetching } = useBackend();
  const queryClient = useQueryClient();
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listUsers();
    },
    enabled: !!actor && !isFetching
  });
  async function handleDeactivate(id) {
    if (!actor) return;
    await actor.deactivateUser(id);
    await queryClient.invalidateQueries({ queryKey: ["users"] });
  }
  function handleCreated() {
    queryClient.invalidateQueries({ queryKey: ["users"] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-8 py-5 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded bg-primary/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-semibold text-foreground leading-tight", children: "User Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Create users and send invite links" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-8 space-y-8 max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "aria-labelledby": "create-user-heading", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border bg-muted/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              id: "create-user-heading",
              className: "text-sm font-semibold text-foreground",
              children: "Invite New User"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Enter their name and email to generate an invite link." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserForm, { onCreated: handleCreated }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "aria-labelledby": "user-list-heading", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4 border-b border-border bg-muted/20 flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              id: "user-list-heading",
              className: "text-sm font-semibold text-foreground",
              children: "All Users"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: isLoading ? "Loading…" : `${users.length} user${users.length !== 1 ? "s" : ""}` })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          UserList,
          {
            users,
            loading: isLoading,
            onDeactivate: handleDeactivate
          }
        )
      ] }) })
    ] })
  ] });
}
export {
  AdminUsersPage
};
