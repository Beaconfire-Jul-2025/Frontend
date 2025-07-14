import React from "react";
import { Space, Descriptions, Form } from "antd";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { ContactInfoForm } from "@/components/forms";
import type { SectionProps } from "../types";
import { SectionHeader } from "../components/SectionHeader";

interface ContactSectionProps extends SectionProps {
  isEditing: boolean;
  form: any;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  employee,
  mode,
  onEdit,
  onSave,
  onCancel,
  isEditing,
  form,
}) => {
  const handleEdit = () => {
    if (onEdit) {
      form.setFieldsValue({
        email: employee.email,
        cellPhone: employee.cellPhone,
        workPhone: employee.workPhone,
      });
      onEdit("contact");
    }
  };

  return (
    <ProCard
      title={
        <Space>
          <PhoneOutlined />
          Contact Information
        </Space>
      }
      headerBordered
      extra={
        <SectionHeader
          canEdit={mode === "employee"}
          isEditing={isEditing}
          onEdit={handleEdit}
          onSave={onSave}
          onCancel={onCancel}
        />
      }
    >
      {isEditing ? (
        <Form form={form} layout="vertical">
          <ContactInfoForm form={form} />
        </Form>
      ) : (
        <Descriptions column={2} bordered size="small">
          <Descriptions.Item label="Personal Email" span={2}>
            <Space>
              <MailOutlined />
              {employee.email}
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Cell Phone">
            <Space>
              <PhoneOutlined />
              {employee.cellPhone}
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Work Phone">
            <Space>
              <PhoneOutlined />
              {employee.workPhone || "Not provided"}
            </Space>
          </Descriptions.Item>
        </Descriptions>
      )}
    </ProCard>
  );
};
