import {
  Edit,
  MoreHorizontal,
  RefreshCcw,
  Shield,
  Trash2,
  UserX,
} from "lucide-react";

import type { OrganizationMember } from "../types/member.type";

interface MemberActionsProps {
  member: OrganizationMember;

  onEdit?: (member: OrganizationMember) => void;
  onChangeRole?: (member: OrganizationMember) => void;
  onResendInvite?: (member: OrganizationMember) => void;
  onSuspend?: (member: OrganizationMember) => void;
  onDelete?: (member: OrganizationMember) => void;
}

export default function MemberActions({
  member,
  onEdit,
  onChangeRole,
  onResendInvite,
  onSuspend,
  onDelete,
}: MemberActionsProps) {
  return (
    <div className="flex items-center justify-end gap-2">
      <ActionButton
        title="Edit"
        icon={<Edit size={16} />}
        onClick={() => onEdit?.(member)}
      />

      <ActionButton
        title="Change Role"
        icon={<Shield size={16} />}
        onClick={() => onChangeRole?.(member)}
      />

      {member.status === "INVITED" && (
        <ActionButton
          title="Resend Invite"
          icon={<RefreshCcw size={16} />}
          onClick={() => onResendInvite?.(member)}
        />
      )}

      {member.status !== "SUSPENDED" && (
        <ActionButton
          title="Suspend Member"
          icon={<UserX size={16} />}
          onClick={() => onSuspend?.(member)}
        />
      )}

      <ActionButton
        title="Delete Member"
        icon={<Trash2 size={16} />}
        onClick={() => onDelete?.(member)}
      />

      <ActionButton title="More" icon={<MoreHorizontal size={18} />} />
    </div>
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
      type="button"
      title={title}
      onClick={onClick}
      className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-indigo-600"
    >
      {icon}
    </button>
  );
}
