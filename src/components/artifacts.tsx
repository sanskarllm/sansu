import type { Artifact } from "@/lib/types";

function looksLikeMoney(v: string) {
  return /^₹/.test(v);
}

export function Artifacts({ items }: { items: Artifact[] }) {
  return (
    <div className="space-y-4">
      {items.map((a, i) => (
        <section key={`${a.type}-${i}`} className="rounded-lg border border-border bg-bg-elevated p-3">
          <h3 className="mb-3 text-sm font-medium">{a.title}</h3>
          {a.type === "quote" ? (
            <dl className="divide-y divide-border">
              {a.rows.map((r) => (
                <div key={r.label} className="flex justify-between gap-4 py-1.5 text-sm">
                  <dt className="text-muted">{r.label}</dt>
                  <dd className={looksLikeMoney(r.value) ? "tabular-nums font-medium" : "text-right"}>
                    {r.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
          {a.type === "quote" && a.notes.length ? (
            <ul className="mt-3 list-disc space-y-1 pl-4 text-xs text-muted">
              {a.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          ) : null}
          {a.type === "table" ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs tracking-wide text-subtle uppercase">
                    {a.columns.map((c) => (
                      <th key={c} className="px-2 py-1.5 font-medium">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {a.rows.map((row, ri) => (
                    <tr key={ri} className="border-b border-border/70">
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-2 py-1.5 whitespace-nowrap">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
          {a.type === "draft" ? (
            <pre className="overflow-x-auto whitespace-pre-wrap font-sans text-sm text-fg">{a.body}</pre>
          ) : null}
          {a.type === "missing" ? (
            <ul className="list-disc space-y-1 pl-4 text-sm text-muted">
              {a.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  );
}
