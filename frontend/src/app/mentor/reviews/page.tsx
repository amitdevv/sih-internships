"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { mockApprovals } from "@/mocks/fixtures/approvals";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { StatusChip } from "@/components/sections/applications/status-chip";
import { Button } from "@/components/ui/button";

export default function MentorReviewsPage() {
  const [comment, setComment] = React.useState("");

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Mentor Approvals</h1>
      <div className="space-y-3">
        {mockApprovals.map((a) => (
          <Card key={a.id} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="text-sm text-muted-foreground">{a.student}</div>
              <div className="text-base font-medium">{a.role} · {a.company}</div>
              <StatusChip status="MentorPending" />
            </div>
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                  >
                    Reject
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reject application</DialogTitle>
                  </DialogHeader>
                  <Textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Reason (optional)" />
                  <DialogFooter>
                    <Button variant="outline" size="sm" onClick={() => toast.message("Cancelled")}>Cancel</Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
                      onClick={() => toast.error("Rejected")}
                    >
                      Reject
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button
                variant="outline"
                size="sm"
                className="border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                onClick={() => toast.success("Approved")}
              >
                Approve
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}


