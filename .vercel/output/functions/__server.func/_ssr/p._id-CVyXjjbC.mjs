import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as labelledSample } from "./engine-B4J-WBhn.mjs";
import { r as Route$2, s as useMill } from "./router-DNb1iX95.mjs";
import { t as Badge } from "./badge-CJx1Xd8C.mjs";
import { t as TrustPanel } from "./trust-panel-Dnir52FK.mjs";
import { t as PlanView } from "./plan-view-BYZ7P6V5.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/p._id-CVyXjjbC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SharedPlan() {
	const { id } = Route$2.useParams();
	const { setResult, setEstimate, setMillName, result } = useMill();
	const [found, setFound] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(`millhand-plan-${id}`);
			if (raw) {
				const parsed = JSON.parse(raw);
				if (parsed.result) setResult(parsed.result);
				if (parsed.estimate) setEstimate(parsed.estimate);
				if (parsed.lead?.mill) setMillName(parsed.lead.mill);
				setFound(true);
				return;
			}
		} catch {}
		setResult(labelledSample("rfq-email"));
		setFound(false);
	}, [
		id,
		setEstimate,
		setMillName,
		setResult
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: found ? "primary" : "warn",
					children: found ? "Sandbox" : "Demo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: found ? "Saved plan on this device." : "This link had no saved plan here. Labelled sample below."
				})]
			}),
			result ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustPanel, { result }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanView, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/run",
					search: { step: "handoff" },
					className: "text-primary",
					children: "Send this plan"
				})
			})
		]
	});
}
//#endregion
export { SharedPlan as component };
