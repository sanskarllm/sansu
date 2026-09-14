import { createServerFn } from "@tanstack/react-start";
import { labelledSample, runRulesEngine } from "./engine";
import type { WorkInput, WorkResult } from "./types";

const MAX_CHARS = 4000;

function stripHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, MAX_CHARS);
}

async function fetchSite(url: string): Promise<{ text: string; error?: string }> {
  try {
    const u = new URL(url);
    if (!/^https?:$/.test(u.protocol)) return { text: "", error: "Only http(s) websites." };
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 8000);
    const res = await fetch(u.toString(), {
      signal: ctrl.signal,
      headers: { "User-Agent": "Millhand/1.0 (read-only mill site check)" },
      redirect: "follow",
    });
    clearTimeout(t);
    if (!res.ok) return { text: "", error: `Site returned ${res.status}` };
    const html = await res.text();
    return { text: stripHtml(html) };
  } catch {
    return { text: "", error: "Could not read that website." };
  }
}

function extractJson(raw: string): Partial<WorkResult> | null {
  const fence = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  const body = fence?.[1] ?? raw;
  const start = body.indexOf("{");
  const end = body.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  try {
    return JSON.parse(body.slice(start, end + 1)) as Partial<WorkResult>;
  } catch {
    return null;
  }
}

async function refineWithGrok(input: WorkInput, rules: WorkResult): Promise<WorkResult | null> {
  const apiKey = process.env.XAI_API_KEY;
  if (!apiKey) return null;

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 12000);
  try {
    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      signal: ctrl.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        temperature: 0.2,
        max_tokens: 900,
        messages: [
          {
            role: "system",
            content:
              "You help Indian textile mill owners. Return ONLY JSON with keys: title, summary, fields (array of {label,value}), artifacts (array of {type: quote|table|draft|missing, title, rows?, columns?, notes?, body?, items?}). Do not invent prices as live ERP. Mark unknowns as Not stated. Never claim the email was sent.",
          },
          {
            role: "user",
            content: `Problem: ${input.problemId}\nText:\n${input.text.slice(0, MAX_CHARS)}\n\nRules engine already found:\n${JSON.stringify({ title: rules.title, fields: rules.fields })}`,
          },
        ],
      }),
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const parsed = extractJson(body.choices?.[0]?.message?.content ?? "");
    if (!parsed) return null;

    const next: WorkResult = {
      ...rules,
      engine: "ai",
      badge: rules.synthetic ? "Demo" : "Sandbox",
      title: typeof parsed.title === "string" ? parsed.title : rules.title,
      summary: typeof parsed.summary === "string" ? parsed.summary : rules.summary,
      fields: Array.isArray(parsed.fields) && parsed.fields.length ? parsed.fields : rules.fields,
      artifacts:
        Array.isArray(parsed.artifacts) && parsed.artifacts.length
          ? parsed.artifacts
          : rules.artifacts,
      sources: ["xAI Grok (server-side, no training on uploads)", ...rules.sources.slice(1)],
      dataUsed: [...rules.dataUsed, "Short text snippet only — file bytes never sent"],
    };
    return next;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

export const processWork = createServerFn({ method: "POST" })
  .validator((input: WorkInput) => input)
  .handler(async ({ data }): Promise<WorkResult> => {
    const input: WorkInput = {
      ...data,
      text: (data.text ?? "").slice(0, MAX_CHARS),
    };

    if (input.mode === "website" && input.website) {
      const site = await fetchSite(input.website);
      if (site.error || site.text.length < 40) {
        const sample = labelledSample(input.problemId || "rfq-email");
        return {
          ...sample,
          fallbackReason: site.error || "Site had too little readable text. Labelled sample below.",
        };
      }
      input.text = `Website: ${input.website}\n${site.text}`;
    }

    if (!input.text.trim()) {
      return labelledSample(input.problemId || "rfq-email");
    }

    const rules = runRulesEngine(input);
    const strong = rules.confidence >= 0.78;
    if (strong) return rules;

    const ai = await refineWithGrok(input, rules);
    return ai ?? rules;
  });
