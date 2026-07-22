import { Edit, RefreshCcw, Shield, Trash2, UserX } from "lucide-react";

import type { OrganizationMember } from "../types/member.type";

interface MemberRowProps {
  member: OrganizationMember;

  onEdit?: (member: OrganizationMember) => void;
  onChangeRole?: (member: OrganizationMember) => void;
  onResendInvite?: (member: OrganizationMember) => void;
  onSuspend?: (member: OrganizationMember) => void;
  onDelete?: (member: OrganizationMember) => void;
}

export default function MemberRow({
  member,
  onEdit,
  onChangeRole,
  onResendInvite,
  onSuspend,
  onDelete,
}: MemberRowProps) {
  return (
    <tr className="border-b last:border-none hover:bg-gray-50 transition-colors">
      {/* Member */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
            {member.firstName.charAt(0)}
            {member.lastName.charAt(0)}
          </div>

          <div>
            <p className="font-medium text-gray-900">
              {member.firstName} {member.lastName}
            </p>

            <p className="text-sm text-gray-500">{member.email}</p>
          </div>
        </div>
      </td>

      {/* Role */}
      <td className="px-6 py-4">
        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
          {member.role.name}
        </span>
      </td>

      {/* Department */}
      <td className="px-6 py-4">{member.department || "-"}</td>

      {/* Employee ID */}
      <td className="px-6 py-4">{member.employeeId || "-"}</td>

      {/* Status */}
      <td className="px-6 py-4">
        <StatusBadge status={member.status} />
      </td>

      {/* Actions */}
      <td className="px-6 py-4">
        <div className="flex justify-end gap-2">
          <IconButton
            title="Edit"
            icon={<Edit size={16} />}
            onClick={() => onEdit?.(member)}
          />

          <IconButton
            title="Change Role"
            icon={<Shield size={16} />}
            onClick={() => onChangeRole?.(member)}
          />

          {member.status === "INVITED" && (
            <IconButton
              title="Resend Invite"
              icon={<RefreshCcw size={16} />}
              onClick={() => onResendInvite?.(member)}
            />
          )}

          <IconButton
            title="Suspend"
            icon={<UserX size={16} />}
            onClick={() => onSuspend?.(member)}
          />

          <IconButton
            title="Delete"
            icon={<Trash2 size={16} />}
            onClick={() => onDelete?.(member)}
          />
        </div>
      </td>
    </tr>
  );
}

interface StatusBadgeProps {
  status: OrganizationMember["status"];
}

function StatusBadge({ status }: StatusBadgeProps) {
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

interface IconButtonProps {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
}

function IconButton({ icon, title, onClick }: IconButtonProps) {
  return (
    <button
      title={title}
      onClick={onClick}
      className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-indigo-600"
    >
      {icon}
    </button>
  );
}
