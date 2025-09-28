"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormInput, FormTextarea, FormSelect, FormSkillsInput } from "@/components/ui/form-field";
import { SelectItem } from "@/components/ui/select";
import { jobPostingSchema, type JobPostingFormData } from "@/lib/validations/schemas";
import { useFormValidation } from "@/hooks/use-form-validation";
import { useRouter } from "next/navigation";

const skills = [
  "React", "Node.js", "Python", "Java", "JavaScript", "TypeScript", "SQL", "MongoDB",
  "AWS", "Docker", "Kubernetes", "Git", "Figma", "Adobe XD", "Tableau", "Power BI",
  "Machine Learning", "Data Science", "DevOps", "UI/UX Design", "Frontend Development",
  "Backend Development", "Full Stack Development", "Mobile Development", "iOS", "Android"
];

const departments = [
  "Computer Science",
  "Information Technology", 
  "Electronics & Communication",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Chemical Engineering",
  "Aerospace Engineering",
  "Biotechnology",
  "Business Administration"
];

export default function NewJobPage() {
  const router = useRouter();
  
  const { form, handleSubmit, isSubmitting, errors } = useFormValidation<JobPostingFormData>({
    schema: jobPostingSchema,
    defaultValues: {
      jobType: "internship",
      status: "active",
      skills: []
    },
    onSuccess: async (data) => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Job posting data:", data);
    },
    redirectOnSuccess: "/recruiter",
    successMessage: "Job posted successfully!"
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Post New Job</h1>
        <p className="text-muted-foreground">
          Create a new internship or job opportunity for students
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Provide essential details about the position
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormInput
                label="Job Title"
                placeholder="e.g., Software Developer Intern"
                error={errors.title?.message}
                required
                {...form.register("title")}
              />

              <FormInput
                label="Company Name"
                placeholder="e.g., TechCorp Solutions"
                error={errors.company?.message}
                required
                {...form.register("company")}
              />
            </div>

            <FormTextarea
              label="Job Description"
              placeholder="Describe the role, responsibilities, and what the student will learn..."
              className="min-h-32"
              error={errors.description?.message}
              required
              {...form.register("description")}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormInput
                label="Stipend"
                placeholder="e.g., ₹15,000/month or Stipend + Certificate"
                error={errors.stipend?.message}
                required
                {...form.register("stipend")}
              />

              <FormInput
                label="Duration"
                placeholder="e.g., 3 months, 6 months"
                error={errors.duration?.message}
                required
                {...form.register("duration")}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <FormSelect
                label="Department"
                placeholder="Select department"
                error={errors.department?.message}
                required
                value={form.watch("department")}
                onValueChange={(value) => form.setValue("department", value)}
              >
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept}>
                    {dept}
                  </SelectItem>
                ))}
              </FormSelect>

              <FormInput
                label="Location"
                placeholder="e.g., Remote, Mumbai, Bangalore"
                error={errors.location?.message}
                {...form.register("location")}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Requirements & Skills</CardTitle>
            <CardDescription>
              Specify the technical requirements and skills needed
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormTextarea
              label="Requirements"
              placeholder="List the requirements, qualifications, and experience needed..."
              className="min-h-24"
              error={errors.requirements?.message}
              {...form.register("requirements")}
            />

            <FormSkillsInput
              label="Required Skills"
              skills={form.watch("skills") || []}
              availableSkills={skills}
              onSkillsChange={(skills) => form.setValue("skills", skills)}
              error={errors.skills?.message}
              required
              maxSkills={10}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Posting Job..." : "Post Job"}
          </Button>
        </div>
      </form>
    </div>
  );
}
