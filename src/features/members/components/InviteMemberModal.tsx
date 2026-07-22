import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { memberSchema } from "../schema/member.schema";
import type { InviteMemberFormValues, Role } from "../types/member.type";

interface InviteMemberModalProps {
  open: boolean;
  loading?: boolean;
  roles: Role[];
  onClose: () => void;
  onSubmit: (data: InviteMemberFormValues) => void;
}

const defaultValues: InviteMemberFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "",
  title: "",
  department: "",
  employeeId: "",
};

export default function InviteMemberModal({
  open,
  loading = false,
  roles,
  onClose,
  onSubmit,
}: InviteMemberModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InviteMemberFormValues>({
    resolver: yupResolver(memberSchema),
    defaultValues,
  });

  useEffect(() => {
    if (open) {
      reset(defaultValues);
    }
  }, [open, reset]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Invite Team Member
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Invite a new member to your organization.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-8 p-6">
            {/* Personal Information */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Input
                  label="First Name"
                  required
                  error={errors.firstName?.message}
                  register={register("firstName")}
                  placeholder="Enter first name"
                />

                <Input
                  label="Last Name"
                  required
                  error={errors.lastName?.message}
                  register={register("lastName")}
                  placeholder="Enter last name"
                />

                <Input
                  label="Email Address"
                  required
                  error={errors.email?.message}
                  register={register("email")}
                  placeholder="Enter email address"
                  type="email"
                />

                <Input
                  label="Phone Number"
                  error={errors.phone?.message}
                  register={register("phone")}
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            {/* Work Information */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Work Information
              </h3>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Role <span className="text-red-500">*</span>
                  </label>

                  <select
                    {...register("role")}
                    className="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition focus:border-indigo-500"
                  >
                    <option value="">Select Role</option>

                    {roles.map((role) => (
                      <option key={role._id} value={role._id}>
                        {role.name}
                      </option>
                    ))}
                  </select>

                  {errors.role && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.role.message}
                    </p>
                  )}
                </div>

                <Input
                  label="Job Title"
                  register={register("title")}
                  placeholder="Sales Executive"
                />

                <Input
                  label="Department"
                  register={register("department")}
                  placeholder="Sales"
                />

                <Input
                  label="Employee ID"
                  register={register("employeeId")}
                  placeholder="EMP-1001"
                />
              </div>

              <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50 p-4">
                <p className="text-sm text-blue-700">
                  Permissions will automatically be assigned based on the
                  selected role.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 border-t px-6 py-5">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? "Inviting..." : "Invite Member"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface InputProps {
  label: string;
  register: any;
  error?: string;
  required?: boolean;
  placeholder?: string;
  type?: string;
}

function Input({
  label,
  register,
  error,
  required,
  placeholder,
  type = "text",
}: InputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>

      <input
        {...register}
        type={type}
        placeholder={placeholder}
        className="h-11 w-full rounded-lg border border-gray-300 px-3 text-sm outline-none transition focus:border-indigo-500"
      />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
