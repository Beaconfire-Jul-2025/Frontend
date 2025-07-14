import React from "react";
import { Form, Input } from "antd";

interface ContactInfoFormProps {
  form: any;
}

export const ContactInfoForm: React.FC<ContactInfoFormProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Form.Item
        label="Personal Email"
        name="email"
        rules={[
          { required: true, message: "Please enter email" },
          { type: "email", message: "Please enter valid email" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Work Phone" name="workPhone">
        <Input />
      </Form.Item>
      <Form.Item
        label="Cell Phone"
        name="cellPhone"
        rules={[{ required: true, message: "Please enter cell phone" }]}
      >
        <Input />
      </Form.Item>
    </div>
  );
};
