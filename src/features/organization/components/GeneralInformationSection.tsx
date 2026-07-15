import { Pencil, Save, X } from "lucide-react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type {
  Organization,
  OrganizationFormValues,
} from "../types/organization.type";

interface GeneralInformationSectionProps {
  register: UseFormRegister<OrganizationFormValues>;
  errors: FieldErrors<Organization>;

  isEditing: boolean;
  saving: boolean;

  onEdit: () => void;
  onCancel: () => void;
}

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-100";

const labelClass = "mb-1 block text-sm font-medium text-slate-700";

const errorClass = "mt-1 text-xs text-red-500";

const GeneralInformationSection = ({
  register,
  errors,
  isEditing,
  saving,
  onEdit,
  onCancel,
}: GeneralInformationSectionProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            General Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage your organization's basic information.
          </p>
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={onEdit}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100"
          >
            <Pencil size={16} />
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={16} />

              {saving ? "Saving..." : "Save"}
            </button>

            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100"
            >
              <X size={16} />
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Body */}

      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
        {/* Organization Name */}

        <div>
          <label className={labelClass}>Organization Name</label>

          <input
            {...register("name")}
            disabled={!isEditing}
            className={inputClass}
          />

          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>

        {/* Website */}

        <div>
          <label className={labelClass}>Website</label>

          <input
            {...register("website")}
            disabled={!isEditing}
            placeholder="https://example.com"
            className={inputClass}
          />

          {errors.website && (
            <p className={errorClass}>{errors.website.message}</p>
          )}
        </div>

        {/* Email */}

        <div>
          <label className={labelClass}>Email</label>

          <input
            type="email"
            {...register("email")}
            disabled={!isEditing}
            className={inputClass}
          />

          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>

        {/* Phone */}

        <div>
          <label className={labelClass}>Phone</label>

          <input
            {...register("phone")}
            disabled={!isEditing}
            className={inputClass}
          />

          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>

        {/* Industry */}

        <div className="md:col-span-2">
          <label className={labelClass}>Industry</label>

          <input
            {...register("industry")}
            disabled={!isEditing}
            className={inputClass}
          />

          {errors.industry && (
            <p className={errorClass}>{errors.industry.message}</p>
          )}
        </div>

        {/* Description */}

        <div className="md:col-span-2">
          <label className={labelClass}>Description</label>

          <textarea
            rows={5}
            {...register("description")}
            disabled={!isEditing}
            className={inputClass}
          />

          {errors.description && (
            <p className={errorClass}>{errors.description.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralInformationSection;
