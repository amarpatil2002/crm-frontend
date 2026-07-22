import * as yup from "yup";

export const memberSchema = yup.object({
  firstName: yup.string().trim().required("First name is required"),
  lastName: yup.string().trim().required("Last name is required"),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email")
    .required("Email is required"),
  phone: yup.string().trim().nullable().optional(),
  role: yup.string().required("Role is required"),
  title: yup.string().trim().nullable().optional(),
  department: yup.string().trim().nullable().optional(),
  employeeId: yup.string().trim().nullable().optional(),
});
