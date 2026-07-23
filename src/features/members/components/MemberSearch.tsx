import { Search, Plus } from "lucide-react";

import type { Role } from "../types/member.type";

interface MemberSearchProps {
  search: string;
  status: string;
  role: string;

  roles: Role[];

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onRoleChange: (value: string) => void;

  onInvite?: () => void;
}

export default function MemberSearch({
  search,
  status,
  role,
  roles,
  onSearchChange,
  onStatusChange,
  onRoleChange,
  onInvite,
}: MemberSearchProps) {
  return (
    <div className="rounded-sm  bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Search & Filters */}
        <div className="flex flex-1 flex-col gap-3 md:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-11 w-full rounded-lg border border-gray-300 pl-10 pr-4 text-sm outline-none transition focus:border-indigo-500"
            />
          </div>

          {/* Role */}
          <select
            value={role}
            onChange={(e) => onRoleChange(e.target.value)}
            className="h-11 rounded-lg border border-gray-300 px-3 text-sm outline-none focus:border-indigo-500"
          >
            <option value="">All Roles</option>

            {roles.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Invite Button */}
        {onInvite && (
          <button
            onClick={onInvite}
            className="flex h-11 items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Invite Member
          </button>
        )}
      </div>
    </div>
  );
}
