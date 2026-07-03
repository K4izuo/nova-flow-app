import { cx } from "@/lib/cx";

export function FormField({
  label,
  error,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  hint?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={htmlFor} className="block text-sm font-medium text-foreground">
          {label}
        </label>
        {hint}
      </div>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p role="alert" className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function inputClass(error?: string) {
  return cx(
    "w-full rounded-2xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground shadow-soft outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--brand-primary)]/40 focus-visible:border-[color:var(--brand-primary)]",
    error ? "border-destructive" : "border-border",
  );
}
