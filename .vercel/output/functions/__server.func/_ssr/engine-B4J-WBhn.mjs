import { c as PROBLEMS, f as graphFor, h as workflowFor, p as problemById } from "./catalog-tDitttoK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/engine-B4J-WBhn.js
function pick(text, re, g = 1) {
	return text.match(re)?.[g]?.trim() ?? "";
}
function has(text, ...needles) {
	const t = text.toLowerCase();
	return needles.some((n) => t.includes(n.toLowerCase()));
}
function detectProblemId(input) {
	if (input.mode === "chip" && input.problemId && PROBLEMS.some((p) => p.id === input.problemId)) return input.problemId;
	const t = `${input.text} ${input.fileName ?? ""} ${input.website ?? ""}`.toLowerCase();
	if (has(t, "rfq", "quote", "poplin", "incoterm", "fob", "cif", "metres", "meters")) return "rfq-email";
	if (has(t, "whatsapp", "awb", "lab dip", "sample")) return "sample-whatsapp";
	if (has(t, "packing", "carton", "iec", "gst", "bill of lading", "coo")) return "export-docs";
	if (has(t, "yarn", "godown", "kg needed", "combed", "compact")) return "yarn-late";
	if (has(t, "follow", "open quote", "days ago")) return "followups";
	if (has(t, "4-point", "defect", "shade", "inspection")) return "quality-pdf";
	if (input.mode === "website") return "rfq-email";
	return "rfq-email";
}
function missionFor(id) {
	const common = {
		"rfq-email": [
			"Read the enquiry",
			"Extract specifications",
			"Check mill capability",
			"List missing information",
			"Draft quotation",
			"Hold for owner approval"
		],
		"sample-whatsapp": [
			"Read the chat",
			"Identify open samples",
			"Attach status and owner",
			"Draft chases"
		],
		"export-docs": [
			"Read shipment notes",
			"Harvest figures",
			"Draft packing list",
			"List documents still missing"
		],
		"yarn-late": [
			"Read the position sheet",
			"Match kg to orders",
			"Rank shortages",
			"Suggest cover"
		],
		followups: [
			"Read the quote book",
			"Age each open quote",
			"Draft a specific chase"
		],
		"quality-pdf": [
			"Read the inspection",
			"Tabulate defects",
			"Flag rolls",
			"Draft mill actions"
		]
	};
	return (common[id] ?? common["rfq-email"]).map((label, i) => ({
		id: `m${i + 1}`,
		label,
		status: "pending"
	}));
}
function rfqFields(text) {
	const qty = pick(text, /(\d[\d,]*)\s*(?:m|metres|meters|mtrs)\b/i) || pick(text, /quantity[:\s]+([^\n]+)/i);
	const construction = pick(text, /(\d{2}s?\s*[x×]\s*\d{2}s?[^\n,]{0,20}\d{2,3}\s*[x×]\s*\d{2,3})/i) || pick(text, /(\d{2}s\s*[x×]\s*\d{2}s)/i);
	const width = pick(text, /(\d{2}(?:\.\d)?\s*")/);
	const colour = pick(text, /(?:navy|peach|off-white|white|black|indigo|beige)[^,\n]*/i) || pick(text, /pantone\s+[0-9-]+/i);
	const fibre = pick(text, /(100%\s*cotton|cotton poplin|polyester|viscose|linen|satin|shirting)/i);
	const incoterm = pick(text, /\b(FOB[^\n,]*|CIF[^\n,]*)/i);
	const delivery = pick(text, /(\d+\s*days?[^.\n]*)/i);
	const buyer = pick(text, /From:\s*([^\n<]+)/i) || pick(text, /(Nordic Home|Zara|H&M|Mango)[^\n]*/i);
	const port = pick(text, /(Nhava Sheva|Mundra|Chennai|Tuticorin|Hamburg|Rotterdam)/i);
	return [
		{
			label: "Buyer",
			value: buyer || "Not stated"
		},
		{
			label: "Product",
			value: fibre || "Not stated"
		},
		{
			label: "Construction",
			value: construction || "Not stated"
		},
		{
			label: "Width",
			value: width || "Not stated"
		},
		{
			label: "Colour",
			value: colour || "Not stated"
		},
		{
			label: "Quantity",
			value: qty ? `${qty.replace(/,/g, "")} m` : "Not stated"
		},
		{
			label: "Delivery",
			value: delivery || "Not stated"
		},
		{
			label: "Incoterms / port",
			value: [incoterm, port].filter(Boolean).join(" · ") || "Not stated"
		}
	];
}
function missingFrom(fields) {
	const miss = [];
	for (const f of fields) if (f.value === "Not stated") miss.push(f.label);
	const joined = fields.map((f) => f.value).join(" ").toLowerCase();
	if (!joined.includes("lab dip") && !joined.includes("shade")) miss.push("Lab-dip / shade standard");
	if (!joined.includes("lc") && !joined.includes("payment")) miss.push("Payment term");
	return [...new Set(miss)];
}
function quoteArtifact(fields) {
	const qty = Number(pick(fields.find((f) => f.label === "Quantity")?.value ?? "", /(\d+)/) || 12e3);
	const rate = 185;
	const amount = qty * rate;
	return {
		type: "quote",
		title: "Draft quotation — hold for approval",
		rows: [
			{
				label: "Quality",
				value: fields.find((f) => f.label === "Product")?.value || "Cotton poplin"
			},
			{
				label: "Construction",
				value: fields.find((f) => f.label === "Construction")?.value || "40s × 40s, 133 × 72"
			},
			{
				label: "Width",
				value: fields.find((f) => f.label === "Width")?.value || "58\""
			},
			{
				label: "Colour",
				value: fields.find((f) => f.label === "Colour")?.value || "Navy"
			},
			{
				label: "Quantity",
				value: `${qty.toLocaleString("en-IN")} m`
			},
			{
				label: "Rate (ex-mill, illustrative)",
				value: `₹${rate} / m`
			},
			{
				label: "Amount",
				value: `₹${amount.toLocaleString("en-IN")}`
			},
			{
				label: "Validity",
				value: "15 days"
			},
			{
				label: "Lead time",
				value: fields.find((f) => f.label === "Delivery")?.value || "45 days from LC"
			},
			{
				label: "Lab dip",
				value: "7 working days after shade standard"
			}
		],
		notes: [
			"Rate is from the last similar poplin card, not a live ERP fetch.",
			"FOB Nhava Sheva. CIF Rotterdam on request after freight.",
			"Nothing is sent until a person approves."
		]
	};
}
function sampleBoard(text) {
	const rows = [];
	const blob = text.split("\n").map((l) => l.trim()).filter(Boolean).join(" | ");
	if (has(blob, "zara", "peach")) rows.push([
		"Zara peach poplin, shade 2",
		"Dyeing",
		"Ravi",
		"Friday",
		"High"
	]);
	if (has(blob, "h&m", "navy")) rows.push([
		"H&M navy poplin",
		"Couriered",
		"Ravi",
		"AWB 176-22341901",
		"Watch"
	]);
	if (has(blob, "nyc", "stripe")) rows.push([
		"NYC stripe shirting",
		"Waiting for warp",
		"Farah",
		"Tuesday",
		"High"
	]);
	if (has(blob, "mango", "satin")) rows.push([
		"Mango cotton satin, off-white, 5 m",
		"Duplicate not started",
		"Asha",
		"Before 20th",
		"High"
	]);
	if (rows.length === 0) rows.push([
		"Unparsed sample line",
		"Open",
		"Desk",
		"—",
		"Check"
	]);
	return {
		type: "table",
		title: "Open sample board",
		columns: [
			"Sample",
			"Status",
			"Owner",
			"Promise",
			"Risk"
		],
		rows
	};
}
function exportPack(text) {
	return [{
		type: "table",
		title: "Packing list draft",
		columns: [
			"Line",
			"Description",
			"Qty",
			"Pkgs",
			"Net kg",
			"Gross kg"
		],
		rows: [[
			"1",
			pick(text, /((?:cotton|poplin)[^\n]*)/i) || "Cotton poplin navy 58\"",
			pick(text, /(\d[\d,]*).{0,12}(?:m|metres)/i) || "12,000 m",
			pick(text, /cartons?:\s*(\d+)/i) || "48",
			pick(text, /net:\s*([\d,]+)/i) || "1,740",
			pick(text, /gross wt:\s*([\d,]+)/i) || "1,860"
		]]
	}, {
		type: "missing",
		title: "Still needed before CHA",
		items: [
			has(text, "bill of lading", "bl") ? "Bill of lading draft — vessel tbd" : "Bill of lading draft",
			has(text, "coo") ? "Certificate of origin" : "Certificate of origin",
			"Packing declaration signed",
			has(text, "form") ? "Form FILL" : "Form FILL / SDF"
		]
	}];
}
function yarnTable(text) {
	const rows = [];
	for (const line of text.split("\n")) {
		if (line.startsWith("Order") || !line.includes(",")) continue;
		const p = line.split(",").map((s) => s.trim());
		if (p.length >= 7) rows.push([
			p[0],
			p[1],
			p[2],
			p[3],
			p[4],
			p[5],
			p[6]
		]);
	}
	if (rows.length === 0) rows.push([
		"KW-881",
		"Nordic",
		"40s compact",
		"4,200",
		"1,800",
		"18-Sep",
		"short"
	]);
	return {
		type: "table",
		title: "Yarn vs orders",
		columns: [
			"Order",
			"Buyer",
			"Yarn",
			"Need kg",
			"Godown",
			"Arrival",
			"Risk"
		],
		rows
	};
}
function followTable(text) {
	const rows = [];
	for (const line of text.split("\n")) {
		if (!line.trim().startsWith("-")) continue;
		const body = line.replace(/^-+\s*/, "");
		const days = pick(body, /(\d+)\s*days?/i) || (body.toLowerCase().includes("yesterday") ? "1" : "—");
		const buyer = pick(body, /(Nordic Home|Zara|H&M|Mango|Patel)/i) || "Buyer";
		rows.push([
			buyer,
			body.slice(0, 72),
			`${days}d`,
			days !== "—" && Number(days) >= 7 ? "Chase now" : "Watch"
		]);
	}
	if (rows.length === 0) rows.push([
		"Nordic Home",
		"Navy poplin quote",
		"4d",
		"Watch"
	]);
	return {
		type: "table",
		title: "Open quotes",
		columns: [
			"Buyer",
			"Item",
			"Age",
			"Next"
		],
		rows
	};
}
function qualityTable(text) {
	return [{
		type: "table",
		title: "Defects",
		columns: [
			"Defect",
			"Grade",
			"Note"
		],
		rows: [
			[
				"Slubs × 3",
				"Major",
				pick(text, /(3 slubs[^,\n]*)/i) || "Major"
			],
			[
				"Oil stain 8 cm",
				"Major",
				"Recut"
			],
			[
				"Missing ends × 2",
				"Minor",
				"Watch"
			],
			[
				"Shade bar at 420 m",
				"Major",
				"Isolate lot"
			]
		]
	}, {
		type: "missing",
		title: "Mill actions",
		items: [
			"Isolate roll 7",
			"Recut oil stain",
			"Recheck shade-bar lot before stuffing",
			"Width 57.8\" vs 58\" — commercial accept, note on invoice"
		]
	}];
}
function filledMission(id, fields, engine) {
	const steps = missionFor(id);
	const buyer = fields.find((f) => /buyer|open/i.test(f.label))?.value;
	return steps.map((s, i) => ({
		...s,
		status: "done",
		source: engine === "ai" ? "xAI + mill rules" : engine === "sample" ? "Labelled sample" : "Mill rules engine",
		confidence: Math.max(.68, .94 - i * .04),
		input: i === 0 ? "Buyer text as given" : void 0,
		output: i === 0 ? buyer : i === 1 ? fields.slice(0, 4).map((f) => f.value).filter((v) => v !== "Not stated").join(" · ") : void 0
	}));
}
function confidenceOf(fields) {
	const known = fields.filter((f) => f.value && f.value !== "Not stated").length;
	return Math.min(.95, .45 + known / Math.max(fields.length, 1) * .5);
}
function runRulesEngine(input, opts) {
	const problemId = detectProblemId(input);
	const problem = problemById(problemId);
	const text = input.text.trim() || problem.sample;
	const synthetic = Boolean(opts?.synthetic || !input.text.trim());
	const engine = opts?.engine ?? (opts?.fallbackReason ? "sample" : "rules");
	let fields = [];
	let artifacts = [];
	let title = problem.hint;
	let summary = "";
	if (problemId === "rfq-email") {
		fields = rfqFields(text);
		const missing = missingFrom(fields);
		artifacts = [quoteArtifact(fields)];
		if (missing.length) artifacts.push({
			type: "missing",
			title: "Ask the buyer before locking the rate",
			items: missing
		});
		artifacts.push({
			type: "draft",
			title: "Reply to buyer — not sent",
			body: `Dear ${fields.find((f) => f.label === "Buyer")?.value || "Buyer"},\n\nThank you for the RFQ. Please find our draft quotation attached for your ${fields.find((f) => f.label === "Product")?.value || "fabric"}, ${fields.find((f) => f.label === "Quantity")?.value}. Lab dip in 7 working days after shade standard. Validity 15 days.\n\nThis will go out only after our owner approves.\n\nRegards,\nKhanna Weaves`
		});
		title = "RFQ extracted. Draft quotation ready to approve.";
		summary = "Specs pulled from the enquiry. Rate is illustrative from the last similar poplin card. A person still sends it.";
	} else if (problemId === "sample-whatsapp") {
		artifacts = [sampleBoard(text)];
		fields = [{
			label: "Open samples",
			value: String(artifacts[0].rows.length)
		}, {
			label: "Source",
			value: "WhatsApp group export"
		}];
		artifacts.push({
			type: "draft",
			title: "Chase for dyeing — not sent",
			body: "Ravi — need a Friday confirmation on Zara peach shade 2, and a warp date for the NYC stripe shirting. I'll update Asha and Farah once you reply."
		});
		title = "Chat folded into a sample board.";
		summary = "Each open sample has a status, owner, and promise. Chases are drafted, not sent.";
	} else if (problemId === "export-docs") {
		artifacts = exportPack(text);
		fields = [
			{
				label: "Invoice",
				value: pick(text, /invoice:\s*([^\n]+)/i) || "KW-4521"
			},
			{
				label: "Cartons",
				value: pick(text, /cartons?:\s*(\d+)/i) || "48"
			},
			{
				label: "Port",
				value: pick(text, /(Nhava Sheva|Mundra)/i) || "Nhava Sheva"
			},
			{
				label: "GST",
				value: pick(text, /GST:\s*([A-Z0-9]+)/i) || "—"
			},
			{
				label: "IEC",
				value: pick(text, /IEC:\s*([0-9]+)/i) || "—"
			}
		];
		title = "Packing list drafted. Missing docs listed.";
		summary = "Figures harvested from the shipment note. CHA still files. Vessel is still tbd.";
	} else if (problemId === "yarn-late") {
		artifacts = [yarnTable(text)];
		const table = artifacts[0];
		const shorts = table.rows.filter((r) => /short|critical/i.test(r[6] ?? "")).length;
		fields = [{
			label: "Orders read",
			value: String(table.rows.length)
		}, {
			label: "Short / critical",
			value: String(shorts)
		}];
		title = "Yarn position matched to open orders.";
		summary = `${shorts} orders are short. Cover is suggested, not booked.`;
	} else if (problemId === "followups") {
		artifacts = [followTable(text)];
		artifacts.push({
			type: "draft",
			title: "Chase — Zara peach satin (not sent)",
			body: "Hi — following your note on the peach satin revision. Confirming width 58\" and the peach shade 2 lab dip. We can resend the quote this afternoon if those two hold."
		});
		fields = [{
			label: "Open quotes",
			value: String(artifacts[0].rows.length)
		}];
		title = "Overdue quotes listed. First chase drafted.";
		summary = "One specific question per chase. A person still hits send.";
	} else {
		artifacts = qualityTable(text);
		fields = [
			{
				label: "Lot",
				value: pick(text, /lot\s+([A-Z0-9-]+)/i) || "KW-4521"
			},
			{
				label: "Points / 100 m",
				value: pick(text, /(\d+)\s*per 100/i) || "18"
			},
			{
				label: "Shade vs dip",
				value: pick(text, /shade:\s*([^\n]+)/i) || "4.5, commercial accept"
			}
		];
		title = "Inspection folded into defects and actions.";
		summary = "Roll 7 isolated on paper. QM still decides.";
	}
	const used = [
		input.mode === "file" && input.fileName ? `File: ${input.fileName}` : null,
		input.mode === "website" && input.website ? `Site: ${input.website}` : null,
		input.mode === "email" || input.mode === "chip" ? "Pasted / selected text" : "Provided text",
		"Mill construction card (illustrative)"
	].filter(Boolean);
	return {
		engine,
		badge: synthetic ? "Demo" : "Sandbox",
		synthetic,
		confidence: confidenceOf(fields),
		title,
		summary,
		problemId,
		fields,
		artifacts,
		sources: [
			engine === "ai" ? "xAI Grok (server-side)" : "Built-in mill rules",
			"Last similar construction card",
			synthetic ? "Labelled sample input" : "Your input"
		],
		assumptions: [
			"Rates and timelines are illustrative, not a live ERP fetch.",
			"AI never sends mail or files a document.",
			"A named person approves every outbound action."
		],
		dataUsed: used,
		mission: filledMission(problemId, fields, engine),
		map: graphFor(problemId),
		workflow: workflowFor(problemId),
		fallbackReason: opts?.fallbackReason
	};
}
function labelledSample(problemId = "rfq-email") {
	return runRulesEngine({
		mode: "chip",
		problemId,
		text: problemById(problemId).sample
	}, {
		synthetic: true,
		engine: "sample",
		fallbackReason: "Could not use that input. This is a labelled sample of the same job."
	});
}
//#endregion
export { runRulesEngine as n, labelledSample as t };
