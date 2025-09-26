"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Progress } from "@/components/ui/progress";

const STEPS = ["/profile", "/skills", "/preferences", "/mentor"];

export function OnboardingProgress() {
  const pathname = usePathname();
  const idx = Math.max(0, STEPS.findIndex((s) => pathname.endsWith(s)));
  const percent = ((idx + 1) / STEPS.length) * 100;
  return (
    <div className="flex w-full max-w-xs items-center gap-2">
      <span className="text-xs text-muted-foreground">Onboarding</span>
      <Progress value={percent} className="flex-1" />
      <span className="text-xs font-medium">{Math.round(percent)}%</span>
    </div>
  );
}


