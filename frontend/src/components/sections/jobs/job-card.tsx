"use client";

import React from "react";
import { Card } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Briefcase } from "lucide-react";

export type JobCardProps = {
  title: string;
  company: string;
  stipend?: string;
  mode?: "onsite" | "remote" | "hybrid";
  match?: number;
};

export function JobCard({ title, company, stipend, mode, match }: JobCardProps) {
  return (
    <Card className="rounded-lg border border-border bg-[var(--card)] p-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase size={16} />
            <span>{company}</span>
          </div>
          <h3 className="mt-1 text-base font-medium">{title}</h3>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {stipend && <Badge variant="secondary">Stipend: {stipend}</Badge>}
            {mode && <Badge variant="secondary">{mode}</Badge>}
          </div>
        </div>
        {typeof match === "number" && (
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Match</div>
            <div className="text-sm font-semibold">{match}%</div>
          </div>
        )}
      </div>
      <div className="mt-3">
        <button className="text-sm font-medium">Apply in 1 click</button>
      </div>
    </Card>
  );
}


