import { Navigate, Route, Routes } from "react-router-dom";

import RegisterPage from "../features/auth/pages/RegisterPage";
import VerifyEmailPage from "../features/auth/pages/VerifyEmailPage";
import LoginPage from "../features/auth/pages/LoginPage";

import DashboardPage from "../features/dashboard/pages/DashboardPage";

import OrganizationProfilePage from "../features/organization/pages/OrganizationProfilePage";
// import LeadsPage from "../features/leads/pages/LeadsPage";
// import ContactsPage from "../features/contacts/pages/ContactsPage";
// import CompaniesPage from "../features/companies/pages/CompaniesPage";
// import DealsPage from "../features/deals/pages/DealsPage";
// import TasksPage from "../features/tasks/pages/TasksPage";

import ProtectedRoute from "../routes/ProtectedRotes";
import GuestRoute from "../routes/GuestRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Guest Routes */}
      <Route element={<GuestRoute />}>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route index element={<h1>Dashboard Home</h1>} />

          <Route path="organization" element={<OrganizationProfilePage />} />

          {/* Future Routes */}

          {/* <Route path="leads" element={<LeadsPage />} /> */}

          {/* <Route path="contacts" element={<ContactsPage />} /> */}

          {/* <Route path="companies" element={<CompaniesPage />} /> */}

          {/* <Route path="deals" element={<DealsPage />} /> */}

          {/* <Route path="tasks" element={<TasksPage />} /> */}
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
