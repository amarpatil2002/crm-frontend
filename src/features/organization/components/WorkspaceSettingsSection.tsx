import type { FieldErrors, UseFormRegister } from "react-hook-form";

import type { OrganizationProfileFormValues } from "../types/organization.type";

interface WorkspaceSettingsCardProps {
  register: UseFormRegister<OrganizationProfileFormValues>;
  errors: FieldErrors<OrganizationProfileFormValues>;
}

const TIMEZONES = [
  "UTC",
  "Asia/Kolkata",
  "Asia/Dubai",
  "Europe/London",
  "America/New_York",
  "America/Chicago",
  "America/Los_Angeles",
  "Asia/Tokyo",
  "Asia/Singapore",
  "Australia/Sydney",
];

const LANGUAGES = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "Hindi",
    value: "hi",
  },
  {
    label: "French",
    value: "fr",
  },
  {
    label: "German",
    value: "de",
  },
  {
    label: "Spanish",
    value: "es",
  },
];

const CURRENCIES = [
  {
    label: "Indian Rupee (INR)",
    value: "INR",
  },
  {
    label: "US Dollar (USD)",
    value: "USD",
  },
  {
    label: "Euro (EUR)",
    value: "EUR",
  },
  {
    label: "British Pound (GBP)",
    value: "GBP",
  },
  {
    label: "UAE Dirham (AED)",
    value: "AED",
  },
];

export default function WorkspaceSettingsCard({
  register,
  errors,
}: WorkspaceSettingsCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}

      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Workspace Settings
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Configure your organization's default regional preferences.
        </p>
      </div>

      {/* Body */}

      <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-3">
        {/* Timezone */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Timezone
          </label>

          <select
            {...register("settings.timezone")}
            className={`h-11 w-full rounded-xl border bg-white px-4 text-sm outline-none transition
            ${
              errors.settings?.timezone
                ? "border-red-500"
                : "border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            }`}
          >
            {TIMEZONES.map((timezone) => (
              <option key={timezone} value={timezone}>
                {timezone}
              </option>
            ))}
          </select>

          {errors.settings?.timezone && (
            <p className="mt-1 text-xs text-red-500">
              {errors.settings.timezone.message}
            </p>
          )}
        </div>

        {/* Language */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Language
          </label>

          <select
            {...register("settings.language")}
            className={`h-11 w-full rounded-xl border bg-white px-4 text-sm outline-none transition
            ${
              errors.settings?.language
                ? "border-red-500"
                : "border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            }`}
          >
            {LANGUAGES.map((language) => (
              <option key={language.value} value={language.value}>
                {language.label}
              </option>
            ))}
          </select>

          {errors.settings?.language && (
            <p className="mt-1 text-xs text-red-500">
              {errors.settings.language.message}
            </p>
          )}
        </div>

        {/* Currency */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Currency
          </label>

          <select
            {...register("settings.currency")}
            className={`h-11 w-full rounded-xl border bg-white px-4 text-sm outline-none transition
            ${
              errors.settings?.currency
                ? "border-red-500"
                : "border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            }`}
          >
            {CURRENCIES.map((currency) => (
              <option key={currency.value} value={currency.value}>
                {currency.label}
              </option>
            ))}
          </select>

          {errors.settings?.currency && (
            <p className="mt-1 text-xs text-red-500">
              {errors.settings.currency.message}
            </p>
          )}
        </div>
      </div>

      {/* Footer */}

      <div className="flex justify-end border-t border-slate-200 px-6 py-4">
        <p className="text-xs text-slate-400">
          These settings will be used as default values throughout your CRM.
        </p>
      </div>
    </section>
  );
}
