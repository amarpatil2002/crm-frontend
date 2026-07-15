// ==========================================
// User Status
// ==========================================

export type UserStatus = "ACTIVE" | "INACTIVE";

// ==========================================
// Profile
// ==========================================

export interface Profile {
  _id: string;

  firstName: string;

  lastName: string;

  fullName: string;

  email: string;

  phone: string | null;

  avatar: string | null;

  status: UserStatus;
}

// ==========================================
// Profile Form Values
// ==========================================

export interface ProfileFormValues {
  firstName: string;

  lastName: string;

  phone: string | null;
}
