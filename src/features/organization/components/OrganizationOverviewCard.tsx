import {
  Building2,
  Calendar,
  Globe,
  Hash,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";

import type { Organization } from "../types/organization.type";

interface OrganizationOverviewCardProps {
  organization: Organization;
}

const OrganizationOverviewCard = ({
  organization,
}: OrganizationOverviewCardProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const statusColor =
    organization.status === "ACTIVE"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}

      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Organization Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Quick information about your workspace.
        </p>
      </div>

      {/* Body */}

      <div className="space-y-5 p-6">
        {/* Status */}

        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">Status</span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor}`}
          >
            {organization.status}
          </span>
        </div>

        {/* Organization ID */}

        <div className="flex items-center gap-3">
          <Hash size={18} className="text-slate-500" />

          <div>
            <p className="text-xs text-slate-500">Organization ID</p>

            <p className="break-all text-sm font-medium">{organization._id}</p>
          </div>
        </div>

        {/* Slug */}

        <div className="flex items-center gap-3">
          <Building2 size={18} className="text-slate-500" />

          <div>
            <p className="text-xs text-slate-500">Slug</p>

            <p className="text-sm font-medium">{organization.slug}</p>
          </div>
        </div>

        {/* Email */}

        <div className="flex items-center gap-3">
          <Mail size={18} className="text-slate-500" />

          <div>
            <p className="text-xs text-slate-500">Email</p>

            <p className="text-sm font-medium">{organization.email}</p>
          </div>
        </div>

        {/* Phone */}

        <div className="flex items-center gap-3">
          <Phone size={18} className="text-slate-500" />

          <div>
            <p className="text-xs text-slate-500">Phone</p>

            <p className="text-sm font-medium">{organization.phone || "-"}</p>
          </div>
        </div>

        {/* Website */}

        <div className="flex items-center gap-3">
          <Globe size={18} className="text-slate-500" />

          <div>
            <p className="text-xs text-slate-500">Website</p>

            <p className="break-all text-sm font-medium">
              {organization.website || "-"}
            </p>
          </div>
        </div>

        {/* Created */}

        <div className="flex items-center gap-3">
          <Calendar size={18} className="text-slate-500" />

          <div>
            <p className="text-xs text-slate-500">Created At</p>

            <p className="text-sm font-medium">
              {formatDate(organization.createdAt)}
            </p>
          </div>
        </div>

        {/* Updated */}

        <div className="flex items-center gap-3">
          <Calendar size={18} className="text-slate-500" />

          <div>
            <p className="text-xs text-slate-500">Last Updated</p>

            <p className="text-sm font-medium">
              {formatDate(organization.updatedAt)}
            </p>
          </div>
        </div>

        {/* Owner */}

        <div className="flex items-center gap-3">
          <ShieldCheck size={18} className="text-slate-500" />

          <div>
            <p className="text-xs text-slate-500">Owner ID</p>

            <p className="break-all text-sm font-medium">
              {organization.owner._id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationOverviewCard;
