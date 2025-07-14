import React, { useState, useEffect } from "react";
import { Form, message, Spin } from "antd";
import { ProCard } from "@ant-design/pro-components";
import { getEmployeeProfile } from "@/api/employee";
import { EmploymentSection } from "@/components/common/EmployeeProfile/sections/EmploymentSection";
import type { Employee } from "@/types/employee";

const EmployeeVisaInfo: React.FC = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchEmployeeProfile = async () => {
      try {
        setLoading(true);
        const profile = await getEmployeeProfile();
        setEmployee(profile);
      } catch (error) {
        message.error("Failed to load employee profile");
        console.error("Error fetching employee profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeProfile();
  }, []);

  const handleEdit = (section: string) => {
    setEditingSection(section);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      // Here you would typically make an API call to update the employee data
      // For now, we'll just show a success message and exit edit mode
      console.log("Form values to save:", values);
      message.success("Visa information updated successfully");
      setEditingSection(null);

      // Optionally refresh the data
      const updatedProfile = await getEmployeeProfile();
      setEmployee(updatedProfile);
    } catch (error) {
      message.error("Failed to update visa information");
      console.error("Error updating visa information:", error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setEditingSection(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spin size="large" />
      </div>
    );
  }

  if (!employee) {
    return (
      <ProCard title="Visa Information">
        <div className="text-center text-gray-500">
          Unable to load employee profile
        </div>
      </ProCard>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <EmploymentSection
        employee={employee}
        mode="employee"
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
        isEditing={editingSection === "employment"}
        form={form}
      />
    </div>
  );
};

export default EmployeeVisaInfo;
