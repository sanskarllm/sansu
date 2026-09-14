import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Artifacts } from "@/components/artifacts";
import { Handoff } from "@/components/journey/handoff";
import { OpportunityMap } from "@/components/journey/opportunity-map";
import { PlanView } from "@/components/journey/plan-view";
import { StepRail } from "@/components/journey/step-rail";
import { ValueEstimate } from "@/components/journey/value-estimate";
import { WorkflowCompare } from "@/components/journey/workflow-compare";
import { MissionDetail, MissionView } from "@/components/mission-view";
import { OneBox } from "@/components/one-box";
import { TrustPanel } from "@/components/trust-panel";
import { Button } from "@/components/ui/button";
import { JOURNEY_STEPS } from "@/lib/catalog";
import { labelledSample } from "@/lib/engine";
import { useMill } from "@/lib/store";
import type { JourneyStep, MissionStep } from "@/lib/types";

const STEPS = JOURNEY_STEPS.map((s) => s.id) as JourneyStep[];

export const Route = createFileRoute("/run")({
  validateSearch: (s: Record<string, unknown>): { step?: JourneyStep } => {
    if (STEPS.includes(s.step as JourneyStep)) return { step: s.step as JourneyStep };
    return {};
  },
  component: RunPage,
});

function RunPage() {
  const { step: searchStep } = Route.useSearch();
  const current = searchStep ?? "result";
  const { result, setResult, setStep, track } = useMill();
  const [active, setActive] = useState<MissionStep | null>(null);

  useEffect(() => {
    setStep(current);
    track("journey", current);
  }, [current, setStep, track]);

  useEffect(() => {
    if (!result) setResult(labelledSample("rfq-email"));
  }, [result, setResult]);

  if (!result) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-sm text-muted">No run yet. Paste work, or continue with a sample.</p>
        <div className="mt-4">
          <OneBox />
        </div>
      </main>
    );
  }

  const idx = STEPS.indexOf(current);
  const next = STEPS[idx + 1];

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <StepRail current={current} />

      {current === "result" ? (
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div>
            <h1 className="font-display text-4xl tracking-tight">{result.title}</h1>
            <p className="mt-2 max-w-2xl text-muted">{result.summary}</p>
            <dl className="my-6 grid gap-2 sm:grid-cols-2">
              {result.fields.map((f) => (
                <div key={f.label} className="rounded-md border border-border bg-bg-elevated px-3 py-2">
                  <dt className="text-xs text-subtle">{f.label}</dt>
                  <dd className="text-sm">{f.value}</dd>
                </div>
              ))}
            </dl>
            <Artifacts items={result.artifacts} />
            <div className="mt-6">
              <TrustPanel result={result} />
            </div>
          </div>
          <aside className="rounded-xl border border-border bg-bg-elevated p-3 h-fit">
            <p className="mb-2 text-xs font-medium tracking-wide text-subtle uppercase">Mission</p>
            <MissionView
              steps={result.mission}
              activeId={active?.id}
              onPick={(s) => setActive(s)}
            />
            {active ? (
              <div className="mt-3">
                <MissionDetail step={active} />
              </div>
            ) : (
              <p className="mt-3 text-xs text-subtle">Click a step for input, output, source, confidence.</p>
            )}
          </aside>
        </div>
      ) : null}

      {current === "map" ? (
        <section className="mt-8">
          <h1 className="font-display mb-2 text-4xl tracking-tight">Opportunity map</h1>
          <p className="mb-6 text-muted">Process → tasks → AI → outcome. Every node opens.</p>
          <OpportunityMap graph={result.map} />
        </section>
      ) : null}

      {current === "workflow" ? (
        <section className="mt-8">
          <h1 className="font-display mb-2 text-4xl tracking-tight">Today vs with AI</h1>
          <p className="mb-6 text-muted">
            What AI does, what people do, and where a person must approve.
          </p>
          <WorkflowCompare lanes={result.workflow} />
        </section>
      ) : null}

      {current === "estimate" ? (
        <section className="mt-8">
          <h1 className="font-display mb-2 text-4xl tracking-tight">Live ₹ value</h1>
          <p className="mb-6 text-muted">Change two or three numbers. The rest is listed.</p>
          <ValueEstimate />
        </section>
      ) : null}

      {current === "plan" ? (
        <section className="mt-8">
          <h1 className="font-display mb-4 text-4xl tracking-tight">One-page AI plan</h1>
          <PlanView />
        </section>
      ) : null}

      {current === "handoff" ? (
        <section className="mt-8">
          <h1 className="font-display mb-2 text-4xl tracking-tight">Where should we send your plan?</h1>
          <Handoff />
        </section>
      ) : null}

      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
        <Link to="/" className="text-sm text-muted hover:text-fg">
          Change the input
        </Link>
        {next ? (
          <Button asChild>
            <Link to="/run" search={{ step: next }}>
              Continue
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        ) : (
          <Button asChild variant="outline">
            <Link to="/workspace">Open mill workspace</Link>
          </Button>
        )}
      </div>
    </main>
  );
}
