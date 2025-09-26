"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/lib/state/ui";

export default function SignInPage() {
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState<"student" | "mentor" | "placement" | "admin">("student");
  const router = useRouter();
  const setGlobalRole = useUIStore((s) => s.setRole);

  const onSubmit = () => {
    setGlobalRole(role);
    const redirect = role === "mentor" ? "/mentor/reviews" : role === "placement" || role === "admin" ? "/placement/applicants" : "/";
    router.push(redirect);
  };

  return (
    <div className="mx-auto max-w-md space-y-4 p-4">
      <h1 className="text-lg font-semibold">Sign in</h1>
      <Card className="p-4">
        <div className="space-y-3">
          <div>
            <label className="text-sm">College email</label>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@college.edu" />
          </div>
          <div>
            <label className="text-sm">Role</label>
            <Select value={role} onValueChange={(v) => setRole(v as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="mentor">Mentor</SelectItem>
                <SelectItem value="placement">Placement</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="pt-2">
            <Button variant="default" onClick={onSubmit} disabled={!email.includes("@")}>Continue</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}


