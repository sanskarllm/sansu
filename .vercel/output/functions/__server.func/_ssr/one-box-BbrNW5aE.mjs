import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as PROBLEMS } from "./catalog-tDitttoK.mjs";
import { t as labelledSample } from "./engine-B4J-WBhn.mjs";
import { i as Paperclip, s as Globe, u as ArrowRight } from "../_libs/lucide-react.mjs";
import { s as useMill, v as Button, y as cn } from "./router-DNb1iX95.mjs";
import { t as Textarea } from "./textarea-Ccs5ZCLa.mjs";
import { t as Input } from "./input-C_hR21Aa.mjs";
import { t as processWork } from "./ai-BEUTEn73.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/one-box-BbrNW5aE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function OneBox({ compact = false }) {
	const nav = useNavigate();
	const { input, setInput, setResult, setStep, track } = useMill();
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const fileRef = (0, import_react.useRef)(null);
	function chooseChip(id) {
		const p = PROBLEMS.find((x) => x.id === id);
		if (!p) return;
		setInput({
			mode: "chip",
			problemId: id,
			text: p.sample,
			fileName: void 0,
			website: void 0
		});
		setError(null);
	}
	function setMode(mode) {
		setInput({ mode });
		setError(null);
	}
	async function onFile(file) {
		if (!(/text|csv|json|plain|message/.test(file.type) || /\.(txt|csv|eml|json|md)$/i.test(file.name))) {
			setError("That file type isn’t readable here. Retry with .txt / .csv, or continue with a sample RFQ.");
			setInput({
				mode: "file",
				fileName: file.name,
				text: ""
			});
			return;
		}
		const text = (await file.text()).slice(0, 4e3);
		setInput({
			mode: "file",
			fileName: file.name,
			text
		});
		setError(null);
	}
	async function run(manualSample = false) {
		setBusy(true);
		setError(null);
		track("input", manualSample ? "continue-sample" : input.mode);
		try {
			const payload = manualSample ? {
				mode: "chip",
				problemId: input.problemId || "rfq-email",
				text: ""
			} : input;
			let result;
			try {
				result = await processWork({ data: payload });
			} catch {
				result = labelledSample(payload.problemId);
				result = {
					...result,
					fallbackReason: "The live run failed. This is a labelled sample of the same job."
				};
			}
			setResult(result);
			setStep("result");
			nav({ to: "/run" });
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-bg-elevated p-3 shadow-[var(--shadow-border)]",
		children: [
			!compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3 flex flex-wrap gap-2",
				children: PROBLEMS.map((p) => {
					const on = input.problemId === p.id && input.mode === "chip";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => chooseChip(p.id),
						className: cn("min-h-11 rounded-full border px-3 text-sm", on ? "border-primary bg-primary text-primary-fg" : "border-border bg-surface text-fg hover:border-primary/40"),
						children: p.label
					}, p.id);
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-2 flex flex-wrap gap-1",
				children: [
					["email", "Paste email"],
					["file", "Upload file"],
					["website", "Enter website"]
				].map(([mode, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setMode(mode),
					className: cn("rounded-md px-2 py-1 text-xs", input.mode === mode ? "bg-ink text-bg-elevated" : "text-muted hover:bg-surface"),
					children: label
				}, mode))
			}),
			input.mode === "website" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "pointer-events-none absolute top-3 left-3 size-4 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					className: "pl-9",
					placeholder: "https://yourmill.in",
					value: input.website ?? "",
					onChange: (e) => setInput({
						website: e.target.value,
						text: e.target.value,
						mode: "website"
					})
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				value: input.text,
				onChange: (e) => setInput({
					text: e.target.value,
					mode: input.mode === "chip" ? "email" : input.mode
				}),
				placeholder: "Paste a buyer email, or pick a problem above.",
				className: "min-h-40"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						accept: ".txt,.csv,.eml,.json,.md,text/plain",
						className: "hidden",
						onChange: (e) => {
							const f = e.target.files?.[0];
							if (f) onFile(f);
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: () => fileRef.current?.click(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "size-4" }), input.fileName || "Attach"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex-1 text-xs text-subtle",
						children: busy ? "Reading the work…" : "About 30 seconds. No sales call."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						onClick: () => void run(false),
						disabled: busy,
						children: [busy ? "Working" : "See it work", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})
				]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap items-center gap-2 rounded-md border border-warn/30 bg-warn/10 p-3 text-sm text-warn",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "flex-1",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "outline",
						onClick: () => void run(false),
						children: "Retry"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						onClick: () => void run(true),
						children: "Continue with a sample"
					})
				]
			}) : null
		]
	});
}
//#endregion
export { OneBox as t };
