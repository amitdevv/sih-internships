import React from "react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-background">
      <div className="w-full max-w-xl p-4">{children}</div>
    </div>
  );
}


