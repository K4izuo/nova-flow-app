import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCheck } from "lucide-react";
import { NotificationsList } from "@/components/dashboard/NotificationsList";
import { notifications as initialNotifications } from "@/data/mock";

export const Route = createFileRoute("/dashboard/notifications")({
  component: NotificationsPage,
});

function NotificationsPage() {
  const [items, setItems] = useState(initialNotifications);
  const unreadCount = items.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Notifications</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : "You're all caught up"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setItems((prev) => prev.map((n) => ({ ...n, read: true })))}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground shadow-soft hover:bg-secondary transition-colors"
        >
          <CheckCheck className="h-4 w-4" />
          Mark all as read
        </button>
      </div>

      <div className="rounded-3xl border border-border bg-background p-6 shadow-soft">
        <NotificationsList items={items} />
      </div>
    </div>
  );
}
