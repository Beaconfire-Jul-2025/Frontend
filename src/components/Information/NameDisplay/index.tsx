import React from 'react';
import { Typography, Descriptions } from 'antd';
import type { NameData } from './data';

const { Text } = Typography;

export interface NameDisplayProps {
  data: NameData;
}

export const NameDisplay: React.FC<NameDisplayProps> = ({ data }) => (
  <Descriptions column={1} bordered size="small">
    <Descriptions.Item label="First Name">{data.firstName}</Descriptions.Item>
    {data.middleName && (
      <Descriptions.Item label="Middle Name">{data.middleName}</Descriptions.Item>
    )}
    <Descriptions.Item label="Last Name">{data.lastName}</Descriptions.Item>
    {data.preferredName && (
      <Descriptions.Item label="Preferred Name">{data.preferredName}</Descriptions.Item>
    )}
  </Descriptions>
);
