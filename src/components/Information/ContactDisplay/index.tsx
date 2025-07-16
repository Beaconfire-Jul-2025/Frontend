import React from "react";
import { Descriptions } from "antd";
import type { ContactDisplayProps } from "./data.d";

export const ContactDisplay: React.FC<ContactDisplayProps> = ({ contact }) => (
  <Descriptions column={2} bordered size="small">
    <Descriptions.Item label="Email">{contact.email}</Descriptions.Item>
    <Descriptions.Item label="Phone">{contact.phone}</Descriptions.Item>
    {contact.alternatePhone && (
      <Descriptions.Item label="Alternate Phone">{contact.alternatePhone}</Descriptions.Item>
    )}
  </Descriptions>
);

export default ContactDisplay;

