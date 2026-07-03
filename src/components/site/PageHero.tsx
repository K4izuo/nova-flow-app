import { Reveal } from "./Section";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-soft">
      <div className="container-page pt-16 pb-16 sm:pt-24 sm:pb-20 text-center">
        <Reveal>
          <span className="inline-flex items-center rounded-full border border-border bg-background/80 backdrop-blur px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
            {eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-muted-foreground">
            {description}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
