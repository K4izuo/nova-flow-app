import { useId, useState } from "react";

interface Point {
  label: string;
  value: number;
}

const WIDTH = 560;
const HEIGHT = 220;
const PADDING = 28;

export function BarChart({ data }: { data: Point[] }) {
  const gradientId = useId();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const max = Math.max(...data.map((d) => d.value));

  const slot = (WIDTH - PADDING * 2) / data.length;
  const barWidth = slot * 0.5;

  return (
    <div>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" role="img" aria-label="Weekly tasks bar chart">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--brand-secondary)" />
            <stop offset="100%" stopColor="var(--brand-primary)" />
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

        {data.map((d, i) => {
          const barHeight = (d.value / max) * (HEIGHT - PADDING * 2);
          const x = PADDING + i * slot + (slot - barWidth) / 2;
          const y = HEIGHT - PADDING - barHeight;
          const active = hoverIndex === i;
          return (
            <g key={d.label} onMouseEnter={() => setHoverIndex(i)} onMouseLeave={() => setHoverIndex(null)}>
              <rect x={x - 4} y={0} width={barWidth + 8} height={HEIGHT} fill="transparent" />
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={8}
                fill={`url(#${gradientId})`}
                opacity={active ? 1 : 0.85}
                className="transition-opacity"
              />
              {active ? (
                <text x={x + barWidth / 2} y={y - 8} textAnchor="middle" fontSize="11" fontWeight={600} fill="var(--color-foreground)">
                  {d.value}
                </text>
              ) : null}
            </g>
          );
        })}
      </svg>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        {data.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}
