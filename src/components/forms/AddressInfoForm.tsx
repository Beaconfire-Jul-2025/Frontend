import React from "react";
import { ProFormText } from "@ant-design/pro-components";
import type { BasicInfoFormData } from "@/types/employee";

interface AddressInfoFormProps {
  initialValues?: Partial<BasicInfoFormData>;
  onValuesChange?: (values: Partial<BasicInfoFormData>) => void;
}

export const AddressInfoForm: React.FC<AddressInfoFormProps> = ({
  initialValues,
}) => {
  return (
    <div className="max-w-4xl">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        Current Address *
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ProFormText
          name={["CurrentAddress", "AddressLine1"]}
          label="Address Line 1 *"
          placeholder="Enter your street address"
          rules={[{ required: true, message: "Please enter your address" }]}
          className="mb-4"
          initialValue={initialValues?.CurrentAddress?.AddressLine1}
        />

        <ProFormText
          name={["CurrentAddress", "AddressLine2"]}
          label="Address Line 2"
          placeholder="Apartment, suite, unit, etc. (optional)"
          className="mb-4"
          initialValue={initialValues?.CurrentAddress?.AddressLine2}
        />

        <ProFormText
          name={["CurrentAddress", "City"]}
          label="City *"
          placeholder="Enter your city"
          rules={[{ required: true, message: "Please enter your city" }]}
          className="mb-4"
          initialValue={initialValues?.CurrentAddress?.City}
        />

        <ProFormText
          name={["CurrentAddress", "State"]}
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
          initialValue={initialValues?.CurrentAddress?.State}
        />

        <div className="md:col-span-2">
          <ProFormText
            name={["CurrentAddress", "ZipCode"]}
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
            initialValue={initialValues?.CurrentAddress?.ZipCode}
          />
        </div>
      </div>
    </div>
  );
};
