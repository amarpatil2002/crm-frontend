import { useEffect, useMemo, useState } from "react";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import { Save, Loader2 } from "lucide-react";

import GeneralInformationCard from "./GeneralInformationSection";
import AddressCard from "./AddressCard";
import WorkspaceSettingsCard from "./WorkspaceSettingsSection";
import LogoUploader from "./LogoUploader";
import SubscriptionCard from "./SubscriptionCard";

import { organizationProfileSchema } from "../schema/organization.schema";

import {
  updateOrganizationApi,
  uploadOrganizationLogoApi,
} from "../api/organization.api";

import type {
  Organization,
  OrganizationProfileFormValues,
  UpdateOrganizationPayload,
} from "../types/organization.type";

interface OrganizationProfileFormProps {
  organization: Organization;

  onUpdated: (organization: Organization) => void;
}

export default function OrganizationProfileForm({
  organization,
  onUpdated,
}: OrganizationProfileFormProps) {
  const [saving, setSaving] = useState(false);

  const [logoUploading, setLogoUploading] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                               Default Values                               */
  /* -------------------------------------------------------------------------- */

  const defaultValues = useMemo<OrganizationProfileFormValues>(
    () => ({
      name: organization.name ?? "",

      website: organization.website ?? "",

      email: organization.email ?? "",

      phone: organization.phone ?? "",

      industry: organization.industry ?? "",

      description: organization.description ?? "",

      address: {
        street: organization.address?.street ?? "",

        city: organization.address?.city ?? "",

        state: organization.address?.state ?? "",

        country: organization.address?.country ?? "",

        zipCode: organization.address?.zipCode ?? "",
      },

      settings: {
        timezone: organization.settings.timezone,

        language: organization.settings.language,

        currency: organization.settings.currency,
      },
    }),
    [organization],
  );

  /* -------------------------------------------------------------------------- */

  const {
    register,

    handleSubmit,

    reset,

    formState: {
      errors,

      isDirty,
    },
  } = useForm<OrganizationProfileFormValues>({
    resolver: yupResolver(organizationProfileSchema),

    defaultValues,
  });

  /* -------------------------------------------------------------------------- */
  /*                          Prevent Infinite Loop                             */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  /* -------------------------------------------------------------------------- */
  /*                            Update Organization                             */
  /* -------------------------------------------------------------------------- */

  const onSubmit = async (values: OrganizationProfileFormValues) => {
    try {
      setSaving(true);

      const payload: UpdateOrganizationPayload = {
        name: values.name,

        website: values.website || null,

        email: values.email,

        phone: values.phone || null,

        industry: values.industry || null,

        description: values.description || null,

        address: {
          street: values.address.street || null,

          city: values.address.city || null,

          state: values.address.state || null,

          country: values.address.country || null,

          zipCode: values.address.zipCode || null,
        },

        settings: {
          timezone: values.settings.timezone,

          language: values.settings.language,

          currency: values.settings.currency,
        },
      };

      const response = await updateOrganizationApi(payload);

      onUpdated(response.data);

      reset({
        ...values,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                               Upload Logo                                  */
  /* -------------------------------------------------------------------------- */

  const handleLogoUpload = async (file: File | null) => {
    if (!file) return;

    try {
      setLogoUploading(true);

      const response = await uploadOrganizationLogoApi(file);

      onUpdated(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLogoUploading(false);
    }
  };
  /* -------------------------------------------------------------------------- */
  /*                                   Render                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* General Information */}

      <GeneralInformationCard register={register} errors={errors} />

      {/* Address */}

      <AddressCard register={register} errors={errors} />

      {/* Workspace Settings */}

      <WorkspaceSettingsCard register={register} errors={errors} />

      {/* Bottom Section */}

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Logo */}

        <LogoUploader
          logo={organization.logo}
          loading={logoUploading}
          onFileSelect={handleLogoUpload}
        />

        {/* Subscription */}

        <SubscriptionCard organization={organization} />
      </div>

      {/* Action Bar */}

      <div className="sticky bottom-6 z-20 rounded-2xl border border-slate-200 bg-white p-5 shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Save Organization
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Review your changes before updating the organization profile.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={saving}
              onClick={() => reset(defaultValues)}
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Reset
            </button>

            <button
              type="submit"
              disabled={saving || !isDirty}
              className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
            >
              {saving ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Dirty State */}

      {isDirty && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <p className="text-sm font-medium text-amber-700">
            You have unsaved changes. Click <strong>Save Changes</strong> to
            update your organization profile.
          </p>
        </div>
      )}
    </form>
  );
}
