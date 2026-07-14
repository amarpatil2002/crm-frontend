import api from "../../../api/axios";

import type { Organization } from "../types/organization.type";

/**
 * Get Organization Profile
 */
export const getOrganizationProfile = async (): Promise<Organization> => {
  const response = await api.get<Organization>("/organizations/me");

  return response.data;
};

/**
 * Update Organization
 */
export const updateOrganization = async (
  data: Partial<Organization>,
): Promise<Organization> => {
  const response = await api.patch<Organization>("/organizations/me", data);

  return response.data;
};

/**
 * Upload Organization Logo
 */
export const uploadOrganizationLogo = async (
  file: File,
): Promise<{ message: string; logo: string }> => {
  const formData = new FormData();

  formData.append("logo", file);

  const response = await api.put("/organizations/logo", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
