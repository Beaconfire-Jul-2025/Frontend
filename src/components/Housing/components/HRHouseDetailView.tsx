import { useNavigate, useParams } from '@umijs/max';
import { Button, Card, Divider, List, message, Spin, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  getFacilityReportsByHouseId,
  getHouseById,
} from '@/services/hr-backend/housing';

const { Title, Text } = Typography;

export const HRHouseDetailView: React.FC = () => {
  const navigate = useNavigate();
  const { houseId } = useParams();
  const [loading, setLoading] = useState(true);
  const [houseInfo, setHouseInfo] = useState<any>(null);
  const [reports, setReports] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Get house info
        let house = await getHouseById(houseId);
        if (!house || !house.address) {
          house = { address: 'Unknown' };
        }
        setHouseInfo(house);
        // Get facility reports
        const reportRes = await getFacilityReportsByHouseId({ houseId });
        setReports(reportRes.list || []);
      } catch (_error) {
        message.error('Failed to load house data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [houseId]);

  return (
    <div className="space-y-6">
      {loading ? (
        <Spin />
      ) : (
        <Card title="House Details">
          <Title level={5}>Address</Title>
          <Text>{houseInfo?.address}</Text>
          <Divider />
          <Title level={5}>Facility Reports</Title>
          <List
            dataSource={reports}
            renderItem={(report: any) => (
              <List.Item
                actions={[
                  <Button
                    key="view"
                    onClick={() =>
                      navigate(`/hr/housing/facility-report/${report.id}`)
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

export default HRHouseDetailView;
