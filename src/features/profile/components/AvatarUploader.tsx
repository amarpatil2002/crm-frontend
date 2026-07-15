import { Bell, Search, Menu } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import { logout } from "../../auth/redux/authSlice";

import ProfileDropdown from "../../profile/components/ProfileDropdown";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const dispatch = useAppDispatch();

  const { profile } = useAppSelector((state) => state.profile);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      {/* Left */}

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 transition hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-80 rounded-xl border border-slate-300 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-blue-600"
          />
        </div>
      </div>

      {/* Right */}

      <div className="flex items-center gap-4">
        {/* Notifications */}

        <button
          type="button"
          className="relative rounded-xl border border-slate-200 p-2 transition hover:bg-slate-100"
        >
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        {/* Profile */}

        {profile && (
          <ProfileDropdown profile={profile} onLogout={handleLogout} />
        )}
      </div>
    </header>
  );
};

export default Header;
