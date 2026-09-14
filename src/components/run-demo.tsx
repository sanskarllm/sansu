import { useEffect, useRef, useState } from "react";
import { processWork } from "@/lib/ai";
import { labelledSample } from "@/lib/engine";
import { useMill } from "@/lib/store";
import type { MissionStep, WorkInput, WorkResult } from "@/lib/types";
import { Artifacts } from "@/components/artifacts";
import { MissionDetail, MissionView } from "@/components/mission-view";
import { TrustPanel } from "@/components/trust-panel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function RunDemo({
  input,
  inputLabel,
  auto = false,
}: {
  input: WorkInput;
  inputLabel: string;
  auto?: boolean;
}) {
  const setResultStore = useMill((s) => s.setResult);
  const track = useMill((s) => s.track);
  const [result, setResult] = useState<WorkResult | null>(null);
  const [mission, setMission] = useState<MissionStep[]>([]);
  const [active, setActive] = useState<MissionStep | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  const autoOnce = useRef(false);

  async function run() {
    setBusy(true);
    setError(null);
    setStarted(true);
    setResult(null);
    track("demo", input.problemId);
    const skeleton: MissionStep[] = [
      { id: "s1", label: "Reading the document", status: "running" },
      { id: "s2", label: "Extracting fields", status: "pending" },
      { id: "s3", label: "Drafting the output", status: "pending" },
      { id: "s4", label: "Attaching sources", status: "pending" },
    ];
    setMission(skeleton);
    const tick = window.setInterval(() => {
      setMission((prev) => {
        const i = prev.findIndex((s) => s.status === "running");
        if (i < 0) return prev;
        return prev.map((s, idx) => {
          if (idx === i) return { ...s, status: "done" };
          if (idx === i + 1) return { ...s, status: "running" };
          return s;
        });
      });
    }, 700);
    try {
      let next: WorkResult;
      try {
        next = await processWork({ data: input });
      } catch {
        next = {
          ...labelledSample(input.problemId),
          fallbackReason: "The live run failed. Labelled sample of the same job.",
        };
      }
      window.clearInterval(tick);
      setResult(next);
      setResultStore(next);
      setMission(next.mission);
      setActive(next.mission[0] ?? null);
    } catch (e) {
      window.clearInterval(tick);
      setError("Could not finish that run.");
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    if (auto && !autoOnce.current) {
      autoOnce.current = true;
      void run();
    }
    // First paint only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto]);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="space-y-4">
        <section className="rounded-lg border border-border bg-bg-elevated p-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-xs font-medium tracking-wide text-subtle uppercase">{inputLabel}</p>
            <Button type="button" size="sm" onClick={() => void run()} disabled={busy}>
              {busy ? "Reading the work" : result ? "Run again" : "Run it"}
            </Button>
          </div>
          <pre className="max-h-56 overflow-auto whitespace-pre-wrap font-sans text-sm text-muted">{input.text}</pre>
        </section>

        {error ? (
          <div className="flex flex-wrap gap-2 rounded-md border border-warn/30 bg-warn/10 p-3 text-sm text-warn">
            <p className="flex-1">{error}</p>
            <Button type="button" size="sm" variant="outline" onClick={() => void run()}>
              Retry
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => {
                const sample = labelledSample(input.problemId);
                setResult(sample);
                setMission(sample.mission);
              }}
            >
              Continue with a sample
            </Button>
          </div>
        ) : null}

        {result ? (
          <>
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h2 className="font-display text-2xl tracking-tight">{result.title}</h2>
                <Badge tone="muted">Evidence</Badge>
              </div>
              <p className="mb-4 text-sm text-muted">{result.summary}</p>
              <dl className="mb-4 grid gap-2 sm:grid-cols-2">
                {result.fields.map((f) => (
                  <div key={f.label} className="rounded-md border border-border bg-surface px-3 py-2">
                    <dt className="text-xs text-subtle">{f.label}</dt>
                    <dd className="text-sm">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <Artifacts items={result.artifacts} />
            </div>
            <TrustPanel result={result} />
          </>
        ) : null}
      </div>
      <aside className="rounded-xl border border-border bg-bg-elevated p-3">
        <p className="mb-2 text-xs font-medium tracking-wide text-subtle uppercase">Mission</p>
        {mission.length === 0 ? (
          <p className="text-sm text-muted">Run it. You’ll see each step, not a blank wait.</p>
        ) : (
          <>
            <MissionView steps={mission} activeId={active?.id} onPick={setActive} />
            {active ? (
              <div className="mt-3">
                <MissionDetail step={active} />
              </div>
            ) : null}
          </>
        )}
      </aside>
    </div>
  );
}
