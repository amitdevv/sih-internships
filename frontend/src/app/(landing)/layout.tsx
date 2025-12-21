"use client";

import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/sonner";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ErrorBoundary>
        <main className="min-h-screen bg-white">{children}</main>
      </ErrorBoundary>
      <Toaster richColors position="top-right" />
    </>
  );
}
