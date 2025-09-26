"use client";

import React from "react";
import { useParams } from "next/navigation";
import { mockApplications } from "@/mocks/fixtures/applications";
import { ApplicationTimeline } from "@/components/sections/applications/timeline";
import { Card } from "@/components/ui/card";

export default function ApplicationDetailPage() {
  const params = useParams<{ id: string }>();
  const app = mockApplications.find((a) => a.id === params?.id);

  if (!app) return <div className="text-sm text-muted-foreground">Not found.</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">{app.role} · {app.company}</h1>
      <div className="rounded-lg border border-border bg-[var(--card)] p-4">
        <ApplicationTimeline status={app.status} />
      </div>
      <div className="rounded-lg border border-border bg-[var(--card)] p-4">
        <div className="text-sm">
          Resume link: <a className="underline" href="https://example.com/resume.pdf" target="_blank" rel="noreferrer">https://example.com/resume.pdf</a>
        </div>
      </div>
    </div>
  );
}


