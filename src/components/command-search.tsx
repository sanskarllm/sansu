import { useEffect, useMemo, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { Command } from "cmdk";
import { SEARCH_INDEX } from "@/lib/catalog";
import { useMill } from "@/lib/store";

export function CommandSearch({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const router = useRouter();
  const track = useMill((s) => s.track);
  const [q, setQ] = useState("");

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const items = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return SEARCH_INDEX;
    return SEARCH_INDEX.filter((i) =>
      [i.title, i.blurb, i.kind, ...i.tags].join(" ").toLowerCase().includes(s),
    );
  }, [q]);

  const grouped = useMemo(() => {
    const g: Record<string, typeof items> = {};
    for (const i of items) {
      (g[i.kind] ??= []).push(i);
    }
    return g;
  }, [items]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button type="button" className="absolute inset-0 bg-ink/40" aria-label="Close search" onClick={() => onOpenChange(false)} />
      <div className="relative mx-auto mt-[12vh] w-[min(100%-1.5rem,36rem)] rounded-xl border border-border bg-bg-elevated p-2 shadow-[var(--shadow-border-hover)]">
        <Command label="Ask AI" shouldFilter={false}>
          <Command.Input
            autoFocus
            value={q}
            onValueChange={setQ}
            placeholder="Agents, demos, workflows, cases…"
            className="h-11 w-full border-b border-border bg-transparent px-3 text-sm outline-none placeholder:text-subtle"
          />
          <Command.List className="max-h-80 overflow-y-auto p-1">
            <Command.Empty className="px-3 py-6 text-sm text-muted">
              No match. Try RFQ, export docs, or sample tracking.
            </Command.Empty>
            {Object.entries(grouped).map(([kind, list]) => (
              <Command.Group key={kind} heading={kind} className="p-1 text-xs tracking-wide text-subtle uppercase">
                {list.map((i) => (
                  <Command.Item
                    key={i.id}
                    value={i.id}
                    onSelect={() => {
                      track("search", i.href);
                      onOpenChange(false);
                      setQ("");
                      router.history.push(i.href);
                    }}
                    className="flex cursor-pointer flex-col rounded-md px-3 py-2 text-left normal-case data-[selected=true]:bg-surface"
                  >
                    <span className="text-sm font-medium text-fg">{i.title}</span>
                    <span className="text-xs font-normal text-muted">{i.blurb}</span>
                  </Command.Item>
                ))}
              </Command.Group>
            ))}
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
