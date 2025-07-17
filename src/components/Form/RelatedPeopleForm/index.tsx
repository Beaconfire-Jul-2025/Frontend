import { Button, List, Popconfirm, Space } from 'antd';
import React, { useState } from 'react';
import RelatedPersonForm from '@/components/Form/RelatedPersonForm';
import type { RelatedPeopleFormProps } from './data.d';

const RelatedPeopleForm: React.FC<RelatedPeopleFormProps> = ({
  disabled,
  minPeople = 1,
  maxPeople = 3,
  formInstance,
}) => {
  const [people, setPeople] = useState<number[]>([0]);

  const addPerson = () => {
    if (people.length < maxPeople) {
      setPeople([...people, Date.now()]);
    }
  };

  const removePerson = (key: number) => {
    if (people.length > minPeople) {
      setPeople(people.filter((k) => k !== key));
    }
  };

  return (
    <>
      <List
        dataSource={people}
        renderItem={(key, idx) => (
          <List.Item style={{ padding: 0 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <RelatedPersonForm
                disabled={disabled}
                formInstance={formInstance}
                minAddresses={1}
                maxAddresses={1}
              />
              <Space>
                {people.length > minPeople && (
                  <Popconfirm
                    title="Remove this person?"
                    onConfirm={() => removePerson(key)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button danger disabled={disabled} size="small">
                      Remove
                    </Button>
                  </Popconfirm>
                )}
              </Space>
            </Space>
          </List.Item>
        )}
      />
      <Button
        type="dashed"
        onClick={addPerson}
        disabled={disabled || people.length >= maxPeople}
        style={{ width: '100%', marginTop: 16 }}
      >
        Add Related Person
      </Button>
    </>
  );
};

export default RelatedPeopleForm;
