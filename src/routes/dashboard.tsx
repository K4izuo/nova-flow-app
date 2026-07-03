import { useEffect, useState } from "react";
import { createFileRoute, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { Sidebar, MobileSidebar } from "@/components/dashboard/Sidebar";
import { TopNav } from "@/components/dashboard/TopNav";
import { Breadcrumbs } from "@/components/dashboard/Breadcrumbs";
import { Skeleton } from "@/components/common/Skeleton";
import { useAuth } from "@/contexts/AuthContext";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function FullScreenLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-sm space-y-3 px-6">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}

function DashboardLayout() {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate({ to: "/login" });
    }
  }, [isLoading, isAuthenticated, navigate]);

  useEffect(() => {
    setMobileNavOpen(false);
  }, [pathname]);

  if (isLoading || !isAuthenticated) {
    return <FullScreenLoader />;
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <Sidebar />
      <MobileSidebar open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      <div className="lg:pl-64">
        <TopNav onMenuClick={() => setMobileNavOpen(true)} />
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-5">
            <Breadcrumbs />
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
