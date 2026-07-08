import * as yup from "yup";

const emailRule = yup
  .string()
  .trim()
  .email("Enter a valid email address")
  .required("Email is required");

const passwordRule = yup
  .string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters")
  .matches(/[A-Z]/, "Password must include at least one uppercase letter")
  .matches(/[a-z]/, "Password must include at least one lowercase letter")
  .matches(/[0-9]/, "Password must include at least one number")
  .matches(
    /[^A-Za-z0-9]/,
    "Password must include at least one special character",
  );

export const registerSchema = yup.object({
  firstName: yup
    .string()
    .trim()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be at most 50 characters"),

  lastName: yup
    .string()
    .trim()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters"),

  email: emailRule,

  password: passwordRule,

  organizationName: yup
    .string()
    .trim()
    .required("Organization name is required")
    .min(2, "Organization name must be at least 2 characters")
    .max(120, "Organization name must be at most 120 characters"),

  phone: yup
    .string()
    .trim()
    .required("Phone number is required")
    .matches(/^[0-9]{10,15}$/, "Enter a valid phone number"),
});

export const verifyEmailSchema = yup.object({
  email: emailRule,
  otp: yup
    .string()
    .trim()
    .required("OTP is required")
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits"),
});

export const loginSchema = yup.object({
  email: emailRule,
  password: yup.string().required("Password is required"),
});

export type RegisterFormValues = yup.InferType<typeof registerSchema>;
export type VerifyEmailFormValues = yup.InferType<typeof verifyEmailSchema>;
export type LoginFormValues = yup.InferType<typeof loginSchema>;
