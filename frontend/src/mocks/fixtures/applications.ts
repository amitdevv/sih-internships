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
  updatedAt: string;
}> = [
  { id: "a1", role: "Frontend Intern", company: "Acme Corp", status: "MentorPending", updatedAt: "2025-09-10" },
  { id: "a2", role: "Backend Intern", company: "Globex", status: "Shortlisted", updatedAt: "2025-09-08" },
  { id: "a3", role: "Data Intern", company: "Initech", status: "InterviewScheduled", updatedAt: "2025-09-12" },
];


