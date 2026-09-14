import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { RunDemo } from "@/components/run-demo";
import { PROBLEMS } from "@/lib/catalog";

const PIPE = [
  { n: "01", t: "Buyer enquiry", d: "The email as it arrived." },
  { n: "02", t: "Requirements", d: "Construction, width, colour, quantity, delivery." },
  { n: "03", t: "Capability check", d: "Against the mill’s known cards — not the internet." },
  { n: "04", t: "Missing info", d: "Listed. Never filled with a guess that ships." },
  { n: "05", t: "Draft quote", d: "Rate, validity, lab dip. Illustrative until you say so." },
  { n: "06", t: "Approval", d: "A person must approve. AI does not send." },
  { n: "07", t: "CRM update", d: "Buyer, fabric, rate, status in the book." },
];

export const Route = createFileRoute("/rfq")({ component: Rfq });

function Rfq() {
  const sample = PROBLEMS[0]!;
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-sm text-primary">Flagship</p>
      <h1 className="font-display mt-2 text-4xl tracking-tight">RFQ to quotation</h1>
      <p className="mt-2 max-w-xl text-muted">
        The mill’s own expertise, in one demo. Enquiry through to a quote waiting for the owner.
      </p>
      <ol className="my-8 grid gap-2 sm:grid-cols-2 lg:grid-cols-7">
        {PIPE.map((p) => (
          <li key={p.n} className="rounded-md border border-border bg-bg-elevated p-3">
            <p className="font-mono text-xs text-subtle">{p.n}</p>
            <p className="mt-1 text-sm font-medium">{p.t}</p>
            <p className="mt-1 text-xs text-muted">{p.d}</p>
          </li>
        ))}
      </ol>
      <RunDemo
        inputLabel="Buyer enquiry"
        input={{ mode: "email", problemId: "rfq-email", text: sample.sample }}
      />
      <p className="mt-6 flex items-center gap-2 text-sm text-muted">
        <Check className="size-4 text-primary" />
        Next:{" "}
        <Link to="/approval" className="text-primary">
          prove a person still approves
        </Link>
      </p>
    </main>
  );
}
