import { FileText, Image, FileSpreadsheet, FileArchive, FileCode, File as FileIcon, Download, MoreHorizontal } from "lucide-react";
import { Dropdown, DropdownItem } from "@/components/common/Dropdown";
import type { FileItem } from "@/data/mock";

const typeIcon: Record<FileItem["type"], typeof FileText> = {
  pdf: FileText,
  image: Image,
  sheet: FileSpreadsheet,
  doc: FileText,
  archive: FileArchive,
  code: FileCode,
};

const typeColor: Record<FileItem["type"], string> = {
  pdf: "bg-red-50 text-red-500",
  image: "bg-violet-50 text-violet-500",
  sheet: "bg-emerald-50 text-emerald-600",
  doc: "bg-blue-50 text-blue-500",
  archive: "bg-amber-50 text-amber-600",
  code: "bg-slate-100 text-slate-600",
};

export function FilesList({ files }: { files: FileItem[] }) {
  return (
    <ul className="divide-y divide-border">
      {files.map((file) => {
        const Icon = typeIcon[file.type] ?? FileIcon;
        return (
          <li key={file.id} className="flex items-center gap-3.5 py-3">
            <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${typeColor[file.type]}`}>
              <Icon className="h-4.5 w-4.5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {file.size} · Updated {file.updatedAt} by {file.owner}
              </p>
            </div>
            <button
              type="button"
              aria-label={`Download ${file.name}`}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <Download className="h-4 w-4" />
            </button>
            <Dropdown
              align="end"
              width="w-40"
              trigger={(props) => (
                <button
                  {...props}
                  aria-label="File actions"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              )}
            >
              <DropdownItem>Rename</DropdownItem>
              <DropdownItem>Share</DropdownItem>
              <DropdownItem danger>Delete</DropdownItem>
            </Dropdown>
          </li>
        );
      })}
    </ul>
  );
}
