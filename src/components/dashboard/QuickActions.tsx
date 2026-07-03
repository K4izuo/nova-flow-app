import { useState } from "react";
import { FolderPlus, UserPlus, Upload, FileBarChart, Loader2 } from "lucide-react";
import { Modal } from "@/components/common/Modal";
import { FormField, inputClass } from "@/components/common/FormField";
import { useToast } from "@/contexts/ToastContext";

type ActiveModal = "project" | "invite" | "upload" | "report" | null;

const actions = [
  { key: "project" as const, label: "Create Project", icon: FolderPlus },
  { key: "invite" as const, label: "Invite Team", icon: UserPlus },
  { key: "upload" as const, label: "Upload File", icon: Upload },
  { key: "report" as const, label: "Generate Report", icon: FileBarChart },
];

export function QuickActions() {
  const [active, setActive] = useState<ActiveModal>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {actions.map((action) => (
          <button
            key={action.key}
            type="button"
            onClick={() => setActive(action.key)}
            className="flex flex-col items-center gap-2.5 rounded-2xl border border-border bg-background px-4 py-5 text-center shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated"
          >
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-brand text-white shadow-soft">
              <action.icon className="h-5 w-5" aria-hidden />
            </span>
            <span className="text-xs font-medium text-foreground sm:text-sm">{action.label}</span>
          </button>
        ))}
      </div>

      <CreateProjectModal open={active === "project"} onClose={() => setActive(null)} />
      <InviteTeamModal open={active === "invite"} onClose={() => setActive(null)} />
      <UploadFileModal open={active === "upload"} onClose={() => setActive(null)} />
      <GenerateReportModal open={active === "report"} onClose={() => setActive(null)} />
    </>
  );
}

function useMockSubmit(onDone: () => void) {
  const [loading, setLoading] = useState(false);
  const run = async (action: () => void) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    action();
    onDone();
  };
  return { loading, run };
}

function SubmitButton({ loading, children }: { loading: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-medium text-white shadow-soft hover:shadow-glow transition-all disabled:opacity-70"
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
      {children}
    </button>
  );
}

export function CreateProjectModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const { loading, run } = useMockSubmit(() => {
    setName("");
    onClose();
  });

  return (
    <Modal open={open} onClose={onClose} title="Create a new project" description="Give your project a name to get started.">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(() => toast({ title: "Project created", description: `"${name || "Untitled project"}" is ready to go.`, variant: "success" }));
        }}
        className="space-y-4"
      >
        <FormField label="Project name" htmlFor="project-name">
          <input
            id="project-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Q3 Marketing Launch"
            className={inputClass()}
            autoFocus
          />
        </FormField>
        <SubmitButton loading={loading}>Create project</SubmitButton>
      </form>
    </Modal>
  );
}

export function InviteTeamModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const { loading, run } = useMockSubmit(() => {
    setEmail("");
    onClose();
  });

  return (
    <Modal open={open} onClose={onClose} title="Invite a teammate" description="They'll receive an email invite to join your workspace.">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(() => toast({ title: "Invite sent", description: `An invite was sent to ${email || "your teammate"}.`, variant: "success" }));
        }}
        className="space-y-4"
      >
        <FormField label="Email address" htmlFor="invite-email">
          <input
            id="invite-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="teammate@company.com"
            className={inputClass()}
            autoFocus
          />
        </FormField>
        <SubmitButton loading={loading}>Send invite</SubmitButton>
      </form>
    </Modal>
  );
}

export function UploadFileModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { toast } = useToast();
  const [fileName, setFileName] = useState<string | null>(null);
  const { loading, run } = useMockSubmit(() => {
    setFileName(null);
    onClose();
  });

  return (
    <Modal open={open} onClose={onClose} title="Upload a file" description="Add a file to your workspace.">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(() => toast({ title: "File uploaded", description: `${fileName ?? "Your file"} was uploaded successfully.`, variant: "success" }));
        }}
        className="space-y-4"
      >
        <label
          htmlFor="upload-file"
          className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-secondary/40 px-4 py-8 text-center hover:bg-secondary/60 transition-colors"
        >
          <Upload className="h-6 w-6 text-muted-foreground" aria-hidden />
          <span className="text-sm font-medium text-foreground">
            {fileName ?? "Click to choose a file"}
          </span>
          <span className="text-xs text-muted-foreground">PDF, PNG, XLSX up to 25MB</span>
          <input
            id="upload-file"
            type="file"
            className="sr-only"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
          />
        </label>
        <SubmitButton loading={loading}>Upload</SubmitButton>
      </form>
    </Modal>
  );
}

function GenerateReportModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { toast } = useToast();
  const { loading, run } = useMockSubmit(onClose);

  return (
    <Modal open={open} onClose={onClose} title="Generate a report" description="Export a summary of your workspace activity.">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(() => toast({ title: "Report generated", description: "Your activity report is ready to download.", variant: "success" }));
        }}
        className="space-y-4"
      >
        <FormField label="Report type" htmlFor="report-type">
          <select id="report-type" className={inputClass()} defaultValue="activity">
            <option value="activity">Team activity</option>
            <option value="projects">Project status</option>
            <option value="billing">Billing summary</option>
          </select>
        </FormField>
        <SubmitButton loading={loading}>Generate</SubmitButton>
      </form>
    </Modal>
  );
}
