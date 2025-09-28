"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function RecruiterAnalyticsPage() {
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Recruiter Analytics</h1>
        <p className="text-muted-foreground">Track your recruitment performance and hiring metrics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jobs Posted</CardTitle>
            <Badge variant="secondary">{stats.totalJobsPosted}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalJobsPosted}</div>
            <p className="text-xs text-muted-foreground">{stats.activeJobs} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Badge variant="secondary">{stats.totalApplications}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApplications}</div>
            <p className="text-xs text-muted-foreground">Received</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <Badge variant="default">{stats.interviewsConducted}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.interviewsConducted}</div>
            <p className="text-xs text-muted-foreground">Conducted</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offers Extended</CardTitle>
            <Badge variant="outline">{stats.offersExtended}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.offersExtended}</div>
            <p className="text-xs text-muted-foreground">Success rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Job Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Job Performance</CardTitle>
          <CardDescription>Performance metrics for each job posting</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {jobPerformance.map((job) => (
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

      {/* Application Sources */}
      <Card>
        <CardHeader>
          <CardTitle>Application Sources</CardTitle>
          <CardDescription>Where your applications are coming from</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {applicationSources.map((source) => (
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

      {/* Monthly Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Activity</CardTitle>
          <CardDescription>Recruitment activity over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyActivity.map((month) => (
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
