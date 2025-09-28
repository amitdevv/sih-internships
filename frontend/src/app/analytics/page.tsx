"use client";

import React from "react";
import { useUIStore } from "@/lib/state/ui";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AnalyticsPage() {
  const role = useUIStore((s) => s.role);
  const router = useRouter();

  useEffect(() => {
    // Redirect to role-specific analytics
    if (role === "student") {
      router.replace("/analytics/student");
    } else if (role === "mentor") {
      router.replace("/analytics/mentor");
    } else if (role === "placement") {
      router.replace("/analytics/placement");
    } else if (role === "recruiter") {
      router.replace("/analytics/recruiter");
    } else {
      // Default to student analytics if no role is set
      router.replace("/analytics/student");
    }
  }, [role, router]);

  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-muted-foreground">Loading analytics...</p>
      </div>
    </div>
  );
}


