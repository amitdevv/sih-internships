"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { FormInput } from "@/components/ui/form-field";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useFormValidation } from "@/hooks/use-form-validation";
import { z } from "zod";

const skillsSchema = z.object({
  skills: z.array(z.string())
    .min(1, "At least one skill is required")
    .max(20, "Maximum 20 skills allowed")
});

const MOCK_SKILLS = ["React", "Next.js", "Node.js", "PostgreSQL", "Tailwind", "Python", "Java"];

export default function SkillsOnboardPage() {
  const { form, handleSubmit, errors, isValid } = useFormValidation<{ skills: string[] }>({
    schema: skillsSchema,
    defaultValues: {
      skills: []
    },
    onSuccess: async (data) => {
      console.log("Skills data:", data);
    }
  });

  const [query, setQuery] = React.useState("");
  const skills = form.watch("skills") || [];

  const filtered = MOCK_SKILLS.filter((s) => s.toLowerCase().includes(query.toLowerCase()));

  const addSkill = (skill: string) => {
    if (!skills.includes(skill) && skills.length < 20) {
      form.setValue("skills", [...skills, skill]);
    }
  };

  const removeSkill = (skill: string) => {
    form.setValue("skills", skills.filter(s => s !== skill));
  };

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Onboarding · Skills</h1>
      <form onSubmit={handleSubmit}>
        <Card className="p-4">
          <div className="grid gap-3">
            <FormInput
              label="Add skills"
              placeholder="Type to search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              error={errors.skills?.message}
            />
            <div className="flex flex-wrap gap-2">
              {filtered.map((s) => (
                <button
                  key={s}
                  type="button"
                  className="rounded-md border border-border bg-[var(--card)] px-2 py-1 text-xs hover:bg-accent"
                  onClick={() => addSkill(s)}
                >
                  + {s}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span key={s} className="flex items-center gap-1 rounded-md border border-border bg-[var(--card)] px-2 py-1 text-xs">
                  {s}
                  <button
                    type="button"
                    onClick={() => removeSkill(s)}
                    className="ml-1 text-muted-foreground hover:text-destructive"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-between">
            <Link href="/profile" className="text-sm">
              <Button variant="outline" size="sm" type="button">Back</Button>
            </Link>
            <div className="flex gap-2">
              <Link href="/" className="text-sm">
                <Button variant="outline" size="sm" type="button">Skip</Button>
              </Link>
              {isValid ? (
                <Link href="/preferences" className="text-sm font-medium">
                  <Button variant="default" size="sm" type="button">Next</Button>
                </Link>
              ) : (
                <Button variant="default" size="sm" disabled>Add at least 1 skill</Button>
              )}
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
}


