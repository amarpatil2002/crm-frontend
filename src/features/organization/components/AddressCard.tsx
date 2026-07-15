import { Pencil, Save, X } from "lucide-react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type {
  Organization,
  OrganizationFormValues,
} from "../types/organization.type";

interface AddressCardProps {
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

const AddressCard = ({
  register,
  errors,
  isEditing,
  saving,
  onEdit,
  onCancel,
}: AddressCardProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Address</h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage your organization address.
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
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
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
        {/* Street */}

        <div className="md:col-span-2">
          <label className={labelClass}>Street</label>

          <input
            {...register("address.street")}
            disabled={!isEditing}
            placeholder="Street Address"
            className={inputClass}
          />

          {errors.address?.street && (
            <p className={errorClass}>{errors.address.street.message}</p>
          )}
        </div>

        {/* City */}

        <div>
          <label className={labelClass}>City</label>

          <input
            {...register("address.city")}
            disabled={!isEditing}
            placeholder="City"
            className={inputClass}
          />

          {errors.address?.city && (
            <p className={errorClass}>{errors.address.city.message}</p>
          )}
        </div>

        {/* State */}

        <div>
          <label className={labelClass}>State</label>

          <input
            {...register("address.state")}
            disabled={!isEditing}
            placeholder="State"
            className={inputClass}
          />

          {errors.address?.state && (
            <p className={errorClass}>{errors.address.state.message}</p>
          )}
        </div>

        {/* Country */}

        <div>
          <label className={labelClass}>Country</label>

          <input
            {...register("address.country")}
            disabled={!isEditing}
            placeholder="Country"
            className={inputClass}
          />

          {errors.address?.country && (
            <p className={errorClass}>{errors.address.country.message}</p>
          )}
        </div>

        {/* Zip Code */}

        <div>
          <label className={labelClass}>Zip Code</label>

          <input
            {...register("address.zipCode")}
            disabled={!isEditing}
            placeholder="Zip Code"
            className={inputClass}
          />

          {errors.address?.zipCode && (
            <p className={errorClass}>{errors.address.zipCode.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
