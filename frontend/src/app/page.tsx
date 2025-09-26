import React from "react";
import { JobCard } from "@/components/sections/jobs/job-card";
import { mockOpportunities } from "@/mocks/fixtures/opportunities";
import { ProfileCompleteness } from "@/components/sections/dashboard/profile-completeness";
import { mockProfile } from "@/mocks/fixtures/profile";
import { Deadlines } from "@/components/sections/dashboard/deadlines";
import { Interviews } from "@/components/sections/dashboard/interviews";
import { mockDeadlines, mockInterviews } from "@/mocks/fixtures/dashboard";

export default function Page() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="md:col-span-2">
        <ProfileCompleteness name={mockProfile.fullName} percent={mockProfile.completeness} />
      </div>
      <Deadlines items={mockDeadlines} />
      <Interviews items={mockInterviews} />
      {mockOpportunities.map((o) => (
        <JobCard
          key={o.id}
          title={o.title}
          company={o.company}
          stipend={o.stipend}
          mode={o.mode}
          match={o.match}
          status={o.match && o.match > 80 ? "Shortlisted" : undefined}
        />
      ))}
    </div>
  );
}