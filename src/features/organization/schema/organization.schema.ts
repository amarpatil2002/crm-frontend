import * as yup from "yup";

/* -------------------------------------------------------------------------- */
/*                              Address Schema                                */
/* -------------------------------------------------------------------------- */

const addressSchema = yup.object({
  street: yup
    .string()
    .trim()
    .max(200, "Street address cannot exceed 200 characters.")
    .default(""),

  city: yup
    .string()
    .trim()
    .max(100, "City cannot exceed 100 characters.")
    .default(""),

  state: yup
    .string()
    .trim()
    .max(100, "State cannot exceed 100 characters.")
    .default(""),

  country: yup
    .string()
    .trim()
    .max(100, "Country cannot exceed 100 characters.")
    .default(""),

  zipCode: yup
    .string()
    .trim()
    .max(20, "Zip code cannot exceed 20 characters.")
    .default(""),
});

/* -------------------------------------------------------------------------- */
/*                             Settings Schema                                */
/* -------------------------------------------------------------------------- */

const settingsSchema = yup.object({
  timezone: yup.string().trim().required("Timezone is required."),

  language: yup.string().trim().required("Language is required."),

  currency: yup.string().trim().required("Currency is required."),
});

/* -------------------------------------------------------------------------- */
/*                        Organization Profile Schema                         */
/* -------------------------------------------------------------------------- */

export const organizationProfileSchema = yup.object({
  name: yup
    .string()
    .trim()
    .required("Organization name is required.")
    .min(2, "Organization name must be at least 2 characters.")
    .max(100, "Organization name cannot exceed 100 characters."),

  website: yup
    .string()
    .trim()
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .test("is-valid-url", "Please enter a valid website URL.", (value) => {
      if (!value) return true;

      try {
        new URL(value);
        return true;
      } catch {
        return false;
      }
    }),

  email: yup
    .string()
    .trim()
    .required("Organization email is required.")
    .email("Please enter a valid email address."),

  phone: yup
    .string()
    .trim()
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .matches(/^(\+?[0-9]{7,15})?$/, "Please enter a valid phone number."),

  industry: yup
    .string()
    .trim()
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .max(100, "Industry cannot exceed 100 characters."),

  description: yup
    .string()
    .trim()
    .transform((value) => (value === "" ? null : value))
    .nullable()
    .max(500, "Description cannot exceed 500 characters."),

  address: addressSchema,

  settings: settingsSchema,
});

/* -------------------------------------------------------------------------- */
/*                              Infer Type                                    */
/* -------------------------------------------------------------------------- */

export type OrganizationProfileSchema = yup.InferType<
  typeof organizationProfileSchema
>;
