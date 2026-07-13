import {
  Crown,
  CalendarDays,
  HardDrive,
  Users,
  CheckCircle2,
} from "lucide-react";

import type { Organization } from "../types/organization.type";

interface SubscriptionCardProps {
  organization: Organization;
}

function formatDate(date?: string | null) {
  if (!date) return "Never";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getPlanColor(plan: string) {
  switch (plan) {
    case "FREE":
      return "bg-slate-100 text-slate-700";

    case "STARTER":
      return "bg-blue-100 text-blue-700";

    case "PRO":
      return "bg-indigo-100 text-indigo-700";

    case "BUSINESS":
      return "bg-purple-100 text-purple-700";

    case "ENTERPRISE":
      return "bg-amber-100 text-amber-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
}

export default function SubscriptionCard({
  organization,
}: SubscriptionCardProps) {
  const subscription = organization.subscription;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Subscription</h2>

          <p className="mt-1 text-sm text-slate-500">Current workspace plan.</p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${getPlanColor(
            subscription.plan,
          )}`}
        >
          {subscription.plan}
        </span>
      </div>

      {/* Body */}

      <div className="space-y-5 p-6">
        {/* Status */}

        <div className="flex items-center justify-between rounded-xl bg-green-50 p-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-green-600" />

            <div>
              <p className="text-sm font-semibold text-slate-900">
                Workspace Status
              </p>

              <p className="text-xs text-slate-500">Active Subscription</p>
            </div>
          </div>

          <span className="font-semibold text-green-600">ACTIVE</span>
        </div>

        {/* Plan */}

        <InfoRow
          icon={<Crown className="h-5 w-5 text-indigo-600" />}
          label="Current Plan"
          value={subscription.plan}
        />

        {/* Users */}

        <InfoRow
          icon={<Users className="h-5 w-5 text-blue-600" />}
          label="Maximum Users"
          value={`${subscription.maxUsers} Users`}
        />

        {/* Storage */}

        <InfoRow
          icon={<HardDrive className="h-5 w-5 text-emerald-600" />}
          label="Storage"
          value={`${subscription.maxStorage} MB`}
        />

        {/* Starts */}

        <InfoRow
          icon={<CalendarDays className="h-5 w-5 text-orange-600" />}
          label="Started On"
          value={formatDate(subscription.startsAt)}
        />

        {/* Expires */}

        <InfoRow
          icon={<CalendarDays className="h-5 w-5 text-rose-600" />}
          label="Expires On"
          value={formatDate(subscription.expiresAt)}
        />
      </div>

      {/* Footer */}

      <div className="border-t border-slate-200 p-6">
        <button
          className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          type="button"
        >
          Upgrade Plan
        </button>
      </div>
    </section>
  );
}

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-slate-100 p-2">{icon}</div>

        <div>
          <p className="text-sm font-medium text-slate-900">{label}</p>
        </div>
      </div>

      <span className="text-sm font-semibold text-slate-700">{value}</span>
    </div>
  );
}
