import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MODES, STAGES } from "@/lib/company";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/services")({ component: Services });

function Services() {
  const [id, setId] = useState(MODES[0]!.id);
  const mode = MODES.find((m) => m.id === id) ?? MODES[0]!;
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-sm text-primary">How a company actually gets the model</p>
      <h1 className="font-display mt-2 text-4xl tracking-tight">Offline, hybrid, or careful cloud</h1>
      <p className="mt-2 max-w-2xl text-muted">
        PrivacyByAI deploys privacy-based LLMs on your floor, or a non-offline path with a written fence. Pick the
        mode. The mill still approves the send.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setId(m.id)}
            className={cn(
              "min-h-11 rounded-full border px-4 text-sm",
              id === m.id ? "border-primary bg-primary text-primary-fg" : "border-border bg-bg-elevated",
            )}
          >
            {m.name}
          </button>
        ))}
      </div>

      <article className="mt-6 rounded-xl border border-border bg-bg-elevated p-5">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-display text-3xl tracking-tight">{mode.name}</h2>
          <Badge tone="primary">{mode.kicker}</Badge>
        </div>
        <p className="mt-3 max-w-2xl text-muted">{mode.blurb}</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium tracking-wide text-subtle uppercase">Fits</p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted">
              {mode.fits.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium tracking-wide text-subtle uppercase">On the box</p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted">
              {mode.stack.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-4 text-sm text-muted">
          <span className="text-subtle">Not for · </span>
          {mode.not}
        </p>
      </article>

      <section className="mt-12">
        <h2 className="font-display text-3xl tracking-tight">How a job runs</h2>
        <ol className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((s) => (
            <li key={s.n} className="rounded-lg border border-border bg-surface p-4">
              <p className="font-mono text-xs text-subtle">{s.n}</p>
              <p className="mt-2 font-medium">{s.t}</p>
              <p className="mt-1 text-sm text-muted">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-10 flex flex-wrap gap-2">
        <Button asChild>
          <Link to="/contact">Ask for an install</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/security">Security & data path</Link>
        </Button>
      </div>
    </main>
  );
}
