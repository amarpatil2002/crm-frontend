import * as yup from "yup";

export const organizationProfileSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(2, "Organization name must be at least 2 characters")
    .max(100, "Organization name must be at most 100 characters")
    .required("Organization name is required"),

  website: yup
    .string()
    .trim()
    .nullable()
    .transform((value) => (value === "" ? null : value))
    .url("Enter a valid website URL"),

  email: yup
    .string()
    .trim()
    .email("Enter a valid email address")
    .required("Organization email is required"),

  phone: yup
    .string()
    .trim()
    .nullable()
    .transform((value) => (value === "" ? null : value)),

  industry: yup
    .string()
    .trim()
    .nullable()
    .transform((value) => (value === "" ? null : value)),

  description: yup
    .string()
    .trim()
    .max(500, "Description must be at most 500 characters")
    .nullable()
    .transform((value) => (value === "" ? null : value)),

  address: yup.object({
    street: yup
      .string()
      .trim()
      .nullable()
      .transform((v) => (v === "" ? null : v)),
    city: yup
      .string()
      .trim()
      .nullable()
      .transform((v) => (v === "" ? null : v)),
    state: yup
      .string()
      .trim()
      .nullable()
      .transform((v) => (v === "" ? null : v)),
    country: yup
      .string()
      .trim()
      .nullable()
      .transform((v) => (v === "" ? null : v)),
    zipCode: yup
      .string()
      .trim()
      .nullable()
      .transform((v) => (v === "" ? null : v)),
  }),

  settings: yup.object({
    timezone: yup.string().trim().required("Timezone is required"),
    language: yup.string().trim().required("Language is required"),
    currency: yup.string().trim().required("Currency is required"),
  }),
});

export type OrganizationProfileFormValues = yup.InferType<
  typeof organizationProfileSchema
>;
