import { createFileRoute, Link } from "@tanstack/react-router";
import { AGENTS, AUTONOMY_COPY } from "@/lib/catalog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/workforce/$id")({ component: AgentPage });

function AgentPage() {
  const { id } = Route.useParams();
  const agent = AGENTS.find((a) => a.id === id) ?? AGENTS[0]!;
  const auto = AUTONOMY_COPY[agent.autonomy];
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm text-muted">
        <Link to="/workforce" className="hover:text-fg">
          Workforce
        </Link>{" "}
        / {agent.set}
      </p>
      <h1 className="font-display mt-2 text-4xl tracking-tight">{agent.name}</h1>
      <p className="mt-3 text-lg text-muted">{agent.mission}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Badge tone="primary">{auto.label}</Badge>
        {agent.tools.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </div>
      <section className="mt-8 rounded-xl border border-border bg-bg-elevated p-5">
        <h2 className="text-sm font-medium">KPIs</h2>
        <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted">
          {agent.kpis.map((k) => (
            <li key={k}>{k}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">{auto.line}</p>
      </section>
      <div className="mt-6">
        <Button asChild>
          <a href={agent.watchPath}>Watch it work</a>
        </Button>
      </div>
    </main>
  );
}
