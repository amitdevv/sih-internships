"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/lib/state/ui";
import { useFormValidation } from "@/hooks/use-form-validation";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  role: z.enum(["student", "mentor", "placement", "recruiter"])
    .refine((val) => val !== undefined, {
      message: "Please select a role"
    })
});

export default function SignInPage() {
  const router = useRouter();
  const setGlobalRole = useUIStore((s) => s.setRole);

  const { form, handleSubmit, errors, isValid } = useFormValidation<{
    email: string;
    role: "student" | "mentor" | "placement" | "recruiter";
  }>({
    schema: signInSchema,
    defaultValues: {
      email: "",
      role: "student"
    },
    successMessage: "Signed in successfully!",
    onSuccess: async (data) => {
      setGlobalRole(data.role);
      const redirect = data.role === "mentor" ? "/mentor/reviews" : 
                      data.role === "placement" ? "/placement/applicants" : 
                      data.role === "recruiter" ? "/recruiter" : "/";
      router.push(redirect);
    }
  });

  return (
    <div className="mx-auto max-w-md space-y-4 p-4">
      <h1 className="text-lg font-semibold">Sign in</h1>
      <form onSubmit={handleSubmit}>
        <Card className="p-4">
          <div className="space-y-3">
            <div>
              <label className="text-sm">College email</label>
              <Input 
                placeholder="name@college.edu" 
                type="email"
                {...form.register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm">Role</label>
              <Select value={form.watch("role")} onValueChange={(value) => form.setValue("role", value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="mentor">Mentor</SelectItem>
                  <SelectItem value="placement">Placement</SelectItem>
                  <SelectItem value="recruiter">Recruiter</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-sm text-destructive mt-1">{errors.role.message}</p>
              )}
            </div>
            <div className="pt-2">
              <Button variant="default" type="submit" disabled={!isValid}>
                Continue
              </Button>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
}


