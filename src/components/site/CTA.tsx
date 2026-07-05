import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 sm:py-28">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-brand p-10 sm:p-16 text-center text-white shadow-elevated">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(600px 300px at 20% 0%, rgba(255,255,255,0.35), transparent), radial-gradient(600px 300px at 80% 100%, rgba(255,255,255,0.25), transparent)",
            }}
          />
          <div className="relative">
            <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight">
              Ready to simplify the way your team works?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/85">
              Join thousands of teams using KaizuoDev to plan, build, and grow —
              from ambitious startups to global enterprises.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[color:var(--brand-secondary)] hover:bg-white/90 transition-colors"
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur hover:bg-white/20 transition-colors"
              >
                Book a Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
