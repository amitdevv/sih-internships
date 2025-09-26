export type Applicant = {
  id: string;
  name: string;
  department: string;
  role: string;
  company: string;
  status: "Submitted" | "MentorPending" | "Shortlisted" | "Rejected";
  cgpa: number;
};

export const mockApplicants: Applicant[] = [
  { id: "u1", name: "Anita Verma", department: "CSE", role: "Frontend Intern", company: "Acme Corp", status: "MentorPending", cgpa: 8.4 },
  { id: "u2", name: "Rohit Singh", department: "ECE", role: "Backend Intern", company: "Globex", status: "Submitted", cgpa: 7.9 },
  { id: "u3", name: "Meera Iyer", department: "CSE", role: "Data Intern", company: "Initech", status: "Shortlisted", cgpa: 9.1 },
];


