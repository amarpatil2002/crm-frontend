import { useState } from "react";
import {
  MoreVertical,
  Pencil,
  Shield,
  RefreshCcw,
  UserX,
  Trash2,
} from "lucide-react";

import type { OrganizationMember } from "../types/member.type";

interface Props {
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
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex justify-end">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-lg p-2 text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
      >
        <MoreVertical size={18} />
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-50 w-60 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
          <div className="border-b border-gray-100 px-4 py-3">
            <p className="truncate text-sm font-semibold text-gray-900">
              {member.user.fullName}
            </p>

            <p className="truncate text-xs text-gray-500">
              {member.user.email}
            </p>
          </div>

          <div className="py-2">
            <button
              onClick={() => {
                onEdit?.(member);
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
            >
              <Pencil size={16} className="text-gray-500" />
              <span>Edit Member</span>
            </button>

            <button
              onClick={() => {
                onChangeRole?.(member);
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
            >
              <Shield size={16} className="text-gray-500" />
              <span>Change Role</span>
            </button>

            {member.status === "INVITED" && (
              <button
                onClick={() => {
                  onResendInvite?.(member);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition hover:bg-gray-50"
              >
                <RefreshCcw size={16} className="text-gray-500" />
                <span>Resend Invitation</span>
              </button>
            )}

            {member.status === "ACTIVE" && (
              <button
                onClick={() => {
                  onSuspend?.(member);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-amber-700 transition hover:bg-amber-50"
              >
                <UserX size={16} />
                <span>Suspend Member</span>
              </button>
            )}

            <div className="my-2 border-t border-gray-100" />

            <button
              onClick={() => {
                onDelete?.(member);
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
            >
              <Trash2 size={16} />
              <span>Delete Member</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
