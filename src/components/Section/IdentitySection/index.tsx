import React from 'react';
import { ProCard } from '@ant-design/pro-components';
import { IdcardOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import SectionHeader from '../SectionHeader';
import IdentityDisplay from '../../Information/IdentityDisplay';
import IdentityForm from '../../Form/IdentityForm';
import type { IdentitySectionProps, IdentityInfo } from './data';

const IdentitySection: React.FC<IdentitySectionProps> = ({
  value,
  mode = 'employee',
  isEditing,
  onEdit,
  onSave,
  onCancel,
  form,
}) => {
  const handleEdit = () => {
    if (onEdit) {
      form.setFieldsValue({
        ...value,
        dob: value.dob ? value.dob : undefined,
      });
      onEdit();
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      onSave?.(values);
    } catch {}
  };

  return (
    <ProCard
      title={
        <span>
          <IdcardOutlined style={{ marginRight: 8 }} />Identity Information
        </span>
      }
      headerBordered
      extra={
        <SectionHeader
          canEdit={mode === 'employee'}
          isEditing={isEditing}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={onCancel}
        />
      }
    >
      {isEditing ? (
        <Form form={form} layout="vertical">
          <IdentityForm />
        </Form>
      ) : (
        <IdentityDisplay info={value} />
      )}
    </ProCard>
  );
};

export default IdentitySection;

