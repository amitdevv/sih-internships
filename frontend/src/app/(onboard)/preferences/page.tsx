"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PreferencesOnboardPage() {
  const [mode, setMode] = React.useState("remote");
  const [stipend, setStipend] = React.useState("15000");
  const [location, setLocation] = React.useState("Any");
  const canNext = Boolean(mode && stipend && location);

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Onboarding · Preferences</h1>
      <Card className="p-4">
        <div className="grid gap-3 md:grid-cols-3">
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
            <label className="text-sm">Min stipend (₹)</label>
            <Select value={stipend} onValueChange={setStipend}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10000">10,000</SelectItem>
                <SelectItem value="15000">15,000</SelectItem>
                <SelectItem value="20000">20,000</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm">Location</label>
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Any">Any</SelectItem>
                <SelectItem value="Delhi">Delhi</SelectItem>
                <SelectItem value="Bengaluru">Bengaluru</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <Link href="/skills" className="text-sm">
            <Button variant="outline" size="sm">Back</Button>
          </Link>
          <div className="flex gap-2">
            <Link href="/" className="text-sm">
              <Button variant="outline" size="sm">Skip</Button>
            </Link>
            {canNext ? (
              <Link href="/mentor" className="text-sm font-medium">
                <Button variant="default" size="sm">Next</Button>
              </Link>
            ) : (
              <Button variant="default" size="sm" disabled>Next</Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}


