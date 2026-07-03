import { cx } from "@/lib/cx";

export interface TabItem {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export function Tabs({
  tabs,
  value,
  onChange,
}: {
  tabs: TabItem[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div role="tablist" className="flex flex-wrap gap-1 rounded-2xl border border-border bg-secondary/50 p-1">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = tab.value === value;
        return (
          <button
            key={tab.value}
            role="tab"
            type="button"
            aria-selected={active}
            onClick={() => onChange(tab.value)}
            className={cx(
              "inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-medium transition-all",
              active
                ? "bg-background text-foreground shadow-soft"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {Icon ? <Icon className="h-4 w-4" /> : null}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
