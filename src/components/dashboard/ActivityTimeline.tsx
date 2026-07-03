import { Avatar } from "@/components/common/Avatar";
import type { ActivityItem } from "@/data/mock";

export function ActivityTimeline({ items }: { items: ActivityItem[] }) {
  return (
    <ul className="space-y-5">
      {items.map((item, i) => (
        <li key={item.id} className="relative flex gap-3.5 pb-5">
          {i !== items.length - 1 ? (
            <span className="absolute left-4 top-9 h-[calc(100%-2.25rem)] w-px bg-border" aria-hidden />
          ) : null}
          <Avatar initials={item.initials} size="sm" className="z-10" />
          <div className="min-w-0 pt-1">
            <p className="text-sm text-foreground">
              <span className="font-medium">{item.actor}</span> {item.action}{" "}
              <span className="font-medium">{item.target}</span>
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{item.time}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
