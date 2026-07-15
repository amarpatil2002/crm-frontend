import { useState } from "react";
import { User, KeyRound, LogOut, ChevronDown } from "lucide-react";

import type { Profile } from "../types/profile.type";

import ProfileModal from "./ProfileModal";

interface ProfileDropdownProps {
  profile: Profile;

  onLogout: () => void;
}

const ProfileDropdown = ({ profile, onLogout }: ProfileDropdownProps) => {
  const [open, setOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <div className="relative">
        {/* Trigger */}

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm transition hover:bg-slate-50"
        >
          <img
            src={
              profile.avatar ||
              `https://ui-avatars.com/api/?name=${profile.fullName}&background=4F46E5&color=fff`
            }
            alt={profile.fullName}
            className="h-11 w-11 rounded-full object-cover"
          />

          <div className="hidden text-left lg:block">
            <h4 className="text-sm font-semibold text-slate-900">
              {profile.fullName}
            </h4>

            <p className="max-w-[180px] truncate text-xs text-slate-500">
              {profile.email}
            </p>
          </div>

          <ChevronDown
            size={18}
            className={`text-slate-500 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown */}

        {open && (
          <div className="absolute right-0 top-16 z-50 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            {/* User Info */}
            <div className="border-b border-slate-200 px-6 py-5">
              <div className="flex items-center gap-4">
                <img
                  src={
                    profile.avatar ||
                    `https://ui-avatars.com/api/?name=${profile.fullName}&background=4F46E5&color=fff`
                  }
                  alt={profile.fullName}
                  className="h-16 w-16 rounded-full object-cover border border-slate-200"
                />

                <div className="min-w-0">
                  <h3 className="truncate text-lg font-semibold text-slate-900">
                    {profile.fullName}
                  </h3>

                  <p className="truncate text-sm text-slate-500">
                    {profile.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu */}
            <div className="py-2">
              <button
                onClick={() => {
                  setProfileOpen(true);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
              >
                <User size={18} />
                My Profile
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-indigo-50 hover:text-indigo-600"
              >
                <KeyRound size={18} />
                Change Password
              </button>
            </div>

            {/* Logout */}
            <div className="border-t border-slate-200 p-2">
              <button
                onClick={onLogout}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      <ProfileModal
        profile={profile}
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
    </>
  );
};

export default ProfileDropdown;
