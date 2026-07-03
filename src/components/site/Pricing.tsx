import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Reveal, SectionHeader } from "./Section";

const tiers = [
  {
    name: "Starter",
    price: "Free",
    period: "forever",
    description: "For individuals and small teams getting started.",
    features: [
      "Up to 5 workspace members",
      "Unlimited projects",
      "Basic automations",
      "Community support",
    ],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Professional",
    price: "$29",
    period: "per user / month",
    description: "For growing teams that need more power and flexibility.",
    features: [
      "Everything in Starter",
      "Advanced automations",
      "Analytics dashboard",
      "80+ integrations",
      "Priority email support",
    ],
    cta: "Start free trial",
    featured: true,
  },
  {
    name: "Business",
    price: "$99",
    period: "per user / month",
    description: "For scaling organizations with cross-functional needs.",
    features: [
      "Everything in Professional",
      "SSO & advanced permissions",
      "Audit logs",
      "Custom workflows",
      "Dedicated success manager",
    ],
    cta: "Start free trial",
    featured: false,
  },
  {
    name: "Enterprise",
    price: "Contact",
    period: "custom pricing",
    description: "For enterprises with compliance and scale requirements.",
    features: [
      "SOC 2, DPA, & custom MSA",
      "SAML SSO & SCIM",
      "Advanced security controls",
      "24/7 premium support",
      "Onboarding & migration",
    ],
    cta: "Contact sales",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 sm:py-28">
      <div className="container-page">
        <SectionHeader
          eyebrow="Pricing"
          title="Simple pricing that scales with your team."
          description="Start free. Upgrade when you're ready. No hidden fees, ever."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.05}>
              <div
                className={`relative h-full flex flex-col rounded-3xl border p-6 transition-all ${
                  t.featured
                    ? "border-transparent bg-gradient-brand text-white shadow-elevated"
                    : "border-border bg-background shadow-soft hover:shadow-elevated"
                }`}
              >
                {t.featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[color:var(--brand-secondary)] shadow-soft">
                    Most popular
                  </span>
                )}
                <div>
                  <h3 className="text-lg font-semibold">{t.name}</h3>
                  <p
                    className={`mt-1 text-sm ${
                      t.featured ? "text-white/80" : "text-muted-foreground"
                    }`}
                  >
                    {t.description}
                  </p>
                </div>
                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tracking-tight">{t.price}</span>
                  <span
                    className={`text-sm ${
                      t.featured ? "text-white/80" : "text-muted-foreground"
                    }`}
                  >
                    {t.period}
                  </span>
                </div>

                <ul className="mt-6 space-y-3 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          t.featured ? "text-white" : "text-[color:var(--brand-primary)]"
                        }`}
                        aria-hidden
                      />
                      <span className={t.featured ? "text-white/90" : "text-foreground"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`mt-8 inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                    t.featured
                      ? "bg-white text-[color:var(--brand-secondary)] hover:bg-white/90"
                      : "bg-foreground text-background hover:opacity-90"
                  }`}
                >
                  {t.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
