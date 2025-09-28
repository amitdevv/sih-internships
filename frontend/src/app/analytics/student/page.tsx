"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function StudentAnalyticsPage() {
  const stats = {
    applicationsSubmitted: 12,
    interviewsScheduled: 3,
    offersReceived: 1,
    profileViews: 45,
    skillsMatched: 8,
    averageResponseTime: "2.5 days"
  };

  const skillDemand = [
    { skill: "React", demand: 85, match: 90 },
    { skill: "Node.js", demand: 78, match: 85 },
    { skill: "Python", demand: 92, match: 70 },
    { skill: "TypeScript", demand: 88, match: 95 },
    { skill: "MongoDB", demand: 65, match: 60 }
  ];

  const applicationTrends = [
    { month: "Jan", applications: 2, interviews: 0, offers: 0 },
    { month: "Feb", applications: 4, interviews: 1, offers: 0 },
    { month: "Mar", applications: 3, interviews: 2, offers: 1 },
    { month: "Apr", applications: 3, interviews: 0, offers: 0 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Student Analytics</h1>
        <p className="text-muted-foreground">Track your job search progress and performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Badge variant="secondary">{stats.applicationsSubmitted}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.applicationsSubmitted}</div>
            <p className="text-xs text-muted-foreground">Total submitted</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <Badge variant="secondary">{stats.interviewsScheduled}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.interviewsScheduled}</div>
            <p className="text-xs text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offers</CardTitle>
            <Badge variant="default">{stats.offersReceived}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.offersReceived}</div>
            <p className="text-xs text-muted-foreground">Received</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <Badge variant="outline">{stats.profileViews}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.profileViews}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Skills Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Skills Demand vs Your Match</CardTitle>
          <CardDescription>How your skills align with market demand</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {skillDemand.map((item) => (
            <div key={item.skill} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{item.skill}</span>
                <span className="text-muted-foreground">{item.match}% match</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Market Demand</span>
                  <span>{item.demand}%</span>
                </div>
                <Progress value={item.demand} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Your Match</span>
                  <span>{item.match}%</span>
                </div>
                <Progress value={item.match} className="h-2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Application Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Application Trends</CardTitle>
          <CardDescription>Your job search activity over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {applicationTrends.map((trend) => (
              <div key={trend.month} className="flex items-center justify-between">
                <div className="font-medium">{trend.month}</div>
                <div className="flex gap-4 text-sm">
                  <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded">{trend.applications} applications</span>
                  <span className="text-orange-600 bg-orange-50 px-2 py-1 rounded">{trend.interviews} interviews</span>
                  <span className="text-green-600 bg-green-50 px-2 py-1 rounded">{trend.offers} offers</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
