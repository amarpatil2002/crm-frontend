import { ChevronRight } from "lucide-react";

import type { OrganizationMember } from "../types/member.type";
import MemberStatusBadge from "./MemberStatusBadge";

interface MemberTableProps {
  members?: OrganizationMember[];
  loading?: boolean;

  onSelectMember?: (member: OrganizationMember) => void;
}

export default function MemberTable({
  members = [],
  loading = false,
  onSelectMember,
}: MemberTableProps) {
  if (loading) {
    return (
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="flex h-80 items-center justify-center">
          <p className="text-sm text-gray-500">Loading members...</p>
        </div>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="rounded-xl border bg-white shadow-sm">
        <div className="flex h-80 flex-col items-center justify-center">
          <h3 className="text-lg font-semibold text-gray-900">
            No Members Found
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Invite your first team member to start collaborating.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b bg-gray-50">
            <tr className="text-left text-sm font-semibold text-gray-700">
              <th className="w-16 px-6 py-4">#</th>
              <th className="px-6 py-4">Member</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Employee ID</th>
              <th className="px-6 py-4">Status</th>
              <th className="w-12 px-4 py-4"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {members.map((member, index) => (
              <tr
                key={member._id}
                onClick={() => onSelectMember?.(member)}
                className="group cursor-pointer transition-colors duration-200 hover:bg-indigo-50"
              >
                {/* Index */}
                <td className="px-6 py-5 text-sm text-gray-500">{index + 1}</td>

                {/* Member */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
                      {member.user.firstName.charAt(0)}
                      {member.user.lastName.charAt(0)}
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900 transition group-hover:text-indigo-600">
                        {member.user.fullName}
                      </p>

                      <p className="text-sm text-gray-500">
                        {member.user.email}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Role */}
                <td className="px-6 py-5">
                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
                    {member.role.name}
                  </span>
                </td>

                {/* Department */}
                <td className="px-6 py-5 text-sm text-gray-700">
                  {member.department ?? "-"}
                </td>

                {/* Employee ID */}
                <td className="px-6 py-5 text-sm text-gray-700">
                  {member.employeeId ?? "-"}
                </td>

                {/* Status */}
                <td className="px-6 py-5">
                  <MemberStatusBadge status={member.status} />
                </td>

                {/* Arrow */}
                <td className="px-4 py-5">
                  <ChevronRight
                    size={18}
                    className="text-gray-400 transition-all duration-200 group-hover:translate-x-1 group-hover:text-indigo-600"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
