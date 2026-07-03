import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { cx } from "@/lib/cx";

export function StatCard({
  label,
  value,
  delta,
  trend,
  icon: Icon,
}: {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
  icon: LucideIcon;
}) {
  return (
    <div className="rounded-3xl border border-border bg-background p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated">
      <div className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent text-[color:var(--accent-solid)]">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <span
          className={cx(
            "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
            trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-destructive",
          )}
        >
          {trend === "up" ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          {delta}
        </span>
      </div>
      <p className="mt-5 text-3xl font-semibold tracking-tight text-foreground">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
