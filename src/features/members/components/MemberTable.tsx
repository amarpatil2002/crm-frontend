import type { OrganizationMember } from "../types/member.type";
import MemberRow from "./MemberRow";

interface MemberTableProps {
  members?: OrganizationMember[];
  loading?: boolean;

  onEdit?: (member: OrganizationMember) => void;
  onChangeRole?: (member: OrganizationMember) => void;
  onResendInvite?: (member: OrganizationMember) => void;
  onSuspend?: (member: OrganizationMember) => void;
  onDelete?: (member: OrganizationMember) => void;
}

export default function MemberTable({
  members = [],
  loading = false,
  onEdit,
  onChangeRole,
  onResendInvite,
  onSuspend,
  onDelete,
}: MemberTableProps) {
  if (loading) {
    return (
      <div className="rounded-xl border bg-white">
        <div className="flex h-80 items-center justify-center">
          <p className="text-sm text-gray-500">Loading members...</p>
        </div>
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="rounded-xl border bg-white">
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
    <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr className="text-left text-sm font-semibold text-gray-700">
            <th className="w-16 px-6 py-4">#</th>
            <th className="px-6 py-4">Member</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4">Department</th>
            <th className="px-6 py-4">Employee ID</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100 bg-white">
          {members.map((member) => (
            <MemberRow
              key={member._id}
              member={member}
              onEdit={onEdit}
              onChangeRole={onChangeRole}
              onResendInvite={onResendInvite}
              onSuspend={onSuspend}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
