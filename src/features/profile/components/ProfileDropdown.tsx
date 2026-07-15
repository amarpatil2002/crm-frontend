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
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 transition hover:bg-slate-50"
        >
          <img
            src={
              profile.avatar ||
              `https://ui-avatars.com/api/?name=${profile.fullName}`
            }
            alt={profile.fullName}
            className="h-10 w-10 rounded-full object-cover"
          />

          <div className="hidden text-left lg:block">
            <p className="text-sm font-semibold text-slate-900">
              {profile.fullName}
            </p>

            <p className="text-xs text-slate-500">{profile.email}</p>
          </div>

          <ChevronDown
            size={18}
            className={`transition ${open ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown */}

        {open && (
          <div className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
            {/* User */}

            <div className="border-b border-slate-200 px-5 py-4">
              <div className="flex items-center gap-3">
                <img
                  src={
                    profile.avatar ||
                    `https://ui-avatars.com/api/?name=${profile.fullName}`
                  }
                  alt={profile.fullName}
                  className="h-14 w-14 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-semibold text-slate-900">
                    {profile.fullName}
                  </h3>

                  <p className="text-sm text-slate-500">{profile.email}</p>
                </div>
              </div>
            </div>

            {/* Menu */}

            <button
              type="button"
              onClick={() => {
                setProfileOpen(true);

                setOpen(false);
              }}
              className="flex w-full items-center gap-3 px-5 py-3 text-sm text-slate-700 transition hover:bg-slate-100"
            >
              <User size={18} />
              My Profile
            </button>

            <button
              type="button"
              onClick={() => {
                setOpen(false);

                // Open Change Password Modal
              }}
              className="flex w-full items-center gap-3 px-5 py-3 text-sm text-slate-700 transition hover:bg-slate-100"
            >
              <KeyRound size={18} />
              Change Password
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="flex w-full items-center gap-3 border-t border-slate-200 px-5 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={18} />
              Logout
            </button>
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
