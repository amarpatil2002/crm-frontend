export interface Role {
  _id: string;
  name: string;
  code: string;
}

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

export interface OrganizationMember {
  _id: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  email: string;
  phone?: string;
  role: Role;
  title?: string;
  department?: string;
  employeeId?: string;
  status: "INVITED" | "ACTIVE" | "INACTIVE" | "SUSPENDED";

  invitedAt: string;
  acceptedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface InviteMemberResponse {
  success: boolean;
  message: string;
  data: OrganizationMember;
}
