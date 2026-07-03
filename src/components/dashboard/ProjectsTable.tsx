import { MoreHorizontal } from "lucide-react";
import { Avatar } from "@/components/common/Avatar";
import { Badge } from "@/components/common/Badge";
import { Dropdown, DropdownItem } from "@/components/common/Dropdown";
import type { Project, ProjectStatus } from "@/data/mock";

const statusTone: Record<ProjectStatus, "success" | "warning" | "danger" | "brand"> = {
  "On Track": "success",
  "At Risk": "warning",
  Delayed: "danger",
  Completed: "brand",
};

export function ProjectsTable({ projects }: { projects: Project[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <th className="py-3 pr-4 font-medium">Project</th>
            <th className="py-3 pr-4 font-medium">Status</th>
            <th className="py-3 pr-4 font-medium">Owner</th>
            <th className="py-3 pr-4 font-medium">Progress</th>
            <th className="py-3 pr-4 font-medium">Last Updated</th>
            <th className="py-3 pr-2 font-medium" />
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-b border-border last:border-0 hover:bg-secondary/40 transition-colors">
              <td className="py-3.5 pr-4">
                <p className="font-medium text-foreground">{project.name}</p>
                <p className="text-xs text-muted-foreground">{project.client}</p>
              </td>
              <td className="py-3.5 pr-4">
                <Badge tone={statusTone[project.status]}>{project.status}</Badge>
              </td>
              <td className="py-3.5 pr-4">
                <div className="flex items-center gap-2">
                  <Avatar initials={project.owner.initials} size="sm" />
                  <span className="text-foreground">{project.owner.name}</span>
                </div>
              </td>
              <td className="py-3.5 pr-4">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-24 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-gradient-brand"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{project.progress}%</span>
                </div>
              </td>
              <td className="py-3.5 pr-4 text-muted-foreground">{project.updatedAt}</td>
              <td className="py-3.5 pr-2 text-right">
                <Dropdown
                  align="end"
                  width="w-44"
                  trigger={(props) => (
                    <button
                      {...props}
                      aria-label="Project actions"
                      className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  )}
                >
                  <DropdownItem>View details</DropdownItem>
                  <DropdownItem>Edit project</DropdownItem>
                  <DropdownItem danger>Archive</DropdownItem>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
