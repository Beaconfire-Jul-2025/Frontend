// AddressCard.tsx
import React from "react";
import { Card, Tag, Typography } from "antd";
import type { Address } from "@/types/employee";

const { Text } = Typography;

interface AddressCardProps {
  address: Address;
}

export const AddressCard: React.FC<AddressCardProps> = ({ address }) => {
  const formatAddress = (addr: Address) =>
    [addr.addressLine1, addr.addressLine2, addr.city, addr.state, addr.zipCode]
      .filter(Boolean)
      .join(", ");

  const colorMap: Record<string, string> = {
    PRIMARY: "blue",
    SECONDARY: "orange",
  };

  const borderColor = `border-l-${colorMap[address.type] || "gray"}-500`;

  return (
    <Card size="small" className={`border-l-4 ${borderColor}`}>
      <div>
        <Tag color={colorMap[address.type] || "default"}>{address.type}</Tag>
        <div className="mt-2">
          <Text strong>{formatAddress(address)}</Text>
        </div>
      </div>
    </Card>
  );
};
