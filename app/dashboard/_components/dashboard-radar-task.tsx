"use client";

import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "Cleaning", desktop: 5, mobile: 11 },
  { month: "Plumbing", desktop: 25, mobile: 2 },
  { month: "Electrical", desktop: 35, mobile: 22 },
  { month: "Carpentry", desktop: 2, mobile: 0 },
  { month: "Landscaping", desktop: 11, mobile: 32 },
  { month: "Painting", desktop: 12, mobile: 6 },
  { month: "Pest Control", desktop: 1, mobile: 0 },
  { month: "HVAC", desktop: 28, mobile: 23 },
  { month: "Roofing", desktop: 13, mobile: 8 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function DashboardRadarTask() {
  return (
    <Card className='w-5xl mt-4'>
      <CardHeader className='items-center pb-4'>
        <CardTitle>Radar Chart - Lines Only</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className='pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[400px]'>
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='line' />}
            />
            <PolarAngleAxis dataKey='month' />
            <PolarGrid radialLines={false} />
            <Radar
              dataKey='desktop'
              fill='var(--color-primary)'
              fillOpacity={0}
              stroke='var(--color-primary)'
              strokeWidth={2}
            />
            <Radar
              dataKey='mobile'
              fill='var(--color-secondary)'
              fillOpacity={0}
              stroke='var(--color-secondary)'
              strokeWidth={2}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 font-medium leading-none'>
          Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
        </div>
        <div className='flex items-center gap-2 leading-none text-muted-foreground'>
          January - June 2024
        </div>
      </CardFooter>
    </Card>
  );
}
