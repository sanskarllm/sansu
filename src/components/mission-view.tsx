import { Check, Circle, LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MissionStep } from "@/lib/types";

export function MissionView({
  steps,
  onPick,
  activeId,
}: {
  steps: MissionStep[];
  onPick?: (s: MissionStep) => void;
  activeId?: string;
}) {
  return (
    <ol className="space-y-1">
      {steps.map((s) => {
        const running = s.status === "running";
        return (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => onPick?.(s)}
              className={cn(
                "flex w-full items-start gap-3 rounded-md px-2 py-2 text-left hover:bg-surface",
                activeId === s.id && "bg-surface",
              )}
            >
              <span className="mt-0.5 text-primary">
                {s.status === "done" ? (
                  <Check className="size-4" />
                ) : running ? (
                  <LoaderCircle className="size-4 animate-spin" />
                ) : (
                  <Circle className="size-4 text-subtle" />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className={cn("block text-sm", running && "shimmer text-muted")}>
                  {running ? s.label.replace(/\.$/, "") + "…" : s.status === "done" ? `✓ ${s.label}` : s.label}
                </span>
                {s.output ? (
                  <span className="block truncate text-xs text-muted">{s.output}</span>
                ) : null}
              </span>
              {typeof s.confidence === "number" && s.status === "done" ? (
                <span className="tabular-nums text-xs text-subtle">
                  {Math.round(s.confidence * 100)}%
                </span>
              ) : null}
            </button>
          </li>
        );
      })}
    </ol>
  );
}

export function MissionDetail({ step }: { step: MissionStep }) {
  return (
    <div className="rounded-md border border-border bg-bg-elevated p-3 text-sm">
      <p className="font-medium">{step.label}</p>
      <dl className="mt-2 space-y-1 text-muted">
        <div>
          <span className="text-subtle">Input · </span>
          {step.input || "This step’s source text"}
        </div>
        <div>
          <span className="text-subtle">Output · </span>
          {step.output || "—"}
        </div>
        <div>
          <span className="text-subtle">Source · </span>
          {step.source || "—"}
        </div>
        <div>
          <span className="text-subtle">Confidence · </span>
          {typeof step.confidence === "number" ? `${Math.round(step.confidence * 100)}%` : "—"}
        </div>
      </dl>
    </div>
  );
}
