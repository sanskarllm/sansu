import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as AGENTS } from "./catalog-tDitttoK.mjs";
import { s as useMill, v as Button } from "./router-DNb1iX95.mjs";
import { t as Badge } from "./badge-CJx1Xd8C.mjs";
import { t as Input } from "./input-C_hR21Aa.mjs";
import { t as Label } from "./label-B-UaSL1m.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/workspace-DGOMHjqR.js
var import_jsx_runtime = require_jsx_runtime();
var SEED_AUDIT = [
	{
		id: "a1",
		at: "this morning",
		actor: "Quotation",
		action: "Drafted quote KW-4521",
		detail: "Held for owner"
	},
	{
		id: "a2",
		at: "this morning",
		actor: "Owner",
		action: "Approved quote KW-4521",
		detail: "Not yet sent"
	},
	{
		id: "a3",
		at: "yesterday",
		actor: "Sample Tracking",
		action: "Flagged Zara peach shade 2",
		detail: "Dyeing Friday"
	}
];
var OPPORTUNITIES = [
	"H&M stripe shirting — no quote on file after verbal interest",
	"Yarn 60s compact unbooked for KW-901",
	"COO for Nordic Home Hamburg not in the pack"
];
function Workspace() {
	const { millName, setMillName, audit, customAgent, lead, events } = useMill();
	const mill = millName || "Khanna Weaves Pvt. Ltd.";
	const log = audit.length ? audit : SEED_AUDIT;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl tracking-tight",
						children: mill
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "primary",
						children: "Sandbox"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted",
					children: "Agents, approvals, audit. Not production. No password — this mill lives on this device."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "millws",
						children: "Mill name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "millws",
						className: "mt-1",
						value: millName,
						onChange: (e) => setMillName(e.target.value),
						placeholder: "Your mill"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "mt-6 rounded-lg border border-primary/30 bg-primary/10 p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "3 new AI opportunities found"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 list-disc space-y-1 pl-4 text-sm text-muted",
					children: OPPORTUNITIES.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: o }, o))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 grid gap-4 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-bg-elevated p-4 lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium",
						children: "Agents on the desk"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 divide-y divide-border",
						children: [customAgent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: customAgent.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: customAgent.role
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "primary",
								children: "Yours"
							})]
						}) : null, AGENTS.filter((a) => a.set === "textile").slice(0, 3).map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: a.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: a.mission
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								variant: "outline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/workforce/$id",
									params: { id: a.id },
									children: "Open"
								})
							})]
						}, a.id))]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-bg-elevated p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium",
						children: "Waiting on you"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 space-y-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-md border border-border bg-surface p-3",
							children: ["Nordic Home navy poplin quote", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									size: "sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/approval",
										children: "Approve"
									})
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-md border border-border bg-surface p-3",
							children: "Zara peach chase — edit or send"
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4 grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-bg-elevated p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium",
						children: "Audit log"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2 text-sm",
						children: log.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between gap-3 border-b border-border py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [e.actor, " · "]
							}), e.action] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-subtle whitespace-nowrap",
								children: e.at.replace("T", " ").slice(0, 16)
							})]
						}, e.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-bg-elevated p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-medium",
							children: "Results & leads"
						}),
						lead ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm",
							children: [
								"Last handoff: ",
								lead.name,
								" · ",
								lead.channel,
								" · ",
								lead.mill
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: "No plan sent yet."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 max-h-48 space-y-1 overflow-auto text-xs text-subtle",
							children: events.slice(0, 8).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								e.step,
								" · ",
								e.detail
							] }, e.at + e.step))
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { Workspace as component };
