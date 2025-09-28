"use client";

import * as React from "react";
import { Tooltip as RechartsTooltip, TooltipProps } from "recharts";

export type ChartConfig = Record<
  string,
  { label?: string; color?: string }
>;

export function ChartContainer({
  children,
  className,
  config,
}: {
  children: React.ReactNode;
  className?: string;
  config?: ChartConfig;
}) {
  return (
    <div className={className} data-chart-config={JSON.stringify(config ?? {})}>
      {children}
    </div>
  );
}

export function ChartTooltip(props: TooltipProps<number, string>) {
  return <RechartsTooltip {...(props as any)} />;
}

type ChartTooltipContentProps = TooltipProps<number, string> & {
  labelKey?: string;
  nameKey?: string;
  hideLabel?: boolean;
};

export function ChartTooltipContent({ active, payload, label, labelKey, nameKey, hideLabel }: ChartTooltipContentProps & { payload?: any[]; label?: string }) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-md border border-border bg-[var(--card)] p-2 text-xs">
      {!hideLabel && <div className="mb-1 font-medium">{labelKey ? (item.payload as any)?.[labelKey] : label}</div>}
      <div className="flex items-center gap-2">
        <span className="inline-block size-2 rounded-full" style={{ background: (item as any).color }} />
        <span>{nameKey ? (item.payload as any)?.[nameKey] : item.name}: {item.value as any}</span>
      </div>
    </div>
  );
}


