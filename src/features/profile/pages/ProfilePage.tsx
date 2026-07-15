import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";

import { fetchProfile } from "../redux/profileSlice";

import ProfileModal from "../components/ProfileModal";

const ProfilePage = () => {
  const dispatch = useAppDispatch();

  const { profile, loading, error } = useAppSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  console.log(profile);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        Loading Profile...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!profile) {
    return <div className="text-center">Profile not found.</div>;
  }

  return (
    <div className="p-6">
      <ProfileModal profile={profile} isOpen={true} onClose={() => {}} />
    </div>
  );
};

export default ProfilePage;
