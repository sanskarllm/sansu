import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as PROBLEMS } from "./catalog-tDitttoK.mjs";
import { l as Check } from "../_libs/lucide-react.mjs";
import { t as RunDemo } from "./run-demo-BOchl9Hi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/rfq-DmF2AEeX.js
var import_jsx_runtime = require_jsx_runtime();
var PIPE = [
	{
		n: "01",
		t: "Buyer enquiry",
		d: "The email as it arrived."
	},
	{
		n: "02",
		t: "Requirements",
		d: "Construction, width, colour, quantity, delivery."
	},
	{
		n: "03",
		t: "Capability check",
		d: "Against the mill’s known cards — not the internet."
	},
	{
		n: "04",
		t: "Missing info",
		d: "Listed. Never filled with a guess that ships."
	},
	{
		n: "05",
		t: "Draft quote",
		d: "Rate, validity, lab dip. Illustrative until you say so."
	},
	{
		n: "06",
		t: "Approval",
		d: "A person must approve. AI does not send."
	},
	{
		n: "07",
		t: "CRM update",
		d: "Buyer, fabric, rate, status in the book."
	}
];
function Rfq() {
	const sample = PROBLEMS[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-primary",
				children: "Flagship"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-2 text-4xl tracking-tight",
				children: "RFQ to quotation"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xl text-muted",
				children: "The mill’s own expertise, in one demo. Enquiry through to a quote waiting for the owner."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "my-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-7",
				children: PIPE.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-md border border-border bg-bg-elevated p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-xs text-subtle",
							children: p.n
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm font-medium",
							children: p.t
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: p.d
						})
					]
				}, p.n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RunDemo, {
				inputLabel: "Buyer enquiry",
				input: {
					mode: "email",
					problemId: "rfq-email",
					text: sample.sample
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 flex items-center gap-2 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-primary" }),
					"Next:",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/approval",
						className: "text-primary",
						children: "prove a person still approves"
					})
				]
			})
		]
	});
}
//#endregion
export { Rfq as component };
