import { useEffect, useState } from "react";
import OrganizationProfileForm from "../components/OrganizationProfileForm";
import OrganizationOverviewCard from "../components/OrganizationOverviewCard";
import { getMyOrganizationApi } from "../api/organization.api";
import type { Organization } from "../types/organization.type";

export default function OrganizationProfilePage() {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState("");

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        setLoading(true);
        setPageError("");

        const response = await getMyOrganizationApi();
        setOrganization(response.data);
      } catch (error: any) {
        const message =
          error?.response?.data?.message ||
          error?.message ||
          "Failed to load organization profile.";
        setPageError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganization();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Organization profile
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your organization details, address, and workspace
            preferences.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-3xl border border-slate-200 bg-white"
              />
            ))}
          </div>

          <div className="h-96 animate-pulse rounded-3xl border border-slate-200 bg-white" />
        </div>
      </div>
    );
  }

  if (pageError || !organization) {
    return (
      <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-rose-700">
        {pageError || "Organization data not found."}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Organization profile
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage your workspace identity, contact information, and default
          business settings.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <OrganizationProfileForm
            organization={organization}
            onUpdated={setOrganization}
          />
        </div>

        <div>
          <OrganizationOverviewCard organization={organization} />
        </div>
      </div>
    </div>
  );
}
