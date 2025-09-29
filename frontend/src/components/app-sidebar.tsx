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
} from "@/components/ui/sidebar";
import { LayoutDashboard, Briefcase, FileText, Award, Settings, Calendar, Search, Code } from "lucide-react";
import { useUIStore } from "@/lib/state/ui";

export function AppSidebar() {
  const pathname = usePathname();
  const role = useUIStore((s) => s.role);
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  return (
    <Sidebar className="pt-4" collapsible="icon">
      <SidebarContent className="px-2">
        <SidebarGroup className={role && role !== "student" ? "hidden" : undefined}>
          <SidebarGroupLabel>Student</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/")} className="rounded-md px-3 py-2" tooltip="Dashboard">
                  <Link href="/"><LayoutDashboard size={16} /> <span>Dashboard</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/analytics")} className="rounded-md px-3 py-2" tooltip="Analytics">
                  <Link href="/analytics/student"><LayoutDashboard size={16} /> <span>Analytics</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/opportunities")} className="rounded-md px-3 py-2" tooltip="Opportunities">
                  <Link href="/opportunities"><Briefcase size={16} /> <span>Opportunities</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/ai-search")} className="rounded-md px-3 py-2" tooltip="AI Job Search">
                  <Link href="/ai-search"><Code size={16} /> <span>AI Job Search</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/applications")} className="rounded-md px-3 py-2" tooltip="Applications">
                  <Link href="/applications"><FileText size={16} /> <span>Applications</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/certificates")} className="rounded-md px-3 py-2" tooltip="Certificates">
                  <Link href="/certificates"><Award size={16} /> <span>Certificates</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/interviews")} className="rounded-md px-3 py-2" tooltip="My Interviews">
                  <Link href="/interviews"><Calendar size={16} /> <span>Interviews</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/settings")} className="rounded-md px-3 py-2" tooltip="Settings">
                  <Link href="/settings"><Settings size={16} /> <span>Settings</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className={role && role !== "mentor" ? "hidden" : undefined}>
          <SidebarGroupLabel>Mentor</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/analytics")} className="rounded-md px-3 py-2" tooltip="Analytics">
                  <Link href="/analytics/mentor"><LayoutDashboard size={16} /> <span>Analytics</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/mentor/reviews")} className="rounded-md px-3 py-2" tooltip="Approvals">
                  <Link href="/mentor/reviews"><FileText size={16} /> <span>Approvals</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/settings")} className="rounded-md px-3 py-2" tooltip="Settings">
                  <Link href="/settings"><Settings size={16} /> <span>Settings</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className={role && role !== "placement" && role !== "admin" ? "hidden" : undefined}>
          <SidebarGroupLabel>Placement</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/analytics")} className="rounded-md px-3 py-2" tooltip="Analytics">
                  <Link href="/analytics/placement"><LayoutDashboard size={16} /> <span>Analytics</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/placement/opportunities/new")} className="rounded-md px-3 py-2" tooltip="Post Opportunity">
                  <Link href="/placement/opportunities/new"><Briefcase size={16} /> <span>Post Opportunity</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/placement/applicants")} className="rounded-md px-3 py-2" tooltip="Applicants">
                  <Link href="/placement/applicants"><FileText size={16} /> <span>Applicants</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/settings")} className="rounded-md px-3 py-2" tooltip="Settings">
                  <Link href="/settings"><Settings size={16} /> <span>Settings</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className={role && role !== "recruiter" ? "hidden" : undefined}>
          <SidebarGroupLabel>Recruiter</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/recruiter")} className="rounded-md px-3 py-2" tooltip="Dashboard">
                  <Link href="/recruiter"><LayoutDashboard size={16} /> <span>Dashboard</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/analytics")} className="rounded-md px-3 py-2" tooltip="Analytics">
                  <Link href="/analytics/recruiter"><LayoutDashboard size={16} /> <span>Analytics</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/recruiter/jobs")} className="rounded-md px-3 py-2" tooltip="Jobs">
                  <Link href="/recruiter/jobs"><Briefcase size={16} /> <span>Jobs</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/ai-search")} className="rounded-md px-3 py-2" tooltip="AI Student Search">
                  <Link href="/ai-search"><Search size={16} /> <span>AI Student Search</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/recruiter/applications")} className="rounded-md px-3 py-2" tooltip="Applications">
                  <Link href="/recruiter/applications"><FileText size={16} /> <span>Applications</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/recruiter/interviews")} className="rounded-md px-3 py-2" tooltip="Interview Schedule">
                  <Link href="/recruiter/interviews"><Calendar size={16} /> <span>Interviews</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/settings")} className="rounded-md px-3 py-2" tooltip="Settings">
                  <Link href="/settings"><Settings size={16} /> <span>Settings</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}


