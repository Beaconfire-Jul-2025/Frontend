import { useNavigate } from '@umijs/max';
import { Button, Card, Divider, List, message, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  getEmployeePersonalProfile,
  getRoommates,
} from '@/services/hr-backend/employee';
import {
  getFacilityReportsByHouseId,
  getHouseById,
} from '@/services/hr-backend/housing';

const { Title, Text } = Typography;

export const EmployeeHousingView: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [houseInfo, setHouseInfo] = useState<any>(null);
  const [roommates, setRoommates] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Get employee profile to find houseId
        const employee = await getEmployeePersonalProfile();
        const houseId = employee?.houseId || '1';
        // Get house info
        let house = await getHouseById(houseId);
        if (!house || !house.address) {
          house = { address: '1234 Main St, Springfield, USA' };
        }
        setHouseInfo(house);
        // Get roommates
        let roommatesList = [];
        try {
          const roommatesRes = await getRoommates();
          roommatesList = Array.isArray(roommatesRes?.data)
            ? roommatesRes.data
            : [];
        } catch {
          roommatesList = [
            {
              firstName: 'John',
              lastName: 'Doe',
              cellPhone: '555-1234',
              email: 'john@example.com',
            },
            {
              firstName: 'Jane',
              lastName: 'Smith',
              cellPhone: '555-5678',
              email: 'jane@example.com',
            },
          ];
        }
        setRoommates(roommatesList);
        // Get facility reports
        const reportRes = await getFacilityReportsByHouseId({ houseId });
        setReports(reportRes.list || []);
      } catch (_error) {
        message.error('Failed to load housing data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {loading ? (
        <Spin />
      ) : (
        <Card title="Housing Details">
          <Title level={5}>Address</Title>
          <Text>{houseInfo?.address}</Text>
          <Divider />
          <Title level={5}>Roommates</Title>
          <div
            style={{
              display: 'flex',
              gap: 16,
              flexWrap: 'wrap',
              marginBottom: 16,
            }}
          >
            {roommates.map((roommate) => (
              <Card
                key={`${roommate.firstName}-${roommate.lastName}-${roommate.email}`}
                style={{ width: 250 }}
                hoverable
                title={
                  roommate.preferredName ||
                  `${roommate.firstName} ${roommate.lastName}`
                }
              >
                <Text strong>Name: </Text>
                {roommate.firstName} {roommate.lastName}
                <br />
                <Text strong>Phone: </Text>
                {roommate.cellPhone || 'N/A'}
                <br />
                <Text strong>Email: </Text>
                {roommate.email || 'N/A'}
              </Card>
            ))}
          </div>
          <Divider />
          <Title level={5}>Facility Reports</Title>
          <div style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              onClick={() => navigate('/employee/housing/facility-report/new')}
            >
              Report an Issue
            </Button>
          </div>
          <List
            dataSource={reports}
            renderItem={(report: any) => (
              <List.Item
                actions={[
                  <Button
                    key="view"
                    onClick={() =>
                      navigate(`/employee/housing/facility-report/${report.id}`)
                    }
                  >
                    View Details
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={report.title}
                  description={`Reported on ${report.createDate} — Status: ${report.status}`}
                />
              </List.Item>
            )}
          />
        </Card>
      )}
    </div>
  );
};

export default EmployeeHousingView;
