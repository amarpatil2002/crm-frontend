import { useEffect } from "react";
import { X, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import { profileSchema } from "../schema/profile.schema";

import type { Profile, ProfileFormValues } from "../types/profile.type";

import { updateUserProfile } from "../redux/profileSlice";

interface ProfileModalProps {
  profile: Profile;

  isOpen: boolean;

  onClose: () => void;
}

const ProfileModal = ({ profile, isOpen, onClose }: ProfileModalProps) => {
  const dispatch = useAppDispatch();

  const { updating } = useAppSelector((state) => state.profile);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: yupResolver(profileSchema),

    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.phone,
    },
  });

  useEffect(() => {
    reset({
      firstName: profile.firstName,
      lastName: profile.lastName,
      phone: profile.phone,
    });
  }, [profile, reset]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      await dispatch(updateUserProfile(data)).unwrap();

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">
        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">My Profile</h2>

            <p className="text-sm text-slate-500">
              Update your personal information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
          {/* Avatar */}

          <div className="flex flex-col items-center gap-3">
            <img
              src={
                profile.avatar ||
                "https://ui-avatars.com/api/?name=" + profile.fullName
              }
              alt={profile.fullName}
              className="h-24 w-24 rounded-full border-4 border-slate-200 object-cover"
            />

            <button
              type="button"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
            >
              Upload Photo
            </button>
          </div>

          {/* First Name */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              First Name
            </label>

            <input
              {...register("firstName")}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
            />

            {errors.firstName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Last Name
            </label>

            <input
              {...register("lastName")}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
            />

            {errors.lastName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              value={profile.email}
              readOnly
              className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-3 text-slate-500"
            />
          </div>

          {/* Phone */}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Phone
            </label>

            <input
              {...register("phone")}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600"
            />

            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Footer */}

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={() => {
                reset();

                onClose();
              }}
              className="rounded-xl border border-slate-300 px-5 py-2.5 font-medium transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={updating}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              <Save size={18} />

              {updating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
