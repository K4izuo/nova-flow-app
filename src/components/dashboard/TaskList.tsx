import { Checkbox } from "@/components/common/Checkbox";
import { Badge } from "@/components/common/Badge";
import { cx } from "@/lib/cx";
import type { Task } from "@/data/mock";

const priorityTone = {
  Low: "neutral",
  Medium: "brand",
  High: "danger",
} as const;

export function TaskList({ tasks, onToggle }: { tasks: Task[]; onToggle: (id: string) => void }) {
  return (
    <ul className="space-y-1">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center gap-3 rounded-2xl px-2 py-2.5 transition-colors hover:bg-secondary/50"
        >
          <Checkbox id={task.id} checked={task.done} onChange={() => onToggle(task.id)} />
          <div className="min-w-0 flex-1">
            <p className={cx("truncate text-sm font-medium", task.done ? "text-muted-foreground line-through" : "text-foreground")}>
              {task.title}
            </p>
            <p className="truncate text-xs text-muted-foreground">
              {task.project} · Due {task.due}
            </p>
          </div>
          <Badge tone={priorityTone[task.priority]}>{task.priority}</Badge>
        </li>
      ))}
    </ul>
  );
}
