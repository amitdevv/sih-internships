"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

interface ToastOptions {
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}

export const enhancedToast = {
  success: (message: string, options?: ToastOptions) => {
    return toast.success(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      action: options?.action ? {
        label: options.action.label,
        onClick: options.action.onClick
      } : undefined,
      icon: <CheckCircle className="h-4 w-4 text-green-600" />
    });
  },

  error: (message: string, options?: ToastOptions) => {
    return toast.error(message, {
      description: options?.description,
      duration: options?.duration || 6000,
      action: options?.action ? {
        label: options.action.label,
        onClick: options.action.onClick
      } : undefined,
      icon: <AlertCircle className="h-4 w-4 text-red-600" />
    });
  },

  warning: (message: string, options?: ToastOptions) => {
    return toast.warning(message, {
      description: options?.description,
      duration: options?.duration || 5000,
      action: options?.action ? {
        label: options.action.label,
        onClick: options.action.onClick
      } : undefined,
      icon: <AlertTriangle className="h-4 w-4 text-yellow-600" />
    });
  },

  info: (message: string, options?: ToastOptions) => {
    return toast.info(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      action: options?.action ? {
        label: options.action.label,
        onClick: options.action.onClick
      } : undefined,
      icon: <Info className="h-4 w-4 text-blue-600" />
    });
  },

  loading: (message: string, options?: { description?: string; id?: string }) => {
    return toast.loading(message, {
      description: options?.description,
      id: options?.id || "loading"
    });
  },

  dismiss: (id?: string) => {
    toast.dismiss(id);
  },

  // Application-specific toasts
  applicationSubmitted: (jobTitle: string) => {
    return enhancedToast.success("Application Submitted!", {
      description: `Your application for ${jobTitle} has been submitted successfully.`,
      action: {
        label: "View Applications",
        onClick: () => window.location.href = "/applications"
      }
    });
  },

  jobPosted: (jobTitle: string) => {
    return enhancedToast.success("Job Posted Successfully!", {
      description: `${jobTitle} has been posted and is now visible to students.`,
      action: {
        label: "View Job",
        onClick: () => window.location.href = "/recruiter"
      }
    });
  },

  profileUpdated: () => {
    return enhancedToast.success("Profile Updated!", {
      description: "Your profile has been updated successfully.",
      action: {
        label: "View Profile",
        onClick: () => window.location.href = "/profile"
      }
    });
  },

  documentUploaded: (documentType: string) => {
    return enhancedToast.success("Document Uploaded!", {
      description: `Your ${documentType} has been uploaded successfully.`,
      duration: 3000
    });
  },

  applicationStatusUpdated: (status: string) => {
    return enhancedToast.info("Status Updated!", {
      description: `Application status changed to ${status}.`,
      duration: 3000
    });
  },

  interviewScheduled: (date: string, time: string) => {
    return enhancedToast.success("Interview Scheduled!", {
      description: `Interview scheduled for ${date} at ${time}.`,
      action: {
        label: "View Details",
        onClick: () => window.location.href = "/interviews"
      }
    });
  },

  deadlineReminder: (type: string, deadline: string) => {
    return enhancedToast.warning("Deadline Reminder!", {
      description: `${type} deadline is approaching: ${deadline}`,
      duration: 8000,
      action: {
        label: "View Details",
        onClick: () => window.location.href = "/dashboard"
      }
    });
  },

  errorWithRetry: (message: string, retryFn: () => void) => {
    return enhancedToast.error(message, {
      description: "Please try again or contact support if the issue persists.",
      action: {
        label: "Retry",
        onClick: retryFn
      },
      duration: 8000
    });
  },

  networkError: () => {
    return enhancedToast.error("Network Error", {
      description: "Please check your internet connection and try again.",
      duration: 6000
    });
  },

  validationError: (field: string) => {
    return enhancedToast.error("Validation Error", {
      description: `Please check the ${field} field and try again.`,
      duration: 4000
    });
  }
};
