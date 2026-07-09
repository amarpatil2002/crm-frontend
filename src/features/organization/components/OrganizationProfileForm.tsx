import { useEffect, useMemo, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Label from "../../../components/ui/Label";
import Input from "../../../components/ui/Input";
import ErrorText from "../../../components/ui/ErrorText";
import Button from "../../../components/ui/Button";
import TextArea from "../../../components/ui/TextArea";

import {
  organizationProfileSchema,
  type OrganizationProfileFormValues,
} from "../schema/organization.schema";
import type {
  Organization,
  UpdateOrganizationPayload,
} from "../types/organization.type";
import { updateMyOrganizationApi } from "../api/organization.api";

interface OrganizationProfileFormProps {
  organization: Organization;
  onUpdated: (organization: Organization) => void;
}

export default function OrganizationProfileForm({
  organization,
  onUpdated,
}: OrganizationProfileFormProps) {
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const defaultValues = useMemo<OrganizationProfileFormValues>(
    () => ({
      name: organization.name || "",
      website: organization.website ?? "",
      email: organization.email || "",
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
        timezone: organization.settings?.timezone || "UTC",
        language: organization.settings?.language || "en",
        currency: organization.settings?.currency || "USD",
      },
    }),
    [organization],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<OrganizationProfileFormValues>({
    resolver: yupResolver(organizationProfileSchema),
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit: SubmitHandler<OrganizationProfileFormValues> = async (
    values,
  ) => {
    try {
      setApiError("");
      setSuccessMessage("");

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

      const response = await updateMyOrganizationApi(payload);

      onUpdated(response.data);
      setSuccessMessage("Organization profile updated successfully.");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update organization profile.";
      setApiError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {apiError ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {apiError}
        </div>
      ) : null}

      {successMessage ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {successMessage}
        </div>
      ) : null}

      {/* Company details */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Company details
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Update the primary information for your organization.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <Label htmlFor="name">Organization name</Label>
            <Input
              id="name"
              {...register("name")}
              error={Boolean(errors.name)}
            />
            <ErrorText message={errors.name?.message} />
          </div>

          <div>
            <Label htmlFor="email">Business email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              error={Boolean(errors.email)}
            />
            <ErrorText message={errors.email?.message} />
          </div>

          <div>
            <Label htmlFor="phone">Phone number</Label>
            <Input
              id="phone"
              {...register("phone")}
              error={Boolean(errors.phone)}
            />
            <ErrorText message={errors.phone?.message} />
          </div>

          <div>
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              placeholder="https://yourcompany.com"
              {...register("website")}
              error={Boolean(errors.website)}
            />
            <ErrorText message={errors.website?.message} />
          </div>

          <div>
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              placeholder="Software / SaaS"
              {...register("industry")}
              error={Boolean(errors.industry)}
            />
            <ErrorText message={errors.industry?.message} />
          </div>

          <div className="md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <TextArea
              id="description"
              rows={4}
              placeholder="Write a short description about your organization"
              {...register("description")}
              error={Boolean(errors.description)}
            />
            <ErrorText message={errors.description?.message} />
          </div>
        </div>
      </section>

      {/* Address */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Address</h3>
          <p className="mt-1 text-sm text-slate-500">
            Set the business location details for invoices, reports, and
            workspace settings.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="md:col-span-2">
            <Label htmlFor="address.street">Street</Label>
            <Input
              id="address.street"
              {...register("address.street")}
              error={Boolean(errors.address?.street)}
            />
            <ErrorText message={errors.address?.street?.message} />
          </div>

          <div>
            <Label htmlFor="address.city">City</Label>
            <Input
              id="address.city"
              {...register("address.city")}
              error={Boolean(errors.address?.city)}
            />
            <ErrorText message={errors.address?.city?.message} />
          </div>

          <div>
            <Label htmlFor="address.state">State</Label>
            <Input
              id="address.state"
              {...register("address.state")}
              error={Boolean(errors.address?.state)}
            />
            <ErrorText message={errors.address?.state?.message} />
          </div>

          <div>
            <Label htmlFor="address.country">Country</Label>
            <Input
              id="address.country"
              {...register("address.country")}
              error={Boolean(errors.address?.country)}
            />
            <ErrorText message={errors.address?.country?.message} />
          </div>

          <div>
            <Label htmlFor="address.zipCode">Zip code</Label>
            <Input
              id="address.zipCode"
              {...register("address.zipCode")}
              error={Boolean(errors.address?.zipCode)}
            />
            <ErrorText message={errors.address?.zipCode?.message} />
          </div>
        </div>
      </section>

      {/* Workspace preferences */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Workspace preferences
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Configure default timezone, language, and currency for this
            organization.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div>
            <Label htmlFor="settings.timezone">Timezone</Label>
            <Input
              id="settings.timezone"
              placeholder="Asia/Kolkata"
              {...register("settings.timezone")}
              error={Boolean(errors.settings?.timezone)}
            />
            <ErrorText message={errors.settings?.timezone?.message} />
          </div>

          <div>
            <Label htmlFor="settings.language">Language</Label>
            <Input
              id="settings.language"
              placeholder="en"
              {...register("settings.language")}
              error={Boolean(errors.settings?.language)}
            />
            <ErrorText message={errors.settings?.language?.message} />
          </div>

          <div>
            <Label htmlFor="settings.currency">Currency</Label>
            <Input
              id="settings.currency"
              placeholder="USD"
              {...register("settings.currency")}
              error={Boolean(errors.settings?.currency)}
            />
            <ErrorText message={errors.settings?.currency?.message} />
          </div>
        </div>
      </section>

      <div className="flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={() => reset(defaultValues)}
          disabled={!isDirty || isSubmitting}
        >
          Reset
        </Button>

        <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
          Save changes
        </Button>
      </div>
    </form>
  );
}
