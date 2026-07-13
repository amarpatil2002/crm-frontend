import { Navigate, Route, Routes } from "react-router-dom";

import GuestRoute from "../routes/GuestRoutes";
import ProtectedRoute from "../routes/ProtectedRotes";

import DashboardLayout from "../layout/DashboardLayout";

import DashboardPage from "../features/dashboard/pages/DashboardPage";
import OrganizationProfilePage from "../features/organization/pages/OrganizationProfilePage";

import RegisterPage from "../features/auth/pages/RegisterPage";
import VerifyEmailPage from "../features/auth/pages/VerifyEmailPage";
import LoginPage from "../features/auth/pages/LoginPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Guest */}
      <Route element={<GuestRoute />}>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/organization" element={<OrganizationProfilePage />} />

          {/* Future */}
          {/* <Route path="/leads" element={<div>Leads</div>} />
          <Route path="/deals" element={<div>Deals</div>} />
          <Route path="/tasks" element={<div>Tasks</div>} />
          <Route path="/calendar" element={<div>Calendar</div>} /> */}
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
