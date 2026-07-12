import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "New", value: 450, color: "#6366F1" },
  { name: "Qualified", value: 325, color: "#3B82F6" },
  { name: "Proposal", value: 258, color: "#F59E0B" },
  { name: "Negotiation", value: 193, color: "#14B8A6" },
  { name: "Won", value: 61, color: "#22C55E" },
];

const total = data.reduce((sum, item) => sum + item.value, 0);

export default function DealsChart() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Deals by Stage</h2>

        <button className="rounded-lg border border-slate-200 px-3 py-1 text-sm text-slate-600 hover:bg-slate-100">
          This Month
        </button>
      </div>

      <div className="flex flex-col items-center gap-8 lg:flex-row">
        <div className="relative h-72 w-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={70}
                outerRadius={95}
                paddingAngle={4}
                stroke="none"
              >
                {data.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          {/* Center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-4xl font-bold text-slate-900">{total}</p>

            <span className="text-sm text-slate-500">Total</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-4">
          {data.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />

                <span className="text-sm text-slate-700">{item.name}</span>
              </div>

              <span className="text-sm font-medium text-slate-500">
                {Math.round((item.value / total) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
