import { Reveal, SectionHeader } from "./Section";

const steps = [
  {
    n: "01",
    title: "Create your workspace",
    body: "Spin up a workspace in seconds, then shape it around your team, projects, and cadences.",
  },
  {
    n: "02",
    title: "Invite your team",
    body: "Bring collaborators in with SSO or email. Roles and permissions keep everyone in the right lane.",
  },
  {
    n: "03",
    title: "Organize your work",
    body: "Plan projects, structure tasks, and automate the busywork so your team ships what matters.",
  },
  {
    n: "04",
    title: "Track progress and grow",
    body: "Turn signal into insight with dashboards that show what's on track — and what needs attention.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 sm:py-28 bg-secondary/40">
      <div className="container-page">
        <SectionHeader
          eyebrow="How it works"
          title="From setup to scale in four simple steps."
          description="Get your team producing on day one — no long onboarding, no consultants required."
        />

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <li className="relative h-full rounded-3xl border border-border bg-background p-6 shadow-soft">
                <span className="text-sm font-semibold text-gradient">{s.n}</span>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
