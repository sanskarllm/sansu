import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, r as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link, f as createRouter, g as createRootRoute, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent, s as DialogTrigger, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { i as DEFAULT_ESTIMATE, o as JOURNEY_STEPS, u as SEARCH_INDEX } from "./catalog-tDitttoK.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as Menu, n as TriangleAlert, r as Search, t as X } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { t as _e } from "../_libs/cmdk.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-BYNnB7EJ.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function rupees(n, digits = 0) {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: digits,
		minimumFractionDigits: digits
	}).format(n);
}
function dollars(n, digits = 0) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: digits,
		minimumFractionDigits: digits
	}).format(n);
}
function inNum(n, digits = 0) {
	return new Intl.NumberFormat("en-IN", {
		maximumFractionDigits: digits,
		minimumFractionDigits: digits
	}).format(n);
}
function uid(prefix = "mh") {
	return `${prefix}-${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-DNb1iX95.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[opacity,transform,background-color,color,box-shadow] duration-150 ease-out disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] min-h-11 px-4", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg hover:opacity-90",
			ink: "bg-ink text-bg-elevated hover:opacity-90",
			outline: "border border-border bg-bg-elevated text-fg hover:bg-surface",
			ghost: "text-fg hover:bg-surface",
			link: "text-primary underline-offset-4 hover:underline min-h-0 px-0"
		},
		size: {
			default: "h-11",
			sm: "h-9 min-h-9 px-3 text-sm",
			lg: "h-12 px-5",
			icon: "size-11 px-0"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(function Button({ className, variant, size, asChild = false, ...props }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		ref,
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
});
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
function SheetContent({ className, children, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed inset-y-0 right-0 z-50 w-[min(100%,22rem)] border-l border-border bg-bg p-5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-6 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "font-display text-xl",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
				className: "rounded-md p-2 text-muted hover:bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Close"
				})]
			})]
		}), children]
	})] });
}
var LINKS = [
	{
		to: "/lab",
		label: "Lab"
	},
	{
		to: "/workforce",
		label: "Workforce"
	},
	{
		to: "/company",
		label: "Company"
	},
	{
		to: "/privacy",
		label: "Privacy"
	},
	{
		to: "/contact",
		label: "Contact"
	}
];
function SiteHeader({ onSearch }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-14 max-w-6xl items-center gap-3 px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-8 shrink-0 place-items-center rounded-sm bg-primary text-primary-fg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							viewBox: "0 0 16 16",
							className: "size-4",
							"aria-hidden": true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "1.2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2 5h12M2 8h12M2 11h12" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M5 2v12M8 2v12M11 2v12" })]
							})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg tracking-tight",
						children: "PrivacyByAI"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "ml-4 hidden items-center gap-1 lg:flex",
					children: LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						className: "rounded-md px-3 py-2 text-sm text-muted hover:bg-surface hover:text-fg",
						children: l.label
					}, l.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "ghost",
							size: "sm",
							onClick: onSearch,
							className: "hidden sm:inline-flex",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" }),
								"Ask AI",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
									className: "ml-2 rounded border border-border px-1.5 text-[0.65rem] text-subtle",
									children: "Ctrl K"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon",
							className: "sm:hidden",
							onClick: onSearch,
							"aria-label": "Ask AI",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
							open,
							onOpenChange: setOpen,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "ghost",
									size: "icon",
									className: "lg:hidden",
									"aria-label": "Menu",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetContent, {
								title: "PrivacyByAI",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
									className: "flex flex-col gap-1",
									children: [
										LINKS.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: l.to,
											className: "rounded-md px-3 py-3 text-sm hover:bg-surface",
											onClick: () => setOpen(false),
											children: l.label
										}, l.to)),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/services",
											className: "rounded-md px-3 py-3 text-sm hover:bg-surface",
											onClick: () => setOpen(false),
											children: "Services"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/security",
											className: "rounded-md px-3 py-3 text-sm hover:bg-surface",
											onClick: () => setOpen(false),
											children: "Security"
										})
									]
								})
							})]
						})
					]
				})
			]
		})
	});
}
var COMPANY = {
	name: "PrivacyByAI",
	product: "Millhand",
	founded: 2024,
	founder: "Sanskar",
	place: "India",
	line: "Privacy-first AI for companies that cannot leak the shopfloor.",
	long: "PrivacyByAI deploys offline, privacy-based LLMs on a mill’s own machines — or a careful non-offline stack when the work genuinely needs the cloud. We do not train public models on your files. A person still approves what leaves the building."
};
var PRINCIPLES = [
	{
		n: "01",
		t: "The mill owns the data",
		d: "RFQs, price cards, GST, buyer names. They stay on hardware you control unless you sign a cloud job with a written fence."
	},
	{
		n: "02",
		t: "Offline first",
		d: "If the job can run on a local model, it does. Air-gap is a real option, not a slide."
	},
	{
		n: "03",
		t: "No training on your work",
		d: "Uploaded files never go to a provider that trains on customer data. Bytes stay on the mill or on a no-train endpoint."
	},
	{
		n: "04",
		t: "A person still sends",
		d: "AI drafts. Autonomy stops at approval unless you raise the fence in writing."
	},
	{
		n: "05",
		t: "Say what ran",
		d: "Every result carries sources, assumptions, confidence, and a badge: Demo, Sandbox, Pilot, or Production."
	},
	{
		n: "06",
		t: "Synthetic is labelled",
		d: "If we used a sample because your file would not parse, the page says so. No silent filler."
	}
];
var MODES = [
	{
		id: "offline",
		name: "Offline LLM",
		kicker: "Privacy-based, on your floor",
		blurb: "A local model on a mill PC, a small GPU box, or an air-gapped server. No enquiry leaves the LAN.",
		fits: [
			"Price cards and constructions you will not put on the public internet",
			"Buyer emails with names, LCs, and shade standards",
			"Plants with weak or watched links",
			"A written rule: nothing outbound without the owner"
		],
		stack: [
			"Local open-weight LLM (quantised, mill-sized hardware)",
			"Rules engine on constructions, incoterms, yarn sheets",
			"Optional offline embedding store of your own cards",
			"Approvals and audit on the same machine"
		],
		not: "Live web research, multi-mill SaaS, or a model that needs a datacentre."
	},
	{
		id: "hybrid",
		name: "Hybrid desk",
		kicker: "Local by default, cloud by exception",
		blurb: "Rules and extraction stay on the mill. A no-train cloud model is called only when fields are thin — short text, never the file.",
		fits: [
			"Messy buyer English the local model cannot parse",
			"A merchandiser desk that already uses mail in the cloud",
			"Pilots that must start this month, then move offline"
		],
		stack: [
			"Same mill rules engine",
			"Short snippets only, capped tokens",
			"Provider chosen for a no-training contract",
			"Kill-switch: the mill can drop the cloud path"
		],
		not: "Dumping the ERP into a chatbot."
	},
	{
		id: "cloud",
		name: "Careful cloud",
		kicker: "Non-offline, still fenced",
		blurb: "When the mill wants a hosted desk. Keys stay server-side. No training. Human approval. Data residency named in the order.",
		fits: [
			"Groups with several units and one owner",
			"IT teams that will not rack a GPU this quarter",
			"A sandbox on mill work before an offline install"
		],
		stack: [
			"Hosted Millhand with mill login later",
			"No-train inference, region written down",
			"File bytes not sent; text extract only",
			"Export of logs back to the mill"
		],
		not: "A consumer chatbot with your buyers in the prompt history."
	}
];
var OFFERINGS = [
	{
		t: "Millhand desk",
		d: "The product on this site. RFQ to quote, samples, export docs, yarn, follow-ups, quality. A costed plan in minutes.",
		href: "/"
	},
	{
		t: "Offline LLM install",
		d: "Hardware size, model choice, rules on your constructions, air-gap if needed. We sit with IT until a labelled job runs.",
		href: "/services"
	},
	{
		t: "Hybrid / cloud fence",
		d: "A written list of what may leave. No-train endpoints. Kill-switch. Audit.",
		href: "/security"
	},
	{
		t: "Workforce on your book",
		d: "Quotation, sample tracking, export docs and the rest — autonomy you set: assist, recommend, act with approval, guarded.",
		href: "/workforce"
	}
];
var STAGES = [
	{
		n: "01",
		t: "Listen on the floor",
		d: "One inbox, one sheet, one WhatsApp group. We run Millhand on that work. No slide deck first."
	},
	{
		n: "02",
		t: "Sandbox week",
		d: "Your RFQs, labelled. Owner approval on every draft. Offline or hybrid named on day one."
	},
	{
		n: "03",
		t: "Pilot with a fence",
		d: "One desk, KPIs vs last quarter, audit log. Cloud path only if the mill signed it."
	},
	{
		n: "04",
		t: "Production or we leave",
		d: "If the hours do not show, the install does not stay. Models and logs remain yours."
	}
];
var TIMELINE = [
	{
		y: "2024",
		t: "Founded",
		d: "Sanskar starts PrivacyByAI in India. The brief: mills were pasting buyer mail into tools that train on it."
	},
	{
		y: "2024",
		t: "First offline desks",
		d: "Local models on mill PCs. Rules engine before any LLM. Human send."
	},
	{
		y: "2025",
		t: "Textile set",
		d: "Quotation, sample tracking, export docs — the jobs a merchandiser actually does."
	},
	{
		y: "2026",
		t: "Millhand",
		d: "A mill owner can see the work, the rupee number, and the plan without a sales call."
	}
];
var POLICY = [
	{
		h: "Who we are",
		p: "PrivacyByAI is a privacy-first company founded by Sanskar in 2024 in India. Millhand is our mill desk. This policy covers the site you are on and the installs we do at a company."
	},
	{
		h: "What this site collects",
		p: "If you paste work into Millhand, it is processed to show you a result. If you send a plan or a contact form, we keep name, mill, phone or mail, and the channel you chose — so a person can reply. We do not sell lists."
	},
	{
		h: "What we do not collect by default",
		p: "No account is required to try the desk. We do not need your ERP login, CCTV, or a full mailbox to run a labelled demo. Do not paste secrets you would not show a merchandiser."
	},
	{
		h: "Offline installs",
		p: "On an offline LLM job, mill data stays on mill hardware. We do not copy price cards off the floor. Updates to the model are files you accept, not a silent phone-home."
	},
	{
		h: "Non-offline (cloud) jobs",
		p: "Only when you choose that mode. Short text may go to a no-train provider. File bytes do not. Region and provider are written in the order. You can switch the path off."
	},
	{
		h: "Training",
		p: "We do not train PrivacyByAI models on your mill’s documents. We do not send your files to a provider that trains on customer data."
	},
	{
		h: "Retention",
		p: "Sandbox runs on this browser stay on this device unless you send a plan. Production retention is in the mill’s order — typically logs you can export or wipe."
	},
	{
		h: "Your rights",
		p: "Ask us to delete a lead, a plan, or an install copy we hold. For offline installs, you already hold the data."
	}
];
var SECURITY = [
	{
		t: "Air-gap",
		d: "Model, rules, and audit on a machine with no route out. Updates on a stick. Used when the mill says so."
	},
	{
		t: "On-prem GPU / mill PC",
		d: "Quantised local LLM sized to the box you actually have. We do not require a datacentre to start."
	},
	{
		t: "No-train inference",
		d: "If a cloud path exists, the contract forbids training. Keys never sit in the browser."
	},
	{
		t: "Least text",
		d: "Rules engine first. LLM only on thin fields. Snippets capped. Files are read as text here, not uploaded whole."
	},
	{
		t: "Approval fence",
		d: "Assist, recommend, act with approval, guarded autonomy. Default: nothing outbound without a named person."
	},
	{
		t: "Audit",
		d: "Extracts, drafts, approvals, model path (offline / hybrid / cloud). Exportable to the mill."
	}
];
var FOUNDER = {
	name: "Sanskar",
	role: "Founder",
	since: "2024",
	bio: "Sanskar founded PrivacyByAI in 2024 after watching factories treat a public chatbot as a clerk. The company exists to put the model on the mill’s terms: offline when the work is private, careful cloud when it is not, and a person on the send button either way."
};
var COLS = [
	{
		h: "Product",
		links: [
			{
				to: "/",
				label: "Millhand"
			},
			{
				to: "/lab",
				label: "Lab"
			},
			{
				to: "/rfq",
				label: "RFQ"
			},
			{
				to: "/workforce",
				label: "Workforce"
			},
			{
				to: "/cases",
				label: "Cases"
			}
		]
	},
	{
		h: "Company",
		links: [
			{
				to: "/company",
				label: "About"
			},
			{
				to: "/services",
				label: "Services"
			},
			{
				to: "/contact",
				label: "Contact"
			}
		]
	},
	{
		h: "Privacy first",
		links: [
			{
				to: "/privacy",
				label: "Privacy"
			},
			{
				to: "/security",
				label: "Security"
			},
			{
				to: "/approval",
				label: "Approval"
			}
		]
	}
];
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-border bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl tracking-tight",
					children: COMPANY.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: COMPANY.line
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-xs text-subtle",
					children: [
						"Founded ",
						COMPANY.founded,
						" by ",
						COMPANY.founder,
						" · ",
						COMPANY.place
					]
				})
			] }), COLS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-wide text-subtle uppercase",
				children: c.h
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-2 text-sm",
				children: c.links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: l.to,
					className: "text-muted hover:text-fg",
					children: l.label
				}) }, l.to))
			})] }, c.h))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mx-auto max-w-6xl px-4 py-4 text-xs text-subtle",
				children: [COMPANY.product, " is a PrivacyByAI desk. Offline LLM or fenced cloud. We do not train on your mill."]
			})
		})]
	});
}
var emptyInput = {
	mode: "chip",
	problemId: "rfq-email",
	text: ""
};
var useMill = create()(persist((set) => ({
	input: emptyInput,
	result: null,
	step: "result",
	estimate: DEFAULT_ESTIMATE,
	millName: "",
	lead: null,
	leads: [],
	events: [],
	audit: [],
	customAgent: null,
	planId: null,
	setInput: (input) => set((s) => ({ input: {
		...s.input,
		...input
	} })),
	setResult: (result) => set({ result }),
	setStep: (step) => set({ step }),
	setEstimate: (e) => set((s) => ({ estimate: {
		...s.estimate,
		...e
	} })),
	setMillName: (millName) => set({ millName }),
	saveLead: (lead) => set((s) => ({
		lead,
		leads: [lead, ...s.leads].slice(0, 20)
	})),
	track: (step, detail) => set((s) => ({ events: [{
		at: (/* @__PURE__ */ new Date()).toISOString(),
		step,
		detail
	}, ...s.events].slice(0, 80) })),
	setCustomAgent: (customAgent) => set({ customAgent }),
	setPlanId: (planId) => set({ planId }),
	pushAudit: (e) => set((s) => ({ audit: [{
		id: `au-${Date.now()}`,
		at: (/* @__PURE__ */ new Date()).toISOString(),
		...e
	}, ...s.audit].slice(0, 40) }))
}), {
	name: "millhand-v2",
	skipHydration: true,
	partialize: (s) => ({
		input: s.input,
		result: s.result,
		step: s.step,
		estimate: s.estimate,
		millName: s.millName,
		lead: s.lead,
		leads: s.leads,
		events: s.events,
		audit: s.audit,
		customAgent: s.customAgent,
		planId: s.planId
	})
}));
function valueOf(e) {
	const hoursMonth = e.rfqsPerMonth * Math.max(e.minutesToday - e.minutesWithAi, 0) / 60;
	const hoursYear = hoursMonth * 12;
	const annual = hoursYear * e.costPerHour;
	const monthly = annual / 12;
	return {
		hoursMonth,
		hoursYear,
		annual,
		monthly,
		paybackDays: monthly > 0 ? Math.ceil(e.setupCost / monthly * 30) : 0
	};
}
function CommandSearch({ open, onOpenChange }) {
	const router = useRouter();
	const track = useMill((s) => s.track);
	const [q, setQ] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		function onKey(e) {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				onOpenChange(!open);
			}
		}
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onOpenChange]);
	const items = (0, import_react.useMemo)(() => {
		const s = q.trim().toLowerCase();
		if (!s) return SEARCH_INDEX;
		return SEARCH_INDEX.filter((i) => [
			i.title,
			i.blurb,
			i.kind,
			...i.tags
		].join(" ").toLowerCase().includes(s));
	}, [q]);
	const grouped = (0, import_react.useMemo)(() => {
		const g = {};
		for (const i of items) (g[i.kind] ??= []).push(i);
		return g;
	}, [items]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute inset-0 bg-ink/40",
			"aria-label": "Close search",
			onClick: () => onOpenChange(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative mx-auto mt-[12vh] w-[min(100%-1.5rem,36rem)] rounded-xl border border-border bg-bg-elevated p-2 shadow-[var(--shadow-border-hover)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e, {
				label: "Ask AI",
				shouldFilter: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
					autoFocus: true,
					value: q,
					onValueChange: setQ,
					placeholder: "Agents, demos, workflows, cases…",
					className: "h-11 w-full border-b border-border bg-transparent px-3 text-sm outline-none placeholder:text-subtle"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.List, {
					className: "max-h-80 overflow-y-auto p-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
						className: "px-3 py-6 text-sm text-muted",
						children: "No match. Try RFQ, export docs, or sample tracking."
					}), Object.entries(grouped).map(([kind, list]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
						heading: kind,
						className: "p-1 text-xs tracking-wide text-subtle uppercase",
						children: list.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
							value: i.id,
							onSelect: () => {
								track("search", i.href);
								onOpenChange(false);
								setQ("");
								router.history.push(i.href);
							},
							className: "flex cursor-pointer flex-col rounded-md px-3 py-2 text-left normal-case data-[selected=true]:bg-surface",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium text-fg",
								children: i.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-normal text-muted",
								children: i.blurb
							})]
						}, i.id))
					}, kind))]
				})]
			})
		})]
	});
}
var styles_default = "/assets/styles-mtoUP0xm.css";
var APP_NAME = "PrivacyByAI";
var Route$20 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "PrivacyByAI — privacy-first offline LLMs and careful cloud AI. Millhand for textile and manufacturing SMEs."
			},
			{
				name: "theme-color",
				content: "#1a5c56"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&family=Instrument+Serif:ital@0;1&display=swap"
			}
		]
	}),
	component: Root
});
function Root() {
	const [search, setSearch] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		useMill.persist.rehydrate();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "min-h-dvh bg-bg text-fg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-h-dvh flex-col",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, { onSearch: () => setSearch(true) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandSearch, {
						open: search,
						onOpenChange: setSearch
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
						position: "bottom-center",
						toastOptions: { className: "!bg-bg-elevated !text-fg !border-border" }
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
var $$splitComponentImporter$19 = () => import("./routes-Badv0dNW.mjs");
var Route$19 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$19, "component") });
var $$splitComponentImporter$18 = () => import("./approval-B0kXHt-Z.mjs");
var Route$18 = createFileRoute("/approval")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
var $$splitComponentImporter$17 = () => import("./builder-CJRQiw3I.mjs");
var Route$17 = createFileRoute("/builder")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./cases-DPiGtAih.mjs");
var Route$16 = createFileRoute("/cases")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./company-CDC4RBe9.mjs");
var Route$15 = createFileRoute("/company")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./contact-V0RgVVrQ.mjs");
var Route$14 = createFileRoute("/contact")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./lab-AWJ9s131.mjs");
var Route$13 = createFileRoute("/lab")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./privacy-8j9x6nOW.mjs");
var Route$12 = createFileRoute("/privacy")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./readiness-Dav8fOR_.mjs");
var Route$11 = createFileRoute("/readiness")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./rfq-DmF2AEeX.mjs");
var Route$10 = createFileRoute("/rfq")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var STEPS = JOURNEY_STEPS.map((s) => s.id);
var $$splitComponentImporter$9 = () => import("./run--hVXYJCb.mjs");
var Route$9 = createFileRoute("/run")({
	validateSearch: (s) => {
		if (STEPS.includes(s.step)) return { step: s.step };
		return {};
	},
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./security-DQeq16uY.mjs");
var Route$8 = createFileRoute("/security")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./services-C1ANzpJa.mjs");
var Route$7 = createFileRoute("/services")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./workforce-C5nlRxMN.mjs");
var Route$6 = createFileRoute("/workforce")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./workspace-DGOMHjqR.mjs");
var Route$5 = createFileRoute("/workspace")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./lab.index-XZhs6D_X.mjs");
var Route$4 = createFileRoute("/lab/")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./lab._id-CrRS5V_U.mjs");
var Route$3 = createFileRoute("/lab/$id")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./p._id-CVyXjjbC.mjs");
var Route$2 = createFileRoute("/p/$id")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./workforce.index--cNL-Vfz.mjs");
var Route$1 = createFileRoute("/workforce/")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./workforce._id-CfdPMoOa.mjs");
var Route = createFileRoute("/workforce/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$19.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$20
});
var ApprovalRoute = Route$18.update({
	id: "/approval",
	path: "/approval",
	getParentRoute: () => Route$20
});
var BuilderRoute = Route$17.update({
	id: "/builder",
	path: "/builder",
	getParentRoute: () => Route$20
});
var CasesRoute = Route$16.update({
	id: "/cases",
	path: "/cases",
	getParentRoute: () => Route$20
});
var CompanyRoute = Route$15.update({
	id: "/company",
	path: "/company",
	getParentRoute: () => Route$20
});
var ContactRoute = Route$14.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$20
});
var LabRoute = Route$13.update({
	id: "/lab",
	path: "/lab",
	getParentRoute: () => Route$20
});
var PrivacyRoute = Route$12.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$20
});
var ReadinessRoute = Route$11.update({
	id: "/readiness",
	path: "/readiness",
	getParentRoute: () => Route$20
});
var RfqRoute = Route$10.update({
	id: "/rfq",
	path: "/rfq",
	getParentRoute: () => Route$20
});
var RunRoute = Route$9.update({
	id: "/run",
	path: "/run",
	getParentRoute: () => Route$20
});
var SecurityRoute = Route$8.update({
	id: "/security",
	path: "/security",
	getParentRoute: () => Route$20
});
var ServicesRoute = Route$7.update({
	id: "/services",
	path: "/services",
	getParentRoute: () => Route$20
});
var WorkforceRoute = Route$6.update({
	id: "/workforce",
	path: "/workforce",
	getParentRoute: () => Route$20
});
var WorkspaceRoute = Route$5.update({
	id: "/workspace",
	path: "/workspace",
	getParentRoute: () => Route$20
});
var LabIndexRoute = Route$4.update({
	id: "/",
	path: "/",
	getParentRoute: () => LabRoute
});
var LabIdRoute = Route$3.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => LabRoute
});
var PIdRoute = Route$2.update({
	id: "/p/$id",
	path: "/p/$id",
	getParentRoute: () => Route$20
});
var WorkforceIndexRoute = Route$1.update({
	id: "/",
	path: "/",
	getParentRoute: () => WorkforceRoute
});
var WorkforceIdRoute = Route.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => WorkforceRoute
});
var LabRouteChildren = {
	LabIdRoute,
	LabIndexRoute
};
var LabRouteWithChildren = LabRoute._addFileChildren(LabRouteChildren);
var WorkforceRouteChildren = {
	WorkforceIdRoute,
	WorkforceIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	ApprovalRoute,
	BuilderRoute,
	CasesRoute,
	CompanyRoute,
	ContactRoute,
	LabRoute: LabRouteWithChildren,
	PrivacyRoute,
	ReadinessRoute,
	RfqRoute,
	RunRoute,
	SecurityRoute,
	ServicesRoute,
	WorkforceRoute: WorkforceRoute._addFileChildren(WorkforceRouteChildren),
	WorkspaceRoute,
	PIdRoute
};
var routeTree = Route$20._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { uid as C, rupees as S, TIMELINE as _, Route$9 as a, dollars as b, valueOf as c, MODES as d, OFFERINGS as f, STAGES as g, SECURITY as h, Route$3 as i, COMPANY as l, PRINCIPLES as m, Route as n, STEPS as o, POLICY as p, Route$2 as r, useMill as s, router_exports as t, FOUNDER as u, Button as v, inNum as x, cn as y };
