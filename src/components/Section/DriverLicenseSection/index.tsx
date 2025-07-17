import { CarOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Space } from 'antd';
import React, { useState } from 'react';
import DriverLicenseForm from '../../Form/DriverLicenseForm';
import type { DriverLicenseFormValues } from '../../Form/DriverLicenseForm/data.d';
import FormWrapper from '../../Form/FormWrapper';
import DriverLicenseDisplay from '../../Information/DriverLicenseDisplay';
import { SectionHeader } from '../SectionHeader';
import type { DriverLicenseSectionProps } from './data.d';

const DriverLicenseSection: React.FC<DriverLicenseSectionProps> = ({
  driverLicense,
  document,
  editable = false,
  isEditing = false,
  onEdit,
  onSave,
  onCancel,
}) => {
  const [formValues, setFormValues] = useState<DriverLicenseFormValues>(
    driverLicense || { hasLicense: false },
  );

  const handleSave = () => {
    onSave?.(formValues);
  };

  return (
    <ProCard
      title={
        <Space>
          <CarOutlined />
          Driver License
        </Space>
      }
      headerBordered
      extra={
        <SectionHeader
          canEdit={editable}
          isEditing={isEditing}
          onEdit={onEdit}
          onSave={handleSave}
          onCancel={onCancel}
        />
      }
    >
      {isEditing ? (
        <FormWrapper initialValues={formValues} onFinish={handleSave}>
          <DriverLicenseForm value={formValues} onChange={setFormValues} />
        </FormWrapper>
      ) : (
        <DriverLicenseDisplay
          driverLicense={driverLicense}
          document={document}
        />
      )}
    </ProCard>
  );
};

export default DriverLicenseSection;
