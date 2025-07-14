import React from "react";
import { Space, Card, Tag, Typography } from "antd";
import {
  ContactsOutlined,
  PhoneOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import type { SectionProps } from "../types";
import type { Address } from "@/types/employee.ts";

const { Text } = Typography;

export const EmergencyContactsSection: React.FC<SectionProps> = ({
  employee,
}) => {
  const formatAddress = (address: Address) => {
    const parts = [
      address.addressLine1,
      address.addressLine2,
      address.city,
      address.state,
      address.zipCode,
    ].filter(Boolean);
    return parts.join(", ");
  };

  return (
    <ProCard
      title={
        <Space>
          <ContactsOutlined />
          Emergency Contacts
        </Space>
      }
      headerBordered
    >
      <div className="space-y-4">
        {employee.emergencyContacts.map((contact: any, index: number) => (
          <Card
            key={index}
            size="small"
            className="border-l-4 border-l-red-500"
          >
            <div className="space-y-2">
              <div>
                <Text strong>
                  {[contact.firstName, contact.middleName, contact.lastName]
                    .filter(Boolean)
                    .join(" ")}
                </Text>
                <Tag color="red" className="ml-2">
                  {contact.relationship}
                </Tag>
              </div>
              <div className="space-y-1">
                <div>
                  <PhoneOutlined className="mr-2" />
                  <Text>{contact.cellPhone}</Text>
                </div>
                <div>
                  <HomeOutlined className="mr-2" />
                  <Text type="secondary" className="text-sm">
                    {formatAddress(contact.address)}
                  </Text>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ProCard>
  );
};
