import { TeamOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Form, message, Space, Typography } from 'antd';
import React, { useCallback, useState } from 'react';
import FormWrapper from '@/components/Form/FormWrapper';
import RelatedPeopleForm from '@/components/Form/RelatedPeopleForm';
import RelatedPeopleDisplay from '@/components/Information/RelatedPeopleDisplay';
import { SectionHeader } from '@/components/Section/SectionHeader';
import type {
  RelatedPeopleFormData,
  RelatedPeopleSectionProps,
} from './data.d';

const { Title } = Typography;

export const RelatedPeopleSection: React.FC<RelatedPeopleSectionProps> = ({
  people = [],
  loading = false,
  editable = true,
  onEdit,
  onSave,
  onCancel,
  title = 'Related People',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [form] = Form.useForm<RelatedPeopleFormData>();

  const handleEdit = useCallback(() => {
    if (onEdit) {
      onEdit();
    }
    const formPeople = people.length > 0 ? people : [];
    form.setFieldsValue({ people: formPeople });
    setIsEditing(true);
  }, [form, people, onEdit]);

  const handleSave = useCallback(async () => {
    try {
      setSaveLoading(true);
      const values = await form.validateFields();
      const validPeople = values.people.filter(
        (p: any) => p.firstName?.trim() && p.lastName?.trim(),
      );
      if (onSave) {
        await onSave(validPeople);
      }
      setIsEditing(false);
      message.success('Related people information updated successfully');
    } catch (error) {
      console.error('Error saving related people:', error);
      message.error('Failed to save related people information');
    } finally {
      setSaveLoading(false);
    }
  }, [form, onSave]);

  const handleCancel = useCallback(() => {
    if (onCancel) {
      onCancel();
    }
    form.resetFields();
    setIsEditing(false);
  }, [form, onCancel]);

  return (
    <ProCard
      title={
        <Space>
          <TeamOutlined />
          <Title level={4} style={{ margin: 0 }}>
            {title}
          </Title>
        </Space>
      }
      extra={
        <SectionHeader
          canEdit={editable}
          isEditing={isEditing}
          loading={saveLoading || loading}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      }
      loading={loading && !isEditing}
      bordered
      size="small"
    >
      {isEditing ? (
        <FormWrapper formInstance={form} onFinish={handleSave}>
          <RelatedPeopleForm formInstance={form} onCancel={handleCancel} />
        </FormWrapper>
      ) : (
        <RelatedPeopleDisplay people={people} title={title} />
      )}
    </ProCard>
  );
};

export default RelatedPeopleSection;
