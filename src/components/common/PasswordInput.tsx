import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cx } from "@/lib/cx";

export function PasswordInput({
  id,
  name,
  value,
  onChange,
  autoComplete,
  error,
  placeholder,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  error?: string;
  placeholder?: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={visible ? "text" : "password"}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={!!error}
        className={cx(
          "w-full rounded-2xl border bg-background px-4 py-3 pr-11 text-sm text-foreground placeholder:text-muted-foreground shadow-soft outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--brand-primary)]/40 focus-visible:border-[color:var(--brand-primary)]",
          error ? "border-destructive" : "border-border",
        )}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}
