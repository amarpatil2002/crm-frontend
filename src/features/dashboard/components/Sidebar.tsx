import {
  LayoutDashboard,
  Building2,
  Users,
  BriefcaseBusiness,
  CalendarCheck,
  ClipboardList,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { logout } from "../../auth/redux/authSlice";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Organization",
    icon: Building2,
    path: "/organization",
  },
  {
    title: "Leads",
    icon: Users,
    path: "/leads",
  },
  {
    title: "Deals",
    icon: BriefcaseBusiness,
    path: "/deals",
  },
  {
    title: "Tasks",
    icon: ClipboardList,
    path: "/tasks",
  },
  {
    title: "Calendar",
    icon: CalendarCheck,
    path: "/calendar",
  },
];

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { profile, loading, error } = useAppSelector((state) => state.profile);

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login", { replace: true });
  };

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-slate-200 bg-white lg:flex lg:flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-slate-200 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg font-bold text-white shadow-md">
          C
        </div>

        <div className="ml-3">
          <h2 className="text-lg font-bold text-slate-800">CRM Pro</h2>

          <p className="text-xs text-slate-500">Sales Management</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                clsx(
                  "group flex items-center justify-between rounded-xl px-4 py-3 transition-all",
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon
                      size={20}
                      className={clsx(
                        isActive
                          ? "text-indigo-600"
                          : "text-slate-500 group-hover:text-slate-700",
                      )}
                    />

                    <span className="font-medium">{item.title}</span>
                  </div>

                  {isActive && (
                    <ChevronRight size={18} className="text-indigo-600" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-slate-200 p-4">
        <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100">
          <Settings size={20} />
          <span>Settings</span>
        </button>

        <button
          onClick={handleLogout}
          className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-500 transition hover:bg-red-50"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>

        {/* User */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <div className="flex items-center gap-3">
            <img
              src={
                profile?.avatar ||
                `https://ui-avatars.com/api/?name=${profile?.fullName}&background=4F46E5&color=fff`
              }
              alt={profile?.fullName}
              className="h-11 w-11 rounded-full object-cover"
            />

            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-slate-800">
                {profile?.fullName}
              </p>

              <p className="truncate text-xs text-slate-500">
                {profile?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
