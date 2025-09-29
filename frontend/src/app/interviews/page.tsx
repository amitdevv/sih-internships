"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, MapPin, Phone, ExternalLink, AlertCircle } from "lucide-react";
import { enhancedToast } from "@/components/ui/enhanced-toast";

// Mock student interview data
const mockStudentInterviews = [
  {
    id: "int_001",
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
    notes: "Technical interview focusing on React and Node.js skills",
    preparation: [
      "Review React fundamentals and hooks",
      "Prepare examples of Node.js projects",
      "Practice coding problems",
      "Prepare questions about the role"
    ]
  },
  {
    id: "int_002",
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
    notes: "Completed - Strong analytical skills demonstrated",
    feedback: "Excellent performance! We'll be in touch soon."
  },
  {
    id: "int_003",
    jobTitle: "UX Design Intern",
    company: "DesignStudio",
    scheduledDate: "2024-02-17",
    scheduledTime: "16:00",
    duration: 90,
    type: "video",
    platform: "Zoom",
    status: "upcoming",
    meetingLink: "https://zoom.us/j/123456789",
    interviewer: "Mike Chen",
    interviewerEmail: "mike.chen@designstudio.com",
    notes: "Portfolio review and design challenge discussion",
    preparation: [
      "Prepare portfolio presentation",
      "Review design principles",
      "Practice explaining design decisions",
      "Prepare case studies"
    ]
  }
];

export default function StudentInterviewsPage() {
  const [interviews] = useState(mockStudentInterviews);
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredInterviews = interviews.filter(interview => 
    statusFilter === "all" || interview.status === statusFilter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled": return "default";
      case "upcoming": return "secondary";
      case "completed": return "default";
      case "cancelled": return "destructive";
      default: return "outline";
    }
  };

  const getStatusStyle = (status: string) => {
    return { backgroundColor: '#000000', color: 'white' }; // Black for all statuses
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video": return Video;
      case "onsite": return MapPin;
      case "phone": return Phone;
      default: return Video;
    }
  };

  const upcomingInterviews = interviews.filter(interview => 
    interview.status === "scheduled" || interview.status === "upcoming"
  );

  const handleJoinMeeting = (meetingLink: string, companyName: string) => {
    if (meetingLink) {
      window.open(meetingLink, '_blank', 'noopener,noreferrer');
      enhancedToast.success("Opening meeting link", {
        description: `Joining interview with ${companyName} in new tab`
      });
    }
  };

  const handleReschedule = (interviewId: string) => {
    enhancedToast.info("Reschedule Request", {
      description: "Your reschedule request has been sent to the interviewer."
    });
  };

  const handleCancel = (interviewId: string) => {
    enhancedToast.warning("Interview Cancelled", {
      description: "You have cancelled this interview. Please contact the company if you need to reschedule."
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">My Interviews</h1>
        <p className="text-muted-foreground">
          Track and manage your scheduled interviews
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Interviews</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{interviews.length}</div>
            <p className="text-xs text-muted-foreground">
              All time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{upcomingInterviews.length}</div>
            <p className="text-xs text-muted-foreground">
              Scheduled interviews
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">
              {interviews.filter(i => i.status === "completed").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Finished interviews
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">75%</div>
            <p className="text-xs text-muted-foreground">
              Completion rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      {upcomingInterviews.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Interviews</CardTitle>
            <CardDescription>
              Your next interviews - be prepared!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingInterviews.slice(0, 2).map((interview) => {
                const TypeIcon = getTypeIcon(interview.type);
                
                return (
                  <div key={interview.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="font-semibold">{interview.jobTitle}</h3>
                        <p className="text-sm text-muted-foreground">
                          {interview.company} • {new Date(interview.scheduledDate).toLocaleDateString()} at {interview.scheduledTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {interview.meetingLink && (
                        <Button 
                          size="sm"
                          onClick={() => handleJoinMeeting(interview.meetingLink, interview.company)}
                          className="bg-black text-white hover:bg-gray-800"
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Join Now
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="bg-transparent border hover:bg-gray-50 cursor-pointer" style={{ borderColor: '#11406f', color: '#11406f' }}>
                        View Details
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Interviews */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">All Interviews</h2>
          <Badge variant="secondary">
            {filteredInterviews.length} interviews
          </Badge>
        </div>

        <div className="space-y-4">
          {filteredInterviews.map((interview) => {
            const TypeIcon = getTypeIcon(interview.type);
            
            return (
              <Card key={interview.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div>
                        <CardTitle className="text-lg">{interview.jobTitle}</CardTitle>
                        <CardDescription>
                          {interview.company}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge 
                      variant="default"
                      className="text-xs font-medium px-2 py-1 rounded-md border-0"
                      style={getStatusStyle(interview.status)}
                    >
                      {interview.status}
                    </Badge>
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
                        <span>{interview.type.charAt(0).toUpperCase() + interview.type.slice(1)}</span>
                        <span className="text-muted-foreground">•</span>
                        <span>{interview.platform}</span>
                      </div>

                      <div className="text-sm">
                        <span className="font-medium">Interviewer: </span>
                        <span>{interview.interviewer}</span>
                      </div>

                      {interview.meetingLink && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleJoinMeeting(interview.meetingLink, interview.company)}
                            className="bg-black text-white hover:bg-gray-800"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Join Meeting
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      {interview.notes && (
                        <div>
                          <h4 className="text-sm font-medium">Interview Notes:</h4>
                          <p className="text-sm text-muted-foreground">{interview.notes}</p>
                        </div>
                      )}

                      {interview.preparation && (
                        <div>
                          <h4 className="text-sm font-medium">Preparation Tips:</h4>
                          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                            {interview.preparation.map((tip, idx) => (
                              <li key={idx}>{tip}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {interview.feedback && (
                        <div>
                          <h4 className="text-sm font-medium">Feedback:</h4>
                          <p className="text-sm text-muted-foreground">{interview.feedback}</p>
                        </div>
                      )}

                      {(interview.status === "scheduled" || interview.status === "upcoming") && (
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleReschedule(interview.id)}
                            className="bg-transparent border hover:bg-gray-50"
                            style={{ borderColor: '#11406f', color: '#11406f' }}
                          >
                            Reschedule
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleCancel(interview.id)}
                            className="bg-transparent border hover:bg-gray-50"
                            style={{ borderColor: '#11406f', color: '#11406f' }}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
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
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
