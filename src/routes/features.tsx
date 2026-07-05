import { createFileRoute } from "@tanstack/react-router";
import { Features } from "@/components/site/Features";
import { HowItWorks } from "@/components/site/HowItWorks";
import { CTA } from "@/components/site/CTA";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — KaizuoDev" },
      {
        name: "description",
        content:
          "Explore KaizuoDev's features: smart workspaces, workflow automation, team collaboration, analytics, security, and 80+ integrations.",
      },
      { property: "og:title", content: "Features — KaizuoDev" },
      {
        property: "og:description",
        content:
          "Smart workspaces, automations, analytics, and integrations — everything modern teams need to build and grow.",
      },
    ],
  }),
  component: FeaturesPage,
});

function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Features"
        title="A refined toolkit for modern teams."
        description="Every capability you need to plan, execute, and ship — designed with the taste of a consumer product and the depth of an enterprise one."
      />
      <Features />
      <HowItWorks />
      <CTA />
    </>
  );
}
