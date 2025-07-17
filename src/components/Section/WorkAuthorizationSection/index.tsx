import { SafetyCertificateOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { Descriptions, Space, Typography } from 'antd';
import React from 'react';
import { SectionHeader } from '../SectionHeader';
import type { WorkAuthorizationSectionProps } from './data.d';

const { Text } = Typography;

export const WorkAuthorizationSection: React.FC<
  WorkAuthorizationSectionProps
> = ({
  workAuthorization,
  editable = false,
  isEditing = false,
  onEdit,
  onSave,
  onCancel,
}) => {
  // For now, only display (no edit form)
  return (
    <ProCard
      title={
        <Space>
          <SafetyCertificateOutlined />
          Work Authorization
        </Space>
      }
      headerBordered
      extra={
        <SectionHeader
          canEdit={editable}
          isEditing={isEditing}
          onEdit={onEdit}
          onSave={onSave ? () => onSave(workAuthorization) : undefined}
          onCancel={onCancel}
        />
      }
    >
      <Descriptions column={1}>
        <Descriptions.Item label="Type">
          <Text>{workAuthorization.type}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="US Citizen">
          <Text>{workAuthorization.isUsCitizen ? 'Yes' : 'No'}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Green Card Holder">
          <Text>{workAuthorization.greenCardHolder ? 'Yes' : 'No'}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Start Date">
          <Text>{workAuthorization.startDate || '-'}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="End Date">
          <Text>{workAuthorization.endDate || '-'}</Text>
        </Descriptions.Item>
        <Descriptions.Item label="Last Modified">
          <Text>{workAuthorization.lastModificationDate || '-'}</Text>
        </Descriptions.Item>
      </Descriptions>
    </ProCard>
  );
};

export default WorkAuthorizationSection;
