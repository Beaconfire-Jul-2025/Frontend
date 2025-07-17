import { Descriptions, Space } from 'antd';
import React from 'react';
import { AddressDisplay } from '@/components/Information/AddressDisplay';
import ContactDisplay from '@/components/Information/ContactDisplay';
import { NameDisplay } from '@/components/Information/NameDisplay';
import type { RelatedPerson } from './data.d';

export interface RelatedPersonDisplayProps {
  person: RelatedPerson;
}

const RelatedPersonDisplay: React.FC<RelatedPersonDisplayProps> = ({
  person,
}) => {
  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <Descriptions column={1} bordered size="small">
        <Descriptions.Item label="Relationship">
          {person.relationship}
        </Descriptions.Item>
      </Descriptions>
      <NameDisplay
        data={{
          firstName: person.firstName,
          lastName: person.lastName,
          middleName: person.middleName,
        }}
      />
      <ContactDisplay
        contact={{
          email: person.email,
          phone: person.cellPhone || person.phone,
          alternatePhone: person.alternatePhone,
        }}
      />
      {person.address && (
        <Descriptions column={1} bordered size="small">
          <Descriptions.Item label="Address">
            <AddressDisplay address={person.address} />
          </Descriptions.Item>
        </Descriptions>
      )}
    </Space>
  );
};

export default RelatedPersonDisplay;
