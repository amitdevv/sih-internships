"use client";

import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { InboxDropdown } from "@/components/sections/notifications/inbox-dropdown";
import { ProfileMenu } from "@/components/sections/profile/profile-menu";
import { OnboardingProgress } from "@/components/sections/onboarding/progress";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/lib/state/ui";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export function Header() {
  const pathname = usePathname();
  const role = useUIStore((s) => s.role);
  const showOnboarding = pathname?.startsWith("/profile") || pathname?.startsWith("/skills") || pathname?.startsWith("/preferences") || pathname?.startsWith("/mentor");
  const segments = (pathname || "/").split("/").filter(Boolean);
  const label = (s: string) => {
    switch (s) {
      case "opportunities": return "Opportunities";
      case "applications": return "Applications";
      case "mentor": return "Mentor";
      case "reviews": return "Reviews";
      case "placement": return "Placement";
      case "applicants": return "Applicants";
      case "certificates": return "Certificates";
      case "settings": return "Settings";
      case "profile": return "Profile";
      case "skills": return "Skills";
      case "preferences": return "Preferences";
      default: return s.charAt(0).toUpperCase() + s.slice(1);
    }
  };
  return (
    <div className="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-border bg-white px-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        {!showOnboarding && (
          <Breadcrumb>
            <BreadcrumbList>
              {segments.length === 0 ? (
                <BreadcrumbItem>
                  <BreadcrumbPage>{role ? role.charAt(0).toUpperCase() + role.slice(1) : "Dashboard"}</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                segments.map((s, i) => {
                  const href = "/" + segments.slice(0, i + 1).join("/");
                  const isLast = i === segments.length - 1;
                  return (
                    <React.Fragment key={href}>
                      <BreadcrumbItem key={href + "-item"}>
                        {isLast ? (
                          <BreadcrumbPage>{label(s)}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={href}>{label(s)}</BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {!isLast && <BreadcrumbSeparator key={href + "-sep"} />}
                    </React.Fragment>
                  );
                })
              )}
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </div>
      <div className="flex items-center gap-3">
        {showOnboarding && <OnboardingProgress />}
        <InboxDropdown />
        <ProfileMenu />
      </div>
    </div>
  );
}


