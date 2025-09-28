"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/lib/state/ui";
import { 
  LayoutDashboard, 
  BarChart3, 
  Briefcase, 
  FileText, 
  Award, 
  Calendar,
  Settings,
  Users,
  CheckSquare,
  Plus
} from "lucide-react";

export function MobileNav() {
  const pathname = usePathname();
  const role = useUIStore((s) => s.role);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  // Student navigation items
  const studentNavItems = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/analytics/student", label: "Analytics", icon: BarChart3 },
    { href: "/opportunities", label: "Jobs", icon: Briefcase },
    { href: "/applications", label: "Applications", icon: FileText },
    { href: "/certificates", label: "Certificates", icon: Award },
  ];

  // Mentor navigation items
  const mentorNavItems = [
    { href: "/analytics/mentor", label: "Analytics", icon: BarChart3 },
    { href: "/mentor/reviews", label: "Reviews", icon: CheckSquare },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  // Placement navigation items
  const placementNavItems = [
    { href: "/analytics/placement", label: "Analytics", icon: BarChart3 },
    { href: "/placement/opportunities/new", label: "Post Job", icon: Plus },
    { href: "/placement/applicants", label: "Applicants", icon: Users },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  // Recruiter navigation items
  const recruiterNavItems = [
    { href: "/recruiter", label: "Dashboard", icon: LayoutDashboard },
    { href: "/analytics/recruiter", label: "Analytics", icon: BarChart3 },
    { href: "/recruiter/jobs", label: "Jobs", icon: Briefcase },
    { href: "/recruiter/applications", label: "Applications", icon: FileText },
    { href: "/recruiter/interviews", label: "Interviews", icon: Calendar },
  ];

  // Get navigation items based on role
  const getNavItems = () => {
    switch (role) {
      case "mentor":
        return mentorNavItems;
      case "placement":
        return placementNavItems;
      case "recruiter":
        return recruiterNavItems;
      default:
        return studentNavItems;
    }
  };

  const navItems = getNavItems();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors ${
                active 
                  ? "text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
