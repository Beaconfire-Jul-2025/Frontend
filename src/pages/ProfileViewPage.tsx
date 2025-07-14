import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Alert, Spin } from "antd";
import { PageContainer } from "@ant-design/pro-components";
import EmployeeProfile from "@/components/common/EmployeeProfile/EmployeeProfile";
import type { ViewMode } from "@/components/common/EmployeeProfile/types";

const ProfileViewPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState<any>(null);
  const [mode, setMode] = useState<ViewMode>("hr");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const validateAndLoadEmployee = () => {
      try {
        // Validate the token matches what's in sessionStorage
        const storedToken = sessionStorage.getItem("viewToken");
        if (!token || token !== storedToken) {
          setError("Invalid or expired view session");
          return;
        }

        // Retrieve employee data from sessionStorage
        const employeeData = sessionStorage.getItem("viewEmployeeData");
        const employeeMode = sessionStorage.getItem("viewEmployeeMode");

        if (!employeeData || !employeeMode) {
          setError("Employee data not found");
          return;
        }

        const parsedEmployee = JSON.parse(employeeData);
        setEmployee(parsedEmployee);
        setMode(employeeMode as ViewMode);

        // Clean up sessionStorage after loading
        sessionStorage.removeItem("viewEmployeeData");
        sessionStorage.removeItem("viewEmployeeMode");
        sessionStorage.removeItem("viewToken");
      } catch (err) {
        console.error("Error loading employee data:", err);
        setError("Failed to load employee information");
      } finally {
        setLoading(false);
      }
    };

    validateAndLoadEmployee();
  }, [token]);

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (loading) {
    return (
      <PageContainer>
        <div className="flex justify-center items-center min-h-96">
          <Spin size="large" />
        </div>
      </PageContainer>
    );
  }

  if (error || !employee) {
    return (
      <PageContainer>
        <Alert
          message="Access Denied"
          description={error || "Unable to access employee profile"}
          type="error"
          showIcon
          action={
            <button
              onClick={handleBack}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Go Back
            </button>
          }
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title={`${employee.preferredName || employee.firstName} ${employee.lastName}'s Profile`}
      onBack={handleBack}
    >
      <EmployeeProfile
        employee={employee}
        mode={mode}
        onUpdate={() => {
          // Optionally refresh data or navigate back after update
        }}
      />
    </PageContainer>
  );
};

export default ProfileViewPage;
