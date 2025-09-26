"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Briefcase, FileText, Award, Settings } from "lucide-react";
import { useUIStore } from "@/lib/state/ui";

export function AppSidebar() {
  const pathname = usePathname();
  const role = useUIStore((s) => s.role);
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  return (
    <Sidebar className="pt-4">
      <SidebarContent className="px-2">
        <SidebarGroup className={role && role !== "student" ? "hidden" : undefined}>
          <SidebarGroupLabel>Student</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/")} className="rounded-md px-3 py-2">
                  <Link href="/"><LayoutDashboard size={16} /> <span>Dashboard</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/opportunities")} className="rounded-md px-3 py-2">
                  <Link href="/opportunities"><Briefcase size={16} /> <span>Opportunities</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/applications")} className="rounded-md px-3 py-2">
                  <Link href="/applications"><FileText size={16} /> <span>Applications</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/certificates")} className="rounded-md px-3 py-2">
                  <Link href="/certificates"><Award size={16} /> <span>Certificates</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/settings")} className="rounded-md px-3 py-2">
                  <Link href="/settings"><Settings size={16} /> <span>Settings</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup className={role && role !== "mentor" ? "hidden" : undefined}>
          <SidebarGroupLabel>Mentor</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/mentor/reviews")} className="rounded-md px-3 py-2">
                  <Link href="/mentor/reviews"><FileText size={16} /> <span>Approvals</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup className={role && role !== "placement" && role !== "admin" ? "hidden" : undefined}>
          <SidebarGroupLabel>Placement</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/placement/opportunities/new")} className="rounded-md px-3 py-2">
                  <Link href="/placement/opportunities/new"><Briefcase size={16} /> <span>Post Opportunity</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/placement/applicants")} className="rounded-md px-3 py-2">
                  <Link href="/placement/applicants"><FileText size={16} /> <span>Applicants</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}


