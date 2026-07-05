import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  FolderKanban,
  BarChart3,
  Users,
  FileText,
  Bell,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  Sparkles,
  X,
} from "lucide-react";
import { cx } from "@/lib/cx";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/projects", label: "Projects", icon: FolderKanban, exact: false },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3, exact: false },
  { to: "/dashboard/team", label: "Team", icon: Users, exact: false },
  { to: "/dashboard/files", label: "Files", icon: FileText, exact: false },
  { to: "/dashboard/notifications", label: "Notifications", icon: Bell, exact: false },
  { to: "/dashboard/billing", label: "Billing", icon: CreditCard, exact: false },
  { to: "/dashboard/settings", label: "Settings", icon: Settings, exact: false },
  { to: "/dashboard/help", label: "Help", icon: HelpCircle, exact: false },
] as const;

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { logout } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex h-full flex-col">
      <Link to="/dashboard" className="flex items-center gap-2 px-5 pt-6 pb-4" onClick={onNavigate}>
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand shadow-glow">
          <Sparkles className="h-4 w-4 text-white" aria-hidden />
        </span>
        <span className="text-lg font-semibold tracking-tight text-foreground">KaizuoDev</span>
      </Link>

      <nav className="mt-2 flex-1 space-y-1 overflow-y-auto px-3">
        {navItems.map((item) => {
          const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={cx(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-gradient-brand text-white shadow-soft"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <item.icon className="h-4.5 w-4.5" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <button
          type="button"
          onClick={() => logout()}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-red-50 hover:text-destructive"
        >
          <LogOut className="h-4.5 w-4.5" aria-hidden />
          Log out
        </button>
      </div>
    </div>
  );
}

export function Sidebar() {
  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-border lg:bg-background">
      <SidebarContent />
    </aside>
  );
}

export function MobileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-120 lg:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex h-full w-72 max-w-[80vw] flex-col bg-background shadow-elevated"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="absolute right-3 top-5 rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            <SidebarContent onNavigate={onClose} />
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
