import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { SocialButtons } from "@/components/auth/SocialButtons";
import { PasswordInput } from "@/components/common/PasswordInput";
import { FormField, inputClass } from "@/components/common/FormField";
import { Checkbox } from "@/components/common/Checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

const schema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormValues, string>>;

function LoginPage() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const [values, setValues] = useState<FormValues>({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate({ to: "/dashboard" });
  }, [isAuthenticated, navigate]);

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
      await login({ ...parsed.data, rememberMe });
      toast({ title: "Welcome back", description: "You've signed in successfully.", variant: "success" });
      navigate({ to: "/dashboard" });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to your NovaFlow workspace."
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-[color:var(--brand-secondary)] hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} noValidate className="space-y-5">
        {formError ? (
          <div role="alert" className="rounded-2xl border border-destructive/30 bg-red-50 px-4 py-3 text-sm text-destructive">
            {formError}
          </div>
        ) : null}

        <FormField label="Email" htmlFor="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={values.email}
            onChange={update("email")}
            className={inputClass(errors.email)}
            aria-invalid={!!errors.email}
          />
        </FormField>

        <FormField
          label="Password"
          htmlFor="password"
          error={errors.password}
          hint={
            <Link
              to="/forgot-password"
              className="text-xs font-medium text-[color:var(--brand-secondary)] hover:underline"
            >
              Forgot password?
            </Link>
          }
        >
          <PasswordInput
            id="password"
            name="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={values.password}
            onChange={update("password")}
            error={errors.password}
          />
        </FormField>

        <Checkbox
          id="remember-me"
          checked={rememberMe}
          onChange={setRememberMe}
          label="Remember me for 30 days"
        />

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-white shadow-soft hover:shadow-glow transition-all disabled:opacity-70"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          {loading ? "Signing in…" : "Log in"}
        </button>
      </form>

      <SocialButtons />
    </AuthLayout>
  );
}
