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
import EmployeeBasicInfo from "@/features/employee/personal-info/EmployeeBasicInfo.tsx";
import EmployeeDocuments from "@/features/employee/personal-info/EmployeeDocuments.tsx";
import OnboardingGuard from "@/routes/OnboardingGuard.tsx";
import HiringManagementApplication from "@/features/hr/hiring/HRHiringApplication.tsx";
import HRVisaManagement from "@/features/hr/visa/HRVisaManagement.tsx";
import HREmployeesManagement from "@/features/hr/employees/HREmployeesManagement.tsx";
import HRVisaApplicationReview from "@/features/hr/visa/HRVisaApplicationReview.tsx";

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
    children: [
      { index: true, element: <HRDashboard /> },
      { path: "home", element: <div>HR Home Page - Coming Soon</div> },
      {
        path: "employees",
        element: <HREmployeesManagement />,
      },
      {
        path: "visa",
        element: <HRVisaManagement />,
      },
      {
        path: "visa/review/:employeeId",
        element: <HRVisaApplicationReview />,
      },
      {
        path: "hiring",
        element: <Navigate to="/hr/hiring/review" replace />,
      },
      {
        path: "hiring/review",
        element: <HiringManagementApplication />,
      },
      {
        path: "hiring/invite",
        element: <div> Invite Employee Page - Coming Soon</div>,
      },
      {
        path: "housing",
        element: <Navigate to="/hr/housing/basic" replace />,
      },
      {
        path: "housing/basic",
        element: <div>Basic Info Page - Coming Soon</div>,
      },
      {
        path: "housing/facility",
        element: <div>Facility Info Page - Coming Soon</div>,
      },
      {
        path: "housing/report",
        element: <div>Facility Reports Page - Coming Soon</div>,
      },
    ],
  },
  {
    path: "/employee",
    element: <ProtectedLayout requiredRole="ROLE_EMPLOYEE" />,
    children: [
      { index: true, element: <EmployeeDashboard /> },
      {
        path: "personal-info",
        element: <Navigate to="/employee/personal-info/basic" replace />,
      },
      { path: "personal-info/basic", element: <EmployeeBasicInfo /> },
      { path: "personal-info/documents", element: <EmployeeDocuments /> },
      {
        path: "visa",
        element: <Navigate to="/employee/visa/info" replace />,
      },
      { path: "visa/info", element: <div>Visa Info Page - Coming Soon</div> },
      {
        path: "visa/documents",
        element: <div>Visa Documents Page - Coming Soon</div>,
      },
      { path: "housing", element: <EmployeeHousing /> },
      {
        path: "housing/details",
        element: <div>House Details Page - Coming Soon</div>,
      },
      {
        path: "housing/report",
        element: <div>Facility Report Page - Coming Soon</div>,
      },
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

export function App() {
  return (
    <ConfigProvider locale={enUS}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}
