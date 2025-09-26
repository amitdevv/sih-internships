"use client";

import React from "react";
import { cn } from "@/lib/utils";

export function StatusChip({ status }: { status: string }) {
  const className = cn(
    "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
    getPillClass(status)
  );
  return <span className={className}>{status}</span>;
}

function getPillClass(status: string): string {
  switch (status) {
    case "Shortlisted":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "InterviewScheduled":
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    case "MentorPending":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "OfferAccepted":
      return "bg-green-100 text-green-800 border-green-200";
    case "Rejected":
      return "bg-red-100 text-red-800 border-red-200";
    case "MentorPending":
      return "bg-gray-100 text-gray-700 border-gray-200";
    default:
      return "bg-[var(--card)] text-foreground border-border";
  }
}


