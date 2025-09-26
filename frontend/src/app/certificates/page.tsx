"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockCertificates } from "@/mocks/fixtures/certificates";

export default function CertificatesPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Certificates</h1>
      <div className="grid gap-3 md:grid-cols-2">
        {mockCertificates.map((c) => (
          <Card key={c.id} className="p-4">
            <div className="text-sm text-muted-foreground">{c.company}</div>
            <div className="text-base font-medium">{c.title}</div>
            <div className="text-xs text-muted-foreground">Issued {c.issuedAt}</div>
            <div className="mt-3 flex gap-2">
              <Button asChild variant="outline" size="sm"><a href={c.url} target="_blank" rel="noreferrer">View</a></Button>
              <Button asChild variant="default" size="sm"><a href={c.url} download>Download</a></Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}


