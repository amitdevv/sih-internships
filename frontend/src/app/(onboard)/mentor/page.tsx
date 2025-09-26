"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Link from "next/link";

const MOCK_MENTORS = [
  { id: "m1", name: "Dr. Sharma" },
  { id: "m2", name: "Prof. Rao" },
  { id: "m3", name: "Dr. Iyer" },
];

export default function MentorOnboardPage() {
  const [mentorId, setMentorId] = React.useState<string | undefined>();

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Onboarding · Mentor</h1>
      <Card className="p-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="text-sm">Choose mentor</label>
            <Select value={mentorId} onValueChange={setMentorId}>
              <SelectTrigger>
                <SelectValue placeholder="Select mentor" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_MENTORS.map((m) => (
                  <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <Link href="/preferences" className="text-sm">Back</Link>
          <div className="flex gap-2">
            <Link href="/" className="text-sm">Skip</Link>
            <Link href="/" className="text-sm font-medium">Finish</Link>
          </div>
        </div>
      </Card>
    </div>
  );
}


