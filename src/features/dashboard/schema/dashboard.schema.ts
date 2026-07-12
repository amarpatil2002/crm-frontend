import * as yup from "yup";

export const dashboardStatSchema = yup.object({
  id: yup.string().required(),

  title: yup.string().required(),

  value: yup.mixed<string | number>().required(),

  change: yup.number().required(),

  positive: yup.boolean().required(),
});

export const leadChartSchema = yup.object({
  month: yup.string().required(),

  leads: yup.number().required(),
});

export const dealChartSchema = yup.object({
  name: yup.string().required(),

  value: yup.number().required(),
});

export const recentLeadSchema = yup.object({
  id: yup.string().required(),

  name: yup.string().required(),

  company: yup.string().required(),

  email: yup.string().email().required(),

  phone: yup.string().required(),

  status: yup
    .mixed<"New" | "Qualified" | "Contacted" | "Proposal" | "Won" | "Lost">()
    .oneOf(["New", "Qualified", "Contacted", "Proposal", "Won", "Lost"])
    .required(),

  createdAt: yup.string().required(),
});

export const upcomingTaskSchema = yup.object({
  id: yup.string().required(),

  title: yup.string().required(),

  priority: yup
    .mixed<"Low" | "Medium" | "High">()
    .oneOf(["Low", "Medium", "High"])
    .required(),

  dueDate: yup.string().required(),

  completed: yup.boolean().required(),
});

export const dashboardSchema = yup.object({
  stats: yup.array().of(dashboardStatSchema).required(),

  leadsChart: yup.array().of(leadChartSchema).required(),

  dealsChart: yup.array().of(dealChartSchema).required(),

  recentLeads: yup.array().of(recentLeadSchema).required(),

  upcomingTasks: yup.array().of(upcomingTaskSchema).required(),
});
