import { Link } from "@tanstack/react-router";
import { JOURNEY_STEPS } from "@/lib/catalog";
import type { JourneyStep } from "@/lib/types";
import { cn } from "@/lib/utils";

export function StepRail({ current }: { current: JourneyStep }) {
  const idx = JOURNEY_STEPS.findIndex((s) => s.id === current);
  return (
    <nav aria-label="Plan steps" className="overflow-x-auto">
      <ol className="flex min-w-max gap-1">
        {JOURNEY_STEPS.map((s, i) => {
          const done = i < idx;
          const on = s.id === current;
          return (
            <li key={s.id}>
              <Link
                to="/run"
                search={{ step: s.id }}
                className={cn(
                  "inline-flex min-h-11 items-center rounded-full px-3 text-sm",
                  on && "bg-ink text-bg-elevated",
                  done && !on && "text-primary",
                  !done && !on && "text-muted",
                )}
              >
                <span className="mr-2 tabular-nums text-xs">{String(i + 1).padStart(2, "0")}</span>
                {s.label}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
