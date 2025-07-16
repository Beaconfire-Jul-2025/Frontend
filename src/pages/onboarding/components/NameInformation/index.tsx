import React from 'react';
import { Button, Space } from 'antd';
import { NameForm } from '@/components/Form/NameForm';
import type { NameData } from '@/components/Form/NameForm/data';

export interface NameInformationProps {
  initialValues: NameData;
  onFinish: (values: NameData) => void;
  onCancel: () => void;
}

const NameInformation: React.FC<NameInformationProps> = ({
  initialValues,
  onFinish,
  onCancel
}) => {
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h3>Personal Name Information</h3>
        <p style={{ color: '#666' }}>
          Please provide your legal name information as it appears on official documents.
        </p>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <NameForm
          initialValues={initialValues}
          onFinish={onFinish}
          onCancel={onCancel}
        />
      </div>

      <div style={{ textAlign: 'center' }}>
        <Space size="middle">
          <Button onClick={onCancel}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" form="name-form">
            Next Step
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default NameInformation;
