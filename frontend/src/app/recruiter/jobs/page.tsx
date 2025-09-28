"use client";

import Link from "next/link";
import { NotionList } from "@/components/sections/dashboard/notion-list";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Users, Eye } from "lucide-react";

export default function RecruiterJobsPage() {
  const jobs = [
    { 
      id: "1", 
      title: "Software Developer Intern", 
      company: "TechCorp", 
      status: "active", 
      applications: 24,
      postedAt: "2024-01-15",
      type: "Internship",
      location: "Remote"
    },
    { 
      id: "2", 
      title: "Data Analyst Intern", 
      company: "DataViz Inc", 
      status: "paused", 
      applications: 12,
      postedAt: "2024-01-10",
      type: "Internship", 
      location: "Hybrid"
    },
    {
      id: "3",
      title: "Frontend Developer",
      company: "WebStudio",
      status: "active",
      applications: 8,
      postedAt: "2024-01-20",
      type: "Full-time",
      location: "On-site"
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return { bg: '#d7e6dd', color: '#166534' };
      case "paused": return { bg: '#f7d9d5', color: '#dc2626' };
      case "draft": return { bg: '#e6e5e3', color: '#374151' };
      default: return { bg: '#e6e5e3', color: '#374151' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Job Postings</h1>
          <p className="text-muted-foreground">Manage and track all your postings</p>
        </div>
        <Button asChild>
          <Link href="/recruiter/jobs/new">Post New Job</Link>
        </Button>
      </div>

      {/* Jobs List */}
      <NotionList
        title="My Job Postings"
        icon={<Briefcase size={16} />}
        items={jobs}
        searchFields={["title", "company", "type"]}
        filterOptions={[
          {
            key: "status",
            label: "Status",
            options: [
              { value: "active", label: "Active" },
              { value: "paused", label: "Paused" },
              { value: "draft", label: "Draft" }
            ]
          },
          {
            key: "type",
            label: "Type",
            options: [
              { value: "Internship", label: "Internship" },
              { value: "Full-time", label: "Full-time" },
              { value: "Part-time", label: "Part-time" }
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
            key: "status",
            label: "Status",
            render: (item) => {
              const colors = getStatusColor(item.status);
              return (
                <Badge 
                  className="text-xs px-2 py-1" 
                  style={{ backgroundColor: colors.bg, color: colors.color, border: 'none' }}
                >
                  {item.status}
                </Badge>
              );
            }
          },
          {
            key: "applications",
            label: "Applications",
            sortable: true,
            render: (item) => (
              <div className="text-sm">
                {item.applications}
              </div>
            )
          },
          {
            key: "type",
            label: "Type",
            render: (item) => (
              <Badge 
                className="text-xs px-2 py-1" 
                style={{ backgroundColor: '#d3e4f1', color: '#1e40af', border: 'none' }}
              >
                {item.type}
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
            key: "postedAt",
            label: "Posted",
            sortable: true,
            render: (item) => (
              <div className="text-sm text-muted-foreground">
                {formatDate(item.postedAt)}
              </div>
            )
          },
          {
            key: "actions",
            label: "Actions",
            render: (item) => (
              <Button variant="outline" size="sm" asChild className="h-7 px-2 text-xs">
                <Link href={`/recruiter/jobs/${item.id}`}>
                  <Eye size={12} className="mr-1" />
                  View
                </Link>
              </Button>
            )
          }
        ]}
      />
    </div>
  );
}


