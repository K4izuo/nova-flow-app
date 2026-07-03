import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Camera, Loader2 } from "lucide-react";
import { Avatar } from "@/components/common/Avatar";
import { FormField, inputClass } from "@/components/common/FormField";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/contexts/ToastContext";

export const Route = createFileRoute("/dashboard/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [values, setValues] = useState({
    fullName: user?.fullName ?? "",
    email: user?.email ?? "",
    company: user?.company ?? "",
    phone: user?.phone ?? "",
    location: user?.location ?? "",
    bio: user?.bio ?? "",
  });
  const [saving, setSaving] = useState(false);

  const update = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    updateProfile(values);
    setSaving(false);
    toast({ title: "Profile updated", description: "Your changes have been saved.", variant: "success" });
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your personal information and public profile.</p>
      </div>

      <div className="rounded-3xl border border-border bg-background p-6 shadow-soft sm:p-8">
        <div className="flex items-center gap-5">
          <div className="relative">
            <Avatar initials={user.initials} size="lg" />
            <button
              type="button"
              onClick={() => toast({ title: "Photo upload unavailable", description: "This is a placeholder in the demo experience.", variant: "info" })}
              aria-label="Change profile photo"
              className="absolute -bottom-1 -right-1 grid h-7 w-7 place-items-center rounded-full border-2 border-background bg-foreground text-background hover:bg-foreground/90 transition-colors"
            >
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight text-foreground">{user.fullName}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField label="Full name" htmlFor="fullName">
              <input id="fullName" value={values.fullName} onChange={update("fullName")} className={inputClass()} />
            </FormField>
            <FormField label="Email" htmlFor="email">
              <input id="email" type="email" value={values.email} onChange={update("email")} className={inputClass()} />
            </FormField>
            <FormField label="Company" htmlFor="company">
              <input id="company" value={values.company} onChange={update("company")} className={inputClass()} />
            </FormField>
            <FormField label="Phone" htmlFor="phone">
              <input id="phone" type="tel" value={values.phone} onChange={update("phone")} placeholder="+1 (555) 000-0000" className={inputClass()} />
            </FormField>
            <FormField label="Location" htmlFor="location">
              <input id="location" value={values.location} onChange={update("location")} placeholder="San Francisco, CA" className={inputClass()} />
            </FormField>
          </div>
          <FormField label="Bio" htmlFor="bio">
            <textarea
              id="bio"
              rows={4}
              value={values.bio}
              onChange={update("bio")}
              placeholder="Tell us a little about yourself"
              className={inputClass()}
            />
          </FormField>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-white shadow-soft hover:shadow-glow transition-all disabled:opacity-70"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
