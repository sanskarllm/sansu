import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AUTONOMY_COPY } from "@/lib/catalog";
import { useMill } from "@/lib/store";
import type { Autonomy } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const ROLES = ["Quotation desk", "Sample desk", "Export docs", "Yarn store", "Quality"];
const TOOLS = ["Inbox", "WhatsApp export", "Price card", "Stock sheet", "Courier AWB", "GST / IEC"];
const KNOWLEDGE = ["Construction cards", "Won/lost quotes", "Buyer list", "Lab-dip library", "CHA checklist"];
const LEVELS = Object.keys(AUTONOMY_COPY) as Autonomy[];

export const Route = createFileRoute("/builder")({ component: Builder });

function Builder() {
  const setCustom = useMill((s) => s.setCustomAgent);
  const [name, setName] = useState("Night quote desk");
  const [role, setRole] = useState(ROLES[0]!);
  const [brief, setBrief] = useState("Draft quotes after 7pm from the shared inbox. Never send.");
  const [tools, setTools] = useState<string[]>(["Inbox", "Price card"]);
  const [knowledge, setKnowledge] = useState<string[]>(["Construction cards"]);
  const [autonomy, setAutonomy] = useState<Autonomy>("approve");

  const agent = useMemo(
    () => ({ name, role, knowledge, tools, autonomy }),
    [name, role, knowledge, tools, autonomy],
  );

  function toggle(list: string[], set: (v: string[]) => void, item: string) {
    set(list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="font-display text-4xl tracking-tight">Agent builder</h1>
      <p className="mt-2 max-w-xl text-muted">
        Role, knowledge, tools, one of four autonomy levels. Humans stay in the fence you draw.
      </p>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]">
        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            setCustom(agent);
          }}
        >
          <div>
            <Label htmlFor="an">Name</Label>
            <Input id="an" className="mt-1" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label>Role</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {ROLES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={cn(
                    "min-h-11 rounded-full border px-3 text-sm",
                    role === r ? "border-primary bg-primary text-primary-fg" : "border-border",
                  )}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="brief">What it is for</Label>
            <Textarea id="brief" className="mt-1 min-h-24" value={brief} onChange={(e) => setBrief(e.target.value)} />
          </div>
          <Chipset label="Knowledge" items={KNOWLEDGE} on={knowledge} onToggle={(i) => toggle(knowledge, setKnowledge, i)} />
          <Chipset label="Tools" items={TOOLS} on={tools} onToggle={(i) => toggle(tools, setTools, i)} />
          <div>
            <Label>Autonomy</Label>
            <ul className="mt-2 grid gap-2 sm:grid-cols-2">
              {LEVELS.map((lv) => (
                <li key={lv}>
                  <button
                    type="button"
                    onClick={() => setAutonomy(lv)}
                    className={cn(
                      "h-full w-full rounded-lg border p-3 text-left",
                      autonomy === lv ? "border-primary bg-primary/10" : "border-border bg-bg-elevated",
                    )}
                  >
                    <p className="font-medium">{AUTONOMY_COPY[lv].label}</p>
                    <p className="mt-1 text-sm text-muted">{AUTONOMY_COPY[lv].line}</p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <Button type="submit">Save to workspace</Button>
        </form>
        <aside className="h-fit rounded-xl border border-border bg-bg-elevated p-4">
          <p className="text-xs tracking-wide text-subtle uppercase">Preview</p>
          <h2 className="font-display mt-1 text-2xl">{name}</h2>
          <p className="mt-2 text-sm text-muted">{brief}</p>
          <p className="mt-3 text-sm">
            <Badge tone="primary">{AUTONOMY_COPY[autonomy].label}</Badge>
          </p>
          <p className="mt-3 text-xs text-muted">{[role, ...knowledge, ...tools].join(" · ")}</p>
          <Button asChild className="mt-6 w-full" variant="outline">
            <Link to="/approval">Watch it work</Link>
          </Button>
        </aside>
      </div>
    </main>
  );
}

function Chipset({
  label,
  items,
  on,
  onToggle,
}: {
  label: string;
  items: string[];
  on: string[];
  onToggle: (i: string) => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => onToggle(i)}
            className={cn(
              "min-h-11 rounded-full border px-3 text-sm",
              on.includes(i) ? "border-ink bg-ink text-bg-elevated" : "border-border",
            )}
          >
            {i}
          </button>
        ))}
      </div>
    </div>
  );
}
