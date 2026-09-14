import { useState } from "react";
import type { GraphNode, OpportunityGraph } from "@/lib/types";
import { cn } from "@/lib/utils";

const COLS = [
  { id: "process", label: "Process" },
  { id: "tasks", label: "Tasks" },
  { id: "ai", label: "AI" },
  { id: "outcome", label: "Outcome" },
] as const;

export function OpportunityMap({ graph }: { graph: OpportunityGraph }) {
  const [open, setOpen] = useState<GraphNode | null>(graph.nodes[0] ?? null);
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_18rem]">
      <div>
        <p className="mb-3 text-sm text-muted">{graph.title}</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {COLS.map((col) => (
            <div key={col.id}>
              <p className="mb-2 text-xs font-medium tracking-wide text-subtle uppercase">{col.label}</p>
              <ul className="space-y-2">
                {graph.nodes
                  .filter((n) => n.column === col.id)
                  .map((n) => (
                    <li key={n.id}>
                      <button
                        type="button"
                        onClick={() => setOpen(n)}
                        className={cn(
                          "w-full rounded-md border px-3 py-2 text-left text-sm min-h-11",
                          open?.id === n.id
                            ? "border-primary bg-primary/10"
                            : "border-border bg-bg-elevated hover:border-primary/40",
                        )}
                      >
                        {n.label}
                      </button>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {open ? (
        <aside className="rounded-lg border border-border bg-surface p-4">
          <p className="text-xs tracking-wide text-subtle uppercase">{open.column}</p>
          <h3 className="font-display mt-1 text-xl">{open.label}</h3>
          <p className="mt-2 text-sm text-muted">{open.detail}</p>
        </aside>
      ) : null}
    </div>
  );
}
