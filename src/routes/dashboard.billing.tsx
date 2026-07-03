import { createFileRoute } from "@tanstack/react-router";
import { CreditCard, Download } from "lucide-react";
import { Badge } from "@/components/common/Badge";
import { invoices } from "@/data/mock";

export const Route = createFileRoute("/dashboard/billing")({
  component: BillingPage,
});

function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Billing</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your subscription, usage, and invoices.</p>
      </div>

      <div className="rounded-3xl bg-gradient-brand p-6 text-white shadow-elevated sm:p-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
              Current plan
            </span>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">Growth — $99/month</h2>
            <p className="mt-1 text-sm text-white/80">Renews on August 1, 2026 · Unlimited projects, 50 seats</p>
          </div>
          <div className="flex gap-2">
            <button className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-[color:var(--brand-secondary)] hover:bg-white/90 transition-colors">
              Upgrade plan
            </button>
            <button className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-border bg-background p-6 shadow-soft lg:col-span-2">
          <h3 className="text-base font-semibold tracking-tight text-foreground">Usage this cycle</h3>
          <div className="mt-5 space-y-5">
            {[
              { label: "Team seats", used: 38, total: 50 },
              { label: "Storage", used: 92, total: 100 },
              { label: "Automations run", used: 640, total: 1000 },
            ].map((row) => (
              <div key={row.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{row.label}</span>
                  <span className="text-muted-foreground">
                    {row.used}/{row.total}
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-brand"
                    style={{ width: `${(row.used / row.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-background p-6 shadow-soft">
          <h3 className="text-base font-semibold tracking-tight text-foreground">Payment method</h3>
          <div className="mt-4 flex items-center gap-3 rounded-2xl border border-border p-4">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-[color:var(--accent-solid)]">
              <CreditCard className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-medium text-foreground">Visa •••• 4242</p>
              <p className="text-xs text-muted-foreground">Expires 08/28</p>
            </div>
          </div>
          <button className="mt-4 w-full rounded-full border border-border py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors">
            Update payment method
          </button>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-background p-6 shadow-soft">
        <h3 className="text-base font-semibold tracking-tight text-foreground">Invoice history</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                <th className="py-3 pr-4 font-medium">Invoice</th>
                <th className="py-3 pr-4 font-medium">Date</th>
                <th className="py-3 pr-4 font-medium">Amount</th>
                <th className="py-3 pr-4 font-medium">Status</th>
                <th className="py-3 pr-2 font-medium" />
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-border last:border-0">
                  <td className="py-3.5 pr-4 font-medium text-foreground">{inv.id}</td>
                  <td className="py-3.5 pr-4 text-muted-foreground">{inv.date}</td>
                  <td className="py-3.5 pr-4 text-muted-foreground">{inv.amount}</td>
                  <td className="py-3.5 pr-4">
                    <Badge tone="success">{inv.status}</Badge>
                  </td>
                  <td className="py-3.5 pr-2 text-right">
                    <button
                      aria-label={`Download ${inv.id}`}
                      className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
