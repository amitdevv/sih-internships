"use client";

import * as React from "react";

export function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div className="flex size-8 items-center justify-center rounded-full border border-border bg-[var(--card)] text-xs font-semibold">
      {initials}
    </div>
  );
}


