import { Reveal, SectionHeader } from "./Section";
import t1 from "@/assets/testimonial-1.jpg";
import t2 from "@/assets/testimonial-2.jpg";
import t3 from "@/assets/testimonial-3.jpg";

const items = [
  {
    quote:
      "NovaFlow replaced four tools in our stack. Our team ships faster and finally has one source of truth for every project.",
    name: "Sofia Reyes",
    role: "Head of Operations",
    company: "Northwind Labs",
    img: t1,
  },
  {
    quote:
      "The automations are the quiet superpower. Work that used to eat entire afternoons now runs itself in the background.",
    name: "Daniel Okafor",
    role: "VP of Engineering",
    company: "Vertexa",
    img: t2,
  },
  {
    quote:
      "It looks like a consumer product, works like an enterprise one. Onboarding a new team takes minutes, not weeks.",
    name: "Mei Tanaka",
    role: "Director of Customer Success",
    company: "Brightpath",
    img: t3,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 sm:py-28 bg-secondary/40">
      <div className="container-page">
        <SectionHeader
          eyebrow="Loved by modern teams"
          title="What our customers are saying."
          description="Thousands of teams rely on NovaFlow every day to plan, build, and grow together."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {items.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.05}>
              <figure className="h-full rounded-3xl border border-border bg-background p-6 shadow-soft">
                <blockquote className="text-base leading-relaxed text-foreground">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <img
                    src={t.img}
                    alt={`Portrait of ${t.name}`}
                    loading="lazy"
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {t.role} · {t.company}
                    </div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
