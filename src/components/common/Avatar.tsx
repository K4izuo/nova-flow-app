import { cx } from "@/lib/cx";

const sizeMap = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
};

const statusColor = {
  online: "bg-emerald-500",
  away: "bg-amber-500",
  offline: "bg-muted-foreground/40",
};

export function Avatar({
  initials,
  size = "md",
  status,
  className,
}: {
  initials: string;
  size?: keyof typeof sizeMap;
  status?: keyof typeof statusColor;
  className?: string;
}) {
  return (
    <span className={cx("relative inline-flex shrink-0", className)}>
      <span
        className={cx(
          "grid place-items-center rounded-full bg-gradient-brand font-semibold text-white shadow-soft",
          sizeMap[size],
        )}
      >
        {initials}
      </span>
      {status ? (
        <span
          className={cx(
            "absolute -bottom-0.5 -right-0.5 rounded-full ring-2 ring-background",
            size === "sm" ? "h-2.5 w-2.5" : "h-3 w-3",
            statusColor[status],
          )}
          aria-hidden
        />
      ) : null}
    </span>
  );
}
