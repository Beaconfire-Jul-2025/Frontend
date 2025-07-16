import React, { useCallback, useState } from "react";
import { Space, Form, message } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import type { ContactData } from "./data.d";
import { SectionHeader } from "../SectionHeader";
import ContactDisplay from "@/components/Information/ContactDisplay";
import ContactForm from "@/components/Form/ContactForm";

export interface ContactSectionProps {
  contact: ContactData;
  mode?: "employee" | string;
  editable?: boolean;
  onEdit?: (section: string) => void;
  onSave?: (data: ContactData) => void | Promise<void>;
  onCancel?: () => void;
  isEditing?: boolean;
  form?: any;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contact,
  mode,
  editable = false,
  onEdit,
  onSave,
  onCancel,
  isEditing: isEditingProp = false,
  form: formProp,
}) => {
  const [isEditing, setIsEditing] = useState(isEditingProp);
  const [form] = Form.useForm();
  const formInstance = formProp || form;

  React.useEffect(() => {
    setIsEditing(isEditingProp);
  }, [isEditingProp]);

  const handleEdit = useCallback(() => {
    if (onEdit) onEdit("contact");
    formInstance.setFieldsValue(contact);
    setIsEditing(true);
  }, [onEdit, formInstance, contact]);

  const handleSave = useCallback(async () => {
    try {
      const values = await formInstance.validateFields();
      if (onSave) await onSave(values);
      setIsEditing(false);
      message.success("Contact information updated successfully");
    } catch (error) {
      message.error("Failed to save contact information");
    }
  }, [formInstance, onSave]);

  const handleCancel = useCallback(() => {
    if (onCancel) onCancel();
    formInstance.resetFields();
    setIsEditing(false);
  }, [onCancel, formInstance]);

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
          canEdit={editable || mode === "employee"}
          isEditing={isEditing}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      }
    >
      {isEditing ? (
        <ContactForm form={formInstance} initialValues={contact} />
      ) : (
        <ContactDisplay contact={contact} />
      )}
    </ProCard>
  );
};

export default ContactSection;
