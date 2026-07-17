import api from "../../../api/axios";

import type { ApiResponse } from "../../../types/api-response.type";
import type {
  Permission,
  Role,
  RoleFormValues,
  RolesResponse,
} from "../types/role.type";

export const getPermissions = async (): Promise<Permission[]> => {
  const response = await api.get<ApiResponse<Permission[]>>("/crm/permissions");

  return response.data.data;
};

/**
 * Get All Roles
 */
export const getRoles = async (): Promise<Role[]> => {
  const response = await api.get<ApiResponse<RolesResponse>>("/crm/role");

  return response.data.data.items;
};

/**
 * Get Single Role
 */
export const getRoleById = async (roleId: string): Promise<Role> => {
  const response = await api.get<ApiResponse<Role>>(`/crm/role/${roleId}`);

  return response.data.data;
};

/**
 * Create Role
 */
export const createRole = async (data: RoleFormValues): Promise<Role> => {
  const response = await api.post<ApiResponse<Role>>("/crm/role", data);

  return response.data.data;
};

/**
 * Update Role
 */
export const updateRole = async (
  roleId: string,
  data: RoleFormValues,
): Promise<Role> => {
  const response = await api.patch<ApiResponse<Role>>(
    `/crm/role/${roleId}`,
    data,
  );

  return response.data.data;
};

/**
 * Delete Role
 */
export const deleteRole = async (roleId: string): Promise<void> => {
  await api.delete(`/crm/role/${roleId}`);
};
