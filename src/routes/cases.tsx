import { createFileRoute, Link } from "@tanstack/react-router";
import { CASES, problemById } from "@/lib/catalog";
import { Button } from "@/components/ui/button";
import { useMill } from "@/lib/store";
import { labelledSample } from "@/lib/engine";

export const Route = createFileRoute("/cases")({ component: Cases });

function Cases() {
  const { setInput, setResult, setStep } = useMill();
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-sm text-primary">Trust & proof</p>
      <h1 className="font-display mt-2 text-4xl tracking-tight">Interactive case studies</h1>
      <p className="mt-2 max-w-xl text-muted">
        Before, after, evidence. Run it on the same kind of work. Then take the readiness check.
      </p>
      <ul className="mt-8 grid gap-4 lg:grid-cols-3">
        {CASES.map((c) => {
          const problem = problemById(c.runId);
          return (
            <li id={c.id} key={c.id} className="flex flex-col rounded-xl border border-border bg-bg-elevated p-5">
              <p className="text-xs text-subtle">
                {c.mill} · {c.place}
              </p>
              <h2 className="font-display mt-2 text-2xl tracking-tight">{c.problem}</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div>
                  <dt className="text-subtle">Before</dt>
                  <dd>{c.before}</dd>
                </div>
                <div>
                  <dt className="text-subtle">After</dt>
                  <dd>{c.after}</dd>
                </div>
                <div>
                  <dt className="text-subtle">Evidence</dt>
                  <dd className="text-muted">{c.evidence}</dd>
                </div>
              </dl>
              <div className="mt-auto pt-5">
                <Button
                  type="button"
                  className="w-full"
                  onClick={() => {
                    setInput({ mode: "chip", problemId: c.runId, text: problem.sample });
                    setResult(labelledSample(c.runId));
                    setStep("result");
                  }}
                  asChild
                >
                  <Link to="/run" search={{ step: "result" }}>
                    Run it
                  </Link>
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-8 text-sm">
        <Link to="/readiness" className="text-primary">
          AI-readiness check — six questions, a 90-day roadmap
        </Link>
      </p>
    </main>
  );
}
