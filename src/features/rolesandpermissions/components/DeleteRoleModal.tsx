import { Trash2 } from "lucide-react";

interface DeleteRoleModalProps {
  open: boolean;
  loading?: boolean;
  roleName?: string;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteRoleModal = ({
  open,
  loading,
  roleName,
  onClose,
  onConfirm,
}: DeleteRoleModalProps) => {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />

      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-xl">
        <div className="p-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
            <Trash2 className="text-red-600" size={26} />
          </div>

          <h2 className="mt-5 text-center text-xl font-semibold">
            Delete Role
          </h2>

          <p className="mt-3 text-center text-sm text-slate-500">
            Are you sure you want to delete
          </p>

          <p className="mt-1 text-center font-semibold text-slate-900">
            {roleName}
          </p>

          <p className="mt-3 text-center text-xs text-red-500">
            This action cannot be undone.
          </p>

          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="rounded-lg border border-slate-300 px-5 py-2"
            >
              Cancel
            </button>

            <button
              onClick={onConfirm}
              disabled={loading}
              className="rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteRoleModal;
