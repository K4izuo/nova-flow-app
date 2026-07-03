import { createFileRoute } from "@tanstack/react-router";
import { Pricing } from "@/components/site/Pricing";
import { FAQ } from "@/components/site/FAQ";
import { CTA } from "@/components/site/CTA";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — NovaFlow" },
      {
        name: "description",
        content:
          "Simple, transparent pricing for teams of every size. Start free, upgrade when you're ready. No hidden fees.",
      },
      { property: "og:title", content: "Pricing — NovaFlow" },
      {
        property: "og:description",
        content:
          "Simple, transparent pricing for teams of every size. Start free with NovaFlow.",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Simple pricing that scales with your team."
        description="Start free and upgrade when you're ready. Every plan includes unlimited projects and a 14-day trial of Professional."
      />
      <Pricing />
      <FAQ />
      <CTA />
    </>
  );
}
