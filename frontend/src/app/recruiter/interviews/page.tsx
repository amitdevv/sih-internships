"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Clock, User, Video, MapPin, Plus, Edit, Trash2 } from "lucide-react";
import { enhancedToast } from "@/components/ui/enhanced-toast";
import { InterviewScheduler } from "@/components/interview-scheduler";

// Mock interview data
const mockInterviews = [
  {
    id: "int_001",
    candidateName: "Priya Sharma",
    candidateEmail: "priya.sharma@email.com",
    jobTitle: "Software Developer Intern",
    company: "TechCorp Solutions",
    scheduledDate: "2024-02-15",
    scheduledTime: "14:00",
    duration: 60,
    type: "video",
    platform: "Google Meet",
    status: "scheduled",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    interviewer: "John Smith",
    interviewerEmail: "john.smith@techcorp.com",
    notes: "Technical interview focusing on React and Node.js skills"
  },
  {
    id: "int_002",
    candidateName: "Raj Kumar",
    candidateEmail: "raj.kumar@email.com",
    jobTitle: "Data Analyst Intern",
    company: "DataViz Inc",
    scheduledDate: "2024-02-16",
    scheduledTime: "10:30",
    duration: 45,
    type: "onsite",
    platform: "Office",
    status: "completed",
    meetingLink: "",
    interviewer: "Sarah Johnson",
    interviewerEmail: "sarah.johnson@dataviz.com",
    notes: "Completed - Strong analytical skills demonstrated"
  },
  {
    id: "int_003",
    candidateName: "Anita Singh",
    candidateEmail: "anita.singh@email.com",
    jobTitle: "UX Design Intern",
    company: "DesignStudio",
    scheduledDate: "2024-02-17",
    scheduledTime: "16:00",
    duration: 90,
    type: "video",
    platform: "Zoom",
    status: "pending",
    meetingLink: "https://zoom.us/j/123456789",
    interviewer: "Mike Chen",
    interviewerEmail: "mike.chen@designstudio.com",
    notes: "Portfolio review and design challenge discussion"
  }
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

const interviewTypes = [
  { value: "video", label: "Video Call", icon: Video },
  { value: "onsite", label: "On-site", icon: MapPin },
  { value: "phone", label: "Phone Call", icon: User }
];

const platforms = {
  video: ["Google Meet", "Zoom", "Microsoft Teams", "Skype"],
  onsite: ["Office", "Client Location", "Conference Room"],
  phone: ["Phone Call", "WhatsApp", "Telegram"]
};

export default function InterviewsPage() {
  const [interviews, setInterviews] = useState(mockInterviews);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showScheduleForm, setShowScheduleForm] = useState(false);

  const filteredInterviews = interviews.filter(interview => {
    const statusMatch = statusFilter === "all" || interview.status === statusFilter;
    const typeMatch = typeFilter === "all" || interview.type === typeFilter;
    return statusMatch && typeMatch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "default";
      case "completed": return "secondary";
      case "cancelled": return "destructive";
      case "pending": return "outline";
      default: return "outline";
    }
  };

  const getTypeIcon = (type: string) => {
    const typeConfig = interviewTypes.find(t => t.value === type);
    return typeConfig ? typeConfig.icon : Video;
  };

  const handleStatusChange = (interviewId: string, newStatus: string) => {
    setInterviews(prev => 
      prev.map(interview => 
        interview.id === interviewId 
          ? { ...interview, status: newStatus }
          : interview
      )
    );
    enhancedToast.applicationStatusUpdated(newStatus);
  };

  const handleDeleteInterview = (interviewId: string) => {
    setInterviews(prev => prev.filter(interview => interview.id !== interviewId));
    enhancedToast.success("Interview cancelled", {
      description: "The interview has been cancelled successfully."
    });
  };

  const upcomingInterviews = interviews.filter(interview => 
    interview.status === "scheduled" || interview.status === "pending"
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Interview Management</h1>
          <p className="text-muted-foreground">
            Schedule and manage candidate interviews
          </p>
        </div>
        <Button onClick={() => setShowScheduleForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Schedule Interview
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{interviews.length}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingInterviews.length}</div>
            <p className="text-xs text-muted-foreground">
              Scheduled interviews
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {interviews.filter(i => i.status === "completed").length}
            </div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Video Calls</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {interviews.filter(i => i.type === "video").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Remote interviews
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="video">Video Call</SelectItem>
                <SelectItem value="onsite">On-site</SelectItem>
                <SelectItem value="phone">Phone Call</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Interviews List */}
      <div className="space-y-4">
        {filteredInterviews.map((interview) => {
          const TypeIcon = getTypeIcon(interview.type);
          
          return (
            <Card key={interview.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarFallback>
                        {interview.candidateName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{interview.candidateName}</CardTitle>
                      <CardDescription>
                        {interview.jobTitle} at {interview.company}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(interview.status)}>
                      {interview.status}
                    </Badge>
                    <Select
                      value={interview.status}
                      onValueChange={(value) => handleStatusChange(interview.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(interview.scheduledDate).toLocaleDateString()}</span>
                      <Clock className="h-4 w-4 text-muted-foreground ml-4" />
                      <span>{interview.scheduledTime} ({interview.duration} min)</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <TypeIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{interview.type.charAt(0).toUpperCase() + interview.type.slice(1)}</span>
                      <span className="text-muted-foreground">•</span>
                      <span>{interview.platform}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>Interviewer: {interview.interviewer}</span>
                    </div>

                    {interview.meetingLink && (
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <a href={interview.meetingLink} target="_blank" rel="noopener noreferrer">
                            Join Meeting
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {interview.notes && (
                      <div>
                        <h4 className="text-sm font-medium">Notes:</h4>
                        <p className="text-sm text-muted-foreground">{interview.notes}</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDeleteInterview(interview.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredInterviews.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-center">
              No interviews found matching your criteria.
            </p>
            <Button className="mt-4" onClick={() => setShowScheduleForm(true)}>
              Schedule Your First Interview
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Interview Scheduler Modal */}
      <InterviewScheduler 
        isOpen={showScheduleForm}
        onClose={() => setShowScheduleForm(false)}
      />
    </div>
  );
}
