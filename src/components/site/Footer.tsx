import { Link } from "@tanstack/react-router";
import { Sparkles, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="container-page py-16 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand">
              <Sparkles className="h-4 w-4 text-white" aria-hidden />
            </span>
            <span className="text-lg font-semibold tracking-tight">NovaFlow</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            The modern productivity platform that helps teams simplify workflows, automate
            the busywork, and grow with confidence.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="NovaFlow on LinkedIn"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background hover:bg-secondary transition-colors"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="NovaFlow on GitHub"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background hover:bg-secondary transition-colors"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>

        <FooterCol
          title="Product"
          items={[
            { label: "Features", to: "/features" },
            { label: "Solutions", to: "/solutions" },
            { label: "Pricing", to: "/pricing" },
          ]}
        />
        <FooterCol
          title="Company"
          items={[
            { label: "About", to: "/about" },
            { label: "Careers", to: "/about" },
            { label: "Contact", to: "/contact" },
          ]}
        />
        <FooterCol
          title="Resources"
          items={[
            { label: "Blog", to: "/about" },
            { label: "Privacy Policy", to: "/about" },
            { label: "Terms of Service", to: "/about" },
          ]}
        />
      </div>
      <div className="border-t border-border">
        <div className="container-page py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} NovaFlow, Inc. All rights reserved.</p>
          <p>Made for teams that build the future.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; to: "/" | "/features" | "/solutions" | "/pricing" | "/about" | "/contact" }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((it) => (
          <li key={it.label}>
            <Link
              to={it.to}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
