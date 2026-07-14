import * as yup from "yup";

/**
 * Address Schema
 */
export const addressSchema = yup.object({
  street: yup
    .string()
    .trim()
    .nullable()
    .max(150, "Street cannot exceed 150 characters"),

  city: yup
    .string()
    .trim()
    .nullable()
    .max(100, "City cannot exceed 100 characters"),

  state: yup
    .string()
    .trim()
    .nullable()
    .max(100, "State cannot exceed 100 characters"),

  country: yup
    .string()
    .trim()
    .nullable()
    .max(100, "Country cannot exceed 100 characters"),

  zipCode: yup
    .string()
    .trim()
    .nullable()
    .max(20, "Zip code cannot exceed 20 characters"),
});

/**
 * Workspace Settings Schema
 */
export const workspaceSettingsSchema = yup.object({
  timezone: yup.string().required("Timezone is required"),

  language: yup.string().required("Language is required"),

  currency: yup.string().required("Currency is required"),
});

/**
 * Organization Schema
 */
export const organizationSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Organization name is required")
    .min(3, "Minimum 3 characters")
    .max(100, "Maximum 100 characters"),

  website: yup
    .string()
    .trim()
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .url("Invalid website"),

  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Invalid email"),

  phone: yup
    .string()
    .trim()
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .matches(/^[0-9+\-\s()]*$/, "Invalid phone number"),

  industry: yup
    .string()
    .trim()
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .max(100),

  description: yup
    .string()
    .trim()
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .max(500),

  address: addressSchema.required(),

  settings: workspaceSettingsSchema.required(),
});
