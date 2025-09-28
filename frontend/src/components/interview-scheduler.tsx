"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FormInput, FormSelect, FormTextarea } from "@/components/ui/form-field";
import { SelectItem } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock, User, Video, MapPin, Phone } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { enhancedToast } from "@/components/ui/enhanced-toast";

interface InterviewSchedulerProps {
  isOpen: boolean;
  onClose: () => void;
}

const interviewTypes = [
  { value: "video", label: "Video Call", icon: Video },
  { value: "onsite", label: "On-site", icon: MapPin },
  { value: "phone", label: "Phone Call", icon: Phone }
];

const platforms = {
  video: ["Google Meet", "Zoom", "Microsoft Teams", "Skype"],
  onsite: ["Office", "Client Location", "Conference Room A", "Conference Room B"],
  phone: ["Phone Call", "WhatsApp", "Telegram"]
};

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

const durations = [30, 45, 60, 90, 120];

export function InterviewScheduler({ isOpen, onClose }: InterviewSchedulerProps) {
  const [formData, setFormData] = useState({
    candidateName: "",
    candidateEmail: "",
    jobTitle: "",
    scheduledDate: undefined as Date | undefined,
    scheduledTime: "",
    duration: 60,
    type: "video",
    platform: "Google Meet",
    interviewer: "",
    interviewerEmail: "",
    notes: "",
    meetingLink: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.candidateName.trim()) {
      newErrors.candidateName = "Candidate name is required";
    }
    if (!formData.candidateEmail.trim()) {
      newErrors.candidateEmail = "Candidate email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.candidateEmail)) {
      newErrors.candidateEmail = "Please enter a valid email";
    }
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required";
    }
    if (!formData.scheduledDate) {
      newErrors.scheduledDate = "Please select a date";
    }
    if (!formData.scheduledTime) {
      newErrors.scheduledTime = "Please select a time";
    }
    if (!formData.interviewer.trim()) {
      newErrors.interviewer = "Interviewer name is required";
    }
    if (!formData.interviewerEmail.trim()) {
      newErrors.interviewerEmail = "Interviewer email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.interviewerEmail)) {
      newErrors.interviewerEmail = "Please enter a valid email";
    }
    if (formData.type === "video" && !formData.meetingLink.trim()) {
      newErrors.meetingLink = "Meeting link is required for video interviews";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      enhancedToast.error("Please fix the errors before submitting");
      return;
    }

    // Simulate API call
    enhancedToast.loading("Scheduling interview...", { id: "schedule-interview" });
    
    setTimeout(() => {
      enhancedToast.interviewScheduled(
        format(formData.scheduledDate!, "MMM dd, yyyy"),
        formData.scheduledTime
      );
      onClose();
      
      // Reset form
      setFormData({
        candidateName: "",
        candidateEmail: "",
        jobTitle: "",
        scheduledDate: undefined,
        scheduledTime: "",
        duration: 60,
        type: "video",
        platform: "Google Meet",
        interviewer: "",
        interviewerEmail: "",
        notes: "",
        meetingLink: ""
      });
      setErrors({});
    }, 2000);
  };

  const handleTypeChange = (type: string) => {
    setFormData(prev => ({
      ...prev,
      type,
      platform: platforms[type as keyof typeof platforms][0],
      meetingLink: type === "video" ? prev.meetingLink : ""
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule New Interview</DialogTitle>
          <DialogDescription>
            Schedule an interview with a candidate
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Candidate Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Candidate Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FormInput
                  label="Candidate Name"
                  placeholder="Enter candidate name"
                  value={formData.candidateName}
                  onChange={(e) => setFormData(prev => ({ ...prev, candidateName: e.target.value }))}
                  error={errors.candidateName}
                  required
                />

                <FormInput
                  label="Candidate Email"
                  type="email"
                  placeholder="candidate@email.com"
                  value={formData.candidateEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, candidateEmail: e.target.value }))}
                  error={errors.candidateEmail}
                  required
                />
              </div>

              <FormInput
                label="Job Title"
                placeholder="Software Developer Intern"
                value={formData.jobTitle}
                onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
                error={errors.jobTitle}
                required
              />
            </CardContent>
          </Card>

          {/* Interview Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Interview Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date *</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !formData.scheduledDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.scheduledDate ? (
                          format(formData.scheduledDate, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.scheduledDate}
                        onSelect={(date) => setFormData(prev => ({ ...prev, scheduledDate: date }))}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.scheduledDate && (
                    <p className="text-sm text-destructive">{errors.scheduledDate}</p>
                  )}
                </div>

                <FormSelect
                  label="Time"
                  placeholder="Select time"
                  value={formData.scheduledTime}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, scheduledTime: value }))}
                  error={errors.scheduledTime}
                  required
                >
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </FormSelect>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <FormSelect
                  label="Duration (minutes)"
                  value={formData.duration.toString()}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, duration: parseInt(value) }))}
                >
                  {durations.map((duration) => (
                    <SelectItem key={duration} value={duration.toString()}>
                      {duration} minutes
                    </SelectItem>
                  ))}
                </FormSelect>

                <FormSelect
                  label="Interview Type"
                  value={formData.type}
                  onValueChange={handleTypeChange}
                >
                  {interviewTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    );
                  })}
                </FormSelect>

                <FormSelect
                  label="Platform"
                  value={formData.platform}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, platform: value }))}
                >
                  {platforms[formData.type as keyof typeof platforms].map((platform) => (
                    <SelectItem key={platform} value={platform}>
                      {platform}
                    </SelectItem>
                  ))}
                </FormSelect>
              </div>

              {formData.type === "video" && (
                <FormInput
                  label="Meeting Link"
                  placeholder="https://meet.google.com/abc-defg-hij"
                  value={formData.meetingLink}
                  onChange={(e) => setFormData(prev => ({ ...prev, meetingLink: e.target.value }))}
                  error={errors.meetingLink}
                  required
                />
              )}
            </CardContent>
          </Card>

          {/* Interviewer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Interviewer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FormInput
                  label="Interviewer Name"
                  placeholder="Enter interviewer name"
                  value={formData.interviewer}
                  onChange={(e) => setFormData(prev => ({ ...prev, interviewer: e.target.value }))}
                  error={errors.interviewer}
                  required
                />

                <FormInput
                  label="Interviewer Email"
                  type="email"
                  placeholder="interviewer@company.com"
                  value={formData.interviewerEmail}
                  onChange={(e) => setFormData(prev => ({ ...prev, interviewerEmail: e.target.value }))}
                  error={errors.interviewerEmail}
                  required
                />
              </div>

              <FormTextarea
                label="Notes"
                placeholder="Add any special notes or requirements for this interview..."
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="min-h-20"
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Schedule Interview
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
