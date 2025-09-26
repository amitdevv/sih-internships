"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { PieSkillImpact } from "@/components/sections/analytics/pie-skill-impact";

export default function AnalyticsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Analytics</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Applications submitted</div>
          <div className="text-2xl font-semibold">12</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Shortlist rate</div>
          <div className="text-2xl font-semibold">42%</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Interviews scheduled</div>
          <div className="text-2xl font-semibold">5</div>
        </Card>
      </div>
      <PieSkillImpact />
      <Card className="p-4">
        <div className="text-sm text-muted-foreground">Feedback tips</div>
        <ul className="mt-2 list-disc pl-5 text-sm">
          <li>Complete profile to 100% for better role matches.</li>
          <li>Target roles matching your top 3 skills for higher conversion.</li>
          <li>Schedule interviews outside exam weeks to avoid conflicts.</li>
        </ul>
      </Card>
    </div>
  );
}


