import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change: string;
  positive: boolean;
  icon: LucideIcon;
}

export default function StatsCard({
  title,
  value,
  change,
  positive,
  icon: Icon,
}: StatsCardProps) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        {/* Left */}
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {value}
          </h2>

          <div className="mt-4 flex items-center gap-2">
            <span
              className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
                positive
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {positive ? (
                <ArrowUpRight className="h-3.5 w-3.5" />
              ) : (
                <ArrowDownRight className="h-3.5 w-3.5" />
              )}

              {change}
            </span>

            <span className="text-xs text-slate-500">vs last month</span>
          </div>
        </div>

        {/* Right */}
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 transition group-hover:bg-indigo-100">
          <Icon className="h-7 w-7 text-indigo-600" />
        </div>
      </div>
    </div>
  );
}
