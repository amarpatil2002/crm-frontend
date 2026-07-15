import api from "../../../api/axios";
import type { ApiResponse } from "../../../types/api-response.type";
import type { Profile, ProfileFormValues } from "../types/profile.type";

/**
 * Get Logged In User Profile
 */
export const getProfile = async (): Promise<Profile> => {
  const response = await api.get<ApiResponse<Profile>>("/crm/profile/me");

  return response.data.data;
};

/**
 * Update Profile
 */
export const updateProfile = async (
  data: ProfileFormValues,
): Promise<Profile> => {
  const response = await api.patch<ApiResponse<Profile>>(
    "/crm/profile/me",
    data,
  );

  return response.data.data;
};

/**
 * Upload Avatar
 */
export const uploadAvatar = async (file: File): Promise<string> => {
  const formData = new FormData();

  formData.append("avatar", file);

  const response = await api.put<ApiResponse<{ avatar: string }>>(
    "/crm/profile/avatar",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data.data.avatar;
};
