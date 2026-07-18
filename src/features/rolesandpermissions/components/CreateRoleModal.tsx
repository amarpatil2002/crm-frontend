import { useEffect } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import {
  createRole,
  fetchPermissions,
  fetchRoles,
  updateRole,
} from "../redux/roleSlice";
import { roleSchema } from "../schema/role.schema";

import type {
  RoleFormValues,
  AccessScope,
  Permissions,
  Role,
} from "../types/role.type";

import PermissionTable from "./PermissionTable";
import { toast } from "sonner";

interface CreateRoleModalProps {
  open: boolean;
  role?: Role | null;
  onClose: () => void;
}

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20";

const CreateRoleModal = ({ open, role, onClose }: CreateRoleModalProps) => {
  const dispatch = useAppDispatch();

  const { creating, permissions } = useAppSelector((state) => state.roles);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RoleFormValues>({
    resolver: yupResolver(roleSchema),

    defaultValues: {
      name: "",
      code: "",
      description: "",
      priority: 1,
      permissionKeys: [],
      accessScope: {},
    },
  });

  useEffect(() => {
    register("permissionKeys");
    register("accessScope");
  }, [register]);

  const groupedPermissions = Object.values(
    permissions.reduce(
      (acc, permission) => {
        if (!acc[permission.module]) {
          acc[permission.module] = {
            module: permission.module,
            permissions: [],
          };
        }

        acc[permission.module].permissions.push(permission);

        return acc;
      },
      {} as Record<
        string,
        {
          module: string;
          permissions: Permissions[];
        }
      >,
    ),
  );

  useEffect(() => {
    if (open && permissions.length === 0) {
      dispatch(fetchPermissions());
    }
  }, [open, permissions.length, dispatch]);

  useEffect(() => {
    const name = watch("name");

    if (!name) return;

    const code = name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");

    setValue("code", code);
  }, [watch("name"), setValue]);

  useEffect(() => {
    if (!role) return;

    reset({
      name: role.name,
      code: role.code,
      description: role.description,
      priority: role.priority,
      permissionKeys: role.permissionKeys ?? [],
      accessScope: role.accessScope ?? {},
    });
  }, [role, reset]);

  const onSubmit = async (data: RoleFormValues) => {
    try {
      const modules = [
        ...new Set(
          data.permissionKeys.map((permission) => permission.split(":")[0]),
        ),
      ];

      for (const module of modules) {
        if (!data.accessScope[module]) {
          throw new Error(`Please select access scope for ${module}.`);
        }
      }
      if (role) {
        await dispatch(
          updateRole({
            roleId: role._id,
            data,
          }),
        ).unwrap();

        toast.success("Role updated successfully");
      } else {
        await dispatch(createRole(data)).unwrap();
        toast.success("Role created successfully");
      }
      dispatch(fetchRoles());
      reset();
      onClose();
    } catch (error) {
      const message =
        typeof error === "string"
          ? error
          : error instanceof Error
            ? error.message
            : "Something went wrong.";

      toast.error(message);
    }
  };

  const handlePermissionChange = (permissionKey: string) => {
    const selected = watch("permissionKeys") ?? [];

    const updated = selected.includes(permissionKey)
      ? selected.filter((key) => key !== permissionKey)
      : [...selected, permissionKey];

    setValue("permissionKeys", updated, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleSelectAll = (module: string, checked: boolean) => {
    const modulePermissions = permissions
      .filter((permission) => permission.module === module)
      .map((permission) => permission.key);

    const selected = watch("permissionKeys") ?? [];

    if (checked) {
      setValue(
        "permissionKeys",
        [...new Set([...selected, ...modulePermissions])],
        {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        },
      );
    } else {
      setValue(
        "permissionKeys",
        selected.filter(
          (permission) => !modulePermissions.includes(permission),
        ),
        {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        },
      );
    }
  };

  const handleScopeChange = (module: string, scope: AccessScope) => {
    setValue(`accessScope.${module}` as const, scope);
  };

  if (!open) return null;

  return (
    <>
      {/* Overlay */}

      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />

      {/* Modal */}

      <div className="fixed left-1/2 top-1/2 z-50  max-w-7xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Header */}

          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                {role ? "Edit Role" : "Create Role"}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {role
                  ? "Update role details and permissions."
                  : "Create a custom role and assign permissions."}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 transition hover:bg-slate-100"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}

          <div className="max-h-[72vh] overflow-y-auto p-6 space-y-8">
            {/* General Information */}
            <section>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Role Name
                  </label>

                  <input
                    {...register("name")}
                    placeholder="Support Manager"
                    className={inputClass}
                  />

                  <p className="mt-1 text-xs text-red-500">
                    {errors.name?.message}
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Role Code
                  </label>

                  <input
                    {...register("code")}
                    placeholder="support_manager"
                    className={inputClass}
                  />

                  <p className="mt-1 text-xs text-red-500">
                    {errors.code?.message}
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Priority
                  </label>

                  <input
                    type="number"
                    {...register("priority")}
                    className={inputClass}
                  />

                  <p className="mt-1 text-xs text-red-500">
                    {errors.priority?.message}
                  </p>
                </div>

                <div className="col-span-2">
                  <label className="mb-2 block text-sm font-medium">
                    Description
                  </label>

                  <textarea
                    rows={4}
                    {...register("description")}
                    placeholder="Can manage support team leads, contacts, tasks and reports."
                    className={inputClass}
                  />

                  <p className="mt-1 text-xs text-red-500">
                    {errors.description?.message}
                  </p>
                </div>
              </div>
            </section>

            {/* Permission Table */}
            <section>
              <div className="mb-5">
                <h3 className="text-base font-semibold text-slate-900">
                  Permissions
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Select the permissions this role can access.
                </p>
              </div>

              {errors.permissionKeys && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.permissionKeys?.message}
                </p>
              )}
              <PermissionTable
                permissions={groupedPermissions}
                selectedPermissions={watch("permissionKeys") ?? []}
                accessScope={watch("accessScope") ?? {}}
                onPermissionChange={handlePermissionChange}
                onSelectAll={handleSelectAll}
                onScopeChange={handleScopeChange}
              />
            </section>
          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
            <button
              type="button"
              onClick={() => {
                reset();
                onClose();
              }}
              className="rounded-lg border border-slate-300 px-5 py-2 text-sm font-medium hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={creating}
              className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white"
            >
              {creating
                ? role
                  ? "Updating..."
                  : "Creating..."
                : role
                  ? "Update Role"
                  : "Create Role"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateRoleModal;
