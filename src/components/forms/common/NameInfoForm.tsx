import React from "react";
import { Form, Input } from "antd";

interface NameInfoFormProps {
  form: any;
}

export const NameInfoForm: React.FC<NameInfoFormProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: "Please enter first name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Middle Name" name="middleName">
        <Input />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: "Please enter last name" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Preferred Name" name="preferredName">
        <Input />
      </Form.Item>
    </div>
  );
};
