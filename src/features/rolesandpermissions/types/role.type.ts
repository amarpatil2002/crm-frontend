export type AccessScope = "OWN" | "TEAM" | "ALL";

export interface Permissions {
  _id: string;

  name: string;

  key: string;

  module: string;

  description?: string;

  createdAt: string;

  updatedAt: string;
}

export interface RoleMeta {
  canEdit: boolean;

  canDelete: boolean;
}

export interface Role {
  _id: string;

  name: string;

  code: string;

  description: string;

  organization: string | null;

  isSystem: boolean;

  isDefault: boolean;

  status: "ACTIVE" | "INACTIVE";

  priority: number;

  accessScope: Record<string, AccessScope>;

  permissionKeys: string[];

  permissionCount: number;

  meta: RoleMeta;

  createdAt: string;

  updatedAt: string;
}

export interface RolesResponse {
  items: Role[];

  pagination: {
    page: number;

    limit: number;

    total: number;

    totalPages: number;

    hasNextPage: boolean;

    hasPreviousPage: boolean;
  };
}

export interface RoleFormValues {
  name: string;

  code: string;

  description: string;

  permissionKeys: string[];

  accessScope: Record<string, AccessScope>;

  priority: number;
}
