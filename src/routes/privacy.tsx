import { createFileRoute, Link } from "@tanstack/react-router";
import { COMPANY, POLICY, PRINCIPLES } from "@/lib/company";

export const Route = createFileRoute("/privacy")({ component: Privacy });

function Privacy() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm text-primary">{COMPANY.name}</p>
      <h1 className="font-display mt-2 text-4xl tracking-tight">Privacy</h1>
      <p className="mt-2 text-muted">
        Privacy is the product, not a footer link. Offline when the mill can. Fenced when it cannot. Never trained
        on your book.
      </p>

      <ol className="mt-8 space-y-4">
        {PRINCIPLES.map((p) => (
          <li key={p.n} className="rounded-lg border border-border bg-bg-elevated p-4">
            <p className="font-mono text-xs text-subtle">{p.n}</p>
            <p className="mt-1 font-medium">{p.t}</p>
            <p className="mt-1 text-sm text-muted">{p.d}</p>
          </li>
        ))}
      </ol>

      <h2 className="font-display mt-12 text-3xl tracking-tight">Policy</h2>
      <p className="mt-2 text-sm text-subtle">Plain language. Last written for this desk in 2026.</p>
      <div className="mt-6 space-y-6">
        {POLICY.map((s) => (
          <section key={s.h}>
            <h3 className="font-medium">{s.h}</h3>
            <p className="mt-1 text-sm text-muted">{s.p}</p>
          </section>
        ))}
      </div>
      <p className="mt-10 text-sm text-muted">
        Questions on a live install go through{" "}
        <Link to="/contact" className="text-primary">
          the desk
        </Link>
        , not a bot. Security detail sits on{" "}
        <Link to="/security" className="text-primary">
          Security
        </Link>
        .
      </p>
    </main>
  );
}
