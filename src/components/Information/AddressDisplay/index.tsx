// src/components/AddressDisplay/index.ts
import React from "react";
import {Tag, Typography} from "antd";
import type {Address} from "./data.d";

const {Text} = Typography;

interface AddressDisplayProps {
  address: Address;
}

export const AddressDisplay: React.FC<AddressDisplayProps> = ({address}) => {
  const colorMap: Record<string, string> = {
    PRIMARY: "blue",
    SECONDARY: "orange",
  };

  return (
    <div>
      {address.type && (
        <Tag color={colorMap[address.type] || "default"}>{address.type}</Tag>
      )}
      <div className="mt-2">
        <Text strong>
          {address.addressLine1}
          {address.addressLine2 && `, ${address.addressLine2}`}
          <br/>
          {address.city}, {address.state} {address.zipCode}
        </Text>
      </div>
    </div>
  );
};
