import { Bell, Menu, Search, ChevronDown } from "lucide-react";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>

          <p className="text-sm text-slate-500">Welcome back, Amarjit 👋</p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search anything..."
            className="h-11 w-80 rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500 focus:bg-white"
          />
        </div>

        {/* Notifications */}
        <button className="relative rounded-xl border border-slate-200 bg-white p-2 hover:bg-slate-100">
          <Bell className="h-5 w-5 text-slate-600" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* User */}
        <button className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 hover:bg-slate-100">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="User"
            className="h-10 w-10 rounded-full"
          />

          <div className="hidden md:block">
            <p className="text-sm font-semibold text-slate-800">
              Amarjit Patil
            </p>

            <p className="text-xs text-slate-500">Admin</p>
          </div>

          <ChevronDown className="hidden h-4 w-4 text-slate-500 md:block" />
        </button>
      </div>
    </header>
  );
}
