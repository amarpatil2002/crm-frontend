import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import { fetchRole, fetchRoles } from "../redux/roleSlice";

import type { Role } from "../types/role.type";

import RolesTable from "../components/RolesTable";
import RoleDetailsSection from "../components/RoleDetailsSection";

const RolesPermissionsPage = () => {
  const dispatch = useAppDispatch();

  const { roles, loading, error } = useAppSelector((state) => state.roles);

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  /**
   * View Role
   */
  const handleViewRole = async (role: Role) => {
    try {
      const response = await dispatch(fetchRole(role._id)).unwrap();

      setSelectedRole(response);

      setDrawerOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Create Role
   */
  const handleCreateRole = () => {
    console.log("Create Role");

    // Open Create Role Modal
  };

  /**
   * Edit Role
   */
  const handleEditRole = (role: Role) => {
    console.log("Edit Role", role);

    // Open Edit Modal
  };

  /**
   * Delete Role
   */
  const handleDeleteRole = (role: Role) => {
    console.log("Delete Role", role);

    // Open Delete Confirmation
  };

  /**
   * Close Drawer
   */
  const handleCloseDrawer = () => {
    setDrawerOpen(false);

    setSelectedRole(null);
  };

  return (
    <>
      <section className="space-y-6">
        {/* Header */}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Roles & Permissions
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage system roles and custom roles.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCreateRole}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            <Plus size={16} />
            Create Role
          </button>
        </div>

        {/* Loading */}

        {loading && (
          <div className="flex h-60 items-center justify-center rounded-xl border border-slate-200 bg-white">
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />

              <p className="text-sm text-slate-500">Loading roles...</p>
            </div>
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Empty */}

        {!loading && !error && roles.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 bg-white py-16 text-center">
            <h3 className="text-lg font-semibold text-slate-900">
              No Roles Found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Create your first custom role.
            </p>
          </div>
        )}

        {/* Table */}

        {!loading && !error && roles.length > 0 && (
          <RolesTable
            roles={roles}
            onView={handleViewRole}
            onEdit={handleEditRole}
            onDelete={handleDeleteRole}
          />
        )}
      </section>

      {/* Drawer */}

      <RoleDetailsSection
        open={drawerOpen}
        role={selectedRole}
        onClose={handleCloseDrawer}
      />
    </>
  );
};

export default RolesPermissionsPage;
