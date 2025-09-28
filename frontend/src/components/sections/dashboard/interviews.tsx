"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Building2 } from "lucide-react";

export function Interviews({ items }: { items: Array<{ id: string; role: string; company: string; at: string }> }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Tomorrow";
    if (diffDays < 7) return `In ${diffDays} days`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getUrgency = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) return "urgent";
    if (diffDays <= 3) return "soon";
    return "normal";
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Calendar size={16} />
          Upcoming Interviews
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((interview) => {
          const urgency = getUrgency(interview.at);
          return (
            <div key={interview.id} className="p-2.5 rounded-md border bg-card hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-sm truncate">{interview.role}</h4>
                    <Badge 
                      variant="secondary"
                      className={`text-xs ${
                        urgency === "urgent" 
                          ? "bg-orange-100 text-orange-700 border-orange-200" 
                          : urgency === "soon" 
                          ? "bg-blue-100 text-blue-700 border-blue-200"
                          : "bg-gray-100 text-gray-700 border-gray-200"
                      }`}
                    >
                      {urgency === "urgent" ? "Urgent" : urgency === "soon" ? "Soon" : "Scheduled"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                    <Building2 size={12} />
                    <span>{interview.company}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar size={12} />
                      <span>{formatDate(interview.at)}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock size={12} />
                      <span>{formatTime(interview.at)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {items.length === 0 && (
          <div className="text-center py-6 text-muted-foreground text-sm">
            No upcoming interviews
          </div>
        )}
      </CardContent>
    </Card>
  );
}


