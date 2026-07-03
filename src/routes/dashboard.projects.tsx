import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";
import { ProjectsTable } from "@/components/dashboard/ProjectsTable";
import { CreateProjectModal } from "@/components/dashboard/QuickActions";
import { projects, type ProjectStatus } from "@/data/mock";
import { cx } from "@/lib/cx";

export const Route = createFileRoute("/dashboard/projects")({
  component: ProjectsPage,
});

const filters: Array<ProjectStatus | "All"> = ["All", "On Track", "At Risk", "Delayed", "Completed"];

function ProjectsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesFilter = filter === "All" || p.status === filter;
      const matchesQuery =
        query.trim().length === 0 ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.client.toLowerCase().includes(query.toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Projects</h1>
          <p className="mt-1 text-sm text-muted-foreground">{projects.length} projects across your workspace.</p>
        </div>
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-medium text-white shadow-soft hover:shadow-glow transition-all"
        >
          <Plus className="h-4 w-4" />
          New project
        </button>
      </div>

      <div className="rounded-3xl border border-border bg-background p-6 shadow-soft">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1 rounded-2xl border border-border bg-secondary/50 p-1">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cx(
                  "rounded-xl px-3.5 py-2 text-sm font-medium transition-all",
                  filter === f ? "bg-background text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects…"
              className="w-full rounded-full border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand-primary)]/30"
            />
          </div>
        </div>

        <div className="mt-6">
          {filtered.length > 0 ? (
            <ProjectsTable projects={filtered} />
          ) : (
            <p className="py-10 text-center text-sm text-muted-foreground">No projects match your filters.</p>
          )}
        </div>
      </div>

      <CreateProjectModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
}
