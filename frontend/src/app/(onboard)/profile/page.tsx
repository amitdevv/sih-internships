"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";

export default function ProfileOnboardPage() {
  const [fullName, setFullName] = React.useState("");
  const [rollNo, setRollNo] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [year, setYear] = React.useState("");
  const [cgpa, setCgpa] = React.useState("");
  const [about, setAbout] = React.useState("");

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Onboarding · Profile</h1>
      <Card className="p-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="text-sm">Full name</label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="John Doe" />
          </div>
          <div>
            <label className="text-sm">Roll no.</label>
            <Input value={rollNo} onChange={(e) => setRollNo(e.target.value)} placeholder="20XXCS001" />
          </div>
          <div>
            <label className="text-sm">Department</label>
            <Input value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="CSE" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm">Year</label>
              <Input value={year} onChange={(e) => setYear(e.target.value)} placeholder="3" />
            </div>
            <div>
              <label className="text-sm">CGPA</label>
              <Input value={cgpa} onChange={(e) => setCgpa(e.target.value)} placeholder="8.2" />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm">About</label>
            <Textarea value={about} onChange={(e) => setAbout(e.target.value)} placeholder="Brief summary" rows={4} />
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Link href="/" className="text-sm">Skip</Link>
          <Link href="/onboard/skills" className="text-sm font-medium">Next</Link>
        </div>
      </Card>
    </div>
  );
}


