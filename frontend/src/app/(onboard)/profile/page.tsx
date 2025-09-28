"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { FormInput, FormTextarea } from "@/components/ui/form-field";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useFormValidation } from "@/hooks/use-form-validation";
import { studentProfileSchema, type StudentProfileFormData } from "@/lib/validations/schemas";

export default function ProfileOnboardPage() {
  const { form, handleSubmit, errors, isValid } = useFormValidation<StudentProfileFormData>({
    schema: studentProfileSchema,
    defaultValues: {
      personalInfo: {
        name: "",
        email: "",
        phone: "",
        address: "",
        dateOfBirth: "",
        gender: undefined,
        linkedin: "",
        github: ""
      },
      academicInfo: {
        university: "",
        degree: "",
        department: "",
        cgpa: "",
        graduationYear: "",
        currentYear: "First Year"
      },
      skills: [],
      preferences: {
        jobTypes: [],
        locations: [],
        expectedStipend: "",
        availableFrom: "",
        workMode: []
      },
      documents: {
        resume: "",
        portfolio: "",
        coverLetter: ""
      }
    },
    onSuccess: async (data) => {
      console.log("Profile data:", data);
    }
  });

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Onboarding · Profile</h1>
      <form onSubmit={handleSubmit}>
        <Card className="p-4">
          <div className="grid gap-3 md:grid-cols-2">
            <FormInput
              label="Full name"
              placeholder="John Doe"
              error={errors.personalInfo?.name?.message}
              required
              {...form.register("personalInfo.name")}
            />
            <FormInput
              label="Email"
              placeholder="john@college.edu"
              type="email"
              error={errors.personalInfo?.email?.message}
              required
              {...form.register("personalInfo.email")}
            />
            <FormInput
              label="Phone"
              placeholder="+91 9876543210"
              error={errors.personalInfo?.phone?.message}
              {...form.register("personalInfo.phone")}
            />
            <FormInput
              label="University"
              placeholder="Your University"
              error={errors.academicInfo?.university?.message}
              required
              {...form.register("academicInfo.university")}
            />
            <FormInput
              label="Department"
              placeholder="CSE"
              error={errors.academicInfo?.department?.message}
              required
              {...form.register("academicInfo.department")}
            />
            <div className="grid grid-cols-2 gap-3">
              <FormInput
                label="Current Year"
                placeholder="3"
                error={errors.academicInfo?.currentYear?.message}
                {...form.register("academicInfo.currentYear")}
              />
              <FormInput
                label="CGPA"
                placeholder="8.2"
                error={errors.academicInfo?.cgpa?.message}
                required
                {...form.register("academicInfo.cgpa")}
              />
            </div>
            <div className="md:col-span-2">
              <FormTextarea
                label="About"
                placeholder="Brief summary about yourself"
                rows={4}
                error={errors.personalInfo?.address?.message}
                {...form.register("personalInfo.address")}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Link href="/" className="text-sm">
              <Button variant="outline" size="sm" type="button">Skip</Button>
            </Link>
            {isValid ? (
              <Link href="/skills" className="text-sm font-medium">
                <Button variant="default" size="sm" type="button">Next</Button>
              </Link>
            ) : (
              <Button variant="default" size="sm" disabled aria-disabled>
                Fill required fields
              </Button>
            )}
          </div>
        </Card>
      </form>
    </div>
  );
}


