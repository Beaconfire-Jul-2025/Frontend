import React from "react";
import { Form, Input } from "antd";
import type { ContactFormProps } from "./data.d";

export const ContactForm: React.FC<ContactFormProps> = ({ form, initialValues, disabled }) => (
  <Form form={form} layout="vertical" initialValues={initialValues} disabled={disabled}>
    <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
      <Input />
    </Form.Item>
    <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name="alternatePhone" label="Alternate Phone">
      <Input />
    </Form.Item>
  </Form>
);

export default ContactForm;

