"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { mockApplications } from "@/mocks/fixtures/applications";
import { StatusChip } from "@/components/sections/applications/status-chip";

export default function ApplicationsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">My Applications</h1>
      <div className="space-y-3">
        {mockApplications.map((app) => (
          <Card key={app.id} className="flex items-center justify-between p-4">
            <div>
              <div className="text-sm text-muted-foreground">{app.company}</div>
              <div className="text-base font-medium">{app.role}</div>
            </div>
            <div className="flex items-center gap-3">
              <StatusChip status={app.status} />
              <div className="text-xs text-muted-foreground">Updated {app.updatedAt}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}


