import { createFileRoute } from "@tanstack/react-router";
import { LineChart } from "@/components/dashboard/charts/LineChart";
import { BarChart } from "@/components/dashboard/charts/BarChart";
import { DonutChart } from "@/components/dashboard/charts/DonutChart";
import { monthlyActivitySeries, weeklyTasksSeries, projectStatusBreakdown, statCards } from "@/data/mock";

export const Route = createFileRoute("/dashboard/analytics")({
  component: AnalyticsPage,
});

function Card({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-border bg-background p-6 shadow-soft">
      <h3 className="text-base font-semibold tracking-tight text-foreground">{title}</h3>
      {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
      <div className="mt-5">{children}</div>
    </div>
  );
}

function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">A closer look at how your workspace is performing.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <div key={stat.label} className="rounded-3xl border border-border bg-background p-6 shadow-soft">
            <p className="text-2xl font-semibold tracking-tight text-foreground">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            <p className={`mt-2 text-xs font-medium ${stat.trend === "up" ? "text-emerald-600" : "text-destructive"}`}>
              {stat.delta} vs. last month
            </p>
          </div>
        ))}
      </div>

      <Card title="Activity over time" subtitle="Total workspace activity across the last 12 months.">
        <LineChart data={monthlyActivitySeries} />
      </Card>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Card title="Tasks completed" subtitle="Daily completions across your team this week.">
            <BarChart data={weeklyTasksSeries} />
          </Card>
        </div>
        <Card title="Project health" subtitle="Current status across all projects.">
          <DonutChart data={projectStatusBreakdown} />
        </Card>
      </div>
    </div>
  );
}
