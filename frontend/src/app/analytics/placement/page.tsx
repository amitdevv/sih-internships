"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function PlacementAnalyticsPage() {
  const stats = {
    totalOpportunities: 15,
    activeOpportunities: 12,
    totalApplications: 156,
    placedStudents: 8,
    placementRate: 5.1,
    averageStipend: "₹18,500"
  };

  const opportunityPerformance = [
    { title: "Software Developer Intern", company: "TechCorp", applications: 24, placements: 3, rate: 12.5 },
    { title: "Data Analyst Intern", company: "DataViz", applications: 18, placements: 2, rate: 11.1 },
    { title: "UX Design Intern", company: "DesignStudio", applications: 12, placements: 1, rate: 8.3 },
    { title: "Marketing Intern", company: "GrowthCo", applications: 8, placements: 2, rate: 25.0 }
  ];

  const departmentPlacements = [
    { department: "CSE", students: 45, placed: 5, rate: 11.1 },
    { department: "ECE", students: 32, placed: 2, rate: 6.3 },
    { department: "IT", students: 28, placed: 1, rate: 3.6 }
  ];

  const monthlyTrends = [
    { month: "Jan", opportunities: 3, applications: 25, placements: 1 },
    { month: "Feb", opportunities: 4, applications: 35, placements: 2 },
    { month: "Mar", opportunities: 5, applications: 48, placements: 3 },
    { month: "Apr", opportunities: 3, applications: 28, placements: 2 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Placement Analytics</h1>
        <p className="text-muted-foreground">Track placement performance and student outcomes</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Opportunities</CardTitle>
            <Badge variant="secondary">{stats.totalOpportunities}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOpportunities}</div>
            <p className="text-xs text-muted-foreground">{stats.activeOpportunities} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <Badge variant="secondary">{stats.totalApplications}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApplications}</div>
            <p className="text-xs text-muted-foreground">Received</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Placed Students</CardTitle>
            <Badge variant="default">{stats.placedStudents}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.placedStudents}</div>
            <p className="text-xs text-muted-foreground">{stats.placementRate}% rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Stipend</CardTitle>
            <Badge variant="outline">{stats.averageStipend}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageStipend}</div>
            <p className="text-xs text-muted-foreground">Per month</p>
          </CardContent>
        </Card>
      </div>

      {/* Opportunity Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Opportunity Performance</CardTitle>
          <CardDescription>How each opportunity is performing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {opportunityPerformance.map((opp) => (
            <div key={opp.title} className="space-y-2">
              <div className="flex justify-between text-sm">
                <div>
                  <span className="font-medium">{opp.title}</span>
                  <span className="text-muted-foreground ml-2">• {opp.company}</span>
                </div>
                <span className="text-muted-foreground">{opp.placements}/{opp.applications} placed</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Placement Rate</span>
                  <span>{opp.rate}%</span>
                </div>
                <Progress value={opp.rate} className="h-2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Department Placements */}
      <Card>
        <CardHeader>
          <CardTitle>Department Placement Rates</CardTitle>
          <CardDescription>Placement performance by department</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {departmentPlacements.map((dept) => (
            <div key={dept.department} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{dept.department}</span>
                <span className="text-muted-foreground">{dept.placed}/{dept.students} placed</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Placement Rate</span>
                  <span>{dept.rate}%</span>
                </div>
                <Progress value={dept.rate} className="h-2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Monthly Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Trends</CardTitle>
          <CardDescription>Placement activity over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyTrends.map((trend) => (
              <div key={trend.month} className="flex items-center justify-between">
                <div className="font-medium">{trend.month}</div>
                <div className="flex gap-4 text-sm">
                  <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded">{trend.opportunities} opportunities</span>
                  <span className="text-orange-600 bg-orange-50 px-2 py-1 rounded">{trend.applications} applications</span>
                  <span className="text-green-600 bg-green-50 px-2 py-1 rounded">{trend.placements} placements</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
