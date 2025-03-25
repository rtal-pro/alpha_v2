import DashboardCardWrapper from "./_components/dashboard-card-wrapper";
import DashboardChartTask from "./_components/dashboard-chart-task";
import DashboardRadarTask from "./_components/dashboard-radar-task";
import DashboardTableTask from "./_components/dashboard-table-task";

import data from "./_components/data.json";

export default function DashboardPage() {
  return (
    <div>
      <DashboardCardWrapper />

      <div className='flex *:data-[slot=card]:shadow-xs gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card'>
        <DashboardChartTask />
        <DashboardRadarTask />
      </div>
      <DashboardTableTask data={data} />
    </div>
  );
}
