import { Mail } from "lucide-react";
import { Avatar } from "@/components/common/Avatar";
import { Tooltip } from "@/components/common/Tooltip";
import type { TeamMember } from "@/data/mock";

const statusLabel = { online: "Online", away: "Away", offline: "Offline" } as const;

export function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {members.map((member) => (
        <div
          key={member.id}
          className="flex items-center gap-3.5 rounded-2xl border border-border bg-background p-4 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated"
        >
          <Avatar initials={member.initials} status={member.status} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{member.name}</p>
            <p className="truncate text-xs text-muted-foreground">{member.role}</p>
          </div>
          <Tooltip content={`${statusLabel[member.status]} · ${member.email}`}>
            <a
              href={`mailto:${member.email}`}
              aria-label={`Email ${member.name}`}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>
          </Tooltip>
        </div>
      ))}
    </div>
  );
}
