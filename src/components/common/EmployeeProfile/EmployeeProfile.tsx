import React, { useEffect, useState, useCallback } from "react";
import { Spin, Alert, Form, message, Modal } from "antd";
import { PageContainer } from "@ant-design/pro-components";
import { getEmployeeProfile } from "@/api/employee.ts";
import type { Employee } from "@/types/employee.ts";
import type { EmployeeProfileProps, EditSection } from "./types";
import { NameSection } from "./sections/NameSection";
import { IdentitySection } from "./sections/IdentitySection";
import { AddressSection } from "./sections/AddressSection";
import { ContactSection } from "./sections/ContactSection";
import { EmploymentSection } from "./sections/EmploymentSection";
import { DriverLicenseSection } from "./sections/DriverLicenseSection";
import { EmergencyContactsSection } from "./sections/EmergencyContactsSection";

const { confirm } = Modal;

const EmployeeProfile: React.FC<EmployeeProfileProps> = ({
  employeeId,
  employee: providedEmployee,
  mode,
  onUpdate,
}) => {
  const [employee, setEmployee] = useState<Employee | null>(
    providedEmployee || null,
  );
  const [loading, setLoading] = useState(!providedEmployee);
  const [error, setError] = useState<string | null>(null);
  const [editingSection, setEditingSection] = useState<EditSection>(null);
  const [form] = Form.useForm();

  const canEdit = mode === "employee";

  useEffect(() => {
    if (!providedEmployee) {
      const fetchEmployeeData = async () => {
        try {
          setLoading(true);
          // If no employeeId provided, fetch current user's profile
          const data = await getEmployeeProfile(employeeId);
          setEmployee(data);
        } catch (err) {
          setError("Failed to load employee data");
          console.error("Error fetching employee data:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchEmployeeData();
    }
  }, [employeeId, providedEmployee]);

  const handleEdit = useCallback(
    (section: EditSection) => {
      if (!employee || !canEdit) return;
      setEditingSection(section);
    },
    [employee, canEdit],
  );

  const handleSave = useCallback(async () => {
    try {
      const values = await form.validateFields();
      console.log("Saving data:", values);

      // TODO: Implement actual save logic here
      // await updateEmployeeProfile(values);

      message.success("Information updated successfully");
      setEditingSection(null);
      if (onUpdate) onUpdate();
    } catch (error) {
      console.error("Validation failed:", error);
      message.error("Please check the form for errors");
    }
  }, [form, onUpdate]);

  const handleCancel = useCallback(() => {
    confirm({
      title: "Are you sure to discard all your changes?",
      content: "All unsaved changes will be lost.",
      onOk() {
        setEditingSection(null);
        form.resetFields();
      },
    });
  }, [form]);

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
          message="Error"
          description={error || "Employee data not found"}
          type="error"
          showIcon
        />
      </PageContainer>
    );
  }

  const sectionProps = {
    employee,
    mode,
    onEdit: handleEdit,
    onSave: handleSave,
    onCancel: handleCancel,
  };

  return (
    <div className="space-y-6">
      <NameSection
        {...sectionProps}
        isEditing={editingSection === "name"}
        form={form}
      />

      <IdentitySection
        {...sectionProps}
        isEditing={editingSection === "identity"}
        form={form}
      />

      <AddressSection
        {...sectionProps}
        isEditing={editingSection === "address"}
        form={form}
      />

      <ContactSection
        {...sectionProps}
        isEditing={editingSection === "contact"}
        form={form}
      />

      {(mode === "employee" || mode === "hr") && (
        <>
          <EmploymentSection
            {...sectionProps}
            isEditing={editingSection === "employment"}
            form={form}
          />

          <DriverLicenseSection
            {...sectionProps}
            isEditing={editingSection === "driverLicense"}
            form={form}
          />

          <EmergencyContactsSection {...sectionProps} />
        </>
      )}
    </div>
  );
};

export default EmployeeProfile;
