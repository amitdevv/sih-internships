"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { Header } from "@/components/header";
import { useUIStore } from "@/lib/state/ui";
import { useRouter } from "next/navigation";

export function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const role = useUIStore((s) => s.role);
  const isAuth = pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up");
  // Always run hooks in the same order; handle redirects inside the effect
  React.useEffect(() => {
    if (!isAuth && !role) router.replace("/sign-in");
  }, [isAuth, role, router]);
  if (isAuth) return <>{children}</>;
  if (!role) return null;
  return (
    <SidebarProvider>
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden md:block">
        <AppSidebar />
      </div>
      <SidebarInset>
        <Header />
        <main className="p-4 pb-20 md:pb-4">
          <div className="mx-auto max-w-6xl space-y-4">{children}</div>
        </main>
        {/* Mobile Navigation - Only visible on mobile */}
        <MobileNav />
      </SidebarInset>
    </SidebarProvider>
  );
}


