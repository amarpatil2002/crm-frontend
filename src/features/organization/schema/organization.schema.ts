import * as yup from "yup";

export const organizationProfileSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Organization name is required")
    .min(2, "Organization name must be at least 2 characters")
    .max(100, "Organization name must be at most 100 characters"),

  website: yup
    .string()
    .trim()
    .test(
      "website",
      "Enter a valid website",
      (value) => !value || /^https?:\/\/.+/i.test(value),
    ),

  email: yup
    .string()
    .trim()
    .required("Business email is required")
    .email("Enter a valid email address"),

  phone: yup.string().trim(),

  industry: yup.string().trim(),

  description: yup
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters"),

  address: yup.object({
    street: yup.string(),

    city: yup.string(),

    state: yup.string(),

    country: yup.string(),

    zipCode: yup.string(),
  }),

  settings: yup.object({
    timezone: yup.string().required("Timezone is required"),

    language: yup.string().required("Language is required"),

    currency: yup.string().required("Currency is required"),
  }),
});
