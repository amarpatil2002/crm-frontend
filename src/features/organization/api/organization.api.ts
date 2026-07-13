import api from "../../../api/axios";

import type {
  Organization,
  OrganizationResponse,
  UpdateOrganizationPayload,
} from "../types/organization.type";

/* -------------------------------------------------------------------------- */
/*                                  Endpoints                                 */
/* -------------------------------------------------------------------------- */

const ORGANIZATION_ENDPOINT = "/crm/organization";

/* -------------------------------------------------------------------------- */
/*                              Get Organization                              */
/* -------------------------------------------------------------------------- */

export const getMyOrganizationApi = async (): Promise<OrganizationResponse> => {
  const { data } = await api.get<OrganizationResponse>(
    `${ORGANIZATION_ENDPOINT}/me`,
  );

  return data;
};

/* -------------------------------------------------------------------------- */
/*                            Update Organization                             */
/* -------------------------------------------------------------------------- */

export const updateOrganizationApi = async (
  payload: UpdateOrganizationPayload,
): Promise<OrganizationResponse> => {
  const { data } = await api.patch<OrganizationResponse>(
    `${ORGANIZATION_ENDPOINT}/me`,
    payload,
  );

  return data;
};

/* -------------------------------------------------------------------------- */
/*                               Upload Logo                                  */
/* -------------------------------------------------------------------------- */

export const uploadOrganizationLogoApi = async (
  file: File,
): Promise<OrganizationResponse> => {
  const formData = new FormData();

  formData.append("logo", file);

  const { data } = await api.patch<OrganizationResponse>(
    `${ORGANIZATION_ENDPOINT}/logo`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return data;
};

/* -------------------------------------------------------------------------- */
/*                              Delete Logo                                   */
/* -------------------------------------------------------------------------- */

export const deleteOrganizationLogoApi =
  async (): Promise<OrganizationResponse> => {
    const { data } = await api.delete<OrganizationResponse>(
      `${ORGANIZATION_ENDPOINT}/logo`,
    );

    return data;
  };
