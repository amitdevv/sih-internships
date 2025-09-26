"use client";

import React from "react";
import { StatusChip } from "./status-chip";

const STAGES = [
  "Draft",
  "Submitted",
  "MentorPending",
  "Shortlisted",
  "InterviewScheduled",
  "Interviewed",
  "OfferExtended",
  "OfferAccepted",
  "InternshipOngoing",
  "CertificateIssued",
];

export function ApplicationTimeline({ status }: { status: string }) {
  const currentIndex = Math.max(0, STAGES.indexOf(status));
  return (
    <ol className="space-y-2">
      {STAGES.map((s, idx) => {
        const reached = idx <= currentIndex;
        return (
          <li key={s} className="flex items-center gap-3">
            <span
              className={
                "size-2 rounded-full " + (reached ? "bg-foreground" : "bg-border")
              }
            />
            <StatusChip status={s} />
          </li>
        );
      })}
    </ol>
  );
}


