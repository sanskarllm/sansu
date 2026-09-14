//#region node_modules/.nitro/vite/services/ssr/assets/catalog-tDitttoK.js
var JOURNEY_STEPS = [
	{
		id: "result",
		label: "Result"
	},
	{
		id: "map",
		label: "Map"
	},
	{
		id: "workflow",
		label: "Workflow"
	},
	{
		id: "estimate",
		label: "₹ value"
	},
	{
		id: "plan",
		label: "Plan"
	},
	{
		id: "handoff",
		label: "Send"
	}
];
/** Millhand desk: billed in USD, mill savings shown in ₹. */
var DESK = {
	usdPerHour: 60,
	hoursPerDay: 10,
	daysPerWeek: 5,
	inrPerUsd: 84
};
function deskHours(weeks) {
	return DESK.hoursPerDay * DESK.daysPerWeek * weeks;
}
function deskUsd(weeks) {
	return deskHours(weeks) * DESK.usdPerHour;
}
function usdToInr(usd) {
	return Math.round(usd * DESK.inrPerUsd);
}
var DEFAULT_ESTIMATE = {
	rfqsPerMonth: 40,
	minutesToday: 45,
	minutesWithAi: 8,
	costPerHour: 450,
	setupCost: usdToInr(deskUsd(1))
};
var PROBLEMS = [
	{
		id: "rfq-email",
		label: "Buyers send RFQs by email",
		hint: "Extract specs and draft a quotation",
		sampleKind: "email",
		sample: `From: Lisa Chen <lisa.chen@nordic-home.eu>
To: sales@khannaweaves.in
Subject: RFQ – 12,000 m Cotton Poplin 40s×40s 133×72 – Navy

Dear Khanna Weaves,

Please quote for SS27:

- 100% cotton poplin, 40s × 40s, 133 × 72
- Width 58"
- Reactive dyed, Navy (Pantone 19-4052)
- Quantity: 12,000 metres (2,000 m trial acceptable)
- Finish: soft, slight peach
- Delivery: FOB Nhava Sheva, 45 days from LC
- Also advise CIF Rotterdam

Need handfeel comments and a lab-dip timeline.

Lisa Chen
Nordic Home Textiles, Hamburg`
	},
	{
		id: "sample-whatsapp",
		label: "Sample tracking is a WhatsApp mess",
		hint: "Turn chats into a tracking board",
		sampleKind: "chat",
		sample: `Asha: buyer wants 3 more metres of the peach poplin, shade 2 — Zara lab dip still with dyeing?
Ravi: Zara peach shade 2 is at dyeing, promised Friday. H&M navy poplin couriered yesterday, AWB 176-22341901.
Farah: NYC office asked where is the air shipment for the stripe shirting sample.
Ravi: stripe shirting still waiting for warp. Mill said Tuesday.
Asha: Mango wants a duplicate of last season's 58" cotton satin, off-white, 5 metres. Need it before 20th.`
	},
	{
		id: "export-docs",
		label: "Export documents take a full day",
		hint: "Build the packing list and missing-docs list",
		sampleKind: "notes",
		sample: `Shipment: Nordic Home / Hamburg
Invoice: KW-4521
Cartons: 48
Metres: 12,000 cotton poplin navy, 58", 40s×40s 133×72
Gross wt: 1,860 kg   Net: 1,740 kg
Port: Nhava Sheva    Vessel: tbd
LC: 45 days, FOB
Need: packing list, commercial invoice, COO, packing declaration, form FILL, bill of lading draft.
GST: 09AABCK7781P1Z3
IEC: 0599001234`
	},
	{
		id: "yarn-late",
		label: "Yarn stock is always late",
		hint: "Match orders to yarn position",
		sampleKind: "sheet",
		sample: `Order,Buyer,Yarn,Kg needed,Kg in godown,Arrival,Risk
KW-881,Nordic,40s compact cotton,4200,1800,18-Sep,short
KW-882,Zara,30s combed,2100,2100,in stock,ok
KW-890,H&M,40s slub,1600,400,22-Sep,short
KW-901,Mango,60s compact,900,0,not booked,critical
KW-905,internal,20s carded,3000,3400,in stock,ok`
	},
	{
		id: "followups",
		label: "We miss buyer follow-ups",
		hint: "List overdue quotes and a first chase",
		sampleKind: "notes",
		sample: `Open quotes:
- Nordic Home navy poplin 12,000 m — sent 4 days ago, no reply, Lisa Chen
- Zara peach satin 8,000 m — sent 11 days ago, buyer asked a revision, we didn't resend
- H&M stripe shirting — sent yesterday
- Mango off-white satin — verbal interest, no quote on file
- Local jobber Patel — price only, 21 days old`
	},
	{
		id: "quality-pdf",
		label: "Quality reports sit in PDFs",
		hint: "Pull defects and a mill action list",
		sampleKind: "notes",
		sample: `Inspection: 4-point, lot KW-4521 navy poplin, 2,000 m sample roll set.
Inspector: SITRA-trained, 12-Sep
Points: 18 per 100 m (fail if >20)
Defects: 3 slubs (major), 1 oil stain 8cm (major), 2 missing ends (minor), 1 shade bar at 420 m (major).
Shade: 4.5 vs lab dip, commercial accept.
Width: 57.8" vs 58" declared.
Action requested: isolate roll 7, recut stain, recheck shade bar lot.`
	}
];
var GRAPHS = {
	"rfq-email": {
		title: "Enquiry to quotation",
		nodes: [
			{
				id: "p1",
				column: "process",
				label: "Buyer enquiry",
				detail: "RFQ lands in a shared inbox, often incomplete."
			},
			{
				id: "p2",
				column: "process",
				label: "Costing",
				detail: "Merchandiser hunts yarn, construction, and last similar rate."
			},
			{
				id: "p3",
				column: "process",
				label: "Approval",
				detail: "Owner or GM signs off before anything leaves the mill."
			},
			{
				id: "t1",
				column: "tasks",
				label: "Read the email",
				detail: "Classify RFQ vs noise. Pull buyer, product, quantity, delivery."
			},
			{
				id: "t2",
				column: "tasks",
				label: "Check capability",
				detail: "Match construction, width, finish, and loom type to the mill."
			},
			{
				id: "t3",
				column: "tasks",
				label: "Draft the quote",
				detail: "Rate, validity, lab dip, missing info, incoterms."
			},
			{
				id: "a1",
				column: "ai",
				label: "Extract specs",
				detail: "Structured fields from messy buyer English."
			},
			{
				id: "a2",
				column: "ai",
				label: "Match mill card",
				detail: "Known constructions and last-won rates, never invented prices."
			},
			{
				id: "a3",
				column: "ai",
				label: "Draft, don't send",
				detail: "A quotation the owner can approve, edit, or reject."
			},
			{
				id: "o1",
				column: "outcome",
				label: "Quote in minutes",
				detail: "Same merchandiser. Hours back. No silent send."
			}
		],
		edges: [
			{
				from: "p1",
				to: "t1"
			},
			{
				from: "t1",
				to: "a1"
			},
			{
				from: "p2",
				to: "t2"
			},
			{
				from: "t2",
				to: "a2"
			},
			{
				from: "p3",
				to: "t3"
			},
			{
				from: "t3",
				to: "a3"
			},
			{
				from: "a3",
				to: "o1"
			}
		]
	},
	"sample-whatsapp": {
		title: "Sample desk",
		nodes: [
			{
				id: "p1",
				column: "process",
				label: "Buyer asks",
				detail: "A line in a group chat, often with no sample number."
			},
			{
				id: "p2",
				column: "process",
				label: "Mill chase",
				detail: "Dyeing, weaving, courier — three people, three stories."
			},
			{
				id: "t1",
				column: "tasks",
				label: "Parse the chat",
				detail: "Who asked, which fabric, which shade, by when."
			},
			{
				id: "t2",
				column: "tasks",
				label: "Status board",
				detail: "One row per sample. No scrolling back 400 messages."
			},
			{
				id: "a1",
				column: "ai",
				label: "Entity extract",
				detail: "Buyer, shade, metres, AWB, promise date."
			},
			{
				id: "a2",
				column: "ai",
				label: "Nudge the right person",
				detail: "Draft a chase. A person still sends it."
			},
			{
				id: "o1",
				column: "outcome",
				label: "Nothing lost",
				detail: "Every open sample has an owner and a date."
			}
		],
		edges: [
			{
				from: "p1",
				to: "t1"
			},
			{
				from: "t1",
				to: "a1"
			},
			{
				from: "p2",
				to: "t2"
			},
			{
				from: "t2",
				to: "a2"
			},
			{
				from: "a2",
				to: "o1"
			}
		]
	},
	"export-docs": {
		title: "Docs for a shipment",
		nodes: [
			{
				id: "p1",
				column: "process",
				label: "Invoice pack",
				detail: "Commercial invoice, packing list, COO, BL draft."
			},
			{
				id: "t1",
				column: "tasks",
				label: "Harvest figures",
				detail: "Cartons, weights, construction, GST, IEC."
			},
			{
				id: "t2",
				column: "tasks",
				label: "Missing list",
				detail: "What the CHA will bounce tomorrow morning."
			},
			{
				id: "a1",
				column: "ai",
				label: "Fill the templates",
				detail: "Drafts from the mill's last clean set, not a blank Word file."
			},
			{
				id: "o1",
				column: "outcome",
				label: "Same-day file",
				detail: "Hours, not a full day, before the vessel cutoff."
			}
		],
		edges: [
			{
				from: "p1",
				to: "t1"
			},
			{
				from: "t1",
				to: "a1"
			},
			{
				from: "t2",
				to: "a1"
			},
			{
				from: "a1",
				to: "o1"
			}
		]
	},
	"yarn-late": {
		title: "Yarn vs orders",
		nodes: [
			{
				id: "p1",
				column: "process",
				label: "Position",
				detail: "Godown vs booked vs on the water."
			},
			{
				id: "t1",
				column: "tasks",
				label: "Match kg",
				detail: "Each open order against the count and arrival."
			},
			{
				id: "a1",
				column: "ai",
				label: "Flag the short",
				detail: "Critical first. Suggested cover from mill or trader."
			},
			{
				id: "o1",
				column: "outcome",
				label: "No surprise stop",
				detail: "Weaving does not learn about a shortage on the beam."
			}
		],
		edges: [
			{
				from: "p1",
				to: "t1"
			},
			{
				from: "t1",
				to: "a1"
			},
			{
				from: "a1",
				to: "o1"
			}
		]
	},
	followups: {
		title: "Quote follow-up",
		nodes: [
			{
				id: "p1",
				column: "process",
				label: "Open quotes",
				detail: "Inbox is not a pipeline."
			},
			{
				id: "t1",
				column: "tasks",
				label: "Age them",
				detail: "Days since send, last buyer line, next action."
			},
			{
				id: "a1",
				column: "ai",
				label: "Draft the chase",
				detail: "One specific question, not 'just following up'."
			},
			{
				id: "o1",
				column: "outcome",
				label: "Fewer dead quotes",
				detail: "Merchandiser spends the hour on live ones."
			}
		],
		edges: [
			{
				from: "p1",
				to: "t1"
			},
			{
				from: "t1",
				to: "a1"
			},
			{
				from: "a1",
				to: "o1"
			}
		]
	},
	"quality-pdf": {
		title: "Inspection to action",
		nodes: [
			{
				id: "p1",
				column: "process",
				label: "4-point report",
				detail: "Lives as a PDF in someone's WhatsApp."
			},
			{
				id: "t1",
				column: "tasks",
				label: "Defect table",
				detail: "Major / minor, location, points per 100 m."
			},
			{
				id: "a1",
				column: "ai",
				label: "Action list",
				detail: "Which rolls to isolate, what to tell the buyer."
			},
			{
				id: "o1",
				column: "outcome",
				label: "A decision today",
				detail: "Not a folder of unread reports."
			}
		],
		edges: [
			{
				from: "p1",
				to: "t1"
			},
			{
				from: "t1",
				to: "a1"
			},
			{
				from: "a1",
				to: "o1"
			}
		]
	}
};
var WORKFLOWS = {
	"rfq-email": [
		{
			id: "w1",
			title: "Find the RFQ in the inbox",
			owner: "human",
			todayMinutes: 8,
			aiMinutes: 1,
			detail: "AI classifies. Person still owns the inbox."
		},
		{
			id: "w2",
			title: "Extract specs",
			owner: "ai",
			todayMinutes: 12,
			aiMinutes: 1,
			detail: "Construction, width, colour, delivery, incoterms."
		},
		{
			id: "w3",
			title: "Check mill capability",
			owner: "ai",
			todayMinutes: 10,
			aiMinutes: 1,
			detail: "Known cards only. Missing info is listed, not guessed."
		},
		{
			id: "w4",
			title: "Draft quotation",
			owner: "ai",
			todayMinutes: 10,
			aiMinutes: 2,
			detail: "Rate from last similar. Validity and lab-dip note."
		},
		{
			id: "w5",
			title: "Owner approval",
			owner: "approve",
			todayMinutes: 4,
			aiMinutes: 3,
			detail: "A person must approve. AI does not send."
		},
		{
			id: "w6",
			title: "Log in the book / CRM",
			owner: "ai",
			todayMinutes: 1,
			aiMinutes: 0,
			detail: "Buyer, fabric, rate, status."
		}
	],
	"sample-whatsapp": [
		{
			id: "w1",
			title: "Read the group",
			owner: "human",
			todayMinutes: 15,
			aiMinutes: 2,
			detail: "AI parses. Person still in the group."
		},
		{
			id: "w2",
			title: "Build the board",
			owner: "ai",
			todayMinutes: 20,
			aiMinutes: 2,
			detail: "One row per open sample."
		},
		{
			id: "w3",
			title: "Chase dyeing / courier",
			owner: "approve",
			todayMinutes: 10,
			aiMinutes: 4,
			detail: "Drafted chase, sent by a person."
		}
	],
	"export-docs": [
		{
			id: "w1",
			title: "Collect figures",
			owner: "human",
			todayMinutes: 40,
			aiMinutes: 8,
			detail: "Invoice, cartons, weights, GST."
		},
		{
			id: "w2",
			title: "Fill templates",
			owner: "ai",
			todayMinutes: 80,
			aiMinutes: 10,
			detail: "Packing list and invoice draft."
		},
		{
			id: "w3",
			title: "CHA / owner check",
			owner: "approve",
			todayMinutes: 30,
			aiMinutes: 15,
			detail: "Nothing files without a person."
		}
	],
	"yarn-late": [
		{
			id: "w1",
			title: "Open the sheet",
			owner: "human",
			todayMinutes: 10,
			aiMinutes: 1,
			detail: "Same Excel. AI reads it."
		},
		{
			id: "w2",
			title: "Match kg",
			owner: "ai",
			todayMinutes: 25,
			aiMinutes: 2,
			detail: "Short, ok, critical."
		},
		{
			id: "w3",
			title: "Cover the short",
			owner: "approve",
			todayMinutes: 15,
			aiMinutes: 8,
			detail: "Suggested mill / trader. Person books."
		}
	],
	followups: [
		{
			id: "w1",
			title: "Age the quotes",
			owner: "ai",
			todayMinutes: 20,
			aiMinutes: 2,
			detail: "Days since send, next action."
		},
		{
			id: "w2",
			title: "Draft chases",
			owner: "ai",
			todayMinutes: 20,
			aiMinutes: 3,
			detail: "One specific question each."
		},
		{
			id: "w3",
			title: "Send",
			owner: "approve",
			todayMinutes: 10,
			aiMinutes: 5,
			detail: "Person hits send."
		}
	],
	"quality-pdf": [
		{
			id: "w1",
			title: "Read the report",
			owner: "ai",
			todayMinutes: 20,
			aiMinutes: 2,
			detail: "Points, defects, shade, width."
		},
		{
			id: "w2",
			title: "Action list",
			owner: "ai",
			todayMinutes: 15,
			aiMinutes: 3,
			detail: "Isolate rolls, tell the buyer."
		},
		{
			id: "w3",
			title: "Mill decision",
			owner: "approve",
			todayMinutes: 10,
			aiMinutes: 8,
			detail: "Owner / QM signs."
		}
	]
};
var LAB_DEMOS = [
	{
		id: "email",
		name: "Email",
		blurb: "A buyer RFQ becomes fields and a draft quote. No fake typing.",
		inputLabel: "Buyer email",
		input: PROBLEMS[0].sample,
		problemId: "rfq-email"
	},
	{
		id: "document",
		name: "Document",
		blurb: "Shipment notes become a packing list and a missing-docs list.",
		inputLabel: "Shipment notes",
		input: PROBLEMS[2].sample,
		problemId: "export-docs"
	},
	{
		id: "research",
		name: "Research",
		blurb: "Open quotes, aged. A chase that asks one useful question.",
		inputLabel: "Open quote book",
		input: PROBLEMS[4].sample,
		problemId: "followups"
	},
	{
		id: "spreadsheet",
		name: "Spreadsheet",
		blurb: "Yarn kg vs orders. Shortages first, not a pretty chart.",
		inputLabel: "Yarn position",
		input: PROBLEMS[3].sample,
		problemId: "yarn-late"
	},
	{
		id: "workflow",
		name: "Workflow",
		blurb: "WhatsApp sample desk → a board a merchandiser can run.",
		inputLabel: "Group chat",
		input: PROBLEMS[1].sample,
		problemId: "sample-whatsapp"
	}
];
var AGENTS = [
	{
		id: "quotation",
		name: "Quotation",
		set: "textile",
		mission: "Turn RFQs into approval-ready quotes on the mill's own constructions.",
		tools: [
			"Inbox",
			"Price card",
			"Capacity calendar"
		],
		kpis: ["Cycle 2 days → ~12 minutes", "Zero silent sends"],
		autonomy: "approve",
		watchPath: "/rfq"
	},
	{
		id: "sample-tracking",
		name: "Sample Tracking",
		set: "textile",
		mission: "Keep every open lab dip, duplicate, and courier on one board.",
		tools: [
			"WhatsApp export",
			"Courier AWB",
			"Dyeing notes"
		],
		kpis: ["No sample without an owner", "Promise dates visible"],
		autonomy: "recommend",
		watchPath: "/lab/workflow"
	},
	{
		id: "export-docs",
		name: "Export Docs",
		set: "textile",
		mission: "Draft packing list, invoice, and the list CHA will bounce.",
		tools: [
			"Last clean set",
			"GST / IEC",
			"Carton sheet"
		],
		kpis: ["File same day", "Missing docs before cutoff"],
		autonomy: "approve",
		watchPath: "/lab/document"
	},
	{
		id: "rfq-classifier",
		name: "RFQ Classifier",
		set: "office",
		mission: "Sort the shared inbox: RFQ, follow-up, spam, payment.",
		tools: ["Mailbox", "Buyer list"],
		kpis: ["First sort under a minute", "Nothing important unmarked"],
		autonomy: "assist",
		watchPath: "/lab/email"
	},
	{
		id: "yarn-position",
		name: "Yarn Position",
		set: "mill",
		mission: "Match open orders to godown, arrivals, and unbooked count.",
		tools: ["Stock sheet", "PO book"],
		kpis: ["Shortages before the beam", "Critical list daily"],
		autonomy: "recommend",
		watchPath: "/lab/spreadsheet"
	},
	{
		id: "buyer-followup",
		name: "Buyer Follow-up",
		set: "office",
		mission: "Age open quotes and draft one specific chase each.",
		tools: ["Quote log", "Sent mail"],
		kpis: ["No quote older than 7 days unchased"],
		autonomy: "approve",
		watchPath: "/lab/research"
	},
	{
		id: "quality-report",
		name: "Quality Report",
		set: "mill",
		mission: "Turn 4-point PDFs into a defect table and mill actions.",
		tools: ["Inspection PDF", "Lot book"],
		kpis: ["Decision the same shift"],
		autonomy: "recommend",
		watchPath: "/run"
	},
	{
		id: "packing-list",
		name: "Packing List",
		set: "textile",
		mission: "Cartons, weights, and construction on the mill's template.",
		tools: ["Carton sheet", "Invoice"],
		kpis: ["Draft in minutes, person files"],
		autonomy: "approve",
		watchPath: "/lab/document"
	},
	{
		id: "capacity",
		name: "Capacity Planner",
		set: "mill",
		mission: "See whether 12,000 m in 45 days fits the looms already booked.",
		tools: ["Loom board", "Order book"],
		kpis: ["No yes that the mill cannot hold"],
		autonomy: "recommend",
		watchPath: "/rfq"
	},
	{
		id: "price-watch",
		name: "Price Watch",
		set: "office",
		mission: "Surface last similar rate. Never invent a number.",
		tools: ["Won/lost book", "Yarn index"],
		kpis: ["Every draft cites a source rate"],
		autonomy: "assist",
		watchPath: "/rfq"
	},
	{
		id: "inspection",
		name: "Inspection Scheduler",
		set: "mill",
		mission: "Book internal 4-point before the buyer QAM lands.",
		tools: ["Lot calendar", "QM roster"],
		kpis: ["No lot ships uninspected"],
		autonomy: "recommend",
		watchPath: "/cases"
	},
	{
		id: "invoice-match",
		name: "Invoice Matcher",
		set: "office",
		mission: "Match buyer PO, mill invoice, and packing list line by line.",
		tools: [
			"PO",
			"Invoice",
			"PL"
		],
		kpis: ["Mismatches before the CHA"],
		autonomy: "assist",
		watchPath: "/lab/document"
	},
	{
		id: "whatsapp-inbox",
		name: "WhatsApp Inbox",
		set: "office",
		mission: "Turn the mill group into tasks, not a second job.",
		tools: ["Chat export"],
		kpis: ["Open loops listed each morning"],
		autonomy: "assist",
		watchPath: "/lab/workflow"
	},
	{
		id: "compliance",
		name: "Mill Compliance",
		set: "mill",
		mission: "Keep GST, IEC, COO, and social-audit dates where someone will see them.",
		tools: ["Certificate folder", "Calendar"],
		kpis: ["No expired paper at stuffing"],
		autonomy: "recommend",
		watchPath: "/workspace"
	},
	{
		id: "shade-band",
		name: "Shade Band",
		set: "textile",
		mission: "Flag shade bars and off-dip lots before they reach the buyer.",
		tools: ["Lab dip", "Inspection"],
		kpis: ["Shade issues same day"],
		autonomy: "recommend",
		watchPath: "/run"
	},
	{
		id: "delivery-promise",
		name: "Delivery Promise",
		set: "office",
		mission: "Only let a 45-day FOB leave the mill if capacity says so.",
		tools: ["Capacity", "Yarn arrivals"],
		kpis: ["Promises the mill can keep"],
		autonomy: "approve",
		watchPath: "/rfq"
	}
];
var CASES = [
	{
		id: "khanna",
		mill: "Khanna Weaves Pvt. Ltd.",
		place: "Panipat",
		problem: "RFQs sat in a shared inbox. Quotes took two days and still missed fields.",
		before: "45 minutes a quote, ~40 RFQs a month, follow-up by memory.",
		after: "Extract + draft in minutes. Owner still approves every send.",
		evidence: "12,000 m navy poplin RFQ → structured specs, missing-info list, draft quote on mill card.",
		runId: "rfq-email"
	},
	{
		id: "mehta",
		mill: "Mehta Knit Exports",
		place: "Tiruppur",
		problem: "Export docs were a full-day scramble before Nhava Sheva cutoff.",
		before: "Invoice, packing list, and COO typed by hand from three notebooks.",
		after: "Draft pack the same morning. CHA still files.",
		evidence: "Shipment KW-4521: 48 cartons, weights, GST/IEC, missing-docs list.",
		runId: "export-docs"
	},
	{
		id: "rao",
		mill: "Rao Dyeing & Finishing",
		place: "Surat",
		problem: "4-point PDFs lived in WhatsApp. Shade bars were found by the buyer.",
		before: "QM read reports at night. Actions the next afternoon.",
		after: "Defect table and isolate-roll list the same shift.",
		evidence: "Lot KW-4521: 18 points/100 m, shade bar at 420 m, roll 7 isolated.",
		runId: "quality-pdf"
	}
];
var AUTONOMY_COPY = {
	assist: {
		label: "Assist",
		line: "AI prepares. A person does the work."
	},
	recommend: {
		label: "Recommend",
		line: "AI suggests. A person chooses."
	},
	approve: {
		label: "Act with approval",
		line: "AI drafts the action. A person must approve."
	},
	guarded: {
		label: "Guarded autonomy",
		line: "AI acts inside a fence. Out of bounds, it stops."
	}
};
var READINESS_QUESTIONS = [
	{
		id: "q1",
		prompt: "How do RFQs usually arrive?",
		options: [
			{
				id: "a",
				label: "One shared inbox we actually open",
				score: 3
			},
			{
				id: "b",
				label: "A mix of inbox, WhatsApp, and verbal",
				score: 2
			},
			{
				id: "c",
				label: "Whoever the buyer has on phone",
				score: 1
			}
		]
	},
	{
		id: "q2",
		prompt: "Who prices a quote today?",
		options: [
			{
				id: "a",
				label: "A written card or ERP rate",
				score: 3
			},
			{
				id: "b",
				label: "Merchandiser plus owner, from memory of last similar",
				score: 2
			},
			{
				id: "c",
				label: "Only the owner, when they have time",
				score: 1
			}
		]
	},
	{
		id: "q3",
		prompt: "Where does the price list live?",
		options: [
			{
				id: "a",
				label: "Excel or ERP we can export",
				score: 3
			},
			{
				id: "b",
				label: "A notebook and some sheets",
				score: 2
			},
			{
				id: "c",
				label: "In someone's head",
				score: 1
			}
		]
	},
	{
		id: "q4",
		prompt: "Who must approve a quote before it leaves?",
		options: [
			{
				id: "a",
				label: "Named person, every time",
				score: 3
			},
			{
				id: "b",
				label: "Usually the owner, sometimes skipped when busy",
				score: 2
			},
			{
				id: "c",
				label: "Whoever is at the desk",
				score: 1
			}
		]
	},
	{
		id: "q5",
		prompt: "Do you have 90 days of won and lost quotes?",
		options: [
			{
				id: "a",
				label: "Yes, in a sheet",
				score: 3
			},
			{
				id: "b",
				label: "In mail, if we search",
				score: 2
			},
			{
				id: "c",
				label: "No",
				score: 1
			}
		]
	},
	{
		id: "q6",
		prompt: "What is the system of record?",
		options: [
			{
				id: "a",
				label: "ERP or a quote book",
				score: 3
			},
			{
				id: "b",
				label: "Email",
				score: 2
			},
			{
				id: "c",
				label: "WhatsApp",
				score: 1
			}
		]
	}
];
var SEARCH_INDEX = [
	{
		id: "s-home",
		title: "Give AI the work",
		kind: "page",
		blurb: "One box. A problem, an email, a file, or a website.",
		href: "/",
		tags: [
			"home",
			"start",
			"rfq"
		]
	},
	{
		id: "s-rfq",
		title: "RFQ to quotation",
		kind: "demo",
		blurb: "Flagship: enquiry → specs → capability → quote → approval → CRM.",
		href: "/rfq",
		tags: [
			"rfq",
			"quote",
			"email",
			"flagship"
		]
	},
	{
		id: "s-lab",
		title: "Capability Lab",
		kind: "demo",
		blurb: "Email, document, research, spreadsheet, workflow.",
		href: "/lab",
		tags: ["lab", "demo"]
	},
	...LAB_DEMOS.map((d) => ({
		id: `s-lab-${d.id}`,
		title: `${d.name} demo`,
		kind: "demo",
		blurb: d.blurb,
		href: `/lab/${d.id}`,
		tags: [
			d.id,
			d.name.toLowerCase(),
			d.problemId
		]
	})),
	...AGENTS.map((a) => ({
		id: `s-ag-${a.id}`,
		title: `${a.name} agent`,
		kind: "agent",
		blurb: a.mission,
		href: `/workforce/${a.id}`,
		tags: [
			a.name.toLowerCase(),
			a.set,
			...a.tools.map((t) => t.toLowerCase())
		]
	})),
	...CASES.map((c) => ({
		id: `s-case-${c.id}`,
		title: c.mill,
		kind: "case",
		blurb: c.problem,
		href: `/cases#${c.id}`,
		tags: [
			c.place.toLowerCase(),
			c.runId,
			"case"
		]
	})),
	{
		id: "s-wf-quote",
		title: "Today vs with AI — quotations",
		kind: "workflow",
		blurb: "Human, AI, and the approval gate on the quote path.",
		href: "/run?step=workflow",
		tags: [
			"workflow",
			"slider",
			"approval"
		]
	},
	{
		id: "s-builder",
		title: "Agent builder",
		kind: "page",
		blurb: "Role, knowledge, tools, four autonomy levels.",
		href: "/builder",
		tags: ["builder", "autonomy"]
	},
	{
		id: "s-approval",
		title: "Approval simulator",
		kind: "page",
		blurb: "Approve, edit, reject, or escalate a drafted buyer reply.",
		href: "/approval",
		tags: [
			"approval",
			"control",
			"human"
		]
	},
	{
		id: "s-ready",
		title: "AI readiness check",
		kind: "page",
		blurb: "Six questions. A score. A 90-day roadmap.",
		href: "/readiness",
		tags: [
			"quiz",
			"readiness",
			"roadmap"
		]
	},
	{
		id: "s-ws",
		title: "Mill workspace",
		kind: "page",
		blurb: "Agents, approvals, audit log. Sandbox, not production.",
		href: "/workspace",
		tags: [
			"workspace",
			"audit",
			"login"
		]
	},
	{
		id: "s-co",
		title: "PrivacyByAI",
		kind: "page",
		blurb: "Privacy-first company. Offline LLMs and careful cloud. Founded 2024 by Sanskar.",
		href: "/company",
		tags: [
			"company",
			"about",
			"founder",
			"privacybyai"
		]
	},
	{
		id: "s-svc",
		title: "Services — offline, hybrid, cloud",
		kind: "page",
		blurb: "Privacy-based local LLM, hybrid fence, or hosted desk. Mill still approves.",
		href: "/services",
		tags: [
			"offline",
			"llm",
			"air-gap",
			"hybrid",
			"cloud",
			"services"
		]
	},
	{
		id: "s-priv",
		title: "Privacy policy",
		kind: "page",
		blurb: "No training on your book. Offline first. Synthetic labelled.",
		href: "/privacy",
		tags: [
			"privacy",
			"policy",
			"gdpr",
			"training"
		]
	},
	{
		id: "s-sec",
		title: "Security & data path",
		kind: "page",
		blurb: "Air-gap, on-prem, no-train inference, approval fence, audit.",
		href: "/security",
		tags: [
			"security",
			"it",
			"airgap",
			"keys"
		]
	},
	{
		id: "s-ct",
		title: "Contact the desk",
		kind: "page",
		blurb: "Ask for an offline install or a fenced cloud job.",
		href: "/contact",
		tags: [
			"contact",
			"install",
			"whatsapp"
		]
	}
];
function graphFor(problemId) {
	return GRAPHS[problemId] ?? GRAPHS["rfq-email"];
}
function workflowFor(problemId) {
	return WORKFLOWS[problemId] ?? WORKFLOWS["rfq-email"];
}
function problemById(id) {
	return PROBLEMS.find((p) => p.id === id) ?? PROBLEMS[0];
}
//#endregion
export { DESK as a, PROBLEMS as c, deskUsd as d, graphFor as f, workflowFor as h, DEFAULT_ESTIMATE as i, READINESS_QUESTIONS as l, usdToInr as m, AUTONOMY_COPY as n, JOURNEY_STEPS as o, problemById as p, CASES as r, LAB_DEMOS as s, AGENTS as t, SEARCH_INDEX as u };
