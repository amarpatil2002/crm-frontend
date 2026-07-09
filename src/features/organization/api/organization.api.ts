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
  const response = await api.patch<GetOrganizationResponse>(
    "/organizations/me",
    payload,
  );
  return response.data;
}
