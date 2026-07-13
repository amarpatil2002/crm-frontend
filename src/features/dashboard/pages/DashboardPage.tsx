import { useState } from "react";

import MobileSidebar from "../components/MobileSidebar";

import StatsGrid from "../components/StatsGrid";
import LeadsChart from "../components/LeadsChart";
import DealsChart from "../components/DealsCharts";
import RecentLeadsTable from "../components/RecentLeads";
import UpcomingTasks from "../components/UpcomingTasks";

export default function DashboardPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <>
      <MobileSidebar
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <div className="space-y-6">
        <StatsGrid />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <LeadsChart />
          </div>

          <DealsChart />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <RecentLeadsTable />
          </div>

          <UpcomingTasks />
        </div>
      </div>
    </>
  );
}
