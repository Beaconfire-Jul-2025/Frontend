import {
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Card, Typography } from 'antd';
import React from 'react';
import UploadFile from '../../UploadFile';
import type { WorkAuthorizationNonCitizenData } from './data.d';

const { Title, Text } = Typography;

interface WorkAuthorizationNonCitizenProps {
  value?: WorkAuthorizationNonCitizenData;
  onChange?: (data: WorkAuthorizationNonCitizenData) => void;
  showDocumentUpload?: boolean;
}

const workAuthOptions = [
  { label: 'H1-B', value: 'H1-B' },
  { label: 'L2', value: 'L2' },
  { label: 'F1(CPT/OPT)', value: 'F1(CPT/OPT)' },
  { label: 'H4', value: 'H4' },
  { label: 'Other', value: 'Other' },
];

export const WorkAuthorizationNonCitizen: React.FC<
  WorkAuthorizationNonCitizenProps
> = ({ value = { workAuthType: '' }, onChange, showDocumentUpload = true }) => {
  const disableFutureDates = (current: any) => current && current > new Date();

  return (
    <>
      <ProFormSelect
        name="workAuthType"
        label="What is your work authorization? *"
        placeholder="Select your work authorization type"
        options={workAuthOptions}
        rules={[
          {
            required: true,
            message: 'Please select your work authorization type',
          },
        ]}
        fieldProps={{
          value: value.workAuthType,
          onChange: (val: string) =>
            onChange?.({ ...value, workAuthType: val, otherType: '' }),
        }}
        className="mb-4"
      />
      {value.workAuthType === 'Other' && (
        <ProFormText
          name="otherType"
          label="Please specify your work authorization *"
          placeholder="Enter your work authorization type"
          rules={[
            {
              required: true,
              message: 'Please specify your work authorization',
            },
          ]}
          fieldProps={{
            value: value.otherType,
            onChange: (e: any) =>
              onChange?.({ ...value, otherType: e.target.value }),
          }}
          className="mb-4"
        />
      )}
      {value.workAuthType && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <ProFormDatePicker
            name="startDate"
            label="Start Date *"
            placeholder="Select start date"
            rules={[
              { required: true, message: 'Please select the start date' },
            ]}
            fieldProps={{
              value: value.startDate,
              format: 'MM/DD/YYYY',
              disabledDate: disableFutureDates,
              onChange: (date: any) =>
                onChange?.({ ...value, startDate: date }),
            }}
          />
          <ProFormDatePicker
            name="endDate"
            label="End Date *"
            placeholder="Select end date"
            rules={[{ required: true, message: 'Please select the end date' }]}
            fieldProps={{
              value: value.endDate,
              format: 'MM/DD/YYYY',
              onChange: (date: any) => onChange?.({ ...value, endDate: date }),
            }}
          />
        </div>
      )}
      {value.workAuthType && showDocumentUpload && (
        <Card className="mb-6">
          <Title level={4} className="mb-4">
            Work Authorization Document *
          </Title>
          <Text className="block mb-4">
            Please upload a copy of your work authorization document (EAD card,
            H1B document, etc.)
          </Text>
          <UploadFile
            value={value.workAuthFile}
            onChange={(file) => onChange?.({ ...value, workAuthFile: file })}
            fileLimit={1}
            purpose="VISA"
            disabled={false}
          />
        </Card>
      )}
    </>
  );
};
