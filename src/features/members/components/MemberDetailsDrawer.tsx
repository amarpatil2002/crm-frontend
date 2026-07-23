import { useEffect } from "react";
import { X, User, Building2 } from "lucide-react";
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
}

export default function MemberDetailsDrawer({
  open,
  member,
  roles,
  saving = false,
  onClose,
  onSave,
}: MemberDetailsDrawerProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InviteMemberFormValues>();

  useEffect(() => {
    if (!member) return;

    reset({
      firstName: member.user.firstName,
      lastName: member.user.lastName,
      email: member.user.email,
      phone: member.user.phone ?? "",

      role: member.role._id,

      title: member.title ?? "",
      department: member.department ?? "",
      employeeId: member.employeeId ?? "",
    });
  }, [member, reset]);

  if (!member) return null;

  const submit = (data: InviteMemberFormValues) => {
    onSave(member._id, data);
  };

  return (
    <>
      {/* Backdrop */}

      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/30 transition-all ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Drawer */}

      <div
        className={`fixed right-0 top-0 z-50 h-screen w-full max-w-xl bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <form onSubmit={handleSubmit(submit)} className="flex h-full flex-col">
          {/* Header */}

          <div className="flex items-center justify-between border-b px-6 py-5">
            <div>
              <h2 className="text-xl font-semibold">Member Details</h2>

              <p className="mt-1 text-sm text-gray-500">
                View and update member information.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}

          <div className="flex-1 space-y-8 overflow-y-auto p-6">
            {/* Personal */}

            <section className="space-y-5">
              <div className="flex items-center gap-2">
                <User size={18} />

                <h3 className="font-semibold">Personal Information</h3>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    First Name
                  </label>

                  <input
                    {...register("firstName")}
                    className="w-full rounded-lg border px-3 py-2"
                  />

                  <p className="text-xs text-red-500">
                    {errors.firstName?.message}
                  </p>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Last Name
                  </label>

                  <input
                    {...register("lastName")}
                    className="w-full rounded-lg border px-3 py-2"
                  />

                  <p className="text-xs text-red-500">
                    {errors.lastName?.message}
                  </p>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Email
                  </label>

                  <input
                    {...register("email")}
                    disabled
                    className="w-full rounded-lg border bg-gray-100 px-3 py-2"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Phone
                  </label>

                  <input
                    {...register("phone")}
                    className="w-full rounded-lg border px-3 py-2"
                  />
                </div>
              </div>
            </section>

            {/* Organization */}

            <section className="space-y-5">
              <div className="flex items-center gap-2">
                <Building2 size={18} />

                <h3 className="font-semibold">Organization Information</h3>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">Role</label>

                  <select
                    {...register("role")}
                    className="w-full rounded-lg border px-3 py-2"
                  >
                    {roles.map((role) => (
                      <option key={role._id} value={role._id}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>{" "}
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Department
                  </label>

                  <input
                    {...register("department")}
                    className="w-full rounded-lg border px-3 py-2"
                    placeholder="Sales"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Title
                  </label>

                  <input
                    {...register("title")}
                    className="w-full rounded-lg border px-3 py-2"
                    placeholder="Sales Executive"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Employee ID
                  </label>

                  <input
                    {...register("employeeId")}
                    className="w-full rounded-lg border px-3 py-2"
                    placeholder="EMP-1001"
                  />
                </div>
              </div>
            </section>

            {/* Status */}

            <section className="space-y-5">
              <h3 className="font-semibold">Member Status</h3>

              <div className="rounded-xl border bg-gray-50 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Current Status</p>

                    <p className="mt-1 text-sm text-gray-500">
                      Manage this member's access.
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-medium
                      ${
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
              </div>
            </section>
          </div>

          {/* Footer */}

          <div className="flex items-center justify-between border-t bg-white px-6 py-5">
            <button
              type="button"
              className="rounded-lg border border-red-200 px-5 py-2.5 font-medium text-red-600 transition hover:bg-red-50"
            >
              Delete Member
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border px-5 py-2.5 font-medium hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-indigo-600 px-6 py-2.5 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
