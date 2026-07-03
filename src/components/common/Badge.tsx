import { cx } from "@/lib/cx";

type BadgeTone = "brand" | "success" | "warning" | "danger" | "neutral";

const toneStyles: Record<BadgeTone, string> = {
  brand: "bg-accent text-[color:var(--accent-solid)]",
  success: "bg-emerald-50 text-emerald-600",
  warning: "bg-amber-50 text-amber-600",
  danger: "bg-red-50 text-destructive",
  neutral: "bg-secondary text-muted-foreground",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        toneStyles[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
