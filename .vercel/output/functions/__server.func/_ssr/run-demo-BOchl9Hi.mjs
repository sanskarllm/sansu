import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as labelledSample } from "./engine-B4J-WBhn.mjs";
import { s as useMill, v as Button } from "./router-DNb1iX95.mjs";
import { t as Badge } from "./badge-CJx1Xd8C.mjs";
import { t as processWork } from "./ai-BEUTEn73.mjs";
import { n as MissionDetail, r as MissionView, t as Artifacts } from "./mission-view-DJs-p2tK.mjs";
import { t as TrustPanel } from "./trust-panel-Dnir52FK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/run-demo-BOchl9Hi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RunDemo({ input, inputLabel, auto = false }) {
	const setResultStore = useMill((s) => s.setResult);
	const track = useMill((s) => s.track);
	const [result, setResult] = (0, import_react.useState)(null);
	const [mission, setMission] = (0, import_react.useState)([]);
	const [active, setActive] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [started, setStarted] = (0, import_react.useState)(false);
	const autoOnce = (0, import_react.useRef)(false);
	async function run() {
		setBusy(true);
		setError(null);
		setStarted(true);
		setResult(null);
		track("demo", input.problemId);
		setMission([
			{
				id: "s1",
				label: "Reading the document",
				status: "running"
			},
			{
				id: "s2",
				label: "Extracting fields",
				status: "pending"
			},
			{
				id: "s3",
				label: "Drafting the output",
				status: "pending"
			},
			{
				id: "s4",
				label: "Attaching sources",
				status: "pending"
			}
		]);
		const tick = window.setInterval(() => {
			setMission((prev) => {
				const i = prev.findIndex((s) => s.status === "running");
				if (i < 0) return prev;
				return prev.map((s, idx) => {
					if (idx === i) return {
						...s,
						status: "done"
					};
					if (idx === i + 1) return {
						...s,
						status: "running"
					};
					return s;
				});
			});
		}, 700);
		try {
			let next;
			try {
				next = await processWork({ data: input });
			} catch {
				next = {
					...labelledSample(input.problemId),
					fallbackReason: "The live run failed. Labelled sample of the same job."
				};
			}
			window.clearInterval(tick);
			setResult(next);
			setResultStore(next);
			setMission(next.mission);
			setActive(next.mission[0] ?? null);
		} catch (e) {
			window.clearInterval(tick);
			setError("Could not finish that run.");
		} finally {
			setBusy(false);
		}
	}
	(0, import_react.useEffect)(() => {
		if (auto && !autoOnce.current) {
			autoOnce.current = true;
			run();
		}
	}, [auto]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-lg border border-border bg-bg-elevated p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-wide text-subtle uppercase",
							children: inputLabel
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							onClick: () => void run(),
							disabled: busy,
							children: busy ? "Reading the work" : result ? "Run again" : "Run it"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
						className: "max-h-56 overflow-auto whitespace-pre-wrap font-sans text-sm text-muted",
						children: input.text
					})]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2 rounded-md border border-warn/30 bg-warn/10 p-3 text-sm text-warn",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "flex-1",
							children: error
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							variant: "outline",
							onClick: () => void run(),
							children: "Retry"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "sm",
							onClick: () => {
								const sample = labelledSample(input.problemId);
								setResult(sample);
								setMission(sample.mission);
							},
							children: "Continue with a sample"
						})
					]
				}) : null,
				result ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl tracking-tight",
							children: result.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "muted",
							children: "Evidence"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-4 text-sm text-muted",
						children: result.summary
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "mb-4 grid gap-2 sm:grid-cols-2",
						children: result.fields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md border border-border bg-surface px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-subtle",
								children: f.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-sm",
								children: f.value
							})]
						}, f.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Artifacts, { items: result.artifacts })
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustPanel, { result })] }) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "rounded-xl border border-border bg-bg-elevated p-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs font-medium tracking-wide text-subtle uppercase",
				children: "Mission"
			}), mission.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Run it. You’ll see each step, not a blank wait."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionView, {
				steps: mission,
				activeId: active?.id,
				onPick: setActive
			}), active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionDetail, { step: active })
			}) : null] })]
		})]
	});
}
//#endregion
export { RunDemo as t };
