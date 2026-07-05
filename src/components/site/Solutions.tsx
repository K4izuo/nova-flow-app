import {
  Kanban,
  MessagesSquare,
  Cog,
  HeartHandshake,
  LineChart,
  BookOpen,
} from "lucide-react";
import { Reveal, SectionHeader } from "./Section";

const solutions = [
  {
    icon: Kanban,
    title: "Project Management",
    body: "Plan roadmaps, run sprints, and ship on time with flexible views your team will actually use.",
  },
  {
    icon: MessagesSquare,
    title: "Team Collaboration",
    body: "One home for conversations, decisions, and documents — searchable and always in sync.",
  },
  {
    icon: Cog,
    title: "Operations",
    body: "Standardize processes and automate approvals so operations scale without adding headcount.",
  },
  {
    icon: HeartHandshake,
    title: "Customer Success",
    body: "Track accounts, onboarding, and renewals in structured playbooks that drive retention.",
  },
  {
    icon: LineChart,
    title: "Business Analytics",
    body: "Turn operational data into decisions with dashboards and reports built for the whole company.",
  },
  {
    icon: BookOpen,
    title: "Knowledge Management",
    body: "Capture what your team knows in a living knowledge base that stays current as work evolves.",
  },
];

export function Solutions() {
  return (
    <section className="py-24 sm:py-28">
      <div className="container-page">
        <SectionHeader
          eyebrow="Solutions"
          title="Purpose-built for every team you run."
          description="From product to operations, KaizuoDev adapts to how your teams already work — and helps them work better."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <article className="group h-full rounded-3xl border border-border bg-background p-6 shadow-soft transition-all hover:shadow-elevated hover:-translate-y-1">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accent text-[color:var(--accent-solid)]">
                  <s.icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
