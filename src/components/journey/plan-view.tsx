import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMill, valueOf } from "@/lib/store";
import { dollars, rupees } from "@/lib/utils";
import { DESK, deskUsd, problemById } from "@/lib/catalog";

export function PlanView() {
  const { result, estimate, millName } = useMill();
  const [it, setIt] = useState(false);
  if (!result) return null;
  const v = valueOf(estimate);
  const problem = problemById(result.problemId);
  const mill = millName || "Your mill";
  const sandbox = deskUsd(1);
  const live = deskUsd(3);
  const week = deskUsd(1);

  return (
    <article className="rounded-xl border border-border bg-bg-elevated p-5 shadow-[var(--shadow-border)]">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-4">
        <div>
          <p className="text-xs tracking-wide text-subtle uppercase">One-page AI plan</p>
          <h2 className="font-display text-3xl tracking-tight">{mill}</h2>
        </div>
        <Badge tone="warn">Illustrative</Badge>
      </header>
      <dl className="grid gap-5 sm:grid-cols-2">
        <Block k="Problem" v={problem.label} />
        <Block k="What AI does" v={result.summary} />
        <Block
          k="What you approve"
          v="Every outbound quote, chase, and filing. AI drafts. You send."
        />
        <Block
          k="Estimate"
          v={`${rupees(v.annual)} / year in desk time. Payback ~${v.paybackDays} days. Hours released ${Math.round(v.hoursYear)}.`}
        />
        <Block k="Timeline" v="Week 1 sandbox on your RFQs. Week 3–4 owner approval live. 90 days to a measured pilot." />
        <Block
          k="Price range"
          wide
          v={`${dollars(DESK.usdPerHour)} / hour · ${DESK.hoursPerDay} hours / day · ${DESK.daysPerWeek} days / week. Sandbox week ${dollars(sandbox)}. Three weeks to live approval ${dollars(live)}. Then ${dollars(week)} / week if we stay on the desk.`}
        />
      </dl>
      <div className="mt-6">
        <Dialog open={it} onOpenChange={setIt}>
          <DialogTrigger asChild>
            <Button type="button" variant="link">
              For your IT team
            </Button>
          </DialogTrigger>
          <DialogContent title="Technical architecture">
            <ul className="list-disc space-y-2 pl-4 text-sm text-muted">
              <li>PrivacyByAI: offline LLM on mill hardware, hybrid, or a no-train cloud path you sign.</li>
              <li>Rules engine first (constructions, incoterms, yarn sheets). LLM only when fields are thin.</li>
              <li>Keys stay server-side. Browser never sees them.</li>
              <li>Uploaded files are read as text here. Bytes are not sent to a provider that trains on data.</li>
              <li>Autonomy stops at “act with approval” unless you raise it.</li>
              <li>Badges: Demo, Sandbox, Pilot, Production. This page is Sandbox or Demo.</li>
              <li>Audit log of extracts, drafts, and approvals. Mill can export or wipe.</li>
            </ul>
          </DialogContent>
        </Dialog>
      </div>
    </article>
  );
}

function Block({ k, v, wide }: { k: string; v: string; wide?: boolean }) {
  return (
    <div className={wide ? "sm:col-span-2" : undefined}>
      <dt className="text-xs font-medium tracking-wide text-subtle uppercase">{k}</dt>
      <dd className="mt-1 text-sm">{v}</dd>
    </div>
  );
}
