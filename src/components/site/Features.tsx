import {
  LayoutGrid,
  Workflow,
  Users,
  BarChart3,
  ShieldCheck,
  Plug,
} from "lucide-react";
import { Reveal, SectionHeader } from "./Section";

const features = [
  {
    icon: LayoutGrid,
    title: "Smart Workspaces",
    body: "Organize projects, docs, and tasks in a single, structured home so every team knows where work happens.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    body: "Replace repetitive handoffs with visual automations that move work forward while your team stays focused.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    body: "Real-time comments, mentions, and shared views keep everyone aligned without another status meeting.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    body: "Track velocity, workload, and outcomes with live dashboards built for operators, not spreadsheets.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Platform",
    body: "SOC 2 Type II, SSO, granular permissions, and audit logs — enterprise-grade security by default.",
  },
  {
    icon: Plug,
    title: "Powerful Integrations",
    body: "Connect Slack, GitHub, Google Workspace, Figma, and 80+ tools your team already relies on.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-28">
      <div className="container-page">
        <SectionHeader
          eyebrow="Features"
          title="Everything your team needs, nothing you don't."
          description="A refined toolkit for planning, executing, and shipping work — designed for teams that value clarity as much as speed."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <article className="group h-full rounded-3xl border border-border bg-background p-6 shadow-soft transition-all hover:shadow-elevated hover:-translate-y-1">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-brand text-white shadow-soft">
                  <f.icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
