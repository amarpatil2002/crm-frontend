import { useCallback, useEffect, useState } from "react";
import { Building2, RefreshCw, AlertCircle } from "lucide-react";

import OrganizationProfileForm from "../components/OrganizationProfileForm";
import OrganizationOverviewCard from "../components/OrganizationOverviewCard";

import { getMyOrganizationApi } from "../api/organization.api";

import type { Organization } from "../types/organization.type";

export default function OrganizationProfilePage() {
  const [organization, setOrganization] = useState<Organization | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchOrganization = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyOrganizationApi();

      setOrganization(response.data);
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to load organization.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrganization();
  }, [fetchOrganization]);

  /* -------------------------------- Loading ------------------------------- */

  if (loading) {
    return (
      <div className="space-y-6">
        <Header onRefresh={fetchOrganization} />

        <LoadingState />
      </div>
    );
  }

  /* -------------------------------- Error -------------------------------- */

  if (error) {
    return (
      <div className="space-y-6">
        <Header onRefresh={fetchOrganization} />

        <ErrorState message={error} onRetry={fetchOrganization} />
      </div>
    );
  }

  if (!organization) {
    return null;
  }

  /* -------------------------------- Success ------------------------------- */

  return (
    <section className="space-y-6">
      <Header onRefresh={fetchOrganization} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <OrganizationProfileForm
          organization={organization}
          onUpdated={setOrganization}
        />

        <OrganizationOverviewCard organization={organization} />
      </div>
    </section>
  );
}

/* ====================================================================== */

interface HeaderProps {
  onRefresh: () => void;
}

function Header({ onRefresh }: HeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100">
          <Building2 className="h-7 w-7 text-indigo-600" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Organization Profile
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage your organization information, branding, address and
            workspace settings.
          </p>
        </div>
      </div>

      <button
        onClick={onRefresh}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
      >
        <RefreshCw className="h-4 w-4" />
        Refresh
      </button>
    </div>
  );
}

/* ====================================================================== */

function LoadingState() {
  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-6">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-64 animate-pulse rounded-2xl border border-slate-200 bg-white"
          />
        ))}
      </div>

      <div className="h-[780px] animate-pulse rounded-2xl border border-slate-200 bg-white" />
    </div>
  );
}

/* ====================================================================== */

interface ErrorProps {
  message: string;
  onRetry: () => void;
}

function ErrorState({ message, onRetry }: ErrorProps) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
      <div className="flex gap-4">
        <AlertCircle className="mt-1 h-7 w-7 text-red-600" />

        <div>
          <h2 className="text-lg font-semibold text-red-700">
            Unable to load organization
          </h2>

          <p className="mt-2 text-sm text-red-600">{message}</p>

          <button
            onClick={onRetry}
            className="mt-5 rounded-xl bg-red-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}
