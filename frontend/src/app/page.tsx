import React from "react";
import { JobCard } from "@/components/sections/jobs/job-card";
import { mockOpportunities } from "@/mocks/fixtures/opportunities";

export default function Page() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {mockOpportunities.map((o) => (
        <JobCard key={o.id} title={o.title} company={o.company} stipend={o.stipend} mode={o.mode} match={o.match} />
      ))}
    </div>
  );
}