import { c as createLucideIcon, x as useParams, y as useInternetIdentity, e as useBackend, u as useQueryClient, r as reactExports, j as jsxRuntimeExports, z as UtensilsCrossed, B as Button, L as LogIn } from "./index-DjUS783R.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
function InvitePage() {
  const { token } = useParams({ strict: false });
  const { identity, login } = useInternetIdentity();
  const { actor } = useBackend();
  const queryClient = useQueryClient();
  const [status, setStatus] = reactExports.useState("idle");
  const [errorMsg, setErrorMsg] = reactExports.useState("");
  const isLoggedIn = identity != null;
  async function handleAccept() {
    if (!actor || !token) return;
    setStatus("accepting");
    try {
      await actor.acceptInvite(token);
      await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      setStatus("success");
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : "Failed to accept invitation."
      );
      setStatus("error");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-sm w-full space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 bg-primary rounded-xl flex items-center justify-center mx-auto shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UtensilsCrossed, { className: "w-8 h-8 text-primary-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold text-foreground tracking-tight", children: "ReserveDesk" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-elevated p-6 space-y-5", children: status === "success" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-10 h-10 text-secondary mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground", children: "Invitation accepted!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Your account is now active. You can close this page and navigate to the app." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "w-full",
          onClick: () => {
            window.location.href = "/";
          },
          children: "Go to app"
        }
      )
    ] }) : status === "error" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-10 h-10 text-destructive mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground", children: "Something went wrong" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: errorMsg }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          className: "w-full",
          onClick: () => setStatus("idle"),
          children: "Try again"
        }
      )
    ] }) : !isLoggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground", children: "You're invited!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Sign in with Internet Identity to accept your invitation and activate your account." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          className: "w-full",
          onClick: login,
          "data-ocid": "btn-invite-login",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4 mr-2" }),
            "Sign in to accept"
          ]
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-base font-semibold text-foreground", children: "Accept invitation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Click below to link your identity and activate your account." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "w-full",
          onClick: handleAccept,
          disabled: status === "accepting",
          "data-ocid": "btn-accept-invite",
          children: status === "accepting" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin mr-2" }),
            "Accepting…"
          ] }) : "Accept invitation"
        }
      )
    ] }) })
  ] }) });
}
export {
  InvitePage
};
