import * as yup from "yup";

import type { ProfileFormValues } from "../types/profile.type";

export const profileSchema: yup.ObjectSchema<ProfileFormValues> = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .max(50, "First name cannot exceed 50 characters"),

  lastName: yup
    .string()
    .required("Last name is required")
    .max(50, "Last name cannot exceed 50 characters"),

  phone: yup
    .string()
    .nullable()
    .defined()
    .matches(/^(\+?\d{10,15})?$/, "Please enter a valid phone number"),
});
