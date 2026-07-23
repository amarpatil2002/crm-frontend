import type { UseFormRegister, FieldErrors } from "react-hook-form";

import type { InviteMemberFormValues, Role } from "../types/member.type";

interface MemberInformationCardProps {
  register: UseFormRegister<InviteMemberFormValues>;
  errors: FieldErrors<InviteMemberFormValues>;
  roles: Role[];
}

export default function MemberInformationCard({
  register,
  errors,
  roles,
}: MemberInformationCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-semibold text-gray-900">
        Member Information
      </h3>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* First Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            First Name
          </label>

          <input
            {...register("firstName")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-indigo-500 focus:outline-none"
          />

          {errors.firstName && (
            <p className="mt-1 text-xs text-red-500">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Last Name
          </label>

          <input
            {...register("lastName")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-indigo-500 focus:outline-none"
          />

          {errors.lastName && (
            <p className="mt-1 text-xs text-red-500">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            {...register("email")}
            disabled
            className="w-full rounded-lg border border-gray-300 bg-gray-100 px-3 py-2.5"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Phone
          </label>

          <input
            {...register("phone")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Role */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Role
          </label>

          <select
            {...register("role")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-indigo-500 focus:outline-none"
          >
            {roles.map((role) => (
              <option key={role._id} value={role._id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Title
          </label>

          <input
            {...register("title")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Department */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Department
          </label>

          <input
            {...register("department")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        {/* Employee ID */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Employee ID
          </label>

          <input
            {...register("employeeId")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 focus:border-indigo-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
