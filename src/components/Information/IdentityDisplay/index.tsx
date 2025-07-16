import React from 'react';
import { Descriptions, Space } from 'antd';
import { CalendarOutlined, IdcardOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import type { IdentityDisplayProps } from './data';

const maskSSN = (ssn: string) => `***-**-${ssn?.slice(-4)}`;
const formatDate = (dob: string) => dayjs(dob).format('MMM DD, YYYY');
const calculateAge = (dob: string) => dayjs().diff(dayjs(dob), 'year');

const IdentityDisplay: React.FC<IdentityDisplayProps> = ({ info }) => (
  <Descriptions column={2} bordered size="small">
    <Descriptions.Item label="Date of Birth">
      <Space>
        <CalendarOutlined />
        {formatDate(info.dob)}
      </Space>
    </Descriptions.Item>
    <Descriptions.Item label="Age">
      {calculateAge(info.dob)} years old
    </Descriptions.Item>
    <Descriptions.Item label="Gender">
      {info.gender}
    </Descriptions.Item>
    <Descriptions.Item label="SSN">
      {maskSSN(info.ssn)}
    </Descriptions.Item>
  </Descriptions>
);

export default IdentityDisplay;

