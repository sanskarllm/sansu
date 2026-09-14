import { Badge } from "@/components/ui/badge";
import type { TrustBadge, WorkResult } from "@/lib/types";

const tone: Record<TrustBadge, "muted" | "primary" | "ink" | "ok"> = {
  Demo: "muted",
  Sandbox: "primary",
  Pilot: "ink",
  Production: "ok",
};

export function TrustPanel({ result }: { result: WorkResult }) {
  return (
    <aside className="rounded-lg border border-border bg-surface/70 p-3 text-sm">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge tone={tone[result.badge]}>{result.badge}</Badge>
        {result.synthetic ? <Badge tone="warn">Synthetic data</Badge> : null}
        <span className="tabular-nums text-muted">
          Confidence {Math.round(result.confidence * 100)}%
        </span>
        <span className="text-subtle">via {result.engine}</span>
      </div>
      {result.fallbackReason ? (
        <p className="mb-3 text-warn">{result.fallbackReason}</p>
      ) : null}
      <dl className="grid gap-3 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium tracking-wide text-subtle uppercase">Sources</dt>
          <dd className="mt-1 text-muted">{result.sources.join(" · ")}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium tracking-wide text-subtle uppercase">Data used</dt>
          <dd className="mt-1 text-muted">{result.dataUsed.join(" · ")}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs font-medium tracking-wide text-subtle uppercase">Assumptions</dt>
          <dd className="mt-1 text-muted">{result.assumptions.join(" ")}</dd>
        </div>
      </dl>
    </aside>
  );
}
