export interface InviteMemberFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string;
  title?: string;
  department?: string;
  employeeId?: string;
}

export interface MemberUser {
  _id: string;
  organizationId: string;
  managerId: string | null;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  status: string;
  isActive: boolean;
}

export interface Role {
  _id: string;
  name: string;
  code: string;
  description: string | null;

  isDefault: boolean;
  isSystem: boolean;

  priority: number;

  status: string;
}

export interface MemberReference {
  _id: string;

  firstName: string;
  lastName: string;
  fullName: string;

  email: string;

  id: string;
}

export interface OrganizationMember {
  _id: string;

  organization: string;

  user: MemberUser;

  role: Role;

  title: string | null;
  department: string | null;
  employeeId: string | null;

  joinedAt: string | null;

  status: "INVITED" | "ACTIVE" | "INACTIVE" | "SUSPENDED";

  invitedBy: MemberReference | null;

  invitedAt: string | null;

  acceptedAt: string | null;

  lastActiveAt: string | null;

  inviteTokenExpiresAt: string | null;

  inviteAcceptedAt: string | null;

  metadata: Record<string, unknown>;

  isDeleted: boolean;

  deletedAt: string | null;

  createdBy: MemberReference | null;

  updatedBy: MemberReference | null;

  createdAt: string;

  updatedAt: string;
}

export interface InviteMemberResponse {
  success: boolean;
  message: string;
  data: OrganizationMember;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta: PaginationMeta;
}
