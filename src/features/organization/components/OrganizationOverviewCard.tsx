import type { Organization } from "../types/organization.type";

interface OrganizationOverviewCardProps {
  organization: Organization;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function OrganizationOverviewCard({
  organization,
}: OrganizationOverviewCardProps) {
  const ownerName = organization.owner
    ? `${organization.owner.firstName || ""} ${organization.owner.lastName || ""}`.trim() ||
      organization.owner.email ||
      "Owner"
    : "N/A";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900">
          Organization overview
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Workspace metadata and subscription summary.
        </p>
      </div>

      <div className="space-y-4">
        <InfoRow label="Slug" value={organization.slug} />
        <InfoRow label="Status" value={organization.status} />
        <InfoRow label="Plan" value={organization.subscription.plan} />
        <InfoRow label="Owner" value={ownerName} />
        <InfoRow label="Created" value={formatDate(organization.createdAt)} />
        <InfoRow
          label="Max users"
          value={String(organization.subscription.maxUsers)}
        />
        <InfoRow
          label="Storage"
          value={`${organization.subscription.maxStorage} MB`}
        />
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
      <span className="text-sm font-medium text-slate-500">{label}</span>
      <span className="text-right text-sm font-semibold text-slate-900">
        {value || "—"}
      </span>
    </div>
  );
}
