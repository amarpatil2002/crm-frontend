import api from "../../../api/axios";

import type {
  GetOrganizationResponse,
  UpdateOrganizationPayload,
} from "../types/organization.type";

export async function getMyOrganizationApi() {
  const response = await api.get<GetOrganizationResponse>("/organizations/me");

  return response.data;
}

export async function updateMyOrganizationApi(
  payload: UpdateOrganizationPayload,
) {
  const response = await api.put<GetOrganizationResponse>(
    "/organizations/me",
    payload,
  );

  return response.data;
}

export async function uploadOrganizationLogoApi(file: File) {
  const formData = new FormData();

  formData.append("logo", file);

  const response = await api.patch<GetOrganizationResponse>(
    "/organizations/me/logo",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
}

export async function deleteOrganizationLogoApi() {
  const response = await api.delete<GetOrganizationResponse>(
    "/organizations/me/logo",
  );

  return response.data;
}
