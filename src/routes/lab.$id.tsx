import { createFileRoute, Link } from "@tanstack/react-router";
import { RunDemo } from "@/components/run-demo";
import { LAB_DEMOS } from "@/lib/catalog";

export const Route = createFileRoute("/lab/$id")({ component: LabDemoPage });

function LabDemoPage() {
  const { id } = Route.useParams();
  const demo = LAB_DEMOS.find((d) => d.id === id) ?? LAB_DEMOS[0]!;
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-sm text-muted">
        <Link to="/lab" className="hover:text-fg">
          Lab
        </Link>{" "}
        / {demo.name}
      </p>
      <h1 className="font-display mt-2 text-4xl tracking-tight">{demo.name}</h1>
      <p className="mt-2 mb-8 max-w-xl text-muted">{demo.blurb}</p>
      <RunDemo
        inputLabel={demo.inputLabel}
        input={{ mode: "chip", problemId: demo.problemId, text: demo.input }}
      />
      <p className="mt-8 text-sm">
        <Link to="/run" search={{ step: "map" }} className="text-primary">
          Continue to the opportunity map
        </Link>
      </p>
    </main>
  );
}
