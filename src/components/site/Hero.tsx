import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Star } from "lucide-react";
import heroImage from "@/assets/hero.png";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-soft">
      {/* decorative blurred gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[900px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(91,108,255,0.35), transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-40 right-[-10%] h-[420px] w-[520px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(139,92,246,0.35), transparent)" }}
      />

      <div className="container-page relative pt-16 pb-20 sm:pt-24 sm:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 backdrop-blur px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
            <Star className="h-3.5 w-3.5 text-[color:var(--brand-primary)]" aria-hidden />
            Now with AI-powered workflow automations
          </span>

          <h1 className="mt-6 text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
            Build Better.{" "}
            <span className="text-gradient">Move Faster.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground">
            Bring your projects, workflows, and team collaboration together in one powerful
            platform designed to help organizations work smarter and scale with confidence.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/contact"
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-white shadow-soft hover:shadow-glow transition-all hover:-translate-y-0.5"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              <PlayCircle className="h-4 w-4" />
              Book a Demo
            </Link>
          </div>

          <p className="mt-5 text-xs text-muted-foreground">
            Free 14-day trial · No credit card required · Cancel anytime
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-14 sm:mt-20"
        >
          <div className="mx-auto max-w-5xl">
            <div className="relative rounded-3xl border border-border bg-background/60 p-2 shadow-elevated backdrop-blur">
              <img
                src={heroImage}
                alt="KaizuoDev workspace with dashboards, workflow automations, and project cards"
                width={1280}
                height={1024}
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </div>
        </motion.div>

        <div className="mt-14 flex flex-col items-center gap-4">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 opacity-70">
            {["Linear", "Vercel", "Notion", "Stripe", "Figma", "Loom"].map((n) => (
              <span key={n} className="text-sm font-semibold tracking-tight text-muted-foreground">
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
