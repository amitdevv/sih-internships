"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Users, Briefcase, TrendingUp, Clock } from "lucide-react";
import Link from "next/link";

export default function RecruiterDashboard() {
  // Mock data for recruiter dashboard
  const stats = {
    totalJobs: 12,
    activeJobs: 8,
    totalApplications: 156,
    interviewsScheduled: 23,
    offersSent: 5,
    pendingReviews: 18
  };

  const recentJobs = [
    {
      id: 1,
      title: "Software Developer Intern",
      company: "TechCorp Solutions",
      applications: 24,
      status: "active",
      postedDate: "2024-01-15"
    },
    {
      id: 2,
      title: "Data Analyst Intern",
      company: "DataViz Inc",
      applications: 18,
      status: "active",
      postedDate: "2024-01-12"
    },
    {
      id: 3,
      title: "UX Design Intern",
      company: "DesignStudio",
      applications: 12,
      status: "paused",
      postedDate: "2024-01-10"
    }
  ];

  const recentApplications = [
    {
      id: 1,
      studentName: "Priya Sharma",
      jobTitle: "Software Developer Intern",
      skills: ["React", "Node.js", "Python"],
      status: "pending",
      appliedDate: "2024-01-20"
    },
    {
      id: 2,
      studentName: "Raj Kumar",
      jobTitle: "Data Analyst Intern",
      skills: ["SQL", "Python", "Tableau"],
      status: "shortlisted",
      appliedDate: "2024-01-19"
    },
    {
      id: 3,
      studentName: "Anita Singh",
      jobTitle: "UX Design Intern",
      skills: ["Figma", "Adobe XD", "Prototyping"],
      status: "interviewed",
      appliedDate: "2024-01-18"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your job postings and track candidate applications
          </p>
        </div>
        <Button asChild>
          <Link href="/recruiter/jobs/new">
            <Plus className="mr-2 h-4 w-4" />
            Post New Job
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalJobs}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeJobs} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApplications}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingReviews} pending review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.interviewsScheduled}</div>
            <p className="text-xs text-muted-foreground">
              Scheduled this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offers Sent</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.offersSent}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Jobs and Applications */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Jobs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Job Postings</CardTitle>
            <CardDescription>
              Your latest job postings and their performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div key={job.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{job.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {job.company} • {job.applications} applications
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={job.status === "active" ? "default" : "secondary"}>
                      {job.status}
                    </Badge>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/recruiter/jobs/${job.id}`}>View</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/recruiter/jobs">View All Jobs</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
            <CardDescription>
              Latest candidate applications requiring review
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((application) => (
                <div key={application.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{application.studentName}</p>
                    <p className="text-xs text-muted-foreground">
                      {application.jobTitle}
                    </p>
                    <div className="flex gap-1">
                      {application.skills.slice(0, 2).map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={
                        application.status === "shortlisted" ? "default" :
                        application.status === "interviewed" ? "secondary" : "outline"
                      }
                    >
                      {application.status}
                    </Badge>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/recruiter/applications/${application.id}`}>Review</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/recruiter/applications">View All Applications</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
