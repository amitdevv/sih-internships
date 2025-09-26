"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { mockOpportunities } from "@/mocks/fixtures/opportunities";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/sections/applications/status-chip";

export default function OpportunityDetailPage() {
  const params = useParams<{ id: string }>();
  const job = mockOpportunities.find((o) => o.id === params?.id);
  const [cover, setCover] = React.useState("");

  if (!job) {
    return <div className="text-sm text-muted-foreground">Not found.</div>;
  }

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h1 className="text-lg font-semibold">{job.title}</h1>
        <p className="text-sm text-muted-foreground">{job.company} · {job.mode} · Stipend {job.stipend}</p>
        <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
          <StatusChip status="Shortlisted" />
          Short description with required skills and deadline. Why you match: based on mock skills.
        </div>
        <div className="mt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">Apply in 1 click</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Apply to {job.title}</DialogTitle>
                <DialogDescription>Optional cover letter</DialogDescription>
              </DialogHeader>
              <Textarea value={cover} onChange={(e) => setCover(e.target.value)} placeholder="Write a short note (optional)" rows={5} />
              <DialogFooter>
                <Button variant="outline" size="sm">Cancel</Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => toast.success("Application submitted — waiting for mentor approval")}
                >
                  Submit
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </div>
  );
}


