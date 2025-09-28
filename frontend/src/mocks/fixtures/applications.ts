export type AppStatus =
  | "Draft"
  | "Submitted"
  | "MentorPending"
  | "Shortlisted"
  | "InterviewScheduled"
  | "Interviewed"
  | "OfferExtended"
  | "OfferAccepted"
  | "OfferDeclined"
  | "InternshipOngoing"
  | "Completed"
  | "CertificateIssued"
  | "Rejected"
  | "Withdrawn";

export const mockApplications: Array<{
  id: string;
  role: string;
  company: string;
  status: AppStatus;
  location: string;
  updatedAt: string;
}> = [
  { id: "a1", role: "Frontend Intern", company: "Acme Corp", status: "MentorPending", location: "Bangalore", updatedAt: "2025-09-10" },
  { id: "a2", role: "Backend Intern", company: "Globex", status: "Shortlisted", location: "Mumbai", updatedAt: "2025-09-08" },
  { id: "a3", role: "Data Intern", company: "Initech", status: "InterviewScheduled", location: "Delhi", updatedAt: "2025-09-12" },
];


