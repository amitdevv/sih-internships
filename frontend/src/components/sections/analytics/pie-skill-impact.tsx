"use client";

import React from "react";
import { PieChart, Pie, LabelList, ResponsiveContainer, Cell } from "recharts";
import { Card } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";

const chartData = [
  { skill: "React", value: 275 },
  { skill: "SQL", value: 200 },
  { skill: "DSA", value: 187 },
  { skill: "Node", value: 173 },
  { skill: "Other", value: 90 },
];

// Single brand color with progressive tints
const base = [25, 60, 184]; // #193cb8
const shades = [1, 0.85, 0.7, 0.55, 0.4].map((a) => `rgba(${base[0]},${base[1]},${base[2]},${a})`);

const chartConfig: ChartConfig = {
  value: { label: "Shortlists" },
  React: { label: "React" },
  SQL: { label: "SQL" },
  DSA: { label: "Data Structures" },
  Node: { label: "Node.js" },
  Other: { label: "Other" },
};

export function PieSkillImpact() {
  return (
    <Card className="p-4 cursor-default select-none">
      <div className="text-base font-medium">Top skills impact</div>
      <ChartContainer config={chartConfig} className="mx-auto max-w-sm">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="value" hideLabel />} />
            <Pie data={chartData} dataKey="value" nameKey="skill" labelLine={false} isAnimationActive={false}>
              {chartData.map((_, i) => (
                <Cell key={`cell-${i}`} fill={shades[i % shades.length]} />
              ))}
              <LabelList dataKey="skill" position="outside" stroke="none" fontSize={12} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </Card>
  );
}


