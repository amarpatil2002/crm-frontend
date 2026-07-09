export type OrganizationStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";
export type SubscriptionPlan = "FREE" | "STARTER" | "PRO" | "ENTERPRISE";

export interface OrganizationAddress {
  street: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  zipCode: string | null;
}

export interface OrganizationSettings {
  timezone: string;
  language: string;
  currency: string;
}

export interface OrganizationSubscription {
  plan: SubscriptionPlan;
  startsAt: string;
  expiresAt: string | null;
  maxUsers: number;
  maxStorage: number;
}

export interface OrganizationOwner {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface Organization {
  _id: string;
  name: string;
  slug: string;
  logo: string;
  website: string | null;
  email: string;
  phone: string | null;
  industry: string | null;
  description: string | null;
  address: OrganizationAddress;
  settings: OrganizationSettings;
  subscription: OrganizationSubscription;
  owner: OrganizationOwner | null;
  status: OrganizationStatus;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  isPremium?: boolean;
}

export interface GetOrganizationResponse {
  success: boolean;
  message: string;
  data: Organization;
}

export interface UpdateOrganizationPayload {
  name: string;
  website: string | null;
  email: string;
  phone: string | null;
  industry: string | null;
  description: string | null;
  address: {
    street: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    zipCode: string | null;
  };
  settings: {
    timezone: string;
    language: string;
    currency: string;
  };
}
