"use client";

import { AppFrame } from "@/components/AppFrame";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/sonner";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ErrorBoundary>
        <AppFrame>{children}</AppFrame>
      </ErrorBoundary>
      <Toaster richColors position="top-right" />
    </>
  );
}
