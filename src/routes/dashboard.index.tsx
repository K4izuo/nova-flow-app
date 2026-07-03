import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FolderKanban, CheckCircle2, Users, Activity } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { LineChart } from "@/components/dashboard/charts/LineChart";
import { BarChart } from "@/components/dashboard/charts/BarChart";
import { DonutChart } from "@/components/dashboard/charts/DonutChart";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { ProjectsTable } from "@/components/dashboard/ProjectsTable";
import { TaskList } from "@/components/dashboard/TaskList";
import { TeamGrid } from "@/components/dashboard/TeamGrid";
import { FilesList } from "@/components/dashboard/FilesList";
import { NotificationsList } from "@/components/dashboard/NotificationsList";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { useAuth } from "@/contexts/AuthContext";
import {
  statCards,
  projects,
  initialTasks,
  teamMembers,
  files,
  notifications,
  activity,
  monthlyActivitySeries,
  weeklyTasksSeries,
  projectStatusBreakdown,
} from "@/data/mock";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardOverview,
});

const statIcons = [FolderKanban, CheckCircle2, Users, Activity];

function SectionCard({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-border bg-background p-6 shadow-soft">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-base font-semibold tracking-tight text-foreground">{title}</h3>
        {action}
      </div>
      {children}
    </div>
  );
}

function DashboardOverview() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Welcome back, {user?.fullName?.split(" ")[0] ?? "there"} 👋
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Here's what's happening across your workspace today.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat, i) => (
          <StatCard key={stat.label} {...stat} icon={statIcons[i]!} />
        ))}
      </div>

      <SectionCard title="Quick actions">
        <QuickActions />
      </SectionCard>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <SectionCard title="Monthly activity">
            <LineChart data={monthlyActivitySeries} />
          </SectionCard>
        </div>
        <SectionCard title="Project status">
          <DonutChart data={projectStatusBreakdown} />
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <SectionCard title="Tasks completed this week">
            <BarChart data={weeklyTasksSeries} />
          </SectionCard>
        </div>
        <SectionCard title="Recent activity">
          <ActivityTimeline items={activity} />
        </SectionCard>
      </div>

      <SectionCard title="Projects">
        <ProjectsTable projects={projects} />
      </SectionCard>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SectionCard title="Upcoming tasks">
          <TaskList tasks={tasks} onToggle={toggleTask} />
        </SectionCard>
        <SectionCard title="Recent notifications">
          <NotificationsList items={notifications.slice(0, 4)} />
        </SectionCard>
      </div>

      <SectionCard title="Team members">
        <TeamGrid members={teamMembers} />
      </SectionCard>

      <SectionCard title="Recent files">
        <FilesList files={files.slice(0, 4)} />
      </SectionCard>
    </div>
  );
}
