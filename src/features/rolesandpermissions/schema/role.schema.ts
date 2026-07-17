import * as yup from "yup";

import type { RoleFormValues } from "../types/role.type";

export const roleSchema: yup.ObjectSchema<RoleFormValues> = yup.object({
  name: yup
    .string()
    .trim()
    .required("Role name is required.")
    .min(3, "Role name must be at least 3 characters.")
    .max(50, "Role name cannot exceed 50 characters."),

  code: yup
    .string()
    .trim()
    .required("Role code is required.")
    .matches(
      /^[a-z0-9_]+$/,
      "Only lowercase letters, numbers and underscores are allowed.",
    ),

  description: yup
    .string()
    .trim()
    .required("Description is required.")
    .max(250, "Description cannot exceed 250 characters."),

  permissionKeys: yup
    .array()
    .of(yup.string().required())
    .min(1, "Select at least one permission.")
    .required(),

  accessScope: yup.object().required(),

  priority: yup.number().required().min(1).max(100),
});
