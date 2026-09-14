import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as AUTONOMY_COPY, t as AGENTS } from "./catalog-tDitttoK.mjs";
import { n as Route, v as Button } from "./router-DNb1iX95.mjs";
import { t as Badge } from "./badge-CJx1Xd8C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/workforce._id-CfdPMoOa.js
var import_jsx_runtime = require_jsx_runtime();
function AgentPage() {
	const { id } = Route.useParams();
	const agent = AGENTS.find((a) => a.id === id) ?? AGENTS[0];
	const auto = AUTONOMY_COPY[agent.autonomy];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/workforce",
						className: "hover:text-fg",
						children: "Workforce"
					}),
					" ",
					"/ ",
					agent.set
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-2 text-4xl tracking-tight",
				children: agent.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-lg text-muted",
				children: agent.mission
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: "primary",
					children: auto.label
				}), agent.tools.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: t }, t))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 rounded-xl border border-border bg-bg-elevated p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium",
						children: "KPIs"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 list-disc space-y-1 pl-4 text-sm text-muted",
						children: agent.kpis.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: k }, k))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-muted",
						children: auto.line
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: agent.watchPath,
						children: "Watch it work"
					})
				})
			})
		]
	});
}
//#endregion
export { AgentPage as component };
