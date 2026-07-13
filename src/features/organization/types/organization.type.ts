/* -------------------------------------------------------------------------- */
/*                               Organization Status                          */
/* -------------------------------------------------------------------------- */

export type OrganizationStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

/* -------------------------------------------------------------------------- */
/*                              Subscription Plan                             */
/* -------------------------------------------------------------------------- */

export type SubscriptionPlan =
  | "FREE"
  | "STARTER"
  | "PRO"
  | "BUSINESS"
  | "ENTERPRISE";

/* -------------------------------------------------------------------------- */
/*                                   Address                                  */
/* -------------------------------------------------------------------------- */

export interface OrganizationAddress {
  street: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  zipCode: string | null;
}

/* -------------------------------------------------------------------------- */
/*                                  Settings                                  */
/* -------------------------------------------------------------------------- */

export interface OrganizationSettings {
  timezone: string;
  language: string;
  currency: string;
}

/* -------------------------------------------------------------------------- */
/*                                Subscription                                */
/* -------------------------------------------------------------------------- */

export interface OrganizationSubscription {
  plan: SubscriptionPlan;

  startsAt: string;

  expiresAt: string | null;

  maxUsers: number;

  maxStorage: number;
}

/* -------------------------------------------------------------------------- */
/*                                   Owner                                    */
/* -------------------------------------------------------------------------- */

export interface OrganizationOwner {
  _id: string;

  firstName?: string;

  lastName?: string;

  email?: string;
}

/* -------------------------------------------------------------------------- */
/*                               Organization                                 */
/* -------------------------------------------------------------------------- */

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

  owner: OrganizationOwner;

  status: OrganizationStatus;

  isDeleted: boolean;

  deletedAt: string | null;

  createdAt: string;

  updatedAt: string;
}

/* -------------------------------------------------------------------------- */
/*                           Update Organization DTO                          */
/* -------------------------------------------------------------------------- */

export interface UpdateOrganizationPayload {
  name: string;

  website: string | null;

  email: string;

  phone: string | null;

  industry: string | null;

  description: string | null;

  address: OrganizationAddress;

  settings: OrganizationSettings;
}

/* -------------------------------------------------------------------------- */
/*                            Logo Upload Response                            */
/* -------------------------------------------------------------------------- */

export interface LogoUploadResponse {
  logo: string;
}

/* -------------------------------------------------------------------------- */
/*                          Organization API Response                         */
/* -------------------------------------------------------------------------- */

export interface OrganizationResponse {
  success: boolean;

  message: string;

  data: Organization;
}

/* -------------------------------------------------------------------------- */
/*                         Organization Form Values                           */
/* -------------------------------------------------------------------------- */

export interface OrganizationProfileFormValues {
  name: string;

  website: string;

  email: string;

  phone: string;

  industry: string;

  description: string;

  address: {
    street: string;

    city: string;

    state: string;

    country: string;

    zipCode: string;
  };

  settings: {
    timezone: string;

    language: string;

    currency: string;
  };
}

/* -------------------------------------------------------------------------- */
/*                    Organization Profile Form Values                        */
/* -------------------------------------------------------------------------- */

export interface OrganizationProfileFormValues {
  /* General Information */

  name: string;

  website: string;

  email: string;

  phone: string;

  industry: string;

  description: string;

  /* Address */

  address: {
    street: string;

    city: string;

    state: string;

    country: string;

    zipCode: string;
  };

  /* Workspace Settings */

  settings: {
    timezone: string;

    language: string;

    currency: string;
  };
}
