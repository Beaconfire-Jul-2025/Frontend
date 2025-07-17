import { CalendarOutlined } from '@ant-design/icons';
import { Descriptions, Space, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import type { DriverLicenseDisplayProps } from './data.d';

const { Text } = Typography;

export const DriverLicenseDisplay: React.FC<DriverLicenseDisplayProps> = ({
  driverLicense,
  document,
}) => {
  if (!driverLicense || !driverLicense.hasLicense) {
    return <Tag color="red">No Driver License</Tag>;
  }

  return (
    <Descriptions column={2} bordered size="small">
      <Descriptions.Item label="Has License">
        <Tag color="green">Yes</Tag>
      </Descriptions.Item>
      <Descriptions.Item label="License Number">
        <Text>{driverLicense.licenseNumber}</Text>
      </Descriptions.Item>
      <Descriptions.Item label="Expiration Date" span={2}>
        <Space>
          <CalendarOutlined />
          {driverLicense.expirationDate
            ? dayjs(driverLicense.expirationDate).format('MMM DD, YYYY')
            : '--'}
        </Space>
      </Descriptions.Item>
      {document && (
        <Descriptions.Item label="Document" span={2}>
          <a href={document.path} target="_blank" rel="noopener noreferrer">
            {document.title || 'View Document'}
          </a>
        </Descriptions.Item>
      )}
    </Descriptions>
  );
};

export default DriverLicenseDisplay;
