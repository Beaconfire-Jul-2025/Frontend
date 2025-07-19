import { useNavigate } from '@umijs/max';
import { Card, message, Spin, Table, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { getAllHouses } from '@/services/hr-backend/housing';

const { Title } = Typography;

export const HRHousingView: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [houses, setHouses] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const res = await getAllHouses();
        setHouses(res.list || []);
      } catch (_error) {
        message.error('Failed to load housing list');
      } finally {
        setLoading(false);
      }
    };
    fetchHouses();
  }, []);

  const columns = [
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render: (text: string, record: any) => (
        <a onClick={() => navigate(`/hr/housing/view/${record.id}`)}>{text}</a>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Card>
        <Title level={3}>All Housing</Title>
        {loading ? (
          <Spin />
        ) : (
          <Table dataSource={houses} columns={columns} rowKey="id" />
        )}
      </Card>
    </div>
  );
};

export default HRHousingView;
