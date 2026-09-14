import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DESK, deskUsd, usdToInr } from "@/lib/catalog";
import { useMill, valueOf } from "@/lib/store";
import { dollars, inNum, rupees } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ValueEstimate() {
  const { estimate, setEstimate } = useMill();
  const v = valueOf(estimate);
  const data = [
    { name: "Today", hours: (estimate.rfqsPerMonth * estimate.minutesToday) / 60 },
    { name: "With AI", hours: (estimate.rfqsPerMonth * estimate.minutesWithAi) / 60 },
  ];
  const sandboxUsd = deskUsd(1);
  const sandboxInr = usdToInr(sandboxUsd);

  return (
    <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
      <div className="space-y-4">
        <div>
          <Label htmlFor="rfqs">RFQs / month</Label>
          <Input
            id="rfqs"
            type="number"
            min={1}
            className="mt-1 tabular-nums"
            value={estimate.rfqsPerMonth}
            onChange={(e) => setEstimate({ rfqsPerMonth: Number(e.target.value) || 0 })}
          />
        </div>
        <div>
          <Label htmlFor="mins">Minutes a quote today</Label>
          <Input
            id="mins"
            type="number"
            min={1}
            className="mt-1 tabular-nums"
            value={estimate.minutesToday}
            onChange={(e) => setEstimate({ minutesToday: Number(e.target.value) || 0 })}
          />
        </div>
        <div>
          <Label htmlFor="cost">Loaded ₹ / hour (merchandiser)</Label>
          <Input
            id="cost"
            type="number"
            min={1}
            className="mt-1 tabular-nums"
            value={estimate.costPerHour}
            onChange={(e) => setEstimate({ costPerHour: Number(e.target.value) || 0 })}
          />
        </div>
        <p className="text-xs text-subtle">
          With-AI minutes fixed at {estimate.minutesWithAi}. Our desk is {dollars(DESK.usdPerHour)}{" "}
          / hour, {DESK.hoursPerDay} hours / day, {DESK.daysPerWeek} days / week. Sandbox week{" "}
          {dollars(sandboxUsd)} ({rupees(sandboxInr)} at ₹{DESK.inrPerUsd}/$).
        </p>
      </div>
      <div>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Badge tone="warn">Illustrative</Badge>
          <span className="text-sm text-muted">Not a quotation. Assumptions are listed.</span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat k="Hours released / year" v={`${inNum(v.hoursYear, 0)} h`} />
          <Stat k="Annual value" v={rupees(v.annual)} />
          <Stat k="Payback" v={`${v.paybackDays} days`} />
          <Stat k="Hours / month" v={`${inNum(v.hoursMonth, 1)} h`} />
        </div>
        <div className="mt-6 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" tick={{ fill: "currentColor", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                formatter={(val) => [`${inNum(Number(val), 1)} h / month`, "Desk time"]}
                contentStyle={{
                  background: "var(--color-bg-elevated)",
                  border: "1px solid var(--color-border)",
                  borderRadius: 8,
                }}
              />
              <Bar dataKey="hours" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <ul className="mt-4 list-disc space-y-1 pl-4 text-sm text-muted">
          <li>Hours = RFQs × (today − with AI) × 12.</li>
          <li>Value = hours × mill loaded cost. No win-rate lift counted.</li>
          <li>
            Payback uses one sandbox week ({dollars(sandboxUsd)} / {rupees(estimate.setupCost)}) against monthly mill value.
          </li>
          <li>
            Our rate is {dollars(DESK.usdPerHour)} / hour × {DESK.hoursPerDay} h × {DESK.daysPerWeek} days ={" "}
            {dollars(deskUsd(1))} / week.
          </li>
          <li>Owner approval time stays in the with-AI path.</li>
        </ul>
      </div>
    </div>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-md border border-border bg-surface p-3">
      <p className="text-xs text-subtle">{k}</p>
      <p className="font-display mt-1 text-2xl tabular-nums tracking-tight">{v}</p>
    </div>
  );
}
