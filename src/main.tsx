import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import enUS from "antd/locale/en_US";

import LoginPage from "@/pages/auth/LoginPage.tsx";
import ProtectedLayout from "@/components/layout/ProtectedLayout.tsx";

// HR Pages
import HRDashboard from "@/features/hr/HRDashboard.tsx";

// Employee Pages
import EmployeeDashboard from "@/features/employee/EmployeeDashboard.tsx";
import EmployeeHousing from "@/features/employee/housing/EmployeeHousing";
import EmployeeFacilityReportDetails from "@/features/employee/housing/EmployeeFacilityReportDetails";
import EmployeeNewFacilityReport from "@/features/employee/housing/EmployeeNewFacilityReport";
import OnboardingGuard from "@/routes/OnboardingGuard.tsx";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/login" replace /> },
  { path: "/login", element: <LoginPage /> },

  {
    path: "/employee/onboarding",
    element: <OnboardingGuard />,
  },

  {
    path: "/hr",
    element: <ProtectedLayout requiredRole="ROLE_HR" />,
    children: [{ index: true, element: <HRDashboard /> }],
  },
  {
    path: "/employee",
    element: <ProtectedLayout requiredRole="ROLE_EMPLOYEE" />,
    children: [
      { index: true, element: <EmployeeDashboard /> },
      { path: "housing", element: <EmployeeHousing /> },
      {
        path: "housing/facility-report/:id",
        element: <EmployeeFacilityReportDetails />,
      },
      {
        path: "housing/facility-report/new",
        element: <EmployeeNewFacilityReport />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider locale={enUS}>
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>,
);
