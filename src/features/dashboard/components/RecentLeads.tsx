const leads = [
  {
    id: 1,
    name: "Rohan Mehta",
    company: "Acme Corp",
    email: "rohan@acme.com",
    status: "New",
    createdAt: "2m ago",
  },
  {
    id: 2,
    name: "Priya Sharma",
    company: "PixelWorks",
    email: "priya@pixelworks.com",
    status: "Qualified",
    createdAt: "10m ago",
  },
  {
    id: 3,
    name: "Viraj Singh",
    company: "TechNova",
    email: "viraj@technova.com",
    status: "Proposal",
    createdAt: "1h ago",
  },
  {
    id: 4,
    name: "Ananya Iyer",
    company: "InnovateX",
    email: "ananya@innovatex.com",
    status: "Negotiation",
    createdAt: "2h ago",
  },
  {
    id: 5,
    name: "Karan Malhotra",
    company: "SoftSol",
    email: "karan@softsol.com",
    status: "Won",
    createdAt: "3h ago",
  },
];

const statusColor = {
  New: "bg-indigo-100 text-indigo-700",
  Qualified: "bg-green-100 text-green-700",
  Proposal: "bg-yellow-100 text-yellow-700",
  Negotiation: "bg-orange-100 text-orange-700",
  Won: "bg-emerald-100 text-emerald-700",
};

export default function RecentLeadsTable() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <h2 className="text-lg font-semibold text-slate-800">Recent Leads</h2>

        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
          View All
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Name
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Company
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Email
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>

              <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Created
              </th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-slate-100 transition hover:bg-slate-50"
              >
                <td className="px-6 py-4 font-medium text-slate-800">
                  {lead.name}
                </td>

                <td className="px-6 py-4 text-slate-600">{lead.company}</td>

                <td className="px-6 py-4 text-slate-500">{lead.email}</td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      statusColor[lead.status as keyof typeof statusColor]
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-right text-sm text-slate-500">
                  {lead.createdAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
