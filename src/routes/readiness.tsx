import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { READINESS_QUESTIONS } from "@/lib/catalog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMill } from "@/lib/store";

export const Route = createFileRoute("/readiness")({ component: Readiness });

function Readiness() {
  const track = useMill((s) => s.track);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const score = useMemo(() => {
    const vals = Object.values(answers);
    if (vals.length < READINESS_QUESTIONS.length) return null;
    const raw = vals.reduce((a, b) => a + b, 0);
    const max = READINESS_QUESTIONS.length * 3;
    return Math.round((raw / max) * 100);
  }, [answers]);

  const roadmap =
    score == null
      ? []
      : score >= 75
        ? [
            { d: "30 days", t: "Sandbox on live RFQs. Owner approval on every send." },
            { d: "60 days", t: "Add sample desk and export docs. Measure cycle time." },
            { d: "90 days", t: "Pilot KPIs vs the last quarter. Decide production." },
          ]
        : score >= 50
          ? [
              { d: "30 days", t: "Put quotes in one sheet. Name who approves." },
              { d: "60 days", t: "Sandbox on a single buyer inbox." },
              { d: "90 days", t: "Add yarn position. Still no silent sends." },
            ]
          : [
              { d: "30 days", t: "Pick a system of record that is not WhatsApp." },
              { d: "60 days", t: "Write down constructions you actually run." },
              { d: "90 days", t: "First labelled demo on a real RFQ, owner in the room." },
            ];

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-4xl tracking-tight">AI-readiness check</h1>
      <p className="mt-2 text-muted">Six questions. A score. A 90-day roadmap. No sales call.</p>
      <ol className="mt-8 space-y-8">
        {READINESS_QUESTIONS.map((q, i) => (
          <li key={q.id}>
            <p className="font-medium">
              <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")} · </span>
              {q.prompt}
            </p>
            <div className="mt-3 grid gap-2">
              {q.options.map((o) => {
                const on = answers[q.id] === o.score;
                return (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => setAnswers((a) => ({ ...a, [q.id]: o.score }))}
                    className={cn(
                      "rounded-md border px-3 py-3 text-left text-sm min-h-11",
                      on ? "border-primary bg-primary/10" : "border-border bg-bg-elevated",
                    )}
                  >
                    {o.label}
                  </button>
                );
              })}
            </div>
          </li>
        ))}
      </ol>
      {score != null ? (
        <section className="mt-10 rounded-xl border border-border bg-bg-elevated p-5">
          <p className="text-xs tracking-wide text-subtle uppercase">Score</p>
          <p className="font-display mt-1 text-5xl tabular-nums tracking-tight">{score}</p>
          <ul className="mt-4 space-y-3">
            {roadmap.map((r) => (
              <li key={r.d}>
                <p className="text-xs text-subtle">{r.d}</p>
                <p className="text-sm">{r.t}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild>
              <Link
                to="/"
                onClick={() => track("readiness", String(score))}
              >
                Run a problem
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/run" search={{ step: "handoff" }}>
                Send this roadmap
              </Link>
            </Button>
          </div>
        </section>
      ) : (
        <p className="mt-8 text-sm text-subtle">Answer all six to see the roadmap.</p>
      )}
    </main>
  );
}
