import {
  Edit,
  MoreHorizontal,
  RefreshCcw,
  Shield,
  Trash2,
  UserX,
} from "lucide-react";

import type { OrganizationMember } from "../types/member.type";

interface MemberTableProps {
  members: OrganizationMember[];
  loading?: boolean;

  onEdit?: (member: OrganizationMember) => void;
  onChangeRole?: (member: OrganizationMember) => void;
  onResendInvite?: (member: OrganizationMember) => void;
  onSuspend?: (member: OrganizationMember) => void;
  onDelete?: (member: OrganizationMember) => void;
}

export default function MemberTable({
  members,
  loading,
  onEdit,
  onChangeRole,
  onResendInvite,
  onSuspend,
  onDelete,
}: MemberTableProps) {
  if (loading) {
    return (
      <div className="rounded-xl border bg-white">
        <div className="p-10 text-center text-gray-500">Loading members...</div>
      </div>
    );
  }

  if (!members.length) {
    return (
      <div className="rounded-xl border bg-white">
        <div className="p-12 text-center">
          <h3 className="text-lg font-semibold text-gray-900">
            No members found
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Invite your first team member to start collaborating.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white">
      <table className="min-w-full">
        <thead className="border-b bg-gray-50">
          <tr className="text-left text-sm font-semibold text-gray-700">
            <th className="px-6 py-4">Member</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4">Department</th>
            <th className="px-6 py-4">Employee ID</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {members.map((member) => (
            <tr
              key={member._id}
              className="border-b last:border-none hover:bg-gray-50"
            >
              <td className="px-6 py-4">
                <div>
                  <p className="font-medium text-gray-900">
                    {member.firstName} {member.lastName}
                  </p>

                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
              </td>

              <td className="px-6 py-4">
                <span className="rounded-lg bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                  {member.role.name}
                </span>
              </td>

              <td className="px-6 py-4">{member.department || "-"}</td>

              <td className="px-6 py-4">{member.employeeId || "-"}</td>

              <td className="px-6 py-4">
                <StatusBadge status={member.status} />
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <ActionButton
                    icon={<Edit size={16} />}
                    title="Edit"
                    onClick={() => onEdit?.(member)}
                  />

                  <ActionButton
                    icon={<Shield size={16} />}
                    title="Change Role"
                    onClick={() => onChangeRole?.(member)}
                  />

                  {member.status === "INVITED" && (
                    <ActionButton
                      icon={<RefreshCcw size={16} />}
                      title="Resend Invite"
                      onClick={() => onResendInvite?.(member)}
                    />
                  )}

                  <ActionButton
                    icon={<UserX size={16} />}
                    title="Suspend"
                    onClick={() => onSuspend?.(member)}
                  />

                  <ActionButton
                    icon={<Trash2 size={16} />}
                    title="Delete"
                    onClick={() => onDelete?.(member)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

interface BadgeProps {
  status: OrganizationMember["status"];
}

function StatusBadge({ status }: BadgeProps) {
  const styles = {
    ACTIVE: "bg-green-100 text-green-700",
    INVITED: "bg-yellow-100 text-yellow-700",
    INACTIVE: "bg-gray-100 text-gray-700",
    SUSPENDED: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}

interface ActionButtonProps {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
}

function ActionButton({ icon, title, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-indigo-600"
    >
      {icon}
    </button>
  );
}
