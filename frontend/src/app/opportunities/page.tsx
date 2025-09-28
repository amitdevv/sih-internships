"use client";

import React from "react";
import { NotionList } from "@/components/sections/dashboard/notion-list";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";
import { mockOpportunities, opportunitiesData } from "@/mocks/fixtures/opportunities";
import { RecommendationEngine } from "@/components/recommendation-engine";

export default function OpportunitiesPage() {
  const [showRecommendations, setShowRecommendations] = React.useState(true);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Job Opportunities</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowRecommendations(!showRecommendations)}
            className="text-sm px-3 py-1 rounded-md border"
            style={{ 
              backgroundColor: showRecommendations ? '#a998e7' : 'transparent', 
              color: showRecommendations ? '#3a2290' : '#374151',
              borderColor: '#a998e7'
            }}
          >
            {showRecommendations ? 'Hide' : 'Show'} Recommendations
          </button>
          <Badge variant="outline" className="flex items-center gap-1">
            {opportunitiesData.length} active jobs
          </Badge>
        </div>
      </div>

      {/* Recommendations Section */}
      {showRecommendations && (
        <NotionList
          title="Recommended for You"
          icon={<Briefcase size={16} />}
          items={opportunitiesData.slice(0, 3).map(opp => ({
            id: opp.id,
            title: opp.title,
            company: opp.company,
            stipend: opp.stipend,
            mode: opp.workMode,
            match: opp.matchScore,
            location: opp.location,
            duration: opp.duration,
            skills: opp.skills,
            type: "Internship"
          }))}
          searchFields={["title", "company", "skills"]}
          filterOptions={[
            {
              key: "mode",
              label: "Work Mode",
              options: [
                { value: "Remote", label: "Remote" },
                { value: "On-site", label: "On-site" },
                { value: "Hybrid", label: "Hybrid" }
              ]
            },
            {
              key: "location",
              label: "Location",
              options: [
                { value: "Bangalore", label: "Bangalore" },
                { value: "Mumbai", label: "Mumbai" },
                { value: "Delhi", label: "Delhi" },
                { value: "Pune", label: "Pune" }
              ]
            }
          ]}
          columns={[
            {
              key: "title",
              label: "Position",
              sortable: true,
              render: (item) => (
                <div>
                  <div className="font-medium text-sm">{item.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {item.company}
                  </div>
                </div>
              )
            },
            {
              key: "match",
              label: "Match",
              sortable: true,
              render: (item) => (
                <div className="text-sm">
                  <div className="font-medium">{item.match}%</div>
                  <div className="w-16 bg-muted rounded-full h-1.5">
                    <div 
                      className="bg-primary h-1.5 rounded-full" 
                      style={{ width: `${item.match}%` }}
                    />
                  </div>
                </div>
              )
            },
            {
              key: "stipend",
              label: "Stipend",
              sortable: true,
              render: (item) => (
                <div className="text-sm font-medium">
                  {item.stipend}
                </div>
              )
            },
            {
              key: "mode",
              label: "Mode",
              render: (item) => (
                <Badge 
                  className="text-xs px-2 py-1" 
                  style={{ backgroundColor: '#d3e4f1', color: '#1e40af', border: 'none' }}
                >
                  {item.mode}
                </Badge>
              )
            },
            {
              key: "location",
              label: "Location",
              render: (item) => (
                <div className="text-sm text-muted-foreground">
                  {item.location}
                </div>
              )
            },
            {
              key: "duration",
              label: "Duration",
              render: (item) => (
                <div className="text-sm text-muted-foreground">
                  {item.duration || "Not specified"}
                </div>
              )
            }
          ]}
        />
      )}

      {/* All Opportunities */}
      <NotionList
        title="All Opportunities"
        icon={<Briefcase size={16} />}
        items={opportunitiesData.map(opp => ({
          id: opp.id,
          title: opp.title,
          company: opp.company,
          stipend: opp.stipend,
          mode: opp.workMode,
          match: opp.matchScore,
          location: opp.location,
          duration: opp.duration,
          skills: opp.skills,
          type: "Internship" // Default type since opportunitiesData doesn't have this field
        }))}
        searchFields={["title", "company", "skills"]}
        filterOptions={[
          {
            key: "mode",
            label: "Work Mode",
            options: [
              { value: "Remote", label: "Remote" },
              { value: "On-site", label: "On-site" },
              { value: "Hybrid", label: "Hybrid" }
            ]
          },
          {
            key: "location",
            label: "Location",
            options: [
              { value: "Bangalore", label: "Bangalore" },
              { value: "Mumbai", label: "Mumbai" },
              { value: "Delhi", label: "Delhi" },
              { value: "Pune", label: "Pune" }
            ]
          }
        ]}
        columns={[
          {
            key: "title",
            label: "Position",
            sortable: true,
            render: (item) => (
              <div>
                <div className="font-medium text-sm">{item.title}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {item.company}
                </div>
              </div>
            )
          },
          {
            key: "match",
            label: "Match",
            sortable: true,
            render: (item) => (
              <div className="text-sm">
                <div className="font-medium">{item.match}%</div>
                <div className="w-16 bg-muted rounded-full h-1.5">
                  <div 
                    className="bg-primary h-1.5 rounded-full" 
                    style={{ width: `${item.match}%` }}
                  />
                </div>
              </div>
            )
          },
          {
            key: "stipend",
            label: "Stipend",
            sortable: true,
            render: (item) => (
              <div className="text-sm font-medium">
                {item.stipend}
              </div>
            )
          },
          {
            key: "mode",
            label: "Mode",
            render: (item) => (
              <Badge 
                className="text-xs px-2 py-1" 
                style={{ backgroundColor: '#d3e4f1', color: '#1e40af', border: 'none' }}
              >
                {item.mode}
              </Badge>
            )
          },
          {
            key: "location",
            label: "Location",
            render: (item) => (
              <div className="text-sm text-muted-foreground">
                {item.location}
              </div>
            )
          },
          {
            key: "duration",
            label: "Duration",
            render: (item) => (
              <div className="text-sm text-muted-foreground">
                {item.duration || "Not specified"}
              </div>
            )
          }
        ]}
      />
    </div>
  );
}


