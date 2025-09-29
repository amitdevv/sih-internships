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

export default function MentorAnalyticsPage() {
  const [activeTab, setActiveTab] = React.useState("overview");

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

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "performance", label: "Performance" },
    { id: "trends", label: "Trends" },
    { id: "students", label: "Students" }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab stats={stats} />;
      case "performance":
        return <PerformanceTab departmentBreakdown={departmentBreakdown} />;
      case "trends":
        return <TrendsTab reviewTrends={reviewTrends} />;
      case "students":
        return <StudentsTab />;
      default:
        return <OverviewTab stats={stats} />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Mentor Analytics</h1>
        <p className="text-muted-foreground">Track your review performance and student guidance</p>
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
          <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
          <Badge variant="secondary">{stats.totalReviews}</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{stats.totalReviews}</div>
          <p className="text-xs text-muted-foreground">Completed</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
          <Badge variant="destructive">{stats.pendingReviews}</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{stats.pendingReviews}</div>
          <p className="text-xs text-muted-foreground">Awaiting review</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
          <Badge variant="default">{Math.round((stats.approvedApplications / (stats.approvedApplications + stats.rejectedApplications)) * 100)}%</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{Math.round((stats.approvedApplications / (stats.approvedApplications + stats.rejectedApplications)) * 100)}%</div>
          <p className="text-xs text-muted-foreground">Success rate</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Review Time</CardTitle>
          <Badge variant="outline">{stats.averageReviewTime}</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{stats.averageReviewTime}</div>
          <p className="text-xs text-muted-foreground">Per application</p>
        </CardContent>
      </Card>
    </div>
  );
}

// Performance Tab Component with Recharts
function PerformanceTab({ departmentBreakdown }: { departmentBreakdown: any }) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
  
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Department Performance Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Department Performance Analysis</CardTitle>
            <CardDescription>Applications vs approvals by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentBreakdown}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="applications" fill="#8884d8" name="Applications" />
                <Bar dataKey="approved" fill="#82ca9d" name="Approved" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Approval Rate Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Approval Rate Distribution</CardTitle>
            <CardDescription>Approval rates by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ department, rate }) => `${department} (${rate}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="rate"
                >
                  {departmentBreakdown.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Details */}
      <Card>
        <CardHeader>
          <CardTitle>Department Performance Details</CardTitle>
          <CardDescription>Detailed breakdown by department</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {departmentBreakdown.map((dept: any) => (
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
                <Progress value={dept.rate} className="h-1" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// Trends Tab Component with Recharts
function TrendsTab({ reviewTrends }: { reviewTrends: any }) {
  return (
    <div className="space-y-6">
      {/* Review Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Review Trends</CardTitle>
          <CardDescription>Monthly review activity and outcomes</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={reviewTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="reviews" stackId="1" stroke="#8884d8" fill="#8884d8" name="Reviews" />
              <Area type="monotone" dataKey="approved" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Approved" />
              <Area type="monotone" dataKey="rejected" stackId="1" stroke="#ff7300" fill="#ff7300" name="Rejected" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Breakdown</CardTitle>
          <CardDescription>Detailed monthly review activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviewTrends.map((trend: any) => (
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

// Students Tab Component
function StudentsTab() {
  const studentData = [
    { name: "Anita Verma", department: "CSE", applications: 3, approved: 2, status: "Active" },
    { name: "Rohit Singh", department: "IT", applications: 2, approved: 1, status: "Active" },
    { name: "Priya Sharma", department: "CSE", applications: 4, approved: 3, status: "Graduated" },
    { name: "Raj Kumar", department: "ECE", applications: 1, approved: 1, status: "Active" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Student Performance</CardTitle>
          <CardDescription>Track individual student progress and outcomes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {studentData.map((student) => (
              <div key={student.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">{student.name}</div>
                  <div className="text-sm text-muted-foreground">{student.department}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold">{student.applications}</div>
                    <div className="text-xs text-muted-foreground">Applications</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">{student.approved}</div>
                    <div className="text-xs text-muted-foreground">Approved</div>
                  </div>
                  <Badge variant={student.status === "Active" ? "default" : "secondary"}>
                    {student.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
