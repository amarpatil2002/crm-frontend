import { useEffect } from "react";
import { X, Save, Camera } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { profileSchema } from "../schema/profile.schema";
import type { Profile, ProfileFormValues } from "../types/profile.type";
import { updateUserProfile } from "../redux/profileSlice";
import Modal from "../../../components/ui/Modal";

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
    <Modal isOpen={isOpen}>
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
        <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
            <div>
              <h2 className="text-xl font-bold text-slate-900">My Profile</h2>

              <p className="mt-1 text-sm text-slate-500">
                Manage your personal information.
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-1 flex-col overflow-hidden"
          >
            <div className="flex-1 space-y-8 overflow-y-auto p-6">
              {/* Avatar */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img
                    src={
                      profile.avatar ||
                      `https://ui-avatars.com/api/?name=${profile.fullName}&background=4F46E5&color=fff`
                    }
                    alt={profile.fullName}
                    className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg"
                  />

                  <button
                    type="button"
                    className="absolute bottom-1 right-1 rounded-full bg-blue-600 p-2 text-white shadow-lg transition hover:bg-blue-700"
                  >
                    <Camera size={16} />
                  </button>
                </div>

                <p className="mt-3 text-sm text-slate-500">
                  JPG, PNG up to 5MB
                </p>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* First Name */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    First Name
                  </label>

                  <input
                    {...register("firstName")}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2 transition focus:border-blue-600 focus:outline-none"
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
                    className="w-full rounded-xl border border-slate-300 px-4 py-2 transition focus:border-blue-600 focus:outline-none"
                  />

                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email Address
                  </label>

                  <input
                    value={profile.email}
                    readOnly
                    className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-4 py-2 text-slate-500"
                  />
                </div>

                {/* Phone */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Phone Number
                  </label>

                  <input
                    {...register("phone")}
                    className="w-full rounded-xl border border-slate-300 px-4 py-2 transition focus:border-blue-600 focus:outline-none"
                  />

                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-white px-6 py-5">
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
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Save size={18} />
                {updating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
