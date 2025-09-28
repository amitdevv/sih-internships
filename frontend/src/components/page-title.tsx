"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/lib/state/ui";
import { getPageTitle } from "@/lib/page-titles";

export function PageTitle() {
  const pathname = usePathname();
  const role = useUIStore((s) => s.role);

  useEffect(() => {
    const title = getPageTitle(pathname, role);
    document.title = title;
  }, [pathname, role]);

  return null; // This component doesn't render anything
}
