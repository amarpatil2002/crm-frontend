import {
  Building2,
  Crown,
  Globe,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Users,
  HardDrive,
  CheckCircle2,
} from "lucide-react";

import type { Organization } from "../types/organization.type";

interface Props {
  organization: Organization;
}

function formatDate(date?: string | null) {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getOwnerName(org: Organization) {
  if (!org.owner) return "N/A";

  const first = org.owner.firstName ?? "";
  const last = org.owner.lastName ?? "";

  const name = `${first} ${last}`.trim();

  return name || org.owner.email || "Owner";
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((item) => item[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}

export default function OrganizationOverviewCard({ organization }: Props) {
  const owner = getOwnerName(organization);

  return (
    <aside className="space-y-6">
      {/* Organization */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-500 px-6 py-10">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-white text-3xl font-bold text-indigo-600 shadow-lg">
            {organization.logo ? (
              <img
                src={organization.logo}
                alt={organization.name}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              getInitials(organization.name)
            )}
          </div>

          <div className="mt-5 text-center">
            <h2 className="text-xl font-bold text-white">
              {organization.name}
            </h2>

            <p className="mt-1 text-sm text-indigo-100">@{organization.slug}</p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium text-white">
              <CheckCircle2 className="h-4 w-4" />

              {organization.status}
            </div>
          </div>
        </div>

        <div className="space-y-4 p-6">
          <InfoRow
            icon={<Mail className="h-4 w-4" />}
            label="Email"
            value={organization.email}
          />

          <InfoRow
            icon={<Phone className="h-4 w-4" />}
            label="Phone"
            value={organization.phone || "Not Added"}
          />

          <InfoRow
            icon={<Globe className="h-4 w-4" />}
            label="Website"
            value={organization.website || "Not Added"}
          />

          <InfoRow
            icon={<Building2 className="h-4 w-4" />}
            label="Industry"
            value={organization.industry || "Not Added"}
          />

          <InfoRow
            icon={<MapPin className="h-4 w-4" />}
            label="Country"
            value={organization.address.country || "Not Added"}
          />
        </div>
      </div>

      {/* Workspace */}

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h3 className="font-semibold text-slate-900">
            Workspace Information
          </h3>
        </div>

        <div className="space-y-5 p-6">
          <InfoRow
            icon={<Crown className="h-4 w-4 text-amber-500" />}
            label="Plan"
            value={organization.subscription.plan}
          />

          <InfoRow
            icon={<Users className="h-4 w-4 text-blue-500" />}
            label="Max Users"
            value={`${organization.subscription.maxUsers}`}
          />

          <InfoRow
            icon={<HardDrive className="h-4 w-4 text-emerald-500" />}
            label="Storage"
            value={`${organization.subscription.maxStorage} MB`}
          />

          <InfoRow
            icon={<CalendarDays className="h-4 w-4 text-violet-500" />}
            label="Created"
            value={formatDate(organization.createdAt)}
          />

          <InfoRow
            icon={<CalendarDays className="h-4 w-4 text-rose-500" />}
            label="Updated"
            value={formatDate(organization.updatedAt)}
          />

          <InfoRow
            icon={<Building2 className="h-4 w-4 text-indigo-500" />}
            label="Owner"
            value={owner}
          />
        </div>
      </div>

      {/* Description */}

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h3 className="font-semibold text-slate-900">Description</h3>
        </div>

        <div className="p-6">
          <p className="text-sm leading-7 text-slate-600">
            {organization.description ||
              "No organization description has been added yet."}
          </p>
        </div>
      </div>
    </aside>
  );
}

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-semibold text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
}
