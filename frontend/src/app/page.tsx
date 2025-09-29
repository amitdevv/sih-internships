"use client";

import React from "react";
import { ProfileCompleteness } from "@/components/sections/dashboard/profile-completeness";
import { NotionList } from "@/components/sections/dashboard/notion-list";
import { mockProfile } from "@/mocks/fixtures/profile";
import { 
  enhancedInterviews, 
  enhancedDeadlines, 
  enhancedApplications, 
  enhancedCertificates,
  enhancedOpportunities 
} from "@/mocks/fixtures/enhanced-dashboard";
import { 
  Calendar, 
  Clock, 
  Building2, 
  MapPin, 
  DollarSign, 
  FileText, 
  Award,
  Briefcase,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const [activeTab, setActiveTab] = React.useState("overview");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "urgent": return "destructive";
      case "soon": return "default";
      case "offered": return "default";
      case "shortlisted": return "secondary";
      case "rejected": return "destructive";
      case "completed": return "secondary";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "offered": return <CheckCircle size={14} className="text-green-600" />;
      case "rejected": return <XCircle size={14} className="text-red-600" />;
      case "urgent": return <AlertCircle size={14} className="text-orange-600" />;
      default: return null;
    }
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "interviews", label: "Interviews" },
    { id: "applications", label: "Applications" },
    { id: "opportunities", label: "Opportunities" }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab formatDate={formatDate} formatTime={formatTime} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} />;
      case "interviews":
        return <InterviewsTab formatDate={formatDate} formatTime={formatTime} getStatusColor={getStatusColor} />;
      case "applications":
        return <ApplicationsTab formatDate={formatDate} getStatusColor={getStatusColor} />;
      case "opportunities":
        return <OpportunitiesTab />;
      default:
        return <OverviewTab formatDate={formatDate} formatTime={formatTime} getStatusColor={getStatusColor} getStatusIcon={getStatusIcon} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Completeness */}
      <ProfileCompleteness name={mockProfile.fullName} percent={mockProfile.completeness} />

      {/* Horizontal Navigation Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
}

// Overview Tab Component
function OverviewTab({ formatDate, formatTime, getStatusColor, getStatusIcon }: any) {
  return (
    <div className="space-y-6">
      {/* Application Deadlines */}
      <NotionList
        title="Application Deadlines"
        icon={<Clock size={16} />}
        items={enhancedDeadlines.map(item => ({ ...item, title: item.role }))}
        searchFields={["role", "company", "type"]}
        filterOptions={[
          {
            key: "status",
            label: "Priority",
            options: [
              { value: "urgent", label: "Urgent" },
              { value: "soon", label: "Soon" },
              { value: "normal", label: "Normal" }
            ]
          },
          {
            key: "type",
            label: "Type",
            options: [
              { value: "Application", label: "Application" },
              { value: "Portfolio Submission", label: "Portfolio" }
            ]
          }
        ]}
        columns={[
          {
            key: "role",
            label: "Role",
            sortable: true,
            render: (item: any) => (
              <div>
                <div className="font-medium text-sm">{item.role}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {item.company}
                </div>
              </div>
            )
          },
          {
            key: "due",
            label: "Deadline",
            sortable: true,
            render: (item: any) => (
              <div className="text-sm font-medium">
                {formatDate(item.due)}
              </div>
            )
          },
          {
            key: "type",
            label: "Type",
            render: (item: any) => (
              <Badge 
                className="text-xs px-2 py-1" 
                style={{ backgroundColor: '#d3e4f1', color: '#1e40af', border: 'none' }}
              >
                {item.type}
              </Badge>
            )
          },
          {
            key: "status",
            label: "Priority",
            render: (item: any) => (
              <Badge 
                className="text-xs px-2 py-1" 
                style={{ 
                  backgroundColor: item.status === 'urgent' ? '#f7d9d5' : '#d7e6dd', 
                  color: item.status === 'urgent' ? '#dc2626' : '#166534', 
                  border: 'none' 
                }}
              >
                {item.status}
              </Badge>
            )
          }
        ]}
      />
    </div>
  );
}

// Interviews Tab Component
function InterviewsTab({ formatDate, formatTime, getStatusColor }: any) {
  return (
    <div className="space-y-6">
      <NotionList
        title="Upcoming Interviews"
        icon={<Calendar size={16} />}
        items={enhancedInterviews.map(item => ({ ...item, title: item.role }))}
        searchFields={["role", "company", "type"]}
        filterOptions={[
          {
            key: "status",
            label: "Status",
            options: [
              { value: "scheduled", label: "Scheduled" },
              { value: "completed", label: "Completed" }
            ]
          },
          {
            key: "type",
            label: "Type",
            options: [
              { value: "Technical", label: "Technical" },
              { value: "Behavioral", label: "Behavioral" },
              { value: "Portfolio Review", label: "Portfolio Review" }
            ]
          }
        ]}
        columns={[
          {
            key: "role",
            label: "Role",
            sortable: true,
            render: (item: any) => (
              <div>
                <div className="font-medium text-sm">{item.role}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {item.company}
                </div>
              </div>
            )
          },
          {
            key: "at",
            label: "Date & Time",
            sortable: true,
            render: (item: any) => (
              <div className="text-sm">
                <div className="font-medium">{formatDate(item.at)}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {formatTime(item.at)}
                </div>
              </div>
            )
          },
          {
            key: "location",
            label: "Location",
            render: (item: any) => (
              <div className="text-sm text-muted-foreground">
                {item.location}
              </div>
            )
          },
          {
            key: "type",
            label: "Type",
            render: (item: any) => (
              <Badge 
                className="text-xs px-2 py-1" 
                style={{ backgroundColor: '#d3e4f1', color: '#1e40af', border: 'none' }}
              >
                {item.type}
              </Badge>
            )
          },
          {
            key: "status",
            label: "Status",
            render: (item: any) => (
              <Badge 
                className="text-xs px-2 py-1" 
                style={{ backgroundColor: '#d7e6dd', color: '#166534', border: 'none' }}
              >
                {item.status}
              </Badge>
            )
          }
        ]}
      />
    </div>
  );
}

// Applications Tab Component
function ApplicationsTab({ formatDate, getStatusColor }: any) {
  return (
    <div className="space-y-6">
      <NotionList
        title="My Applications"
        icon={<FileText size={16} />}
        items={enhancedApplications.map(item => ({ ...item, title: item.role }))}
        searchFields={["role", "company"]}
        filterOptions={[
          {
            key: "status",
            label: "Status",
            options: [
              { value: "pending", label: "Pending" },
              { value: "shortlisted", label: "Shortlisted" },
              { value: "interviewed", label: "Interviewed" },
              { value: "offered", label: "Offered" },
              { value: "rejected", label: "Rejected" }
            ]
          }
        ]}
        columns={[
          {
            key: "role",
            label: "Role",
            sortable: true,
            render: (item: any) => (
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
            render: (item: any) => (
              <Badge 
                className="text-xs px-2 py-1" 
                style={{ 
                  backgroundColor: item.status === 'offered' ? '#d7e6dd' : 
                                  item.status === 'rejected' ? '#f7d9d5' : '#e6e5e3', 
                  color: item.status === 'offered' ? '#166534' : 
                         item.status === 'rejected' ? '#dc2626' : '#374151', 
                  border: 'none' 
                }}
              >
                {item.status}
              </Badge>
            )
          },
          {
            key: "match",
            label: "Match",
            sortable: true,
            render: (item: any) => (
              <div className="text-sm">
                <div className="font-medium">{item.match}%</div>
                <div className="w-16 bg-muted rounded-full h-1.5">
                  <div 
                    className="bg-[#64a6e7] h-1.5 rounded-full" 
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
            render: (item: any) => (
              <div className="text-sm font-medium">
                {item.stipend}
              </div>
            )
          },
          {
            key: "location",
            label: "Location",
            render: (item: any) => (
              <div className="text-sm text-muted-foreground">
                {item.location}
              </div>
            )
          }
        ]}
      />
    </div>
  );
}

// Opportunities Tab Component
function OpportunitiesTab() {
  return (
    <div className="space-y-6">
      <NotionList
        title="Available Opportunities"
        icon={<Briefcase size={16} />}
        items={enhancedOpportunities}
        searchFields={["title", "company", "skills"]}
        filterOptions={[
          {
            key: "mode",
            label: "Work Mode",
            options: [
              { value: "Remote", label: "Remote" },
              { value: "Hybrid", label: "Hybrid" },
              { value: "On-site", label: "On-site" }
            ]
          },
          {
            key: "type",
            label: "Type",
            options: [
              { value: "Internship", label: "Internship" },
              { value: "Full-time", label: "Full-time" }
            ]
          }
        ]}
        columns={[
          {
            key: "title",
            label: "Position",
            sortable: true,
            render: (item: any) => (
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
            render: (item: any) => (
              <div className="text-sm">
                <div className="font-medium">{item.match}%</div>
                <div className="w-16 bg-muted rounded-full h-1.5">
                  <div 
                    className="bg-[#90c0ee] h-1.5 rounded-full" 
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
            render: (item: any) => (
              <div className="text-sm font-medium">
                {item.stipend}
              </div>
            )
          },
          {
            key: "mode",
            label: "Mode",
            render: (item: any) => (
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
            render: (item: any) => (
              <div className="text-sm text-muted-foreground">
                {item.location}
              </div>
            )
          }
        ]}
      />
    </div>
  );
}