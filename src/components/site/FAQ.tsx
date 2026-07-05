import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeader } from "./Section";

const faqs = [
  {
    q: "How does KaizuoDev's pricing work?",
    a: "Every plan starts with a free 14-day trial of Professional — no credit card required. After the trial you can stay on the Starter plan for free, upgrade to Professional or Business per user per month, or talk to our team about a custom Enterprise agreement.",
  },
  {
    q: "How does KaizuoDev keep our data secure?",
    a: "KaizuoDev is SOC 2 Type II certified with encryption in transit and at rest, SSO/SAML, SCIM provisioning, granular role-based permissions, and full audit logging. Enterprise customers can add data residency, custom DPAs, and advanced compliance controls.",
  },
  {
    q: "How long does onboarding take?",
    a: "Most teams are up and running the same day. We ship best-practice templates for product, ops, customer success, and more — plus a guided setup that adapts to how your team already works. Business and Enterprise plans include dedicated onboarding support.",
  },
  {
    q: "Which tools does KaizuoDev integrate with?",
    a: "KaizuoDev connects with 80+ tools out of the box, including Slack, Microsoft Teams, GitHub, GitLab, Google Workspace, Figma, Notion, Salesforce, HubSpot, and Zapier. A public API and webhooks let you build custom integrations for anything else.",
  },
  {
    q: "What kind of support do you offer?",
    a: "Every customer gets access to our help center, community, and 24/7 in-app chat. Professional plans add priority email support, Business plans include a dedicated success manager, and Enterprise plans unlock 24/7 premium support with SLAs.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 sm:py-28 bg-secondary/40">
      <div className="container-page">
        <SectionHeader
          eyebrow="FAQ"
          title="Frequently asked questions."
          description="Everything you need to know before getting started with KaizuoDev."
        />

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-border rounded-3xl border border-border bg-background shadow-soft">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-base font-medium">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary text-foreground"
                  >
                    <Plus className="h-4 w-4" aria-hidden />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-muted-foreground">
                        {f.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
