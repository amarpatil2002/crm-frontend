import api from "../../../api/axios";

import type {
  InviteMemberFormValues,
  OrganizationMember,
  ApiResponse,
  PaginatedResponse,
} from "../types/member.type";

export interface MemberQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  roleId?: string;
}

/**
 * Invite Member
 */
export const inviteMember = async (
  payload: InviteMemberFormValues,
): Promise<ApiResponse<OrganizationMember>> => {
  const response = await api.post<ApiResponse<OrganizationMember>>(
    "/crm/organization-member/invite",
    payload,
  );

  return response.data;
};

/**
 * Get Members
 */
export const getMembers = async (
  params?: MemberQuery,
): Promise<PaginatedResponse<OrganizationMember[]>> => {
  const response = await api.get<PaginatedResponse<OrganizationMember[]>>(
    "/crm/organization-member",
    {
      params,
    },
  );

  return response.data;
};

/**
 * Get Member By Id
 */
export const getMemberById = async (
  memberId: string,
): Promise<ApiResponse<OrganizationMember>> => {
  const response = await api.get<ApiResponse<OrganizationMember>>(
    `/crm/organization-member/${memberId}`,
  );

  return response.data;
};

/**
 * Update Member
 */
export const updateMember = async (
  memberId: string,
  payload: Partial<InviteMemberFormValues>,
): Promise<ApiResponse<OrganizationMember>> => {
  const response = await api.patch<ApiResponse<OrganizationMember>>(
    `/crm/organization-member/${memberId}`,
    payload,
  );

  return response.data;
};

/**
 * Update Member Role
 */
export const updateMemberRole = async (
  memberId: string,
  role: string,
): Promise<ApiResponse<OrganizationMember>> => {
  const response = await api.patch<ApiResponse<OrganizationMember>>(
    `/crm/organization-member/${memberId}/role`,
    { role },
  );

  return response.data;
};

/**
 * Update Member Status
 */
export const updateMemberStatus = async (
  memberId: string,
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED",
): Promise<ApiResponse<OrganizationMember>> => {
  const response = await api.patch<ApiResponse<OrganizationMember>>(
    `/crm/organization-member/${memberId}/status`,
    { status },
  );

  return response.data;
};

/**
 * Delete Member
 */
export const deleteMember = async (
  memberId: string,
): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(
    `/crm/organization-member/${memberId}`,
  );

  return response.data;
};

/**
 * Resend Invitation
 */
export const resendInvitation = async (
  memberId: string,
): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>(
    `/crm/organization-member/${memberId}/resend-invite`,
  );

  return response.data;
};
