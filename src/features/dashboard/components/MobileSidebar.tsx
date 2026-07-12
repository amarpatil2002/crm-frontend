import {
  X,
  LayoutDashboard,
  Building2,
  Users,
  BriefcaseBusiness,
  ClipboardList,
  CalendarCheck,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Organization",
    icon: Building2,
    path: "/dashboard/organization",
  },
  {
    title: "Leads",
    icon: Users,
    path: "/dashboard/leads",
  },
  {
    title: "Deals",
    icon: BriefcaseBusiness,
    path: "/dashboard/deals",
  },
  {
    title: "Tasks",
    icon: ClipboardList,
    path: "/dashboard/tasks",
  },
  {
    title: "Calendar",
    icon: CalendarCheck,
    path: "/dashboard/calendar",
  },
];

export default function MobileSidebar({ open, onClose }: MobileSidebarProps) {
  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className={clsx(
          "fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Sidebar */}

      <aside
        className={clsx(
          "fixed left-0 top-0 z-50 h-screen w-72 bg-white shadow-xl transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header */}

        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white">
              C
            </div>

            <div>
              <h2 className="font-bold text-slate-800">CRM Pro</h2>

              <p className="text-xs text-slate-500">Sales Management</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}

        <nav className="space-y-2 p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-3 rounded-xl px-4 py-3 transition",
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-600 hover:bg-slate-100",
                  )
                }
              >
                <Icon size={20} />

                {item.title}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom */}

        <div className="absolute bottom-0 w-full border-t border-slate-200 p-4">
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 hover:bg-slate-100">
            <Settings size={20} />
            Settings
          </button>

          <button className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 hover:bg-red-50">
            <LogOut size={20} />
            Logout
          </button>

          <div className="mt-5 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <img
              src="https://i.pravatar.cc/150?img=12"
              className="h-11 w-11 rounded-full"
            />

            <div>
              <p className="font-semibold text-slate-800">Amarjit Patil</p>

              <p className="text-xs text-slate-500">Administrator</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
