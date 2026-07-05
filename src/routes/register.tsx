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

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

const schema = z
  .object({
    fullName: z.string().trim().min(2, "Please enter your full name").max(100),
    company: z.string().trim().min(1, "Please enter your company name").max(120),
    email: z.string().trim().min(1, "Email is required").email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormValues, string>>;

const emptyValues: FormValues = { fullName: "", company: "", email: "", password: "", confirmPassword: "" };

function RegisterPage() {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const [values, setValues] = useState<FormValues>(emptyValues);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState<Errors & { terms?: string }>({});
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
    const next: typeof errors = {};
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FormValues;
        if (!next[k]) next[k] = issue.message;
      }
    }
    if (!agreeTerms) {
      next.terms = "You must agree to the Terms of Service to continue";
    }
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }

    setLoading(true);
    try {
      await register(parsed.data as FormValues);
      toast({ title: "Account created", description: "Welcome to KaizuoDev!", variant: "success" });
      navigate({ to: "/dashboard" });
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start your 14-day free trial. No credit card required."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-[color:var(--brand-secondary)] hover:underline">
            Log in
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

        <FormField label="Full name" htmlFor="fullName" error={errors.fullName}>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Jane Cooper"
            value={values.fullName}
            onChange={update("fullName")}
            className={inputClass(errors.fullName)}
          />
        </FormField>

        <FormField label="Company name" htmlFor="company" error={errors.company}>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Acme, Inc."
            value={values.company}
            onChange={update("company")}
            className={inputClass(errors.company)}
          />
        </FormField>

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
          />
        </FormField>

        <FormField label="Password" htmlFor="password" error={errors.password}>
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

        <FormField label="Confirm password" htmlFor="confirmPassword" error={errors.confirmPassword}>
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

        <div>
          <Checkbox
            id="agree-terms"
            checked={agreeTerms}
            onChange={(v) => {
              setAgreeTerms(v);
              if (errors.terms) setErrors((prev) => ({ ...prev, terms: undefined }));
            }}
            label={
              <span>
                I agree to the{" "}
                <Link to="/about" className="font-medium text-[color:var(--brand-secondary)] hover:underline">
                  Terms of Service
                </Link>{" "}
                and Privacy Policy
              </span>
            }
          />
          {errors.terms ? <p role="alert" className="mt-1.5 text-xs text-destructive">{errors.terms}</p> : null}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-white shadow-soft hover:shadow-glow transition-all disabled:opacity-70"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          {loading ? "Creating account…" : "Create account"}
        </button>
      </form>

      <SocialButtons />
    </AuthLayout>
  );
}
