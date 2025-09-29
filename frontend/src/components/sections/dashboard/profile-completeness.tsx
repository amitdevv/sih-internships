"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ProfileCompleteness({ name, percent }: { name: string; percent: number }) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-muted-foreground">Welcome,</div>
          <div className="text-base font-medium">{name}</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold">{percent}%</div>
          <div className="text-xs text-muted-foreground">Profile complete</div>
        </div>
      </div>
      <div className="mt-3">
        <Progress value={percent} />
      </div>
      <div className="mt-3 flex gap-2">
        <Link href="/profile" className="text-sm font-medium">
          <Button variant="default" className="bg-[#90c0ee] hover:bg-[#bdd9f5] cursor-pointer text-[#0a2642]" size="sm">Complete profile</Button>
        </Link>
        <Link href="/opportunities" className="text-sm">
          <Button variant="outline" size="sm">Browse roles</Button>
        </Link>
      </div>
    </Card>
  );
}


