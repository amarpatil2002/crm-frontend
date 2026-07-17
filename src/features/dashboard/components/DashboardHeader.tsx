import { useEffect } from "react";
import { Bell, Menu, Search } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import { fetchProfile } from "../../profile/redux/profileSlice";
import ProfileDropdown from "../../profile/components/ProfileDropdown";
import { logout } from "../../../features/auth/redux/authSlice";
import { useNavigate } from "react-router-dom";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export default function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  const dispatch = useAppDispatch();

  const { profile, loading } = useAppSelector((state) => state.profile);
  const { user } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) {
      dispatch(fetchProfile());
    }
  }, [dispatch, profile]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>

          <p className="text-sm text-slate-500">
            Welcome back,
            {profile ? ` ${profile.firstName} 👋` : " User 👋"}
          </p>
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
        <button className="relative rounded-xl border border-slate-200 bg-white p-2 transition hover:bg-slate-100">
          <Bell className="h-5 w-5 text-slate-600" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Profile */}
        {loading ? (
          <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />
        ) : (
          profile && (
            <ProfileDropdown profile={profile} onLogout={handleLogout} />
          )
        )}
      </div>
    </header>
  );
}
