// ================================
// Organization Status
// ================================

export type OrganizationStatus = "ACTIVE" | "INACTIVE";

// ================================
// Subscription Plan
// ================================

export type SubscriptionPlan = "FREE" | "STARTER" | "PRO" | "ENTERPRISE";

// ================================
// Address
// ================================

export interface Address {
  street: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  zipCode: string | null;
}

// ================================
// Workspace Settings
// ================================

export interface WorkspaceSettings {
  timezone: string;
  language: string;
  currency: string;
}

// ================================
// Subscription
// ================================

export interface Subscription {
  plan: SubscriptionPlan;

  startsAt: string;

  expiresAt: string | null;

  maxUsers: number;

  maxStorage: number;
}

// ================================
// Organization
// ================================

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

  address: Address;

  settings: WorkspaceSettings;

  subscription: Subscription;

  owner: string;

  status: OrganizationStatus;

  isDeleted: boolean;

  deletedAt: string | null;

  createdAt: string;

  updatedAt: string;
}
