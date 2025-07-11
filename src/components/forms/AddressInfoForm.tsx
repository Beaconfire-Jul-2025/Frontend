import React, { useMemo } from "react";
import { ProFormText } from "@ant-design/pro-components";
import type { FormData } from "@/types/employee";

interface AddressInfoFormProps {
  initialValues?: Partial<FormData>;
  onValuesChange?: (values: Partial<FormData>) => void;
}

export const AddressInfoForm: React.FC<AddressInfoFormProps> = ({
  initialValues,
}) => {
  // Find the PRIMARY address from the addresses array
  const primaryAddress = useMemo(() => {
    return initialValues?.Addresses?.find((addr) => addr.Type === "PRIMARY");
  }, [initialValues?.Addresses]);

  return (
    <div className="max-w-4xl">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Current Address *
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProFormText
          name={["Addresses", "PRIMARY", "AddressLine1"]}
          label="Address Line 1 *"
          placeholder="Enter your street address"
          rules={[{ required: true, message: "Please enter your address" }]}
          className="mb-4"
          initialValue={primaryAddress?.AddressLine1}
        />

        <ProFormText
          name={["Addresses", "PRIMARY", "AddressLine2"]}
          label="Address Line 2"
          placeholder="Apartment, suite, unit, etc. (optional)"
          className="mb-4"
          initialValue={primaryAddress?.AddressLine2}
        />

        <ProFormText
          name={["Addresses", "PRIMARY", "City"]}
          label="City *"
          placeholder="Enter your city"
          rules={[{ required: true, message: "Please enter your city" }]}
          className="mb-4"
          initialValue={primaryAddress?.City}
        />

        <ProFormText
          name={["Addresses", "PRIMARY", "State"]}
          label="State *"
          placeholder="Enter your state"
          rules={[
            { required: true, message: "Please enter your state" },
            {
              len: 2,
              message: "Please enter state as 2-letter code (e.g., NY)",
            },
          ]}
          className="mb-4"
          initialValue={primaryAddress?.State}
        />

        <div className="md:col-span-2">
          <ProFormText
            name={["Addresses", "PRIMARY", "ZipCode"]}
            label="ZIP Code *"
            placeholder="Enter your ZIP code"
            rules={[
              { required: true, message: "Please enter your ZIP code" },
              {
                pattern: /^\d{5}(-\d{4})?$/,
                message: "Please enter a valid ZIP code",
              },
            ]}
            className="mb-4 max-w-xs"
            initialValue={primaryAddress?.ZipCode}
          />
        </div>
      </div>
    </div>
  );
};
