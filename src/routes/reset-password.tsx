import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { FormField } from "@/components/common/FormField";
import { PasswordInput } from "@/components/common/PasswordInput";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";

export const Route = createFileRoute("/reset-password")({
  component: ResetPasswordPage,
});

const schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormValues, string>>;

function ResetPasswordPage() {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const [values, setValues] = useState<FormValues>({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const update = (key: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    if (formError) setFormError(null);
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
    setLoading(true);
    try {
      await resetPassword(parsed.data.password);
      setDone(true);
      toast({ title: "Password updated", description: "You can now log in with your new password.", variant: "success" });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <AuthLayout title="Password updated" subtitle="Your password has been changed successfully.">
        <div className="rounded-3xl border border-border bg-background p-6 text-center shadow-soft">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-accent text-[color:var(--accent-solid)]">
            <CheckCircle2 className="h-6 w-6" aria-hidden />
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            You can now use your new password to log in to your account.
          </p>
          <button
            type="button"
            onClick={() => navigate({ to: "/login" })}
            className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-white shadow-soft hover:shadow-glow transition-all"
          >
            Continue to log in
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Set a new password"
      subtitle="Choose a strong password you haven't used before."
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

        <FormField label="New password" htmlFor="password" error={errors.password}>
          <PasswordInput
            id="password"
            name="password"
            autoComplete="new-password"
            placeholder="Min. 8 characters"
            value={values.password}
            onChange={update("password")}
            error={errors.password}
          />
        </FormField>

        <FormField label="Confirm new password" htmlFor="confirmPassword" error={errors.confirmPassword}>
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            autoComplete="new-password"
            placeholder="Re-enter your password"
            value={values.confirmPassword}
            onChange={update("confirmPassword")}
            error={errors.confirmPassword}
          />
        </FormField>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-white shadow-soft hover:shadow-glow transition-all disabled:opacity-70"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          {loading ? "Updating…" : "Update password"}
        </button>
      </form>
    </AuthLayout>
  );
}
