import { Link } from "@tanstack/react-router";
import { Menu, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const LINKS = [
  { to: "/lab", label: "Lab" },
  { to: "/workforce", label: "Workforce" },
  { to: "/company", label: "Company" },
  { to: "/privacy", label: "Privacy" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader({ onSearch }: { onSearch: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-sm bg-primary text-primary-fg">
            <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
              <g fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M2 5h12M2 8h12M2 11h12" />
                <path d="M5 2v12M8 2v12M11 2v12" />
              </g>
            </svg>
          </span>
          <span className="font-display text-lg tracking-tight">PrivacyByAI</span>
        </Link>
        <nav className="ml-4 hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm text-muted hover:bg-surface hover:text-fg"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <Button type="button" variant="ghost" size="sm" onClick={onSearch} className="hidden sm:inline-flex">
            <Search className="size-4" />
            Ask AI
            <kbd className="ml-2 rounded border border-border px-1.5 text-[0.65rem] text-subtle">Ctrl K</kbd>
          </Button>
          <Button type="button" variant="ghost" size="icon" className="sm:hidden" onClick={onSearch} aria-label="Ask AI">
            <Search className="size-4" />
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button type="button" variant="ghost" size="icon" className="lg:hidden" aria-label="Menu">
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent title="PrivacyByAI">
              <nav className="flex flex-col gap-1">
                {LINKS.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="rounded-md px-3 py-3 text-sm hover:bg-surface"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
                <Link to="/services" className="rounded-md px-3 py-3 text-sm hover:bg-surface" onClick={() => setOpen(false)}>
                  Services
                </Link>
                <Link to="/security" className="rounded-md px-3 py-3 text-sm hover:bg-surface" onClick={() => setOpen(false)}>
                  Security
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
