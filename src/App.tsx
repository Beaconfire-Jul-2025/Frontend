import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import enUS from "antd/locale/en_US";
import LoginPage from "./components/auth/LoginPage.tsx";
import "./App.css";
import ProtectedRoute from "./components/common/ProtectedRoute.tsx";
import HRDashboard from "./components/hr/HRDashboard.tsx";
import EmployeeDashboard from "./components/employee/EmployeeDashboard.tsx";
import EmployeeOnboard from "@/components/pages/EmployeeOnboard.tsx";
import EmployeeHousing from "@/components/employee/housing/EmployeeHousing.tsx";
import EmployeeFacilityReportDetails from "@/components/employee/housing/EmployeeFacilityReportDetails.tsx";
import EmployeeNewFacilityReport from "@/components/employee/housing/EmployeeNewFacilityReport.tsx";

function App() {
  return (
    <ConfigProvider locale={enUS}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/hr"
            element={
              <ProtectedRoute requiredRole="ROLE_HR">
                <HRDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee"
            element={
              <ProtectedRoute requiredRole="ROLE_EMPLOYEE">
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee/housing"
            element={
              <ProtectedRoute requiredRole="ROLE_EMPLOYEE">
                <EmployeeHousing />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee/housing/facility-report/:id"
            element={
              <ProtectedRoute requiredRole="ROLE_EMPLOYEE">
                <EmployeeFacilityReportDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee/housing/facility-report/new"
            element={
              <ProtectedRoute requiredRole="ROLE_EMPLOYEE">
                <EmployeeNewFacilityReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee/onboarding"
            element={
              <ProtectedRoute requiredRole="ROLE_EMPLOYEE">
                <EmployeeOnboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
