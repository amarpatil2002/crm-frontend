import { CalendarDays, Clock3, CheckCircle2, Circle } from "lucide-react";

const tasks = [
  {
    id: 1,
    title: "Call Google Team",
    due: "Today • 10:30 AM",
    priority: "High",
    completed: false,
  },
  {
    id: 2,
    title: "Product Demo with Microsoft",
    due: "Tomorrow • 02:00 PM",
    priority: "Medium",
    completed: false,
  },
  {
    id: 3,
    title: "Send Proposal to Amazon",
    due: "15 Jul • 11:00 AM",
    priority: "High",
    completed: true,
  },
  {
    id: 4,
    title: "Follow-up Meeting",
    due: "16 Jul • 04:30 PM",
    priority: "Low",
    completed: false,
  },
];

const priorityColors = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};

export default function UpcomingTasks() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            Upcoming Tasks
          </h2>

          <p className="mt-1 text-sm text-slate-500">Your scheduled work</p>
        </div>

        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
          View All
        </button>
      </div>

      {/* Tasks */}
      <div className="space-y-4 p-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="rounded-xl border border-slate-200 p-4 transition hover:border-indigo-200 hover:bg-slate-50"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                {task.completed ? (
                  <CheckCircle2 className="mt-1 h-5 w-5 text-green-600" />
                ) : (
                  <Circle className="mt-1 h-5 w-5 text-slate-400" />
                )}

                <div>
                  <h3
                    className={`font-medium ${
                      task.completed
                        ? "text-slate-400 line-through"
                        : "text-slate-800"
                    }`}
                  >
                    {task.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <CalendarDays className="h-4 w-4" />
                    {task.due}
                  </div>
                </div>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  priorityColors[task.priority as keyof typeof priorityColors]
                }`}
              >
                {task.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
