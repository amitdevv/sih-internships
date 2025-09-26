"use client";

import React from "react";
import { mockNotifications } from "@/mocks/fixtures/notifications";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function InboxDropdown() {
  const unread = mockNotifications.filter((n) => !n.read).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Notifications">
          <Bell size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Inbox {unread ? `(${unread})` : ""}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {mockNotifications.map((n) => (
          <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-0.5">
            <span className="text-sm font-medium leading-none">{n.title}</span>
            <span className="text-xs text-muted-foreground">{n.createdAt} ago</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


