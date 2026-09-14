import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as DESK, d as deskUsd, m as usdToInr, o as JOURNEY_STEPS } from "./catalog-tDitttoK.mjs";
import { t as labelledSample } from "./engine-B4J-WBhn.mjs";
import { u as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as uid, S as rupees, a as Route$9, b as dollars, c as valueOf, o as STEPS, s as useMill, v as Button, x as inNum, y as cn } from "./router-DNb1iX95.mjs";
import { t as Badge } from "./badge-CJx1Xd8C.mjs";
import { t as Input } from "./input-C_hR21Aa.mjs";
import { t as Label } from "./label-B-UaSL1m.mjs";
import { n as MissionDetail, r as MissionView, t as Artifacts } from "./mission-view-DJs-p2tK.mjs";
import { t as TrustPanel } from "./trust-panel-Dnir52FK.mjs";
import { t as PlanView } from "./plan-view-BYZ7P6V5.mjs";
import { t as OneBox } from "./one-box-BbrNW5aE.mjs";
import { a as ResponsiveContainer, i as Bar, n as YAxis, o as Tooltip, r as XAxis, t as BarChart } from "../_libs/recharts+[...].mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/run--hVXYJCb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Handoff() {
	const { millName, setMillName, saveLead, result, estimate, track, pushAudit, setPlanId } = useMill();
	const [name, setName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const v = valueOf(estimate);
	function planText() {
		return `Millhand plan for ${millName || "our mill"}\n${result?.title ?? ""}\nIllustrative annual value ${rupees(v.annual)}, payback ~${v.paybackDays} days.\nOur rate: ${dollars(DESK.usdPerHour)}/hour, ${DESK.hoursPerDay}h/day, ${DESK.daysPerWeek} days/week. Sandbox week ${dollars(deskUsd(1))}.`;
	}
	function commit(channel) {
		if (!name.trim() || !phone.trim()) {
			toast("Name and WhatsApp / phone are needed here — not on the first screen.");
			return null;
		}
		const planId = uid("plan");
		const lead = {
			name: name.trim(),
			mill: millName || "Unnamed mill",
			phone: phone.trim(),
			email: email.trim(),
			channel,
			planId,
			at: (/* @__PURE__ */ new Date()).toISOString()
		};
		saveLead(lead);
		setPlanId(planId);
		track("handoff", channel);
		pushAudit({
			actor: name.trim(),
			action: "Plan sent",
			detail: channel
		});
		try {
			localStorage.setItem(`millhand-plan-${planId}`, JSON.stringify({
				lead,
				result,
				estimate
			}));
		} catch {}
		return lead;
	}
	function whatsapp() {
		if (!commit("whatsapp")) return;
		const url = `https://wa.me/?text=${encodeURIComponent(planText())}`;
		window.open(url, "_blank", "noopener,noreferrer");
		toast("WhatsApp opened with the plan text.");
	}
	function mail() {
		if (!commit("email")) return;
		window.location.href = `mailto:${email || ""}?subject=${encodeURIComponent("Millhand AI plan")}&body=${encodeURIComponent(planText())}`;
		toast("Email draft opened.");
	}
	function call() {
		if (!commit("call")) return;
		toast("We’ll use this number to book a call. No auto-dial.");
	}
	function share() {
		const lead = commit("link");
		if (!lead) return;
		const url = `${window.location.origin}/p/${lead.planId}`;
		navigator.clipboard.writeText(url);
		toast("Link copied. It opens this plan on this browser.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[1fr_16rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "space-y-4",
			onSubmit: (e) => {
				e.preventDefault();
				call();
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Contact details are asked here, at peak interest — not at the start."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "person",
					children: "Your name"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "person",
					className: "mt-1",
					value: name,
					onChange: (e) => setName(e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "mill",
					children: "Mill"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "mill",
					className: "mt-1",
					value: millName,
					onChange: (e) => setMillName(e.target.value),
					placeholder: "Khanna Weaves Pvt. Ltd."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "phone",
					children: "WhatsApp / phone"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "phone",
					className: "mt-1",
					value: phone,
					onChange: (e) => setPhone(e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "email",
					children: "Email (optional)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "email",
					type: "email",
					className: "mt-1",
					value: email,
					onChange: (e) => setEmail(e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							onClick: whatsapp,
							children: "Send on WhatsApp"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							variant: "outline",
							children: "Book a call"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							onClick: mail,
							children: "Email the plan"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							onClick: share,
							children: "Copy a link"
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "rounded-lg border border-border bg-surface p-4 text-sm text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium text-fg",
				children: "Where the plan goes"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2",
				children: "WhatsApp opens with the text. The link stays on this device. A person reads it when you’re ready — not a bot."
			})]
		})]
	});
}
var COLS = [
	{
		id: "process",
		label: "Process"
	},
	{
		id: "tasks",
		label: "Tasks"
	},
	{
		id: "ai",
		label: "AI"
	},
	{
		id: "outcome",
		label: "Outcome"
	}
];
function OpportunityMap({ graph }) {
	const [open, setOpen] = (0, import_react.useState)(graph.nodes[0] ?? null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-[1fr_18rem]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-3 text-sm text-muted",
			children: graph.title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
			children: COLS.map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-2 text-xs font-medium tracking-wide text-subtle uppercase",
				children: col.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: graph.nodes.filter((n) => n.column === col.id).map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setOpen(n),
					className: cn("w-full rounded-md border px-3 py-2 text-left text-sm min-h-11", open?.id === n.id ? "border-primary bg-primary/10" : "border-border bg-bg-elevated hover:border-primary/40"),
					children: n.label
				}) }, n.id))
			})] }, col.id))
		})] }), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "rounded-lg border border-border bg-surface p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-wide text-subtle uppercase",
					children: open.column
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display mt-1 text-xl",
					children: open.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: open.detail
				})
			]
		}) : null]
	});
}
function StepRail({ current }) {
	const idx = JOURNEY_STEPS.findIndex((s) => s.id === current);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		"aria-label": "Plan steps",
		className: "overflow-x-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "flex min-w-max gap-1",
			children: JOURNEY_STEPS.map((s, i) => {
				const done = i < idx;
				const on = s.id === current;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/run",
					search: { step: s.id },
					className: cn("inline-flex min-h-11 items-center rounded-full px-3 text-sm", on && "bg-ink text-bg-elevated", done && !on && "text-primary", !done && !on && "text-muted"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mr-2 tabular-nums text-xs",
						children: String(i + 1).padStart(2, "0")
					}), s.label]
				}) }, s.id);
			})
		})
	});
}
function ValueEstimate() {
	const { estimate, setEstimate } = useMill();
	const v = valueOf(estimate);
	const data = [{
		name: "Today",
		hours: estimate.rfqsPerMonth * estimate.minutesToday / 60
	}, {
		name: "With AI",
		hours: estimate.rfqsPerMonth * estimate.minutesWithAi / 60
	}];
	const sandboxUsd = deskUsd(1);
	const sandboxInr = usdToInr(sandboxUsd);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-6 lg:grid-cols-[18rem_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "rfqs",
					children: "RFQs / month"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "rfqs",
					type: "number",
					min: 1,
					className: "mt-1 tabular-nums",
					value: estimate.rfqsPerMonth,
					onChange: (e) => setEstimate({ rfqsPerMonth: Number(e.target.value) || 0 })
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "mins",
					children: "Minutes a quote today"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "mins",
					type: "number",
					min: 1,
					className: "mt-1 tabular-nums",
					value: estimate.minutesToday,
					onChange: (e) => setEstimate({ minutesToday: Number(e.target.value) || 0 })
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "cost",
					children: "Loaded ₹ / hour (merchandiser)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "cost",
					type: "number",
					min: 1,
					className: "mt-1 tabular-nums",
					value: estimate.costPerHour,
					onChange: (e) => setEstimate({ costPerHour: Number(e.target.value) || 0 })
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-xs text-subtle",
					children: [
						"With-AI minutes fixed at ",
						estimate.minutesWithAi,
						". Our desk is ",
						dollars(DESK.usdPerHour),
						" ",
						"/ hour, ",
						DESK.hoursPerDay,
						" hours / day, ",
						DESK.daysPerWeek,
						" days / week. Sandbox week",
						" ",
						dollars(sandboxUsd),
						" (",
						rupees(sandboxInr),
						" at ₹",
						DESK.inrPerUsd,
						"/$)."
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-4 flex flex-wrap items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					tone: "warn",
					children: "Illustrative"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-muted",
					children: "Not a quotation. Assumptions are listed."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Hours released / year",
						v: `${inNum(v.hoursYear, 0)} h`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Annual value",
						v: rupees(v.annual)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Payback",
						v: `${v.paybackDays} days`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						k: "Hours / month",
						v: `${inNum(v.hoursMonth, 1)} h`
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 h-48",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "name",
								tick: {
									fill: "currentColor",
									fontSize: 12
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { hide: true }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								formatter: (val) => [`${inNum(Number(val), 1)} h / month`, "Desk time"],
								contentStyle: {
									background: "var(--color-bg-elevated)",
									border: "1px solid var(--color-border)",
									borderRadius: 8
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "hours",
								fill: "var(--color-primary)",
								radius: [
									6,
									6,
									0,
									0
								]
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-4 list-disc space-y-1 pl-4 text-sm text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Hours = RFQs × (today − with AI) × 12." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Value = hours × mill loaded cost. No win-rate lift counted." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						"Payback uses one sandbox week (",
						dollars(sandboxUsd),
						" / ",
						rupees(estimate.setupCost),
						") against monthly mill value."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						"Our rate is ",
						dollars(DESK.usdPerHour),
						" / hour × ",
						DESK.hoursPerDay,
						" h × ",
						DESK.daysPerWeek,
						" days =",
						" ",
						dollars(deskUsd(1)),
						" / week."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Owner approval time stays in the with-AI path." })
				]
			})
		] })]
	});
}
function Stat({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md border border-border bg-surface p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-subtle",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display mt-1 text-2xl tabular-nums tracking-tight",
			children: v
		})]
	});
}
function Slider({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
		className: cn("relative flex w-full touch-none items-center select-none", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
			className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-surface",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block size-5 rounded-full border border-primary bg-bg-elevated shadow-[var(--shadow-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" })]
	});
}
function WorkflowCompare({ lanes }) {
	const [mix, setMix] = (0, import_react.useState)(100);
	const withAi = mix >= 50;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex flex-col gap-2 sm:flex-row sm:items-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: "Today"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
				min: 0,
				max: 100,
				step: 1,
				value: [mix],
				onValueChange: (v) => setMix(v[0] ?? 0),
				className: "sm:flex-1",
				"aria-label": "Human to AI mix"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: "With AI"
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-2",
		children: lanes.map((l) => {
			const minutes = withAi ? l.aiMinutes : l.todayMinutes;
			const owner = withAi ? l.owner : "human";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: cn("flex flex-wrap items-start justify-between gap-3 rounded-lg border border-border bg-bg-elevated p-3"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: l.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: l.detail
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: owner === "approve" ? "warn" : owner === "ai" ? "primary" : "muted",
						children: owner === "approve" ? "Person must approve" : owner === "ai" ? "AI" : "People"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "tabular-nums text-sm text-muted",
						children: [minutes, " min"]
					})]
				})]
			}, l.id);
		})
	})] });
}
function RunPage() {
	const { step: searchStep } = Route$9.useSearch();
	const current = searchStep ?? "result";
	const { result, setResult, setStep, track } = useMill();
	const [active, setActive] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setStep(current);
		track("journey", current);
	}, [
		current,
		setStep,
		track
	]);
	(0, import_react.useEffect)(() => {
		if (!result) setResult(labelledSample("rfq-email"));
	}, [result, setResult]);
	if (!result) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "No run yet. Paste work, or continue with a sample."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OneBox, {})
		})]
	});
	const idx = STEPS.indexOf(current);
	const next = STEPS[idx + 1];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepRail, { current }),
			current === "result" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl tracking-tight",
						children: result.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-2xl text-muted",
						children: result.summary
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "my-6 grid gap-2 sm:grid-cols-2",
						children: result.fields.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md border border-border bg-bg-elevated px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-subtle",
								children: f.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-sm",
								children: f.value
							})]
						}, f.label))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Artifacts, { items: result.artifacts }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustPanel, { result })
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "rounded-xl border border-border bg-bg-elevated p-3 h-fit",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-xs font-medium tracking-wide text-subtle uppercase",
							children: "Mission"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionView, {
							steps: result.mission,
							activeId: active?.id,
							onPick: (s) => setActive(s)
						}),
						active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MissionDetail, { step: active })
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-subtle",
							children: "Click a step for input, output, source, confidence."
						})
					]
				})]
			}) : null,
			current === "map" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display mb-2 text-4xl tracking-tight",
						children: "Opportunity map"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-6 text-muted",
						children: "Process → tasks → AI → outcome. Every node opens."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpportunityMap, { graph: result.map })
				]
			}) : null,
			current === "workflow" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display mb-2 text-4xl tracking-tight",
						children: "Today vs with AI"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-6 text-muted",
						children: "What AI does, what people do, and where a person must approve."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkflowCompare, { lanes: result.workflow })
				]
			}) : null,
			current === "estimate" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display mb-2 text-4xl tracking-tight",
						children: "Live ₹ value"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-6 text-muted",
						children: "Change two or three numbers. The rest is listed."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ValueEstimate, {})
				]
			}) : null,
			current === "plan" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mb-4 text-4xl tracking-tight",
					children: "One-page AI plan"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanView, {})]
			}) : null,
			current === "handoff" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display mb-2 text-4xl tracking-tight",
					children: "Where should we send your plan?"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Handoff, {})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-sm text-muted hover:text-fg",
					children: "Change the input"
				}), next ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/run",
						search: { step: next },
						children: ["Continue", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/workspace",
						children: "Open mill workspace"
					})
				})]
			})
		]
	});
}
//#endregion
export { RunPage as component };
