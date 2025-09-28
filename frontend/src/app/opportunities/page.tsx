"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { mockOpportunities, opportunitiesData } from "@/mocks/fixtures/opportunities";
import { JobCard } from "@/components/sections/jobs/job-card";
import { RecommendationEngine } from "@/components/recommendation-engine";

export default function OpportunitiesPage() {
  const [q, setQ] = React.useState("");
  const [mode, setMode] = React.useState<string | undefined>();
  const [showRecommendations, setShowRecommendations] = React.useState(true);

  const filtered = mockOpportunities.filter((o) => {
    const matchQ = q ? (o.title + o.company).toLowerCase().includes(q.toLowerCase()) : true;
    const matchMode = mode ? o.mode === mode : true;
    return matchQ && matchMode;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Job Opportunities</h1>
        <Badge variant="outline" className="flex items-center gap-1">
          {opportunitiesData.length} active jobs
        </Badge>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="grid gap-3 md:grid-cols-4">
          <div className="md:col-span-2">
            <Input 
              value={q} 
              onChange={(e) => setQ(e.target.value)} 
              placeholder="Search by title, company, or skills..." 
            />
          </div>
          <div>
            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger>
                <SelectValue placeholder="Work Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="onsite">On-site</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowRecommendations(!showRecommendations)}
              className="px-3 py-2 text-sm rounded-md"
              style={{ 
                backgroundColor: '#a998e7', 
                color: '#3a2290',
                border: 'none'
              }}
            >
              {showRecommendations ? 'Hide' : 'Show'} Recommendations
            </button>
          </div>
        </div>
      </Card>

      {/* Recommendations Section */}
      {showRecommendations && (
        <div className="space-y-4">
          <RecommendationEngine showCount={3} />
        </div>
      )}

      {/* All Jobs Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">All Opportunities</h2>
          <Badge variant="secondary">
            {filtered.length} jobs found
          </Badge>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((o) => (
            <Link key={o.id} href={`/opportunities/${o.id}`}>
              <JobCard title={o.title} company={o.company} stipend={o.stipend} mode={o.mode} match={o.match} />
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <Card>
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-muted-foreground text-center">
                No jobs found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setQ("");
                  setMode(undefined);
                }}
                className="mt-4 text-blue-600 hover:text-blue-700 text-sm"
              >
                Clear filters
              </button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}


