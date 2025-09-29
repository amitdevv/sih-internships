"use client";

import React from "react";
import { NotionList } from "@/components/sections/dashboard/notion-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { FileText, User, Building2, Calendar, CheckCircle, XCircle } from "lucide-react";
import { mockApprovals } from "@/mocks/fixtures/approvals";
import { toast } from "sonner";

export default function MentorReviewsPage() {
  const [comment, setComment] = React.useState("");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const handleApprove = (id: string, studentName: string) => {
    toast.success(`Approved application for ${studentName}`);
  };

  const handleReject = (id: string, studentName: string) => {
    toast.error(`Rejected application for ${studentName}`);
    setComment(""); // Clear comment after rejection
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Mentor Approvals</h1>
        <Badge variant="outline" className="flex items-center gap-1">
          {mockApprovals.length} pending reviews
        </Badge>
      </div>

      {/* Approvals List */}
      <NotionList
        title="Pending Approvals"
        icon={<FileText size={16} />}
        items={mockApprovals.map(approval => ({ ...approval, title: approval.student }))}
        searchFields={["student", "role", "company"]}
        filterOptions={[
          {
            key: "company",
            label: "Company",
            options: [
              { value: "Acme Corp", label: "Acme Corp" },
              { value: "Globex", label: "Globex" },
              { value: "DataViz Inc", label: "DataViz Inc" },
              { value: "AppCraft", label: "AppCraft" },
              { value: "DesignStudio", label: "DesignStudio" }
            ]
          },
          {
            key: "department",
            label: "Department",
            options: [
              { value: "Computer Science", label: "Computer Science" },
              { value: "Information Technology", label: "Information Technology" }
            ]
          }
        ]}
        columns={[
          {
            key: "student",
            label: "Student",
            sortable: true,
            render: (item) => (
              <div>
                <div className="font-medium text-sm">{item.student}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Student ID: {item.id}
                </div>
              </div>
            )
          },
          {
            key: "role",
            label: "Position",
            sortable: true,
            render: (item) => (
              <div>
                <div className="font-medium text-sm">{item.role}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {item.company}
                </div>
              </div>
            )
          },
          {
            key: "department",
            label: "Department",
            render: (item) => (
              <div className="text-sm text-muted-foreground">
                {item.department}
              </div>
            )
          },
          {
            key: "cgpa",
            label: "CGPA",
            sortable: true,
            render: (item) => (
              <div className="text-sm font-medium">
                {item.cgpa}
              </div>
            )
          },
          {
            key: "status",
            label: "Status",
            render: (item) => (
              <Badge 
                className="text-xs px-2 py-1" 
                style={{ backgroundColor: '#f7d9d5', color: '#dc2626', border: 'none' }}
              >
                Pending Review
              </Badge>
            )
          },
          {
            key: "submittedAt",
            label: "Submitted",
            sortable: true,
            render: (item) => (
              <div className="text-sm text-muted-foreground">
                {formatDate(item.submittedAt)}
              </div>
            )
          },
          {
            key: "actions",
            label: "Actions",
            render: (item) => (
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 px-2 text-xs border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                    >
                      <XCircle size={12} className="mr-1" />
                      Reject
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Reject Application</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Rejecting application for <strong>{item.student}</strong> at <strong>{item.company}</strong>
                      </p>
                      <Textarea 
                        value={comment} 
                        onChange={(e) => setComment(e.target.value)} 
                        placeholder="Reason for rejection (optional)"
                        className="min-h-[100px]"
                      />
                    </div>
                    <DialogFooter>
                      <Button variant="outline" size="sm" onClick={() => toast.message("Cancelled")}>
                        Cancel
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                        onClick={() => handleReject(item.id, item.student)}
                      >
                        Reject Application
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 px-2 text-xs border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                  onClick={() => handleApprove(item.id, item.student)}
                >
                  <CheckCircle size={12} className="mr-1" />
                  Approve
                </Button>
              </div>
            )
          }
        ]}
      />
    </div>
  );
}


