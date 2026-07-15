import api from "../../../api/axios";

import type { Organization } from "../types/organization.type";
import type { ApiResponse } from "../../../types/api-response.type";

/**
 * Get Organization Profile
 */
export const getOrganizationProfile = async (): Promise<Organization> => {
  const response = await api.get<ApiResponse<Organization>>(
    "/crm/organization/me",
  );
  return response.data.data;
};

/**
 * Update Organization
 */
export const updateOrganization = async (
  data: Partial<Organization>,
): Promise<Organization> => {
  const response = await api.patch<ApiResponse<Organization>>(
    "/crm/organization/me",
    data,
  );

  return response.data.data;
};

/**
 * Upload Organization Logo
 */
export const uploadOrganizationLogo = async (
  file: File,
): Promise<{ message: string; logo: string }> => {
  const formData = new FormData();

  formData.append("logo", file);

  const response = await api.put("/crm/organization/logo", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
