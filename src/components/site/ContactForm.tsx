import { useState } from "react";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  company: z.string().trim().min(1, "Please enter your company").max(120),
  message: z.string().trim().min(10, "Tell us a bit more (10+ characters)").max(1000),
});

type FormValues = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormValues, string>>;

export function ContactForm() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const update = (key: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FormValues;
        if (!next[k]) next[k] = issue.message;
      }
      setErrors(next);
      return;
    }
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
  };

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-border bg-background p-8 shadow-soft text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent text-[color:var(--accent-solid)]">
          <CheckCircle2 className="h-6 w-6" aria-hidden />
        </div>
        <h3 className="mt-4 text-xl font-semibold tracking-tight">Thanks — message received.</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          A member of our team will get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-3xl border border-border bg-background p-6 sm:p-8 shadow-soft"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" error={errors.name} htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={update("name")}
            className={inputClass(errors.name)}
            aria-invalid={!!errors.name}
          />
        </Field>
        <Field label="Email" error={errors.email} htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={update("email")}
            className={inputClass(errors.email)}
            aria-invalid={!!errors.email}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Company" error={errors.company} htmlFor="company">
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              value={values.company}
              onChange={update("company")}
              className={inputClass(errors.company)}
              aria-invalid={!!errors.company}
            />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Message" error={errors.message} htmlFor="message">
            <textarea
              id="message"
              name="message"
              rows={5}
              value={values.message}
              onChange={update("message")}
              className={inputClass(errors.message)}
              aria-invalid={!!errors.message}
            />
          </Field>
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-white shadow-soft hover:shadow-glow transition-all disabled:opacity-70"
      >
        {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p role="alert" className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function inputClass(error?: string) {
  return `w-full rounded-2xl border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground shadow-soft outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[color:var(--brand-primary)]/40 focus-visible:border-[color:var(--brand-primary)] ${
    error ? "border-destructive" : "border-border"
  }`;
}
