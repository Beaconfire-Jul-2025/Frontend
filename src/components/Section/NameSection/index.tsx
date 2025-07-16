import React, { useState } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { SectionHeader } from '../SectionHeader';
import { NameDisplay } from '@/components/Information/NameDisplay';
import { NameForm } from '../../Form/NameForm';
import type { NameSectionProps, NameSectionData } from './data';

const NameSection: React.FC<NameSectionProps> = ({
  data,
  mode = 'readonly',
  isEditing,
  onEdit,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<NameSectionData>(data);

  const handleEdit = () => {
    if (onEdit) onEdit();
  };

  const handleSave = (values: NameSectionData) => {
    setFormData(values);
    if (onSave) onSave(values);
  };

  return (
    <ProCard
      title={
        <Space>
          <UserOutlined />
          Name Information
        </Space>
      }
      headerBordered
      extra={
        <SectionHeader
          canEdit={mode === 'employee'}
          isEditing={isEditing}
          onEdit={handleEdit}
          onSave={onSave ? () => handleSave(formData) : undefined}
          onCancel={onCancel}
        />
      }
    >
      {isEditing ? (
        <NameForm
          initialValues={formData}
          onFinish={handleSave}
          onCancel={onCancel || (() => {})}
        />
      ) : (
        <NameDisplay data={formData} />
      )}
    </ProCard>
  );
};

export default NameSection;

