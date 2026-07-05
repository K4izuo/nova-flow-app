import { createFileRoute } from "@tanstack/react-router";
import { Solutions } from "@/components/site/Solutions";
import { Testimonials } from "@/components/site/Testimonials";
import { CTA } from "@/components/site/CTA";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — KaizuoDev" },
      {
        name: "description",
        content:
          "Solutions for project management, team collaboration, operations, customer success, analytics, and knowledge management.",
      },
      { property: "og:title", content: "Solutions — KaizuoDev" },
      {
        property: "og:description",
        content:
          "Purpose-built for every team you run — from product and operations to customer success and analytics.",
      },
    ],
  }),
  component: SolutionsPage,
});

function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Built for the way modern teams actually work."
        description="From product to operations, KaizuoDev adapts to how your teams already work — and helps them work better together."
      />
      <Solutions />
      <Testimonials />
      <CTA />
    </>
  );
}
