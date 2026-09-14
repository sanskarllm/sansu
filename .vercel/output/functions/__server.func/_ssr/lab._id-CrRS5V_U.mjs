import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as LAB_DEMOS } from "./catalog-tDitttoK.mjs";
import { i as Route$3 } from "./router-DNb1iX95.mjs";
import { t as RunDemo } from "./run-demo-BOchl9Hi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lab._id-CrRS5V_U.js
var import_jsx_runtime = require_jsx_runtime();
function LabDemoPage() {
	const { id } = Route$3.useParams();
	const demo = LAB_DEMOS.find((d) => d.id === id) ?? LAB_DEMOS[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/lab",
						className: "hover:text-fg",
						children: "Lab"
					}),
					" ",
					"/ ",
					demo.name
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-2 text-4xl tracking-tight",
				children: demo.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 mb-8 max-w-xl text-muted",
				children: demo.blurb
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RunDemo, {
				inputLabel: demo.inputLabel,
				input: {
					mode: "chip",
					problemId: demo.problemId,
					text: demo.input
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/run",
					search: { step: "map" },
					className: "text-primary",
					children: "Continue to the opportunity map"
				})
			})
		]
	});
}
//#endregion
export { LabDemoPage as component };
