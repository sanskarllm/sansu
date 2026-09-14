import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as problemById, r as CASES } from "./catalog-tDitttoK.mjs";
import { t as labelledSample } from "./engine-B4J-WBhn.mjs";
import { s as useMill, v as Button } from "./router-DNb1iX95.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cases-DPiGtAih.js
var import_jsx_runtime = require_jsx_runtime();
function Cases() {
	const { setInput, setResult, setStep } = useMill();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-primary",
				children: "Trust & proof"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-2 text-4xl tracking-tight",
				children: "Interactive case studies"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-muted",
				children: "Before, after, evidence. Run it on the same kind of work. Then take the readiness check."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-8 grid gap-4 lg:grid-cols-3",
				children: CASES.map((c) => {
					const problem = problemById(c.runId);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						id: c.id,
						className: "flex flex-col rounded-xl border border-border bg-bg-elevated p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-subtle",
								children: [
									c.mill,
									" · ",
									c.place
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display mt-2 text-2xl tracking-tight",
								children: c.problem
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-4 space-y-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-subtle",
										children: "Before"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: c.before })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-subtle",
										children: "After"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: c.after })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-subtle",
										children: "Evidence"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "text-muted",
										children: c.evidence
									})] })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-auto pt-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									className: "w-full",
									onClick: () => {
										setInput({
											mode: "chip",
											problemId: c.runId,
											text: problem.sample
										});
										setResult(labelledSample(c.runId));
										setStep("result");
									},
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/run",
										search: { step: "result" },
										children: "Run it"
									})
								})
							})
						]
					}, c.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/readiness",
					className: "text-primary",
					children: "AI-readiness check — six questions, a 90-day roadmap"
				})
			})
		]
	});
}
//#endregion
export { Cases as component };
