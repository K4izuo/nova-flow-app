import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const stats = [
  { value: 10000, suffix: "+", label: "Active Users" },
  { value: 500, suffix: "+", label: "Organizations" },
  { value: 99.9, suffix: "%", label: "Platform Uptime", decimals: 1 },
  { value: 24, suffix: "/7", label: "Customer Support" },
];

function Counter({
  to,
  suffix,
  decimals = 0,
  active,
}: {
  to: number;
  suffix: string;
  decimals?: number;
  active: boolean;
}) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, to]);

  const formatted =
    decimals > 0
      ? n.toFixed(decimals)
      : Math.floor(n).toLocaleString("en-US");

  return (
    <span>
      {formatted}
      {suffix}
    </span>
  );
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 sm:py-28">
      <div className="container-page">
        <div
          ref={ref}
          className="rounded-3xl border border-border bg-gradient-brand p-8 sm:p-12 text-white shadow-elevated"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl sm:text-5xl font-semibold tracking-tight">
                  <Counter to={s.value} suffix={s.suffix} decimals={s.decimals} active={inView} />
                </div>
                <div className="mt-2 text-sm text-white/80">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
