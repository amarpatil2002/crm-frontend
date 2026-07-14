import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import { fetchOrganization } from "../redux/organizationSlice";

import OrganizationProfileForm from "../components/OrganizationProfileForm";

const OrganizationProfilePage = () => {
  const dispatch = useAppDispatch();

  const { organization, loading, error } = useAppSelector(
    (state) => state.organization,
  );

  useEffect(() => {
    dispatch(fetchOrganization());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

          <p className="text-sm text-slate-500">Loading organization...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="rounded-xl border border-red-200 bg-red-50 px-8 py-6 text-center">
          <h2 className="text-lg font-semibold text-red-600">
            Something went wrong
          </h2>

          <p className="mt-2 text-sm text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="rounded-xl border border-slate-200 bg-white px-8 py-6 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-slate-800">
            Organization Not Found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            No organization information available.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-6 p-6">
      {/* Page Header */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Organization</h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your organization's profile, address, logo and workspace
            settings.
          </p>
        </div>
      </div>

      {/* Profile Form */}

      <OrganizationProfileForm organization={organization} />
    </section>
  );
};

export default OrganizationProfilePage;
