import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { n as runRulesEngine, t as labelledSample } from "./engine-B4J-WBhn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-uaeEwVZo.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var MAX_CHARS = 4e3;
function stripHtml(html) {
	return html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, MAX_CHARS);
}
async function fetchSite(url) {
	try {
		const u = new URL(url);
		if (!/^https?:$/.test(u.protocol)) return {
			text: "",
			error: "Only http(s) websites."
		};
		const ctrl = new AbortController();
		const t = setTimeout(() => ctrl.abort(), 8e3);
		const res = await fetch(u.toString(), {
			signal: ctrl.signal,
			headers: { "User-Agent": "Millhand/1.0 (read-only mill site check)" },
			redirect: "follow"
		});
		clearTimeout(t);
		if (!res.ok) return {
			text: "",
			error: `Site returned ${res.status}`
		};
		return { text: stripHtml(await res.text()) };
	} catch {
		return {
			text: "",
			error: "Could not read that website."
		};
	}
}
function extractJson(raw) {
	const body = raw.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1] ?? raw;
	const start = body.indexOf("{");
	const end = body.lastIndexOf("}");
	if (start < 0 || end <= start) return null;
	try {
		return JSON.parse(body.slice(start, end + 1));
	} catch {
		return null;
	}
}
async function refineWithGrok(input, rules) {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return null;
	const ctrl = new AbortController();
	const timer = setTimeout(() => ctrl.abort(), 12e3);
	try {
		const res = await fetch("https://api.x.ai/v1/chat/completions", {
			method: "POST",
			signal: ctrl.signal,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				model: "grok-4.5",
				temperature: .2,
				max_tokens: 900,
				messages: [{
					role: "system",
					content: "You help Indian textile mill owners. Return ONLY JSON with keys: title, summary, fields (array of {label,value}), artifacts (array of {type: quote|table|draft|missing, title, rows?, columns?, notes?, body?, items?}). Do not invent prices as live ERP. Mark unknowns as Not stated. Never claim the email was sent."
				}, {
					role: "user",
					content: `Problem: ${input.problemId}\nText:\n${input.text.slice(0, MAX_CHARS)}\n\nRules engine already found:\n${JSON.stringify({
						title: rules.title,
						fields: rules.fields
					})}`
				}]
			})
		});
		if (!res.ok) return null;
		const parsed = extractJson((await res.json()).choices?.[0]?.message?.content ?? "");
		if (!parsed) return null;
		return {
			...rules,
			engine: "ai",
			badge: rules.synthetic ? "Demo" : "Sandbox",
			title: typeof parsed.title === "string" ? parsed.title : rules.title,
			summary: typeof parsed.summary === "string" ? parsed.summary : rules.summary,
			fields: Array.isArray(parsed.fields) && parsed.fields.length ? parsed.fields : rules.fields,
			artifacts: Array.isArray(parsed.artifacts) && parsed.artifacts.length ? parsed.artifacts : rules.artifacts,
			sources: ["xAI Grok (server-side, no training on uploads)", ...rules.sources.slice(1)],
			dataUsed: [...rules.dataUsed, "Short text snippet only — file bytes never sent"]
		};
	} catch {
		return null;
	} finally {
		clearTimeout(timer);
	}
}
var processWork_createServerFn_handler = createServerRpc({
	id: "4714ca318d3df1fd32a97cabf031337efa7b6911933a67e7cdfa3012565cbc13",
	name: "processWork",
	filename: "src/lib/ai.ts"
}, (opts) => processWork.__executeServer(opts));
var processWork = createServerFn({ method: "POST" }).validator((input) => input).handler(processWork_createServerFn_handler, async ({ data }) => {
	const input = {
		...data,
		text: (data.text ?? "").slice(0, MAX_CHARS)
	};
	if (input.mode === "website" && input.website) {
		const site = await fetchSite(input.website);
		if (site.error || site.text.length < 40) return {
			...labelledSample(input.problemId || "rfq-email"),
			fallbackReason: site.error || "Site had too little readable text. Labelled sample below."
		};
		input.text = `Website: ${input.website}\n${site.text}`;
	}
	if (!input.text.trim()) return labelledSample(input.problemId || "rfq-email");
	const rules = runRulesEngine(input);
	if (rules.confidence >= .78) return rules;
	return await refineWithGrok(input, rules) ?? rules;
});
//#endregion
export { processWork_createServerFn_handler };
