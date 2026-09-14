import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PlanView } from "@/components/journey/plan-view";
import { TrustPanel } from "@/components/trust-panel";
import { labelledSample } from "@/lib/engine";
import { useMill } from "@/lib/store";
import type { EstimateInputs, Lead, WorkResult } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/p/$id")({ component: SharedPlan });

function SharedPlan() {
  const { id } = Route.useParams();
  const { setResult, setEstimate, setMillName, result } = useMill();
  const [found, setFound] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(`millhand-plan-${id}`);
      if (raw) {
        const parsed = JSON.parse(raw) as { lead?: Lead; result?: WorkResult; estimate?: EstimateInputs };
        if (parsed.result) setResult(parsed.result);
        if (parsed.estimate) setEstimate(parsed.estimate);
        if (parsed.lead?.mill) setMillName(parsed.lead.mill);
        setFound(true);
        return;
      }
    } catch {
      /* ignore */
    }
    setResult(labelledSample("rfq-email"));
    setFound(false);
  }, [id, setEstimate, setMillName, setResult]);

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge tone={found ? "primary" : "warn"}>{found ? "Sandbox" : "Demo"}</Badge>
        <p className="text-sm text-muted">
          {found ? "Saved plan on this device." : "This link had no saved plan here. Labelled sample below."}
        </p>
      </div>
      {result ? <TrustPanel result={result} /> : null}
      <div className="mt-6">
        <PlanView />
      </div>
      <p className="mt-6 text-sm">
        <Link to="/run" search={{ step: "handoff" }} className="text-primary">
          Send this plan
        </Link>
      </p>
    </main>
  );
}
