import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as AUTONOMY_COPY } from "./catalog-tDitttoK.mjs";
import { s as useMill, v as Button, y as cn } from "./router-DNb1iX95.mjs";
import { t as Textarea } from "./textarea-Ccs5ZCLa.mjs";
import { t as Badge } from "./badge-CJx1Xd8C.mjs";
import { t as Input } from "./input-C_hR21Aa.mjs";
import { t as Label } from "./label-B-UaSL1m.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/builder-CJRQiw3I.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ROLES = [
	"Quotation desk",
	"Sample desk",
	"Export docs",
	"Yarn store",
	"Quality"
];
var TOOLS = [
	"Inbox",
	"WhatsApp export",
	"Price card",
	"Stock sheet",
	"Courier AWB",
	"GST / IEC"
];
var KNOWLEDGE = [
	"Construction cards",
	"Won/lost quotes",
	"Buyer list",
	"Lab-dip library",
	"CHA checklist"
];
var LEVELS = Object.keys(AUTONOMY_COPY);
function Builder() {
	const setCustom = useMill((s) => s.setCustomAgent);
	const [name, setName] = (0, import_react.useState)("Night quote desk");
	const [role, setRole] = (0, import_react.useState)(ROLES[0]);
	const [brief, setBrief] = (0, import_react.useState)("Draft quotes after 7pm from the shared inbox. Never send.");
	const [tools, setTools] = (0, import_react.useState)(["Inbox", "Price card"]);
	const [knowledge, setKnowledge] = (0, import_react.useState)(["Construction cards"]);
	const [autonomy, setAutonomy] = (0, import_react.useState)("approve");
	const agent = (0, import_react.useMemo)(() => ({
		name,
		role,
		knowledge,
		tools,
		autonomy
	}), [
		name,
		role,
		knowledge,
		tools,
		autonomy
	]);
	function toggle(list, set, item) {
		set(list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-tight",
				children: "Agent builder"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-muted",
				children: "Role, knowledge, tools, one of four autonomy levels. Humans stay in the fence you draw."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-6",
					onSubmit: (e) => {
						e.preventDefault();
						setCustom(agent);
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "an",
							children: "Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "an",
							className: "mt-1",
							value: name,
							onChange: (e) => setName(e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Role" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: ROLES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setRole(r),
								className: cn("min-h-11 rounded-full border px-3 text-sm", role === r ? "border-primary bg-primary text-primary-fg" : "border-border"),
								children: r
							}, r))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "brief",
							children: "What it is for"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "brief",
							className: "mt-1 min-h-24",
							value: brief,
							onChange: (e) => setBrief(e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chipset, {
							label: "Knowledge",
							items: KNOWLEDGE,
							on: knowledge,
							onToggle: (i) => toggle(knowledge, setKnowledge, i)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chipset, {
							label: "Tools",
							items: TOOLS,
							on: tools,
							onToggle: (i) => toggle(tools, setTools, i)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Autonomy" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 grid gap-2 sm:grid-cols-2",
							children: LEVELS.map((lv) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setAutonomy(lv),
								className: cn("h-full w-full rounded-lg border p-3 text-left", autonomy === lv ? "border-primary bg-primary/10" : "border-border bg-bg-elevated"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: AUTONOMY_COPY[lv].label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted",
									children: AUTONOMY_COPY[lv].line
								})]
							}) }, lv))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							children: "Save to workspace"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "h-fit rounded-xl border border-border bg-bg-elevated p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-wide text-subtle uppercase",
							children: "Preview"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display mt-1 text-2xl",
							children: name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: brief
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: "primary",
								children: AUTONOMY_COPY[autonomy].label
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-muted",
							children: [
								role,
								...knowledge,
								...tools
							].join(" · ")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							className: "mt-6 w-full",
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/approval",
								children: "Watch it work"
							})
						})
					]
				})]
			})
		]
	});
}
function Chipset({ label, items, on, onToggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-2 flex flex-wrap gap-2",
		children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onToggle(i),
			className: cn("min-h-11 rounded-full border px-3 text-sm", on.includes(i) ? "border-ink bg-ink text-bg-elevated" : "border-border"),
			children: i
		}, i))
	})] });
}
//#endregion
export { Builder as component };
