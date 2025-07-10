import { Card, Typography, List, Divider, Space } from 'antd';
import Layout from "../common/Layout";
import { useEffect, useState } from 'react';
import { Spin, message } from 'antd';

const { Title, Text } = Typography;

const EmployeeHousing = () => {
  // Mock data
  const houseInfo = {
    address: '4567 Beacon Ave, Sunnyvale, CA 94085',
    roommates: [
      { name: 'Jane Doe', phone: '555-123-4567' },
      { name: 'Tom Smith', phone: '555-987-6543' },
    ],
    reports: [
      {
        title: 'Leaky Faucet',
        description: 'The faucet in the kitchen is leaking.',
        createdBy: 'Jane Doe',
        reportDate: '2025-07-08',
        status: 'Open',
        comments: [
          {
            description: 'Scheduled plumber visit.',
            createdBy: 'HR',
            commentDate: '2025-07-09',
          },
        ],
      },
    ],
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHousingData = async () => {
      try {
        // TODO: Replace with actual API call
        await new Promise((res) => setTimeout(res, 1000)); // simulate API delay
        // const response = await fetch('/api/housing');
        // const data = await response.json();
        // setHouseInfo(data);
      } catch (error) {
        console.error(error);
        message.error('Failed to load housing data');
      } finally {
        setLoading(false);
      }
    };

    fetchHousingData();
  }, []);

  return (
    <Layout title="Housing">
      <div className="space-y-6">
        {loading ? (
          <Spin />
        ) : (
          <Card title="Housing Details">
            <Title level={5}>Address</Title>
            <Text>{houseInfo.address}</Text>

            <Divider />

            <Title level={5}>Roommates</Title>
            <List
              dataSource={houseInfo.roommates}
              renderItem={(roommate) => (
                <List.Item>
                  <Space direction="vertical">
                    <Text strong>{roommate.name}</Text>
                    <Text type="secondary">{roommate.phone}</Text>
                  </Space>
                </List.Item>
              )}
            />

            <Divider />

            <Title level={5}>Facility Reports</Title>
            <List
              dataSource={houseInfo.reports}
              renderItem={(report) => (
                <List.Item style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                  <Text strong>{report.title}</Text>
                  <Text>{report.description}</Text>
                  <Text type="secondary">
                    Reported by {report.createdBy} on {report.reportDate}
                  </Text>
                  <Text>Status: {report.status}</Text>

                  <Divider style={{ margin: '12px 0' }} />

                  <Title level={5} style={{ marginTop: 0 }}>Comments</Title>
                  <List
                    dataSource={report.comments}
                    renderItem={(comment) => (
                      <List.Item>
                        <Space direction="vertical">
                          <Text>{comment.description}</Text>
                          <Text type="secondary">
                            By {comment.createdBy} on {comment.commentDate}
                          </Text>
                        </Space>
                      </List.Item>
                    )}
                  />
                </List.Item>
              )}
            />
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default EmployeeHousing;