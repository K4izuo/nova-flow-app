import { createFileRoute } from "@tanstack/react-router";
import { Stats } from "@/components/site/Stats";
import { CTA } from "@/components/site/CTA";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — NovaFlow" },
      {
        name: "description",
        content:
          "NovaFlow builds the modern productivity platform for teams. Learn about our mission, values, and the team behind the product.",
      },
      { property: "og:title", content: "About — NovaFlow" },
      {
        property: "og:description",
        content:
          "Our mission is to help teams build better, faster — with one intuitive workspace for the work that matters.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    title: "Clarity over noise",
    body: "We believe great software removes friction instead of adding features. Every decision starts with the customer's outcome.",
  },
  {
    title: "Craft as a competitive edge",
    body: "Taste, performance, and detail compound. We build software we'd want to use — then keep raising the bar.",
  },
  {
    title: "Teams win together",
    body: "Work is a team sport. NovaFlow is built to make collaboration feel effortless — inside your company and with ours.",
  },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="We're building the future of work."
        description="NovaFlow was founded by product and infrastructure operators who believed teams deserved better tools. Today we help thousands of organizations plan, build, and grow together."
      />

      <section className="py-20">
        <div className="container-page grid gap-8 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <div className="rounded-3xl border border-border bg-background p-6 shadow-soft h-full">
                <h3 className="text-lg font-semibold tracking-tight">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Stats />
      <CTA />
    </>
  );
}
