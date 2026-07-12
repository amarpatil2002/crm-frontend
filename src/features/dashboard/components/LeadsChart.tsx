import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "May 1", leads: 1000 },
  { month: "May 8", leads: 1600 },
  { month: "May 15", leads: 1450 },
  { month: "May 22", leads: 2200 },
  { month: "May 29", leads: 2800 },
];

export default function LeadsChart() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Leads Overview
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Monthly lead performance
          </p>
        </div>

        <button className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100">
          This Month
        </button>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="leadGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="#E2E8F0"
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 12 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #E2E8F0",
                background: "#fff",
              }}
            />

            <Area
              type="monotone"
              dataKey="leads"
              stroke="#6366F1"
              strokeWidth={3}
              fill="url(#leadGradient)"
              activeDot={{
                r: 6,
                fill: "#6366F1",
                stroke: "#fff",
                strokeWidth: 3,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
