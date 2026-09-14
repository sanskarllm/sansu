import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { d as MODES, l as COMPANY, s as useMill, v as Button, y as cn } from "./router-DNb1iX95.mjs";
import { t as Textarea } from "./textarea-Ccs5ZCLa.mjs";
import { t as Input } from "./input-C_hR21Aa.mjs";
import { t as Label } from "./label-B-UaSL1m.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-V0RgVVrQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Contact() {
	const track = useMill((s) => s.track);
	const push = useMill((s) => s.pushAudit);
	const [name, setName] = (0, import_react.useState)("");
	const [firm, setFirm] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [mode, setMode] = (0, import_react.useState)(MODES[0].id);
	const [note, setNote] = (0, import_react.useState)("");
	function send() {
		if (!name.trim() || !phone.trim()) {
			toast("Name and phone — we ask here, not on the first screen.");
			return;
		}
		track("contact", mode);
		push({
			actor: name.trim(),
			action: "Contact the desk",
			detail: `${mode} · ${firm || "unnamed mill"}`
		});
		toast("Noted on this desk. A person reads it — not a bot.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-primary",
				children: [COMPANY.name, " desk"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display mt-2 text-4xl tracking-tight",
				children: "Where should we write back?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 max-w-xl text-muted",
				children: [
					"Offline install, hybrid fence, or a Millhand sandbox. Contact is asked here. Founded ",
					COMPANY.founded,
					" by",
					" ",
					COMPANY.founder,
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-8 lg:grid-cols-[1fr_16rem]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "space-y-4",
					onSubmit: (e) => {
						e.preventDefault();
						send();
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "cn",
							children: "Your name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "cn",
							className: "mt-1",
							value: name,
							onChange: (e) => setName(e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "cf",
							children: "Company / mill"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "cf",
							className: "mt-1",
							value: firm,
							onChange: (e) => setFirm(e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "cp",
							children: "WhatsApp / phone"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "cp",
							className: "mt-1",
							value: phone,
							onChange: (e) => setPhone(e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "ce",
							children: "Email (optional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "ce",
							type: "email",
							className: "mt-1",
							value: email,
							onChange: (e) => setEmail(e.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Interest" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: MODES.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setMode(m.id),
								className: cn("min-h-11 rounded-full border px-3 text-sm", mode === m.id ? "border-primary bg-primary text-primary-fg" : "border-border"),
								children: m.name
							}, m.id))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "note",
							children: "What should stay on the floor?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "note",
							className: "mt-1 min-h-28",
							value: note,
							onChange: (e) => setNote(e.target.value),
							placeholder: "e.g. price cards offline, quotes with owner approval"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							children: "Send to the desk"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "h-fit rounded-lg border border-border bg-surface p-4 text-sm text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium text-fg",
						children: "A person reads this"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2",
						children: [
							"No auto-dial, no newsletter. India, mill hours. If you only wanted the product,",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-fg",
								children: "Give AI the work"
							}),
							" on the home page is enough."
						]
					})]
				})]
			})
		]
	});
}
//#endregion
export { Contact as component };
