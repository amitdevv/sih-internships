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

export default function StudentAnalyticsPage() {
  const [activeTab, setActiveTab] = React.useState("overview");

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

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "skills", label: "Skills" },
    { id: "trends", label: "Trends" },
    { id: "performance", label: "Performance" }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab stats={stats} />;
      case "skills":
        return <SkillsTab skillDemand={skillDemand} />;
      case "trends":
        return <TrendsTab applicationTrends={applicationTrends} />;
      case "performance":
        return <PerformanceTab />;
      default:
        return <OverviewTab stats={stats} />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Student Analytics</h1>
        <p className="text-muted-foreground">Track your job search progress and performance</p>
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
          <CardTitle className="text-sm font-medium">Applications</CardTitle>
          <Badge variant="secondary">{stats.applicationsSubmitted}</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{stats.applicationsSubmitted}</div>
          <p className="text-xs text-muted-foreground">Total submitted</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Interviews</CardTitle>
          <Badge variant="secondary">{stats.interviewsScheduled}</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{stats.interviewsScheduled}</div>
          <p className="text-xs text-muted-foreground">Scheduled</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Offers</CardTitle>
          <Badge variant="default">{stats.offersReceived}</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{stats.offersReceived}</div>
          <p className="text-xs text-muted-foreground">Received</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
          <Badge variant="outline">{stats.profileViews}</Badge>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-semibold">{stats.profileViews}</div>
          <p className="text-xs text-muted-foreground">This month</p>
        </CardContent>
      </Card>
    </div>
  );
}

// Skills Tab Component with Recharts
function SkillsTab({ skillDemand }: { skillDemand: any }) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Skills Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Skills Demand Analysis</CardTitle>
            <CardDescription>Market demand vs your skill level</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillDemand}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="skill" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="demand" fill="#8884d8" name="Market Demand" />
                <Bar dataKey="match" fill="#82ca9d" name="Your Match" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Skills Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Skills Distribution</CardTitle>
            <CardDescription>Your skill proficiency levels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={skillDemand}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ skill, match }) => `${skill} (${match}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="match"
                >
                  {skillDemand.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Skills Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Skills Progress</CardTitle>
          <CardDescription>Detailed breakdown of your skills</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {skillDemand.map((item: any) => (
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
                <Progress value={item.demand} className="h-1" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Your Match</span>
                  <span>{item.match}%</span>
                </div>
                <Progress value={item.match} className="h-1" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// Trends Tab Component with Recharts
function TrendsTab({ applicationTrends }: { applicationTrends: any }) {
  return (
    <div className="space-y-6">
      {/* Application Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Application Trends</CardTitle>
          <CardDescription>Your job search activity over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={applicationTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="applications" stackId="1" stroke="#8884d8" fill="#8884d8" name="Applications" />
              <Area type="monotone" dataKey="interviews" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Interviews" />
              <Area type="monotone" dataKey="offers" stackId="1" stroke="#ffc658" fill="#ffc658" name="Offers" />
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
            {applicationTrends.map((trend: any) => (
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

// Performance Tab Component
function PerformanceTab() {
  const performanceData = [
    { metric: "Application Success Rate", value: 75, target: 80 },
    { metric: "Interview Conversion", value: 60, target: 70 },
    { metric: "Profile Completeness", value: 85, target: 90 },
    { metric: "Response Time", value: 2.5, target: 2.0, unit: "days" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        {performanceData.map((item) => (
          <Card key={item.metric}>
            <CardHeader>
              <CardTitle className="text-lg">{item.metric}</CardTitle>
              <CardDescription>Target: {item.target}{item.unit || '%'}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current</span>
                  <span className="font-medium">{item.value}{item.unit || '%'}</span>
                </div>
                <Progress 
                  value={(item.value / item.target) * 100} 
                  className="h-1"
                />
                <div className="text-xs text-muted-foreground">
                  {item.value >= item.target ? '✓ Target achieved' : `${item.target - item.value}${item.unit || '%'} to reach target`}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
