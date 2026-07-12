import type { LucideIcon } from "lucide-react";

export interface DashboardStat {
  id: string;
  title: string;
  value: string | number;
  change: number;
  positive: boolean;
  icon?: LucideIcon;
}

export interface LeadChart {
  month: string;
  leads: number;
}

export interface DealChart {
  name: string;
  value: number;
}

export type LeadStatus =
  | "New"
  | "Qualified"
  | "Contacted"
  | "Proposal"
  | "Won"
  | "Lost";

export interface RecentLead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: LeadStatus;
  createdAt: string;
}

export type TaskPriority = "Low" | "Medium" | "High";

export interface UpcomingTask {
  id: string;
  title: string;
  priority: TaskPriority;
  dueDate: string;
  completed: boolean;
}

export interface DashboardResponse {
  stats: DashboardStat[];
  leadsChart: LeadChart[];
  dealsChart: DealChart[];
  recentLeads: RecentLead[];
  upcomingTasks: UpcomingTask[];
}
