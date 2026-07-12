import { useState } from "react";

import Sidebar from "../components/Sidebar";
import MobileSidebar from "../components/MobileSidebar";
import DashboardHeader from "../components/DashboardHeader";

import StatsGrid from "../components/StatsGrid";
import LeadsChart from "../components/LeadsChart";
import DealsChart from "../components/DealsCharts";
import RecentLeadsTable from "../components/RecentLeads";
import UpcomingTasks from "../components/UpcomingTasks";

export default function DashboardPage() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar */}
      <MobileSidebar
        open={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="min-h-screen lg:ml-64">
        {/* Header */}
        <DashboardHeader onMenuClick={() => setMobileSidebarOpen(true)} />

        {/* Content */}
        <div className="space-y-6 p-6">
          {/* Stats */}
          <StatsGrid />

          {/* Charts */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <LeadsChart />
            </div>

            <DealsChart />
          </div>

          {/* Bottom */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <RecentLeadsTable />
            </div>

            <UpcomingTasks />
          </div>
        </div>
      </main>
    </div>
  );
}
