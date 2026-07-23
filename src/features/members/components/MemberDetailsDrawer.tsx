import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";

import type {
  InviteMemberFormValues,
  OrganizationMember,
  Role,
} from "../types/member.type";

interface MemberDetailsDrawerProps {
  open: boolean;
  member: OrganizationMember | null;
  roles: Role[];

  saving?: boolean;

  onClose: () => void;

  onSave: (memberId: string, data: InviteMemberFormValues) => void;

  onUpdateRole?: (memberId: string, roleId: string) => void;

  onUpdateStatus?: (
    memberId: string,
    status: "ACTIVE" | "INACTIVE" | "SUSPENDED",
  ) => void;

  onDelete?: (memberId: string) => void;
}

export default function MemberDetailsDrawer({
  open,
  member,
  roles,
  saving = false,
  onClose,
  onSave,
  onUpdateRole,
  onUpdateStatus,
  onDelete,
}: MemberDetailsDrawerProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InviteMemberFormValues>();

  const [selectedRole, setSelectedRole] = useState("");

  const [selectedStatus, setSelectedStatus] = useState<
    "ACTIVE" | "INACTIVE" | "SUSPENDED"
  >("ACTIVE");

  useEffect(() => {
    if (!member) return;

    reset({
      firstName: member.user.firstName,
      lastName: member.user.lastName,
      email: member.user.email,
      phone: member.user.phone ?? "",

      title: member.title ?? "",
      department: member.department ?? "",
      employeeId: member.employeeId ?? "",

      role: member.role._id,
    });

    setSelectedRole(member.role._id);

    setSelectedStatus(member.status === "INVITED" ? "INACTIVE" : member.status);
  }, [member, reset]);

  if (!member) return null;

  const submit = (data: InviteMemberFormValues) => {
    onSave(member._id, data);
  };

  const handleRoleUpdate = () => {
    if (!selectedRole) return;

    onUpdateRole?.(member._id, selectedRole);
  };

  const handleStatusUpdate = () => {
    onUpdateStatus?.(member._id, selectedStatus);
  };

  return (
    <>
      {/* Backdrop */}

      {open && (
        <div onClick={onClose} className="fixed inset-0 z-40 bg-black/30" />
      )}

      {/* Drawer */}

      <div
        className={`fixed right-0 top-0 z-50 h-screen w-full max-w-3xl bg-white transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <form onSubmit={handleSubmit(submit)} className="flex h-full flex-col">
          {/* Header */}

          <div className="flex items-center justify-between border-b px-6 py-5">
            <div>
              <h2 className="text-xl font-semibold">Member Details</h2>

              <p className="mt-1 text-sm text-gray-500">
                View and manage member information.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-md p-2 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}

          <div className="flex-1 overflow-y-auto bg-gray-50">
            {/* Profile Header */}

            <div className="border-b bg-white px-8 py-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-5">
                  {/* Avatar */}

                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-2xl font-bold text-indigo-700 shadow-sm">
                    {member.user.firstName.charAt(0)}
                    {member.user.lastName.charAt(0)}
                  </div>

                  {/* Info */}

                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900">
                      {member.user.fullName}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                      {member.user.email}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                        {member.role.name}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold
                ${
                  member.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : member.status === "INVITED"
                      ? "bg-yellow-100 text-yellow-700"
                      : member.status === "SUSPENDED"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                }
              `}
                      >
                        {member.status}
                      </span>

                      {member.department && (
                        <span className="text-sm text-gray-500">
                          {member.department}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
                  >
                    More Actions
                  </button>
                </div>
              </div>

              {/* Quick Stats */}

              <div className="mt-8 grid grid-cols-4 gap-6 border-t pt-6">
                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Department
                  </p>

                  <p className="mt-2 font-semibold">
                    {member.department || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Job Title
                  </p>

                  <p className="mt-2 font-semibold">{member.title || "-"}</p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Employee ID
                  </p>

                  <p className="mt-2 font-semibold">
                    {member.employeeId || "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Joined
                  </p>

                  <p className="mt-2 font-semibold">
                    {member.joinedAt
                      ? new Date(member.joinedAt).toLocaleDateString()
                      : "-"}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}

            <div className="space-y-6 p-8"></div>
            {/* Information Cards */}

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Personal Information */}

              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Personal Information
                  </h3>

                  <span className="text-xs text-gray-400">Basic Details</span>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-600">
                        First Name
                      </label>

                      <input
                        {...register("firstName")}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-indigo-500 focus:outline-none"
                      />

                      <p className="mt-1 text-xs text-red-500">
                        {errors.firstName?.message}
                      </p>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-600">
                        Last Name
                      </label>

                      <input
                        {...register("lastName")}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-indigo-500 focus:outline-none"
                      />

                      <p className="mt-1 text-xs text-red-500">
                        {errors.lastName?.message}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-600">
                      Email Address
                    </label>

                    <input
                      {...register("email")}
                      disabled
                      className="w-full rounded-lg border border-gray-200 bg-gray-100 px-3 py-2.5"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-600">
                      Phone Number
                    </label>

                    <input
                      {...register("phone")}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-600">
                      Department
                    </label>

                    <input
                      {...register("department")}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-600">
                      Job Title
                    </label>

                    <input
                      {...register("title")}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-600">
                      Employee ID
                    </label>

                    <input
                      {...register("employeeId")}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={saving}
                    className="mt-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
                  >
                    {saving ? "Saving..." : "Save Information"}
                  </button>
                </div>
              </div>

              {/* Role & Permissions */}

              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Role & Permissions
                  </h3>

                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
                    {member.role.name}
                  </span>
                </div>

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-600">
                      Member Role
                    </label>

                    <select
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-indigo-500 focus:outline-none"
                    >
                      {roles.map((role) => (
                        <option key={role._id} value={role._id}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="rounded-lg bg-gray-50 p-4">
                    <div className="flex justify-between py-2">
                      <span className="text-sm text-gray-500">
                        Current Role
                      </span>

                      <span className="font-medium">{member.role.name}</span>
                    </div>

                    <div className="flex justify-between py-2">
                      <span className="text-sm text-gray-500">Status</span>

                      <span className="font-medium">{member.status}</span>
                    </div>

                    <div className="flex justify-between py-2">
                      <span className="text-sm text-gray-500">Permissions</span>

                      {/* <span className="font-medium">
                        {Object.keys(member.role.accessScope).length}
                      </span> */}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRoleUpdate}
                    className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
                  >
                    Update Role
                  </button>
                </div>
              </div>
            </div>
            {/* Account Status & Activity */}

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Account Status */}

              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Account Status
                  </h3>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
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

                <div className="space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-600">
                      Change Status
                    </label>

                    <select
                      value={selectedStatus}
                      onChange={(e) =>
                        setSelectedStatus(
                          e.target.value as "ACTIVE" | "INACTIVE" | "SUSPENDED",
                        )
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="ACTIVE">Active</option>
                      <option value="INVITED">Invited</option>
                      <option value="INACTIVE">Inactive</option>
                      <option value="SUSPENDED">Suspended</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={handleStatusUpdate}
                    className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700"
                  >
                    Update Status
                  </button>

                  <div className="border-t pt-5">
                    <p className="mb-3 text-sm font-medium text-red-600">
                      Danger Zone
                    </p>

                    <button
                      type="button"
                      onClick={() => onDelete?.(member._id)}
                      className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                    >
                      Delete Member
                    </button>
                  </div>
                </div>
              </div>

              {/* Activity */}

              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="mb-6 text-lg font-semibold text-gray-900">
                  Activity
                </h3>

                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="text-sm text-gray-500">Joined</span>

                    <span className="font-medium text-gray-900">
                      {member.joinedAt
                        ? new Date(member.joinedAt).toLocaleString()
                        : "-"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="text-sm text-gray-500">Invited By</span>

                    <span className="font-medium text-gray-900">
                      {member.invitedBy?.fullName ?? "-"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="text-sm text-gray-500">Invited At</span>

                    <span className="font-medium text-gray-900">
                      {member.invitedAt
                        ? new Date(member.invitedAt).toLocaleString()
                        : "-"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="text-sm text-gray-500">Accepted At</span>

                    <span className="font-medium text-gray-900">
                      {member.acceptedAt
                        ? new Date(member.acceptedAt).toLocaleString()
                        : "-"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b pb-3">
                    <span className="text-sm text-gray-500">Last Active</span>

                    <span className="font-medium text-gray-900">
                      {member.lastActiveAt
                        ? new Date(member.lastActiveAt).toLocaleString()
                        : "Never"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Updated</span>

                    <span className="font-medium text-gray-900">
                      {new Date(member.updatedAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}

          <div className="sticky bottom-0 border-t border-gray-200 bg-white px-8 py-5">
            <div className="flex items-center justify-between">
              {/* Left */}

              <div>
                <p className="text-sm font-medium text-gray-900">
                  Member Management
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Changes are saved independently for Details, Role and Status.
                </p>
              </div>

              {/* Right */}

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <div className="flex items-center gap-2">
                      <svg
                        className="h-4 w-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="3"
                          className="opacity-30"
                        />
                        <path
                          d="M22 12A10 10 0 0012 2"
                          stroke="currentColor"
                          strokeWidth="3"
                        />
                      </svg>
                      Saving...
                    </div>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
