import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { Loader2, MailCheck } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { FormField, inputClass } from "@/components/common/FormField";
import { useAuth } from "@/contexts/AuthContext";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

const schema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Please enter a valid email"),
});

function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ email });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message);
      return;
    }
    setError(undefined);
    setFormError(null);
    setLoading(true);
    try {
      await requestPasswordReset(parsed.data.email);
      setSent(true);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle="We've sent password reset instructions to your inbox."
        footer={
          <Link to="/login" className="font-medium text-[color:var(--brand-secondary)] hover:underline">
            Back to log in
          </Link>
        }
      >
        <div className="rounded-3xl border border-border bg-background p-6 text-center shadow-soft">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent text-[color:var(--accent-solid)]">
            <MailCheck className="h-6 w-6" aria-hidden />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            If an account exists for <span className="font-medium text-foreground">{email}</span>, you'll
            receive an email with a link to reset your password shortly.
          </p>
          <button
            type="button"
            onClick={() => setSent(false)}
            className="mt-5 text-sm font-medium text-[color:var(--brand-secondary)] hover:underline"
          >
            Didn't get it? Try again
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your email and we'll send you a link to reset it."
      footer={
        <Link to="/login" className="font-medium text-[color:var(--brand-secondary)] hover:underline">
          Back to log in
        </Link>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        {formError ? (
          <div role="alert" className="rounded-2xl border border-destructive/30 bg-red-50 px-4 py-3 text-sm text-destructive">
            {formError}
          </div>
        ) : null}

        <FormField label="Email" htmlFor="email" error={error}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(undefined);
            }}
            className={inputClass(error)}
          />
        </FormField>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-white shadow-soft hover:shadow-glow transition-all disabled:opacity-70"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          {loading ? "Sending…" : "Send reset link"}
        </button>
      </form>
    </AuthLayout>
  );
}
