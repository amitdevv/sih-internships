"use client";

import React from "react";
import { NotionList } from "@/components/sections/dashboard/notion-list";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { mockApplications } from "@/mocks/fixtures/applications";

export default function ApplicationsPage() {
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
      case "MentorPending": return { bg: '#f7d9d5', color: '#dc2626' };
      case "Shortlisted": return { bg: '#d7e6dd', color: '#166534' };
      case "InterviewScheduled": return { bg: '#d3e4f1', color: '#1e40af' };
      case "Rejected": return { bg: '#f7d9d5', color: '#dc2626' };
      case "OfferExtended": return { bg: '#d7e6dd', color: '#166534' };
      case "OfferAccepted": return { bg: '#d7e6dd', color: '#166534' };
      case "Completed": return { bg: '#d7e6dd', color: '#166534' };
      default: return { bg: '#e6e5e3', color: '#374151' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Applications</h1>
        <Badge variant="outline" className="flex items-center gap-1">
          {mockApplications.length} applications
        </Badge>
      </div>

      {/* Applications List */}
      <NotionList
        title="Application Status"
        icon={<FileText size={16} />}
        items={mockApplications.map(app => ({ ...app, title: app.role }))}
        searchFields={["role", "company", "location"]}
        filterOptions={[
          {
            key: "status",
            label: "Status",
            options: [
              { value: "MentorPending", label: "Mentor Pending" },
              { value: "Shortlisted", label: "Shortlisted" },
              { value: "InterviewScheduled", label: "Interview Scheduled" },
              { value: "Rejected", label: "Rejected" },
              { value: "OfferExtended", label: "Offer Extended" },
              { value: "Completed", label: "Completed" }
            ]
          },
          {
            key: "location",
            label: "Location",
            options: [
              { value: "Bangalore", label: "Bangalore" },
              { value: "Mumbai", label: "Mumbai" },
              { value: "Delhi", label: "Delhi" },
              { value: "Pune", label: "Pune" },
              { value: "Hyderabad", label: "Hyderabad" }
            ]
          }
        ]}
        columns={[
          {
            key: "role",
            label: "Position",
            sortable: true,
            render: (item) => (
              <div>
                <div className="font-medium text-sm">{item.role}</div>
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
            key: "location",
            label: "Location",
            render: (item) => (
              <div className="text-sm text-muted-foreground">
                {item.location}
              </div>
            )
          },
          {
            key: "updatedAt",
            label: "Updated",
            sortable: true,
            render: (item) => (
              <div className="text-sm text-muted-foreground">
                {formatDate(item.updatedAt)}
              </div>
            )
          }
        ]}
      />
    </div>
  );
}


