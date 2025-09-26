"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Link from "next/link";
import { mockOpportunities } from "@/mocks/fixtures/opportunities";
import { JobCard } from "@/components/sections/jobs/job-card";

export default function OpportunitiesPage() {
  const [q, setQ] = React.useState("");
  const [mode, setMode] = React.useState<string | undefined>();

  const filtered = mockOpportunities.filter((o) => {
    const matchQ = q ? (o.title + o.company).toLowerCase().includes(q.toLowerCase()) : true;
    const matchMode = mode ? o.mode === mode : true;
    return matchQ && matchMode;
  });

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Opportunities</h1>
      <Card className="p-4">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="md:col-span-2">
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search title or company" />
          </div>
          <div>
            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger>
                <SelectValue placeholder="Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="onsite">On-site</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((o) => (
          <Link key={o.id} href={`/opportunities/${o.id}`}>
            <JobCard title={o.title} company={o.company} stipend={o.stipend} mode={o.mode} match={o.match} />
          </Link>
        ))}
      </div>
    </div>
  );
}


