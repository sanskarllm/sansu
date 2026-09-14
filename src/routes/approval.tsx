import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useMill } from "@/lib/store";

const DRAFT = `Dear Lisa,

Thank you for the RFQ on 12,000 m navy cotton poplin, 40s × 40s, 133 × 72, 58".

Draft for owner approval (not sent):
- ₹185 / m ex-mill, FOB Nhava Sheva
- Validity 15 days
- Lab dip 7 working days after shade standard
- CIF Rotterdam on request after freight

Please confirm Pantone 19-4052 as the shade standard and whether a 2,000 m trial is required.

Regards,
Khanna Weaves`;

export const Route = createFileRoute("/approval")({ component: Approval });

function Approval() {
  const push = useMill((s) => s.pushAudit);
  const track = useMill((s) => s.track);
  const [body, setBody] = useState(DRAFT);
  const [state, setState] = useState<"open" | "approved" | "edited" | "rejected" | "escalated">("open");

  function act(next: typeof state, line: string) {
    setState(next);
    push({ actor: "Owner", action: line, detail: "Buyer reply · Nordic Home" });
    track("approval", next);
    toast(line);
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm text-primary">Humans stay in control</p>
      <h1 className="font-display mt-2 text-4xl tracking-tight">Approval simulator</h1>
      <p className="mt-2 text-muted">
        A realistic AI-drafted customer reply. Approve, edit, reject, or escalate. Nothing leaves without you.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Badge tone="primary">Sandbox</Badge>
        <Badge>Quotation agent</Badge>
        <Badge tone={state === "open" ? "warn" : "ok"}>{state === "open" ? "Waiting" : state}</Badge>
      </div>
      <Textarea className="mt-6 min-h-72 font-sans" value={body} onChange={(e) => setBody(e.target.value)} />
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Button type="button" onClick={() => act("approved", "Approved — still not sent until you dispatch")}>
          Approve
        </Button>
        <Button type="button" variant="outline" onClick={() => act("edited", "Edit kept. Send is still yours.")}>
          Edit
        </Button>
        <Button type="button" variant="outline" onClick={() => act("rejected", "Rejected. Draft discarded.")}>
          Reject
        </Button>
        <Button type="button" variant="outline" onClick={() => act("escalated", "Escalated to GM.")}>
          Escalate
        </Button>
      </div>
      <p className="mt-8 text-sm">
        Next:{" "}
        <Link to="/workspace" className="text-primary">
          see it on the mill desk
        </Link>
      </p>
    </main>
  );
}
