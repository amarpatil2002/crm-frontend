import { Eye, ShieldCheck, Pencil, Trash2 } from "lucide-react";

import type { Role } from "../types/role.type";

interface RolesTableProps {
  roles: Role[];

  onView: (role: Role) => void;

  onEdit?: (role: Role) => void;

  onDelete?: (role: Role) => void;
}

const RolesTable = ({ roles, onView, onEdit, onDelete }: RolesTableProps) => {
  if (!roles.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white py-16 text-center">
        <ShieldCheck size={40} className="mx-auto text-slate-300" />

        <h3 className="mt-4 text-lg font-semibold text-slate-900">
          No Roles Found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Create your first custom role.
        </p>
      </div>
    );
  }

  console.log(roles);

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <table className="w-full">
        <thead className="bg-slate-50">
          <tr className="border-b border-slate-200">
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
              Role
            </th>

            <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
              Priority
            </th>

            <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
              Permissions
            </th>

            <th className="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">
              Status
            </th>

            <th className="px-6 py-3 text-center text-xs font-semibold uppercase text-slate-500">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {roles.map((role) => (
            <tr
              key={role._id}
              className="border-b border-slate-100 hover:bg-slate-50"
            >
              {/* Role */}

              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-indigo-100 p-2">
                    <ShieldCheck size={16} className="text-indigo-600" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-slate-900">
                        {role.name}
                      </p>

                      {role.isSystem && (
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                          System
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500">{role.code}</p>
                  </div>
                </div>
              </td>

              {/* Priority */}

              <td className="px-6 py-4">
                <span className="rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                  {role.priority}
                </span>
              </td>

              {/* Permissions */}

              <td className="px-6 py-4">
                <span className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                  {role.permissionCount} Permissions
                </span>
              </td>

              {/* Status */}

              <td className="px-6 py-4">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    role.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {role.status}
                </span>
              </td>

              {/* Actions */}

              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  {/* View - Available for all roles */}
                  <button
                    type="button"
                    onClick={() => onView(role)}
                    className="rounded-lg p-2 transition hover:bg-slate-100"
                    title="View Details"
                  >
                    <Eye size={18} className="text-slate-600" />
                  </button>

                  {/* Edit - Only if allowed */}
                  {role.meta.canEdit && (
                    <button
                      type="button"
                      onClick={() => onEdit?.(role)}
                      className="rounded-lg p-2 transition hover:bg-slate-100"
                      title="Edit Role"
                    >
                      <Pencil size={18} className="text-slate-600" />
                    </button>
                  )}

                  {/* Delete - Only if allowed */}
                  {role.meta.canDelete && (
                    <button
                      type="button"
                      onClick={() => onDelete?.(role)}
                      className="rounded-lg p-2 transition hover:bg-red-50"
                      title="Delete Role"
                    >
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RolesTable;
