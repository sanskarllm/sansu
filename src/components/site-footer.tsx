import { Link } from "@tanstack/react-router";
import { COMPANY } from "@/lib/company";

const COLS = [
  {
    h: "Product",
    links: [
      { to: "/", label: "Millhand" },
      { to: "/lab", label: "Lab" },
      { to: "/rfq", label: "RFQ" },
      { to: "/workforce", label: "Workforce" },
      { to: "/cases", label: "Cases" },
    ],
  },
  {
    h: "Company",
    links: [
      { to: "/company", label: "About" },
      { to: "/services", label: "Services" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    h: "Privacy first",
    links: [
      { to: "/privacy", label: "Privacy" },
      { to: "/security", label: "Security" },
      { to: "/approval", label: "Approval" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-bg">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-xl tracking-tight">{COMPANY.name}</p>
          <p className="mt-2 text-sm text-muted">{COMPANY.line}</p>
          <p className="mt-3 text-xs text-subtle">
            Founded {COMPANY.founded} by {COMPANY.founder} · {COMPANY.place}
          </p>
        </div>
        {COLS.map((c) => (
          <nav key={c.h}>
            <p className="text-xs font-medium tracking-wide text-subtle uppercase">{c.h}</p>
            <ul className="mt-3 space-y-2 text-sm">
              {c.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-muted hover:text-fg">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-subtle">
          {COMPANY.product} is a PrivacyByAI desk. Offline LLM or fenced cloud. We do not train on your mill.
        </p>
      </div>
    </footer>
  );
}
