import { useEffect } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import { createRole } from "../redux/roleSlice";
import { roleSchema } from "../schema/role.schema";

import type { RoleFormValues } from "../types/role.type";

interface CreateRoleModalProps {
  open: boolean;
  onClose: () => void;
}

const CreateRoleModal = ({ open, onClose }: CreateRoleModalProps) => {
  const dispatch = useAppDispatch();

  const { creating } = useAppSelector((state) => state.roles);

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
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = async (data: RoleFormValues) => {
    try {
      await dispatch(createRole(data)).unwrap();

      onClose();

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}

      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />

      {/* Modal */}

      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-6xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Header */}

          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Create Role
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Create a custom role and assign permissions.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 hover:bg-slate-100"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}

          <div className="max-h-[75vh] overflow-y-auto p-6 space-y-8">
            {/* General Information */}

            {/* Next Part */}
          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-5 py-2 text-sm font-medium hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={creating}
              className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {creating ? "Creating..." : "Create Role"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateRoleModal;
