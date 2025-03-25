"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
  { month: "Cleaning", done: 5, failed: 11 },
  { month: "Plumbing", done: 25, failed: 2 },
  { month: "Electrical", done: 35, failed: 22 },
  { month: "Carpentry", done: 2, failed: 0 },
  { month: "Landscaping", done: 11, failed: 32 },
  { month: "Painting", done: 12, failed: 6 },
  { month: "Pest Control", done: 1, failed: 0 },
  { month: "HVAC", done: 28, failed: 23 },
  { month: "Roofing", done: 13, failed: 8 },
];

const chartConfig = {
  done: {
    label: "done",
    color: "hsl(var(--color-primary))",
  },
  failed: {
    label: "failed",
    color: "hsl(var(--color-secondary))",
  },
} satisfies ChartConfig;

export default function DashboardChartTask() {
  return (
    <Card className='md:w-5xl mt-4'>
      <CardHeader>
        <CardTitle>Taches</CardTitle>
        <CardDescription>Task done and in progress this month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='dot' />}
            />
            <Area
              dataKey='failed'
              type='natural'
              fill='var(--color-primary)'
              fillOpacity={0.4}
              stroke='var(--color-primary)'
              stackId='a'
            />
            <Area
              dataKey='failed'
              type='natural'
              fill='var(--color-secondary)'
              fillOpacity={0.4}
              stroke='var(--color-secondary)'
              stackId='a'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className='flex w-full items-start gap-2 text-sm'>
          <div className='grid gap-2'>
            <div className='flex items-center gap-2 font-medium leading-none'>
              Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
            </div>
            <div className='flex items-center gap-2 leading-none text-muted-foreground'>
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
