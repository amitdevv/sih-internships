"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function MentorAnalyticsPage() {
  const stats = {
    totalReviews: 24,
    pendingReviews: 3,
    approvedApplications: 18,
    rejectedApplications: 3,
    averageReviewTime: "1.2 days",
    studentSatisfaction: 4.7
  };

  const reviewTrends = [
    { month: "Jan", reviews: 5, approved: 4, rejected: 1 },
    { month: "Feb", reviews: 8, approved: 6, rejected: 2 },
    { month: "Mar", reviews: 6, approved: 5, rejected: 1 },
    { month: "Apr", reviews: 5, approved: 3, rejected: 0 }
  ];

  const departmentBreakdown = [
    { department: "CSE", applications: 12, approved: 10, rate: 83 },
    { department: "ECE", applications: 8, approved: 6, rate: 75 },
    { department: "IT", applications: 4, approved: 2, rate: 50 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Mentor Analytics</h1>
        <p className="text-muted-foreground">Track your review performance and student guidance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <Badge variant="secondary">{stats.totalReviews}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReviews}</CardTitle>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Badge variant="destructive">{stats.pendingReviews}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingReviews}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
            <Badge variant="default">{Math.round((stats.approvedApplications / (stats.approvedApplications + stats.rejectedApplications)) * 100)}%</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((stats.approvedApplications / (stats.approvedApplications + stats.rejectedApplications)) * 100)}%</div>
            <p className="text-xs text-muted-foreground">Success rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Review Time</CardTitle>
            <Badge variant="outline">{stats.averageReviewTime}</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageReviewTime}</div>
            <p className="text-xs text-muted-foreground">Per application</p>
          </CardContent>
        </Card>
      </div>

      {/* Department Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
          <CardDescription>Review performance by department</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {departmentBreakdown.map((dept) => (
            <div key={dept.department} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{dept.department}</span>
                <span className="text-muted-foreground">{dept.approved}/{dept.applications} approved</span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Approval Rate</span>
                  <span>{dept.rate}%</span>
                </div>
                <Progress value={dept.rate} className="h-2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Review Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Review Trends</CardTitle>
          <CardDescription>Monthly review activity and outcomes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviewTrends.map((trend) => (
              <div key={trend.month} className="flex items-center justify-between">
                <div className="font-medium">{trend.month}</div>
                <div className="flex gap-4 text-sm">
                  <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded">{trend.reviews} reviews</span>
                  <span className="text-green-600 bg-green-50 px-2 py-1 rounded">{trend.approved} approved</span>
                  <span className="text-red-600 bg-red-50 px-2 py-1 rounded">{trend.rejected} rejected</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
