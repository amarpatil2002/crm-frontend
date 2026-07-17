import { X, ShieldCheck, CheckCircle2, Lock, Layers } from "lucide-react";

import type { Role } from "../types/role.type";

interface RoleDetailsDrawerProps {
  open: boolean;

  role: Role | null;

  onClose: () => void;
}

const badgeClasses: Record<string, string> = {
  ALL: "bg-green-100 text-green-700",

  ORGANIZATION: "bg-blue-100 text-blue-700",

  TEAM: "bg-orange-100 text-orange-700",

  SELF: "bg-slate-100 text-slate-700",
};

const RoleDetailsDrawer = ({ open, role, onClose }: RoleDetailsDrawerProps) => {
  if (!open || !role) return null;

  return (
    <>
      {/* Backdrop */}

      <div onClick={onClose} className="fixed inset-0 z-40 bg-black/40" />

      {/* Drawer */}

      <div className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-2xl flex-col bg-white shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              Role Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View role information and permissions.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* General */}

          <div className="rounded-xl border border-slate-200">
            <div className="border-b border-slate-200 px-5 py-3">
              <h3 className="font-semibold">General Information</h3>
            </div>

            <div className="grid gap-5 p-5 md:grid-cols-2">
              <Info label="Role Name" value={role.name} />

              <Info label="Code" value={role.code} />

              <Info label="Priority" value={String(role.priority)} />

              <Info label="Status" value={role.status} />

              <Info label="System Role" value={role.isSystem ? "Yes" : "No"} />

              <Info
                label="Default Role"
                value={role.isDefault ? "Yes" : "No"}
              />
            </div>

            <div className="border-t border-slate-200 p-5">
              <p className="text-sm font-medium text-slate-600">Description</p>

              <p className="mt-2 text-sm text-slate-700">{role.description}</p>
            </div>
          </div>

          {/* Access Scope */}

          <div className="rounded-xl border border-slate-200">
            <div className="border-b border-slate-200 px-5 py-3">
              <h3 className="font-semibold">Access Scope</h3>
            </div>

            <div className="space-y-3 p-5">
              {Object.entries(role.accessScope).map(([module, scope]) => (
                <div
                  key={module}
                  className="flex items-center justify-between rounded-lg border border-slate-100 px-4 py-3"
                >
                  <span className="capitalize text-sm font-medium">
                    {module}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      badgeClasses[scope]
                    }`}
                  >
                    {scope}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Permissions */}

          <div className="rounded-xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3">
              <h3 className="font-semibold">Permissions</h3>

              <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                {role.permissionCount} Permissions
              </span>
            </div>

            <div className="grid gap-3 p-5 md:grid-cols-2">
              {role.permissionKeys.map((permission) => (
                <div
                  key={permission}
                  className="flex items-center gap-3 rounded-lg border border-slate-100 p-3"
                >
                  <CheckCircle2 size={16} className="text-green-600" />

                  <span className="text-sm">{permission}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Meta */}

          <div className="rounded-xl border border-slate-200">
            <div className="border-b border-slate-200 px-5 py-3">
              <h3 className="font-semibold">Restrictions</h3>
            </div>

            <div className="space-y-4 p-5">
              <div className="flex items-center gap-3">
                <Lock size={18} className="text-slate-500" />

                <span className="text-sm">
                  Can Edit :
                  <strong className="ml-2">
                    {role.meta.canEdit ? "Yes" : "No"}
                  </strong>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Layers size={18} className="text-slate-500" />

                <span className="text-sm">
                  Can Delete :
                  <strong className="ml-2">
                    {role.meta.canDelete ? "Yes" : "No"}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface InfoProps {
  label: string;

  value: string;
}

const Info = ({ label, value }: InfoProps) => (
  <div>
    <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
      {label}
    </p>

    <p className="mt-1 text-sm font-medium text-slate-900">{value}</p>
  </div>
);

export default RoleDetailsDrawer;
