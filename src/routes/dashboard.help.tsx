import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, LifeBuoy, Mail, MessageCircle } from "lucide-react";
import { faqItems } from "@/data/mock";
import { useToast } from "@/contexts/ToastContext";

export const Route = createFileRoute("/dashboard/help")({
  component: HelpPage,
});

function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Help &amp; Support</h1>
        <p className="mt-1 text-sm text-muted-foreground">Find answers or get in touch with our team.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button
          onClick={() => toast({ title: "Support chat", description: "This is a demo — live chat isn't wired up yet.", variant: "info" })}
          className="flex items-center gap-4 rounded-3xl border border-border bg-background p-6 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-brand text-white shadow-soft">
            <MessageCircle className="h-5 w-5" />
          </span>
          <div>
            <p className="font-medium text-foreground">Chat with us</p>
            <p className="text-sm text-muted-foreground">Get a response in a few minutes</p>
          </div>
        </button>
        <a
          href="mailto:support@novaflow.io"
          className="flex items-center gap-4 rounded-3xl border border-border bg-background p-6 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-accent text-[color:var(--accent-solid)]">
            <Mail className="h-5 w-5" />
          </span>
          <div>
            <p className="font-medium text-foreground">Email support</p>
            <p className="text-sm text-muted-foreground">support@novaflow.io</p>
          </div>
        </a>
      </div>

      <div className="rounded-3xl border border-border bg-background p-6 shadow-soft sm:p-8">
        <div className="mb-5 flex items-center gap-2.5">
          <LifeBuoy className="h-5 w-5 text-[color:var(--brand-primary)]" />
          <h2 className="text-lg font-semibold tracking-tight text-foreground">Frequently asked questions</h2>
        </div>
        <div className="divide-y divide-border">
          {faqItems.map((item, i) => {
            const open = openIndex === i;
            return (
              <div key={item.question} className="py-2">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 py-3 text-left"
                >
                  <span className="text-sm font-medium text-foreground">{item.question}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-3 text-sm text-muted-foreground">{item.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
