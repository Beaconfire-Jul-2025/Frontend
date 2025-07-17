import {
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import React from 'react';
import type { DriverLicenseFormProps } from './data.d';

const licenseOptions = [
  { label: 'Yes', value: true },
  { label: 'No', value: false },
];

const DriverLicenseForm: React.FC<DriverLicenseFormProps> = ({
  value,
  onChange,
  disabled,
}) => {
  return (
    <>
      <ProFormSelect
        name="hasLicense"
        label="Has License"
        options={licenseOptions}
        rules={[
          { required: true, message: 'Please select if you have a license' },
        ]}
        fieldProps={{
          value: value?.hasLicense,
          onChange: (val: boolean) => onChange?.({ ...value, hasLicense: val }),
          disabled,
        }}
      />
      {value?.hasLicense && (
        <>
          <ProFormText
            name="licenseNumber"
            label="License Number"
            rules={[{ required: true, message: 'Please enter license number' }]}
            fieldProps={{
              value: value.licenseNumber,
              onChange: (e: any) =>
                onChange?.({ ...value, licenseNumber: e.target.value }),
              disabled,
            }}
          />
          <ProFormDatePicker
            name="expirationDate"
            label="Expiration Date"
            rules={[
              { required: true, message: 'Please select expiration date' },
            ]}
            fieldProps={{
              value: value.expirationDate,
              onChange: (date: any) =>
                onChange?.({ ...value, expirationDate: date }),
              disabled,
            }}
          />
        </>
      )}
    </>
  );
};

export default DriverLicenseForm;
