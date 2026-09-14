import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "muted",
  children,
}: {
  className?: string;
  tone?: "muted" | "primary" | "ok" | "warn" | "danger" | "ink";
  children: ReactNode;
}) {

  const tones = {
    muted: "bg-surface text-muted border-border",
    primary: "bg-primary/10 text-primary border-primary/20",
    ok: "bg-ok/10 text-ok border-ok/20",
    warn: "bg-warn/10 text-warn border-warn/20",
    danger: "bg-danger/10 text-danger border-danger/20",
    ink: "bg-ink text-bg-elevated border-ink",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
