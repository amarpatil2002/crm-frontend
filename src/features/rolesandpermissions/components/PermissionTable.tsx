import type { AccessScope, Permission } from "../types/role.type";

interface PermissionGroup {
  module: string;
  permissions: Permission[];
}

interface PermissionTableProps {
  permissions: PermissionGroup[];

  selectedPermissions: string[];

  accessScope: Record<string, AccessScope>;

  onPermissionChange: (permission: string) => void;

  onScopeChange: (module: string, scope: AccessScope) => void;
}

const scopes: AccessScope[] = ["SELF", "TEAM", "ORGANIZATION", "ALL"];

const PermissionTable = ({
  permissions,
  selectedPermissions,
  accessScope,
  onPermissionChange,
  onScopeChange,
}: PermissionTableProps) => {
  return (
    <div className="space-y-5">
      {permissions.map((group) => {
        const allSelected = group.permissions.every((permission) =>
          selectedPermissions.includes(permission.key),
        );

        return (
          <div
            key={group.module}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white"
          >
            {/* Header */}

            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
              <div>
                <h3 className="text-sm font-semibold capitalize text-slate-900">
                  {group.module}
                </h3>

                <p className="text-xs text-slate-500">
                  {group.permissions.length} Permissions
                </p>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={() => {
                      group.permissions.forEach((permission) => {
                        const checked = selectedPermissions.includes(
                          permission.key,
                        );

                        if (!checked) {
                          onPermissionChange(permission.key);
                        }
                      });
                    }}
                  />
                  Select All
                </label>

                <select
                  value={accessScope[group.module] ?? "SELF"}
                  onChange={(e) =>
                    onScopeChange(group.module, e.target.value as AccessScope)
                  }
                  className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                >
                  {scopes.map((scope) => (
                    <option key={scope} value={scope}>
                      {scope}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Permission Table */}

            <table className="w-full">
              <thead className="bg-white">
                <tr className="border-b border-slate-200">
                  <th className="w-14 px-4 py-3"></th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                    Permission
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase text-slate-500">
                    Description
                  </th>
                </tr>
              </thead>

              <tbody>
                {group.permissions.map((permission) => (
                  <tr
                    key={permission.key}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedPermissions.includes(permission.key)}
                        onChange={() => onPermissionChange(permission.key)}
                      />
                    </td>

                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900">
                        {permission.name}
                      </div>

                      <div className="text-xs text-slate-500">
                        {permission.key}
                      </div>
                    </td>

                    <td className="px-4 py-3 text-sm text-slate-600">
                      {permission.description || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default PermissionTable;
