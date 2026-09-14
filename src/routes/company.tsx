import { createFileRoute, Link } from "@tanstack/react-router";
import { COMPANY, FOUNDER, OFFERINGS, PRINCIPLES, TIMELINE } from "@/lib/company";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/company")({ component: Company });

function Company() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-10 sm:pt-16">
        <p className="text-sm font-medium tracking-wide text-primary">
          {COMPANY.name} · founded {COMPANY.founded} · {COMPANY.place}
        </p>
        <h1 className="font-display mt-3 max-w-3xl text-5xl tracking-tight">Privacy first.</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted">{COMPANY.long}</p>
        <div className="mt-8 flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/services">Offline or cloud</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/privacy">Read the fence</Link>
          </Button>
        </div>
      </section>

      <section className="border-t border-border bg-surface/50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="font-display text-3xl tracking-tight">Why we exist</h2>
          <p className="mt-3 max-w-2xl text-muted">
            A mill’s book is not a prompt. Buyer names, rates, GST, shade standards — they do not belong in a
            model that learns from the public. PrivacyByAI was started so a company can still give AI the work
            without giving away the floor.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <li key={p.n} className="rounded-lg border border-border bg-bg-elevated p-4">
                <p className="font-mono text-xs text-subtle">{p.n}</p>
                <p className="mt-2 font-medium">{p.t}</p>
                <p className="mt-1 text-sm text-muted">{p.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl tracking-tight">What we sell</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {OFFERINGS.map((o) => (
            <li key={o.t}>
              <Link
                to={o.href}
                className="block h-full rounded-lg border border-border bg-bg-elevated p-4 hover:border-primary/40"
              >
                <p className="font-medium">{o.t}</p>
                <p className="mt-1 text-sm text-muted">{o.d}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <h2 className="font-display text-3xl tracking-tight">Story</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TIMELINE.map((e) => (
              <li key={e.t} className="rounded-lg border border-border bg-bg-elevated p-4">
                <p className="font-mono text-xs text-subtle">{e.y}</p>
                <p className="mt-2 font-medium">{e.t}</p>
                <p className="mt-1 text-sm text-muted">{e.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12">
        <p className="text-xs tracking-wide text-subtle uppercase">People</p>
        <h2 className="font-display mt-2 text-3xl tracking-tight">
          {FOUNDER.name}, {FOUNDER.role}
        </h2>
        <p className="mt-1 text-sm text-muted">
          Since {FOUNDER.since}. A small desk — mill-literate, not a theatre of titles.
        </p>
        <p className="mt-4 text-muted">{FOUNDER.bio}</p>
        <p className="mt-8 text-sm">
          <Link to="/contact" className="text-primary">
            Talk to the desk
          </Link>
        </p>
      </section>
    </main>
  );
}
