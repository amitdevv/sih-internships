"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export function Deadlines({ items }: { items: Array<{ id: string; role: string; company: string; due: string }> }) {
  return (
    <Card className="border-0 bg-red-50 p-4">
      <h2 className="mb-2 text-base font-medium">Upcoming deadlines</h2>
      <ul className="space-y-2">
        {items.map((d) => (
          <li
            key={d.id}
            className="flex items-center justify-between rounded-md px-2 py-1 text-sm"
          >
            <span>
              <span className="font-medium">{d.role}</span> · {d.company}
            </span>
            <Link href={`/opportunities/${d.id}`} className="underline">{d.due}</Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}



