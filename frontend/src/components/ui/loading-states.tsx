"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, RefreshCw, Wifi, WifiOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  className?: string;
  message?: string;
}

export function LoadingState({ className, message = "Loading..." }: LoadingStateProps) {
  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SkeletonList({ count = 3, className }: { count?: number; className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
  variant?: "default" | "compact" | "minimal";
}

export function ErrorState({ 
  title = "Something went wrong",
  message = "An error occurred while loading this content.",
  onRetry,
  retryLabel = "Try Again",
  className,
  variant = "default"
}: ErrorStateProps) {
  if (variant === "minimal") {
    return (
      <div className={cn("flex items-center gap-2 text-sm text-destructive", className)}>
        <AlertCircle className="h-4 w-4" />
        <span>{message}</span>
        {onRetry && (
          <Button variant="link" size="sm" onClick={onRetry} className="p-0 h-auto">
            {retryLabel}
          </Button>
        )}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center justify-center p-4", className)}>
        <div className="text-center space-y-2">
          <AlertCircle className="h-6 w-6 text-destructive mx-auto" />
          <p className="text-sm text-muted-foreground">{message}</p>
          {onRetry && (
            <Button size="sm" onClick={onRetry}>
              <RefreshCw className="h-4 w-4 mr-2" />
              {retryLabel}
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <div className="text-center space-y-4 max-w-sm">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
        <div className="space-y-2">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
        {onRetry && (
          <Button onClick={onRetry}>
            <RefreshCw className="h-4 w-4 mr-2" />
            {retryLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

interface EmptyStateProps {
  title?: string;
  message?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  icon?: React.ReactNode;
}

export function EmptyState({ 
  title = "No data found",
  message = "There's nothing to show here yet.",
  action,
  className,
  icon
}: EmptyStateProps) {
  return (
    <div className={cn("flex items-center justify-center p-8", className)}>
      <div className="text-center space-y-4 max-w-sm">
        {icon || (
          <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center mx-auto">
            <div className="h-6 w-6 bg-muted-foreground/30 rounded"></div>
          </div>
        )}
        <div className="space-y-2">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
        {action && (
          <Button onClick={action.onClick}>
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
}

interface NetworkStatusProps {
  isOnline: boolean;
  className?: string;
}

export function NetworkStatus({ isOnline, className }: NetworkStatusProps) {
  if (isOnline) return null;

  return (
    <div className={cn("bg-yellow-50 border-l-4 border-yellow-400 p-4", className)}>
      <div className="flex items-center">
        <WifiOff className="h-5 w-5 text-yellow-400 mr-2" />
        <div>
          <p className="text-sm font-medium text-yellow-800">
            You&apos;re offline
          </p>
          <p className="text-sm text-yellow-700">
            Some features may not work properly. Check your internet connection.
          </p>
        </div>
      </div>
    </div>
  );
}

// Hook for network status
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

// Async wrapper component
interface AsyncWrapperProps {
  isLoading: boolean;
  error: Error | null;
  onRetry?: () => void;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  className?: string;
}

export function AsyncWrapper({
  isLoading,
  error,
  onRetry,
  children,
  loadingComponent,
  errorComponent,
  className
}: AsyncWrapperProps) {
  if (isLoading) {
    return (
      <>
        {loadingComponent || <LoadingState className={className} />}
      </>
    );
  }

  if (error) {
    return (
      <>
        {errorComponent || (
          <ErrorState 
            message={error.message}
            onRetry={onRetry}
            className={className}
          />
        )}
      </>
    );
  }

  return <>{children}</>;
}
