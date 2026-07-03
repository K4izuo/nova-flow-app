import { useState } from "react";

interface Segment {
  label: string;
  value: number;
  color: string;
}

const SIZE = 180;
const STROKE = 26;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function DonutChart({ data }: { data: Segment[] }) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const total = data.reduce((sum, d) => sum + d.value, 0);

  let offsetAccumulator = 0;
  const segments = data.map((d, i) => {
    const fraction = d.value / total;
    const dash = fraction * CIRCUMFERENCE;
    const segment = { ...d, dash, offset: offsetAccumulator, fraction, index: i };
    offsetAccumulator += dash;
    return segment;
  });

  const active = hoverIndex !== null ? segments[hoverIndex] : null;

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-center">
      <div className="relative shrink-0" style={{ width: SIZE, height: SIZE }}>
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="-rotate-90" role="img" aria-label="Project status breakdown">
          <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS} fill="none" stroke="var(--color-secondary)" strokeWidth={STROKE} />
          {segments.map((s) => (
            <circle
              key={s.label}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke={s.color}
              strokeWidth={STROKE}
              strokeDasharray={`${s.dash} ${CIRCUMFERENCE - s.dash}`}
              strokeDashoffset={-s.offset}
              opacity={hoverIndex === null || hoverIndex === s.index ? 1 : 0.35}
              className="cursor-pointer transition-opacity"
              onMouseEnter={() => setHoverIndex(s.index)}
              onMouseLeave={() => setHoverIndex(null)}
            />
          ))}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold tracking-tight text-foreground">
            {active ? active.value : total}
          </span>
          <span className="text-xs text-muted-foreground">{active ? active.label : "Total"}</span>
        </div>
      </div>

      <ul className="space-y-2.5">
        {segments.map((s) => (
          <li
            key={s.label}
            className="flex items-center gap-2.5 text-sm"
            onMouseEnter={() => setHoverIndex(s.index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="text-foreground">{s.label}</span>
            <span className="text-muted-foreground">{s.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
