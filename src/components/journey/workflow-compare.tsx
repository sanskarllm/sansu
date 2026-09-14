import { useState } from "react";
import type { WorkflowLane } from "@/lib/types";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function WorkflowCompare({ lanes }: { lanes: WorkflowLane[] }) {
  const [mix, setMix] = useState(100);
  const withAi = mix >= 50;
  return (
    <div>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center">
        <p className="text-sm font-medium">Today</p>
        <Slider
          min={0}
          max={100}
          step={1}
          value={[mix]}
          onValueChange={(v) => setMix(v[0] ?? 0)}
          className="sm:flex-1"
          aria-label="Human to AI mix"
        />
        <p className="text-sm font-medium">With AI</p>
      </div>
      <ul className="space-y-2">
        {lanes.map((l) => {
          const minutes = withAi ? l.aiMinutes : l.todayMinutes;
          const owner = withAi ? l.owner : "human";
          return (
            <li
              key={l.id}
              className={cn(
                "flex flex-wrap items-start justify-between gap-3 rounded-lg border border-border bg-bg-elevated p-3",
              )}
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium">{l.title}</p>
                <p className="text-sm text-muted">{l.detail}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  tone={owner === "approve" ? "warn" : owner === "ai" ? "primary" : "muted"}
                >
                  {owner === "approve" ? "Person must approve" : owner === "ai" ? "AI" : "People"}
                </Badge>
                <span className="tabular-nums text-sm text-muted">{minutes} min</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
