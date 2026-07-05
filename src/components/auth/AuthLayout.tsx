import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Zap, Users } from "lucide-react";
import type { ReactNode } from "react";

const highlights = [
  { icon: Zap, text: "Automate busywork across every team" },
  { icon: Users, text: "Collaborate in one shared workspace" },
  { icon: ShieldCheck, text: "Enterprise-grade security by default" },
];

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-gradient-brand lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="pointer-events-none absolute inset-0 bg-gradient-soft opacity-60" aria-hidden />
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-white/10 blur-3xl"
          aria-hidden
        />

        <Link to="/" className="relative z-10 flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/15 backdrop-blur">
            <Sparkles className="h-4 w-4 text-white" aria-hidden />
          </span>
          <span className="text-lg font-semibold tracking-tight text-white">KaizuoDev</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-md"
        >
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Simplify the way your team builds and grows.
          </h1>
          <p className="mt-4 text-base text-white/80">
            Join thousands of teams using KaizuoDev to streamline workflows, automate the busywork,
            and collaborate from one intuitive workspace.
          </p>

          <ul className="mt-8 space-y-3">
            {highlights.map((h) => (
              <li key={h.text} className="flex items-center gap-3 rounded-2xl glass-card px-4 py-3 text-white">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/15">
                  <h.icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="text-sm font-medium">{h.text}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <p className="relative z-10 text-xs text-white/60">
          © {new Date().getFullYear()} KaizuoDev. All rights reserved.
        </p>
      </div>

      <div className="flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <Link to="/" className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand shadow-glow">
                <Sparkles className="h-4 w-4 text-white" aria-hidden />
              </span>
              <span className="text-lg font-semibold tracking-tight text-foreground">KaizuoDev</span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>

            <div className="mt-8">{children}</div>

            {footer ? <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div> : null}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
