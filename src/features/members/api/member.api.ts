import api from "../../../api/axios";
import type {
  InviteMemberFormValues,
  OrganizationMember,
} from "../types/member.type";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface MemberListResponse {
  items: OrganizationMember[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

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
  const response = await api.post("/crm/organization-member/invite", payload);
  return response.data;
};

/**
 * Get Members
 */
export const getMembers = async (
  params?: MemberQuery,
): Promise<ApiResponse<MemberListResponse>> => {
  const response = await api.get("/crm/organization-member", {
    params,
  });

  return response.data;
};

/**
 * Get Member By Id
 */
export const getMemberById = async (
  memberId: string,
): Promise<ApiResponse<OrganizationMember>> => {
  const response = await api.get(`/crm/organization-member/${memberId}`);
  return response.data;
};

/**
 * Update Member
 */
export const updateMember = async (
  memberId: string,
  payload: Partial<InviteMemberFormValues>,
): Promise<ApiResponse<OrganizationMember>> => {
  const response = await api.patch(`/crm/member/${memberId}`, payload);

  return response.data;
};

/**
 * Change Member Role
 */
export const updateMemberRole = async (memberId: string, role: string) => {
  const response = await api.patch(`/crm/member/${memberId}/role`, {
    role,
  });

  return response.data;
};

/**
 * Update Member Status
 */
export const updateMemberStatus = async (
  memberId: string,
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED",
) => {
  const response = await api.patch(`/crm/member/${memberId}/status`, {
    status,
  });

  return response.data;
};

/**
 * Delete Member
 */
export const deleteMember = async (memberId: string) => {
  const response = await api.delete(`/crm/member/${memberId}`);

  return response.data;
};

/**
 * Resend Invitation
 */
export const resendInvitation = async (memberId: string) => {
  const response = await api.post(`/crm/member/${memberId}/resend-invite`);

  return response.data;
};
