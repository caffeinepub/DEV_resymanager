import { c as createLucideIcon, r as reactExports, q as useComposedRefs, j as jsxRuntimeExports, d as cn, B as Button, e as useBackend, u as useQueryClient, i as useQuery } from "./index-DjUS783R.js";
import { u as useLayoutEffect2, a as useControllableState, P as Primitive, c as composeEventHandlers, e as createContextScope } from "./index-C8BGPssw.js";
import { L as LoaderCircle } from "./loader-circle-D-rZo_Yz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M20 7h-9", key: "3s1dr2" }],
  ["path", { d: "M14 17H5", key: "gfn3mx" }],
  ["circle", { cx: "17", cy: "17", r: "3", key: "18b49y" }],
  ["circle", { cx: "7", cy: "7", r: "3", key: "dfmy0x" }]
];
const Settings2 = createLucideIcon("settings-2", __iconNode);
function usePrevious(value) {
  const ref = reactExports.useRef({ value, previous: value });
  return reactExports.useMemo(() => {
    if (ref.current.value !== value) {
      ref.current.previous = ref.current.value;
      ref.current.value = value;
    }
    return ref.current.previous;
  }, [value]);
}
function useSize(element) {
  const [size, setSize] = reactExports.useState(void 0);
  useLayoutEffect2(() => {
    if (element) {
      setSize({ width: element.offsetWidth, height: element.offsetHeight });
      const resizeObserver = new ResizeObserver((entries) => {
        if (!Array.isArray(entries)) {
          return;
        }
        if (!entries.length) {
          return;
        }
        const entry = entries[0];
        let width;
        let height;
        if ("borderBoxSize" in entry) {
          const borderSizeEntry = entry["borderBoxSize"];
          const borderSize = Array.isArray(borderSizeEntry) ? borderSizeEntry[0] : borderSizeEntry;
          width = borderSize["inlineSize"];
          height = borderSize["blockSize"];
        } else {
          width = element.offsetWidth;
          height = element.offsetHeight;
        }
        setSize({ width, height });
      });
      resizeObserver.observe(element, { box: "border-box" });
      return () => resizeObserver.unobserve(element);
    } else {
      setSize(void 0);
    }
  }, [element]);
  return size;
}
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root = Switch$1;
var Thumb = SwitchThumb;
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
var DayOfWeek = /* @__PURE__ */ ((DayOfWeek2) => {
  DayOfWeek2["fri"] = "fri";
  DayOfWeek2["mon"] = "mon";
  DayOfWeek2["sat"] = "sat";
  DayOfWeek2["sun"] = "sun";
  DayOfWeek2["thu"] = "thu";
  DayOfWeek2["tue"] = "tue";
  DayOfWeek2["wed"] = "wed";
  return DayOfWeek2;
})(DayOfWeek || {});
const DAY_ORDER = [
  DayOfWeek.sun,
  DayOfWeek.mon,
  DayOfWeek.tue,
  DayOfWeek.wed,
  DayOfWeek.thu,
  DayOfWeek.fri,
  DayOfWeek.sat
];
const DAY_LABELS = {
  [DayOfWeek.sun]: "Sunday",
  [DayOfWeek.mon]: "Monday",
  [DayOfWeek.tue]: "Tuesday",
  [DayOfWeek.wed]: "Wednesday",
  [DayOfWeek.thu]: "Thursday",
  [DayOfWeek.fri]: "Friday",
  [DayOfWeek.sat]: "Saturday"
};
const DAY_ABBR = {
  [DayOfWeek.sun]: "Sun",
  [DayOfWeek.mon]: "Mon",
  [DayOfWeek.tue]: "Tue",
  [DayOfWeek.wed]: "Wed",
  [DayOfWeek.thu]: "Thu",
  [DayOfWeek.fri]: "Fri",
  [DayOfWeek.sat]: "Sat"
};
function minutesToTime(mins) {
  const m = Number(mins) % 1440;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${String(h).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}
function timeToMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return BigInt((h ?? 0) * 60 + (m ?? 0));
}
function formatDisplay(mins) {
  const total = Number(mins) % 1440;
  const h = Math.floor(total / 60);
  const m = total % 60;
  const suffix = h < 12 ? "AM" : "PM";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}
function buildDefault() {
  const defaults = {};
  for (const day of DAY_ORDER) {
    defaults[day] = { isOpen: false, openTime: "11:00", closeTime: "22:00" };
  }
  return defaults;
}
function OpenHoursForm({ initialHours, onSave }) {
  const [days, setDays] = reactExports.useState(buildDefault);
  const [savingDay, setSavingDay] = reactExports.useState(null);
  const [savedDay, setSavedDay] = reactExports.useState(null);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!initialHours.length) return;
    setDays((prev) => {
      const next = { ...prev };
      for (const dh of initialHours) {
        next[dh.day] = {
          isOpen: dh.isOpen,
          openTime: minutesToTime(dh.openTime),
          closeTime: minutesToTime(dh.closeTime)
        };
      }
      return next;
    });
  }, [initialHours]);
  function updateDay(day, patch) {
    setDays((prev) => ({ ...prev, [day]: { ...prev[day], ...patch } }));
  }
  async function handleSave(day) {
    const state = days[day];
    setError(null);
    setSavingDay(day);
    try {
      await onSave({
        day,
        isOpen: state.isOpen,
        openTime: timeToMinutes(state.openTime),
        closeTime: timeToMinutes(state.closeTime)
      });
      setSavedDay(day);
      setTimeout(() => setSavedDay(null), 2e3);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSavingDay(null);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", "data-ocid": "open-hours-form", children: [
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive px-1 pb-2", role: "alert", children: error }),
    DAY_ORDER.map((day) => {
      const state = days[day];
      const isSaving = savingDay === day;
      const isSaved = savedDay === day;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-4 px-4 py-3 rounded border border-border bg-card/50 hover:bg-card transition-colors",
          "data-ocid": `open-hours-row-${day}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 w-36 flex-shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  id: `switch-${day}`,
                  checked: state.isOpen,
                  onCheckedChange: (v) => updateDay(day, { isOpen: v }),
                  "aria-label": `Toggle ${DAY_LABELS[day]}`,
                  "data-ocid": `switch-${day}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  htmlFor: `switch-${day}`,
                  className: "text-sm font-medium cursor-pointer select-none",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: DAY_LABELS[day] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: DAY_ABBR[day] })
                  ]
                }
              )
            ] }),
            state.isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-9 text-right flex-shrink-0", children: "Open" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "time",
                    value: state.openTime,
                    onChange: (e) => updateDay(day, { openTime: e.target.value }),
                    className: "input-field w-28 text-sm tabular-nums",
                    "aria-label": `${DAY_LABELS[day]} open time`,
                    "data-ocid": `input-open-${day}`
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs flex-shrink-0", children: "—" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground w-9 text-right flex-shrink-0", children: "Close" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "time",
                    value: state.closeTime,
                    onChange: (e) => updateDay(day, { closeTime: e.target.value }),
                    className: "input-field w-28 text-sm tabular-nums",
                    "aria-label": `${DAY_LABELS[day]} close time`,
                    "data-ocid": `input-close-${day}`
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground hidden lg:block", children: [
                "(",
                formatDisplay(timeToMinutes(state.openTime)),
                " –",
                " ",
                formatDisplay(timeToMinutes(state.closeTime)),
                ")"
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground/50 italic", children: "Closed" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                variant: isSaved ? "outline" : "default",
                onClick: () => handleSave(day),
                disabled: isSaving,
                className: `flex-shrink-0 gap-1.5 h-7 px-3 text-xs ${isSaved ? "border-secondary/40 text-secondary" : ""}`,
                "aria-label": `Save ${DAY_LABELS[day]}`,
                "data-ocid": `btn-save-${day}`,
                children: [
                  isSaving ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-3 h-3" }),
                  isSaving ? "Saving…" : isSaved ? "Saved!" : "Save"
                ]
              }
            )
          ]
        },
        day
      );
    })
  ] });
}
function AdminSettingsPage() {
  const { actor, isFetching } = useBackend();
  const queryClient = useQueryClient();
  const { data: openHours = [], isLoading } = useQuery({
    queryKey: ["openHours"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllOpenHours();
    },
    enabled: !!actor && !isFetching
  });
  async function handleSave(hours) {
    if (!actor) return;
    await actor.setDayHours(hours);
    await queryClient.invalidateQueries({ queryKey: ["openHours"] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border px-8 py-5 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded bg-primary/15 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings2, { className: "w-4 h-4 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-lg font-semibold text-foreground leading-tight", children: "Restaurant Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Configure open hours for each day of the week" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-8 max-w-3xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { "aria-labelledby": "open-hours-heading", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-b border-border bg-muted/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "h2",
            {
              id: "open-hours-heading",
              className: "text-sm font-semibold text-foreground",
              children: "Opening Hours"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Set which days you're open and the open/close times. Save each day individually." })
        ] }),
        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(OpenHoursForm, { initialHours: openHours, onSave: handleSave }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 rounded border border-border bg-muted/20 px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground/70", children: "Note:" }),
        " Close times past midnight (e.g. 2:00 AM) belong to the same service day as the open time. The reservation list will correctly show the previous calendar day's entries during late-night hours."
      ] }) })
    ] })
  ] });
}
export {
  AdminSettingsPage
};
