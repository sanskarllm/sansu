import { createFileRoute, Link } from "@tanstack/react-router";
import { MODES, SECURITY } from "@/lib/company";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/security")({ component: Security });

function Security() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-sm text-primary">For your IT team</p>
      <h1 className="font-display mt-2 text-4xl tracking-tight">Security & data path</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Three modes, one rule: the mill decides what leaves. Keys never in the browser. File bytes never to a
        trainer. A named person on the send.
      </p>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {SECURITY.map((s) => (
          <li key={s.t} className="rounded-lg border border-border bg-bg-elevated p-4">
            <p className="font-medium">{s.t}</p>
            <p className="mt-2 text-sm text-muted">{s.d}</p>
          </li>
        ))}
      </ul>

      <section className="mt-12">
        <h2 className="font-display text-3xl tracking-tight">What travels</h2>
        <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-bg-elevated">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs tracking-wide text-subtle uppercase">
                <th className="px-4 py-3 font-medium">Path</th>
                <th className="px-4 py-3 font-medium">Where the model sits</th>
                <th className="px-4 py-3 font-medium">What may leave</th>
                <th className="px-4 py-3 font-medium">Training</th>
              </tr>
            </thead>
            <tbody>
              {MODES.map((m) => (
                <tr key={m.id} className="border-b border-border/80">
                  <td className="px-4 py-3 font-medium">{m.name}</td>
                  <td className="px-4 py-3 text-muted">
                    {m.id === "offline" ? "Mill hardware" : m.id === "hybrid" ? "Mill + no-train API" : "Hosted, region named"}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {m.id === "offline" ? "Nothing" : "Short text snippets, never file bytes"}
                  </td>
                  <td className="px-4 py-3">
                    <Badge tone="ok">Off</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="mt-8 text-sm text-muted">
        Architecture behind a live plan is also on each Millhand result, under “For your IT team”. Full principles:{" "}
        <Link to="/privacy" className="text-primary">
          Privacy
        </Link>
        .
      </p>
    </main>
  );
}
