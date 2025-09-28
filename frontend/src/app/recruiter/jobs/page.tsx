"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function RecruiterJobsPage() {
  const jobs = [
    { id: 1, title: "Software Developer Intern", company: "TechCorp", status: "active", applications: 24 },
    { id: 2, title: "Data Analyst Intern", company: "DataViz Inc", status: "paused", applications: 12 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Jobs</h1>
          <p className="text-muted-foreground">Manage and track all your postings</p>
        </div>
        <Button asChild>
          <Link href="/recruiter/jobs/new">Post New Job</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Job Postings</CardTitle>
          <CardDescription>Recent postings and their activity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">{job.company}</div>
                <div className="font-medium">{job.title}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={job.status === "active" ? "default" : "secondary"}>{job.status}</Badge>
                <Badge variant="outline">{job.applications} apps</Badge>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/recruiter/jobs/${job.id}`}>View</Link>
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}


