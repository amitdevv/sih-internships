"use client";

import React from "react";
import { Card } from "@/components/ui/card";

export function Interviews({ items }: { items: Array<{ id: string; role: string; company: string; at: string }> }) {
  return (
    <Card className="border-0 bg-green-50 p-4">
      <h2 className="mb-2 text-base font-medium">Upcoming interviews</h2>
      <ul className="space-y-2 text-sm">
        {items.map((i) => (
          <li key={i.id} className="flex items-center justify-between">
            <span>
              <span className="font-medium">{i.role}</span> · {i.company}
            </span>
            <span className="text-green-800">{i.at}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}


