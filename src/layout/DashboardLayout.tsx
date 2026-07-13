import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../features/dashboard/components/Sidebar";
import MobileSidebar from "../features/dashboard/components/MobileSidebar";
import DashboardHeader from "../features/dashboard/components/DashboardHeader";

export default function DashboardLayout() {
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

      {/* Main */}
      <main className="flex min-h-screen flex-col lg:ml-64">
        <DashboardHeader onMenuClick={() => setMobileSidebarOpen(true)} />

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
