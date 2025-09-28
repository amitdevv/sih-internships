"use client";

import { AppFrame } from "@/components/AppFrame";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/sonner";
import { PageTitle } from "@/components/page-title";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageTitle />
      <ErrorBoundary>
        <AppFrame>{children}</AppFrame>
      </ErrorBoundary>
      <Toaster richColors position="top-right" />
    </>
  );
}
