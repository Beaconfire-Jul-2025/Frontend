import React, { useState } from "react";
import {
  ProFormRadio,
  ProFormText,
  ProFormDatePicker,
  ProFormUploadDragger,
} from "@ant-design/pro-components";
import dayjs, { type Dayjs } from "dayjs";
import { useDriverLicenseUpload } from "@/hooks/useDriverLicenseUpload.ts";
import type { FormData, PersonalDocument } from "@/types/employee.ts";
import type { UploadFile } from "antd";

interface DriverLicenseFormProps {
  initialValues?: Partial<FormData>;
  onValuesChange?: (values: Partial<FormData>) => void;
}

export const DriverLicenseForm: React.FC<DriverLicenseFormProps> = ({
  initialValues,
  onValuesChange,
}) => {
  const { beforeUpload } = useDriverLicenseUpload();

  const [hasDriverLicense, setHasDriverLicense] = useState<boolean>(
    initialValues?.DriverLicense?.HasLicense || false,
  );

  const disableExpirationDates = (current: Dayjs): boolean => {
    return current && current < dayjs().startOf("day");
  };

  const handleDriverLicenseChange = (value: boolean) => {
    setHasDriverLicense(value);
    onValuesChange?.({
      DriverLicense: {
        ...(initialValues?.DriverLicense || {}),
        HasLicense: value,
      },
    });
  };

  const handleFileChange = (info: { file: UploadFile }) => {
    const file = info.file;
    if (!file) return;

    const newDoc: PersonalDocument = {
      Type: "DRIVER_LICENSE_PROOF",
      Title: file.name,
      File: file,
    };

    const existingDocs =
      initialValues?.PersonalDocuments?.filter(
        (doc) => doc.Type !== "DRIVER_LICENSE_PROOF",
      ) ?? [];

    onValuesChange?.({
      PersonalDocuments: [...existingDocs, newDoc],
    });
  };

  return (
    <div className="max-w-2xl">
      <ProFormRadio.Group
        name="DriverLicense.HasLicense"
        label="Do you have a driver's license? *"
        rules={[
          {
            required: true,
            message: "Please select if you have a driver's license",
          },
        ]}
        options={[
          { label: "Yes", value: true },
          { label: "No", value: false },
        ]}
        fieldProps={{
          onChange: (e) => handleDriverLicenseChange(e.target.value),
        }}
        className="mb-6"
        initialValue={hasDriverLicense}
      />

      {hasDriverLicense && (
        <div className="space-y-4">
          <ProFormText
            name="DriverLicense.LicenseNumber"
            label="Driver's License Number *"
            placeholder="Enter your driver's license number"
            rules={[
              {
                required: true,
                message: "Please enter your driver's license number",
              },
              {
                min: 5,
                message:
                  "Driver's license number must be at least 5 characters",
              },
            ]}
            className="mb-4"
            initialValue={initialValues?.DriverLicense?.LicenseNumber}
          />

          <ProFormDatePicker
            name="DriverLicense.ExpirationDate"
            label="Expiration Date *"
            placeholder="Select expiration date"
            rules={[
              { required: true, message: "Please select the expiration date" },
            ]}
            fieldProps={{
              format: "MM/DD/YYYY",
              disabledDate: disableExpirationDates,
            }}
            className="mb-4"
            initialValue={
              initialValues?.DriverLicense?.ExpirationDate
                ? dayjs(initialValues.DriverLicense.ExpirationDate)
                : undefined
            }
          />

          <ProFormUploadDragger
            name="DriverLicense.File"
            label="Upload Driver's License Copy *"
            title="Upload File"
            max={1}
            rules={[
              {
                required: false,
                message: "Please upload a copy of your driver's license",
              },
            ]}
            fieldProps={{
              accept: ".pdf,.jpg,.jpeg,.png",
              beforeUpload,
              onChange: handleFileChange,
              showUploadList: true,
            }}
            extra="Accepted formats: PDF, JPG, PNG. Max size: 5MB"
            className="mb-4"
          />
        </div>
      )}
    </div>
  );
};
