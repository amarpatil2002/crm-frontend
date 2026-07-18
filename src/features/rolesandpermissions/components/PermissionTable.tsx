import type { AccessScope, Permissions } from "../types/role.type";

interface PermissionGroup {
  module: string;
  permissions: Permissions[];
}

interface PermissionTableProps {
  permissions: PermissionGroup[];

  selectedPermissions: string[];

  accessScope: Record<string, AccessScope>;

  onPermissionChange: (permission: string) => void;

  onScopeChange: (module: string, scope: AccessScope) => void;
  onSelectAll: (module: string, checked: boolean) => void;
}

const scopes: AccessScope[] = ["OWN", "TEAM", "ALL"];

const PermissionTable = ({
  permissions,
  selectedPermissions,
  accessScope,
  onPermissionChange,
  onScopeChange,
  onSelectAll,
}: PermissionTableProps) => {
  return (
    <div className="space-y-5">
      {permissions.map((group) => {
        const allSelected =
          group.permissions.length > 0 &&
          group.permissions.every((permission) =>
            selectedPermissions.includes(permission.key),
          );

        return (
          <div
            key={group.module}
            className="rounded-2xl border border-slate-200 bg-white"
          >
            {/* Header */}

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-2">
              <div>
                <h3 className="text-base font-semibold capitalize text-slate-900">
                  {group.module}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                  {group.permissions.length} permissions
                </p>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={(e) =>
                      onSelectAll(group.module, e.target.checked)
                    }
                  />
                  Select All
                </label>

                <select
                  value={accessScope[group.module] ?? "SELF"}
                  onChange={(e) =>
                    onScopeChange(group.module, e.target.value as AccessScope)
                  }
                  className="rounded-lg border border-slate-300 bg-white px-2 py-2 text-sm"
                >
                  {scopes.map((scope) => (
                    <option key={scope}>{scope}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Permission Grid */}

            <div className="grid gap-2 p-2 md:grid-cols-2 lg:grid-cols-3">
              {group.permissions.map((permission) => {
                const checked = selectedPermissions.includes(permission.key);

                return (
                  <label
                    key={permission.key}
                    className={`flex cursor-pointer items-start gap-2 rounded-xl  p-2 transition `}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onPermissionChange(permission.key)}
                      className="mt-1"
                    />

                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {permission.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {permission.key.toUpperCase().split(":")[1]}{" "}
                        {permission.key.toUpperCase().split(":")[0]}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PermissionTable;
