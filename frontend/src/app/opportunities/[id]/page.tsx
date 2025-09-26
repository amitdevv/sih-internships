"use client";

import React from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { mockOpportunities } from "@/mocks/fixtures/opportunities";

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
        <div className="mt-3 text-sm text-muted-foreground">
          Short description with required skills and deadline. Why you match: based on mock skills.
        </div>
        <div className="mt-4">
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-sm font-medium">Apply in 1 click</button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Apply to {job.title}</DialogTitle>
                <DialogDescription>Optional cover letter</DialogDescription>
              </DialogHeader>
              <Textarea value={cover} onChange={(e) => setCover(e.target.value)} placeholder="Write a short note (optional)" rows={5} />
              <DialogFooter>
                <button className="text-sm">Cancel</button>
                <button className="text-sm font-medium">Submit</button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </div>
  );
}


