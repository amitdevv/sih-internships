"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

export default function RecruiterAnalyticsPage() {
  const [activeTab, setActiveTab] = React.useState("overview");

  const stats = {
    totalJobsPosted: 8,
    activeJobs: 6,
    totalApplications: 124,
    interviewsConducted: 15,
    offersExtended: 3,
    averageTimeToHire: "12 days"
  };

  const jobPerformance = [
    { title: "Software Developer Intern", applications: 45, interviews: 8, offers: 2, conversion: 4.4 },
    { title: "Data Analyst Intern", applications: 32, interviews: 5, offers: 1, conversion: 3.1 },
    { title: "UX Design Intern", applications: 28, interviews: 2, offers: 0, conversion: 0 },
    { title: "Marketing Intern", applications: 19, interviews: 0, offers: 0, conversion: 0 }
  ];

  const applicationSources = [
    { source: "Direct Application", count: 45, percentage: 36.3 },
    { source: "Campus Placement", count: 38, percentage: 30.6 },
    { source: "Referral", count: 25, percentage: 20.2 },
    { source: "Job Board", count: 16, percentage: 12.9 }
  ];

  const monthlyActivity = [
    { month: "Jan", jobs: 2, applications: 25, interviews: 3, offers: 1 },
    { month: "Feb", jobs: 3, applications: 35, interviews: 5, offers: 1 },
    { month: "Mar", jobs: 2, applications: 28, interviews: 4, offers: 1 },
    { month: "Apr", jobs: 1, applications: 36, interviews: 3, offers: 0 }
  ];

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "jobs", label: "Jobs" },
    { id: "sources", label: "Sources" },
    { id: "activity", label: "Activity" }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab stats={stats} />;
      case "jobs":
        return <JobsTab jobPerformance={jobPerformance} />;
      case "sources":
        return <SourcesTab applicationSources={applicationSources} />;
      case "activity":
        return <ActivityTab monthlyActivity={monthlyActivity} />;
      default:
        return <OverviewTab stats={stats} />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Recruiter Analytics</h1>
        <p className="text-muted-foreground">Track your recruitment performance and hiring metrics</p>
      </div>

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
function OverviewTab({ stats }: { stats: any }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Jobs Posted</CardTitle>
          <Badge variant="secondary">{stats.totalJobsPosted}</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{stats.totalJobsPosted}</div>
          <p className="text-xs text-muted-foreground">{stats.activeJobs} active</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Applications</CardTitle>
          <Badge variant="secondary">{stats.totalApplications}</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{stats.totalApplications}</div>
          <p className="text-xs text-muted-foreground">Received</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Interviews</CardTitle>
          <Badge variant="default">{stats.interviewsConducted}</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{stats.interviewsConducted}</div>
          <p className="text-xs text-muted-foreground">Conducted</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Offers Extended</CardTitle>
          <Badge variant="outline">{stats.offersExtended}</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{stats.offersExtended}</div>
          <p className="text-xs text-muted-foreground">Success rate</p>
        </CardContent>
      </Card>
    </div>
  );
}

// Jobs Tab Component with Recharts
function JobsTab({ jobPerformance }: { jobPerformance: any }) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Job Performance Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Job Performance Analysis</CardTitle>
            <CardDescription>Applications vs interviews vs offers by job</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={jobPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="applications" fill="#8884d8" name="Applications" />
                <Bar dataKey="interviews" fill="#82ca9d" name="Interviews" />
                <Bar dataKey="offers" fill="#ffc658" name="Offers" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion Rate Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Success Rate</CardTitle>
            <CardDescription>Success rates by job posting</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={jobPerformance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ title, conversion }: any) => `${title.split(' ')[0]} (${conversion}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="conversion"
                >
                  {jobPerformance.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Job Details */}
      <Card>
        <CardHeader>
          <CardTitle>Job Performance Details</CardTitle>
          <CardDescription>Detailed metrics for each job posting</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {jobPerformance.map((job: any) => (
            <div key={job.title} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{job.title}</span>
                <span className="text-muted-foreground">{job.offers}/{job.applications} conversion</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Conversion Rate</span>
                  <span>{job.conversion}%</span>
                </div>
                <Progress value={job.conversion} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{job.applications} applications</span>
                  <span>{job.interviews} interviews</span>
                  <span>{job.offers} offers</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// Sources Tab Component with Recharts
function SourcesTab({ applicationSources }: { applicationSources: any }) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Application Sources Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Application Sources Analysis</CardTitle>
            <CardDescription>Applications received by source</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={applicationSources}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" name="Applications" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Application Sources Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Application Sources Distribution</CardTitle>
            <CardDescription>Percentage breakdown by source</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={applicationSources}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ source, percentage }) => `${source} (${percentage}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="percentage"
                >
                  {applicationSources.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Sources Details */}
      <Card>
        <CardHeader>
          <CardTitle>Source Performance</CardTitle>
          <CardDescription>Detailed breakdown by application source</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {applicationSources.map((source: any) => (
            <div key={source.source} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{source.source}</span>
                <span className="text-muted-foreground">{source.count} ({source.percentage}%)</span>
              </div>
              <Progress value={source.percentage} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// Activity Tab Component with Recharts
function ActivityTab({ monthlyActivity }: { monthlyActivity: any }) {
  return (
    <div className="space-y-6">
      {/* Monthly Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Recruitment Activity Trends</CardTitle>
          <CardDescription>Monthly recruitment activity over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="jobs" stackId="1" stroke="#8884d8" fill="#8884d8" name="Jobs Posted" />
              <Area type="monotone" dataKey="applications" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Applications" />
              <Area type="monotone" dataKey="interviews" stackId="1" stroke="#ffc658" fill="#ffc658" name="Interviews" />
              <Area type="monotone" dataKey="offers" stackId="1" stroke="#ff7300" fill="#ff7300" name="Offers" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Activity Breakdown</CardTitle>
          <CardDescription>Detailed monthly recruitment activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyActivity.map((month: any) => (
              <div key={month.month} className="flex items-center justify-between">
                <div className="font-medium">{month.month}</div>
                <div className="flex gap-4 text-sm">
                  <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded">{month.jobs} jobs</span>
                  <span className="text-orange-600 bg-orange-50 px-2 py-1 rounded">{month.applications} applications</span>
                  <span className="text-purple-600 bg-purple-50 px-2 py-1 rounded">{month.interviews} interviews</span>
                  <span className="text-green-600 bg-green-50 px-2 py-1 rounded">{month.offers} offers</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
