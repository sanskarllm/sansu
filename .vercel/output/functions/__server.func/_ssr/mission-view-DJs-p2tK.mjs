import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { c as Circle, l as Check, o as LoaderCircle } from "../_libs/lucide-react.mjs";
import { y as cn } from "./router-DNb1iX95.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mission-view-DJs-p2tK.js
var import_jsx_runtime = require_jsx_runtime();
function looksLikeMoney(v) {
	return /^₹/.test(v);
}
function Artifacts({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-4",
		children: items.map((a, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-lg border border-border bg-bg-elevated p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mb-3 text-sm font-medium",
					children: a.title
				}),
				a.type === "quote" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "divide-y divide-border",
					children: a.rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between gap-4 py-1.5 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted",
							children: r.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: looksLikeMoney(r.value) ? "tabular-nums font-medium" : "text-right",
							children: r.value
						})]
					}, r.label))
				}) : null,
				a.type === "quote" && a.notes.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 list-disc space-y-1 pl-4 text-xs text-muted",
					children: a.notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: n }, n))
				}) : null,
				a.type === "table" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
							className: "border-b border-border text-xs tracking-wide text-subtle uppercase",
							children: a.columns.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-2 py-1.5 font-medium",
								children: c
							}, c))
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: a.rows.map((row, ri) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
							className: "border-b border-border/70",
							children: row.map((cell, ci) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "px-2 py-1.5 whitespace-nowrap",
								children: cell
							}, ci))
						}, ri)) })]
					})
				}) : null,
				a.type === "draft" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
					className: "overflow-x-auto whitespace-pre-wrap font-sans text-sm text-fg",
					children: a.body
				}) : null,
				a.type === "missing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "list-disc space-y-1 pl-4 text-sm text-muted",
					children: a.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
				}) : null
			]
		}, `${a.type}-${i}`))
	});
}
function MissionView({ steps, onPick, activeId }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "space-y-1",
		children: steps.map((s) => {
			const running = s.status === "running";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onPick?.(s),
				className: cn("flex w-full items-start gap-3 rounded-md px-2 py-2 text-left hover:bg-surface", activeId === s.id && "bg-surface"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 text-primary",
						children: s.status === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "size-4 text-subtle" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("block text-sm", running && "shimmer text-muted"),
							children: running ? s.label.replace(/\.$/, "") + "…" : s.status === "done" ? `✓ ${s.label}` : s.label
						}), s.output ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate text-xs text-muted",
							children: s.output
						}) : null]
					}),
					typeof s.confidence === "number" && s.status === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums text-xs text-subtle",
						children: [Math.round(s.confidence * 100), "%"]
					}) : null
				]
			}) }, s.id);
		})
	});
}
function MissionDetail({ step }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-border bg-bg-elevated p-3 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-medium",
			children: step.label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
			className: "mt-2 space-y-1 text-muted",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-subtle",
					children: "Input · "
				}), step.input || "This step’s source text"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-subtle",
					children: "Output · "
				}), step.output || "—"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-subtle",
					children: "Source · "
				}), step.source || "—"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-subtle",
					children: "Confidence · "
				}), typeof step.confidence === "number" ? `${Math.round(step.confidence * 100)}%` : "—"] })
			]
		})]
	});
}
//#endregion
export { MissionDetail as n, MissionView as r, Artifacts as t };
