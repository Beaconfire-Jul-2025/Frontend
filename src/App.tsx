import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { ConfigProvider } from "antd";
import LoginPage from "./components/auth/LoginPage.tsx";
import "./App.css";
import ProtectedRoute from "./components/common/ProtectedRoute.tsx";
import HRDashboard from "./components/hr/HRDashboard.tsx";
import EmployeeDashboard from "./components/employee/EmployeeDashboard.tsx";
import EmployeeOnboard from "./components/employee/EmployeeOnboard.tsx";

function App() {
  return (
    <ConfigProvider>
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
