import React from "react";
import { Form, Input } from "antd";
import type { ContactFormProps } from "./data.d";

export const ContactForm: React.FC<ContactFormProps> = ({ disabled }) => (
  <>
    <Form.Item name={["contact", "email"]} label="Email" rules={[{ required: true, type: "email" }]}>
      <Input disabled={disabled} />
    </Form.Item>
    <Form.Item name={["contact", "phone"]} label="Phone" rules={[{ required: true }]}>
      <Input disabled={disabled} />
    </Form.Item>
    <Form.Item name={["contact", "alternatePhone"]} label="Alternate Phone">
      <Input disabled={disabled} />
    </Form.Item>
  </>
);

export default ContactForm;
