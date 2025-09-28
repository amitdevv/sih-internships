"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { FormSelect } from "@/components/ui/form-field";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useFormValidation } from "@/hooks/use-form-validation";
import { z } from "zod";

const preferencesSchema = z.object({
  workMode: z.array(z.enum(["Remote", "Hybrid", "On-site"]))
    .min(1, "Please select at least one work mode"),
  expectedStipend: z.string()
    .min(1, "Please specify expected stipend"),
  locations: z.array(z.string())
    .min(1, "Please select at least one location")
});

export default function PreferencesOnboardPage() {
  const { form, handleSubmit, errors, isValid } = useFormValidation<{
    workMode: string[];
    expectedStipend: string;
    locations: string[];
  }>({
    schema: preferencesSchema,
    defaultValues: {
      workMode: ["Remote"],
      expectedStipend: "15000",
      locations: ["Any"]
    },
    onSuccess: async (data) => {
      console.log("Preferences data:", data);
    }
  });

  const workMode = form.watch("workMode")?.[0] || "Remote";
  const expectedStipend = form.watch("expectedStipend") || "15000";
  const locations = form.watch("locations")?.[0] || "Any";

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Onboarding · Preferences</h1>
      <form onSubmit={handleSubmit}>
        <Card className="p-4">
          <div className="grid gap-3 md:grid-cols-3">
            <FormSelect
              label="Mode"
              placeholder="Select work mode"
              value={workMode}
              onValueChange={(value) => form.setValue("workMode", [value as "Remote" | "Hybrid" | "On-site"])}
              error={errors.workMode?.message}
              required
            >
              <option value="Remote">Remote</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
            </FormSelect>
            <FormSelect
              label="Min stipend (₹)"
              placeholder="Select stipend"
              value={expectedStipend}
              onValueChange={(value) => form.setValue("expectedStipend", value)}
              error={errors.expectedStipend?.message}
              required
            >
              <option value="10000">10,000</option>
              <option value="15000">15,000</option>
              <option value="20000">20,000</option>
            </FormSelect>
            <FormSelect
              label="Location"
              placeholder="Select location"
              value={locations}
              onValueChange={(value) => form.setValue("locations", [value])}
              error={errors.locations?.message}
              required
            >
              <option value="Any">Any</option>
              <option value="Delhi">Delhi</option>
              <option value="Bengaluru">Bengaluru</option>
            </FormSelect>
          </div>
          <div className="mt-4 flex justify-between">
            <Link href="/skills" className="text-sm">
              <Button variant="outline" size="sm" type="button">Back</Button>
            </Link>
            <div className="flex gap-2">
              <Link href="/" className="text-sm">
                <Button variant="outline" size="sm" type="button">Skip</Button>
              </Link>
              {isValid ? (
                <Link href="/mentor" className="text-sm font-medium">
                  <Button variant="default" size="sm" type="button">Next</Button>
                </Link>
              ) : (
                <Button variant="default" size="sm" disabled>Next</Button>
              )}
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
}


