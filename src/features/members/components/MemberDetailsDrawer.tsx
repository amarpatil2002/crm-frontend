import { useEffect, useState } from "react";
import { Pencil, X } from "lucide-react";
import { useForm } from "react-hook-form";

import type {
  InviteMemberFormValues,
  OrganizationMember,
  Role,
} from "../types/member.type";
import { useAppSelector } from "../../../app/hooks";

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

  const [isEditOpen, setIsEditOpen] = useState(false);

  const { roles } = useAppSelector((state) => state.roles);

  useEffect(() => {
    if (!member) return;

    reset({
      firstName: member.user.firstName,
      lastName: member.user.lastName,
      email: member.user.email,
      phone: member.user.phone ?? "",
      department: member.department ?? "",
      title: member.title ?? "",
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

  const initials = `${member.user.firstName.charAt(0)}${member.user.lastName.charAt(0)}`;

  return (
    <>
      {open && (
        <div onClick={onClose} className="fixed inset-0 z-40 bg-black/40 " />
      )}

      <div
        className={`fixed right-0 top-0 z-50 h-screen w-full max-w-4xl overflow-hidden bg-gray-50 shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <form onSubmit={handleSubmit(submit)} className="flex h-full flex-col">
          {/* ================= HEADER ================= */}

          <div className="bg-white shadow-sm">
            <div className="flex items-start justify-between px-8 py-6">
              <div className="flex items-center gap-5">
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

                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {member.user.fullName}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {member.user.email}
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                      {member.role.name}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        member.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : member.status === "SUSPENDED"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {member.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg p-2 transition hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* BODY START */}

          <div className="flex-1 grid grid-cols-2 gap-6 overflow-y-auto p-4">
            {/* ================= PERSONAL INFORMATION ================= */}

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4">
                <h3 className="text-lg  font-semibold text-gray-900">
                  Personal Information
                </h3>

                <button
                  type="button"
                  onClick={() => setIsEditOpen(true)}
                  className="flex items-center gap-2 rounded-lg text-indigo-600 border-gray-300 px-3 py-2 text-sm font-medium transition hover:bg-gray-50"
                >
                  <Pencil size={16} />
                </button>
              </div>

              {/* Body */}
              <div className="space-y-5 p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">First Name</span>
                  <span className="text-sm font-medium text-gray-900">
                    {member.user.firstName}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Last Name</span>
                  <span className="text-sm font-medium text-gray-900">
                    {member.user.lastName}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Email</span>
                  <span className="text-sm font-medium text-gray-900">
                    {member.user.email}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Phone</span>
                  <span className="text-sm font-medium text-gray-900">
                    {member.user.phone || "-"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Department</span>
                  <span className="text-sm font-medium text-gray-900">
                    {member.department || "-"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Job Title</span>
                  <span className="text-sm font-medium text-gray-900">
                    {member.title || "-"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Employee ID</span>
                  <span className="text-sm font-medium text-gray-900">
                    {member.employeeId || "-"}
                  </span>
                </div>
              </div>
            </div>
            {isEditOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">
                  <div className="flex items-center justify-between border-b px-6 py-4">
                    <h2 className="text-xl font-semibold">
                      Edit Personal Information
                    </h2>

                    <button
                      onClick={() => setIsEditOpen(false)}
                      className="rounded p-2 hover:bg-gray-100"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit(submit)}>
                    <div className="grid grid-cols-2 gap-5 p-6">
                      <div>
                        <label>First Name</label>

                        <input
                          {...register("firstName")}
                          className="mt-1 w-full rounded-lg border px-3 py-2"
                        />
                      </div>

                      <div>
                        <label>Last Name</label>

                        <input
                          {...register("lastName")}
                          className="mt-1 w-full rounded-lg border px-3 py-2"
                        />
                      </div>

                      <div className="col-span-2">
                        <label>Email</label>

                        <input
                          {...register("email")}
                          disabled
                          className="mt-1 w-full rounded-lg border bg-gray-100 px-3 py-2"
                        />
                      </div>

                      <div>
                        <label>Phone</label>

                        <input
                          {...register("phone")}
                          className="mt-1 w-full rounded-lg border px-3 py-2"
                        />
                      </div>

                      <div>
                        <label>Department</label>

                        <input
                          {...register("department")}
                          className="mt-1 w-full rounded-lg border px-3 py-2"
                        />
                      </div>

                      <div>
                        <label>Job Title</label>

                        <input
                          {...register("title")}
                          className="mt-1 w-full rounded-lg border px-3 py-2"
                        />
                      </div>

                      <div>
                        <label>Employee ID</label>

                        <input
                          {...register("employeeId")}
                          className="mt-1 w-full rounded-lg border px-3 py-2"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 border-t p-6">
                      <button
                        type="button"
                        onClick={() => setIsEditOpen(false)}
                        className="rounded-lg border px-5 py-2"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={saving}
                        className="rounded-lg bg-indigo-600 px-5 py-2 text-white"
                      >
                        {saving ? "Saving..." : "Save Details"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* NEXT PART STARTS HERE */}
            {/* ================= ROLE & PERMISSIONS ================= */}

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
              {/* Header */}
              <div className="border-b px-6 py-5">
                <h3 className="text-lg font-semibold text-gray-900">
                  Role & Permissions
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  View the current role and assign a new one.
                </p>
              </div>

              <div className="space-y-6 p-6">
                {/* Current Role */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Current Role</span>

                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                    {member.role.name}
                  </span>
                </div>

                {/* Department */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Department</span>

                  <span className="font-medium text-gray-900">
                    {member.department || "-"}
                  </span>
                </div>

                {/* Permissions */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Permissions</span>

                  <span className="font-medium text-gray-900">
                    {/* {member.role.permissions?.length ?? 0} */}0
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Changer Role</span>

                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className=" rounded-lg border border-gray-300 bg-white px-3 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  >
                    {roles.map((role) => (
                      <option key={role._id} value={role._id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  View all permissions →
                </button>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    hidden={selectedRole === member.role._id}
                    onClick={handleRoleUpdate}
                    className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    Update Role
                  </button>
                </div>
              </div>
            </div>

            {/* ================= ACCOUNT STATUS ================= */}

            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <div className="flex items-center justify-between border-b px-6 py-5">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Account Status
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Manage member account status.
                  </p>
                </div>

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

              <div className="space-y-6 p-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Status
                  </label>

                  <select
                    value={selectedStatus}
                    onChange={(e) =>
                      setSelectedStatus(
                        e.target.value as "ACTIVE" | "INACTIVE" | "SUSPENDED",
                      )
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  >
                    <option value="ACTIVE">Active</option>

                    <option value="INACTIVE">Inactive</option>

                    <option value="SUSPENDED">Suspended</option>
                  </select>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleStatusUpdate}
                    className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    Update Status
                  </button>
                </div>

                <div className="border-t pt-6">
                  <p className="mb-3 text-sm font-semibold text-red-600">
                    Danger Zone
                  </p>

                  <button
                    type="button"
                    onClick={() => onDelete?.(member._id)}
                    className="rounded-lg border border-red-300 bg-red-50 px-5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-100"
                  >
                    Delete Member
                  </button>
                </div>
              </div>
            </div>

            {/* ================= ACTIVITY ================= */}

            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b px-6 py-5">
                <h3 className="text-lg font-semibold text-gray-900">
                  Activity
                </h3>
              </div>

              <div className="divide-y">
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-gray-500">Joined</span>

                  <span className="font-medium">
                    {member.joinedAt
                      ? new Date(member.joinedAt).toLocaleString()
                      : "-"}
                  </span>
                </div>

                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-gray-500">Invited By</span>

                  <span className="font-medium">
                    {member.invitedBy?.fullName || "-"}
                  </span>
                </div>

                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-gray-500">Accepted At</span>

                  <span className="font-medium">
                    {member.acceptedAt
                      ? new Date(member.acceptedAt).toLocaleString()
                      : "-"}
                  </span>
                </div>

                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-gray-500">Last Active</span>

                  <span className="font-medium">
                    {member.lastActiveAt
                      ? new Date(member.lastActiveAt).toLocaleString()
                      : "Never"}
                  </span>
                </div>

                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-gray-500">Updated</span>

                  <span className="font-medium">
                    {new Date(member.updatedAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= FOOTER ================= */}

          <div className="border-t bg-white px-8 py-4">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-gray-300 px-6 py-2.5 font-medium hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
