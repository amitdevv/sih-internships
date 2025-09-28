"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarInitials } from "@/components/ui/avatar";
import { Eye, Star, MessageSquare, Download, ExternalLink } from "lucide-react";
import { toast } from "sonner";

// Mock data for applications
const applications = [
  {
    id: 1,
    studentName: "Priya Sharma",
    email: "priya.sharma@email.com",
    jobTitle: "Software Developer Intern",
    company: "TechCorp Solutions",
    skills: ["React", "Node.js", "Python", "JavaScript"],
    cgpa: "8.5",
    department: "Computer Science",
    year: "Final Year",
    appliedDate: "2024-01-20",
    status: "pending",
    resumeLink: "https://drive.google.com/file/d/example1",
    coverLetter: "I am passionate about software development and have worked on several projects...",
    experience: "2 years of coding experience, 3 personal projects",
    rating: null,
    notes: ""
  },
  {
    id: 2,
    studentName: "Raj Kumar",
    email: "raj.kumar@email.com",
    jobTitle: "Data Analyst Intern",
    company: "DataViz Inc",
    skills: ["SQL", "Python", "Tableau", "Excel", "Statistics"],
    cgpa: "9.2",
    department: "Information Technology",
    year: "Final Year",
    appliedDate: "2024-01-19",
    status: "shortlisted",
    resumeLink: "https://drive.google.com/file/d/example2",
    coverLetter: "My strong analytical skills and experience with data visualization...",
    experience: "Data analysis projects, statistical modeling experience",
    rating: 4,
    notes: "Strong technical skills, good communication"
  },
  {
    id: 3,
    studentName: "Anita Singh",
    email: "anita.singh@email.com",
    jobTitle: "UX Design Intern",
    company: "DesignStudio",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    cgpa: "8.8",
    department: "Computer Science",
    year: "Pre-Final Year",
    appliedDate: "2024-01-18",
    status: "interviewed",
    resumeLink: "https://drive.google.com/file/d/example3",
    coverLetter: "I have a keen eye for design and user experience...",
    experience: "UI/UX design portfolio, 2 internship experiences",
    rating: 5,
    notes: "Excellent portfolio, great potential"
  },
  {
    id: 4,
    studentName: "Vikram Patel",
    email: "vikram.patel@email.com",
    jobTitle: "Software Developer Intern",
    company: "TechCorp Solutions",
    skills: ["Java", "Spring Boot", "MySQL", "Git"],
    cgpa: "7.9",
    department: "Computer Science",
    year: "Final Year",
    appliedDate: "2024-01-17",
    status: "rejected",
    resumeLink: "https://drive.google.com/file/d/example4",
    coverLetter: "I am interested in backend development and have experience with Java...",
    experience: "Backend development projects",
    rating: 2,
    notes: "Skills don't match current requirements"
  }
];

const statusOptions = [
  { value: "all", label: "All Applications" },
  { value: "pending", label: "Pending Review" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "interviewed", label: "Interviewed" },
  { value: "rejected", label: "Rejected" },
  { value: "offered", label: "Offered" }
];

export default function ApplicationsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [applicationsData, setApplicationsData] = useState(applications);

  const filteredApplications = applicationsData.filter(app => {
    const matchesSearch = app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (applicationId: number, newStatus: string) => {
    setApplicationsData(prev => 
      prev.map(app => 
        app.id === applicationId ? { ...app, status: newStatus } : app
      )
    );
    toast.success("Application status updated");
  };

  const handleRatingChange = (applicationId: number, rating: number) => {
    setApplicationsData(prev => 
      prev.map(app => 
        app.id === applicationId ? { ...app, rating } : app
      )
    );
    toast.success("Rating updated");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "outline";
      case "shortlisted": return "default";
      case "interviewed": return "secondary";
      case "rejected": return "destructive";
      case "offered": return "default";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Applications Review</h1>
        <p className="text-muted-foreground">
          Review and manage candidate applications
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by name, job title, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application) => (
          <Card key={application.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>
                      {application.studentName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{application.studentName}</CardTitle>
                    <CardDescription>
                      {application.email} • {application.department} • {application.year}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getStatusColor(application.status)}>
                    {application.status}
                  </Badge>
                  <Select
                    value={application.status}
                    onValueChange={(value) => handleStatusChange(application.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="shortlisted">Shortlisted</SelectItem>
                      <SelectItem value="interviewed">Interviewed</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="offered">Offered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">Job Applied For</h4>
                    <p className="text-sm text-muted-foreground">
                      {application.jobTitle} at {application.company}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium">Skills</h4>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {application.skills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium">Academic Performance</h4>
                    <p className="text-sm text-muted-foreground">
                      CGPA: {application.cgpa} • {application.year}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium">Experience</h4>
                    <p className="text-sm text-muted-foreground">
                      {application.experience}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">Cover Letter</h4>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {application.coverLetter}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium">Rating</h4>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange(application.id, star)}
                          className="text-muted-foreground hover:text-yellow-500 transition-colors"
                        >
                          <Star 
                            className={`h-4 w-4 ${
                              application.rating && star <= application.rating 
                                ? 'fill-yellow-500 text-yellow-500' 
                                : ''
                            }`} 
                          />
                        </button>
                      ))}
                      <span className="text-sm text-muted-foreground ml-2">
                        {application.rating ? `${application.rating}/5` : 'Not rated'}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <a href={application.resumeLink} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4 mr-1" />
                        Resume
                      </a>
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Notes
                    </Button>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      Full Profile
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-muted-foreground">No applications found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
