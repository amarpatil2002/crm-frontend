import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { fetchOrganization } from "../redux/organizationSlice";
import OrganizationProfileForm from "../components/OrganizationProfileForm";
import MemberPage from "../../members/page/MemberPage";
import RolesPermissionsPage from "../../rolesandpermissions/page/RolesPermissionsPage";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "members", label: "Members" },
  { id: "roles", label: "Roles & Permissions" },
  { id: "branding", label: "Branding" },
];

const OrganizationProfilePage = () => {
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState("overview");

  const { organization, loading, error } = useAppSelector(
    (state) => state.organization,
  );

  useEffect(() => {
    dispatch(fetchOrganization());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!organization) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <p>No organization found.</p>
      </div>
    );
  }

  return (
    <section className="space-y-6 p-6">
      {/* Small Header */}

      <div>
        <h1 className="text-2xl font-bold text-slate-900">Organization</h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your organization settings.
        </p>
      </div>

      {/* Tabs */}

      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`border-b-2 px-5 py-3 text-sm font-medium transition ${
              activeTab === tab.id
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}

      {activeTab === "overview" && (
        <OrganizationProfileForm organization={organization} />
      )}

      {activeTab === "members" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <MemberPage />
        </div>
      )}

      {activeTab === "roles" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <RolesPermissionsPage />
        </div>
      )}

      {activeTab === "branding" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          Branding Module
        </div>
      )}
    </section>
  );
};

export default OrganizationProfilePage;
