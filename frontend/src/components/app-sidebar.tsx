"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Briefcase, FileText, Award, Settings } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar className="pt-4">
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="rounded-md px-3 py-2">
                  <Link href="/"><LayoutDashboard size={16} /> <span>Dashboard</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="rounded-md px-3 py-2">
                  <Link href="/opportunities"><Briefcase size={16} /> <span>Opportunities</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="rounded-md px-3 py-2">
                  <Link href="/applications"><FileText size={16} /> <span>Applications</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="rounded-md px-3 py-2">
                  <Link href="/certificates"><Award size={16} /> <span>Certificates</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="rounded-md px-3 py-2">
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


