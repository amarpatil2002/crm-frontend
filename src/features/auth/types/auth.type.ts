export interface User {
  _id: string;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  role?: string;
  organizationId?: string;
  isEmailVerified?: boolean;
}

export interface Tokens {
  accessToken: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  organizationName: string;
  phone: string;
}

export interface VerifyEmailPayload {
  email: string;
  otp: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterResponseData {
  user?: Partial<User>;
  organization?: {
    _id?: string;
    name?: string;
  };
  email?: string;
}

export interface LoginResponseData {
  user: User;
  accessToken: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isBootstrapped: boolean;
}
