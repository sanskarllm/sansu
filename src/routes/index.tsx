import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { OneBox } from "@/components/one-box";
import { AGENTS, CASES, LAB_DEMOS } from "@/lib/catalog";
import { COMPANY, MODES, PRINCIPLES } from "@/lib/company";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 pt-12 pb-8 sm:pt-20">
        <p className="text-sm font-medium tracking-wide text-primary">
          {COMPANY.name} · {COMPANY.product} · textile and manufacturing SMEs
        </p>
        <h1 className="font-display mt-3 max-w-3xl text-5xl tracking-tight sm:text-6xl">
          Give AI the work.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          A vague mill problem becomes a working demo and a rupee plan in about three minutes.
          Offline on your floor, or a fenced cloud. No sales call.
        </p>
        <div className="mt-8">
          <OneBox />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-3 px-4 pb-16 sm:grid-cols-3">
        <Fact n="01" t="On your work" d="Paste an RFQ, a chat, a sheet, or a site. AI does that job first." />
        <Fact n="02" t="A rupee number" d="Hours released, annual value, payback. Every assumption visible. Marked illustrative." />
        <Fact n="03" t="Handoff at the end" d="WhatsApp, a call, email, or a link. We don’t ask for a phone on the first screen." />
      </section>

      <section className="border-t border-border bg-surface/50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl tracking-tight">Capability Lab</h2>
            <Link to="/lab" className="inline-flex items-center gap-1 text-sm text-primary">
              All five <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {LAB_DEMOS.map((d) => (
              <li key={d.id}>
                <Link
                  to="/lab/$id"
                  params={{ id: d.id }}
                  className="block h-full rounded-lg border border-border bg-bg-elevated p-4 hover:border-primary/40"
                >
                  <p className="text-xs text-subtle">{d.name}</p>
                  <p className="mt-2 text-sm">{d.blurb}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-3xl tracking-tight">Textile set</h2>
          <Link to="/workforce" className="text-sm text-primary">
            Workforce catalogue
          </Link>
        </div>
        <ul className="grid gap-3 sm:grid-cols-3">
          {AGENTS.filter((a) => a.set === "textile").slice(0, 3).map((a) => (
            <li key={a.id} className="rounded-lg border border-border bg-bg-elevated p-4">
              <p className="font-medium">{a.name}</p>
              <p className="mt-1 text-sm text-muted">{a.mission}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {CASES.map((c) => (
            <Link
              key={c.id}
              to="/cases"
              hash={c.id}
              className="rounded-lg border border-border bg-bg-elevated p-4 hover:border-primary/40"
            >
              <p className="text-xs text-subtle">
                {c.mill} · {c.place}
              </p>
              <p className="mt-2 text-sm">{c.after}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface/50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm text-primary">{COMPANY.name} · founded {COMPANY.founded}</p>
              <h2 className="font-display mt-1 text-3xl tracking-tight">Privacy-first, on purpose</h2>
              <p className="mt-2 max-w-xl text-muted">{COMPANY.line}</p>
            </div>
            <Link to="/company" className="inline-flex items-center gap-1 text-sm text-primary">
              The company <ArrowRight className="size-4" />
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-3">
            {MODES.map((m) => (
              <li key={m.id}>
                <Link
                  to="/services"
                  className="block h-full rounded-lg border border-border bg-bg-elevated p-4 hover:border-primary/40"
                >
                  <p className="text-xs text-subtle">{m.kicker}</p>
                  <p className="mt-2 font-medium">{m.name}</p>
                  <p className="mt-1 text-sm text-muted">{m.blurb}</p>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-6 grid gap-3 sm:grid-cols-3">
            {PRINCIPLES.slice(0, 3).map((p) => (
              <li key={p.n} className="rounded-lg border border-border bg-bg-elevated p-4">
                <p className="font-mono text-xs text-subtle">{p.n}</p>
                <p className="mt-1 font-medium">{p.t}</p>
                <p className="mt-1 text-sm text-muted">{p.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

function Fact({ n, t, d }: { n: string; t: string; d: string }) {
  return (
    <div className="rounded-lg border border-border bg-bg-elevated p-4">
      <p className="font-mono text-xs text-subtle">{n}</p>
      <p className="mt-2 font-medium">{t}</p>
      <p className="mt-1 text-sm text-muted">{d}</p>
    </div>
  );
}
