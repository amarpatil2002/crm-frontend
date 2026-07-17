import { useState } from "react";
import {
  X,
  CheckCircle2,
  ShieldCheck,
  Users,
  IdCard,
  Building2,
  DollarSign,
  CheckSquare,
  Calendar,
  BarChart2,
  Package,
  Megaphone,
  Settings as SettingsIcon,
  Clock,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import type { Role } from "../types/role.type";

interface RoleDetailsDrawerProps {
  open: boolean;
  role: Role | null;
  onClose: () => void;
}

type Scope = "ALL" | "ORGANIZATION" | "TEAM" | "SELF" | "OWN" | "NONE";

type Tab = "overview" | "permissions" | "users" | "audit";

const badgeClasses: Record<Scope, string> = {
  ALL: "bg-green-100 text-green-700",
  ORGANIZATION: "bg-blue-100 text-blue-700",
  TEAM: "bg-orange-100 text-orange-700",
  SELF: "bg-slate-100 text-slate-700",
  OWN: "bg-purple-100 text-purple-700",
  NONE: "bg-slate-50 text-slate-400 border border-slate-200",
};

const scopeLabels: Record<Scope, string> = {
  ALL: "All",
  ORGANIZATION: "Organization",
  TEAM: "Team",
  SELF: "Self",
  OWN: "Own",
  NONE: "No Access",
};

const moduleIcons: Record<string, LucideIcon> = {
  leads: Users,
  contacts: IdCard,
  accounts: Building2,
  deals: DollarSign,
  tasks: CheckSquare,
  reports: BarChart2,
  activities: Calendar,
  products: Package,
  campaigns: Megaphone,
  settings: SettingsIcon,
};

const tabs: {
  key: Tab;
  label: string;
  count?: (role: Role) => number | undefined;
}[] = [
  { key: "overview", label: "Overview" },
  {
    key: "permissions",
    label: "Permissions",
    count: (role) => role.permissionCount,
  },
];

const groupPermissions = (permissions: string[]) => {
  const grouped: Record<
    string,
    {
      create: boolean;
      read: boolean;
      update: boolean;
      delete: boolean;
      other: string[];
    }
  > = {};

  permissions.forEach((permission) => {
    const [module, action] = permission.split(":");

    if (!grouped[module]) {
      grouped[module] = {
        create: false,
        read: false,
        update: false,
        delete: false,
        other: [],
      };
    }

    switch (action) {
      case "create":
        grouped[module].create = true;
        break;

      case "read":
        grouped[module].read = true;
        break;

      case "update":
        grouped[module].update = true;
        break;

      case "delete":
        grouped[module].delete = true;
        break;

      default:
        grouped[module].other.push(action);
    }
  });

  return grouped;
};

const RoleDetailsDrawer = ({ open, role, onClose }: RoleDetailsDrawerProps) => {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  if (!open || !role) return null;

  const accessScopes = Object.entries(role.accessScope) as [string, Scope][];
  const left = accessScopes.slice(0, Math.ceil(accessScopes.length / 2));
  const right = accessScopes.slice(Math.ceil(accessScopes.length / 2));

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 z-40 bg-black/40" />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-2xl flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">
          <h2 className="text-lg font-semibold text-slate-900">Role Details</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Identity block */}
        <div className="flex items-start justify-between border-b border-slate-200 px-8 py-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-indigo-50">
              <ShieldCheck size={26} className="text-indigo-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                {role.name}
              </h3>
              <p className="mt-1 text-sm text-slate-500">{role.description}</p>
            </div>
          </div>

          <span
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
              role.status === "ACTIVE"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {role.status === "ACTIVE" ? "Active" : "Inactive"}
          </span>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-slate-200 px-8">
          {tabs.map((tab) => {
            const count = tab.count?.(role);
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative py-3 text-sm font-medium transition ${
                  isActive
                    ? "text-indigo-600"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab.label}
                {count !== undefined && ` (${count})`}
                {isActive && (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-indigo-600" />
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-8 overflow-y-auto p-8">
          {activeTab === "overview" && (
            <>
              {/* Role Information */}
              <section>
                <h4 className="mb-5 text-base font-semibold text-slate-900">
                  Role Information
                </h4>

                <div className="grid grid-cols-3 gap-x-8 gap-y-6">
                  <Info label="Role Name" value={role.name} />

                  <Info label="Role Code" value={role.code} />

                  <Info
                    label="Role Type"
                    value={role.isSystem ? "System Role" : "Custom Role"}
                  />

                  <Info label="Status" value={role.status} />

                  <Info label="Priority" value={String(role.priority)} />

                  <Info
                    label="Default Role"
                    value={role.isDefault ? "Yes" : "No"}
                  />

                  <Info
                    label="System Role"
                    value={role.isSystem ? "Yes" : "No"}
                  />

                  <Info
                    label="Created At"
                    value={new Date(role.createdAt).toLocaleString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  />

                  <Info
                    label="Updated At"
                    value={new Date(role.updatedAt).toLocaleString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  />
                </div>
              </section>

              {/* Access Scope */}
              <section>
                <h4 className="mb-5 text-base font-semibold text-slate-900">
                  Access Scope
                </h4>

                <div className="grid grid-cols-2 gap-8">
                  {[left, right].map((group, index) => (
                    <div key={index}>
                      <div className="mb-2 grid grid-cols-2 text-xs font-medium uppercase text-slate-500">
                        <span>Module</span>
                        <span>Access Level</span>
                      </div>

                      {group.map(([module, scope]) => {
                        const Icon = moduleIcons[module] ?? UserRound;
                        return (
                          <div
                            key={module}
                            className="grid grid-cols-2 items-center border-t border-slate-100 py-3"
                          >
                            <span className="flex items-center gap-2 text-sm capitalize text-slate-700">
                              <Icon size={15} className="text-slate-400" />
                              {module}
                            </span>

                            <span
                              className={`w-fit rounded-full px-2 py-1 text-xs font-medium ${badgeClasses[scope]}`}
                            >
                              {scopeLabels[scope]}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </section>

              {/* Description */}
              <section>
                <h4 className="mb-2 text-base font-semibold text-slate-900">
                  Description
                </h4>
                <p className="text-sm text-slate-500">{role.description}</p>
              </section>
            </>
          )}

          {activeTab === "permissions" && (
            <section>
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-slate-900">
                  Permissions
                </h4>

                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
                  {role.permissionCount} Permissions
                </span>
              </div>

              <div className="overflow-hidden rounded-lg border border-slate-200">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                        Module
                      </th>

                      <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-slate-500">
                        Create
                      </th>

                      <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-slate-500">
                        Read
                      </th>

                      <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-slate-500">
                        Update
                      </th>

                      <th className="px-4 py-3 text-center text-xs font-semibold uppercase text-slate-500">
                        Delete
                      </th>

                      <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                        Other
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {Object.entries(groupPermissions(role.permissionKeys)).map(
                      ([module, actions]) => (
                        <tr key={module} className="border-t border-slate-100">
                          <td className="px-4 py-3 font-medium capitalize text-slate-800">
                            {module}
                          </td>

                          <td className="text-center">
                            {actions.create ? "✅" : "—"}
                          </td>

                          <td className="text-center">
                            {actions.read ? "✅" : "—"}
                          </td>

                          <td className="text-center">
                            {actions.update ? "✅" : "—"}
                          </td>

                          <td className="text-center">
                            {actions.delete ? "✅" : "—"}
                          </td>

                          <td className="px-4 py-3 text-xs text-slate-600">
                            {actions.other.length
                              ? actions.other.join(", ")
                              : "-"}
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 px-6 py-4">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-5 py-2 text-sm font-medium transition hover:bg-slate-100"
            >
              Close
            </button>
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
    <p className="text-xs text-slate-500">{label}</p>
    <p className="mt-1 text-sm font-medium text-slate-900">{value}</p>
  </div>
);

export default RoleDetailsDrawer;
