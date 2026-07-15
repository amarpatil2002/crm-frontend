import * as yup from "yup";

import type { OrganizationFormValues } from "../types/organization.type";

export const organizationSchema: yup.ObjectSchema<OrganizationFormValues> =
  yup.object({
    name: yup
      .string()
      .required("Organization name is required")
      .max(100, "Organization name cannot exceed 100 characters"),

    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),

    phone: yup.string().nullable().defined(),

    website: yup
      .string()
      .nullable()
      .defined()
      .test(
        "website",
        "Please enter a valid website",
        (value) =>
          !value || /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/.*)?$/i.test(value),
      ),

    industry: yup.string().nullable().defined(),

    description: yup
      .string()
      .nullable()
      .defined()
      .max(500, "Description cannot exceed 500 characters"),

    address: yup.object({
      street: yup.string().nullable().defined(),

      city: yup.string().nullable().defined(),

      state: yup.string().nullable().defined(),

      country: yup.string().nullable().defined(),

      zipCode: yup.string().nullable().defined(),
    }),

    settings: yup.object({
      timezone: yup.string().required("Timezone is required"),

      language: yup.string().required("Language is required"),

      currency: yup.string().required("Currency is required"),
    }),
  });
