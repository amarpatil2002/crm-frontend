import { Mail, Phone, Briefcase, Building2 } from "lucide-react";

import type { OrganizationMember } from "../types/member.type";

interface MemberProfileCardProps {
  member: OrganizationMember;
}

export default function MemberProfileCard({ member }: MemberProfileCardProps) {
  const initials = `${member.user.firstName.charAt(0)}${member.user.lastName.charAt(0)}`;

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center text-center">
        {member.user.avatar ? (
          <img
            src={member.user.avatar}
            alt={member.user.fullName}
            className="h-20 w-20 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-700">
            {initials}
          </div>
        )}

        <h2 className="mt-4 text-xl font-semibold text-gray-900">
          {member.user.fullName}
        </h2>

        <p className="mt-1 text-sm text-gray-500">{member.role.name}</p>

        <span
          className={`mt-3 rounded-full px-3 py-1 text-xs font-semibold ${
            member.status === "ACTIVE"
              ? "bg-green-100 text-green-700"
              : member.status === "INVITED"
                ? "bg-yellow-100 text-yellow-700"
                : member.status === "SUSPENDED"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700"
          }`}
        >
          {member.status}
        </span>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-3">
          <Mail size={18} className="text-gray-400" />

          <div>
            <p className="text-xs text-gray-500">Email</p>

            <p className="text-sm font-medium">{member.user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Phone size={18} className="text-gray-400" />

          <div>
            <p className="text-xs text-gray-500">Phone</p>

            <p className="text-sm font-medium">{member.user.phone ?? "-"}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Briefcase size={18} className="text-gray-400" />

          <div>
            <p className="text-xs text-gray-500">Title</p>

            <p className="text-sm font-medium">{member.title ?? "-"}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Building2 size={18} className="text-gray-400" />

          <div>
            <p className="text-xs text-gray-500">Department</p>

            <p className="text-sm font-medium">{member.department ?? "-"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
