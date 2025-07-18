import { Card, Space, Typography } from 'antd';
import React from 'react';
import RelatedPersonDisplay from '@/components/Information/RelatedPersonDisplay';
import type { RelatedPeopleDisplayProps } from './data.d';

const { Title } = Typography;

const RelatedPeopleDisplay: React.FC<RelatedPeopleDisplayProps> = ({
  people,
  title,
}) => {
  const safePeople = Array.isArray(people) ? people : [];
  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      {title && (
        <Title level={5} style={{ margin: 0 }}>
          {title}
        </Title>
      )}
      {safePeople.length === 0 ? (
        <Typography.Text type="secondary">
          No related people information available
        </Typography.Text>
      ) : (
        safePeople.map((person) => (
          <Card
            key={person.id || person.email || person.phone}
            style={{ margin: 0 }}
          >
            <RelatedPersonDisplay person={person} />
          </Card>
        ))
      )}
    </Space>
  );
};

export default RelatedPeopleDisplay;
