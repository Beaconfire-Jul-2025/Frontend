import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import enUS from "antd/locale/en_US";

import LoginPage from "@/components/auth/LoginPage";
import ProtectedLayout from "@/components/common/ProtectedLayout";

// HR Pages
import HRDashboard from "@/components/hr/HRDashboard";

// Employee Pages
import EmployeeDashboard from "@/components/employee/EmployeeDashboard";
import EmployeeHousing from "@/components/employee/housing/EmployeeHousing";
import EmployeeFacilityReportDetails from "@/components/employee/housing/EmployeeFacilityReportDetails";
import EmployeeNewFacilityReport from "@/components/employee/housing/EmployeeNewFacilityReport";
import OnboardingGuard from "@/components/common/OnboardingGuard.tsx";

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
