import { createFileRoute, Link } from "@tanstack/react-router";
import { AGENTS } from "@/lib/catalog";
import { useMill } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/workspace")({ component: Workspace });

const SEED_AUDIT = [
  { id: "a1", at: "this morning", actor: "Quotation", action: "Drafted quote KW-4521", detail: "Held for owner" },
  { id: "a2", at: "this morning", actor: "Owner", action: "Approved quote KW-4521", detail: "Not yet sent" },
  { id: "a3", at: "yesterday", actor: "Sample Tracking", action: "Flagged Zara peach shade 2", detail: "Dyeing Friday" },
];

const OPPORTUNITIES = [
  "H&M stripe shirting — no quote on file after verbal interest",
  "Yarn 60s compact unbooked for KW-901",
  "COO for Nordic Home Hamburg not in the pack",
];

function Workspace() {
  const { millName, setMillName, audit, customAgent, lead, events } = useMill();
  const mill = millName || "Khanna Weaves Pvt. Ltd.";
  const log = audit.length ? audit : SEED_AUDIT;

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-display text-4xl tracking-tight">{mill}</h1>
            <Badge tone="primary">Sandbox</Badge>
          </div>
          <p className="mt-2 text-muted">Agents, approvals, audit. Not production. No password — this mill lives on this device.</p>
        </div>
        <div className="w-full max-w-xs">
          <Label htmlFor="millws">Mill name</Label>
          <Input id="millws" className="mt-1" value={millName} onChange={(e) => setMillName(e.target.value)} placeholder="Your mill" />
        </div>
      </div>

      <aside className="mt-6 rounded-lg border border-primary/30 bg-primary/10 p-4">
        <p className="text-sm font-medium">3 new AI opportunities found</p>
        <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted">
          {OPPORTUNITIES.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </aside>

      <section className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-bg-elevated p-4 lg:col-span-2">
          <h2 className="text-sm font-medium">Agents on the desk</h2>
          <ul className="mt-3 divide-y divide-border">
            {customAgent ? (
              <li className="flex items-center justify-between gap-3 py-3">
                <div>
                  <p className="font-medium">{customAgent.name}</p>
                  <p className="text-sm text-muted">{customAgent.role}</p>
                </div>
                <Badge tone="primary">Yours</Badge>
              </li>
            ) : null}
            {AGENTS.filter((a) => a.set === "textile")
              .slice(0, 3)
              .map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-3 py-3">
                  <div>
                    <p className="font-medium">{a.name}</p>
                    <p className="text-sm text-muted">{a.mission}</p>
                  </div>
                  <Button asChild size="sm" variant="outline">
                    <Link to="/workforce/$id" params={{ id: a.id }}>
                      Open
                    </Link>
                  </Button>
                </li>
              ))}
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-bg-elevated p-4">
          <h2 className="text-sm font-medium">Waiting on you</h2>
          <ul className="mt-3 space-y-3 text-sm">
            <li className="rounded-md border border-border bg-surface p-3">
              Nordic Home navy poplin quote
              <div className="mt-2">
                <Button asChild size="sm">
                  <Link to="/approval">Approve</Link>
                </Button>
              </div>
            </li>
            <li className="rounded-md border border-border bg-surface p-3">Zara peach chase — edit or send</li>
          </ul>
        </div>
      </section>

      <section className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-bg-elevated p-4">
          <h2 className="text-sm font-medium">Audit log</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {log.map((e) => (
              <li key={e.id} className="flex justify-between gap-3 border-b border-border py-2">
                <span>
                  <span className="text-muted">{e.actor} · </span>
                  {e.action}
                </span>
                <span className="text-xs text-subtle whitespace-nowrap">{e.at.replace("T", " ").slice(0, 16)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-border bg-bg-elevated p-4">
          <h2 className="text-sm font-medium">Results & leads</h2>
          {lead ? (
            <p className="mt-3 text-sm">
              Last handoff: {lead.name} · {lead.channel} · {lead.mill}
            </p>
          ) : (
            <p className="mt-3 text-sm text-muted">No plan sent yet.</p>
          )}
          <ul className="mt-3 max-h-48 space-y-1 overflow-auto text-xs text-subtle">
            {events.slice(0, 8).map((e) => (
              <li key={e.at + e.step}>
                {e.step} · {e.detail}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
