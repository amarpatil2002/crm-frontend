import type { OrganizationMember } from "../types/member.type";
import MemberStatusBadge from "./MemberStatusBadge";

interface MemberTableProps {
  members: OrganizationMember[];
  loading?: boolean;

  onSelectMember?: (member: OrganizationMember) => void;
}

export default function MemberTable({
  members,
  loading = false,
  onSelectMember,
}: MemberTableProps) {
  if (loading) {
    return (
      <div className="border bg-white">
        <div className="flex h-80 items-center justify-center">
          Loading members...
        </div>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="border bg-white">
        <div className="flex h-80 flex-col items-center justify-center">
          <h3 className="text-lg font-semibold">No Members Found</h3>

          <p className="mt-2 text-sm text-gray-500">
            Invite your first member.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border bg-white">
      <table className="min-w-full">
        <thead className="border-b bg-gray-50">
          <tr className="text-left text-sm font-semibold">
            <th className="px-6 py-4">#</th>
            <th className="px-6 py-4">Member</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4">Department</th>
            <th className="px-6 py-4">Employee ID</th>
            <th className="px-6 py-4">Status</th>
          </tr>
        </thead>

        <tbody>
          {members.map((member, index) => (
            <tr
              key={member._id}
              onClick={() => onSelectMember?.(member)}
              className="cursor-pointer border-b transition hover:bg-indigo-50"
            >
              {/* Index */}

              <td className="px-6 py-4">{index + 1}</td>

              {/* Member */}

              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
                    {member.user.firstName.charAt(0)}
                    {member.user.lastName.charAt(0)}
                  </div>

                  <div>
                    <p className="font-medium">{member.user.fullName}</p>

                    <p className="text-sm text-gray-500">{member.user.email}</p>
                  </div>
                </div>
              </td>

              {/* Role */}

              <td className="px-6 py-4">{member.role.name}</td>

              {/* Department */}

              <td className="px-6 py-4">{member.department ?? "-"}</td>

              {/* Employee */}

              <td className="px-6 py-4">{member.employeeId ?? "-"}</td>

              {/* Status */}

              <td className="px-6 py-4">
                <MemberStatusBadge status={member.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
