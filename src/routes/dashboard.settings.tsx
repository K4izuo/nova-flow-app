import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Settings as SettingsIcon,
  User,
  ShieldCheck,
  Bell,
  Palette,
  CreditCard,
  Loader2,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";
import { Tabs } from "@/components/common/Tabs";
import { Switch } from "@/components/common/Switch";
import { FormField, inputClass } from "@/components/common/FormField";
import { PasswordInput } from "@/components/common/PasswordInput";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/contexts/ToastContext";
import { cx } from "@/lib/cx";

export const Route = createFileRoute("/dashboard/settings")({
  component: SettingsPage,
});

const tabs = [
  { value: "general", label: "General", icon: SettingsIcon },
  { value: "account", label: "Account", icon: User },
  { value: "security", label: "Security", icon: ShieldCheck },
  { value: "notifications", label: "Notifications", icon: Bell },
  { value: "appearance", label: "Appearance", icon: Palette },
  { value: "billing", label: "Billing", icon: CreditCard },
];

function SettingsCard({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-border bg-background p-6 shadow-soft sm:p-8">
      <h2 className="text-base font-semibold tracking-tight text-foreground">{title}</h2>
      {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      <div className="mt-6">{children}</div>
    </div>
  );
}

function SaveButton({ loading }: { loading: boolean }) {
  return (
    <div className="flex justify-end">
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-white shadow-soft hover:shadow-glow transition-all disabled:opacity-70"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {loading ? "Saving…" : "Save changes"}
      </button>
    </div>
  );
}

function useSaveHandler() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    toast({ title: "Settings saved", description: "Your changes have been applied.", variant: "success" });
  };
  return { loading, save };
}

function GeneralPanel() {
  const { loading, save } = useSaveHandler();
  return (
    <SettingsCard title="Workspace" description="General information about your workspace.">
      <form onSubmit={save} className="space-y-5">
        <FormField label="Workspace name" htmlFor="workspace-name">
          <input id="workspace-name" defaultValue="KaizuoDev" className={inputClass()} />
        </FormField>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <FormField label="Timezone" htmlFor="timezone">
            <select id="timezone" defaultValue="America/Los_Angeles" className={inputClass()}>
              <option value="America/Los_Angeles">Pacific Time (US &amp; Canada)</option>
              <option value="America/New_York">Eastern Time (US &amp; Canada)</option>
              <option value="Europe/London">London</option>
              <option value="Asia/Tokyo">Tokyo</option>
            </select>
          </FormField>
          <FormField label="Language" htmlFor="language">
            <select id="language" defaultValue="en" className={inputClass()}>
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </FormField>
        </div>
        <SaveButton loading={loading} />
      </form>
    </SettingsCard>
  );
}

function AccountPanel() {
  const { user } = useAuth();
  const { loading, save } = useSaveHandler();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <SettingsCard title="Account details" description="Update your account information.">
        <form onSubmit={save} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField label="Full name" htmlFor="acc-name">
              <input id="acc-name" defaultValue={user?.fullName} className={inputClass()} />
            </FormField>
            <FormField label="Email" htmlFor="acc-email">
              <input id="acc-email" type="email" defaultValue={user?.email} className={inputClass()} />
            </FormField>
          </div>
          <button
            type="button"
            onClick={() => navigate({ to: "/dashboard/profile" })}
            className="text-sm font-medium text-[color:var(--brand-secondary)] hover:underline"
          >
            Edit full profile →
          </button>
          <SaveButton loading={loading} />
        </form>
      </SettingsCard>

      <SettingsCard title="Danger zone" description="Irreversible actions for your account.">
        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-destructive/30 bg-red-50 p-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-foreground">Delete account</p>
            <p className="text-xs text-muted-foreground">Permanently remove your account and all of its data.</p>
          </div>
          <button className="shrink-0 rounded-full border border-destructive/40 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors">
            Delete account
          </button>
        </div>
      </SettingsCard>
    </div>
  );
}

function SecurityPanel() {
  const { loading, save } = useSaveHandler();
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="space-y-6">
      <SettingsCard title="Change password" description="Choose a strong password you haven't used before.">
        <form onSubmit={save} className="space-y-5">
          <FormField label="Current password" htmlFor="current-password">
            <PasswordInput id="current-password" name="current-password" value="" onChange={() => {}} autoComplete="current-password" />
          </FormField>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField label="New password" htmlFor="new-password">
              <PasswordInput id="new-password" name="new-password" value="" onChange={() => {}} autoComplete="new-password" />
            </FormField>
            <FormField label="Confirm new password" htmlFor="confirm-password">
              <PasswordInput id="confirm-password" name="confirm-password" value="" onChange={() => {}} autoComplete="new-password" />
            </FormField>
          </div>
          <SaveButton loading={loading} />
        </form>
      </SettingsCard>

      <SettingsCard title="Two-factor authentication" description="Add an extra layer of security to your account.">
        <div className="flex items-center justify-between rounded-2xl border border-border p-4">
          <div>
            <p className="text-sm font-medium text-foreground">Authenticator app</p>
            <p className="text-xs text-muted-foreground">{twoFactor ? "Enabled" : "Not enabled"}</p>
          </div>
          <Switch checked={twoFactor} onChange={setTwoFactor} label="Toggle two-factor authentication" />
        </div>
      </SettingsCard>

      <SettingsCard title="Active sessions" description="Devices currently signed in to your account.">
        <ul className="space-y-3">
          {[
            { device: "MacBook Pro · Chrome", location: "San Francisco, CA", current: true },
            { device: "iPhone 15 · Safari", location: "San Francisco, CA", current: false },
          ].map((s) => (
            <li key={s.device} className="flex items-center justify-between rounded-2xl border border-border p-4">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {s.device} {s.current ? <span className="text-xs text-emerald-600">· This device</span> : null}
                </p>
                <p className="text-xs text-muted-foreground">{s.location}</p>
              </div>
              {!s.current ? (
                <button className="text-sm font-medium text-destructive hover:underline">Sign out</button>
              ) : null}
            </li>
          ))}
        </ul>
      </SettingsCard>
    </div>
  );
}

function NotificationsPanel() {
  const { loading, save } = useSaveHandler();
  const [prefs, setPrefs] = useState({
    productUpdates: true,
    taskReminders: true,
    weeklySummary: true,
    mentionsOnly: false,
    marketing: false,
  });

  const rows: Array<{ key: keyof typeof prefs; label: string; description: string }> = [
    { key: "productUpdates", label: "Product updates", description: "New features and improvements" },
    { key: "taskReminders", label: "Task reminders", description: "Reminders about upcoming and overdue tasks" },
    { key: "weeklySummary", label: "Weekly summary", description: "A digest of your workspace activity" },
    { key: "mentionsOnly", label: "Mentions only", description: "Only notify me when I'm @mentioned" },
    { key: "marketing", label: "Marketing emails", description: "Tips, offers, and product announcements" },
  ];

  return (
    <SettingsCard title="Notification preferences" description="Choose what you want to be notified about.">
      <form onSubmit={save} className="space-y-1">
        {rows.map((row) => (
          <div key={row.key} className="flex items-center justify-between gap-4 border-b border-border py-4 last:border-0">
            <div>
              <p className="text-sm font-medium text-foreground">{row.label}</p>
              <p className="text-xs text-muted-foreground">{row.description}</p>
            </div>
            <Switch
              checked={prefs[row.key]}
              onChange={(v) => setPrefs((p) => ({ ...p, [row.key]: v }))}
              label={row.label}
            />
          </div>
        ))}
        <div className="pt-5">
          <SaveButton loading={loading} />
        </div>
      </form>
    </SettingsCard>
  );
}

function AppearancePanel() {
  const { theme, setTheme } = useTheme();

  const options = [
    { value: "light" as const, label: "Light", icon: Sun },
    { value: "dark" as const, label: "Dark", icon: Moon },
  ];

  return (
    <SettingsCard title="Appearance" description="Customize how KaizuoDev looks on your device.">
      <div className="grid grid-cols-2 gap-4 sm:max-w-md">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => setTheme(opt.value)}
            className={cx(
              "flex flex-col items-center gap-3 rounded-2xl border-2 p-5 transition-all",
              theme === opt.value ? "border-[color:var(--brand-primary)] bg-accent/40" : "border-border hover:bg-secondary/50",
            )}
          >
            <span className={cx("grid h-11 w-11 place-items-center rounded-2xl", theme === opt.value ? "bg-gradient-brand text-white" : "bg-secondary text-muted-foreground")}>
              <opt.icon className="h-5 w-5" />
            </span>
            <span className="text-sm font-medium text-foreground">{opt.label}</span>
          </button>
        ))}
      </div>
      <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
        <Monitor className="h-3.5 w-3.5" />
        Your preference is saved to this browser.
      </p>
    </SettingsCard>
  );
}

function BillingPanel() {
  const navigate = useNavigate();
  return (
    <SettingsCard title="Billing" description="You're on the Growth plan at $99/month.">
      <button
        onClick={() => navigate({ to: "/dashboard/billing" })}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-white shadow-soft hover:shadow-glow transition-all"
      >
        Manage billing
      </button>
    </SettingsCard>
  );
}

function SettingsPage() {
  const [tab, setTab] = useState("general");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your workspace, account, and preferences.</p>
      </div>

      <Tabs tabs={tabs} value={tab} onChange={setTab} />

      {tab === "general" ? <GeneralPanel /> : null}
      {tab === "account" ? <AccountPanel /> : null}
      {tab === "security" ? <SecurityPanel /> : null}
      {tab === "notifications" ? <NotificationsPanel /> : null}
      {tab === "appearance" ? <AppearancePanel /> : null}
      {tab === "billing" ? <BillingPanel /> : null}
    </div>
  );
}
