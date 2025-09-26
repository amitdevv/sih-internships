"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const [email, setEmail] = React.useState(true);
  const [sms, setSms] = React.useState(false);

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Settings</h1>
      <Card className="p-4">
        <div className="space-y-3">
          <label className="flex items-center justify-between text-sm">
            Email notifications
            <Switch checked={email} onCheckedChange={setEmail} />
          </label>
          <label className="flex items-center justify-between text-sm">
            SMS notifications
            <Switch checked={sms} onCheckedChange={setSms} />
          </label>
        </div>
      </Card>
    </div>
  );
}


