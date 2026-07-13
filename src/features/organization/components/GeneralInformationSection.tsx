import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type { OrganizationProfileFormValues } from "../types/organization.type";

interface GeneralInformationCardProps {
  register: UseFormRegister<OrganizationProfileFormValues>;
  errors: FieldErrors<OrganizationProfileFormValues>;
}

export default function GeneralInformationCard({
  register,
  errors,
}: GeneralInformationCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}

      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-900">
          General Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Update your organization details.
        </p>
      </div>

      {/* Body */}

      <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
        {/* Organization Name */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Organization Name
          </label>

          <input
            {...register("name")}
            placeholder="Organization name"
            className={`h-11 w-full rounded-xl border px-4 text-sm outline-none transition
              ${
                errors.name
                  ? "border-red-500"
                  : "border-slate-300 focus:border-indigo-500"
              }`}
          />

          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Business Email
          </label>

          <input
            type="email"
            {...register("email")}
            placeholder="business@email.com"
            className={`h-11 w-full rounded-xl border px-4 text-sm outline-none transition
              ${
                errors.email
                  ? "border-red-500"
                  : "border-slate-300 focus:border-indigo-500"
              }`}
          />

          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Website */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Website
          </label>

          <input
            {...register("website")}
            placeholder="https://example.com"
            className={`h-11 w-full rounded-xl border px-4 text-sm outline-none transition
              ${
                errors.website
                  ? "border-red-500"
                  : "border-slate-300 focus:border-indigo-500"
              }`}
          />

          {errors.website && (
            <p className="mt-1 text-xs text-red-500">
              {errors.website.message}
            </p>
          )}
        </div>

        {/* Phone */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Phone Number
          </label>

          <input
            {...register("phone")}
            placeholder="+91 9876543210"
            className={`h-11 w-full rounded-xl border px-4 text-sm outline-none transition
              ${
                errors.phone
                  ? "border-red-500"
                  : "border-slate-300 focus:border-indigo-500"
              }`}
          />

          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
          )}
        </div>

        {/* Industry */}

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Industry
          </label>

          <select
            {...register("industry")}
            className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm outline-none transition focus:border-indigo-500"
          >
            <option value="">Select Industry</option>

            <option value="Software">Software</option>

            <option value="Information Technology">
              Information Technology
            </option>

            <option value="Finance">Finance</option>

            <option value="Healthcare">Healthcare</option>

            <option value="Education">Education</option>

            <option value="Manufacturing">Manufacturing</option>

            <option value="Retail">Retail</option>

            <option value="Marketing">Marketing</option>

            <option value="Consulting">Consulting</option>

            <option value="Other">Other</option>
          </select>

          {errors.industry && (
            <p className="mt-1 text-xs text-red-500">
              {errors.industry.message}
            </p>
          )}
        </div>

        {/* Description */}

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Description
          </label>

          <textarea
            rows={5}
            {...register("description")}
            placeholder="Tell us about your organization..."
            className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition resize-none
              ${
                errors.description
                  ? "border-red-500"
                  : "border-slate-300 focus:border-indigo-500"
              }`}
          />

          {errors.description && (
            <p className="mt-1 text-xs text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
