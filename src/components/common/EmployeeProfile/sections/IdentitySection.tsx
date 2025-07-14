import React from "react";
import { Space, Descriptions, Form } from "antd";
import { IdcardOutlined, CalendarOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import dayjs from "dayjs";
import { IdentityVerificationForm } from "@/components/forms";
import type { SectionProps } from "../types";
import { SectionHeader } from "../components/SectionHeader";

interface IdentitySectionProps extends SectionProps {
  isEditing: boolean;
  form: any;
}

export const IdentitySection: React.FC<IdentitySectionProps> = ({
  employee,
  mode,
  onEdit,
  onSave,
  onCancel,
  isEditing,
  form,
}) => {
  const formatDate = (dateString: string) =>
    dayjs(dateString).format("MMM DD, YYYY");

  const maskSSN = (ssn: string) => `***-**-${ssn.slice(-4)}`;

  const calculateAge = (dob: string) => dayjs().diff(dayjs(dob), "year");

  const handleEdit = () => {
    if (onEdit) {
      form.setFieldsValue({
        dob: dayjs(employee.dob),
        gender: employee.gender,
        ssn: employee.ssn,
      });
      onEdit("identity");
    }
  };

  return (
    <ProCard
      title={
        <Space>
          <IdcardOutlined />
          Identity Information
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
          <IdentityVerificationForm form={form} />
        </Form>
      ) : (
        <Descriptions column={2} bordered size="small">
          <Descriptions.Item label="Date of Birth">
            <Space>
              <CalendarOutlined />
              {formatDate(employee.dob)}
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Age">
            {calculateAge(employee.dob)} years old
          </Descriptions.Item>
          <Descriptions.Item label="Gender">
            {employee.gender}
          </Descriptions.Item>
          <Descriptions.Item label="SSN">
            {maskSSN(employee.ssn)}
          </Descriptions.Item>
        </Descriptions>
      )}
    </ProCard>
  );
};
