import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/site/ContactForm";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — NovaFlow" },
      {
        name: "description",
        content:
          "Get in touch with the NovaFlow team. Talk to sales, request a demo, or ask a question — we usually reply within one business day.",
      },
      { property: "og:title", content: "Contact — NovaFlow" },
      {
        property: "og:description",
        content:
          "Talk to sales, request a demo, or ask a question — the NovaFlow team is here to help.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your team."
        description="Whether you want a demo, help choosing a plan, or answers on security and integrations — we're one message away."
      />

      <section className="py-16">
        <div className="container-page grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            <InfoRow
              icon={Mail}
              title="Email"
              body="hello@novaflow.com"
              hint="We typically respond within one business day."
            />
            <InfoRow
              icon={MessageCircle}
              title="Live chat"
              body="Available in-app, 24/7"
              hint="Existing customers can reach us anytime from the workspace."
            />
            <InfoRow
              icon={MapPin}
              title="Headquarters"
              body="San Francisco, California"
              hint="With teammates working from 14 countries around the world."
            />
          </div>
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}

function InfoRow({
  icon: Icon,
  title,
  body,
  hint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
  hint: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-3xl border border-border bg-background p-5 shadow-soft">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent text-[color:var(--accent-solid)]">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-sm text-foreground">{body}</div>
        <div className="mt-1 text-xs text-muted-foreground">{hint}</div>
      </div>
    </div>
  );
}
