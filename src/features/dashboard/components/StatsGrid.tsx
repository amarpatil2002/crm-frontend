import { Users, BriefcaseBusiness, DollarSign, TrendingUp } from "lucide-react";
import StatsCard from "./StatsCard";

const stats = [
  {
    id: 1,
    title: "Total Leads",
    value: "2,543",
    change: "+12.5%",
    positive: true,
    icon: Users,
  },
  {
    id: 2,
    title: "Active Deals",
    value: "486",
    change: "+8.2%",
    positive: true,
    icon: BriefcaseBusiness,
  },
  {
    id: 3,
    title: "Revenue",
    value: "₹24.8L",
    change: "+15.3%",
    positive: true,
    icon: DollarSign,
  },
  {
    id: 4,
    title: "Conversion Rate",
    value: "68%",
    change: "-2.1%",
    positive: false,
    icon: TrendingUp,
  },
];

export default function StatsGrid() {
  return (
    <section className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Overview</h2>

          <p className="mt-1 text-sm text-slate-500">
            Your business performance at a glance.
          </p>
        </div>

        <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
          Last 30 Days
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatsCard
            key={item.id}
            title={item.title}
            value={item.value}
            change={item.change}
            positive={item.positive}
            icon={item.icon}
          />
        ))}
      </div>
    </section>
  );
}
