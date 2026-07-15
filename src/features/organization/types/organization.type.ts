// ========================================
// Organization Status
// ========================================

export type OrganizationStatus = "ACTIVE" | "INACTIVE";

// ========================================
// Subscription Plan
// ========================================

export type SubscriptionPlan = "FREE" | "STARTER" | "PRO" | "ENTERPRISE";

// ========================================
// Address
// ========================================

export interface Address {
  street: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  zipCode: string | null;
}

// ========================================
// Workspace Settings
// ========================================

export interface WorkspaceSettings {
  timezone: string;
  language: string;
  currency: string;
}

// ========================================
// Subscription
// ========================================

export interface Subscription {
  plan: SubscriptionPlan;
  startsAt: string;
  expiresAt: string | null;
  maxUsers: number;
  maxStorage: number;
}

// ========================================
// Owner
// ========================================

export interface OrganizationOwner {
  _id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  status: OrganizationStatus;
}

// ========================================
// Organization
// ========================================

export interface Organization {
  _id: string;

  name: string;

  slug: string;

  logo: string | null;

  email: string;

  phone: string | null;

  website: string | null;

  industry: string | null;

  description: string | null;

  address: Address;

  settings: WorkspaceSettings;

  subscription: Subscription;

  status: OrganizationStatus;

  owner: OrganizationOwner;

  memberCount: number;

  createdAt: string;

  updatedAt: string;
}

// ========================================
// Organization Form Values
// (Only editable fields)
// ========================================

export interface OrganizationFormValues {
  name: string;

  email: string;

  phone: string | null;

  website: string | null;

  industry: string | null;

  description: string | null;

  address: Address;

  settings: WorkspaceSettings;
}
