import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent$1, s as DialogTrigger$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { a as DESK, d as deskUsd, p as problemById } from "./catalog-tDitttoK.mjs";
import { t as X } from "../_libs/lucide-react.mjs";
import { S as rupees, b as dollars, c as valueOf, s as useMill, v as Button, y as cn } from "./router-DNb1iX95.mjs";
import { t as Badge } from "./badge-CJx1Xd8C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/plan-view-BYZ7P6V5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
var DialogTrigger = DialogTrigger$1;
function DialogContent({ className, children, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 w-[min(100%-1.5rem,40rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border bg-bg-elevated p-5 shadow-[var(--shadow-border-hover)]", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-start justify-between gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "font-display text-2xl tracking-tight",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
				className: "rounded-md p-2 text-muted hover:bg-surface hover:text-fg",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Close"
				})]
			})]
		}), children]
	})] });
}
function PlanView() {
	const { result, estimate, millName } = useMill();
	const [it, setIt] = (0, import_react.useState)(false);
	if (!result) return null;
	const v = valueOf(estimate);
	const problem = problemById(result.problemId);
	const mill = millName || "Your mill";
	const sandbox = deskUsd(1);
	const live = deskUsd(3);
	const week = deskUsd(1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-xl border border-border bg-bg-elevated p-5 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-wide text-subtle uppercase",
					children: "One-page AI plan"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl tracking-tight",
					children: mill
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: "warn",
					children: "Illustrative"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid gap-5 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						k: "Problem",
						v: problem.label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						k: "What AI does",
						v: result.summary
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						k: "What you approve",
						v: "Every outbound quote, chase, and filing. AI drafts. You send."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						k: "Estimate",
						v: `${rupees(v.annual)} / year in desk time. Payback ~${v.paybackDays} days. Hours released ${Math.round(v.hoursYear)}.`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						k: "Timeline",
						v: "Week 1 sandbox on your RFQs. Week 3–4 owner approval live. 90 days to a measured pilot."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
						k: "Price range",
						wide: true,
						v: `${dollars(DESK.usdPerHour)} / hour · ${DESK.hoursPerDay} hours / day · ${DESK.daysPerWeek} days / week. Sandbox week ${dollars(sandbox)}. Three weeks to live approval ${dollars(live)}. Then ${dollars(week)} / week if we stay on the desk.`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
					open: it,
					onOpenChange: setIt,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "link",
							children: "For your IT team"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
						title: "Technical architecture",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "list-disc space-y-2 pl-4 text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "PrivacyByAI: offline LLM on mill hardware, hybrid, or a no-train cloud path you sign." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Rules engine first (constructions, incoterms, yarn sheets). LLM only when fields are thin." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Keys stay server-side. Browser never sees them." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Uploaded files are read as text here. Bytes are not sent to a provider that trains on data." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Autonomy stops at “act with approval” unless you raise it." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Badges: Demo, Sandbox, Pilot, Production. This page is Sandbox or Demo." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Audit log of extracts, drafts, and approvals. Mill can export or wipe." })
							]
						})
					})]
				})
			})
		]
	});
}
function Block({ k, v, wide }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: wide ? "sm:col-span-2" : void 0,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-xs font-medium tracking-wide text-subtle uppercase",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "mt-1 text-sm",
			children: v
		})]
	});
}
//#endregion
export { PlanView as t };
