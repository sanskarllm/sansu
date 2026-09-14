import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Badge } from "./badge-CJx1Xd8C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trust-panel-Dnir52FK.js
var import_jsx_runtime = require_jsx_runtime();
var tone = {
	Demo: "muted",
	Sandbox: "primary",
	Pilot: "ink",
	Production: "ok"
};
function TrustPanel({ result }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "rounded-lg border border-border bg-surface/70 p-3 text-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: tone[result.badge],
						children: result.badge
					}),
					result.synthetic ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "warn",
						children: "Synthetic data"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums text-muted",
						children: [
							"Confidence ",
							Math.round(result.confidence * 100),
							"%"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-subtle",
						children: ["via ", result.engine]
					})
				]
			}),
			result.fallbackReason ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-warn",
				children: result.fallbackReason
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs font-medium tracking-wide text-subtle uppercase",
						children: "Sources"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 text-muted",
						children: result.sources.join(" · ")
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs font-medium tracking-wide text-subtle uppercase",
						children: "Data used"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "mt-1 text-muted",
						children: result.dataUsed.join(" · ")
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs font-medium tracking-wide text-subtle uppercase",
							children: "Assumptions"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 text-muted",
							children: result.assumptions.join(" ")
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { TrustPanel as t };
