"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import * as LucideIcons from "lucide-react"; // Import all icons dynamically

interface DashboardCardProps {
  data: {
    title: string;
    value: string;
    description: string;
    percentage: string;
    icon: string; // Store icon name as a string
    trendIcon: string; // Store trend icon name as a string
    footerText: string;
  };
}

export default function DashboardCard({ data }: DashboardCardProps) {
  const { title, value, description, percentage, icon, trendIcon, footerText } = data;

  // Dynamically get icons from Lucide
  const IconComponent = (LucideIcons[icon as keyof typeof LucideIcons] as React.ElementType) || LucideIcons.HelpCircle;
  const TrendIconComponent = (LucideIcons[trendIcon as keyof typeof LucideIcons] as React.ElementType) || LucideIcons.HelpCircle;

  return (
    <Card className='@container/card'>
      <CardHeader className='relative'>
        <CardDescription>{description}</CardDescription>
        <CardTitle className='@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'>
          {value}
        </CardTitle>
        <div className='absolute right-4 top-4'>
          <Badge className='flex gap-1 rounded-lg text-xs'>
            <TrendIconComponent className='size-3' />
            {percentage}
          </Badge>
        </div>
      </CardHeader>
      <CardFooter className='flex-col items-start gap-1 text-sm'>
        <div className='line-clamp-1 flex gap-2 font-medium'>
        <IconComponent className='size-4' />
          {title} 
        </div>
        <div className='text-muted-foreground'>{footerText}</div>
      </CardFooter>
    </Card>
  );
}
