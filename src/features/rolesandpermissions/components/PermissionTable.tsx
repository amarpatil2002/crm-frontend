import type { AccessScope } from "../types/role.type";

interface PermissionModule {
  module: string;

  permissions: string[];
}

interface PermissionTableProps {
  permissions: PermissionModule[];

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
    <div className="space-y-6">
      {permissions.map((group) => (
        <div key={group.module} className="rounded-xl border border-slate-200">
          {/* Header */}

          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
            <h3 className="font-semibold">{group.module}</h3>

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

          {/* Permissions */}

          <div className="grid gap-4 p-5 md:grid-cols-2 lg:grid-cols-3">
            {group.permissions.map((permission) => (
              <label key={permission} className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={selectedPermissions.includes(permission)}
                  onChange={() => onPermissionChange(permission)}
                />

                <span className="text-sm">{permission}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PermissionTable;
