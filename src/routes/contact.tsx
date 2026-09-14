import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { COMPANY, MODES } from "@/lib/company";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMill } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({ component: Contact });

function Contact() {
  const track = useMill((s) => s.track);
  const push = useMill((s) => s.pushAudit);
  const [name, setName] = useState("");
  const [firm, setFirm] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [mode, setMode] = useState(MODES[0]!.id);
  const [note, setNote] = useState("");

  function send() {
    if (!name.trim() || !phone.trim()) {
      toast("Name and phone — we ask here, not on the first screen.");
      return;
    }
    track("contact", mode);
    push({
      actor: name.trim(),
      action: "Contact the desk",
      detail: `${mode} · ${firm || "unnamed mill"}`,
    });
    toast("Noted on this desk. A person reads it — not a bot.");
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <p className="text-sm text-primary">{COMPANY.name} desk</p>
      <h1 className="font-display mt-2 text-4xl tracking-tight">Where should we write back?</h1>
      <p className="mt-2 max-w-xl text-muted">
        Offline install, hybrid fence, or a Millhand sandbox. Contact is asked here. Founded {COMPANY.founded} by{" "}
        {COMPANY.founder}.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_16rem]">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            send();
          }}
        >
          <div>
            <Label htmlFor="cn">Your name</Label>
            <Input id="cn" className="mt-1" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="cf">Company / mill</Label>
            <Input id="cf" className="mt-1" value={firm} onChange={(e) => setFirm(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="cp">WhatsApp / phone</Label>
            <Input id="cp" className="mt-1" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="ce">Email (optional)</Label>
            <Input id="ce" type="email" className="mt-1" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label>Interest</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMode(m.id)}
                  className={cn(
                    "min-h-11 rounded-full border px-3 text-sm",
                    mode === m.id ? "border-primary bg-primary text-primary-fg" : "border-border",
                  )}
                >
                  {m.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="note">What should stay on the floor?</Label>
            <Textarea
              id="note"
              className="mt-1 min-h-28"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. price cards offline, quotes with owner approval"
            />
          </div>
          <Button type="submit">Send to the desk</Button>
        </form>
        <aside className="h-fit rounded-lg border border-border bg-surface p-4 text-sm text-muted">
          <p className="font-medium text-fg">A person reads this</p>
          <p className="mt-2">
            No auto-dial, no newsletter. India, mill hours. If you only wanted the product,{" "}
            <span className="text-fg">Give AI the work</span> on the home page is enough.
          </p>
        </aside>
      </div>
    </main>
  );
}
