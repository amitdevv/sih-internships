"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function NewOpportunityPage() {
  const [title, setTitle] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [mode, setMode] = React.useState("remote");
  const [dept, setDept] = React.useState("CSE");
  const [minYear, setMinYear] = React.useState("3");
  const [minCgpa, setMinCgpa] = React.useState("7.0");
  const [description, setDescription] = React.useState("");

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Post Opportunity</h1>
      <Card className="p-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="text-sm">Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Frontend Intern" />
          </div>
          <div>
            <label className="text-sm">Company</label>
            <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Corp" />
          </div>
          <div>
            <label className="text-sm">Mode</label>
            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="onsite">On-site</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm">Department</label>
            <Select value={dept} onValueChange={setDept}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CSE">CSE</SelectItem>
                <SelectItem value="ECE">ECE</SelectItem>
                <SelectItem value="ME">ME</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm">Min Year</label>
              <Input value={minYear} onChange={(e) => setMinYear(e.target.value)} placeholder="3" />
            </div>
            <div>
              <label className="text-sm">Min CGPA</label>
              <Input value={minCgpa} onChange={(e) => setMinCgpa(e.target.value)} placeholder="7.0" />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm">Description</label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Role description, required skills, timeline..." rows={6} />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="default" onClick={() => toast.success("Opportunity posted (mock)")}>Post Opportunity</Button>
        </div>
      </Card>
    </div>
  );
}


