import { CheckCircle2, Info, TriangleAlert, MessageCircle } from "lucide-react";
import { cx } from "@/lib/cx";
import type { NotificationItem } from "@/data/mock";

const kindIcon: Record<NotificationItem["kind"], typeof Info> = {
  success: CheckCircle2,
  info: Info,
  warning: TriangleAlert,
  message: MessageCircle,
};

const kindColor: Record<NotificationItem["kind"], string> = {
  success: "bg-emerald-50 text-emerald-600",
  info: "bg-blue-50 text-blue-500",
  warning: "bg-amber-50 text-amber-600",
  message: "bg-accent text-[color:var(--accent-solid)]",
};

export function NotificationsList({ items }: { items: NotificationItem[] }) {
  return (
    <ul className="divide-y divide-border">
      {items.map((item) => {
        const Icon = kindIcon[item.kind];
        return (
          <li key={item.id} className="flex items-start gap-3.5 py-3.5">
            <span className={cx("grid h-9 w-9 shrink-0 place-items-center rounded-full", kindColor[item.kind])}>
              <Icon className="h-4 w-4" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-medium text-foreground">{item.title}</p>
                {!item.read ? <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--accent-solid)]" /> : null}
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">{item.description}</p>
              <p className="mt-1 text-xs text-muted-foreground">{item.time}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
