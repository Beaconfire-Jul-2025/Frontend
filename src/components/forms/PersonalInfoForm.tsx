import React from "react";
import {
  ProFormText,
  ProFormSelect,
  ProFormDatePicker,
} from "@ant-design/pro-components";
import dayjs, { Dayjs } from "dayjs";
import type { FormData } from "@/types/employee";

interface PersonalInfoFormProps {
  initialValues?: Partial<FormData>;
  onValuesChange?: (values: Partial<FormData>) => void;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  initialValues,
}) => {
  const disableDOBDates = (current: Dayjs): boolean => {
    const isFutureDate = current && current > dayjs().endOf("day");
    const isUnder16 = current && current.isAfter(dayjs().subtract(16, "year"));
    return isFutureDate || isUnder16;
  };

  return (
    <div className="max-w-2xl">
      <ProFormSelect
        name="Gender"
        label="Gender"
        placeholder="Select your gender (optional)"
        options={[
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
          { label: "Other", value: "Other" },
          { label: "I Prefer Not to Say", value: "I Prefer Not to Say" },
        ]}
        className="mb-4"
        initialValue={initialValues?.Gender}
      />

      <ProFormText
        name="SSN"
        label="Social Security Number *"
        placeholder="Enter your SSN (XXX-XX-XXXX)"
        rules={[
          { required: true, message: "Please enter your SSN" },
          {
            pattern: /^\d{3}-\d{2}-\d{4}$/,
            message: "Please enter SSN in format: XXX-XX-XXXX",
          },
        ]}
        className="mb-4"
        initialValue={initialValues?.SSN}
      />

      <ProFormDatePicker
        name="DOB"
        label="Date of Birth *"
        placeholder="Select your date of birth"
        rules={[
          { required: true, message: "Please select your date of birth" },
        ]}
        fieldProps={{
          format: "MM/DD/YYYY",
          disabledDate: disableDOBDates,
        }}
        className="mb-4"
        initialValue={initialValues?.DOB ? dayjs(initialValues.DOB) : undefined}
      />
    </div>
  );
};
