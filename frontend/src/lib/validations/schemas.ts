import { z } from "zod";

// Job posting validation schema
export const jobPostingSchema = z.object({
  title: z.string()
    .min(3, "Job title must be at least 3 characters")
    .max(100, "Job title must be less than 100 characters"),
  
  company: z.string()
    .min(2, "Company name must be at least 2 characters")
    .max(50, "Company name must be less than 50 characters"),
  
  description: z.string()
    .min(50, "Job description must be at least 50 characters")
    .max(2000, "Job description must be less than 2000 characters"),
  
  requirements: z.string()
    .max(1000, "Requirements must be less than 1000 characters")
    .optional(),
  
  stipend: z.string()
    .min(1, "Stipend information is required")
    .max(100, "Stipend information must be less than 100 characters"),
  
  duration: z.string()
    .min(1, "Duration is required")
    .max(50, "Duration must be less than 50 characters"),
  
  department: z.string()
    .min(1, "Please select a department"),
  
  location: z.string()
    .max(100, "Location must be less than 100 characters")
    .optional(),
  
  skills: z.array(z.string())
    .min(1, "At least one skill is required")
    .max(10, "Maximum 10 skills allowed"),
  
  jobType: z.enum(["internship", "fulltime"], {
    message: "Please select a job type"
  }),
  
  status: z.enum(["active", "paused", "closed"])
    .default("active")
});

// Student profile validation schema
export const studentProfileSchema = z.object({
  personalInfo: z.object({
    name: z.string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters"),
    
    email: z.string()
      .email("Please enter a valid email address"),
    
    phone: z.string()
      .regex(/^\+?[\d\s-()]+$/, "Please enter a valid phone number")
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must be less than 15 digits"),
    
    address: z.string()
      .max(200, "Address must be less than 200 characters")
      .optional(),
    
    dateOfBirth: z.string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Please enter date in YYYY-MM-DD format")
      .optional(),
    
    gender: z.enum(["Male", "Female", "Other", "Prefer not to say"])
      .optional(),
    
    linkedin: z.string()
      .url("Please enter a valid LinkedIn URL")
      .optional()
      .or(z.literal("")),
    
    github: z.string()
      .url("Please enter a valid GitHub URL")
      .optional()
      .or(z.literal(""))
  }),
  
  academicInfo: z.object({
    university: z.string()
      .min(2, "University name must be at least 2 characters")
      .max(100, "University name must be less than 100 characters"),
    
    degree: z.string()
      .min(2, "Degree name must be at least 2 characters")
      .max(50, "Degree name must be less than 50 characters"),
    
    department: z.string()
      .min(2, "Department must be at least 2 characters")
      .max(50, "Department must be less than 50 characters"),
    
    cgpa: z.string()
      .regex(/^\d+\.?\d*$/, "Please enter a valid CGPA")
      .refine((val) => {
        const num = parseFloat(val);
        return num >= 0 && num <= 10;
      }, "CGPA must be between 0 and 10"),
    
    graduationYear: z.string()
      .regex(/^\d{4}$/, "Please enter a valid year (YYYY)")
      .refine((val) => {
        const year = parseInt(val);
        const currentYear = new Date().getFullYear();
        return year >= 2020 && year <= currentYear + 5;
      }, "Graduation year must be between 2020 and " + (new Date().getFullYear() + 5)),
    
    currentYear: z.enum(["First Year", "Second Year", "Pre-Final Year", "Final Year"])
  }),
  
  skills: z.array(z.string())
    .min(1, "At least one skill is required")
    .max(20, "Maximum 20 skills allowed"),
  
  preferences: z.object({
    jobTypes: z.array(z.enum(["Internship", "Full-time", "Part-time"]))
      .min(1, "Please select at least one job type"),
    
    locations: z.array(z.string())
      .min(1, "Please select at least one preferred location"),
    
    expectedStipend: z.string()
      .regex(/^₹?\d+(,\d{3})*(\s*-\s*₹?\d+(,\d{3})*)?\s*\/?(month|year)?$/, 
        "Please enter valid stipend range (e.g., ₹15,000 - ₹25,000/month)"),
    
    availableFrom: z.string()
      .regex(/^\d{4}-\d{2}$/, "Please enter date in YYYY-MM format"),
    
    workMode: z.array(z.enum(["Remote", "Hybrid", "On-site"]))
      .min(1, "Please select at least one work mode")
  }),
  
  documents: z.object({
    resume: z.string()
      .url("Please enter a valid Google Drive link")
      .refine((val) => val.includes("drive.google.com"), 
        "Please enter a valid Google Drive link"),
    
    portfolio: z.string()
      .url("Please enter a valid portfolio URL")
      .optional()
      .or(z.literal("")),
    
    coverLetter: z.string()
      .url("Please enter a valid Google Drive link")
      .optional()
      .or(z.literal(""))
  })
});

// Application form validation schema
export const applicationSchema = z.object({
  coverLetter: z.string()
    .min(100, "Cover letter must be at least 100 characters")
    .max(1000, "Cover letter must be less than 1000 characters"),
  
  resume: z.string()
    .url("Please enter a valid Google Drive link")
    .refine((val) => val.includes("drive.google.com"), 
      "Please enter a valid Google Drive link"),
  
  additionalDocuments: z.array(z.object({
    name: z.string().min(1, "Document name is required"),
    link: z.string().url("Please enter a valid Google Drive link")
  })).optional(),
  
  availability: z.string()
    .min(1, "Please specify your availability"),
  
  questions: z.array(z.object({
    question: z.string(),
    answer: z.string().min(1, "Please answer this question")
  })).optional()
});

// Feedback form validation schema
export const feedbackSchema = z.object({
  rating: z.number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5"),
  
  comments: z.string()
    .min(10, "Comments must be at least 10 characters")
    .max(500, "Comments must be less than 500 characters"),
  
  strengths: z.array(z.string())
    .min(1, "Please mention at least one strength")
    .max(5, "Maximum 5 strengths allowed"),
  
  improvements: z.array(z.string())
    .min(1, "Please mention at least one area for improvement")
    .max(5, "Maximum 5 improvement areas allowed"),
  
  recommendation: z.enum(["Strongly Recommend", "Recommend", "Neutral", "Not Recommend", "Strongly Not Recommend"]),
  
  nextSteps: z.string()
    .max(200, "Next steps must be less than 200 characters")
    .optional()
});

// Search and filter schemas
export const jobSearchSchema = z.object({
  query: z.string().max(100, "Search query must be less than 100 characters").optional(),
  department: z.string().optional(),
  location: z.string().optional(),
  workMode: z.enum(["Remote", "Hybrid", "On-site"]).optional(),
  stipendRange: z.object({
    min: z.number().min(0).optional(),
    max: z.number().min(0).optional()
  }).optional(),
  skills: z.array(z.string()).optional(),
  sortBy: z.enum(["relevance", "date", "stipend", "applications"]).default("relevance")
});

export const studentSearchSchema = z.object({
  query: z.string().max(100, "Search query must be less than 100 characters").optional(),
  department: z.string().optional(),
  year: z.enum(["First Year", "Second Year", "Pre-Final Year", "Final Year"]).optional(),
  skills: z.array(z.string()).optional(),
  cgpaRange: z.object({
    min: z.number().min(0).max(10).optional(),
    max: z.number().min(0).max(10).optional()
  }).optional(),
  sortBy: z.enum(["relevance", "cgpa", "skills", "experience"]).default("relevance")
});

// Type exports
export type JobPostingFormData = z.infer<typeof jobPostingSchema>;
export type StudentProfileFormData = z.infer<typeof studentProfileSchema>;
export type ApplicationFormData = z.infer<typeof applicationSchema>;
export type FeedbackFormData = z.infer<typeof feedbackSchema>;
export type JobSearchFormData = z.infer<typeof jobSearchSchema>;
export type StudentSearchFormData = z.infer<typeof studentSearchSchema>;
