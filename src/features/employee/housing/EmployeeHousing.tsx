import { Card, Typography, List, Divider, Space, Button } from "antd";
import { useEffect, useState } from "react";
import { Spin, message } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const EmployeeHousing = () => {
  const navigate = useNavigate();

  // Mock data
  const houseInfo = {
    address: "4567 Beacon Ave, Sunnyvale, CA 94085",
    roommates: [
      { name: "Jane Doe", phone: "555-123-4567" },
      { name: "Tom Smith", phone: "555-987-6543" },
    ],
    reports: [
      {
        title: "Leaky Faucet",
        description: "The faucet in the kitchen is leaking.",
        createdBy: "Jane Doe",
        reportDate: "2025-07-08",
        status: "Open",
        comments: [
          {
            description: "Scheduled plumber visit.",
            createdBy: "HR",
            commentDate: "2025-07-09",
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
        message.error("Failed to load housing data");
      } finally {
        setLoading(false);
      }
    };

    fetchHousingData();
  }, []);

  return (
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
          <div style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              onClick={() => navigate("/employee/housing/facility-report/new")}
            >
              Report an Issue
            </Button>
          </div>

          <List
            dataSource={houseInfo.reports}
            renderItem={(report, index) => (
              <List.Item
                actions={[
                  <Button
                    key="view"
                    onClick={() =>
                      navigate(`/employee/housing/facility-report/${index}`)
                    }
                  >
                    View Details
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={report.title}
                  description={`Reported on ${report.reportDate} — Status: ${report.status}`}
                />
              </List.Item>
            )}
          />
        </Card>
      )}
    </div>
  );
};

export default EmployeeHousing;
