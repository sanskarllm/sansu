import { createFileRoute, Link } from "@tanstack/react-router";
import { LAB_DEMOS } from "@/lib/catalog";

export const Route = createFileRoute("/lab/")({ component: Lab });

function Lab() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-sm text-primary">See AI working</p>
      <h1 className="font-display mt-2 text-4xl tracking-tight">Capability Lab</h1>
      <p className="mt-2 max-w-xl text-muted">
        Five working demos. Input, steps, output, evidence. No fake typing.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LAB_DEMOS.map((d) => (
          <li key={d.id}>
            <Link
              to="/lab/$id"
              params={{ id: d.id }}
              className="block h-full rounded-xl border border-border bg-bg-elevated p-5 hover:border-primary/40"
            >
              <p className="text-xs tracking-wide text-subtle uppercase">{d.name}</p>
              <p className="mt-3 text-lg font-medium">{d.blurb}</p>
              <p className="mt-4 text-sm text-primary">Open demo</p>
            </Link>
          </li>
        ))}
        <li>
          <Link
            to="/rfq"
            className="block h-full rounded-xl border border-primary bg-primary p-5 text-primary-fg"
          >
            <p className="text-xs tracking-wide uppercase opacity-80">Flagship</p>
            <p className="mt-3 text-lg font-medium">RFQ to quotation</p>
            <p className="mt-2 text-sm opacity-90">
              Enquiry → requirements → capability → missing info → draft quote → approval → CRM.
            </p>
          </Link>
        </li>
      </ul>
    </main>
  );
}
