import { useNavigate } from "@tanstack/react-router";
import { Menu, Search, Bell, MessageSquare, ChevronDown, Sun, Moon, User, Settings, CreditCard, LogOut } from "lucide-react";
import { Avatar } from "@/components/common/Avatar";
import { Dropdown, DropdownItem, DropdownLabel, DropdownSeparator } from "@/components/common/Dropdown";
import { Tooltip } from "@/components/common/Tooltip";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { notifications as mockNotifications, messages as mockMessages } from "@/data/mock";
import { cx } from "@/lib/cx";

export function TopNav({ onMenuClick, title }: { onMenuClick: () => void; title?: string }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const unreadNotifications = mockNotifications.filter((n) => !n.read).length;
  const unreadMessages = mockMessages.filter((m) => m.unread).length;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open menu"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {title ? (
          <h1 className="hidden text-lg font-semibold tracking-tight text-foreground sm:block">{title}</h1>
        ) : null}

        <div className="relative ml-auto flex-1 max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search projects, files, people…"
            className="w-full rounded-full border border-border bg-secondary/50 py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors focus-visible:border-[color:var(--brand-primary)] focus-visible:bg-background focus-visible:ring-2 focus-visible:ring-[color:var(--brand-primary)]/30"
          />
        </div>

        <Tooltip content={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            {theme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>
        </Tooltip>

        <Dropdown
          width="w-80"
          trigger={(props) => (
            <button
              {...props}
              aria-label="Notifications"
              className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <Bell className="h-4.5 w-4.5" />
              {unreadNotifications > 0 ? (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[color:var(--accent-solid)] ring-2 ring-background" />
              ) : null}
            </button>
          )}
        >
          <DropdownLabel>Notifications</DropdownLabel>
          {mockNotifications.slice(0, 4).map((n) => (
            <div key={n.id} className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-secondary">
              <span
                className={cx(
                  "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
                  n.read ? "bg-transparent" : "bg-[color:var(--accent-solid)]",
                )}
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{n.title}</p>
                <p className="truncate text-xs text-muted-foreground">{n.description}</p>
              </div>
            </div>
          ))}
          <DropdownSeparator />
          <DropdownItem onClick={() => navigate({ to: "/dashboard/notifications" })}>
            View all notifications
          </DropdownItem>
        </Dropdown>

        <Dropdown
          width="w-80"
          trigger={(props) => (
            <button
              {...props}
              aria-label="Messages"
              className="relative hidden h-10 w-10 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors sm:grid"
            >
              <MessageSquare className="h-4.5 w-4.5" />
              {unreadMessages > 0 ? (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[color:var(--brand-primary)] ring-2 ring-background" />
              ) : null}
            </button>
          )}
        >
          <DropdownLabel>Messages</DropdownLabel>
          {mockMessages.map((m) => (
            <div key={m.id} className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-secondary">
              <Avatar initials={m.initials} size="sm" />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{m.from}</p>
                <p className="truncate text-xs text-muted-foreground">{m.preview}</p>
              </div>
            </div>
          ))}
        </Dropdown>

        <Dropdown
          trigger={(props) => (
            <button
              {...props}
              className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 hover:bg-secondary transition-colors"
            >
              <Avatar initials={user?.initials ?? "?"} size="sm" />
              <span className="hidden text-sm font-medium text-foreground md:block">
                {user?.fullName ?? "Account"}
              </span>
              <ChevronDown className="hidden h-4 w-4 text-muted-foreground md:block" />
            </button>
          )}
        >
          <DropdownLabel>{user?.email}</DropdownLabel>
          <DropdownItem icon={User} onClick={() => navigate({ to: "/dashboard/profile" })}>
            Profile
          </DropdownItem>
          <DropdownItem icon={Settings} onClick={() => navigate({ to: "/dashboard/settings" })}>
            Settings
          </DropdownItem>
          <DropdownItem icon={CreditCard} onClick={() => navigate({ to: "/dashboard/billing" })}>
            Billing
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem icon={LogOut} danger onClick={() => logout()}>
            Log out
          </DropdownItem>
        </Dropdown>
      </div>
    </header>
  );
}
