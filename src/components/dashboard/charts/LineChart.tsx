import { useId, useState } from "react";

interface Point {
  label: string;
  value: number;
}

const WIDTH = 560;
const HEIGHT = 220;
const PADDING = 28;

export function LineChart({ data }: { data: Point[] }) {
  const gradientId = useId();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const range = max - min || 1;

  const stepX = (WIDTH - PADDING * 2) / (data.length - 1);
  const points = data.map((d, i) => {
    const x = PADDING + i * stepX;
    const y = HEIGHT - PADDING - ((d.value - min) / range) * (HEIGHT - PADDING * 2);
    return { x, y, ...d };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaPath = `${linePath} L${points[points.length - 1]!.x},${HEIGHT - PADDING} L${points[0]!.x},${HEIGHT - PADDING} Z`;

  const active = hoverIndex !== null ? points[hoverIndex] : null;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full"
        role="img"
        aria-label="Monthly activity line chart"
        onMouseLeave={() => setHoverIndex(null)}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--brand-primary)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--brand-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line
            key={f}
            x1={PADDING}
            x2={WIDTH - PADDING}
            y1={PADDING + (HEIGHT - PADDING * 2) * f}
            y2={PADDING + (HEIGHT - PADDING * 2) * f}
            stroke="var(--color-border)"
            strokeDasharray="4 4"
          />
        ))}

        <path d={areaPath} fill={`url(#${gradientId})`} />
        <path d={linePath} fill="none" stroke="var(--brand-primary)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

        {points.map((p, i) => (
          <g key={p.label}>
            <rect
              x={p.x - stepX / 2}
              y={0}
              width={stepX}
              height={HEIGHT}
              fill="transparent"
              onMouseEnter={() => setHoverIndex(i)}
            />
            <circle
              cx={p.x}
              cy={p.y}
              r={hoverIndex === i ? 5 : 3}
              fill="white"
              stroke="var(--brand-primary)"
              strokeWidth={2}
              className="transition-all"
            />
          </g>
        ))}
      </svg>

      {active ? (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs shadow-elevated"
          style={{ left: `${(active.x / WIDTH) * 100}%`, top: `${(active.y / HEIGHT) * 100}%` }}
        >
          <span className="font-semibold text-foreground">{active.value}</span>{" "}
          <span className="text-muted-foreground">· {active.label}</span>
        </div>
      ) : null}

      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        {data.map((d, i) => (
          <span key={d.label} className={i % 2 === 1 ? "hidden sm:inline" : undefined}>
            {d.label}
          </span>
        ))}
      </div>
    </div>
  );
}
