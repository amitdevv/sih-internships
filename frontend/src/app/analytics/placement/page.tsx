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

export default function PlacementAnalyticsPage() {
  const [activeTab, setActiveTab] = React.useState("overview");

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

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "opportunities", label: "Opportunities" },
    { id: "departments", label: "Departments" },
    { id: "trends", label: "Trends" }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab stats={stats} />;
      case "opportunities":
        return <OpportunitiesTab opportunityPerformance={opportunityPerformance} />;
      case "departments":
        return <DepartmentsTab departmentPlacements={departmentPlacements} />;
      case "trends":
        return <TrendsTab monthlyTrends={monthlyTrends} />;
      default:
        return <OverviewTab stats={stats} />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Placement Analytics</h1>
        <p className="text-muted-foreground">Track placement performance and student outcomes</p>
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
  );
}

// Opportunities Tab Component with Recharts
function OpportunitiesTab({ opportunityPerformance }: { opportunityPerformance: any }) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Opportunities Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Opportunity Performance</CardTitle>
            <CardDescription>Applications vs placements by opportunity</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={opportunityPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="applications" fill="#8884d8" name="Applications" />
                <Bar dataKey="placements" fill="#82ca9d" name="Placements" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Placement Rate Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Placement Success Rate</CardTitle>
            <CardDescription>Success rates by opportunity</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={opportunityPerformance}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ title, rate }: any) => `${title.split(' ')[0]} (${rate}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="rate"
                >
                  {opportunityPerformance.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Opportunity Details */}
      <Card>
        <CardHeader>
          <CardTitle>Opportunity Details</CardTitle>
          <CardDescription>Detailed performance breakdown</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {opportunityPerformance.map((opp: any) => (
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
    </div>
  );
}

// Departments Tab Component with Recharts
function DepartmentsTab({ departmentPlacements }: { departmentPlacements: any }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Department Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Department Placement Analysis</CardTitle>
            <CardDescription>Students vs placements by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentPlacements}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" fill="#8884d8" name="Total Students" />
                <Bar dataKey="placed" fill="#82ca9d" name="Placed Students" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Department Placement Rate */}
        <Card>
          <CardHeader>
            <CardTitle>Department Placement Rates</CardTitle>
            <CardDescription>Placement success rates by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={departmentPlacements}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="department" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="rate" fill="#ffc658" name="Placement Rate %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Department Details */}
      <Card>
        <CardHeader>
          <CardTitle>Department Performance</CardTitle>
          <CardDescription>Detailed department breakdown</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {departmentPlacements.map((dept: any) => (
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
    </div>
  );
}

// Trends Tab Component with Recharts
function TrendsTab({ monthlyTrends }: { monthlyTrends: any }) {
  return (
    <div className="space-y-6">
      {/* Monthly Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Placement Trends</CardTitle>
          <CardDescription>Monthly placement activity over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="opportunities" stackId="1" stroke="#8884d8" fill="#8884d8" name="Opportunities" />
              <Area type="monotone" dataKey="applications" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Applications" />
              <Area type="monotone" dataKey="placements" stackId="1" stroke="#ffc658" fill="#ffc658" name="Placements" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Monthly Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Breakdown</CardTitle>
          <CardDescription>Detailed monthly activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyTrends.map((trend: any) => (
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
