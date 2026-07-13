import { Pencil, X, Save } from "lucide-react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type {
  Organization,
  OrganizationProfileFormValues,
} from "../types/organization.type";

interface AddressCardProps {
  organization: Organization;

  register: UseFormRegister<OrganizationProfileFormValues>;

  errors: FieldErrors<OrganizationProfileFormValues>;

  isEditing: boolean;

  saving?: boolean;

  onEdit: () => void;

  onCancel: () => void;

  onSave: () => void;
}

export default function AddressCard({
  organization,
  register,
  errors,
  isEditing,
  saving,
  onEdit,
  onCancel,
  onSave,
}: AddressCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Address</h2>

          <p className="mt-1 text-sm text-slate-500">
            Organization registered address.
          </p>
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </button>
        ) : (
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <X className="h-4 w-4" />
            Cancel
          </button>
        )}
      </div>

      {!isEditing ? (
        /* View Mode */
        <div className="grid grid-cols-2 gap-x-10 gap-y-6 p-6">
          <Info label="Street" value={organization.address.street} />
          <Info label="City" value={organization.address.city} />
          <Info label="State" value={organization.address.state} />
          <Info label="Country" value={organization.address.country} />
          <Info label="Zip Code" value={organization.address.zipCode} />
        </div>
      ) : (
        /* Edit Mode */
        <>
          <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
            <div className="md:col-span-2">
              <Label>Street Address</Label>

              <input {...register("address.street")} className="input" />

              <Error message={errors.address?.street?.message} />
            </div>

            <Input
              label="City"
              register={register("address.city")}
              error={errors.address?.city?.message}
            />

            <Input
              label="State"
              register={register("address.state")}
              error={errors.address?.state?.message}
            />

            <Input
              label="Country"
              register={register("address.country")}
              error={errors.address?.country?.message}
            />

            <Input
              label="Zip Code"
              register={register("address.zipCode")}
              error={errors.address?.zipCode?.message}
            />
          </div>

          <div className="flex justify-end border-t border-slate-200 p-6">
            <button
              type="button"
              disabled={saving}
              onClick={onSave}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-white hover:bg-indigo-700"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save Address"}
            </button>
          </div>
        </>
      )}
    </section>
  );
}

/* ---------- Helpers ---------- */

function Info({ label, value }: { label: string; value?: string | null }) {
  return (
    <div>
      <p className="text-sm text-slate-500">{label}</p>

      <p className="mt-1 font-medium text-slate-900">{value || "Not Added"}</p>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-2 block text-sm font-medium text-slate-700">
      {children}
    </label>
  );
}

function Error({ message }: { message?: string }) {
  if (!message) return null;

  return <p className="mt-1 text-xs text-red-500">{message}</p>;
}

function Input({
  label,
  register,
  error,
}: {
  label: string;
  register: any;
  error?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>

      <input
        {...register}
        className="h-11 w-full rounded-xl border border-slate-300 px-4 text-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
      />

      <Error message={error} />
    </div>
  );
}
