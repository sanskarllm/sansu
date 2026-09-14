import { createFileRoute, Link } from "@tanstack/react-router";
import { AGENTS, AUTONOMY_COPY } from "@/lib/catalog";

export const Route = createFileRoute("/workforce/")({ component: Workforce });

function Workforce() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-sm text-primary">Phase 2</p>
      <h1 className="font-display mt-2 text-4xl tracking-tight">AI workforce</h1>
      <p className="mt-2 max-w-xl text-muted">
        Sixteen agent profiles. Textile set first: quotation, sample tracking, export docs.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {AGENTS.map((a) => (
          <li key={a.id}>
            <Link
              to="/workforce/$id"
              params={{ id: a.id }}
              className="block h-full rounded-xl border border-border bg-bg-elevated p-4 hover:border-primary/40"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium">{a.name}</p>
                <span className="text-xs text-subtle">{a.set}</span>
              </div>
              <p className="mt-2 text-sm text-muted">{a.mission}</p>
              <p className="mt-3 text-xs text-primary">{AUTONOMY_COPY[a.autonomy].label}</p>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm">
        <Link to="/builder" className="text-primary">
          Build one of your own
        </Link>
      </p>
    </main>
  );
}
