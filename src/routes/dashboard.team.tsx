import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { UserPlus } from "lucide-react";
import { TeamGrid } from "@/components/dashboard/TeamGrid";
import { InviteTeamModal } from "@/components/dashboard/QuickActions";
import { teamMembers } from "@/data/mock";

export const Route = createFileRoute("/dashboard/team")({
  component: TeamPage,
});

function TeamPage() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const onlineCount = teamMembers.filter((m) => m.status === "online").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Team</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {teamMembers.length} members · {onlineCount} online now
          </p>
        </div>
        <button
          type="button"
          onClick={() => setInviteOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-medium text-white shadow-soft hover:shadow-glow transition-all"
        >
          <UserPlus className="h-4 w-4" />
          Invite team
        </button>
      </div>

      <div className="rounded-3xl border border-border bg-background p-6 shadow-soft">
        <TeamGrid members={teamMembers} />
      </div>

      <InviteTeamModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </div>
  );
}
