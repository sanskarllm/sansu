import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMill, valueOf } from "@/lib/store";
import { dollars, rupees, uid } from "@/lib/utils";
import { DESK, deskUsd } from "@/lib/catalog";
import type { Lead } from "@/lib/types";

export function Handoff() {
  const { millName, setMillName, saveLead, result, estimate, track, pushAudit, setPlanId } = useMill();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const v = valueOf(estimate);

  function planText() {
    return `Millhand plan for ${millName || "our mill"}\n${result?.title ?? ""}\nIllustrative annual value ${rupees(v.annual)}, payback ~${v.paybackDays} days.\nOur rate: ${dollars(DESK.usdPerHour)}/hour, ${DESK.hoursPerDay}h/day, ${DESK.daysPerWeek} days/week. Sandbox week ${dollars(deskUsd(1))}.`;
  }

  function commit(channel: Lead["channel"]) {
    if (!name.trim() || !phone.trim()) {
      toast("Name and WhatsApp / phone are needed here — not on the first screen.");
      return null;
    }
    const planId = uid("plan");
    const lead: Lead = {
      name: name.trim(),
      mill: millName || "Unnamed mill",
      phone: phone.trim(),
      email: email.trim(),
      channel,
      planId,
      at: new Date().toISOString(),
    };
    saveLead(lead);
    setPlanId(planId);
    track("handoff", channel);
    pushAudit({ actor: name.trim(), action: "Plan sent", detail: channel });
    try {
      localStorage.setItem(`millhand-plan-${planId}`, JSON.stringify({ lead, result, estimate }));
    } catch {
      /* ignore quota */
    }
    return lead;
  }

  function whatsapp() {
    const lead = commit("whatsapp");
    if (!lead) return;
    const url = `https://wa.me/?text=${encodeURIComponent(planText())}`;
    window.open(url, "_blank", "noopener,noreferrer");
    toast("WhatsApp opened with the plan text.");
  }

  function mail() {
    const lead = commit("email");
    if (!lead) return;
    window.location.href = `mailto:${email || ""}?subject=${encodeURIComponent("Millhand AI plan")}&body=${encodeURIComponent(planText())}`;
    toast("Email draft opened.");
  }

  function call() {
    const lead = commit("call");
    if (!lead) return;
    toast("We’ll use this number to book a call. No auto-dial.");
  }

  function share() {
    const lead = commit("link");
    if (!lead) return;
    const url = `${window.location.origin}/p/${lead.planId}`;
    void navigator.clipboard.writeText(url);
    toast("Link copied. It opens this plan on this browser.");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_16rem]">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          call();
        }}
      >
        <p className="text-sm text-muted">
          Contact details are asked here, at peak interest — not at the start.
        </p>
        <div>
          <Label htmlFor="person">Your name</Label>
          <Input id="person" className="mt-1" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="mill">Mill</Label>
          <Input
            id="mill"
            className="mt-1"
            value={millName}
            onChange={(e) => setMillName(e.target.value)}
            placeholder="Khanna Weaves Pvt. Ltd."
          />
        </div>
        <div>
          <Label htmlFor="phone">WhatsApp / phone</Label>
          <Input id="phone" className="mt-1" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="email">Email (optional)</Label>
          <Input id="email" type="email" className="mt-1" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <Button type="button" onClick={whatsapp}>
            Send on WhatsApp
          </Button>
          <Button type="submit" variant="outline">
            Book a call
          </Button>
          <Button type="button" variant="outline" onClick={mail}>
            Email the plan
          </Button>
          <Button type="button" variant="outline" onClick={share}>
            Copy a link
          </Button>
        </div>
      </form>
      <aside className="rounded-lg border border-border bg-surface p-4 text-sm text-muted">
        <p className="font-medium text-fg">Where the plan goes</p>
        <p className="mt-2">WhatsApp opens with the text. The link stays on this device. A person reads it when you’re ready — not a bot.</p>
      </aside>
    </div>
  );
}
