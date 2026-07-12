import * as yup from "yup";
import type { OrganizationProfileFormValues } from "../types/organization.type";

export const organizationProfileSchema: yup.ObjectSchema<OrganizationProfileFormValues> =
  yup.object({
    name: yup.string().required(),

    website: yup.string().default(""),

    email: yup.string().email().required(),

    phone: yup.string().default(""),

    industry: yup.string().default(""),

    description: yup.string().default(""),

    address: yup.object({
      street: yup.string().default(""),
      city: yup.string().default(""),
      state: yup.string().default(""),
      country: yup.string().default(""),
      zipCode: yup.string().default(""),
    }),

    settings: yup.object({
      timezone: yup.string().required(),
      language: yup.string().required(),
      currency: yup.string().required(),
    }),
  });
