import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Upload } from "lucide-react";
import { FilesList } from "@/components/dashboard/FilesList";
import { UploadFileModal } from "@/components/dashboard/QuickActions";
import { files } from "@/data/mock";

export const Route = createFileRoute("/dashboard/files")({
  component: FilesPage,
});

function FilesPage() {
  const [uploadOpen, setUploadOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Files</h1>
          <p className="mt-1 text-sm text-muted-foreground">{files.length} files shared across your workspace.</p>
        </div>
        <button
          type="button"
          onClick={() => setUploadOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-medium text-white shadow-soft hover:shadow-glow transition-all"
        >
          <Upload className="h-4 w-4" />
          Upload file
        </button>
      </div>

      <div className="rounded-3xl border border-border bg-background p-6 shadow-soft">
        <FilesList files={files} />
      </div>

      <UploadFileModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
    </div>
  );
}
