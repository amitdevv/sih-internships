"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const MOCK_SKILLS = ["React", "Next.js", "Node.js", "PostgreSQL", "Tailwind", "Python", "Java"];

export default function SkillsOnboardPage() {
  const [skills, setSkills] = React.useState<string[]>([]);
  const [query, setQuery] = React.useState("");
  const canNext = skills.length >= 1;

  const filtered = MOCK_SKILLS.filter((s) => s.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Onboarding · Skills</h1>
      <Card className="p-4">
        <div className="grid gap-3">
          <div>
            <label className="text-sm">Add skills</label>
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Type to search..." />
          </div>
          <div className="flex flex-wrap gap-2">
            {filtered.map((s) => (
              <button
                key={s}
                className="rounded-md border border-border bg-[var(--card)] px-2 py-1 text-xs"
                onClick={() => setSkills((prev) => (prev.includes(s) ? prev : [...prev, s]))}
              >
                + {s}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="rounded-md border border-border bg-[var(--card)] px-2 py-1 text-xs">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <Link href="/profile" className="text-sm">
            <Button variant="outline" size="sm">Back</Button>
          </Link>
          <div className="flex gap-2">
            <Link href="/" className="text-sm">
              <Button variant="outline" size="sm">Skip</Button>
            </Link>
            {canNext ? (
              <Link href="/preferences" className="text-sm font-medium">
                <Button variant="default" size="sm">Next</Button>
              </Link>
            ) : (
              <Button variant="default" size="sm" disabled>Add at least 1 skill</Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}


