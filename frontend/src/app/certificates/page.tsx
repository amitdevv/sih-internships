"use client";

import React from "react";
import { NotionList } from "@/components/sections/dashboard/notion-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, ExternalLink, Download } from "lucide-react";
import { mockCertificates } from "@/mocks/fixtures/certificates";

export default function CertificatesPage() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return { bg: '#d7e6dd', color: '#166534' };
      case "pending": return { bg: '#f7d9d5', color: '#dc2626' };
      case "completed": return { bg: '#d3e4f1', color: '#1e40af' };
      default: return { bg: '#e6e5e3', color: '#374151' };
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Certificates</h1>
        <Badge variant="outline" className="flex items-center gap-1">
          {mockCertificates.length} certificates
        </Badge>
      </div>

      {/* Certificates List */}
      <NotionList
        title="My Certificates"
        icon={<Award size={16} />}
        items={mockCertificates}
        searchFields={["title", "company", "status"]}
        filterOptions={[
          {
            key: "status",
            label: "Status",
            options: [
              { value: "verified", label: "Verified" },
              { value: "completed", label: "Completed" },
              { value: "pending", label: "Pending" }
            ]
          }
        ]}
        columns={[
          {
            key: "title",
            label: "Certificate",
            sortable: true,
            render: (item) => (
              <div>
                <div className="font-medium text-sm">{item.title}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {item.company}
                </div>
              </div>
            )
          },
          {
            key: "status",
            label: "Status",
            render: (item) => {
              const colors = getStatusColor(item.status || "completed");
              return (
                <Badge 
                  className="text-xs px-2 py-1" 
                  style={{ backgroundColor: colors.bg, color: colors.color, border: 'none' }}
                >
                  {item.status || "completed"}
                </Badge>
              );
            }
          },
          {
            key: "issuedAt",
            label: "Issued Date",
            sortable: true,
            render: (item) => (
              <div className="text-sm text-muted-foreground">
                {formatDate(item.issuedAt)}
              </div>
            )
          },
          {
            key: "actions",
            label: "Actions",
            render: (item) => (
              <div className="flex gap-2">
                <Button 
                  asChild 
                  variant="outline" 
                  size="sm"
                  className="h-7 px-2 text-xs"
                >
                  <a href={item.url} target="_blank" rel="noreferrer">
                    <ExternalLink size={12} className="mr-1" />
                    View
                  </a>
                </Button>
                <Button 
                  asChild 
                  variant="default" 
                  size="sm"
                  className="h-7 px-2 text-xs"
                >
                  <a href={item.url} download>
                    <Download size={12} className="mr-1" />
                    Download
                  </a>
                </Button>
              </div>
            )
          }
        ]}
      />
    </div>
  );
}


