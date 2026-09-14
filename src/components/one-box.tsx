import { useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Globe, Paperclip } from "lucide-react";
import { PROBLEMS } from "@/lib/catalog";
import { labelledSample } from "@/lib/engine";
import { processWork } from "@/lib/ai";
import { useMill } from "@/lib/store";
import type { InputMode } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export function OneBox({ compact = false }: { compact?: boolean }) {
  const nav = useNavigate();
  const { input, setInput, setResult, setStep, track } = useMill();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function chooseChip(id: string) {
    const p = PROBLEMS.find((x) => x.id === id);
    if (!p) return;
    setInput({ mode: "chip", problemId: id, text: p.sample, fileName: undefined, website: undefined });
    setError(null);
  }

  function setMode(mode: InputMode) {
    setInput({ mode });
    setError(null);
  }

  async function onFile(file: File) {
    const ok = /text|csv|json|plain|message/.test(file.type) || /\.(txt|csv|eml|json|md)$/i.test(file.name);
    if (!ok) {
      setError("That file type isn’t readable here. Retry with .txt / .csv, or continue with a sample RFQ.");
      setInput({ mode: "file", fileName: file.name, text: "" });
      return;
    }
    const text = (await file.text()).slice(0, 4000);
    setInput({ mode: "file", fileName: file.name, text });
    setError(null);
  }

  async function run(manualSample = false) {
    setBusy(true);
    setError(null);
    track("input", manualSample ? "continue-sample" : input.mode);
    try {
      const payload = manualSample
        ? { mode: "chip" as const, problemId: input.problemId || "rfq-email", text: "" }
        : input;
      let result;
      try {
        result = await processWork({ data: payload });
      } catch {
        result = labelledSample(payload.problemId);
        result = {
          ...result,
          fallbackReason: "The live run failed. This is a labelled sample of the same job.",
        };
      }
      setResult(result);
      setStep("result");
      nav({ to: "/run" });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-xl border border-border bg-bg-elevated p-3 shadow-[var(--shadow-border)]">
      {!compact ? (
        <div className="mb-3 flex flex-wrap gap-2">
          {PROBLEMS.map((p) => {
            const on = input.problemId === p.id && input.mode === "chip";
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => chooseChip(p.id)}
                className={cn(
                  "min-h-11 rounded-full border px-3 text-sm",
                  on
                    ? "border-primary bg-primary text-primary-fg"
                    : "border-border bg-surface text-fg hover:border-primary/40",
                )}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="mb-2 flex flex-wrap gap-1">
        {(
          [
            ["email", "Paste email"],
            ["file", "Upload file"],
            ["website", "Enter website"],
          ] as const
        ).map(([mode, label]) => (
          <button
            key={mode}
            type="button"
            onClick={() => setMode(mode)}
            className={cn(
              "rounded-md px-2 py-1 text-xs",
              input.mode === mode ? "bg-ink text-bg-elevated" : "text-muted hover:bg-surface",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {input.mode === "website" ? (
        <div className="relative">
          <Globe className="pointer-events-none absolute top-3 left-3 size-4 text-subtle" />
          <Input
            className="pl-9"
            placeholder="https://yourmill.in"
            value={input.website ?? ""}
            onChange={(e) => setInput({ website: e.target.value, text: e.target.value, mode: "website" })}
          />
        </div>
      ) : (
        <Textarea
          value={input.text}
          onChange={(e) => setInput({ text: e.target.value, mode: input.mode === "chip" ? "email" : input.mode })}
          placeholder="Paste a buyer email, or pick a problem above."
          className="min-h-40"
        />
      )}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <input
          ref={fileRef}
          type="file"
          accept=".txt,.csv,.eml,.json,.md,text/plain"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void onFile(f);
          }}
        />
        <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
          <Paperclip className="size-4" />
          {input.fileName || "Attach"}
        </Button>
        <span className="flex-1 text-xs text-subtle">
          {busy ? "Reading the work…" : "About 30 seconds. No sales call."}
        </span>
        <Button type="button" onClick={() => void run(false)} disabled={busy}>
          {busy ? "Working" : "See it work"}
          <ArrowRight className="size-4" />
        </Button>
      </div>

      {error ? (
        <div className="mt-3 flex flex-wrap items-center gap-2 rounded-md border border-warn/30 bg-warn/10 p-3 text-sm text-warn">
          <p className="flex-1">{error}</p>
          <Button type="button" size="sm" variant="outline" onClick={() => void run(false)}>
            Retry
          </Button>
          <Button type="button" size="sm" onClick={() => void run(true)}>
            Continue with a sample
          </Button>
        </div>
      ) : null}
    </div>
  );
}
