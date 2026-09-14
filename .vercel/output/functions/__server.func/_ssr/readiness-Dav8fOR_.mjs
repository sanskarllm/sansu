import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as READINESS_QUESTIONS } from "./catalog-tDitttoK.mjs";
import { s as useMill, v as Button, y as cn } from "./router-DNb1iX95.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/readiness-Dav8fOR_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Readiness() {
	const track = useMill((s) => s.track);
	const [answers, setAnswers] = (0, import_react.useState)({});
	const score = (0, import_react.useMemo)(() => {
		const vals = Object.values(answers);
		if (vals.length < READINESS_QUESTIONS.length) return null;
		const raw = vals.reduce((a, b) => a + b, 0);
		const max = READINESS_QUESTIONS.length * 3;
		return Math.round(raw / max * 100);
	}, [answers]);
	const roadmap = score == null ? [] : score >= 75 ? [
		{
			d: "30 days",
			t: "Sandbox on live RFQs. Owner approval on every send."
		},
		{
			d: "60 days",
			t: "Add sample desk and export docs. Measure cycle time."
		},
		{
			d: "90 days",
			t: "Pilot KPIs vs the last quarter. Decide production."
		}
	] : score >= 50 ? [
		{
			d: "30 days",
			t: "Put quotes in one sheet. Name who approves."
		},
		{
			d: "60 days",
			t: "Sandbox on a single buyer inbox."
		},
		{
			d: "90 days",
			t: "Add yarn position. Still no silent sends."
		}
	] : [
		{
			d: "30 days",
			t: "Pick a system of record that is not WhatsApp."
		},
		{
			d: "60 days",
			t: "Write down constructions you actually run."
		},
		{
			d: "90 days",
			t: "First labelled demo on a real RFQ, owner in the room."
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-tight",
				children: "AI-readiness check"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: "Six questions. A score. A 90-day roadmap. No sales call."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-8 space-y-8",
				children: READINESS_QUESTIONS.map((q, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-medium",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-mono text-xs text-subtle",
						children: [String(i + 1).padStart(2, "0"), " · "]
					}), q.prompt]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid gap-2",
					children: q.options.map((o) => {
						const on = answers[q.id] === o.score;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setAnswers((a) => ({
								...a,
								[q.id]: o.score
							})),
							className: cn("rounded-md border px-3 py-3 text-left text-sm min-h-11", on ? "border-primary bg-primary/10" : "border-border bg-bg-elevated"),
							children: o.label
						}, o.id);
					})
				})] }, q.id))
			}),
			score != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 rounded-xl border border-border bg-bg-elevated p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs tracking-wide text-subtle uppercase",
						children: "Score"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display mt-1 text-5xl tabular-nums tracking-tight",
						children: score
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-3",
						children: roadmap.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-subtle",
							children: r.d
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: r.t
						})] }, r.d))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								onClick: () => track("readiness", String(score)),
								children: "Run a problem"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/run",
								search: { step: "handoff" },
								children: "Send this roadmap"
							})
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-sm text-subtle",
				children: "Answer all six to see the roadmap."
			})
		]
	});
}
//#endregion
export { Readiness as component };
