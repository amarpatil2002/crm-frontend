import { CalendarDays, HardDrive, Users } from "lucide-react";

import type { Subscription } from "../types/organization.type";

interface SubscriptionCardProps {
  subscription: Subscription;
}

const formatDate = (date: string | null) => {
  if (!date) return "Never";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const SubscriptionCard = ({ subscription }: SubscriptionCardProps) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-slate-900">Subscription</h2>

        <p className="mt-1 text-sm text-slate-500">Current workspace plan.</p>
      </div>

      <div className="space-y-5 p-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Current Plan
          </p>

          <span className="mt-2 inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
            {subscription.plan}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Users size={18} className="text-slate-500" />

          <div>
            <p className="text-xs text-slate-500">Max Users</p>

            <p className="font-medium">{subscription.maxUsers}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <HardDrive size={18} className="text-slate-500" />

          <div>
            <p className="text-xs text-slate-500">Storage</p>

            <p className="font-medium">{subscription.maxStorage} MB</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CalendarDays size={18} className="text-slate-500" />

          <div>
            <p className="text-xs text-slate-500">Started</p>

            <p className="font-medium">{formatDate(subscription.startsAt)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CalendarDays size={18} className="text-slate-500" />

          <div>
            <p className="text-xs text-slate-500">Expires</p>

            <p className="font-medium">{formatDate(subscription.expiresAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionCard;
