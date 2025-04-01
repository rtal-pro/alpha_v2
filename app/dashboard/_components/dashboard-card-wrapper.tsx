import DashboardCard from "@/components/dashboard-card";

const cards = [
  {
    title: "Total Revenue",
    value: "$1,250.00",
    description: "Revenue this month",
    percentage: "+12.5%",
    icon: "DollarSignIcon", // Pass the name of the icon as a string
    trendIcon: "TrendingUpIcon",
    footerText: "Visitors for the last 6 months",
  },
  {
    title: "Total Taxe",
    value: "$1,250.00",
    description: "Taxe this month",
    percentage: "+12.5%",
    icon: "HandCoinsIcon",
    trendIcon: "TrendingUpIcon",
    footerText: "Taxe paid for the last 6 months",
  },
  {
    title: "Total User",
    value: "239",
    description: "New user this month",
    percentage: "+1.5%",
    icon: "UserCircle2Icon",
    trendIcon: "TrendingUpIcon",
    footerText: "Visitors for the last 6 months",
  },
  {
    title: "Total Task Created",
    value: "2805",
    description: "Task created this month",
    percentage: "+52.5%",
    icon: "ClipboardListIcon",
    trendIcon: "TrendingUpIcon",
    footerText: "Tasks created for the last 6 months",
  },
];

export default function DashboardCardWrapper() {
  return (
    <div className='*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-4 gap-4 px-4  *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card'>
      {cards.map((card, index) => (
        <DashboardCard key={index} data={card} />
      ))}
    </div>
  );
}
