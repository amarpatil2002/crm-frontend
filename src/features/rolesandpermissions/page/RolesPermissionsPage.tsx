import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import { fetchRole, fetchRoles } from "../redux/roleSlice";

import type { Role } from "../types/role.type";

import RolesTable from "../components/RolesTable";
import RoleDetailsDrawer from "../components/RoleDetailsSection";

const RolesPermissionsPage = () => {
  const dispatch = useAppDispatch();

  const { roles, loading, error } = useAppSelector((state) => state.roles);

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleViewRole = async (roleId: string) => {
    try {
      const role = await dispatch(fetchRole(roleId)).unwrap();

      setSelectedRole(role);

      setDrawerOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);

    setSelectedRole(null);
  };

  return (
    <>
      <section className="space-y-6 rounded-2xl">
        {/* Header */}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Roles & Permissions
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Manage system and custom roles.
            </p>
          </div>

          <button className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700">
            <Plus size={16} />
            Create Role
          </button>
        </div>

        {loading && (
          <div className="flex h-52 items-center justify-center">
            Loading...
          </div>
        )}

        {error && (
          <div className="rounded-xl bg-red-50 p-4 text-red-600">{error}</div>
        )}

        {!loading && !error && (
          <RolesTable roles={roles} onView={handleViewRole} />
        )}
      </section>

      <RoleDetailsDrawer
        open={drawerOpen}
        role={selectedRole}
        onClose={handleCloseDrawer}
      />
    </>
  );
};

export default RolesPermissionsPage;
