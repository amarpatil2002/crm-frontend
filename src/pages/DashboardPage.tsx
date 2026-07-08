import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { logout } from "../app/authSlice";

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome{user?.firstName ? `, ${user.firstName}` : ""}
            </h1>
            <p className="mt-2 text-slate-400">
              You’re logged in to the CRM dashboard.
            </p>
          </div>

          <button
            onClick={() => dispatch(logout())}
            className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
