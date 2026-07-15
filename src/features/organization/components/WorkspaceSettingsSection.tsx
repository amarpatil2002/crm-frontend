import { Pencil, Save, X } from "lucide-react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type {
  Organization,
  OrganizationFormValues,
} from "../types/organization.type";

interface WorkspaceSettingsSectionProps {
  register: UseFormRegister<OrganizationFormValues>;
  errors: FieldErrors<Organization>;

  isEditing: boolean;
  saving: boolean;

  onEdit: () => void;
  onCancel: () => void;
}

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-100 disabled:text-slate-500";

const labelClass = "mb-1 block text-sm font-medium text-slate-700";

const errorClass = "mt-1 text-xs text-red-500";

const WorkspaceSettingsSection = ({
  register,
  errors,
  isEditing,
  saving,
  onEdit,
  onCancel,
}: WorkspaceSettingsSectionProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Workspace Settings
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Configure your organization's default workspace settings.
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

      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
        {/* Timezone */}

        <div>
          <label className={labelClass}>Timezone</label>

          <input
            {...register("settings.timezone")}
            disabled={!isEditing}
            className={inputClass}
            placeholder="UTC"
          />

          {errors.settings?.timezone && (
            <p className={errorClass}>{errors.settings.timezone.message}</p>
          )}
        </div>

        {/* Language */}

        <div>
          <label className={labelClass}>Language</label>

          <input
            {...register("settings.language")}
            disabled={!isEditing}
            className={inputClass}
            placeholder="en"
          />

          {errors.settings?.language && (
            <p className={errorClass}>{errors.settings.language.message}</p>
          )}
        </div>

        {/* Currency */}

        <div>
          <label className={labelClass}>Currency</label>

          <input
            {...register("settings.currency")}
            disabled={!isEditing}
            className={inputClass}
            placeholder="USD"
          />

          {errors.settings?.currency && (
            <p className={errorClass}>{errors.settings.currency.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSettingsSection;
