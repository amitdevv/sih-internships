"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell } from "lucide-react";

export function Header() {
  return (
    <div className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-border bg-white px-4">
      <SidebarTrigger />
      <button aria-label="Notifications" className="inline-flex items-center">
        <Bell size={18} />
      </button>
    </div>
  );
}


