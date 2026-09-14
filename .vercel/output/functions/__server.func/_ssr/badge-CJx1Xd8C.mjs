import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { y as cn } from "./router-DNb1iX95.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-CJx1Xd8C.js
var import_jsx_runtime = require_jsx_runtime();
function Badge({ className, tone = "muted", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium", {
			muted: "bg-surface text-muted border-border",
			primary: "bg-primary/10 text-primary border-primary/20",
			ok: "bg-ok/10 text-ok border-ok/20",
			warn: "bg-warn/10 text-warn border-warn/20",
			danger: "bg-danger/10 text-danger border-danger/20",
			ink: "bg-ink text-bg-elevated border-ink"
		}[tone], className),
		children
	});
}
//#endregion
export { Badge as t };
