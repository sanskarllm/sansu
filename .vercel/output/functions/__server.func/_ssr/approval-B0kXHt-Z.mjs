import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { s as useMill, v as Button } from "./router-DNb1iX95.mjs";
import { t as Textarea } from "./textarea-Ccs5ZCLa.mjs";
import { t as Badge } from "./badge-CJx1Xd8C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/approval-B0kXHt-Z.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DRAFT = `Dear Lisa,

Thank you for the RFQ on 12,000 m navy cotton poplin, 40s × 40s, 133 × 72, 58".

Draft for owner approval (not sent):
- ₹185 / m ex-mill, FOB Nhava Sheva
- Validity 15 days
- Lab dip 7 working days after shade standard
- CIF Rotterdam on request after freight

Please confirm Pantone 19-4052 as the shade standard and whether a 2,000 m trial is required.

Regards,
Khanna Weaves`;
function Approval() {
	const push = useMill((s) => s.pushAudit);
	const track = useMill((s) => s.track);
	const [body, setBody] = (0, import_react.useState)(DRAFT);
	const [state, setState] = (0, import_react.useState)("open");
	function act(next, line) {
		setState(next);
		push({
			actor: "Owner",
			action: line,
			detail: "Buyer reply · Nordic Home"
		});
		track("approval", next);
		toast(line);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-primary",
				children: "Humans stay in control"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-2 text-4xl tracking-tight",
				children: "Approval simulator"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: "A realistic AI-drafted customer reply. Approve, edit, reject, or escalate. Nothing leaves without you."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "primary",
						children: "Sandbox"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Quotation agent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: state === "open" ? "warn" : "ok",
						children: state === "open" ? "Waiting" : state
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				className: "mt-6 min-h-72 font-sans",
				value: body,
				onChange: (e) => setBody(e.target.value)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						onClick: () => act("approved", "Approved — still not sent until you dispatch"),
						children: "Approve"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						onClick: () => act("edited", "Edit kept. Send is still yours."),
						children: "Edit"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						onClick: () => act("rejected", "Rejected. Draft discarded."),
						children: "Reject"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						onClick: () => act("escalated", "Escalated to GM."),
						children: "Escalate"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-8 text-sm",
				children: [
					"Next:",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/workspace",
						className: "text-primary",
						children: "see it on the mill desk"
					})
				]
			})
		]
	});
}
//#endregion
export { Approval as component };
