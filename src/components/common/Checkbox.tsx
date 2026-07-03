import { Check } from "lucide-react";
import { cx } from "@/lib/cx";

export function Checkbox({
  id,
  checked,
  onChange,
  label,
  className,
}: {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: React.ReactNode;
  className?: string;
}) {
  return (
    <label htmlFor={id} className={cx("inline-flex cursor-pointer items-center gap-2.5 select-none", className)}>
      <span className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer absolute h-5 w-5 cursor-pointer opacity-0"
        />
        <span
          className={cx(
            "grid h-5 w-5 place-items-center rounded-md border transition-colors",
            checked
              ? "border-transparent bg-gradient-brand"
              : "border-border bg-background peer-focus-visible:ring-2 peer-focus-visible:ring-[color:var(--brand-primary)]/40",
          )}
        >
          {checked ? <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} /> : null}
        </span>
      </span>
      {label ? <span className="text-sm text-foreground">{label}</span> : null}
    </label>
  );
}
